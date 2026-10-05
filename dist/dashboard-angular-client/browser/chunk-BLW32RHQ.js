import {
  r
} from "./chunk-4HNNLGCG.js";

// node_modules/@arcgis/core/support/elevationInfoUtils.js
function o(e) {
  return e ? j2 : z;
}
function r2(e, n) {
  return n?.mode ? n.mode : o(e).mode;
}
function i(e, n) {
  return r2(null != e && e.hasZ, n);
}
function Z(e, n, t) {
  return t && t.mode !== n ? `${e} only support ${n} elevation mode` : null;
}
function P(e, n, t) {
  return t?.mode === n ? `${e} do not support ${n} elevation mode` : null;
}
function w(e, n) {
  return null != n?.featureExpressionInfo && "0" !== n.featureExpressionInfo.expression ? `${e} do not support featureExpressionInfo` : null;
}
function $(e, n) {
  n && e.warn(".elevationInfo=", n);
}
function R(e) {
  return (e?.offset ?? 0) * r(e?.unit);
}
var j2 = { mode: "absolute-height", offset: 0 };
var z = { mode: "on-the-ground", offset: null };

export {
  i,
  Z,
  P,
  w,
  $,
  R
};
//# sourceMappingURL=chunk-BLW32RHQ.js.map
