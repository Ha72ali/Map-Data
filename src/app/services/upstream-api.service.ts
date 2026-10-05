import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import {
  isDirectUpstreamEnabled,
  upstreamAuthToken,
  upstreamBaseUrl,
  upstreamContractor,
  upstreamSegmentsTimeoutMs,
  upstreamTimeoutMs,
} from '../upstream-config';
import { repairDeepStrings } from '../text-encoding.util';
import { portalBearerToken } from '../core/services/external-session.service';
import type {
  AnalyticsHistoryResponse,
  DashboardBootstrapResponse,
  DashboardSummaryResponse,
  PhaseDistributionRow,
  PhaseListResponse,
  PhaseWiseProgressRow,
  PlannedVsActualBucket,
  PlannedVsActualResponse,
  TimelineTrendResponse,
  KpiDimensionsResponse,
  KpiAggregateResponse,
  PhaseKpiSummaryResponse,
  ProgressSummaryResponse,
  DashboardFiltersResponse,
  ContractorContextResponse,
  ContractorProjectStatus,
  DashboardSnapshot,
  PhaseHistoryResponse,
  RingFilterOption,
  RingsResponse,
  RoutesSegmentsPhaseWiseResponse,
  SegmentPhaseOption,
  SegmentPhasesResponse,
  TrenchingTypeProgressResponse,
  TrenchingTypeProgressRow,
} from '../dashboard.service';

/**
 * Single owner of every direct call to the contractor's own API server
 * (the "upstream PMS"), bypassing the Node gateway.
 *
 * `SUPPORTED` below is the authoritative list of what can be served without
 * the gateway. Everything else — summary, timeline-trend, phase-kpi-summary,
 * pac-status, ext-planned-vs-actual, bootstrap, aggregates, geojson map
 * layers, exports — was verified to 404 on the contractor API and stays on the
 * gateway, which computes it from cached data.
 *
 * Endpoints fall into three kinds:
 *   1. passthrough        — same path and shape (contractor-project-status)
 *   2. shape adapter      — exists upstream, missing fields the gateway added
 *                           (rings, context/contractors, overall-distribution,
 *                           segments/phases, analytics/history,
 *                           phase-wise-progress-history)
 *   3. composed in-browser — several upstream calls combined here, replacing
 *                           gateway-side aggregation (filters)
 *
 * Upstream paths differ from the gateway's in three places, handled here so
 * callers keep their existing shapes:
 *   gateway /api/dashboard/rings                     -> upstream /api/rings
 *   gateway /api/dashboard/context/contractors       -> upstream /api/context/contractors
 *   gateway /api/dashboard/:id/overall-distribution  -> upstream /api/dashboard/overall-distribution?projectId=
 */
/**
 * Thrown when a phase's segments cannot be loaded from the contractor API.
 *
 * Distinguishes an outage from an empty result, which callers otherwise cannot
 * tell apart: both used to arrive as `{ routes: [] }` and rendered as a blank
 * map with no explanation.
 *
 * The common cause is a 504 from the contractor's own reverse proxy, which cuts
 * the request at 60 s while the query needs longer — nothing the browser can
 * shorten, since the endpoint honours no narrowing parameter.
 */
export class UpstreamSegmentsUnavailableError extends Error {
  readonly phaseId: string;
  readonly status: number | null;
  /** True for a proxy/gateway timeout, i.e. upstream was too slow rather than broken. */
  readonly timedOut: boolean;

  constructor(phaseId: string, cause: unknown) {
    const status =
      (cause as { response?: { status?: number } } | null)?.response?.status ?? null;
    const code = (cause as { code?: string } | null)?.code ?? '';
    const timedOut =
      status === 504 || status === 408 || code === 'ECONNABORTED' || code === 'ETIMEDOUT';

    super(
      timedOut
        ? `Contractor API timed out loading segments for phase ${phaseId} ` +
            `(${status ?? (code || 'no response')}). The upstream query exceeds its ` +
            `60s proxy limit.`
        : `Contractor API could not serve segments for phase ${phaseId}` +
            (status ? ` (HTTP ${status}).` : '.')
    );
    this.name = 'UpstreamSegmentsUnavailableError';
    this.phaseId = phaseId;
    this.status = status;
    this.timedOut = timedOut;
    this.cause = cause;
  }
}

@Injectable({ providedIn: 'root', useFactory: () => upstreamApi })
export class UpstreamApiService {
  private readonly http: AxiosInstance;

  /**
   * Gateway paths this service can serve directly from the contractor API.
   *
   * NOT included: 'geophotos'. Verified against tcpms.mhditics.com —
   * /api/geophotos/segment/:id returns a path-level 404 (the route does not
   * exist), whereas /api/proofs/segment/:id returns "Segment not found" (the
   * route exists). Images therefore come from proofs only in direct mode.
   */
  private static readonly SUPPORTED = new Set<string>([
    'rings',
    'context/contractors',
    'contractor-project-status',
    'overall-distribution',
    'routes-segments-phase-wise',
    'proofs',
    // Verified present on tcpms.mhditics.com. Each needs a shape adapter
    // because the contractor API omits fields the gateway synthesised.
    'segments/phases',
    'analytics/history',
    'phase-wise-progress-history',
    // Composed in the browser from four upstream feeds (see getDashboardFilters).
    'filters',
    // Metres→km plus phaseName/ringId translation (see getProgressSummary).
    'progress-summary',
    // Rebuilt from progress-summary, exactly as the gateway's sync did.
    'aggregates/kpis',
    'phase-kpi-summary',
    'kpi-dimensions',
    // Built from real analytics history instead of the gateway's synthetic curve.
    'timeline-trend',
    // Derived from progress-summary; gateway-only endpoint 404s upstream.
    'summary',
    // The gateway served a hardcoded constant (phaseHistory.routes.js:265) —
    // see ALL_HISTORY_PHASES, which is the same list.
    'phase-list',
    // Real dated buckets from analytics/history. The gateway's version was
    // synthetic: it bucketed its own sync_runs timestamps and interpolated
    // toward the current total (dashboardV2.js:437), so this is more accurate,
    // not merely equivalent.
    'ext-planned-vs-actual',
    // Composed from overall-distribution + contractor-project-status + kpis.
    'bootstrap',
    // Passthrough: same path and shape on gateway and contractor API.
    'financial-summary',
    // Verified present on tcpms.mhditics.com (HTTP 200 with the same fields the
    // old dashboard read). Both need a ring fan-out — see fanOutByRing.
    'phase-wise-progress',
    'phase-distribution',
    // Same controller family as the two above (one row per trench profile).
    // Merged across the ring fan-out here — see getTrenchingTypeWiseProgress.
    'trenching-type-wise-progress',
  ]);

  /** Ceiling on ring x project fan-out requests for a single chart load. */
  private static readonly FAN_OUT_MAX = 24;

  constructor() {
    this.http = axios.create({ timeout: upstreamTimeoutMs() });

    // Base URL and auth resolve per request, not at construction, so a
    // deploy-time `window.__env` change takes effect without a rebuild.
    this.http.interceptors.request.use((config) => {
      config.baseURL = upstreamBaseUrl();
      // Prefer the live portal session over the build-time token, so a
      // handover session authenticates direct contractor calls too. Read per
      // request — another tab may have rotated it.
      const token = portalBearerToken() || upstreamAuthToken();
      if (token) {
        config.headers.set('Authorization', token);
      }
      return config;
    });

    // Same mojibake repair the gateway client applies (see dashboard.service.ts).
    this.http.interceptors.response.use((response) => {
      const data = response.data;
      if (data != null && (typeof data === 'object' || typeof data === 'string')) {
        response.data = repairDeepStrings(data);
      }
      return response;
    });

    this.http.interceptors.response.use(undefined, (error) => {
      console.error('[upstream] direct request failed:', {
        url: `${error?.config?.baseURL ?? ''}${error?.config?.url ?? ''}`,
        status: error?.response?.status,
        message: error?.message,
      });
      return Promise.reject(error);
    });
  }

  /** True when direct-upstream mode is on AND a base URL is configured. */
  get enabled(): boolean {
    return isDirectUpstreamEnabled();
  }

  /** Contractor this deployment serves, e.g. 'MHD'. '' when unset. */
  get contractor(): string {
    return upstreamContractor();
  }

  /** Whether a given logical endpoint can be served without the gateway. */
  supports(endpoint: string): boolean {
    return this.enabled && UpstreamApiService.SUPPORTED.has(endpoint);
  }

  // --- Filters / context -------------------------------------------------

  /**
   * Upstream returns `{ rings: [{ id, name }] }`. The gateway prefixes ids with
   * 'R' and sorts by name; components rely on both, so reproduce them here.
   */
  async getRings(): Promise<RingsResponse> {
    const response = await this.http.get<{ rings?: Array<{ id?: unknown; name?: unknown }> }>(
      '/api/rings'
    );
    const list = Array.isArray(response.data?.rings) ? response.data.rings : [];
    const merged = new Map<string, RingFilterOption>();
    for (const ring of list) {
      const rawId = ring?.id;
      const rawName = ring?.name;
      if (rawId == null || !rawName) continue;
      const id = `R${String(rawId)}`;
      if (!merged.has(id)) {
        merged.set(id, { id, name: String(rawName), source: 'upstream' });
      }
    }
    const rings = Array.from(merged.values()).sort((a, b) => a.name.localeCompare(b.name));
    return { rings, stale: false };
  }

  /**
   * Upstream returns `{ contractors: string[] }` for the one backend you hit.
   * The gateway merged five backends here; a single-contractor deployment gets
   * exactly one name back, which is correct for that deployment.
   */
  async getContractorContext(): Promise<ContractorContextResponse> {
    const response = await this.http.get<{ contractors?: unknown }>('/api/context/contractors');
    const raw = Array.isArray(response.data?.contractors) ? response.data.contractors : [];
    const names = new Set<string>();
    for (const contractor of raw) {
      const value = String(contractor ?? '').trim();
      if (value) names.add(value);
    }
    // Fall back to the configured contractor when the API returns nothing, so
    // the contractor filter is never empty on a single-contractor deployment.
    if (!names.size && this.contractor) names.add(this.contractor);
    return {
      mode: 'CONTRACTOR',
      contractors: Array.from(names).sort((a, b) => a.localeCompare(b)),
      stale: false,
    };
  }

  /** Passthrough — same path and shape on both gateway and upstream. */
  async getContractorProjectStatus(): Promise<ContractorProjectStatus[]> {
    const response = await this.http.get<ContractorProjectStatus[]>(
      '/api/dashboard/contractor-project-status'
    );
    return Array.isArray(response.data) ? response.data : [];
  }

  /**
   * Gateway's phaseName → phaseId map (dashboardV2.js:1073). Needed because
   * the contractor API accepts `phaseId` but silently IGNORES `phaseName` —
   * passing a name through unmapped returns the default phase's numbers under
   * whatever label the user selected.
   */
  private static readonly PHASE_NAME_TO_ID: Record<string, string> = {
    trenching: '2',
    ducting: '4',
    '1st layer backfilling': '7',
    '2nd layer backfilling': '8',
    'final backfilling': '9',
    backfilling: '9',
  };

  /**
   * Raw `POST /api/dashboard/financial-summary` payload — passthrough.
   *
   * Filters go in the JSON body, not the query string.
   *
   * Returned unshaped on purpose: `getFinancialSummary` in dashboard.service
   * owns the normalisation for both this path and the gateway one, so the two
   * modes cannot drift apart.
   */
  async getFinancialSummaryRaw(params: Record<string, unknown> = {}): Promise<unknown> {
    const response = await this.http.post<unknown>(
      '/api/dashboard/financial-summary',
      params
    );
    return response.data;
  }

  /** Raw upstream progress summary, in METRES. */
  async getProgressSummaryRaw<T = unknown>(
    params?: Record<string, unknown>
  ): Promise<T> {
    const response = await this.http.get<T>('/api/dashboard/progress-summary', { params });
    return response.data;
  }

  /**
   * Progress summary, adapted to the gateway's `ProgressSummaryResponse`.
   *
   * Three upstream quirks are handled here, each verified against
   * tcpms.mhditics.com:
   *
   * 1. UNITS. Upstream returns metres (`totalM`, `completedM`, …); the UI reads
   *    kilometres (`totalPlannedKm`, …). Everything is divided by 1000.
   * 2. `phaseName` IS IGNORED upstream — only `phaseId` filters. A name is
   *    mapped to its id first, or the response would be the default phase's
   *    numbers displayed under the selected phase's label.
   * 3. `ringId` must be the raw numeric id. Sending the gateway's 'R1' form
   *    returns HTTP 400 "Invalid value for parameter 'ringId'", so the 'R'
   *    prefix is stripped.
   *
   * `phaseBreakdown` is omitted: it needs per-phase SEGMENT COUNTS, which this
   * endpoint does not return. It is optional on the interface, and omitting it
   * is honest — synthesising counts from length totals would be inventing data.
   *
   * The single `contractors` row is correct rather than fabricated: this is a
   * single-contractor deployment, so the grand total IS that contractor's total.
   */
  async getProgressSummary(
    filters: Record<string, unknown> = {}
  ): Promise<ProgressSummaryResponse> {
    const phaseName = String(filters['phaseName'] ?? '').trim();
    let phaseId = String(filters['phaseId'] ?? '').trim();
    if (!phaseId && phaseName) {
      phaseId = UpstreamApiService.PHASE_NAME_TO_ID[phaseName.toLowerCase()] ?? '';
    }

    // The UI sends multi-select values as comma lists under the PLURAL names
    // (V2CommonFilters: contractorIds / ringIds / linkIds) and single values
    // under the singular ones. Read both, or a filter change produces an
    // identical request and the numbers never move.
    const ringIds = this.idList(filters['ringIds'] ?? filters['ringId']).map((id) =>
      id.replace(/^R/i, '') // upstream 400s on the 'R1' form
    );
    const linkIds = this.idList(filters['linkIds'] ?? filters['projectId']);

    // Grain precedence matches the gateway's SQL (aggregates.js:203): a link
    // selection wins over a ring selection, which wins over the plain total.
    // Upstream takes ONE id per call, so a multi-select fans out and sums —
    // the client-side equivalent of the gateway's SUM(...) GROUP BY.
    let combos: Array<Record<string, string>>;
    if (linkIds.length) {
      combos = linkIds.map((projectId) => ({ projectId }));
    } else if (ringIds.length) {
      combos = ringIds.map((ringId) => ({ ringId }));
    } else {
      combos = [{}];
    }
    if (phaseId) combos = combos.map((c) => ({ ...c, phaseId }));

    const responses = await Promise.all(
      combos.map((params) =>
        this.getProgressSummaryRaw<Record<string, unknown>>(params).catch(() => null)
      )
    );

    const num = (value: unknown): number => {
      const n = Number(value);
      return Number.isFinite(n) ? n : 0;
    };
    let totalM = 0;
    let completedM = 0;
    let inProgressM = 0;
    let pendingM = 0;
    for (const raw of responses) {
      if (!raw) continue;
      totalM += num(raw['totalM']);
      completedM += num(raw['completedM']);
      inProgressM += num(raw['inProgressM']);
      pendingM += num(raw['pendingM']);
    }

    const km = (m: number) => +(m / 1000).toFixed(3);
    // Percentages are recomputed from the summed metres rather than averaged
    // from the per-call percentages, which would be wrong for unequal scopes.
    const share = (m: number) => (totalM > 0 ? +((m / totalM) * 100).toFixed(2) : 0);

    const totals = {
      totalPlannedKm: km(totalM),
      completedKm: km(completedM),
      inProgressKm: km(inProgressM),
      pendingKm: km(pendingM),
      completionPercent: share(completedM),
    };

    return {
      contractors: [
        {
          contractor: this.contractor || 'UNKNOWN',
          ...totals,
          inProgressPercent: share(inProgressM),
          pendingPercent: share(pendingM),
          fetchedAt: Date.now(),
        },
      ],
      grandTotal: totals,
      phaseId: phaseId || null,
      filters,
    };
  }

  /** Comma list → trimmed ids, dropping empties and the 'ALL' sentinel. */
  /**
   * GET `path` once per selected ring and concatenate the rows.
   *
   * Upstream takes ONE `ringId` per call, so a multi-select has to fan out —
   * the client-side equivalent of the gateway's SUM(...) GROUP BY. Two quirks,
   * both shared with getProgressSummary: the 'R' prefix must be stripped (the
   * gateway's 'R1' form returns HTTP 400), and no ring selected means one
   * unfiltered call rather than zero.
   *
   * A `projectId` selection fans out the same way, crossed with the rings.
   *
   * An unknown contractor is not an error upstream — it answers `[]`.
   */
  private async fanOutByRing<T>(
    path: string,
    filters: Record<string, unknown>
  ): Promise<T[]> {
    const pages = await this.fanOutPages<T[]>(path, filters);
    return pages.flatMap((page) => (Array.isArray(page) ? page : []));
  }

  /**
   * The fan-out itself: one response per (ring, project) pair, unflattened.
   *
   * Split out of fanOutByRing for endpoints that answer with an object rather
   * than an array — those pages cannot be concatenated, they have to be merged
   * field by field (see getTrenchingTypeWiseProgress).
   */
  private async fanOutPages<T>(
    path: string,
    filters: Record<string, unknown>
  ): Promise<T[]> {
    const ringIds = this.idList(filters['ringIds'] ?? filters['ringId']).map((id) =>
      id.replace(/^R/i, '')
    );
    // The filter bar labels links by name but holds a real upstream projectId
    // (see indexFilterIds) — the same value the old dashboard sent alongside
    // contractor and ringId.
    const projectIds = this.idList(filters['projectId'] ?? filters['linkIds']);
    const contractor = String(filters['contractor'] ?? '').trim();

    const ringQueries: Array<Record<string, string>> = ringIds.length
      ? ringIds.map((ringId) => ({ ringId }))
      : [{}];
    let queries = ringQueries;
    if (projectIds.length) {
      // Upstream takes one projectId per call too, so the two multi-selects
      // cross-multiply. Each (ring, project) pair that does not exist answers
      // `[]`, so summing the pages stays correct.
      const crossed = ringQueries.flatMap((query) =>
        projectIds.map((projectId) => ({ ...query, projectId }))
      );
      // Both multi-selects wide open can multiply past what upstream should be
      // asked for in one render; degrade to the ring-only fan-out rather than
      // firing dozens of calls.
      queries =
        crossed.length <= UpstreamApiService.FAN_OUT_MAX ? crossed : ringQueries;
    }

    return Promise.all(
      queries.map(async (query) => {
        const response = await this.http.get<T>(path, {
          params: { ...(contractor ? { contractor } : {}), ...query },
        });
        return response.data;
      })
    );
  }

  /**
   * Per-phase progress against the total route length.
   *
   * Metres are summed per phase across the fanned-out rings and the
   * percentages RECOMPUTED from those sums. Averaging the upstream
   * percentages instead would weight a 300 m ring the same as a 300 km one.
   */
  async getPhaseWiseProgress(
    filters: Record<string, unknown> = {}
  ): Promise<PhaseWiseProgressRow[]> {
    const rows = await this.fanOutByRing<PhaseWiseProgressRow>(
      '/api/dashboard/phase-wise-progress',
      filters
    );
    const merged = new Map<string, PhaseWiseProgressRow>();
    for (const row of rows) {
      const phaseName = String(row?.phaseName ?? '').trim();
      if (!phaseName) continue;
      const acc =
        merged.get(phaseName) ??
        {
          phaseId: Number(row?.phaseId) || 0,
          phaseName,
          totalM: 0,
          completedM: 0,
          inProgressM: 0,
          pendingM: 0,
          completedPercent: 0,
          inProgressPercent: 0,
          pendingPercent: 0,
        };
      acc.totalM += Number(row?.totalM) || 0;
      acc.completedM += Number(row?.completedM) || 0;
      acc.inProgressM += Number(row?.inProgressM) || 0;
      acc.pendingM += Number(row?.pendingM) || 0;
      merged.set(phaseName, acc);
    }
    for (const row of merged.values()) {
      const pct = (value: number) => (row.totalM > 0 ? (value / row.totalM) * 100 : 0);
      row.completedPercent = pct(row.completedM);
      row.inProgressPercent = pct(row.inProgressM);
      row.pendingPercent = pct(row.pendingM);
    }
    return Array.from(merged.values());
  }

  /** Per-phase approval-state split, summed per phase across the fanned-out rings. */
  async getPhaseDistribution(
    filters: Record<string, unknown> = {}
  ): Promise<PhaseDistributionRow[]> {
    const rows = await this.fanOutByRing<PhaseDistributionRow>(
      '/api/dashboard/phase-distribution',
      filters
    );
    const merged = new Map<string, PhaseDistributionRow>();
    for (const row of rows) {
      const phaseName = String(row?.phaseName ?? '').trim();
      if (!phaseName) continue;
      const acc =
        merged.get(phaseName) ??
        {
          phaseId: Number(row?.phaseId) || 0,
          phaseName,
          completed: 0,
          inProgress: 0,
          submitted: 0,
          pmApproved: 0,
          rejected: 0,
          pmRejected: 0,
          total: 0,
        };
      acc.completed += Number(row?.completed) || 0;
      acc.inProgress += Number(row?.inProgress) || 0;
      acc.submitted += Number(row?.submitted) || 0;
      acc.pmApproved += Number(row?.pmApproved) || 0;
      acc.rejected += Number(row?.rejected) || 0;
      acc.pmRejected += Number(row?.pmRejected) || 0;
      acc.total += Number(row?.total) || 0;
      merged.set(phaseName, acc);
    }
    return Array.from(merged.values());
  }

  /**
   * Per-trench-profile progress, merged across the ring/project fan-out.
   *
   * Every page carries the same profiles, so metres, volumes and segment counts
   * are summed per profile code and the percentages RECOMPUTED from those sums
   * — the three state percentages from each profile's own summed `totalM`, and
   * the rock / sand-dune shares as segment-count-weighted averages, since they
   * are per-segment shares upstream. Averaging the percentages flat would give
   * a one-segment ring the same weight as a five-thousand-segment one.
   */
  async getTrenchingTypeWiseProgress(
    filters: Record<string, unknown> = {}
  ): Promise<TrenchingTypeProgressResponse> {
    const pages = await this.fanOutPages<TrenchingTypeProgressResponse>(
      '/api/dashboard/trenching-type-wise-progress',
      filters
    );

    const merged = new Map<string, TrenchingTypeProgressRow>();
    // Weighted-average accumulators, keyed the same way as `merged`.
    const weighted = new Map<string, { rock: number; sand: number }>();
    const totals = {
      totalRockVolume: 0,
      totalSandVolume: 0,
      totalExtraExcavationVolume: 0,
      totalSegmentCount: 0,
      totalRockPercentage: 0,
      totalSandDuneRemovalPercentage: 0,
    };
    let rockWeight = 0;
    let sandWeight = 0;

    for (const page of pages) {
      const segments = Number(page?.totalSegmentCount) || 0;
      totals.totalRockVolume += Number(page?.totalRockVolume) || 0;
      totals.totalSandVolume += Number(page?.totalSandVolume) || 0;
      totals.totalExtraExcavationVolume += Number(page?.totalExtraExcavationVolume) || 0;
      totals.totalSegmentCount += segments;
      rockWeight += (Number(page?.totalRockPercentage) || 0) * segments;
      sandWeight += (Number(page?.totalSandDuneRemovalPercentage) || 0) * segments;

      for (const row of Array.isArray(page?.trenchingTypes) ? page.trenchingTypes : []) {
        const key = String(row?.trenchingTypeCode ?? row?.trenchingTypeId ?? '').trim();
        if (!key) continue;
        const acc =
          merged.get(key) ??
          {
            trenchingTypeId: Number(row?.trenchingTypeId) || 0,
            trenchingTypeCode: String(row?.trenchingTypeCode ?? key),
            trenchingTypeName: String(row?.trenchingTypeName ?? ''),
            widthMm: Number(row?.widthMm) || 0,
            heightMm: Number(row?.heightMm) || 0,
            totalM: 0,
            inProgressM: 0,
            completedM: 0,
            pendingM: 0,
            inProgressPercent: 0,
            completedPercent: 0,
            pendingPercent: 0,
            completionPercent: 0,
            segmentCount: 0,
            rockPercentage: 0,
            extraExcavationM: 0,
            sandDuneRemovalPercentage: 0,
            rockBenchingM: 0,
            additionalConcreteM: 0,
            rockVolume: 0,
            sandVolume: 0,
          };
        const rowSegments = Number(row?.segmentCount) || 0;
        acc.totalM += Number(row?.totalM) || 0;
        acc.inProgressM += Number(row?.inProgressM) || 0;
        acc.completedM += Number(row?.completedM) || 0;
        acc.pendingM += Number(row?.pendingM) || 0;
        acc.segmentCount += rowSegments;
        acc.extraExcavationM += Number(row?.extraExcavationM) || 0;
        acc.rockBenchingM += Number(row?.rockBenchingM) || 0;
        acc.additionalConcreteM += Number(row?.additionalConcreteM) || 0;
        acc.rockVolume += Number(row?.rockVolume) || 0;
        acc.sandVolume += Number(row?.sandVolume) || 0;
        merged.set(key, acc);

        const w = weighted.get(key) ?? { rock: 0, sand: 0 };
        w.rock += (Number(row?.rockPercentage) || 0) * rowSegments;
        w.sand += (Number(row?.sandDuneRemovalPercentage) || 0) * rowSegments;
        weighted.set(key, w);
      }
    }

    for (const [key, row] of merged) {
      const pct = (value: number) => (row.totalM > 0 ? (value / row.totalM) * 100 : 0);
      row.completedPercent = pct(row.completedM);
      row.inProgressPercent = pct(row.inProgressM);
      row.pendingPercent = pct(row.pendingM);
      row.completionPercent = row.completedPercent;
      const w = weighted.get(key);
      if (w && row.segmentCount > 0) {
        row.rockPercentage = w.rock / row.segmentCount;
        row.sandDuneRemovalPercentage = w.sand / row.segmentCount;
      }
    }

    if (totals.totalSegmentCount > 0) {
      totals.totalRockPercentage = rockWeight / totals.totalSegmentCount;
      totals.totalSandDuneRemovalPercentage = sandWeight / totals.totalSegmentCount;
    }

    return { ...totals, trenchingTypes: Array.from(merged.values()) };
  }

  private idList(value: unknown): string[] {
    const raw = String(value ?? '').trim();
    if (!raw || raw.toUpperCase() === 'ALL') return [];
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '' && s.toUpperCase() !== 'ALL');
  }

  /**
   * The gateway wraps the raw upstream body in snapshot metadata
   * (`{ projectId, widgetKey, data, fetchedAt, ... }`). Rebuild that envelope
   * so callers reading `.data` / `.stale` keep working. `fetchedAt` is now,
   * because a direct call is by definition never cached.
   */
  async getOverallDistribution(projectId: string): Promise<DashboardSnapshot> {
    const url = '/api/dashboard/overall-distribution';
    const response = await this.http.get<Record<string, unknown>>(url, {
      params: { projectId },
    });
    return {
      projectId,
      widgetKey: 'overall-distribution',
      data: response.data ?? {},
      fetchedAt: Date.now(),
      status: 'ok',
      sourceUrl: `${upstreamBaseUrl()}${url}?projectId=${encodeURIComponent(projectId)}`,
      stale: false,
    };
  }

  // --- Segments ----------------------------------------------------------

  /**
   * Unfiltered per-phase segment payloads, keyed by phaseId.
   *
   * The gateway cached this server-side; without it the browser must, because
   * the upstream call is the most expensive one in the app (2.6 MB / ~60 s for
   * a single phase). Held for the tab's lifetime: segment geometry changes on
   * the order of days, and a stale-but-rendered map beats an empty one.
   */
  private readonly segmentsCache = new Map<string, RoutesSegmentsPhaseWiseResponse>();

  /**
   * In-flight requests, keyed by phaseId, so N components asking for the same
   * phase share one HTTP call instead of racing.
   */
  private readonly segmentsInFlight = new Map<string, Promise<RoutesSegmentsPhaseWiseResponse>>();

  /**
   * Tail of the segment request queue. Segment calls run strictly one at a
   * time: measured against tcpms.mhditics.com, one request returns 200 in ~62 s
   * while four concurrent ones drop every connection at ~71 s with no response
   * at all. Serialising turns "all phases fail" into "phases resolve slowly,
   * in order".
   */
  private segmentsQueue: Promise<unknown> = Promise.resolve();

  /**
   * Segments for one phase. The upstream endpoint has no contractor parameter
   * — the contractor is whichever backend you hit — so `contractorIds` cannot
   * be pushed down and is applied client-side against the returned routes.
   *
   * Cached, coalesced and serialised (see the three fields above). The contractor
   * filter is applied per call on the way out, so two callers wanting different
   * contractors still share one fetch.
   *
   * Throws {@link UpstreamSegmentsUnavailableError} when upstream cannot serve
   * the phase and nothing is cached, so callers can tell "no segments exist"
   * apart from "we could not load them".
   */
  async getRoutesSegmentsPhaseWise(
    phaseId: string | number,
    contractorIds?: string
  ): Promise<RoutesSegmentsPhaseWiseResponse> {
    const key = String(phaseId);

    const cached = this.segmentsCache.get(key);
    if (cached) {
      return { routes: this.filterRoutesByContractor(cached.routes, contractorIds) };
    }

    let pending = this.segmentsInFlight.get(key);
    if (!pending) {
      pending = this.enqueueSegmentsFetch(key);
      this.segmentsInFlight.set(key, pending);
      // Clear the slot however it settles, so a failure can be retried later.
      void pending.catch(() => undefined).finally(() => {
        this.segmentsInFlight.delete(key);
      });
    }

    const result = await pending;
    return { routes: this.filterRoutesByContractor(result.routes, contractorIds) };
  }

  /** True when this phase is already in memory — a render needs no network. */
  hasCachedSegments(phaseId: string | number): boolean {
    return this.segmentsCache.has(String(phaseId));
  }

  /** Chain one segment fetch onto the queue so only one is ever in flight. */
  private enqueueSegmentsFetch(key: string): Promise<RoutesSegmentsPhaseWiseResponse> {
    const run = this.segmentsQueue.then(
      () => this.fetchSegmentsOnce(key),
      () => this.fetchSegmentsOnce(key)
    );
    // Keep the queue alive after a rejection, otherwise one failure would
    // poison every later link in the chain.
    this.segmentsQueue = run.catch(() => undefined);
    return run;
  }

  private async fetchSegmentsOnce(key: string): Promise<RoutesSegmentsPhaseWiseResponse> {
    // A phase may have landed in the cache while this call sat in the queue.
    const cached = this.segmentsCache.get(key);
    if (cached) return cached;

    try {
      const response = await this.http.get<RoutesSegmentsPhaseWiseResponse>(
        '/api/segments/routes-segments-phase-wise',
        { params: { phaseId: key }, timeout: upstreamSegmentsTimeoutMs() }
      );
      const routes = Array.isArray(response.data?.routes) ? response.data.routes : [];
      const payload: RoutesSegmentsPhaseWiseResponse = { routes };
      this.segmentsCache.set(key, payload);
      return payload;
    } catch (error) {
      throw new UpstreamSegmentsUnavailableError(key, error);
    }
  }

  /**
   * Client-side replacement for the gateway's contractor filter. Routes that
   * carry no contractor field are attributed to the configured contractor,
   * matching how the gateway tags a single backend's rows.
   */
  private filterRoutesByContractor<T>(routes: T[], contractorIds?: string): T[] {
    const raw = (contractorIds ?? '').trim();
    if (!raw) return routes;
    const wanted = new Set(
      raw
        .split(',')
        .map((s) => this.normalizeContractor(s))
        .filter(Boolean)
    );
    if (!wanted.size) return routes;
    const fallback = this.normalizeContractor(this.contractor);
    return routes.filter((route) => {
      const value = (route as Record<string, unknown>)?.['contractor'];
      const name = this.normalizeContractor(String(value ?? '')) || fallback;
      return name ? wanted.has(name) : true;
    });
  }

  private normalizeContractor(name: string): string {
    return String(name ?? '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/[-_]/g, '');
  }

  // --- Filters (composed client-side from four upstream calls) -----------

  /**
   * Fiber projects — the preferred source for the LINK filter.
   * Upstream: `[{id, projectName, contractor, ringId, ...}]`.
   */
  async getFiberProjects(): Promise<Array<Record<string, unknown>>> {
    const response = await this.http.get<unknown>('/api/routes/getAllFiberProjects');
    return Array.isArray(response.data) ? (response.data as Array<Record<string, unknown>>) : [];
  }

  /**
   * Dashboard filter lists, rebuilt from the same four upstream feeds the
   * gateway used (`/api/rings`, `/api/context/contractors`,
   * `/api/dashboard/contractor-project-status`,
   * `/api/routes/getAllFiberProjects`) — see server/routes/dashboard.js:413.
   *
   * The gateway read these from its SQLite cache; here they are fetched
   * concurrently and combined in the browser. The contractor → ring → link
   * narrowing is reproduced so the dropdowns behave identically.
   */
  async getDashboardFilters(params?: {
    phaseId?: string;
    contractor?: string;
    ringId?: string;
    projectId?: string;
  }): Promise<DashboardFiltersResponse> {
    const phaseId = String(params?.phaseId || '2');

    const [ringsRes, contextRes, statusRes, projectsRes, segmentPhasesRes] = await Promise.all([
      this.getRings().catch(() => ({ rings: [], stale: true }) as RingsResponse),
      this.getContractorContext().catch(
        () => ({ mode: 'CONTRACTOR', contractors: [], stale: true }) as ContractorContextResponse
      ),
      this.getContractorProjectStatus().catch(() => [] as ContractorProjectStatus[]),
      this.getFiberProjects().catch(() => []),
      this.getSegmentPhases().catch(() => ({ phases: [] }) as SegmentPhasesResponse),
    ]);

    const contractors: RingFilterOption[] = contextRes.contractors.map((name) => ({
      id: name,
      name,
    }));

    // Steps come from the phase names inside contractor-project-status. That
    // feed fails or comes back without a breakdown often enough to leave the
    // PHASE dropdown empty, so fall back to the fixed phase list.
    const statusStepNames = Array.from(
      new Set(
        statusRes.flatMap((row) =>
          (row?.phaseBreakdown ?? [])
            .map((p) => String(p?.phase ?? '').trim())
            .filter((p) => p !== '')
        )
      )
    );
    // Order by upstream phase id; names it doesn't list go last, alphabetically.
    const phaseIdByName = new Map(
      segmentPhasesRes.phases.map((p) => [p.phaseName.trim().toLowerCase(), p.phaseId])
    );
    const phaseOrder = (name: string) =>
      phaseIdByName.get(name.toLowerCase()) ?? Number.POSITIVE_INFINITY;
    statusStepNames.sort((a, b) => phaseOrder(a) - phaseOrder(b) || a.localeCompare(b));
    const stepNames = statusStepNames.length
      ? statusStepNames
      : UpstreamApiService.ALL_HISTORY_PHASES.map((p) => p.phaseName);

    // Links, deduped per (contractor, id) exactly as the gateway did — project
    // ids collide across contractor backends.
    const byKey = new Map<string, DashboardFiltersResponse['links'][number]>();
    for (const project of projectsRes) {
      const rawId = project['id'];
      const rawName = project['projectName'];
      if (rawId == null || !rawName) continue;
      const id = String(rawId);
      const contractor = String(project['contractor'] ?? '').trim();
      const key = `${contractor}::${id}`;
      if (byKey.has(key)) continue;
      byKey.set(key, {
        id,
        name: String(rawName).trim(),
        ringId: project['ringId'] != null ? `R${String(project['ringId'])}` : 'ALL',
        contractor: contractor || null,
      });
    }
    const allProjects = Array.from(byKey.values()).sort((a, b) => a.name.localeCompare(b.name));

    // Contractor → ring → link narrowing (gateway parity).
    const contractorFilter = this.toFilterSet(
      (params as Record<string, unknown>)?.['contractorIds'] as string | undefined
    ) ?? this.toFilterSet(params?.contractor);
    const projectsByContractor = contractorFilter
      ? allProjects.filter((p) => !p.contractor || contractorFilter.has(p.contractor))
      : allProjects;

    const ringIdsInUse = new Set(
      projectsByContractor.map((p) => String(p.ringId ?? '').trim()).filter(Boolean)
    );
    // Only narrow rings when the projects actually carry ring ids; otherwise
    // the RING dropdown would come back empty instead of unfiltered.
    const rings = ringIdsInUse.size
      ? ringsRes.rings.filter((r) => ringIdsInUse.has(r.id))
      : ringsRes.rings;

    const ringFilter = this.toFilterSet(
      (params as Record<string, unknown>)?.['ringIds'] as string | undefined
    ) ?? this.toFilterSet(params?.ringId);
    const links = ringFilter
      ? projectsByContractor.filter((p) => ringFilter.has(String(p.ringId ?? '').trim()))
      : projectsByContractor;

    return {
      phaseId,
      contractorRequired: true,
      rings,
      contractors,
      steps: stepNames.map((name) => ({ id: name, name })),
      links,
    };
  }

  /** Comma-separated filter value → Set, or null for absent/'ALL'. */
  private toFilterSet(value?: string): Set<string> | null {
    const raw = (value ?? '').trim();
    if (!raw || raw.toUpperCase() === 'ALL') return null;
    const list = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    return list.length ? new Set(list) : null;
  }

  // --- KPI tiles (rebuilt from progress-summary, as the gateway did) -----

  /**
   * Phases the gateway rolls into the Trenching / Ducting / Backfilling tiles
   * (dashboardV2.js:1396).
   */
  private static readonly KPI_PHASES: Array<{ phaseName: string; phaseId: string }> = [
    { phaseName: 'Trenching', phaseId: '2' },
    { phaseName: 'Ducting', phaseId: '4' },
    { phaseName: 'Backfilling', phaseId: '9' },
  ];

  /**
   * The remaining phases the gateway showed in Phase-wise Segment Breakdown
   * (PHASE_NAMES, dashboardV2.js:1388), with REAL upstream phase ids taken
   * from `/api/segments/phases`.
   *
   * The gateway fetched these with `?phaseName=…` — which the contractor API
   * ignores. That is why its chart repeats the same 393/447/70 for every one
   * of these phases: it was rendering the unfiltered project total five times
   * over, once per label. Querying by id returns each phase's real numbers.
   */
  private static readonly EXTRA_PHASES: Array<{ phaseName: string; phaseId: string }> = [
    { phaseName: 'Sand Bedding', phaseId: '3' },
    { phaseName: 'Hand Holes', phaseId: '10' },
    { phaseName: 'Marker Post', phaseId: '7' },
    { phaseName: 'Route Marking', phaseId: '1' },
    { phaseName: 'Removal and reinstatement of Interlocks', phaseId: '14' },
  ];

  /**
   * Cumulative Progress Timeline.
   *
   * The gateway synthesised this (dashboardV2.js:940): it took the current
   * totals and smeared them backwards over an S-curve or over sync-run
   * timestamps — no real history was involved.
   *
   * `analytics/history` returns actual dated progress points, so this is built
   * from real observations instead. `cumulativeActual` / `cumulativePlanned`
   * arrive in METRES (same convention as the Progress Report chart, see
   * executive-dashboard.component.ts:3356), hence the /1000.
   *
   * When upstream has no plan baseline, `cumulativePlanned` is 0 for every
   * point and the planned line simply does not render — which is honest,
   * rather than drawing the straight synthetic ramp the gateway invented.
   */
  async getTimelineTrend(
    filters: Record<string, unknown> = {}
  ): Promise<TimelineTrendResponse> {
    // This is a "since project start" chart, but the caller passes no date
    // range, and analytics/history then defaults to about a week — which would
    // render as a 7-day sliver. The gateway spread its synthetic curve over 90
    // days, so ask for the same window when the caller has not specified one.
    const params: Record<string, unknown> = { ...filters };
    if (!params['fromDate'] && !params['toDate']) {
      const toDate = new Date();
      const fromDate = new Date(toDate.getTime() - 90 * 24 * 60 * 60 * 1000);
      params['fromDate'] = fromDate.toISOString().slice(0, 10);
      params['toDate'] = toDate.toISOString().slice(0, 10);
      params['granularity'] = params['granularity'] ?? 'WEEKLY';
    }

    // A phaseId is REQUIRED here, not optional. Called without one, upstream
    // sums cumulativeActual across every phase: 1868 km cumulative against a
    // 910 km scope, i.e. a line that runs to twice the project size. Verified
    // against tcpms.mhditics.com — no phaseId → 1868.8 km, phaseId=2 → 309.7 km.
    //
    // Default to Trenching (2), the dashboard's default phase and the same
    // series the gateway's synthetic curve was scaled from.
    if (!params['phaseId']) {
      const phaseName = String(params['phaseName'] ?? '').trim().toLowerCase();
      params['phaseId'] = UpstreamApiService.PHASE_NAME_TO_ID[phaseName] ?? '2';
    }

    const history = await this.getAnalyticsHistory(params);
    const progress = Array.isArray(history?.progress) ? history.progress : [];
    const round = (n: number) => Math.round(n * 100) / 100;

    const dataPoints = progress
      .filter((p) => p?.period)
      .map((p) => ({
        date: String(p.period),
        completedKm: round((Number(p.cumulativeActual) || 0) / 1000),
        cumulativePlannedKm: round((Number(p.cumulativePlanned) || 0) / 1000),
      }));

    return { dataPoints, filters };
  }

  /**
   * Headline KPI tile (PLANNED / APPROVED / OVERALL COMPLETION).
   *
   * The gateway served this from its `kpi_total_planned` table — which
   * `runKpiSync` (sync.js:834) builds by calling
   * `/api/dashboard/progress-summary` once per contractor / ring / project and
   * converting metres to km. With one contractor there is nothing to roll up,
   * so the same numbers come from a single live call.
   *
   * `blocked_km` stays 0: the upstream summary has no blocked bucket, and the
   * gateway had none either at this grain.
   */
  async getKpiAggregate(
    params: Record<string, unknown> & {
      contractor?: string;
      projectId?: string;
      ringId?: string;
      aggregationMode?: string;
    }
  ): Promise<KpiAggregateResponse> {
    // Forward BOTH singular and plural filter names — the dashboard sends
    // multi-select values under ringIds / linkIds / contractorIds.
    const summary = await this.getProgressSummary({ ...params });
    const total = summary.grandTotal;
    const contractor = String(params.contractor ?? '').trim() || this.contractor || 'ALL';
    return {
      row: {
        contractor,
        project_id: String(params.projectId ?? 'ALL'),
        phase_id: 'ALL',
        total_planned_km: total.totalPlannedKm,
        completed_km: total.completedKm,
        in_progress_km: total.inProgressKm,
        pending_km: total.pendingKm,
        blocked_km: 0,
        fetched_at: Date.now(),
        status: 'ok',
        source_url: `${upstreamBaseUrl()}/api/dashboard/progress-summary`,
        is_dummy: 0,
      },
      stale: false,
      fetchedAt: Date.now(),
      sourceUrl: `${upstreamBaseUrl()}/api/dashboard/progress-summary`,
      aggregationMode: params.aggregationMode || 'upstream',
      aggregationSourceCount: 1,
    };
  }

  /**
   * Trenching / Ducting / Backfilling tiles.
   *
   * The gateway fanned out one `progress-summary?contractor=…&phaseId=…` call
   * per (contractor × phase) and summed them (dashboardV2.js:1419-1545). Here
   * that is three parallel calls — one per phase — because there is a single
   * contractor. Metres→km and the phase ids are identical to the gateway's.
   *
   * A phase that fails contributes zeros rather than rejecting the whole tile
   * row, matching the gateway's per-call catch.
   */
  async getPhaseKpiSummary(params?: {
    contractorIds?: string;
  }): Promise<PhaseKpiSummaryResponse> {
    const contractor =
      String(params?.contractorIds ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)[0] || this.contractor || 'UNKNOWN';

    const phases = await Promise.all(
      [...UpstreamApiService.KPI_PHASES, ...UpstreamApiService.EXTRA_PHASES].map(
        async ({ phaseName, phaseId }) => {
        const zero = {
          phaseName,
          totalPlannedKm: 0,
          completedKm: 0,
          inProgressKm: 0,
          pendingKm: 0,
          completionPercent: 0,
          contractors: [],
        };
        try {
          const summary = await this.getProgressSummary({ phaseId });
          const t = summary.grandTotal;
          const completionPercent =
            t.totalPlannedKm > 0
              ? +((t.completedKm / t.totalPlannedKm) * 100).toFixed(2)
              : 0;
          return {
            phaseName,
            totalPlannedKm: t.totalPlannedKm,
            completedKm: t.completedKm,
            inProgressKm: t.inProgressKm,
            pendingKm: t.pendingKm,
            completionPercent,
            contractors: [
              {
                contractor,
                totalPlannedKm: t.totalPlannedKm,
                completedKm: t.completedKm,
                inProgressKm: t.inProgressKm,
                pendingKm: t.pendingKm,
                completionPercent,
              },
            ],
          };
          } catch {
            console.warn(`[upstream] phase-kpi ${phaseName} (phaseId=${phaseId}) failed`);
            return zero;
          }
        }
      )
    );

    const pick = (name: string) => {
      const p = phases.find((x) => x.phaseName === name);
      return {
        totalPlannedKm: p?.totalPlannedKm ?? 0,
        completedKm: p?.completedKm ?? 0,
        inProgressKm: p?.inProgressKm ?? 0,
        pendingKm: p?.pendingKm ?? 0,
        completionPercent: p?.completionPercent ?? 0,
      };
    };

    return {
      phases,
      kpiSummary: {
        trenching: pick('Trenching'),
        ducting: pick('Ducting'),
        backfilling: pick('Backfilling'),
      },
      fetchedAt: Date.now(),
    };
  }

  /** Gateway palettes (aggregates.js:447-448) — keeps chart colours identical. */
  private static readonly CONTRACTOR_COLORS = [
    '#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#f97316', '#ec4899',
  ];
  private static readonly RING_COLORS = [
    '#2563eb', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#f97316', '#ef4444',
  ];

  /**
   * Ring Progress, Top Links, Contractor Comparison and the Ring × Contractor
   * heatmap.
   *
   * The gateway read these from `kpi_total_planned` at three grains
   * (aggregates.js:203). `runKpiSync` populated that table by calling
   * `/api/dashboard/progress-summary` once per ring (`?ringId=`) and once per
   * project (`?projectId=`) — so the same rows can be gathered live here.
   *
   * Cost: 1 + rings + links requests (~18 at current data size, ~1.2s each,
   * multiplexed over HTTP/2). The gateway amortised this in a background sync;
   * here it is paid on load. Results are memoised per filter signature so
   * re-opening a panel does not re-fan-out.
   *
   * Ring and link names come from the filters feed, since progress-summary
   * returns totals only. A failed grain contributes nothing rather than
   * rejecting the whole widget set.
   */
  async getKpiDimensions(params?: {
    contractor?: string;
    contractorIds?: string;
    ringId?: string;
    ringIds?: string;
    linkIds?: string;
  }): Promise<KpiDimensionsResponse> {
    const cacheKey = JSON.stringify(params ?? {});
    const cached = this.kpiDimensionsCache.get(cacheKey);
    if (cached && Date.now() - cached.at < 120_000) return cached.value;

    const filters = await this.getDashboardFilters({
      contractor: params?.contractorIds || params?.contractor,
      ringId: params?.ringIds || params?.ringId,
    });
    const ringNameById = new Map(filters.rings.map((r) => [r.id, r.name]));
    // Label for rows the API returns untagged. When the backend reports exactly
    // one contractor, trust it over the build-time config — a deployment
    // pointed at a new contractor would otherwise keep the configured name.
    const contractorName =
      (filters.contractors.length === 1 ? filters.contractors[0].name : '') ||
      this.contractor ||
      filters.contractors[0]?.name ||
      'UNKNOWN';

    // Honour an explicit link selection; otherwise take every link in scope.
    const linkFilter = this.toFilterSet(params?.linkIds);
    const links = linkFilter
      ? filters.links.filter((l) => linkFilter.has(l.id))
      : filters.links;

    const pct = (completed: number, total: number) =>
      total > 0 ? Math.min(100, (completed / total) * 100) : 0;

    const [contractorTotal, ringResults, linkResults] = await Promise.all([
      this.summaryTotals({}),
      Promise.all(
        filters.rings.map(async (ring) => ({
          ring,
          totals: await this.summaryTotals({ ringId: ring.id }),
        }))
      ),
      Promise.all(
        links.map(async (link) => ({
          link,
          totals: await this.summaryTotals({ projectId: link.id }),
        }))
      ),
    ]);

    const wholeBackend: KpiDimensionsResponse['contractors'] = contractorTotal
      ? [
          {
            name: contractorName,
            totalKm: contractorTotal.totalKm,
            completedKm: contractorTotal.completedKm,
            inProgressKm: contractorTotal.inProgressKm,
            pendingKm: contractorTotal.pendingKm,
            completedPct: pct(contractorTotal.completedKm, contractorTotal.totalKm),
            color: UpstreamApiService.CONTRACTOR_COLORS[0],
          },
        ]
      : [];

    const rings = ringResults
      .filter((r) => r.totals && r.totals.totalKm > 0)
      .map((r, i) => ({
        id: r.ring.id,
        name: r.ring.name,
        totalKm: r.totals!.totalKm,
        completedKm: r.totals!.completedKm,
        inProgressKm: r.totals!.inProgressKm,
        pendingKm: r.totals!.pendingKm,
        completedPct: pct(r.totals!.completedKm, r.totals!.totalKm),
        color: UpstreamApiService.RING_COLORS[i % UpstreamApiService.RING_COLORS.length],
      }));

    // Same thresholds as the gateway (aggregates.js:512): >=70% on-track,
    // >=40% at-risk, else delayed.
    const projects = linkResults
      .filter((r) => r.totals && r.totals.totalKm > 0)
      .map((r) => {
        const ratio = r.totals!.completedKm / r.totals!.totalKm;
        return {
          projectId: r.link.id,
          linkName: r.link.name || `Project ${r.link.id}`,
          ringId: String(r.link.ringId ?? ''),
          ringName: ringNameById.get(String(r.link.ringId ?? '')) ?? `Ring ${r.link.ringId}`,
          contractorName: r.link.contractor || contractorName,
          totalKm: r.totals!.totalKm,
          completedKm: r.totals!.completedKm,
          inProgressKm: r.totals!.inProgressKm,
          pendingKm: r.totals!.pendingKm,
          completedPct: pct(r.totals!.completedKm, r.totals!.totalKm),
          status: (ratio >= 0.7 ? 'on-track' : ratio >= 0.4 ? 'at-risk' : 'delayed') as
            | 'on-track'
            | 'at-risk'
            | 'delayed',
        };
      });

    // Projects carry their own `contractor` field, so a backend hosting several
    // contractors (e.g. MHD and OHI) can be split per contractor from the link
    // totals already fetched. Only when no project is tagged do we fall back to
    // labelling the whole backend with a single name.
    const taggedProjects = projects.filter((p) => links.some((l) => l.id === p.projectId && l.contractor));
    const contractorNames = Array.from(new Set(projects.map((p) => p.contractorName))).sort((a, b) =>
      a.localeCompare(b)
    );
    const sumKm = (rows: typeof projects) => ({
      totalKm: rows.reduce((s, p) => s + p.totalKm, 0),
      completedKm: rows.reduce((s, p) => s + p.completedKm, 0),
      inProgressKm: rows.reduce((s, p) => s + p.inProgressKm, 0),
      pendingKm: rows.reduce((s, p) => s + p.pendingKm, 0),
    });
    const splitByContractor = taggedProjects.length > 0;

    const contractors: KpiDimensionsResponse['contractors'] = splitByContractor
      ? contractorNames.map((name, i) => {
          const t = sumKm(projects.filter((p) => p.contractorName === name));
          return {
            name,
            ...t,
            completedPct: pct(t.completedKm, t.totalKm),
            color: UpstreamApiService.CONTRACTOR_COLORS[i % UpstreamApiService.CONTRACTOR_COLORS.length],
          };
        })
      : wholeBackend;

    // Every row lists the same contractors in the same order — the heatmap
    // takes its column headers from the first row.
    const matrix = rings.map((ring) => ({
      ringId: ring.id,
      ringName: ring.name,
      contractors: splitByContractor
        ? contractorNames.map((name) => {
            const t = sumKm(projects.filter((p) => p.contractorName === name && p.ringId === ring.id));
            return {
              name,
              totalKm: t.totalKm,
              completedKm: t.completedKm,
              completedPct: pct(t.completedKm, t.totalKm),
            };
          })
        : [
            {
              name: contractorName,
              totalKm: ring.totalKm,
              completedKm: ring.completedKm,
              completedPct: ring.completedPct,
            },
          ],
    }));

    const value: KpiDimensionsResponse = {
      contractors,
      rings,
      matrix,
      projects,
      delayedCount: projects.filter((p) => p.status === 'delayed').length,
      fetchedAt: Date.now(),
    };
    this.kpiDimensionsCache.set(cacheKey, { at: Date.now(), value });
    return value;
  }

  private readonly kpiDimensionsCache = new Map<
    string,
    { at: number; value: KpiDimensionsResponse }
  >();

  /** One progress-summary call reduced to km totals. null when it fails. */
  private async summaryTotals(filters: Record<string, unknown>): Promise<{
    totalKm: number;
    completedKm: number;
    inProgressKm: number;
    pendingKm: number;
  } | null> {
    try {
      const s = await this.getProgressSummary(filters);
      return {
        totalKm: s.grandTotal.totalPlannedKm,
        completedKm: s.grandTotal.completedKm,
        inProgressKm: s.grandTotal.inProgressKm,
        pendingKm: s.grandTotal.pendingKm,
      };
    } catch {
      return null;
    }
  }

  // --- History / phases (present upstream, need shape adapters) ----------

  /**
   * Upstream returns a bare array of `{name, id, order}` for ALL phases; the
   * gateway returned `{phases:[{phaseId, phaseName, segmentCount}]}` limited to
   * phases with cached geometry.
   *
   * `segmentCount` has no upstream equivalent and is set to 0 — safe here
   * because nothing in the UI reads `SegmentPhaseOption.segmentCount` (the
   * `segmentCounts` tiles in app.component.html are a different source).
   */
  async getSegmentPhases(): Promise<SegmentPhasesResponse> {
    const response = await this.http.get<unknown>('/api/segments/phases');
    const list = Array.isArray(response.data) ? response.data : [];
    const phases = list
      .map((entry) => {
        const row = (entry ?? {}) as Record<string, unknown>;
        const phaseId = Number(row['id']);
        const phaseName = String(row['name'] ?? '').trim();
        return Number.isFinite(phaseId) && phaseName
          ? { phaseId, phaseName, segmentCount: 0 }
          : null;
      })
      .filter((p): p is SegmentPhaseOption => p !== null);
    return { phases };
  }

  /**
   * Cumulative analytics history.
   *
   * Upstream supplies summary/progress/forecast but omits `contractors`,
   * `sources`, `coverage` and `meta` — those described the gateway's five-host
   * fan-out, which does not exist when talking to one backend. They are filled
   * with single-host equivalents rather than left undefined.
   *
   * `coverage.upstream` is set to 1 when progress data came back. That field is
   * only read to choose an empty-state message (executive-dashboard.component
   * .ts:3363); leaving it 0 would wrongly report "no contractor host returned
   * progress history" whenever a range simply had no work in it.
   */
  async getAnalyticsHistory(
    params: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<AnalyticsHistoryResponse> {
    const response = await this.http.get<Record<string, unknown>>(
      '/api/dashboard/analytics/history',
      { params, signal, timeout: upstreamSegmentsTimeoutMs() }
    );
    const data = response.data ?? {};
    const progress = Array.isArray(data['progress']) ? (data['progress'] as unknown[]) : [];
    const contractor = String(data['contractor'] ?? '') || this.contractor;
    return {
      ...(data as object),
      contractor: contractor || null,
      contractors: Array.isArray(data['contractors']) ? data['contractors'] : [],
      sources: Array.isArray(data['sources'])
        ? data['sources']
        : contractor
          ? [{ contractor, status: 'ok', origin: 'upstream' }]
          : [],
      coverage: (data['coverage'] as object) ?? {
        requested: 1,
        upstream: progress.length ? 1 : 0,
        derived: 0,
        failed: 0,
      },
      meta: (data['meta'] as object) ?? {
        cached: false,
        fetchedAt: Date.now(),
        hasPlanBaseline: false,
        units: { summary: 'km', progress: 'm' },
        warnings: [],
      },
    } as AnalyticsHistoryResponse;
  }

  /**
   * Every phase the gateway queries for daily history when no phase filter is
   * given (phaseHistory.routes.js:39).
   */
  private static readonly ALL_HISTORY_PHASES: Array<{ phaseId: string; phaseName: string }> = [
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
   * Phase-wise daily progress — the Daily Progress chart.
   *
   * A single upstream call returns ONE phase (it defaults to phaseId=2,
   * Trenching) with records shaped
   * `{date, submittedWork, pmApprovedWork, approvedWork, totalWorkDone}` — all
   * in METRES, and with no `byPhase` map.
   *
   * The chart reads `record.totalWorkDoneKm` and `record.byPhase['2'|'4'|'9']`,
   * so a passthrough leaves both undefined and every bar renders 0.
   *
   * This reproduces the gateway's merge (phaseHistory.routes.js:149): fan out
   * one call per phase, seed a bucket for every date in the window so the
   * series has no holes, sum the metre fields, and expose per-phase km under
   * `byPhase` keyed by phaseId. A phase whose call fails is recorded in
   * `failures` instead of aborting the chart.
   */
  async getPhaseWiseProgressHistory(
    params: Record<string, unknown>
  ): Promise<PhaseHistoryResponse> {
    const fromDate = String(params['fromDate'] ?? '').slice(0, 10);
    const toDate = String(params['toDate'] ?? '').slice(0, 10);

    // Honour an explicit phase filter; otherwise query the full set.
    const explicitPhaseId = String(params['phaseId'] ?? '').trim();
    const phases = explicitPhaseId
      ? UpstreamApiService.ALL_HISTORY_PHASES.filter((p) => p.phaseId === explicitPhaseId)
      : UpstreamApiService.ALL_HISTORY_PHASES;

    const dates = this.enumerateDates(fromDate, toDate);
    const toKm = (m: number) => +(m / 1000).toFixed(3);

    const dayMap = new Map<
      string,
      {
        date: string;
        submittedWork: number;
        pmApprovedWork: number;
        approvedWork: number;
        totalWorkDone: number;
        byPhase: Record<string, number>;
      }
    >();
    for (const date of dates) {
      dayMap.set(date, {
        date,
        submittedWork: 0,
        pmApprovedWork: 0,
        approvedWork: 0,
        totalWorkDone: 0,
        byPhase: Object.fromEntries(phases.map((p) => [p.phaseId, 0])),
      });
    }

    const failures: Array<{ contractor: string; phaseId: string; error: string }> = [];
    const contractor = this.contractor || 'UNKNOWN';

    const settled = await Promise.all(
      phases.map(async (phase) => {
        try {
          const response = await this.http.get<Record<string, unknown>>(
            '/api/dashboard/phase-wise-progress-history',
            {
              params: { ...params, phaseId: phase.phaseId },
              timeout: upstreamSegmentsTimeoutMs(),
            }
          );
          const recs = response.data?.['records'];
          return { phase, records: Array.isArray(recs) ? (recs as Array<Record<string, unknown>>) : [] };
        } catch (error) {
          failures.push({
            contractor,
            phaseId: phase.phaseId,
            error: (error as Error)?.message ?? 'request failed',
          });
          return { phase, records: [] as Array<Record<string, unknown>> };
        }
      })
    );

    const contractorByDate: Record<string, number> = {};
    for (const { phase, records } of settled) {
      for (const rec of records) {
        const date = String(rec['date'] ?? '').slice(0, 10);
        const bucket = dayMap.get(date);
        if (!bucket) continue; // outside the requested window
        const done = Number(rec['totalWorkDone']) || 0;
        bucket.submittedWork += Number(rec['submittedWork']) || 0;
        bucket.pmApprovedWork += Number(rec['pmApprovedWork']) || 0;
        bucket.approvedWork += Number(rec['approvedWork']) || 0;
        bucket.totalWorkDone += done;
        bucket.byPhase[phase.phaseId] = +(
          (bucket.byPhase[phase.phaseId] || 0) + done / 1000
        ).toFixed(3);
        contractorByDate[date] = +((contractorByDate[date] || 0) + done / 1000).toFixed(3);
      }
    }

    const records = dates.map((date) => {
      const b = dayMap.get(date)!;
      return {
        date,
        // Metre fields kept as upstream sends them…
        submittedWork: +b.submittedWork.toFixed(4),
        pmApprovedWork: +b.pmApprovedWork.toFixed(4),
        approvedWork: +b.approvedWork.toFixed(4),
        totalWorkDone: +b.totalWorkDone.toFixed(4),
        // …plus the km values the charts actually bind to.
        submittedKm: toKm(b.submittedWork),
        pmApprovedKm: toKm(b.pmApprovedWork),
        approvedKm: toKm(b.approvedWork),
        totalWorkDoneKm: toKm(b.totalWorkDone),
        byPhase: b.byPhase,
      };
    });

    return {
      fromDate,
      toDate,
      totalDays: dates.length,
      phaseId: explicitPhaseId || null,
      phaseName: explicitPhaseId
        ? (phases[0]?.phaseName ?? null)
        : null,
      phasesQueried: phases,
      contractorsQueried: [contractor],
      contractorSeries: [
        {
          contractor,
          records: dates.map((date) => ({
            date,
            totalWorkDoneKm: contractorByDate[date] || 0,
          })),
        },
      ],
      records,
      failures,
    } as unknown as PhaseHistoryResponse;
  }

  /** Inclusive list of yyyy-mm-dd dates. Empty when the range is invalid. */
  private enumerateDates(fromDate: string, toDate: string): string[] {
    if (!fromDate || !toDate) return [];
    const start = new Date(`${fromDate}T00:00:00Z`);
    const end = new Date(`${toDate}T00:00:00Z`);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) return [];
    const out: string[] = [];
    for (let d = start; d <= end; d = new Date(d.getTime() + 86_400_000)) {
      out.push(d.toISOString().slice(0, 10));
    }
    return out;
  }

  // --- Daily Progress Report export (PDF / Excel) ------------------------

  /**
   * Daily Progress Report download, ported from the reference app's
   * `DprService` (neotecx_dashbaord_ui/src/app/services/dpr.service.ts).
   *
   *   pdf   -> GET /api/dpr/download        (application/octet-stream, %PDF)
   *   excel -> GET /api/dpr/download-excel  (…spreadsheetml.sheet, PK zip)
   *
   * Query params: date (required), plus optional ringId / projectId /
   * contractor / approvedOnly. Verified against tcpms.mhditics.com — the PDF
   * comes back as octet-stream, so the blob type is set explicitly rather than
   * trusting the response header, otherwise browsers may not preview it.
   *
   * These are contractor-API endpoints; the Node gateway never proxied them.
   */
  async downloadDpr(
    type: 'pdf' | 'excel',
    payload: {
      date: string;
      ringId?: string | null;
      projectId?: string | null;
      contractor?: string | null;
      approvedOnly?: boolean;
      /** Display names, used only to build a readable filename. */
      ringLabel?: string | null;
      projectLabel?: string | null;
    }
  ): Promise<{ blob: Blob; filename: string }> {
    const params: Record<string, string> = { date: payload.date };
    // 'R1' -> '1', same normalisation the summary endpoints need.
    //
    // Both ids must end up NUMERIC: the endpoints validate them and answer
    // HTTP 400 "Invalid value for parameter 'ringId': <value>" otherwise. A
    // ring *name* used to reach here from the dashboard's dropdown and broke
    // every ring-scoped export. Callers now translate, and a value that still
    // is not numeric is dropped rather than sent — a wider report beats a
    // failed download.
    const ringId = String(payload.ringId ?? '').trim().replace(/^R/i, '');
    if (ringId && ringId.toUpperCase() !== 'ALL') {
      if (/^\d+$/.test(ringId)) params['ringId'] = ringId;
      else console.warn(`[dpr] ignoring non-numeric ringId '${ringId}'`);
    }
    const projectId = String(payload.projectId ?? '').trim();
    if (projectId && projectId.toUpperCase() !== 'ALL') {
      if (/^\d+$/.test(projectId)) params['projectId'] = projectId;
      else console.warn(`[dpr] ignoring non-numeric projectId '${projectId}'`);
    }
    const contractor = String(payload.contractor ?? '').trim() || this.contractor;
    if (contractor && contractor.toUpperCase() !== 'ALL') params['contractor'] = contractor;
    if (payload.approvedOnly !== undefined) {
      params['approvedOnly'] = String(payload.approvedOnly);
    }

    const path = type === 'pdf' ? '/api/dpr/download' : '/api/dpr/download-excel';
    const response = await this.http.get(path, {
      params,
      responseType: 'blob',
      // Report generation is slower than a JSON read (~3s observed).
      timeout: upstreamSegmentsTimeoutMs(),
    });

    // A JSON body here is an error the server sent with a 2xx status. Without
    // this check it was written straight to disk, producing an .xlsx that
    // Excel then refused to open — a failure that looks identical to a
    // corrupt download and is much harder to diagnose than a message.
    const payloadBlob = response.data as Blob;
    if (payloadBlob?.type?.includes('json')) {
      throw new Error((await this.readErrorBlob(payloadBlob)) || 'Server returned an error.');
    }
    if (!payloadBlob?.size) throw new Error('Server returned an empty file.');

    const mime =
      type === 'pdf'
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const blob = new Blob([payloadBlob as BlobPart], { type: mime });

    return { blob, filename: this.buildDprFileName(type, payload) };
  }

  /**
   * Human-readable reason a `downloadDpr` call failed, for display in the UI.
   *
   * With `responseType: 'blob'` an error body arrives as a Blob rather than
   * parsed JSON, so `error.response.data.message` is always undefined and the
   * server's own explanation ("Invalid value for parameter 'ringId'") is lost.
   * Read it back out. Returns '' when there is nothing useful to show, letting
   * the caller fall back to its generic wording.
   */
  async describeDownloadError(error: unknown): Promise<string> {
    const err = error as {
      message?: string;
      code?: string;
      response?: { status?: number; data?: unknown };
    };

    const data = err?.response?.data;
    if (data instanceof Blob) {
      const text = await this.readErrorBlob(data);
      if (text) return text;
    } else if (typeof data === 'string' && data.trim()) {
      return data.trim().slice(0, 200);
    } else if (data && typeof data === 'object') {
      const msg = (data as { message?: string; error?: string }).message
        ?? (data as { error?: string }).error;
      if (msg) return String(msg).slice(0, 200);
    }

    const status = err?.response?.status;
    if (status === 401 || status === 403) return 'your session is not authorised — sign in again.';
    if (status === 404) return 'no report is available for this date.';
    if (status) return `server responded ${status}.`;
    if (err?.code === 'ECONNABORTED') return 'the request timed out.';
    return err?.message ? String(err.message).slice(0, 200) : '';
  }

  /** Pull `{ message }` (or raw text) out of a JSON error body sent as a Blob. */
  private async readErrorBlob(blob: Blob): Promise<string> {
    try {
      const text = (await blob.text()).trim();
      if (!text) return '';
      try {
        const parsed = JSON.parse(text) as { message?: string; error?: string };
        const msg = parsed.message || parsed.error;
        if (msg) return String(msg).slice(0, 200);
      } catch {
        // Not JSON — fall through and show the raw text.
      }
      return text.slice(0, 200);
    } catch {
      return '';
    }
  }

  /**
   * `DPR_<scope>_<date>.<ext>`, mirroring the reference app's
   * `buildDprFileName`. Non-alphanumerics are collapsed to underscores so the
   * name is safe on every OS.
   */
  private buildDprFileName(
    type: 'pdf' | 'excel',
    payload: {
      date: string;
      ringId?: string | null;
      projectId?: string | null;
      ringLabel?: string | null;
      projectLabel?: string | null;
    }
  ): string {
    const ext = type === 'pdf' ? 'pdf' : 'xlsx';
    const sanitize = (v: unknown) =>
      String(v ?? '')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
    // Prefer the display name: 'Muscat_Ring' tells the recipient what the file
    // covers, where the bare id '1' the API needs does not.
    const parts = [
      sanitize(payload.ringLabel || payload.ringId),
      sanitize(payload.projectLabel || payload.projectId),
    ].filter(Boolean);
    const scope = parts.length ? parts.join('_') : 'All_Rings';
    return `DPR_${scope}_${payload.date}.${ext}`;
  }

  /** Trigger a browser download for a blob produced by `downloadDpr`. */
  saveBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Dashboard summary — the GIS map's KPI tiles (Total Length / Deployed /
   * In Progress / Completed / Blocked).
   *
   * `/api/dashboard/summary` is gateway-only and 404s upstream, which left
   * every tile reading 0. The gateway derived it from the same
   * `progress-summary` totals used everywhere else, so rebuild it here.
   *
   * Segment COUNTS are returned as 0: this endpoint reports lengths, not
   * segment tallies, and inventing them would put wrong numbers on screen.
   * The map's tiles read only the km values and `completionPercent`.
   */
  async getDashboardSummary(
    filters: Record<string, unknown> = {}
  ): Promise<DashboardSummaryResponse> {
    const s = await this.getProgressSummary(filters);
    const t = s.grandTotal;
    return {
      totalRouteLength: t.totalPlannedKm,
      completedKm: t.completedKm,
      inProgressKm: t.inProgressKm,
      pendingKm: t.pendingKm,
      totalSegments: 0,
      completedSegments: 0,
      inProgressSegments: 0,
      pendingSegments: 0,
      blockedSegments: 0,
      completionPercent: t.completionPercent,
      filters,
    };
  }

  /**
   * Selectable phases for the phase dropdown.
   *
   * The gateway's `/api/dashboard/phase-list` returned a hardcoded constant, not
   * a query (phaseHistory.routes.js:265) — the same 15 entries as
   * ALL_HISTORY_PHASES, which is reused here so the two cannot drift.
   *
   * Deliberately NOT sourced from `/api/segments/phases`: that lists the 27
   * phases with segment geometry, a different and longer set than the dropdown
   * has ever shown.
   */
  async getPhaseList(): Promise<PhaseListResponse> {
    return { phases: UpstreamApiService.ALL_HISTORY_PHASES.map((p) => ({ ...p })) };
  }

  /**
   * Planned vs actual, bucketed by period.
   *
   * Built from `analytics/history`, which returns real dated observations. The
   * gateway's `/api/dashboard/ext-planned-vs-actual` first tried an upstream
   * path that 404s (`/api/dashboard/planned-vs-actual` — verified), then fell
   * back to a local handler that bucketed its own `sync_runs` timestamps and
   * linearly interpolated toward the latest total (dashboardV2.js:437). Those
   * buckets described when the gateway last polled, not when work happened.
   *
   * UNITS: `progress[]` is in METRES upstream; converted to km here.
   *
   * A `phaseId` is mandatory — omitting it makes upstream sum every phase over
   * the same routes and report roughly twice the project scope. Defaults to 2
   * (Trenching), matching the gateway's own AGGREGATE_DEFAULT_PHASE_ID.
   *
   * A date window is also effectively mandatory: without one upstream collapses
   * the whole project to a SINGLE current period (verified), and one bucket is
   * useless as a trend — program-dashboard.component.ts:35 even swaps in
   * hardcoded demo numbers when it receives `buckets.length <= 1`. Defaults to
   * the trailing 6 months, the same window the gateway fell back to.
   *
   * PLAN BASELINE: upstream returns `cumulativePlanned: 0` for every point and
   * `summary.plannedKm: 0` — it holds no plan baseline for this contract. So
   * `plannedKm` is genuinely 0, not missing, and `filters.plannedBaseline`
   * records that so a flat planned series is not mistaken for a data bug. The
   * gateway hid this by smearing the current total over an invented curve; a
   * fabricated baseline is worse than an absent one, so none is invented here.
   */
  async getPlannedVsActual(
    filters: Record<string, unknown> = {}
  ): Promise<PlannedVsActualResponse> {
    const granularity =
      String(filters['granularity'] ?? 'monthly').toLowerCase() === 'weekly'
        ? 'weekly'
        : 'monthly';

    const { fromDate, toDate } = this.defaultHistoryWindow(filters, granularity);

    const history = await this.getAnalyticsHistory({
      phaseId: String(filters['phaseId'] ?? '2'),
      granularity: granularity === 'weekly' ? 'WEEKLY' : 'MONTHLY',
      ...this.historyScopeParams(filters),
      fromDate,
      toDate,
    });

    const buckets: PlannedVsActualBucket[] = (history.progress ?? [])
      .filter((point) => point && point.period)
      .map((point) => ({
        period: String(point.period),
        plannedKm: this.metresToKm(point.cumulativePlanned),
        actualKm: this.metresToKm(point.cumulativeActual),
      }));

    const hasPlan = buckets.some((b) => b.plannedKm > 0);

    return {
      buckets,
      granularity,
      filters: {
        ...filters,
        fromDate,
        toDate,
        plannedBaseline: hasPlan ? 'upstream' : 'unavailable',
      },
    };
  }

  /**
   * Caller-supplied window, or a trailing default wide enough to produce a
   * trend: 6 months for monthly buckets, 12 weeks for weekly ones.
   */
  private defaultHistoryWindow(
    filters: Record<string, unknown>,
    granularity: 'monthly' | 'weekly'
  ): { fromDate: string; toDate: string } {
    const ymd = (date: Date): string => date.toISOString().slice(0, 10);
    const given = (key: string): string => String(filters[key] ?? '').trim();

    const toDate = given('toDate') || ymd(new Date());
    let fromDate = given('fromDate');
    if (!fromDate) {
      const start = new Date(toDate);
      if (granularity === 'weekly') start.setDate(start.getDate() - 7 * 12);
      else start.setMonth(start.getMonth() - 6);
      fromDate = ymd(start);
    }
    return { fromDate, toDate };
  }

  /**
   * Scope params analytics/history accepts, translated from dashboard filters.
   *
   * Upstream takes singular `contractor` / `ringId` / `routeId`, and rejects a
   * ring id carrying the gateway's `R` prefix (`?ringId=R1` → 400). Multi-select
   * values arrive comma-joined; only the first is sent, since upstream has no
   * multi-value form — the rest cannot be pushed down.
   */
  private historyScopeParams(filters: Record<string, unknown>): Record<string, string> {
    const out: Record<string, string> = {};
    const first = (...keys: string[]): string => {
      for (const key of keys) {
        const raw = String(filters[key] ?? '').trim();
        if (raw && raw.toUpperCase() !== 'ALL') return raw.split(',')[0].trim();
      }
      return '';
    };

    const contractor = first('contractor', 'contractorIds');
    if (contractor) out['contractor'] = contractor;

    const ringId = first('ringId', 'ringIds');
    if (ringId) out['ringId'] = ringId.replace(/^R/i, '');

    const routeId = first('projectId', 'linkId', 'linkIds');
    if (routeId) out['projectId'] = routeId;

    return out;
  }

  private metresToKm(value: unknown): number {
    const n = Number(value);
    if (!Number.isFinite(n) || n === 0) return 0;
    return Math.round((n / 1000) * 100) / 100;
  }

  /**
   * One-shot dashboard bootstrap, composed from three direct calls.
   *
   * The gateway assembled this from its own SQLite cache (dashboard.js:708);
   * each piece has a direct equivalent, so the composition moves here. Pieces
   * are fetched together and settled independently — the gateway wrapped each
   * read in its own try/catch, so one failure never emptied the whole response.
   *
   * Two fields cannot come from upstream:
   *  - `sync.recentRuns` described the gateway's background sync, which no
   *    longer exists. Always empty; the UI renders it as "no recent syncs".
   *  - `routesSegments` is served ONLY from cache, never fetched. That call
   *    costs ~60s and is killed by the contractor's proxy (see
   *    UpstreamSegmentsUnavailableError), so blocking bootstrap on it would
   *    stall first paint for every user. Callers that need segments request
   *    them separately, and get them here for free once warm.
   *
   * `contractorStale` / `routesStale` are false: staleness meant "the cached
   * copy is older than CACHE_TTL_MINUTES", and a direct read is never stale.
   */
  async getDashboardBootstrap(
    projectId: string,
    query: Record<string, unknown> = {}
  ): Promise<DashboardBootstrapResponse> {
    const phaseId = String(query['phaseId'] ?? '2');
    const wantsDistribution = Boolean(projectId) && projectId.toUpperCase() !== 'ALL';

    const [distribution, contractorStatus, kpis] = await Promise.allSettled([
      wantsDistribution
        ? this.getOverallDistribution(projectId)
        : Promise.resolve(null),
      this.getContractorProjectStatus(),
      this.getKpiAggregate({
        contractor: this.asScalar(query['contractor']),
        projectId: this.asScalar(query['linkId']),
        ringId: this.asScalar(query['ringId']),
      }),
    ]);

    const cachedSegments = this.segmentsCache.get(phaseId) ?? null;

    return {
      projectId,
      phaseId,
      overallDistribution: distribution.status === 'fulfilled' ? distribution.value : null,
      contractorStatus: contractorStatus.status === 'fulfilled' ? contractorStatus.value : null,
      contractorStale: false,
      routesSegments: cachedSegments,
      routesStale: false,
      kpis:
        kpis.status === 'fulfilled'
          ? kpis.value
          : { row: null, stale: true, hint: 'Contractor API did not return KPI totals.' },
      sync: { recentRuns: [] },
    };
  }

  /** Drop 'ALL' and multi-select lists down to a single value, or undefined. */
  private asScalar(value: unknown): string | undefined {
    const raw = String(value ?? '').trim();
    if (!raw || raw.toUpperCase() === 'ALL') return undefined;
    return raw.split(',')[0].trim() || undefined;
  }

  // --- GIS map GeoJSON layers --------------------------------------------

  /**
   * Gateway map path → contractor API path.
   *
   * The gateway's `/api/map/geojson/*` routes (geojsonMap.js:585+) were thin
   * proxies: resolve the contractor's slot, forward `contractor` / `ringId` /
   * `projectId`, return the FeatureCollection unchanged. With one backend the
   * slot resolution is moot, so only the path differs.
   */
  private static readonly MAP_PATHS: Record<string, string> = {
    '/api/map/geojson/routes': '/api/routes/geojson/routes',
    '/api/map/geojson/by-contractor': '/api/routes/geojson-by-contractor',
    '/api/map/geojson/route-elements': '/api/routes/geojson/route-elements',
    '/api/map/geojson/markers': '/api/routes/geojson/markers',
  };

  /** Whether this gateway map path can be served straight from upstream. */
  supportsMapPath(gatewayPath: string): boolean {
    return this.enabled && gatewayPath in UpstreamApiService.MAP_PATHS;
  }

  /**
   * Fetch a GeoJSON layer directly from the contractor API.
   *
   * Verified against tcpms.mhditics.com:
   *   routes           13 features   1.2 MB
   *   by-contractor  2995 features   3.1 MB
   *   route-elements  949 features   1.4 MB
   *   markers        2033 features   533 KB
   *
   * `by-contractor` 400s without a `contractor` param, so the configured
   * contractor is supplied when the caller omits it.
   */
  async getMapGeoJson(
    gatewayPath: string,
    params?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<unknown> {
    const path = UpstreamApiService.MAP_PATHS[gatewayPath];
    if (!path) throw new Error(`No upstream equivalent for ${gatewayPath}`);

    const query: Record<string, string> = {};
    const contractor = String(params?.['contractor'] ?? '').trim();
    // Upstream rejects by-contractor without this, and 'ALL' is not a
    // contractor name — fall back to the one this deployment serves.
    const resolved =
      contractor && contractor.toUpperCase() !== 'ALL' ? contractor : this.contractor;
    if (resolved) query['contractor'] = resolved;

    const ringId = String(params?.['ringId'] ?? '').trim();
    if (ringId && ringId.toUpperCase() !== 'ALL') {
      query['ringId'] = ringId.replace(/^R/i, '');
    }
    const projectId = String(params?.['projectId'] ?? '').trim();
    if (projectId && projectId.toUpperCase() !== 'ALL') query['projectId'] = projectId;

    const response = await this.http.get<unknown>(path, {
      params: query,
      signal,
      // Layers run to a few MB and take 3-4s; the default 30s is too tight
      // once several fire together.
      timeout: upstreamSegmentsTimeoutMs(),
    });
    return response.data;
  }

  // --- KML / KMZ export --------------------------------------------------

  /**
   * Route export straight from the contractor API (`/api/kml/routes/export`,
   * verified 200).
   *
   * Serves both gateway routes, which differed only in fan-out:
   *   /api/kml/routes/export      — thin proxy for one contractor
   *   /api/dashboard/routes-export — fetched every contractor slot and zipped
   *                                  the results (dashboard.js:608)
   * With a single backend the zip wrapper had nothing to combine, so the raw
   * upstream export is the whole answer.
   *
   * `ringId` is sent without the gateway's `R` prefix, which upstream rejects
   * with 400.
   */
  async exportRoutes(params: Record<string, unknown>, format: string): Promise<Blob> {
    const query: Record<string, string> = { format };
    const put = (key: string, value: unknown): void => {
      const raw = String(value ?? '').trim();
      if (raw && raw.toUpperCase() !== 'ALL') query[key] = raw;
    };

    // gis-map builds the payload with the PLURAL name (a joined multi-select);
    // read both or a contractor selection is silently dropped from the export.
    put('contractor', params['contractor'] ?? params['contractorIds']);
    put('projectId', params['projectId']);
    put('phaseId', params['phaseId']);
    put('statusFilter', params['statusFilter']);
    const ringId = String(params['ringId'] ?? '').trim();
    if (ringId && ringId.toUpperCase() !== 'ALL') query['ringId'] = ringId.replace(/^R/i, '');
    for (const flag of ['onlyCompleted', 'backboneOnly', 'includeMarkers']) {
      if (params[flag] !== undefined && params[flag] !== null) {
        query[flag] = String(params[flag]);
      }
    }
    const routeIds = params['routeIds'];
    if (Array.isArray(routeIds) && routeIds.length) query['routeIds'] = routeIds.join(',');

    const response = await this.http.get<Blob>('/api/kml/routes/export', {
      params: query,
      responseType: 'blob',
      // Generation is slow upstream; matches the gateway's 10-minute ceiling.
      timeout: 600_000,
    });
    return response.data;
  }

  // --- Media (gateway routes were pure proxies) --------------------------

  /** Proof metadata for a segment. Returns [] on any error, as the gateway did. */
  async getSegmentProofs(segmentId: string | number): Promise<unknown[]> {
    try {
      const response = await this.http.get<unknown>(
        `/api/proofs/segment/${encodeURIComponent(String(segmentId))}`
      );
      return this.asArray(response.data);
    } catch {
      return [];
    }
  }

  /** Geophotos for a segment. Returns [] on any error. */
  async getSegmentGeophotos(segmentId: string | number): Promise<unknown[]> {
    try {
      const response = await this.http.get<unknown>(
        `/api/geophotos/segment/${encodeURIComponent(String(segmentId))}`
      );
      return this.asArray(response.data);
    } catch {
      return [];
    }
  }

  /**
   * Absolute URL for a proof image. Note: the gateway streamed these and could
   * attach the upstream token server-side; a direct <img src> cannot send an
   * Authorization header, so this only works if the contractor API serves
   * proof downloads unauthenticated or via a query token.
   */
  proofDownloadUrl(proofId: string | number): string {
    return `${upstreamBaseUrl()}/api/proofs/download/${encodeURIComponent(String(proofId))}`;
  }

  private asArray(data: unknown): unknown[] {
    if (Array.isArray(data)) return data;
    const record = data as Record<string, unknown> | null;
    for (const key of ['data', 'proofs', 'photos', 'items', 'results']) {
      const value = record?.[key];
      if (Array.isArray(value)) return value;
    }
    return [];
  }
}

/**
 * Module singleton for callers outside Angular DI — `dashboard.service.ts` is
 * a plain function module, not an injectable. The DI token above resolves to
 * this same instance so components and functions share one axios client.
 */
export const upstreamApi = new UpstreamApiService();
