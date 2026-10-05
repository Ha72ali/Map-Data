import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  getDashboardBootstrap,
  getKpiAggregate,
  getProgressSummary,
  getPlannedVsActual,
  getPacStatus,
  getKpiDimensions,
  getContractorContext,
  getDashboardFilters,
  getTimelineTrend,
  getPhaseKpiSummary,
  getPhaseWiseProgressHistory,
  getPhaseWiseProgress,
  getPhaseDistribution,
  getTrenchingTypeWiseProgress,
  emptyTrenchingTypeProgress,
  getPhaseList,
  getAnalyticsHistory,
  getFinancialSummary,
  getFinancialSummaryByLink,
  toFinancialSummaryBody,
  LINK_FINANCIAL_MAX,
  isRequestAborted,
  type FinancialSummaryResponse,
  type LinkFinancialRow,
  type AnalyticsHistoryResponse,
  type AnalyticsHistorySummary,
  type AnalyticsHistoryForecast,
  type AnalyticsHistorySource,
  type KpiAggregateResponse,
  type ProgressSummaryResponse,
  type PlannedVsActualResponse,
  type PacStatusResponse,
  type DashboardBootstrapResponse,
  type KpiDimensionsResponse,
  type ContractorContextResponse,
  type DashboardFiltersResponse,
  type TimelineTrendResponse,
  type KpiDimensionProject,
  type PhaseKpiSummaryResponse,
  type PhaseHistoryResponse,
  type PhaseHistoryPhase,
  type PhaseWiseProgressRow,
  type PhaseDistributionRow,
  type TrenchingTypeProgressRow,
  type TrenchingTypeProgressResponse,
} from '../dashboard.service';
import { ThemeService, type Theme } from '../theme.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ExternalSessionService } from '../core/services/external-session.service';
import { upstreamApi } from '../services/upstream-api.service';
import {
  exportTableToXlsx,
  exportElementToImage,
} from './dashboard-export.util';
import {
  buildCumChart,
  formatEndDate,
  formatKm,
  type CumChartVM,
  type RaySpec,
} from './progress-forecast-chart';

/**
 * Upstream phase list, mirroring server/routes/phaseHistory.routes.ALL_PHASES.
 * Used as the initial value for the phase dropdowns so they never render empty
 * (see dailyPhaseOptions); the live list from /phase-list replaces it on load.
 */
/**
 * Every contractor the programme has, mirroring
 * server/routes/analyticsHistory.routes.ALL_CONTRACTORS.
 *
 * The Progress Report contractor dropdown is built from this roster, NOT from the
 * last response's `sources`: a request for one contractor comes back with only
 * that contractor in `sources`, which would shrink the dropdown to the current
 * selection and make it impossible to switch to another.
 */
const DEFAULT_CONTRACTOR_ROSTER = ['BPT', 'OFO', 'MHD', 'Al-Jassar', 'OHI'];

const DEFAULT_PHASE_OPTIONS = [
  { phaseId: '1', phaseName: 'Route Marking' },
  { phaseId: '2', phaseName: 'Trenching' },
  { phaseId: '3', phaseName: 'Sand Bedding' },
  { phaseId: '4', phaseName: 'Ducting' },
  { phaseId: '5', phaseName: '1st Layer Backfilling' },
  { phaseId: '6', phaseName: '2nd Layer Backfilling' },
  { phaseId: '7', phaseName: 'Marker Post' },
  { phaseId: '8', phaseName: 'Cable Pulling' },
  { phaseId: '9', phaseName: 'Final Backfilling' },
  { phaseId: '10', phaseName: 'Hand Holes' },
  { phaseId: '11', phaseName: 'Man Holes' },
  { phaseId: '12', phaseName: 'Force Majeure Impact' },
  { phaseId: '13', phaseName: 'HDD' },
  { phaseId: '14', phaseName: 'Removal and reinstatement of Interlocks' },
  { phaseId: '15', phaseName: 'Removal and reinstatement of Asphalt' },
];

/**
 * The only phases the Progress Report card offers, in this order. Mirrors the
 * KPI trio in server/routes/dashboardV2.KPI_PHASES — the other phases have
 * patchy upstream history, so offering them just produces empty charts.
 * Phase 9 is "Final Backfilling" upstream but is labelled "Backfilling" here,
 * matching the KPI tiles and the daily-progress legend.
 */
const PR_PHASES: PhaseHistoryPhase[] = [
  { phaseId: '2', phaseName: 'Trenching' },
  { phaseId: '4', phaseName: 'Ducting' },
  { phaseId: '9', phaseName: 'Backfilling' },
];

// ── Interfaces ──────────────────────────────────────────────────────────────

/** One point on the Progress Report chart, including the raw values behind the %. */
interface CumPoint {
  iso: string;
  label: string;
  plannedPct: number;
  actualPct: number;
  /** Cumulative completed, km (API reports metres). */
  cumulativeKm: number;
  /** Work completed in this period alone, km. */
  periodKm: number;
  /** Segments created in this period. */
  segments: number;
}

interface KpiCard {
  title: string;
  value: string;
  unit: string;
  percentage: number;
  percentLabel: string;
  subtitle: string;
  color: string;
  iconPath: string;
}

interface RingRow {
  name: string;
  planned: number;
  deployed: number;
  balance: number;
  completion: number;
}

interface TopLink {
  id: string;
  ring: string;
  planned: number;
  deployed: number;
  completion: number;
}

/** One shared-tooltip payload for the two ported phase charts. */
interface ExecChartHover {
  x: number;
  y: number;
  title: string;
  rows: Array<{ label: string; color: string; value: string }>;
  footer?: string;
}

interface PhaseRow {
  phase: string;
  planned: number;
  deployed: number;
  completion: number;
}

interface ContractorRow {
  name: string;
  planned: number;
  deployed: number;
  completion: number;
  trend: 'up' | 'down' | 'stable';
}

interface LinkExecRow {
  linkName: string;
  ring: string;
  delayDays: number;
  status: string;
}

interface PacItem {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

interface AlertItem {
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  subtitle: string;
  time: string;
}

interface DailyBar {
  day: string;
  iso: string;
  // Kept for the "Daily Progress (Stacked)" card + summary tiles (km).
  trenching: number;
  ducting: number;
  backfilling: number;
  // Total work done that day across ALL phases (km).
  totalKm: number;
  // Per-phase daily total (km), keyed by phaseId. Populated from the API.
  byPhase: Record<string, number>;
}

// ── Component ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.css'],
})
export class ExecutiveDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lineChartCanvas', { static: false })
  lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChartCanvas', { static: false })
  barChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('contractorCompareCanvas', { static: false })
  contractorCompareCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('timelineTrendCanvas', { static: false })
  timelineTrendCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('phaseStackedCanvas', { static: false })
  phaseStackedCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pacTimelineCanvas', { static: false })
  pacTimelineCanvas!: ElementRef<HTMLCanvasElement>;
  /** Wrapper around the forecast SVG; measured to size the viewBox. */
  @ViewChild('cumChartHost', { static: false })
  cumChartHost!: ElementRef<HTMLElement>;
  @ViewChild('dailyPhaseCanvas', { static: false })
  dailyPhaseCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('invoiceCanvas', { static: false })
  invoiceCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('invoiceTrendCanvas', { static: false })
  invoiceTrendCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('paymentStatusCanvas', { static: false })
  paymentStatusCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('linkFinancialCanvas', { static: false })
  linkFinancialCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('budgetContractorCanvas', { static: false })
  budgetContractorCanvas!: ElementRef<HTMLCanvasElement>;

  currentDate = new Date();
  cumulativeToggle = true;
  isLoading = true;
  pvaGranularity: 'weekly' | 'monthly' = 'monthly';

  /** Default project ID used by the old app.component.ts */
  projectId = '90';

  // Filter values
  dateRange = '01 May – 31 May 2025';
  selectedRegion = 'All Regions';
  selectedProject = 'All Projects';
  selectedPhase = 'All Phases';
  selectedContractor = 'All Contractors';

  // Filter options (populated dynamically from API)
  regionOptions: string[] = [];
  projectOptions: string[] = [];
  phaseOptions: string[] = [];
  contractorOptions: string[] = [];

  // Master (unfiltered) options for cascading filters
  private masterContractorOptions: string[] = [];
  private masterRegionOptions: string[] = [];
  private masterProjectOptions: string[] = [];
  private masterPhaseOptions: string[] = [];

  // Raw relationship data for cascading logic
  private rawProjectLinks: { linkName: string; ringName: string; contractorName: string }[] = [];
  private rawPhaseContractors: { phaseLabel: string; contractor: string }[] = [];

  // ── KPI Cards ──
  kpiCards: KpiCard[] = [
    { title: 'Planned Length', value: '—', unit: 'km', percentage: 0, percentLabel: '—', subtitle: 'Across all projects', color: '#3b82f6', iconPath: 'M9 3v18m0 0l-4-4m4 4l4-4M15 3v18m0 0l-4-4m4 4l4-4' },
    { title: 'Approved Length', value: '—', unit: 'km', percentage: 0, percentLabel: '—', subtitle: 'vs Planned', color: '#22c55e', iconPath: 'M5 13l4 4L19 7' },
    { title: 'Overall Completion', value: '—', unit: '%', percentage: 0, percentLabel: '—', subtitle: 'Planned vs Actual', color: '#06b6d4', iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { title: 'Trenching', value: '—', unit: 'km', percentage: 0, percentLabel: '—', subtitle: 'of Planned', color: '#f59e0b', iconPath: 'M19 14l-7 7m0 0l-7-7m7 7V3' },
    { title: 'Ducting', value: '—', unit: 'km', percentage: 0, percentLabel: '—', subtitle: 'of Planned', color: '#8b5cf6', iconPath: 'M4 6h16M4 12h16M4 18h16' },
    { title: 'Backfilling', value: '—', unit: 'km', percentage: 0, percentLabel: '—', subtitle: 'of Planned', color: '#ef4444', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  ];

  // ── Line chart data (Planned vs Actual) ──
  plannedData: number[] = [];
  actualData: number[] = [];

  // ── Ring Progress ──
  ringRows: RingRow[] = [];
  ringTotal = { planned: 0, deployed: 0, balance: 0, completion: 0 };

  // ── Top Links by Progress ──
  topLinks: TopLink[] = [];
  allLinks: TopLink[] = [];
  showAllLinks = false;

  // ── Phase Progress ──
  phaseRows: PhaseRow[] = [];
  phaseTotal = { planned: 0, deployed: 0, completion: 0 };

  // ── Daily Progress ──
  dailyBars: DailyBar[] = [];
  dailyTrenching = 0;
  dailyDucting = 0;
  dailyBackfilling = 0;
  dailyTotal = 0;
  dailyVsYesterday = 0;

  // ── Contractors Performance ──
  contractors: ContractorRow[] = [];
  contractorTotal = { planned: 0, deployed: 0, completion: 0 };

  // ── Link Execution Status ──
  linkExecCount = 15;
  linkExecRows: LinkExecRow[] = [];

  // ── PAC Status ──
  pacItems: PacItem[] = [];
  pacTotal = 0;

  // ── Alerts ──
  alerts: AlertItem[] = [];

  // ── Row 5 & 6 chart data ──
  contractorComparePlanned: number[] = [];
  contractorCompareDeployed: number[] = [];
  contractorCompareNames: string[] = [];

  ringContractorMatrix: { ringName: string; cells: number[] }[] = [];
  heatmapContractorNames: string[] = [];

  timelineDates: string[] = [];
  timelinePlanned: number[] = [];
  timelineCompleted: number[] = [];

  // ── Cumulative Progress Report (overall) chart + date filter ──
  // Fed by /api/dashboard/analytics/history (real upstream data, merged across
  // contractor hosts). plannedPct is only populated when the API reports an
  // actual plan baseline — see cumHasPlanBaseline.
  cumPoints: CumPoint[] = [];
  cumFromDate = '';
  cumToDate = '';
  cumGranularity: 'DAILY' | 'WEEKLY' | 'MONTHLY' = 'DAILY';
  /**
   * A single phase is mandatory. Upstream sums work across phases but keeps scope
   * at the route length, and since every phase spans the same physical route an
   * all-phase query reports impossible completion (>100%). Defaults to Trenching.
   */
  cumPhaseId = '2';
  /** '' = all contractors (aggregate); otherwise a single contractor name. */
  /**
   * Selected contractors. Empty = all, which is also what the API assumes when the
   * param is absent, so "none ticked" and "every one ticked" mean the same request.
   */
  cumContractors: string[] = [];
  cumLoading = false;
  cumError = '';
  /** False when upstream sends no plan → hide the Planned series and variance. */
  cumHasPlanBaseline = false;
  cumSummary: AnalyticsHistorySummary | null = null;
  cumForecast: AnalyticsHistoryForecast | null = null;
  cumCoverage: { requested: number; upstream: number; derived: number; failed: number } | null = null;
  cumSources: AnalyticsHistorySource[] = [];
  cumWarnings: string[] = [];
  /**
   * Stable option list for the contractor dropdown. Seeded from the full roster and
   * only ever widened — never narrowed to whatever the last request asked for.
   * `hasData` is last-known, advisory only; options stay selectable so a stale
   * "no data" can't lock the user out of re-querying.
   */
  cumContractorRoster: { name: string; hasData: boolean | null }[] =
    DEFAULT_CONTRACTOR_ROSTER.map(name => ({ name, hasData: null }));

  // ── Progress Report filter modal ──
  // The card's controls live in a modal instead of the header, which had grown to
  // five inline inputs. Draft values are held separately and only committed on
  // Apply, so a half-finished change never triggers a fetch.
  prFilterOpen = false;
  prDraftPhaseId = '2';
  prDraftGranularity: 'DAILY' | 'WEEKLY' | 'MONTHLY' = 'DAILY';
  prDraftContractors: string[] = [];

  // ── Progress Report forecast chart (SVG) ──
  /** statusDate from the API — the "Today" marker and the rays' anchor. */
  cumStatusDate = '';
  /** Rebuilt whenever data or size changes; null until there is something to draw. */
  cumChart: CumChartVM | null = null;
  /** SVG viewBox, in user units. Width is remeasured from the container. */
  cumSvgW = 900;
  cumSvgH = 300;
  /** In-flight request, aborted when a newer load supersedes it. */
  private cumAbort?: AbortController;
  /** Monotonic load counter; only the newest load may write state. */
  private cumReqSeq = 0;

  // ── Progress Report hover tooltip ──
  /** Hovered point plus where to place the tooltip, in CSS px within the container. */
  cumHover: { point: CumPoint; index: number; left: number; top: number; flip: boolean } | null = null;

  // ── 7-day daily progress chart + phase filter ──
  // 'all' = sum of every phase; otherwise a phaseId string (e.g. '2' = Trenching).
  dailyPhaseFilter: string = '2'; // defaults to Trenching
  /**
   * Seeded, not empty. A `<select>` bound with [(ngModel)] whose *ngFor options
   * arrive later ends up displaying option 0 while the model still holds the real
   * value — the phase dropdown read "Route Marking" while the chart showed
   * Trenching. Having the options present on first render avoids that desync.
   * Refreshed from /api/dashboard/phase-list once it responds.
   */
  dailyPhaseOptions: PhaseHistoryPhase[] = DEFAULT_PHASE_OPTIONS;
  /** True once /phase-list has replaced the seeded defaults. */
  private phaseOptionsLoaded = false;
  dailyFromDate = '';
  dailyToDate = ''; // fixed to today (not user-editable)
  dailyLoading = false;

  // ── Analysis accordions (only one open at a time) ──
  openAccordion: 'progress' | 'project' | 'budget' | null = 'progress';
  // When true (during full-dashboard export) every panel renders so the
  // capture includes all three sections.
  exportAllOpen = false;

  /** A panel is shown if it's the open one, or we're exporting everything. */
  isPanelOpen(name: 'progress' | 'project' | 'budget'): boolean {
    return this.exportAllOpen || this.openAccordion === name;
  }

  /** Today's date (yyyy-mm-dd) — upper bound for all date pickers. */
  get today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  // ── Budget Analysis: financial summary (/api/dashboard/financial-summary) ──
  /** null until the endpoint answers; until then the cards below show nothing. */
  financialSummary: FinancialSummaryResponse | null = null;
  financialLoading = false;
  /** Set when the endpoint fails, so each card can say so instead of showing 0s. */
  financialError = '';

  /** Money tiles for the Budget Summary card, in the order they read. */
  financialKpis: { label: string; value: number; color: string; hint: string }[] = [];
  /** Entity counts the summary was computed over. */
  financialCounts: { label: string; value: number }[] = [];

  // ── Budget Analysis: invoice summary ──
  /**
   * Every figure comes from /api/dashboard/financial-summary — see
   * mapFinancialSummary(). Zeroed, not seeded with plausible amounts: a static
   * seed renders as a real chart, and there is no way for a reader to tell it
   * apart from live data if the request is slow or fails. Zero reads as "not
   * loaded yet", which is the truth. `financialLoading` / `financialError`
   * drive the card's spinner and warning.
   */
  invoiceStats = {
    currency: 'OMR',
    total: 0,
    paid: 0,
    remaining: 0,
  };
  /** Labelled for what the API actually returns: budget totals, not invoices. */
  invoiceLabels = { total: 'Planned Cost', paid: 'Paid Amount', remaining: 'Remaining Budget' };
  get invoicePaidPct(): number {
    return this.invoiceStats.total > 0
      ? Math.round((this.invoiceStats.paid / this.invoiceStats.total) * 100)
      : 0;
  }

  /** Budget utilization (executed / planned), clamped to 0–100 for the bar width. */
  get budgetUtilizationPct(): number {
    const raw = this.financialSummary?.budgetUtilization ?? 0;
    return Math.max(0, Math.min(100, raw));
  }

  /**
   * Fetch `/api/dashboard/financial-summary` for the current filter scope.
   *
   * Self-contained and never throws, so callers can fire it without awaiting.
   * `filters` is the whole `buildFilterParams()` set, as getPacStatus takes —
   * the endpoint scopes on whichever of contractor/ring/link/phase it knows.
   */
  private async loadFinancialSummary(filters: Record<string, string>): Promise<void> {
    this.financialLoading = true;
    this.financialError = '';
    // Report, before the request goes out, both what the DTO cannot express
    // (multi-select) and what it had to reject (a non-numeric id).
    const shaped = toFinancialSummaryBody(filters);
    this.financialNarrowed = shaped.narrowed;
    this.financialInvalid = shaped.invalid;
    try {
      const data = await getFinancialSummary(filters);
      if (data) {
        this.mapFinancialSummary(data);
        // Both cards read the figures this just replaced.
        setTimeout(() => {
          this.drawInvoiceChart();
          this.drawPaymentStatusChart();
        }, 50);
      }
    } catch (err) {
      this.financialError = 'Financial summary unavailable — no figures to show.';
      console.warn('financial-summary failed:', err);
    } finally {
      this.financialLoading = false;
    }
  }

  /**
   * Map `/api/dashboard/financial-summary` onto the Budget Analysis cards.
   *
   * The response is a single scoped total, so it drives the three cards that
   * are totals by nature — Budget Summary, Invoice Summary and Payment Status.
   * Monthly Invoicing Trend and Budget vs Spent by Contractor need a time
   * series and a per-contractor split that this endpoint does not return, so
   * they keep their existing data rather than being fabricated from one number.
   */
  private mapFinancialSummary(fs: FinancialSummaryResponse): void {
    this.financialSummary = fs;
    this.financialError = '';

    this.financialKpis = [
      { label: 'Planned Cost', value: fs.plannedCost, color: '#3b82f6', hint: 'Approved budget in scope' },
      { label: 'Executed Cost', value: fs.executedCost, color: '#8b5cf6', hint: 'Work executed to date' },
      { label: 'Certified Amount', value: fs.certifiedAmount, color: '#06b6d4', hint: 'Certified for payment' },
      { label: 'Paid Amount', value: fs.paidAmount, color: '#22c55e', hint: 'Released to contractors' },
      {
        label: 'Remaining Budget',
        value: fs.remainingBudget,
        color: fs.remainingBudget < 0 ? '#ef4444' : '#f59e0b',
        hint: 'Planned − executed',
      },
      {
        label: 'Remaining Certification',
        value: fs.remainingCertification,
        color: fs.remainingCertification < 0 ? '#ef4444' : '#f59e0b',
        hint: 'Certified − paid (negative = paid ahead of certification)',
      },
    ];

    this.financialCounts = [
      { label: 'Projects', value: fs.totalProjects },
      { label: 'Rings', value: fs.totalRings },
      { label: 'Links', value: fs.totalLinks },
      { label: 'PACs', value: fs.totalPACs },
      { label: 'Payment Certificates', value: fs.totalPaymentCertificates },
    ];

    // Invoice Summary card: budget against what has actually been paid.
    this.invoiceStats = {
      currency: 'OMR',
      total: fs.plannedCost,
      paid: fs.paidAmount,
      remaining: fs.remainingBudget,
    };
    this.invoiceLabels = {
      total: 'Planned Cost',
      paid: 'Paid Amount',
      remaining: 'Remaining Budget',
    };

    // Payment Status donut, in OMR millions. Relabelled to the split this
    // payload actually supports — "Overdue" has no source field here, and
    // showing an invented value next to real ones would be worse than dropping
    // it. Clamped at 0: upstream can certify less than it has paid.
    const toM = (v: number) => Math.max(0, v) / 1_000_000;
    this.paymentStatus = [
      { label: 'Paid', value: toM(fs.paidAmount), color: '#22c55e' },
      {
        label: 'Certified, unpaid',
        value: toM(fs.certifiedAmount - fs.paidAmount),
        color: '#f59e0b',
      },
      // Kept short — the donut legend is drawn on canvas and cannot wrap.
      {
        label: 'Uncertified',
        value: toM(fs.executedCost - fs.certifiedAmount),
        color: '#ef4444',
      },
    ];
  }

  // ── Budget Analysis: link-wise financials ────────────────────────────────
  // One POST per link against /api/dashboard/financial-summary — see
  // getFinancialSummaryByLink(). The endpoint answers a single scope per call,
  // so a per-link chart is only possible by asking link by link.

  /** Every link the filter bar knows about, in filter-bar order. */
  linkFinancials: LinkFinancialRow[] = [];
  linkFinLoading = false;
  linkFinError = '';
  /** Links the user has ticked; empty means "all of them". */
  linkFinSelected: string[] = [];
  /** Set when the link list was longer than the fan-out ceiling. */
  linkFinDropped = 0;
  /** Links skipped because their id is not numeric — projectId is a `long`. */
  linkFinUnusable = 0;
  /** Optional date window, passed through as the DTO's fromDate / toDate. */
  linkFinFromDate = '';
  linkFinToDate = '';
  /** DTO `long` fields the filter bar had several values for — see toFinancialSummaryBody. */
  financialNarrowed: string[] = [];
  /** DTO `long` fields dropped because the id was not numeric (e.g. a ring name). */
  financialInvalid: string[] = [];

  /** Ceiling exposed to the template so the note and the code cannot drift. */
  readonly linkFinancialMax = LINK_FINANCIAL_MAX;

  /** Rows actually plotted: the ticked ones, or all when nothing is ticked. */
  get linkFinancialsPlotted(): LinkFinancialRow[] {
    const rows = this.linkFinSelected.length
      ? this.linkFinancials.filter((r) => this.linkFinSelected.includes(r.id))
      : this.linkFinancials;
    // A null summary means "we do not know", so it gets a row in the list but
    // no bar in the chart — a 0 bar beside real ones reads as "no budget".
    return rows.filter((r) => !!r.summary);
  }

  /** Rows whose request failed, listed so the gap in the chart is explained. */
  get linkFinancialsFailed(): LinkFinancialRow[] {
    return this.linkFinancials.filter((r) => !r.summary);
  }

  isLinkFinSelected(id: string): boolean {
    return this.linkFinSelected.length === 0 || this.linkFinSelected.includes(id);
  }

  toggleLinkFin(id: string): void {
    // First tick starts from "just this one" rather than "all but this one":
    // an empty selection means all, so removing from it would be a no-op.
    if (this.linkFinSelected.length === 0) {
      this.linkFinSelected = this.linkFinancials.map((r) => r.id).filter((r) => r !== id);
    } else if (this.linkFinSelected.includes(id)) {
      this.linkFinSelected = this.linkFinSelected.filter((r) => r !== id);
    } else {
      this.linkFinSelected = [...this.linkFinSelected, id];
    }
    setTimeout(() => this.drawLinkFinancialChart(), 30);
  }

  selectAllLinkFin(): void {
    this.linkFinSelected = [];
    setTimeout(() => this.drawLinkFinancialChart(), 30);
  }

  /** Utilization for one row, or null when the link's request failed. */
  linkUtilization(row: LinkFinancialRow): number | null {
    return row.summary ? row.summary.budgetUtilization : null;
  }

  /**
   * Fetch budget figures for every link in the filter bar.
   *
   * Link ids and their rings come from the maps `loadFilterOptions()` already
   * builds off `/api/dashboard/filters` — a link id is not unique without its
   * ring, so both travel together. Never throws.
   */
  async loadLinkFinancials(): Promise<void> {
    const links = (this.projectOptions || [])
      .map((name) => {
        const key = name.trim().toLowerCase();
        const id = this.linkNameToId.get(key);
        return id ? { id, name, ringId: this.linkNameToRingId.get(key) } : null;
      })
      // The predicate has to spell `ringId` as required-but-possibly-undefined:
      // that is what the map above produces, and an optional key is not
      // assignable to it (TS2677).
      .filter((l): l is { id: string; name: string; ringId: string | undefined } => !!l);

    if (links.length === 0) {
      this.linkFinancials = [];
      this.linkFinError = 'No links available yet — the filter list has not loaded.';
      return;
    }

    this.linkFinLoading = true;
    this.linkFinError = '';
    try {
      // Contractor scope only. Ring and link come from each link itself, and a
      // ringId here would zero out every link outside that ring.
      const bar = this.buildFilterParams();
      const { body } = toFinancialSummaryBody({
        contractor: bar['contractor'],
        fromDate: this.linkFinFromDate,
        toDate: this.linkFinToDate,
      });
      const { rows, dropped, unusable } = await getFinancialSummaryByLink(links, body);
      this.linkFinancials = rows;
      this.linkFinDropped = dropped;
      this.linkFinUnusable = unusable;
      this.linkFinSelected = this.linkFinSelected.filter((id) =>
        rows.some((r) => r.id === id)
      );
      const failed = rows.filter((r) => !r.summary).length;
      if (failed === rows.length) {
        this.linkFinError = 'Link-wise figures unavailable — every request failed.';
      }
      setTimeout(() => this.drawLinkFinancialChart(), 50);
    } catch (err) {
      this.linkFinError = 'Link-wise figures unavailable.';
      console.warn('financial-summary by link failed:', err);
    } finally {
      this.linkFinLoading = false;
    }
  }

  onLinkFinDateChange(): void {
    void this.loadLinkFinancials();
  }

  /** Planned vs Executed per link, in OMR millions. */
  drawLinkFinancialChart(): void {
    const rows = this.linkFinancialsPlotted;
    const toM = (v: number) => v / 1_000_000;
    this.drawGroupedBars(
      this.linkFinancialCanvas,
      rows.map((r) => r.name),
      { label: 'Planned', color: '#8b5cf6', values: rows.map((r) => toM(r.summary!.plannedCost)) },
      { label: 'Executed', color: '#06b6d4', values: rows.map((r) => toM(r.summary!.executedCost)) },
    );
  }

  // ── Retained for the two COMMENTED-OUT cards ─────────────────────────────
  // `invoiceMonthly` and `budgetByContractor` below are hardcoded. Both cards
  // that drew them are commented out in the template, because
  // /api/dashboard/financial-summary returns one scoped row of totals: no
  // month-by-month series, no per-contractor split. Kept so the cards can be
  // restored in one edit once a real source exists — nothing renders them now.

  // Monthly invoicing trend (invoiced vs paid, OMR millions) — static, UNUSED
  invoiceMonthly: { month: string; iso: string; invoiced: number; paid: number }[] = [
    { month: 'Feb', iso: '2026-02-01', invoiced: 1.62, paid: 1.20 },
    { month: 'Mar', iso: '2026-03-01', invoiced: 2.10, paid: 1.85 },
    { month: 'Apr', iso: '2026-04-01', invoiced: 1.94, paid: 1.55 },
    { month: 'May', iso: '2026-05-01', invoiced: 2.38, paid: 1.90 },
    { month: 'Jun', iso: '2026-06-01', invoiced: 2.16, paid: 1.30 },
    { month: 'Jul', iso: '2026-07-01', invoiced: 2.25, paid: 0.52 },
  ];
  // Budget Analysis filters
  invoiceFromDate = '2026-02-01';
  invoiceToDate = new Date().toISOString().slice(0, 10); // fixed to today
  budgetContractorFilter = 'all';

  get invoiceMonthlyFiltered(): { month: string; iso: string; invoiced: number; paid: number }[] {
    return this.invoiceMonthly.filter(
      m => (!this.invoiceFromDate || m.iso >= this.invoiceFromDate) &&
           (!this.invoiceToDate || m.iso <= this.invoiceToDate)
    );
  }

  get budgetByContractorFiltered(): { name: string; budget: number; spent: number }[] {
    return this.budgetContractorFilter === 'all'
      ? this.budgetByContractor
      : this.budgetByContractor.filter(c => c.name === this.budgetContractorFilter);
  }

  /**
   * No-op while Monthly Invoicing Trend and Budget vs Spent by Contractor are
   * commented out — the date inputs and contractor select that called this
   * lived in those card headers. Restore the body with the cards.
   */
  onBudgetFilterChange(): void {
    // setTimeout(() => {
    //   this.drawInvoiceTrendChart();
    //   this.drawBudgetContractorChart();
    // }, 30);
  }

  /**
   * Payment status donut (OMR millions), built by mapFinancialSummary() from
   * paidAmount / certifiedAmount / executedCost.
   *
   * Empty until the endpoint answers — drawPaymentStatusChart() early-returns
   * while the total is 0, so the canvas stays blank rather than showing an
   * invented split. (The old static seed also carried an "Overdue" slice, for
   * which this payload has no source field at all.)
   */
  paymentStatus: { label: string; value: number; color: string }[] = [];

  // Budget vs spent by contractor (OMR millions) — static, UNUSED
  budgetByContractor: { name: string; budget: number; spent: number }[] = [
    { name: 'MHD', budget: 4.20, spent: 2.90 },
    { name: 'BPT', budget: 3.10, spent: 1.30 },
    { name: 'OFO', budget: 2.60, spent: 1.60 },
    { name: 'Al-Jassar', budget: 1.40, spent: 1.35 },
    { name: 'OHI', budget: 1.15, spent: 1.10 },
  ];

  phaseStackedLabels: string[] = [];
  phaseStackedCompleted: number[] = [];
  phaseStackedInProgress: number[] = [];
  phaseStackedPending: number[] = [];
  phaseStackedBlocked: number[] = [];

  contractorGauges: { name: string; pct: number; color: string; dashArray: string }[] = [];

  pacTimelineMonths: string[] = [];
  pacTimelineApproved: number[] = [];
  pacTimelinePending: number[] = [];
  pacTimelineRejected: number[] = [];

  // ── Bottom bar ──
  dataTimestamp = 'Data as of: 31 May 2025, 11:59 PM';
  dataTimezone = 'All times are in GST (UTC+4)';

  // Status bar items
  statusBarItems = [
    { label: 'Planned Length', value: '—', dotColor: '#3b82f6', badge: '', badgeColor: '' },
    { label: 'Approved Length', value: '—', dotColor: '#22c55e', badge: '', badgeColor: '' },
    { label: 'Remaining Length', value: '—', dotColor: '#eab308', badge: '', badgeColor: '' },
    { label: 'Rings', value: '—', dotColor: '#8b5cf6', badge: '', badgeColor: '' },
    { label: 'Links', value: '—', dotColor: '#22c55e', badge: '', badgeColor: '' },
    { label: 'Trenching', value: '—', dotColor: '#eab308', badge: '', badgeColor: '' },
    { label: 'Ducting', value: '—', dotColor: '#f97316', badge: '', badgeColor: '' },
    { label: 'Backfilling', value: '—', dotColor: '#ef4444', badge: '', badgeColor: '' },
  ];

  // ── Filter Modal ──
  filterModalOpen = false;
  modalContractor = 'All Contractors';
  modalRing = 'All Rings';
  modalLink = 'All Projects';
  modalPhase = 'All Phases';
  activeFilterCount = 0;

  // ── Apply-button / mobile-filter state ──
  // Filters are staged as the user selects them, and only pushed to the API
  // when "Apply" is clicked. `applyingFilters` drives the in-button spinner.
  applyingFilters = false;
  // Compact "Filters" modal shown on narrow (<800px) viewports. Hidden by default.
  mobileFilterOpen = false;

  // ── Multi-select dropdown state ──
  openDropdown: string | null = null;
  selectedRegionIds: string[] = [];
  selectedProjectIds: string[] = [];
  selectedPhaseIds: string[] = [];
  selectedContractorIds: string[] = [];

  // ── Filter name → server id maps ──
  // Filter dropdowns display ring/link *names*, but the API expects numeric
  // ids. These maps translate the selected names back to ids in
  // buildFilterParams so ring/link filters actually scope the KPIs.
  private ringNameToId = new Map<string, string>();
  private linkNameToId = new Map<string, string>();
  // A link/project id is not unique on its own (the same id is reused across
  // rings/contractors); the ring disambiguates it, so track each link's ring.
  private linkNameToRingId = new Map<string, string>();

  // ── Phase KPI (Trenching/Ducting/Backfilling) scaling ──
  // The upstream phase API returns network-wide phase totals only and does not
  // support ring/link filtering. We capture those totals once, plus the
  // unfiltered grand-total planned length, then rescale the three phase cards
  // by (filtered planned / grand planned) so they track the ring/link filter.
  // Exact when unfiltered; a proportional estimate otherwise.
  private grandPlannedKm = 0;
  private phaseKpiRef: {
    trench: number; duct: number; backfill: number;
    trenchPct: number; ductPct: number; backfillPct: number;
  } | null = null;

  private documentClickBound = this.closeAllDropdowns.bind(this);
  private themeObserver?: MutationObserver;

  themeMode: Theme = 'dark';

  // Notification popup
  showNotifications = false;
  recentActivities = [
    { title: 'IPC #7 submitted - Marina Tower', time: '2 min ago', icon: 'invoice', color: '#22c55e' },
    { title: 'Subcontractor cert approved', time: '15 min ago', icon: 'payment', color: '#3b82f6' },
    { title: 'BOQ variation - Palm Gateway', time: '1 hour ago', icon: 'project', color: '#f59e0b' },
    { title: 'Payment received - Al Maktoum', time: '3 hours ago', icon: 'payment', color: '#22c55e' },
    { title: 'Work order issued - MEP Phase 2', time: '5 hours ago', icon: 'order', color: '#ef4444' },
    { title: 'Material PO approved - Steel', time: '6 hours ago', icon: 'order', color: '#3b82f6' },
    { title: 'Retention release - Creek Harbour', time: '8 hours ago', icon: 'payment', color: '#22c55e' },
    { title: 'Site inspection completed', time: '1 day ago', icon: 'project', color: '#f59e0b' },
    { title: 'Safety audit cleared - JBR Phase 2', time: '1 day ago', icon: 'alert', color: '#8b5cf6' },
    { title: 'Concrete pour completed - DIFC', time: '2 days ago', icon: 'project', color: '#06b6d4' },
    { title: 'Variation order approved - Creek', time: '2 days ago', icon: 'invoice', color: '#ec4899' },
    { title: 'New PO raised - Electrical works', time: '3 days ago', icon: 'order', color: '#f59e0b' }
  ];

  userMenuOpen = false;

  constructor(
    private themeService: ThemeService,
    public auth: AuthService,
    private router: Router,
    private externalSession: ExternalSessionService
  ) {
    this.themeMode = this.themeService.getTheme();
    this.isHandoverTab = this.externalSession.isHandoverTab();
  }

  /**
   * True when this tab was opened from the client dashboard's /contractors
   * page. The way back has to live in this header: the sidebar collapses its
   * Back button to a bare icon, which is easy to miss.
   */
  isHandoverTab = false;

  /** Drop this contractor's session and close the tab. */
  backToClient(): void {
    this.auth.clearSession();
    this.externalSession.clear();
    this.externalSession.closeTab();
  }

  // ── Logged-in user chip ─────────────────────────────────────────────────
  get userName(): string {
    const u = this.auth.user();
    if (!u) return 'Guest';
    const full = `${u.firstName || ''} ${u.lastName || ''}`.trim();
    return full || u.username;
  }
  get userRole(): string {
    return this.auth.user()?.role?.name || '';
  }
  get userInitials(): string {
    const u = this.auth.user();
    if (!u) return '?';
    const a = (u.firstName || u.username || '?').charAt(0);
    const b = (u.lastName || '').charAt(0);
    return (a + b).toUpperCase();
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
  }
  goProfile(): void {
    this.userMenuOpen = false;
    this.router.navigate(['/profile']);
  }
  goChangePassword(): void {
    this.userMenuOpen = false;
    this.router.navigate(['/change-password']);
  }
  doLogout(): void {
    this.userMenuOpen = false;
    this.auth.logout();
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    document.addEventListener('click', this.documentClickBound);
    this.loadDynamicData();

    // Redraw canvas charts when theme changes
    this.themeObserver = new MutationObserver(() => {
      this.redrawAllCharts();
    });
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  ngAfterViewInit(): void {
    // If data already loaded before view init, draw charts now
    if (!this.isLoading) {
      setTimeout(() => this.redrawAllCharts(), 100);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickBound);
    this.themeObserver?.disconnect();
    // Drop any in-flight history fetch; navigating away shouldn't leave a ~15s
    // upstream fan-out running with nowhere to deliver its result.
    this.cumAbort?.abort();
  }

  toggleTheme(): void {
    this.themeService.toggle();
    this.themeMode = this.themeService.getTheme();
  }

  // ── Section / dashboard export ─────────────────────────────────────────────

  /** True while a full-dashboard image capture is in progress. */
  exportingDashboard = false;
  /** Title of the card currently being exported (drives the per-card spinner). */
  exportingCard: string | null = null;

  /** Let Angular paint the spinner before the (blocking) html2canvas pass. */
  private nextFrame(): Promise<void> {
    return new Promise((resolve) =>
      requestAnimationFrame(() => setTimeout(resolve, 0))
    );
  }

  /** Capture a single card (chart/graph section) as a PNG image. */
  async downloadCardImage(cardEl: HTMLElement, title: string): Promise<void> {
    if (this.exportingCard) return;
    this.exportingCard = title;
    try {
      await this.nextFrame();
      await exportElementToImage(cardEl, title, 1.5);
    } catch (err) {
      console.error('Card image export failed:', err);
    } finally {
      this.exportingCard = null;
    }
  }

  /** True when the deployment serves exactly one contractor. */
  get isSingleContractorDeployment(): boolean {
    return this.contractorOptions.length === 1;
  }

  /**
   * With one contractor there is nothing to choose: select it everywhere the
   * UI tracks a contractor, so filters and exports are scoped from first load
   * instead of sending an "All Contractors" that means the same thing.
   */
  private applySingleContractorDefault(): void {
    if (this.contractorOptions.length !== 1) return;
    const only = this.contractorOptions[0];
    this.selectedContractor = only;
    this.modalContractor = only;
    this.selectedContractorIds = [only];
  }

  // ── Daily Progress Report export modal ──────────────────────────────────
  dprModalOpen = false;
  dprDate = '';
  dprApprovedOnly = false;
  dprLoadingPdf = false;
  dprLoadingExcel = false;
  dprError = '';

  /** Contractor shown as a chip in the modal; '' hides the chip. */
  get dprContractorLabel(): string {
    return upstreamApi.contractor || this.selectedContractorIds[0] || '';
  }

  /** Ring shown as a chip; only when exactly one ring is selected. */
  get dprRingLabel(): string {
    return this.selectedRegionIds.length === 1 ? this.selectedRegionIds[0] : '';
  }

  /**
   * Numeric ring id for the export query — NOT the label above.
   *
   * The ring dropdown holds ring *names* ('Muscat Ring'), but /api/dpr/download*
   * validates `ringId` as a number and answers HTTP 400
   * "Invalid value for parameter 'ringId': Muscat Ring" for anything else. That
   * 400 is what surfaced as "Excel download failed" whenever a ring was picked;
   * both PDF and Excel were broken, since they share this query.
   *
   * Same translation `buildFilterParams()` already does for the chart endpoints
   * (see the ringNameToId use there). Returns '' when the name is unknown, so a
   * failed lookup drops the filter and exports the full report rather than
   * sending a name the server rejects.
   */
  get dprRingId(): string {
    if (this.selectedRegionIds.length !== 1) return '';
    const name = this.selectedRegionIds[0];
    return this.ringNameToId.get(name.trim().toLowerCase()) || '';
  }

  /** Link shown as a chip; only when exactly one link is selected. */
  get dprLinkLabel(): string {
    return this.selectedProjectIds.length === 1 ? this.selectedProjectIds[0] : '';
  }

  /**
   * Numeric link id for the export query. The modal says "Download filtered
   * progress reports", but the selected Link was never sent, so a link-scoped
   * export silently returned the whole ring. `projectId` is accepted by both
   * endpoints (verified: ringId=1&projectId=100 -> HTTP 200).
   */
  get dprProjectId(): string {
    if (this.selectedProjectIds.length !== 1) return '';
    const name = this.selectedProjectIds[0];
    return this.linkNameToId.get(name.trim().toLowerCase()) || '';
  }

  openDownloadModal(): void {
    // Default to today, matching the reference app's date picker.
    if (!this.dprDate) this.dprDate = new Date().toISOString().slice(0, 10);
    this.dprError = '';
    this.dprModalOpen = true;
  }

  closeDownloadModal(): void {
    // Leave a download in flight alone rather than orphaning its spinner.
    if (this.dprLoadingPdf || this.dprLoadingExcel) return;
    this.dprModalOpen = false;
  }

  /**
   * Download the Daily Progress Report straight from the contractor API
   * (`/api/dpr/download` and `/api/dpr/download-excel`). The Node gateway never
   * proxied these, so they are direct-only.
   */
  async downloadDpr(type: 'pdf' | 'excel'): Promise<void> {
    if (this.dprLoadingPdf || this.dprLoadingExcel || !this.dprDate) return;
    this.dprError = '';
    if (type === 'pdf') this.dprLoadingPdf = true;
    else this.dprLoadingExcel = true;

    try {
      const { blob, filename } = await upstreamApi.downloadDpr(type, {
        date: this.dprDate,
        // Numeric ids, not the display names the dropdowns hold — the server
        // 400s on a ring name. See `dprRingId`.
        ringId: this.dprRingId || null,
        projectId: this.dprProjectId || null,
        contractor: this.dprContractorLabel || null,
        approvedOnly: this.dprApprovedOnly,
        // Names are for the filename only; the query above uses the ids.
        ringLabel: this.dprRingLabel || null,
        projectLabel: this.dprLinkLabel || null,
      });
      upstreamApi.saveBlob(blob, filename);
      this.dprModalOpen = false;
    } catch (error) {
      // Show what the server actually said. The old blanket "Please try again"
      // was misleading for a 400: retrying an unchanged bad request never
      // helped, and it hid the reason from whoever reported the bug.
      const label = type === 'pdf' ? 'PDF' : 'Excel';
      const detail = await upstreamApi.describeDownloadError(error);
      this.dprError = detail
        ? `${label} download failed: ${detail}`
        : `${label} download failed. Please try again.`;
      console.error('[dpr] download failed', error);
    } finally {
      this.dprLoadingPdf = false;
      this.dprLoadingExcel = false;
    }
  }

  /** Export the whole dashboard as a single PNG image. */
  async downloadDashboardImage(): Promise<void> {
    const root = document.querySelector('.exec-dashboard') as HTMLElement | null;
    if (!root || this.exportingDashboard) return;
    this.exportingDashboard = true;
    // Open every accordion so the export captures all sections, then restore.
    const prevOpen = this.openAccordion;
    this.exportAllOpen = true;
    try {
      await this.nextFrame();
      // Panels just rendered — let their canvas charts draw before capture.
      this.redrawAllCharts();
      await new Promise((r) => setTimeout(r, 250));
      await this.nextFrame();
      // Lower scale for the large full-page capture keeps it fast.
      await exportElementToImage(root, 'Executive Dashboard', 1);
    } catch (err) {
      console.error('Dashboard image export failed:', err);
    } finally {
      // Restore the default single-open accordion state.
      this.exportAllOpen = false;
      this.openAccordion = prevOpen;
      this.exportingDashboard = false;
      setTimeout(() => this.redrawAllCharts(), 50);
    }
  }

  /** Build + download the .xlsx workbook for a given table section. */
  downloadTableXlsx(section: string): void {
    switch (section) {
      case 'ringProgress': {
        const rows = this.ringRows.map((r) => [r.name, r.planned, r.deployed, r.balance, `${r.completion}%`]);
        rows.push(['Total', this.ringTotal.planned, this.ringTotal.deployed, this.ringTotal.balance, `${this.ringTotal.completion}%`]);
        exportTableToXlsx('Ring Progress', ['Ring Name', 'Planned (km)', 'Deployed (km)', 'Balance (km)', 'Completion'], rows);
        break;
      }
      case 'topLinks': {
        const src = this.allLinks.length > 0 ? this.allLinks : this.topLinks;
        const rows = src.map((l) => [l.id, l.planned, l.deployed, `${l.completion}%`]);
        exportTableToXlsx('Top Links by Progress', ['Link Name', 'Planned (km)', 'Completed (km)', 'Progress'], rows);
        break;
      }
      case 'phaseProgress': {
        const rows = this.phaseRows.map((p) => [p.phase, p.planned, p.deployed, `${p.completion}%`]);
        rows.push(['Total', this.phaseTotal.planned, this.phaseTotal.deployed, `${this.phaseTotal.completion}%`]);
        exportTableToXlsx('Phase Progress', ['Phase', 'Planned (km)', 'Deployed (km)', 'Completion'], rows);
        break;
      }
      case 'contractorsPerformance': {
        const rows = this.contractors.map((c) => [c.name, c.planned, c.deployed, `${c.completion}%`, c.trend]);
        rows.push(['Total', this.contractorTotal.planned, this.contractorTotal.deployed, `${this.contractorTotal.completion}%`, '']);
        exportTableToXlsx('Contractors Performance', ['Contractor', 'Planned (km)', 'Deployed (km)', 'Completion', 'Trend'], rows);
        break;
      }
      case 'linkExecutions': {
        const rows = this.linkExecRows.map((r) => [r.linkName, r.ring, `${r.delayDays}%`, r.status]);
        exportTableToXlsx('Link Executions Status', ['Link Name', 'Ring', 'Completion', 'Status'], rows);
        break;
      }
      case 'phaseWiseProgress': {
        // Same series as the old dashboard's chart: % of phase with the quantity alongside.
        // Quantities are metres, except Man Holes / Hand Holes / Marker Post which are counts —
        // so no Total row, since metres and counts can't be summed together.
        const rows = this.phaseWiseLabels.map((label, i) => [
          label,
          this.phaseWiseUnit(label),
          `${this.phaseWiseCompletedPct[i].toFixed(2)}%`,
          Math.round(this.phaseWiseCompletedM[i]),
          `${this.phaseWiseInProgressPct[i].toFixed(2)}%`,
          Math.round(this.phaseWiseInProgressM[i]),
          `${this.phaseWisePendingPct[i].toFixed(2)}%`,
          Math.round(this.phaseWisePendingM[i]),
        ]);
        exportTableToXlsx(
          'Phase-wise Progress',
          ['Phase', 'Unit', 'Approved (Client) %', 'Approved (Client) Qty', 'In Progress %', 'In Progress Qty', 'Pending %', 'Pending Qty'],
          rows
        );
        break;
      }
      case 'layerWiseProgress': {
        const rows = this.layerWiseLabels.map((label, i) => [
          label,
          this.layerWiseApprovedKm[i],
          this.layerWiseInProgressKm[i],
          this.layerWiseRejectedKm[i],
          this.layerWiseTotalKm[i],
        ]);
        exportTableToXlsx(
          'Layer wise Progress',
          ['Phase', 'Approved (Client) km', 'In Progress km', 'Rejected km', 'Total km'],
          rows
        );
        break;
      }
      case 'trenchingTypeProgress': {
        const rows = this.trenchingRows.map((r) => [
          this.trenchingCode(r),
          r.trenchingTypeName,
          `${r.widthMm}x${r.heightMm}`,
          Math.round(Number(r.totalM) || 0),
          Math.round(Number(r.completedM) || 0),
          Math.round(Number(r.inProgressM) || 0),
          Math.round(Number(r.pendingM) || 0),
          `${(Number(r.completedPercent) || 0).toFixed(2)}%`,
          Number(r.segmentCount) || 0,
          `${(Number(r.rockPercentage) || 0).toFixed(2)}%`,
          +(Number(r.rockVolume) || 0).toFixed(2),
          +(Number(r.sandVolume) || 0).toFixed(2),
          Math.round(Number(r.extraExcavationM) || 0),
        ]);
        exportTableToXlsx(
          'Trenching Type Progress',
          [
            'Code', 'Trenching Type', 'Profile (mm)', 'Planned (m)', 'Completed (m)',
            'In Progress (m)', 'Pending (m)', 'Completion', 'Segments', 'Rock %',
            'Rock Volume (m3)', 'Sand Volume (m3)', 'Extra Excavation (m)',
          ],
          rows
        );
        break;
      }
      case 'ringHeatmap': {
        const headers = ['Ring', ...this.heatmapContractorNames];
        const rows = this.ringContractorMatrix.map((row) => [row.ringName, ...row.cells.map((c) => `${c}%`)]);
        exportTableToXlsx('Ring x Contractor Completion Heatmap', headers, rows);
        break;
      }
    }
  }

  private redrawAllCharts(): void {
    setTimeout(() => {
      this.drawLineChart();
      this.rebuildCumChart();
      this.drawDailyPhaseChart();
      this.drawInvoiceChart();
      this.drawPaymentStatusChart();
      this.drawLinkFinancialChart();
      // Cards commented out in the template — no canvas to draw into.
      // this.drawInvoiceTrendChart();
      // this.drawBudgetContractorChart();
      this.drawBarChart();
      this.drawContractorCompareChart();
      this.drawTimelineTrendChart();
      this.drawPhaseStackedChart();
      this.drawPhaseWiseProgressChart();
      this.drawLayerWiseProgressChart();
      this.drawTrenchingProgressChart();
      this.drawTrenchingSplitChart();
      this.drawWorkProgressChart();
      this.drawPacTimelineChart();
    }, 50);
  }

  // ── Analysis accordion (one open at a time) ──────────────────────────────

  toggleAccordion(name: 'progress' | 'project' | 'budget'): void {
    this.openAccordion = this.openAccordion === name ? null : name;
    // Canvas charts live inside the panels; once a panel becomes visible and
    // has layout dimensions again, its charts need to be redrawn.
    if (this.openAccordion) {
      this.redrawAllCharts();
    }
    // The link-wise card costs one POST per link, so it loads when the panel is
    // first opened rather than on dashboard boot. Re-opening reuses the rows.
    if (this.openAccordion === 'budget' && this.linkFinancials.length === 0 && !this.linkFinLoading) {
      void this.loadLinkFinancials();
    }
  }

  // ── Multi-select dropdown methods ───────────────────────────────────────

  private closeAllDropdowns(): void {
    this.openDropdown = null;
    this.showNotifications = false;
    this.userMenuOpen = false;
  }

  toggleDropdown(type: string, event: Event): void {
    // A single-contractor deployment has its contractor locked — ignore any
    // attempt to change it, including keyboard and programmatic paths.
    if (type === 'contractor' && this.isSingleContractorDeployment) return;
    event.stopPropagation();
    this.openDropdown = this.openDropdown === type ? null : type;
  }

  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
    this.openDropdown = null;
  }

  isSelected(type: string, value: string): boolean {
    switch (type) {
      case 'region': return this.selectedRegionIds.includes(value);
      case 'project': return this.selectedProjectIds.includes(value);
      case 'phase': return this.selectedPhaseIds.includes(value);
      case 'contractor': return this.selectedContractorIds.includes(value);
      default: return false;
    }
  }

  toggleSelection(type: string, value: string): void {
    // A single-contractor deployment has its contractor locked — ignore any
    // attempt to change it, including keyboard and programmatic paths.
    if (type === 'contractor' && this.isSingleContractorDeployment) return;
    const arr = this.getSelectionArray(type);
    const idx = arr.indexOf(value);
    if (idx >= 0) { arr.splice(idx, 1); } else { arr.push(value); }
    this.syncSelectionLabel(type);
    this.applyCascadingFilters(type);
    this.applyReverseCascade(type);
  }

  msSelectAll(type: string): void {
    // A single-contractor deployment has its contractor locked — ignore any
    // attempt to change it, including keyboard and programmatic paths.
    if (type === 'contractor' && this.isSingleContractorDeployment) return;
    switch (type) {
      case 'region': this.selectedRegionIds = [...this.regionOptions]; break;
      case 'project': this.selectedProjectIds = [...this.projectOptions]; break;
      case 'phase': this.selectedPhaseIds = [...this.phaseOptions]; break;
      case 'contractor': this.selectedContractorIds = [...this.contractorOptions]; break;
    }
    this.syncSelectionLabel(type);
    this.applyCascadingFilters(type);
    this.applyReverseCascade(type);
  }

  msClear(type: string): void {
    // A single-contractor deployment has its contractor locked — ignore any
    // attempt to change it, including keyboard and programmatic paths.
    if (type === 'contractor' && this.isSingleContractorDeployment) return;
    switch (type) {
      case 'region': this.selectedRegionIds = []; break;
      case 'project': this.selectedProjectIds = []; break;
      case 'phase': this.selectedPhaseIds = []; break;
      case 'contractor': this.selectedContractorIds = []; break;
    }
    this.syncSelectionLabel(type);
    this.applyCascadingFilters(type);
    this.applyReverseCascade(type);
  }

  private getSelectionArray(type: string): string[] {
    switch (type) {
      case 'region': return this.selectedRegionIds;
      case 'project': return this.selectedProjectIds;
      case 'phase': return this.selectedPhaseIds;
      case 'contractor': return this.selectedContractorIds;
      default: return [];
    }
  }

  private syncSelectionLabel(type: string): void {
    const arr = this.getSelectionArray(type);
    switch (type) {
      case 'region':
        this.selectedRegion = arr.length === 0 || arr.length === this.regionOptions.length
          ? 'All Regions' : arr.length === 1 ? arr[0] : `${arr.length} selected`;
        break;
      case 'project':
        this.selectedProject = arr.length === 0 || arr.length === this.projectOptions.length
          ? 'All Projects' : arr.length === 1 ? arr[0] : `${arr.length} selected`;
        break;
      case 'phase':
        this.selectedPhase = arr.length === 0 || arr.length === this.phaseOptions.length
          ? 'All Phases' : arr.length === 1 ? arr[0] : `${arr.length} selected`;
        break;
      case 'contractor':
        this.selectedContractor = arr.length === 0 || arr.length === this.contractorOptions.length
          ? 'All Contractors' : arr.length === 1 ? arr[0] : `${arr.length} selected`;
        break;
    }
  }

  // ── Cascading filter logic ─────────────────────────────────────────────────
  // Hierarchy: Contractor → Ring → Link → Phase
  // When a higher-level filter changes, downstream options are narrowed.

  private fuzzyMatch(selected: string[], value: string): boolean {
    if (!value) return false;
    const v = value.trim().toLowerCase();
    return selected.some(s => {
      const sl = s.trim().toLowerCase();
      return sl === v || v.includes(sl) || sl.includes(v);
    });
  }

  private applyCascadingFilters(changedType: string): void {
    const projects = this.rawProjectLinks;
    if (projects.length === 0) return;

    // Helper: check if filter is active (not empty and not "all selected")
    const hasContractorFilter = this.selectedContractorIds.length > 0
      && this.selectedContractorIds.length < this.masterContractorOptions.length;
    const hasRingFilter = this.selectedRegionIds.length > 0
      && this.selectedRegionIds.length < this.masterRegionOptions.length;
    const hasLinkFilter = this.selectedProjectIds.length > 0
      && this.selectedProjectIds.length < this.masterProjectOptions.length;

    // Step 1: Filter by contractor
    let filtered = projects;
    if (hasContractorFilter) {
      filtered = filtered.filter(p => this.fuzzyMatch(this.selectedContractorIds, p.contractorName));
    }

    // Step 2: Update Ring options when contractor changes
    if (changedType === 'contractor') {
      const availableRings = [...new Set(filtered.map(p => p.ringName).filter(Boolean))];
      // Match against master options using fuzzy match
      this.regionOptions = hasContractorFilter && availableRings.length > 0
        ? this.masterRegionOptions.filter(opt => availableRings.some(r => r.toLowerCase() === opt.toLowerCase() || r.toLowerCase().includes(opt.toLowerCase()) || opt.toLowerCase().includes(r.toLowerCase())))
        : [...this.masterRegionOptions];
      if (this.regionOptions.length === 0) this.regionOptions = [...this.masterRegionOptions];
      this.selectedRegionIds = this.selectedRegionIds.filter(id => this.regionOptions.includes(id));
      this.syncSelectionLabel('region');
    }

    // Step 3: Further filter by ring
    if (hasRingFilter) {
      filtered = filtered.filter(p => this.fuzzyMatch(this.selectedRegionIds, p.ringName));
    }

    // Step 4: Update Link options when contractor or ring changes
    if (changedType === 'contractor' || changedType === 'region') {
      const availableLinks = [...new Set(filtered.map(p => p.linkName).filter(Boolean))];
      const hasAnyFilter = hasContractorFilter || hasRingFilter;
      // Match link names from filtered projects against master project options
      this.projectOptions = hasAnyFilter && availableLinks.length > 0
        ? this.masterProjectOptions.filter(opt => availableLinks.some(l => l.toLowerCase() === opt.toLowerCase() || l.toLowerCase().includes(opt.toLowerCase()) || opt.toLowerCase().includes(l.toLowerCase())))
        : [...this.masterProjectOptions];
      if (this.projectOptions.length === 0) this.projectOptions = [...this.masterProjectOptions];
      this.selectedProjectIds = this.selectedProjectIds.filter(id => this.projectOptions.includes(id));
      this.syncSelectionLabel('project');
    }

    // Step 5: Further filter by link
    if (hasLinkFilter) {
      filtered = filtered.filter(p => this.fuzzyMatch(this.selectedProjectIds, p.linkName));
    }

    // Step 6: Update Phase options when any upstream changes
    if (changedType === 'contractor' || changedType === 'region' || changedType === 'project') {
      const hasAnyFilter = hasContractorFilter || hasRingFilter || hasLinkFilter;
      if (hasAnyFilter && this.rawPhaseContractors.length > 0) {
        const relevantContractors = new Set(filtered.map(p => p.contractorName.trim().toLowerCase()));
        const availablePhases = [...new Set(
          this.rawPhaseContractors
            .filter(pc => {
              const pcLower = pc.contractor.trim().toLowerCase();
              return relevantContractors.has(pcLower) || [...relevantContractors].some(rc => rc.includes(pcLower) || pcLower.includes(rc));
            })
            .map(pc => pc.phaseLabel)
            .filter(Boolean)
        )];
        this.phaseOptions = availablePhases.length > 0
          ? this.masterPhaseOptions.filter(opt => availablePhases.some(p => p === opt || p.toLowerCase() === opt.toLowerCase()))
          : [...this.masterPhaseOptions];
        if (this.phaseOptions.length === 0) this.phaseOptions = [...this.masterPhaseOptions];
      } else {
        this.phaseOptions = [...this.masterPhaseOptions];
      }
      this.selectedPhaseIds = this.selectedPhaseIds.filter(id => this.phaseOptions.includes(id));
      this.syncSelectionLabel('phase');
    }
  }

  // ── Reverse (upstream) cascade ──────────────────────────────────────────────
  // Selecting a Link auto-selects its parent Ring + Contractor; selecting a Ring
  // auto-selects its parent Contractor. Runs AFTER applyCascadingFilters so it
  // sets the parent selections without hiding the child the user just picked.

  /** Map a raw ring/contractor name to the matching master option label. */
  private mapValueToOption(masterOptions: string[], value: string): string | null {
    if (!value) return null;
    const v = value.trim().toLowerCase();
    const exact = masterOptions.find(o => o.trim().toLowerCase() === v);
    if (exact) return exact;
    const fuzzy = masterOptions.find(o => {
      const ol = o.trim().toLowerCase();
      return v.includes(ol) || ol.includes(v);
    });
    return fuzzy || null;
  }

  private applyReverseCascade(changedType: string): void {
    const links = this.rawProjectLinks;
    if (links.length === 0) return;

    if (changedType === 'project') {
      // Only force parents for a real subset (not "all" / "none").
      const hasLinkSubset = this.selectedProjectIds.length > 0
        && this.selectedProjectIds.length < this.masterProjectOptions.length;
      if (!hasLinkSubset) return;

      const matched = links.filter(l => this.fuzzyMatch(this.selectedProjectIds, l.linkName));
      const rings = new Set<string>();
      const contractors = new Set<string>();
      for (const l of matched) {
        const r = this.mapValueToOption(this.masterRegionOptions, l.ringName);
        if (r) rings.add(r);
        const c = this.mapValueToOption(this.masterContractorOptions, l.contractorName);
        if (c) contractors.add(c);
      }
      if (rings.size > 0) {
        this.regionOptions = [...this.masterRegionOptions];
        this.selectedRegionIds = [...rings];
        this.syncSelectionLabel('region');
      }
      if (contractors.size > 0) {
        this.contractorOptions = [...this.masterContractorOptions];
        this.selectedContractorIds = [...contractors];
        this.syncSelectionLabel('contractor');
      }
    } else if (changedType === 'region') {
      const hasRingSubset = this.selectedRegionIds.length > 0
        && this.selectedRegionIds.length < this.masterRegionOptions.length;
      if (!hasRingSubset) return;

      const matched = links.filter(l => this.fuzzyMatch(this.selectedRegionIds, l.ringName));
      const contractors = new Set<string>();
      for (const l of matched) {
        const c = this.mapValueToOption(this.masterContractorOptions, l.contractorName);
        if (c) contractors.add(c);
      }
      if (contractors.size > 0) {
        this.contractorOptions = [...this.masterContractorOptions];
        this.selectedContractorIds = [...contractors];
        this.syncSelectionLabel('contractor');
      }
    }
  }

  // ── Granularity change for Planned vs Actual chart ───────────────────────

  async onGranularityChange(): Promise<void> {
    try {
      const filters = this.buildFilterParams();
      const data = await getPlannedVsActual({
        granularity: this.pvaGranularity as 'weekly' | 'monthly',
        contractorIds: filters['contractorIds'],
        ringIds: filters['ringIds'],
        linkIds: filters['linkIds'],
      });
      if (data) {
        this.mapPlannedVsActualData(data);
        setTimeout(() => this.drawLineChart(), 50);
      }
    } catch (e) {
      console.warn('Failed to reload PVA with new granularity:', e);
    }
  }

  // ── Filter change handler (debounced) ────────────────────────────────────
  private filterDebounceTimer: any = null;

  onFilterChange(): void {
    if (this.filterDebounceTimer) clearTimeout(this.filterDebounceTimer);
    this.filterDebounceTimer = setTimeout(() => {
      this.isLoading = true;
      this.loadDynamicData();
    }, 300);
  }

  /**
   * Apply the currently-staged filter selections. Selecting options only
   * updates local state + narrows dependent dropdowns; nothing hits the API
   * until this runs. Shows a spinner in the button until the reload finishes.
   */
  async applyFilters(): Promise<void> {
    if (this.applyingFilters) return;
    this.applyingFilters = true;
    this.openDropdown = null;
    try {
      this.updateActiveFilterCount();
      this.isLoading = true;
      await this.loadDynamicData();
    } finally {
      this.applyingFilters = false;
    }
  }

  openMobileFilterModal(): void {
    this.mobileFilterOpen = true;
    this.openDropdown = null;
  }

  cancelMobileFilterModal(): void {
    this.mobileFilterOpen = false;
    this.openDropdown = null;
  }

  /** Apply from the mobile modal, then close it once the reload completes. */
  async applyMobileFilters(): Promise<void> {
    await this.applyFilters();
    this.mobileFilterOpen = false;
  }

  openFilterModal(): void {
    this.modalContractor = this.selectedContractor;
    this.modalRing = this.selectedRegion === 'All Regions' ? 'All Rings' : this.selectedRegion;
    this.modalLink = this.selectedProject;
    this.modalPhase = this.selectedPhase;
    this.filterModalOpen = true;
  }

  cancelFilterModal(): void {
    this.filterModalOpen = false;
  }

  applyFilterModal(): void {
    this.selectedContractor = this.modalContractor;
    this.selectedRegion = this.modalRing === 'All Rings' ? 'All Regions' : this.modalRing;
    this.selectedProject = this.modalLink;
    this.selectedPhase = this.modalPhase;
    this.filterModalOpen = false;
    this.updateActiveFilterCount();
    this.onFilterChange();
  }

  resetFilters(): void {
    this.modalContractor = 'All Contractors';
    this.modalRing = 'All Rings';
    this.modalLink = 'All Projects';
    this.modalPhase = 'All Phases';
  }

  private updateActiveFilterCount(): void {
    let count = 0;
    if (this.selectedContractor !== 'All Contractors') count++;
    if (this.selectedRegion !== 'All Regions') count++;
    if (this.selectedProject !== 'All Projects') count++;
    if (this.selectedPhase !== 'All Phases') count++;
    this.activeFilterCount = count;
  }

  // ── Build filter params from current selections ──────────────────────────

  private buildFilterParams(): Record<string, string> {
    const params: Record<string, string> = {};

    // Contractor: use multi-select IDs array
    if (this.selectedContractorIds.length > 0 && this.selectedContractorIds.length < this.contractorOptions.length) {
      const joined = this.selectedContractorIds.join(',');
      params['contractor'] = joined;
      params['contractorIds'] = joined;
    }

    // Region/Ring: dropdown holds ring *names* — translate to server ring ids.
    if (this.selectedRegionIds.length > 0 && this.selectedRegionIds.length < this.regionOptions.length) {
      const joined = this.selectedRegionIds
        .map(name => this.ringNameToId.get(name.trim().toLowerCase()) || name)
        .join(',');
      params['ringId'] = joined;
      params['ringIds'] = joined;
    }

    // Phase: use multi-select IDs array
    if (this.selectedPhaseIds.length > 0 && this.selectedPhaseIds.length < this.phaseOptions.length) {
      params['phaseId'] = this.selectedPhaseIds.join(',');
    }

    // Project/Link: dropdown holds link *names* — translate to server link ids.
    if (this.selectedProjectIds.length > 0 && this.selectedProjectIds.length < this.projectOptions.length) {
      const joined = this.selectedProjectIds
        .map(name => this.linkNameToId.get(name.trim().toLowerCase()) || name)
        .join(',');
      params['projectId'] = joined;
      params['linkIds'] = joined;

      // A link id alone is ambiguous — scope by the selected links' rings so the
      // aggregate resolves the exact link. Only when no ring filter is set.
      if (!params['ringId']) {
        const linkRings = Array.from(new Set(
          this.selectedProjectIds
            .map(name => this.linkNameToRingId.get(name.trim().toLowerCase()))
            .filter((r): r is string => !!r)
        ));
        if (linkRings.length) {
          params['ringId'] = linkRings.join(',');
          params['ringIds'] = linkRings.join(',');
        }
      }
    }

    return params;
  }

  // ── Dynamic data loading ──────────────────────────────────────────────────

  private async loadDynamicData(): Promise<void> {
    try {
      const filters = this.buildFilterParams();

      // Budget Analysis, fired independently and NOT awaited.
      //
      // It must not sit behind the batches below: those await bootstrap /
      // progress-summary, which run on the 25s–120s `apiLong` client, and any
      // throw between here and there jumps to the catch. Either way the request
      // would never be issued. This is one small call — let it race.
      this.loadFinancialSummary(filters);

      // Phase-wise / Layer wise Progress. Two small calls, independent of the
      // batches below, so let them race rather than queue behind apiLong.
      void this.loadPhaseProgressCharts(filters);

      // Trenching-type-wise Progress — one more small, independent call.
      void this.loadTrenchingTypeProgress(filters);

      // ── FAST BATCH: local DB queries (<25ms each) ──
      const [bootResult, kpiResult, dimResult, pacResult, progressResult, trendResult, filtersResult] =
        await Promise.allSettled([
          getDashboardBootstrap(this.projectId, filters),
          getKpiAggregate({
            contractor: filters['contractor'],
            ringId: filters['ringId'],
            projectId: filters['projectId'],
          }),
          getKpiDimensions({
            contractor: filters['contractor'],
            contractorIds: filters['contractorIds'],
            ringId: filters['ringId'],
            ringIds: filters['ringIds'],
            linkIds: filters['linkIds'],
          }),
          getPacStatus(filters),
          getProgressSummary({
            contractor: filters['contractor'],
            phaseId: filters['phaseId'],
            ...filters,
          }),
          getTimelineTrend(filters),
          getDashboardFilters({
            phaseId: filters['phaseId'],
          }),
        ]);

      // Track whether contractors were populated by dimensions
      let contractorsFromDim = false;

      // ── Process kpiResult (getKpiAggregate) ──
      if (kpiResult.status === 'fulfilled' && kpiResult.value?.row) {
        this.mapKpiAggregateData(kpiResult.value);
      } else if (bootResult.status === 'fulfilled' && bootResult.value?.kpis?.row) {
        this.mapKpiAggregateData(bootResult.value.kpis);
      }

      // ── Process dimResult (getKpiDimensions) ──
      if (dimResult.status === 'fulfilled' && dimResult.value) {
        this.mapDimensionsData(dimResult.value);
        this.indexFilterIds(dimResult.value);
        contractorsFromDim = !!(dimResult.value.contractors && dimResult.value.contractors.length > 0);
      }

      // ── Process pacResult (getPacStatus) ──
      if (pacResult.status === 'fulfilled' && pacResult.value) {
        this.mapPacData(pacResult.value);
      }

      // ── Process progressResult (getProgressSummary) ──
      if (progressResult.status === 'fulfilled' && progressResult.value) {
        this.mapProgressData(progressResult.value, contractorsFromDim);
      }

      // ── Process trendResult (getTimelineTrend) → fallback Daily Progress bars ──
      if (trendResult.status === 'fulfilled' && trendResult.value) {
        this.mapTimelineTrendData(trendResult.value);
      }

      // ── Real Daily Progress from phase-wise-progress-history (overrides bars) ──
      this.loadDailyProgress();
      // Real cumulative progress for the Progress Report (Overall) chart.
      this.loadAnalyticsHistory();

      // ── Build Link Execution Status from dimensions (delayed projects) ──
      if (dimResult.status === 'fulfilled' && dimResult.value) {
        this.mapLinkExecutionData(dimResult.value);
        this.mapRingContractorMatrix(dimResult.value);
        this.mapContractorGauges(dimResult.value);
      }

      // ── Contractor Comparison: always show ALL contractors, regardless of
      // the contractor filter (keeps ring/link scope). Fetched separately so a
      // contractor filter doesn't collapse the chart to a single bar.
      getKpiDimensions({
        ringId: filters['ringId'],
        ringIds: filters['ringIds'],
        linkIds: filters['linkIds'],
      })
        .then((allDim) => {
          if (allDim) {
            this.mapContractorCompareData(allDim);
            setTimeout(() => this.drawContractorCompareChart(), 50);
          }
        })
        .catch(() => {});

      // ── Build dynamic Alerts from live data ──
      this.buildDynamicAlerts(
        dimResult.status === 'fulfilled' ? dimResult.value : null,
        pacResult.status === 'fulfilled' ? pacResult.value : null,
      );

      // ── Populate filter options from filters API ──
      // Only set master options on first load (when they're empty) to avoid
      // overwriting the full list with already-filtered API results.
      const isFirstLoad = this.masterContractorOptions.length === 0;

      if (filtersResult.status === 'fulfilled' && filtersResult.value) {
        const f = filtersResult.value;
        // Supplement name → id maps (server strips the 'R' prefix on ring ids).
        for (const r of f.rings || []) {
          // Strip the display prefix: ids arrive as "R5" but every consumer
          // wants 5 — financial-summary's ringId is a `long` and 500s on "R5".
          if (r?.name && r?.id != null) {
            this.ringNameToId.set(r.name.trim().toLowerCase(), String(r.id).replace(/^R/i, ''));
          }
        }
        for (const l of f.links || []) {
          const key = l?.name?.trim().toLowerCase();
          if (key && l?.id != null && !this.linkNameToId.has(key)) this.linkNameToId.set(key, String(l.id));
          if (key && l?.ringId != null && !this.linkNameToRingId.has(key)) {
            this.linkNameToRingId.set(key, String(l.ringId).replace(/^R/i, ''));
          }
        }
        if (f.links?.length) {
          const linkNames = f.links.map((l: any) => l.name).filter((n: string) => n && n.trim());
          if (isFirstLoad) {
            this.projectOptions = linkNames;
            this.masterProjectOptions = [...linkNames];
          }
        }
        if (f.steps?.length) {
          const stepNames = f.steps.map((s: any) => s.name).filter((n: string) => n && n.trim());
          if (isFirstLoad) {
            this.phaseOptions = stepNames;
            this.masterPhaseOptions = [...stepNames];
          }
        }
      }

      // ── Store raw relationship data for cascading filters (only on first load) ──
      if (isFirstLoad) {
        // Primary source: KPI dimensions projects (has linkName, ringName, contractorName)
        if (dimResult.status === 'fulfilled' && dimResult.value?.projects?.length) {
          this.rawProjectLinks = dimResult.value.projects.map((p: KpiDimensionProject) => ({
            linkName: p.linkName,
            ringName: p.ringName,
            contractorName: p.contractorName,
          }));
        }
        // Supplement: also use filters API links which may have ring/contractor info
        if (filtersResult.status === 'fulfilled' && filtersResult.value?.links?.length) {
          const existingLinks = new Set(this.rawProjectLinks.map(r => r.linkName));
          for (const l of filtersResult.value.links) {
            if (l.name && !existingLinks.has(l.name)) {
              // Try to find ring name from ringRows using ringId
              const ringRow = l.ringId ? this.ringRows.find(r => r.name.includes(l.ringId!) || l.ringId === r.name) : null;
              this.rawProjectLinks.push({
                linkName: l.name,
                ringName: ringRow?.name || l.ringId || '',
                contractorName: l.contractor || '',
              });
            }
          }
        }
      }
      if (isFirstLoad && progressResult.status === 'fulfilled' && progressResult.value?.phaseBreakdown?.length) {
        this.rawPhaseContractors = progressResult.value.phaseBreakdown.map((pb: any) => ({
          phaseLabel: pb.phaseId ? `Phase ${pb.phaseId}` : 'Phase',
          contractor: pb.contractor,
        }));
      }

      // ── Populate contractor options dynamically ──
      if (isFirstLoad) {
        await this.loadContractorOptions();
        this.masterContractorOptions = [...this.contractorOptions];
      }

      // ── Populate region options from rings data ──
      if (isFirstLoad && this.ringRows.length > 0) {
        const dynamicRegions = this.ringRows.map((r) => r.name);
        if (dynamicRegions.length > 0) {
          this.regionOptions = dynamicRegions;
          this.masterRegionOptions = [...this.regionOptions];
        }
      }

      // Update master project/phase options from link/phase data if not yet set
      if (this.masterProjectOptions.length === 0 && this.projectOptions.length > 0) {
        this.masterProjectOptions = [...this.projectOptions];
      }
      if (this.masterPhaseOptions.length === 0 && this.phaseOptions.length > 0) {
        this.masterPhaseOptions = [...this.phaseOptions];
      }

      if (trendResult.status === 'fulfilled' && trendResult.value) {
        this.mapTimelineTrendChart(trendResult.value);
      }
      if (progressResult.status === 'fulfilled' && progressResult.value) {
        this.mapPhaseStackedData(progressResult.value);
      }
      if (pacResult.status === 'fulfilled' && pacResult.value) {
        this.mapPacTimeline(pacResult.value);
      }

      // Update status bar with live data
      this.updateStatusBar();

      this.dataTimestamp = `Data as of: ${new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })}, ${new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;

      // ── Show fast data immediately ──
      this.isLoading = false;
      setTimeout(() => this.redrawAllCharts(), 300);

      // ── SLOW BATCH: external API calls (run in background, don't block UI) ──
      Promise.allSettled([
        getPlannedVsActual({ granularity: this.pvaGranularity as 'weekly' | 'monthly', contractorIds: filters['contractorIds'], ringIds: filters['ringIds'], linkIds: filters['linkIds'] }),
        getPhaseKpiSummary({ contractorIds: filters['contractorIds'] }),
      ]).then(([pvaResult, phaseKpiResult]) => {
        if (pvaResult.status === 'fulfilled' && pvaResult.value) {
          this.mapPlannedVsActualData(pvaResult.value);
          setTimeout(() => this.drawLineChart(), 100);
        }
        if (phaseKpiResult.status === 'fulfilled' && phaseKpiResult.value) {
          this.mapPhaseKpiData(phaseKpiResult.value as PhaseKpiSummaryResponse);
        }
        this.updateStatusBar();
        setTimeout(() => this.redrawAllCharts(), 100);
      });

    } catch (err) {
      console.warn('Executive Dashboard: API unavailable.', err);
      this.isLoading = false;
    }
  }

  // ── Load contractor options from API ──────────────────────────────────────

  private async loadContractorOptions(): Promise<void> {
    // 1. Try contractor context API
    try {
      const ctxResult: ContractorContextResponse = await getContractorContext();
      if (ctxResult?.contractors && ctxResult.contractors.length > 0) {
        this.contractorOptions = ctxResult.contractors.filter(c => c && c.trim());
        this.applySingleContractorDefault();
        return;
      }
    } catch {
      // Fall through
    }

    // 2. Try dashboard filters API
    try {
      const filtersResult: DashboardFiltersResponse = await getDashboardFilters({
        phaseId: this.selectedPhase !== 'All Phases' ? this.selectedPhase : undefined,
      });
      if (filtersResult?.contractors && filtersResult.contractors.length > 0) {
        this.contractorOptions = filtersResult.contractors.map((c) => c.name).filter(n => n && n.trim());
        this.applySingleContractorDefault();
        return;
      }
    } catch {
      // Fall through
    }

    // 3. Fallback: populate from contractors table data (already loaded from dimensions)
    if (this.contractors.length > 0) {
      const names = this.contractors.map(c => c.name).filter(n => n && n.trim());
      if (names.length > 0) {
        this.contractorOptions = names;
      }
    }
  }

  // ── Map KPI Aggregate data ────────────────────────────────────────────────

  private mapKpiAggregateData(data: KpiAggregateResponse): void {
    if (!data.row) return;
    const row = data.row;
    const totalPlanned = row.total_planned_km || 0;
    const completed = row.completed_km || 0;
    const inProgress = row.in_progress_km || 0;
    const pending = row.pending_km || 0;

    if (totalPlanned <= 0) return;

    // Remember the unfiltered grand-total planned length as the scaling baseline
    // for the phase (Trenching/Ducting/Backfilling) cards.
    if ((row as any).data_grain === 'grand_total') this.grandPlannedKm = totalPlanned;

    const completionPct = +((completed / totalPlanned) * 100).toFixed(1);

    // kpiCards[0] - Planned Length
    this.kpiCards[0].value = totalPlanned.toLocaleString();
    this.kpiCards[0].percentage = 100;
    this.kpiCards[0].percentLabel = '100%';

    // kpiCards[1] - Approved Length
    this.kpiCards[1].value = completed.toLocaleString();
    this.kpiCards[1].percentage = completionPct;
    this.kpiCards[1].percentLabel = `${completionPct}%`;

    // kpiCards[2] - Overall Completion
    this.kpiCards[2].value = completionPct.toString();
    this.kpiCards[2].percentage = completionPct;
    this.kpiCards[2].percentLabel = `${completionPct}%`;

    // Re-derive the phase cards for the newly-filtered planned length.
    this.applyPhaseKpiScaling();
  }

  /** Parse a KPI card value ("3,548.262") back to a number. */
  private parseKm(value: string): number {
    const n = parseFloat((value || '').replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  /**
   * Populate the Trenching/Ducting/Backfilling cards with the completed km
   * returned by the phase-kpi-summary API (already scoped to the selected
   * contractor). We show the API value as-is — no planned-ratio scaling — so
   * the card reflects the real completedKm. No-op until the reference exists.
   */
  private applyPhaseKpiScaling(): void {
    const ref = this.phaseKpiRef;
    if (!ref || this.kpiCards.length < 6) return;
    const fmt = (n: number) => (+n.toFixed(2)).toLocaleString();
    const setCard = (i: number, km: number, pct: number) => {
      this.kpiCards[i].value = fmt(km);
      this.kpiCards[i].percentage = pct;
      this.kpiCards[i].percentLabel = `${pct}%`;
    };
    setCard(3, ref.trench, ref.trenchPct);
    setCard(4, ref.duct, ref.ductPct);
    setCard(5, ref.backfill, ref.backfillPct);
  }

  // ── Build ring/link name → id maps from dimensions data ───────────────────
  private indexFilterIds(data: KpiDimensionsResponse): void {
    for (const r of data.rings || []) {
      if (r?.name && r?.id != null) this.ringNameToId.set(r.name.trim().toLowerCase(), String(r.id));
    }
    for (const p of data.projects || []) {
      const key = p?.linkName?.trim().toLowerCase();
      if (key && p?.projectId != null) {
        this.linkNameToId.set(key, String(p.projectId));
        if (p.ringId != null) this.linkNameToRingId.set(key, String(p.ringId).replace(/^R/i, ''));
      }
    }
  }

  // ── Map KPI Dimensions data ───────────────────────────────────────────────

  private mapDimensionsData(data: KpiDimensionsResponse): void {
    // ── Rings ──
    if (data.rings && data.rings.length > 0) {
      this.ringRows = data.rings.map((r) => {
        const planned = Math.round(r.totalKm);
        const deployed = Math.round(r.completedKm);
        return {
          name: r.name,
          planned,
          deployed,
          // Remaining planned work; clamp to 0 when a ring has over-delivered.
          balance: Math.max(0, planned - deployed),
          completion: Math.round(
            r.completedPct || (r.totalKm > 0 ? (r.completedKm / r.totalKm) * 100 : 0)
          ),
        };
      });
      const totalPlanned = this.ringRows.reduce((s, r) => s + r.planned, 0);
      const totalDeployed = this.ringRows.reduce((s, r) => s + r.deployed, 0);
      const totalBalance = this.ringRows.reduce((s, r) => s + r.balance, 0);
      this.ringTotal = {
        planned: totalPlanned,
        deployed: totalDeployed,
        balance: totalBalance,
        completion:
          totalPlanned > 0 ? Math.round((totalDeployed / totalPlanned) * 100) : 0,
      };
    }

    // ── Top Links (projects sorted by completedPct desc, top 5) ──
    if (data.projects && data.projects.length > 0) {
      const sorted = [...data.projects].sort(
        (a, b) => (b.completedPct || 0) - (a.completedPct || 0)
      );
      this.allLinks = sorted.map((p) => ({
        id: p.linkName || p.projectId,
        ring: p.ringName,
        planned: Math.round(p.totalKm * 10) / 10,
        deployed: Math.round(p.completedKm * 10) / 10,
        completion: Math.round(p.completedPct),
      }));
      this.topLinks = this.allLinks.slice(0, 5);
    }

    // ── Contractors ──
    if (data.contractors && data.contractors.length > 0) {
      this.contractors = data.contractors.map((c) => ({
        name: c.name,
        planned: Math.round(c.totalKm),
        deployed: Math.round(c.completedKm),
        completion: Math.round(c.completedPct),
        trend: 'up' as const,
      }));
      const totalPlanned = this.contractors.reduce((s, c) => s + c.planned, 0);
      const totalDeployed = this.contractors.reduce((s, c) => s + c.deployed, 0);
      this.contractorTotal = {
        planned: totalPlanned,
        deployed: totalDeployed,
        completion:
          totalPlanned > 0
            ? +((totalDeployed / totalPlanned) * 100).toFixed(1)
            : 0,
      };
    }

    // ── Delayed count for link exec ──
    if (data.delayedCount != null) {
      this.linkExecCount = data.delayedCount;
    }
  }

  // ── Map Planned vs Actual data ────────────────────────────────────────────

  private mapPlannedVsActualData(data: PlannedVsActualResponse): void {
    if (!data.buckets || data.buckets.length === 0) return;
    this.plannedData = data.buckets.map((b) => b.plannedKm);
    this.actualData = data.buckets.map((b) => b.actualKm);
  }

  // ── Map PAC Status data ───────────────────────────────────────────────────

  private mapPacData(data: PacStatusResponse): void {
    const s = data.summary;
    const total = s.totalSubmitted || s.approved + s.pending + s.rejected;
    if (total <= 0) return;

    this.pacTotal = total;
    this.pacItems = [
      {
        label: 'Approved',
        count: s.approved,
        percentage: Math.round((s.approved / total) * 100),
        color: '#22c55e',
      },
      {
        label: 'Pending',
        count: s.pending,
        percentage: Math.round((s.pending / total) * 100),
        color: '#f59e0b',
      },
      {
        label: 'Rejected',
        count: s.rejected,
        percentage: Math.round((s.rejected / total) * 100),
        color: '#ef4444',
      },
    ];
  }

  // ── Map Progress Summary data ─────────────────────────────────────────────

  private mapProgressData(data: ProgressSummaryResponse, contractorsAlreadySet: boolean): void {
    this.buildWorkProgressSlices(data);

    // ── Phase breakdown ──
    if (data.phaseBreakdown && data.phaseBreakdown.length > 0) {
      const phaseMap = new Map<string, { planned: number; deployed: number }>();
      data.phaseBreakdown.forEach((pb) => {
        const key = pb.phaseId ? `Phase ${pb.phaseId}` : `Phase`;
        const existing = phaseMap.get(key) || { planned: 0, deployed: 0 };
        existing.planned += pb.totalKm;
        existing.deployed += pb.completedKm;
        phaseMap.set(key, existing);
      });
      this.phaseRows = Array.from(phaseMap.entries()).map(([phase, vals]) => ({
        phase,
        planned: Math.round(vals.planned),
        deployed: Math.round(vals.deployed),
        completion:
          vals.planned > 0
            ? Math.round((vals.deployed / vals.planned) * 100)
            : 0,
      }));
      const totalPlanned = this.phaseRows.reduce((s, r) => s + r.planned, 0);
      const totalDeployed = this.phaseRows.reduce((s, r) => s + r.deployed, 0);
      this.phaseTotal = {
        planned: totalPlanned,
        deployed: totalDeployed,
        completion:
          totalPlanned > 0
            ? Math.round((totalDeployed / totalPlanned) * 100)
            : 0,
      };

      // Update KPI cards 3-5 (Trenching/Ducting/Backfilling) from phase breakdown
      this.updatePhaseKpiCards(data);
    }

    // ── Contractors (use if dimResult didn't populate them) ──
    if (!contractorsAlreadySet && data.contractors && data.contractors.length > 0) {
      this.contractors = data.contractors.map((c) => ({
        name: c.contractor,
        planned: Math.round(c.totalPlannedKm),
        deployed: Math.round(c.completedKm),
        completion: Math.round(c.completionPercent),
        trend: 'up' as const,
      }));
      const gt = data.grandTotal;
      this.contractorTotal = {
        planned: Math.round(gt.totalPlannedKm),
        deployed: Math.round(gt.completedKm),
        completion: Math.round(gt.completionPercent),
      };
    }

    // ── Grand total for status bar ──
    if (data.grandTotal) {
      const gt = data.grandTotal;
      if (gt.totalPlannedKm > 0 && this.kpiCards.length >= 3) {
        const completionPct = Math.round(gt.completionPercent);
        // Update KPI cards if not already set by kpiAggregate
        if (this.kpiCards[0].value === '3,256') {
          this.kpiCards[0].value = Math.round(gt.totalPlannedKm).toLocaleString();
          this.kpiCards[1].value = Math.round(gt.completedKm).toLocaleString();
          this.kpiCards[1].percentage = completionPct;
          this.kpiCards[1].percentLabel = `${completionPct}%`;
          this.kpiCards[2].value = completionPct.toString();
          this.kpiCards[2].percentage = completionPct;
        }
      }
    }
  }

  // ── Update Trenching/Ducting/Backfilling KPI cards from phase breakdown ──

  private updatePhaseKpiCards(data: ProgressSummaryResponse): void {
    if (!data.phaseBreakdown || data.phaseBreakdown.length === 0) return;
    // Once the phase reference is captured, applyPhaseKpiScaling() owns the
    // Trenching/Ducting/Backfilling cards so they stay in sync with the filter.
    if (this.phaseKpiRef) return;

    // Group by phaseId: 2=Trenching, 4=Ducting, 7/8/9=Backfilling layers
    const BACKFILL_PHASE_IDS = new Set(['7', '8', '9']);
    const phaseAgg = new Map<string, { totalKm: number; completedKm: number }>();
    data.phaseBreakdown.forEach((pb) => {
      // Merge all backfilling phases (7, 8, 9) under a single 'backfill' key
      const key = BACKFILL_PHASE_IDS.has(pb.phaseId) ? 'backfill' : pb.phaseId;
      const existing = phaseAgg.get(key) || { totalKm: 0, completedKm: 0 };
      existing.totalKm += pb.totalKm;
      existing.completedKm += pb.completedKm;
      phaseAgg.set(key, existing);
    });

    // Phase 2 = Trenching (kpiCards[3])
    const trenching = phaseAgg.get('2');
    if (trenching && this.kpiCards.length > 3) {
      const pct = trenching.totalKm > 0
        ? +((trenching.completedKm / trenching.totalKm) * 100).toFixed(1)
        : 0;
      this.kpiCards[3].value = (+trenching.completedKm.toFixed(2)).toLocaleString();
      this.kpiCards[3].percentage = pct;
      this.kpiCards[3].percentLabel = `${pct}%`;
    }

    // Phase 4 = Ducting (kpiCards[4])
    const ducting = phaseAgg.get('4');
    if (ducting && this.kpiCards.length > 4) {
      const pct = ducting.totalKm > 0
        ? +((ducting.completedKm / ducting.totalKm) * 100).toFixed(1)
        : 0;
      this.kpiCards[4].value = (+ducting.completedKm.toFixed(2)).toLocaleString();
      this.kpiCards[4].percentage = pct;
      this.kpiCards[4].percentLabel = `${pct}%`;
    }

    // Backfilling = sum of phases 7+8+9 (kpiCards[5])
    const backfilling = phaseAgg.get('backfill');
    if (backfilling && this.kpiCards.length > 5) {
      const pct = backfilling.totalKm > 0
        ? +((backfilling.completedKm / backfilling.totalKm) * 100).toFixed(1)
        : 0;
      this.kpiCards[5].value = (+backfilling.completedKm.toFixed(2)).toLocaleString();
      this.kpiCards[5].percentage = pct;
      this.kpiCards[5].percentLabel = `${pct}%`;
    }
  }

  // ── Map Phase KPI Summary (external API: Trenching/Ducting/Backfilling) ──

  private mapPhaseKpiData(data: PhaseKpiSummaryResponse): void {
    if (!data.phases || data.phases.length === 0) return;

    // Capture the network-wide phase reference (completed km + completion %),
    // then let applyPhaseKpiScaling() derive the ring/link-filtered values.
    const pctOf = (completedKm: number, plannedKm: number, fallback = 0) =>
      plannedKm > 0 ? +((completedKm / plannedKm) * 100).toFixed(1) : fallback;

    const kpi = data.kpiSummary as any;
    if (kpi && kpi.trenching && kpi.ducting && kpi.backfilling) {
      const t = kpi.trenching, d = kpi.ducting, b = kpi.backfilling;
      this.phaseKpiRef = {
        trench: t.completedKm || 0,
        duct: d.completedKm || 0,
        backfill: b.completedKm || 0,
        trenchPct: pctOf(t.completedKm, t.totalPlannedKm, t.completionPercent || 0),
        ductPct: pctOf(d.completedKm, d.totalPlannedKm, d.completionPercent || 0),
        backfillPct: pctOf(b.completedKm, b.totalPlannedKm, b.completionPercent || 0),
      };
    } else {
      // Fallback: legacy phaseName matching
      const trench = data.phases.find((p) => p.phaseName === 'Trenching');
      const duct = data.phases.find((p) => p.phaseName === 'Ducting');
      const backfillPhases = data.phases.filter((p) =>
        p.phaseName.toLowerCase().includes('backfilling')
      );
      const backfillPlanned = backfillPhases.reduce((s, p) => s + p.totalPlannedKm, 0);
      const backfillCompleted = backfillPhases.reduce((s, p) => s + p.completedKm, 0);
      if (trench || duct || backfillPhases.length) {
        this.phaseKpiRef = {
          trench: trench?.completedKm || 0,
          duct: duct?.completedKm || 0,
          backfill: backfillCompleted,
          trenchPct: pctOf(trench?.completedKm || 0, trench?.totalPlannedKm || 0),
          ductPct: pctOf(duct?.completedKm || 0, duct?.totalPlannedKm || 0),
          backfillPct: pctOf(backfillCompleted, backfillPlanned),
        };
      }
    }
    this.applyPhaseKpiScaling();

    // Update Phase Progress table
    this.phaseRows = data.phases.map((p) => ({
      phase: p.phaseName,
      planned: +p.totalPlannedKm.toFixed(2),
      deployed: +p.completedKm.toFixed(2),
      completion: p.totalPlannedKm > 0
        ? +((p.completedKm / p.totalPlannedKm) * 100).toFixed(1)
        : 0,
    }));
    const totalPlanned = this.phaseRows.reduce((s, r) => s + r.planned, 0);
    const totalDeployed = this.phaseRows.reduce((s, r) => s + r.deployed, 0);
    this.phaseTotal = {
      planned: +totalPlanned.toFixed(2),
      deployed: +totalDeployed.toFixed(2),
      completion: totalPlanned > 0 ? +((totalDeployed / totalPlanned) * 100).toFixed(1) : 0,
    };

    // Update phase options and raw phase-contractor relationships from detailed data
    // Only update master lists if they haven't been set yet (first load)
    const phaseNames = data.phases.map(p => p.phaseName).filter(n => n && n.trim());
    if (phaseNames.length > 0 && this.masterPhaseOptions.length === 0) {
      this.masterPhaseOptions = phaseNames;
      this.phaseOptions = [...this.masterPhaseOptions];
      this.syncSelectionLabel('phase');
    }
    // Rebuild rawPhaseContractors with actual phase names (only on first load)
    if (this.rawPhaseContractors.length === 0) {
      const newPhaseContractors: { phaseLabel: string; contractor: string }[] = [];
      for (const phase of data.phases) {
        if (phase.contractors) {
          for (const c of phase.contractors) {
            newPhaseContractors.push({ phaseLabel: phase.phaseName, contractor: (c as any).contractorName || (c as any).name || '' });
          }
        }
      }
      if (newPhaseContractors.length > 0) {
        this.rawPhaseContractors = newPhaseContractors;
      }
    }

    // Update Phase-wise Segment Breakdown stacked chart
    this.phaseStackedLabels = data.phases.map((p) => p.phaseName);
    this.phaseStackedCompleted = [];
    this.phaseStackedInProgress = [];
    this.phaseStackedPending = [];
    this.phaseStackedBlocked = [];

    for (const phase of data.phases) {
      let completed = 0, inProgress = 0, pending = 0;
      for (const c of phase.contractors) {
        completed += Math.round(c.completedKm);
        inProgress += Math.round(c.inProgressKm);
        pending += Math.round(c.pendingKm);
      }
      this.phaseStackedCompleted.push(completed);
      this.phaseStackedInProgress.push(inProgress);
      this.phaseStackedPending.push(pending);
      this.phaseStackedBlocked.push(0);
    }

    // Update daily progress values from phases data
    const trenchPhase = data.phases.find((p) => p.phaseName === 'Trenching');
    const ductPhase = data.phases.find((p) => p.phaseName === 'Ducting');
    const kpiS = data.kpiSummary as any;
    this.dailyTrenching = Math.round(kpiS?.trenching?.completedKm ?? trenchPhase?.completedKm ?? 0);
    this.dailyDucting = Math.round(kpiS?.ducting?.completedKm ?? ductPhase?.completedKm ?? 0);
    this.dailyBackfilling = Math.round(kpiS?.backfilling?.completedKm ?? data.phases
      .filter((p) => p.phaseName.toLowerCase().includes('backfilling'))
      .reduce((s: number, p) => s + p.completedKm, 0));
    this.dailyTotal = this.dailyTrenching + this.dailyDucting + this.dailyBackfilling;
  }

  // ── Map Timeline Trend → Daily Progress bars ──────────────────────────────

  private mapTimelineTrendData(data: TimelineTrendResponse): void {
    if (!data.dataPoints || data.dataPoints.length === 0) return;

    // Take last 7 data points for the daily progress chart
    const points = data.dataPoints.slice(-7);

    // Use actual phase ratios from KPI data if available, otherwise use equal split
    const kpiTrench = parseFloat(this.kpiCards[3]?.value?.replace(/,/g, '') || '0') || 0;
    const kpiDuct = parseFloat(this.kpiCards[4]?.value?.replace(/,/g, '') || '0') || 0;
    const kpiBackfill = parseFloat(this.kpiCards[5]?.value?.replace(/,/g, '') || '0') || 0;
    const kpiTotal = kpiTrench + kpiDuct + kpiBackfill;
    const trenchRatio = kpiTotal > 0 ? kpiTrench / kpiTotal : 0.34;
    const ductRatio = kpiTotal > 0 ? kpiDuct / kpiTotal : 0.33;
    const backfillRatio = kpiTotal > 0 ? kpiBackfill / kpiTotal : 0.33;

    this.dailyBars = points.map((p) => {
      const dateStr = p.date;
      // Parse date for display label
      const d = new Date(dateStr);
      const label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      const totalKm = p.completedKm || 0;
      // Split total using actual phase ratios from KPI data
      const trenching = Math.round(totalKm * trenchRatio);
      const ducting = Math.round(totalKm * ductRatio);
      const backfilling = Math.round(totalKm * backfillRatio);
      return {
        day: label,
        iso: dateStr,
        trenching,
        ducting,
        backfilling,
        totalKm: trenching + ducting + backfilling,
        byPhase: { '2': trenching, '4': ducting, '9': backfilling },
      };
    });

    // NOTE: the Daily Progress date window defaults to the last 7 days and is
    // owned by ensureDailyDateDefaults() in loadDailyProgress() — not set here.

    // Update daily summary stats
    if (this.dailyBars.length > 0) {
      const lastDay = this.dailyBars[this.dailyBars.length - 1];
      this.dailyTrenching = lastDay.trenching;
      this.dailyDucting = lastDay.ducting;
      this.dailyBackfilling = lastDay.backfilling;
      this.dailyTotal = lastDay.trenching + lastDay.ducting + lastDay.backfilling;

      if (this.dailyBars.length >= 2) {
        const prevDay = this.dailyBars[this.dailyBars.length - 2];
        const prevTotal = prevDay.trenching + prevDay.ducting + prevDay.backfilling;
        this.dailyVsYesterday = prevTotal > 0
          ? Math.round(((this.dailyTotal - prevTotal) / prevTotal) * 100)
          : 0;
      }
    }
  }

  // ── Real Daily Progress from the phase-wise-progress-history endpoint ──────

  /** Default the Daily Progress window to the last 7 days ending today. */
  private ensureDailyDateDefaults(): void {
    if (!this.dailyToDate) this.dailyToDate = this.today;
    if (!this.dailyFromDate) {
      const to = new Date(`${this.dailyToDate}T00:00:00`);
      to.setDate(to.getDate() - 6); // 7 days inclusive
      this.dailyFromDate = to.toISOString().slice(0, 10);
    }
  }

  /**
   * Fetch real day-by-day work-done from the Node aggregation endpoint (all
   * contractors + all phases, honouring the contractor filter and date window)
   * and populate the Daily Progress chart. Falls back to the synthetic
   * timeline-trend bars if the API returns nothing.
   */
  async loadDailyProgress(): Promise<void> {
    this.ensureDailyDateDefaults();
    this.dailyLoading = true;
    try {
      await this.ensurePhaseOptions();

      const filters = this.buildFilterParams();
      const res: PhaseHistoryResponse = await getPhaseWiseProgressHistory({
        contractor: filters['contractor'],
        contractorIds: filters['contractorIds'],
        fromDate: this.dailyFromDate,
        toDate: this.dailyToDate,
        // Always fetch all phases so the phase dropdown can filter client-side.
      });

      if (res && Array.isArray(res.records) && res.records.length > 0) {
        this.dailyBars = res.records.map((r) => {
          const d = new Date(`${r.date}T00:00:00`);
          const label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
          const byPhase = r.byPhase || {};
          return {
            day: label,
            iso: r.date,
            trenching: byPhase['2'] || 0,
            ducting: byPhase['4'] || 0,
            backfilling: byPhase['9'] || 0,
            totalKm: r.totalWorkDoneKm || 0,
            byPhase,
          };
        });
        this.updateDailySummary();
      }
    } catch {
      // keep whatever fallback bars mapTimelineTrendData produced
    } finally {
      this.dailyLoading = false;
      setTimeout(() => this.drawDailyPhaseChart(), 30);
    }
  }

  /** Recompute the summary tiles (last day + vs-yesterday) from dailyBars. */
  private updateDailySummary(): void {
    if (this.dailyBars.length === 0) return;
    const lastDay = this.dailyBars[this.dailyBars.length - 1];
    this.dailyTrenching = Math.round(lastDay.trenching);
    this.dailyDucting = Math.round(lastDay.ducting);
    this.dailyBackfilling = Math.round(lastDay.backfilling);
    this.dailyTotal = Math.round(lastDay.totalKm);

    if (this.dailyBars.length >= 2) {
      const prevDay = this.dailyBars[this.dailyBars.length - 2];
      const prevTotal = prevDay.totalKm;
      this.dailyVsYesterday = prevTotal > 0
        ? Math.round(((lastDay.totalKm - prevTotal) / prevTotal) * 100)
        : 0;
    }
  }

  /** Human label for the currently selected daily phase filter. */
  get dailyPhaseLabel(): string {
    if (this.dailyPhaseFilter === 'all') return 'All Phases';
    const found = this.dailyPhaseOptions.find((p) => p.phaseId === this.dailyPhaseFilter);
    return found ? found.phaseName : `Phase ${this.dailyPhaseFilter}`;
  }

  // ── Map Link Execution Status from KPI Dimensions (delayed projects) ─────

  private mapLinkExecutionData(data: KpiDimensionsResponse): void {
    if (!data.projects || data.projects.length === 0) return;

    // Filter for delayed projects, sort by lowest completion
    const delayed = data.projects
      .filter((p: KpiDimensionProject) => p.status === 'delayed' || p.completedPct < 40)
      .sort((a: KpiDimensionProject, b: KpiDimensionProject) => a.completedPct - b.completedPct)
      .slice(0, 8);

    if (delayed.length > 0) {
      this.linkExecRows = delayed.map((p: KpiDimensionProject) => ({
        linkName: p.linkName || p.projectId,
        ring: p.ringName,
        completion: Math.round(p.completedPct),
        status: p.status === 'delayed' ? 'Delayed' : (p.completedPct < 20 ? 'Delayed' : 'At Risk'),
        delayDays: 0,
      }));
      this.linkExecCount = data.projects.length;
    }

    // Also update delayed count
    if (data.delayedCount > 0) {
      this.linkExecCount = data.delayedCount > this.linkExecCount
        ? data.delayedCount
        : this.linkExecCount;
    }
  }

  // ── Build dynamic Alerts from live data ──────────────────────────────────

  private buildDynamicAlerts(
    dimData: KpiDimensionsResponse | null | undefined,
    pacData: PacStatusResponse | null | undefined,
  ): void {
    const newAlerts: AlertItem[] = [];

    // Alerts from delayed/at-risk projects
    if (dimData?.projects) {
      const delayed = dimData.projects
        .filter((p: KpiDimensionProject) => p.status === 'delayed')
        .slice(0, 3);

      delayed.forEach((p: KpiDimensionProject) => {
        newAlerts.push({
          type: 'danger',
          title: `Work delay in ${p.linkName || p.projectId}`,
          subtitle: `${p.ringName} – only ${Math.round(p.completedPct)}% completed (${Math.round(p.completedKm)} of ${Math.round(p.totalKm)} km)`,
          time: 'Live',
        });
      });

      // At-risk projects
      const atRisk = dimData.projects
        .filter((p: KpiDimensionProject) => p.status === 'at-risk')
        .slice(0, 2);

      atRisk.forEach((p: KpiDimensionProject) => {
        newAlerts.push({
          type: 'warning',
          title: `At risk: ${p.linkName || p.projectId}`,
          subtitle: `${p.ringName} – ${Math.round(p.completedPct)}% completed by ${p.contractorName}`,
          time: 'Live',
        });
      });
    }

    // Alerts from rings with low completion
    if (dimData?.rings) {
      const lowRings = dimData.rings
        .filter((r) => r.completedPct < 10 && r.totalKm > 50)
        .slice(0, 2);

      lowRings.forEach((r) => {
        newAlerts.push({
          type: 'warning',
          title: `Low progress: ${r.name}`,
          subtitle: `Only ${Math.round(r.completedPct)}% deployed (${Math.round(r.completedKm)} of ${Math.round(r.totalKm)} km)`,
          time: 'Live',
        });
      });
    }

    // Alerts from PAC status
    if (pacData?.summary) {
      const s = pacData.summary;
      if (s.rejected > 0) {
        newAlerts.push({
          type: 'danger',
          title: `${s.rejected} PAC certificates rejected`,
          subtitle: `${s.approved} approved, ${s.pending} pending out of ${s.totalSubmitted} total`,
          time: 'Live',
        });
      }
      if (s.pending > 3) {
        newAlerts.push({
          type: 'info',
          title: `${s.pending} PAC certificates pending review`,
          subtitle: `Provisional Acceptance Certificates awaiting approval`,
          time: 'Live',
        });
      }
    }

    // Only replace if we generated any dynamic alerts
    if (newAlerts.length > 0) {
      this.alerts = newAlerts;
    }
  }

  // ── Update status bar from live data ──────────────────────────────────────

  private updateStatusBar(): void {
    if (this.kpiCards.length < 6) return;

    const planned = this.kpiCards[0].value;
    const deployed = this.kpiCards[1].value;
    const plannedNum = parseFloat(planned.replace(/,/g, '')) || 0;
    const deployedNum = parseFloat(deployed.replace(/,/g, '')) || 0;
    const remaining = Math.round(plannedNum - deployedNum);

    this.statusBarItems[0].value = `${planned} km`;
    this.statusBarItems[1].value = `${deployed} km`;
    this.statusBarItems[2].value = `${remaining.toLocaleString()} km`;

    if (this.ringRows.length > 0) {
      this.statusBarItems[3].value = `${this.ringRows.length}/${this.ringRows.length}`;
      this.statusBarItems[3].badge = 'Active';
      this.statusBarItems[3].badgeColor = '#22c55e';
    }
    if (this.topLinks.length > 0 || this.linkExecCount > 0) {
      const linkCount = this.topLinks.length > 0 ? this.topLinks.length : this.linkExecCount;
      this.statusBarItems[4].value = `${linkCount}/${linkCount}`;
      this.statusBarItems[4].badge = 'Active';
      this.statusBarItems[4].badgeColor = '#22c55e';
    }

    // Trenching / Ducting / Backfilling with colors
    this.statusBarItems[5].value = `${this.kpiCards[3].value} km`;
    this.statusBarItems[5].badge = this.kpiCards[3].percentLabel;
    this.statusBarItems[5].badgeColor = '#f59e0b';
    this.statusBarItems[6].value = `${this.kpiCards[4].value} km`;
    this.statusBarItems[6].badge = this.kpiCards[4].percentLabel;
    this.statusBarItems[6].badgeColor = '#f59e0b';
    this.statusBarItems[7].value = `${this.kpiCards[5].value} km`;
    this.statusBarItems[7].badge = this.kpiCards[5].percentLabel;
    this.statusBarItems[7].badgeColor = '#ef4444';
  }

  // ── Mock Data (matches design exactly) ────────────────────────────────────

  private loadMockData(): void {
    // KPI Cards
    this.kpiCards = [
      {
        title: 'Planned Length',
        value: '3,256',
        unit: 'km',
        percentage: 100,
        percentLabel: '100%',
        subtitle: 'Across all projects',
        color: '#3b82f6',
        iconPath: 'M9 3v18m0 0l-4-4m4 4l4-4M15 3v18m0 0l-4-4m4 4l4-4',
      },
      {
        title: 'Approved Length',
        value: '2,468',
        unit: 'km',
        percentage: 75.7,
        percentLabel: '75.7%',
        subtitle: 'vs Planned',
        color: '#22c55e',
        iconPath: 'M5 13l4 4L19 7',
      },
      {
        title: 'Overall Completion',
        value: '75.7',
        unit: '%',
        percentage: 75.7,
        percentLabel: '+4.3% vs Apr',
        subtitle: 'Planned vs Actual',
        color: '#06b6d4',
        iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      },
      {
        title: 'Trenching',
        value: '1,842',
        unit: 'km',
        percentage: 56.6,
        percentLabel: '56.6%',
        subtitle: 'of Planned',
        color: '#f59e0b',
        iconPath: 'M19 14l-7 7m0 0l-7-7m7 7V3',
      },
      {
        title: 'Ducting',
        value: '1,520',
        unit: 'km',
        percentage: 46.7,
        percentLabel: '46.7%',
        subtitle: 'of Planned',
        color: '#8b5cf6',
        iconPath: 'M4 6h16M4 12h16M4 18h16',
      },
      {
        title: 'Backfilling',
        value: '1,238',
        unit: 'km',
        percentage: 38.0,
        percentLabel: '38.0%',
        subtitle: 'of Planned',
        color: '#ef4444',
        iconPath:
          'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      },
    ];

    // Line chart data (Planned vs Actual - May 1-31)
    this.plannedData = [
      0, 120, 240, 370, 500, 640, 780, 920, 1060, 1200, 1340, 1480, 1600,
      1720, 1840, 1960, 2080, 2200, 2320, 2440, 2560, 2680, 2780, 2880, 2960,
      3040, 3100, 3150, 3200, 3230, 3256,
    ];
    this.actualData = [
      0, 80, 170, 280, 390, 500, 600, 710, 820, 930, 1040, 1140, 1230, 1320,
      1400, 1490, 1580, 1670, 1760, 1850, 1940, 2020, 2100, 2170, 2240, 2300,
      2350, 2400, 2430, 2450, 2468,
    ];

    // Ring Progress
    this.ringRows = [
      { name: 'Muscat Ring', planned: 164, deployed: 7, balance: 157, completion: 5 },
      {
        name: 'Main Central Ring',
        planned: 356,
        deployed: 125,
        balance: 231,
        completion: 35,
      },
      { name: 'Northern Ring', planned: 722, deployed: 221, balance: 501, completion: 31 },
      { name: 'Closing Rings', planned: 333, deployed: 12, balance: 321, completion: 4 },
      { name: 'Salalah Main', planned: 684, deployed: 176, balance: 508, completion: 26 },
      { name: 'South Ring', planned: 628, deployed: 198, balance: 430, completion: 32 },
      {
        name: 'Salalah Protection Ring',
        planned: 663,
        deployed: 113,
        balance: 550,
        completion: 17,
      },
    ];
    this.ringTotal = { planned: 3550, deployed: 852, balance: 2698, completion: 24 };

    // Top Links by Progress
    this.topLinks = [
      {
        id: 'R1-LINK-01',
        ring: 'Muscat Ring',
        planned: 24.5,
        deployed: 21.8,
        completion: 89,
      },
      {
        id: 'R3-LINK-07',
        ring: 'South Ring',
        planned: 18.7,
        deployed: 15.2,
        completion: 81,
      },
      {
        id: 'R2-LINK-03',
        ring: 'Northern Ring',
        planned: 16.2,
        deployed: 12.7,
        completion: 78,
      },
      {
        id: 'R5-LINK-02',
        ring: 'Salalah Main',
        planned: 14.5,
        deployed: 10.9,
        completion: 75,
      },
      {
        id: 'R1-LINK-06',
        ring: 'Muscat Ring',
        planned: 13.8,
        deployed: 9.8,
        completion: 71,
      },
    ];

    // Phase Progress (NO status column)
    this.phaseRows = [
      { phase: 'Phase 1', planned: 980, deployed: 812, completion: 82.9 },
      { phase: 'Phase 2', planned: 860, deployed: 642, completion: 74.7 },
      { phase: 'Phase 3', planned: 620, deployed: 456, completion: 73.5 },
      { phase: 'Phase 4', planned: 480, deployed: 346, completion: 72.1 },
      { phase: 'Phase 5', planned: 316, deployed: 212, completion: 67.1 },
    ];
    this.phaseTotal = { planned: 3256, deployed: 2468, completion: 75.7 };

    // Contractors Performance
    this.contractors = [
      {
        name: 'Al Jassar',
        planned: 980,
        deployed: 742,
        completion: 75.7,
        trend: 'up',
      },
      {
        name: 'BPT',
        planned: 860,
        deployed: 642,
        completion: 74.7,
        trend: 'up',
      },
      {
        name: 'MHD',
        planned: 540,
        deployed: 402,
        completion: 74.4,
        trend: 'up',
      },
      {
        name: 'OFO',
        planned: 480,
        deployed: 346,
        completion: 72.1,
        trend: 'up',
      },
      {
        name: 'OHI',
        planned: 390,
        deployed: 296,
        completion: 75.9,
        trend: 'up',
      },
    ];
    this.contractorTotal = { planned: 3250, deployed: 2468, completion: 75.7 };

    // Link Execution Status (delayed links with red bars)
    this.linkExecRows = [
      {
        linkName: 'OZOI015-FAHUD Southern Ring',
        ring: 'South Ring',
        delayDays: 35,
        status: 'Delayed',
      },
      {
        linkName: 'ZOI005-K M H Link',
        ring: 'Northern Ring',
        delayDays: 18,
        status: 'Delayed',
      },
      {
        linkName: 'ZOI011- Qarn Alam New Link',
        ring: 'Closing Rings',
        delayDays: 3,
        status: 'Delayed',
      },
      {
        linkName: 'Nizwa-ZOI011 Link',
        ring: 'Closing Rings',
        delayDays: 2,
        status: 'Delayed',
      },
      {
        linkName: 'Salalah_SN1-OZOI024',
        ring: 'Salalah Protection Ring',
        delayDays: 30,
        status: 'Delayed',
      },
    ];

    // PAC Status
    this.pacItems = [
      { label: 'Approved', count: 12, percentage: 46, color: '#22c55e' },
      { label: 'Pending', count: 9, percentage: 35, color: '#f59e0b' },
      { label: 'Rejected', count: 5, percentage: 19, color: '#ef4444' },
    ];
    this.pacTotal = 26;

    // Alerts
    this.alerts = [
      {
        type: 'danger',
        title: 'Work delay in R3-LINK-07',
        subtitle: 'Trenching behind schedule by 2 days',
        time: '10 min ago',
      },
      {
        type: 'warning',
        title: 'Quality issue reported',
        subtitle:
          'Ducting quality check failed at CH. 24+500 \u2013 R2-LINK-03',
        time: '25 min ago',
      },
      {
        type: 'warning',
        title: 'Backfilling pending',
        subtitle: '12.6 km pending backfilling across 5 links',
        time: '45 min ago',
      },
      {
        type: 'info',
        title: 'Weather alert',
        subtitle: 'Heavy rain forecasted in Muscat region',
        time: '1 hr ago',
      },
    ];

    // Daily Progress (last 7 days: 25-31 May)
    const seedDaily = (day: string, iso: string, trenching: number, ducting: number, backfilling: number): DailyBar => ({
      day, iso, trenching, ducting, backfilling,
      totalKm: trenching + ducting + backfilling,
      byPhase: { '2': trenching, '4': ducting, '9': backfilling },
    });
    this.dailyBars = [
      seedDaily('25 May', '2026-05-25', 42, 34, 28),
      seedDaily('26 May', '2026-05-26', 38, 30, 26),
      seedDaily('27 May', '2026-05-27', 45, 36, 30),
      seedDaily('28 May', '2026-05-28', 40, 32, 24),
      seedDaily('29 May', '2026-05-29', 48, 38, 32),
      seedDaily('30 May', '2026-05-30', 44, 35, 28),
      seedDaily('31 May', '2026-05-31', 50, 40, 34),
    ];
    this.dailyTrenching = 96;
    this.dailyDucting = 78;
    this.dailyBackfilling = 62;
    this.dailyTotal = 236;
    this.dailyVsYesterday = 18;
  }

  // ── Canvas Charts ─────────────────────────────────────────────────────────

  private getChartColors() {
    const style = getComputedStyle(document.documentElement);
    const get = (v: string) => style.getPropertyValue(v).trim();
    return {
      grid: get('--border') || '#1e3a5f',
      label: get('--muted') || '#94a3b8',
      labelDim: get('--text-tertiary') || '#64748b',
      text: get('--text') || '#e2e8f0',
      textStrong: get('--text') || '#ffffff',
      bg: get('--bg') || '#0f172a',
    };
  }

  drawLineChart(): void {
    if (!this.lineChartCanvas) return;
    const canvas = this.lineChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 30, right: 70, bottom: 40, left: 50 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const dataLen = this.plannedData.length;

    if (dataLen === 0) return;

    const tc = this.getChartColors();
    const allValues = [...this.plannedData, ...this.actualData];
    const maxVal = Math.max(...allValues, 1) * 1.1;

    ctx.clearRect(0, 0, w, h);

    // Grid lines & Y-axis labels
    const yTickCount = 4;
    const yStep = Math.ceil(maxVal / yTickCount / 100) * 100;
    ctx.strokeStyle = tc.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= yTickCount; i++) {
      const tick = yStep * i;
      if (tick > maxVal * 1.1) break;
      const y = pad.top + chartH - (tick / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();

      ctx.fillStyle = tc.label;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      const label = tick >= 1000 ? `${(tick / 1000).toFixed(tick % 1000 === 0 ? 0 : 1)}K` : tick.toString();
      ctx.fillText(label, pad.left - 8, y + 4);
    }

    // X-axis labels
    ctx.fillStyle = tc.label;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    const xLabelCount = Math.min(dataLen, 7);
    for (let i = 0; i < xLabelCount; i++) {
      const idx = Math.round((i / (xLabelCount - 1)) * (dataLen - 1));
      const x = pad.left + (idx / (dataLen - 1)) * chartW;
      ctx.fillText(`${idx + 1}`, x, h - pad.bottom + 20);
    }

    // Draw planned line (blue)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    this.plannedData.forEach((val, i) => {
      const x = pad.left + (i / (dataLen - 1)) * chartW;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw actual line (green)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    this.actualData.forEach((val, i) => {
      const x = pad.left + (i / (dataLen - 1)) * chartW;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill under actual line
    ctx.fillStyle = 'rgba(34,197,94,0.1)';
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + chartH);
    this.actualData.forEach((val, i) => {
      const x = pad.left + (i / (dataLen - 1)) * chartW;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(pad.left + chartW, pad.top + chartH);
    ctx.closePath();
    ctx.fill();

    // End-point labels
    if (this.plannedData.length > 0) {
      const lastPlanned = this.plannedData[this.plannedData.length - 1];
      const lastActual = this.actualData[this.actualData.length - 1];
      const xEnd = pad.left + chartW;

      // Planned end label
      const yPlanned = pad.top + chartH - (lastPlanned / maxVal) * chartH;
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(
        `${lastPlanned.toLocaleString()} km`,
        xEnd + 6,
        yPlanned + 4
      );

      // Actual end label
      const yActual = pad.top + chartH - (lastActual / maxVal) * chartH;
      ctx.fillStyle = '#22c55e';
      ctx.fillText(
        `${lastActual.toLocaleString()} km`,
        xEnd + 6,
        yActual + 4
      );
    }

    // Legend
    const legendY = pad.top - 15;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(w - 250, legendY, 12, 3);
    ctx.fillStyle = tc.label;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Planned', w - 234, legendY + 5);

    ctx.fillStyle = '#22c55e';
    ctx.fillRect(w - 160, legendY, 12, 3);
    ctx.fillStyle = tc.label;
    ctx.fillText('Actual', w - 144, legendY + 5);
  }

  // ── Cumulative Progress Report chart ───────────────────────────────────────
  // Rendered as SVG from a prebuilt view model (see progress-forecast-chart.ts)
  // and templated declaratively, so there is no imperative draw step here. The
  // former canvas renderer plotted percentages with no forward projection.

  // ── 7-day daily progress chart (phase-filtered) ──
  drawDailyPhaseChart(): void {
    if (!this.dailyPhaseCanvas) return;
    const canvas = this.dailyPhaseCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 24, right: 16, bottom: 34, left: 52 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    ctx.clearRect(0, 0, w, h);

    const bars = this.dailyPhaseValues;
    if (bars.length === 0) return;
    // Single-phase daily figures are often under 1 km, which rounded to "0".
    const fmt = (v: number) =>
      v.toLocaleString(undefined, { maximumFractionDigits: v >= 100 ? 0 : v >= 10 ? 1 : 2 });

    const tc = this.getChartColors();
    // 'all' → blue; individual phases cycle through a fixed palette by phaseId.
    const palette = ['#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981', '#ec4899', '#06b6d4', '#f97316'];
    const color = this.dailyPhaseFilter === 'all'
      ? '#3b82f6'
      : palette[(parseInt(this.dailyPhaseFilter, 10) || 0) % palette.length];
    const maxVal = Math.max(...bars.map(b => b.value), 1) * 1.15;

    // Grid + Y labels
    ctx.strokeStyle = tc.grid;
    ctx.lineWidth = 0.5;
    ctx.font = '10px sans-serif';
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const val = (maxVal / gridSteps) * i;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = tc.label;
      ctx.textAlign = 'right';
      ctx.fillText(fmt(val), pad.left - 8, y + 4);
    }

    ctx.save();
    ctx.translate(12, pad.top + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = tc.labelDim;
    ctx.font = '9px sans-serif';
    ctx.fillText(`${this.dailyPhaseLabel} (km / day)`, 0, 0);
    ctx.restore();

    // Bars
    const slot = chartW / bars.length;
    const barW = Math.min(slot * 0.55, 46);
    bars.forEach((b, i) => {
      const x = pad.left + slot * i + (slot - barW) / 2;
      const barH = (b.value / maxVal) * chartH;
      const y = pad.top + chartH - barH;
      ctx.fillStyle = color;
      ctx.beginPath();
      const r = 4;
      ctx.moveTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.closePath();
      ctx.fill();

      // Value label
      ctx.fillStyle = tc.text;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${fmt(b.value)} km`, x + barW / 2, y - 5);

      // Day label
      ctx.fillStyle = tc.label;
      ctx.font = '10px sans-serif';
      ctx.fillText(b.day, x + barW / 2, h - pad.bottom + 18);
    });
  }

  // ── Invoice summary chart (Total / Paid / Remaining — static data) ──
  drawInvoiceChart(): void {
    if (!this.invoiceCanvas) return;
    const canvas = this.invoiceCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 30, right: 16, bottom: 34, left: 64 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    ctx.clearRect(0, 0, w, h);

    const tc = this.getChartColors();
    const series: { label: string; value: number; color: string }[] = [
      { label: 'Total', value: this.invoiceStats.total, color: '#3b82f6' },
      { label: 'Paid', value: this.invoiceStats.paid, color: '#22c55e' },
      { label: 'Remaining', value: this.invoiceStats.remaining, color: '#f59e0b' },
    ];
    const maxVal = Math.max(...series.map(s => s.value), 1) * 1.18;
    const fmtM = (v: number) => `${(v / 1_000_000).toFixed(2)}M`;

    // Grid + Y labels (in millions)
    ctx.strokeStyle = tc.grid;
    ctx.lineWidth = 0.5;
    ctx.font = '10px sans-serif';
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const val = (maxVal / gridSteps) * i;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = tc.label;
      ctx.textAlign = 'right';
      ctx.fillText(fmtM(val), pad.left - 8, y + 4);
    }

    // Bars
    const slot = chartW / series.length;
    const barW = Math.min(slot * 0.5, 80);
    series.forEach((s, i) => {
      const x = pad.left + slot * i + (slot - barW) / 2;
      const barH = (s.value / maxVal) * chartH;
      const y = pad.top + chartH - barH;
      ctx.fillStyle = s.color;
      const r = 5;
      ctx.beginPath();
      ctx.moveTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.closePath();
      ctx.fill();

      // Value label
      ctx.fillStyle = tc.text;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${this.invoiceStats.currency} ${fmtM(s.value)}`, x + barW / 2, y - 6);

      // Category label
      ctx.fillStyle = tc.label;
      ctx.font = '11px sans-serif';
      ctx.fillText(s.label, x + barW / 2, h - pad.bottom + 18);
    });
  }

  // ── Shared grouped-bar renderer (two series per category, OMR millions) ──
  private drawGroupedBars(
    canvasRef: ElementRef<HTMLCanvasElement> | undefined,
    categories: string[],
    seriesA: { label: string; color: string; values: number[] },
    seriesB: { label: string; color: string; values: number[] },
  ): void {
    if (!canvasRef) return;
    const canvas = canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 28, right: 14, bottom: 34, left: 40 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    ctx.clearRect(0, 0, w, h);
    if (categories.length === 0) return;

    const tc = this.getChartColors();
    const maxVal = Math.max(...seriesA.values, ...seriesB.values, 1) * 1.2;

    // Grid + Y labels
    ctx.strokeStyle = tc.grid;
    ctx.lineWidth = 0.5;
    ctx.font = '10px sans-serif';
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const val = (maxVal / steps) * i;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = tc.label;
      ctx.textAlign = 'right';
      ctx.fillText(`${val.toFixed(1)}M`, pad.left - 6, y + 4);
    }

    // Grouped bars
    const slot = chartW / categories.length;
    const groupW = Math.min(slot * 0.6, 60);
    const barW = groupW / 2 - 2;
    categories.forEach((cat, i) => {
      const gx = pad.left + slot * i + (slot - groupW) / 2;
      [[seriesA, 0], [seriesB, 1]].forEach(([s, idx]: any) => {
        const val = s.values[i] || 0;
        const barH = (val / maxVal) * chartH;
        const x = gx + idx * (barW + 4);
        const y = pad.top + chartH - barH;
        ctx.fillStyle = s.color;
        ctx.fillRect(x, y, barW, barH);
      });
      ctx.fillStyle = tc.label;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cat, gx + groupW / 2, h - pad.bottom + 18);
    });

    // Legend
    const legendY = pad.top - 16;
    let lx = pad.left;
    ctx.textBaseline = 'middle';
    [seriesA, seriesB].forEach((s) => {
      ctx.fillStyle = s.color;
      ctx.fillRect(lx, legendY, 12, 8);
      ctx.fillStyle = tc.label;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(s.label, lx + 16, legendY + 4);
      lx += 22 + ctx.measureText(s.label).width + 16;
    });
    ctx.textBaseline = 'alphabetic';
  }

  // ── Monthly invoicing trend (Invoiced vs Paid) ──
  drawInvoiceTrendChart(): void {
    const data = this.invoiceMonthlyFiltered;
    this.drawGroupedBars(
      this.invoiceTrendCanvas,
      data.map(m => m.month),
      { label: 'Invoiced', color: '#3b82f6', values: data.map(m => m.invoiced) },
      { label: 'Paid', color: '#22c55e', values: data.map(m => m.paid) },
    );
  }

  // ── Budget vs Spent by contractor ──
  drawBudgetContractorChart(): void {
    const data = this.budgetByContractorFiltered;
    this.drawGroupedBars(
      this.budgetContractorCanvas,
      data.map(c => c.name),
      { label: 'Budget', color: '#8b5cf6', values: data.map(c => c.budget) },
      { label: 'Spent', color: '#06b6d4', values: data.map(c => c.spent) },
    );
  }

  // ── Payment status donut (Paid / Pending / Overdue) ──
  drawPaymentStatusChart(): void {
    if (!this.paymentStatusCanvas) return;
    const canvas = this.paymentStatusCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const tc = this.getChartColors();
    const total = this.paymentStatus.reduce((s, p) => s + p.value, 0);
    if (total <= 0) return;

    const cx = Math.min(w * 0.34, 130);
    const cy = h / 2;
    const rOuter = Math.min(cy - 16, cx - 16, 80);
    const rInner = rOuter * 0.6;

    let start = -Math.PI / 2;
    this.paymentStatus.forEach((p) => {
      const angle = (p.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, rOuter, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = p.color;
      ctx.fill();
      start += angle;
    });
    // Inner hole
    ctx.beginPath();
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2);
    ctx.fillStyle = tc.bg;
    ctx.fill();
    // Center total
    ctx.fillStyle = tc.text;
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${total.toFixed(1)}M`, cx, cy - 2);
    ctx.fillStyle = tc.label;
    ctx.font = '10px sans-serif';
    ctx.fillText('Total', cx, cy + 14);

    // Legend (right side)
    const legendX = cx + rOuter + 24;
    let ly = cy - this.paymentStatus.length * 12;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    this.paymentStatus.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(legendX, ly, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = tc.text;
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`${p.label}`, legendX + 12, ly);
      ctx.fillStyle = tc.label;
      ctx.font = '11px sans-serif';
      ctx.fillText(`OMR ${p.value.toFixed(2)}M  (${Math.round((p.value / total) * 100)}%)`, legendX + 12, ly + 15);
      ly += 40;
    });
    ctx.textBaseline = 'alphabetic';
  }

  drawBarChart(): void {
    if (!this.barChartCanvas) return;
    const canvas = this.barChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 15, right: 10, bottom: 30, left: 36 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const barCount = this.dailyBars.length;

    // Calculate dynamic max value from data
    let maxVal = 0;
    this.dailyBars.forEach((bar) => {
      const total = bar.trenching + bar.ducting + bar.backfilling;
      if (total > maxVal) maxVal = total;
    });
    maxVal = Math.max(maxVal * 1.15, 10); // 15% headroom, min 10

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = this.getChartColors().grid;
    ctx.lineWidth = 0.5;
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const y = pad.top + (chartH / gridSteps) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = this.getChartColors().labelDim;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(
        Math.round(maxVal - (maxVal / gridSteps) * i).toString(),
        pad.left - 6,
        y + 3
      );
    }

    if (barCount === 0) return;

    const gap = Math.max(4, Math.min(8, chartW / barCount * 0.15));
    const barW = (chartW - gap * (barCount + 1)) / barCount;
    const colors = ['#3b82f6', '#f97316', '#f59e0b'];

    // Draw stacked bars
    const totalProgressPoints: { x: number; y: number }[] = [];

    this.dailyBars.forEach((bar, i) => {
      const x = pad.left + gap + i * (barW + gap);
      let yOffset = 0;
      const segments = [bar.trenching, bar.ducting, bar.backfilling];
      segments.forEach((val, si) => {
        const segH = (val / maxVal) * chartH;
        ctx.fillStyle = colors[si];
        const barX = Math.round(x);
        const barY = Math.round(pad.top + chartH - yOffset - segH);
        const bw = Math.round(barW);
        const bh = Math.round(segH);
        if (bh > 0) {
          // Rounded top corners for top segment only
          if (si === segments.length - 1 || (si < segments.length - 1 && segments.slice(si + 1).every(v => v === 0))) {
            const radius = Math.min(3, bw / 2);
            ctx.beginPath();
            ctx.moveTo(barX, barY + bh);
            ctx.lineTo(barX, barY + radius);
            ctx.quadraticCurveTo(barX, barY, barX + radius, barY);
            ctx.lineTo(barX + bw - radius, barY);
            ctx.quadraticCurveTo(barX + bw, barY, barX + bw, barY + radius);
            ctx.lineTo(barX + bw, barY + bh);
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.fillRect(barX, barY, bw, bh);
          }
        }
        yOffset += segH;
      });

      const total = bar.trenching + bar.ducting + bar.backfilling;
      const totalY = pad.top + chartH - (total / maxVal) * chartH;
      totalProgressPoints.push({ x: x + barW / 2, y: totalY });
    });

    // Draw total progress dashed line
    if (totalProgressPoints.length > 1) {
      ctx.strokeStyle = this.getChartColors().label;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      totalProgressPoints.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      totalProgressPoints.forEach((pt) => {
        ctx.fillStyle = this.getChartColors().textStrong;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // X labels
    ctx.fillStyle = this.getChartColors().labelDim;
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    this.dailyBars.forEach((bar, i) => {
      const x = pad.left + gap + i * (barW + gap) + barW / 2;
      ctx.fillText(bar.day, x, h - pad.bottom + 14);
    });

    // No in-canvas legend — handled by HTML below the chart
  }

  // ── Helper Methods ────────────────────────────────────────────────────────

  getStatusClass(status: string): string {
    switch (status) {
      case 'On Track':
        return 'status-on-track';
      case 'Delayed':
        return 'status-delayed';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  getAlertIcon(type: string): string {
    switch (type) {
      case 'danger':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z';
      case 'info':
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'success':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      default:
        return '';
    }
  }

  getAlertColor(type: string): string {
    switch (type) {
      case 'danger':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'info':
        return '#3b82f6';
      case 'success':
        return '#22c55e';
      default:
        return '#94a3b8';
    }
  }

  getProgressColor(completion: number): string {
    if (completion >= 80) return '#22c55e';
    if (completion >= 60) return '#06b6d4';
    if (completion >= 40) return '#f59e0b';
    return '#ef4444';
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up':
        return 'M5 15l7-7 7 7';
      case 'down':
        return 'M19 9l-7 7-7-7';
      default:
        return 'M5 12h14';
    }
  }

  getTrendColor(trend: string): string {
    switch (trend) {
      case 'up':
        return '#22c55e';
      case 'down':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  }

  // SVG donut chart helper
  getPacArc(index: number): string {
    const total = this.pacItems.reduce((s, i) => s + i.percentage, 0);
    let startAngle = -90;
    for (let i = 0; i < index; i++) {
      startAngle += (this.pacItems[i].percentage / total) * 360;
    }
    const sweep = (this.pacItems[index].percentage / total) * 360;
    const endAngle = startAngle + sweep;

    const r = 70;
    const cx = 90;
    const cy = 90;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = sweep > 180 ? 1 : 0;

    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  }

  // ── Row 5 & 6 Mapping Methods ─────────────────────────────────────────────

  private mapContractorCompareData(data: KpiDimensionsResponse): void {
    if (!data.contractors || data.contractors.length === 0) return;
    this.contractorCompareNames = data.contractors.map(c => c.name);
    this.contractorComparePlanned = data.contractors.map(c => Math.round(c.totalKm));
    this.contractorCompareDeployed = data.contractors.map(c => Math.round(c.completedKm));
  }

  private mapRingContractorMatrix(data: KpiDimensionsResponse): void {
    if (!data.matrix || data.matrix.length === 0) return;
    // Extract unique contractor names from first matrix entry
    const firstRow = data.matrix[0];
    this.heatmapContractorNames = firstRow.contractors
      ? firstRow.contractors.map(c => c.name)
      : [];

    this.ringContractorMatrix = data.matrix.map(m => ({
      ringName: m.ringName,
      cells: m.contractors
        ? m.contractors.map(c => Math.round(c.completedPct || 0))
        : [],
    }));
  }

  private mapTimelineTrendChart(data: TimelineTrendResponse): void {
    if (!data.dataPoints || data.dataPoints.length === 0) return;
    this.timelineDates = data.dataPoints.map(p => {
      const d = new Date(p.date);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    });
    this.timelineCompleted = data.dataPoints.map(p => p.completedKm || 0);
    this.timelinePlanned = data.dataPoints.map(p => p.cumulativePlannedKm || 0);
    // NOTE: cumPoints is deliberately NOT derived here. /timeline-trend fabricates
    // its series (S-curve shape + linear planned ramp), which made the Progress
    // Report chart show demo data. It now comes from loadAnalyticsHistory().
  }

  // ── Cumulative Progress Report helpers ────────────────────────────────────

  /**
   * Replace the seeded phase list with the live one, once. Failure is fine — the
   * seeded defaults already cover every known phase.
   */
  private async ensurePhaseOptions(): Promise<void> {
    if (this.phaseOptionsLoaded) return;
    this.phaseOptionsLoaded = true;
    try {
      const list = await getPhaseList();
      // Dropdowns list phases in id order.
      const phases = [...(list?.phases || [])].sort(
        (a, b) => (Number(a.phaseId) || 0) - (Number(b.phaseId) || 0)
      );
      if (!phases.length) return;

      // Only swap when the ids genuinely differ. Replacing the array makes ngFor
      // rebuild the <option> elements; the browser then resets the select to
      // index 0 without firing a change event, so [(ngModel)] keeps the real
      // value while the dropdown displays the wrong phase.
      const same =
        phases.length === this.dailyPhaseOptions.length &&
        phases.every((p, i) => String(p.phaseId) === String(this.dailyPhaseOptions[i].phaseId));
      if (same) return;

      this.dailyPhaseOptions = phases;
      this.resyncPhaseSelects();
    } catch {
      /* keep DEFAULT_PHASE_OPTIONS */
    }
  }

  /**
   * Re-assert the phase dropdowns after their options were rebuilt. Clearing then
   * restoring the bound value forces Angular to write it again, now that the new
   * <option> elements exist.
   */
  private resyncPhaseSelects(): void {
    const phase = this.cumPhaseId;
    const daily = this.dailyPhaseFilter;
    this.cumPhaseId = '';
    this.dailyPhaseFilter = '';
    setTimeout(() => {
      this.cumPhaseId = phase;
      this.dailyPhaseFilter = daily;
    });
  }

  /** Default the date window to the last 6 months, only on first load. */
  private ensureCumDateDefaults(): void {
    if (!this.cumToDate) this.cumToDate = this.today;
    if (!this.cumFromDate) {
      const to = new Date(`${this.cumToDate}T00:00:00`);
      to.setMonth(to.getMonth() - 6);
      this.cumFromDate = to.toISOString().slice(0, 10);
    }
  }

  /**
   * Load the real cumulative progress series for the Progress Report chart.
   *
   * The server merges every contractor host; hosts without the endpoint deployed
   * are reported in `coverage`/`sources` rather than silently omitted, so a
   * partial rollup is visible as such instead of reading as the whole programme.
   */
  /** Earlier than any project's first recorded work; see loadAnalyticsHistory. */
  private static readonly CUM_HISTORY_START = '2020-01-01';

  async loadAnalyticsHistory(): Promise<void> {
    this.ensureCumDateDefaults();

    // Supersede any request still in flight. A cold call fans out to five upstream
    // hosts (~15s), so changing a filter mid-load easily leaves two running; without
    // this the slower, older one can resolve last and overwrite newer data. The
    // cancellation is deliberate — that is what shows as "(cancelled)" in DevTools.
    this.cumAbort?.abort();
    const controller = new AbortController();
    this.cumAbort = controller;
    const seq = ++this.cumReqSeq;

    this.cumLoading = true;
    this.cumError = '';
    try {
      await this.ensurePhaseOptions();

      const filters = this.buildFilterParams();
      // A single phase from the global filter overrides the card's own selector,
      // so the card follows the dashboard filter when one phase is picked there.
      const globalPhases = (filters['phaseId'] || '').split(',').filter(Boolean);
      if (globalPhases.length === 1) this.cumPhaseId = globalPhases[0];

      const res: AnalyticsHistoryResponse = await getAnalyticsHistory(
        {
          phaseId: this.cumPhaseId,
          granularity: this.cumGranularity,
          // Always fetch from the start of history; `cumFiltered` trims to the
          // chosen window. Upstream's cumulativeActual restarts at 0 on fromDate,
          // so sending the window start dropped all pre-window work from the line
          // — it ended ~11 km below summary.completedKm (668 vs 679 km), which is
          // all-time. From an early date, the last point equals completedKm.
          fromDate: ExecutiveDashboardComponent.CUM_HISTORY_START,
          toDate: this.cumToDate,
          // The API accepts a comma list and fans out to those slots only.
          contractor: this.cumContractors.join(',') || filters['contractor'] || undefined,
          ringId: filters['ringId'] || undefined,
          projectId: filters['projectId'] || undefined,
        },
        controller.signal
      );

      // Belt and braces: even with aborts, only the newest load may write state.
      if (seq !== this.cumReqSeq) return;

      this.cumSummary = res.summary;
      this.cumForecast = res.forecast?.[0] || null;
      this.cumStatusDate = res.statusDate || res.toDate || this.today;
      this.cumCoverage = res.coverage;
      this.cumSources = res.sources || [];
      this.cumWarnings = res.meta?.warnings || [];
      this.cumHasPlanBaseline = res.meta?.hasPlanBaseline === true;
      this.mergeContractorRoster(res.sources || []);

      // progress[] lengths are METRES; scope is km. Percentages come straight
      // from the API rather than being re-derived here.
      const scopeM = (res.summary?.totalScopeKm || 0) * 1000;
      this.cumPoints = (res.progress || []).map(p => ({
        iso: p.period,
        label: new Date(`${p.period}T00:00:00`).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        }),
        plannedPct:
          this.cumHasPlanBaseline && scopeM > 0
            ? +((p.cumulativePlanned / scopeM) * 100).toFixed(2)
            : 0,
        actualPct: +(p.completionPercentage || 0).toFixed(2),
        // Lengths arrive in metres.
        cumulativeKm: +((p.cumulativeActual || 0) / 1000).toFixed(3),
        periodKm: +((p.actualWork || 0) / 1000).toFixed(3),
        segments: p.createdSegments || 0,
      }));

      if (this.cumPoints.length === 0) {
        this.cumError =
          res.coverage && res.coverage.upstream === 0
            ? 'No contractor host returned progress history for this range.'
            : 'No progress recorded in the selected range.';
      }
    } catch (err: unknown) {
      // A request we cancelled is not a failure: a newer load is already running,
      // so leave the existing chart alone rather than flashing an error and wiping
      // it. Same for a stale response arriving after a newer one.
      if (isRequestAborted(err) || seq !== this.cumReqSeq) return;
      this.cumPoints = [];
      this.cumSummary = null;
      this.cumForecast = null;
      this.cumError = 'Could not load progress history.';
    } finally {
      // Only the newest load owns the spinner; an aborted one must not clear it
      // while its replacement is still fetching.
      if (seq === this.cumReqSeq) {
        this.cumLoading = false;
        setTimeout(() => this.rebuildCumChart(), 30);
      }
    }
  }

  /**
   * Recompute the SVG view model. Called after a load and on resize; the width is
   * measured from the rendered container so the chart fills the card.
   */
  rebuildCumChart(): void {
    const host = this.cumChartHost?.nativeElement;
    if (host) {
      const w = Math.round(host.getBoundingClientRect().width);
      if (w > 200) this.cumSvgW = w;
    }

    const pts = this.cumFiltered;
    const s = this.cumSummary;
    if (!pts.length || !s) {
      this.cumChart = null;
      return;
    }

    this.cumChart = buildCumChart({
      points: pts.map((p) => ({ iso: p.iso, cumulativeKm: p.cumulativeKm })),
      scopeKm: s.totalScopeKm || 0,
      completedKm: s.completedKm || 0,
      statusDate: this.cumStatusDate || this.today,
      rays: this.cumRaySpecs,
      width: this.cumSvgW,
      height: this.cumSvgH,
      // Weekly/monthly periods are keyed by bucket start but carry the bucket's
      // full cumulative, so the chart positions them at period end.
      granularity: this.cumGranularity,
    });
  }

  /**
   * How far upstream's pace may exceed the pace the charted history actually
   * demonstrates before it is treated as a unit/divisor error rather than a
   * forecast. Measured across the five contractor hosts, the sound ones report
   * 0.60–0.99× the observed pace (their divisor is the contract window, which is
   * longer than the active window, so they run conservative). OHI reports 133×:
   * its `averageProductivity` comes back as the total completed length with a
   * divisor of one day, which projects the remaining 80 km as finishing tomorrow.
   * A 5× gate separates those two populations with room to spare.
   */
  private static readonly PACE_SANITY_FACTOR = 5;

  /**
   * Metres/day the charted history demonstrates: completed length over the days
   * actually elapsed. Only ever used to sanity-check upstream's own figure — the
   * forecast itself stays upstream's whenever upstream's is usable.
   */
  private get cumObservedPaceMPerDay(): number {
    const pts = this.cumFiltered;
    const s = this.cumSummary;
    if (!s || pts.length < 2) return 0;
    const firstMs = new Date(`${pts[0].iso}T00:00:00Z`).getTime();
    const lastMs = new Date(
      `${this.cumStatusDate || pts[pts.length - 1].iso}T00:00:00Z`
    ).getTime();
    if (!Number.isFinite(firstMs) || !Number.isFinite(lastMs)) return 0;
    const days = Math.max(1, Math.round((lastMs - firstMs) / 86400000));
    return ((s.completedKm || 0) * 1000) / days;
  }

  /**
   * Ratio to apply to every upstream pace, and to the dates derived from them.
   * 1 in the normal case — upstream is trusted, and nothing is recomputed.
   */
  private get cumPaceCorrection(): number {
    const f = this.cumForecast;
    const observed = this.cumObservedPaceMPerDay;
    if (!f || !(f.actual > 0) || !(observed > 0)) return 1;
    const factor = ExecutiveDashboardComponent.PACE_SANITY_FACTOR;
    return f.actual > observed * factor ? observed / f.actual : 1;
  }

  /** True when the displayed forecast is ours, not upstream's. Drives the note. */
  get cumPaceCorrected(): boolean {
    return this.cumPaceCorrection !== 1;
  }

  /**
   * Completion date implied by a pace, counting from the status date. Only used
   * when upstream's own pace was rejected — otherwise its dates are shown as-is
   * so the pace and date on screen always come from the same calculation.
   */
  private completionDateFor(paceMPerDay: number): string | null {
    const s = this.cumSummary;
    if (!s || !(paceMPerDay > 0)) return null;
    const remainingM = Math.max(0, (s.remainingKm || 0) * 1000);
    if (remainingM === 0) return this.cumStatusDate || this.today;
    const base = new Date(`${this.cumStatusDate || this.today}T00:00:00Z`).getTime();
    if (!Number.isFinite(base)) return null;
    const days = Math.ceil(remainingM / paceMPerDay);
    return new Date(base + days * 86400000).toISOString().slice(0, 10);
  }

  /**
   * The three scenarios. Bands come from the API's own forecast block rather than
   * being re-derived here, so the pace shown and the date shown always agree —
   * upstream computes both at ±15%.
   *
   * The one exception is an upstream pace the history cannot support (see
   * PACE_SANITY_FACTOR). Scaling all three by the same correction preserves
   * upstream's ±15% spread, and the dates are recomputed from the corrected pace
   * so the table cannot show a pace and a date that disagree.
   */
  private get cumRaySpecs(): RaySpec[] {
    const f = this.cumForecast;
    const s = this.cumSummary;
    if (!f || !s) return [];
    const pct = (ratio: number) => `${ratio > 0 ? '+' : ''}${Math.round(ratio * 100)}%`;
    const bestRatio = f.actual > 0 ? f.bestCase / f.actual - 1 : 0;
    const worstRatio = f.actual > 0 ? f.worstCase / f.actual - 1 : 0;

    const k = this.cumPaceCorrection;
    const pace = (upstreamPace: number) => (upstreamPace || 0) * k;
    // Recompute dates only when we overrode the pace; upstream's own dates are
    // internally consistent with its own pace and are left untouched otherwise.
    const dateFor = (upstreamPace: number, upstreamDate: string | null) =>
      k === 1 ? upstreamDate : this.completionDateFor(pace(upstreamPace));

    return [
      {
        key: 'forecast',
        label: 'Forecast (current pace)',
        shortLabel: 'Forecast',
        color: '#ef4444',
        paceMPerDay: pace(f.actual),
        completionDate: dateFor(f.actual, s.forecastCompletionDate),
      },
      {
        key: 'best',
        label: `Best case (${pct(bestRatio)} pace)`,
        shortLabel: 'Best Case',
        color: '#3b82f6',
        paceMPerDay: pace(f.bestCase),
        completionDate: dateFor(f.bestCase, s.bestCaseCompletionDate),
      },
      {
        key: 'worst',
        label: `Worst case (${pct(worstRatio)} pace)`,
        shortLabel: 'Worst Case',
        color: '#f59e0b',
        paceMPerDay: pace(f.worstCase),
        completionDate: dateFor(f.worstCase, s.worstCaseCompletionDate),
      },
    ];
  }

  // ── Pace presentation ──────────────────────────────────────────────────────
  // The API reports pace in metres/day. Show it in km, and in the period the user
  // selected: a weekly chart quoting a daily rate forces mental arithmetic.
  // 30.44 = 365.25/12, so a monthly rate is an average calendar month, not 30 days.
  private static readonly PACE_DAYS: Record<'DAILY' | 'WEEKLY' | 'MONTHLY', number> = {
    DAILY: 1,
    WEEKLY: 7,
    MONTHLY: 30.44,
  };

  /** "km/day" | "km/week" | "km/month", matching the selected granularity. */
  get cumPaceUnit(): string {
    return { DAILY: 'km/day', WEEKLY: 'km/week', MONTHLY: 'km/month' }[this.cumGranularity];
  }

  /**
   * Metres/day → km per selected period. Precision scales with magnitude so a
   * daily rate keeps meaningful digits without a monthly one showing false ones.
   */
  private paceInKm(metresPerDay: number): string {
    const km =
      ((metresPerDay || 0) / 1000) *
      ExecutiveDashboardComponent.PACE_DAYS[this.cumGranularity];
    if (!Number.isFinite(km) || km <= 0) return '—';
    const dp = km >= 100 ? 1 : km >= 10 ? 2 : 3;
    return km.toFixed(dp);
  }

  /** Rows for the inset Forecast Summary table. */
  get cumForecastRows(): {
    key: string; scenario: string; color: string;
    pace: string; date: string; days: string;
  }[] {
    const chart = this.cumChart;
    if (!chart) return [];
    return chart.rays.map((r) => ({
      key: r.key,
      scenario: r.label,
      color: r.color,
      pace: this.paceInKm(r.paceMPerDay),
      date: r.endDateLabel,
      // Replaces the reference's "Total Completion (km)": every scenario finishes
      // at 100% of scope by definition, so that column could only ever restate the
      // scope or — as in the mock — exceed it, which is not a possible outcome.
      days: r.daysRemaining == null ? '—' : r.daysRemaining.toLocaleString('en-GB'),
    }));
  }

  /** Figures for the "Actual (To Date)" callout. */
  get cumActualCallout(): { completedKm: string; pct: string; pace: string } | null {
    const s = this.cumSummary;
    if (!s) return null;
    return {
      completedKm: `${formatKm(s.completedKm || 0)} km`,
      pct: `${(s.completionPercentage || 0).toFixed(2)}%`,
      // Same correction as the rays: this callout and the forecast table must not
      // quote two different current paces.
      pace: `${this.paceInKm((s.currentPace || 0) * this.cumPaceCorrection)} ${this.cumPaceUnit}`,
    };
  }

  get cumScopeLabel(): string {
    return this.cumSummary ? `${formatKm(this.cumSummary.totalScopeKm || 0)} km` : '—';
  }

  get cumTodayLabel(): string {
    return formatEndDate(this.cumStatusDate);
  }

  /**
   * Fold a response's `sources` into the roster used by the contractor picker.
   *
   * The API lists every known contractor and flags which were `selected`. Only a
   * selected entry carries a real verdict — an unselected one was never fetched, so
   * its `ok` is null and must not overwrite what we already know. Previously the
   * response only contained the selected contractors, so absence was ambiguous and
   * this had to guess from the payload's size.
   */
  private mergeContractorRoster(sources: AnalyticsHistorySource[]): void {
    const next = this.cumContractorRoster.map(entry => ({ ...entry }));

    for (const s of sources) {
      if (!s?.contractor) continue;
      const existing = next.find(e => e.name.toLowerCase() === s.contractor.toLowerCase());
      const verdict = s.selected === false ? null : s.ok;
      if (existing) {
        // Keep the last real verdict when this request didn't cover them.
        if (verdict !== null) existing.hasData = verdict;
      } else {
        next.push({ name: s.contractor, hasData: verdict });
      }
    }
    this.cumContractorRoster = next;
  }

  /** True once a full sweep has told us which contractors have any history. */
  get cumAvailabilityKnown(): boolean {
    return this.cumContractorRoster.some(c => c.hasData !== null);
  }

  /** Contractors a full sweep found no history for. */
  get cumUnavailableContractors(): string {
    return this.cumContractorRoster
      .filter(c => c.hasData === false)
      .map(c => c.name)
      .join(', ');
  }

  /**
   * Points for the chart. The server already honours fromDate/toDate, so this is
   * a safety net for stale points rather than the primary filter.
   */
  get cumFiltered(): CumPoint[] {
    return this.cumPoints.filter(
      p => (!this.cumFromDate || p.iso >= this.cumFromDate) &&
           (!this.cumToDate || p.iso <= this.cumToDate)
    );
  }

  /** "4 of 5 contractors" — surfaced on the card so partial data is visible. */
  get cumCoverageLabel(): string {
    const c = this.cumCoverage;
    if (!c) return '';
    const have = c.upstream + c.derived;
    return `${have} of ${c.requested} contractor${c.requested === 1 ? '' : 's'}`;
  }

  get cumCoverageIsPartial(): boolean {
    const c = this.cumCoverage;
    return !!c && c.failed > 0;
  }

  /**
   * Sources actually queried. `sources` also lists unselected contractors for
   * reference; those carry ok:null and must never be counted as failures.
   */
  private get cumSelectedSources(): AnalyticsHistorySource[] {
    return this.cumSources.filter(s => s.selected !== false);
  }

  /** Selected contractors that returned no data, for the badge tooltip. */
  get cumMissingContractors(): string {
    return this.cumSelectedSources
      .filter(s => s.ok === false)
      .map(s => s.contractor)
      .join(', ');
  }

  /**
   * Contractors whose series was rebuilt from segment records because their host
   * serves no history endpoint. Named in the UI so a reader can tell which part
   * of the rollup is upstream-reported and which is reconstructed.
   */
  get cumDerivedContractors(): string {
    return this.cumSelectedSources
      .filter(s => s.ok === true && s.mode === 'derived')
      .map(s => s.contractor)
      .join(', ');
  }

  /** Tooltip for the coverage badge: what's live, what's derived, what's absent. */
  get cumCoverageTooltip(): string {
    const parts: string[] = [];
    const live = this.cumSelectedSources
      .filter(s => s.ok === true && s.mode === 'upstream')
      .map(s => s.contractor);
    if (live.length) parts.push(`Reported upstream: ${live.join(', ')}`);
    if (this.cumDerivedContractors) parts.push(`Rebuilt from segments: ${this.cumDerivedContractors}`);
    if (this.cumMissingContractors) parts.push(`No data: ${this.cumMissingContractors}`);
    return parts.join(' · ');
  }

  // The client-side linear regression that used to draw the "Trend" line is gone:
  // the projection now comes from the API's forecast block (current / best / worst
  // pace), so the line on the chart and the dates in the summary share one source.

  /**
   * Footer stats for the Progress Report chart.
   *
   * Pace and the forecast dates deliberately live in the Forecast summary table
   * instead, which states them per scenario. `variance` is null whenever upstream
   * has no plan baseline — the template omits the tile rather than render 0, since
   * "0 variance" would claim we are exactly on a plan that does not exist.
   */
  get cumStats(): {
    startLabel: string; endLabel: string; durationDays: number;
    actualCurrent: number; variance: number | null; scopeLabel: string;
  } | null {
    const pts = this.cumFiltered;
    const s = this.cumSummary;
    if (pts.length === 0 || !s) return null;

    const fmtDate = (iso: string | number | null) =>
      iso == null
        ? '—'
        : new Date(iso).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

    const start = pts[0], end = pts[pts.length - 1];
    const durationDays = Math.max(
      0,
      Math.round(
        (new Date(`${end.iso}T00:00:00`).getTime() -
          new Date(`${start.iso}T00:00:00`).getTime()) / 86400000
      )
    );

    return {
      startLabel: fmtDate(`${start.iso}T00:00:00`),
      endLabel: fmtDate(`${end.iso}T00:00:00`),
      durationDays,
      actualCurrent: +(s.completionPercentage || 0).toFixed(2),
      // null → template hides the tile entirely.
      variance: s.varianceKm == null ? null : +s.varianceKm.toFixed(1),
      scopeLabel: `${(s.completedKm || 0).toFixed(1)} / ${(s.totalScopeKm || 0).toFixed(1)} km`,
    };
  }

  // ── Progress Report hover tooltip ──────────────────────────────────────────

  /** Tooltip box size used for edge flipping; matches .chart-tooltip in CSS. */
  private static readonly TOOLTIP_W = 190;
  private static readonly TOOLTIP_H = 120;

  /**
   * Snap to the nearest plotted point under the cursor.
   *
   * The SVG scales to its container, so client px are converted to viewBox units
   * before comparing against the view model's own x values — using the model's
   * geometry rather than recomputing it keeps the marker and the tooltip aligned
   * with what is actually drawn.
   */
  onCumHover(event: MouseEvent): void {
    const chart = this.cumChart;
    const pts = this.cumFiltered;
    if (!chart || !pts.length) return;

    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const scaleX = chart.width / rect.width;
    const scaleY = chart.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    // Only the plot band responds vertically; horizontally the cursor is clamped
    // so the first and last points stay reachable from the axis gutters.
    if (y < chart.plot.y - 14 || y > chart.plot.y + chart.plot.h + 14) {
      this.clearCumHover();
      return;
    }

    let index = 0;
    let best = Infinity;
    chart.actualPoints.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < best) {
        best = d;
        index = i;
      }
    });

    const marker = chart.actualPoints[index];
    const point = pts[index];
    if (!marker || !point) return;

    // Convert back to CSS px, since the tooltip is an HTML element positioned in
    // the container rather than an SVG child.
    const cssX = marker.x / scaleX;
    const W = ExecutiveDashboardComponent.TOOLTIP_W;
    const H = ExecutiveDashboardComponent.TOOLTIP_H;
    const flip = cssX + 14 + W > rect.width;

    // Park the tooltip clear of the series: the curve climbs left-to-right, so sit
    // above it early on and below it once it has risen.
    const relY = chart.plot.h > 0 ? (marker.y - chart.plot.y) / chart.plot.h : 0;
    const plotTopCss = chart.plot.y / scaleY;
    const plotBottomCss = (chart.plot.y + chart.plot.h) / scaleY;
    const top = relY > 0.5 ? plotTopCss + 4 : Math.max(plotTopCss + 4, plotBottomCss - H - 4);

    this.cumHover = {
      point,
      index,
      left: flip ? cssX - 14 - W : cssX + 14,
      top: Math.max(4, top),
      flip,
    };
  }

  onCumLeave(): void {
    this.clearCumHover();
  }

  private clearCumHover(): void {
    this.cumHover = null;
  }

  /** Marker coordinates for the hovered point, in viewBox units. */
  get cumHoverMarker(): { x: number; y: number } | null {
    const i = this.cumHover?.index;
    if (i == null) return null;
    const p = this.cumChart?.actualPoints[i];
    return p ? { x: p.x, y: p.y } : null;
  }

  /** Full date for the tooltip heading — the axis only shows day + month. */
  get cumHoverDate(): string {
    const iso = this.cumHover?.point.iso;
    if (!iso) return '';

    const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
      d.toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });
    const start = new Date(`${iso}T00:00:00Z`);

    // Name the period, not the bucket key. A monthly point labelled "1 Jul 2026"
    // read as a single day's figure when it is in fact the whole of July — and it
    // disagreed with the plotted position, which is the period's end.
    if (this.cumGranularity === 'MONTHLY') {
      return fmt(start, { month: 'long', year: 'numeric' });
    }
    if (this.cumGranularity === 'WEEKLY') {
      const endMs = Math.min(
        start.getTime() + 6 * 86400000,
        new Date(`${this.cumStatusDate || this.today}T00:00:00Z`).getTime()
      );
      const end = new Date(endMs);
      const sameMonth = start.getUTCMonth() === end.getUTCMonth();
      return `${fmt(start, sameMonth ? { day: 'numeric' } : { day: 'numeric', month: 'short' })} – ${fmt(
        end,
        { day: 'numeric', month: 'short', year: 'numeric' }
      )}`;
    }
    return fmt(start, { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // ── Progress Report filter modal ──────────────────────────────────────────

  /** Seed the draft from what's currently applied, then open. */
  openPrFilter(): void {
    this.ensureCumDateDefaults();
    // Snap to Trenching if the applied phase is no longer offered — a model value
    // with no matching <option> renders the select blank.
    this.prDraftPhaseId = PR_PHASES.some(p => p.phaseId === this.cumPhaseId)
      ? this.cumPhaseId
      : '2';
    this.prDraftGranularity = this.cumGranularity;
    this.prDraftContractors = [...this.cumContractors];
    this.prFilterOpen = true;
  }

  /** Discard the draft — applied filters and the chart are untouched. */
  cancelPrFilter(): void {
    this.prFilterOpen = false;
  }

  /** Restore the card defaults in the draft. Nothing applies until Apply. */
  resetPrFilter(): void {
    this.prDraftPhaseId = '2';
    this.prDraftGranularity = 'DAILY';
    this.prDraftContractors = [];
  }

  /** Commit the draft and refetch once, rather than per control. */
  applyPrFilter(): void {
    // The window is no longer user-editable — keep whatever the card defaults to.
    this.cumPhaseId = this.prDraftPhaseId;
    this.cumGranularity = this.prDraftGranularity;
    // Normalise "everything ticked" to the canonical all-contractors form, so the
    // request and the header label have one representation of that state.
    this.cumContractors =
      this.prDraftContractors.length === this.cumContractorRoster.length
        ? []
        : [...this.prDraftContractors];
    this.prFilterOpen = false;
    this.loadAnalyticsHistory();
  }

  /** How many card filters differ from the defaults — shown on the icon. */
  get prActiveFilterCount(): number {
    let n = 0;
    if (this.cumPhaseId !== '2') n++;
    if (this.cumGranularity !== 'DAILY') n++;
    if (this.cumContractors.length) n++;
    return n;
  }

  /** Human-readable summary of the applied window, shown in the card header. */
  get cumGranularityLabel(): string {
    const map: Record<string, string> = { DAILY: 'Daily', WEEKLY: 'Weekly', MONTHLY: 'Monthly' };
    return map[this.cumGranularity] || this.cumGranularity;
  }

  /** The phases the Progress Report dropdown offers. */
  get prPhaseOptions(): PhaseHistoryPhase[] {
    return PR_PHASES;
  }

  /** Phase name for the card subtitle, so "Overall" is never ambiguous. */
  get cumPhaseLabel(): string {
    // PR_PHASES first: it carries the shortened "Backfilling" label the card uses.
    const match =
      PR_PHASES.find(p => String(p.phaseId) === String(this.cumPhaseId)) ||
      this.dailyPhaseOptions.find(p => String(p.phaseId) === String(this.cumPhaseId));
    return match?.phaseName || `Phase ${this.cumPhaseId}`;
  }

  // ── Contractor multi-select (draft state; nothing applies until Apply) ──────

  isPrContractorSelected(name: string): boolean {
    return this.prDraftContractors.includes(name);
  }

  togglePrContractor(name: string, checked: boolean): void {
    const next = this.prDraftContractors.filter((n) => n !== name);
    if (checked) next.push(name);
    // Deliberately not collapsed to [] on the last tick. Doing that mid-edit
    // cleared every box the user had just ticked, which read as the UI losing the
    // selection. Normalisation happens on Apply instead.
    this.prDraftContractors = next;
  }

  /** On when nothing specific is picked, or when everything is — same query. */
  get prAllContractorsSelected(): boolean {
    const n = this.prDraftContractors.length;
    return n === 0 || n === this.cumContractorRoster.length;
  }

  selectAllPrContractors(): void {
    this.prDraftContractors = [];
  }

  /** Applied selection, for the card header. */
  get cumContractorLabel(): string {
    const n = this.cumContractors.length;
    if (n === 0) return 'All contractors';
    if (n <= 2) return this.cumContractors.join(' + ');
    return `${this.cumContractors[0]} +${n - 1}`;
  }

  /**
   * Per-day work done for the selected phase. The API already returns daily
   * (non-cumulative) values, so each bar is the value for that day directly.
   * 'all' sums every phase; otherwise pick the selected phaseId.
   */
  get dailyPhaseValues(): { day: string; value: number }[] {
    const pick = (b: DailyBar): number =>
      this.dailyPhaseFilter === 'all'
        ? b.totalKm
        : (b.byPhase?.[this.dailyPhaseFilter] || 0);
    const inRange = this.dailyBars.filter(
      b => (!this.dailyFromDate || b.iso >= this.dailyFromDate) &&
           (!this.dailyToDate || b.iso <= this.dailyToDate)
    );
    return inRange.map((b) => ({ day: b.day, value: Math.max(0, pick(b)) }));
  }

  onDailyPhaseChange(): void {
    // Phase filtering is client-side (all phases are already loaded).
    setTimeout(() => this.drawDailyPhaseChart(), 30);
  }

  onDailyDateChange(): void {
    // Date window changed → refetch the aggregated series for the new range.
    this.loadDailyProgress();
  }

  private mapPhaseStackedData(data: ProgressSummaryResponse): void {
    if (!data.phaseBreakdown || data.phaseBreakdown.length === 0) return;
    // Group by phaseId
    const phaseMap = new Map<string, { completed: number; inProgress: number; pending: number; blocked: number }>();
    data.phaseBreakdown.forEach(pb => {
      const key = pb.phaseId ? `Phase ${pb.phaseId}` : 'Phase';
      const existing = phaseMap.get(key) || { completed: 0, inProgress: 0, pending: 0, blocked: 0 };
      existing.completed += pb.completedSegments || 0;
      existing.inProgress += pb.inProgressSegments || 0;
      existing.pending += pb.pendingSegments || 0;
      existing.blocked += pb.blockedSegments || 0;
      phaseMap.set(key, existing);
    });
    this.phaseStackedLabels = Array.from(phaseMap.keys());
    this.phaseStackedCompleted = Array.from(phaseMap.values()).map(v => v.completed);
    this.phaseStackedInProgress = Array.from(phaseMap.values()).map(v => v.inProgress);
    this.phaseStackedPending = Array.from(phaseMap.values()).map(v => v.pending);
    this.phaseStackedBlocked = Array.from(phaseMap.values()).map(v => v.blocked);
  }

  private mapContractorGauges(data: KpiDimensionsResponse): void {
    if (!data.contractors || data.contractors.length === 0) return;
    const circumference = 2 * Math.PI * 50; // r=50
    this.contractorGauges = data.contractors.map(c => {
      const pct = Math.round(c.completedPct || 0);
      const color = pct >= 75 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';
      const filled = (pct / 100) * circumference;
      const gap = circumference - filled;
      return {
        name: c.name,
        pct,
        color,
        dashArray: `${filled} ${gap}`,
      };
    });
  }

  private mapPacTimeline(data: PacStatusResponse): void {
    if (!data.certificates || data.certificates.length === 0) return;
    // Group certificates by month
    const monthMap = new Map<string, { approved: number; pending: number; rejected: number }>();
    data.certificates.forEach((cert: any) => {
      const dateStr = cert.submitted_at || cert.created_at;
      if (!dateStr) return;
      const d = new Date(dateStr);
      const monthKey = d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
      const existing = monthMap.get(monthKey) || { approved: 0, pending: 0, rejected: 0 };
      const status = (cert.status || '').toLowerCase();
      if (status === 'approved') existing.approved++;
      else if (status === 'rejected') existing.rejected++;
      else existing.pending++;
      monthMap.set(monthKey, existing);
    });
    this.pacTimelineMonths = Array.from(monthMap.keys());
    this.pacTimelineApproved = Array.from(monthMap.values()).map(v => v.approved);
    this.pacTimelinePending = Array.from(monthMap.values()).map(v => v.pending);
    this.pacTimelineRejected = Array.from(monthMap.values()).map(v => v.rejected);
  }

  // ── Row 5 & 6 Heatmap Helpers ─────────────────────────────────────────────

  getHeatmapBg(pct: number): string {
    if (pct >= 85) return 'rgba(34,197,94,0.35)';
    if (pct >= 70) return 'rgba(59,130,246,0.2)';
    if (pct >= 50) return 'rgba(245,158,11,0.2)';
    if (pct >= 30) return 'rgba(239,68,68,0.2)';
    if (pct > 0) return 'rgba(239,68,68,0.2)';
    return '#1e293b';
  }

  getHeatmapText(pct: number): string {
    if (pct >= 85) return '#22c55e';
    if (pct >= 70) return '#3b82f6';
    if (pct >= 50) return '#f59e0b';
    if (pct >= 30) return '#ef4444';
    if (pct > 0) return '#ef4444';
    return '#64748b';
  }

  // ── Row 5 & 6 Canvas Drawing Methods ──────────────────────────────────────

  drawContractorCompareChart(): void {
    if (!this.contractorCompareCanvas) return;
    if (this.contractorCompareNames.length === 0) return;
    const canvas = this.contractorCompareCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 20, right: 60, bottom: 20, left: 100 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const count = this.contractorCompareNames.length;

    const allVals = [...this.contractorComparePlanned, ...this.contractorCompareDeployed];
    const maxVal = Math.max(...allVals, 1) * 1.1;

    ctx.clearRect(0, 0, w, h);

    const barGroupH = chartH / count;
    const barH = Math.min(barGroupH * 0.35, 14);
    const gap = 3;

    for (let i = 0; i < count; i++) {
      const centerY = pad.top + barGroupH * i + barGroupH / 2;

      // Planned bar (blue)
      const plannedW = (this.contractorComparePlanned[i] / maxVal) * chartW;
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(pad.left, centerY - barH - gap / 2, plannedW, barH);

      // Deployed bar (green)
      const deployedW = (this.contractorCompareDeployed[i] / maxVal) * chartW;
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(pad.left, centerY + gap / 2, deployedW, barH);

      // Value labels
      ctx.fillStyle = this.getChartColors().label;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${this.contractorComparePlanned[i]}`, pad.left + plannedW + 4, centerY - gap / 2 - barH / 2 + 4);
      ctx.fillText(`${this.contractorCompareDeployed[i]}`, pad.left + deployedW + 4, centerY + gap / 2 + barH / 2 + 4);

      // Y-axis label
      ctx.fillStyle = this.getChartColors().text;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(this.contractorCompareNames[i], pad.left - 8, centerY + 4);
    }

    // X-axis gridlines
    ctx.strokeStyle = this.getChartColors().grid;
    ctx.lineWidth = 0.5;
    const xSteps = 4;
    for (let i = 0; i <= xSteps; i++) {
      const x = pad.left + (chartW / xSteps) * i;
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + chartH);
      ctx.stroke();
      ctx.fillStyle = this.getChartColors().labelDim;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      const val = Math.round((maxVal / xSteps) * i);
      ctx.fillText(val.toString(), x, pad.top + chartH + 14);
    }
  }

  drawTimelineTrendChart(): void {
    if (!this.timelineTrendCanvas) return;
    if (this.timelineDates.length === 0) return;
    const canvas = this.timelineTrendCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 25, right: 20, bottom: 40, left: 50 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const dataLen = this.timelineDates.length;

    const allVals = [...this.timelinePlanned, ...this.timelineCompleted];
    const maxVal = Math.max(...allVals, 1) * 1.15;

    ctx.clearRect(0, 0, w, h);

    // Grid lines & Y-axis
    const ySteps = 4;
    const yStep = Math.ceil(maxVal / ySteps / 100) * 100;
    ctx.strokeStyle = this.getChartColors().grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= ySteps; i++) {
      const tick = yStep * i;
      if (tick > maxVal * 1.2) break;
      const y = pad.top + chartH - (tick / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = this.getChartColors().label;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      const label = tick >= 1000 ? `${(tick / 1000).toFixed(tick % 1000 === 0 ? 0 : 1)}K` : tick.toString();
      ctx.fillText(label, pad.left - 8, y + 4);
    }

    // X-axis labels
    ctx.fillStyle = this.getChartColors().label;
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    const xLabelCount = Math.min(dataLen, 7);
    for (let i = 0; i < xLabelCount; i++) {
      const idx = Math.round((i / (xLabelCount - 1)) * (dataLen - 1));
      const x = pad.left + (idx / (dataLen - 1)) * chartW;
      ctx.fillText(this.timelineDates[idx], x, h - pad.bottom + 16);
    }

    // Planned line (blue dashed)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    this.timelinePlanned.forEach((val, i) => {
      const x = pad.left + (i / (dataLen - 1)) * chartW;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Completed line (green solid) with area fill
    ctx.fillStyle = 'rgba(34,197,94,0.1)';
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + chartH);
    this.timelineCompleted.forEach((val, i) => {
      const x = pad.left + (i / (dataLen - 1)) * chartW;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(pad.left + chartW, pad.top + chartH);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    this.timelineCompleted.forEach((val, i) => {
      const x = pad.left + (i / (dataLen - 1)) * chartW;
      const y = pad.top + chartH - (val / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  drawPhaseStackedChart(): void {
    if (!this.phaseStackedCanvas) return;
    if (this.phaseStackedLabels.length === 0) return;
    const canvas = this.phaseStackedCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 20, right: 15, bottom: 35, left: 45 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const count = this.phaseStackedLabels.length;

    const series = [
      this.phaseStackedCompleted,
      this.phaseStackedInProgress,
      this.phaseStackedPending,
      this.phaseStackedBlocked,
    ];
    const colors = ['#22c55e', '#3b82f6', '#64748b', '#ef4444'];

    // Find max value across all series
    let maxVal = 0;
    for (const s of series) {
      for (const v of s) {
        if (v > maxVal) maxVal = v;
      }
    }
    maxVal = Math.max(maxVal * 1.15, 1);

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = this.getChartColors().grid;
    ctx.lineWidth = 0.5;
    const ySteps = 4;
    for (let i = 0; i <= ySteps; i++) {
      const y = pad.top + (chartH / ySteps) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = this.getChartColors().labelDim;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal - (maxVal / ySteps) * i).toString(), pad.left - 6, y + 3);
    }

    // X positions for each data point
    const xStep = count > 1 ? chartW / (count - 1) : 0;
    const getX = (i: number) => pad.left + i * xStep;
    const getY = (val: number) => pad.top + chartH - (val / maxVal) * chartH;

    // Draw lines and dots for each series
    series.forEach((data, si) => {
      if (data.length === 0) return;
      const color = colors[si];

      // Draw line
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      for (let i = 0; i < count; i++) {
        const x = getX(i);
        const y = getY(data[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw dots and value labels
      for (let i = 0; i < count; i++) {
        const x = getX(i);
        const y = getY(data[i]);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = this.getChartColors().bg;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Value label above the dot
        if (data[i] > 0) {
          ctx.fillStyle = color;
          ctx.font = '9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(data[i].toString(), x, y - 8);
        }
      }
    });

    // X-axis labels
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = this.getChartColors().label;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.phaseStackedLabels[i], getX(i), h - pad.bottom + 14);
    }
  }

  // ── Phase-wise Progress / Layer wise Progress ─────────────────────────────
  //
  // Ported from the old dashboard (neotecx_dashbaord_ui), where both were
  // Highcharts configs: `phaseChartOptions` (stacked % column) and
  // `phaseBarChartOptions` (grouped horizontal bar). This app has no chart
  // library, so they are redrawn here in the same Canvas 2D idiom as the other
  // charts — same titles, series names, colours and axis formats.

  @ViewChild('phaseWiseCanvas', { static: false })
  phaseWiseCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('layerWiseCanvas', { static: false })
  layerWiseCanvas!: ElementRef<HTMLCanvasElement>;

  /** Phase-wise Progress: percentages of the total route length, per phase. */
  phaseWiseLabels: string[] = [];
  phaseWiseCompletedPct: number[] = [];
  phaseWiseInProgressPct: number[] = [];
  phaseWisePendingPct: number[] = [];
  /** Metres behind those percentages — the old tooltip showed both. */
  phaseWiseCompletedM: number[] = [];
  phaseWiseInProgressM: number[] = [];
  phaseWisePendingM: number[] = [];

  /** Layer wise Progress: km per phase, split by approval state. */
  layerWiseLabels: string[] = [];
  layerWiseApprovedKm: number[] = [];
  layerWiseInProgressKm: number[] = [];
  layerWiseRejectedKm: number[] = [];
  /** Per-phase total, for the tooltip's "Total:" line. */
  layerWiseTotalKm: number[] = [];

  /**
   * Hover bands captured during draw, so the tooltip can hit-test without
   * re-deriving the layout. One entry per category, in draw order.
   */
  private phaseWiseBands: Array<{ from: number; to: number }> = [];
  private layerWiseBands: Array<{ from: number; to: number }> = [];

  phaseWiseHover: ExecChartHover | null = null;
  layerWiseHover: ExecChartHover | null = null;

  /**
   * Load both charts.
   *
   * Filter-aware on all four dimensions the filter bar offers, but by two
   * different routes:
   *
   *   contractor / ring / project — sent to the API, which honours them. Ring
   *     and project are one upstream call per combination (see fanOutByRing).
   *   phase — applied HERE, on the response. Both endpoints accept `phaseId`
   *     and then ignore it: they answer with all 15 phases whatever is sent,
   *     so forwarding it would silently do nothing.
   *
   * The phase dropdown holds phase *names* (getDashboardFilters builds `steps`
   * from contractor-project-status' phaseBreakdown), and those names are the
   * same strings both endpoints put in `phaseName` — so the rows are matched
   * by name, not by id.
   *
   * Failures are logged and leave the previous render in place rather than
   * blanking the cards.
   */
  private async loadPhaseProgressCharts(filters: Record<string, string>): Promise<void> {
    const params = {
      contractor: filters['contractor'],
      ringId: filters['ringId'],
      ringIds: filters['ringIds'],
      projectId: filters['projectId'],
      linkIds: filters['linkIds'],
    };
    const [wise, dist] = await Promise.allSettled([
      getPhaseWiseProgress(params),
      getPhaseDistribution(params),
    ]);
    const phases = this.selectedPhaseNames(filters['phaseId']);
    if (wise.status === 'fulfilled') {
      this.mapPhaseWiseProgress(this.keepSelectedPhases(wise.value ?? [], phases));
    } else {
      console.warn('Phase-wise progress load failed', wise.reason);
    }
    if (dist.status === 'fulfilled') {
      this.mapLayerWiseProgress(this.keepSelectedPhases(dist.value ?? [], phases));
    } else {
      console.warn('Phase distribution load failed', dist.reason);
    }
    setTimeout(() => {
      this.drawPhaseWiseProgressChart();
      this.drawLayerWiseProgressChart();
    }, 50);
  }

  /**
   * The phase filter as a lower-cased name set, or null when it is inactive.
   *
   * buildFilterParams() puts the selected phase *names* in `phaseId`, and only
   * when the selection is a strict subset — everything selected means the same
   * as nothing selected, so both arrive here as null.
   */
  private selectedPhaseNames(phaseId: string | undefined): Set<string> | null {
    const names = (phaseId ?? '')
      .split(',')
      .map((n) => n.trim().toLowerCase())
      .filter((n) => n !== '');
    return names.length ? new Set(names) : null;
  }

  /** Keep only the rows whose phaseName is in `names`; all of them when null. */
  private keepSelectedPhases<T extends { phaseName?: string }>(
    rows: T[],
    names: Set<string> | null
  ): T[] {
    if (!names) return rows;
    return rows.filter((r) => names.has(String(r?.phaseName ?? '').trim().toLowerCase()));
  }

  /**
   * Man Holes, Hand Holes and Marker Post are counted items, not route length,
   * so their completed / in-progress / pending figures are numbers ("nos").
   */
  private phaseWiseUnit(phaseName: string): 'm' | 'nos' {
    const n = phaseName.toLowerCase().replace(/[^a-z]/g, '');
    return /^(manhole|handhole|markerpost)s?$/.test(n) ? 'nos' : 'm';
  }

  private mapPhaseWiseProgress(rows: PhaseWiseProgressRow[]): void {
    this.phaseWiseLabels = rows.map((r) => String(r?.phaseName ?? ''));
    this.phaseWiseCompletedPct = rows.map((r) => Number(r?.completedPercent) || 0);
    this.phaseWiseInProgressPct = rows.map((r) => Number(r?.inProgressPercent) || 0);
    this.phaseWisePendingPct = rows.map((r) => Number(r?.pendingPercent) || 0);
    this.phaseWiseCompletedM = rows.map((r) => Number(r?.completedM) || 0);
    this.phaseWiseInProgressM = rows.map((r) => Number(r?.inProgressM) || 0);
    this.phaseWisePendingM = rows.map((r) => Number(r?.pendingM) || 0);
  }

  private mapLayerWiseProgress(rows: PhaseDistributionRow[]): void {
    const toKm = (v: unknown) => +(((Number(v) || 0) / 1000).toFixed(3));
    this.layerWiseLabels = rows.map((r) => String(r?.phaseName ?? ''));
    this.layerWiseApprovedKm = rows.map((r) => toKm(r?.completed));
    // Submitted + PM-approved is work done but not yet client-approved — the
    // same "In Progress" definition the old dashboard used.
    this.layerWiseInProgressKm = rows.map(
      (r) => toKm((Number(r?.submitted) || 0) + (Number(r?.pmApproved) || 0))
    );
    this.layerWiseRejectedKm = rows.map((r) => toKm(r?.rejected));
    this.layerWiseTotalKm = rows.map((r) => toKm(r?.total));
  }

  /** Long phase names overflow the axis; clip them the way the old chart did. */
  private clipLabel(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let clipped = text;
    while (clipped.length > 1 && ctx.measureText(`${clipped}...`).width > maxWidth) {
      clipped = clipped.slice(0, -1);
    }
    return `${clipped}...`;
  }

  /**
   * Phase-wise Progress — stacked columns on a fixed 0-100% axis.
   *
   * Stack order is bottom-to-top Pending / In Progress / Approved, which is what
   * the old chart rendered: Highcharts' `yAxis.reversedStacks` defaults to true,
   * so its declared series order came out inverted on screen.
   *
   * Segment labels are drawn only where the segment is tall enough to hold one.
   * The old chart labelled every segment, so near-zero phases printed several
   * "0.0%" on top of each other; the numbers here are identical, just not
   * overprinted.
   */
  drawPhaseWiseProgressChart(): void {
    if (!this.phaseWiseCanvas) return;
    const canvas = this.phaseWiseCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);
    this.phaseWiseBands = [];
    const count = this.phaseWiseLabels.length;
    if (count === 0) return;

    const tc = this.getChartColors();
    const pad = { top: 14, right: 12, bottom: 92, left: 58 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    if (chartW <= 0 || chartH <= 0) return;

    // Y axis: fixed 0-100%, gridlines at 0 / 50 / 100 as in the old chart.
    ctx.strokeStyle = tc.grid;
    ctx.lineWidth = 0.5;
    const ySteps = 2;
    for (let i = 0; i <= ySteps; i++) {
      const value = (100 / ySteps) * i;
      const y = pad.top + chartH - (value / 100) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = tc.labelDim;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${value.toFixed(2)}%`, pad.left - 6, y + 3);
    }

    // Y axis title, rotated.
    ctx.save();
    ctx.translate(12, pad.top + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = tc.label;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Progress (%)', 0, 0);
    ctx.restore();

    const slot = chartW / count;
    const barW = Math.min(slot * 0.62, 34);
    // Bottom-to-top, matching the old chart's rendered order.
    const stack: Array<{ values: number[]; color: string }> = [
      { values: this.phaseWisePendingPct, color: '#e11919' },
      { values: this.phaseWiseInProgressPct, color: '#f59e0b' },
      { values: this.phaseWiseCompletedPct, color: '#22c55e' },
    ];

    for (let i = 0; i < count; i++) {
      const cx = pad.left + slot * i + slot / 2;
      const x = cx - barW / 2;
      this.phaseWiseBands.push({ from: pad.left + slot * i, to: pad.left + slot * (i + 1) });

      let baseline = pad.top + chartH;
      for (const series of stack) {
        const value = Number(series.values[i]) || 0;
        if (value <= 0) continue;
        const segH = (value / 100) * chartH;
        const y = baseline - segH;
        ctx.fillStyle = series.color;
        ctx.fillRect(x, y, barW, segH);
        // Only label a segment that can actually hold the text.
        if (segH >= 14) {
          ctx.fillStyle = '#0b1220';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`${value.toFixed(1)}%`, cx, y + segH / 2 + 3);
        }
        baseline = y;
      }

      // X label, rotated -45deg so long phase names fit.
      ctx.save();
      ctx.translate(cx, h - pad.bottom + 8);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = tc.label;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(this.clipLabel(ctx, this.phaseWiseLabels[i], 96), 0, 0);
      ctx.restore();
    }
  }

  /**
   * Layer wise Progress — grouped horizontal bars in km.
   *
   * Non-zero bars get a 5px floor, as the old chart's `minPointLength: 5` did,
   * so a phase with a few metres of work still shows a sliver instead of
   * nothing. Values under 0.01 km stay unlabelled, also as before.
   */
  drawLayerWiseProgressChart(): void {
    if (!this.layerWiseCanvas) return;
    const canvas = this.layerWiseCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);
    this.layerWiseBands = [];
    const count = this.layerWiseLabels.length;
    if (count === 0) return;

    const tc = this.getChartColors();
    const pad = { top: 10, right: 58, bottom: 44, left: 128 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    if (chartW <= 0 || chartH <= 0) return;

    const series: Array<{ values: number[]; color: string }> = [
      { values: this.layerWiseApprovedKm, color: '#22c55e' },
      { values: this.layerWiseInProgressKm, color: '#f59e0b' },
      { values: this.layerWiseRejectedKm, color: '#e11919' },
    ];
    const maxVal = Math.max(
      ...series.flatMap((s) => s.values.map((v) => Number(v) || 0)),
      1
    ) * 1.12;

    // X gridlines + km labels.
    ctx.strokeStyle = tc.grid;
    ctx.lineWidth = 0.5;
    const xSteps = 5;
    for (let i = 0; i <= xSteps; i++) {
      const value = (maxVal / xSteps) * i;
      const x = pad.left + (chartW / xSteps) * i;
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + chartH);
      ctx.stroke();
      ctx.fillStyle = tc.labelDim;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round(value)} km`, x, pad.top + chartH + 14);
    }
    ctx.fillStyle = tc.label;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Length (km)', pad.left + chartW / 2, h - 6);

    const slot = chartH / count;
    const groupH = Math.min(slot * 0.78, 22);
    const barH = Math.max(groupH / series.length - 1, 2);

    for (let i = 0; i < count; i++) {
      const top = pad.top + slot * i + (slot - groupH) / 2;
      this.layerWiseBands.push({ from: pad.top + slot * i, to: pad.top + slot * (i + 1) });

      series.forEach((s, si) => {
        const value = Number(s.values[i]) || 0;
        const y = top + si * (barH + 1);
        if (value > 0) {
          // minPointLength: keep a sliver visible for tiny-but-real values.
          const barW = Math.max((value / maxVal) * chartW, 5);
          ctx.fillStyle = s.color;
          ctx.fillRect(pad.left, y, barW, barH);
          if (value >= 0.01) {
            ctx.fillStyle = tc.text;
            ctx.font = '9px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(value.toFixed(2), pad.left + barW + 4, y + barH / 2 + 3);
          }
        }
      });

      ctx.fillStyle = tc.text;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(
        this.clipLabel(ctx, this.layerWiseLabels[i], pad.left - 12),
        pad.left - 8,
        top + groupH / 2 + 3
      );
    }
  }

  // ── Shared tooltips for the two ported charts ────────────────────────────
  //
  // The old charts had Highcharts' shared tooltip, which carried the metre /
  // total figures the on-bar labels leave out. Reproduced with the same HTML
  // overlay pattern the forecast chart uses.

  private hoverIndex(
    bands: Array<{ from: number; to: number }>,
    position: number
  ): number {
    return bands.findIndex((b) => position >= b.from && position < b.to);
  }

  onPhaseWiseHover(event: MouseEvent): void {
    const host = event.currentTarget as HTMLElement | null;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const index = this.hoverIndex(this.phaseWiseBands, event.clientX - rect.left);
    if (index < 0 || index >= this.phaseWiseLabels.length) {
      this.phaseWiseHover = null;
      return;
    }
    const unit = this.phaseWiseUnit(this.phaseWiseLabels[index]);
    const metres = (value: number) => `${Math.round(value).toLocaleString('en-IN')} ${unit}`;
    this.phaseWiseHover = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      title: this.phaseWiseLabels[index],
      rows: [
        {
          label: 'Approved (Client)',
          color: '#22c55e',
          value: `${this.phaseWiseCompletedPct[index].toFixed(2)}% (${metres(this.phaseWiseCompletedM[index])})`,
        },
        {
          label: 'In Progress',
          color: '#f59e0b',
          value: `${this.phaseWiseInProgressPct[index].toFixed(2)}% (${metres(this.phaseWiseInProgressM[index])})`,
        },
        {
          label: 'Pending',
          color: '#e11919',
          value: `${this.phaseWisePendingPct[index].toFixed(2)}% (${metres(this.phaseWisePendingM[index])})`,
        },
      ],
    };
  }

  onLayerWiseHover(event: MouseEvent): void {
    const host = event.currentTarget as HTMLElement | null;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const index = this.hoverIndex(this.layerWiseBands, event.clientY - rect.top);
    if (index < 0 || index >= this.layerWiseLabels.length) {
      this.layerWiseHover = null;
      return;
    }
    this.layerWiseHover = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      title: this.layerWiseLabels[index],
      rows: [
        { label: 'Approved (Client)', color: '#22c55e', value: `${this.layerWiseApprovedKm[index].toFixed(3)} km` },
        { label: 'In Progress', color: '#f59e0b', value: `${this.layerWiseInProgressKm[index].toFixed(3)} km` },
        { label: 'Rejected', color: '#e11919', value: `${this.layerWiseRejectedKm[index].toFixed(3)} km` },
      ],
      footer: `Total: ${this.layerWiseTotalKm[index].toFixed(3)} km`,
    };
  }

  clearPhaseWiseHover(): void {
    this.phaseWiseHover = null;
  }

  clearLayerWiseHover(): void {
    this.layerWiseHover = null;
  }

  // ── Trenching-type-wise Progress (/api/dashboard/trenching-type-wise-progress) ──
  //
  // Two views of the same response: a line chart of how far each trench profile
  // (G1, T1, …) has got, and a donut of how the work is distributed — by
  // planned length per profile, or by the excavation volume the profiles imply.
  //
  // The profile is a property of the trench, not a stage of work, so the phase
  // filter does not apply here; contractor / ring / link do, and go to the API.

  @ViewChild('trenchingProgressCanvas', { static: false })
  trenchingProgressCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trenchingSplitCanvas', { static: false })
  trenchingSplitCanvas!: ElementRef<HTMLCanvasElement>;

  /** One entry per trench profile, in the order the API returns them. */
  trenchingRows: TrenchingTypeProgressRow[] = [];
  /** Project-wide excavation totals that head the response. */
  trenchingTotals: TrenchingTypeProgressResponse = emptyTrenchingTypeProgress();
  /** True until the first response lands, so the card opens on a spinner
      rather than flashing its empty state. */
  trenchingLoading = true;

  /** Which split the donut shows. */
  trenchingSplitMode: 'length' | 'volume' = 'length';

  /** Donut slices for the current mode — also drives the HTML legend. */
  trenchingSplitSlices: Array<{
    label: string;
    title: string;
    value: number;
    percent: number;
    color: string;
  }> = [];
  /** Unit and centre caption of the current split. */
  trenchingSplitUnit = 'km';
  trenchingSplitTotal = 0;

  /** Categorical palette, cycled when there are more profiles than colours. */
  private readonly trenchingPalette = [
    '#3b82f6', '#22c55e', '#f59e0b', '#a855f7',
    '#06b6d4', '#e11919', '#eab308', '#14b8a6',
  ];

  /** Hit-test bands: x ranges for the line chart, angle ranges for the donut. */
  private trenchingBands: Array<{ from: number; to: number }> = [];
  private trenchingSliceArcs: Array<{ from: number; to: number }> = [];
  private trenchingDonut: { cx: number; cy: number; rInner: number; rOuter: number } | null = null;

  trenchingProgressHover: ExecChartHover | null = null;
  trenchingSplitHover: ExecChartHover | null = null;

  /**
   * Load both trenching-type cards.
   *
   * Failures leave the previous render in place rather than blanking the cards,
   * the same way the phase charts behave. The endpoint is newer than the rest
   * of the dashboard, so a host that has not deployed it yet answers 404 and
   * the cards simply stay empty.
   */
  private async loadTrenchingTypeProgress(filters: Record<string, string>): Promise<void> {
    this.trenchingLoading = true;
    try {
      const data = await getTrenchingTypeWiseProgress({
        contractor: filters['contractor'],
        ringId: filters['ringId'],
        ringIds: filters['ringIds'],
        projectId: filters['projectId'],
        linkIds: filters['linkIds'],
      });
      this.trenchingTotals = data;
      this.trenchingRows = Array.isArray(data?.trenchingTypes) ? data.trenchingTypes : [];
      this.buildTrenchingSplitSlices();
    } catch (error) {
      console.warn('Trenching-type-wise progress load failed', error);
    } finally {
      this.trenchingLoading = false;
    }
    setTimeout(() => {
      this.drawTrenchingProgressChart();
      this.drawTrenchingSplitChart();
    }, 50);
  }

  /** Short label for a profile: its code, falling back to the id. */
  private trenchingCode(row: TrenchingTypeProgressRow): string {
    return String(row?.trenchingTypeCode ?? '').trim() || `#${row?.trenchingTypeId ?? ''}`;
  }

  /**
   * Rebuild the donut's slices for the selected mode.
   *
   * Length is per profile; volume is the project-wide rock / sand / extra
   * excavation totals, which are reported once for the whole response rather
   * than per profile.
   */
  private buildTrenchingSplitSlices(): void {
    if (this.trenchingSplitMode === 'volume') {
      const slices = [
        { label: 'Rock', title: 'Rock excavation', value: Number(this.trenchingTotals.totalRockVolume) || 0, color: '#f59e0b' },
        { label: 'Sand', title: 'Sand excavation', value: Number(this.trenchingTotals.totalSandVolume) || 0, color: '#3b82f6' },
        { label: 'Extra excavation', title: 'Extra excavation', value: Number(this.trenchingTotals.totalExtraExcavationVolume) || 0, color: '#a855f7' },
      ].filter((s) => s.value > 0);
      const total = slices.reduce((sum, s) => sum + s.value, 0);
      this.trenchingSplitUnit = 'm³';
      this.trenchingSplitTotal = total;
      this.trenchingSplitSlices = slices.map((s) => ({
        ...s,
        percent: total > 0 ? (s.value / total) * 100 : 0,
      }));
      return;
    }

    const rows = this.trenchingRows.filter((r) => (Number(r?.totalM) || 0) > 0);
    const totalKm = rows.reduce((sum, r) => sum + (Number(r.totalM) || 0), 0) / 1000;
    this.trenchingSplitUnit = 'km';
    this.trenchingSplitTotal = totalKm;
    this.trenchingSplitSlices = rows.map((row, i) => {
      const km = (Number(row.totalM) || 0) / 1000;
      return {
        label: this.trenchingCode(row),
        title: String(row.trenchingTypeName ?? ''),
        value: km,
        percent: totalKm > 0 ? (km / totalKm) * 100 : 0,
        color: this.trenchingPalette[i % this.trenchingPalette.length],
      };
    });
  }

  /** Mode switch on the donut card — no refetch, the response holds both. */
  onTrenchingSplitModeChange(): void {
    this.trenchingSplitHover = null;
    this.buildTrenchingSplitSlices();
    this.drawTrenchingSplitChart();
  }

  /**
   * Trenching Type Progress — one stacked bar per profile.
   *
   * The axis is a fixed 0-100%: each profile's three percentages are shares of
   * its OWN planned length, so the lines are comparable across profiles of very
   * different sizes (T1 carries 517 km, T6 carries 16 m).
   */
  drawTrenchingProgressChart(): void {
    if (!this.trenchingProgressCanvas) return;
    const canvas = this.trenchingProgressCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);
    this.trenchingBands = [];
    const count = this.trenchingRows.length;
    if (count === 0) return;

    const tc = this.getChartColors();
    const pad = { top: 22, right: 16, bottom: 58, left: 48 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    if (chartW <= 0 || chartH <= 0) return;

    // Y axis: 0-100% in 25s.
    ctx.strokeStyle = tc.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const value = 25 * i;
      const y = pad.top + chartH - (value / 100) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = tc.labelDim;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${value}%`, pad.left - 6, y + 3);
    }

    ctx.save();
    ctx.translate(12, pad.top + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = tc.label;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Share of profile length (%)', 0, 0);
    ctx.restore();

    const slot = chartW / count;
    const xAt = (i: number) => pad.left + slot * i + slot / 2;
    const yAt = (percent: number) =>
      pad.top + chartH - (Math.max(0, Math.min(100, percent)) / 100) * chartH;

    const series: Array<{ values: number[]; color: string }> = [
      { values: this.trenchingRows.map((r) => Number(r?.completedPercent) || 0), color: '#22c55e' },
      { values: this.trenchingRows.map((r) => Number(r?.inProgressPercent) || 0), color: '#f59e0b' },
      { values: this.trenchingRows.map((r) => Number(r?.pendingPercent) || 0), color: '#e11919' },
    ];

    // One stacked bar per profile: Completed at the base, then In Progress,
    // then Pending — together 100% of that profile's own length.
    const barW = Math.max(8, Math.min(56, slot * 0.55));
    this.trenchingRows.forEach((_, i) => {
      const x = xAt(i) - barW / 2;
      let acc = 0;
      for (const s of series) {
        const value = Math.max(0, s.values[i]);
        if (value <= 0) continue;
        const y0 = yAt(acc);
        const y1 = yAt(acc + value);
        ctx.fillStyle = s.color;
        ctx.fillRect(x, y1, barW, y0 - y1);
        acc += value;
      }
    });

    // Completion figure above each bar.
    ctx.fillStyle = tc.text;
    ctx.font = `bold ${slot >= 46 ? 10 : 8}px sans-serif`;
    ctx.textAlign = 'center';
    series[0].values.forEach((value, i) => {
      const top = series.reduce((sum, s) => sum + Math.max(0, s.values[i]), 0);
      ctx.fillText(`${value.toFixed(1)}%`, xAt(i), yAt(Math.max(top, value)) - 5);
    });

    // X labels: profile code, with its planned length underneath.
    this.trenchingRows.forEach((row, i) => {
      this.trenchingBands.push({ from: pad.left + slot * i, to: pad.left + slot * (i + 1) });
      const x = xAt(i);
      ctx.fillStyle = tc.text;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.clipLabel(ctx, this.trenchingCode(row), slot - 4), x, h - pad.bottom + 18);
      ctx.fillStyle = tc.labelDim;
      ctx.font = '9px sans-serif';
      ctx.fillText(
        this.clipLabel(ctx, `${((Number(row?.totalM) || 0) / 1000).toFixed(2)} km`, slot - 4),
        x,
        h - pad.bottom + 32
      );
    });

    ctx.fillStyle = tc.label;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Trenching type', pad.left + chartW / 2, h - 6);
  }

  /**
   * Trenching split — a donut of the current mode's slices.
   *
   * Legend lives in the template rather than on the canvas: with one slice per
   * profile it needs to wrap, which HTML does and Canvas text does not.
   */
  drawTrenchingSplitChart(): void {
    if (!this.trenchingSplitCanvas) return;
    const canvas = this.trenchingSplitCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);
    this.trenchingSliceArcs = [];
    this.trenchingDonut = null;

    const total = this.trenchingSplitSlices.reduce((sum, s) => sum + s.value, 0);
    if (total <= 0) return;

    const tc = this.getChartColors();
    const cx = w / 2;
    const cy = h / 2;
    const rOuter = Math.max(Math.min(cx, cy) - 12, 10);
    const rInner = rOuter * 0.62;
    this.trenchingDonut = { cx, cy, rInner, rOuter };

    let start = -Math.PI / 2;
    for (const slice of this.trenchingSplitSlices) {
      const angle = (slice.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, rOuter, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      this.trenchingSliceArcs.push({ from: start, to: start + angle });
      start += angle;
    }

    // Hole + centre total.
    ctx.beginPath();
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2);
    ctx.fillStyle = tc.bg;
    ctx.fill();

    ctx.fillStyle = tc.text;
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.formatTrenchingValue(total), cx, cy - 1);
    ctx.fillStyle = tc.label;
    ctx.font = '10px sans-serif';
    ctx.fillText(
      this.trenchingSplitMode === 'volume' ? `Total m³` : 'Total km',
      cx,
      cy + 14
    );

    // Slice labels, only where the wedge is wide enough to hold one.
    ctx.font = 'bold 9px sans-serif';
    this.trenchingSplitSlices.forEach((slice, i) => {
      const arc = this.trenchingSliceArcs[i];
      if (!arc || arc.to - arc.from < 0.28) return;
      const mid = (arc.from + arc.to) / 2;
      const r = rInner + (rOuter - rInner) / 2;
      ctx.fillStyle = '#0b1220';
      ctx.fillText(`${slice.percent.toFixed(0)}%`, cx + Math.cos(mid) * r, cy + Math.sin(mid) * r + 3);
    });
  }

  /** Thousands separators for km, plain rounding for m³ — the scales differ. */
  formatTrenchingValue(value: number): string {
    if (this.trenchingSplitMode === 'volume') {
      return Math.round(value).toLocaleString('en-IN');
    }
    return value >= 100 ? Math.round(value).toLocaleString('en-IN') : value.toFixed(2);
  }

  onTrenchingProgressHover(event: MouseEvent): void {
    const host = event.currentTarget as HTMLElement | null;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const index = this.hoverIndex(this.trenchingBands, event.clientX - rect.left);
    const row = this.trenchingRows[index];
    if (index < 0 || !row) {
      this.trenchingProgressHover = null;
      return;
    }
    const metres = (value: number) => `${Math.round(Number(value) || 0).toLocaleString('en-IN')} m`;
    this.trenchingProgressHover = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      title: `${this.trenchingCode(row)} — ${row.trenchingTypeName}`,
      rows: [
        {
          label: 'Completed',
          color: '#22c55e',
          value: `${(Number(row.completedPercent) || 0).toFixed(2)}% (${metres(row.completedM)})`,
        },
        {
          label: 'In Progress',
          color: '#f59e0b',
          value: `${(Number(row.inProgressPercent) || 0).toFixed(2)}% (${metres(row.inProgressM)})`,
        },
        {
          label: 'Pending',
          color: '#e11919',
          value: `${(Number(row.pendingPercent) || 0).toFixed(2)}% (${metres(row.pendingM)})`,
        },
        {
          label: 'Rock',
          color: '#a855f7',
          value: `${(Number(row.rockPercentage) || 0).toFixed(1)}% of segments`,
        },
      ],
      footer:
        `Total ${metres(row.totalM)} · ${Number(row.segmentCount) || 0} segments · ` +
        `${Number(row.widthMm) || 0}x${Number(row.heightMm) || 0} mm`,
    };
  }

  /** Hit-test the donut: inside the ring, the angle picks the slice. */
  onTrenchingSplitHover(event: MouseEvent): void {
    const host = event.currentTarget as HTMLElement | null;
    const donut = this.trenchingDonut;
    if (!host || !donut) return;
    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = x - donut.cx;
    const dy = y - donut.cy;
    const distance = Math.hypot(dx, dy);
    if (distance < donut.rInner || distance > donut.rOuter) {
      this.trenchingSplitHover = null;
      return;
    }
    // Slices start at -90°, so normalise into the same [-PI/2, 3PI/2) sweep.
    let angle = Math.atan2(dy, dx);
    if (angle < -Math.PI / 2) angle += Math.PI * 2;
    const index = this.trenchingSliceArcs.findIndex((a) => angle >= a.from && angle < a.to);
    const slice = this.trenchingSplitSlices[index];
    if (index < 0 || !slice) {
      this.trenchingSplitHover = null;
      return;
    }
    this.trenchingSplitHover = {
      x,
      y,
      title: slice.title || slice.label,
      rows: [
        {
          label: this.trenchingSplitMode === 'volume' ? 'Volume' : 'Planned length',
          color: slice.color,
          value: `${this.formatTrenchingValue(slice.value)} ${this.trenchingSplitUnit}`,
        },
        { label: 'Share', color: slice.color, value: `${slice.percent.toFixed(2)}%` },
      ],
    };
  }

  clearTrenchingProgressHover(): void {
    this.trenchingProgressHover = null;
  }

  clearTrenchingSplitHover(): void {
    this.trenchingSplitHover = null;
  }

  // ── Work Progress (ported from the old dashboard's donut) ────────────────
  //
  // Same data and behaviour as neotecx_dashbaord_ui's "Work Progress" pie:
  // progress-summary split into Approved (Client) / Work Pending for Approval /
  // Pending, total length in the centre. Clicking a slice (or its legend entry)
  // selects it, greys out the rest and swaps the centre to that slice's share;
  // clicking it again resets.

  @ViewChild('workProgressCanvas', { static: false })
  workProgressCanvas!: ElementRef<HTMLCanvasElement>;

  workProgressSlices: Array<{ label: string; km: number; percent: number; color: string }> = [];
  workProgressTotalKm = 0;
  workProgressSelected: number | null = null;
  workProgressHover: ExecChartHover | null = null;

  private workProgressArcs: Array<{ from: number; to: number }> = [];
  private workProgressDonut: { cx: number; cy: number; rInner: number; rOuter: number } | null = null;

  private buildWorkProgressSlices(data: ProgressSummaryResponse): void {
    const t = data?.grandTotal;
    const totalKm = Number(t?.totalPlannedKm) || 0;
    const pct = (km: number) => (totalKm > 0 ? (km / totalKm) * 100 : 0);
    const approved = Number(t?.completedKm) || 0;
    const inProgress = Number(t?.inProgressKm) || 0;
    const pending = Number(t?.pendingKm) || 0;

    this.workProgressTotalKm = totalKm;
    this.workProgressSelected = null;
    this.workProgressHover = null;
    this.workProgressSlices = totalKm > 0
      ? [
          { label: 'Approved (Client)', km: approved, percent: pct(approved), color: '#22c55e' },
          { label: 'Work Pending for Approval', km: inProgress, percent: pct(inProgress), color: '#f59e0b' },
          { label: 'Pending', km: pending, percent: pct(pending), color: '#e11919' },
        ]
      : [];
    setTimeout(() => this.drawWorkProgressChart(), 50);
  }

  drawWorkProgressChart(): void {
    if (!this.workProgressCanvas) return;
    const canvas = this.workProgressCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);
    this.workProgressArcs = [];
    this.workProgressDonut = null;

    const sum = this.workProgressSlices.reduce((acc, sl) => acc + sl.percent, 0);
    if (sum <= 0) return;

    const tc = this.getChartColors();
    const cx = w / 2;
    const cy = h / 2;
    const rOuter = Math.max(Math.min(cx, cy) - 12, 10);
    const rInner = rOuter * 0.7;
    this.workProgressDonut = { cx, cy, rInner, rOuter };
    const selected = this.workProgressSelected;

    let start = -Math.PI / 2;
    this.workProgressSlices.forEach((slice, i) => {
      const angle = (slice.percent / sum) * Math.PI * 2;
      ctx.globalAlpha = selected === null || selected === i ? 1 : 0.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, selected === i ? rOuter + 6 : rOuter, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      this.workProgressArcs.push({ from: start, to: start + angle });
      start += angle;
    });
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2);
    ctx.fillStyle = tc.bg;
    ctx.fill();

    // Centre: total length, or the selected slice's share and length.
    const sel = selected !== null ? this.workProgressSlices[selected] : null;
    ctx.textAlign = 'center';
    ctx.fillStyle = tc.text;
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(
      sel ? `${sel.percent.toFixed(2)}%` : `${this.workProgressTotalKm.toFixed(2)} km`,
      cx,
      cy - 2
    );
    ctx.fillStyle = tc.label;
    ctx.font = '11px sans-serif';
    if (sel) {
      ctx.fillText(sel.label, cx, cy + 16);
      ctx.fillText(`(${sel.km.toFixed(2)} km)`, cx, cy + 30);
    } else {
      ctx.fillText('Total Length', cx, cy + 16);
    }
  }

  /** Select a slice, or reset when it is already selected (old dashboard behaviour). */
  toggleWorkProgressSlice(index: number): void {
    if (index < 0 || index >= this.workProgressSlices.length) return;
    this.workProgressSelected = this.workProgressSelected === index ? null : index;
    this.drawWorkProgressChart();
  }

  private workProgressSliceAt(event: MouseEvent): { index: number; x: number; y: number } {
    const host = event.currentTarget as HTMLElement | null;
    const donut = this.workProgressDonut;
    if (!host || !donut) return { index: -1, x: 0, y: 0 };
    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = x - donut.cx;
    const dy = y - donut.cy;
    const distance = Math.hypot(dx, dy);
    if (distance < donut.rInner || distance > donut.rOuter + 6) return { index: -1, x, y };
    // Slices start at -90°, so normalise into the same [-PI/2, 3PI/2) sweep.
    let angle = Math.atan2(dy, dx);
    if (angle < -Math.PI / 2) angle += Math.PI * 2;
    return { index: this.workProgressArcs.findIndex((a) => angle >= a.from && angle < a.to), x, y };
  }

  onWorkProgressClick(event: MouseEvent): void {
    const { index } = this.workProgressSliceAt(event);
    if (index >= 0) this.toggleWorkProgressSlice(index);
  }

  onWorkProgressHover(event: MouseEvent): void {
    const { index, x, y } = this.workProgressSliceAt(event);
    const slice = this.workProgressSlices[index];
    if (index < 0 || !slice) {
      this.workProgressHover = null;
      return;
    }
    this.workProgressHover = {
      x,
      y,
      title: slice.label,
      rows: [
        { label: 'Share', color: slice.color, value: `${slice.percent.toFixed(2)}%` },
        { label: 'Length', color: slice.color, value: `${slice.km.toFixed(2)} km` },
      ],
    };
  }

  clearWorkProgressHover(): void {
    this.workProgressHover = null;
  }

  drawPacTimelineChart(): void {
    if (!this.pacTimelineCanvas) return;
    if (this.pacTimelineMonths.length === 0) return;
    const canvas = this.pacTimelineCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 20, right: 15, bottom: 35, left: 40 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const count = this.pacTimelineMonths.length;

    let maxVal = 0;
    for (let i = 0; i < count; i++) {
      const total = this.pacTimelineApproved[i] + this.pacTimelinePending[i] + this.pacTimelineRejected[i];
      if (total > maxVal) maxVal = total;
    }
    maxVal = Math.max(maxVal * 1.2, 1);

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = this.getChartColors().grid;
    ctx.lineWidth = 0.5;
    const ySteps = 4;
    for (let i = 0; i <= ySteps; i++) {
      const y = pad.top + (chartH / ySteps) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = this.getChartColors().labelDim;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal - (maxVal / ySteps) * i).toString(), pad.left - 6, y + 3);
    }

    const gap = Math.max(6, chartW / count * 0.2);
    const barW = (chartW - gap * (count + 1)) / count;
    const colors = ['#22c55e', '#f59e0b', '#ef4444'];

    for (let i = 0; i < count; i++) {
      const x = pad.left + gap + i * (barW + gap);
      const segments = [
        this.pacTimelineApproved[i],
        this.pacTimelinePending[i],
        this.pacTimelineRejected[i],
      ];
      let yOffset = 0;
      segments.forEach((val, si) => {
        const segH = (val / maxVal) * chartH;
        if (segH > 0) {
          ctx.fillStyle = colors[si];
          const barX = Math.round(x);
          const barY = Math.round(pad.top + chartH - yOffset - segH);
          const bw = Math.round(barW);
          const bh = Math.round(segH);
          // Rounded top for top-most visible segment
          if (si === segments.length - 1 || segments.slice(si + 1).every(v => v === 0)) {
            const radius = Math.min(3, bw / 2);
            ctx.beginPath();
            ctx.moveTo(barX, barY + bh);
            ctx.lineTo(barX, barY + radius);
            ctx.quadraticCurveTo(barX, barY, barX + radius, barY);
            ctx.lineTo(barX + bw - radius, barY);
            ctx.quadraticCurveTo(barX + bw, barY, barX + bw, barY + radius);
            ctx.lineTo(barX + bw, barY + bh);
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.fillRect(barX, barY, bw, bh);
          }
        }
        yOffset += segH;
      });

      // X-axis label
      ctx.fillStyle = this.getChartColors().label;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.pacTimelineMonths[i], x + barW / 2, h - pad.bottom + 14);
    }
  }
}
