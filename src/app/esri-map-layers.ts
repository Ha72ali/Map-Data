import type * as GeoJSON from 'geojson';
import Extent from '@arcgis/core/geometry/Extent.js';
import Graphic from '@arcgis/core/Graphic.js';
import Point from '@arcgis/core/geometry/Point.js';
import Polyline from '@arcgis/core/geometry/Polyline.js';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer.js';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol.js';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol.js';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol.js';
import TextSymbol from '@arcgis/core/symbols/TextSymbol.js';
import LabelClass from '@arcgis/core/layers/support/LabelClass.js';
import type MapView from '@arcgis/core/views/MapView.js';
import { REGION_FILL_RGBA, REGION_OUTLINE_RGBA, REGION_OUTLINE_WIDTH } from './map/oman-map-config';
import type { GeoJsonLineStyle } from './map-geojson';
import {
  getRouteElementPathStyle,
  styleGeoJsonLineFeature,
} from './map-geojson';
import {
  fitMapViewToLayers,
  goToDefaultOmanView,
  type FitMapViewOptions,
} from './map/map-view-fit';

function hexToRgba(hex: string, alpha = 1): [number, number, number, number] {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const n = parseInt(h, 16);
  if (!Number.isFinite(n) || h.length < 6) {
    return [37, 99, 235, Math.round(255 * alpha)];
  }
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return [r, g, b, Math.round(255 * alpha)];
}

function dashToEsriStyle(dashArray?: string): 'solid' | 'short-dash' | 'long-dash' | 'dot' | 'dash' {
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

export function lineStyleToEsriSymbol(style: GeoJsonLineStyle): SimpleLineSymbol {
  const color = hexToRgba(String(style.color || '#2563eb'), style.opacity ?? 1);
  const width = Math.max(0.5, style.weight ?? 3);
  const esriStyle = dashToEsriStyle(style.dashArray);
  return new SimpleLineSymbol({
    color,
    width,
    style: esriStyle,
    cap: 'round',
    join: 'round',
  });
}

function tagLineFeaturesForKind(fc: GeoJSON.FeatureCollection): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: fc.features.map((f: GeoJSON.Feature) => {
      const p = (f.properties || {}) as Record<string, unknown>;
      const ft = String(p['featureType'] || p['feature_type'] || '')
        .toLowerCase()
        .replace(/\s+/g, '');
      const kind = ft === 'routelement' || ft === 'route_element' ? 'element' : 'route';
      return {
        ...f,
        properties: { ...p, _lineKind: kind },
      };
    }),
  };
}

export function splitLinesAndPoints(fc: GeoJSON.FeatureCollection): {
  lines: GeoJSON.FeatureCollection;
  points: GeoJSON.FeatureCollection;
} {
  const lineFeats: GeoJSON.Feature[] = [];
  const pointFeats: GeoJSON.Feature[] = [];
  for (const f of fc.features) {
    const g = f.geometry;
    if (!g) continue;
    const t = g.type;
    if (t === 'Point' || t === 'MultiPoint') {
      pointFeats.push(f);
    } else if (
      t === 'LineString' ||
      t === 'MultiLineString' ||
      t === 'Polygon' ||
      t === 'MultiPolygon'
    ) {
      lineFeats.push(f);
    }
  }
  return {
    lines: { type: 'FeatureCollection', features: lineFeats },
    points: { type: 'FeatureCollection', features: pointFeats },
  };
}

function makeBlobUrl(geo: GeoJSON.FeatureCollection | GeoJSON.Feature): string {
  const blob = new Blob([JSON.stringify(geo)], { type: 'application/geo+json' });
  return URL.createObjectURL(blob);
}

const dummyLineFeature: GeoJSON.Feature = {
  type: 'Feature',
  properties: { featureType: 'route' },
  geometry: { type: 'LineString', coordinates: [] },
};

/** Line layer for route polylines (route vs routeElement). */
export function createMainLineGeoJsonLayer(
  fc: GeoJSON.FeatureCollection,
  title: string
): { layer: GeoJSONLayer; objectUrl: string } | null {
  if (!fc.features.length) return null;
  const tagged = tagLineFeaturesForKind(fc);
  const url = makeBlobUrl(tagged);
  const routeSym = lineStyleToEsriSymbol(styleGeoJsonLineFeature(dummyLineFeature));
  const elementDummy: GeoJSON.Feature = {
    type: 'Feature',
    properties: { featureType: 'routeElement', type: 'crossing' },
    geometry: { type: 'LineString', coordinates: [] },
  };
  const renderer = new UniqueValueRenderer({
    field: '_lineKind',
    defaultSymbol: routeSym,
    uniqueValueInfos: [
      { value: 'route', symbol: routeSym },
      {
        value: 'element',
        symbol: lineStyleToEsriSymbol(styleGeoJsonLineFeature(elementDummy)),
      },
    ],
  });
  const layer = new GeoJSONLayer({
    url,
    title,
    copyright: 'PMS',
    renderer,
    popupTemplate: new PopupTemplate({
      title: '{name}',
      outFields: ['*'],
    }),
  });
  return { layer, objectUrl: url };
}

/** Operational region polygons — soft teal fill, thin white borders. */
export function createRegionGeoJsonLayer(
  fc: GeoJSON.FeatureCollection
): { layer: GeoJSONLayer; objectUrl: string } | null {
  if (!fc.features.length) return null;
  const url = makeBlobUrl(fc);
  const layer = new GeoJSONLayer({
    url,
    title: 'Operational regions',
    copyright: 'PMS',
    opacity: 1,
    renderer: new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: REGION_FILL_RGBA,
        outline: new SimpleLineSymbol({
          color: REGION_OUTLINE_RGBA,
          width: REGION_OUTLINE_WIDTH,
          style: 'solid',
          cap: 'round',
          join: 'round',
        }),
      }),
    }),
    popupTemplate: new PopupTemplate({
      title: '{name}',
      outFields: ['*'],
    }),
  });
  return { layer, objectUrl: url };
}

/** Web-Mercator scale at zoom 15 — the level the old dashboard showed marker names from. */
const MARKER_LABEL_MIN_SCALE = 18_056;

export function createPointGeoJsonLayer(
  fc: GeoJSON.FeatureCollection,
  title: string,
  markerEndpointStyle: boolean
): { layer: GeoJSONLayer; objectUrl: string } | null {
  if (!fc.features.length) return null;
  const url = makeBlobUrl(fc);
  // Same marker as the old dashboard: a plain red dot, size 10 for endpoint
  // markers. (It drew `new SimpleMarkerSymbol({ color: '#ef4444', size: 10 })`.)
  const fill: [number, number, number, number] = markerEndpointStyle
    ? [239, 68, 68, 255]
    : [239, 68, 68, 210];
  const layer = new GeoJSONLayer({
    url,
    title,
    copyright: 'PMS',
    renderer: new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        style: 'circle',
        size: markerEndpointStyle ? 10 : 8,
        color: fill,
        outline: { color: [255, 255, 255, 235], width: 1 },
      }),
    }),
    // The old dashboard kept marker names in a separate graphics layer it
    // toggled at zoom >= 15; a label class with the equivalent scale does the
    // same thing without a second layer to keep in sync.
    labelsVisible: true,
    labelingInfo: [
      new LabelClass({
        labelExpressionInfo: { expression: '$feature.name' },
        minScale: MARKER_LABEL_MIN_SCALE,
        labelPlacement: 'above-center',
        symbol: new TextSymbol({
          color: [17, 17, 17, 255],
          haloColor: [255, 255, 255, 255],
          haloSize: 1.5,
          yoffset: 8,
          font: { size: 7, weight: 'normal' },
        }),
      }),
    ],
    popupTemplate: new PopupTemplate({
      title: '{name}',
      outFields: ['*'],
    }),
  });
  return { layer, objectUrl: url };
}

export function createRouteElementsGeoJsonLayer(
  fc: GeoJSON.FeatureCollection
): { layer: GeoJSONLayer; objectUrl: string } | null {
  if (!fc.features.length) return null;
  const url = makeBlobUrl(fc);
  const types = new Set<string>();
  for (const f of fc.features) {
    const p = (f.properties || {}) as Record<string, unknown>;
    const typ = p['type'] != null ? String(p['type']) : '';
    if (typ) types.add(typ);
  }
  const uniqueValueInfos = [...types].slice(0, 24).map((t) => ({
    value: t,
    symbol: lineStyleToEsriSymbol(getRouteElementPathStyle(t) as GeoJsonLineStyle),
  }));
  const renderer = new UniqueValueRenderer({
    field: 'type',
    defaultSymbol: lineStyleToEsriSymbol(getRouteElementPathStyle(undefined) as GeoJsonLineStyle),
    uniqueValueInfos,
  });
  const layer = new GeoJSONLayer({
    url,
    title: 'Route elements',
    copyright: 'PMS',
    renderer,
    popupTemplate: new PopupTemplate({ title: '{name}', outFields: ['*'] }),
  });
  return { layer, objectUrl: url };
}

export function createSegmentGraphicsLayer(title: string): GraphicsLayer {
  return new GraphicsLayer({ title, listMode: 'show' });
}

export function createOmanReferenceLabelsLayer(): GraphicsLayer {
  const layer = new GraphicsLayer({
    title: 'Oman telecom reference labels',
    listMode: 'hide',
  });
  const labels: Array<{ text: string; lon: number; lat: number; size?: number }> = [
    { text: 'Sohar', lon: 56.74, lat: 24.35 },
    { text: 'North Batinah', lon: 56.64, lat: 24.72 },
    { text: 'Southern Batinah', lon: 57.45, lat: 23.45 },
    { text: 'Muscat', lon: 58.41, lat: 23.59, size: 12 },
    { text: 'Nizwa', lon: 57.53, lat: 22.93 },
    { text: 'Burami', lon: 55.78, lat: 24.25 },
    { text: 'Interior', lon: 57.2, lat: 22.35 },
  ];

  for (const label of labels) {
    layer.add(
      new Graphic({
        geometry: new Point({
          longitude: label.lon,
          latitude: label.lat,
          spatialReference: { wkid: 4326 },
        }),
        symbol: new TextSymbol({
          text: label.text,
          color: [255, 255, 255, 235],
          haloColor: [16, 24, 32, 210],
          haloSize: 1.2,
          font: {
            size: label.size ?? 11,
            family: 'Arial',
            weight: 'bold',
          },
        }),
        attributes: { name: label.text },
      })
    );
  }

  return layer;
}

export function segmentPolylineGraphic(
  pathLonLat: number[][],
  color: [number, number, number, number],
  width: number,
  style: 'solid' | 'short-dash' | 'dash' = 'solid'
): Graphic {
  const poly = new Polyline({
    paths: [pathLonLat],
    spatialReference: { wkid: 4326 },
  });
  return new Graphic({
    geometry: poly,
    symbol: new SimpleLineSymbol({
      color,
      width,
      style,
      cap: 'round',
      join: 'round',
    }),
    attributes: {},
  });
}

/** @deprecated Prefer fitMapViewToLayers — kept for callers passing generic view handles. */
export async function goToLayersExtent(
  view: { goTo: (target: unknown, options?: unknown) => Promise<unknown> },
  layers: Array<{ when?: () => Promise<void>; fullExtent?: Extent | null }>,
  options?: FitMapViewOptions
): Promise<void> {
  const fitted = await fitMapViewToLayers(view as MapView, layers, null, options);
  if (!fitted) {
    await goToDefaultOmanView(view as MapView, options);
  }
}
