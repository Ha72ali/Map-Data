import {
  $,
  j
} from "./chunk-62NZPB4L.js";
import "./chunk-R4ADXNFU.js";
import "./chunk-A3K4AQEC.js";
import "./chunk-5NJ3TZEU.js";
import "./chunk-6MWDYJDX.js";
import "./chunk-WBMLBIXY.js";
import {
  a,
  f,
  i,
  l
} from "./chunk-5EK2HSR2.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-BZEDVIAT.js";
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
import "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/save/streamLayerUtils.js
var n = "Stream Service";
var i2 = "Feed";
var o = "stream-layer-save";
var m = "stream-layer-save-as";
function u(e) {
  return { isValid: "stream" === e.type && !!e.url && !e.webSocketUrl, errorMessage: "Stream layer should be created using a url to a stream service" };
}
function c(e) {
  const t = e.layerJSON;
  return Promise.resolve(t && Object.keys(t).length ? t : null);
}
function y(e, t) {
  return __async(this, null, function* () {
    const { parsedUrl: n2, title: i3, fullExtent: o2 } = e;
    t.url = n2.path, t.title ||= i3, t.extent = null, null != o2 && (t.extent = yield l(o2)), a(t, f.METADATA), i(t, f.SINGLE_LAYER);
  });
}
function p(t, r) {
  return __async(this, null, function* () {
    return $({ layer: t, itemType: n, additionalItemType: i2, validateLayer: u, createItemData: c, errorNamePrefix: o }, r);
  });
}
function f2(e, r, a2) {
  return __async(this, null, function* () {
    return j({ layer: e, itemType: n, validateLayer: u, createItemData: c, errorNamePrefix: m, newItem: r, setItemProperties: y }, a2);
  });
}
export {
  p as save,
  f2 as saveAs
};
//# sourceMappingURL=chunk-E4HFLGJW.js.map
