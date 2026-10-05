import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  getPhaseKpiSummary,
  getKpiDimensions,
  getRoutesSegmentsPhaseWise,
  type PhaseSegment,
  type RoutesSegmentsPhaseWiseResponse,
} from '../dashboard.service';
import { SegmentMediaService } from '../services/segment-media.service';
import { upstreamApi, UpstreamSegmentsUnavailableError } from '../services/upstream-api.service';
import { BreadcrumbService } from '../shared/components/breadcrumb.service';
import { DashboardFilterState } from '../shared/filters/dashboard-filter-state';
import {
  createSegmentMiniMap,
  formatCoordinate,
  hasSegmentCoordinates,
  type SegmentMiniMap,
} from '../map/segment-mini-map';
import type { GalleryTile, PhaseFolder } from './gallery.types';

/** One segment in scope for the grid, with the parent context it came from. */
interface SegmentRow {
  segment: PhaseSegment;
  phaseName: string;
  routeName: string;
  contractorName: string;
}

/**
 * How many segments are resolved into photos per page.
 *
 * Every segment costs one media request (capped at 6 concurrent by
 * SegmentMediaService), so a phase with thousands of segments is paged rather
 * than resolved up front. 48 fills a large grid without a long first wait.
 */
const PAGE_SIZE = 48;

/**
 * Gallery — browse construction proof photos by phase.
 *
 * No phase selected → phase folders. A phase selected → every photo in that
 * phase, paged. Clicking a photo opens the viewer; its Detail button pins the
 * photo's segment on a mini map beside the segment's metadata.
 *
 * Shares DashboardFilterState with the GIS map, so the same selection scopes
 * both screens, and shares SegmentMediaService's caches so moving between them
 * re-uses whatever has already been fetched.
 */
@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css'],
})
export class GalleryViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('loadMoreSentinel') sentinelRef?: ElementRef<HTMLDivElement>;
  @ViewChild('miniMapHost') miniMapHostRef?: ElementRef<HTMLDivElement>;

  readonly filters = new DashboardFilterState();
  applyingFilters = false;

  // ── Folder mode ──
  folders: PhaseFolder[] = [];
  foldersLoading = true;

  // ── Grid mode ──
  /** Every in-scope segment for the current phase selection. */
  private segmentRows: SegmentRow[] = [];
  /** How many of `segmentRows` have had their photos resolved. */
  resolvedSegments = 0;
  tiles: GalleryTile[] = [];
  segmentsLoading = false;
  pageLoading = false;
  gridMessage = '';
  gridError = '';

  /** Guards against a slower earlier load overwriting a newer one. */
  private loadToken = 0;

  // ── Viewer + detail panel ──
  viewerOpen = false;
  viewerIndex = 0;
  detailOpen = false;
  detailRows: Array<{ label: string; value: string }> = [];
  detailHasCoordinates = false;

  private miniMap: SegmentMiniMap | null = null;
  private miniMapSegment: PhaseSegment | null = null;
  private sentinelObserver: IntersectionObserver | null = null;
  private filterSub: Subscription | null = null;

  constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly segmentMedia: SegmentMediaService,
    private readonly breadcrumbs: BreadcrumbService,
  ) {}

  // ── Lifecycle ───────────────────────────────────────────────────────────

  ngOnInit(): void {
    // A phase change swaps between folders and the grid; contractor is filtered
    // server-side so it needs a refetch. Trenching is client-side only.
    this.filterSub = this.filters.changed$.subscribe((type) => {
      if (type === 'phase' || type === 'contractor') {
        this.reloadGrid();
      } else if (type === 'trenching') {
        this.rebuildFromLastResponse();
      }
      this.publishDetailCrumb();
    });

    void this.bootstrap();
  }

  ngAfterViewInit(): void {
    // The sentinel is inside an *ngIf, so observe it whenever it appears.
    this.sentinelObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.ngZone.run(() => this.loadNextPage());
        }
      },
      { rootMargin: '400px' }
    );
    this.observeSentinel();
  }

  ngOnDestroy(): void {
    this.filterSub?.unsubscribe();
    this.sentinelObserver?.disconnect();
    this.miniMap?.destroy();
    this.miniMap = null;
    // The phase crumb belongs to this page only.
    this.breadcrumbs.clearDetail();
  }

  /**
   * Name the open phase in the global breadcrumb trail.
   *
   * The phase grid is a drill-down held in filter state, not a route segment,
   * so BreadcrumbComponent cannot discover it — the page has to push it. The
   * folder view is the page itself and adds no crumb.
   */
  private publishDetailCrumb(): void {
    this.breadcrumbs.setDetail(this.inFolderMode ? null : this.breadcrumbPhase);
  }

  private async bootstrap(): Promise<void> {
    await this.filters.loadFilters();
    // Feeds the cascade the contractor/ring/link relationships, exactly as the
    // GIS view and Executive Dashboard do.
    void getKpiDimensions()
      .then((data) => this.filters.ingestKpiDimensions(data))
      .catch(() => { /* cascade just stays wide */ });
    await this.loadFolders();
    this.reloadGrid();
    this.publishDetailCrumb();
  }

  // ── Folder mode ─────────────────────────────────────────────────────────

  /** True while no specific phase is chosen — the folder grid is showing. */
  get inFolderMode(): boolean {
    return !this.filters.hasExplicitPhaseSelection;
  }

  /** The phase name shown in the breadcrumb, when exactly one is selected. */
  get breadcrumbPhase(): string {
    const names = this.filters.selectedPhaseIds;
    return names.length === 1 ? names[0] : `${names.length} phases`;
  }

  private async loadFolders(): Promise<void> {
    this.foldersLoading = true;
    let kpiByPhase = new Map<string, { plannedKm: number; completionPercent: number }>();
    try {
      const kpi = await getPhaseKpiSummary({
        contractorIds: this.filters.selectedContractorsParam(),
      });
      this.filters.ingestPhaseKpi(kpi);
      kpiByPhase = new Map(
        (kpi.phases || [])
          .filter((p) => p?.phaseName)
          .map((p) => [
            p.phaseName.trim().toLowerCase(),
            { plannedKm: p.totalPlannedKm || 0, completionPercent: p.completionPercent || 0 },
          ])
      );
    } catch {
      // Folder cards still render; they just carry no progress figures.
    }

    this.folders = this.filters.phaseOptions.map((phaseName) => {
      const kpiRow = kpiByPhase.get(phaseName.trim().toLowerCase());
      return {
        phaseName,
        phaseId: this.filters.phaseIdForName(phaseName),
        plannedKm: kpiRow?.plannedKm ?? null,
        completionPercent: kpiRow?.completionPercent ?? null,
        segmentCount: null,
        photoCount: null,
      };
    });
    this.foldersLoading = false;
  }

  openFolder(folder: PhaseFolder): void {
    if (folder.phaseId == null) return; // no segment geometry → nothing to show
    this.filters.selectOnlyPhase(folder.phaseName);
  }

  /** Back out of a phase to the folder grid. */
  backToFolders(): void {
    this.filters.clear('phase');
  }

  // ── Grid mode ───────────────────────────────────────────────────────────

  private lastResponse: RoutesSegmentsPhaseWiseResponse | null = null;

  private reloadGrid(): void {
    this.closeViewer();
    if (this.inFolderMode) {
      this.loadToken++; // abandon any in-flight segment load
      this.pageLoading = false; // its finally() no longer owns this flag
      this.segmentRows = [];
      this.tiles = [];
      this.resolvedSegments = 0;
      this.gridMessage = '';
      this.gridError = '';
      this.segmentsLoading = false;
      return;
    }
    void this.loadSegmentsForSelection();
  }

  /**
   * Fetch segments for every selected phase that has geometry.
   *
   * One request per phase (the endpoint is phase-scoped), awaited in sequence:
   * the contractor API drops connections when several of these overlap, so a
   * parallel fan-out loses phases a serial one returns. Uncached phases are
   * budgeted because each costs ~60s upstream — the same rule the GIS map uses.
   */
  private async loadSegmentsForSelection(): Promise<void> {
    const token = ++this.loadToken;
    // An orphaned page load can no longer clear this — see reloadGrid().
    this.pageLoading = false;
    const requested = this.filters.getSelectedPhaseIds();

    this.tiles = [];
    this.resolvedSegments = 0;
    this.segmentRows = [];
    this.gridError = '';
    this.gridMessage = '';

    if (requested.length === 0) {
      this.gridMessage = this.filters.selectedPhaseUnavailable
        ? `No segment data for the selected phase(s). Available: ${
            this.filters.availablePhaseNames.join(', ') || 'none'
          }`
        : '';
      return;
    }

    this.segmentsLoading = true;
    const { load, skipped } = this.budgetPhaseLoads(requested);
    const merged: RoutesSegmentsPhaseWiseResponse = { routes: [] };
    const failures: unknown[] = [];

    try {
      for (const phaseId of load) {
        try {
          const res = await getRoutesSegmentsPhaseWise(
            phaseId,
            this.filters.selectedContractorsParam()
          );
          if (token !== this.loadToken) return;
          if (res && Array.isArray(res.routes)) merged.routes.push(...res.routes);
        } catch (err) {
          failures.push(err);
          if (token !== this.loadToken) return;
        }
      }

      this.lastResponse = merged;
      this.filters.refreshTrenchingOptions(merged);
      this.segmentRows = this.buildSegmentRows(merged);
      this.gridMessage = this.emptyGridMessage();
      this.reportLoad(failures, load.length, skipped);
    } finally {
      if (token === this.loadToken) this.segmentsLoading = false;
    }

    if (token === this.loadToken) {
      await this.loadNextPage();
      this.recordFolderCounts();
    }
  }

  /**
   * Why the grid is empty, or '' when there is something to show. Without this
   * a fully-filtered-out phase renders as a blank page with no explanation.
   */
  private emptyGridMessage(): string {
    if (this.segmentRows.length > 0) return '';
    const narrowed =
      this.filters.selectedTrenchingSet() !== null ||
      this.allowedRouteNames() !== null ||
      this.filters.selectedContractorSet() !== null;
    return narrowed
      ? 'No segments match the current filters in this phase.'
      : 'No segments with photos in this phase.';
  }

  /** Re-apply the client-side filters to the response already in hand. */
  private rebuildFromLastResponse(): void {
    if (this.inFolderMode || !this.lastResponse) return;
    // Bump the token so a page load still in flight can't append tiles that
    // the new filter excludes.
    this.loadToken++;
    this.pageLoading = false;
    this.tiles = [];
    this.resolvedSegments = 0;
    this.segmentRows = this.buildSegmentRows(this.lastResponse);
    this.gridMessage = this.emptyGridMessage();
    void this.loadNextPage();
  }

  /**
   * How many phases may be fetched from the network in one load.
   * Cached phases do not count toward the budget; they cost nothing.
   */
  private static readonly MAX_UNCACHED_PHASE_FETCHES = 3;

  private budgetPhaseLoads(phaseIds: number[]): { load: number[]; skipped: number[] } {
    if (!upstreamApi.enabled) return { load: phaseIds, skipped: [] };
    const load: number[] = [];
    const skipped: number[] = [];
    let budget = GalleryViewComponent.MAX_UNCACHED_PHASE_FETCHES;
    for (const id of phaseIds) {
      if (upstreamApi.hasCachedSegments(id)) {
        load.push(id);
      } else if (budget > 0) {
        budget--;
        load.push(id);
      } else {
        skipped.push(id);
      }
    }
    return { load, skipped };
  }

  /** Explain a partial load rather than leaving gaps that read as "no photos". */
  private reportLoad(failures: unknown[], attempted: number, skipped: number[]): void {
    if (!failures.length && !skipped.length) return;
    const parts: string[] = [];
    if (failures.length) {
      const timedOut = failures.some(
        (err) => err instanceof UpstreamSegmentsUnavailableError && err.timedOut
      );
      const detail = timedOut
        ? 'the contractor API exceeded its 60s limit'
        : 'the contractor API returned an error';
      parts.push(
        failures.length >= attempted
          ? `Segments unavailable — ${detail}.`
          : `${failures.length} of ${attempted} phases failed — ${detail}.`
      );
      console.error('[gallery] Segment load failures', failures);
    }
    if (skipped.length) {
      parts.push(
        `${skipped.length} more phase${skipped.length === 1 ? '' : 's'} not loaded ` +
          '(each takes ~60s upstream). Select one phase at a time to load them.'
      );
    }
    this.gridError = parts.join(' ');
  }

  /**
   * Flatten the phase response into the segments this grid should show,
   * applying the same client-side narrowing the GIS map applies to its lines.
   */
  private buildSegmentRows(res: RoutesSegmentsPhaseWiseResponse): SegmentRow[] {
    const contractorFilter = this.filters.selectedContractorSet();
    const trenchingFilter = this.filters.selectedTrenchingSet();
    const routeFilter = this.allowedRouteNames();
    const rows: SegmentRow[] = [];

    for (const route of res.routes || []) {
      if (contractorFilter && !contractorFilter.has(this.filters.normContractor(route.contractor))) {
        continue;
      }
      const routeName = String(route.routeName ?? '');
      if (routeFilter && !this.matchesAny(routeFilter, routeName)) continue;

      for (const phase of route.phases || []) {
        for (const segment of phase.segments || []) {
          if (segment?.id == null) continue; // no id → no media to fetch
          if (trenchingFilter) {
            const t = (segment.trenchingTypeName ?? '').trim();
            if (!t || !trenchingFilter.has(t)) continue;
          }
          // Upstream sometimes reports the proof count on the row. When it says
          // zero, skip the segment rather than spend a request confirming it.
          const count = Number(segment['proofCounts']);
          if (Number.isFinite(count) && count === 0) continue;

          rows.push({
            segment,
            phaseName: phase.phaseName ?? (segment.phaseId != null ? `Phase ${segment.phaseId}` : ''),
            routeName,
            contractorName: String(route.contractor ?? ''),
          });
        }
      }
    }
    return rows;
  }

  /**
   * Route names the Project / Ring filters allow, or null for "all".
   *
   * Segment rows carry a route name but no ring, so a ring selection is applied
   * through the links the cascade has already narrowed `projectOptions` to.
   */
  private allowedRouteNames(): Set<string> | null {
    const projects = this.filters.selectedProjectIds;
    if (projects.length > 0 && projects.length < this.filters.projectOptions.length) {
      return new Set(projects);
    }
    const rings = this.filters.selectedRingIds;
    if (
      rings.length > 0 &&
      rings.length < this.filters.ringOptions.length &&
      this.filters.projectOptions.length > 0
    ) {
      return new Set(this.filters.projectOptions);
    }
    return null;
  }

  /** Feeds spell route/link names differently, so match loosely. */
  private matchesAny(allowed: Set<string>, value: string): boolean {
    if (!value) return false;
    const v = value.trim().toLowerCase();
    for (const a of allowed) {
      const al = a.trim().toLowerCase();
      if (al === v || v.includes(al) || al.includes(v)) return true;
    }
    return false;
  }

  // ── Paged photo resolution ──────────────────────────────────────────────

  get hasMorePages(): boolean {
    return this.resolvedSegments < this.segmentRows.length;
  }

  get totalSegments(): number {
    return this.segmentRows.length;
  }

  /**
   * Resolve the next page of segments into photo tiles.
   *
   * Requests go through SegmentMediaService's queue, which caps concurrency at
   * 6 and dedupes in-flight segments, so firing a whole page at once is safe.
   */
  async loadNextPage(): Promise<void> {
    if (this.pageLoading || !this.hasMorePages) return;
    const token = this.loadToken;
    this.pageLoading = true;

    const page = this.segmentRows.slice(this.resolvedSegments, this.resolvedSegments + PAGE_SIZE);
    try {
      const results = await Promise.all(
        page.map((row) =>
          this.segmentMedia
            .loadSegmentImagesQueued(row.segment.id as string | number, row.contractorName || null)
            .then((urls) => ({ row, urls }))
            .catch(() => ({ row, urls: [] as string[] }))
        )
      );
      if (token !== this.loadToken) return;

      const added: GalleryTile[] = [];
      for (const { row, urls } of results) {
        urls.forEach((url, i) => added.push(this.toTile(row, url, i)));
      }
      this.tiles = [...this.tiles, ...added];
      this.resolvedSegments += page.length;

      if (this.tiles.length === 0 && !this.hasMorePages) {
        this.gridMessage = 'No photos have been uploaded for the selected phase yet.';
      } else {
        this.gridMessage = '';
      }
      this.recordFolderCounts();
    } finally {
      if (token === this.loadToken) this.pageLoading = false;
      this.observeSentinel();
    }
  }

  private toTile(row: SegmentRow, url: string, position: number): GalleryTile {
    const seq = row.segment.seqNo ?? row.segment.id;
    return {
      key: `${row.segment.id}:${position}`,
      url,
      segmentId: row.segment.id as string | number,
      label: `Segment #${seq}`,
      phaseName: row.phaseName,
      routeName: row.routeName,
      contractorName: row.contractorName,
      segment: row.segment,
    };
  }

  /** Keep the folder card for the open phase honest about what was found. */
  private recordFolderCounts(): void {
    if (this.filters.selectedPhaseIds.length !== 1) return;
    const name = this.filters.selectedPhaseIds[0];
    const folder = this.folders.find((f) => f.phaseName === name);
    if (!folder) return;
    folder.segmentCount = this.segmentRows.length;
    // Only a complete pass can claim a photo total; mid-scroll it is a floor.
    folder.photoCount = this.hasMorePages ? null : this.tiles.length;
  }

  /** (Re)attach the observer after the sentinel enters or leaves the DOM. */
  private observeSentinel(): void {
    const observer = this.sentinelObserver;
    if (!observer) return;
    observer.disconnect();
    // Defer so the *ngIf around the sentinel has settled for this tick.
    setTimeout(() => {
      const el = this.sentinelRef?.nativeElement;
      if (el && this.hasMorePages) observer.observe(el);
    });
  }

  // ── Filters ─────────────────────────────────────────────────────────────

  async applyFilters(): Promise<void> {
    if (this.applyingFilters) return;
    this.applyingFilters = true;
    try {
      await this.loadFolders();
      if (!this.inFolderMode) await this.loadSegmentsForSelection();
    } finally {
      this.applyingFilters = false;
    }
  }

  // ── Viewer ──────────────────────────────────────────────────────────────

  openViewer(index: number): void {
    this.viewerIndex = index;
    this.viewerOpen = true;
    if (this.detailOpen) this.refreshDetail();
  }

  closeViewer(): void {
    this.viewerOpen = false;
    this.detailOpen = false;
    // The panel (and the map's host div) leave the DOM with the viewer, so the
    // ArcGIS view has to go too — re-pointing a detached container renders
    // nothing. A fresh one is built the next time Detail is opened.
    this.miniMap?.destroy();
    this.miniMap = null;
    this.miniMapSegment = null;
  }

  onViewerIndexChange(index: number): void {
    this.viewerIndex = index;
    if (this.detailOpen) this.refreshDetail();
  }

  get currentTile(): GalleryTile | null {
    return this.tiles[this.viewerIndex] ?? null;
  }

  // ── Detail panel ────────────────────────────────────────────────────────

  toggleDetail(): void {
    this.detailOpen = !this.detailOpen;
    if (this.detailOpen) {
      this.refreshDetail();
    }
  }

  closeDetail(): void {
    this.detailOpen = false;
  }

  private refreshDetail(): void {
    const tile = this.currentTile;
    if (!tile) return;

    this.detailRows = this.buildDetailRows(tile);
    this.detailHasCoordinates = hasSegmentCoordinates(tile.segment);
    this.syncMiniMap(tile.segment);

    // Uploader, verdict, ring and project names only exist on the proof rows.
    void this.segmentMedia
      .loadSegmentProofs(tile.segmentId, tile.contractorName || null)
      .then((proofs) => {
        this.ngZone.run(() => {
          // The panel may have moved on to another image while this resolved.
          if (this.currentTile?.key !== tile.key) return;
          this.detailRows = this.buildDetailRows(tile, proofs?.[0]);
        });
      });
  }

  /**
   * Create the mini map on first open, then re-point it at later segments
   * instead of tearing down and rebuilding an ArcGIS view per image.
   */
  private syncMiniMap(segment: PhaseSegment): void {
    this.miniMapSegment = segment;
    if (!hasSegmentCoordinates(segment)) return;

    if (this.miniMap) {
      void this.miniMap.show(segment);
      return;
    }
    // The host div is behind an *ngIf, so wait for this render pass to commit.
    setTimeout(() => {
      const host = this.miniMapHostRef?.nativeElement;
      const target = this.miniMapSegment;
      if (!host || !target || this.miniMap) return;
      void createSegmentMiniMap(host, target).then((handle) => {
        this.miniMap = handle;
        // The selection may have changed while ArcGIS was initialising.
        if (handle && this.miniMapSegment && this.miniMapSegment !== target) {
          void handle.show(this.miniMapSegment);
        }
      });
    });
  }

  /**
   * Segment metadata for the panel, mirroring the GIS view's Overview rows so
   * the two screens describe a segment the same way. Empty values are dropped.
   */
  private buildDetailRows(
    tile: GalleryTile,
    proof?: Record<string, unknown> | null
  ): Array<{ label: string; value: string }> {
    const s = tile.segment;
    const str = (v: unknown) => (v == null ? '' : String(v)).trim();
    const km = (v: unknown) => (typeof v === 'number' ? `${(v / 1000).toFixed(2)} km` : '');
    const date = (v: unknown) => {
      const raw = str(v);
      if (!raw) return '';
      const d = new Date(raw);
      return isNaN(d.getTime()) ? raw : d.toLocaleString();
    };

    const candidates: Array<[string, string]> = [
      ['Route', tile.routeName],
      ['Segment #', str(s.seqNo ?? s.id)],
      ['Phase', tile.phaseName],
      ['Contractor', tile.contractorName],
      ['Status', str(s.statusName ?? s.status)],
      ['Trenching Type', str(s.trenchingTypeName)],
      ['Length', km(s.lengthM)],
      ['Ring', str(proof?.['ringName'] ?? s['ringName'])],
      ['Project', str(proof?.['projectName'] ?? s['projectName'])],
      ['Engineer', str(s['engName'] ?? proof?.['uploadedBy'])],
      ['Verdict', str(proof?.['verdict'])],
      ['Start Point', formatCoordinate(s.startLat, s.startLon ?? s.startLng)],
      ['End Point', formatCoordinate(s.endLat, s.endLon ?? s.endLng)],
      ['Captured On', date(s.createdAt ?? proof?.['createdAt'])],
      ['Remarks', str(s['remarks'])],
    ];
    return candidates
      .filter(([, value]) => value !== '')
      .map(([label, value]) => ({ label, value }));
  }

  /** Jump to the GIS map with this photo's phase already selected. */
  openInGisMap(): void {
    const phase = this.currentTile?.phaseName;
    this.router.navigate(['/gis-map'], phase ? { queryParams: { phase } } : {});
  }
}
