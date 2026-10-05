import {
  p
} from "./chunk-FWQUNSRV.js";
import {
  $,
  j
} from "./chunk-62NZPB4L.js";
import "./chunk-R4ADXNFU.js";
import "./chunk-A3K4AQEC.js";
import "./chunk-5NJ3TZEU.js";
import "./chunk-6MWDYJDX.js";
import {
  o
} from "./chunk-WBMLBIXY.js";
import "./chunk-RVXZGPCS.js";
import {
  a,
  f,
  i,
  s
} from "./chunk-5EK2HSR2.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-YTRR4X7U.js";
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
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/save/groupLayerUtils.js
var u = "Group Layer";
var c = "group-layer-save";
var l = "group-layer-save-as";
var p2 = f.GROUP_LAYER_MAP;
function m(e) {
  return { isValid: "group" === e.type, errorMessage: "Layer.type should be 'group'" };
}
function y(e) {
  return { isValid: s(e, p2), errorMessage: `Layer.portalItem.typeKeywords should have '${p2}'` };
}
function f2(e, r) {
  return __spreadProps(__spreadValues({}, o(e, "web-map", true)), { initiator: r });
}
function v(e) {
  const r = e.layerJSON;
  return Promise.resolve(r && Object.keys(r).length ? r : null);
}
function d(e, r) {
  return __async(this, null, function* () {
    r.title ||= e.title, a(r, f.METADATA), i(r, p2);
  });
}
function I(r, t) {
  return __async(this, null, function* () {
    return $({ layer: r, itemType: u, validateLayer: m, validateItem: y, createJSONContext: (e) => f2(e, r), createItemData: v, errorNamePrefix: c, saveResources: (e, t2) => __async(this, null, function* () {
      return r.sourceIsPortalItem || (yield e.removeAllResources().catch(() => {
      })), p(r.resourceReferences, t2);
    }) }, t);
  });
}
function g(e, t, o2) {
  return __async(this, null, function* () {
    return j({ layer: e, itemType: u, validateLayer: m, createJSONContext: (r) => f2(r, e), createItemData: v, errorNamePrefix: l, newItem: t, setItemProperties: d, saveResources: (r, t2) => p(e.resourceReferences, t2) }, o2);
  });
}
export {
  I as save,
  g as saveAs
};
//# sourceMappingURL=chunk-TPFXGMNB.js.map
