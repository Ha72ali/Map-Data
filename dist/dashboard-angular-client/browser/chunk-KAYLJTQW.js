import {
  F
} from "./chunk-VNWT22OX.js";
import {
  W2 as W,
  o
} from "./chunk-U4IA2IP4.js";

// node_modules/@arcgis/core/geometry/support/scaleUtils.js
var r = 96;
function i(t, i2) {
  const o3 = i2 || t.extent, u = t.width, c = W(o3?.spatialReference);
  return o3 && u ? o3.width / u * c * o * r : 0;
}
function o2(t, i2) {
  return t / (W(i2) * o * r);
}
function f(t, n) {
  const e = t.extent, r2 = t.width - (t.padding ? t.padding.left + t.padding.right : 0), i2 = o2(n, e.spatialReference);
  return e.clone().expand(i2 * r2 / e.width);
}
function d(t, n, e) {
  return a(t, n) && p(t, e);
}
function a(n, e) {
  return 0 === e || F(n, e) || n < e;
}
function p(n, e) {
  return 0 === e || F(n, e) || n > e;
}

export {
  i,
  o2 as o,
  f,
  d
};
//# sourceMappingURL=chunk-KAYLJTQW.js.map
