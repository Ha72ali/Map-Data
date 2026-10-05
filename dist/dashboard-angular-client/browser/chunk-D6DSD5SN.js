import {
  s as s2
} from "./chunk-YJTB6GCK.js";
import {
  i,
  t as t2
} from "./chunk-HGBVGPJC.js";
import {
  t
} from "./chunk-MU5T2L2T.js";
import {
  a
} from "./chunk-FQNO6QFX.js";
import {
  d,
  h
} from "./chunk-LRQVNXVW.js";
import {
  g
} from "./chunk-JJDQYKYN.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  I,
  bt
} from "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/arcgisLayers.js
var y = { FeatureLayer: true, SceneLayer: true };
function f(e) {
  return __async(this, null, function* () {
    const { properties: r, url: a2 } = e, t3 = __spreadProps(__spreadValues({}, r), { url: a2 }), s3 = yield w(a2, r?.customParameters), { Constructor: l, layerId: o, sourceJSON: n, parsedUrl: c, layers: i2, tables: u } = s3;
    if (i2.length + u.length === 0)
      return null != o && (t3.layerId = o), null != n && (t3.sourceJSON = n), new l(t3);
    const y2 = new (0, (yield import("./chunk-MT5762OX.js")).default)({ title: c.title });
    return yield d2(y2, s3, t3), y2;
  });
}
function p(e, r) {
  return e ? e.find(({ id: e2 }) => e2 === r) : null;
}
function m(e, r, a2, t3, s3) {
  const l = __spreadProps(__spreadValues({}, s3), { layerId: r });
  return null != e && (l.url = e), null != a2 && (l.sourceJSON = a2), "sublayerTitleMode" in t3.prototype && (l.sublayerTitleMode = "service-name"), new t3(l);
}
function d2(e, r, a2) {
  return __async(this, null, function* () {
    const t3 = r.sublayerConstructorProvider;
    for (const { id: s3, serverUrl: l } of r.layers) {
      const o = p(r.sublayerInfos, s3), n = m(l, s3, o, (o && t3?.(o)) ?? r.Constructor, a2);
      e.add(n);
    }
    if (r.tables.length) {
      const t4 = yield I2("FeatureLayer");
      r.tables.forEach(({ id: s3, serverUrl: l }) => {
        const o = m(l, s3, p(r.tableInfos, s3), t4, a2);
        e.tables.add(o);
      });
    }
  });
}
function w(r, a2) {
  return __async(this, null, function* () {
    let s3 = d(r);
    if (null == s3 && (s3 = yield v(r, a2)), null == s3)
      throw new s("arcgis-layers:url-mismatch", "The url '${url}' is not a valid arcgis resource", { url: r });
    const { serverType: l, sublayer: n } = s3;
    let i2;
    const f2 = { FeatureServer: "FeatureLayer", KnowledgeGraphServer: "KnowledgeGraphLayer", StreamServer: "StreamLayer", VectorTileServer: "VectorTileLayer", VideoServer: "VideoLayer" }, p2 = "FeatureServer" === l, m2 = "SceneServer" === l, d3 = { parsedUrl: s3, Constructor: null, layerId: p2 || m2 ? n ?? void 0 : void 0, layers: [], tables: [] };
    switch (l) {
      case "MapServer":
        if (null != n) {
          const { type: t3 } = yield t(r, { customParameters: a2 });
          switch (i2 = "FeatureLayer", t3) {
            case "Catalog Layer":
              i2 = "CatalogLayer";
              break;
            case "Catalog Dynamic Group Layer":
              throw new s("arcgis-layers:unsupported", `fromUrl() not supported for "${t3}" layers`);
          }
        } else {
          i2 = (yield L(r, a2)) ? "TileLayer" : "MapImageLayer";
        }
        break;
      case "ImageServer": {
        const e = yield t(r, { customParameters: a2 }), { tileInfo: t3, cacheType: s4 } = e;
        i2 = t3 ? "LERC" !== t3?.format?.toUpperCase() || s4 && "elevation" !== s4.toLowerCase() ? "ImageryTileLayer" : "ElevationLayer" : "ImageryLayer";
        break;
      }
      case "SceneServer": {
        const e = yield t(s3.url.path, { customParameters: a2 });
        if (i2 = "SceneLayer", e) {
          const r2 = e?.layers;
          if ("Voxel" === e?.layerType)
            i2 = "VoxelLayer";
          else if (r2?.length) {
            const e2 = r2[0]?.layerType;
            null != e2 && null != g[e2] && (i2 = g[e2]);
          }
        }
        break;
      }
      case "3DTilesServer":
        throw new s("arcgis-layers:unsupported", "fromUrl() not supported for 3DTiles layers");
      case "FeatureServer":
        if (i2 = "FeatureLayer", null != n) {
          const e = yield t(r, { customParameters: a2 });
          d3.sourceJSON = e, i2 = i(e.type);
        }
        break;
      default:
        i2 = f2[l];
    }
    if (y[i2] && null == n) {
      const e = yield b(r, l, a2);
      p2 && (d3.sublayerInfos = e.layerInfos, d3.tableInfos = e.tableInfos);
      if (1 !== e.layers.length + e.tables.length)
        d3.layers = e.layers, d3.tables = e.tables, p2 && e.layerInfos?.length && (d3.sublayerConstructorProvider = yield g2(e.layerInfos));
      else if (p2 || m2) {
        const r2 = e.layerInfos?.[0] ?? e.tableInfos?.[0];
        if (d3.layerId = e.layers[0]?.id ?? e.tables[0]?.id, d3.sourceJSON = r2, p2) {
          const e2 = r2?.type;
          i2 = i(e2);
        }
      }
    }
    return d3.Constructor = yield I2(i2), d3;
  });
}
function v(e, t3) {
  return __async(this, null, function* () {
    const l = yield t(e, { customParameters: t3 });
    let o = null, n = null;
    const c = l.type;
    if ("Feature Layer" === c || "Table" === c ? (o = "FeatureServer", n = l.id ?? null) : "indexedVector" === c ? o = "VectorTileServer" : l.hasOwnProperty("mapName") ? o = "MapServer" : l.hasOwnProperty("bandCount") && l.hasOwnProperty("pixelSizeX") ? o = "ImageServer" : l.hasOwnProperty("maxRecordCount") && l.hasOwnProperty("allowGeometryUpdates") ? o = "FeatureServer" : l.hasOwnProperty("streamUrls") ? o = "StreamServer" : S(l) ? (o = "SceneServer", n = l.id) : l.hasOwnProperty("layers") && S(l.layers?.[0]) && (o = "SceneServer"), !o)
      return null;
    const i2 = null != n ? h(e) : null;
    return { title: null != i2 && l.name || bt(e), serverType: o, sublayer: n, url: { path: null != i2 ? i2.serviceUrl : I(e).path } };
  });
}
function S(e) {
  return null != e && e.hasOwnProperty("store") && e.hasOwnProperty("id") && "number" == typeof e.id;
}
function b(e, r, a2) {
  return __async(this, null, function* () {
    let t3, s3, l = false;
    switch (r) {
      case "FeatureServer": {
        const r2 = yield t2(e, { customParameters: a2 });
        l = !!r2.layersJSON, t3 = r2.layersJSON || r2.serviceJSON;
        break;
      }
      case "SceneServer": {
        const r2 = yield h2(e, a2);
        t3 = r2.serviceInfo, s3 = r2.tableServerUrl;
        break;
      }
      default:
        t3 = yield t(e, { customParameters: a2 });
    }
    const o = t3?.layers, c = t3?.tables;
    return { layers: o?.map((e2) => ({ id: e2.id })).reverse() || [], tables: c?.map((e2) => ({ serverUrl: s3, id: e2.id })).reverse() || [], layerInfos: l ? o : [], tableInfos: l ? c : [] };
  });
}
function h2(e, r) {
  return __async(this, null, function* () {
    const a2 = yield t(e, { customParameters: r }), t3 = a2.layers?.[0];
    if (!t3)
      return { serviceInfo: a2 };
    try {
      const { serverUrl: t4 } = yield s2(e), s3 = yield t(t4, { customParameters: r }).catch(() => null);
      return s3 && (a2.tables = s3.tables), { serviceInfo: a2, tableServerUrl: t4 };
    } catch {
      return { serviceInfo: a2 };
    }
  });
}
function I2(e) {
  return __async(this, null, function* () {
    return (0, a[e])();
  });
}
function L(e, r) {
  return __async(this, null, function* () {
    return (yield t(e, { customParameters: r })).tileInfo;
  });
}
function g2(e) {
  return __async(this, null, function* () {
    if (!e.length)
      return;
    const r = /* @__PURE__ */ new Set(), a2 = [];
    for (const { type: l } of e)
      r.has(l) || (r.add(l), a2.push(I2(i(l))));
    const t3 = yield Promise.all(a2), s3 = /* @__PURE__ */ new Map();
    return Array.from(r).forEach((e2, r2) => {
      s3.set(e2, t3[r2]);
    }), (e2) => s3.get(e2.type);
  });
}
export {
  f as fromUrl
};
//# sourceMappingURL=chunk-D6DSD5SN.js.map
