import {
  p
} from "./chunk-F3PKGTLV.js";
import {
  y
} from "./chunk-4QNJMPNJ.js";
import {
  _
} from "./chunk-BYMJUQYJ.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/geometry/geometryEngineAsync.js
function r(n) {
  return Array.isArray(n) ? n[0]?.spatialReference : n?.spatialReference;
}
function a(n) {
  return n ? Array.isArray(n) ? n.map(a) : n.toJSON ? n.toJSON() : n : n;
}
function i(n) {
  return Array.isArray(n) ? n.map((n2) => y(n2)) : y(n);
}
function o(n, t) {
  let e;
  return Array.isArray(n) ? e = n : (e = [], e.push(n), null != t && e.push(t)), e;
}
var c;
function u() {
  return __async(this, null, function* () {
    return c || (c = p("geometryEngineWorker", { strategy: "distributed" })), c;
  });
}
function s(n, t) {
  return __async(this, null, function* () {
    return (yield u()).invoke("executeGEOperation", { operation: n, parameters: a(t) });
  });
}
function f(n, t) {
  return __async(this, null, function* () {
    const e = yield u();
    return Promise.all(e.broadcast("executeGEOperation", { operation: n, parameters: a(t) }));
  });
}
function l(n) {
  return s("extendedSpatialReferenceInfo", [n]);
}
function y2(n, t) {
  return __async(this, null, function* () {
    return i(yield s("clip", [r(n), n, t]));
  });
}
function w(n, t) {
  return __async(this, null, function* () {
    return i(yield s("cut", [r(n), n, t]));
  });
}
function p2(n, t) {
  return s("contains", [r(n), n, t]);
}
function m(n, t) {
  return s("crosses", [r(n), n, t]);
}
function d(n, t, e) {
  return s("distance", [r(n), n, t, e]);
}
function g(n, t) {
  return s("equals", [r(n), n, t]);
}
function h(n, t) {
  return s("intersects", [r(n), n, t]);
}
function S(n, t) {
  return s("touches", [r(n), n, t]);
}
function x(n, t) {
  return s("within", [r(n), n, t]);
}
function A(n, t) {
  return s("disjoint", [r(n), n, t]);
}
function O(n, t) {
  return s("overlaps", [r(n), n, t]);
}
function R(n, t, e) {
  return s("relate", [r(n), n, t, e]);
}
function J(n) {
  return s("isSimple", [r(n), n]);
}
function N(n) {
  return __async(this, null, function* () {
    return i(yield s("simplify", [r(n), n]));
  });
}
function j(n, t = false) {
  return __async(this, null, function* () {
    return i(yield s("convexHull", [r(n), n, t]));
  });
}
function E(n, t) {
  return __async(this, null, function* () {
    return i(yield s("difference", [r(n), n, t]));
  });
}
function k(n, t) {
  return __async(this, null, function* () {
    return i(yield s("symmetricDifference", [r(n), n, t]));
  });
}
function D(n, t) {
  return __async(this, null, function* () {
    return i(yield s("intersect", [r(n), n, t]));
  });
}
function b(n, t = null) {
  return __async(this, null, function* () {
    const e = o(n, t);
    return i(yield s("union", [r(e), e]));
  });
}
function v(n, t, e, a2, o2, c2) {
  return __async(this, null, function* () {
    return i(yield s("offset", [r(n), n, t, e, a2, o2, c2]));
  });
}
function L(n, t, e, a2 = false) {
  return __async(this, null, function* () {
    const o2 = [r(n), n, t, e, a2];
    return i(yield s("buffer", o2));
  });
}
function P(n, t, e, a2, o2, c2) {
  return __async(this, null, function* () {
    const u2 = [r(n), n, t, e, a2, o2, c2];
    return i(yield s("geodesicBuffer", u2));
  });
}
function T(n, e, a2 = true) {
  return __async(this, null, function* () {
    const i2 = yield s("nearestCoordinate", [r(n), n, e, a2]);
    return __spreadProps(__spreadValues({}, i2), { coordinate: _.fromJSON(i2.coordinate) });
  });
}
function V(n, e) {
  return __async(this, null, function* () {
    const a2 = yield s("nearestVertex", [r(n), n, e]);
    return __spreadProps(__spreadValues({}, a2), { coordinate: _.fromJSON(a2.coordinate) });
  });
}
function z(n, e, a2, i2) {
  return __async(this, null, function* () {
    return (yield s("nearestVertices", [r(n), n, e, a2, i2])).map((n2) => __spreadProps(__spreadValues({}, n2), { coordinate: _.fromJSON(n2.coordinate) }));
  });
}
function G(n) {
  return "xmin" in n ? n.center : "x" in n ? n : n.extent?.center;
}
function H(n, t, e) {
  return __async(this, null, function* () {
    if (null == n)
      throw new Z();
    const r2 = n.spatialReference;
    if (null == (e = e ?? G(n)))
      throw new Z();
    const a2 = n.constructor.fromJSON(yield s("rotate", [r2, n, t, e]));
    return a2.spatialReference = r2, a2;
  });
}
function I(n, t) {
  return __async(this, null, function* () {
    if (null == n)
      throw new Z();
    const e = n.spatialReference;
    if (null == (t = t ?? G(n)))
      throw new Z();
    const r2 = n.constructor.fromJSON(yield s("flipHorizontal", [e, n, t]));
    return r2.spatialReference = e, r2;
  });
}
function q(n, t) {
  return __async(this, null, function* () {
    if (null == n)
      throw new Z();
    const e = n.spatialReference;
    if (null == (t = t ?? G(n)))
      throw new Z();
    const r2 = n.constructor.fromJSON(yield s("flipVertical", [e, n, t]));
    return r2.spatialReference = e, r2;
  });
}
function B(n, t, e, a2) {
  return __async(this, null, function* () {
    return i(yield s("generalize", [r(n), n, t, e, a2]));
  });
}
function C(n, t, e) {
  return __async(this, null, function* () {
    return i(yield s("densify", [r(n), n, t, e]));
  });
}
function U(n, t, e, a2 = 0) {
  return __async(this, null, function* () {
    return i(yield s("geodesicDensify", [r(n), n, t, e, a2]));
  });
}
function W(n, t) {
  return s("planarArea", [r(n), n, t]);
}
function F(n, t) {
  return s("planarLength", [r(n), n, t]);
}
function K(n, t, e) {
  return s("geodesicArea", [r(n), n, t, e]);
}
function M(n, t, e) {
  return s("geodesicLength", [r(n), n, t, e]);
}
function Q(n, t) {
  return __async(this, null, function* () {
    return i(yield s("intersectLinesToPoints", [r(n), n, t]));
  });
}
function X(n, t) {
  return __async(this, null, function* () {
    yield f("changeDefaultSpatialReferenceTolerance", [n, t]);
  });
}
function Y(n) {
  return __async(this, null, function* () {
    yield f("clearDefaultSpatialReferenceTolerance", [n]);
  });
}
var Z = class extends Error {
  constructor() {
    super("Illegal Argument Exception");
  }
};

export {
  l,
  y2 as y,
  w,
  p2 as p,
  m,
  d,
  g,
  h,
  S,
  x,
  A,
  O,
  R,
  J,
  N,
  j,
  E,
  k,
  D,
  b,
  v,
  L,
  P,
  T,
  V,
  z,
  H,
  I,
  q,
  B,
  C,
  U,
  W,
  F,
  K,
  M,
  Q,
  X,
  Y
};
//# sourceMappingURL=chunk-G7GA3CGH.js.map
