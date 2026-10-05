import {
  d,
  e
} from "./chunk-G4RVQO5H.js";
import {
  t
} from "./chunk-K3PLWNHU.js";
import {
  a
} from "./chunk-FQNO6QFX.js";
import {
  V
} from "./chunk-ZDVJGW4C.js";
import {
  S
} from "./chunk-AZH5CNQI.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/portal/support/featureCollectionUtils.js
function e2(e3) {
  return t2(e3, "notes");
}
function r(e3) {
  return t2(e3, "markup");
}
function n(e3) {
  return t2(e3, "route");
}
function t2(e3, r2) {
  return !(!e3.layerType || "ArcGISFeatureLayer" !== e3.layerType) && e3.featureCollectionType === r2;
}

// node_modules/@arcgis/core/layers/support/layersCreator.js
function l(e3, r2, a2) {
  return __async(this, null, function* () {
    if (!r2)
      return;
    const t3 = r2.map((e4) => G(e4, a2)), y = yield Promise.allSettled(t3);
    for (const i of y)
      "rejected" === i.status || i.value && e3.add(i.value);
  });
}
var c = { ArcGISDimensionLayer: "DimensionLayer", ArcGISFeatureLayer: "FeatureLayer", ArcGISImageServiceLayer: "ImageryLayer", ArcGISMapServiceLayer: "MapImageLayer", ArcGISSceneServiceLayer: "SceneLayer", ArcGISTiledElevationServiceLayer: "ElevationLayer", ArcGISTiledImageServiceLayer: "ImageryTileLayer", ArcGISTiledMapServiceLayer: "TileLayer", BuildingSceneLayer: "BuildingSceneLayer", CatalogLayer: "CatalogLayer", CSV: "CSVLayer", DefaultTileLayer: "TileLayer", GeoJSON: "GeoJSONLayer", GroupLayer: "GroupLayer", IntegratedMesh3DTilesLayer: "IntegratedMesh3DTilesLayer", IntegratedMeshLayer: "IntegratedMeshLayer", KML: "KMLLayer", LineOfSightLayer: "LineOfSightLayer", MediaLayer: "MediaLayer", OGCFeatureLayer: "OGCFeatureLayer", PointCloudLayer: "PointCloudLayer", RasterDataLayer: "UnsupportedLayer", VectorTileLayer: "VectorTileLayer", Voxel: "VoxelLayer", WFS: "WFSLayer", WMS: "WMSLayer", WebTiledLayer: "WebTileLayer" };
var s = { ArcGISTiledElevationServiceLayer: "ElevationLayer", DefaultTileLayer: "ElevationLayer", RasterDataElevationLayer: "UnsupportedLayer" };
var p = { ArcGISFeatureLayer: "FeatureLayer" };
var S2 = { ArcGISImageServiceLayer: "UnsupportedLayer", ArcGISMapServiceLayer: "UnsupportedLayer", ArcGISSceneServiceLayer: "SceneLayer", ArcGISTiledImageServiceLayer: "ImageryTileLayer", ArcGISTiledMapServiceLayer: "TileLayer", DefaultTileLayer: "TileLayer", OpenStreetMap: "OpenStreetMapLayer", VectorTileLayer: "VectorTileLayer", WMS: "UnsupportedLayer", WebTiledLayer: "WebTileLayer" };
var u = { ArcGISAnnotationLayer: "UnsupportedLayer", ArcGISDimensionLayer: "UnsupportedLayer", ArcGISFeatureLayer: "FeatureLayer", ArcGISImageServiceLayer: "ImageryLayer", ArcGISImageServiceVectorLayer: "ImageryLayer", ArcGISMapServiceLayer: "MapImageLayer", ArcGISStreamLayer: "StreamLayer", ArcGISTiledImageServiceLayer: "ImageryTileLayer", ArcGISTiledMapServiceLayer: "TileLayer", BingMapsAerial: "BingMapsLayer", BingMapsHybrid: "BingMapsLayer", BingMapsRoad: "BingMapsLayer", CatalogLayer: "CatalogLayer", CSV: "CSVLayer", DefaultTileLayer: "TileLayer", GeoJSON: "GeoJSONLayer", GeoRSS: "GeoRSSLayer", GroupLayer: "GroupLayer", KML: "KMLLayer", KnowledgeGraphLayer: "KnowledgeGraphLayer", MediaLayer: "MediaLayer", OGCFeatureLayer: "OGCFeatureLayer", OrientedImageryLayer: "OrientedImageryLayer", SubtypeGroupLayer: "SubtypeGroupLayer", VectorTileLayer: "VectorTileLayer", WFS: "WFSLayer", WMS: "WMSLayer", WebTiledLayer: "WebTileLayer" };
var d2 = { ArcGISFeatureLayer: "FeatureLayer", SubtypeGroupTable: "UnsupportedLayer" };
var I = { ArcGISImageServiceLayer: "ImageryLayer", ArcGISImageServiceVectorLayer: "ImageryLayer", ArcGISMapServiceLayer: "MapImageLayer", ArcGISTiledImageServiceLayer: "ImageryTileLayer", ArcGISTiledMapServiceLayer: "TileLayer", BingMapsAerial: "BingMapsLayer", BingMapsHybrid: "BingMapsLayer", BingMapsRoad: "BingMapsLayer", DefaultTileLayer: "TileLayer", OpenStreetMap: "OpenStreetMapLayer", VectorTileLayer: "VectorTileLayer", WMS: "WMSLayer", WebTiledLayer: "WebTileLayer" };
var m = __spreadProps(__spreadValues({}, u), { LinkChartLayer: "LinkChartLayer" });
var g = __spreadValues({}, d2);
var T = __spreadValues({}, I);
function G(e3, r2) {
  return __async(this, null, function* () {
    return f(yield M(e3, r2), e3, r2);
  });
}
function f(e3, r2, a2) {
  return __async(this, null, function* () {
    const t3 = new e3();
    return t3.read(r2, a2.context), "group" === t3.type && ("GroupLayer" === r2.layerType ? yield w(t3, r2, a2) : b(r2) ? h(t3, r2, a2.context) : A(r2) && (yield C(t3, r2, a2.context))), yield t(t3, a2.context), t3;
  });
}
function M(e3, n2) {
  return __async(this, null, function* () {
    const l2 = n2.context, c2 = v(l2);
    let s2 = e3.layerType || e3.type;
    !s2 && n2?.defaultLayerType && (s2 = n2.defaultLayerType);
    const p2 = c2[s2];
    let S3 = p2 ? a[p2] : a.UnknownLayer;
    if (b(e3)) {
      const y = l2?.portal;
      if (e3.itemId) {
        const i = new S({ id: e3.itemId, portal: y });
        yield i.load();
        const L = (yield d(i, new e())).className || "UnknownLayer";
        S3 = a[L];
      }
    } else
      "ArcGISFeatureLayer" === s2 ? e2(e3) || r(e3) ? S3 = a.MapNotesLayer : n(e3) ? S3 = a.RouteLayer : A(e3) && (S3 = a.GroupLayer) : e3.wmtsInfo?.url && e3.wmtsInfo.layerIdentifier ? S3 = a.WMTSLayer : "WFS" === s2 && "2.0.0" !== e3.wfsInfo?.version && (S3 = a.UnsupportedLayer);
    return S3();
  });
}
function A(e3) {
  if ("ArcGISFeatureLayer" !== e3.layerType || b(e3))
    return false;
  return (e3.featureCollection?.layers?.length ?? 0) > 1;
}
function b(e3) {
  return "Feature Collection" === e3.type;
}
function v(e3) {
  let r2;
  switch (e3.origin) {
    case "web-scene":
      switch (e3.layerContainerType) {
        case "basemap":
          r2 = S2;
          break;
        case "ground":
          r2 = s;
          break;
        case "tables":
          r2 = p;
          break;
        default:
          r2 = c;
      }
      break;
    case "link-chart":
      switch (e3.layerContainerType) {
        case "basemap":
          r2 = T;
          break;
        case "tables":
          r2 = g;
          break;
        default:
          r2 = m;
      }
      break;
    default:
      switch (e3.layerContainerType) {
        case "basemap":
          r2 = I;
          break;
        case "tables":
          r2 = d2;
          break;
        default:
          r2 = u;
      }
  }
  return r2;
}
function w(r2, a2, t3) {
  return __async(this, null, function* () {
    const y = new V(), i = l(y, Array.isArray(a2.layers) ? a2.layers : [], t3);
    try {
      try {
        if (yield i, "group" === r2.type)
          return r2.layers.addMany(y), r2;
      } catch (L) {
        r2.destroy();
        for (const e3 of y)
          e3.destroy();
        throw L;
      }
    } catch (L) {
      throw L;
    }
  });
}
function h(e3, r2, a2) {
  r2.itemId && (e3.portalItem = new S({ id: r2.itemId, portal: a2?.portal }), e3.when(() => {
    const t3 = (t4) => {
      const y = t4.layerId;
      F(t4, e3, r2, y, a2);
      const i = r2.featureCollection?.layers?.[y];
      i && t4.read(i, a2);
    };
    e3.layers?.forEach(t3), e3.tables?.forEach(t3);
  }));
}
function C(e3, r2, t3) {
  return __async(this, null, function* () {
    const y = a.FeatureLayer, i = yield y(), L = r2.featureCollection, o = L?.showLegend, n2 = L?.layers?.map((a2, y2) => {
      const L2 = new i();
      L2.read(a2, t3);
      const n3 = __spreadProps(__spreadValues({}, t3), { ignoreDefaults: true });
      return F(L2, e3, r2, y2, n3), null != o && L2.read({ showLegend: o }, n3), L2;
    });
    e3.layers.addMany(n2 ?? []);
  });
}
function F(e3, r2, a2, t3, y) {
  e3.read({ id: `${r2.id}-sublayer-${t3}`, visibility: a2.visibleLayers?.includes(t3) ?? true }, y);
}

export {
  l,
  w
};
//# sourceMappingURL=chunk-MWG7X24Z.js.map
