import {
  j
} from "./chunk-TPOHS65A.js";
import {
  f
} from "./chunk-GGRPX5QX.js";
import {
  l
} from "./chunk-GGG4K7D6.js";
import "./chunk-VKC2IPZH.js";
import "./chunk-B4YHNVRO.js";
import {
  t
} from "./chunk-XCPRP2KL.js";
import {
  b
} from "./chunk-6F52T6PY.js";
import {
  g,
  p,
  y as y3
} from "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f as f2
} from "./chunk-SIUD6VOA.js";
import "./chunk-ELMEXWR7.js";
import {
  n as n2
} from "./chunk-YTC5APIA.js";
import "./chunk-4AU4YV3O.js";
import "./chunk-QUJPV6JW.js";
import {
  S as S2,
  d,
  n2 as n,
  y as y2
} from "./chunk-FTWQYERS.js";
import "./chunk-UER5KWEB.js";
import "./chunk-5EK2HSR2.js";
import "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import "./chunk-5YCNWSDC.js";
import "./chunk-MACNJI7G.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-JJ2NMOGF.js";
import "./chunk-IIZACZCL.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-GPPG4D7S.js";
import "./chunk-V7FXKYLS.js";
import "./chunk-2AR2ZIQP.js";
import "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import {
  o,
  w
} from "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import {
  C
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  U,
  bt
} from "./chunk-IMLUWAKH.js";
import {
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  a as a2
} from "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import {
  s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/GeoRSSLayer.js
var G = ["atom", "xml"];
var P = { base: n, key: "type", typeMap: { "simple-line": d }, errorContext: "symbol" };
var R = { base: n, key: "type", typeMap: { "picture-marker": n2, "simple-marker": y2 }, errorContext: "symbol" };
var k = { base: n, key: "type", typeMap: { "simple-fill": S2 }, errorContext: "symbol" };
var _ = class extends l(f(b(j(t(S(f2)))))) {
  constructor(...e2) {
    super(...e2), this.description = null, this.fullExtent = null, this.legendEnabled = true, this.lineSymbol = null, this.pointSymbol = null, this.polygonSymbol = null, this.operationalLayerType = "GeoRSS", this.url = null, this.type = "geo-rss";
  }
  normalizeCtorArgs(e2, o2) {
    return "string" == typeof e2 ? __spreadValues({ url: e2 }, o2) : e2;
  }
  readFeatureCollections(e2, o2) {
    return o2.featureCollection.layers.forEach((e3) => {
      const o3 = e3.layerDefinition.drawingInfo.renderer.symbol;
      o3 && "esriSFS" === o3.type && o3.outline?.style.includes("esriSFS") && (o3.outline.style = "esriSLSSolid");
    }), o2.featureCollection.layers;
  }
  get hasPoints() {
    return this._hasGeometry("esriGeometryPoint");
  }
  get hasPolylines() {
    return this._hasGeometry("esriGeometryPolyline");
  }
  get hasPolygons() {
    return this._hasGeometry("esriGeometryPolygon");
  }
  get title() {
    const e2 = this._get("title");
    return e2 && "defaults" !== this.originOf("title") ? e2 : this.url ? bt(this.url, G) || "GeoRSS" : e2;
  }
  set title(e2) {
    this._set("title", e2);
  }
  load(e2) {
    const o2 = null != e2 ? e2.signal : null;
    return this.addResolvingPromise(this.loadFromPortal({ supportedTypes: ["Map Service", "Feature Service", "Feature Collection", "Scene Service"] }, e2).catch(a2).then(() => this._fetchService(o2)).then((e3) => {
      this.read(e3, { origin: "service" });
    })), Promise.resolve(this);
  }
  hasDataChanged() {
    return __async(this, null, function* () {
      const e2 = yield this._fetchService();
      return this.read(e2, { origin: "service", ignoreDefaults: true }), true;
    });
  }
  _fetchService(e2) {
    return __async(this, null, function* () {
      const t2 = this.spatialReference, { data: s2 } = yield U(s.geoRSSServiceUrl, { query: { url: this.url, refresh: !!this.loaded || void 0, outSR: C(t2) ? void 0 : t2.wkid ?? JSON.stringify(t2) }, signal: e2 });
      return s2;
    });
  }
  _hasGeometry(e2) {
    return this.featureCollections?.some((o2) => o2.featureSet?.geometryType === e2 && o2.featureSet.features?.length > 0) ?? false;
  }
};
e([y()], _.prototype, "description", void 0), e([y()], _.prototype, "featureCollections", void 0), e([o("service", "featureCollections", ["featureCollection.layers"])], _.prototype, "readFeatureCollections", null), e([y({ type: w, json: { name: "lookAtExtent" } })], _.prototype, "fullExtent", void 0), e([y(g)], _.prototype, "id", void 0), e([y(y3)], _.prototype, "legendEnabled", void 0), e([y({ types: P, json: { write: true } })], _.prototype, "lineSymbol", void 0), e([y({ type: ["show", "hide"] })], _.prototype, "listMode", void 0), e([y({ types: R, json: { write: true } })], _.prototype, "pointSymbol", void 0), e([y({ types: k, json: { write: true } })], _.prototype, "polygonSymbol", void 0), e([y({ type: ["GeoRSS"] })], _.prototype, "operationalLayerType", void 0), e([y(p)], _.prototype, "url", void 0), e([y({ json: { origins: { service: { read: { source: "name", reader: (e2) => e2 || void 0 } } } } })], _.prototype, "title", null), e([y({ readOnly: true, json: { read: false }, value: "geo-rss" })], _.prototype, "type", void 0), _ = e([a("esri.layers.GeoRSSLayer")], _);
var w2 = _;
export {
  w2 as default
};
//# sourceMappingURL=chunk-LJHTKVCG.js.map
