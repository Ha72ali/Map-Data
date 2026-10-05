import type * as GeoJSON from 'geojson';
import {
  filterGeoJsonForMap,
  geoJsonFeatureVisibleForMapFilters,
  sanitizeFeatureCollection,
  simplifyFeatureCollectionForDisplay,
  toLeafletGeoJsonObject,
} from '../map-geojson';
import {
  classifyGisRouteLine,
  gisColorForRouteLine,
  routeStatusBucket,
  type RouteStatusBucket,
} from './map-colors';
import type { GisRouteLineClass } from './oman-map-config';
import { GIS_ROUTE_COLORS } from './oman-map-config';
import { repairTelecomRouteFeatureCollection } from './route-geometry-repair';
import { extractLinePaths } from './telecom-route-renderer';

export type SplitGeoJsonLayers = {
  routes: GeoJSON.FeatureCollection;
  routeElements: GeoJSON.FeatureCollection;
  markers: GeoJSON.FeatureCollection;
  regions: GeoJSON.FeatureCollection;
};

const EMPTY: SplitGeoJsonLayers = {
  routes: { type: 'FeatureCollection', features: [] },
  routeElements: { type: 'FeatureCollection', features: [] },
  markers: { type: 'FeatureCollection', features: [] },
  regions: { type: 'FeatureCollection', features: [] },
};

export function buildMapGeoQueryParams(opts: {
  contractor?: string;
  ringSel?: string;
  projectSel?: string;
}): Record<string, string> | undefined {
  const out: Record<string, string> = {};
  const contractor = opts.contractor?.trim();
  if (contractor) {
    out['contractor'] = contractor;
  }
  const ringSel = opts.ringSel?.trim();
  if (ringSel && ringSel !== 'ALL') {
    const ringId = ringSel.replace(/^R/i, '').trim();
    if (ringId) {
      out['ringId'] = ringId;
    }
  }
  const projectSel = opts.projectSel?.trim();
  if (projectSel && projectSel !== 'ALL') {
    out['projectId'] = projectSel;
  }
  return Object.keys(out).length ? out : undefined;
}

function stripZ(coords: unknown): unknown {
  if (typeof coords === 'number') {
    return coords;
  }
  if (!Array.isArray(coords)) {
    return coords;
  }
  if (coords.length >= 2 && typeof coords[0] === 'number') {
    return [coords[0], coords[1]];
  }
  return coords.map(stripZ);
}

function normalizeGeometry(geometry: GeoJSON.Geometry | null | undefined): GeoJSON.Geometry | null {
  if (!geometry || typeof geometry !== 'object') {
    return null;
  }
  const g = geometry as GeoJSON.Geometry & { coordinates?: unknown };
  if (!('coordinates' in g)) {
    return geometry;
  }
  return { ...g, coordinates: stripZ(g.coordinates) } as GeoJSON.Geometry;
}

function featureKind(
  props: Record<string, unknown>,
  geometry?: GeoJSON.Geometry | null
): 'route' | 'routeElement' | 'marker' | 'region' {
  const ft = String(props['featureType'] || props['feature_type'] || '')
    .toLowerCase()
    .replace(/\s+/g, '');
  if (ft === 'marker') return 'marker';
  // 'routeelement' is what the contractor API actually sends ("routeElement"
  // lowercased); 'routelement' is a long-standing typo kept so any payload
  // already relying on it still classifies.
  if (ft === 'routeelement' || ft === 'routelement' || ft === 'route_element') {
    return 'routeElement';
  }
  if (
    ft === 'region' ||
    ft === 'regions' ||
    ft === 'governorate' ||
    ft === 'zone' ||
    ft === 'boundary' ||
    ft === 'operationalarea' ||
    ft === 'operational_area'
  ) {
    return 'region';
  }
  const gType = geometry?.type;
  if (gType === 'Polygon' || gType === 'MultiPolygon') {
    return 'region';
  }
  return 'route';
}

function normalizeExplicitRouteColor(explicit: unknown, fallback: string): string {
  const c = typeof explicit === 'string' ? explicit.trim().toLowerCase() : '';
  if (!c) return fallback;
  if (c === '#000' || c === '#000000' || c === 'black' || c === '#1a1a1a' || c === '#111') {
    return fallback;
  }
  return typeof explicit === 'string' ? explicit.trim() : fallback;
}

function enrichRouteProperties(props: Record<string, unknown>): Record<string, unknown> {
  const bucket: RouteStatusBucket = routeStatusBucket(
    props['status'],
    props['progress'],
    props
  );
  const lineClass: GisRouteLineClass = 'rollout';
  const mapColor = gisColorForRouteLine(lineClass);
  return {
    ...props,
    _statusBucket: bucket,
    _routeLineClass: lineClass,
    _mapColor: mapColor,
    color: normalizeExplicitRouteColor(props['color'], mapColor),
  };
}

function normalizeFeature(feature: GeoJSON.Feature): GeoJSON.Feature | null {
  if (!feature || feature.type !== 'Feature') {
    return null;
  }
  const geometry = normalizeGeometry(feature.geometry);
  if (!geometry) {
    return null;
  }
  const props = (feature.properties || {}) as Record<string, unknown>;
  const kind = featureKind(props, geometry);
  const nextProps =
    kind === 'route' ? enrichRouteProperties(props) : { ...props };
  return {
    type: 'Feature',
    properties: nextProps,
    geometry,
  };
}

/** Split PMS contractor GeoJSON (`routes` + `routeElement` + `marker` in one payload). */
export function splitPmsGeoJsonPayload(input: unknown): SplitGeoJsonLayers {
  const obj = toLeafletGeoJsonObject(input);
  if (!obj) {
    return { ...EMPTY };
  }
  const features =
    obj.type === 'FeatureCollection'
      ? obj.features
      : obj.type === 'Feature'
        ? [obj]
        : [];

  const routes: GeoJSON.Feature[] = [];
  const routeElements: GeoJSON.Feature[] = [];
  const markers: GeoJSON.Feature[] = [];
  const regions: GeoJSON.Feature[] = [];

  for (const raw of features) {
    const f = normalizeFeature(raw);
    if (!f) continue;
    const props = (f.properties || {}) as Record<string, unknown>;
    switch (featureKind(props, f.geometry)) {
      case 'marker':
        markers.push(f);
        break;
      case 'routeElement':
        routeElements.push(f);
        break;
      case 'region':
        regions.push(f);
        break;
      default:
        routes.push(f);
        break;
    }
  }

  return {
    routes: { type: 'FeatureCollection', features: routes },
    routeElements: { type: 'FeatureCollection', features: routeElements },
    markers: { type: 'FeatureCollection', features: markers },
    regions: { type: 'FeatureCollection', features: regions },
  };
}

export function mergeSplitLayers(
  base: SplitGeoJsonLayers,
  extra: SplitGeoJsonLayers
): SplitGeoJsonLayers {
  return {
    routes: {
      type: 'FeatureCollection',
      features: [...base.routes.features, ...extra.routes.features],
    },
    routeElements: {
      type: 'FeatureCollection',
      features: [...base.routeElements.features, ...extra.routeElements.features],
    },
    markers: {
      type: 'FeatureCollection',
      features: [...base.markers.features, ...extra.markers.features],
    },
    regions: {
      type: 'FeatureCollection',
      features: [...base.regions.features, ...extra.regions.features],
    },
  };
}

function filterCollection(
  fc: GeoJSON.FeatureCollection,
  ringSel: string,
  projectSel: string,
  stepSel = 'ALL',
  stepDisplayName?: string
): GeoJSON.FeatureCollection | null {
  const filtered = filterGeoJsonForMap(fc, ringSel, projectSel, stepSel, stepDisplayName);
  if (!filtered) return null;
  const gj = toLeafletGeoJsonObject(filtered);
  if (!gj || gj.type !== 'FeatureCollection') {
    return null;
  }
  const simplified = simplifyFeatureCollectionForDisplay(
    sanitizeFeatureCollection(gj)
  );
  return simplified.features.length ? simplified : null;
}

function isBptFeatureCollection(fc: GeoJSON.FeatureCollection): boolean {
  return fc.features.some((feature) => {
    const p = (feature.properties || {}) as Record<string, unknown>;
    const contractor = String(p['contractor'] || p['contractorCode'] || p['contractor_code'] || '')
      .trim()
      .toUpperCase()
      .replace(/[\s_-]+/g, '');
    return contractor === 'BPT';
  });
}

function lineStringFeaturesFromCollection(
  fc: GeoJSON.FeatureCollection
): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = [];

  for (const feature of fc.features) {
    if (!feature?.geometry) continue;
    const props = feature.properties ? { ...(feature.properties as Record<string, unknown>) } : {};
    const paths = extractLinePaths(feature.geometry);
    paths.forEach((path, index) => {
      if (path.length < 2) return;
      features.push({
        type: 'Feature',
        properties: {
          ...props,
          _sourceGeometryType: feature.geometry?.type,
          _sourcePathIndex: index,
        },
        geometry: { type: 'LineString', coordinates: path },
      });
    });
  }

  return { type: 'FeatureCollection', features };
}

function routeIdKeys(feature: GeoJSON.Feature): string[] {
  const p = (feature.properties || {}) as Record<string, unknown>;
  const keys: string[] = [];
  for (const k of ['routeId', 'route_id', 'routeID']) {
    const raw = p[k];
    if (raw === undefined || raw === null) continue;
    const s = String(raw).trim();
    if (s) keys.push(s);
  }
  return keys;
}

function collectRouteIdsFromFeatures(features: GeoJSON.Feature[]): Set<string> {
  const ids = new Set<string>();
  for (const f of features) {
    for (const id of routeIdKeys(f)) {
      ids.add(id);
    }
  }
  return ids;
}

function filterRoutesForStep(
  routes: GeoJSON.FeatureCollection,
  ringSel: string,
  projectSel: string,
  stepSel: string,
  stepDisplayName: string | undefined,
  linkedRouteIds: Set<string>
): GeoJSON.FeatureCollection | null {
  // Multi-part geometry is kept intact here: splitting into one LineString per
  // path before the repair pass left every path a chain of one, so touching
  // fragments could never be joined. The split happens once, after the repair.
  // BPT routes skip the display simplification, but must still honour the
  // ring / link filters — the merged "all contractors" payload always holds
  // some BPT features, so returning them unfiltered showed every route.
  if (isBptFeatureCollection(routes)) {
    const visible = routes.features.filter(
      (f) =>
        Boolean(f?.geometry) &&
        geoJsonFeatureVisibleForMapFilters(f, ringSel, projectSel, stepSel, stepDisplayName)
    );
    if (!visible.length) return null;
    const bptRoutes = sanitizeFeatureCollection({ type: 'FeatureCollection', features: visible });
    return bptRoutes.features.length ? bptRoutes : null;
  }

  if (!stepSel || stepSel === 'ALL') {
    return filterCollection(routes, ringSel, projectSel, stepSel, stepDisplayName);
  }
  const visible = routes.features.filter((f) => {
    if (!f?.geometry) return false;
    if (
      geoJsonFeatureVisibleForMapFilters(f, ringSel, projectSel, stepSel, stepDisplayName)
    ) {
      return true;
    }
    if (!linkedRouteIds.size) return false;
    return routeIdKeys(f).some((id) => linkedRouteIds.has(id));
  });
  if (!visible.length) return null;
  const fc: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: visible };
  const simplified = simplifyFeatureCollectionForDisplay(sanitizeFeatureCollection(fc));
  return simplified.features.length ? simplified : null;
}

export function filterSplitForMap(
  split: SplitGeoJsonLayers,
  ringSel: string,
  projectSel: string,
  stepSel = 'ALL',
  stepDisplayName?: string
): SplitGeoJsonLayers {
  const stepActive = Boolean(stepSel && stepSel !== 'ALL');

  const routeElements =
    filterCollection(split.routeElements, ringSel, projectSel, stepSel, stepDisplayName) ??
    EMPTY.routeElements;
  const markers =
    filterCollection(split.markers, ringSel, projectSel, stepSel, stepDisplayName) ??
    EMPTY.markers;
  const regions =
    filterCollection(split.regions, ringSel, projectSel, stepSel, stepDisplayName) ??
    EMPTY.regions;

  const linkedRouteIds = stepActive
    ? collectRouteIdsFromFeatures([
        ...routeElements.features,
        ...markers.features,
      ])
    : new Set<string>();

  const routesFiltered =
    filterRoutesForStep(
      split.routes,
      ringSel,
      projectSel,
      stepSel,
      stepDisplayName,
      linkedRouteIds
    ) ?? EMPTY.routes;
  // Join touching fragments first, then hand the renderer one LineString per
  // drawable path.
  const routes =
    routesFiltered.features.length > 0
      ? lineStringFeaturesFromCollection(
          repairTelecomRouteFeatureCollection(routesFiltered)
        )
      : EMPTY.routes;

  return {
    routes,
    routeElements,
    markers,
    regions,
  };
}

/** Single telecom rollout layer on map (no multi-color stack). */
export const GIS_ROUTE_LAYER_DRAW_ORDER: readonly GisRouteLineClass[] = ['rollout'] as const;

export function splitRoutesByLineClass(
  fc: GeoJSON.FeatureCollection
): Record<GisRouteLineClass, GeoJSON.FeatureCollection> {
  const buckets: Record<GisRouteLineClass, GeoJSON.Feature[]> = {
    backbone: [],
    rollout: [],
    planned: [],
    completed: [],
  };
  for (const feature of fc.features) {
    if (!feature?.geometry) continue;
    const props = (feature.properties || {}) as Record<string, unknown>;
    const raw = String(props['_routeLineClass'] || classifyGisRouteLine(props)).trim() as GisRouteLineClass;
    const key = raw in GIS_ROUTE_COLORS ? raw : 'planned';
    buckets[key].push(feature);
  }
  return {
    backbone: { type: 'FeatureCollection', features: buckets.backbone },
    rollout: { type: 'FeatureCollection', features: buckets.rollout },
    planned: { type: 'FeatureCollection', features: buckets.planned },
    completed: { type: 'FeatureCollection', features: buckets.completed },
  };
}

export function countSplitFeatures(split: SplitGeoJsonLayers): {
  routes: number;
  routeElements: number;
  markers: number;
  regions: number;
  total: number;
} {
  const routes = split.routes.features.length;
  const routeElements = split.routeElements.features.length;
  const markers = split.markers.features.length;
  const regions = split.regions.features.length;
  return {
    routes,
    routeElements,
    markers,
    regions,
    total: routes + routeElements + markers + regions,
  };
}
