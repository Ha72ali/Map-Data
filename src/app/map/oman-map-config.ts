import Extent from '@arcgis/core/geometry/Extent.js';



import type { GeoJsonLineStyle } from '../map-geojson';







/** Sultanate of Oman — default map extent (WGS84). ArcGIS MapView: [longitude, latitude]. */



/** WGS84 [longitude, latitude] — default Oman overview. */
export const OMAN_CENTER: [number, number] = [57.7, 21.5];







export const OMAN_DEFAULT_ZOOM = 7;







/** Oman-focused extent — less surrounding UAE/Saudi empty margin. */



export const OMAN_EXTENT = new Extent({



  xmin: 52.15,



  ymin: 16.72,



  xmax: 59.92,



  ymax: 26.38,



  spatialReference: { wkid: 4326 },



});







export const OMAN_VIEW_CONSTRAINTS = {



  rotationEnabled: false,



  geometry: OMAN_EXTENT,



  minZoom: 6,



  maxZoom: 18,



} as const;







/** Operational region — soft mint green overlay (reference GIS). */



export const REGION_FILL_HEX = '#8db8af';



export const REGION_FILL_OPACITY = 0.42;



export const REGION_OUTLINE_HEX = '#dff7f1';



export const REGION_FILL_RGBA: [number, number, number, number] = [

  141,

  184,

  175,

  Math.round(255 * REGION_FILL_OPACITY),

];



export const REGION_OUTLINE_RGBA: [number, number, number, number] = [223, 247, 241, 255];



export const REGION_OUTLINE_WIDTH = 1.2;

/** Sultanate of Oman highlight polygon, WGS84 lon/lat. Includes mainland and Musandam. */
export const OMAN_COUNTRY_HIGHLIGHT_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Sultanate of Oman', featureType: 'region' },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [52.0, 19.0],
              [52.05, 17.95],
              [52.55, 16.72],
              [54.12, 16.95],
              [55.18, 17.18],
              [56.05, 17.74],
              [57.25, 18.86],
              [58.08, 20.16],
              [58.93, 21.48],
              [59.83, 22.62],
              [59.47, 23.24],
              [58.93, 23.78],
              [58.26, 24.03],
              [57.33, 23.98],
              [56.74, 24.23],
              [56.18, 24.82],
              [55.79, 24.24],
              [55.24, 23.71],
              [54.64, 22.83],
              [53.94, 21.84],
              [53.18, 20.86],
              [52.42, 19.86],
              [52.0, 19.0],
            ],
          ],
          [
            [
              [55.74, 25.63],
              [56.08, 25.58],
              [56.42, 25.83],
              [56.48, 26.22],
              [56.22, 26.38],
              [55.91, 26.08],
              [55.74, 25.63],
            ],
          ],
          [
            [
              [55.8, 24.98],
              [56.02, 24.95],
              [56.15, 25.13],
              [55.95, 25.28],
              [55.76, 25.18],
              [55.8, 24.98],
            ],
          ],
        ],
      },
    },
  ],
} as const;







/** Telecom GIS route line palette — map renders rollout red only. */



export const GIS_ROUTE_COLORS = {



  backbone: '#d85a6f',



  rollout: '#d85a6f',



  planned: '#d85a6f',



  completed: '#d85a6f',



} as const;



/** Primary contractor rollout polyline — medium red (telecom GIS). */
export const MAIN_ROUTE_STYLE: GeoJsonLineStyle = {
  color: '#d85a6f',
  weight: 5,
  opacity: 0.95,
  lineCap: 'round',
  lineJoin: 'round',
  smoothFactor: 1,
};

/** Prefer GPU/canvas-style vector rendering where the map runtime supports it. */
export const GIS_MAP_PREFER_CANVAS = true;

/** @deprecated Use MAIN_ROUTE_STYLE — kept for existing imports. */
export const TELECOM_ROLLOUT_LINE_STYLE: GeoJsonLineStyle = { ...MAIN_ROUTE_STYLE };







export type GisRouteLineClass = keyof typeof GIS_ROUTE_COLORS;







/** Per-class line weights, opacity, and dashes — shared by GeoJSON + graphics renderers. */



export const GIS_ROUTE_LINE_STYLES: Record<GisRouteLineClass, GeoJsonLineStyle> = {



  backbone: { ...MAIN_ROUTE_STYLE },

  rollout: { ...MAIN_ROUTE_STYLE },

  planned: { ...MAIN_ROUTE_STYLE },

  completed: { ...MAIN_ROUTE_STYLE },



};







/** Subtle telecom nodes — radius 4px, fill #f2a541, white outline (when points enabled). */



export const TELECOM_NODE_MARKER = {



  fillHex: '#f2a541',



  fillRgba: [242, 165, 65, 230] as [number, number, number, number],



  outlineRgba: [255, 255, 255, 255] as [number, number, number, number],



  size: 8,



  outlineWidth: 1,



  fillOpacity: 0.9,



};







/** When true, map renders polylines/polygons only — no point markers or clusters. */



export const TELECOM_GIS_LINES_ONLY = true;




