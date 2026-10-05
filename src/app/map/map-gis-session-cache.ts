import { Injectable } from '@angular/core';
import type * as GeoJSON from 'geojson';
import Extent from '@arcgis/core/geometry/Extent.js';
import {
  filterSplitForMap,
  splitPmsGeoJsonPayload,
  type SplitGeoJsonLayers,
} from './map-geojson-pipeline';
import { extentFromFeatureCollection } from './map-view-fit';

type FilteredCacheEntry = {
  ringSel: string;
  projectSel: string;
  stepSel: string;
  split: SplitGeoJsonLayers;
  extent: Extent | null;
};

type ContractorRoutesEntry = {
  raw: unknown;
  split: SplitGeoJsonLayers;
  extent: Extent | null;
  filtered: Map<string, FilteredCacheEntry>;
};

@Injectable({ providedIn: 'root' })
export class MapGisSessionCache {
  private readonly byContractor = new Map<string, ContractorRoutesEntry>();
  private allRoutes: ContractorRoutesEntry | null = null;

  private static filterKey(ringSel: string, projectSel: string, stepSel: string): string {
    return `${ringSel || 'ALL'}|${projectSel || 'ALL'}|${stepSel || 'ALL'}`;
  }

  getFilteredSplit(
    contractorKey: string,
    ringSel: string,
    projectSel: string,
    stepSel = 'ALL',
    stepDisplayName?: string
  ): { split: SplitGeoJsonLayers; extent: Extent | null; fromCache: boolean } | null {
    const entry = this.getEntry(contractorKey);
    if (!entry) return null;

    const fKey = MapGisSessionCache.filterKey(ringSel, projectSel, stepSel);
    const hit = entry.filtered.get(fKey);
    if (hit) {
      return { split: hit.split, extent: hit.extent, fromCache: true };
    }

    const split = filterSplitForMap(
      entry.split,
      ringSel,
      projectSel,
      stepSel,
      stepDisplayName
    );
    const extent = extentFromFeatureCollection(split.routes);
    entry.filtered.set(fKey, { ringSel, projectSel, stepSel, split, extent });
    return { split, extent, fromCache: false };
  }

  rememberRaw(contractorKey: string, raw: unknown): void {
    const key = contractorKey.trim() || '__ALL__';
    const entry = this.buildEntry(raw);
    if (key === '__ALL__') {
      this.allRoutes = entry;
      return;
    }
    this.byContractor.set(key, entry);
  }

  preloadContractorKeys(keys: string[]): void {
    for (const key of keys) {
      if (!this.byContractor.has(key)) {
        /* entry created on first load */
      }
    }
  }

  clear(): void {
    this.byContractor.clear();
    this.allRoutes = null;
  }

  private getEntry(contractorKey: string): ContractorRoutesEntry | null {
    const key = contractorKey.trim() || '__ALL__';
    return key === '__ALL__' ? this.allRoutes : this.byContractor.get(key) ?? null;
  }

  private buildEntry(raw: unknown): ContractorRoutesEntry {
    const split = splitPmsGeoJsonPayload(raw);
    const extent = extentFromFeatureCollection(split.routes);
    return {
      raw,
      split,
      extent,
      filtered: new Map(),
    };
  }
}
