import { Injectable } from '@angular/core';
import { loadEsriRuntime, type EsriRuntime } from '../map-esri-loader';
import { clearMapGeoCache } from '../map-geo-cache';
import { ContractorMapService } from './contractor-map.service';
import { GeojsonParserService } from './geojson-parser.service';

/**
 * Facade for telecom GIS map: Esri runtime, contractor GeoJSON fetch, and parsing.
 * Map view lifecycle remains in `AppComponent` until fully migrated to `TelecomGisMapComponent`.
 */
@Injectable({ providedIn: 'root' })
export class MapService {
  constructor(
    private readonly contractorMap: ContractorMapService,
    private readonly geojsonParser: GeojsonParserService
  ) {}

  loadEsri(): Promise<EsriRuntime> {
    return loadEsriRuntime();
  }

  clearGeoCache(): void {
    clearMapGeoCache();
  }

  resolveContractorCode(contractorId: string, displayName: string): string {
    return this.contractorMap.resolveApiContractorCode(contractorId, displayName);
  }

  get contractorMapService(): ContractorMapService {
    return this.contractorMap;
  }

  get geojsonParserService(): GeojsonParserService {
    return this.geojsonParser;
  }
}
