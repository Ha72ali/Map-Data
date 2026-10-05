import ArcGISMap from '@arcgis/core/Map.js';
import ColorBackground from '@arcgis/core/webmap/background/ColorBackground.js';
import MapView from '@arcgis/core/views/MapView.js';
import Graphic from '@arcgis/core/Graphic.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import Point from '@arcgis/core/geometry/Point.js';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol.js';
import {
  createRolloutBasemap,
  mapViewBackgroundColorForBasemap,
  type RolloutBasemapId,
} from '../esri-basemap';
import { createSegmentGraphicsLayer, segmentPolylineGraphic } from '../esri-map-layers';

const MINI_MAP_BASEMAP: RolloutBasemapId = 'imagery-hybrid';

/** Same photo pin the old dashboard drops on a proof location. */
const PHOTO_MARKER_URL = 'assets/icons/photo_marker.png';
const LINE_COLOR: [number, number, number, number] = [249, 115, 22, 230];

/** The subset of a PhaseSegment a mini map needs. */
export interface MiniMapSegment {
  startLat?: number | null;
  startLon?: number | null;
  startLng?: number | null;
  endLat?: number | null;
  endLon?: number | null;
  endLng?: number | null;
}

/** Longitude from either spelling upstream uses (`Lon` / `Lng`). */
function lon(value: number | null | undefined, alt: number | null | undefined): number | null {
  const v = value ?? alt;
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

function lat(value: number | null | undefined): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/** True when the segment has enough geometry to draw. */
export function hasSegmentCoordinates(segment: MiniMapSegment | null | undefined): boolean {
  if (!segment) return false;
  return (
    lon(segment.startLon, segment.startLng) != null && lat(segment.startLat) != null
  );
}

/**
 * A live handle on a mini map, so the same view can be re-pointed at another
 * segment instead of being torn down and rebuilt for every image.
 */
export interface SegmentMiniMap {
  /** Re-draw for a different segment. No-op when it has no coordinates. */
  show(segment: MiniMapSegment): Promise<void>;
  destroy(): void;
}

/**
 * A small satellite map showing one segment: its polyline plus a pin at the
 * start (capture) point.
 *
 * Used by the Gallery's Detail panel to answer "where was this photo taken".
 * Deliberately minimal — no basemap toggle, no legend, no popups.
 */
export async function createSegmentMiniMap(
  host: HTMLElement,
  segment: MiniMapSegment
): Promise<SegmentMiniMap | null> {
  let map: ArcGISMap | null = null;
  let view: MapView | null = null;
  let layer: GraphicsLayer | null = null;

  try {
    map = new ArcGISMap({ basemap: createRolloutBasemap(MINI_MAP_BASEMAP) });
    layer = createSegmentGraphicsLayer('Segment location');
    map.add(layer);

    view = new MapView({
      container: host,
      map,
      zoom: 15,
      background: new ColorBackground({
        color: mapViewBackgroundColorForBasemap(MINI_MAP_BASEMAP),
      }),
      // A thumbnail map is context, not a tool: no scroll-hijack, no attribution
      // strip, no zoom widget competing with the panel's own controls.
      ui: { components: [] },
      navigation: { mouseWheelZoomEnabled: false, browserTouchPanEnabled: false },
      constraints: { rotationEnabled: false },
    } as any);

    await view.when();
  } catch (err) {
    console.warn('[segment-mini-map] init failed', err);
    view?.destroy();
    map?.destroy();
    return null;
  }

  const activeView = view;
  const activeLayer = layer;
  const activeMap = map;

  const handle: SegmentMiniMap = {
    async show(next: MiniMapSegment): Promise<void> {
      activeLayer.removeAll();

      const startLon = lon(next.startLon, next.startLng);
      const startLat = lat(next.startLat);
      if (startLon == null || startLat == null) return;

      const endLon = lon(next.endLon, next.endLng);
      const endLat = lat(next.endLat);

      if (endLon != null && endLat != null) {
        activeLayer.add(
          segmentPolylineGraphic(
            [
              [startLon, startLat],
              [endLon, endLat],
            ],
            LINE_COLOR,
            4
          )
        );
      }

      // Pin at the start point — that is where the proof photo was captured.
      activeLayer.add(
        new Graphic({
          geometry: new Point({ longitude: startLon, latitude: startLat, spatialReference: { wkid: 4326 } }),
          symbol: new PictureMarkerSymbol({
            url: PHOTO_MARKER_URL,
            width: 32,
            height: 32,
          }),
        })
      );

      // Centre on the segment's midpoint so both ends stay in frame.
      const centerLon = endLon != null ? (startLon + endLon) / 2 : startLon;
      const centerLat = endLat != null ? (startLat + endLat) / 2 : startLat;
      try {
        await activeView.goTo({ center: [centerLon, centerLat], zoom: 16 }, { duration: 250 });
      } catch {
        /* interrupted by another show() — the later one wins */
      }
    },

    destroy(): void {
      try { activeView.destroy(); } catch { /* already gone */ }
      try { activeMap.destroy(); } catch { /* already gone */ }
    },
  };

  await handle.show(segment);
  return handle;
}

/** Format a lat/lon pair the way the GIS view's segment details do. */
export function formatCoordinate(
  latitude: number | null | undefined,
  longitude: number | null | undefined
): string {
  if (typeof latitude !== 'number' || !Number.isFinite(latitude)) return '';
  if (typeof longitude !== 'number' || !Number.isFinite(longitude)) return '';
  const ns = latitude >= 0 ? 'N' : 'S';
  const ew = longitude >= 0 ? 'E' : 'W';
  return `${Math.abs(latitude).toFixed(4)}° ${ns}, ${Math.abs(longitude).toFixed(4)}° ${ew}`;
}
