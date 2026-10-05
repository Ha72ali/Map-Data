import axios from 'axios';
import type * as GeoJSON from 'geojson';
import { environment } from '../../environments/environment';
import { mapApiBaseUrl } from '../map-api-base';
import { countGeoJsonFeatures } from '../map-geojson';

/** Local asset filenames (under assets/maps) aligned with server/data/map-geojson. */
const CONTRACTOR_ASSET_FILES: Record<string, string> = {
  BPT: 'bpt.json',
  MHD: 'mhd.json',
  OHI: 'ohi.json',
  OFO: 'ofo.json',
  ALJASSAR: 'al-jassar.json',
};

function normalizeContractorKey(value: string): string {
  return String(value || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[-_]/g, '');
}

function resolveAssetFile(contractor?: string): string | null {
  const raw = String(contractor || '').trim();
  if (!raw) return CONTRACTOR_ASSET_FILES['BPT'] ?? null;
  const norm = normalizeContractorKey(raw);
  if (CONTRACTOR_ASSET_FILES[norm]) {
    return CONTRACTOR_ASSET_FILES[norm];
  }
  if (/ALJASSAR/i.test(raw) || /ALJASSAR/i.test(norm)) {
    return CONTRACTOR_ASSET_FILES['ALJASSAR'];
  }
  return null;
}

function assetsBase(): string {
  const base = String(
    environment.MAP_ASSET_PATH || environment.mapGeoJsonAssetsBase || '/assets/maps'
  ).trim();
  return base.replace(/\/$/, '');
}

export function mapGeoJsonDebugLog(
  event: string,
  meta: Record<string, unknown>
): void {
  console.info('[map] GeoJSON', event, meta);
}

export async function fetchMapGeoJsonAssetFallback(
  contractor?: string
): Promise<GeoJSON.FeatureCollection | null> {
  const file = resolveAssetFile(contractor);
  if (!file) {
    return null;
  }
  const base = assetsBase();
  const stems = [file, file.replace(/\.json$/i, '.geojson')];
  const urls = [...new Set(stems.map((f) => `${base}/${f}`))];
  mapGeoJsonDebugLog('asset-fallback-request', { urls, contractor });
  for (const url of urls) {
  try {
    const res = await axios.get<GeoJSON.FeatureCollection>(url, {
      timeout: 120_000,
      responseType: 'json',
    });
    const data = res.data;
    const featureCount = countGeoJsonFeatures(data);
    mapGeoJsonDebugLog('asset-fallback-ok', {
      url,
      status: res.status,
      contractor,
      featureCount,
    });
    if (data?.type === 'FeatureCollection' || (data && Array.isArray((data as { features?: unknown }).features))) {
      return data as GeoJSON.FeatureCollection;
    }
    return null;
  } catch (err) {
    mapGeoJsonDebugLog('asset-fallback-failed', {
      url,
      contractor,
      message: err instanceof Error ? err.message : String(err),
    });
  }
  }
  return null;
}

export function mapGeoJsonRequestTimeoutMs(): number {
  const n = Number(environment.mapGeoJsonTimeoutMs);
  return Number.isFinite(n) && n > 0 ? n : 90_000;
}

export function mapGeoJsonApiOrigin(): string {
  return mapApiBaseUrl();
}
