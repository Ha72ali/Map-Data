import Basemap from '@arcgis/core/Basemap.js';
import Color from '@arcgis/core/Color.js';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer.js';

export type MapThemeMode = 'light' | 'dark';

/** User-selectable rollout map basemaps (tile layers only — routes stay on the map). */
export type RolloutBasemapId =
  | 'imagery'
  | 'imagery-hybrid'
  | 'topographic'
  | 'streets'
  | 'streets-relief'
  | 'streets-night'
  | 'navigation'
  | 'navigation-night'
  | 'light-gray'
  | 'dark-gray'
  | 'terrain-labels'
  | 'oceans'
  | 'community'
  | 'modern-antique'
  | 'nova'
  | 'outdoor'
  | 'osm'
  | 'gis'
  | 'dark'
  | 'light'
  | 'satellite'
  | 'terrain'
  | 'street';

export type RolloutBasemapOption = {
  id: RolloutBasemapId;
  label: string;
  hint: string;
};

export const ROLLOUT_BASEMAP_OPTIONS: RolloutBasemapOption[] = [
  { id: 'imagery', label: 'Imagery', hint: 'Esri imagery' },
  { id: 'imagery-hybrid', label: 'Imagery Hybrid', hint: 'Esri imagery + English labels' },
  { id: 'topographic', label: 'Topographic', hint: 'Esri topographic' },
  { id: 'streets', label: 'Streets', hint: 'Esri streets + bilingual labels' },
  { id: 'streets-relief', label: 'Streets (with Relief)', hint: 'Esri streets relief' },
  { id: 'streets-night', label: 'Streets (Night)', hint: 'Esri night streets' },
  { id: 'navigation', label: 'Navigation', hint: 'Esri navigation' },
  { id: 'navigation-night', label: 'Navigation (Night)', hint: 'Esri dark navigation' },
  { id: 'light-gray', label: 'Light Gray Canvas', hint: 'Esri light canvas' },
  { id: 'dark-gray', label: 'Dark Gray Canvas', hint: 'Esri dark canvas' },
  { id: 'terrain-labels', label: 'Terrain with Labels', hint: 'Terrain + English labels' },
  { id: 'oceans', label: 'Oceans', hint: 'Esri oceans' },
  { id: 'community', label: 'Community Map', hint: 'Esri community map' },
  { id: 'modern-antique', label: 'Modern Antique Map', hint: 'Esri modern antique' },
  { id: 'nova', label: 'Nova Map', hint: 'Esri nova' },
  { id: 'outdoor', label: 'Outdoor Map', hint: 'OpenTopo outdoor terrain' },
  { id: 'osm', label: 'OpenStreetMap Style', hint: 'OpenStreetMap Carto' },
];

type TileSpec = {
  urlTemplate: string;
  subDomains?: string[];
  copyright: string;
  title: string;
  id: string;
  /** Reference overlay strength (Arabic/local layer uses a lower opacity). */
  opacity?: number;
};

type BasemapLayerStack = {
  base: TileSpec;
  references?: TileSpec[];
};

const ESRI_COPYRIGHT =
  'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community';

const OSM_CARTO_COPYRIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const ESRI_IMAGERY: TileSpec = {
  urlTemplate:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{level}/{row}/{col}',
  copyright: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
  title: 'Esri World Imagery',
  id: 'rollout-esri-imagery',
};

const ESRI_LIGHT_GRAY_BASE: TileSpec = {
  urlTemplate:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{level}/{row}/{col}',
  copyright: ESRI_COPYRIGHT,
  title: 'Esri World Light Gray Canvas',
  id: 'rollout-esri-light-gray-base',
};

const ESRI_DARK_GRAY_BASE: TileSpec = {
  urlTemplate:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{level}/{row}/{col}',
  copyright: ESRI_COPYRIGHT,
  title: 'Esri World Dark Gray Canvas',
  id: 'rollout-esri-dark-gray-base',
};

/** English-primary place labels (for imagery / hybrid overlays). */
const ESRI_REFERENCE_LABELS_EN: TileSpec = {
  urlTemplate:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{level}/{row}/{col}',
  copyright:
    'Labels &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
  title: 'Esri World Boundaries and Places',
  id: 'rollout-esri-reference-labels-en',
};

/** English-primary labels tuned for light gray canvas. */
const ESRI_LIGHT_GRAY_REFERENCE_EN: TileSpec = {
  urlTemplate:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{level}/{row}/{col}',
  copyright: ESRI_COPYRIGHT,
  title: 'Esri World Light Gray Reference',
  id: 'rollout-esri-light-gray-reference-en',
};

/** English-primary labels tuned for dark gray canvas. */
const ESRI_DARK_GRAY_REFERENCE_EN: TileSpec = {
  urlTemplate:
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{level}/{row}/{col}',
  copyright: ESRI_COPYRIGHT,
  title: 'Esri World Dark Gray Reference',
  id: 'rollout-esri-dark-gray-reference-en',
};

/** OSM local script labels (Arabic in Oman/GCC) — softer under English Esri reference. */
const CARTO_LOCAL_LABELS_LIGHT: TileSpec = {
  urlTemplate:
    'https://{subDomain}.basemaps.cartocdn.com/light_only_labels/{level}/{col}/{row}.png',
  subDomains: ['a', 'b', 'c', 'd'],
  copyright: OSM_CARTO_COPYRIGHT,
  title: 'Carto Light Labels (local)',
  id: 'rollout-carto-light-labels-local',
  opacity: 0.56,
};

const CARTO_LOCAL_LABELS_DARK: TileSpec = {
  urlTemplate:
    'https://{subDomain}.basemaps.cartocdn.com/dark_only_labels/{level}/{col}/{row}.png',
  subDomains: ['a', 'b', 'c', 'd'],
  copyright: OSM_CARTO_COPYRIGHT,
  title: 'Carto Dark Labels (local)',
  id: 'rollout-carto-dark-labels-local',
  opacity: 0.52,
};

const CARTO_VOYAGER_BASE: TileSpec = {
  urlTemplate:
    'https://{subDomain}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{level}/{col}/{row}.png',
  subDomains: ['a', 'b', 'c', 'd'],
  copyright: OSM_CARTO_COPYRIGHT,
  title: 'Carto Voyager',
  id: 'rollout-carto-voyager-base',
};

const CARTO_VOYAGER_LABELS_LOCAL: TileSpec = {
  urlTemplate:
    'https://{subDomain}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{level}/{col}/{row}.png',
  subDomains: ['a', 'b', 'c', 'd'],
  copyright: OSM_CARTO_COPYRIGHT,
  title: 'Carto Voyager Labels (local)',
  id: 'rollout-carto-voyager-labels-local',
  opacity: 0.55,
};

const OPENTOPO_BASE: TileSpec = {
  urlTemplate: 'https://{subDomain}.tile.opentopomap.org/{level}/{col}/{row}.png',
  subDomains: ['a', 'b', 'c'],
  copyright:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; OpenTopoMap',
  title: 'OpenTopoMap',
  id: 'rollout-opentopo',
};

const OSM_STANDARD_BASE: TileSpec = {
  urlTemplate: 'https://{subDomain}.tile.openstreetmap.org/{level}/{col}/{row}.png',
  subDomains: ['a', 'b', 'c'],
  copyright: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  title: 'OpenStreetMap',
  id: 'rollout-osm-standard',
};

function esriTile(service: string, title: string, id: string): TileSpec {
  return {
    urlTemplate: `https://server.arcgisonline.com/ArcGIS/rest/services/${service}/MapServer/tile/{level}/{row}/{col}`,
    copyright: ESRI_COPYRIGHT,
    title,
    id,
  };
}

const ESRI_TOPOGRAPHIC = esriTile('World_Topo_Map', 'Esri World Topographic', 'rollout-esri-topographic');
const ESRI_STREETS = esriTile('World_Street_Map', 'Esri World Streets', 'rollout-esri-streets');
const ESRI_STREETS_RELIEF = esriTile('World_Street_Map', 'Esri Streets with Relief', 'rollout-esri-streets-relief');
const ESRI_RELIEF = esriTile('World_Shaded_Relief', 'Esri Shaded Relief', 'rollout-esri-shaded-relief');
const ESRI_NAVIGATION = esriTile('World_Navigation_Maps', 'Esri Navigation', 'rollout-esri-navigation');
const ESRI_OCEANS = esriTile('Ocean/World_Ocean_Base', 'Esri Oceans', 'rollout-esri-oceans');
const ESRI_OCEANS_REFERENCE = esriTile('Ocean/World_Ocean_Reference', 'Esri Ocean Reference', 'rollout-esri-oceans-reference');
const ESRI_COMMUNITY = esriTile('Canvas/World_Light_Gray_Base', 'Esri Community Map', 'rollout-esri-community');
const ESRI_MODERN_ANTIQUE = esriTile('Canvas/World_Light_Gray_Base', 'Esri Modern Antique Map', 'rollout-esri-modern-antique');
const ESRI_NOVA = esriTile('Canvas/World_Dark_Gray_Base', 'Esri Nova Map', 'rollout-esri-nova');

/** Bilingual stacks: local/Arabic labels under English Esri reference (Oman GIS style). */
const BASEMAP_STACKS: Record<RolloutBasemapId, BasemapLayerStack> = {
  imagery: {
    base: ESRI_IMAGERY,
    references: [],
  },
  'imagery-hybrid': {
    base: ESRI_IMAGERY,
    references: [ESRI_REFERENCE_LABELS_EN],
  },
  topographic: {
    base: ESRI_TOPOGRAPHIC,
    references: [CARTO_LOCAL_LABELS_LIGHT, ESRI_REFERENCE_LABELS_EN],
  },
  streets: {
    base: ESRI_STREETS,
    references: [CARTO_LOCAL_LABELS_LIGHT, ESRI_REFERENCE_LABELS_EN],
  },
  'streets-relief': {
    base: ESRI_RELIEF,
    references: [ESRI_STREETS, CARTO_LOCAL_LABELS_LIGHT, ESRI_REFERENCE_LABELS_EN],
  },
  'streets-night': {
    base: ESRI_DARK_GRAY_BASE,
    references: [CARTO_LOCAL_LABELS_DARK, ESRI_DARK_GRAY_REFERENCE_EN],
  },
  navigation: {
    base: ESRI_NAVIGATION,
    references: [CARTO_LOCAL_LABELS_LIGHT, ESRI_REFERENCE_LABELS_EN],
  },
  'navigation-night': {
    base: ESRI_DARK_GRAY_BASE,
    references: [CARTO_LOCAL_LABELS_DARK, ESRI_DARK_GRAY_REFERENCE_EN],
  },
  'light-gray': {
    base: ESRI_LIGHT_GRAY_BASE,
    references: [CARTO_LOCAL_LABELS_LIGHT, ESRI_LIGHT_GRAY_REFERENCE_EN],
  },
  'dark-gray': {
    base: ESRI_DARK_GRAY_BASE,
    references: [CARTO_LOCAL_LABELS_DARK, ESRI_DARK_GRAY_REFERENCE_EN],
  },
  'terrain-labels': {
    base: OPENTOPO_BASE,
    references: [{ ...ESRI_REFERENCE_LABELS_EN, opacity: 0.88 }],
  },
  oceans: {
    base: ESRI_OCEANS,
    references: [ESRI_OCEANS_REFERENCE, CARTO_LOCAL_LABELS_LIGHT],
  },
  community: {
    base: ESRI_COMMUNITY,
    references: [CARTO_LOCAL_LABELS_LIGHT, ESRI_LIGHT_GRAY_REFERENCE_EN],
  },
  'modern-antique': {
    base: ESRI_MODERN_ANTIQUE,
    references: [CARTO_LOCAL_LABELS_LIGHT, ESRI_LIGHT_GRAY_REFERENCE_EN],
  },
  nova: {
    base: ESRI_NOVA,
    references: [CARTO_LOCAL_LABELS_DARK, ESRI_DARK_GRAY_REFERENCE_EN],
  },
  outdoor: {
    base: OPENTOPO_BASE,
    references: [{ ...ESRI_REFERENCE_LABELS_EN, opacity: 0.88 }],
  },
  osm: {
    base: OSM_STANDARD_BASE,
    references: [CARTO_LOCAL_LABELS_LIGHT],
  },
  light: {
    base: ESRI_LIGHT_GRAY_BASE,
    references: [CARTO_LOCAL_LABELS_LIGHT, ESRI_LIGHT_GRAY_REFERENCE_EN],
  },
  dark: {
    base: ESRI_DARK_GRAY_BASE,
    references: [CARTO_LOCAL_LABELS_DARK, ESRI_DARK_GRAY_REFERENCE_EN],
  },
  street: {
    base: CARTO_VOYAGER_BASE,
    references: [CARTO_VOYAGER_LABELS_LOCAL, ESRI_REFERENCE_LABELS_EN],
  },
  satellite: {
    base: ESRI_IMAGERY,
    references: [ESRI_REFERENCE_LABELS_EN],
  },
  terrain: {
    base: OPENTOPO_BASE,
    references: [{ ...ESRI_REFERENCE_LABELS_EN, opacity: 0.88 }],
  },
  gis: {
    base: ESRI_IMAGERY,
    references: [ESRI_REFERENCE_LABELS_EN],
  },
};

function createWebTileLayer(spec: TileSpec): WebTileLayer {
  return new WebTileLayer({
    urlTemplate: spec.urlTemplate,
    subDomains: spec.subDomains,
    copyright: spec.copyright,
    opacity: spec.opacity ?? 1,
  });
}

function createStackedBasemap(stack: BasemapLayerStack, title: string, id: string): Basemap {
  return new Basemap({
    baseLayers: [createWebTileLayer(stack.base)],
    referenceLayers: (stack.references ?? []).map((spec) => createWebTileLayer(spec)),
    title,
    id,
  });
}

const BASEMAP_TITLES: Record<RolloutBasemapId, string> = {
  imagery: 'Imagery',
  'imagery-hybrid': 'Imagery Hybrid (English Labels)',
  topographic: 'Topographic',
  streets: 'Streets',
  'streets-relief': 'Streets with Relief',
  'streets-night': 'Streets Night',
  navigation: 'Navigation',
  'navigation-night': 'Navigation Night',
  'light-gray': 'Light Gray Canvas',
  'dark-gray': 'Dark Gray Canvas',
  'terrain-labels': 'Terrain with Labels',
  oceans: 'Oceans',
  community: 'Community Map',
  'modern-antique': 'Modern Antique Map',
  nova: 'Nova Map',
  outdoor: 'Outdoor Map',
  osm: 'OpenStreetMap Style',
  gis: 'Esri World Imagery (English Labels)',
  light: 'Esri World Light Gray (Bilingual)',
  dark: 'Esri World Dark Gray (Bilingual)',
  street: 'Carto Voyager (Bilingual)',
  satellite: 'Esri World Imagery (English Labels)',
  terrain: 'OpenTopoMap (English labels)',
};

const BASEMAP_IDS: Record<RolloutBasemapId, string> = {
  imagery: 'rollout-imagery',
  'imagery-hybrid': 'rollout-imagery-hybrid',
  topographic: 'rollout-topographic',
  streets: 'rollout-streets',
  'streets-relief': 'rollout-streets-relief',
  'streets-night': 'rollout-streets-night',
  navigation: 'rollout-navigation',
  'navigation-night': 'rollout-navigation-night',
  'light-gray': 'rollout-light-gray',
  'dark-gray': 'rollout-dark-gray',
  'terrain-labels': 'rollout-terrain-labels',
  oceans: 'rollout-oceans',
  community: 'rollout-community',
  'modern-antique': 'rollout-modern-antique',
  nova: 'rollout-nova',
  outdoor: 'rollout-outdoor',
  osm: 'rollout-osm',
  gis: 'rollout-esri-imagery-hybrid',
  light: 'rollout-esri-light-gray-bilingual',
  dark: 'rollout-esri-dark-gray-bilingual',
  street: 'rollout-carto-voyager-bilingual',
  satellite: 'rollout-esri-imagery-bilingual',
  terrain: 'rollout-opentopo-bilingual',
};

export function createRolloutBasemap(id: RolloutBasemapId): Basemap {
  return createStackedBasemap(BASEMAP_STACKS[id], BASEMAP_TITLES[id], BASEMAP_IDS[id]);
}

/** @deprecated Use createRolloutBasemap — kept for theme helpers. */
export function resolveRolloutBasemap(mode: MapThemeMode): Basemap {
  return createRolloutBasemap(mode === 'dark' ? 'dark' : 'light');
}

/** MapView background while tiles load (reduces gray flash). */
export function mapViewBackgroundColor(mode: MapThemeMode): Color {
  return mapViewBackgroundColorForBasemap(mode === 'dark' ? 'dark' : 'light');
}

export function mapViewBackgroundColorForBasemap(id: RolloutBasemapId): Color {
  switch (id) {
    case 'gis':
      return new Color([18, 22, 28, 1]);
    case 'light':
    case 'street':
      return new Color([214, 228, 236, 1]);
    case 'satellite':
      return new Color([18, 22, 28, 1]);
    case 'terrain':
      return new Color([236, 240, 236, 1]);
    case 'dark':
    default:
      return new Color([22, 26, 32, 1]);
  }
}
