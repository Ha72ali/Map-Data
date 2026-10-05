import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, OnDestroy, NgZone, HostBinding } from '@angular/core';
import type { Feature as GeoJsonFeature, FeatureCollection as GeoJsonFeatureCollection } from 'geojson';
import ArcGISMap from '@arcgis/core/Map.js';
import Color from '@arcgis/core/Color.js';
import ColorBackground from '@arcgis/core/webmap/background/ColorBackground.js';
import MapView from '@arcgis/core/views/MapView.js';
import type Extent from '@arcgis/core/geometry/Extent.js';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils.js';
import type Layer from '@arcgis/core/layers/Layer.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import type Graphic from '@arcgis/core/Graphic.js';
import {
  DashboardSnapshot,
  ContractorProjectStatus,
  getOverallDistribution,
  getContractorProjectStatus,
  getKpiAggregate,
  getRoutesSegmentsPhaseWise,
  getGeoJsonRouteElements,
  getGeoJsonMarkers,
  getDashboardBootstrap,
  getDashboardFilters,
  getContractorContext,
  refreshDashboard,
  exportRoutesFile,
  getKpiDimensions,
  RoutePhaseEntry,
  RoutesSegmentsPhaseWiseResponse,
  PhaseSegment,
  getPlannedVsActual,
  getTimelineTrend,
  getPacStatus,
  PlannedVsActualBucket,
  TimelineTrendPoint,
  PacStatusSummary,
  V2CommonFilters,
  getDashboardSummary,
  getProgressSummary,
  ProgressSummaryContractor,
  ProgressSummaryGrandTotal,
  ProgressSummaryPhaseBreakdown,
} from './dashboard.service';
import { ChatMessage, sendChatMessage } from './chat.service';
import { ThemeService } from './theme.service';
import {
  countGeoJsonFeatures,
  countVisibleFeatures,
  filterGeoJsonByRing,
  toLeafletGeoJsonObject,
} from './map-geojson';
import {
  createMainLineGeoJsonLayer,
  createPointGeoJsonLayer,
  createOmanReferenceLabelsLayer,
  createRegionGeoJsonLayer,
  createRouteElementsGeoJsonLayer,
  createSegmentGraphicsLayer,
  segmentPolylineGraphic,
  splitLinesAndPoints,
} from './esri-map-layers';
import {
  countSplitFeatures,
  filterSplitForMap,
  mergeSplitLayers,
  splitPmsGeoJsonPayload,
  type SplitGeoJsonLayers,
} from './map/map-geojson-pipeline';
import { countRenderableLinePaths, createTelecomRouteGraphicsLayer } from './map/telecom-route-renderer';
import { MapGisSessionCache } from './map/map-gis-session-cache';
import {
  fitMapViewToLayers,
  goToDefaultOmanView,
} from './map/map-view-fit';
import { MapDataService } from './services/map-data.service';
import {
  createRolloutBasemap,
  ROLLOUT_BASEMAP_OPTIONS,
  type RolloutBasemapId,
} from './esri-basemap';
import {
  OMAN_CENTER,
  OMAN_COUNTRY_HIGHLIGHT_GEOJSON,
  OMAN_DEFAULT_ZOOM,
  OMAN_VIEW_CONSTRAINTS,
} from './map/oman-map-config';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ExternalSessionService } from './core/services/external-session.service';
import { filter } from 'rxjs/operators';
import type { RccTooltipPayload } from './rcc-floating-tooltip/rcc-floating-tooltip.component';
import { ReportExportService } from './report-export/report-export.service';
import type { ReportExportRequest } from './report-export/report-export.types';
import type { ReportSnapshotSource } from './report-export/report-export.snapshot';

type DashboardView = 'dashboard' | 'map';

type RingProgressRow = {
  id: string;
  name: string;
  totalKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  blockedKm: number;
  color: string;
};

type ContractorChartRow = {
  id: string;
  name: string;
  totalKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  blockedKm: number;
  onTime: number;
  delayed: number;
  blocked: number;
  color: string;
};

type RccOverallSegment = 'completed' | 'progress' | 'pending';
type RccRingSegment = 'completed' | 'progress' | 'pending' | 'blocked';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

  Math = Math;
  sortByKmPerDay = true;

  /** Standalone auth pages render full-screen (no dashboard shell). Admin/profile
   *  pages now render INSIDE the main shell, so they are NOT in this list. */
  @HostBinding('class.rbac-auth-mode') isAuthMode = false;

  /** Admin/profile pages: keep the shell but give the content a light, padded canvas. */
  @HostBinding('class.rbac-content-mode') isContentMode = false;

  private isRbacUrl(url: string): boolean {
    return /^\/(login|forgot-password|reset-password|forbidden)(\/|$|\?)/.test(url);
  }
  private isContentUrl(url: string): boolean {
    return /^\/(admin|profile|change-password)(\/|$|\?)/.test(url);
  }

  // ── Logged-in user (for the sidebar footer) ─────────────────────────────
  get userName(): string {
    const u = this.auth.user();
    if (!u) return 'Guest';
    return `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username;
  }
  get userRole(): string {
    return this.auth.user()?.role?.name || '';
  }
  get userInitials(): string {
    const u = this.auth.user();
    if (!u) return '?';
    return ((u.firstName || u.username || '?').charAt(0) + (u.lastName || '').charAt(0)).toUpperCase();
  }
  /**
   * True when this tab was opened by the client dashboard's /contractors page.
   * Cached at init: sessionStorage cannot change under us mid-session, and the
   * template binds it on every change detection cycle.
   */
  isHandoverTab = false;

  logout(): void {
    if (this.isHandoverTab) {
      // Handover tab: clear the session, tell any sibling contractor tabs, then
      // close. Redirecting to the portal would strand the user on a login page
      // they never came from — the client dashboard is in the opener tab.
      this.auth.clearSession();
      this.externalSession.broadcastLogout();
      this.externalSession.closeTab();
      return;
    }
    this.auth.logout();
  }

  /**
   * Back to the client dashboard: drop this contractor's session and close the
   * tab. Same effect as logout, named for what the user is doing.
   */
  backToClient(): void {
    this.auth.clearSession();
    this.externalSession.clear();
    this.externalSession.closeTab();
  }

  constructor(
    private readonly themeService: ThemeService,
    private readonly ngZone: NgZone,
    private readonly reportExportService: ReportExportService,
    private readonly mapDataService: MapDataService,
    private readonly mapGisCache: MapGisSessionCache,
    private readonly router: Router,
    public readonly auth: AuthService,
    private readonly externalSession: ExternalSessionService
  ) {
    this.themeMode = this.themeService.getTheme();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.isProgramRoute = e.urlAfterRedirects.startsWith('/program');
        this.currentRoute = e.urlAfterRedirects;
        this.isAuthMode = this.isRbacUrl(e.urlAfterRedirects);
        this.isContentMode = this.isContentUrl(e.urlAfterRedirects);
      });
    // Set immediately for the initial URL (before the first NavigationEnd).
    this.isAuthMode = this.isRbacUrl(this.router.url);
    this.isContentMode = this.isContentUrl(this.router.url);
  }

  // get progressDayRows() {

  //   if (!this.contractorChartData) {
  //     return [];
  //   }

  //   const rows = this.contractorChartData.map((c: any) => {

  //     const completedKm = Number(c.completedKm || 0);

  //     /*
  //       TEMPORARY LOGIC

  //       Replace later with:
  //       contract duration days
  //       OR actual active days from API
  //     */

  //     const activeDays = 30;

  //     const kmPerDay = activeDays > 0
  //       ? completedKm / activeDays
  //       : 0;

  //     const targetKmPerDay = 10;

  //     const variance = kmPerDay - targetKmPerDay;

  //     return {
  //       id: c.id,
  //       name: c.name,
  //       color: c.color,
  //       completedKm,
  //       kmPerDay,
  //       targetKmPerDay,
  //       variance,
  //       trend:
  //         variance > 1
  //           ? 'up'
  //           : variance < -1
  //           ? 'down'
  //           : 'flat',

  //       tone:
  //         variance >= 0
  //           ? 'ahead'
  //           : variance >= -2
  //           ? 'close'
  //           : 'behind'
  //     };

  //   });

  //   return rows.sort((a: any, b: any) => {

  //     if (this.sortByKmPerDay) {
  //       return b.kmPerDay - a.kmPerDay;
  //     }

  //     return b.completedKm - a.completedKm;

  //   });

  // }

  get progressDayRows() {

  if (!this.contractorChartData) {
    return [];
  }

  const today = new Date();

  const rows = this.contractorChartData.map((c: any) => {

    const completedKm = Number(c.completedKm || 0);

    /*
      CONTRACT START DATE

      Expected format:
      '2026-05-01'

      IMPORTANT:
      Replace fallback once API provides real value
    */

    const contractStartDate =
      c.contractStartDate ||
      c.startDate ||
      '2026-05-01';

    const startDate = new Date(contractStartDate);

    /*
      ACTIVE DAYS CALCULATION
    */

    const diffTime =
      today.getTime() - startDate.getTime();

    const activeDays = Math.max(
      1,
      Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      )
    );

    /*
      KM / DAY KPI
    */

    const kmPerDay =
      activeDays > 0
        ? completedKm / activeDays
        : 0;

    /*
      TARGET KPI
    */

    const targetKmPerDay = 10;

    /*
      VARIANCE
    */

    const variance =
      kmPerDay - targetKmPerDay;

    return {

      id: c.id,
      name: c.name,
      color: c.color,

      completedKm,

      contractStartDate,

      activeDays,

      kmPerDay,

      targetKmPerDay,

      variance,

      trend:
        variance > 1
          ? 'up'
          : variance < -1
          ? 'down'
          : 'flat',

      tone:
        variance >= 0
          ? 'ahead'
          : variance >= -2
          ? 'close'
          : 'behind'

    };

  });

  return rows.sort((a: any, b: any) => {

    if (this.sortByKmPerDay) {
      return b.kmPerDay - a.kmPerDay;
    }

    return b.completedKm - a.completedKm;

  });

}

  toggleProgressDaySort(): void {
    this.sortByKmPerDay = !this.sortByKmPerDay;
  }

  getProgressDayVelocityPct(row: { kmPerDay?: number; targetKmPerDay?: number }): number {
    const target = Number(row.targetKmPerDay || 0);
    if (target <= 0) {
      return 0;
    }
    const velocity = Number(row.kmPerDay || 0);
    return Math.max(4, Math.min(100, (velocity / target) * 100));
  }

  @ViewChild('chatScrollContainer') private chatScrollContainer!: ElementRef;
  @ViewChild('mapHost') private mapHost!: ElementRef<HTMLDivElement>;
  @ViewChild('mapStage') private mapStageRef?: ElementRef<HTMLElement>;
  private shouldScrollChat = false;
  private mapFullscreenListener: (() => void) | null = null;

  /** ArcGIS MapView (Rollout Map tab). */
  mapGeoJsonLoading = false;
  mapGeoJsonError = '';
  /** Optional override for upstream `contractor=`; when empty, dashboard contractor applies. */
  mapContractorCode = '';
  mapGeoJsonInfo = '';
  mapShowRouteElements = false;
  mapShowMarkers = false;
  mapSelectedFeatureProps: Record<string, string> | null = null;
  mapIsFullscreen = false;
  mapBasemapMenuOpen = false;
  mapBasemapStyle: RolloutBasemapId = 'imagery-hybrid';
  mapEsriBooting = false;
  mapRouteLayersReady = false;
  readonly rolloutBasemapOptions = ROLLOUT_BASEMAP_OPTIONS;

  reportExportModalOpen = false;
  reportExportInProgress = false;
  reportExportProgressMessage = '';
  reportExportError = '';

  rccHoverKey: string | null = null;
  rccTooltip: RccTooltipPayload | null = null;
  rccTooltipX = 0;
  rccTooltipY = 0;

  private mapView: MapView | null = null;
  private map: ArcGISMap | null = null;
  private segmentGraphicsLayer: GraphicsLayer | null = null;
  private esriOperationalLayers: Layer[] = [];
  private mapGeoJsonObjectUrls: string[] = [];
  private zoomWatchHandle: { remove: () => void } | null = null;
  private mapClickHandle: { remove: () => void } | null = null;
  readonly segmentDetailMinZoom = 14;
  private mapResizeObserver: ResizeObserver | null = null;
  private mapSyncGeneration = 0;
  private mapSyncDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private mapFitInFlight = false;
  private readonly rolloutMapContractorCodes = ['BPT', 'MHD', 'OHI', 'OFO', 'Al-Jassar'] as const;
  // --- Multi-select contractor ---
  selectedContractorIds: string[] = [];
  contractorDropdownOpen = false;
  filterContractorDropdownOpen = false;
  autoRefreshEnabled = false;
  private autoRefreshTimer: ReturnType<typeof setInterval> | null = null;
  private documentClickBound = this.onDocumentClick.bind(this);

  segmentCounts = { total: 0, completed: 0, inProgress: 0, pending: 0, blocked: 0 };

  get contractorDropdownLabel(): string {
    if (this.selectedContractorIds.length === 0) return 'All Contractors';
    if (this.selectedContractorIds.length === this.allContractors.length) return 'All Contractors';
    if (this.selectedContractorIds.length === 1) {
      return this.getContractorName(this.selectedContractorIds[0]);
    }
    return `${this.selectedContractorIds.length} selected`;
  }

  /**
   * Portal links in the sidebar, ported from neotecx_dashbaord_ui's header
   * tabs (`onTabChange`, header.component.ts:186).
   *
   * These are not routes in this app — they hand the browser to the portal,
   * which owns those screens. Role-gated exactly as the reference does:
   * any role containing CLIENT sees Segments and
   * As-Built, everyone else sees the management screens.
   *
   * Empty when `externalAuth.mainAppUrl` is unset, so the section hides
   * rather than rendering links that go nowhere.
   */
  get portalLinks(): Array<{ label: string; path: string; icon: 'segments' | 'asbuilt' | 'contract' | 'project' }> {
    if (!this.externalSession.enabled || !this.externalSession.mainAppUrl) return [];
    if (this.externalSession.isClientUser) {
      return [
        { label: 'Segments', path: '/#/segments', icon: 'segments' },
        { label: 'As-Built', path: '/#/as-build-boq', icon: 'asbuilt' },
      ];
    }
    return [
      { label: 'Contract Management', path: '/#/contract/list', icon: 'contract' },
      { label: 'Project Management', path: '/#/project/list', icon: 'project' },
    ];
  }

  /** Hand the browser to a portal screen (full load — separate Angular app). */
  openPortalLink(path: string): void {
    this.externalSession.openPortal(path);
  }

  /** True when the deployment serves exactly one contractor. */
  get isSingleContractorDeployment(): boolean {
    return this.allContractors.length === 1;
  }

  get filterContractorLabel(): string {
    return this.contractorDropdownLabel;
  }

  isContractorSelected(id: string): boolean {
    return this.selectedContractorIds.includes(id);
  }

  toggleContractorSelection(id: string): void {
    const idx = this.selectedContractorIds.indexOf(id);
    if (idx >= 0) {
      this.selectedContractorIds.splice(idx, 1);
    } else {
      this.selectedContractorIds.push(id);
    }
    this.syncContractorSelectionToLegacy();
    this.onContractorFilterChange();
  }

  selectAllContractors(): void {
    this.selectedContractorIds = this.allContractors.map(c => c.id);
    this.syncContractorSelectionToLegacy();
    this.onContractorFilterChange();
  }

  clearAllContractors(): void {
    this.selectedContractorIds = [];
    this.syncContractorSelectionToLegacy();
    this.onContractorFilterChange();
  }

  toggleContractorDropdown(e: Event): void {
    e.stopPropagation();
    this.contractorDropdownOpen = !this.contractorDropdownOpen;
    this.filterContractorDropdownOpen = false;
  }

  toggleFilterContractorDropdown(e: Event): void {
    e.stopPropagation();
    this.filterContractorDropdownOpen = !this.filterContractorDropdownOpen;
    this.contractorDropdownOpen = false;
  }

  private syncContractorSelectionToLegacy(): void {
    if (this.selectedContractorIds.length === 1) {
      this.selectedContractor = this.selectedContractorIds[0];
    } else {
      this.selectedContractor = 'ALL';
    }
  }

  private onDocumentClick(): void {
    this.contractorDropdownOpen = false;
    this.filterContractorDropdownOpen = false;
    this.ringDropdownOpen = false;
    this.linkDropdownOpen = false;
  }

  toggleAutoRefresh(): void {
    this.autoRefreshEnabled = !this.autoRefreshEnabled;
    if (this.autoRefreshEnabled) {
      this.autoRefreshTimer = setInterval(() => {
        this.loadData().then(() => {
          this.loadDimensionKpis();
          this.loadV2Charts();
        });
      }, 5 * 60 * 1000);
    } else {
      if (this.autoRefreshTimer) {
        clearInterval(this.autoRefreshTimer);
        this.autoRefreshTimer = null;
      }
    }
  }

  // --- Ring multi-select ---
  selectedRingIds: string[] = [];
  ringDropdownOpen = false;

  get ringDropdownLabel(): string {
    if (this.selectedRingIds.length === 0) return 'All Rings';
    if (this.selectedRingIds.length === this.filteredRings.length && this.filteredRings.length > 0) return 'All Rings';
    if (this.selectedRingIds.length === 1) return this.getRingName(this.selectedRingIds[0]);
    return `${this.selectedRingIds.length} rings`;
  }

  isRingSelected(id: string): boolean { return this.selectedRingIds.includes(id); }

  toggleRingSelection(id: string): void {
    const idx = this.selectedRingIds.indexOf(id);
    if (idx >= 0) { this.selectedRingIds.splice(idx, 1); } else { this.selectedRingIds.push(id); }
    this.syncRingToLegacy();
    this.onRingChange();
  }

  selectAllRings(): void {
    this.selectedRingIds = this.filteredRings.map(r => r.id);
    this.syncRingToLegacy();
    this.onRingChange();
  }

  clearAllRings(): void {
    this.selectedRingIds = [];
    this.syncRingToLegacy();
    this.onRingChange();
  }

  toggleRingDropdown(e: Event): void {
    e.stopPropagation();
    this.ringDropdownOpen = !this.ringDropdownOpen;
    this.linkDropdownOpen = false;
    this.filterContractorDropdownOpen = false;
    this.contractorDropdownOpen = false;
  }

  private syncRingToLegacy(): void {
    this.selectedRing = this.selectedRingIds.length === 1 ? this.selectedRingIds[0] : 'ALL';
  }

  // --- Link multi-select ---
  selectedLinkIds: string[] = [];
  linkDropdownOpen = false;

  get linkDropdownLabel(): string {
    if (this.selectedLinkIds.length === 0) return 'All Projects';
    if (this.selectedLinkIds.length === this.filteredLinks.length && this.filteredLinks.length > 0) return 'All Projects';
    if (this.selectedLinkIds.length === 1) return this.getLinkName(this.selectedLinkIds[0]);
    return `${this.selectedLinkIds.length} projects`;
  }

  isLinkSelected(id: string): boolean { return this.selectedLinkIds.includes(id); }

  toggleLinkSelection(id: string): void {
    const idx = this.selectedLinkIds.indexOf(id);
    if (idx >= 0) { this.selectedLinkIds.splice(idx, 1); } else { this.selectedLinkIds.push(id); }
    this.syncLinkToLegacy();
    this.onLinkChange();
  }

  selectAllLinks(): void {
    this.selectedLinkIds = this.filteredLinks.map(l => l.id);
    this.syncLinkToLegacy();
    this.onLinkChange();
  }

  clearAllLinks(): void {
    this.selectedLinkIds = [];
    this.syncLinkToLegacy();
    this.onLinkChange();
  }

  toggleLinkDropdown(e: Event): void {
    e.stopPropagation();
    this.linkDropdownOpen = !this.linkDropdownOpen;
    this.ringDropdownOpen = false;
    this.filterContractorDropdownOpen = false;
    this.contractorDropdownOpen = false;
  }

  private syncLinkToLegacy(): void {
    this.selectedLink = this.selectedLinkIds.length === 1 ? this.selectedLinkIds[0] : 'ALL';
  }

  // --- New hierarchical filters ---
  selectedRing = 'ALL';
  selectedLink = 'ALL';
  selectedStep = 'ALL';
  selectedContractor = 'ALL';

  rings = [
    { id: 'R1', name: 'Ring 1 – North' },
    { id: 'R2', name: 'Ring 2 – South' },
    { id: 'R3', name: 'Ring 3 – East' },
    { id: 'R4', name: 'Ring 4 – West' },
    { id: 'R5', name: 'Ring 5 – Central' },
  ];
  filteredRings: typeof this.rings = [];

  allLinks = [
    { id: 'L1-01', name: 'Link A-01 (Downtown)', ringId: 'R1', contractor: null as string | null },
    { id: 'L1-02', name: 'Link A-02 (Uptown)', ringId: 'R1', contractor: null as string | null },
    { id: 'L1-03', name: 'Link A-03 (Midtown)', ringId: 'R1', contractor: null as string | null },
    { id: 'L2-01', name: 'Link B-01 (Harbor)', ringId: 'R2', contractor: null as string | null },
    { id: 'L2-02', name: 'Link B-02 (Bay Area)', ringId: 'R2', contractor: null as string | null },
    { id: 'L2-03', name: 'Link B-03 (Coastal)', ringId: 'R2', contractor: null as string | null },
    { id: 'L3-01', name: 'Link C-01 (Industrial)', ringId: 'R3', contractor: null as string | null },
    { id: 'L3-02', name: 'Link C-02 (Tech Park)', ringId: 'R3', contractor: null as string | null },
    { id: 'L3-03', name: 'Link C-03 (Eastside)', ringId: 'R3', contractor: null as string | null },
    { id: 'L3-04', name: 'Link C-04 (Gateway)', ringId: 'R3', contractor: null as string | null },
    { id: 'L4-01', name: 'Link D-01 (Suburbs)', ringId: 'R4', contractor: null as string | null },
    { id: 'L4-02', name: 'Link D-02 (Westfield)', ringId: 'R4', contractor: null as string | null },
    { id: 'L5-01', name: 'Link E-01 (CBD North)', ringId: 'R5', contractor: null as string | null },
    { id: 'L5-02', name: 'Link E-02 (CBD South)', ringId: 'R5', contractor: null as string | null },
    { id: 'L5-03', name: 'Link E-03 (Finance District)', ringId: 'R5', contractor: null as string | null },
  ];

  allSteps = [
    { id: 'S1', name: 'Survey & Design', linkIds: ['L1-01', 'L1-02', 'L2-01', 'L3-01', 'L3-02', 'L4-01', 'L5-01', 'L5-02'] },
    { id: 'S2', name: 'Permit Acquisition', linkIds: ['L1-01', 'L1-03', 'L2-02', 'L3-01', 'L3-03', 'L4-02', 'L5-01'] },
    { id: 'S3', name: 'Civil Works', linkIds: ['L1-02', 'L2-01', 'L2-03', 'L3-02', 'L3-04', 'L4-01', 'L5-03'] },
    { id: 'S4', name: 'Cable Laying', linkIds: ['L1-01', 'L1-02', 'L1-03', 'L2-01', 'L3-01', 'L4-01', 'L4-02', 'L5-02'] },
    { id: 'S5', name: 'Splicing & Termination', linkIds: ['L1-01', 'L2-02', 'L2-03', 'L3-03', 'L3-04', 'L5-01', 'L5-03'] },
    { id: 'S6', name: 'Testing & QA', linkIds: ['L1-03', 'L2-01', 'L3-01', 'L3-02', 'L4-02', 'L5-02', 'L5-03'] },
    { id: 'S7', name: 'Commissioning', linkIds: ['L1-01', 'L2-03', 'L3-04', 'L4-01', 'L5-01', 'L5-02'] },
  ];

  allContractors = [
    { id: 'C1', name: 'Alpha Infra', stepIds: ['S1', 'S2', 'S4'] },
    { id: 'C2', name: 'BlueLine Corp', stepIds: ['S2', 'S3', 'S5'] },
    { id: 'C3', name: 'MetroWorks Ltd', stepIds: ['S3', 'S4', 'S6'] },
    { id: 'C4', name: 'SunGrid Telecom', stepIds: ['S1', 'S5', 'S7'] },
    { id: 'C5', name: 'NovaBuild Inc', stepIds: ['S4', 'S6', 'S7'] },
    { id: 'C6', name: 'FiberTech Solutions', stepIds: ['S1', 'S3', 'S6'] },
  ];

  filteredLinks: typeof this.allLinks = [];
  filteredSteps: typeof this.allSteps = [];
  filteredContractors: typeof this.allContractors = [];
  activeFilterCount = 0;

  // --- Legacy bindings (kept for backward compatibility with existing dashboard widgets) ---
  /** Default aligned with SYNC_PROJECT_IDS in env.example — overridden by bootstrap/API when loaded. */
  projectId = '90';
  phaseId = '2';
  contractors: string[] = [];
  projectIds: string[] = [];
  phaseIds: string[] = [];
  exportInProgress = false;
  exportError = '';

  isProgramRoute = false;
  currentRoute = '/';
  filterModalOpen = false;
  private filterSnapshot: { contractorIds: string[]; ringIds: string[]; linkIds: string[]; step: string } | null = null;

  view: DashboardView = 'dashboard';
  themeMode: 'light' | 'dark' = 'light';
  sidebarExpanded = false;
  sidebarMobileOpen = false;
  loading = false;
  refreshing = false;
  error = '';
  snapshot: DashboardSnapshot | null = null;
  phaseRoutes: RoutesSegmentsPhaseWiseResponse | null = null;
  contractorStatus: ContractorProjectStatus[] = [];
  contractorStatusRows: ContractorProjectStatus[] = [];
  phaseBreakdownSummary: Array<{ phase: string; percentage: number }> = [];
  contractorProgressRows: Array<{
    contractor: string;
    completed: number;
    inProgress: number;
    planned: number;
  }> = [];
  statusSplitRows: Array<{
    label: string;
    value: number;
    percent: number;
    className: string;
  }> = [];
  showPieVariants = true;
  pieDrilldownOpen = {
    donut: true,
    nested: false,
    radial: false,
  };
  pieDummy = {
    totalPlannedKm: 1200,
    completedKm: 720,
    inProgressKm: 360,
    contractors: [
      { name: 'Alpha Infra', plannedKm: 320, completedPct: 62, inProgressPct: 28 },
      { name: 'BlueLine Corp', plannedKm: 260, completedPct: 48, inProgressPct: 42 },
      { name: 'MetroWorks Ltd', plannedKm: 210, completedPct: 71, inProgressPct: 18 },
      { name: 'SunGrid Telecom', plannedKm: 180, completedPct: 34, inProgressPct: 52 },
      { name: 'NovaBuild Inc', plannedKm: 230, completedPct: 58, inProgressPct: 30 },
    ],
  };

  totalPlanned: number | null = null;
  completed: number | null = null;
  inProgress: number | null = null;
  pending: number | null = null;
  blockedSegments: number | null = null;
  weeklyRate: number | null = null;
  delayedCount: number | null = null;

  // --- Chart data for Progress by Rings (populated from API) ---
  ringProgressData: Array<{
    id: string; name: string; totalKm: number; completedKm: number;
    inProgressKm: number; pendingKm: number; blockedKm: number; color: string;
  }> = [];

  // --- Chart data for Progress by Contractors (populated from API) ---
  contractorChartData: Array<{
    id: string; name: string; totalKm: number; completedKm: number;
    inProgressKm: number; pendingKm: number; blockedKm: number;
    onTime: number; delayed: number; blocked: number; color: string;
  }> = [];

  // --- Chart data for Progress by Steps (populated from phaseBreakdown) ---
  stepProgressData: Array<{
    id: string; name: string; totalSegments: number;
    completed: number; inProgress: number; pending: number; blocked: number; icon: string;
  }> = [];

  // --- Date range filter ---
  filterFromDate = '';
  filterToDate = '';

  // --- V2 Chart data ---
  plannedVsActualData: PlannedVsActualBucket[] = [];
  plannedVsActualGranularity: 'monthly' | 'weekly' = 'monthly';
  plannedVsActualLoading = false;

  timelineTrendData: TimelineTrendPoint[] = [];
  timelineTrendLoading = false;

  pacSummary: PacStatusSummary = { totalSubmitted: 0, approved: 0, pending: 0, rejected: 0 };
  pacLoading = false;

  // --- Work Progress donut chart data ---
  progressSummaryContractors: ProgressSummaryContractor[] = [];
  progressSummaryGrandTotal: ProgressSummaryGrandTotal = {
    totalPlannedKm: 0, completedKm: 0, inProgressKm: 0, pendingKm: 0, completionPercent: 0,
  };
  progressSummaryPhaseBreakdown: ProgressSummaryPhaseBreakdown[] = [];
  progressSummaryLoading = false;
  progressSummaryPhaseId = '2';
  workProgressPhase = 'Trenching';
  wpHover: 'approved' | 'inprogress' | 'pending' | null = null;

  // --- Chart data for Progress by Links (populated from API) ---
  linkProgressData: Array<{
    id: string; name: string; ringName: string; totalKm: number; completedPct: number; status: string;
  }> = [];

  // --- Ring-Contractor matrix (populated from API) ---
  ringContractorMatrix: Array<{
    ring: string; contractors: Array<{ name: string; pct: number }>;
  }> = [];

  getCompletionPct(row: typeof this.ringProgressData[0]): number {
    return row.totalKm > 0 ? (row.completedKm / row.totalKm) * 100 : 0;
  }

  getInProgressPct(row: typeof this.ringProgressData[0]): number {
    return row.totalKm > 0 ? (row.inProgressKm / row.totalKm) * 100 : 0;
  }

  getPendingPct(row: typeof this.ringProgressData[0]): number {
    return row.totalKm > 0 ? (row.pendingKm / row.totalKm) * 100 : 0;
  }

  getBlockedPct(row: typeof this.ringProgressData[0]): number {
    return row.totalKm > 0 ? (row.blockedKm / row.totalKm) * 100 : 0;
  }

  getStepCompletedPct(step: typeof this.stepProgressData[0]): number {
    return step.totalSegments > 0 ? (step.completed / step.totalSegments) * 100 : 0;
  }

  getStepInProgressPct(step: typeof this.stepProgressData[0]): number {
    return step.totalSegments > 0 ? (step.inProgress / step.totalSegments) * 100 : 0;
  }

  getStepPendingPct(step: typeof this.stepProgressData[0]): number {
    return step.totalSegments > 0 ? (step.pending / step.totalSegments) * 100 : 0;
  }

  getStepBlockedPct(step: typeof this.stepProgressData[0]): number {
    return step.totalSegments > 0 ? (step.blocked / step.totalSegments) * 100 : 0;
  }

  /** UI-only helpers for the connected execution pipeline layout. */
  get stepPipelineStageCount(): number {
    return this.stepProgressData.length;
  }

  get stepPipelineTotalSegments(): number {
    return this.stepProgressData.reduce((sum, step) => sum + (step.totalSegments || 0), 0);
  }

  get stepPipelineActiveStages(): number {
    return this.stepProgressData.filter((step) => step.inProgress > 0).length;
  }

  getStepPipelineOrdinal(index: number): number {
    return index + 1;
  }

  /** UI-only operational status for execution monitor rows. */
  getStepExecutionStatus(step: typeof this.stepProgressData[0]): {
    label: string;
    tone: 'track' | 'active' | 'attention' | 'blocked';
  } {
    if (step.blocked > 0) {
      return { label: 'Blocked', tone: 'blocked' };
    }
    if (step.inProgress > 0) {
      return { label: 'Active', tone: 'active' };
    }
    const completedPct = this.getStepCompletedPct(step);
    if (completedPct < 35 && step.pending >= step.completed) {
      return { label: 'Attention', tone: 'attention' };
    }
    return { label: 'On Track', tone: 'track' };
  }

  getHeatColor(pct: number): string {
    if (pct === 0) return '#f8fafc';
    if (pct < 30) return '#fee2e2';
    if (pct < 50) return '#fef3c7';
    if (pct < 70) return '#e0f2fe';
    if (pct < 85) return '#d1fae5';
    return '#bbf7d0';
  }

  getHeatTextColor(pct: number): string {
    if (pct === 0) return '#cbd5e1';
    if (pct < 30) return '#b91c1c';
    if (pct < 50) return '#92400e';
    if (pct < 70) return '#0c4a6e';
    return '#166534';
  }

  getLinkStatusClass(status: string): string {
    switch (status) {
      case 'on-track': return 'success';
      case 'at-risk': return 'warning';
      case 'delayed': return 'danger';
      default: return 'info';
    }
  }

  getLinkStatusLabel(status: string): string {
    switch (status) {
      case 'on-track': return 'On Track';
      case 'at-risk': return 'At Risk';
      case 'delayed': return 'Delayed';
      default: return status;
    }
  }

  getContractorCompletionPct(c: typeof this.contractorChartData[0]): number {
    return c.totalKm > 0 ? Math.min(100, (c.completedKm / c.totalKm) * 100) : 0;
  }

  getContractorRingStyle(c: typeof this.contractorChartData[0]): string {
    const pct = this.getContractorCompletionPct(c);
    return `conic-gradient(${c.color} 0 ${pct}%, #e2e8f0 ${pct}% 100%)`;
  }

  ngOnInit(): void {
    // Portal-handover session handling must run before anything fetches data,
    // so a ?logout=true never renders a dashboard on its way out.
    if (this.externalSession.enabled) {
      // Capture any ?data= handover FIRST. On the very first load of a tab
      // opened from the client dashboard nothing is stored yet, so
      // isHandoverTab() would read false and the Back button would not appear
      // until a reload. Safe to call ahead of the logout check: it returns
      // early — before touching history — when the URL carries no handover.
      this.externalSession.captureUrlHandover();
      this.isHandoverTab = this.externalSession.isHandoverTab();

      // The router recorded the bootstrap URL before the line above ran, and
      // restores its query string when the initial navigation completes —
      // putting the token back in the address bar. Strip it again once
      // navigation settles, and keep watching: any later navigation replays
      // the same URL from the router's own history.
      if (this.isHandoverTab) {
        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe(() => this.externalSession.stripHandoverQuery());
      }

      if (this.externalSession.isLogoutRequested()) {
        this.auth.clearSession();
        this.externalSession.broadcastLogout();
        if (this.isHandoverTab) {
          this.externalSession.closeTab();
        } else {
          this.externalSession.redirectToPortal();
        }
        return;
      }
      // Another tab logged out — follow it.
      this.stopRemoteLogoutWatch = this.externalSession.onRemoteLogout(() => {
        this.auth.clearSession();
        this.externalSession.clear();
        if (this.isHandoverTab) {
          this.externalSession.closeTab();
        } else {
          this.externalSession.redirectToPortal();
        }
      });
    }

    this.themeMode = this.themeService.getTheme();
    document.addEventListener('click', this.documentClickBound);
    this.loadFilters();
    this.updateStatusSplit();
    this.loadData().then(() => {
      this.loadDimensionKpis();
      this.loadV2Charts();
      this.loadSegmentCounts();
      this.buildChatSuggestions();
    });
  }

  async loadFilters(): Promise<void> {
    try {
      const rootFilters = await getDashboardFilters({
        phaseId: this.phaseId ? this.phaseId : undefined,
      });
      if (Array.isArray(rootFilters?.contractors) && rootFilters.contractors.length > 0) {
        const stepIds = this.allSteps.map((s) => s.id);
        this.allContractors = rootFilters.contractors.map((contractor) => ({
          id: contractor.id,
          name: contractor.name,
          stepIds,
        }));
      }

      try {
        const contractorContext = await getContractorContext();
        if (Array.isArray(contractorContext?.contractors) && contractorContext.contractors.length > 0) {
          const stepIds = this.allSteps.map((s) => s.id);
          const contextContractors = contractorContext.contractors
            .filter((name) => Boolean(String(name || '').trim()))
            .map((name) => ({
              id: String(name).trim(),
              name: String(name).trim(),
              stepIds,
            }));
          if (contextContractors.length) {
            this.allContractors = contextContractors;
          }
        }
      } catch (error) {
        console.warn('Failed to load contractor context, using fallback contractors:', error);
      }

      this.selectedContractor = 'ALL';
      // Single-contractor deployment (e.g. MHD talking straight to its own
      // API): pre-select the only contractor so downstream calls are scoped
      // from the first load instead of defaulting to an "ALL" that means the
      // same thing. The trigger is disabled in the template to match.
      if (this.allContractors.length === 1) {
        const only = this.allContractors[0];
        this.selectedContractor = only.id;
        this.selectedContractorIds = [only.id];
      }
      await this.loadScopedFilters();
    } catch (error) {
      // Keep fallback static lists if synced filters are not ready yet.
      console.warn('Failed to load filters from API, using defaults:', error);
    } finally {
      this.cascadeFilters();
    }
  }

  private async loadScopedFilters(): Promise<void> {
    const phaseId = this.phaseId ? this.phaseId : undefined;
    // Use multi-select contractor names when available
    let contractorParam: string | undefined;
    if (this.selectedContractorIds.length > 0 && this.selectedContractorIds.length < this.allContractors.length) {
      contractorParam = this.selectedContractorIds.map(id => this.getContractorName(id)).join(',');
    } else if (this.selectedContractor !== 'ALL') {
      contractorParam = this.getContractorName(this.selectedContractor);
    }

    // Use multi-select ring IDs when available
    let ringParam: string | undefined;
    if (this.selectedRingIds.length > 0 && this.selectedRingIds.length < this.filteredRings.length) {
      ringParam = this.selectedRingIds.join(',');
    } else if (this.selectedRing !== 'ALL') {
      ringParam = this.selectedRing;
    }

    // Use multi-select link IDs when available
    let linkParam: string | undefined;
    if (this.selectedLinkIds.length > 0 && this.selectedLinkIds.length < this.filteredLinks.length) {
      linkParam = this.selectedLinkIds.join(',');
    } else if (this.selectedLink !== 'ALL') {
      linkParam = this.selectedLink;
    }

    try {
      const scoped = await getDashboardFilters({
        phaseId,
        contractor: contractorParam,
        ringId: ringParam,
        projectId: linkParam,
      });

      this.rings = Array.isArray(scoped?.rings)
        ? scoped.rings.map((ring) => ({ id: ring.id, name: ring.name }))
        : [];
      this.selectedRing = this.selectedRing === 'ALL' || this.rings.some((r) => r.id === this.selectedRing)
        ? this.selectedRing
        : 'ALL';

      this.allLinks = Array.isArray(scoped?.links)
        ? scoped.links.map((link, idx) => ({
            id: link.id || `LINK_${idx + 1}`,
            name: link.name || `Link ${idx + 1}`,
            ringId: link.ringId || this.selectedRing,
            contractor: link.contractor ? String(link.contractor).trim() : null,
          }))
        : [];
      this.selectedLink = this.selectedLink === 'ALL' || this.allLinks.some((l) => l.id === this.selectedLink)
        ? this.selectedLink
        : 'ALL';

      this.allSteps = Array.isArray(scoped?.steps)
        ? scoped.steps.map((step, idx) => ({
            id: step.id || `STEP_${idx + 1}`,
            name: step.name,
            linkIds: this.selectedLink && this.selectedLink !== 'ALL'
              ? [this.selectedLink]
              : this.allLinks.map((l) => l.id),
          }))
        : [];
      this.selectedStep = this.selectedStep === 'ALL' || this.allSteps.some((s) => s.id === this.selectedStep)
        ? this.selectedStep
        : 'ALL';
    } catch {
      // Keep existing filter lists if API fails
    }
  }

  setView(view: DashboardView): void {
    this.view = view;
    if (view === 'map') {
      setTimeout(() => void this.initMapIfNeeded(), 50);
    }
  }

  /** Load or refresh GeoJSON on the map (called when opening Map tab or clicking Refresh). */
  async reloadMapGeoJson(): Promise<void> {
    await this.syncMapGeoJsonLayer();
  }

  toggleMapRouteElements(): void {
    this.mapShowRouteElements = !this.mapShowRouteElements;
    if (this.view === 'map') this.scheduleMapGeoJsonReload();
  }

  toggleMapMarkers(): void {
    this.mapShowMarkers = !this.mapShowMarkers;
    if (this.view === 'map') this.scheduleMapGeoJsonReload();
  }

  ngAfterViewInit(): void {
    this.setupMapResizeObserver();
    this.bindMapFullscreenListener();
  }

  /** Unsubscribes the cross-tab logout listener; null when not in portal mode. */
  private stopRemoteLogoutWatch: (() => void) | null = null;

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickBound);
    this.stopRemoteLogoutWatch?.();
    this.stopRemoteLogoutWatch = null;
    if (this.autoRefreshTimer) {
      clearInterval(this.autoRefreshTimer);
      this.autoRefreshTimer = null;
    }
    this.mapSyncGeneration += 1;
    if (this.mapSyncDebounceTimer != null) {
      clearTimeout(this.mapSyncDebounceTimer);
      this.mapSyncDebounceTimer = null;
    }
    if (this.mapFullscreenListener) {
      document.removeEventListener('fullscreenchange', this.mapFullscreenListener);
      this.mapFullscreenListener = null;
    }
    this.mapResizeObserver?.disconnect();
    this.mapResizeObserver = null;
    this.zoomWatchHandle?.remove();
    this.zoomWatchHandle = null;
    if (this.mapClickHandle && this.mapView) {
      this.mapClickHandle.remove();
      this.mapClickHandle = null;
    }
    for (const url of this.mapGeoJsonObjectUrls) {
      try {
        URL.revokeObjectURL(url);
      } catch {
        /* noop */
      }
    }
    this.mapGeoJsonObjectUrls.length = 0;
    this.mapView?.destroy();
    this.mapView = null;
    this.map = null;
    this.segmentGraphicsLayer = null;
    this.esriOperationalLayers = [];
  }

  private setupMapResizeObserver(): void {
    if (this.mapResizeObserver || typeof ResizeObserver === 'undefined') {
      return;
    }
    const el = this.mapHost?.nativeElement;
    if (!el) return;
    this.mapResizeObserver = new ResizeObserver(() => {
      if (this.mapView) {
        this.ngZone.run(() => this.resizeEsriMapView());
      }
    });
    this.mapResizeObserver.observe(el);
  }

  /** Esri typings omit `resize()` on MapView; it exists at runtime for container size changes. */
  private resizeEsriMapView(): void {
    const v = this.mapView;
    if (!v) return;
    (v as unknown as { resize?: () => void }).resize?.();
  }

  private async initMapIfNeeded(): Promise<void> {
    if (this.view !== 'map') {
      return;
    }
    const host = this.mapHost?.nativeElement;
    if (!host) {
      return;
    }

    if (!this.mapView) {
      this.mapEsriBooting = true;
      this.mapRouteLayersReady = false;
      this.map = new ArcGISMap({
        basemap: createRolloutBasemap(this.mapBasemapStyle),
      });
      this.segmentGraphicsLayer = createSegmentGraphicsLayer('Segment detail');
      this.map.add(this.segmentGraphicsLayer);

      this.mapView = new MapView({
        container: host as HTMLDivElement,
        map: this.map,
        center: [...OMAN_CENTER],
        zoom: OMAN_DEFAULT_ZOOM,
        constraints: { ...OMAN_VIEW_CONSTRAINTS },
        popup: { dockEnabled: true, dockOptions: { position: 'bottom-right' } },
        background: this.createMapViewBackground(this.mapBasemapStyle),
        qualityProfile: 'medium',
        navigation: { mouseWheelZoomEnabled: true, browserTouchPanEnabled: true },
      } as any);
      try {
        await this.mapView.when();
        this.mapDataService.setMapReady(true);
        this.preloadMapContractorRoutes();
      } finally {
        this.mapEsriBooting = false;
      }

      this.zoomWatchHandle = reactiveUtils.watch(
        () => this.mapView?.zoom,
        () => {
          if (this.mapView) {
            this.ngZone.run(() => void this.rebuildSegmentOverlaysEsri());
          }
        }
      );

      this.mapClickHandle = this.mapView.on('click', (event) => {
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
            this.mapSelectedFeatureProps = this.flattenGeoProps(attrs);
          });
        });
      });
    } else {
      this.resizeEsriMapView();
    }

    await this.syncMapGeoJsonLayer();
  }

  get mapDetailEntries(): Array<[string, string]> {
    const p = this.mapSelectedFeatureProps;
    if (!p) return [];
    const preferred = [
      'contractor',
      'name',
      'routeName',
      'routeId',
      'project',
      'projectId',
      'ring',
      'ringId',
      'status',
      'totalLength',
      'completedLength',
      'progress',
      'phase',
      'phaseName',
      'step',
      'rolloutType',
      'rollout_type',
      'featureType',
      'featureId',
      'elementId',
      'markerId',
      'sourceFolder',
      'type',
      'category',
    ];
    const used = new Set<string>();
    const rows: Array<[string, string]> = [];
    for (const key of preferred) {
      const val = p[key];
      if (val === undefined || val === '') continue;
      used.add(key);
      rows.push([this.formatMapDetailLabel(key), val]);
    }
    for (const [key, val] of Object.entries(p)) {
      if (used.has(key) || val === '') continue;
      rows.push([this.formatMapDetailLabel(key), val]);
      if (rows.length >= 36) break;
    }
    return rows;
  }

  private formatMapDetailLabel(key: string): string {
    return key
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  private flattenGeoProps(raw: Record<string, unknown>): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (v === null || v === undefined) continue;
      if (typeof v === 'object') {
        try {
          out[k] = JSON.stringify(v);
        } catch {
          out[k] = '[object]';
        }
      } else {
        out[k] = String(v);
      }
    }
    return out;
  }

  /**
   * Upstream `geojson-by-contractor` expects the contractor **code** (matches `<option [value]>` = `c.id`).
   * Do not send display names or dashboard ring/link ids here — those caused wrong routes (e.g. OFO vs BPT).
   */
  private getMapGeoContractorQuery(): string | undefined {
    const override = (this.mapContractorCode || '').trim();
    if (override) {
      return override;
    }
    if (this.selectedContractor !== 'ALL') {
      return this.selectedContractor.trim();
    }
    return undefined;
  }

  private clearEsriGeoJsonLayers(): void {
    for (const url of this.mapGeoJsonObjectUrls) {
      try {
        URL.revokeObjectURL(url);
      } catch {
        /* noop */
      }
    }
    this.mapGeoJsonObjectUrls.length = 0;
    if (!this.map) return;
    for (const layer of this.esriOperationalLayers) {
      this.map.remove(layer);
      layer.destroy();
    }
    this.esriOperationalLayers = [];
  }

  private asFeatureCollection(gj: GeoJsonFeature | GeoJsonFeatureCollection): GeoJsonFeatureCollection {
    if (gj.type === 'FeatureCollection') {
      return gj;
    }
    return { type: 'FeatureCollection', features: [gj] };
  }

  private addGeoJsonBundle(
    data: unknown,
    ringSel: string,
    titlePrefix: string,
    markerEndpointStyle: boolean
  ): void {
    if (!this.map) return;
    const filtered = filterGeoJsonByRing(data, ringSel);
    if (!filtered) return;
    const gj = toLeafletGeoJsonObject(filtered);
    if (!gj) return;
    const fc = this.asFeatureCollection(gj);
    const { lines, points } = splitLinesAndPoints(fc);
    const lineBuilt = createMainLineGeoJsonLayer(lines, `${titlePrefix} lines`);
    if (lineBuilt) {
      this.map.add(lineBuilt.layer);
      this.esriOperationalLayers.push(lineBuilt.layer);
      this.mapGeoJsonObjectUrls.push(lineBuilt.objectUrl);
    }
    const ptBuilt = createPointGeoJsonLayer(points, `${titlePrefix} points`, markerEndpointStyle);
    if (ptBuilt) {
      this.map.add(ptBuilt.layer);
      this.esriOperationalLayers.push(ptBuilt.layer);
      this.mapGeoJsonObjectUrls.push(ptBuilt.objectUrl);
    }
  }

  private addFeatureCollectionLayer(
    layer: Layer | null,
    trackForExtent = true
  ): void {
    if (!this.map || !layer) return;
    this.map.add(layer);
    if (trackForExtent) {
      this.esriOperationalLayers.push(layer);
    }
  }

  private async nextMapRenderFrame(): Promise<void> {
    await new Promise<void>((resolve) => {
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => resolve());
      } else {
        setTimeout(resolve, 0);
      }
    });
  }

  private scheduleMapGeoJsonReload(debounceMs = 140): void {
    if (this.mapSyncDebounceTimer != null) {
      clearTimeout(this.mapSyncDebounceTimer);
    }
    this.mapSyncDebounceTimer = setTimeout(() => {
      this.mapSyncDebounceTimer = null;
      void this.syncMapGeoJsonLayer();
    }, debounceMs);
  }

  private preloadMapContractorRoutes(): void {
    this.mapDataService.preloadRolloutContractors([...this.rolloutMapContractorCodes]);
  }

  private mapContractorCacheKey(contractor: string | undefined): string {
    return contractor?.trim() || '__ALL__';
  }

  private async fitMapToOperationalLayers(routeExtent: Extent | null): Promise<void> {
    const view = this.mapView;
    if (!view || this.mapFitInFlight) {
      return;
    }
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
      this.resizeEsriMapView();
    }
  }

  private async buildOperationalLayersFromSplit(
    filteredSplit: SplitGeoJsonLayers
  ): Promise<Layer[]> {
    const viewZoom = this.mapView?.zoom;
    const zoomArg = typeof viewZoom === 'number' && Number.isFinite(viewZoom) ? viewZoom : undefined;
    const built: Layer[] = [];

    await this.nextMapRenderFrame();

    const omanHighlight = createRegionGeoJsonLayer(
      OMAN_COUNTRY_HIGHLIGHT_GEOJSON as unknown as GeoJsonFeatureCollection
    );
    if (omanHighlight) {
      built.push(omanHighlight.layer);
      this.mapGeoJsonObjectUrls.push(omanHighlight.objectUrl);
    }

    built.push(createOmanReferenceLabelsLayer());

    const routeLayer = await createTelecomRouteGraphicsLayer(
      filteredSplit.routes,
      'Routes',
      zoomArg
    );
    if (routeLayer) {
      built.push(routeLayer);
    }

    if (this.mapShowRouteElements) {
      const routeElementLayer = await createTelecomRouteGraphicsLayer(
        filteredSplit.routeElements,
        'Route elements',
        zoomArg
      );
      if (routeElementLayer) {
        built.push(routeElementLayer);
      }
    }

    if (this.mapShowMarkers && filteredSplit.markers.features.length) {
      const ptBuilt = createPointGeoJsonLayer(filteredSplit.markers, 'Markers points', true);
      if (ptBuilt) {
        built.push(ptBuilt.layer);
        this.mapGeoJsonObjectUrls.push(ptBuilt.objectUrl);
      }
    }

    return built;
  }

  private mergeRouteElementsOnly(
    split: SplitGeoJsonLayers,
    extraData: unknown
  ): SplitGeoJsonLayers {
    const extra = splitPmsGeoJsonPayload(extraData);
    return mergeSplitLayers(split, {
      routes: { type: 'FeatureCollection', features: [] },
      routeElements: extra.routeElements,
      markers: { type: 'FeatureCollection', features: [] },
      regions: { type: 'FeatureCollection', features: [] },
    });
  }

  private mergeMarkersOnly(
    split: SplitGeoJsonLayers,
    markerData: unknown
  ): SplitGeoJsonLayers {
    const extra = splitPmsGeoJsonPayload(markerData);
    return mergeSplitLayers(split, {
      routes: { type: 'FeatureCollection', features: [] },
      routeElements: { type: 'FeatureCollection', features: [] },
      markers: extra.markers,
      regions: { type: 'FeatureCollection', features: [] },
    });
  }

  private segmentLonLatPath(seg: PhaseSegment): number[][] | null {
    const o = seg as Record<string, unknown>;
    const lat1 = this.safeNumber(o['startLat']);
    const lon1 = this.safeNumber(o['startLon'] ?? o['startLng']);
    const lat2 = this.safeNumber(o['endLat']);
    const lon2 = this.safeNumber(o['endLon'] ?? o['endLng']);
    if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
      return null;
    }
    return [
      [lon1, lat1],
      [lon2, lat2],
    ];
  }

  private segmentStyleForBucket(bucket: 'completed' | 'inProgress' | 'pending' | 'blocked'): {
    color: [number, number, number, number];
    width: number;
    style: 'solid' | 'short-dash' | 'dash';
  } {
    return { color: [207, 63, 90, 255], width: 6, style: 'solid' };
  }

  private async rebuildSegmentOverlaysEsri(): Promise<void> {
    if (!this.mapView || !this.segmentGraphicsLayer) {
      return;
    }
    this.segmentGraphicsLayer.removeAll();
    const zoom = this.mapView.zoom;
    if (zoom < this.segmentDetailMinZoom || !this.phaseRoutes) {
      return;
    }

    const code =
      this.selectedContractor && this.selectedContractor !== 'ALL'
        ? this.selectedContractor.trim()
        : null;
    const displayName = code ? this.getContractorName(this.selectedContractor) : null;
    const routes =
      code && displayName
        ? this.phaseRoutes.routes.filter((route) => {
            const c = (route.contractor || '').trim();
            return c === displayName || c === code;
          })
        : this.phaseRoutes.routes;

    const phaseId = Number(this.phaseId);
    for (const route of routes) {
      const phases = this.filterPhases(route, phaseId);
      for (const phase of phases) {
        for (const seg of phase.segments || []) {
          const path = this.segmentLonLatPath(seg as PhaseSegment);
          if (!path) continue;
          const bucket = this.classifySegment(seg as PhaseSegment);
          const s = this.segmentStyleForBucket(bucket);
          this.segmentGraphicsLayer.add(segmentPolylineGraphic(path, s.color, s.width, s.style));
        }
      }
    }
  }

  private async syncMapGeoJsonLayer(): Promise<void> {
    if (!this.mapView || !this.map) {
      return;
    }

    const syncId = ++this.mapSyncGeneration;
    const ringSel = this.selectedRing || 'ALL';
    const projectSel = this.selectedLink || 'ALL';
    const stepSel = this.selectedStep || 'ALL';
    const stepDisplayName =
      stepSel !== 'ALL' ? this.getStepName(stepSel) : undefined;
    const hadLayers = this.esriOperationalLayers.length > 0;

    if (!hadLayers) {
      this.mapRouteLayersReady = false;
    }
    this.mapGeoJsonLoading = true;
    this.mapGeoJsonError = '';
    if (!hadLayers) {
      this.mapGeoJsonInfo = '';
    }
    this.mapSelectedFeatureProps = null;
    this.segmentGraphicsLayer?.removeAll();

    try {
      const contractor = this.getMapGeoContractorQuery();
      const cacheKey = this.mapContractorCacheKey(contractor);
      const mapLayerParams = contractor ? { contractor } : undefined;

      const loadResult = await this.mapDataService.loadRoutes(contractor, mapLayerParams, {
        useCache: true,
      });
      if (syncId !== this.mapSyncGeneration) {
        return;
      }

      const routesData = loadResult.data;
      if (routesData == null) {
        this.mapGeoJsonError = 'Empty GeoJSON response.';
        return;
      }

      this.mapGisCache.rememberRaw(cacheKey, routesData);

      const mainLeaflet = toLeafletGeoJsonObject(routesData);
      if (!mainLeaflet) {
        this.mapGeoJsonInfo =
          'Could not read route GeoJSON (expected FeatureCollection, geometry, or a common JSON wrapper).';
      } else {
        const totalIn = countGeoJsonFeatures(routesData);
        const visibleMain = countVisibleFeatures(
          routesData,
          ringSel,
          projectSel,
          stepSel,
          stepDisplayName
        );
        if (mainLeaflet.type === 'FeatureCollection' && mainLeaflet.features.length === 0) {
          this.mapGeoJsonInfo = 'Route GeoJSON returned no features.';
        } else if (totalIn > 0 && visibleMain === 0) {
          this.mapGeoJsonInfo =
            'No features match the current contractor, ring, project, or filter selection.';
        }
      }

      let split = splitPmsGeoJsonPayload(routesData);

      if (this.mapShowRouteElements) {
        try {
          const extra = await this.mapDataService.loadRouteElements(contractor, mapLayerParams);
          if (syncId !== this.mapSyncGeneration) {
            return;
          }
          if (countGeoJsonFeatures(extra) > 0) {
            split = this.mergeRouteElementsOnly(split, extra);
          }
        } catch {
          /* optional layer */
        }
      }

      if (this.mapShowMarkers) {
        try {
          const marks = await this.mapDataService.loadMarkers(contractor, mapLayerParams);
          if (syncId !== this.mapSyncGeneration) {
            return;
          }
          if (countGeoJsonFeatures(marks) > 0) {
            split = this.mergeMarkersOnly(split, marks);
          }
        } catch {
          /* optional layer */
        }
      }

      const cached = this.mapGisCache.getFilteredSplit(
        cacheKey,
        ringSel,
        projectSel,
        stepSel,
        stepDisplayName
      );
      const filteredSplit =
        cached?.split ??
        filterSplitForMap(split, ringSel, projectSel, stepSel, stepDisplayName);
      const routeExtent = cached?.extent ?? null;
      const splitCounts = countSplitFeatures(filteredSplit);
      const routeRenderCounts = countRenderableLinePaths(filteredSplit.routes);

      const nextLayers = await this.buildOperationalLayersFromSplit(filteredSplit);
      if (syncId !== this.mapSyncGeneration) {
        for (const layer of nextLayers) {
          layer.destroy();
        }
        return;
      }

      this.clearEsriGeoJsonLayers();
      for (const layer of nextLayers) {
        this.map.add(layer);
        this.esriOperationalLayers.push(layer);
      }

      this.mapRouteLayersReady = this.esriOperationalLayers.length > 0;

      console.table({
        contractor: contractor || 'BPT',
        totalFeatures: routeRenderCounts.totalFeatures,
        renderedRoutes: routeRenderCounts.renderedRoutes,
        missingRoutes: routeRenderCounts.missingRoutes,
        geometryErrors: routeRenderCounts.geometryErrors,
      });

      this.mapGeoJsonInfo = this.mapGeoJsonInfo || (
        splitCounts.total
          ? `Rendered ${splitCounts.routes} route features, ${splitCounts.routeElements} route elements, ${splitCounts.markers} markers.`
          : 'No map features match the current filters.'
      );

      await this.rebuildSegmentOverlaysEsri();

      if (syncId === this.mapSyncGeneration) {
        await this.fitMapToOperationalLayers(routeExtent);
      }
    } catch (err: unknown) {
      if (syncId !== this.mapSyncGeneration) {
        return;
      }
      const ax = err as { response?: { data?: { error?: string } }; message?: string };
      this.mapGeoJsonError =
        ax?.response?.data?.error ||
        ax?.message ||
        'Could not load map data. Check server logs and UPSTREAM auth.';
      if (!hadLayers) {
        this.mapRouteLayersReady = false;
      }
    } finally {
      if (syncId === this.mapSyncGeneration) {
        this.mapGeoJsonLoading = false;
      }
    }
  }


  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  toggleMobileSidebar(): void {
    this.sidebarMobileOpen = !this.sidebarMobileOpen;
  }

  closeMobileSidebar(): void {
    this.sidebarMobileOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggle();
    this.themeMode = this.themeService.getTheme();
  }

  togglePieDrilldown(key: 'donut' | 'nested' | 'radial'): void {
    this.pieDrilldownOpen[key] = !this.pieDrilldownOpen[key];
  }

  // --- Cascading filter logic ---

  cascadeFilters(): void {
    // Flow: Contractor -> Ring -> Link -> Step
    // Use multi-select arrays when available, fall back to legacy single values
    const selectedContractorNames: string[] = [];
    if (this.selectedContractorIds.length > 0 && this.selectedContractorIds.length < this.allContractors.length) {
      for (const id of this.selectedContractorIds) {
        selectedContractorNames.push(this.getContractorName(id));
      }
    } else if (this.selectedContractor && this.selectedContractor !== 'ALL') {
      selectedContractorNames.push(this.getContractorName(this.selectedContractor));
    }

    const contractorNameSet = selectedContractorNames.length > 0 ? new Set(selectedContractorNames) : null;
    const contractorScopedLinks = contractorNameSet
      ? this.allLinks.filter((link) => !link.contractor || contractorNameSet.has(link.contractor))
      : this.allLinks;

    const ringIdsFromLinks = new Set(contractorScopedLinks.map((l) => l.ringId));
    this.filteredRings = this.rings.filter((r) => ringIdsFromLinks.has(r.id));

    // Use multi-select ring IDs when available
    const activeRingIds = this.selectedRingIds.length > 0 && this.selectedRingIds.length < this.filteredRings.length
      ? new Set(this.selectedRingIds)
      : (this.selectedRing && this.selectedRing !== 'ALL' ? new Set([this.selectedRing]) : null);
    this.filteredLinks = activeRingIds
      ? contractorScopedLinks.filter(l => activeRingIds.has(l.ringId))
      : contractorScopedLinks;

    // Steps: filter by selected links (multi-select or legacy single)
    const activeLinkIds = this.selectedLinkIds.length > 0 && this.selectedLinkIds.length < this.filteredLinks.length
      ? this.selectedLinkIds
      : (this.selectedLink && this.selectedLink !== 'ALL' ? [this.selectedLink] : this.filteredLinks.map((l) => l.id));
    this.filteredSteps = this.allSteps.filter(
      s => s.linkIds.some(lid => activeLinkIds.includes(lid))
    );

    // Contractors: filter by selected step (or all filtered steps)
    const activeStepIds = this.selectedStep && this.selectedStep !== 'ALL'
      ? [this.selectedStep]
      : this.filteredSteps.map((s) => s.id);
    this.filteredContractors = this.allContractors.filter(
      c => c.stepIds.some(sid => activeStepIds.includes(sid))
    );

    let count = 0;
    if (this.selectedRingIds.length > 0 && this.selectedRingIds.length < this.filteredRings.length) {
      count += this.selectedRingIds.length;
    } else if (this.selectedRing && this.selectedRing !== 'ALL') {
      count++;
    }
    if (this.selectedLinkIds.length > 0 && this.selectedLinkIds.length < this.filteredLinks.length) {
      count += this.selectedLinkIds.length;
    } else if (this.selectedLink && this.selectedLink !== 'ALL') {
      count++;
    }
    if (this.selectedStep && this.selectedStep !== 'ALL') count++;
    if (this.selectedContractorIds.length > 0 && this.selectedContractorIds.length < this.allContractors.length) {
      count += this.selectedContractorIds.length;
    } else if (this.selectedContractor && this.selectedContractor !== 'ALL') {
      count++;
    }
    if (this.filterFromDate) count++;
    if (this.filterToDate) count++;
    this.activeFilterCount = count;
  }

  async onRingChange(): Promise<void> {
    this.selectedLink = 'ALL';
    this.selectedStep = 'ALL';
    await this.loadScopedFilters();
    this.cascadeFilters();
    await this.onFiltersApplied();
  }

  async onLinkChange(): Promise<void> {
    this.selectedStep = 'ALL';
    await this.loadScopedFilters();
    this.cascadeFilters();
    await this.onFiltersApplied();
  }

  async onStepChange(): Promise<void> {
    this.cascadeFilters();
    await this.onFiltersApplied();
  }

  async onContractorFilterChange(): Promise<void> {
    this.selectedRing = 'ALL';
    this.selectedLink = 'ALL';
    this.selectedStep = 'ALL';
    await this.loadScopedFilters();
    this.cascadeFilters();
    await this.onFiltersApplied();
  }

  async resetFilters(): Promise<void> {
    this.selectedContractor = 'ALL';
    this.selectedContractorIds = [];
    this.selectedRing = 'ALL';
    this.selectedRingIds = [];
    this.selectedLink = 'ALL';
    this.selectedLinkIds = [];
    this.selectedStep = 'ALL';
    this.filterFromDate = '';
    this.filterToDate = '';
    this.mapSelectedFeatureProps = null;
    this.mapGisCache.clear();
    this.mapDataService.clearCache();
    await this.loadScopedFilters();
    this.cascadeFilters();
    await this.onFiltersApplied();
    if (this.view === 'map') {
      this.scheduleMapGeoJsonReload(0);
    }
  }

  openFilterModal(): void {
    this.filterSnapshot = {
      contractorIds: [...this.selectedContractorIds],
      ringIds: [...this.selectedRingIds],
      linkIds: [...this.selectedLinkIds],
      step: this.selectedStep,
    };
    this.filterModalOpen = true;
  }

  cancelFilterModal(): void {
    if (this.filterSnapshot) {
      this.selectedContractorIds = this.filterSnapshot.contractorIds;
      this.selectedRingIds = this.filterSnapshot.ringIds;
      this.selectedLinkIds = this.filterSnapshot.linkIds;
      this.selectedStep = this.filterSnapshot.step;
      this.cascadeFilters();
    }
    this.filterModalOpen = false;
    this.filterSnapshot = null;
  }

  async applyFilterModal(): Promise<void> {
    this.filterModalOpen = false;
    this.filterSnapshot = null;
    this.cascadeFilters();
    await this.onFiltersApplied();
    if (this.view === 'map') {
      this.scheduleMapGeoJsonReload(0);
    }
  }

  private async onFiltersApplied(): Promise<void> {
    await Promise.all([
      this.loadData(),
      this.loadDimensionKpis(),
      this.loadV2Charts(),
      this.loadSegmentCounts(),
    ]);
  }

  getRingName(id: string): string {
    return this.rings.find(r => r.id === id)?.name ?? id;
  }

  getLinkName(id: string): string {
    return this.allLinks.find(l => l.id === id)?.name ?? id;
  }

  getStepName(id: string): string {
    return this.allSteps.find(s => s.id === id)?.name ?? id;
  }

  getContractorName(id: string): string {
    return this.allContractors.find(c => c.id === id)?.name ?? id;
  }

  async loadData(): Promise<void> {
    if (!this.projectId) {
      this.snapshot = null;
      this.phaseRoutes = null;
      return;
    }

    try {
      this.error = '';
      this.loading = true;

      try {
        // Build contractor param from multi-select or legacy
        let bootContractor = 'ALL';
        if (this.selectedContractorIds.length > 0 && this.selectedContractorIds.length < this.allContractors.length) {
          bootContractor = this.selectedContractorIds.map(id => this.getContractorName(id)).join(',');
        } else if (this.selectedContractor !== 'ALL') {
          bootContractor = this.getContractorName(this.selectedContractor);
        }

        // Build ring param from multi-select or legacy
        let bootRingId: string | undefined;
        if (this.selectedRingIds.length > 0 && this.selectedRingIds.length < this.filteredRings.length) {
          bootRingId = this.selectedRingIds.join(',');
        } else if (this.selectedRing !== 'ALL') {
          bootRingId = this.selectedRing;
        }

        // Build link param from multi-select or legacy
        let bootLinkId: string | undefined;
        if (this.selectedLinkIds.length > 0 && this.selectedLinkIds.length < this.filteredLinks.length) {
          bootLinkId = this.selectedLinkIds.join(',');
        } else if (this.selectedLink !== 'ALL') {
          bootLinkId = this.selectedLink;
        }

        const boot = await getDashboardBootstrap(this.projectId, {
          phaseId: this.phaseId || undefined,
          contractor: bootContractor,
          ringId: bootRingId,
          linkId: bootLinkId,
        });

        if (boot.overallDistribution && this.projectId) {
          this.snapshot = boot.overallDistribution;
          this.applyDistribution(boot.overallDistribution.data || {});
        } else {
          this.snapshot = null;
          if (this.projectId) {
            try {
              const data = await getOverallDistribution(this.projectId);
              this.snapshot = data;
              this.applyDistribution(data?.data || {});
            } catch {
              console.warn('Overall distribution API unavailable, using fallback data.');
            }
          }
        }

        if (boot.contractorStatus?.length) {
          this.contractorStatus = boot.contractorStatus;
          this.contractors = this.mergeContractors(
            this.contractors,
            this.extractContractorsFromStatus(boot.contractorStatus)
          );
          this.projectIds = this.extractProjectIds(boot.contractorStatus);
          if (
            this.projectId &&
            !this.projectIds.includes(this.projectId)
          ) {
            this.projectId = this.projectIds[0] || this.projectId;
          }
        } else {
          await this.loadContractorStatus();
        }

        if (boot.routesSegments && this.phaseId) {
          this.phaseRoutes = boot.routesSegments;
          this.contractors = this.mergeContractors(
            this.contractors,
            this.extractContractors(boot.routesSegments)
          );
          this.phaseIds = this.extractPhaseIds(boot.routesSegments);
          this.applySegmentMetrics();
        } else {
          await this.loadPhaseSegments();
        }

        if (boot.kpis?.row) {
          this.totalPlanned = boot.kpis.row.total_planned_km;
          this.completed = boot.kpis.row.completed_km;
          this.inProgress = boot.kpis.row.in_progress_km;
          this.pending = boot.kpis.row.pending_km;
          this.blockedSegments = boot.kpis.row.blocked_km;
          this.weeklyRate = null;
          this.updateStatusSplit();
        } else {
          await this.loadAggregateKpis();
        }

        this.applyContractorStatusFilter();
      } catch (bootstrapError) {
        console.warn('Bootstrap load failed, using parallel requests:', bootstrapError);
        await this.loadDataParallelLegacy();
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      this.loading = false;
      if (this.view === 'map') {
        this.scheduleMapGeoJsonReload();
      }
    }
  }

  private async loadDataParallelLegacy(): Promise<void> {
    if (this.projectId) {
      try {
        const data = await getOverallDistribution(this.projectId);
        this.snapshot = data;
        this.applyDistribution(data?.data || {});
      } catch {
        console.warn('Overall distribution API unavailable, using fallback data.');
        this.snapshot = null;
      }
    } else {
      this.snapshot = null;
    }
    await Promise.all([
      this.loadPhaseSegments(),
      this.loadContractorStatus(),
      this.loadAggregateKpis(),
    ]);
    this.applyContractorStatusFilter();
  }

  async handleRefresh(): Promise<void> {
    if (!this.projectId) return;
    try {
      this.refreshing = true;
      try { await refreshDashboard(this.projectId); } catch { /* API unavailable */ }
      await this.loadData();
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      this.refreshing = false;
    }
  }

  get completionRate(): number | null {
    if (!this.totalPlanned || !this.completed) return null;
    if (this.totalPlanned <= 0) return null;
    return Math.min(100, (this.completed / this.totalPlanned) * 100);
  }

  get completionStatus(): string {
    const rate = this.completionRate;
    if (rate === null) return 'Awaiting data';
    return rate >= 60 ? 'On track' : 'Needs attention';
  }

  get completionGap(): string {
    const rate = this.completionRate;
    if (rate === null) return '-';
    const gap = 62 - rate;
    const sign = gap > 0 ? '-' : '+';
    return `${sign}${Math.abs(gap).toFixed(1)}%`;
  }

  /** % of planned km that is completed (for status chart bar). */
  get statusChartCompletedPlanPct(): number {
    const planned = this.safeNumber(this.totalPlanned) || 0;
    const done = this.safeNumber(this.completed) || 0;
    if (planned <= 0) return 0;
    return Math.min(100, (done / planned) * 100);
  }

  /** % of planned km that is in progress (for status chart bar). */
  get statusChartInProgressPlanPct(): number {
    const planned = this.safeNumber(this.totalPlanned) || 0;
    const active = this.safeNumber(this.inProgress) || 0;
    if (planned <= 0) return 0;
    return Math.min(100, (active / planned) * 100);
  }

  /** Share of (completed + in-progress) km that is completed. */
  get statusChartCompletedSharePct(): number {
    const done = this.safeNumber(this.completed) || 0;
    const active = this.safeNumber(this.inProgress) || 0;
    const sum = done + active;
    if (sum <= 0) return 0;
    return (done / sum) * 100;
  }

  /** Share of (completed + in-progress) km that is in progress. */
  get statusChartInProgressSharePct(): number {
    const done = this.safeNumber(this.completed) || 0;
    const active = this.safeNumber(this.inProgress) || 0;
    const sum = done + active;
    if (sum <= 0) return 0;
    return (active / sum) * 100;
  }

  /** % of planned km still pending (for status chart bar). */
  get statusChartPendingPlanPct(): number {
    const planned = this.safeNumber(this.totalPlanned) || 0;
    const queued = this.safeNumber(this.pending) || 0;
    if (planned <= 0) return 0;
    return Math.min(100, Math.max(0, (queued / planned) * 100));
  }

  get activeMapBasemapLabel(): string {
    const match = this.rolloutBasemapOptions.find((opt) => opt.id === this.mapBasemapStyle);
    return match?.label ?? 'GIS';
  }

  getContractorInProgressPct(c: ContractorChartRow): number {
    return c.totalKm > 0 ? Math.min(100, (c.inProgressKm / c.totalKm) * 100) : 0;
  }

  getContractorPendingPct(c: ContractorChartRow): number {
    return c.totalKm > 0 ? Math.min(100, (c.pendingKm / c.totalKm) * 100) : 0;
  }

  getContractorBlockedPct(c: ContractorChartRow): number {
    return c.totalKm > 0 ? Math.min(100, (c.blockedKm / c.totalKm) * 100) : 0;
  }

  openReportExportModal(): void {
    this.reportExportError = '';
    this.reportExportProgressMessage = '';
    this.reportExportModalOpen = true;
  }

  closeReportExportModal(): void {
    if (this.reportExportInProgress) {
      return;
    }
    this.reportExportModalOpen = false;
    this.reportExportError = '';
    this.reportExportProgressMessage = '';
  }

  async handleReportExport(request: ReportExportRequest): Promise<void> {
    if (this.reportExportInProgress) {
      return;
    }
    this.reportExportInProgress = true;
    this.reportExportError = '';
    this.reportExportProgressMessage = 'Starting export…';
    try {
      await this.reportExportService.export(
        this.buildReportSnapshotSource(),
        request,
        (message) => {
          this.reportExportProgressMessage = message;
        }
      );
      this.reportExportModalOpen = false;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Report export failed.';
      this.reportExportError = message;
    } finally {
      this.reportExportInProgress = false;
      this.reportExportProgressMessage = '';
    }
  }

  private buildReportSnapshotSource(): ReportSnapshotSource {
    return {
      title: 'Fiber Rollout Dashboard',
      eyebrow: 'Rollout workspace',
      reportingWindow: 'Current dashboard scope',
      projectId: this.projectId,
      selectedContractor: this.selectedContractor,
      selectedRing: this.selectedRing,
      selectedLink: this.selectedLink,
      selectedStep: this.selectedStep,
      getContractorName: (id) => this.getContractorName(id),
      getRingName: (id) => this.getRingName(id),
      getLinkName: (id) => this.getLinkName(id),
      getStepName: (id) => this.getStepName(id),
      totalPlanned: this.totalPlanned,
      completed: this.completed,
      inProgress: this.inProgress,
      pending: this.pending,
      blockedSegments: this.blockedSegments,
      weeklyRate: this.weeklyRate,
      completionRate: this.completionRate,
      completionStatus: this.completionStatus,
      ringProgressData: this.ringProgressData,
      contractorChartData: this.contractorChartData,
      stepProgressData: this.stepProgressData,
      getCompletionPct: (row) => this.getCompletionPct(row),
      getStepCompletedPct: (step) => this.getStepCompletedPct(step),
      getContractorCompletionPct: (c) => this.getContractorCompletionPct(c),
      getStepExecutionStatus: (step) => this.getStepExecutionStatus(step),
      formatNumber: (value, unit) => this.formatNumber(value, unit),
      formatPercent: (value) => this.formatPercent(value),
    };
  }

  isRccHoverActive(key: string): boolean {
    return this.rccHoverKey === key;
  }

  isRccHoverDimmed(_rowPrefix: string, rowKey: string): boolean {
    const active = this.rccHoverKey;
    if (!active) {
      return false;
    }
    if (active.startsWith(rowKey)) {
      return false;
    }
    if (active.startsWith('overall:')) {
      return rowKey.startsWith('ring:') || rowKey.startsWith('contractor:');
    }
    if (rowKey.startsWith('ring:') && active.startsWith('ring:')) {
      return true;
    }
    if (rowKey.startsWith('contractor:') && active.startsWith('contractor:')) {
      return true;
    }
    return false;
  }

  moveRccTooltip(event: MouseEvent | FocusEvent): void {
    if ('clientX' in event && 'clientY' in event) {
      this.rccTooltipX = event.clientX;
      this.rccTooltipY = event.clientY;
    }
  }

  hideRccTooltip(): void {
    this.rccHoverKey = null;
    this.rccTooltip = null;
  }

  private showRccTooltip(
    event: MouseEvent | FocusEvent,
    key: string,
    payload: RccTooltipPayload
  ): void {
    this.rccHoverKey = key;
    this.rccTooltip = payload;
    this.moveRccTooltip(event);
  }

  onOverallRadialEnter(event: MouseEvent | FocusEvent): void {
    this.showRccTooltip(event, 'overall:radial', {
      title: 'Rollout completion',
      accent: 'neutral',
      rows: [
        { label: 'Complete', value: this.formatPercent(this.completionRate) },
        {
          label: 'Completed share',
          value: `${this.statusChartCompletedPlanPct.toFixed(0)}% of plan`,
        },
        {
          label: 'In progress share',
          value: `${this.statusChartInProgressPlanPct.toFixed(0)}% of plan`,
        },
        {
          label: 'Pending share',
          value: `${this.statusChartPendingPlanPct.toFixed(0)}% of plan`,
        },
      ],
      footnote: this.completionStatus,
    });
  }

  onOverallStatEnter(event: MouseEvent | FocusEvent, segment: RccOverallSegment): void {
    const labels: Record<RccOverallSegment, string> = {
      completed: 'Completed',
      progress: 'In progress',
      pending: 'Pending',
    };
    const accents: Record<RccOverallSegment, RccTooltipPayload['accent']> = {
      completed: 'completed',
      progress: 'progress',
      pending: 'pending',
    };
    const km =
      segment === 'completed'
        ? this.completed
        : segment === 'progress'
          ? this.inProgress
          : this.pending;
    const planned = this.safeNumber(this.totalPlanned) || 0;
    const value = this.safeNumber(km) || 0;
    const pct = planned > 0 ? Math.min(100, (value / planned) * 100) : 0;
    this.showRccTooltip(event, `overall:${segment}`, {
      title: labels[segment],
      accent: accents[segment],
      rows: [
        { label: 'Volume', value: this.formatNumber(km, 'km') },
        { label: 'Share of plan', value: `${pct.toFixed(1)}%` },
        { label: 'Total planned', value: this.formatNumber(this.totalPlanned, 'km'), muted: true },
      ],
    });
  }

  onOverallMixEnter(event: MouseEvent | FocusEvent, segment: RccOverallSegment): void {
    const pct =
      segment === 'completed'
        ? this.statusChartCompletedPlanPct
        : segment === 'progress'
          ? this.statusChartInProgressPlanPct
          : this.statusChartPendingPlanPct;
    this.onOverallStatEnter(event, segment);
    if (this.rccTooltip) {
      this.rccTooltip = {
        ...this.rccTooltip,
        rows: [
          ...this.rccTooltip.rows,
          { label: 'Bar width', value: `${pct.toFixed(1)}%`, muted: true },
        ],
      };
    }
  }

  onRingRowEnter(event: MouseEvent | FocusEvent, ring: RingProgressRow): void {
    const pct = this.getCompletionPct(ring);
    this.showRccTooltip(event, `ring:${ring.id}`, {
      title: ring.name,
      accent: 'neutral',
      rows: [
        { label: 'Completion', value: `${pct.toFixed(1)}%` },
        {
          label: 'Completed',
          value: `${ring.completedKm.toFixed(0)} / ${ring.totalKm.toFixed(0)} km`,
        },
        { label: 'In progress', value: `${ring.inProgressKm.toFixed(0)} km` },
        { label: 'Pending', value: `${ring.pendingKm.toFixed(0)} km` },
        { label: 'Blocked', value: `${ring.blockedKm.toFixed(0)} km`, muted: true },
      ],
    });
  }

  onRingSegmentEnter(
    event: MouseEvent | FocusEvent,
    ring: RingProgressRow,
    segment: RccRingSegment
  ): void {
    const labels: Record<RccRingSegment, string> = {
      completed: 'Completed',
      progress: 'In progress',
      pending: 'Pending',
      blocked: 'Blocked',
    };
    const km =
      segment === 'completed'
        ? ring.completedKm
        : segment === 'progress'
          ? ring.inProgressKm
          : segment === 'pending'
            ? ring.pendingKm
            : ring.blockedKm;
    const pct =
      segment === 'completed'
        ? this.getCompletionPct(ring)
        : segment === 'progress'
          ? this.getInProgressPct(ring)
          : segment === 'pending'
            ? this.getPendingPct(ring)
            : this.getBlockedPct(ring);
    this.showRccTooltip(event, `ring:${ring.id}:${segment}`, {
      title: `${ring.name} · ${labels[segment]}`,
      accent: segment === 'blocked' ? 'blocked' : segment,
      rows: [
        { label: 'Volume', value: `${km.toFixed(0)} km` },
        { label: 'Share of ring', value: `${pct.toFixed(1)}%` },
        {
          label: 'Ring total',
          value: `${ring.completedKm.toFixed(0)} / ${ring.totalKm.toFixed(0)} km completed`,
          muted: true,
        },
      ],
    });
  }

  onContractorRowEnter(event: MouseEvent | FocusEvent, contractor: ContractorChartRow): void {
    const pct = this.getContractorCompletionPct(contractor);
    this.showRccTooltip(event, `contractor:${contractor.id}`, {
      title: contractor.name,
      accent: 'neutral',
      rows: [
        { label: 'Completion', value: `${pct.toFixed(1)}%` },
        {
          label: 'Completed',
          value: `${contractor.completedKm.toFixed(0)} / ${contractor.totalKm.toFixed(0)} km`,
        },
        { label: 'On-time score', value: `${contractor.onTime.toFixed(0)}%` },
        { label: 'Delayed items', value: String(contractor.delayed) },
      ],
      footnote:
        contractor.onTime >= 75
          ? 'On track'
          : contractor.onTime >= 50
            ? 'At risk'
            : 'Delayed',
    });
  }

  onContractorSegmentEnter(
    event: MouseEvent | FocusEvent,
    contractor: ContractorChartRow,
    segment: RccRingSegment
  ): void {
    const labels: Record<RccRingSegment, string> = {
      completed: 'Completed',
      progress: 'In progress',
      pending: 'Pending',
      blocked: 'Blocked',
    };
    const km =
      segment === 'completed'
        ? contractor.completedKm
        : segment === 'progress'
          ? contractor.inProgressKm
          : segment === 'pending'
            ? contractor.pendingKm
            : contractor.blockedKm;
    const pct =
      segment === 'completed'
        ? this.getContractorCompletionPct(contractor)
        : segment === 'progress'
          ? this.getContractorInProgressPct(contractor)
          : segment === 'pending'
            ? this.getContractorPendingPct(contractor)
            : this.getContractorBlockedPct(contractor);
    this.showRccTooltip(event, `contractor:${contractor.id}:${segment}`, {
      title: `${contractor.name} · ${labels[segment]}`,
      accent: segment === 'blocked' ? 'blocked' : segment,
      rows: [
        { label: 'Volume', value: `${km.toFixed(0)} km` },
        { label: 'Share of portfolio', value: `${pct.toFixed(1)}%` },
      ],
    });
  }

  isContractorCardSelected(contractor: ContractorChartRow): boolean {
    return this.selectedContractor !== 'ALL' && this.selectedContractor === contractor.id;
  }

  onContractorCardActivate(event: Event, contractor: ContractorChartRow): void {
    event.stopPropagation();
    this.selectedContractor = this.isContractorCardSelected(contractor) ? 'ALL' : contractor.id;
    void this.onContractorFilterChange();
  }

  onContractorCardKeydown(event: KeyboardEvent, contractor: ContractorChartRow): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onContractorCardActivate(event, contractor);
    }
  }

  resetContractorPanelFilter(event: Event): void {
    event.stopPropagation();
    if (this.selectedContractor === 'ALL') {
      return;
    }
    this.selectedContractor = 'ALL';
    void this.onContractorFilterChange();
  }

  onMapSidebarContractorPick(contractor: ContractorChartRow): void {
    this.selectedContractor = contractor.id;
    this.selectedContractorIds = [contractor.id];
    this.mapContractorCode = contractor.id;
    void this.onContractorFilterChange();
  }

  onMapContractorOverrideChange(): void {
    if (this.view === 'map') {
      this.scheduleMapGeoJsonReload(80);
    }
  }

  mapZoomIn(): void {
    const view = this.mapView;
    if (!view) {
      return;
    }
    const zoom = view.zoom;
    if (typeof zoom === 'number' && Number.isFinite(zoom)) {
      view.zoom = zoom + 1;
    }
  }

  mapZoomOut(): void {
    const view = this.mapView;
    if (!view) {
      return;
    }
    const zoom = view.zoom;
    if (typeof zoom === 'number' && Number.isFinite(zoom)) {
      view.zoom = Math.max(1, zoom - 1);
    }
  }

  async mapResetBounds(): Promise<void> {
    const view = this.mapView;
    if (!view) {
      return;
    }
    const contractor = this.getMapGeoContractorQuery();
    const stepSel = this.selectedStep || 'ALL';
    const cached = this.mapGisCache.getFilteredSplit(
      this.mapContractorCacheKey(contractor),
      this.selectedRing || 'ALL',
      this.selectedLink || 'ALL',
      stepSel,
      stepSel !== 'ALL' ? this.getStepName(stepSel) : undefined
    );
    if (this.esriOperationalLayers.length) {
      await this.fitMapToOperationalLayers(cached?.extent ?? null);
      return;
    }
    await goToDefaultOmanView(view);
  }

  toggleMapFullscreen(): void {
    const el = this.mapStageRef?.nativeElement;
    if (!el) {
      return;
    }
    if (document.fullscreenElement === el) {
      void document.exitFullscreen();
      return;
    }
    void el.requestFullscreen().catch(() => {
      this.mapIsFullscreen = false;
    });
  }

  toggleMapBasemapMenu(event: Event): void {
    event.stopPropagation();
    this.mapBasemapMenuOpen = !this.mapBasemapMenuOpen;
  }

  selectMapBasemap(id: RolloutBasemapId, event: Event): void {
    event.stopPropagation();
    if (this.mapBasemapStyle === id) {
      this.mapBasemapMenuOpen = false;
      return;
    }
    this.mapBasemapStyle = id;
    this.mapBasemapMenuOpen = false;
    this.applyMapBasemap(id);
  }

  private applyMapBasemap(id: RolloutBasemapId): void {
    if (!this.map) {
      return;
    }
    this.map.basemap = createRolloutBasemap(id);
    if (this.mapView) {
      this.mapView.background = this.createMapViewBackground(id);
    }
  }

  private createMapViewBackground(id: RolloutBasemapId): ColorBackground {
    return new ColorBackground({ color: new Color(this.rolloutMapViewBackgroundRgba(id)) });
  }

  /** MapView tile-load backdrop (matches esri-basemap.ts palette). */
  private rolloutMapViewBackgroundRgba(id: RolloutBasemapId): [number, number, number, number] {
    switch (id) {
      case 'imagery':
      case 'imagery-hybrid':
      case 'gis':
      case 'satellite':
        return [18, 22, 28, 1];
      case 'light-gray':
      case 'streets':
      case 'streets-relief':
      case 'topographic':
      case 'navigation':
      case 'community':
      case 'modern-antique':
      case 'osm':
      case 'light':
      case 'street':
        return [214, 228, 236, 1];
      case 'terrain-labels':
      case 'outdoor':
      case 'terrain':
        return [236, 240, 236, 1];
      case 'oceans':
        return [194, 213, 224, 1];
      case 'dark-gray':
      case 'streets-night':
      case 'navigation-night':
      case 'nova':
      case 'dark':
      default:
        return [22, 26, 32, 1];
    }
  }

  private bindMapFullscreenListener(): void {
    if (this.mapFullscreenListener || typeof document === 'undefined') {
      return;
    }
    this.mapFullscreenListener = () => {
      const el = this.mapStageRef?.nativeElement;
      this.ngZone.run(() => {
        this.mapIsFullscreen = !!el && document.fullscreenElement === el;
      });
    };
    document.addEventListener('fullscreenchange', this.mapFullscreenListener);
  }

  get donutBackground(): string {
    const completed = this.safeNumber(this.completed) || 0;
    const inProgress = this.safeNumber(this.inProgress) || 0;
    const pending = this.safeNumber(this.pending) || 0;
    const total = completed + inProgress + pending;
    if (total === 0) {
      return `conic-gradient(var(--border) 0 100%)`;
    }
    const completedPct = (completed / total) * 100;
    const inProgressPct = (inProgress / total) * 100;
    const split = completedPct + inProgressPct;
    return `conic-gradient(
      var(--success) 0 ${completedPct}%,
      var(--ops-active) ${completedPct}% ${split}%,
      var(--border) ${split}% 100%
    )`;
  }

  get pieCompletedPct(): number {
    const total = this.pieDummy.totalPlannedKm || 0;
    return total ? (this.pieDummy.completedKm / total) * 100 : 0;
  }

  get pieInProgressPct(): number {
    const total = this.pieDummy.totalPlannedKm || 0;
    return total ? (this.pieDummy.inProgressKm / total) * 100 : 0;
  }

  get pieRemainingPct(): number {
    const used = this.pieCompletedPct + this.pieInProgressPct;
    return Math.max(0, 100 - used);
  }

  get pieDonutStyle(): string {
    const completed = this.pieCompletedPct;
    const inProgress = this.pieInProgressPct;
    const split = completed + inProgress;
    return `conic-gradient(
      var(--success) 0 ${completed}%,
      var(--ops-active) ${completed}% ${split}%,
      var(--border) ${split}% 100%
    )`;
  }

  get pieStatusRingStyle(): string {
    return this.pieDonutStyle;
  }

  get pieContractorRingStyle(): string {
    const total = this.pieDummy.contractors.reduce((sum, c) => sum + c.plannedKm, 0) || 1;
    const palette = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#f97316'];
    let start = 0;
    const stops = this.pieDummy.contractors.map((contractor, index) => {
      const pct = (contractor.plannedKm / total) * 100;
      const end = start + pct;
      const color = palette[index % palette.length];
      const segment = `${color} ${start}% ${end}%`;
      start = end;
      return segment;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }

  get pieRadialStyle(): string {
    const completed = this.pieCompletedPct;
    return `conic-gradient(var(--success) 0 ${completed}%, #e2e8f0 ${completed}% 100%)`;
  }

  formatNumber(value: number | null, unit?: string): string {
    if (value === null || value === undefined || Number.isNaN(value)) return '-';
    const formatted = Number.isInteger(value) ? value.toString() : value.toFixed(1);
    return unit ? `${formatted} ${unit}` : formatted;
  }

  formatPercent(value: number | null): string {
    if (value === null || value === undefined || Number.isNaN(value)) return '-';
    return `${value.toFixed(0)}%`;
  }

  async loadPhaseSegments(): Promise<void> {
    if (!this.phaseId) {
      this.phaseRoutes = null;
      return;
    }

    try {
      const response = await getRoutesSegmentsPhaseWise(this.phaseId);
      this.phaseRoutes = response;
      this.contractors = this.mergeContractors(
        this.contractors,
        this.extractContractors(response)
      );
      const extractedPhaseIds = this.extractPhaseIds(response);
      this.phaseIds = extractedPhaseIds;
      this.applySegmentMetrics();
      this.applyContractorStatusFilter();
    } catch (error) {
      console.error('Failed to load phase segments, using fallback data:', error);
      this.phaseRoutes = null;
    } finally {
      if (this.view === 'map') {
        this.scheduleMapGeoJsonReload();
      }
    }
  }

  handlePhaseChange(): void {
    this.loadPhaseSegments();
    this.loadAggregateKpis();
  }

  handleProjectChange(): void {
    this.loadData();
    this.applyContractorStatusFilter();
    this.loadAggregateKpis();
  }

  handleContractorChange(): void {
    this.applySegmentMetrics();
    this.applyContractorStatusFilter();
    this.loadAggregateKpis();
  }

  async handleRoutesExport(): Promise<void> {
    if (this.exportInProgress) return;
    this.exportError = '';
    this.exportInProgress = true;
    try {
      let contractorName = 'ALL';
      if (this.selectedContractorIds.length === 1) {
        contractorName = this.getContractorName(this.selectedContractorIds[0]);
      } else if (this.selectedContractor !== 'ALL') {
        contractorName = this.getContractorName(this.selectedContractor);
      }
      const blob = await exportRoutesFile({
        contractor: contractorName,
        format: 'kmz',
        ringId:
          this.selectedRing !== 'ALL'
            ? this.normalizeRingIdForExport(this.selectedRing)
            : undefined,
        projectId:
          this.selectedLink !== 'ALL' ? this.selectedLink : undefined,
        onlyCompleted: false,
        backboneOnly: true,
        includeMarkers: true,
      });
      const stamp = new Date().toISOString().slice(0, 10);
      const contractorToken =
        contractorName === 'ALL'
          ? 'all-contractors'
          : contractorName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const ext = contractorName === 'ALL' ? 'zip' : 'kmz';
      const filterParts: string[] = [];
      if (this.selectedRing !== 'ALL') {
        filterParts.push(`ring-${this.normalizeRingIdForExport(this.selectedRing)}`);
      }
      if (this.selectedLink !== 'ALL') {
        filterParts.push(`project-${String(this.selectedLink).replace(/[^a-z0-9]+/gi, '-')}`);
      }
      const filterSuffix = filterParts.length ? `-${filterParts.join('-')}` : '';
      const fileName = `routes-${contractorToken}${filterSuffix}-${stamp}.${ext}`;

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error: unknown) {
      console.error('Failed to export routes:', error);
      const msg =
        error instanceof Error && error.message
          ? error.message
          : 'Failed to export routes. Please try again.';
      this.exportError = msg;
    } finally {
      this.exportInProgress = false;
    }
  }

  /** Align ring id with upstream `/api/kml/routes/export` (strip optional `R` prefix). */
  private normalizeRingIdForExport(ringId: string): string {
    return String(ringId || '').replace(/^R/i, '');
  }

  applySegmentMetrics(): void {
    if (!this.phaseRoutes) {
      return;
    }

    const routes =
      this.selectedContractor && this.selectedContractor !== 'ALL'
        ? this.phaseRoutes.routes.filter((route) => {
            const c = (route.contractor || '').trim();
            const code = this.selectedContractor.trim();
            const displayName = this.getContractorName(this.selectedContractor);
            return c === displayName || c === code;
          })
        : this.phaseRoutes.routes;

    const totals = {
      completed: 0,
      inProgress: 0,
      pending: 0,
      blocked: 0,
      total: 0,
    };

    const phaseId = Number(this.phaseId);
    for (const route of routes) {
      const phases = this.filterPhases(route, phaseId);
      for (const phase of phases) {
        const segments = phase.segments || [];
        for (const segment of segments) {
          const lengthM = this.safeNumber(segment.lengthM) || 0;
          const lengthKm = lengthM / 1000;
          totals.total += lengthKm;
          const bucket = this.classifySegment(segment);
          totals[bucket] += lengthKm;
        }
      }
    }

    this.completed = totals.completed;
    this.inProgress = totals.inProgress;
    this.pending = totals.pending;
    this.blockedSegments = totals.blocked;
    this.totalPlanned = totals.total;
    this.weeklyRate = null;
    this.updateStatusSplit();
  }

  async loadContractorStatus(): Promise<void> {
    try {
      const response = await getContractorProjectStatus();
      this.contractorStatus = response;
      this.contractors = this.mergeContractors(
        this.contractors,
        this.extractContractorsFromStatus(response)
      );
      this.projectIds = this.extractProjectIds(response);
      if (this.projectId && !this.projectIds.includes(this.projectId)) {
        this.projectId = this.projectIds[0] || this.projectId;
      }
      this.applyContractorStatusFilter();
    } catch (error) {
      console.error('Failed to load contractor status, using fallback data:', error);
      const fallback: ContractorProjectStatus[] = this.contractorChartData.map(c => ({
        projectId: 90,
        contractor: c.name,
        completedPercent: (c.completedKm / c.totalKm) * 100,
        inProgressPercent: (c.inProgressKm / c.totalKm) * 100,
        plannedPercent: (c.pendingKm / c.totalKm) * 100,
        phaseBreakdown: [
          { phase: 'Civil Works', percentage: 35 },
          { phase: 'Cable Laying', percentage: 28 },
          { phase: 'Splicing', percentage: 22 },
          { phase: 'Testing', percentage: 15 },
        ],
      }));
      this.contractorStatus = fallback;
      this.contractors = this.mergeContractors(
        this.contractors,
        this.extractContractorsFromStatus(fallback)
      );
      this.projectIds = ['90'];
      this.applyContractorStatusFilter();
    }
  }

  async loadAggregateKpis(): Promise<void> {
    try {
      // Use multi-select contractor names when available
      let contractor = 'ALL';
      if (this.selectedContractorIds.length > 0 && this.selectedContractorIds.length < this.allContractors.length) {
        contractor = this.selectedContractorIds.map(id => this.getContractorName(id)).join(',');
      } else if (this.selectedContractor !== 'ALL') {
        contractor = this.getContractorName(this.selectedContractor);
      }

      // Use multi-select ring IDs when available
      let ringId: string | undefined;
      if (this.selectedRingIds.length > 0 && this.selectedRingIds.length < this.filteredRings.length) {
        ringId = this.selectedRingIds.join(',');
      } else if (this.selectedRing !== 'ALL') {
        ringId = this.selectedRing;
      }

      // Use multi-select link IDs when available
      let projectId: string | undefined;
      if (this.selectedLinkIds.length > 0 && this.selectedLinkIds.length < this.filteredLinks.length) {
        projectId = this.selectedLinkIds.join(',');
      } else if (this.selectedLink !== 'ALL') {
        projectId = this.selectedLink;
      }

      const response = await getKpiAggregate({
        contractor,
        ringId,
        projectId,
      });
      if (!response?.row) {
        this.applyFallbackKpis();
        return;
      }

      this.totalPlanned = response.row.total_planned_km;
      this.completed = response.row.completed_km;
      this.inProgress = response.row.in_progress_km;
      this.pending = response.row.pending_km;
      this.blockedSegments = response.row.blocked_km;
      this.weeklyRate = null;
      this.updateStatusSplit();
    } catch (error) {
      console.error('Failed to load KPI aggregates, using fallback data:', error);
      this.applyFallbackKpis();
    }
  }

  async loadDimensionKpis(): Promise<void> {
    try {
      const params: { contractor?: string; contractorIds?: string; ringId?: string; ringIds?: string; linkIds?: string } = {};

      // Multi-select contractors
      if (this.selectedContractorIds.length > 0 && this.selectedContractorIds.length < this.allContractors.length) {
        params.contractorIds = this.selectedContractorIds.map(id => this.getContractorName(id)).join(',');
      } else if (this.selectedContractor !== 'ALL') {
        params.contractor = this.getContractorName(this.selectedContractor);
      }

      // Multi-select rings
      if (this.selectedRingIds.length > 0 && this.selectedRingIds.length < this.filteredRings.length) {
        params.ringIds = this.selectedRingIds.join(',');
      } else if (this.selectedRing !== 'ALL') {
        params.ringId = this.selectedRing;
      }

      // Multi-select links
      if (this.selectedLinkIds.length > 0 && this.selectedLinkIds.length < this.filteredLinks.length) {
        params.linkIds = this.selectedLinkIds.join(',');
      }

      const data = await getKpiDimensions(params);

      // Delayed segments count
      this.delayedCount = data.delayedCount;

      // Progress by Contractors
      this.contractorChartData = data.contractors.map(c => ({
        id: c.name,
        name: c.name,
        totalKm: Math.round(c.totalKm * 10) / 10,
        completedKm: Math.round(c.completedKm * 10) / 10,
        inProgressKm: Math.round(c.inProgressKm * 10) / 10,
        pendingKm: Math.round(c.pendingKm * 10) / 10,
        blockedKm: 0,
        onTime: Math.min(100, Math.round(c.completedPct)),
        delayed: 0,
        blocked: 0,
        color: c.color,
      }));

      // Progress by Rings
      this.ringProgressData = data.rings.map(r => ({
        id: r.id,
        name: r.name,
        totalKm: Math.round(r.totalKm * 10) / 10,
        completedKm: Math.round(r.completedKm * 10) / 10,
        inProgressKm: Math.round(r.inProgressKm * 10) / 10,
        pendingKm: Math.round(r.pendingKm * 10) / 10,
        blockedKm: 0,
        color: r.color,
      }));

      // Progress by Links (show top 15 by total km)
      const sortedProjects = [...data.projects].sort((a, b) => b.totalKm - a.totalKm);
      this.linkProgressData = sortedProjects.slice(0, 15).map(p => ({
        id: p.projectId,
        name: p.linkName,
        ringName: p.ringName,
        totalKm: Math.round(p.totalKm * 10) / 10,
        completedPct: Math.round(p.completedPct),
        status: p.status,
      }));

      // Ring × Contractor matrix
      this.ringContractorMatrix = data.matrix.map(row => ({
        ring: row.ringName,
        contractors: row.contractors.map(c => ({
          name: c.name,
          pct: Math.round(c.completedPct),
        })),
      }));

      // Progress by Steps — from aggregated phase breakdown
      if (this.phaseBreakdownSummary.length > 0) {
        this.buildStepProgressFromPhases();
      }

      // Rebuild dynamic chat suggestions with fresh data
      this.buildChatSuggestions();
    } catch (error) {
      console.error('Failed to load dimension KPIs:', error);
    }
  }

  async loadSegmentCounts(): Promise<void> {
    try {
      const data = await getDashboardSummary(this.buildV2Filters());
      this.segmentCounts = {
        total: data.totalSegments || 0,
        completed: data.completedSegments || 0,
        inProgress: data.inProgressSegments || 0,
        pending: data.pendingSegments || 0,
        blocked: data.blockedSegments || 0,
      };
    } catch (e) {
      console.warn('Failed to load segment counts:', e);
    }
  }

  // --- V2 common filter builder ---
  private buildV2Filters(): V2CommonFilters {
    const filters: V2CommonFilters = {};
    if (this.selectedContractorIds.length > 0 && this.selectedContractorIds.length < this.allContractors.length) {
      filters.contractorIds = this.selectedContractorIds.map(id => this.getContractorName(id)).join(',');
    } else if (this.selectedContractor && this.selectedContractor !== 'ALL') {
      filters.contractorIds = this.getContractorName(this.selectedContractor);
    }
    if (this.selectedRingIds.length > 0 && this.selectedRingIds.length < this.filteredRings.length) {
      filters.ringIds = this.selectedRingIds.join(',');
    } else if (this.selectedRing && this.selectedRing !== 'ALL') {
      filters.ringIds = this.selectedRing;
    }
    if (this.selectedLinkIds.length > 0 && this.selectedLinkIds.length < this.filteredLinks.length) {
      filters.linkIds = this.selectedLinkIds.join(',');
    } else if (this.selectedLink && this.selectedLink !== 'ALL') {
      filters.linkIds = this.selectedLink;
    }
    if (this.filterFromDate) {
      filters.fromDate = this.filterFromDate;
    }
    if (this.filterToDate) {
      filters.toDate = this.filterToDate;
    }
    return filters;
  }

  async onDateFilterChange(): Promise<void> {
    this.cascadeFilters();
    await this.onFiltersApplied();
  }

  async loadV2Charts(): Promise<void> {
    await Promise.all([
      this.loadPlannedVsActual(),
      this.loadTimelineTrend(),
      this.loadPacStatus(),
      this.loadProgressSummary(),
    ]);
  }

  private static readonly PVA_DEMO: PlannedVsActualBucket[] = [
    { period: 'Jan', plannedKm: 320, actualKm: 280 },
    { period: 'Feb', plannedKm: 480, actualKm: 410 },
    { period: 'Mar', plannedKm: 650, actualKm: 590 },
    { period: 'Apr', plannedKm: 830, actualKm: 780 },
    { period: 'May', plannedKm: 1050, actualKm: 940 },
    { period: 'Jun', plannedKm: 1280, actualKm: 1120 },
    { period: 'Jul', plannedKm: 1520, actualKm: 1350 },
    { period: 'Aug', plannedKm: 1780, actualKm: 1610 },
    { period: 'Sep', plannedKm: 2020, actualKm: 1850 },
    { period: 'Oct', plannedKm: 2250, actualKm: 2080 },
    { period: 'Nov', plannedKm: 2450, actualKm: 2290 },
    { period: 'Dec', plannedKm: 2654, actualKm: 2490 },
  ];

  async loadPlannedVsActual(): Promise<void> {
    this.plannedVsActualLoading = true;
    try {
      // Don't send date filters — PvA needs the full historical range
      const filters = this.buildV2Filters();
      delete filters.fromDate;
      delete filters.toDate;
      const data = await getPlannedVsActual({
        ...filters,
        granularity: this.plannedVsActualGranularity,
      });
      const buckets = data.buckets || [];
      // Use API data only if we have 2+ meaningful buckets
      const hasReal = buckets.length >= 2 && buckets.some(b => b.plannedKm > 0 || b.actualKm > 0);
      this.plannedVsActualData = hasReal ? buckets : AppComponent.PVA_DEMO;
    } catch (e) {
      console.warn('Failed to load planned vs actual, using demo data:', e);
      this.plannedVsActualData = AppComponent.PVA_DEMO;
    } finally {
      this.plannedVsActualLoading = false;
    }
  }

  async onGranularityChange(): Promise<void> {
    await this.loadPlannedVsActual();
  }

  async loadTimelineTrend(): Promise<void> {
    this.timelineTrendLoading = true;
    try {
      const data = await getTimelineTrend(this.buildV2Filters());
      this.timelineTrendData = data.dataPoints || [];
    } catch (e) {
      console.warn('Failed to load timeline trend:', e);
      this.timelineTrendData = [];
    } finally {
      this.timelineTrendLoading = false;
    }
  }

  async loadPacStatus(): Promise<void> {
    this.pacLoading = true;
    try {
      const data = await getPacStatus(this.buildV2Filters());
      this.pacSummary = data.summary || { totalSubmitted: 0, approved: 0, pending: 0, rejected: 0 };
    } catch (e) {
      console.warn('Failed to load PAC status:', e);
      this.pacSummary = { totalSubmitted: 0, approved: 0, pending: 0, rejected: 0 };
    } finally {
      this.pacLoading = false;
    }
  }

  async loadProgressSummary(): Promise<void> {
    this.progressSummaryLoading = true;
    try {
      const filters = this.buildV2Filters();
      const data = await getProgressSummary({
        ...filters,
        phaseName: this.workProgressPhase || undefined,
      });
      this.progressSummaryContractors = data.contractors || [];
      this.progressSummaryGrandTotal = data.grandTotal || {
        totalPlannedKm: 0, completedKm: 0, inProgressKm: 0, pendingKm: 0, completionPercent: 0,
      };
      this.progressSummaryPhaseBreakdown = data.phaseBreakdown || [];
    } catch (e) {
      console.warn('Failed to load progress summary:', e);
      this.progressSummaryContractors = [];
      this.progressSummaryGrandTotal = {
        totalPlannedKm: 0, completedKm: 0, inProgressKm: 0, pendingKm: 0, completionPercent: 0,
      };
      this.progressSummaryPhaseBreakdown = [];
    } finally {
      this.progressSummaryLoading = false;
    }
  }

  async onProgressSummaryPhaseChange(): Promise<void> {
    await this.loadProgressSummary();
  }

  async onWorkProgressPhaseChange(): Promise<void> {
    await this.loadProgressSummary();
  }

  // --- Work Progress donut helpers ---
  readonly wpCircumference = 2 * Math.PI * 75;

  get wpTotalKm(): number {
    const g = this.progressSummaryGrandTotal;
    return g.totalPlannedKm || 0;
  }

  get wpApprovedKm(): number {
    return this.progressSummaryGrandTotal.completedKm || 0;
  }

  get wpInProgressKm(): number {
    return this.progressSummaryGrandTotal.inProgressKm || 0;
  }

  get wpPendingKm(): number {
    return this.progressSummaryGrandTotal.pendingKm || 0;
  }

  get wpApprovedPct(): number {
    return this.wpTotalKm > 0 ? (this.wpApprovedKm / this.wpTotalKm) * 100 : 0;
  }

  get wpInProgressPct(): number {
    return this.wpTotalKm > 0 ? (this.wpInProgressKm / this.wpTotalKm) * 100 : 0;
  }

  get wpPendingPct(): number {
    return this.wpTotalKm > 0 ? (this.wpPendingKm / this.wpTotalKm) * 100 : 0;
  }

  // Step/activity colors matching mockup OSP section
  private readonly stepColors = [
    '#4ade80', // Trenching — green
    '#60a5fa', // Ducting — blue
    '#fb923c', // 1st Backfill — orange
    '#a78bfa', // 2nd Backfill — purple
    '#22d3ee', // Cable Pulling — cyan
    '#f472b6', // Splicing — pink
    '#facc15', // Testing — yellow
    '#34d399', // Sand Bedding — emerald
    '#f87171', // Route Marking — coral
    '#818cf8', // Final Backfill — indigo
  ];

  getStepColor(index: number): string {
    return this.stepColors[index % this.stepColors.length];
  }

  wpDonutArc(km: number): number {
    if (this.wpTotalKm <= 0) return 0;
    return (km / this.wpTotalKm) * this.wpCircumference;
  }

  // --- SVG chart helpers ---

  get pvaMaxKm(): number {
    if (!this.plannedVsActualData.length) return 1;
    return Math.max(1, ...this.plannedVsActualData.map(b => Math.max(b.plannedKm, b.actualKm)));
  }

  pvaBarHeight(km: number): number {
    return this.pvaMaxKm > 0 ? (km / this.pvaMaxKm) * 160 : 0;
  }

  /** Bar height for split PvA charts with configurable max height */
  pvaBarH(km: number, maxH: number): number {
    return this.pvaMaxKm > 0 ? (km / this.pvaMaxKm) * maxH : 0;
  }

  // --- PvA Line Chart helpers ---
  pvaLineX(i: number): number {
    const count = this.plannedVsActualData.length;
    if (count <= 1) return 50;
    return 50 + (i / (count - 1)) * 500;
  }

  pvaLineY(km: number): number {
    return 170 - (km / this.pvaMaxKm) * 150;
  }

  get pvaPlannedLinePath(): string {
    if (!this.plannedVsActualData.length) return '';
    return this.plannedVsActualData
      .map((b, i) => `${i === 0 ? 'M' : 'L'}${this.pvaLineX(i)},${this.pvaLineY(b.plannedKm)}`)
      .join(' ');
  }

  get pvaActualLinePath(): string {
    if (!this.plannedVsActualData.length) return '';
    return this.plannedVsActualData
      .map((b, i) => `${i === 0 ? 'M' : 'L'}${this.pvaLineX(i)},${this.pvaLineY(b.actualKm)}`)
      .join(' ');
  }

  get pvaPlannedAreaPath(): string {
    if (!this.plannedVsActualData.length) return '';
    const line = this.plannedVsActualData
      .map((b, i) => `${i === 0 ? 'M' : 'L'}${this.pvaLineX(i)},${this.pvaLineY(b.plannedKm)}`)
      .join(' ');
    const last = this.pvaLineX(this.plannedVsActualData.length - 1);
    return `${line} L${last},170 L50,170 Z`;
  }

  get pvaActualAreaPath(): string {
    if (!this.plannedVsActualData.length) return '';
    const line = this.plannedVsActualData
      .map((b, i) => `${i === 0 ? 'M' : 'L'}${this.pvaLineX(i)},${this.pvaLineY(b.actualKm)}`)
      .join(' ');
    const last = this.pvaLineX(this.plannedVsActualData.length - 1);
    return `${line} L${last},170 L50,170 Z`;
  }

  // --- Single-panel PvA line chart helpers (for split view) ---
  pvaSingleX(i: number): number {
    const count = this.plannedVsActualData.length;
    if (count <= 1) return 46;
    return 46 + (i / (count - 1)) * 494;
  }

  pvaSingleY(km: number): number {
    return 160 - (km / this.pvaMaxKm) * 140;
  }

  pvaSingleLinePath(type: 'planned' | 'actual'): string {
    if (!this.plannedVsActualData.length) return '';
    return this.plannedVsActualData
      .map((b, i) => {
        const val = type === 'planned' ? b.plannedKm : b.actualKm;
        return `${i === 0 ? 'M' : 'L'}${this.pvaSingleX(i)},${this.pvaSingleY(val)}`;
      })
      .join(' ');
  }

  pvaSingleAreaPath(type: 'planned' | 'actual'): string {
    if (!this.plannedVsActualData.length) return '';
    const line = this.plannedVsActualData
      .map((b, i) => {
        const val = type === 'planned' ? b.plannedKm : b.actualKm;
        return `${i === 0 ? 'M' : 'L'}${this.pvaSingleX(i)},${this.pvaSingleY(val)}`;
      })
      .join(' ');
    const last = this.pvaSingleX(this.plannedVsActualData.length - 1);
    return `${line} L${last},160 L46,160 Z`;
  }

  /** Show ~5 evenly spaced X labels */
  get pvaXLabels(): { i: number; label: string }[] {
    const data = this.plannedVsActualData;
    if (!data.length) return [];
    if (data.length <= 6) return data.map((b, i) => ({ i, label: b.period }));
    const step = Math.floor(data.length / 5);
    const labels: { i: number; label: string }[] = [];
    for (let i = 0; i < data.length; i += step) labels.push({ i, label: data[i].period });
    if (labels[labels.length - 1].i !== data.length - 1) {
      labels.push({ i: data.length - 1, label: data[data.length - 1].period });
    }
    return labels;
  }

  // --- Combined PvA chart helpers ---
  pvaCombinedX(i: number): number {
    const count = this.plannedVsActualData.length;
    if (count <= 1) return 50;
    return 50 + (i / (count - 1)) * 490;
  }

  pvaCombinedY(km: number): number {
    return 175 - (km / this.pvaMaxKm) * 150;
  }

  pvaCombinedLinePath(type: 'planned' | 'actual'): string {
    if (!this.plannedVsActualData.length) return '';
    return this.plannedVsActualData
      .map((b, i) => {
        const val = type === 'planned' ? b.plannedKm : b.actualKm;
        return `${i === 0 ? 'M' : 'L'}${this.pvaCombinedX(i)},${this.pvaCombinedY(val)}`;
      })
      .join(' ');
  }

  pvaCombinedAreaPath(type: 'planned' | 'actual'): string {
    if (!this.plannedVsActualData.length) return '';
    const line = this.plannedVsActualData
      .map((b, i) => {
        const val = type === 'planned' ? b.plannedKm : b.actualKm;
        return `${i === 0 ? 'M' : 'L'}${this.pvaCombinedX(i)},${this.pvaCombinedY(val)}`;
      })
      .join(' ');
    const last = this.pvaCombinedX(this.plannedVsActualData.length - 1);
    return `${line} L${last},175 L50,175 Z`;
  }

  // --- Drill-down methods ---
  drillDownToRing(ringId: string): void {
    this.selectedRingIds = [ringId];
    this.selectedRing = ringId;
    this.selectedLink = 'ALL';
    this.selectedLinkIds = [];
    this.selectedStep = 'ALL';
    this.cascadeFilters();
    this.onFiltersApplied();
  }

  drillDownToContractor(contractorId: string): void {
    this.selectedContractorIds = [contractorId];
    this.selectedContractor = contractorId;
    this.selectedRing = 'ALL';
    this.selectedRingIds = [];
    this.selectedLink = 'ALL';
    this.selectedLinkIds = [];
    this.selectedStep = 'ALL';
    this.cascadeFilters();
    this.onFiltersApplied();
  }

  get timelineMaxKm(): number {
    if (!this.timelineTrendData.length) return 1;
    return Math.max(1, ...this.timelineTrendData.map(p => Math.max(p.completedKm, p.cumulativePlannedKm)));
  }

  timelineX(i: number): number {
    const count = this.timelineTrendData.length;
    if (count <= 1) return 40;
    return 40 + (i / (count - 1)) * 520;
  }

  timelineY(km: number): number {
    return 180 - (km / this.timelineMaxKm) * 160;
  }

  get timelineMidIndex(): number {
    return Math.floor(this.timelineTrendData.length / 2);
  }

  get timelineMidDate(): string {
    const idx = this.timelineMidIndex;
    return this.timelineTrendData[idx]?.date || '';
  }

  get timelineLastDate(): string {
    const d = this.timelineTrendData;
    return d.length > 0 ? d[d.length - 1].date : '';
  }

  get timelineFirstDate(): string {
    return this.timelineTrendData[0]?.date || '';
  }

  get timelineCompletedPath(): string {
    if (!this.timelineTrendData.length) return '';
    return this.timelineTrendData
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${this.timelineX(i)},${this.timelineY(p.completedKm)}`)
      .join(' ');
  }

  get timelinePlannedPath(): string {
    if (!this.timelineTrendData.length) return '';
    return this.timelineTrendData
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${this.timelineX(i)},${this.timelineY(p.cumulativePlannedKm)}`)
      .join(' ');
  }

  get pacTotal(): number {
    const s = this.pacSummary;
    return s.approved + s.pending + s.rejected;
  }

  pacDonutOffset(segment: 'approved' | 'pending' | 'rejected'): number {
    const total = this.pacTotal || 1;
    const s = this.pacSummary;
    const circumference = 2 * Math.PI * 45;
    if (segment === 'approved') return 0;
    if (segment === 'pending') return -(s.approved / total) * circumference;
    return -((s.approved + s.pending) / total) * circumference;
  }

  pacDonutLength(segment: 'approved' | 'pending' | 'rejected'): number {
    const total = this.pacTotal || 1;
    const s = this.pacSummary;
    const circumference = 2 * Math.PI * 45;
    const value = segment === 'approved' ? s.approved : segment === 'pending' ? s.pending : s.rejected;
    return (value / total) * circumference;
  }

  // --- Ring pie chart helpers ---
  get ringPieTotal(): number {
    return this.ringProgressData.reduce((s, r) => s + r.completedKm, 0) || 1;
  }

  ringPieSliceOffset(index: number): number {
    const circumference = 2 * Math.PI * 45;
    let sum = 0;
    for (let i = 0; i < index; i++) {
      sum += this.ringProgressData[i].completedKm;
    }
    return -(sum / this.ringPieTotal) * circumference;
  }

  ringPieSliceLength(index: number): number {
    const circumference = 2 * Math.PI * 45;
    return (this.ringProgressData[index].completedKm / this.ringPieTotal) * circumference;
  }

  private buildStepProgressFromPhases(): void {
    const total = this.phaseBreakdownSummary.reduce((s, p) => s + p.percentage, 0) || 1;
    this.stepProgressData = this.phaseBreakdownSummary.slice(0, 7).map((p, i) => {
      const weight = Math.round((p.percentage / total) * 100);
      return {
        id: `phase_${i}`,
        name: p.phase,
        totalSegments: 100,
        completed: weight,
        inProgress: 0,
        pending: Math.max(0, 100 - weight),
        blocked: 0,
        icon: 'phase',
      };
    });
  }

  private applyFallbackKpis(): void {
    const rings = this.ringProgressData;
    this.totalPlanned = rings.reduce((s, r) => s + r.totalKm, 0);
    this.completed = rings.reduce((s, r) => s + r.completedKm, 0);
    this.inProgress = rings.reduce((s, r) => s + r.inProgressKm, 0);
    this.pending = rings.reduce((s, r) => s + r.pendingKm, 0);
    this.blockedSegments = rings.reduce((s, r) => s + r.blockedKm, 0);
    this.weeklyRate = 38.4;
    this.updateStatusSplit();
  }

  applyContractorStatusFilter(): void {
    const selected = this.selectedContractor;
    const projectId = Number(this.projectId);
    const filterByProject = Number.isFinite(projectId);

    const selectedName =
      selected && selected !== 'ALL'
        ? this.getContractorName(selected)
        : null;

    this.contractorStatusRows = this.contractorStatus.filter((row) => {
      if (selectedName && row.contractor !== selectedName) {
        return false;
      }
      if (filterByProject && row.projectId !== projectId) {
        return false;
      }
      return true;
    });
    this.updateContractorCharts();
  }

  getTopPhase(row: ContractorProjectStatus): string {
    if (!row.phaseBreakdown?.length) return '-';
    const top = [...row.phaseBreakdown].sort((a, b) => b.percentage - a.percentage)[0];
    return `${top.phase} (${top.percentage.toFixed(1)}%)`;
  }

  private updateStatusSplit(): void {
    const completed = this.safeNumber(this.completed) || 0;
    const inProgress = this.safeNumber(this.inProgress) || 0;
    const pending = this.safeNumber(this.pending) || 0;
    const blocked = this.safeNumber(this.blockedSegments) || 0;
    const total = completed + inProgress + pending + blocked;

    const rows = [
      { label: 'Completed', value: completed, className: 'completed' },
      { label: 'In Progress', value: inProgress, className: 'progress' },
      { label: 'Pending', value: pending, className: 'pending' },
      { label: 'Blocked', value: blocked, className: 'blocked' },
    ];

    this.statusSplitRows = rows.map((row) => ({
      ...row,
      percent: total > 0 ? (row.value / total) * 100 : 0,
    }));
  }

  private updateContractorCharts(): void {
    this.phaseBreakdownSummary = this.aggregatePhaseBreakdown(this.contractorStatusRows);
    this.contractorProgressRows = this.aggregateContractorProgress(this.contractorStatusRows);
    if (this.phaseBreakdownSummary.length > 0) {
      this.buildStepProgressFromPhases();
    }
  }

  private classifySegment(segment: { status?: string | null; statusName?: string | null }): 'completed' | 'inProgress' | 'pending' | 'blocked' {
    const raw = `${segment.status || ''} ${segment.statusName || ''}`.toLowerCase();
    if (raw.includes('approved')) return 'completed';
    if (raw.includes('rejected')) return 'blocked';
    if (raw.includes('submitted')) return 'inProgress';
    if (raw.includes('pending')) return 'pending';
    return 'pending';
  }

  private filterPhases(
    route: RoutePhaseEntry,
    phaseId: number
  ): Array<{
    phaseName?: string | null;
    segments?: Array<{ lengthM?: number | null; status?: string | null; statusName?: string | null }> | null;
  }> {
    let phases = route.phases || [];
    if (Number.isFinite(phaseId)) {
      phases = phases.filter((phase) => phase.phaseId === phaseId);
    }
    if (this.selectedStep && this.selectedStep !== 'ALL') {
      const stepName = this.getStepName(this.selectedStep).trim().toLowerCase();
      const stepId = String(this.selectedStep).trim().toLowerCase();
      phases = phases.filter((phase) => {
        const name = String(phase.phaseName || '').trim().toLowerCase();
        if (!name) return false;
        return (
          name === stepName ||
          name.includes(stepName) ||
          stepName.includes(name) ||
          name === stepId ||
          String(phase.phaseId) === stepId
        );
      });
    }
    return phases;
  }

  private extractContractors(response: RoutesSegmentsPhaseWiseResponse): string[] {
    const contractors = response.routes
      .map((route) => route.contractor)
      .filter((contractor): contractor is string => Boolean(contractor && contractor.trim()))
      .sort((a, b) => a.localeCompare(b));
    return Array.from(new Set(contractors));
  }

  private extractContractorsFromStatus(rows: ContractorProjectStatus[]): string[] {
    const contractors = rows
      .map((row) => row.contractor)
      .filter((contractor): contractor is string => Boolean(contractor && contractor.trim()))
      .sort((a, b) => a.localeCompare(b));
    return Array.from(new Set(contractors));
  }

  private extractProjectIds(rows: ContractorProjectStatus[]): string[] {
    const ids = rows
      .map((row) => row.projectId)
      .filter((id): id is number => Number.isFinite(id))
      .map((id) => String(id))
      .sort((a, b) => Number(a) - Number(b));
    return Array.from(new Set(ids));
  }

  private extractPhaseIds(response: RoutesSegmentsPhaseWiseResponse): string[] {
    const ids = response.routes
      .flatMap((route) => route.phases || [])
      .map((phase) => phase.phaseId)
      .filter((id): id is number => Number.isFinite(id))
      .map((id) => String(id))
      .sort((a, b) => Number(a) - Number(b));
    return Array.from(new Set(ids));
  }

  private aggregatePhaseBreakdown(rows: ContractorProjectStatus[]): Array<{ phase: string; percentage: number }> {
    const totals = new globalThis.Map<string, number>();
    for (const row of rows) {
      for (const item of row.phaseBreakdown || []) {
        totals.set(item.phase, (totals.get(item.phase) || 0) + item.percentage);
      }
    }
    const entries = Array.from(totals.entries()).map(([phase, value]) => ({
      phase,
      value,
    }));
    const totalSum = entries.reduce((sum, item) => sum + item.value, 0);
    const normalized = entries.map((item) => ({
      phase: item.phase,
      percentage: totalSum > 0 ? (item.value / totalSum) * 100 : 0,
    }));
    return normalized.sort((a, b) => b.percentage - a.percentage);
  }

  private aggregateContractorProgress(rows: ContractorProjectStatus[]): Array<{
    contractor: string;
    completed: number;
    inProgress: number;
    planned: number;
  }> {
    const grouped = new globalThis.Map<string, ContractorProjectStatus[]>();
    for (const row of rows) {
      if (!row.contractor) continue;
      const list = grouped.get(row.contractor) || [];
      list.push(row);
      grouped.set(row.contractor, list);
    }

    const aggregated = Array.from(grouped.entries()).map(([contractor, list]) => {
      const totals = list.reduce(
        (acc, row) => ({
          completed: acc.completed + row.completedPercent,
          inProgress: acc.inProgress + row.inProgressPercent,
          planned: acc.planned + row.plannedPercent,
        }),
        { completed: 0, inProgress: 0, planned: 0 }
      );
      const divisor = list.length || 1;
      return {
        contractor,
        completed: totals.completed / divisor,
        inProgress: totals.inProgress / divisor,
        planned: totals.planned / divisor,
      };
    });

    return aggregated.sort((a, b) => b.completed - a.completed);
  }
  private mergeContractors(base: string[], extra: string[]): string[] {
    return Array.from(new Set([...base, ...extra])).sort((a, b) => a.localeCompare(b));
  }

  private applyDistribution(data: Record<string, unknown>): void {
    const completed = this.getNumber(data, [
      'completed',
      'Completed',
      'completed_km',
      'completedKm'
    ]);
    const inProgress = this.getNumber(data, [
      'inProgress',
      'in_progress',
      'inProgressKm',
      'progress',
      'in_progress_km'
    ]);
    const pending = this.getNumber(data, ['pending', 'Pending', 'pending_km', 'pendingKm']);
    const totalPlanned = this.getNumber(data, ['total', 'Total', 'planned', 'plannedKm']);
    const blocked = this.getNumber(data, ['blocked', 'Blocked', 'rejected', 'Rejected', 'delayed']);
    const weeklyRate = this.getNumber(data, ['weeklyRate', 'weekly_rate', 'weekly']);

    const fallbackTotal = this.sumNumbers([completed, inProgress, pending, blocked]);

    this.completed = completed;
    this.inProgress = inProgress;
    this.pending = pending;
    this.totalPlanned = totalPlanned ?? fallbackTotal;
    this.blockedSegments = blocked;
    this.weeklyRate = weeklyRate;
  }

  private getNumber(
    data: Record<string, unknown>,
    keys: string[]
  ): number | null {
    for (const key of keys) {
      const raw = data[key];
      const parsed = this.safeNumber(raw);
      if (parsed !== null) return parsed;
    }
    return null;
  }

  private safeNumber(value: unknown): number | null {
    if (value === null || value === undefined) return null;
    const parsed = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private sumNumbers(values: Array<number | null>): number | null {
    const filtered = values.filter((value) => typeof value === 'number') as number[];
    if (!filtered.length) return null;
    return filtered.reduce((sum, value) => sum + value, 0);
  }

  // ─── Neo Chat Assistant ───
  chatOpen = false;
  chatMessages: ChatMessage[] = [];
  chatInput = '';
  chatLoading = false;
  chatError = '';

  chatSuggestions: string[] = [];

  /** Build dynamic chat suggestions based on actual loaded dashboard data. */
  private buildChatSuggestions(): void {
    const suggestions: string[] = [];

    // Contractor-specific questions
    const contractors = this.allContractors.map(c => c.name).filter(n => n);
    if (contractors.length > 0) {
      const topContractor = this.contractorChartData?.length
        ? [...this.contractorChartData].sort((a, b) => b.completedKm - a.completedKm)[0]?.name
        : contractors[0];
      if (topContractor) {
        suggestions.push(`How is ${topContractor} performing?`);
      }
    }

    // Ring-specific questions
    if (this.ringProgressData?.length > 0) {
      const behindRing = [...this.ringProgressData]
        .filter(r => r.totalKm > 0)
        .sort((a, b) => (a.completedKm / a.totalKm) - (b.completedKm / b.totalKm))[0];
      if (behindRing) {
        suggestions.push(`What's the status of ${behindRing.name}?`);
      }
    }

    // Overall progress question
    if (this.totalPlanned != null && this.completed != null) {
      suggestions.push('Summarize overall project progress');
    }

    // Blocked/delayed questions
    if (this.blockedSegments != null && this.blockedSegments > 0) {
      suggestions.push(`What's blocking progress? (${this.blockedSegments} blocked segments)`);
    } else if (this.delayedCount != null && this.delayedCount > 0) {
      suggestions.push('Which contractors are delayed?');
    }

    // Step/phase questions
    if (this.stepProgressData?.length > 0) {
      const activeStep = this.stepProgressData.find(s => s.inProgress > 0);
      if (activeStep) {
        suggestions.push(`Tell me about ${activeStep.name} phase progress`);
      }
    }

    // Comparison question when multiple contractors
    if (contractors.length >= 2) {
      suggestions.push('Compare all contractor performance');
    }

    // Sync/data freshness
    suggestions.push('When was data last synced?');

    // Keep max 5 suggestions
    this.chatSuggestions = suggestions.slice(0, 5);

    // Add executive-level suggestions
    suggestions.push('Which projects are delayed?');
    suggestions.push('What is the outstanding receivable from clients?');
    suggestions.push('Show planned vs actual progress by project');
    suggestions.push('Which milestones are overdue?');
    suggestions.push('Which projects have the highest profit?');
    suggestions.push('Show budget vs actual cost by project');
    suggestions.push('What is the pending payable to subcontractors?');
    suggestions.push('Show work order status summary');

    // Keep max 5 suggestions (shuffle executive ones into mix)
    this.chatSuggestions = suggestions.slice(0, 5);

    // Fallback if no data loaded yet
    if (this.chatSuggestions.length === 0) {
      this.chatSuggestions = [
        'Which projects are delayed?',
        'What is the outstanding receivable from clients?',
        'Which projects have the highest profit?',
        'Show planned vs actual progress by project',
        'Which milestones are overdue?',
      ];
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollChat) {
      this.scrollChatToBottom();
      this.shouldScrollChat = false;
    }
  }

  toggleChat(): void {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen) {
      this.buildChatSuggestions();
      if (this.chatMessages.length === 0) {
        this.chatMessages.push({
          role: 'assistant',
          content: 'Hi! I\'m **Neo**. I answer from **synced dashboard data** on the server—ask for a summary or mention a contractor from your KPI widgets.',
          timestamp: Date.now(),
        });
      }
    }
  }

  async sendChat(text?: string): Promise<void> {
    const message = (text || this.chatInput || '').trim();
    if (!message || this.chatLoading) return;

    this.chatInput = '';
    this.chatError = '';
    this.chatSuggestions = [];
    this.chatMessages.push({ role: 'user', content: message, timestamp: Date.now() });
    this.chatLoading = true;
    this.shouldScrollChat = true;

    try {
      const reply = await sendChatMessage(message, this.chatMessages.slice(0, -1));
      this.chatMessages.push({ role: 'assistant', content: reply, timestamp: Date.now() });
    } catch (_err) {
      this.chatMessages.push({
        role: 'assistant',
        content: 'I couldn\'t process that question. Try asking about rings, contractors, bottlenecks, or project status!',
        timestamp: Date.now(),
      });
    } finally {
      this.chatLoading = false;
      this.shouldScrollChat = true;
      this.buildFollowUpSuggestions(message);
    }
  }

  /** Build context-aware follow-up suggestions based on what the user just asked. */
  private buildFollowUpSuggestions(lastMessage: string): void {
    const lower = lastMessage.toLowerCase();
    const suggestions: string[] = [];
    const contractors = this.allContractors.map(c => c.name).filter(n => n);

    // After a greeting → offer data exploration options
    if (/^(hi+|hello|hey|hii+|yo|sup|good morning|good afternoon|good evening)\b/i.test(lower.trim())) {
      suggestions.push('Summarize overall project progress');
      if (contractors.length > 0) {
        suggestions.push(`How is ${contractors[0]} performing?`);
      }
      if (this.ringProgressData?.length > 0) {
        suggestions.push(`What's the status of ${this.ringProgressData[0].name}?`);
      }
      suggestions.push('Show me the latest KPI data');
    }
    // After asking about a contractor → suggest related follow-ups
    else if (/contractor|perform|how is .+ doing/i.test(lower)) {
      suggestions.push('Compare all contractor performance');
      if (this.blockedSegments && this.blockedSegments > 0) {
        suggestions.push('Which contractors have blocked segments?');
      }
      suggestions.push('Which contractor is fastest?');
      suggestions.push('Show overall project progress');
    }
    // After asking about a ring → suggest other rings or deeper drill
    else if (/ring|region/i.test(lower)) {
      if (this.ringProgressData?.length > 1) {
        const otherRing = this.ringProgressData.find(r => !lower.includes(r.name.toLowerCase()));
        if (otherRing) {
          suggestions.push(`What's the status of ${otherRing.name}?`);
        }
      }
      suggestions.push('Compare all rings');
      suggestions.push('Which ring is most behind?');
    }
    // After summary → offer drill-down options
    else if (/summary|overview|progress|status|kpi/i.test(lower)) {
      if (contractors.length > 0) {
        suggestions.push(`Tell me about ${contractors[0]}`);
      }
      if (this.ringProgressData?.length > 0) {
        suggestions.push(`Status of ${this.ringProgressData[0].name}`);
      }
      if (this.blockedSegments && this.blockedSegments > 0) {
        suggestions.push('What\'s causing delays?');
      }
      suggestions.push('When was data last synced?');
    }
    // After thank/bye → light follow-ups
    else if (/thank|bye|goodbye|see you/i.test(lower)) {
      // No suggestions after farewell — keep it clean
    }
    // After financial/receivable questions → suggest related financial drill-downs
    else if (/receivable|outstanding|payable|payment|invoice|billing|budget|cost/i.test(lower)) {
      suggestions.push('Show budget vs actual cost by project');
      suggestions.push('What is the pending payable to subcontractors?');
      suggestions.push('Which projects have the highest profit?');
      suggestions.push('Which milestones are overdue?');
    }
    // After project delay/progress questions → suggest drill-downs
    else if (/delay|progress|planned|actual|milestone|overdue|behind/i.test(lower)) {
      suggestions.push('What is the outstanding receivable from clients?');
      suggestions.push('Show work order status summary');
      suggestions.push('Which projects have the highest profit?');
      suggestions.push('Show budget vs actual cost by project');
    }
    // After work order questions → suggest related operations follow-ups
    else if (/work order|wo |certified|subcontractor/i.test(lower)) {
      suggestions.push('What is the pending payable to subcontractors?');
      suggestions.push('Which projects are delayed?');
      suggestions.push('Which milestones are overdue?');
      suggestions.push('Show planned vs actual progress by project');
    }
    // Default follow-ups
    else {
      suggestions.push('Which projects are delayed?');
      suggestions.push('What is the outstanding receivable from clients?');
      suggestions.push('Which projects have the highest profit?');
      if (contractors.length > 0) {
        suggestions.push(`How is ${contractors[0]} doing?`);
      }
    }

    this.chatSuggestions = suggestions.slice(0, 4);
  }

  clearChat(): void {
    this.chatMessages = [];
    this.chatError = '';
    this.chatInput = '';
    this.toggleChat();
    this.toggleChat();
  }

  handleChatKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendChat();
    }
  }

  private scrollChatToBottom(): void {
    try {
      const el = this.chatScrollContainer?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    } catch (_) {}
  }

  // ============================================================
  // NEW CHART HELPERS — Chart 1: Contractor Completion Bars + Status Waterfall
  // ============================================================

  getContractorBarWidth(c: typeof this.contractorChartData[0], segment: 'completed' | 'inProgress' | 'pending', maxWidth: number): number {
    if (!c.totalKm || c.totalKm <= 0) return 0;
    const val = segment === 'completed' ? c.completedKm : segment === 'inProgress' ? c.inProgressKm : c.pendingKm;
    return Math.max(0, (val / c.totalKm) * maxWidth);
  }

  get statusWaterfallBars(): Array<{ label: string; value: number; color: string; height: number }> {
    const completed = this.safeNumber(this.completed) || 0;
    const inProgress = this.safeNumber(this.inProgress) || 0;
    const pending = this.safeNumber(this.pending) || 0;
    const blocked = this.safeNumber(this.blockedSegments) || 0;
    const maxVal = Math.max(completed, inProgress, pending, blocked, 1);
    const maxH = 140;
    return [
      { label: 'Done', value: completed, color: '#22c55e', height: Math.max(2, (completed / maxVal) * maxH) },
      { label: 'Active', value: inProgress, color: '#3b82f6', height: Math.max(2, (inProgress / maxVal) * maxH) },
      { label: 'Pending', value: pending, color: '#94a3b8', height: Math.max(2, (pending / maxVal) * maxH) },
      { label: 'Blocked', value: blocked, color: '#ef4444', height: Math.max(2, (blocked / maxVal) * maxH) },
    ];
  }

  // ============================================================
  // NEW CHART HELPERS — Chart 2: Phase Completion Radar + Daily Velocity Gauge
  // ============================================================

  private radarCx = 150;
  private radarCy = 130;
  private radarR = 100;

  private radarAngle(i: number): number {
    const n = this.stepProgressData.length || 1;
    return (Math.PI * 2 * i) / n - Math.PI / 2;
  }

  radarAxisX(i: number): number { return this.radarCx + this.radarR * Math.cos(this.radarAngle(i)); }
  radarAxisY(i: number): number { return this.radarCy + this.radarR * Math.sin(this.radarAngle(i)); }

  private radarPointStr(fraction: number): string {
    return this.stepProgressData.map((_, i) => {
      const a = this.radarAngle(i);
      const r = this.radarR * fraction;
      return `${this.radarCx + r * Math.cos(a)},${this.radarCy + r * Math.sin(a)}`;
    }).join(' ');
  }

  get radarOuterPoints(): string { return this.radarPointStr(1); }
  get radarMidPoints(): string { return this.radarPointStr(0.5); }

  get radarDataPoints(): string {
    return this.stepProgressData.map((step, i) => {
      const pct = this.getStepCompletedPct(step) / 100;
      const a = this.radarAngle(i);
      const r = this.radarR * Math.max(0.05, pct);
      return `${this.radarCx + r * Math.cos(a)},${this.radarCy + r * Math.sin(a)}`;
    }).join(' ');
  }

  radarDataX(i: number): number {
    const pct = this.getStepCompletedPct(this.stepProgressData[i]) / 100;
    return this.radarCx + this.radarR * Math.max(0.05, pct) * Math.cos(this.radarAngle(i));
  }
  radarDataY(i: number): number {
    const pct = this.getStepCompletedPct(this.stepProgressData[i]) / 100;
    return this.radarCy + this.radarR * Math.max(0.05, pct) * Math.sin(this.radarAngle(i));
  }

  radarLabelX(i: number): number { return this.radarCx + (this.radarR + 18) * Math.cos(this.radarAngle(i)); }
  radarLabelY(i: number): number { return this.radarCy + (this.radarR + 18) * Math.sin(this.radarAngle(i)) + 4; }

  // Gauge helpers
  get avgKmPerDay(): number {
    const rows = this.progressDayRows;
    if (!rows.length) return 0;
    return rows.reduce((s: number, r: any) => s + r.kmPerDay, 0) / rows.length;
  }

  get gaugeMax(): number {
    const rows = this.progressDayRows;
    if (!rows.length) return 10;
    const maxVal = Math.max(...rows.map((r: any) => r.kmPerDay));
    return Math.ceil(maxVal * 1.5) || 10;
  }

  get gaugeArcPath(): string {
    const pct = Math.min(1, this.avgKmPerDay / (this.gaugeMax || 1));
    const angle = Math.PI * pct;
    const ex = 130 - 100 * Math.cos(angle);
    const ey = 140 - 100 * Math.sin(angle);
    const largeArc = pct > 0.5 ? 1 : 0;
    return `M 30 140 A 100 100 0 ${largeArc} 1 ${ex} ${ey}`;
  }

  get gaugeNeedleX(): number {
    const pct = Math.min(1, this.avgKmPerDay / (this.gaugeMax || 1));
    const angle = Math.PI * pct;
    return 130 - 80 * Math.cos(angle);
  }

  get gaugeNeedleY(): number {
    const pct = Math.min(1, this.avgKmPerDay / (this.gaugeMax || 1));
    const angle = Math.PI * pct;
    return 140 - 80 * Math.sin(angle);
  }

  // ============================================================
  // NEW CHART HELPERS — Chart 3: Ring Completion Grouped Bars + Contractor Score Bullets
  // ============================================================

  get ringGroupBarSpacing(): number {
    const count = this.ringProgressData.length || 1;
    return Math.min(60, Math.floor(400 / count));
  }

  private get ringMaxKm(): number {
    return Math.max(...this.ringProgressData.map(r => r.totalKm), 1);
  }

  getRingBarHeight(km: number, maxHeight: number): number {
    return Math.max(2, (km / this.ringMaxKm) * maxHeight);
  }

  // ============================================================
  // NEW CHART HELPERS — Chart 4: Segment Status Treemap
  // ============================================================

  // --- Dynamic Bottlenecks derived from existing data ---
  get bottleneckItems(): Array<{ title: string; meta: string; severity: 'blocked' | 'warning' | 'info' }> {
    const items: Array<{ title: string; meta: string; severity: 'blocked' | 'warning' | 'info' }> = [];

    // Delayed links (< 40% completion)
    for (const link of this.linkProgressData) {
      if (link.status === 'delayed') {
        items.push({
          title: `${link.name}`,
          meta: `${link.completedPct}% complete · ${link.ringName}`,
          severity: 'blocked',
        });
      }
    }

    // At-risk links (40-70% completion)
    for (const link of this.linkProgressData) {
      if (link.status === 'at-risk') {
        items.push({
          title: `${link.name}`,
          meta: `${link.completedPct}% complete · ${link.ringName}`,
          severity: 'warning',
        });
      }
    }

    // Contractors with low on-time score
    for (const c of this.contractorChartData) {
      if (c.onTime < 50) {
        items.push({
          title: `${c.name} — low on-time`,
          meta: `${this.getContractorCompletionPct(c).toFixed(0)}% done · ${c.pendingKm.toFixed(0)} km pending`,
          severity: 'blocked',
        });
      } else if (c.onTime >= 50 && c.onTime < 75) {
        items.push({
          title: `${c.name} — at risk`,
          meta: `${this.getContractorCompletionPct(c).toFixed(0)}% done · ${c.inProgressKm.toFixed(0)} km active`,
          severity: 'warning',
        });
      }
    }

    // Rings with very low completion (< 30%)
    for (const ring of this.ringProgressData) {
      const pct = ring.totalKm > 0 ? (ring.completedKm / ring.totalKm) * 100 : 0;
      if (pct < 30 && ring.totalKm > 0) {
        items.push({
          title: `${ring.name} — behind schedule`,
          meta: `${pct.toFixed(0)}% complete · ${ring.pendingKm.toFixed(0)} km pending`,
          severity: 'warning',
        });
      }
    }

    // Blocked segments
    const blocked = this.segmentCounts.blocked;
    if (blocked > 0) {
      items.push({
        title: `${blocked} blocked segments`,
        meta: `Requires approval or resolution`,
        severity: 'blocked',
      });
    }

    return items.slice(0, 6);
  }

  get treemapBlocks(): Array<{ label: string; count: number; pct: number; color: string; x: number; width: number }> {
    const sc = this.segmentCounts;
    const total = sc.total || 1;
    const items = [
      { label: 'Completed', count: sc.completed, color: '#22c55e' },
      { label: 'In Progress', count: sc.inProgress, color: '#3b82f6' },
      { label: 'Pending', count: sc.pending, color: '#94a3b8' },
      { label: 'Blocked', count: sc.blocked, color: '#ef4444' },
    ].filter(i => i.count > 0);
    const gap = 6;
    const minW = 80;
    const usable = 790 - gap * (items.length - 1);
    // First pass: assign proportional widths, enforce minimum
    let widths = items.map(i => Math.max(minW, (i.count / total) * usable));
    // Normalize so total fits
    const sum = widths.reduce((a, b) => a + b, 0);
    widths = widths.map(w => (w / sum) * usable);
    let x = 5;
    return items.map((item, i) => {
      const pct = (item.count / total) * 100;
      const block = { ...item, pct, x, width: widths[i] };
      x += widths[i] + gap;
      return block;
    });
  }
}
