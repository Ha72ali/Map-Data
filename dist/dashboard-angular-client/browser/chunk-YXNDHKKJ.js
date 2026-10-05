import {
  r
} from "./chunk-RNP62TXS.js";
import {
  h
} from "./chunk-N4YXJULW.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
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
import "./chunk-6GPIXQSV.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/geometry/geometryEngine.js
function t(n) {
  return Array.isArray(n) ? n[0].spatialReference : n && n.spatialReference;
}
function r2(e) {
  return h.extendedSpatialReferenceInfo(e);
}
function u(r3, u2) {
  return h.clip(r, t(r3), r3, u2);
}
function i(r3, u2) {
  return h.cut(r, t(r3), r3, u2);
}
function c(r3, u2) {
  return h.contains(r, t(r3), r3, u2);
}
function o(r3, u2) {
  return h.crosses(r, t(r3), r3, u2);
}
function f(r3, u2, i2) {
  return h.distance(r, t(r3), r3, u2, i2);
}
function s(r3, u2) {
  return h.equals(r, t(r3), r3, u2);
}
function a(r3, u2) {
  return h.intersects(r, t(r3), r3, u2);
}
function l(r3, u2) {
  return h.touches(r, t(r3), r3, u2);
}
function p(r3, u2) {
  return h.within(r, t(r3), r3, u2);
}
function d(r3, u2) {
  return h.disjoint(r, t(r3), r3, u2);
}
function m(r3, u2) {
  return h.overlaps(r, t(r3), r3, u2);
}
function g(r3, u2, i2) {
  return h.relate(r, t(r3), r3, u2, i2);
}
function h2(r3) {
  return h.isSimple(r, t(r3), r3);
}
function w(r3) {
  return h.simplify(r, t(r3), r3);
}
function R(r3, u2 = false) {
  return h.convexHull(r, t(r3), r3, u2);
}
function x(r3, u2) {
  return h.difference(r, t(r3), r3, u2);
}
function y(r3, u2) {
  return h.symmetricDifference(r, t(r3), r3, u2);
}
function S(r3, u2) {
  return h.intersect(r, t(r3), r3, u2);
}
function A(r3, u2 = null) {
  return h.union(r, t(r3), r3, u2);
}
function D(r3, u2, i2, c2, o2, f2) {
  return h.offset(r, t(r3), r3, u2, i2, c2, o2, f2);
}
function j(r3, u2, i2, c2 = false) {
  return h.buffer(r, t(r3), r3, u2, i2, c2);
}
function E(r3, u2, i2, c2, o2, f2) {
  return h.geodesicBuffer(r, t(r3), r3, u2, i2, c2, o2, f2);
}
function J(r3, u2, i2 = true) {
  return h.nearestCoordinate(r, t(r3), r3, u2, i2);
}
function L(r3, u2) {
  return h.nearestVertex(r, t(r3), r3, u2);
}
function N(r3, u2, i2, c2) {
  return h.nearestVertices(r, t(r3), r3, u2, i2, c2);
}
function O(n) {
  return "xmin" in n ? "center" in n ? n.center : null : "x" in n ? n : "extent" in n ? n.extent?.center ?? null : null;
}
function T(e, t2, r3) {
  if (null == e)
    throw new F();
  const u2 = e.spatialReference;
  if (null == (r3 = r3 ?? O(e)))
    throw new F();
  const i2 = e.constructor.fromJSON(h.rotate(e, t2, r3));
  return i2.spatialReference = u2, i2;
}
function V(e, t2) {
  if (null == e)
    throw new F();
  const r3 = e.spatialReference;
  if (null == (t2 = t2 ?? O(e)))
    throw new F();
  const u2 = e.constructor.fromJSON(h.flipHorizontal(e, t2));
  return u2.spatialReference = r3, u2;
}
function v(e, t2) {
  if (null == e)
    throw new F();
  const r3 = e.spatialReference;
  if (null == (t2 = t2 ?? O(e)))
    throw new F();
  const u2 = e.constructor.fromJSON(h.flipVertical(e, t2));
  return u2.spatialReference = r3, u2;
}
function z(r3, u2, i2, c2) {
  return h.generalize(r, t(r3), r3, u2, i2, c2);
}
function B(r3, u2, i2) {
  return h.densify(r, t(r3), r3, u2, i2);
}
function H(r3, u2, i2, c2 = 0) {
  return h.geodesicDensify(r, t(r3), r3, u2, i2, c2);
}
function I(r3, u2) {
  return h.planarArea(r, t(r3), r3, u2);
}
function b(r3, u2) {
  return h.planarLength(r, t(r3), r3, u2);
}
function k(r3, u2, i2) {
  return h.geodesicArea(r, t(r3), r3, u2, i2);
}
function q(r3, u2, i2) {
  return h.geodesicLength(r, t(r3), r3, u2, i2);
}
function C(r3, u2) {
  return h.intersectLinesToPoints(r, t(r3), r3, u2);
}
function G(e, t2) {
  h.changeDefaultSpatialReferenceTolerance(e, t2);
}
function P(e) {
  h.clearDefaultSpatialReferenceTolerance(e);
}
var F = class extends Error {
  constructor() {
    super("Illegal Argument Exception");
  }
};
export {
  j as buffer,
  G as changeDefaultSpatialReferenceTolerance,
  P as clearDefaultSpatialReferenceTolerance,
  u as clip,
  c as contains,
  R as convexHull,
  o as crosses,
  i as cut,
  B as densify,
  x as difference,
  d as disjoint,
  f as distance,
  s as equals,
  r2 as extendedSpatialReferenceInfo,
  V as flipHorizontal,
  v as flipVertical,
  z as generalize,
  k as geodesicArea,
  E as geodesicBuffer,
  H as geodesicDensify,
  q as geodesicLength,
  S as intersect,
  C as intersectLinesToPoints,
  a as intersects,
  h2 as isSimple,
  J as nearestCoordinate,
  L as nearestVertex,
  N as nearestVertices,
  D as offset,
  m as overlaps,
  I as planarArea,
  b as planarLength,
  g as relate,
  T as rotate,
  w as simplify,
  y as symmetricDifference,
  l as touches,
  A as union,
  p as within
};
//# sourceMappingURL=chunk-YXNDHKKJ.js.map
