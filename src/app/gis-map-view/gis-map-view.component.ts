import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import type {
  Feature as GeoJsonFeature,
  FeatureCollection as GeoJsonFeatureCollection,
} from 'geojson';
import { environment } from '../../environments/environment';
import esriConfig from '@arcgis/core/config.js';
import ArcGISMap from '@arcgis/core/Map.js';
import Color from '@arcgis/core/Color.js';
import ColorBackground from '@arcgis/core/webmap/background/ColorBackground.js';
import MapView from '@arcgis/core/views/MapView.js';
import Extent from '@arcgis/core/geometry/Extent.js';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils.js';
import type Layer from '@arcgis/core/layers/Layer.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point.js';
import Search from '@arcgis/core/widgets/Search.js';
import SearchSource from '@arcgis/core/widgets/Search/SearchSource.js';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol.js';
import {
  getKpiDimensions,
  getDashboardSummary,
  getPhaseKpiSummary,
  getRoutesSegmentsPhaseWise,
  exportRoutesKml,
  type KpiDimensionsResponse,
  type DashboardSummaryResponse,
  type PhaseKpiSummaryResponse,
  type PhaseSegment,
  type RoutesSegmentsPhaseWiseResponse,
} from '../dashboard.service';
import {
  countGeoJsonFeatures,
  countVisibleFeatures,
  filterGeoJsonByRing,
  toLeafletGeoJsonObject,
} from '../map-geojson';
import { MapDataService, ROLLOUT_MAP_CONTRACTOR_CODES } from '../services/map-data.service';
import {
  createRolloutBasemap,
  mapViewBackgroundColorForBasemap,
  ROLLOUT_BASEMAP_OPTIONS,
  type RolloutBasemapId,
} from '../esri-basemap';
import {
  createSegmentGraphicsLayer,
  createOmanReferenceLabelsLayer,
  createPointGeoJsonLayer,
  segmentPolylineGraphic,
} from '../esri-map-layers';
import { SegmentMediaService } from '../services/segment-media.service';
import { TopbarActionsService } from '../shared/components/topbar-actions.service';
import { upstreamApi, UpstreamSegmentsUnavailableError } from '../services/upstream-api.service';
import {
  createTelecomRouteGraphicsLayer,
} from '../map/telecom-route-renderer';
import {
  splitPmsGeoJsonPayload,
  filterSplitForMap,
  countSplitFeatures,
  mergeSplitLayers,
  type SplitGeoJsonLayers,
} from '../map/map-geojson-pipeline';
import {
  countRenderableLinePaths,
} from '../map/telecom-route-renderer';
import {
  OMAN_CENTER,
  OMAN_DEFAULT_ZOOM,
  OMAN_EXTENT,
  OMAN_VIEW_CONSTRAINTS,
} from '../map/oman-map-config';
import {
  extentFromFeatureCollection,
  extentFromGraphicsLayer,
  fitMapViewToLayers,
  goToDefaultOmanView,
} from '../map/map-view-fit';
import { DashboardFilterState } from '../shared/filters/dashboard-filter-state';
import type { ViewerImage } from '../gallery-view/gallery.types';

interface KpiCard {
  label: string;
  value: string;
  unit: string;
  percentage?: string;
  color: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface LinkDetail {
  status: string;
  linkName: string;
  ring: string;
  phase: string;
  workType: string;
  contractor: string;
  plannedLength: string;
  deployedLength: string;
  progress: number;
}

interface SegmentDetail {
  range: string;
  type: string;
  startPoint: string;
  endPoint: string;
  length: string;
  capturedOn: string;
  takenBy: string;
}

interface BottomStatusItem {
  label: string;
  value: string;
  sub?: string;
}

@Component({
  selector: 'app-gis-map-view',
  templateUrl: './gis-map-view.component.html',
  styleUrls: ['./gis-map-view.component.css'],
})
export class GisMapViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapHost', { static: false }) mapHostRef!: ElementRef<HTMLDivElement>;
  @ViewChild('mapSearchHost', { static: false }) mapSearchHostRef!: ElementRef<HTMLDivElement>;
  // The element that goes fullscreen — the whole map card, so the controls,
  // search box and legend come along with the map.
  @ViewChild('mapContainer', { static: false }) mapContainerRef!: ElementRef<HTMLDivElement>;

  // ── ArcGIS map state ──
  private map: ArcGISMap | null = null;
  private mapView: MapView | null = null;
  private segmentGraphicsLayer!: GraphicsLayer;
  private esriOperationalLayers: Layer[] = [];
  private mapGeoJsonObjectUrls: string[] = [];
  private zoomWatchHandle: { remove(): void } | null = null;
  private mapClickHandle: { remove(): void } | null = null;
  private mapResizeObserver: ResizeObserver | null = null;
  private searchWidget: Search | null = null;
  // Marker features currently drawn on the map — the corpus the Search widget's
  // "Markers" source suggests from. Markers render as a blob-URL GeoJSONLayer
  // (no queryable graphics), so the search reads the source features instead.
  private searchableMarkers: GeoJsonFeature[] = [];
  // Marker points start hidden on login, like the old dashboard — the user
  // opts in via the map's Show Markers button. The layer is rebuilt on every
  // filter change, so the choice is kept here and re-applied.
  showMarkers = false;
  private mapSyncGeneration = 0;
  private mapFitInFlight = false;
  // Basemap is user-switchable via the Layers button, so the template reads it.
  mapBasemapStyle: RolloutBasemapId = 'imagery-hybrid';
  readonly basemapOptions = ROLLOUT_BASEMAP_OPTIONS;
  basemapMenuOpen = false;

  // ── My Location / Fullscreen ──
  locating = false;
  isFullscreen = false;
  /** Transient notice under the map (permission denied, unsupported, …). */
  mapToast = '';
  private mapToastTimer: ReturnType<typeof setTimeout> | null = null;
  private locationLayer: GraphicsLayer | null = null;
  private fullscreenListener: (() => void) | null = null;
  mapLoading = true;
  mapError = '';
  mapInfo = '';
  mapSelectedFeatureProps: Record<string, string> | null = null;

  // Panel state
  detailsPanelOpen = false;

  // Tabs (Activity Log / Documents hidden for now)
  tabs = ['Overview', 'Photos'];
  selectedTab = 'Photos';
  // Key/value rows shown in the Overview tab, built from segment + proof data.
  overviewRows: Array<{ label: string; value: string }> = [];
  photosCount = 8;
  currentPhotoIndex = 1;

  // ── Filters ──
  // Contractor / Ring / Project / Phase / Trenching selections, the cascade
  // between them and the name → id maps all live in the shared state so the
  // Gallery behaves identically. The markup is <app-filter-bar layout="drawer">.
  readonly filters = new DashboardFilterState();
  private filterSub: Subscription | null = null;
  private readonly closeMenusBound = () => {
    if (!this.showExportMenu && !this.basemapMenuOpen) return;
    this.showExportMenu = false;
    this.basemapMenuOpen = false;
  };

  // Filter selections are staged locally and only pushed to the map + KPIs
  // when "Apply" is clicked. `applyingFilters` drives the in-button spinner.
  applyingFilters = false;

  // ── Export KMZ state ──
  showExportMenu = false;
  exportingKml = false;
  exportIncludeMarkers = false;
  // null = All, 'APPROVED' = Approved Only, 'IN_PROGRESS' = In Progress Only.
  exportStatusFilter: 'APPROVED' | 'IN_PROGRESS' | null = null;

  // ── Segment layer state ──
  // Segments are drawn for every selected phase that has geometry (or all such
  // phases when none/all are selected). `segmentLoadToken` guards against a
  // slower earlier load overwriting a newer one when the selection changes.
  private segmentLoadToken = 0;
  // Last merged phase response, kept so a contractor-filter change can re-render
  // instantly without re-fetching every phase.
  private lastSegmentResponse: RoutesSegmentsPhaseWiseResponse | null = null;

  // KPI cards
  kpiCards: KpiCard[] = [
    { label: 'Total Length', value: '0', unit: 'km', color: '#f97316' },
    { label: 'Deployed', value: '0', unit: 'km', percentage: '0%', color: '#10b981' },
    { label: 'In Progress', value: '0', unit: 'km', percentage: '0%', color: '#f59e0b' },
    { label: 'Completed', value: '0', unit: 'km', percentage: '0%', color: '#10b981' },
    { label: 'Blocked', value: '0', unit: 'km', percentage: '0%', color: '#ef4444' },
    { label: 'Rings', value: '0', unit: 'Active', color: '#8b5cf6' },
  ];

  // Link details (right panel)
  selectedLink: LinkDetail = {
    status: 'In Progress',
    linkName: 'R2-LINK-03',
    ring: 'Northern Ring',
    phase: 'Phase 2',
    workType: 'Ducting',
    contractor: 'BPT',
    plannedLength: '16.2 km',
    deployedLength: '12.7 km',
    progress: 78,
  };

  // Segment details
  segment: SegmentDetail = {
    range: '12.7 - 12.9 km',
    type: 'Ducting',
    startPoint: '23.5881° N, 58.3829° E',
    endPoint: '23.5912° N, 58.3901° E',
    length: '0.2 km',
    capturedOn: '2025-03-15, 10:30 AM',
    takenBy: 'Ahmed Al-Rashid',
  };

  // Photo gallery — populated from feature data
  photos: string[] = [];
  /** `photos` wrapped for the full-screen viewer, rebuilt whenever they load. */
  photoTiles: ViewerImage[] = [];

  // ── Full-screen photo viewer (zoom / pan) ──
  // The same component the Gallery uses. While it is open the Link Details
  // panel is hidden rather than sitting under a full-screen overlay; closing
  // the viewer (or its "Detail" button) brings the panel back.
  viewerOpen = false;
  viewerIndex = 0;

  // Legend items
  legendItems = [
    { label: 'Completed', color: '#10b981', dashed: false },
    { label: 'In Progress', color: '#3b82f6', dashed: false },
    { label: 'Planned', color: '#94a3b8', dashed: true },
    { label: 'Blocked', color: '#ef4444', dashed: false },
    { label: 'Not Started', color: '#64748b', dashed: false },
  ];

  // Bottom status bar
  bottomStatus: BottomStatusItem[] = [
    { label: 'Rings', value: '0/0', sub: 'Active' },
    { label: 'Links', value: '0/0', sub: 'Active' },
    { label: 'Phases', value: '0/0', sub: 'Active' },
    { label: 'POP/Hubs', value: '0' },
    { label: 'Closures', value: '0' },
  ];

  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private mapDataService: MapDataService,
    private segmentMedia: SegmentMediaService,
    private topbar: TopbarActionsService,
  ) {}

  ngOnInit(): void {
    document.addEventListener('click', this.closeMenusBound);
    // The page has no header of its own any more, so Export KMZ hangs off the
    // breadcrumb bar for as long as this page is mounted.
    this.topbar.register({
      id: 'gis-export-kmz',
      label: 'Export KMZ',
      iconPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
      run: (event) => this.toggleExportMenu(event),
      running: () => this.exportingKml,
    });
    this.bindFullscreenListener();
    // Segments are phase-gated, so a phase change refreshes the layer without
    // waiting for Apply. Contractor is filtered server-side → refetch too.
    // Trenching-type is client-side only, so re-render the cached response.
    this.filterSub = this.filters.changed$.subscribe((type) => {
      if (type === 'phase' || type === 'contractor') {
        this.maybeLoadSegments();
      } else if (type === 'trenching' && this.lastSegmentResponse) {
        this.renderSegments(this.lastSegmentResponse);
      }
    });
    void this.filters.loadFilters().then(() => this.applyPhaseFromQuery());
    this.loadDynamicData();
  }

  /**
   * Preselect a phase handed over by another screen (the Gallery's "Open in GIS
   * Map"). Runs after loadFilters so the phase name has an option to match.
   */
  private applyPhaseFromQuery(): void {
    const phase = this.route.snapshot.queryParamMap.get('phase');
    if (phase) this.filters.selectOnlyPhase(phase);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 100);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeMenusBound);
    this.topbar.remove('gis-export-kmz');
    if (this.fullscreenListener) {
      document.removeEventListener('fullscreenchange', this.fullscreenListener);
      this.fullscreenListener = null;
    }
    if (this.mapToastTimer) clearTimeout(this.mapToastTimer);
    // Leaving the screen while the map is fullscreen would otherwise strand the
    // browser in fullscreen on a destroyed element.
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      void document.exitFullscreen().catch(() => { /* already exiting */ });
    }
    this.filterSub?.unsubscribe();
    this.zoomWatchHandle?.remove();
    this.mapClickHandle?.remove();
    this.mapResizeObserver?.disconnect();
    this.searchWidget?.destroy();
    this.searchWidget = null;
    this.clearEsriGeoJsonLayers();
    if (this.mapView) {
      this.mapView.destroy();
      this.mapView = null;
    }
    if (this.map) {
      this.map.destroy();
      this.map = null;
    }
  }

  // ── ArcGIS Map Initialization ──

  private async initMap(): Promise<void> {
    const host = this.mapHostRef?.nativeElement;
    if (!host) {
      console.warn('[gis-map] Map host element not found');
      return;
    }

    this.mapLoading = true;
    this.mapError = '';

    try {
      // Widget icons (Search's magnifier) load from the copied Esri assets
      // rather than the CDN — same path the old dashboard uses.
      esriConfig.assetsPath = './assets/arcgis';
      // Esri API key for basemaps/services — same wiring as the old dashboard.
      if (environment.arcgisApiKey) {
        try {
          esriConfig.apiKey = environment.arcgisApiKey;
        } catch (e) {
          console.warn('[gis-map] esriConfig.apiKey set failed', e);
        }
      }

      this.map = new ArcGISMap({
        basemap: createRolloutBasemap(this.mapBasemapStyle),
      });
      this.segmentGraphicsLayer = createSegmentGraphicsLayer('Segment detail');
      this.map.add(this.segmentGraphicsLayer);

      this.mapView = new MapView({
        container: host,
        map: this.map,
        center: [...OMAN_CENTER],
        zoom: OMAN_DEFAULT_ZOOM,
        constraints: { ...OMAN_VIEW_CONSTRAINTS },
        popup: { dockEnabled: true, dockOptions: { position: 'bottom-right' as any } },
        background: new ColorBackground({
          color: mapViewBackgroundColorForBasemap(this.mapBasemapStyle),
        }),
        qualityProfile: 'medium',
        navigation: { mouseWheelZoomEnabled: true, browserTouchPanEnabled: true },
      } as any);

      await this.mapView.when();
      this.mapDataService.setMapReady(true);
      this.setupMarkerSearch();

      // Preload all contractor routes
      this.mapDataService.preloadRolloutContractors([...ROLLOUT_MAP_CONTRACTOR_CODES]);

      // Watch zoom changes — re-enters Angular so the zoom buttons' disabled
      // states (canZoomIn / canZoomOut) refresh as the level changes.
      this.zoomWatchHandle = reactiveUtils.watch(
        () => this.mapView?.zoom,
        () => {
          if (this.mapView) {
            this.ngZone.run(() => {});
          }
        }
      );

      // Handle map clicks — show feature properties
      this.mapClickHandle = this.mapView.on('click', (event) => {
        // No phase with geometry → no segment layer and no details panel at all.
        if (this.filters.getSelectedPhaseIds().length === 0) return;
        void this.mapView!.hitTest(event).then((response) => {
          const hit = response.results.find((h) => h.type === 'graphic') as
            | { type: 'graphic'; graphic: Graphic }
            | undefined;
          const graphic = hit?.graphic;
          const attrs = graphic?.attributes as Record<string, unknown> | undefined;
          if (!attrs || typeof attrs !== 'object') return;
          const keys = Object.keys(attrs).filter((k) => !k.startsWith('OBJECTID'));
          if (!keys.length) return;
          this.ngZone.run(() => {
            if (attrs['_isSegment']) {
              this.selectSegment(attrs);
            } else {
              this.mapSelectedFeatureProps = this.flattenGeoProps(attrs);
              this.populateLinkDetailsFromFeature(attrs);
              this.detailsPanelOpen = true;
            }
          });
        });
      });

      // Observe container resize
      this.mapResizeObserver = new ResizeObserver(() => {
        if (this.mapView) {
          (this.mapView as any).resize?.();
        }
      });
      this.mapResizeObserver.observe(host);

      // Load routes on map
      await this.syncMapGeoJsonLayer();

      // A phase handed over in the URL (Gallery → "Open in GIS Map") can be
      // selected before the segment layer exists, in which case its fetch had
      // nothing to draw into. Draw it now.
      //
      // Gated on an explicit selection: with none, getSelectedPhaseIds()
      // returns *every* phase with geometry, and each uncached one costs ~60s
      // upstream — not something to spend on every page load.
      if (this.filters.hasExplicitPhaseSelection) this.maybeLoadSegments();
    } catch (err) {
      console.error('[gis-map] Map init failed:', err);
      this.mapError = 'Failed to initialize map. Check console for details.';
    } finally {
      this.mapLoading = false;
    }
  }

  // ── Marker search ──

  /** Marker display name, matching the counters' `properties.name` field. */
  private markerName(feature: GeoJsonFeature | null | undefined): string {
    const props = feature?.properties as Record<string, unknown> | null | undefined;
    return String(props?.['name'] ?? '').trim();
  }

  /** First [lon, lat] pair of a marker feature, or null when it has no point. */
  private markerCoord(feature: GeoJsonFeature): [number, number] | null {
    const geom = feature?.geometry as { type?: string; coordinates?: unknown } | null;
    let coords: unknown = geom?.coordinates;
    // MultiPoint / nested rings — walk down to the first numeric pair.
    while (Array.isArray(coords) && Array.isArray(coords[0])) coords = coords[0];
    if (!Array.isArray(coords) || typeof coords[0] !== 'number' || typeof coords[1] !== 'number') {
      return null;
    }
    return [coords[0], coords[1]];
  }

  /**
   * ArcGIS Search widget over the marker layer — same widget, sources shape and
   * placeholder as the old dashboard, so it carries the stock Esri magnifier
   * icon. Hosted in its own container beside the zoom stack rather than
   * `view.ui` "top-left", which the custom map controls already occupy.
   */
  private setupMarkerSearch(): void {
    const view = this.mapView;
    const container = this.mapSearchHostRef?.nativeElement;
    if (!view || !container || this.searchWidget) return;

    this.searchWidget = new Search({
      view,
      container,
      includeDefaultSources: false,
      locationEnabled: false,
      popupEnabled: true,
      // A SearchSource instance, NOT a plain object: an object literal with no
      // `url`/`layer` autocasts to LocatorSearchSource, whose own search()
      // never reaches these handlers — suggestions appear but picking one does
      // nothing. (The old dashboard's literal has that same latent bug.)
      sources: [
        new SearchSource({
          name: 'Markers',
          placeholder: 'Search marker...',
          // Constructing SearchSource directly leaves these null, and a null
          // autoNavigate means picking a result does not move the map.
          autoNavigate: true,
          popupEnabled: true,
          resultGraphicEnabled: true,
          zoomScale: 4000,
          maxResults: 1,
          maxSuggestions: 6,
          // The popup is built from the SOURCE's template — SearchViewModel
          // rebuilds the result graphic and drops whatever template the graphic
          // carried, so setting it on the graphic alone shows nothing.
          popupTemplate: new PopupTemplate({
            title: '{name}',
            content: (evt: any) =>
              this.buildMarkerPopupHtml(evt?.graphic?.attributes as Record<string, unknown>),
          }),

          getSuggestions: (params: any) => {
            const term = String(params.suggestTerm ?? '').toLowerCase();
            const results = this.searchableMarkers
              .filter((f) => this.markerName(f).toLowerCase().includes(term))
              .slice(0, 6)
              .map((f) => ({
                // `key` is what the widget carries back into getResults when a
                // suggestion is picked — without it the SuggestResult arrives
                // blank and nothing is found.
                key: this.markerName(f),
                text: this.markerName(f),
                sourceIndex: params.sourceIndex,
              }));
            return Promise.resolve(results);
          },

          getResults: (params: any) => {
            // Three ways in, all of which land here:
            //  - a picked suggestion  → `suggestResult.key` is the exact name
            //  - Enter on a full name → `suggestResult.text` is the exact name
            //  - Enter on partial text → neither matches, so fall back to the
            //    first marker containing the term.
            // `params` carries no search term of its own, so the widget's is
            // the only source for the last case.
            const picked = String(
              params.suggestResult?.key ?? params.suggestResult?.text ?? ''
            ).trim();
            const term =
              picked ||
              String(
                params.searchTerm ?? params.suggestTerm ?? this.searchWidget?.searchTerm ?? ''
              ).trim();
            const feature =
              (picked
                ? this.searchableMarkers.find((f) => this.markerName(f) === picked)
                : undefined) ??
              (term
                ? this.searchableMarkers.find((f) =>
                    this.markerName(f).toLowerCase().includes(term.toLowerCase())
                  )
                : undefined);
            const coord = feature ? this.markerCoord(feature) : null;
            if (!feature || !coord) return Promise.resolve([]);

            const name = this.markerName(feature);
            const graphic = new Graphic({
              geometry: new Point({ longitude: coord[0], latitude: coord[1] }),
              attributes: (feature.properties ?? {}) as Record<string, unknown>,
            });

            // SearchViewModel navigates on `result.target || result.extent` and
            // ignores the feature's own geometry, so a result carrying neither
            // just sits there. It passes the value straight to goTo() without a
            // scale, so a bare point would recentre at the current zoom — hand
            // it a small extent instead and the map actually zooms to the marker.
            const pad = 0.0025; // ≈250 m, ≈ zoom 16
            const extent = new Extent({
              xmin: coord[0] - pad,
              xmax: coord[0] + pad,
              ymin: coord[1] - pad,
              ymax: coord[1] + pad,
              spatialReference: { wkid: 4326 },
            });

            return Promise.resolve([{ feature: graphic, extent, name }]);
          },
        } as any),
      ],
    } as any);
  }

  /** Simple key/value popup for a searched marker. */
  private buildMarkerPopupHtml(props: Record<string, unknown> | null | undefined): string {
    const rows = Object.entries(props ?? {})
      .filter(([, v]) => v !== null && v !== undefined && String(v) !== '')
      .map(([k, v]) => `<tr><td style="padding:2px 8px 2px 0;color:#64748b">${k}</td>` +
        `<td style="padding:2px 0">${String(v)}</td></tr>`)
      .join('');
    return rows ? `<table style="font-size:12px">${rows}</table>` : 'No attributes';
  }

  // ── Load & render GeoJSON routes (mirrors app.component logic) ──

  private async syncMapGeoJsonLayer(): Promise<void> {
    if (!this.mapView || !this.map) return;

    const syncId = ++this.mapSyncGeneration;
    // Map features carry numeric ring/link ids — translate the selected names
    // so the filter actually matches (otherwise features fall through as "all").
    const ringSelName = this.filters.selectedRingIds.length > 0 && this.filters.selectedRingIds.length < this.filters.ringOptions.length
      ? this.filters.selectedRingIds[0] : 'ALL';
    const projectSelName = this.filters.selectedProjectIds.length > 0 && this.filters.selectedProjectIds.length < this.filters.projectOptions.length
      ? this.filters.selectedProjectIds[0] : 'ALL';
    // Link ids repeat across contractors (projectId 90 is a BPT link and an
    // MHD link), so with no ring picked scope the link by its own ring.
    const linkRingId = projectSelName === 'ALL'
      ? undefined
      : this.filters.linkNameToRingId.get(projectSelName.trim().toLowerCase());
    const ringSel = ringSelName === 'ALL'
      ? (linkRingId || 'ALL')
      : (this.filters.ringNameToId.get(ringSelName.trim().toLowerCase()) || ringSelName);
    const projectSel = projectSelName === 'ALL'
      ? 'ALL'
      : (this.filters.linkNameToId.get(projectSelName.trim().toLowerCase()) || projectSelName);

    this.mapLoading = true;
    this.mapError = '';
    this.mapInfo = '';
    this.mapSelectedFeatureProps = null;
    this.segmentGraphicsLayer?.removeAll();

    let mergedSplit: SplitGeoJsonLayers = {
      routes: { type: 'FeatureCollection', features: [] },
      routeElements: { type: 'FeatureCollection', features: [] },
      markers: { type: 'FeatureCollection', features: [] },
      regions: { type: 'FeatureCollection', features: [] },
    };

    try {
      const contractors = this.getSelectedContractorCodes();

      // Load routes — if multiple contractors selected, load each and merge
      mergedSplit = {
        routes: { type: 'FeatureCollection', features: [] },
        routeElements: { type: 'FeatureCollection', features: [] },
        markers: { type: 'FeatureCollection', features: [] },
        regions: { type: 'FeatureCollection', features: [] },
      };

      if (contractors.length === 0) {
        // All contractors — load without contractor filter
        const loadResult = await this.mapDataService.loadRoutes(undefined, undefined, { useCache: true });
        if (syncId !== this.mapSyncGeneration) return;
        if (loadResult.data != null) {
          mergedSplit = splitPmsGeoJsonPayload(loadResult.data);
        }
      } else {
        // Load each selected contractor and merge
        const loadPromises = contractors.map((c) =>
          this.mapDataService.loadRoutes(c, { contractor: c }, { useCache: true })
            .then((r) => r.data)
            .catch(() => null)
        );
        const results = await Promise.all(loadPromises);
        if (syncId !== this.mapSyncGeneration) return;

        for (const data of results) {
          if (data == null) continue;
          const split = splitPmsGeoJsonPayload(data);
          mergedSplit = mergeSplitLayers(mergedSplit, split);
        }
      }

      // The bundled per-contractor GeoJSON carried routes, route elements and
      // markers in ONE file, so splitting the routes payload was enough. The
      // contractor API serves them as three separate endpoints — /routes
      // returns line geometry only — so markers and elements have to be
      // fetched alongside, or POP/Hubs and Closures stay at 0.
      // No-op in local-asset mode: those loaders return empty collections.
      const overlayTargets = contractors.length ? contractors : [undefined];
      const overlays = await Promise.all(
        overlayTargets.flatMap((c) => [
          this.mapDataService
            .loadRouteElements(c, c ? { contractor: c } : undefined, { useCache: true })
            .catch(() => null),
          this.mapDataService
            .loadMarkers(c, c ? { contractor: c } : undefined, { useCache: true })
            .catch(() => null),
        ])
      );
      if (syncId !== this.mapSyncGeneration) return;
      for (const overlay of overlays) {
        if (overlay == null) continue;
        mergedSplit = mergeSplitLayers(mergedSplit, splitPmsGeoJsonPayload(overlay));
      }

      if (mergedSplit.routes.features.length === 0 &&
          mergedSplit.routeElements.features.length === 0 &&
          mergedSplit.markers.features.length === 0) {
        this.mapError = 'No route data available for the selected filters.';
        this.clearEsriGeoJsonLayers();
        return;
      }

      const filteredSplit = filterSplitForMap(mergedSplit, ringSel, projectSel);
      this.updateMarkerCounters(filteredSplit.markers);
      this.searchableMarkers = filteredSplit.markers.features ?? [];
      const splitCounts = countSplitFeatures(filteredSplit);
      const routeRenderCounts = countRenderableLinePaths(filteredSplit.routes);

      const { layers: nextLayers, objectUrls: nextUrls } =
        await this.buildOperationalLayers(filteredSplit);
      if (syncId !== this.mapSyncGeneration) {
        for (const layer of nextLayers) layer.destroy();
        for (const url of nextUrls) URL.revokeObjectURL(url);
        return;
      }

      // Register the new blob URLs only after clearing: clearing revokes every
      // tracked URL, and the hidden marker layer doesn't fetch its URL until
      // it's toggled visible, so revoking it here left nothing to load.
      this.clearEsriGeoJsonLayers();
      this.mapGeoJsonObjectUrls.push(...nextUrls);
      for (const layer of nextLayers) {
        this.map!.add(layer);
        this.esriOperationalLayers.push(layer);
      }
      // Newly-added geojson layers draw on top by default and would hide the
      // segment detail lines — keep the segment layer above them.
      this.bringSegmentLayerToFront();

      console.table({
        contractors: contractors.length ? contractors.join(', ') : 'ALL',
        totalFeatures: routeRenderCounts.totalFeatures,
        renderedRoutes: routeRenderCounts.renderedRoutes,
        missingRoutes: routeRenderCounts.missingRoutes,
        geometryErrors: routeRenderCounts.geometryErrors,
      });

      this.mapInfo = splitCounts.total
        ? `Rendered ${splitCounts.routes} route features, ${splitCounts.routeElements} route elements, ${splitCounts.markers} markers.`
        : 'No map features match the current filters.';

      if (syncId === this.mapSyncGeneration) {
        try {
          await this.fitMapToLayers(extentFromFeatureCollection(filteredSplit.routes));
        } catch { /* best-effort zoom */ }
      }
    } catch (err: unknown) {
      if (syncId !== this.mapSyncGeneration) return;
      // Only show error if no routes were rendered
      if (mergedSplit.routes.features.length === 0) {
        const ax = err as { response?: { data?: { error?: string } }; message?: string };
        this.mapError =
          ax?.response?.data?.error ||
          ax?.message ||
          'Could not load map data. Check server logs.';
      } else {
        console.warn('[gis-map] Non-fatal map error:', err);
      }
    } finally {
      if (syncId === this.mapSyncGeneration) {
        this.mapLoading = false;
      }
    }
  }

  toggleMarkers(): void {
    this.showMarkers = !this.showMarkers;
    for (const layer of this.esriOperationalLayers) {
      if (layer.title === 'Marker points') layer.visible = this.showMarkers;
    }
  }

  private async buildOperationalLayers(
    filteredSplit: SplitGeoJsonLayers
  ): Promise<{ layers: Layer[]; objectUrls: string[] }> {
    const viewZoom = this.mapView?.zoom;
    const zoomArg = typeof viewZoom === 'number' && Number.isFinite(viewZoom) ? viewZoom : undefined;
    const built: Layer[] = [];
    const objectUrls: string[] = [];

    // No country-highlight polygon: the old dashboard drew none, and the
    // simplified outline spilled into UAE/Saudi and swallowed map clicks.

    // Reference labels
    built.push(createOmanReferenceLabelsLayer());

    // Telecom route graphics
    const routeLayer = await createTelecomRouteGraphicsLayer(
      filteredSplit.routes,
      'Routes',
      zoomArg
    );
    if (routeLayer) {
      built.push(routeLayer);
    }

    // Markers (blob-URL GeoJSONLayer — may fail)
    try {
      if (filteredSplit.markers.features.length) {
        const ptBuilt = createPointGeoJsonLayer(filteredSplit.markers, 'Marker points', true);
        if (ptBuilt) {
          ptBuilt.layer.visible = this.showMarkers;
          built.push(ptBuilt.layer);
          objectUrls.push(ptBuilt.objectUrl);
        }
      }
    } catch { /* non-critical overlay */ }

    return { layers: built, objectUrls };
  }

  private async fitMapToLayers(routeExtent: Extent | null): Promise<void> {
    const view = this.mapView;
    if (!view || this.mapFitInFlight) return;
    this.mapFitInFlight = true;
    try {
      const extentLayers = [...this.esriOperationalLayers];
      if (this.segmentGraphicsLayer?.graphics.length) {
        extentLayers.push(this.segmentGraphicsLayer);
      }
      const fitted = await fitMapViewToLayers(view, extentLayers, routeExtent);
      if (!fitted) {
        await goToDefaultOmanView(view);
      }
    } finally {
      this.mapFitInFlight = false;
      (this.mapView as any)?.resize?.();
    }
  }

  private clearEsriGeoJsonLayers(): void {
    for (const url of this.mapGeoJsonObjectUrls) {
      try { URL.revokeObjectURL(url); } catch { /* noop */ }
    }
    this.mapGeoJsonObjectUrls.length = 0;
    if (!this.map) return;
    for (const layer of this.esriOperationalLayers) {
      this.map.remove(layer);
      layer.destroy();
    }
    this.esriOperationalLayers = [];
  }

  /** Returns selected contractor codes, or empty array for "all". */
  private getSelectedContractorCodes(): string[] {
    if (this.filters.selectedContractorIds.length === 0 ||
        this.filters.selectedContractorIds.length === this.filters.contractorOptions.length) {
      return []; // all
    }
    return [...this.filters.selectedContractorIds];
  }

  // ── Segment layer ──

  /**
   * Loads the segment layer for every selected phase that has geometry (or all
   * such phases when none/all are selected); clears it (and closes the panel)
   * when nothing resolves. Safe to call on every phase-selection change.
   */
  private maybeLoadSegments(): void {
    const phaseIds = this.filters.getSelectedPhaseIds();
    if (phaseIds.length === 0) {
      this.segmentLoadToken++; // cancel any in-flight load
      this.lastSegmentResponse = null;
      this.segmentGraphicsLayer?.removeAll();
      this.closeDetailsPanel();
      return;
    }
    void this.loadSegmentsByPhases(phaseIds);
  }

  /**
   * How many phases may be fetched from the network in one load.
   *
   * Each uncached phase costs ~60s against the contractor API, and they must run
   * one at a time (concurrent calls are dropped outright). Upstream lists 27
   * phases, so an unbounded "all phases" load would queue ~27 minutes of
   * requests — the gateway never had this problem because its own list only
   * covered the handful of phases it had synced.
   *
   * Cached phases do not count toward the budget; they cost nothing.
   */
  private static readonly MAX_UNCACHED_PHASE_FETCHES = 3;

  /**
   * Split phases into what this load will fetch and what it will skip.
   *
   * Cached phases always render. Uncached ones are taken in order up to the
   * budget; the rest are returned as `skipped` so the UI can say so rather than
   * quietly showing a partial map.
   */
  private budgetPhaseLoads(phaseIds: number[]): { load: number[]; skipped: number[] } {
    if (!upstreamApi.enabled) return { load: phaseIds, skipped: [] };

    const load: number[] = [];
    const skipped: number[] = [];
    let budget = GisMapViewComponent.MAX_UNCACHED_PHASE_FETCHES;

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

  private async loadSegmentsByPhases(requestedPhaseIds: number[]): Promise<void> {
    const token = ++this.segmentLoadToken;
    const contractorIds = this.filters.selectedContractorsParam();
    const { load: phaseIds, skipped } = this.budgetPhaseLoads(requestedPhaseIds);
    try {
      // One request per phase (the endpoint is phase-scoped), awaited in
      // sequence rather than with Promise.all. In direct-upstream mode the
      // contractor API drops every connection when several of these overlap,
      // so a parallel fan-out loses phases that a serial one returns. Each
      // phase is rendered as it lands so the map fills in progressively
      // instead of staying blank until the slowest phase resolves.
      const merged: RoutesSegmentsPhaseWiseResponse = { routes: [] };
      const failures: unknown[] = [];

      for (const id of phaseIds) {
        let res: RoutesSegmentsPhaseWiseResponse | null = null;
        try {
          res = await getRoutesSegmentsPhaseWise(id, contractorIds);
        } catch (err) {
          failures.push(err);
        }
        // Abandon the rest if the selection changed while awaiting.
        if (token !== this.segmentLoadToken) return;
        if (res && Array.isArray(res.routes)) {
          merged.routes.push(...res.routes);
          this.lastSegmentResponse = merged;
          this.renderSegments(merged);
        }
      }

      this.lastSegmentResponse = merged;
      this.renderSegments(merged);
      this.reportSegmentLoad(failures, phaseIds.length, skipped, merged.routes.length);
      // Zoom to the segments so they're actually visible at any starting zoom.
      if (this.segmentGraphicsLayer?.graphics.length) {
        try {
          await this.fitMapToLayers(extentFromGraphicsLayer(this.segmentGraphicsLayer));
        } catch { /* best-effort */ }
      }
    } catch (err) {
      console.error('[gis-map] Segment load failed', err);
      if (token === this.segmentLoadToken) this.segmentGraphicsLayer?.removeAll();
    }
  }

  /**
   * Explain a partial load instead of leaving gaps that look like "no work
   * here". Covers both failures and phases skipped by the fetch budget — a
   * silent cap would read as "everything loaded".
   */
  private reportSegmentLoad(
    failures: unknown[],
    attempted: number,
    skipped: number[],
    loadedRoutes: number
  ): void {
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
          ? `Segment detail unavailable — ${detail}.`
          : `${failures.length} of ${attempted} phases failed — ${detail}.`
      );
      console.error('[gis-map] Segment load failures', failures);
    }

    if (skipped.length) {
      parts.push(
        `${skipped.length} more phase${skipped.length === 1 ? '' : 's'} not loaded ` +
          `(each takes ~60s upstream). Select specific phases to load them.`
      );
    }

    if (loadedRoutes) {
      parts.push(`Showing ${loadedRoutes} route${loadedRoutes === 1 ? '' : 's'}.`);
    }

    this.mapError = parts.join(' ');
  }

  private renderSegments(res: RoutesSegmentsPhaseWiseResponse | null): void {
    if (!this.segmentGraphicsLayer) return;
    this.segmentGraphicsLayer.removeAll();
    if (!res || !Array.isArray(res.routes)) return;

    this.filters.refreshTrenchingOptions(res);
    const contractorFilter = this.filters.selectedContractorSet();
    const trenchingFilter = this.filters.selectedTrenchingSet();
    const graphics: Graphic[] = [];
    for (const route of res.routes) {
      if (!route?.phases?.length) continue;
      // Skip routes whose contractor isn't in the current selection.
      if (contractorFilter && !contractorFilter.has(this.filters.normContractor(route.contractor))) continue;
      for (const phase of route.phases) {
        if (!phase?.segments?.length) continue;
        for (const segment of phase.segments) {
          // Skip segments whose trenching type isn't in the current selection.
          // Point phases (marker post / hand/man holes) never carry a trenching
          // type, so the filter would hide every one of their icons.
          if (trenchingFilter && !GisMapViewComponent.POINT_PHASE_ICONS[Number(segment.phaseId)]) {
            const t = (segment.trenchingTypeName ?? '').trim();
            if (!t || !trenchingFilter.has(t)) continue;
          }
          const g = this.buildSegmentGraphic(segment, phase.phaseName, route);
          if (g) graphics.push(g);
        }
      }
    }
    if (graphics.length) {
      this.segmentGraphicsLayer.addMany(graphics);
      this.bringSegmentLayerToFront();
    }
  }

  /** Keep the segment detail layer on top so it isn't hidden by base layers. */
  private bringSegmentLayerToFront(): void {
    if (!this.map || !this.segmentGraphicsLayer) return;
    try {
      this.map.reorder(this.segmentGraphicsLayer, this.map.layers.length - 1);
    } catch {
      /* best-effort; reorder can throw if the layer isn't attached yet */
    }
  }

  /** Rebuild the trenching-type dropdown options from the loaded segments. */
  private buildSegmentGraphic(
    segment: PhaseSegment,
    phaseName: string | null | undefined,
    route: { routeName?: string | null; contractor?: string | null }
  ): Graphic | null {
    if (segment.startLon == null || segment.startLat == null ||
        segment.endLon == null || segment.endLat == null) {
      return null;
    }
    // Stash the whole segment + parent context so the click handler needs no lookup.
    const attributes = {
      ...segment,
      _isSegment: true,
      phaseName: phaseName ?? (segment.phaseId != null ? `Phase ${segment.phaseId}` : ''),
      routeName: route.routeName ?? '',
      contractorName: route.contractor ?? '',
      seqNo: segment.seqNo ?? segment.id,
    };

    // Marker posts, hand holes and man holes are single installed items, not
    // lengths of work: draw an icon at the capture point, as the old dashboard
    // (pages/dashboard drawBackendSegment) did.
    const iconKind = GisMapViewComponent.POINT_PHASE_ICONS[Number(segment.phaseId)];
    if (iconKind) {
      return new Graphic({
        geometry: new Point({
          longitude: segment.startLon,
          latitude: segment.startLat,
          spatialReference: { wkid: 4326 },
        }),
        symbol: new PictureMarkerSymbol({
          url: `assets/icons/map/${iconKind}-${this.pointPhaseTone(segment.status)}.svg`,
          width: '22px',
          height: '22px',
          yoffset: '10px',
        }),
        attributes,
      });
    }

    // Colour the line by the segment's own statusColor hex (e.g. "#00FF00"
    // approved, "#00AAFF" PM-approved). Fall back to status-based defaults when
    // the upstream row has no colour.
    const color: [number, number, number, number] =
      this.hexToRgba(segment.statusColor) ??
      (segment.status === 'approved' ? [16, 185, 129, 255]   // green
        : [245, 158, 11, 255]);                              // amber
    const graphic = segmentPolylineGraphic(
      [
        [segment.startLon, segment.startLat],
        [segment.endLon, segment.endLat],
      ],
      color,
      3.5
    );
    graphic.attributes = attributes;
    return graphic;
  }

  /** Upstream phase id (GET /api/segments/phases) → icon in assets/icons/map. */
  private static readonly POINT_PHASE_ICONS: Readonly<Record<number, string>> = {
    7: 'marker-post',
    10: 'hand-hole',
    11: 'man-hole',
  };

  /**
   * Icon colour for a point-phase segment, same mapping as the old dashboard.
   * Anything unrecognised is orange ("not yet approved"), never green.
   */
  private pointPhaseTone(status: string | null | undefined): 'green' | 'orange' | 'red' {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
      case 'pm_rejected':
        return 'red';
      default: // submitted, pm_approved, unknown
        return 'orange';
    }
  }

  /** Parse a "#RGB"/"#RRGGBB" hex string into an [r,g,b,a] tuple, or null. */
  private hexToRgba(hex: string | null | undefined): [number, number, number, number] | null {
    if (!hex) return null;
    let h = hex.trim().replace(/^#/, '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return null;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return [r, g, b, 255];
  }

  /** A segment was clicked → load its proof images into the Photos tab. */
  private selectSegment(attrs: Record<string, unknown>): void {
    const id = attrs['id'];
    if (id == null) return;

    // Populate the details panel from the segment attributes.
    this.mapSelectedFeatureProps = this.flattenGeoProps(attrs);
    this.selectedLink = {
      status: String(attrs['statusName'] ?? attrs['status'] ?? '—'),
      linkName: `Segment #${attrs['seqNo'] ?? id}`,
      ring: String(attrs['ringName'] ?? ''),
      phase: String(attrs['phaseName'] ?? ''),
      workType: String(attrs['trenchingTypeName'] ?? ''),
      contractor: String(attrs['contractorName'] ?? attrs['contractor'] ?? ''),
      plannedLength: typeof attrs['lengthM'] === 'number'
        ? `${((attrs['lengthM'] as number) / 1000).toFixed(2)} km` : '—',
      deployedLength: '—',
      progress: 0,
    };

    this.photos = [];
    this.photoTiles = [];
    this.photosCount = 0;
    this.currentPhotoIndex = 0;
    this.viewerOpen = false;
    this.selectedTab = 'Photos';
    this.detailsPanelOpen = true;

    // Build the Overview from the segment's own attributes.
    this.overviewRows = this.buildOverviewRows(attrs);

    // Pass the segment's contractor so proofs are fetched from that
    // contractor's backend (segment ids collide across backends).
    const contractor = String(attrs['contractorName'] ?? attrs['contractor'] ?? '') || null;
    void this.segmentMedia.loadSegmentImages(id as string | number, contractor).then((urls) => {
      this.ngZone.run(() => {
        this.photos = urls;
        this.photosCount = urls.length;
        this.currentPhotoIndex = urls.length > 0 ? 1 : 0;
        this.buildPhotoTiles();
      });
    });
    // Enrich the Overview with fields only present in the proof metadata
    // (ring, project, uploader, verdict).
    void this.segmentMedia
      .loadSegmentProofs(id as string | number, contractor)
      .then((proofs) => {
        this.ngZone.run(() => {
          this.overviewRows = this.buildOverviewRows(attrs, proofs?.[0]);
        });
      });
  }

  /** Assemble the Overview key/value rows from segment attrs (+ optional proof). */
  private buildOverviewRows(
    attrs: Record<string, unknown>,
    proof?: Record<string, unknown> | null
  ): Array<{ label: string; value: string }> {
    const str = (v: unknown) => (v == null ? '' : String(v)).trim();
    const km = (v: unknown) =>
      typeof v === 'number' ? `${(v / 1000).toFixed(2)} km` : '';
    const date = (v: unknown) => {
      const s = str(v);
      if (!s) return '';
      const d = new Date(s);
      return isNaN(d.getTime()) ? s : d.toLocaleString();
    };
    const candidates: Array<[string, string]> = [
      ['Route', str(attrs['routeName'])],
      ['Segment #', str(attrs['seqNo'] ?? attrs['id'])],
      ['Phase', str(attrs['phaseName'])],
      ['Contractor', str(attrs['contractorName'] ?? attrs['contractor'])],
      ['Status', str(attrs['statusName'] ?? attrs['status'])],
      ['Trenching Type', str(attrs['trenchingTypeName'])],
      ['Length', km(attrs['lengthM'])],
      ['Ring', str(proof?.['ringName'] ?? attrs['ringName'])],
      ['Project', str(proof?.['projectName'] ?? attrs['projectName'])],
      ['Engineer', str(attrs['engName'] ?? proof?.['uploadedBy'])],
      ['Verdict', str(proof?.['verdict'])],
      ['Proofs', str(attrs['proofCounts'])],
      ['Created', date(attrs['createdAt'] ?? proof?.['createdAt'])],
      ['Remarks', str(attrs['remarks'])],
    ];
    return candidates
      .filter(([, value]) => value !== '')
      .map(([label, value]) => ({ label, value }));
  }

  private flattenGeoProps(attrs: Record<string, unknown>): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (k.startsWith('OBJECTID') || k.startsWith('_')) continue;
      if (v == null) continue;
      out[k] = typeof v === 'object' ? JSON.stringify(v) : String(v);
    }
    return out;
  }

  private populateLinkDetailsFromFeature(attrs: Record<string, unknown>): void {
    const str = (key: string) => String(attrs[key] || '').trim();
    const num = (key: string) => {
      const v = Number(attrs[key]);
      return Number.isFinite(v) ? v : 0;
    };
    this.selectedLink = {
      status: str('status') || 'In Progress',
      linkName: str('name') || str('routeName') || str('linkName') || 'Unknown',
      ring: str('ring') || str('ringId') || '',
      phase: str('phase') || str('step') || '',
      workType: str('workType') || str('type') || '',
      contractor: str('contractor') || str('contractorCode') || '',
      plannedLength: num('plannedLength') ? `${num('plannedLength').toFixed(1)} km` : str('plannedLength') || '—',
      deployedLength: num('deployedLength') ? `${num('deployedLength').toFixed(1)} km` : str('deployedLength') || '—',
      progress: Math.round(num('progress') * 10) / 10,
    };

    // Extract photos from feature attributes
    this.photos = this.extractPhotosFromAttrs(attrs);
    this.photosCount = this.photos.length;
    this.currentPhotoIndex = this.photos.length > 0 ? 1 : 0;
    this.viewerOpen = false;
    this.buildPhotoTiles();
  }

  private extractPhotosFromAttrs(attrs: Record<string, unknown>): string[] {
    const urls: string[] = [];
    // Check common photo/image property names
    const photoKeys = ['photos', 'images', 'photoUrls', 'imageUrls', 'attachments', 'photo', 'image'];
    for (const key of photoKeys) {
      const val = attrs[key];
      if (!val) continue;
      if (Array.isArray(val)) {
        for (const item of val) {
          const url = typeof item === 'string' ? item : (item as any)?.url || (item as any)?.src;
          if (url && typeof url === 'string') urls.push(url);
        }
      } else if (typeof val === 'string') {
        // Could be comma-separated or JSON array
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) {
            for (const item of parsed) {
              const url = typeof item === 'string' ? item : item?.url || item?.src;
              if (url && typeof url === 'string') urls.push(url);
            }
          }
        } catch {
          // Treat as single URL or comma-separated
          for (const part of val.split(',')) {
            const trimmed = part.trim();
            if (trimmed && (trimmed.startsWith('http') || trimmed.startsWith('/'))) {
              urls.push(trimmed);
            }
          }
        }
      }
    }
    // Also check individual numbered photo fields
    for (let i = 1; i <= 20; i++) {
      for (const prefix of ['photo', 'image', 'img']) {
        const val = attrs[`${prefix}${i}`] || attrs[`${prefix}_${i}`];
        if (val && typeof val === 'string' && (val.startsWith('http') || val.startsWith('/'))) {
          urls.push(val);
        }
      }
    }
    return urls;
  }

  get mapDetailEntries(): Array<[string, string]> {
    const p = this.mapSelectedFeatureProps;
    if (!p) return [];
    return Object.entries(p);
  }

  // ── Load KPI data ──

  private async loadDynamicData(): Promise<void> {
    try {
      const filterParams = this.filters.buildFilterParams();

      const [dimResult, summaryResult, phaseKpiResult] = await Promise.allSettled([
        getKpiDimensions({
          contractorIds: filterParams['contractorIds'],
          ringIds: filterParams['ringIds'],
          linkIds: filterParams['linkIds'],
        }),
        getDashboardSummary(filterParams),
        getPhaseKpiSummary({ contractorIds: filterParams['contractorIds'] }),
      ]);

      if (summaryResult.status === 'fulfilled' && summaryResult.value) {
        this.mapSummaryData(summaryResult.value);
      }

      if (dimResult.status === 'fulfilled' && dimResult.value) {
        this.mapDimensionsData(dimResult.value);
      }

      if (phaseKpiResult.status === 'fulfilled' && phaseKpiResult.value) {
        const phaseKpi = phaseKpiResult.value as PhaseKpiSummaryResponse;
        const activePhases = phaseKpi.phases?.length || 0;
        this.bottomStatus[2].value = `${activePhases}/${activePhases}`;

        // Phase -> contractor pairs for the cascade's last hop.
        this.filters.ingestPhaseKpi(phaseKpi);
      }
    } catch {
      // Keep defaults
    }
  }

  /**
   * POP/Hubs and Closures in the bottom bar.
   *
   * These two were never wired — `bottomStatus[3]` and `[4]` sat at the
   * hardcoded '0' they are initialised with, under the gateway as well. Now
   * that the marker layer is fetched they can be counted.
   *
   * HEURISTIC, derived from the live MHD marker names (2033 features):
   *   handhole / hanhole (a typo present in the source data) ~1777
   *   manhole                                                 ~250
   *   named sites (Haima, Ibri Exchange, Qarn Al Alam, ...)      ~6
   *
   *   POP/Hubs  = markers that are neither handhole nor manhole, i.e. the
   *               named exchange/site markers.
   *   Closures  = markers whose name references a joint ("w/jt." or "/jt."),
   *               which is how joint closures are labelled upstream.
   *
   * Upstream exposes no explicit marker-type field, so this reads the name.
   * If the business definition differs, change the two predicates below —
   * nothing else depends on them.
   */
  private updateMarkerCounters(markers: GeoJsonFeatureCollection): void {
    const names = (markers?.features ?? []).map((f) =>
      String((f?.properties as Record<string, unknown> | null)?.['name'] ?? '')
        .trim()
        .toLowerCase()
    );
    const isChamber = (n: string) =>
      n.startsWith('handhole') || n.startsWith('hanhole') || n.startsWith('manhole');
    const popHubs = names.filter((n) => n !== '' && !isChamber(n)).length;
    const closures = names.filter((n) => n.includes('jt.')).length;
    this.bottomStatus[3].value = String(popHubs);
    this.bottomStatus[4].value = String(closures);
  }

  private mapSummaryData(data: DashboardSummaryResponse): void {
    const total = data.totalRouteLength || 0;
    const completed = data.completedKm || 0;
    const inProgress = data.inProgressKm || 0;
    const pending = data.pendingKm || 0;
    const completionPct = data.completionPercent || 0;
    const inProgressPct = total > 0 ? +((inProgress / total) * 100).toFixed(1) : 0;
    const blockedKm = total - completed - inProgress - pending;
    const blockedPct = total > 0 ? +((Math.max(0, blockedKm) / total) * 100).toFixed(1) : 0;

    this.kpiCards[0].value = Math.round(total).toLocaleString();
    this.kpiCards[1].value = Math.round(completed).toLocaleString();
    this.kpiCards[1].percentage = `${completionPct}%`;
    this.kpiCards[2].value = Math.round(inProgress).toLocaleString();
    this.kpiCards[2].percentage = `${inProgressPct}%`;
    this.kpiCards[3].value = Math.round(completed).toLocaleString();
    this.kpiCards[3].percentage = `${completionPct}%`;
    this.kpiCards[4].value = Math.round(Math.max(0, blockedKm)).toLocaleString();
    this.kpiCards[4].percentage = `${blockedPct}%`;
  }

  private mapDimensionsData(data: KpiDimensionsResponse): void {
    // Name → id maps and the cascade relationships live in the filter state.
    this.filters.ingestKpiDimensions(data);

    if (data.rings?.length) {
      const ringCount = data.rings.length;
      this.kpiCards[5].value = String(ringCount);
      this.bottomStatus[0].value = `${ringCount}/${ringCount}`;
    }
    if (data.projects?.length) {
      const linkCount = data.projects.length;
      this.bottomStatus[1].value = `${linkCount}/${linkCount}`;
    }
  }

  // ── Filter change handler ──

  onFilterChange(): void {
    this.loadDynamicData();
    // Reload map with new filters, then refresh the phase-gated segment layer
    // (syncMapGeoJsonLayer clears the segment layer as part of its redraw).
    void this.syncMapGeoJsonLayer().then(() => this.maybeLoadSegments());
  }

  /**
   * Apply the currently-staged filter selections. Selecting options only
   * updates local state; nothing reloads until this runs. Shows a spinner in
   * the button until both the KPI reload and the map layer refresh finish.
   */
  async applyFilters(): Promise<void> {
    if (this.applyingFilters) return;
    this.applyingFilters = true;
    this.filters.closeAllDropdowns();
    try {
      await Promise.all([
        this.loadDynamicData(),
        this.syncMapGeoJsonLayer(),
      ]);
      // Route sync clears the segment layer — reload segments for the phase now.
      this.maybeLoadSegments();
    } finally {
      this.applyingFilters = false;
    }
  }

  // ── Export KMZ (mirrors the reference app's header export) ──

  toggleExportMenu(event?: Event): void {
    event?.stopPropagation();
    this.showExportMenu = !this.showExportMenu;
    this.filters.closeAllDropdowns();
  }

  private buildKmlPayload(mode: 'merged' | 'detailed') {
    const phaseIds = this.filters.getSelectedPhaseIds();
    return {
      // Selected contractors joined; omitted when all/none are selected so the
      // server exports EVERY contractor and merges them into one file.
      contractorIds: this.filters.selectedContractorsParam() ?? null,
      ringId: this.filters.singleSelectedId(this.filters.selectedRingIds, this.filters.ringNameToId),
      projectId: this.filters.singleSelectedId(this.filters.selectedProjectIds, this.filters.linkNameToId),
      phaseId: phaseIds.length === 1 ? phaseIds[0] : null,
      routeIds: [] as number[],
      statusFilter: this.exportStatusFilter,
      format: 'kmz' as const,
      onlyCompleted: false,
      // "Optimized (Web)" merges to the backbone; "Detailed (Desktop)" keeps all.
      backboneOnly: mode === 'merged',
      includeMarkers: this.exportIncludeMarkers,
    };
  }

  private buildKmlFilename(mode: 'merged' | 'detailed'): string {
    const sanitize = (s: string) => (s ? s.replace(/[^a-zA-Z0-9]/g, '_') : '');
    let namePart =
      this.filters.selectedRing !== 'All Rings' ? sanitize(this.filters.selectedRing) : 'All_Rings';
    const status = this.exportStatusFilter
      ? this.exportStatusFilter.toLowerCase()
      : 'all_status';
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    namePart = `${namePart}_${status}_${date}`;
    return `${mode === 'merged' ? 'optimized' : 'detailed'}_${namePart}.kmz`;
  }

  async handleExport(mode: 'merged' | 'detailed'): Promise<void> {
    this.showExportMenu = false;
    if (mode === 'detailed') {
      const ok = confirm(
        '⚠ Detailed export works best in Google Earth Desktop.\n\nDo you want to continue?'
      );
      if (!ok) return;
    }
    if (this.exportingKml) return;
    this.exportingKml = true;
    try {
      await exportRoutesKml(this.buildKmlPayload(mode), this.buildKmlFilename(mode));
    } catch (err) {
      console.error('[gis-map] KML export failed', err);
      this.mapError = 'Export failed. Check server logs.';
    } finally {
      this.exportingKml = false;
    }
  }

  // ── Map zoom controls ──
  //
  // `mapView.zoom` is fractional while a goTo animation is in flight, so each
  // step rounds off the current level first — otherwise repeated clicks drift
  // (11.4 → 12.4 → 13.4) instead of landing on whole zoom levels.

  private static readonly MIN_ZOOM = OMAN_VIEW_CONSTRAINTS.minZoom;
  private static readonly MAX_ZOOM = OMAN_VIEW_CONSTRAINTS.maxZoom;

  /** Current zoom rounded to a whole level, or null before the view is ready. */
  private currentZoomLevel(): number | null {
    const z = this.mapView?.zoom;
    return typeof z === 'number' && Number.isFinite(z) ? Math.round(z) : null;
  }

  get canZoomIn(): boolean {
    const z = this.currentZoomLevel();
    return z != null && z < GisMapViewComponent.MAX_ZOOM;
  }

  get canZoomOut(): boolean {
    const z = this.currentZoomLevel();
    return z != null && z > GisMapViewComponent.MIN_ZOOM;
  }

  zoomIn(): void {
    this.stepZoom(1);
  }

  zoomOut(): void {
    this.stepZoom(-1);
  }

  private stepZoom(delta: number): void {
    const view = this.mapView;
    const current = this.currentZoomLevel();
    if (!view || current == null) return;
    const next = Math.min(
      GisMapViewComponent.MAX_ZOOM,
      Math.max(GisMapViewComponent.MIN_ZOOM, current + delta)
    );
    if (next === current) return;
    // Errors here are only ever an interrupted animation (another goTo, or a
    // user pan mid-flight), which is not worth surfacing.
    view.goTo({ zoom: next }, { duration: 200 }).catch(() => { /* interrupted */ });
  }

  // ── Layers (basemap switcher) ──

  toggleBasemapMenu(event: Event): void {
    // Without this the document-level click handler closes the menu in the
    // same tick it opens.
    event.stopPropagation();
    this.basemapMenuOpen = !this.basemapMenuOpen;
    this.showExportMenu = false;
  }

  selectBasemap(id: RolloutBasemapId, event: Event): void {
    event.stopPropagation();
    this.basemapMenuOpen = false;
    if (id === this.mapBasemapStyle || !this.map) return;
    this.mapBasemapStyle = id;
    this.map.basemap = createRolloutBasemap(id);
    if (this.mapView) {
      this.mapView.background = new ColorBackground({
        color: mapViewBackgroundColorForBasemap(id),
      });
    }
  }

  // ── My Location ──
  //
  // Geolocation needs a secure context (https or localhost) and an explicit
  // browser permission, so every failure path gets a visible reason rather
  // than a button that appears to do nothing.

  goToMyLocation(): void {
    if (this.locating) return;
    if (!this.mapView) return;
    if (!navigator.geolocation) {
      this.showMapToast('This browser does not support location.');
      return;
    }
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      this.showMapToast('Location needs a secure (https) connection.');
      return;
    }

    this.locating = true;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        this.ngZone.run(() => {
          this.locating = false;
          this.markMyLocation(pos.coords.longitude, pos.coords.latitude);
        }),
      (err) =>
        this.ngZone.run(() => {
          this.locating = false;
          this.showMapToast(this.geolocationErrorMessage(err));
        }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  private geolocationErrorMessage(err: GeolocationPositionError): string {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        return 'Location blocked — allow location access for this site, then try again.';
      case err.POSITION_UNAVAILABLE:
        return 'Your location is unavailable right now.';
      case err.TIMEOUT:
        return 'Timed out while getting your location.';
      default:
        return 'Could not get your location.';
    }
  }

  /** Drop (or move) the location marker and, when it is in range, fly to it. */
  private markMyLocation(longitude: number, latitude: number): void {
    const view = this.mapView;
    if (!view || !this.map) return;

    if (!this.locationLayer) {
      this.locationLayer = new GraphicsLayer({
        id: 'my-location',
        title: 'My location',
        listMode: 'hide',
      });
      this.map.add(this.locationLayer);
    }
    const point = new Point({ longitude, latitude, spatialReference: { wkid: 4326 } });
    this.locationLayer.removeAll();
    this.locationLayer.add(
      new Graphic({
        geometry: point,
        symbol: {
          type: 'simple-marker',
          style: 'circle',
          size: 13,
          color: [59, 130, 246, 0.95],
          outline: { color: [255, 255, 255, 0.95], width: 2.5 },
        } as any,
      })
    );

    // The view is constrained to the Oman extent, so a goTo outside it is
    // silently clamped — say so instead of appearing to do nothing.
    if (!OMAN_EXTENT.contains(point)) {
      this.showMapToast(
        `You are outside the map area (${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°).`
      );
      return;
    }

    const zoom = Math.max(Math.round(view.zoom ?? 0), 13);
    view
      .goTo({ center: [longitude, latitude], zoom }, { duration: 600 })
      .catch(() => { /* interrupted */ });
  }

  // ── Fullscreen ──

  toggleFullscreen(): void {
    const el = this.mapContainerRef?.nativeElement as HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };
    if (!el) return;

    if (document.fullscreenElement === el) {
      void document.exitFullscreen().catch(() => { /* already exiting */ });
      return;
    }
    const request = el.requestFullscreen
      ? el.requestFullscreen()
      : el.webkitRequestFullscreen?.();
    if (request === undefined && !el.requestFullscreen) {
      this.showMapToast('Fullscreen is not supported by this browser.');
      return;
    }
    void Promise.resolve(request).catch(() => {
      this.isFullscreen = false;
      this.showMapToast('Could not enter fullscreen.');
    });
  }

  /**
   * Esc and the browser's own fullscreen UI bypass toggleFullscreen(), so the
   * flag follows the document instead of the click. The resize nudge lets the
   * MapView pick up the new size (its ResizeObserver can fire before the
   * transition settles).
   */
  private bindFullscreenListener(): void {
    if (this.fullscreenListener || typeof document === 'undefined') return;
    this.fullscreenListener = () => {
      const el = this.mapContainerRef?.nativeElement;
      this.ngZone.run(() => {
        this.isFullscreen = !!el && document.fullscreenElement === el;
        setTimeout(() => (this.mapView as any)?.resize?.(), 80);
      });
    };
    document.addEventListener('fullscreenchange', this.fullscreenListener);
  }

  private showMapToast(message: string): void {
    this.mapToast = message;
    if (this.mapToastTimer) clearTimeout(this.mapToastTimer);
    this.mapToastTimer = setTimeout(
      () => this.ngZone.run(() => { this.mapToast = ''; }),
      5000
    );
  }

  /** Wrap the loaded proof URLs for ImageViewerComponent. */
  private buildPhotoTiles(): void {
    this.photoTiles = this.photos.map((url, i) => ({
      key: `${this.selectedLink.linkName}:${i}`,
      url,
      label: this.selectedLink.linkName,
      phaseName: this.selectedLink.phase,
      routeName: this.selectedLink.ring,
    }));
  }

  /** Open the zoomable viewer on a photo (1-based index, as the gallery UI is). */
  openPhotoViewer(index: number): void {
    if (!this.photoTiles.length) return;
    this.viewerIndex = Math.min(Math.max(0, index), this.photoTiles.length - 1);
    this.viewerOpen = true;
  }

  closePhotoViewer(): void {
    this.viewerOpen = false;
    // Keep the panel's own gallery in step with wherever the viewer ended up.
    this.currentPhotoIndex = this.viewerIndex + 1;
  }

  openDetailsPanel(): void {
    this.detailsPanelOpen = true;
  }

  closeDetailsPanel(): void {
    this.detailsPanelOpen = false;
    this.viewerOpen = false;
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  getTabLabel(tab: string): string {
    if (tab === 'Photos') {
      return `Photos (${this.photosCount})`;
    }
    return tab;
  }

  prevLink(): void {}
  nextLink(): void {}

  prevPhoto(): void {
    if (this.currentPhotoIndex > 1) this.currentPhotoIndex--;
  }

  nextPhoto(): void {
    if (this.currentPhotoIndex < this.photosCount) this.currentPhotoIndex++;
  }

  viewLinkProfile(): void {}

  onMapClick(): void {
    this.openDetailsPanel();
  }
}
