import { environment } from '../environments/environment';

export type EsriRuntime = {
  ArcGISMap: typeof import('@arcgis/core/Map.js').default;
  MapView: typeof import('@arcgis/core/views/MapView.js').default;
  reactiveUtils: typeof import('@arcgis/core/core/reactiveUtils.js');
  GraphicsLayer: typeof import('@arcgis/core/layers/GraphicsLayer.js').default;
  layers: typeof import('./esri-map-layers');
};

let runtimePromise: Promise<EsriRuntime> | null = null;

/** Load ArcGIS JS API and map layer helpers once (Rollout Map tab only). */
export function loadEsriRuntime(): Promise<EsriRuntime> {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      const [configMod, mapMod, viewMod, reactiveUtils, graphicsMod, layers] = await Promise.all([
        import('@arcgis/core/config.js'),
        import('@arcgis/core/Map.js'),
        import('@arcgis/core/views/MapView.js'),
        import('@arcgis/core/core/reactiveUtils.js'),
        import('@arcgis/core/layers/GraphicsLayer.js'),
        import('./esri-map-layers'),
      ]);

      const esriConfig = configMod.default;
      esriConfig.assetsPath = './assets/arcgis';
      if (environment.arcgisApiKey) {
        esriConfig.apiKey = environment.arcgisApiKey;
      }

      return {
        ArcGISMap: mapMod.default,
        MapView: viewMod.default,
        reactiveUtils,
        GraphicsLayer: graphicsMod.default,
        layers,
      };
    })();
  }
  return runtimePromise;
}
