import { Injectable } from '@angular/core';
import type * as GeoJSON from 'geojson';
import {
  countGeoJsonFeatures,
  filterGeoJsonForMap,
  sanitizeFeatureCollection,
  simplifyFeatureCollectionForDisplay,
  toLeafletGeoJsonObject,
} from '../map-geojson';
import {
  countSplitFeatures,
  filterSplitForMap,
  mergeSplitLayers,
  splitPmsGeoJsonPayload,
  type SplitGeoJsonLayers,
} from '../map/map-geojson-pipeline';

export type { SplitGeoJsonLayers };

@Injectable({ providedIn: 'root' })
export class GeojsonParserService {
  splitPayload(input: unknown): SplitGeoJsonLayers {
    return splitPmsGeoJsonPayload(input);
  }

  mergeLayers(base: SplitGeoJsonLayers, extra: SplitGeoJsonLayers): SplitGeoJsonLayers {
    return mergeSplitLayers(base, extra);
  }

  filterForMap(
    split: SplitGeoJsonLayers,
    ringSel: string,
    projectSel: string,
    stepSel = 'ALL',
    stepDisplayName?: string
  ): SplitGeoJsonLayers {
    return filterSplitForMap(split, ringSel, projectSel, stepSel, stepDisplayName);
  }

  countFeatures(split: SplitGeoJsonLayers) {
    return countSplitFeatures(split);
  }

  countRaw(data: unknown): number {
    return countGeoJsonFeatures(data);
  }

  toFeatureCollection(data: unknown): GeoJSON.FeatureCollection | null {
    const gj = toLeafletGeoJsonObject(data);
    if (!gj) return null;
    if (gj.type === 'FeatureCollection') {
      return simplifyFeatureCollectionForDisplay(sanitizeFeatureCollection(gj));
    }
    return simplifyFeatureCollectionForDisplay(
      sanitizeFeatureCollection({ type: 'FeatureCollection', features: [gj] })
    );
  }

  filterRaw(
    data: unknown,
    ringSel: string,
    projectSel: string,
    stepSel = 'ALL',
    stepDisplayName?: string
  ): GeoJSON.FeatureCollection | GeoJSON.Feature | null {
    return filterGeoJsonForMap(data, ringSel, projectSel, stepSel, stepDisplayName);
  }
}
