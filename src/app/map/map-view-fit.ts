import type * as GeoJSON from 'geojson';
import Extent from '@arcgis/core/geometry/Extent.js';
import type MapView from '@arcgis/core/views/MapView.js';
import type Geometry from '@arcgis/core/geometry/Geometry.js';
import type Point from '@arcgis/core/geometry/Point.js';
import { extractLinePaths } from './telecom-route-renderer';
import { OMAN_CENTER, OMAN_DEFAULT_ZOOM, OMAN_EXTENT } from './oman-map-config';

/** ArcGIS equivalent of Leaflet fitBounds padding (px). */
export const GIS_MAP_FIT_PADDING_PX = 50;

/** Cap auto-fit zoom so contractor networks stay readable (Leaflet maxZoom: 9). */
export const GIS_MAP_FIT_MAX_ZOOM = 9;

/** Smooth camera transition (ms) — Leaflet duration: 0.8s. */
export const GIS_MAP_FIT_DURATION_MS = 800;

export type FitMapViewOptions = {
  paddingPx?: number;
  maxZoom?: number;
  durationMs?: number;
  animate?: boolean;
  expandFactor?: number;
};

export function extentFromFeatureCollection(
  fc: GeoJSON.FeatureCollection | null | undefined
): Extent | null {
  if (!fc?.features?.length) return null;

  let xmin = Infinity;
  let ymin = Infinity;
  let xmax = -Infinity;
  let ymax = -Infinity;

  for (const feature of fc.features) {
    const paths = extractLinePaths(feature.geometry);
    for (const path of paths) {
      for (const coord of path) {
        const lon = coord[0];
        const lat = coord[1];
        if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
        xmin = Math.min(xmin, lon);
        ymin = Math.min(ymin, lat);
        xmax = Math.max(xmax, lon);
        ymax = Math.max(ymax, lat);
      }
    }
  }

  if (!Number.isFinite(xmin) || xmax <= xmin || ymax <= ymin) {
    return null;
  }

  return new Extent({
    xmin,
    ymin,
    xmax,
    ymax,
    spatialReference: { wkid: 4326 },
  });
}

/**
 * Extent of a GraphicsLayer's contents. ArcGIS never fills `fullExtent` for a
 * GraphicsLayer, so it has to be derived from the graphics themselves.
 */
export function extentFromGraphicsLayer(
  layer: { graphics?: { toArray(): Array<{ geometry?: Geometry | null }> } } | null | undefined
): Extent | null {
  let combined: Extent | null = null;
  for (const graphic of layer?.graphics?.toArray() ?? []) {
    const geom = graphic.geometry;
    if (!geom) continue;
    let ext = geom.extent;
    if (!ext && geom.type === 'point') {
      const pt = geom as Point;
      ext = new Extent({
        xmin: pt.x,
        ymin: pt.y,
        xmax: pt.x,
        ymax: pt.y,
        spatialReference: pt.spatialReference,
      });
    }
    if (!ext) continue;
    combined = combined ? combined.union(ext) : ext.clone();
  }
  return isExtentValid(combined) ? combined : null;
}

function extentFromLayerGraphics(
  layer: { graphics?: { length: number }; fullExtent?: Extent | null; when?: () => Promise<void> }
): Promise<Extent | null> {
  return (async () => {
    if (layer.when) {
      await layer.when();
    }
    const fe = layer.fullExtent;
    if (fe && fe.width > 0 && fe.height > 0) {
      return fe;
    }
    return null;
  })();
}

export async function unionLayersExtent(
  layers: Array<{ when?: () => Promise<void>; fullExtent?: Extent | null }>
): Promise<Extent | null> {
  let combined: Extent | null = null;
  for (const layer of layers) {
    const fe = await extentFromLayerGraphics(layer);
    if (fe && fe.width > 0 && fe.height > 0) {
      combined = combined ? combined.union(fe) : fe;
    }
  }
  return combined;
}

export function isExtentValid(extent: Extent | null | undefined): boolean {
  return Boolean(
    extent &&
      Number.isFinite(extent.width) &&
      Number.isFinite(extent.height) &&
      extent.width > 0 &&
      extent.height > 0
  );
}

/**
 * Fit the MapView to operational layers with telecom-GIS padding and zoom limits.
 */
export async function fitMapViewToLayers(
  view: MapView,
  layers: Array<{ when?: () => Promise<void>; fullExtent?: Extent | null }>,
  routeExtent: Extent | null,
  options?: FitMapViewOptions
): Promise<boolean> {
  const paddingPx = options?.paddingPx ?? GIS_MAP_FIT_PADDING_PX;
  const maxZoom = options?.maxZoom ?? GIS_MAP_FIT_MAX_ZOOM;
  const durationMs = options?.durationMs ?? GIS_MAP_FIT_DURATION_MS;
  const animate = options?.animate !== false;
  const expandFactor = options?.expandFactor ?? 1.12;

  let target =
    (routeExtent && isExtentValid(routeExtent) ? routeExtent : null) ||
    (await unionLayersExtent(layers));

  if (!target || !isExtentValid(target)) {
    return false;
  }

  target = target.expand(expandFactor);

  const previousPadding = view.padding;
  view.padding = {
    top: paddingPx,
    bottom: paddingPx,
    left: paddingPx,
    right: paddingPx,
  };

  try {
    await view.goTo(
      {
        target,
        maxZoom,
      },
      {
        duration: animate ? durationMs : 0,
        easing: animate ? 'ease-in-out' : 'linear',
      }
    );
    return true;
  } catch {
    return false;
  } finally {
    view.padding = previousPadding;
  }
}

/** Default Sultanate view when no routes are on screen. */
export async function goToDefaultOmanView(
  view: MapView,
  options?: FitMapViewOptions
): Promise<void> {
  const durationMs = options?.durationMs ?? GIS_MAP_FIT_DURATION_MS;
  const animate = options?.animate !== false;
  try {
    await view.goTo(
      {
        center: [...OMAN_CENTER],
        zoom: OMAN_DEFAULT_ZOOM,
      },
      {
        duration: animate ? durationMs : 0,
        easing: 'ease-in-out',
      }
    );
  } catch {
    try {
      await view.goTo(OMAN_EXTENT.expand(1.08), {
        duration: animate ? durationMs : 0,
      });
    } catch {
      /* view destroyed */
    }
  }
}
