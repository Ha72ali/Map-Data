import {
  s as s2
} from "./chunk-YJTB6GCK.js";
import {
  i
} from "./chunk-HGBVGPJC.js";
import {
  t
} from "./chunk-MU5T2L2T.js";
import {
  a
} from "./chunk-FQNO6QFX.js";
import {
  s as s3
} from "./chunk-5EK2HSR2.js";
import {
  g
} from "./chunk-JJDQYKYN.js";
import {
  S
} from "./chunk-AZH5CNQI.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/LayerLoadContext.js
var e = class {
  constructor() {
    this._serviceMetadatas = /* @__PURE__ */ new Map(), this._itemDatas = /* @__PURE__ */ new Map();
  }
  fetchServiceMetadata(e2, a3) {
    return __async(this, null, function* () {
      const s5 = this._serviceMetadatas.get(e2);
      if (s5)
        return s5;
      const r = yield t(e2, a3);
      return this._serviceMetadatas.set(e2, r), r;
    });
  }
  fetchItemData(t3) {
    return __async(this, null, function* () {
      const { id: e2 } = t3;
      if (!e2)
        return null;
      const { _itemDatas: a3 } = this;
      if (a3.has(e2))
        return a3.get(e2);
      const s5 = yield t3.fetchData();
      return a3.set(e2, s5), s5;
    });
  }
  fetchCustomParameters(t3, e2) {
    return __async(this, null, function* () {
      const a3 = yield this.fetchItemData(t3);
      return a3 && "object" == typeof a3 && (e2 ? e2(a3) : a3.customParameters) || null;
    });
  }
};

// node_modules/@arcgis/core/portal/support/loadUtils.js
function t2(e2) {
  const t3 = { id: e2.id, name: e2.name }, a3 = i(e2.type);
  return "FeatureLayer" !== a3 && (t3.layerType = a3), t3;
}
function a2(e2, r, a3) {
  return __async(this, null, function* () {
    if (null == e2?.layers || null == e2?.tables) {
      const l2 = yield a3.fetchServiceMetadata(r, { customParameters: s4(e2)?.customParameters });
      (e2 = e2 || {}).layers = e2.layers || l2?.layers?.map(t2), e2.tables = e2.tables || l2?.tables?.map(t2);
    }
    return e2;
  });
}
function s4(e2) {
  if (!e2)
    return null;
  const { layers: r, tables: t3 } = e2;
  return r?.length ? r[0] : t3?.length ? t3[0] : null;
}
function l(e2, r) {
  if (null == r)
    return null;
  return [...e2.layers || [], ...e2.tables || []].find((e3) => e3.id === r);
}
function n(e2, r) {
  return [...e2.layers || [], ...e2.tables || []].filter(({ layerType: e3 }) => e3 ? e3 === r : "ArcGISFeatureLayer" === r);
}
function u(e2) {
  return (e2?.layers?.length ?? 0) + (e2?.tables?.length ?? 0);
}
function c(e2) {
  switch (e2) {
    case "catalog":
      return "CatalogLayer";
    case "feature":
      return "ArcGISFeatureLayer";
    case "oriented-imagery":
      return "OrientedImageryLayer";
    case "subtype-group":
      return "SubtypeGroupLayer";
  }
  return null;
}
function i2(e2) {
  switch (e2) {
    case "CatalogLayer":
      return "CatalogLayer";
    case "OrientedImageryLayer":
      return "OrientedImageryLayer";
    case "SubtypeGroupLayer":
      return "SubtypeGroupLayer";
  }
  return "FeatureLayer";
}
function o(r, a3, l2) {
  return __async(this, null, function* () {
    if (!r?.url)
      return a3 ?? {};
    if (a3 ??= {}, !a3.layers) {
      const e2 = yield l2.fetchServiceMetadata(r.url);
      a3.layers = e2.layers?.map(t2);
    }
    const { serverUrl: n2, portalItem: u2 } = yield s2(r.url, { sceneLayerItem: r, customParameters: s4(a3)?.customParameters }).catch(() => ({ serverUrl: null, portalItem: null }));
    if (null == n2)
      return a3.tables = [], a3;
    if (!a3.tables && u2) {
      const e2 = yield u2.fetchData();
      if (e2?.tables)
        a3.tables = e2.tables.map(t2);
      else {
        const r2 = yield l2.fetchServiceMetadata(n2, { customParameters: s4(e2)?.customParameters });
        a3.tables = r2?.tables?.map(t2);
      }
    }
    if (a3.tables)
      for (const e2 of a3.tables)
        e2.url = `${n2}/${e2.id}`;
    return a3;
  });
}

// node_modules/@arcgis/core/portal/support/portalLayers.js
function p(e2) {
  return __async(this, null, function* () {
    let { portalItem: a3 } = e2;
    !a3 || a3 instanceof S || (a3 = new S(a3));
    const r = yield L(a3);
    return new (0, r.constructor)(__spreadValues({ portalItem: a3 }, r.properties));
  });
}
function L(e2) {
  return __async(this, null, function* () {
    yield e2.load();
    const a3 = new e();
    return w(yield d(e2, a3));
  });
}
function d(a3, r) {
  return __async(this, null, function* () {
    switch (a3.type) {
      case "3DTiles Service":
        return j();
      case "CSV":
        return C();
      case "Feature Collection":
        return v(a3);
      case "Feature Service":
        return S2(a3, r);
      case "Feed":
        return U();
      case "GeoJson":
        return g2();
      case "Group Layer":
        return V();
      case "Image Service":
        return I(a3, r);
      case "KML":
        return G();
      case "Knowledge Graph Layer":
        return P();
      case "Map Service":
        return N(a3, r);
      case "Media Layer":
        return W();
      case "Scene Service":
        return h(a3, r);
      case "Stream Service":
        return M();
      case "Vector Tile Service":
        return T();
      case "WFS":
        return F();
      case "WMS":
        return b();
      case "WMTS":
        return K();
      default:
        throw new s("portal:unknown-item-type", "Unknown item type '${type}'", { type: a3.type });
    }
  });
}
function w(e2) {
  return __async(this, null, function* () {
    const a3 = e2.className, r = a[a3];
    return { constructor: yield r(), properties: e2.properties };
  });
}
function N(e2, a3) {
  return __async(this, null, function* () {
    return (yield D(e2, a3)) ? { className: "TileLayer" } : { className: "MapImageLayer" };
  });
}
function S2(e2, a3) {
  return __async(this, null, function* () {
    const r = yield J(e2, a3);
    if ("object" == typeof r) {
      const { sourceJSON: e3, className: a4 } = r, t3 = { sourceJSON: e3 };
      return null != r.id && (t3.layerId = r.id), { className: a4 || "FeatureLayer", properties: t3 };
    }
    return { className: "GroupLayer" };
  });
}
function h(e2, r) {
  return __async(this, null, function* () {
    const t3 = yield J(e2, r, () => __async(this, null, function* () {
      try {
        if (!e2.url)
          return [];
        const { serverUrl: t4 } = yield s2(e2.url, { sceneLayerItem: e2 }), s5 = yield r.fetchServiceMetadata(t4);
        return s5?.tables ?? [];
      } catch {
        return [];
      }
    }));
    if ("object" == typeof t3) {
      const a3 = {};
      let c2;
      if (null != t3.id ? (a3.layerId = t3.id, c2 = `${e2.url}/layers/${t3.id}`) : c2 = e2.url, e2.typeKeywords?.length) {
        for (const r2 of Object.keys(g))
          if (e2.typeKeywords.includes(r2))
            return { className: g[r2] };
      }
      const n2 = yield r.fetchServiceMetadata(c2, { customParameters: yield r.fetchCustomParameters(e2, (e3) => s4(e3)?.customParameters) });
      return { className: g[n2?.layerType] || "SceneLayer", properties: a3 };
    }
    if (false === t3) {
      const a3 = yield r.fetchServiceMetadata(e2.url);
      if ("Voxel" === a3?.layerType)
        return { className: "VoxelLayer" };
    }
    return { className: "GroupLayer" };
  });
}
function v(e2) {
  return __async(this, null, function* () {
    yield e2.load();
    const a3 = s3(e2, "Map Notes"), r = s3(e2, "Markup");
    if (a3 || r)
      return { className: "MapNotesLayer" };
    if (s3(e2, "Route Layer"))
      return { className: "RouteLayer" };
    const t3 = yield e2.fetchData();
    return 1 === u(t3) ? { className: "FeatureLayer" } : { className: "GroupLayer" };
  });
}
function I(e2, a3) {
  return __async(this, null, function* () {
    yield e2.load();
    const r = e2.typeKeywords?.map((e3) => e3.toLowerCase()) ?? [];
    if (r.includes("elevation 3d layer"))
      return { className: "ElevationLayer" };
    if (r.includes("tiled imagery"))
      return { className: "ImageryTileLayer" };
    const t3 = yield a3.fetchItemData(e2), s5 = t3?.layerType;
    if ("ArcGISTiledImageServiceLayer" === s5)
      return { className: "ImageryTileLayer" };
    if ("ArcGISImageServiceLayer" === s5)
      return { className: "ImageryLayer" };
    const c2 = yield a3.fetchServiceMetadata(e2.url, { customParameters: yield a3.fetchCustomParameters(e2) }), n2 = c2.cacheType?.toLowerCase(), o2 = c2.capabilities?.toLowerCase().includes("tilesonly");
    return "map" === n2 || o2 ? { className: "ImageryTileLayer" } : { className: "ImageryLayer" };
  });
}
function M() {
  return { className: "StreamLayer" };
}
function T() {
  return { className: "VectorTileLayer" };
}
function g2() {
  return { className: "GeoJSONLayer" };
}
function j() {
  return { className: "IntegratedMesh3DTilesLayer" };
}
function C() {
  return { className: "CSVLayer" };
}
function G() {
  return { className: "KMLLayer" };
}
function P() {
  return { className: "KnowledgeGraphLayer" };
}
function F() {
  return { className: "WFSLayer" };
}
function b() {
  return { className: "WMSLayer" };
}
function K() {
  return { className: "WMTSLayer" };
}
function U() {
  return { className: "StreamLayer" };
}
function V() {
  return { className: "GroupLayer" };
}
function W() {
  return { className: "MediaLayer" };
}
function D(e2, a3) {
  return __async(this, null, function* () {
    const { tileInfo: r } = yield a3.fetchServiceMetadata(e2.url, { customParameters: yield a3.fetchCustomParameters(e2) });
    return r;
  });
}
function J(e2, a3, t3) {
  return __async(this, null, function* () {
    const { url: s5, type: c2 } = e2, n2 = "Feature Service" === c2;
    if (!s5)
      return {};
    if (/\/\d+$/.test(s5)) {
      if (n2) {
        const t4 = yield a3.fetchServiceMetadata(s5, { customParameters: yield a3.fetchCustomParameters(e2, (e3) => s4(e3)?.customParameters) });
        return { id: t4.id, className: i(t4.type), sourceJSON: t4 };
      }
      return {};
    }
    yield e2.load();
    let f = yield a3.fetchItemData(e2);
    if (n2) {
      const e3 = yield a2(f, s5, a3), r = O(e3);
      if ("object" == typeof r) {
        const a4 = l(e3, r.id);
        r.className = i2(a4?.layerType);
      }
      return r;
    }
    "Scene Service" === c2 && (f = yield o(e2, f, a3));
    if (u(f) > 0)
      return O(f);
    const p2 = yield a3.fetchServiceMetadata(s5);
    return t3 && (p2.tables = yield t3()), O(p2);
  });
}
function O(e2) {
  return 1 === u(e2) && { id: s4(e2)?.id };
}

export {
  e,
  t2 as t,
  a2 as a,
  s4 as s,
  n,
  u,
  c,
  i2 as i,
  o,
  p,
  d
};
//# sourceMappingURL=chunk-G4RVQO5H.js.map
