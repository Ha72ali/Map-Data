import axios, { AxiosError, isAxiosError } from 'axios';
import { environment } from '../environments/environment';
import { apiBaseUrl } from './api-base';
import {
  fetchMapGeoJsonAssetFallback,
  mapGeoJsonApiOrigin,
  mapGeoJsonDebugLog,
  mapGeoJsonRequestTimeoutMs,
} from './map/map-geojson-loader';
import { mapApiBaseUrl } from './map-api-base';
import { mapGeoCacheKey, readMapGeoCache, writeMapGeoCache } from './map-geo-cache';
import { countGeoJsonFeatures } from './map-geojson';
import { repairDeepStrings } from './text-encoding.util';
import { upstreamApi } from './services/upstream-api.service';
import { portalBearerToken } from './core/services/external-session.service';

const api = axios.create({
  timeout: 5000,
});

const apiLong = axios.create({
  timeout: 25000,
});

/** GeoJSON / map layers can be slow upstream; longer timeout than dashboard widgets. */
const apiMap = axios.create({
  timeout: mapGeoJsonRequestTimeoutMs(),
});

/**
 * Attach the portal session token.
 *
 * These axios instances bypass Angular's HttpClient, so `authInterceptor`
 * never sees them — without this, every dashboard data call would go out
 * unauthenticated while the RBAC/admin screens (which do use HttpClient) were
 * authenticated. Read per request so a token rotated in another tab is picked
 * up. No-op when portal mode is off.
 */
function attachAuthInterceptor(instance: ReturnType<typeof axios.create>): void {
  instance.interceptors.request.use((config) => {
    const token = portalBearerToken();
    if (token) {
      config.headers.set('Authorization', token);
    }
    return config;
  });
}

function attachBaseUrlInterceptor(instance: ReturnType<typeof axios.create>): void {
  instance.interceptors.request.use((config) => {
    config.baseURL = apiBaseUrl();
    return config;
  });
}

attachBaseUrlInterceptor(api);
attachBaseUrlInterceptor(apiLong);
attachAuthInterceptor(api);
attachAuthInterceptor(apiLong);
attachAuthInterceptor(apiMap);

apiMap.interceptors.request.use((config) => {
  config.baseURL = mapApiBaseUrl();
  return config;
});

function attachMojibakeRepairInterceptor(
  instance: ReturnType<typeof axios.create>
): void {
  instance.interceptors.response.use((response) => {
    const data = response.data;
    if (data != null && (typeof data === 'object' || typeof data === 'string')) {
      response.data = repairDeepStrings(data);
    }
    return response;
  });
}

attachMojibakeRepairInterceptor(api);
attachMojibakeRepairInterceptor(apiLong);
attachMojibakeRepairInterceptor(apiMap);

apiMap.interceptors.response.use(
  (response) => {
    const url = String(response.config?.url || '');
    const params = response.config?.params as Record<string, string> | undefined;
    mapGeoJsonDebugLog('response', {
      url: `${mapGeoJsonApiOrigin()}${url}`,
      status: response.status,
      contractor: params?.['contractor'],
      featureCount: countGeoJsonFeatures(response.data),
      source: response.headers?.['x-map-data-source'],
    });
    return response;
  },
  (error: AxiosError) => {
    if (isMapRequestAborted(error)) {
      return Promise.reject(error);
    }
    const url = String(error.config?.url || '');
    const method = String(error.config?.method || 'get').toUpperCase();
    const base = error.config?.baseURL ?? mapApiBaseUrl();
    const params = error.config?.params as Record<string, string> | undefined;
    const endpoint = `${method} ${base}${url}`;
    console.error('[map] GeoJSON request failed:', endpoint, {
      status: error.response?.status,
      message: error.message,
      contractor: params?.['contractor'],
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

function messageLooksAborted(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes('aborted') ||
    m.includes('abort') ||
    m.includes('canceled') ||
    m.includes('cancelled') ||
    m.includes('stream has been aborted')
  );
}

/** Collect API error text from axios bodies (error + details) for abort detection. */
function mapGeoJsonResponseText(err: unknown): string {
  if (!isAxiosError(err)) {
    return '';
  }
  const parts: string[] = [];
  if (err.message) {
    parts.push(err.message);
  }
  const data = err.response?.data;
  if (typeof data === 'string') {
    parts.push(data);
  } else if (data && typeof data === 'object') {
    const o = data as Record<string, unknown>;
    if (o['error'] != null) parts.push(String(o['error']));
    if (o['details'] != null) parts.push(String(o['details']));
  }
  return parts.join(' ');
}

export function isMapRequestAborted(err: unknown, signal?: AbortSignal): boolean {
  if (signal?.aborted) {
    return true;
  }
  if (messageLooksAborted(mapGeoJsonResponseText(err))) {
    return true;
  }
  if (isAxiosError(err)) {
    if (err.code === 'ERR_CANCELED' || err.name === 'CanceledError') {
      return true;
    }
    if (messageLooksAborted(err.message || '')) {
      return true;
    }
    const data = err.response?.data as { error?: string; details?: string } | undefined;
    if (data?.details && messageLooksAborted(data.details)) {
      return true;
    }
    if (data?.error && messageLooksAborted(data.error)) {
      return true;
    }
  }
  if (err instanceof DOMException && err.name === 'AbortError') {
    return true;
  }
  if (err instanceof Error && messageLooksAborted(err.message)) {
    return true;
  }
  return false;
}

function isDnsOrUnreachableMapError(err: unknown): boolean {
  const text = mapGeoJsonResponseText(err).toLowerCase();
  if (
    text.includes('enotfound') ||
    text.includes('getaddrinfo') ||
    text.includes('econnrefused') ||
    text.includes('eai_again')
  ) {
    return true;
  }
  if (isAxiosError(err)) {
    const code = String(err.code || '').toUpperCase();
    return (
      code === 'ENOTFOUND' ||
      code === 'ECONNREFUSED' ||
      code === 'ETIMEDOUT' ||
      code === 'ECONNABORTED'
    );
  }
  return false;
}

function isRetryableMapGeoError(err: unknown): boolean {
  if (isMapRequestAborted(err)) {
    return false;
  }
  if (isDnsOrUnreachableMapError(err)) {
    return false;
  }
  if (isAxiosError(err)) {
    if (err.code === 'ECONNABORTED') {
      return true;
    }
    if (err.message === 'Network Error') {
      return true;
    }
    const status = err.response?.status;
    if (status === 502 || status === 503 || status === 504) {
      if (messageLooksAborted(mapGeoJsonResponseText(err))) {
        return false;
      }
      return true;
    }
    const data = err.response?.data as { details?: string; error?: string } | undefined;
    if (data?.details && messageLooksAborted(data.details)) {
      return false;
    }
    if (data?.error && messageLooksAborted(data.error)) {
      return false;
    }
  }
  return false;
}

const mapGeoRetryDelayMs = 350;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatMapGeoJsonError(err: unknown, endpoint: string): string {
  if (isMapRequestAborted(err)) {
    return '';
  }
  if (isAxiosError(err)) {
    const data = err.response?.data as { error?: string; details?: string } | undefined;
    const combined = [data?.error, data?.details].filter(Boolean).join(' ');
    if (messageLooksAborted(combined)) {
      return '';
    }
    if (data?.details && messageLooksAborted(data.details)) {
      return '';
    }
    if (data?.error) {
      return data.details ? `${data.error} (${data.details})` : data.error;
    }
    if (isDnsOrUnreachableMapError(err)) {
      return `Map upstream host is unreachable (${endpoint}). Local map bundles are used when the API serves data/map-geojson — ensure npm run dev is running and USE_LOCAL_MAP_GEOJSON is enabled.`;
    }
    if (err.code === 'ECONNABORTED') {
      return `Map request timed out (${endpoint}). Try Refresh map or check upstream connectivity.`;
    }
    if (err.message === 'Network Error') {
      const base = mapApiBaseUrl();
      const target = base || (typeof window !== 'undefined' ? window.location.origin : 'API');
      return `Cannot reach map API at ${target}. Start the backend (npm run dev on port 4000) and use ng serve with proxy.conf.json, or set environment.mapApiBaseUrl.`;
    }
    if (err.response?.status) {
      return `Map API ${endpoint} returned HTTP ${err.response.status}.`;
    }
    return err.message || `Map API ${endpoint} failed.`;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return `Map API ${endpoint} failed.`;
}

export type MapGeoJsonRequestOptions = {
  signal?: AbortSignal;
  /** When false, skip in-memory cache read/write (force refresh). */
  useCache?: boolean;
};

async function fetchMapGeoJsonOnce(
  path: string,
  params: Record<string, string> | undefined,
  options: MapGeoJsonRequestOptions | undefined,
  writeCache: boolean
): Promise<unknown> {
  if (options?.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const requestUrl = `${mapGeoJsonApiOrigin()}${path}`;
  mapGeoJsonDebugLog('request', {
    url: requestUrl,
    params,
    contractor: params?.['contractor'],
  });

  // Direct mode: the gateway's /api/map/geojson/* routes were thin proxies, so
  // go straight to the contractor API. Everything around this call — the local
  // asset preference, the cache, retry and abort handling — is unchanged.
  const data = upstreamApi.supportsMapPath(path)
    ? await upstreamApi.getMapGeoJson(path, params, options?.signal)
    : (await apiMap.get<unknown>(path, {
        params,
        signal: options?.signal,
        timeout: mapGeoJsonRequestTimeoutMs(),
      })).data;
  if (options?.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }
  if (data === null || data === undefined) {
    return null;
  }
  let parsed: unknown = data;
  if (typeof data === 'string') {
    try {
      parsed = JSON.parse(data) as unknown;
    } catch {
      throw new Error(`Map API ${path} returned non-JSON text.`);
    }
  }
  if (writeCache) {
    writeMapGeoCache(mapGeoCacheKey(path, params), parsed);
  }
  return parsed;
}

async function tryMapGeoJsonAssetFallback(
  params?: Record<string, string>
): Promise<unknown | null> {
  const contractor = params?.['contractor'];
  const asset = await fetchMapGeoJsonAssetFallback(contractor);
  return asset ?? null;
}

function prefersLocalMapAssets(): boolean {
  if (environment.MAP_SOURCE_MODE === 'local') {
    return true;
  }
  if (environment.MAP_SOURCE_MODE === 'api') {
    return false;
  }
  return Boolean(environment.USE_LOCAL_MAP_GEOJSON);
}

async function getMapGeoJson(
  path: string,
  params?: Record<string, string>,
  options?: MapGeoJsonRequestOptions
): Promise<unknown> {
  const useCache = options?.useCache !== false;
  const cacheKey = mapGeoCacheKey(path, params);
  if (useCache) {
    const cached = readMapGeoCache(cacheKey);
    if (cached !== undefined) {
      mapGeoJsonDebugLog('cache-hit', {
        path,
        contractor: params?.['contractor'],
        featureCount: countGeoJsonFeatures(cached),
      });
      return cached;
    }
  }

  if (prefersLocalMapAssets()) {
    const asset = await tryMapGeoJsonAssetFallback(params);
    if (asset) {
      if (useCache) {
        writeMapGeoCache(cacheKey, asset);
      }
      mapGeoJsonDebugLog('served-local-first', {
        path,
        contractor: params?.['contractor'],
        featureCount: countGeoJsonFeatures(asset),
      });
      return asset;
    }
    if (environment.MAP_ALLOW_API_FALLBACK === false) {
      mapGeoJsonDebugLog('local-only-empty', { path, contractor: params?.['contractor'] });
      return { type: 'FeatureCollection', features: [] };
    }
  }

  const run = async (): Promise<unknown> => {
    try {
      return await fetchMapGeoJsonOnce(path, params, options, useCache);
    } catch (err) {
      if (isMapRequestAborted(err, options?.signal) || !isRetryableMapGeoError(err)) {
        throw err;
      }
      await sleep(mapGeoRetryDelayMs);
      if (options?.signal?.aborted) {
        throw err;
      }
      return await fetchMapGeoJsonOnce(path, params, options, useCache);
    }
  };

  try {
    return await run();
  } catch (err) {
    if (isMapRequestAborted(err, options?.signal)) {
      throw err;
    }
    const asset = await tryMapGeoJsonAssetFallback(params);
    if (asset) {
      if (useCache) {
        writeMapGeoCache(cacheKey, asset);
      }
      mapGeoJsonDebugLog('recovered-via-assets', {
        path,
        contractor: params?.['contractor'],
        featureCount: countGeoJsonFeatures(asset),
      });
      return asset;
    }
    throw err;
  }
}

export interface DashboardSnapshot {
  projectId: string;
  widgetKey: string;
  data: Record<string, unknown>;
  fetchedAt: number;
  status: string;
  sourceUrl: string;
  stale?: boolean;
  error?: string;
}

export interface PhaseSegment {
  id?: number | null;
  seqNo?: number | null;
  phaseId?: number | null;
  lengthM?: number | null;
  status?: string | null;
  statusName?: string | null;
  statusId?: number | null;
  /** Hex colour for the segment's status, e.g. "#00FF00" (drives the map line colour). */
  statusColor?: string | null;
  trenchingTypeId?: number | null;
  trenchingTypeName?: string | null;
  createdAt?: string | null;
  /** When present, segment detail lines can be drawn on the map (OSP-style). */
  startLat?: number | null;
  startLon?: number | null;
  startLng?: number | null;
  endLat?: number | null;
  endLon?: number | null;
  endLng?: number | null;
  [key: string]: unknown;
}

export interface RoutePhase {
  phaseId: number;
  phaseName?: string | null;
  segments?: PhaseSegment[] | null;
}

export interface RoutePhaseEntry {
  contractor?: string | null;
  routeId?: number | null;
  routeName?: string | null;
  phases?: RoutePhase[] | null;
}

export interface RoutesSegmentsPhaseWiseResponse {
  routes: RoutePhaseEntry[];
}

export interface ContractorPhaseBreakdown {
  phase: string;
  percentage: number;
}

export interface ContractorProjectStatus {
  projectId: number;
  contractor: string;
  completedPercent: number;
  inProgressPercent: number;
  plannedPercent: number;
  phaseBreakdown: ContractorPhaseBreakdown[];
}

export interface KpiAggregateRow {
  contractor: string;
  project_id: string;
  phase_id: string;
  total_planned_km: number;
  completed_km: number;
  in_progress_km: number;
  pending_km: number;
  blocked_km: number;
  fetched_at: number;
  status: string;
  source_url: string;
  is_dummy: number;
}

export interface KpiAggregateResponse {
  row: KpiAggregateRow | null;
  stale: boolean;
  fetchedAt?: number;
  sourceUrl?: string;
  hint?: string;
  aggregationMode?: string;
  aggregationSourceCount?: number;
}

export interface SyncRunRow {
  id: number;
  source_key: string;
  started_at: number;
  finished_at: number | null;
  status: string;
  error: string | null;
  row_count: number | null;
}

export interface DashboardBootstrapResponse {
  projectId: string;
  phaseId: string;
  overallDistribution: DashboardSnapshot | null;
  contractorStatus: ContractorProjectStatus[] | null;
  contractorStale: boolean;
  routesSegments: RoutesSegmentsPhaseWiseResponse | null;
  routesStale: boolean;
  kpis: KpiAggregateResponse;
  sync: {
    recentRuns: SyncRunRow[];
  };
}

export interface RingFilterOption {
  id: string;
  name: string;
  source?: string;
}

export interface RingsResponse {
  rings: RingFilterOption[];
  stale: boolean;
}

export interface DashboardFiltersResponse {
  phaseId: string;
  contractorRequired?: boolean;
  rings: RingFilterOption[];
  contractors: RingFilterOption[];
  steps: RingFilterOption[];
  links: Array<{
    id: string;
    name: string;
    ringId?: string;
    contractor?: string | null;
  }>;
}

export interface ContractorContextResponse {
  mode: string;
  contractors: string[];
  stale?: boolean;
}

export const getOverallDistribution = async (projectId: string) => {
  if (upstreamApi.supports('overall-distribution')) {
    return upstreamApi.getOverallDistribution(projectId);
  }
  const response = await api.get<DashboardSnapshot>(
    `/api/dashboard/${projectId}/overall-distribution`
  );
  return response.data;
};

export const getContractorProjectStatus = async () => {
  if (upstreamApi.supports('contractor-project-status')) {
    return upstreamApi.getContractorProjectStatus();
  }
  const response = await api.get<ContractorProjectStatus[]>(
    `/api/dashboard/contractor-project-status`
  );
  return response.data;
};

export const getKpiAggregate = async (params: {
  contractor?: string;
  projectId?: string;
  ringId?: string;
  aggregationMode?: string;
}) => {
  if (upstreamApi.supports('aggregates/kpis')) {
    return upstreamApi.getKpiAggregate(params);
  }
  const response = await api.get<KpiAggregateResponse>(
    `/api/aggregates/kpis`,
    { params }
  );
  return response.data;
};

export const getContractorContext = async () => {
  if (upstreamApi.supports('context/contractors')) {
    return upstreamApi.getContractorContext();
  }
  const response = await api.get<ContractorContextResponse>(
    `/api/dashboard/context/contractors`
  );
  return response.data;
};

export interface KmlExportParams {
  contractor?: string | null;
  /** Comma-joined contractors to export. Omitted/empty → export ALL (merged). */
  contractorIds?: string | null;
  ringId?: string | number | null;
  projectId?: string | number | null;
  phaseId?: string | number | null;
  routeIds?: Array<string | number>;
  statusFilter?: 'APPROVED' | 'IN_PROGRESS' | null;
  format?: 'kmz' | 'kml';
  onlyCompleted?: boolean;
  backboneOnly?: boolean;
  includeMarkers?: boolean;
}

/**
 * Request the server-generated KML/KMZ for the current filters and trigger a
 * browser download. Mirrors the reference app's Export KMZ flow.
 */
export const exportRoutesKml = async (params: KmlExportParams, filename: string) => {
  const query: Record<string, string> = {};
  const put = (k: string, v: unknown) => {
    if (v == null || v === '') return;
    query[k] = String(v);
  };
  put('contractor', params.contractor);
  put('contractorIds', params.contractorIds);
  put('ringId', params.ringId);
  put('projectId', params.projectId);
  put('phaseId', params.phaseId);
  put('statusFilter', params.statusFilter);
  put('format', params.format ?? 'kmz');
  put('onlyCompleted', params.onlyCompleted ?? false);
  put('backboneOnly', params.backboneOnly ?? false);
  put('includeMarkers', params.includeMarkers ?? false);
  if (params.routeIds && params.routeIds.length) query['routeIds'] = params.routeIds.join(',');

  if (upstreamApi.enabled) {
    const blob = await upstreamApi.exportRoutes(
      params as unknown as Record<string, unknown>,
      params.format ?? 'kmz'
    );
    triggerBlobDownload(blob, filename);
    return;
  }

  const response = await api.get(`/api/kml/routes/export`, {
    params: query,
    responseType: 'blob',
    // KML/KMZ generation is slow, and "export all" merges every contractor
    // backend — allow up to 10 min so the request isn't cancelled early.
    timeout: 600000,
  });
  triggerBlobDownload(response.data as Blob, filename);
};

/** Save a blob to disk under `filename` via a synthetic anchor click. */
function triggerBlobDownload(blob: Blob, filename: string): void {
  // A response interceptor that rewrites bodies can hand back a non-Blob here;
  // say so plainly instead of letting createObjectURL throw "Overload
  // resolution failed", which says nothing about the real cause.
  if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
    throw new Error(
      `Export did not return a file (got ${Object.prototype.toString.call(blob)}).`
    );
  }
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(blobUrl);
}

export const getRoutesSegmentsPhaseWise = async (
  phaseId: string | number,
  contractorIds?: string
) => {
  if (upstreamApi.supports('routes-segments-phase-wise')) {
    return upstreamApi.getRoutesSegmentsPhaseWise(phaseId, contractorIds);
  }
  const params: Record<string, string | number> = { phaseId };
  if (contractorIds && contractorIds.trim()) params['contractorIds'] = contractorIds.trim();
  const response = await api.get<RoutesSegmentsPhaseWiseResponse>(
    `/api/segments/routes-segments-phase-wise`,
    {
      params,
      // Segment payloads are large (a single phase can be ~10 MB) and, when
      // "All Phases" is selected, up to ~10 fire in parallel and queue behind
      // the browser's 6-connection limit. The default 5s `api` timeout aborts
      // the slow/queued ones (shown as "canceled" in DevTools), so the merged
      // result is missing phases. Match the server's SEGMENTS_TIMEOUT_MS (120s).
      timeout: 120000,
    }
  );
  return response.data;
};

export interface SegmentPhaseOption {
  phaseId: number;
  phaseName: string;
  segmentCount: number;
}

export interface SegmentPhasesResponse {
  phases: SegmentPhaseOption[];
}

/**
 * Phases that actually have cached segment geometry, with their NUMERIC id.
 * Needed because the dashboard "steps" filter only exposes phase names.
 */
export const getSegmentPhases = async (): Promise<SegmentPhasesResponse> => {
  if (upstreamApi.supports('segments/phases')) {
    return upstreamApi.getSegmentPhases();
  }
  const response = await api.get<SegmentPhasesResponse>('/api/segments/phases');
  return response.data;
};

function mapGeoQueryParams(params?: {
  contractor?: string;
  ringId?: string;
  projectId?: string;
}): Record<string, string> | undefined {
  if (!params) return undefined;
  const out: Record<string, string> = {};
  const c = params.contractor?.trim();
  if (c) out['contractor'] = c;
  const r = params.ringId?.trim();
  if (r) out['ringId'] = r;
  const p = params.projectId?.trim();
  if (p) out['projectId'] = p;
  return Object.keys(out).length ? out : undefined;
}

/** GeoJSON for map (proxied through dashboard API; upstream auth from server env). */
export const getGeoJsonRoutes = async (
  params?: { ringId?: string; projectId?: string },
  options?: MapGeoJsonRequestOptions
) => getMapGeoJson('/api/map/geojson/routes', mapGeoQueryParams(params), options);

export const getGeoJsonByContractor = async (
  contractor: string,
  params?: { ringId?: string; projectId?: string },
  options?: MapGeoJsonRequestOptions
) =>
  getMapGeoJson(
    '/api/map/geojson/by-contractor',
    mapGeoQueryParams({ contractor, ...params }),
    options
  );

export const getGeoJsonRouteElements = async (
  params?: { contractor?: string; ringId?: string; projectId?: string },
  options?: MapGeoJsonRequestOptions
) => getMapGeoJson('/api/map/geojson/route-elements', mapGeoQueryParams(params), options);

export const getGeoJsonMarkers = async (
  params?: { contractor?: string; ringId?: string; projectId?: string },
  options?: MapGeoJsonRequestOptions
) => getMapGeoJson('/api/map/geojson/markers', mapGeoQueryParams(params), options);

/** Single round-trip: cached widgets, contractor list, phase routes, KPI slice, recent sync runs. */
export const getDashboardBootstrap = async (
  projectId: string,
  query?: {
    phaseId?: string;
    contractor?: string;
    ringId?: string;
    linkId?: string;
  }
) => {
  if (upstreamApi.supports('bootstrap')) {
    return upstreamApi.getDashboardBootstrap(projectId, query ?? {});
  }
  const response = await apiLong.get<DashboardBootstrapResponse>(
    `/api/dashboard/${encodeURIComponent(projectId)}/bootstrap`,
    { params: query }
  );
  return response.data;
};

/**
 * Ask the gateway to re-sync its cache from upstream.
 *
 * A no-op in direct mode: there is no cache to refresh, because every read
 * already goes straight to the contractor API. Resolving (rather than throwing)
 * keeps the caller's "Refresh" button working instead of surfacing an error for
 * something that is already true.
 */
export const refreshDashboard = async (projectId: string) => {
  if (upstreamApi.enabled) {
    return { ok: true, skipped: 'direct-upstream mode reads live data; nothing to sync' };
  }
  const response = await apiLong.post(
    `/api/dashboard/${encodeURIComponent(projectId)}/refresh`
  );
  return response.data;
};

export const getRingsFilters = async () => {
  if (upstreamApi.supports('rings')) {
    return upstreamApi.getRings();
  }
  const response = await api.get<RingsResponse>(`/api/dashboard/rings`);
  return response.data;
};

export const getDashboardFilters = async (params?: {
  phaseId?: string;
  contractor?: string;
  ringId?: string;
  projectId?: string;
}) => {
  if (upstreamApi.supports('filters')) {
    return upstreamApi.getDashboardFilters(params);
  }
  const response = await api.get<DashboardFiltersResponse>(`/api/dashboard/filters`, {
    params,
  });
  return response.data;
};

export interface KpiDimensionContractor {
  name: string;
  totalKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  completedPct: number;
  color: string;
}

export interface KpiDimensionRing {
  id: string;
  name: string;
  totalKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  completedPct: number;
  color: string;
}

export interface KpiDimensionProject {
  projectId: string;
  linkName: string;
  ringId: string;
  ringName: string;
  contractorName: string;
  totalKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  completedPct: number;
  status: 'on-track' | 'at-risk' | 'delayed';
}

export interface KpiDimensionMatrixRow {
  ringId: string;
  ringName: string;
  contractors: Array<{ name: string; totalKm: number; completedKm: number; completedPct: number }>;
}

export interface KpiDimensionsResponse {
  contractors: KpiDimensionContractor[];
  rings: KpiDimensionRing[];
  matrix: KpiDimensionMatrixRow[];
  projects: KpiDimensionProject[];
  delayedCount: number;
  fetchedAt: number;
}

export const getKpiDimensions = async (params?: {
  contractor?: string;
  contractorIds?: string;
  ringId?: string;
  ringIds?: string;
  linkIds?: string;
}) => {
  if (upstreamApi.supports('kpi-dimensions')) {
    return upstreamApi.getKpiDimensions(params);
  }
  const response = await api.get<KpiDimensionsResponse>(`/api/aggregates/kpi-dimensions`, { params });
  return response.data;
};

export const exportRoutesFile = async (params: {
  contractor: string;
  format: "kml" | "kmz";
  ringId?: string;
  projectId?: string;
  onlyCompleted?: boolean;
  backboneOnly?: boolean;
  includeMarkers?: boolean;
}) => {
  // The gateway route fanned out across contractor slots and zipped the
  // results; with one backend the upstream export is already the whole answer.
  if (upstreamApi.enabled) {
    return upstreamApi.exportRoutes(
      params as unknown as Record<string, unknown>,
      params.format
    );
  }

  const response = await apiLong.get<Blob>(`/api/dashboard/routes-export`, {
    params,
    responseType: "blob" as const,
    validateStatus: () => true,
  });
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  let detail = `Export failed (${response.status})`;
  const data = response.data as unknown;
  if (typeof Blob !== "undefined" && data instanceof Blob) {
    const text = await data.text();
    try {
      const j = JSON.parse(text) as { error?: string; details?: string };
      detail = j.error || j.details || text || detail;
    } catch {
      detail = text?.trim() || detail;
    }
  }
  throw new Error(detail);
};

// ---------------------------------------------------------------------------
// V2 Dashboard API endpoints
// ---------------------------------------------------------------------------

export interface V2CommonFilters {
  contractorIds?: string;
  ringIds?: string;
  linkIds?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PlannedVsActualBucket {
  period: string;
  plannedKm: number;
  actualKm: number;
}

export interface PlannedVsActualResponse {
  buckets: PlannedVsActualBucket[];
  granularity: string;
  filters: Record<string, unknown>;
}

export const getPlannedVsActual = async (
  filters: V2CommonFilters & { granularity?: 'monthly' | 'weekly' }
) => {
  if (upstreamApi.supports('ext-planned-vs-actual')) {
    return upstreamApi.getPlannedVsActual(filters as Record<string, unknown>);
  }
  const response = await apiLong.get<PlannedVsActualResponse>(
    '/api/dashboard/ext-planned-vs-actual',
    { params: filters }
  );
  return response.data;
};

export interface TimelineTrendPoint {
  date: string;
  completedKm: number;
  cumulativePlannedKm: number;
}

export interface TimelineTrendResponse {
  dataPoints: TimelineTrendPoint[];
  filters: Record<string, unknown>;
}

export const getTimelineTrend = async (filters: V2CommonFilters) => {
  if (upstreamApi.supports('timeline-trend')) {
    return upstreamApi.getTimelineTrend(filters as Record<string, unknown>);
  }
  const response = await api.get<TimelineTrendResponse>(
    '/api/dashboard/timeline-trend',
    { params: filters }
  );
  return response.data;
};

// ── Analytics history (Progress Report (Overall) chart) ─────────────────────
// Real cumulative progress from upstream, fanned out across contractor hosts and
// merged server-side. Replaces the synthetic S-curve that /timeline-trend emits.
//
// UNITS: summary.*Km is kilometres; summary.*Length and every progress[] *Work /
// *Length value is METRES. Divide by 1000 before charting alongside km figures.

export interface AnalyticsHistoryProgressPoint {
  period: string;
  plannedWork: number;
  actualWork: number;
  cumulativePlanned: number;
  cumulativeActual: number;
  /** null when upstream has no plan baseline — render nothing, not 0. */
  variance: number | null;
  completionPercentage: number;
  sequence: number;
  createdSegments: number;
  createdLength: number;
  submittedSegments: number;
  submittedLength: number;
  pmApprovedSegments: number;
  pmApprovedLength: number;
  pmRejectedSegments: number;
  pmRejectedLength: number;
  clientApprovedSegments: number;
  clientApprovedLength: number;
  clientRejectedSegments: number;
  clientRejectedLength: number;
}

export interface AnalyticsHistorySummary {
  totalScopeKm: number;
  completedKm: number;
  remainingKm: number;
  plannedKm: number;
  varianceKm: number | null;
  completionPercentage: number;
  averageProductivity: number;
  forecastCompletionDate: string | null;
  completedLength: number;
  remainingLength: number;
  currentPace: number;
  requiredPace: number;
  bestCaseCompletionDate: string | null;
  worstCaseCompletionDate: string | null;
  forecastRemainingDays: number | null;
}

export interface AnalyticsHistoryForecast {
  period: string | null;
  planned: number;
  actual: number;
  forecast: number;
  bestCase: number;
  worstCase: number;
  forecastCompletionDate: string | null;
  bestCaseCompletionDate: string | null;
  worstCaseCompletionDate: string | null;
}

export interface AnalyticsHistorySource {
  contractor: string;
  slot: number;
  /** null when the contractor was not part of this request. */
  mode: 'upstream' | 'derived' | null;
  /**
   * true/false only for selected contractors. null means "not fetched, unknown" —
   * distinct from false, which means "fetched and no data was available".
   */
  ok: boolean | null;
  httpStatus: number | null;
  contractId: number | null;
  /** False for contractors listed for reference but not queried. */
  selected: boolean;
  reason?: string;
  origin?: string;
  segmentsFetchedAt?: number | null;
}

export interface AnalyticsHistoryContractor {
  contractor: string;
  mode: 'upstream' | 'derived';
  contractId: number | null;
  summary: AnalyticsHistorySummary;
  progress: AnalyticsHistoryProgressPoint[];
  forecast: AnalyticsHistoryForecast[];
}

export interface AnalyticsHistoryResponse {
  phaseId: number | string;
  contractor: string | null;
  fromDate: string;
  toDate: string;
  granularity: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  statusDate: string;
  summary: AnalyticsHistorySummary;
  progress: AnalyticsHistoryProgressPoint[];
  forecast: AnalyticsHistoryForecast[];
  contractors: AnalyticsHistoryContractor[];
  sources: AnalyticsHistorySource[];
  coverage: {
    requested: number;
    upstream: number;
    derived: number;
    failed: number;
    notSelected?: number;
  };
  meta: {
    cached: boolean;
    fetchedAt: number;
    hasPlanBaseline: boolean;
    units: { summary: string; progress: string };
    warnings: string[];
  };
}

export interface AnalyticsHistoryParams {
  phaseId?: string;
  granularity?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  fromDate?: string;
  toDate?: string;
  contractor?: string;
  projectId?: string;
  ringId?: string;
  routeId?: string;
}

/**
 * @param signal aborts an in-flight request. A cold call fans out to five upstream
 *   hosts and can run for ~15s, so overlapping loads are easy to trigger (changing
 *   a filter while one is running). Passing a signal lets the caller cancel the
 *   superseded request instead of leaving both to race — otherwise the slower,
 *   older response can land last and overwrite the newer one.
 */
export const getAnalyticsHistory = async (
  params: AnalyticsHistoryParams,
  signal?: AbortSignal
) => {
  if (upstreamApi.supports('analytics/history')) {
    return upstreamApi.getAnalyticsHistory(params as Record<string, unknown>, signal);
  }
  // apiLong: fans out to up to five upstream hosts, so it can outlast the
  // default client timeout on a cold cache.
  const response = await apiLong.get<AnalyticsHistoryResponse>(
    '/api/dashboard/analytics/history',
    { params, signal }
  );
  return response.data;
};

/** True for an axios request we cancelled ourselves, which is not an error. */
export const isRequestAborted = (error: unknown): boolean => {
  const e = error as { code?: string; name?: string } | null;
  return e?.code === 'ERR_CANCELED' || e?.name === 'CanceledError' || e?.name === 'AbortError';
};

// ── Phase-wise daily progress history (Daily Progress chart) ────────────────

export interface PhaseHistoryRecord {
  date: string;
  submittedWork: number;
  pmApprovedWork: number;
  approvedWork: number;
  totalWorkDone: number;
  submittedKm: number;
  pmApprovedKm: number;
  approvedKm: number;
  totalWorkDoneKm: number;
  /** Per-phase daily total in km, keyed by phaseId. */
  byPhase: Record<string, number>;
}

export interface PhaseHistoryPhase {
  phaseId: string;
  phaseName: string;
}

export interface PhaseHistoryResponse {
  fromDate: string;
  toDate: string;
  totalDays: number;
  phaseId: string | null;
  phaseName: string | null;
  phasesQueried: PhaseHistoryPhase[];
  contractorsQueried: string[];
  records: PhaseHistoryRecord[];
  contractorSeries: { contractor: string; records: { date: string; totalWorkDoneKm: number }[] }[];
  failures: { contractor: string; phaseId: string; error: string }[];
}

export const getPhaseWiseProgressHistory = async (params: {
  contractor?: string;
  contractorIds?: string;
  phaseId?: string;
  phaseName?: string;
  fromDate?: string;
  toDate?: string;
}) => {
  if (upstreamApi.supports('phase-wise-progress-history')) {
    return upstreamApi.getPhaseWiseProgressHistory(params as Record<string, unknown>);
  }
  const response = await apiLong.get<PhaseHistoryResponse>(
    '/api/dashboard/phase-wise-progress-history',
    { params }
  );
  return response.data;
};

export interface PhaseListResponse {
  phases: PhaseHistoryPhase[];
}

export const getPhaseList = async () => {
  if (upstreamApi.supports('phase-list')) {
    return upstreamApi.getPhaseList();
  }
  const response = await api.get<PhaseListResponse>('/api/dashboard/phase-list');
  return response.data;
};

/**
 * One phase's completion measured against the WHOLE route length, in metres
 * plus ready-made percentages.
 *
 * Note `totalM` is the full route length, not the phase's own scope, so the
 * three percentages sum to 100 per phase — that is what makes a stacked
 * 0-100% column meaningful (see drawPhaseWiseProgressChart).
 */
export interface PhaseWiseProgressRow {
  phaseId: number;
  phaseName: string;
  totalM: number;
  completedM: number;
  inProgressM: number;
  pendingM: number;
  completedPercent: number;
  inProgressPercent: number;
  pendingPercent: number;
}

export const getPhaseWiseProgress = async (params: {
  contractor?: string;
  ringId?: string;
  ringIds?: string;
  projectId?: string;
  linkIds?: string;
} = {}) => {
  if (upstreamApi.supports('phase-wise-progress')) {
    return upstreamApi.getPhaseWiseProgress(params as Record<string, unknown>);
  }
  const response = await api.get<PhaseWiseProgressRow[]>(
    '/api/dashboard/phase-wise-progress',
    { params }
  );
  return Array.isArray(response.data) ? response.data : [];
};

/**
 * Per-phase work split by approval state, in metres.
 *
 * `submitted` + `pmApproved` is work done but not yet client-approved, which
 * the old dashboard showed as a single "In Progress" series; `inProgress` is a
 * separate upstream column that reads 0 across every phase today.
 */
export interface PhaseDistributionRow {
  phaseId: number;
  phaseName: string;
  completed: number;
  inProgress: number;
  submitted: number;
  pmApproved: number;
  rejected: number;
  pmRejected: number;
  total: number;
}

export const getPhaseDistribution = async (params: {
  contractor?: string;
  ringId?: string;
  ringIds?: string;
  projectId?: string;
  linkIds?: string;
} = {}) => {
  if (upstreamApi.supports('phase-distribution')) {
    return upstreamApi.getPhaseDistribution(params as Record<string, unknown>);
  }
  const response = await api.get<PhaseDistributionRow[]>(
    '/api/dashboard/phase-distribution',
    { params }
  );
  return Array.isArray(response.data) ? response.data : [];
};

/**
 * One trench profile (G1, T1, …) and how much of its planned length is done.
 *
 * Unlike PhaseWiseProgressRow, whose percentages are shares of the WHOLE route,
 * these three are shares of this profile's own `totalM` and sum to 100 per row
 * — a profile is a property of the trench, not a stage of work, so "42% of the
 * route" would be meaningless here. `completionPercent` repeats
 * `completedPercent`; both are kept as upstream sends them.
 *
 * The volumes are excavation, in m3, implied by the profile's cross-section
 * (`widthMm` x `heightMm`) over the length worked.
 */
export interface TrenchingTypeProgressRow {
  trenchingTypeId: number;
  trenchingTypeCode: string;
  trenchingTypeName: string;
  widthMm: number;
  heightMm: number;
  totalM: number;
  inProgressM: number;
  completedM: number;
  pendingM: number;
  inProgressPercent: number;
  completedPercent: number;
  pendingPercent: number;
  completionPercent: number;
  segmentCount: number;
  rockPercentage: number;
  extraExcavationM: number;
  sandDuneRemovalPercentage: number;
  rockBenchingM: number;
  additionalConcreteM: number;
  rockVolume: number;
  sandVolume: number;
}

/** Per-profile rows plus the project-wide excavation totals that head them. */
export interface TrenchingTypeProgressResponse {
  totalRockVolume: number;
  totalSandVolume: number;
  totalExtraExcavationVolume: number;
  totalSegmentCount: number;
  totalRockPercentage: number;
  totalSandDuneRemovalPercentage: number;
  trenchingTypes: TrenchingTypeProgressRow[];
}

/** All-zero response — what callers render before the first load, or after a failure. */
export const emptyTrenchingTypeProgress = (): TrenchingTypeProgressResponse => ({
  totalRockVolume: 0,
  totalSandVolume: 0,
  totalExtraExcavationVolume: 0,
  totalSegmentCount: 0,
  totalRockPercentage: 0,
  totalSandDuneRemovalPercentage: 0,
  trenchingTypes: [],
});

export const getTrenchingTypeWiseProgress = async (params: {
  contractor?: string;
  ringId?: string;
  ringIds?: string;
  projectId?: string;
  linkIds?: string;
} = {}): Promise<TrenchingTypeProgressResponse> => {
  if (upstreamApi.supports('trenching-type-wise-progress')) {
    return upstreamApi.getTrenchingTypeWiseProgress(params as Record<string, unknown>);
  }
  const response = await apiLong.get<TrenchingTypeProgressResponse>(
    '/api/dashboard/trenching-type-wise-progress',
    { params }
  );
  const data = response.data;
  return {
    ...emptyTrenchingTypeProgress(),
    ...(data ?? {}),
    trenchingTypes: Array.isArray(data?.trenchingTypes) ? data.trenchingTypes : [],
  };
};

export interface PacCertificate {
  id: number;
  project_id: string;
  contractor: string;
  ring_id: string;
  link_id: string;
  status: 'approved' | 'pending' | 'rejected' | 'submitted';
  submitted_at: string;
  resolved_at: string | null;
  notes: string;
  created_at: string;
}

export interface PacStatusSummary {
  totalSubmitted: number;
  approved: number;
  pending: number;
  rejected: number;
}

export interface PacStatusResponse {
  summary: PacStatusSummary;
  certificates: PacCertificate[];
  filters: Record<string, unknown>;
}

/**
 * PAC (Provisional Acceptance Certificate) status.
 *
 * This is the one dashboard endpoint that CANNOT be served without the gateway.
 * It is not computed from upstream data — it reads the gateway's own
 * `pac_certificates` SQLite table (server/database/db.js:209), which holds
 * user-written records that have no contractor-API source at all.
 *
 * In direct mode it therefore resolves to an empty summary rather than issuing a
 * request that is guaranteed to fail. Callers already render zeros on failure
 * (app.component.ts:loadPacStatus, executive-dashboard's allSettled branch), so
 * the visible result is unchanged — minus a console error per load.
 *
 * `filters.unavailable` marks the zeros as "not measured" rather than "measured
 * as none", so this is not mistaken for real data. Restoring PAC means either
 * running the gateway or having the contractor API expose the certificates.
 */
export const getPacStatus = async (filters: V2CommonFilters) => {
  if (upstreamApi.enabled) {
    return {
      summary: { totalSubmitted: 0, approved: 0, pending: 0, rejected: 0 },
      certificates: [],
      filters: { ...filters, unavailable: 'pac-status has no contractor-API source' },
    } satisfies PacStatusResponse;
  }
  const response = await api.get<PacStatusResponse>(
    '/api/dashboard/pac-status',
    { params: filters }
  );
  return response.data;
};

export interface DashboardSummaryResponse {
  totalRouteLength: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  totalSegments: number;
  completedSegments: number;
  inProgressSegments: number;
  pendingSegments: number;
  blockedSegments: number;
  completionPercent: number;
  filters: Record<string, unknown>;
}

export const getDashboardSummary = async (filters: V2CommonFilters) => {
  if (upstreamApi.supports('summary')) {
    return upstreamApi.getDashboardSummary(filters as Record<string, unknown>);
  }
  const response = await api.get<DashboardSummaryResponse>(
    '/api/dashboard/summary',
    { params: filters }
  );
  return response.data;
};

// ---------------------------------------------------------------------------
// Financial Summary API (Budget Analysis)
// ---------------------------------------------------------------------------

/**
 * `POST /api/dashboard/financial-summary` — one row of budget/cost totals for
 * the current filter scope, plus the entity counts they were computed over.
 *
 * Amounts are in the deployment's contract currency (OMR) and are raw, not
 * millions. The three derived fields are returned by the API but recomputed
 * here when absent, so a partial payload still renders consistent figures:
 *
 *   remainingBudget        = plannedCost   − executedCost
 *   remainingCertification = certifiedAmount − paidAmount   (negative when
 *                            payments run ahead of certification)
 *   budgetUtilization      = executedCost / plannedCost × 100
 */
export interface FinancialSummaryResponse {
  plannedCost: number;
  executedCost: number;
  certifiedAmount: number;
  paidAmount: number;
  /** Negative when executed cost has overrun the plan. */
  remainingBudget: number;
  /** Negative when paid exceeds certified. */
  remainingCertification: number;
  /** Percent, 0–100. */
  budgetUtilization: number;
  totalProjects: number;
  totalRings: number;
  totalLinks: number;
  totalPACs: number;
  totalPaymentCertificates: number;
}

/** Coerce an API money/count field to a finite number ("708137.270", 1234, null). */
function financeNumber(value: unknown): number {
  const n = typeof value === 'string' ? Number(value.replace(/,/g, '')) : Number(value);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Normalise a financial-summary payload.
 *
 * Accepts both the bare object and the `{ data: … }` envelope the admin API
 * uses, tolerates numeric strings, and fills in the three derived fields when
 * upstream omits them — otherwise a missing `remainingBudget` would render as
 * a confident "0 remaining" rather than the real figure.
 */
export function normalizeFinancialSummary(raw: unknown): FinancialSummaryResponse {
  const root = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const src =
    root['data'] && typeof root['data'] === 'object'
      ? (root['data'] as Record<string, unknown>)
      : root;

  const plannedCost = financeNumber(src['plannedCost']);
  const executedCost = financeNumber(src['executedCost']);
  const certifiedAmount = financeNumber(src['certifiedAmount']);
  const paidAmount = financeNumber(src['paidAmount']);

  return {
    plannedCost,
    executedCost,
    certifiedAmount,
    paidAmount,
    remainingBudget:
      src['remainingBudget'] == null
        ? plannedCost - executedCost
        : financeNumber(src['remainingBudget']),
    remainingCertification:
      src['remainingCertification'] == null
        ? certifiedAmount - paidAmount
        : financeNumber(src['remainingCertification']),
    budgetUtilization:
      src['budgetUtilization'] == null
        ? plannedCost > 0
          ? (executedCost / plannedCost) * 100
          : 0
        : financeNumber(src['budgetUtilization']),
    totalProjects: financeNumber(src['totalProjects']),
    totalRings: financeNumber(src['totalRings']),
    totalLinks: financeNumber(src['totalLinks']),
    totalPACs: financeNumber(src['totalPACs']),
    totalPaymentCertificates: financeNumber(src['totalPaymentCertificates']),
  };
}

/**
 * Request body of `POST /api/dashboard/financial-summary`, mirroring the Java
 * DTO field-for-field:
 *
 *   String    contractor;
 *   Long      projectId;   // a "link" in dashboard vocabulary
 *   Long      routeId;
 *   Long      ringId;
 *   LocalDate fromDate;    // yyyy-MM-dd
 *   LocalDate toDate;      // yyyy-MM-dd
 *
 * Nothing else is read. The dashboard's own filter bag carries extra keys
 * (`contractorIds`, `ringIds`, `linkIds`, `phaseId`) that this endpoint has no
 * field for — `toFinancialSummaryBody` strips them.
 */
export interface FinancialSummaryFilters {
  contractor?: string;
  /** Numeric — the DTO field is `long`, so "R5" or a ring name is a 500. */
  projectId?: number;
  routeId?: number;
  ringId?: number;
  /** yyyy-MM-dd */
  fromDate?: string;
  /** yyyy-MM-dd */
  toDate?: string;
}

/** What callers may hand in: ids still carry display prefixes at this point. */
export type FinancialSummaryFilterInput = {
  contractor?: string;
  projectId?: string | number;
  routeId?: string | number;
  ringId?: string | number;
  fromDate?: string;
  toDate?: string;
};

/** DTO fields that are `long` upstream: numeric, single-valued, no prefixes. */
const FINANCIAL_SUMMARY_ID_KEYS = ['projectId', 'routeId', 'ringId'] as const;

/**
 * Coerce a dashboard id to the `long` the DTO wants, or null if it cannot be.
 *
 * Ring ids reach the UI as "R5" and links as names, because that is what the
 * filter dropdowns display. Sending either verbatim is a 500, not a 400:
 *
 *   Cannot deserialize value of type `long` from String "R5"
 *
 * So strip a single leading letter prefix (R5 -> 5, L12 -> 12) and require what
 * is left to be all digits. Anything else — a ring *name* like "Muscat North",
 * a slug, an empty string — returns null and the caller drops the field rather
 * than guessing a number and silently scoping the query to the wrong ring.
 */
function toLongId(raw: unknown): number | null {
  if (raw == null) return null;
  const trimmed = String(raw).trim();
  if (trimmed === '') return null;
  const unprefixed = /^[A-Za-z]\d+$/.test(trimmed) ? trimmed.slice(1) : trimmed;
  if (!/^\d+$/.test(unprefixed)) return null;
  const n = Number(unprefixed);
  return Number.isSafeInteger(n) ? n : null;
}

/**
 * Reduce an arbitrary dashboard filter bag to a body this endpoint accepts.
 *
 * Two things happen here, both forced by the DTO:
 *
 * 1. Unknown keys are dropped. The multi-select filter bar emits `contractorIds`
 *    / `ringIds` / `linkIds` / `phaseId` alongside the DTO names; none of those
 *    exist on the Java side.
 * 2. `projectId` / `routeId` / `ringId` are `Long`, not lists. The filter bar
 *    joins multi-selections with commas ("12,13"), which Jackson cannot bind to
 *    a Long — the request would 400. Only a single id is sent; when the user has
 *    several selected we keep the first and report it through `narrowed`, so the
 *    UI can say the figures are scoped more loosely than the filter bar shows
 *    rather than quietly implying otherwise.
 */
export function toFinancialSummaryBody(
  filters: FinancialSummaryFilterInput | Record<string, unknown> = {}
): { body: FinancialSummaryFilters; narrowed: string[]; invalid: string[] } {
  const bag = filters as Record<string, unknown>;
  const body: FinancialSummaryFilters = {};
  const narrowed: string[] = [];
  const invalid: string[] = [];

  const contractor = bag['contractor'] ?? bag['contractorIds'];
  if (contractor != null && String(contractor).trim() !== '') {
    // `contractor` is a String upstream, so a comma list is at least bindable.
    body.contractor = String(contractor).trim();
  }

  for (const key of FINANCIAL_SUMMARY_ID_KEYS) {
    const raw = bag[key] ?? (key === 'projectId' ? bag['linkIds'] : undefined);
    if (raw == null || String(raw).trim() === '') continue;
    const ids = String(raw).split(',').map((v) => v.trim()).filter(Boolean);
    if (ids.length === 0) continue;
    if (ids.length > 1) narrowed.push(key);

    const id = toLongId(ids[0]);
    if (id === null) {
      // Dropping the field widens the scope; sending it would 500 the request
      // and lose the whole card. Reported so the UI can say which filter is
      // not being applied instead of showing figures that look scoped.
      invalid.push(key);
      continue;
    }
    body[key] = id;
  }

  for (const key of ['fromDate', 'toDate'] as const) {
    const raw = bag[key];
    if (raw != null && String(raw).trim() !== '') body[key] = String(raw).trim();
  }

  return { body, narrowed, invalid };
}

export const getFinancialSummary = async (
  filters: V2CommonFilters | Record<string, unknown> = {}
) => {
  // Normalising here (rather than in each branch) keeps gateway and direct
  // modes on one code path — and avoids a runtime circular import, since
  // upstream-api.service only imports types from this module.
  const { body } = toFinancialSummaryBody(filters as Record<string, unknown>);
  const raw = upstreamApi.supports('financial-summary')
    ? await upstreamApi.getFinancialSummaryRaw(body as Record<string, unknown>)
    : (
        // POST with the filters as a JSON body — this endpoint takes its
        // scope in the body, not the query string (verified against
        // tcpms.mhditics.com: POST {"contractor":"MHD"} -> 200).
        await apiLong.post<unknown>('/api/dashboard/financial-summary', body)
      ).data;
  return normalizeFinancialSummary(raw);
};

// ---------------------------------------------------------------------------
// Financial Summary, link by link
// ---------------------------------------------------------------------------

/** One link's slice of the budget, or `null` when its request failed. */
export interface LinkFinancialRow {
  /** Server link id — goes out as the DTO's `projectId`. */
  id: string;
  name: string;
  /** Ring the link belongs to; a link id is not unique without it. */
  ringId?: string;
  summary: FinancialSummaryResponse | null;
  /** Present when this link's request failed, so the row can say why. */
  error?: string;
}

/** Ceiling on the fan-out, so a large link list cannot flood the API. */
export const LINK_FINANCIAL_MAX = 25;

/**
 * Budget figures per link.
 *
 * `/api/dashboard/financial-summary` answers for ONE scope per call and returns
 * no per-link array, so the only way to chart links side by side is to ask once
 * per link. Requests go out in small batches rather than all at once — 25 links
 * is 25 POSTs, and the endpoint takes ~1.3s each.
 *
 * A failed link resolves to `summary: null` instead of rejecting the batch: one
 * bad link should cost that bar, not the whole chart. Callers must treat null as
 * "unknown", never as zero — a zero bar next to real ones reads as "no budget".
 *
 * Returns rows in the same order as `links`, truncated to `LINK_FINANCIAL_MAX`.
 * `dropped` reports how many were cut, so the UI can say so instead of showing
 * a silently partial chart.
 */
export const getFinancialSummaryByLink = async (
  links: Array<{ id: string; name: string; ringId?: string }>,
  base: FinancialSummaryFilters = {},
  concurrency = 4
): Promise<{ rows: LinkFinancialRow[]; dropped: number; unusable: number }> => {
  // A link whose id is not a number cannot be queried at all — projectId is a
  // `long` upstream, and sending a name 500s. Counted, not silently skipped.
  const named = links.filter((l) => l && l.id && l.name);
  const scoped = named.filter((l) => toLongId(l.id) !== null);
  const unusable = named.length - scoped.length;
  const dropped = Math.max(0, scoped.length - LINK_FINANCIAL_MAX);
  const targets = scoped.slice(0, LINK_FINANCIAL_MAX);
  const rows: LinkFinancialRow[] = [];

  for (let i = 0; i < targets.length; i += concurrency) {
    const batch = targets.slice(i, i + concurrency);
    const settled = await Promise.all(
      batch.map(async (link): Promise<LinkFinancialRow> => {
        try {
          // The link's own ring, not the caller's: `base.ringId` would scope
          // every call to one ring and zero out every link outside it.
          const summary = await getFinancialSummary({
            ...base,
            projectId: link.id,
            ringId: link.ringId ?? base.ringId,
          });
          return { id: link.id, name: link.name, ringId: link.ringId, summary };
        } catch (err) {
          return {
            id: link.id,
            name: link.name,
            ringId: link.ringId,
            summary: null,
            error: err instanceof Error ? err.message : 'request failed',
          };
        }
      })
    );
    rows.push(...settled);
  }

  return { rows, dropped, unusable };
};

// ---------------------------------------------------------------------------
// Progress Summary API
// ---------------------------------------------------------------------------

export interface ProgressSummaryContractor {
  contractor: string;
  totalPlannedKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  completionPercent: number;
  inProgressPercent?: number;
  pendingPercent?: number;
  fetchedAt: number;
}

export interface ProgressSummaryGrandTotal {
  totalPlannedKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  completionPercent: number;
}

export interface ProgressSummaryPhaseBreakdown {
  contractor: string;
  phaseId: string;
  totalSegments: number;
  completedSegments: number;
  inProgressSegments: number;
  pendingSegments: number;
  blockedSegments: number;
  totalKm: number;
  completedKm: number;
  completionPercent: number;
}

export interface ProgressSummaryResponse {
  contractors: ProgressSummaryContractor[];
  grandTotal: ProgressSummaryGrandTotal;
  phaseBreakdown?: ProgressSummaryPhaseBreakdown[];
  phaseId: string | null;
  filters: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Phase KPI Summary (calls external API for Trenching/Ducting/Backfilling)
// ---------------------------------------------------------------------------

export interface PhaseKpiItem {
  phaseName: string;
  totalPlannedKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  completionPercent: number;
  contractors: Array<{
    contractor: string;
    totalPlannedKm: number;
    completedKm: number;
    inProgressKm: number;
    pendingKm: number;
    completionPercent: number;
  }>;
}

export interface PhaseKpiSummaryKpi {
  totalPlannedKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  completionPercent: number;
}

export interface PhaseKpiSummaryResponse {
  phases: PhaseKpiItem[];
  kpiSummary?: {
    trenching: PhaseKpiSummaryKpi;
    ducting: PhaseKpiSummaryKpi;
    backfilling: PhaseKpiSummaryKpi;
  };
  fetchedAt: number;
}

export const getPhaseKpiSummary = async (params?: { contractorIds?: string }) => {
  if (upstreamApi.supports('phase-kpi-summary')) {
    return upstreamApi.getPhaseKpiSummary(params);
  }
  const response = await apiLong.get<PhaseKpiSummaryResponse>(
    '/api/dashboard/phase-kpi-summary',
    { params }
  );
  return response.data;
};

export const getProgressSummary = async (
  filters: V2CommonFilters & { contractor?: string; phaseId?: string; phaseName?: string }
) => {
  if (upstreamApi.supports('progress-summary')) {
    return upstreamApi.getProgressSummary(filters as Record<string, unknown>);
  }
  const response = await apiLong.get<ProgressSummaryResponse>(
    '/api/dashboard/progress-summary',
    { params: filters }
  );
  return response.data;
};
