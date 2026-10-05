import type * as GeoJSON from 'geojson';
import { MAIN_ROUTE_STYLE } from './map/oman-map-config';

/** Leaflet-compatible line styling (also consumed by Esri symbol helpers). */
export type GeoJsonLineStyle = {
  color?: string;
  weight?: number;
  opacity?: number;
  dashArray?: string;
  lineCap?: string;
  lineJoin?: string;
  /** Leaflet smoothFactor analogue — light path smoothing at render time. */
  smoothFactor?: number;
};

const GEOJSON_OBJECT_TYPES = new Set([
  'FeatureCollection',
  'Feature',
  'LineString',
  'MultiLineString',
  'Point',
  'MultiPoint',
  'Polygon',
  'MultiPolygon',
  'GeometryCollection',
]);

const GEOJSON_OBJECT_TYPES_LOWER = new Set(
  [...GEOJSON_OBJECT_TYPES].map((x) => x.toLowerCase())
);

function parseJsonTextPayload(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    /* txt exports often include endpoint/header text before the JSON payload. */
  }

  const geoHint = trimmed.search(/"features"|"type"\s*:\s*"Feature/i);
  const start = trimmed.indexOf('{', geoHint >= 0 ? geoHint : 0);
  const end = trimmed.lastIndexOf('}');
  if (start < 0 || end <= start) {
    return null;
  }
  try {
    return JSON.parse(trimmed.slice(start, end + 1)) as unknown;
  } catch {
    return null;
  }
}

function decodeTextPayload(input: unknown): unknown {
  return typeof input === 'string' ? parseJsonTextPayload(input) : input;
}

/** Normalize ring ids so UI `R2` matches upstream `2` or `R2`. */
function ringKey(value: unknown): string {
  return String(value ?? '')
    .trim()
    .replace(/^R/i, '')
    .toLowerCase();
}

/** OSP-style route polyline — unified telecom rollout red. */
export function getMainRoutePathStyle(
  _feature: GeoJSON.Feature,
  _fallbackColor = '#c7434e'
): GeoJsonLineStyle {
  return { ...MAIN_ROUTE_STYLE };
}

/** Route elements use the same rollout red when shown on the map. */
export function getRouteElementPathStyle(_elementType: string | undefined): GeoJsonLineStyle {
  return { ...MAIN_ROUTE_STYLE };
}

export function styleGeoJsonLineFeature(feature: GeoJSON.Feature): GeoJsonLineStyle {
  const p = (feature.properties || {}) as Record<string, unknown>;
  const ft = String(p['featureType'] || p['feature_type'] || '')
    .toLowerCase()
    .replace(/\s+/g, '');
  if (ft === 'routelement' || ft === 'route_element') {
    const typRaw = p['type'];
    const typ = typRaw != null ? String(typRaw) : undefined;
    return getRouteElementPathStyle(typ);
  }
  if (ft === 'route' || ft === '') {
    return getMainRoutePathStyle(feature);
  }
  return getMainRoutePathStyle(feature);
}

/**
 * When a ring is selected, drop features whose `ringId` does not match.
 * Features without `ringId` are kept (upstream may omit).
 */
export function geoJsonFeatureVisibleForRing(
  feature: GeoJSON.Feature,
  selectedRing: string
): boolean {
  if (!selectedRing || selectedRing === 'ALL') return true;
  const p = (feature.properties || {}) as Record<string, unknown>;
  const rid = p['ringId'];
  if (rid === undefined || rid === null) return true;
  const rk = ringKey(rid);
  const sk = ringKey(selectedRing);
  if (rk === '' || sk === '') {
    return String(rid).trim() === String(selectedRing).trim();
  }
  return rk === sk;
}

function projectKey(value: unknown): string {
  return normFilterKey(value);
}

/** Normalized string for filter comparisons (case/whitespace insensitive). */
export function normFilterKey(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/** Construction-phase labels from the dashboard filter dropdown. */
const STEP_FILTER_ALIASES: Readonly<Record<string, readonly string[]>> = {
  ducting: ['duct', 'duct detail', 'duct details', 'fiber cable & duct', 'proposed foc'],
  trenching: ['trench', 'asphalt cutting', 'asphalt cut'],
  'sand bedding': ['sand bedding', 'sand bed', 'bedding'],
  'marker post': ['marker post', 'marker', 'markerpost'],
  'route marking': ['route marking', 'route mark', 'marking'],
  'hand holes': ['hand hole', 'handhole', 'manhole', 'hh'],
  'final backfilling': ['final backfill', 'final backfilling', 'backfill final'],
  '1st layer backfilling': ['1st layer', 'first layer backfill', '1st backfill'],
  '2nd layer backfilling': ['2nd layer', 'second layer backfill', '2nd backfill'],
  'removal and reinstatement of interlocks': [
    'interlock',
    'interlocks',
    'reinstatement',
    'removal and reinstatement',
  ],
};

function collectFeatureFilterTexts(props: Record<string, unknown>): string[] {
  const keys = [
    'step',
    'phase',
    'phaseName',
    'phase_name',
    'sourceFolder',
    'source_folder',
    'name',
    'category',
    'type',
    'featureType',
    'feature_type',
    'rolloutType',
    'rollout_type',
  ] as const;
  const out: string[] = [];
  for (const k of keys) {
    const raw = props[k];
    if (raw === undefined || raw === null) continue;
    const t = normFilterKey(raw);
    if (t) out.push(t);
  }
  return out;
}

function stepNeedleMatchesText(needle: string, haystack: string): boolean {
  if (!needle || !haystack) return false;
  if (haystack === needle || haystack.includes(needle) || needle.includes(haystack)) {
    return true;
  }
  const aliases = STEP_FILTER_ALIASES[needle];
  if (aliases) {
    return aliases.some(
      (alias) => haystack.includes(alias) || alias.includes(haystack)
    );
  }
  for (const [canonical, aliasList] of Object.entries(STEP_FILTER_ALIASES)) {
    if (!needle.includes(canonical) && canonical !== needle) continue;
    if (aliasList.some((alias) => haystack.includes(alias))) {
      return true;
    }
  }
  return false;
}

/** When a construction step / phase filter is selected, match feature metadata. */
export function geoJsonFeatureVisibleForStep(
  feature: GeoJSON.Feature,
  selectedStep: string,
  stepDisplayName?: string
): boolean {
  if (!selectedStep || selectedStep === 'ALL') return true;
  const needle = normFilterKey(stepDisplayName || selectedStep);
  if (!needle) return true;

  const p = (feature.properties || {}) as Record<string, unknown>;
  const idNeedle = normFilterKey(selectedStep);
  const idFields = ['step', 'stepId', 'step_id', 'phase', 'phaseId', 'phase_id'] as const;
  for (const k of idFields) {
    const raw = p[k];
    if (raw === undefined || raw === null) continue;
    const pk = normFilterKey(raw);
    if (pk === needle || pk === idNeedle || String(raw).trim() === String(selectedStep).trim()) {
      return true;
    }
  }

  const texts = collectFeatureFilterTexts(p);
  return texts.some((t) => stepNeedleMatchesText(needle, t));
}

/** When a project/link is selected, keep matching features; omit project fields → keep (upstream may omit). */
export function geoJsonFeatureVisibleForProject(
  feature: GeoJSON.Feature,
  selectedProject: string
): boolean {
  if (!selectedProject || selectedProject === 'ALL') return true;
  const p = (feature.properties || {}) as Record<string, unknown>;
  const keys = ['projectId', 'project_id', 'linkId', 'link_id', 'project'] as const;
  let hasProjectField = false;
  for (const k of keys) {
    const raw = p[k];
    if (raw === undefined || raw === null) continue;
    hasProjectField = true;
    const pk = projectKey(raw);
    const sk = projectKey(selectedProject);
    if (pk === sk || String(raw).trim() === String(selectedProject).trim()) {
      return true;
    }
  }
  return !hasProjectField;
}

export function geoJsonFeatureVisibleForMapFilters(
  feature: GeoJSON.Feature,
  selectedRing: string,
  selectedProject: string,
  selectedStep = 'ALL',
  stepDisplayName?: string
): boolean {
  return (
    geoJsonFeatureVisibleForRing(feature, selectedRing) &&
    geoJsonFeatureVisibleForProject(feature, selectedProject) &&
    geoJsonFeatureVisibleForStep(feature, selectedStep, stepDisplayName)
  );
}

/**
 * Unwrap common API envelopes (`{ data: { type: FeatureCollection } }`, etc.)
 * before interpreting GeoJSON.
 */
export function unwrapGeoJsonPayload(input: unknown): unknown {
  let v: unknown = decodeTextPayload(input);
  for (let depth = 0; depth < 8 && v !== null && v !== undefined; depth++) {
    if (Array.isArray(v)) {
      return v;
    }
    if (typeof v !== 'object') {
      return v;
    }
    const o = v as Record<string, unknown>;
    const t = o['type'];
    if (typeof t === 'string' && GEOJSON_OBJECT_TYPES_LOWER.has(t.toLowerCase())) {
      return v;
    }
    let inner: unknown;
    for (const k of [
      'geojson',
      'geoJson',
      'GeoJSON',
      'data',
      'payload',
      'body',
      'result',
      'content',
      'routes',
    ]) {
      const c = o[k];
      if (c !== null && c !== undefined && typeof c === 'object') {
        inner = c;
        break;
      }
    }
    if (inner === undefined) {
      return v;
    }
    v = inner;
  }
  return v;
}

/** Reusable contractor GeoJSON parser for API JSON, local JSON, and uploaded txt payloads. */
export function parseContractorGeoJSON(
  input: unknown
): GeoJSON.FeatureCollection | GeoJSON.Feature | null {
  return toLeafletGeoJsonObject(decodeTextPayload(input));
}

/** Convert various server shapes into something Leaflet `geoJSON()` accepts. */
export function toLeafletGeoJsonObject(
  input: unknown
): GeoJSON.FeatureCollection | GeoJSON.Feature | null {
  const raw = unwrapGeoJsonPayload(input);
  if (raw == null) {
    return null;
  }
  if (Array.isArray(raw)) {
    const features = raw.filter(
      (x): x is GeoJSON.Feature =>
        Boolean(x && typeof x === 'object' && (x as { type?: string }).type === 'Feature')
    );
    if (!features.length) {
      return null;
    }
    return { type: 'FeatureCollection', features };
  }
  if (typeof raw !== 'object') {
    return null;
  }
  const o = raw as Record<string, unknown>;
  const t = o['type'];
  const tLower = typeof t === 'string' ? t.toLowerCase() : '';
  if (tLower === 'featurecollection' && Array.isArray(o['features'])) {
    return raw as GeoJSON.FeatureCollection;
  }
  if (tLower === 'feature') {
    return raw as GeoJSON.Feature;
  }
  if (!tLower && Array.isArray(o['features'])) {
    return { type: 'FeatureCollection', features: o['features'] as GeoJSON.Feature[] };
  }
  if (
    typeof t === 'string' &&
    GEOJSON_OBJECT_TYPES_LOWER.has(tLower) &&
    tLower !== 'feature' &&
    tLower !== 'featurecollection'
  ) {
    return {
      type: 'Feature',
      properties: (typeof o['properties'] === 'object' && o['properties'] !== null
        ? (o['properties'] as object)
        : {}) as GeoJSON.Feature['properties'],
      geometry: raw as GeoJSON.Geometry,
    };
  }
  return null;
}

export function countGeoJsonFeatures(data: unknown): number {
  const obj = toLeafletGeoJsonObject(data);
  if (!obj) return 0;
  if (obj.type === 'FeatureCollection') return obj.features.length;
  if (obj.type === 'Feature') return 1;
  return 0;
}

export function countVisibleFeatures(
  data: unknown,
  selectedRing: string,
  selectedProject = 'ALL',
  selectedStep = 'ALL',
  stepDisplayName?: string,
  predicate?: (f: GeoJSON.Feature) => boolean
): number {
  const obj = toLeafletGeoJsonObject(data);
  if (!obj) return 0;
  if (obj.type === 'FeatureCollection') {
    return obj.features.filter((f: GeoJSON.Feature) => {
      if (!f || f.type !== 'Feature') return false;
      if (
        !geoJsonFeatureVisibleForMapFilters(
          f,
          selectedRing,
          selectedProject,
          selectedStep,
          stepDisplayName
        )
      ) {
        return false;
      }
      return predicate ? predicate(f) : true;
    }).length;
  }
  if (obj.type === 'Feature') {
    if (
      !geoJsonFeatureVisibleForMapFilters(
        obj,
        selectedRing,
        selectedProject,
        selectedStep,
        stepDisplayName
      )
    ) {
      return 0;
    }
    return predicate && !predicate(obj) ? 0 : 1;
  }
  return 0;
}

/** Client-side ring filter applied before handing GeoJSON to Esri layers. */
function coordsLookValid(coords: unknown): boolean {
  if (coords == null) return false;
  if (typeof coords === 'number') {
    return Number.isFinite(coords);
  }
  if (Array.isArray(coords)) {
    if (!coords.length) return false;
    return coords.every(coordsLookValid);
  }
  return false;
}

function geometryLooksValid(geometry: GeoJSON.Geometry | null | undefined): boolean {
  if (!geometry || typeof geometry !== 'object') return false;
  const g = geometry as GeoJSON.Geometry;
  if (g.type === 'GeometryCollection') {
    return Array.isArray(g.geometries) && g.geometries.some(geometryLooksValid);
  }
  const c = (g as { coordinates?: unknown }).coordinates;
  return coordsLookValid(c);
}

/** Drop features with missing/invalid geometry so one bad feature cannot break the map. */
export function sanitizeFeatureCollection(
  fc: GeoJSON.FeatureCollection
): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: fc.features.filter(
      (f) => Boolean(f && f.type === 'Feature' && geometryLooksValid(f.geometry))
    ),
  };
}

/** Display-only cap — keeps rendering smooth while preserving route shape. */
const MAX_LINE_VERTICES = 8_000;

/** Skip vertex decimation for typical contractor bundles (few features, many sub-paths). */
const MAX_FEATURES_WITHOUT_SIMPLIFY = 32;

function vertexCount(coords: unknown): number {
  if (typeof coords === 'number') return 1;
  if (!Array.isArray(coords)) return 0;
  if (coords.length && typeof coords[0] === 'number') {
    return coords.length / 2;
  }
  let n = 0;
  for (const part of coords) {
    n += vertexCount(part);
  }
  return n;
}

function decimateLineCoords(coords: number[][], max: number): number[][] {
  if (coords.length <= max) return coords;
  const step = Math.ceil(coords.length / max);
  const out: number[][] = [];
  for (let i = 0; i < coords.length; i += step) {
    out.push(coords[i]);
  }
  const last = coords[coords.length - 1];
  const tail = out[out.length - 1];
  if (!tail || tail[0] !== last[0] || tail[1] !== last[1]) {
    out.push(last);
  }
  return out;
}

function simplifyGeometry(geometry: GeoJSON.Geometry): GeoJSON.Geometry {
  const g = geometry as GeoJSON.Geometry & { coordinates?: unknown };
  if (g.type === 'LineString' && Array.isArray(g.coordinates)) {
    const line = g.coordinates as number[][];
    if (vertexCount(line) > MAX_LINE_VERTICES) {
      return { ...g, coordinates: decimateLineCoords(line, MAX_LINE_VERTICES) };
    }
  }
  if (g.type === 'MultiLineString' && Array.isArray(g.coordinates)) {
    const lines = g.coordinates as number[][][];
    const simplified = lines.map((line) =>
      vertexCount(line) > MAX_LINE_VERTICES
        ? decimateLineCoords(line, MAX_LINE_VERTICES)
        : line
    );
    return { ...g, coordinates: simplified };
  }
  return geometry;
}

export function shouldSimplifyFeatureCollectionForDisplay(
  fc: GeoJSON.FeatureCollection
): boolean {
  if (fc.features.length <= MAX_FEATURES_WITHOUT_SIMPLIFY) {
    return false;
  }
  let densePaths = 0;
  for (const f of fc.features) {
    const g = f.geometry;
    if (!g) continue;
    if (g.type === 'LineString') {
      if (vertexCount((g as GeoJSON.LineString).coordinates) > MAX_LINE_VERTICES) {
        densePaths++;
      }
    } else if (g.type === 'MultiLineString') {
      for (const line of (g as GeoJSON.MultiLineString).coordinates) {
        if (vertexCount(line) > MAX_LINE_VERTICES) {
          densePaths++;
        }
      }
    }
  }
  return densePaths > 2;
}

/** Reduce dense polylines before Esri blob layers (display-only; does not mutate cache). */
export function simplifyFeatureCollectionForDisplay(
  fc: GeoJSON.FeatureCollection
): GeoJSON.FeatureCollection {
  if (!shouldSimplifyFeatureCollectionForDisplay(fc)) {
    return fc;
  }
  return {
    type: 'FeatureCollection',
    features: fc.features.map((f) => {
      if (!f.geometry) return f;
      return { ...f, geometry: simplifyGeometry(f.geometry) };
    }),
  };
}

export function filterGeoJsonByRing(
  input: unknown,
  ringSel: string
): GeoJSON.FeatureCollection | GeoJSON.Feature | null {
  return filterGeoJsonForMap(input, ringSel, 'ALL', 'ALL');
}

/** Client-side ring + project + step filter before handing GeoJSON to Esri layers. */
export function filterGeoJsonForMap(
  input: unknown,
  ringSel: string,
  projectSel: string,
  stepSel = 'ALL',
  stepDisplayName?: string
): GeoJSON.FeatureCollection | GeoJSON.Feature | null {
  const obj = toLeafletGeoJsonObject(input);
  if (!obj) return null;
  const visible = (f: GeoJSON.Feature) =>
    Boolean(
      f &&
        f.type === 'Feature' &&
        geoJsonFeatureVisibleForMapFilters(
          f,
          ringSel,
          projectSel,
          stepSel,
          stepDisplayName
        ) &&
        geometryLooksValid(f.geometry)
    );
  if (obj.type === 'Feature') {
    return visible(obj) ? obj : null;
  }
  return sanitizeFeatureCollection({
    type: 'FeatureCollection',
    features: obj.features.filter(visible),
  });
}
