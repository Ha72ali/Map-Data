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
  l
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
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/save/mediaLayerUtils.js
var i = "Media Layer";
var u = "media-layer-save";
var p2 = "media-layer-save-as";
var l2 = ["media-layer:unsupported-source"];
function m(e) {
  return { isValid: "media" === e.type, errorMessage: "Layer.type should be 'media'" };
}
function c(e) {
  return o(e, "portal-item", true);
}
function y(e) {
  return e.layerJSON;
}
function f2(e, r) {
  return __async(this, null, function* () {
    r.extent = e.fullExtent ? yield l(e.fullExtent) : null;
  });
}
function d(e, r) {
  return __async(this, null, function* () {
    r.title ||= e.title, yield f2(e, r), a(r, f.METADATA);
  });
}
function x(r, t) {
  return __async(this, null, function* () {
    return $({ layer: r, itemType: i, validateLayer: m, createJSONContext: (e) => c(e), createItemData: y, errorNamePrefix: u, supplementalUnsupportedErrors: l2, setItemProperties: f2, saveResources: (e, t2) => p(r.resourceReferences, t2) }, t);
  });
}
function v(e, t, a2) {
  return __async(this, null, function* () {
    return j({ layer: e, itemType: i, validateLayer: m, createJSONContext: (e2) => c(e2), createItemData: y, errorNamePrefix: p2, supplementalUnsupportedErrors: l2, newItem: t, setItemProperties: d, saveResources: (r, t2) => p(e.resourceReferences, t2) }, a2);
  });
}
export {
  x as save,
  v as saveAs
};
//# sourceMappingURL=chunk-WGD775KO.js.map
