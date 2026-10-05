import { Subject } from 'rxjs';
import {
  getContractorContext,
  getDashboardFilters,
  getSegmentPhases,
  type KpiDimensionsResponse,
  type PhaseKpiSummaryResponse,
  type RoutesSegmentsPhaseWiseResponse,
} from '../../dashboard.service';

export type FilterType =
  | 'contractor'
  | 'ring'
  | 'project'
  | 'phase'
  | 'status'
  | 'trenching';

/**
 * Shared contractor / ring / project / phase filter state.
 *
 * Lifted out of GisMapViewComponent so the GIS map and the Gallery behave
 * identically instead of carrying two copies of the cascade. Purely state +
 * logic — the markup lives in FilterBarComponent, and each host decides what
 * to reload by subscribing to `changed$`.
 */
export class DashboardFilterState {
  // ── Option lists (raw string arrays) ──
  contractorOptions: string[] = [];
  ringOptions: string[] = [];
  projectOptions: string[] = [];
  phaseOptions: string[] = [];
  statusOptions: string[] = ['Completed', 'In Progress', 'Blocked', 'Not Started'];
  // Trenching-type options are derived from the loaded segments (only the
  // Trenching phase populates trenchingTypeName), so they start empty.
  trenchingOptions: string[] = [];

  // ── Selected values (names, not ids) ──
  selectedContractorIds: string[] = [];
  selectedRingIds: string[] = [];
  selectedProjectIds: string[] = [];
  selectedPhaseIds: string[] = [];
  selectedStatusIds: string[] = [];
  selectedTrenchingIds: string[] = [];

  // ── Display labels ──
  selectedContractor = 'All Contractors';
  selectedRing = 'All Rings';
  selectedProject = 'All Projects';
  selectedPhase = 'All Phases';
  selectedStatus = 'All Status';
  selectedTrenching = 'All Trenching Types';

  /** Which dropdown is expanded, if any. */
  openDropdown: FilterType | null = null;

  /** Emits the changed filter type after every selection change. */
  readonly changed$ = new Subject<FilterType>();

  // ── Filter name → server id maps ──
  // Dropdowns display ring/link names, but the API and map filters expect
  // numeric ids. These translate the selected names back to ids.
  readonly ringNameToId = new Map<string, string>();
  readonly linkNameToId = new Map<string, string>();
  readonly linkNameToRingId = new Map<string, string>();
  /** Phase dropdown holds names; the segments API needs the numeric phaseId. */
  readonly phaseNameToId = new Map<string, string>();

  // ── Cascading filters (contractor -> ring -> project -> phase) ──
  // The visible option lists are narrowed by the upstream selections, so the
  // unfiltered lists have to be kept aside to widen back out.
  private masterContractorOptions: string[] = [];
  private masterRingOptions: string[] = [];
  private masterProjectOptions: string[] = [];
  private masterPhaseOptions: string[] = [];
  /** contractor / ring / link relationships, from the kpi-dimensions feed. */
  private rawProjectLinks: { linkName: string; ringName: string; contractorName: string }[] = [];
  /** Which contractors work which phase, from phase-kpi-summary. */
  private rawPhaseContractors: { phaseLabel: string; contractor: string }[] = [];

  // ── Loading ─────────────────────────────────────────────────────────────

  /** Populate every option list from the filter feeds. Never throws. */
  async loadFilters(): Promise<void> {
    try {
      const [ctxResult, filtersResult] = await Promise.allSettled([
        getContractorContext(),
        getDashboardFilters(),
      ]);

      if (ctxResult.status === 'fulfilled' && ctxResult.value?.contractors?.length) {
        this.contractorOptions = ctxResult.value.contractors.filter((c) => c && c.trim());
        this.applySingleContractorDefault();
      }

      if (filtersResult.status === 'fulfilled' && filtersResult.value) {
        const f = filtersResult.value;
        if (f.rings?.length) {
          this.ringOptions = f.rings.map((r) => r.name).filter((n) => n && n.trim());
          for (const r of f.rings) {
            if (r?.name && r?.id != null) {
              this.ringNameToId.set(r.name.trim().toLowerCase(), String(r.id).replace(/^R/i, ''));
            }
          }
        }
        if (f.links?.length) {
          this.projectOptions = f.links.map((l) => l.name).filter((n) => n && n.trim());
          for (const l of f.links) {
            const key = l?.name?.trim().toLowerCase();
            if (key && l?.id != null) this.linkNameToId.set(key, String(l.id));
            if (key && l?.ringId != null) {
              this.linkNameToRingId.set(key, String(l.ringId).replace(/^R/i, ''));
            }
          }
        }
        if (f.steps?.length) {
          this.phaseOptions = f.steps.map((s) => s.name).filter((n) => n && n.trim());
        }
      }
    } catch {
      // Keep defaults
    }

    // The "steps" filter above exposes phase NAMES only (its id === the name),
    // but the segment endpoint needs a NUMERIC phaseId. Fetch the real numeric
    // ids from the segment cache and map name -> id (matched by phase name).
    await this.loadSegmentPhaseMap();

    // Options are now as wide as they get — snapshot them so the cascade has
    // something to widen back out to.
    this.captureMasterFilterOptions();
  }

  /** Build phaseNameToId (name -> numeric id) from cached segment phases. */
  async loadSegmentPhaseMap(): Promise<void> {
    try {
      const res = await getSegmentPhases();
      this.phaseNameToId.clear();
      for (const p of res.phases || []) {
        if (p?.phaseName && p?.phaseId != null) {
          this.phaseNameToId.set(p.phaseName.trim().toLowerCase(), String(p.phaseId));
        }
      }
    } catch {
      // No segment phases available — segment-backed views just stay empty.
    }
  }

  /**
   * Feed the kpi-dimensions response in so the cascade knows the
   * contractor / ring / link relationships and the name → id maps are complete.
   */
  ingestKpiDimensions(data: KpiDimensionsResponse): void {
    for (const r of data.rings || []) {
      if (r?.name && r?.id != null) {
        this.ringNameToId.set(r.name.trim().toLowerCase(), String(r.id));
      }
    }
    for (const p of data.projects || []) {
      const key = p?.linkName?.trim().toLowerCase();
      if (key && p?.projectId != null) {
        if (!this.linkNameToId.has(key)) this.linkNameToId.set(key, String(p.projectId));
        if (p.ringId != null) this.linkNameToRingId.set(key, String(p.ringId).replace(/^R/i, ''));
      }
    }

    // Captured only while unfiltered: this feed is itself filter-aware, so
    // rebuilding from a narrowed response would permanently shrink the lists.
    if (this.rawProjectLinks.length === 0) {
      this.rawProjectLinks = (data.projects || [])
        .map((p) => ({
          linkName: String(p?.linkName ?? ''),
          ringName: String(p?.ringName ?? ''),
          contractorName: String(p?.contractorName ?? ''),
        }))
        .filter((p) => p.linkName);
    }
  }

  /** Feed phase-kpi-summary in for the cascade's phase → contractor hop. */
  ingestPhaseKpi(data: PhaseKpiSummaryResponse): void {
    if (this.rawPhaseContractors.length > 0) return;
    const pairs: { phaseLabel: string; contractor: string }[] = [];
    for (const phase of data.phases || []) {
      for (const c of phase.contractors || []) {
        const raw = c as { contractorName?: string; name?: string };
        const contractor = String(raw.contractorName ?? raw.name ?? '');
        if (phase.phaseName && contractor) {
          pairs.push({ phaseLabel: phase.phaseName, contractor });
        }
      }
    }
    if (pairs.length) this.rawPhaseContractors = pairs;
  }

  // ── Single-contractor deployments ───────────────────────────────────────

  /** True when the deployment serves exactly one contractor. */
  get isSingleContractorDeployment(): boolean {
    return this.contractorOptions.length === 1;
  }

  /**
   * One contractor means nothing to choose: select it so downstream layers are
   * scoped from first load rather than defaulting to "All Contractors".
   */
  private applySingleContractorDefault(): void {
    if (this.contractorOptions.length !== 1) return;
    const only = this.contractorOptions[0];
    this.selectedContractor = only;
    this.selectedContractorIds = [only];
  }

  // ── Dropdown interaction ────────────────────────────────────────────────

  closeAllDropdowns(): void {
    this.openDropdown = null;
  }

  toggleDropdown(type: FilterType, event?: Event): void {
    // A single-contractor deployment has its contractor locked — ignore any
    // attempt to change it, including keyboard and programmatic paths.
    if (type === 'contractor' && this.isSingleContractorDeployment) return;
    event?.stopPropagation();
    const opening = this.openDropdown !== type;
    this.openDropdown = opening ? type : null;
    // Refresh the phase→id map when opening the Phase dropdown so phases synced
    // after page load (e.g. Ducting) become selectable without a full reload.
    if (opening && type === 'phase') void this.loadSegmentPhaseMap();
  }

  isSelected(type: FilterType, value: string): boolean {
    return this.getSelectionArray(type).includes(value);
  }

  toggleSelection(type: FilterType, value: string): void {
    if (type === 'contractor' && this.isSingleContractorDeployment) return;
    const arr = this.getSelectionArray(type);
    const idx = arr.indexOf(value);
    if (idx >= 0) { arr.splice(idx, 1); } else { arr.push(value); }
    this.afterSelectionChange(type);
  }

  selectAll(type: FilterType): void {
    if (type === 'contractor' && this.isSingleContractorDeployment) return;
    switch (type) {
      case 'contractor': this.selectedContractorIds = [...this.contractorOptions]; break;
      case 'ring': this.selectedRingIds = [...this.ringOptions]; break;
      case 'project': this.selectedProjectIds = [...this.projectOptions]; break;
      case 'phase': this.selectedPhaseIds = [...this.phaseOptions]; break;
      case 'status': this.selectedStatusIds = [...this.statusOptions]; break;
      case 'trenching': this.selectedTrenchingIds = [...this.trenchingOptions]; break;
    }
    this.afterSelectionChange(type);
  }

  clear(type: FilterType): void {
    if (type === 'contractor' && this.isSingleContractorDeployment) return;
    switch (type) {
      case 'contractor': this.selectedContractorIds = []; break;
      case 'ring': this.selectedRingIds = []; break;
      case 'project': this.selectedProjectIds = []; break;
      case 'phase': this.selectedPhaseIds = []; break;
      case 'status': this.selectedStatusIds = []; break;
      case 'trenching': this.selectedTrenchingIds = []; break;
    }
    this.afterSelectionChange(type);
  }

  /**
   * Select exactly one phase by name (used by the Gallery's folder cards).
   * No-op when the name isn't a known option.
   */
  selectOnlyPhase(phaseName: string): void {
    if (!this.phaseOptions.includes(phaseName)) return;
    this.selectedPhaseIds = [phaseName];
    this.afterSelectionChange('phase');
  }

  private afterSelectionChange(type: FilterType): void {
    this.syncSelectionLabel(type);
    this.applyCascadingFilters(type);
    this.applyReverseCascade(type);
    this.changed$.next(type);
  }

  // ── Cascading filters ───────────────────────────────────────────────────
  //
  // Picking a contractor narrows Ring, a ring narrows Project, a project
  // narrows Phase. The reverse also holds — picking a project selects its
  // parent ring and contractor — so a selection can never describe a
  // combination with no data.
  //
  // Names are matched fuzzily because the three feeds spell them differently
  // (e.g. 'Ring 1' vs 'R1 - Ring 1'); an exact match is tried first.

  /** Snapshot the unfiltered option lists. Called once, after they first load. */
  private captureMasterFilterOptions(): void {
    if (this.contractorOptions.length) this.masterContractorOptions = [...this.contractorOptions];
    if (this.ringOptions.length) this.masterRingOptions = [...this.ringOptions];
    if (this.projectOptions.length) this.masterProjectOptions = [...this.projectOptions];
    if (this.phaseOptions.length) this.masterPhaseOptions = [...this.phaseOptions];
  }

  /** True when `value` matches any of `selected`, exactly or as a substring. */
  private fuzzyMatch(selected: string[], value: string): boolean {
    if (!value) return false;
    const v = value.trim().toLowerCase();
    return selected.some((s) => {
      const sl = s.trim().toLowerCase();
      return sl === v || v.includes(sl) || sl.includes(v);
    });
  }

  /** Map a raw ring/contractor name onto the matching master option label. */
  private mapValueToOption(masterOptions: string[], value: string): string | null {
    if (!value) return null;
    const v = value.trim().toLowerCase();
    const exact = masterOptions.find((o) => o.trim().toLowerCase() === v);
    if (exact) return exact;
    return (
      masterOptions.find((o) => {
        const ol = o.trim().toLowerCase();
        return v.includes(ol) || ol.includes(v);
      }) ?? null
    );
  }

  /** Narrow every downstream dropdown to what the upstream selections allow. */
  private applyCascadingFilters(changedType: FilterType): void {
    const projects = this.rawProjectLinks;
    if (projects.length === 0) return;
    // The relationship feed and the option lists load independently, so the
    // masters can still be empty here. Narrowing against an empty master would
    // compare every count against 0, read as "no filter", and then reset each
    // dropdown to the empty master — wiping it.
    if (this.masterContractorOptions.length === 0 || this.masterRingOptions.length === 0) {
      return;
    }

    // "Active" means a real subset — all-selected and none-selected both mean
    // "no constraint", and narrowing on them would empty the child lists.
    const hasContractorFilter =
      this.selectedContractorIds.length > 0 &&
      this.selectedContractorIds.length < this.masterContractorOptions.length;
    const hasRingFilter =
      this.selectedRingIds.length > 0 &&
      this.selectedRingIds.length < this.masterRingOptions.length;
    const hasLinkFilter =
      this.selectedProjectIds.length > 0 &&
      this.selectedProjectIds.length < this.masterProjectOptions.length;

    let filtered = projects;
    if (hasContractorFilter) {
      filtered = filtered.filter((p) => this.fuzzyMatch(this.selectedContractorIds, p.contractorName));
    }

    // Contractor -> Ring
    if (changedType === 'contractor') {
      const availableRings = [...new Set(filtered.map((p) => p.ringName).filter(Boolean))];
      this.ringOptions =
        hasContractorFilter && availableRings.length > 0
          ? this.masterRingOptions.filter((opt) =>
              availableRings.some((r) => this.fuzzyMatch([opt], r))
            )
          : [...this.masterRingOptions];
      // Never leave a dropdown empty — an unmatched name is a naming mismatch
      // between feeds, not an empty result, and hiding every ring would trap
      // the user with no way back.
      if (this.ringOptions.length === 0) this.ringOptions = [...this.masterRingOptions];
      this.selectedRingIds = this.selectedRingIds.filter((id) => this.ringOptions.includes(id));
      this.syncSelectionLabel('ring');
    }

    if (hasRingFilter) {
      filtered = filtered.filter((p) => this.fuzzyMatch(this.selectedRingIds, p.ringName));
    }

    // Contractor / Ring -> Project
    if (
      (changedType === 'contractor' || changedType === 'ring') &&
      this.masterProjectOptions.length > 0
    ) {
      const availableLinks = [...new Set(filtered.map((p) => p.linkName).filter(Boolean))];
      const hasAnyFilter = hasContractorFilter || hasRingFilter;
      this.projectOptions =
        hasAnyFilter && availableLinks.length > 0
          ? this.masterProjectOptions.filter((opt) =>
              availableLinks.some((l) => this.fuzzyMatch([opt], l))
            )
          : [...this.masterProjectOptions];
      if (this.projectOptions.length === 0) this.projectOptions = [...this.masterProjectOptions];
      this.selectedProjectIds = this.selectedProjectIds.filter((id) =>
        this.projectOptions.includes(id)
      );
      this.syncSelectionLabel('project');
    }

    if (hasLinkFilter) {
      filtered = filtered.filter((p) => this.fuzzyMatch(this.selectedProjectIds, p.linkName));
    }

    // Contractor / Ring / Project -> Phase.
    // Phases are related to contractors, not links, so this narrows by the
    // contractors still standing after the filters above.
    if (
      (changedType === 'contractor' || changedType === 'ring' || changedType === 'project') &&
      this.masterPhaseOptions.length > 0
    ) {
      const hasAnyFilter = hasContractorFilter || hasRingFilter || hasLinkFilter;
      if (hasAnyFilter && this.rawPhaseContractors.length > 0) {
        const remaining = new Set(filtered.map((p) => p.contractorName.trim().toLowerCase()));
        const availablePhases = [
          ...new Set(
            this.rawPhaseContractors
              .filter((pc) => {
                const name = pc.contractor.trim().toLowerCase();
                return (
                  remaining.has(name) ||
                  [...remaining].some((rc) => rc.includes(name) || name.includes(rc))
                );
              })
              .map((pc) => pc.phaseLabel)
              .filter(Boolean)
          ),
        ];
        this.phaseOptions =
          availablePhases.length > 0
            ? this.masterPhaseOptions.filter((opt) =>
                availablePhases.some((p) => p === opt || p.toLowerCase() === opt.toLowerCase())
              )
            : [...this.masterPhaseOptions];
        if (this.phaseOptions.length === 0) this.phaseOptions = [...this.masterPhaseOptions];
      } else {
        this.phaseOptions = [...this.masterPhaseOptions];
      }
      const before = this.selectedPhaseIds.length;
      this.selectedPhaseIds = this.selectedPhaseIds.filter((id) => this.phaseOptions.includes(id));
      this.syncSelectionLabel('phase');
      // Phase-gated views must refresh when the cascade drops a phase, or they
      // keep showing a deselected one.
      if (before !== this.selectedPhaseIds.length) this.changed$.next('phase');
    }
  }

  /**
   * Upstream cascade: picking a project selects its parent ring + contractor,
   * picking a ring selects its parent contractor.
   *
   * Runs AFTER applyCascadingFilters, so it sets the parents without the
   * downstream narrowing then hiding the child the user just picked.
   */
  private applyReverseCascade(changedType: FilterType): void {
    const links = this.rawProjectLinks;
    if (links.length === 0) return;

    if (changedType === 'project') {
      const hasLinkSubset =
        this.selectedProjectIds.length > 0 &&
        this.selectedProjectIds.length < this.masterProjectOptions.length;
      if (!hasLinkSubset) return;

      const matched = links.filter((l) => this.fuzzyMatch(this.selectedProjectIds, l.linkName));
      const rings = new Set<string>();
      const contractors = new Set<string>();
      for (const l of matched) {
        const r = this.mapValueToOption(this.masterRingOptions, l.ringName);
        if (r) rings.add(r);
        const c = this.mapValueToOption(this.masterContractorOptions, l.contractorName);
        if (c) contractors.add(c);
      }
      if (rings.size > 0) {
        this.ringOptions = [...this.masterRingOptions];
        this.selectedRingIds = [...rings];
        this.syncSelectionLabel('ring');
      }
      this.selectParentContractors(contractors);
    } else if (changedType === 'ring') {
      const hasRingSubset =
        this.selectedRingIds.length > 0 &&
        this.selectedRingIds.length < this.masterRingOptions.length;
      if (!hasRingSubset) return;

      const matched = links.filter((l) => this.fuzzyMatch(this.selectedRingIds, l.ringName));
      const contractors = new Set<string>();
      for (const l of matched) {
        const c = this.mapValueToOption(this.masterContractorOptions, l.contractorName);
        if (c) contractors.add(c);
      }
      this.selectParentContractors(contractors);
    }
  }

  /**
   * Apply a reverse-cascade contractor selection.
   *
   * Skipped on a single-contractor deployment, where the contractor filter is
   * locked — the same rule the toggle handlers enforce.
   */
  private selectParentContractors(contractors: Set<string>): void {
    if (contractors.size === 0 || this.isSingleContractorDeployment) return;
    this.contractorOptions = [...this.masterContractorOptions];
    this.selectedContractorIds = [...contractors];
    this.syncSelectionLabel('contractor');
    // Contractor is filtered server-side, so segment-backed views must refetch.
    this.changed$.next('contractor');
  }

  getSelectionArray(type: FilterType): string[] {
    switch (type) {
      case 'contractor': return this.selectedContractorIds;
      case 'ring': return this.selectedRingIds;
      case 'project': return this.selectedProjectIds;
      case 'phase': return this.selectedPhaseIds;
      case 'status': return this.selectedStatusIds;
      case 'trenching': return this.selectedTrenchingIds;
      default: return [];
    }
  }

  getOptionsArray(type: FilterType): string[] {
    switch (type) {
      case 'contractor': return this.contractorOptions;
      case 'ring': return this.ringOptions;
      case 'project': return this.projectOptions;
      case 'phase': return this.phaseOptions;
      case 'status': return this.statusOptions;
      case 'trenching': return this.trenchingOptions;
      default: return [];
    }
  }

  private syncSelectionLabel(type: FilterType): void {
    const arr = this.getSelectionArray(type);
    const opts = this.getOptionsArray(type);
    const label = (allLabel: string) =>
      arr.length === 0 || arr.length === opts.length
        ? allLabel
        : arr.length === 1
          ? arr[0]
          : `${arr.length} selected`;
    switch (type) {
      case 'contractor': this.selectedContractor = label('All Contractors'); break;
      case 'ring': this.selectedRing = label('All Rings'); break;
      case 'project': this.selectedProject = label('All Projects'); break;
      case 'phase': this.selectedPhase = label('All Phases'); break;
      case 'status': this.selectedStatus = label('All Status'); break;
      case 'trenching': this.selectedTrenching = label('All Trenching Types'); break;
    }
  }

  /** Number of active (non-"All") filters — drives the mobile trigger badge. */
  get activeFilterCount(): number {
    let count = 0;
    if (this.selectedContractor !== 'All Contractors') count++;
    if (this.selectedRing !== 'All Rings') count++;
    if (this.selectedProject !== 'All Projects') count++;
    if (this.selectedPhase !== 'All Phases') count++;
    if (this.trenchingOptions.length && this.selectedTrenching !== 'All Trenching Types') count++;
    return count;
  }

  // ── Phase resolution ────────────────────────────────────────────────────

  /** All phase ids (numeric) that currently have cached segment geometry. */
  private allPhaseIdsWithGeometry(): number[] {
    const ids: number[] = [];
    for (const raw of this.phaseNameToId.values()) {
      const id = Number(raw);
      if (Number.isFinite(id) && !ids.includes(id)) ids.push(id);
    }
    return ids;
  }

  /**
   * Numeric phase ids to load segments for. The backend is phase-scoped, so a
   * caller fetches one request per id and merges. No phase selected (or all
   * selected) = "all phases" → every phase that has geometry. Otherwise, the
   * selected phase names that resolve to a numeric id (names without geometry
   * are skipped).
   */
  getSelectedPhaseIds(): number[] {
    const names = this.selectedPhaseIds;
    if (names.length === 0 || names.length === this.phaseOptions.length) {
      return this.allPhaseIdsWithGeometry();
    }
    const ids: number[] = [];
    for (const name of names) {
      const raw = this.phaseNameToId.get(name.trim().toLowerCase());
      if (raw == null) continue; // phase without segment geometry
      const id = Number(raw);
      if (Number.isFinite(id) && !ids.includes(id)) ids.push(id);
    }
    return ids;
  }

  /** True when the user picked specific phases rather than leaving it at "all". */
  get hasExplicitPhaseSelection(): boolean {
    const n = this.selectedPhaseIds.length;
    return n > 0 && n < this.phaseOptions.length;
  }

  /** Numeric id for a single named phase, or null when it has no geometry. */
  phaseIdForName(phaseName: string): number | null {
    const raw = this.phaseNameToId.get(phaseName.trim().toLowerCase());
    if (raw == null) return null;
    const id = Number(raw);
    return Number.isFinite(id) ? id : null;
  }

  /** True when at least one selected phase has segment data to show. */
  get isSinglePhaseSelected(): boolean {
    return this.getSelectedPhaseIds().length > 0;
  }

  /** Specific phases chosen, but none of them have cached segment geometry. */
  get selectedPhaseUnavailable(): boolean {
    return this.hasExplicitPhaseSelection && this.getSelectedPhaseIds().length === 0;
  }

  /** Phase names that actually have segment geometry (for hints and folders). */
  get availablePhaseNames(): string[] {
    return this.phaseOptions.filter((n) => this.phaseNameToId.has(n.trim().toLowerCase()));
  }

  // ── Contractor / trenching helpers ──────────────────────────────────────

  /** Normalise a contractor name for matching (case/space/dash-insensitive). */
  normContractor(name: string | null | undefined): string {
    return String(name || '').trim().toUpperCase().replace(/\s+/g, '').replace(/[-_]/g, '');
  }

  /**
   * Comma-joined selected contractor names to send to the API, or undefined
   * when the filter is "all" (none or every option selected) → server returns
   * every contractor.
   */
  selectedContractorsParam(): string | undefined {
    const ids = this.selectedContractorIds;
    if (ids.length === 0 || ids.length === this.contractorOptions.length) return undefined;
    return ids.join(',');
  }

  /**
   * Selected contractors as a normalised Set, or null when the filter is
   * "all" (nothing selected, or every option selected) → show every contractor.
   */
  selectedContractorSet(): Set<string> | null {
    const ids = this.selectedContractorIds;
    if (ids.length === 0 || ids.length === this.contractorOptions.length) return null;
    return new Set(ids.map((c) => this.normContractor(c)));
  }

  /**
   * Selected trenching types as a Set, or null when "all" (none or every option
   * selected) → show every trenching type. Also null when no options exist
   * (e.g. a non-Trenching phase) so those segments aren't hidden.
   */
  selectedTrenchingSet(): Set<string> | null {
    const ids = this.selectedTrenchingIds;
    if (
      this.trenchingOptions.length === 0 ||
      ids.length === 0 ||
      ids.length === this.trenchingOptions.length
    ) {
      return null;
    }
    return new Set(ids);
  }

  /** Rebuild the trenching-type dropdown options from loaded segments. */
  refreshTrenchingOptions(res: RoutesSegmentsPhaseWiseResponse): void {
    const found = new Set<string>();
    for (const route of res.routes || []) {
      for (const phase of route.phases || []) {
        for (const segment of phase.segments || []) {
          const t = (segment.trenchingTypeName ?? '').trim();
          if (t) found.add(t);
        }
      }
    }
    this.trenchingOptions = Array.from(found).sort((a, b) => a.localeCompare(b));
    // Drop any stale selections no longer present in the data.
    this.selectedTrenchingIds = this.selectedTrenchingIds.filter((s) => found.has(s));
    this.syncSelectionLabel('trenching');
  }

  /** Ring/link/phase filter params for the KPI + summary endpoints. */
  buildFilterParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (
      this.selectedContractorIds.length > 0 &&
      this.selectedContractorIds.length < this.contractorOptions.length
    ) {
      params['contractorIds'] = this.selectedContractorIds.join(',');
    }
    // Ring dropdown holds names — translate to server ring ids.
    if (this.selectedRingIds.length > 0 && this.selectedRingIds.length < this.ringOptions.length) {
      params['ringIds'] = this.selectedRingIds
        .map((name) => this.ringNameToId.get(name.trim().toLowerCase()) || name)
        .join(',');
    }
    // Link dropdown holds names — translate to server link ids.
    if (
      this.selectedProjectIds.length > 0 &&
      this.selectedProjectIds.length < this.projectOptions.length
    ) {
      params['linkIds'] = this.selectedProjectIds
        .map((name) => this.linkNameToId.get(name.trim().toLowerCase()) || name)
        .join(',');
      // A link id alone is ambiguous — scope by the selected links' rings.
      if (!params['ringIds']) {
        const linkRings = Array.from(
          new Set(
            this.selectedProjectIds
              .map((name) => this.linkNameToRingId.get(name.trim().toLowerCase()))
              .filter((r): r is string => !!r)
          )
        );
        if (linkRings.length) params['ringIds'] = linkRings.join(',');
      }
    }
    if (this.selectedPhaseIds.length > 0 && this.selectedPhaseIds.length < this.phaseOptions.length) {
      params['phaseIds'] = this.selectedPhaseIds.join(',');
    }
    return params;
  }

  /** Numeric id for a filter that has exactly one selection, else null (all). */
  singleSelectedId(names: string[], map: Map<string, string>): string | null {
    if (names.length !== 1) return null;
    return map.get(names[0].trim().toLowerCase()) ?? null;
  }
}
