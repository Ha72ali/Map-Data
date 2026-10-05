import type * as GeoJSON from 'geojson';
import { environment } from '../../environments/environment';
import type { SplitGeoJsonLayers } from './map-geojson-pipeline';

/**
 * Collapse only coordinates that are the *same* point (float noise), never real
 * vertices. This used to be 0.001° (~111 m), which threw away ~93% of the
 * vertices of a GPS-surveyed route and cut every corner — the main reason the
 * rendered network drifted off the road and looked broken. The old dashboard
 * draws the raw coordinates, so anything dropped here is a gap it does not have.
 */
const DUPLICATE_EPS = 1e-9;
/** Endpoint matching when chaining sub-lines within one feature (degrees). */
const MERGE_EPS = 0.003;
/** Cross-feature / cross-chain endpoint bridge (degrees). */
const NETWORK_BRIDGE_EPS = 0.05;
/** Max vertex spacing inside a synthesised connector (degrees). */
const INTERPOLATE_STEP = 0.003;

type LonLat = [number, number];

type TaggedSegment = {
  coords: LonLat[];
  props: Record<string, unknown>;
};

type TaggedChain = {
  chain: LonLat[];
  props: Record<string, unknown>;
};

export function shouldRepairBptRouteGeometry(contractorCode?: string): boolean {
  const raw = String(
    contractorCode ?? environment.MAP_DEFAULT_CONTRACTOR ?? 'BPT'
  ).trim();
  const norm = raw.toUpperCase().replace(/\s+/g, '').replace(/[-_]/g, '');
  return norm === 'BPT';
}

function dist2d(a: LonLat, b: LonLat): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function normalizeCoord(coord: number[]): LonLat | null {
  if (!coord || coord.length < 2) return null;
  const lon = coord[0];
  const lat = coord[1];
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
  return [lon, lat];
}

/** Keep every surveyed vertex; only exact repeats are dropped. */
function normalizePath(path: number[][]): LonLat[] | null {
  const out: LonLat[] = [];
  for (const c of path) {
    const p = normalizeCoord(c);
    if (!p) continue;
    const tail = out[out.length - 1];
    if (tail && dist2d(tail, p) <= DUPLICATE_EPS) continue;
    out.push(p);
  }
  return out.length >= 2 ? out : null;
}

function bridgeCoords(from: LonLat, to: LonLat): LonLat[] {
  const d = dist2d(from, to);
  if (d <= DUPLICATE_EPS) return [];
  const steps = Math.max(2, Math.ceil(d / INTERPOLATE_STEP));
  const bridged: LonLat[] = [];
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    bridged.push([
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t,
    ]);
  }
  return bridged;
}

/**
 * Append `extra` onto `base`, inserting a straight connector when the two ends
 * are within `mergeEps`. Nothing is ever discarded: the previous version simply
 * dropped `extra` when the ends were further apart, silently deleting route.
 */
function appendPath(base: LonLat[], extra: LonLat[], mergeEps = MERGE_EPS): void {
  if (!extra.length) return;
  if (!base.length) {
    base.push(...extra);
    return;
  }
  const last = base[base.length - 1];
  const first = extra[0];
  const d = dist2d(last, first);
  if (d > DUPLICATE_EPS && d <= mergeEps) {
    base.push(...bridgeCoords(last, first));
  }
  for (const p of extra) {
    const tail = base[base.length - 1];
    if (!tail || dist2d(tail, p) > DUPLICATE_EPS) base.push(p);
  }
}

function dominantProps(a: Record<string, unknown>, b: Record<string, unknown>): Record<string, unknown> {
  const score = (p: Record<string, unknown>) => {
    const name = String(p['name'] ?? p['routeName'] ?? '').trim();
    return name.length;
  };
  return score(b) > score(a) ? { ...b } : { ...a };
}

function mergeTaggedSegments(segments: TaggedSegment[]): TaggedChain[] {
  const pool = segments
    .map((s) => ({ ...s, used: false }))
    .filter((s) => s.coords.length >= 2);

  const chains: TaggedChain[] = [];

  for (;;) {
    const seed = pool.find((s) => !s.used);
    if (!seed) break;
    seed.used = true;
    let chain = [...seed.coords];
    let props = { ...seed.props };
    let extended = true;

    while (extended) {
      extended = false;

      // Always take the CLOSEST candidate, not the first one inside the
      // tolerance. Taking the first attached a ~300 m connector even when an
      // exactly-touching fragment was sitting in the pool, which both invented
      // line length and pushed the real neighbour onto some other chain.
      let best: {
        seg: (typeof pool)[number];
        dist: number;
        /** true → the segment goes on the chain's head instead of its tail. */
        prepend: boolean;
        reverse: boolean;
      } | null = null;

      for (const seg of pool) {
        if (seg.used) continue;
        const start = seg.coords[0];
        const end = seg.coords[seg.coords.length - 1];
        const chainStart = chain[0];
        const chainEnd = chain[chain.length - 1];

        const options: Array<{ dist: number; prepend: boolean; reverse: boolean }> = [
          { dist: dist2d(chainEnd, start), prepend: false, reverse: false },
          { dist: dist2d(chainEnd, end), prepend: false, reverse: true },
          // Prepending puts the segment BEFORE the chain, so it is the
          // segment's last point that has to meet chainStart — forward when its
          // end matched, reversed when its start did. The old code had these
          // two the wrong way round, joining the chain to the segment's far end
          // and drawing a connector back across the segment.
          { dist: dist2d(chainStart, end), prepend: true, reverse: false },
          { dist: dist2d(chainStart, start), prepend: true, reverse: true },
        ];

        for (const opt of options) {
          if (opt.dist > MERGE_EPS) continue;
          if (best && opt.dist >= best.dist) continue;
          best = { seg, dist: opt.dist, prepend: opt.prepend, reverse: opt.reverse };
        }
      }

      if (best) {
        // `reverse` orients the segment so the matched endpoints meet.
        const coords = best.reverse ? [...best.seg.coords].reverse() : [...best.seg.coords];
        if (best.prepend) {
          appendPath(coords, chain);
          chain = coords;
        } else {
          appendPath(chain, coords);
        }
        best.seg.used = true;
        props = dominantProps(props, best.seg.props);
        extended = true;
      }
    }

    if (chain.length >= 2) {
      chains.push({ chain, props });
    }
  }

  return chains;
}

function bridgeDisconnectedChains(chains: TaggedChain[]): TaggedChain[] {
  const list = chains.map((c) => ({
    chain: [...c.chain],
    props: { ...c.props },
  }));

  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const A = list[i].chain;
        const B = list[j].chain;
        const pairs: [LonLat, LonLat, boolean, boolean][] = [
          [A[A.length - 1], B[0], false, false],
          [A[A.length - 1], B[B.length - 1], false, true],
          [A[0], B[0], true, false],
          [A[0], B[B.length - 1], true, true],
        ];
        let best = NETWORK_BRIDGE_EPS + 1;
        let bestP: { i: number; j: number; revA: boolean; revB: boolean } | null = null;
        for (const [a, b, revA, revB] of pairs) {
          const d = dist2d(a, b);
          if (d < best) {
            best = d;
            bestP = { i, j, revA, revB };
          }
        }
        if (best <= NETWORK_BRIDGE_EPS && bestP) {
          const nc = [...list[bestP.i].chain];
          const nb = [...list[bestP.j].chain];
          if (bestP.revA) nc.reverse();
          if (bestP.revB) nb.reverse();
          appendPath(nc, nb, NETWORK_BRIDGE_EPS);
          list[bestP.i] = {
            chain: nc,
            props: dominantProps(list[bestP.i].props, list[bestP.j].props),
          };
          list.splice(bestP.j, 1);
          merged = true;
          break outer;
        }
      }
    }
  }

  return list;
}

function pathsToGeometry(paths: LonLat[][]): GeoJSON.Geometry | null {
  const valid = paths.filter((p) => p.length >= 2);
  if (!valid.length) return null;
  if (valid.length === 1) {
    return { type: 'LineString', coordinates: valid[0] };
  }
  return { type: 'MultiLineString', coordinates: valid };
}

function collectTaggedSegments(fc: GeoJSON.FeatureCollection): TaggedSegment[] {
  const segments: TaggedSegment[] = [];

  for (const feature of fc.features) {
    if (!feature || feature.type !== 'Feature' || !feature.geometry) continue;
    const props = (feature.properties || {}) as Record<string, unknown>;
    const geometry = feature.geometry;

    if (geometry.type === 'LineString') {
      const line = normalizePath(geometry.coordinates as number[][]);
      if (line) segments.push({ coords: line, props });
    } else if (geometry.type === 'MultiLineString') {
      for (const part of geometry.coordinates as number[][][]) {
        const line = normalizePath(part);
        if (line) segments.push({ coords: line, props });
      }
    }
  }

  return segments;
}

function mergeSegmentPaths(paths: LonLat[][]): LonLat[][] {
  return mergeTaggedSegments(
    paths.map((coords) => ({ coords, props: {} }))
  ).map((c) => c.chain);
}

function pathsToFeatures(paths: LonLat[][], props: Record<string, unknown>): GeoJSON.Feature[] {
  const features: GeoJSON.Feature[] = [];
  for (const path of paths) {
    if (path.length < 2) continue;
    features.push({
      type: 'Feature',
      properties: { ...props },
      geometry: { type: 'LineString', coordinates: path },
    });
  }
  return features;
}

/**
 * Rebuild the full BPT rollout network from every route segment (all features),
 * then bridge nearby chain endpoints so coastal, interior, and branch paths connect.
 */
export function repairBptTelecomRouteFeatureCollection(
  fc: GeoJSON.FeatureCollection
): GeoJSON.FeatureCollection {
  const segments = collectTaggedSegments(fc);
  if (!segments.length) {
    return { type: 'FeatureCollection', features: [] };
  }

  const merged = mergeTaggedSegments(segments);
  const bridged = bridgeDisconnectedChains(merged);
  const features: GeoJSON.Feature[] = [];

  for (const { chain, props } of bridged) {
    features.push(...pathsToFeatures([chain], props));
  }

  return { type: 'FeatureCollection', features };
}

export function repairRouteGeometry(
  geometry: GeoJSON.Geometry | null | undefined
): GeoJSON.Geometry | null {
  if (!geometry || typeof geometry !== 'object') return null;

  const paths: LonLat[][] = [];

  if (geometry.type === 'LineString') {
    const line = normalizePath(geometry.coordinates as number[][]);
    if (line) paths.push(line);
  } else if (geometry.type === 'MultiLineString') {
    for (const part of geometry.coordinates as number[][][]) {
      const line = normalizePath(part);
      if (line) paths.push(line);
    }
  } else {
    return geometry;
  }

  if (!paths.length) return null;

  // Join touching fragments; any chain that cannot be joined stays its own path
  // and is still drawn, so the rendered length never falls below the source.
  return pathsToGeometry(mergeSegmentPaths(paths));
}

export function repairTelecomRouteFeatureCollection(
  fc: GeoJSON.FeatureCollection
): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = [];

  for (const feature of fc.features) {
    if (!feature || feature.type !== 'Feature') continue;
    const geometry = repairRouteGeometry(feature.geometry);
    if (!geometry) continue;
    features.push({
      type: 'Feature',
      properties: feature.properties ? { ...feature.properties } : {},
      geometry,
    });
  }

  return { type: 'FeatureCollection', features };
}

/** Merge fragmented BPT rollout polylines into a continuous Oman-wide telecom network. */
export function repairBptSplitLayers(split: SplitGeoJsonLayers): SplitGeoJsonLayers {
  return {
    ...split,
    routes: repairBptTelecomRouteFeatureCollection(split.routes),
  };
}
