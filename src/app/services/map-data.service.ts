import { Injectable } from '@angular/core';
import axios, { type CancelTokenSource } from 'axios';
import type * as GeoJSON from 'geojson';
import { environment } from '../../environments/environment';
import {
  getGeoJsonByContractor,
  getGeoJsonMarkers,
  getGeoJsonRouteElements,
  getGeoJsonRoutes,
  isMapRequestAborted,
  type MapGeoJsonRequestOptions,
} from '../dashboard.service';
import {
  countGeoJsonFeatures,
  sanitizeFeatureCollection,
  toLeafletGeoJsonObject,
} from '../map-geojson';
import { buildMapGeoQueryParams } from '../map/map-geojson-pipeline';

export type MapDataSourceKind = 'local-asset' | 'api' | 'memory';

export type MapDataLoadResult = {
  data: unknown;
  source: MapDataSourceKind;
  featureCount: number;
  contractor?: string;
  durationMs: number;
  usedFallback?: boolean;
};

/** Asset filenames (under MAP_ASSET_PATH) — mirrors server/data/map-geojson. */
const CONTRACTOR_ASSET_BASE: Record<string, string> = {
  BPT: 'bpt',
  MHD: 'mhd',
  OHI: 'ohi',
  OFO: 'ofo',
  ALJASSAR: 'al-jassar',
};

/** Rollout contractors merged when the dashboard selects “All contractors”. */
export const ROLLOUT_MAP_CONTRACTOR_CODES = [
  'BPT',
  'MHD',
  'OHI',
  'OFO',
  'Al-Jassar',
] as const;

@Injectable({ providedIn: 'root' })
export class MapDataService {
  private readonly memoryCache = new Map<string, unknown>();
  private readonly inflight = new Map<string, CancelTokenSource>();

  /** True once Esri MapView has finished initial setup. */
  isMapReady = false;

  setMapReady(ready: boolean): void {
    this.isMapReady = ready;
  }

  prefersLocalAssets(): boolean {
    if (environment.MAP_SOURCE_MODE === 'local') {
      return true;
    }
    if (environment.MAP_SOURCE_MODE === 'api') {
      return false;
    }
    return Boolean(environment.USE_LOCAL_MAP_GEOJSON);
  }

  allowsApiFallback(): boolean {
    return environment.MAP_ALLOW_API_FALLBACK !== false;
  }

  assetBasePath(): string {
    const base = String(environment.MAP_ASSET_PATH || '/assets/maps').trim();
    return base.replace(/\/$/, '');
  }

  resolveApiContractorCode(contractorId: string, displayName?: string): string {
    const raw = String(contractorId || displayName || '').trim();
    const norm = this.normalizeKey(raw);
    if (CONTRACTOR_ASSET_BASE[norm]) {
      return norm === 'ALJASSAR' ? 'Al-Jassar' : norm;
    }
    if (/ALJASSAR/i.test(raw)) {
      return 'Al-Jassar';
    }
    return displayName?.trim() || contractorId?.trim() || raw;
  }

  buildQueryParams(opts: {
    contractorCode?: string;
    ringSel?: string;
    projectSel?: string;
  }): Record<string, string> | undefined {
    return buildMapGeoQueryParams({
      contractor: opts.contractorCode,
      ringSel: opts.ringSel,
      projectSel: opts.projectSel,
    });
  }

  /**
   * Load main route GeoJSON for the map — local bundled assets first when configured.
   */
  async loadRoutes(
    contractorCode: string | undefined,
    query: Record<string, string> | undefined,
    options?: MapGeoJsonRequestOptions
  ): Promise<MapDataLoadResult> {
    const cacheKey = this.cacheKey('routes', contractorCode, query);
    const cached = this.readMemory(cacheKey);
    if (cached !== undefined && options?.useCache !== false) {
      return this.resultFrom(cached, 'memory', contractorCode, 0);
    }

    this.cancelInflight(cacheKey);
    const cancelSource = axios.CancelToken.source();
    this.inflight.set(cacheKey, cancelSource);
    const signal = options?.signal;
    if (signal) {
      signal.addEventListener('abort', () => cancelSource.cancel('aborted'), { once: true });
    }

    const started = performance.now();
    try {
      if (this.prefersLocalAssets()) {
        const local = contractorCode
          ? await this.fetchLocalAsset(contractorCode, cancelSource.token)
          : await this.fetchAllContractorsMerged(cancelSource.token);
        if (local) {
          const validated = this.validatePayload(local);
          this.writeMemory(cacheKey, validated);
          this.log(
            contractorCode ? 'loaded-local-asset' : 'loaded-local-asset-merged-all',
            contractorCode,
            validated,
            started
          );
          return this.resultFrom(validated, 'local-asset', contractorCode, started);
        }
        if (!this.allowsApiFallback()) {
          const empty = this.emptyCollection();
          this.writeMemory(cacheKey, empty);
          return this.resultFrom(empty, 'local-asset', contractorCode, started, true);
        }
      }

      const apiData = await this.fetchFromApi(contractorCode, query, {
        ...options,
        signal,
      });
      const validated = this.validatePayload(apiData);
      this.writeMemory(cacheKey, validated);
      this.log('loaded-api', contractorCode, validated, started);
      return this.resultFrom(validated, 'api', contractorCode, started);
    } catch (err) {
      if (axios.isCancel(err) || isMapRequestAborted(err, signal)) {
        throw err;
      }
      const local = await this.fetchLocalAsset(contractorCode);
      if (local) {
        const validated = this.validatePayload(local);
        this.writeMemory(cacheKey, validated);
        this.log('recovered-local-after-api-error', contractorCode, validated, started, true);
        return this.resultFrom(validated, 'local-asset', contractorCode, started, true);
      }
      throw err;
    } finally {
      this.inflight.delete(cacheKey);
    }
  }

  /** Overlays are optional; in local mode return empty collections without network I/O. */
  async loadRouteElements(
    _contractorCode: string | undefined,
    _query: Record<string, string> | undefined,
    options?: MapGeoJsonRequestOptions
  ): Promise<unknown> {
    if (this.prefersLocalAssets()) {
      return this.emptyCollection();
    }
    const params = _contractorCode
      ? { contractor: _contractorCode, ..._query }
      : _query;
    return getGeoJsonRouteElements(params, options);
  }

  async loadMarkers(
    _contractorCode: string | undefined,
    _query: Record<string, string> | undefined,
    options?: MapGeoJsonRequestOptions
  ): Promise<unknown> {
    if (this.prefersLocalAssets()) {
      return this.emptyCollection();
    }
    const params = _contractorCode
      ? { contractor: _contractorCode, ..._query }
      : _query;
    return getGeoJsonMarkers(params, options);
  }

  /** Warm cache for contractor route GeoJSON (non-blocking). */
  preloadContractor(contractorCode: string | undefined): void {
    const code = String(contractorCode || '').trim();
    if (!code) {
      return;
    }
    const key = this.cacheKey('routes', code, undefined);
    if (this.memoryCache.has(key)) {
      return;
    }
    void this.loadRoutes(code, undefined, { useCache: true }).catch(() => {
      /* preload is best-effort */
    });
  }

  /** Preload all rollout contractors when the GIS tab opens. */
  preloadRolloutContractors(codes: string[]): void {
    for (const code of codes) {
      this.preloadContractor(code);
    }
    const allKey = this.cacheKey('routes', undefined, undefined);
    if (!this.memoryCache.has(allKey)) {
      void this.loadRoutes(undefined, undefined, { useCache: true }).catch(() => {
        /* best-effort */
      });
    }
  }

  /**
   * Merge bundled contractor GeoJSON into one FeatureCollection (All contractors map mode).
   */
  async fetchAllContractorsMerged(
    cancelToken?: ReturnType<typeof axios.CancelToken.source>['token']
  ): Promise<GeoJSON.FeatureCollection | null> {
    const bundles = await Promise.all(
      ROLLOUT_MAP_CONTRACTOR_CODES.map((code) =>
        this.fetchLocalAsset(code, cancelToken).catch(() => null)
      )
    );
    const features: GeoJSON.Feature[] = [];
    for (let i = 0; i < bundles.length; i++) {
      const data = bundles[i];
      if (data == null) continue;
      const code = ROLLOUT_MAP_CONTRACTOR_CODES[i];
      const gj = toLeafletGeoJsonObject(data);
      if (!gj) continue;
      const list =
        gj.type === 'FeatureCollection'
          ? gj.features
          : gj.type === 'Feature'
            ? [gj]
            : [];
      for (const feature of list) {
        if (!feature || feature.type !== 'Feature') continue;
        const props = {
          ...((feature.properties || {}) as Record<string, unknown>),
        };
        if (!props['contractor']) {
          props['contractor'] = code;
        }
        features.push({ ...feature, properties: props });
      }
    }
    if (!features.length) {
      return null;
    }
    return { type: 'FeatureCollection', features };
  }

  clearCache(): void {
    this.memoryCache.clear();
    for (const src of this.inflight.values()) {
      src.cancel('cache-cleared');
    }
    this.inflight.clear();
  }

  private async fetchFromApi(
    contractorCode: string | undefined,
    query: Record<string, string> | undefined,
    options?: MapGeoJsonRequestOptions
  ): Promise<unknown> {
    if (contractorCode) {
      return getGeoJsonByContractor(contractorCode, query, options);
    }
    return getGeoJsonRoutes(query, options);
  }

  private async fetchLocalAsset(
    contractorCode: string | undefined,
    cancelToken?: ReturnType<typeof axios.CancelToken.source>['token']
  ): Promise<unknown | null> {
    const stem = this.resolveAssetStem(contractorCode);
    if (!stem) {
      return null;
    }
    const base = this.assetBasePath();
    const names = [`${stem}.geojson`, `${stem}.json`];
    for (const name of names) {
      const url = `${base}/${name}`;
      try {
        const res = await axios.get<unknown>(url, {
          timeout: 120_000,
          responseType: 'json',
          cancelToken,
        });
        if (res.data != null) {
          mapDataDebugLog('asset-hit', { url, contractor: contractorCode });
          return res.data;
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          throw err;
        }
        mapDataDebugLog('asset-miss', {
          url,
          contractor: contractorCode,
          message: err instanceof Error ? err.message : String(err),
        });
      }
    }
    return null;
  }

  private resolveAssetStem(contractorCode: string | undefined): string | null {
    const raw = String(contractorCode || environment.MAP_DEFAULT_CONTRACTOR || 'BPT').trim();
    const norm = this.normalizeKey(raw);
    if (CONTRACTOR_ASSET_BASE[norm]) {
      return CONTRACTOR_ASSET_BASE[norm];
    }
    if (/ALJASSAR/i.test(raw)) {
      return CONTRACTOR_ASSET_BASE['ALJASSAR'];
    }
    return null;
  }

  private validatePayload(data: unknown): unknown {
    const leaflet = toLeafletGeoJsonObject(data);
    if (!leaflet) {
      return data;
    }
    if (leaflet.type === 'FeatureCollection') {
      return sanitizeFeatureCollection(leaflet);
    }
    if (leaflet.type === 'Feature') {
      return sanitizeFeatureCollection({
        type: 'FeatureCollection',
        features: [leaflet],
      });
    }
    return data;
  }

  private emptyCollection(): GeoJSON.FeatureCollection {
    return { type: 'FeatureCollection', features: [] };
  }

  private cacheKey(
    kind: string,
    contractor: string | undefined,
    query: Record<string, string> | undefined
  ): string {
    const q = query ? JSON.stringify(query) : '';
    return `${kind}|${contractor || ''}|${q}`;
  }

  private readMemory(key: string): unknown | undefined {
    return this.memoryCache.get(key);
  }

  private writeMemory(key: string, data: unknown): void {
    this.memoryCache.set(key, data);
  }

  private cancelInflight(key: string): void {
    const prev = this.inflight.get(key);
    if (prev) {
      prev.cancel('superseded');
      this.inflight.delete(key);
    }
  }

  private resultFrom(
    data: unknown,
    source: MapDataSourceKind,
    contractor: string | undefined,
    started: number,
    usedFallback = false
  ): MapDataLoadResult {
    return {
      data,
      source,
      featureCount: countGeoJsonFeatures(data),
      contractor,
      durationMs: Math.round(performance.now() - started),
      usedFallback,
    };
  }

  private log(
    event: string,
    contractor: string | undefined,
    data: unknown,
    started: number,
    usedFallback = false
  ): void {
    mapDataDebugLog(event, {
      contractor,
      featureCount: countGeoJsonFeatures(data),
      source: this.prefersLocalAssets() ? 'local-asset' : 'api',
      durationMs: Math.round(performance.now() - started),
      usedFallback,
    });
  }

  private normalizeKey(value: string): string {
    return String(value || '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/[-_]/g, '');
  }
}

export function mapDataDebugLog(
  event: string,
  meta: Record<string, unknown>
): void {
  console.info('[map-data]', event, meta);
}
