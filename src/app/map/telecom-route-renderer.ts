import type * as GeoJSON from 'geojson';

import Graphic from '@arcgis/core/Graphic.js';

import Polyline from '@arcgis/core/geometry/Polyline.js';

import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';

import PopupTemplate from '@arcgis/core/PopupTemplate.js';

import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol.js';

import { buildRoutePopupHtml } from './route-popup';


import { MAIN_ROUTE_STYLE } from './oman-map-config';

import type { GeoJsonLineStyle } from '../map-geojson';



export type TelecomLineEsriStyle = 'solid' | 'short-dash' | 'dash' | 'long-dash' | 'dot';



export type TelecomRouteStackLayer = {

  color: [number, number, number, number];

  width: number;

  style: TelecomLineEsriStyle;

};



export type TelecomRouteVisualMode = 'active' | 'completed' | 'planned' | 'backbone';

function hexRgb(hex: string, alpha = 1): [number, number, number, number] {

  let h = hex.replace('#', '').trim();

  if (h.length === 3) {

    h = h

      .split('')

      .map((c) => c + c)

      .join('');

  }

  const n = parseInt(h, 16);

  if (!Number.isFinite(n) || h.length < 6) {

    return [77, 163, 255, Math.round(255 * alpha)];

  }

  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, Math.round(255 * alpha)];

}



function dashToEsriStyle(dashArray?: string): TelecomLineEsriStyle {
  if (!dashArray || !dashArray.trim()) return 'solid';
  const parts = dashArray
    .split(/[\s,]+/)
    .map(Number)
    .filter((x) => Number.isFinite(x));
  if (parts.length < 2) return 'dash';
  const [dash, gap] = parts;
  if (dash <= 4 && gap >= 6) return 'short-dash';
  if (dash <= 3) return 'dot';
  if (dash + gap < 10) return 'short-dash';
  return 'dash';
}



function lineStyleToStackLayer(style: GeoJsonLineStyle): TelecomRouteStackLayer {

  const color = String(style.color || '#8d9aa6');

  return {

    color: hexRgb(color, style.opacity ?? 1),

    width: style.weight ?? 2,

    style: dashToEsriStyle(style.dashArray),

  };

}



/** All contractor routes render as active telecom rollout (red). */

export function telecomRouteVisualMode(_props: Record<string, unknown>): TelecomRouteVisualMode {

  return 'active';

}



function gisStyleForMode(_mode: TelecomRouteVisualMode): GeoJsonLineStyle {
  return MAIN_ROUTE_STYLE;
}



/** Single soft telecom line per route — no shadow or black outline stack. */

export function telecomRouteStackLayers(mode: TelecomRouteVisualMode): TelecomRouteStackLayer[] {
  return [lineStyleToStackLayer(gisStyleForMode(mode))];
}



function chaikinSmoothOnce(path: number[][]): number[][] {
  if (path.length < 3) return path;
  const out: number[][] = [path[0]];
  for (let i = 0; i < path.length - 1; i++) {
    const p0 = path[i];
    const p1 = path[i + 1];
    out.push([0.75 * p0[0] + 0.25 * p1[0], 0.75 * p0[1] + 0.25 * p1[1]]);
    out.push([0.25 * p0[0] + 0.75 * p1[0], 0.25 * p0[1] + 0.75 * p1[1]]);
  }
  const last = path[path.length - 1];
  const tail = out[out.length - 1];
  if (!tail || tail[0] !== last[0] || tail[1] !== last[1]) {
    out.push(last);
  }
  return out;
}

/** Light smoothing for telecom GIS lines (Leaflet smoothFactor analogue). */
export function smoothLonLatPath(path: number[][], smoothFactor = 1): number[][] {
  if (path.length < 3 || smoothFactor <= 1) {
    return path;
  }
  if (smoothFactor <= 2) {
    return chaikinSmoothOnce(path);
  }
  let out = path;
  const passes = Math.min(2, Math.floor(smoothFactor));
  for (let i = 0; i < passes; i++) {
    out = chaikinSmoothOnce(out);
  }
  return out;
}

function isFiniteCoordPair(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number' &&
    Number.isFinite(value[0]) &&
    Number.isFinite(value[1])
  );
}

function normalizeLinePath(coords: unknown): number[][] | null {
  if (!Array.isArray(coords)) return null;
  const out: number[][] = [];
  for (const raw of coords) {
    if (!isFiniteCoordPair(raw)) continue;
    const next = [raw[0], raw[1]];
    const tail = out[out.length - 1];
    if (tail && tail[0] === next[0] && tail[1] === next[1]) continue;
    out.push(next);
  }
  return out.length >= 2 ? out : null;
}

function collectLinePaths(coords: unknown): number[][][] {
  if (!Array.isArray(coords)) return [];
  const direct = normalizeLinePath(coords);
  if (direct) return [direct];
  const out: number[][][] = [];
  for (const child of coords) {
    out.push(...collectLinePaths(child));
  }
  return out;
}

export function extractLinePaths(geometry: GeoJSON.Geometry | null | undefined): number[][][] {

  if (!geometry) return [];

  if (geometry.type === 'LineString') {

    const coords = normalizeLinePath(geometry.coordinates);

    return coords ? [coords] : [];

  }

  if (geometry.type === 'MultiLineString') {

    return collectLinePaths(geometry.coordinates);

  }

  if (geometry.type === 'Polygon') {

    const rings = geometry.coordinates as number[][][];

    const outer = rings[0];

    return outer && outer.length >= 2 ? [outer] : [];

  }

  if (geometry.type === 'MultiPolygon') {

    const out: number[][][] = [];

    for (const poly of geometry.coordinates as number[][][][]) {

      const outer = poly[0];

      if (outer && outer.length >= 2) {

        out.push(outer);

      }

    }

    return out;

  }

  if (geometry.type === 'GeometryCollection') {

    const out: number[][][] = [];

    for (const child of geometry.geometries) {

      out.push(...extractLinePaths(child));

    }

    return out;

  }

  return [];

}

export function countRenderableLinePaths(fc: GeoJSON.FeatureCollection): {
  totalFeatures: number;
  renderedRoutes: number;
  missingRoutes: number;
  geometryErrors: number;
} {
  let renderedRoutes = 0;
  let missingRoutes = 0;
  let geometryErrors = 0;

  for (const feature of fc.features) {
    try {
      const paths = extractLinePaths(feature.geometry);
      renderedRoutes += paths.length;
      if (!paths.length) {
        missingRoutes++;
      }
    } catch {
      geometryErrors++;
      missingRoutes++;
    }
  }

  return {
    totalFeatures: fc.features.length,
    renderedRoutes,
    missingRoutes,
    geometryErrors,
  };
}



function telecomLineGraphic(

  pathLonLat: number[][],

  layer: TelecomRouteStackLayer,

  attributes?: Record<string, unknown>

): Graphic {

  const poly = new Polyline({

    paths: [pathLonLat],

    spatialReference: { wkid: 4326 },

  });

  const graphic = new Graphic({

    geometry: poly,

    symbol: new SimpleLineSymbol({

      color: layer.color,

      width: layer.width,

      style: layer.style,

      cap: 'round',

      join: 'round',

    }),

    attributes: attributes ?? {},

  });

  if (attributes && Object.keys(attributes).length) {

    graphic.popupTemplate = new PopupTemplate({

      title: '{name}',

      content: buildRoutePopupHtml,

      outFields: ['*'],

    });

  }

  return graphic;

}



const ROUTE_GRAPHIC_BATCH_SIZE = 200;

type RouteGraphicJob = () => void;

/** Populate a graphics layer with soft telecom fiber polylines (batched, non-blocking). */
export function populateTelecomRouteGraphics(
  layer: GraphicsLayer,
  fc: GeoJSON.FeatureCollection,
  viewZoom?: number
): Promise<void> {
  return populateTelecomRouteGraphicsBatched(layer, fc, viewZoom);
}

export function populateTelecomRouteGraphicsBatched(
  layer: GraphicsLayer,
  fc: GeoJSON.FeatureCollection,
  _viewZoom?: number
): Promise<void> {
  layer.removeAll();

  // Pre-compute all graphics in one pass to avoid per-frame overhead
  const graphics: Graphic[] = [];

  for (const feature of fc.features) {
    if (!feature.geometry) continue;

    const props = (feature.properties || {}) as Record<string, unknown>;
    const mode = telecomRouteVisualMode(props);
    const stackLayers = telecomRouteStackLayers(mode);
    const paths = extractLinePaths(feature.geometry);

    for (const path of paths) {
      for (const stackLayer of stackLayers) {
        graphics.push(telecomLineGraphic(path, stackLayer, props));
      }
    }
  }

  if (!graphics.length) {
    return Promise.resolve();
  }

  // For small sets, add all at once for instant render
  if (graphics.length <= ROUTE_GRAPHIC_BATCH_SIZE) {
    layer.addMany(graphics);
    return Promise.resolve();
  }

  // For large sets, batch with addMany for fewer redraws
  return new Promise((resolve) => {
    let index = 0;
    const runBatch = () => {
      const end = Math.min(index + ROUTE_GRAPHIC_BATCH_SIZE, graphics.length);
      const batch = graphics.slice(index, end);
      layer.addMany(batch);
      index = end;
      if (index < graphics.length) {
        requestAnimationFrame(runBatch);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(runBatch);
  });
}



export async function createTelecomRouteGraphicsLayer(
  fc: GeoJSON.FeatureCollection,
  title: string,
  viewZoom?: number
): Promise<GraphicsLayer | null> {
  if (!fc.features.length) return null;

  const layer = new GraphicsLayer({
    title,
    listMode: 'show',
  });

  await populateTelecomRouteGraphics(layer, fc, viewZoom);
  return layer.graphics.length ? layer : null;
}



export async function refreshTelecomRouteGraphicsLayer(
  layer: GraphicsLayer,
  fc: GeoJSON.FeatureCollection,
  viewZoom?: number
): Promise<void> {
  await populateTelecomRouteGraphics(layer, fc, viewZoom);
}


