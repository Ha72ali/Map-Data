import { Injectable } from '@angular/core';

import type { MapGeoJsonRequestOptions } from '../dashboard.service';

import { MapDataService } from './map-data.service';



@Injectable({ providedIn: 'root' })

export class ContractorMapService {

  constructor(private readonly mapData: MapDataService) {}



  resolveApiContractorCode(contractorId: string, displayName?: string): string {

    return this.mapData.resolveApiContractorCode(contractorId, displayName);

  }



  buildQueryParams(opts: {

    contractorCode?: string;

    ringSel?: string;

    projectSel?: string;

  }): Record<string, string> | undefined {

    return this.mapData.buildQueryParams(opts);

  }



  fetchRoutes(

    contractorCode: string | undefined,

    query: Record<string, string> | undefined,

    options?: MapGeoJsonRequestOptions

  ): Promise<unknown> {

    return this.mapData.loadRoutes(contractorCode, query, options).then((r) => r.data);

  }



  fetchRouteElements(

    contractorCode: string | undefined,

    query: Record<string, string> | undefined,

    options?: MapGeoJsonRequestOptions

  ): Promise<unknown> {

    return this.mapData.loadRouteElements(contractorCode, query, options);

  }



  fetchMarkers(

    contractorCode: string | undefined,

    query: Record<string, string> | undefined,

    options?: MapGeoJsonRequestOptions

  ): Promise<unknown> {

    return this.mapData.loadMarkers(contractorCode, query, options);

  }



  preloadContractor(contractorCode: string | undefined): void {

    this.mapData.preloadContractor(contractorCode);

  }

}

