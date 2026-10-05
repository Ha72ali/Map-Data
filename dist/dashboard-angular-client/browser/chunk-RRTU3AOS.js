import {
  I,
  v,
  x
} from "./chunk-GB4LBHXK.js";
import {
  e as e4
} from "./chunk-7SWIYTU2.js";
import {
  e as e3
} from "./chunk-GV5YYV7L.js";
import {
  B,
  P,
  h as h2,
  j
} from "./chunk-IIZACZCL.js";
import {
  M,
  h
} from "./chunk-VNWT22OX.js";
import {
  e as e2,
  m,
  n,
  r,
  r2,
  s,
  t,
  y as y2
} from "./chunk-4TXVOEMW.js";
import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";

// node_modules/@arcgis/core/geometry/support/axisAngleDegrees.js
function b(r3 = C) {
  return [r3[0], r3[1], r3[2], r3[3]];
}
function q(r3, t2, n3 = b()) {
  return r2(y3(n3), r3), n3[3] = t2, n3;
}
function k(t2, i = b()) {
  const c = j(D, t2);
  return B2(i, M(v(i, c))), i;
}
function U(t2, n3, e5 = b()) {
  return I(D, y3(t2), A(t2)), I(E, y3(n3), A(n3)), x(D, E, D), B2(e5, M(v(y3(e5), D)));
}
function w2(r3, t2, n3, o = b()) {
  return q(s, r3, G), q(m, t2, H), q(y2, n3, I2), U(G, H, G), U(G, I2, o), o;
}
function y3(r3) {
  return r3;
}
function z2(r3) {
  return r3[3];
}
function A(r3) {
  return h(r3[3]);
}
function B2(r3, t2) {
  return r3[3] = t2, r3;
}
var C = [0, 0, 1, 0];
var D = e4();
var E = e4();
var F = b();
var G = b();
var H = b();
var I2 = b();

// node_modules/@arcgis/core/geometry/support/MeshTransform.js
var y4;
var A2 = y4 = class extends f {
  constructor(t2) {
    super(t2), this.translation = n(), this.rotationAxis = e2(C), this.rotationAngle = 0, this.scale = r(1, 1, 1);
  }
  get rotation() {
    return q(this.rotationAxis, this.rotationAngle);
  }
  set rotation(t2) {
    this.rotationAxis = t(y3(t2)), this.rotationAngle = z2(t2);
  }
  get localMatrix() {
    const t2 = e3();
    return I(d, y3(this.rotation), A(this.rotation)), P(t2, d, this.translation, this.scale), t2;
  }
  get localMatrixInverse() {
    return h2(e3(), this.localMatrix);
  }
  equals(t2) {
    return this === t2 || null != t2 && B(this.localMatrix, t2.localMatrix);
  }
  clone() {
    const t2 = { translation: t(this.translation), rotationAxis: t(this.rotationAxis), rotationAngle: this.rotationAngle, scale: t(this.scale) };
    return new y4(t2);
  }
};
e([y({ type: [Number], nonNullable: true, json: { write: true } })], A2.prototype, "translation", void 0), e([y({ type: [Number], nonNullable: true, json: { write: true } })], A2.prototype, "rotationAxis", void 0), e([y({ type: Number, nonNullable: true, json: { write: true } })], A2.prototype, "rotationAngle", void 0), e([y({ type: [Number], nonNullable: true, json: { write: true } })], A2.prototype, "scale", void 0), e([y()], A2.prototype, "rotation", null), e([y()], A2.prototype, "localMatrix", null), e([y()], A2.prototype, "localMatrixInverse", null), A2 = y4 = e([a("esri.geometry.support.MeshTransform")], A2);
var d = e4();
var N = A2;

export {
  b,
  k,
  w2 as w,
  y3 as y,
  A,
  N
};
//# sourceMappingURL=chunk-RRTU3AOS.js.map
