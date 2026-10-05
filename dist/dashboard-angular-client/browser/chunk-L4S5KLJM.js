import {
  j as j3,
  m as m3,
  p as p4
} from "./chunk-B3ITZTUH.js";
import "./chunk-FPKS5DXI.js";
import {
  p as p3
} from "./chunk-O2HF7YHC.js";
import {
  A
} from "./chunk-3ZFOQBU7.js";
import {
  o as o4
} from "./chunk-AFSLSJNC.js";
import "./chunk-IY2B24OB.js";
import {
  e as e3,
  t as t2
} from "./chunk-WDDSREVG.js";
import {
  j as j2
} from "./chunk-TPOHS65A.js";
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
import "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f as f3
} from "./chunk-SIUD6VOA.js";
import {
  p as p2
} from "./chunk-7BBDZSYX.js";
import {
  i
} from "./chunk-ELMEXWR7.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-5EK2HSR2.js";
import "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import {
  l as l2
} from "./chunk-5YCNWSDC.js";
import "./chunk-YGERZ2ZN.js";
import "./chunk-QSREVAFL.js";
import {
  n as n6,
  r as r2
} from "./chunk-EFPJQTVN.js";
import {
  s as s5
} from "./chunk-GKEPJ7SJ.js";
import {
  K,
  N,
  V as V3
} from "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import {
  I,
  _ as _2,
  o as o5
} from "./chunk-PUJBM626.js";
import {
  n as n4
} from "./chunk-YTRR4X7U.js";
import {
  d
} from "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
import {
  n as n5
} from "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import {
  c as c2
} from "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-IIZACZCL.js";
import {
  j
} from "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import {
  o as o3
} from "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import {
  M,
  s as s4
} from "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import {
  u as u2
} from "./chunk-CQP3AR6G.js";
import "./chunk-GPPG4D7S.js";
import "./chunk-V7FXKYLS.js";
import "./chunk-2AR2ZIQP.js";
import {
  V as V2
} from "./chunk-ZDVJGW4C.js";
import {
  o as o2
} from "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import {
  m
} from "./chunk-LHPNLXQX.js";
import {
  U as U2,
  m as m2,
  p,
  y as y2
} from "./chunk-2GHQZMFH.js";
import {
  n as n3
} from "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import {
  _,
  o,
  w,
  x2 as x
} from "./chunk-BYMJUQYJ.js";
import {
  f as f2,
  r
} from "./chunk-YKH4U5BK.js";
import {
  G
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import {
  s as s3
} from "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  U,
  V,
  Y,
  Z,
  tt,
  ut
} from "./chunk-IMLUWAKH.js";
import {
  e as e2,
  f2 as f,
  n2,
  u3 as u,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  c,
  k,
  s as s2
} from "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import {
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/GeoreferenceBase.js
var c3 = class extends l2 {
  projectOrWarn(e4, r3) {
    if (null == e4)
      return e4;
    const { geometry: t3, pending: c4 } = V3(e4, r3);
    return c4 ? null : c4 || t3 ? t3 : (n.getLogger(this).warn("geometry could not be projected to the spatial reference", { georeference: this, geometry: e4, sourceSpatialReference: e4.spatialReference, targetSpatialReference: r3 }), null);
  }
};
c3 = e([a("esri.layers.support.GeoreferenceBase")], c3);
var a2 = c3;

// node_modules/@arcgis/core/layers/support/ControlPointsGeoreference.js
var S2 = e3();
var N2 = n6();
var T = class extends f {
};
e([y({ type: Number, json: { write: true } })], T.prototype, "x", void 0), e([y({ type: Number, json: { write: true } })], T.prototype, "y", void 0), T = e([a("esri.layers.support.ControlPointsGeoreference.ControlPointJSONType")], T);
var _3 = class extends l2 {
  constructor() {
    super(...arguments), this.sourcePoint = null, this.mapPoint = null;
  }
};
e([y()], _3.prototype, "sourcePoint", void 0), e([y({ type: _ })], _3.prototype, "mapPoint", void 0), _3 = e([a("esri.layers.support.ControlPointsGeoreference.ControlPoint")], _3);
var O = class extends u(a2) {
  constructor(o6) {
    super(o6), this.controlPoints = null, this.height = 0, this.type = "control-points", this.width = 0;
  }
  readControlPoints(o6, t3) {
    const r3 = f2.fromJSON(t3.spatialReference), e4 = t2(...t3.coefficients, 1);
    return o6.map((o7) => (o5(N2, o7.x, o7.y), p4(N2, N2, e4), { sourcePoint: o7, mapPoint: new _({ x: N2[0], y: N2[1], spatialReference: r3 }) }));
  }
  writeControlPoints(o6, t3, e4, n7) {
    if (null != this.transform)
      null != o6 && G2(o6[0]) && (t3.controlPoints = o6.map((o7) => {
        const t4 = o7.sourcePoint;
        return { x: t4.x, y: t4.y };
      }), t3.spatialReference = o6[0].mapPoint.spatialReference.toJSON(), t3.coefficients = this.transform.slice(0, 8));
    else {
      const o7 = new s("web-document-write:invalid-georeference", "Invalid 'controlPoints', 'width', 'height' configuration.", { layer: n7?.layer, georeference: this });
      n7?.messages ? n7.messages.push(o7) : n.getLogger(this).error(o7.name, o7.message);
    }
  }
  get coords() {
    if (null == this.controlPoints)
      return null;
    const o6 = this._updateTransform(S2);
    if (null == o6 || !G2(this.controlPoints[0]))
      return null;
    const t3 = this.controlPoints[0].mapPoint.spatialReference;
    return Q(o6, this.width, this.height, t3);
  }
  set coords(o6) {
    if (null == this.controlPoints || !G2(this.controlPoints[0]))
      return;
    const t3 = this.controlPoints[0].mapPoint.spatialReference;
    if (null == (o6 = this.projectOrWarn(o6, t3)))
      return;
    const { width: r3, height: e4 } = this, { rings: [[n7, i2, l3, a4]] } = o6, p6 = { sourcePoint: c2(0, e4), mapPoint: new _({ x: n7[0], y: n7[1], spatialReference: t3 }) }, u5 = { sourcePoint: c2(0, 0), mapPoint: new _({ x: i2[0], y: i2[1], spatialReference: t3 }) }, m5 = { sourcePoint: c2(r3, 0), mapPoint: new _({ x: l3[0], y: l3[1], spatialReference: t3 }) }, f5 = { sourcePoint: c2(r3, e4), mapPoint: new _({ x: a4[0], y: a4[1], spatialReference: t3 }) };
    G2(p6) && G2(u5) && G2(m5) && G2(f5) && (W(S2, p6, u5, m5, f5), this.controlPoints = this.controlPoints.map(({ sourcePoint: o7 }) => (o5(N2, o7.x, o7.y), p4(N2, N2, S2), { sourcePoint: o7, mapPoint: new _({ x: N2[0], y: N2[1], spatialReference: t3 }) })));
  }
  get inverseTransform() {
    return null == this.transform ? null : s5(e3(), this.transform);
  }
  get transform() {
    return this._updateTransform();
  }
  toMap(o6) {
    if (null == o6 || null == this.transform || null == this.controlPoints || !G2(this.controlPoints[0]))
      return null;
    o5(N2, o6.x, o6.y);
    const t3 = this.controlPoints[0].mapPoint.spatialReference;
    return p4(N2, N2, this.transform), new _({ x: N2[0], y: N2[1], spatialReference: t3 });
  }
  toSource(o6) {
    if (null == o6 || null == this.inverseTransform || null == this.controlPoints || !G2(this.controlPoints[0]))
      return null;
    const t3 = this.controlPoints[0].mapPoint.spatialReference;
    return o6 = o6.normalize(), null == (o6 = V3(o6, t3).geometry) ? null : (o5(N2, o6.x, o6.y), p4(N2, N2, this.inverseTransform), c2(N2[0], N2[1]));
  }
  toSourceNormalized(o6) {
    const t3 = this.toSource(o6);
    return null != t3 && (t3.x /= this.width, t3.y /= this.height), t3;
  }
  _updateTransform(o6) {
    const { controlPoints: t3, width: r3, height: e4 } = this;
    if (!(null != t3 && r3 > 0 && e4 > 0))
      return null;
    const [n7, i2, s7, l3] = t3;
    if (!G2(n7))
      return null;
    const c4 = n7.mapPoint.spatialReference, a4 = this._projectControlPoint(i2, c4), p6 = this._projectControlPoint(s7, c4), u5 = this._projectControlPoint(l3, c4);
    if (!a4.valid || !p6.valid || !u5.valid)
      return null;
    if (!G2(a4.controlPoint))
      return null;
    null == o6 && (o6 = e3());
    let m5 = null;
    return m5 = G2(p6.controlPoint) && G2(u5.controlPoint) ? W(o6, n7, a4.controlPoint, p6.controlPoint, u5.controlPoint) : G2(p6.controlPoint) ? V4(o6, n7, a4.controlPoint, p6.controlPoint) : E(o6, n7, a4.controlPoint), m5.every((o7) => 0 === o7) ? null : m5;
  }
  _projectControlPoint(o6, t3) {
    if (!G2(o6))
      return { valid: true, controlPoint: o6 };
    const { sourcePoint: r3, mapPoint: e4 } = o6, { geometry: n7, pending: s7 } = V3(e4, t3);
    return s7 ? { valid: false, controlPoint: null } : s7 || n7 ? { valid: true, controlPoint: { sourcePoint: r3, mapPoint: n7 } } : (n.getLogger(this).warn("map point could not be projected to the spatial reference", { georeference: this, controlPoint: o6, sourceSpatialReference: e4.spatialReference, targetSpatialReference: t3 }), { valid: false, controlPoint: null });
  }
};
function G2(o6) {
  return null != o6?.sourcePoint && null != o6.mapPoint;
}
e([y({ type: [_3], json: { write: { allowNull: false, isRequired: true, target: { controlPoints: { type: [T] }, coefficients: { type: [Number] }, spatialReference: { type: f2 } } } } })], O.prototype, "controlPoints", void 0), e([o("controlPoints")], O.prototype, "readControlPoints", null), e([r("controlPoints")], O.prototype, "writeControlPoints", null), e([y({ clonable: false })], O.prototype, "coords", null), e([y({ type: Number, nonNullable: true, json: { write: true } })], O.prototype, "height", void 0), e([y({ readOnly: true })], O.prototype, "inverseTransform", null), e([y({ readOnly: true })], O.prototype, "transform", null), e([y({ type: Number, nonNullable: true, json: { write: true } })], O.prototype, "width", void 0), O = e([a("esri.layers.support.ControlPointsGeoreference")], O);
var I2 = n6();
var J = n6();
var L = n6();
var M2 = n6();
var z = n6();
var A2 = n6();
var U3 = n6();
var k2 = n6();
var q = Math.PI / 2;
function B(o6, t3, r3) {
  o5(o6, r3.sourcePoint.x, r3.sourcePoint.y), o5(t3, r3.mapPoint.x, r3.mapPoint.y);
}
function E(o6, t3, r3) {
  return B(I2, z, t3), B(J, A2, r3), I(L, J, I2, q), I(M2, I2, J, q), I(U3, A2, z, -q), I(k2, z, A2, -q), K2(o6, I2, J, L, M2, z, A2, U3, k2);
}
function V4(o6, t3, r3, e4) {
  return B(I2, z, t3), B(J, A2, r3), B(L, U3, e4), _2(M2, I2, J, 0.5), I(M2, L, M2, Math.PI), _2(k2, z, A2, 0.5), I(k2, U3, k2, Math.PI), K2(o6, I2, J, L, M2, z, A2, U3, k2);
}
function W(o6, t3, r3, e4, n7) {
  return B(I2, z, t3), B(J, A2, r3), B(L, U3, e4), B(M2, k2, n7), K2(o6, I2, J, L, M2, z, A2, U3, k2);
}
var D = new Array(8).fill(0);
var F = new Array(8).fill(0);
function H(o6, t3, r3, e4, n7) {
  return o6[0] = t3[0], o6[1] = t3[1], o6[2] = r3[0], o6[3] = r3[1], o6[4] = e4[0], o6[5] = e4[1], o6[6] = n7[0], o6[7] = n7[1], o6;
}
function K2(o6, t3, r3, e4, n7, i2, s7, c4, a4) {
  return j3(o6, H(D, t3, r3, e4, n7), H(F, i2, s7, c4, a4));
}
function Q(o6, t3, r3, e4) {
  const n7 = r2(0, r3), i2 = r2(0, 0), l3 = r2(t3, 0), c4 = r2(t3, r3);
  return p4(n7, n7, o6), p4(i2, i2, o6), p4(l3, l3, o6), p4(c4, c4, o6), new j({ rings: [[n7, i2, l3, c4, n7]], spatialReference: e4 });
}
var X = O;

// node_modules/@arcgis/core/layers/support/CornersGeoreference.js
var u3 = n6();
var y3 = class extends a2 {
  constructor(t3) {
    super(t3), this.bottomLeft = null, this.bottomRight = null, this.topLeft = null, this.topRight = null, this.type = "corners";
  }
  get coords() {
    let { topLeft: t3, topRight: o6, bottomLeft: e4, bottomRight: r3 } = this;
    if (null == t3 || null == o6 || null == e4 || null == r3)
      return null;
    const s7 = t3.spatialReference;
    return o6 = this.projectOrWarn(o6, s7), e4 = this.projectOrWarn(e4, s7), r3 = this.projectOrWarn(r3, s7), null == o6 || null == e4 || null == r3 ? null : new j({ rings: [[[e4.x, e4.y], [t3.x, t3.y], [o6.x, o6.y], [r3.x, r3.y], [e4.x, e4.y]]], spatialReference: s7 });
  }
  set coords(t3) {
    const { topLeft: o6 } = this;
    if (null == o6)
      return;
    const e4 = o6.spatialReference;
    if (null == (t3 = this.projectOrWarn(t3, e4)))
      return;
    const { rings: [[r3, s7, i2, l3]] } = t3;
    this.bottomLeft = new _({ x: r3[0], y: r3[1], spatialReference: e4 }), this.topLeft = new _({ x: s7[0], y: s7[1], spatialReference: e4 }), this.topRight = new _({ x: i2[0], y: i2[1], spatialReference: e4 }), this.bottomRight = new _({ x: l3[0], y: l3[1], spatialReference: e4 });
  }
  toSourceNormalized(t3) {
    const { topLeft: s7, topRight: i2, bottomRight: p6, bottomLeft: c4 } = this;
    if (null == t3 || null == s7 || null == i2 || null == p6 || null == c4)
      return null;
    const m5 = s7.spatialReference;
    t3 = t3.normalize();
    const f5 = V3(t3, m5).geometry;
    if (null == f5)
      return null;
    o5(u3, f5.x, f5.y);
    const y6 = j3(e3(), [s7.x, s7.y, c4.x, c4.y, i2.x, i2.y, p6.x, p6.y], [0, 0, 0, 1, 1, 0, 1, 1]);
    return p4(u3, u3, y6), c2(u3[0], u3[1]);
  }
};
e([y({ clonable: false })], y3.prototype, "coords", null), e([y({ type: _ })], y3.prototype, "bottomLeft", void 0), e([y({ type: _ })], y3.prototype, "bottomRight", void 0), e([y({ type: _ })], y3.prototype, "topLeft", void 0), e([y({ type: _ })], y3.prototype, "topRight", void 0), y3 = e([a("esri.layers.support.CornersGeoreference")], y3);
var h = y3;

// node_modules/@arcgis/core/layers/support/ExtentAndRotationGeoreference.js
var p5 = class extends a2 {
  constructor(t3) {
    super(t3), this.extent = null, this.rotation = 0, this.type = "extent-and-rotation";
  }
  get coords() {
    if (null == this.extent)
      return null;
    const { xmin: t3, ymin: e4, xmax: r3, ymax: o6, spatialReference: n7 } = this.extent;
    let s7;
    if (this.rotation) {
      const { x: n8, y: i2 } = this.extent.center, a4 = x2(n8, i2, this.rotation);
      s7 = [a4(t3, e4), a4(t3, o6), a4(r3, o6), a4(r3, e4)], s7.push(s7[0]);
    } else
      s7 = [[t3, e4], [t3, o6], [r3, o6], [r3, e4], [t3, e4]];
    return new j({ rings: [s7], spatialReference: n7 });
  }
  set coords(t3) {
    if (null == t3 || null == this.extent)
      return;
    const r3 = this.extent.spatialReference;
    if (t3 = this.projectOrWarn(t3, r3), null == t3?.extent)
      return;
    const { rings: [[o6, n7, s7]], extent: { center: { x: i2, y: c4 } } } = t3, m5 = M(Math.PI / 2 - Math.atan2(n7[1] - o6[1], n7[0] - o6[0])), l3 = x2(i2, c4, -m5), [p6, u5] = l3(o6[0], o6[1]), [f5, h3] = l3(s7[0], s7[1]);
    this.extent = new w({ xmin: p6, ymin: u5, xmax: f5, ymax: h3, spatialReference: r3 }), this.rotation = m5;
  }
  toSourceNormalized(t3) {
    const { extent: e4, rotation: n7 } = this;
    if (null == t3 || null == e4)
      return null;
    const { xmin: s7, ymin: i2, xmax: a4, ymax: c4, center: l3, spatialReference: p6 } = e4;
    t3 = t3.normalize();
    const u5 = V3(t3, p6).geometry;
    if (null == u5)
      return null;
    let f5 = u5.x, h3 = u5.y;
    return n7 && ([f5, h3] = x2(l3.x, l3.y, -n7)(f5, h3)), c2(s4(f5, s7, a4, 0, 1), s4(h3, c4, i2, 0, 1));
  }
};
function x2(t3, e4, r3) {
  const o6 = u2(r3), n7 = Math.cos(o6), s7 = Math.sin(o6);
  return (r4, o7) => [n7 * (r4 - t3) + s7 * (o7 - e4) + t3, n7 * (o7 - e4) - s7 * (r4 - t3) + e4];
}
e([y({ clonable: false })], p5.prototype, "coords", null), e([y({ type: w })], p5.prototype, "extent", void 0), e([y({ type: Number })], p5.prototype, "rotation", void 0), p5 = e([a("esri.layers.support.ExtentAndRotationGeoreference")], p5);
var u4 = p5;

// node_modules/@arcgis/core/layers/support/mediaUtils.js
function m4(e4) {
  return "media" === e4?.type;
}
function f4(e4, o6) {
  const i2 = n2(o6);
  return m4(e4) && !!e4.portalItem && null != i2 && i2 > e2.PORTAL_ITEM;
}
function y4(t3, n7, o6) {
  if (!t3 || "control-points" === t3.type)
    return t3;
  const { coords: r3 } = t3;
  if (5 !== r3?.rings[0]?.length)
    return null;
  const [c4, a4, p6, l3] = r3.rings[0], { spatialReference: m5 } = r3;
  return new X({ controlPoints: [{ mapPoint: new _({ x: c4[0], y: c4[1], spatialReference: m5 }), sourcePoint: c2(0, o6) }, { mapPoint: new _({ x: a4[0], y: a4[1], spatialReference: m5 }), sourcePoint: c2(0, 0) }, { mapPoint: new _({ x: p6[0], y: p6[1], spatialReference: m5 }), sourcePoint: c2(n7, 0) }, { mapPoint: new _({ x: l3[0], y: l3[1], spatialReference: m5 }), sourcePoint: c2(n7, o6) }], width: n7, height: o6 });
}

// node_modules/@arcgis/core/layers/support/MediaElementBase.js
var y5 = { key: "type", base: a2, typeMap: { "control-points": X, corners: h, "extent-and-rotation": u4 } };
var g = { key: "type", base: a2, typeMap: { "control-points": X } };
var h2 = class extends i(S(m)) {
  constructor(e4) {
    super(e4), this.georeference = null, this.opacity = 1;
  }
  readGeoreference(e4) {
    return X.fromJSON(e4);
  }
  writeGeoreference(e4, o6, t3, n7) {
    const i2 = n7?.resources?.pendingOperations, c4 = () => {
      const i3 = y4(this.georeference, this.contentWidth, this.contentHeight);
      if (i3) {
        if ("control-points" !== e4.type && n.getLogger(this).warn(`only georeference of type 'control-points' may be persisted. The georeference of type '${e4.type}' has been automatically converted.`), 4 !== i3.controlPoints?.length && n7?.messages)
          return void n7.messages.push(new s("property:unsupported", "only 'control-points' georeference with 4 control points may be persisted."));
        o6[t3] = i3.write({}, n7);
      }
    };
    if ("control-points" !== e4.type && !this.loaded && i2)
      return o6[t3] = {}, void i2.push(this.load().then(c4));
    c4();
  }
  get contentWidth() {
    return 0;
  }
  get contentHeight() {
    return 0;
  }
  toSource(e4) {
    const { georeference: r3, contentWidth: o6, contentHeight: t3 } = this;
    if (null == e4 || null == r3 || 0 === o6 || 0 === t3)
      return null;
    const s7 = r3.toSourceNormalized(e4);
    return null == s7 ? null : (s7.x *= o6, s7.y *= t3, s7);
  }
};
e([y({ types: y5, json: { write: true, types: g } })], h2.prototype, "georeference", void 0), e([o("georeference")], h2.prototype, "readGeoreference", null), e([r("georeference")], h2.prototype, "writeGeoreference", null), e([y({ json: { read: false, write: false } })], h2.prototype, "opacity", void 0), h2 = e([a("esri.layers.support.MediaElementBase")], h2);
var j4 = h2;

// node_modules/@arcgis/core/layers/support/ImageElement.js
var w2 = class extends j4 {
  constructor(e4) {
    super(e4), this.animationOptions = null, this.content = null, this.image = null, this.type = "image", this.image = null;
  }
  load() {
    const e4 = this.image;
    if ("string" == typeof e4) {
      const t3 = p2(e4).then((e5) => {
        this._set("content", e5);
      });
      this.addResolvingPromise(t3);
    } else if (e4 instanceof HTMLImageElement) {
      const t3 = e4.decode().then(() => {
        this._set("content", e4);
      });
      this.addResolvingPromise(t3);
    } else
      e4 ? this._set("content", e4) : this.addResolvingPromise(Promise.reject(new s("image-element:invalid-image-type", "Invalid image type", { image: e4 })));
    return Promise.resolve(this);
  }
  get contentWidth() {
    return null == this.content ? 0 : this.content instanceof HTMLImageElement ? this.content.naturalWidth : this.content.width;
  }
  get contentHeight() {
    return null == this.content ? 0 : this.content instanceof HTMLImageElement ? this.content.naturalHeight : this.content.height;
  }
  readImage(e4, t3, r3) {
    return p(t3.url, r3);
  }
  writeImage(e4, t3, r3, o6) {
    if (null == e4)
      return;
    const n7 = o6?.portalItem, s7 = o6?.resources;
    if (!n7 || !s7)
      return void ("string" == typeof e4 && (t3[r3] = m2(e4, o6)));
    const a4 = E2(e4) ? e4 : null;
    if (a4) {
      if (null == U2(a4))
        return void (t3[r3] = a4);
      const e5 = m2(a4, __spreadProps(__spreadValues({}, o6), { verifyItemRelativeUrls: o6?.verifyItemRelativeUrls ? { writtenUrls: o6.verifyItemRelativeUrls.writtenUrls, rootPath: void 0 } : void 0 }), y2.NO);
      if (n7 && e5 && !Y(e5))
        return s7.toKeep.push({ resource: n7.resourceFromPath(e5), compress: false }), void (t3[r3] = e5);
    }
    t3[r3] = "<pending>", s7.pendingOperations.push(H2(e4).then((e5) => {
      const o7 = U4(e5, n7);
      t3[r3] = o7.itemRelativeUrl, s7.toAdd.push({ resource: o7, content: { type: "blob", blob: e5 }, compress: false, finish: (e6) => {
        this.image = e6.url;
      } });
    }));
  }
  write(e4, t3) {
    const r3 = super.write(e4, t3);
    return "mediaType" in r3 && !r3.url && delete r3.mediaType, r3;
  }
};
e([y()], w2.prototype, "animationOptions", void 0), e([y({ readOnly: true })], w2.prototype, "content", void 0), e([y({ readOnly: true })], w2.prototype, "contentWidth", null), e([y({ readOnly: true })], w2.prototype, "contentHeight", null), e([y({ json: { name: "url", type: String, write: { overridePolicy: (e4, t3, r3) => ({ enabled: !f4(r3?.layer, r3?.origin) }) } } })], w2.prototype, "image", void 0), e([o("image", ["url"])], w2.prototype, "readImage", null), e([r("image")], w2.prototype, "writeImage", null), e([y({ readOnly: true, json: { read: false, write: { target: "mediaType", ignoreOrigin: true } } })], w2.prototype, "type", void 0), w2 = e([a("esri.layers.support.ImageElement")], w2);
var b2 = w2;
function E2(e4) {
  return "string" == typeof e4 && !tt(e4) && !Z(e4);
}
function H2(e4) {
  return __async(this, null, function* () {
    if ("string" == typeof e4) {
      if (tt(e4))
        return ut(e4);
      return (yield U(e4, { responseType: "blob" })).data;
    }
    return new Promise((t3) => T2(e4).toBlob(t3));
  });
}
function T2(e4) {
  if (e4 instanceof HTMLCanvasElement)
    return e4;
  const t3 = e4 instanceof HTMLImageElement ? e4.naturalWidth : e4.width, r3 = e4 instanceof HTMLImageElement ? e4.naturalHeight : e4.height, o6 = document.createElement("canvas"), i2 = o6.getContext("2d");
  return o6.width = t3, o6.height = r3, e4 instanceof HTMLImageElement ? i2.drawImage(e4, 0, 0, e4.width, e4.height) : e4 instanceof ImageData && i2.putImageData(e4, 0, 0), o6;
}
function U4(e4, t3) {
  const r3 = n4(), o6 = `${V("media", r3)}.${p3({ type: "blob", blob: e4 })}`;
  return t3.resourceFromPath(o6);
}

// node_modules/@arcgis/core/layers/support/VideoElement.js
var d2 = class extends j4 {
  constructor(e4) {
    super(e4), this.autoplay = true, this.content = null, this.type = "video";
  }
  load() {
    const e4 = this.video;
    if ("string" == typeof e4) {
      const o6 = document.createElement("video");
      o6.src = e4, o6.crossOrigin = "anonymous", o6.autoplay = true, o6.muted = true, o6.loop = true, o6.playsInline = true, this.addResolvingPromise(this._loadVideo(o6).then(() => {
        this._set("content", o6);
      }));
    } else
      e4 instanceof HTMLVideoElement ? this.addResolvingPromise(this._loadVideo(e4).then(() => {
        this._set("content", e4);
      })) : this.addResolvingPromise(Promise.reject(new s("video-element:invalid-video-type", "Invalid video type", { video: e4 })));
    return Promise.resolve(this);
  }
  get contentWidth() {
    return this.content?.videoWidth ?? 0;
  }
  get contentHeight() {
    return this.content?.videoHeight ?? 0;
  }
  set video(e4) {
    "not-loaded" === this.loadStatus ? this._set("video", e4) : n.getLogger(this).error("#video", "video cannot be changed after the element is loaded.");
  }
  _loadVideo(e4) {
    return new Promise((o6, s7) => {
      const r3 = c(e4, "canplay", () => {
        this.removeHandles("canplay"), this.autoplay ? e4.play().then(o6, s7) : o6();
      });
      this.addHandles(r3, "canplay"), "anonymous" !== e4.crossOrigin && (e4.crossOrigin = "anonymous", e4.src?.includes("blob:") || (e4.src = e4.src));
    });
  }
};
e([y()], d2.prototype, "autoplay", void 0), e([y({ readOnly: true })], d2.prototype, "content", void 0), e([y({ readOnly: true })], d2.prototype, "contentWidth", null), e([y({ readOnly: true })], d2.prototype, "contentHeight", null), e([y()], d2.prototype, "video", null), d2 = e([a("esri.layers.support.VideoElement")], d2);
var a3 = d2;

// node_modules/@arcgis/core/layers/support/LocalMediaElementSource.js
var w3 = { key: "type", defaultKeyValue: "image", base: j4, typeMap: { image: b2, video: a3 } };
var M3 = V2.ofType(w3);
var I3 = class extends m.LoadableMixin(n3(o2.EventedAccessor)) {
  constructor(e4) {
    super(e4), this._index = new o4(), this._elementViewsMap = /* @__PURE__ */ new Map(), this._elementsIndexes = /* @__PURE__ */ new Map(), this._elementsChangedHandler = (e5) => {
      for (const s7 of e5.removed) {
        const e6 = this._elementViewsMap.get(s7);
        this._elementViewsMap.delete(s7), this._index.delete(e6), this.removeHandles(e6), e6.destroy(), this.notifyChange("fullExtent");
      }
      const { spatialReference: t3 } = this;
      for (const s7 of e5.added) {
        if (this._elementViewsMap.get(s7))
          continue;
        const e6 = new m3({ spatialReference: t3, element: s7 });
        this._elementViewsMap.set(s7, e6);
        const r3 = d(() => e6.coords, () => this._updateIndexForElement(e6, false));
        this._updateIndexForElement(e6, true), this.addHandles(r3, e6);
      }
      this._elementsIndexes.clear(), this.elements.forEach((e6, t4) => this._elementsIndexes.set(e6, t4)), this.emit("refresh");
    }, this.elements = new M3();
  }
  load(e4) {
    return __async(this, null, function* () {
      if (s2(e4), !this.spatialReference) {
        const e5 = this.elements.find((e6) => null != e6.georeference?.coords);
        this._set("spatialReference", e5 ? e5.georeference.coords.spatialReference : f2.WGS84);
      }
      return this._elementsChangedHandler({ added: this.elements.items, removed: [] }), this.addHandles(this.elements.on("change", this._elementsChangedHandler)), this;
    });
  }
  destroy() {
    this._index.clear(), this._elementViewsMap.clear(), this._elementsIndexes.clear();
  }
  set elements(e4) {
    this._set("elements", n5(e4, this._get("elements"), M3));
  }
  get fullExtent() {
    if ("not-loaded" === this.loadStatus)
      return null;
    const e4 = this._index.fullBounds;
    return null == e4 ? null : new w({ xmin: e4[0], ymin: e4[1], xmax: e4[2], ymax: e4[3], spatialReference: this.spatialReference });
  }
  set spatialReference(e4) {
    "not-loaded" === this.loadStatus ? this._set("spatialReference", e4) : n.getLogger(this).error("#spatialReference", "spatialReference cannot be changed after the source is loaded.");
  }
  queryElements(e4, t3) {
    return __async(this, null, function* () {
      yield this.load(), yield N(e4.spatialReference, this.spatialReference, null, t3);
      const s7 = G(e4.spatialReference, this.spatialReference) ? e4 : K(e4, this.spatialReference);
      if (!s7)
        return [];
      const r3 = s7.normalize(), o6 = [];
      for (const n7 of r3)
        this._index.forEachInBounds(o3(n7), ({ normalizedCoords: e5, element: t4 }) => {
          null != e5 && x(n7, e5) && o6.push(t4);
        });
      return o6.sort((e5, t4) => this._elementsIndexes.get(e5) - this._elementsIndexes.get(t4)), o6;
    });
  }
  hasElement(e4) {
    return this.elements.includes(e4);
  }
  _updateIndexForElement(e4, t3) {
    const s7 = e4.normalizedBounds, r3 = this._index.has(e4), o6 = null != s7;
    this._index.delete(e4), o6 && this._index.set(e4, s7), this.notifyChange("fullExtent"), t3 || (r3 !== o6 ? this.emit("refresh") : this.emit("change", { element: e4.element }));
  }
};
e([y()], I3.prototype, "elements", null), e([y({ readOnly: true })], I3.prototype, "fullExtent", null), e([y()], I3.prototype, "spatialReference", null), I3 = e([a("esri.layers.support.LocalMediaElementSource")], I3);
var V5 = I3;

// node_modules/@arcgis/core/layers/MediaLayer.js
function b3(e4) {
  return "object" == typeof e4 && null != e4 && "type" in e4;
}
function L2(e4) {
  return b3(e4) && "image" === e4.type;
}
var E3 = class extends l(t(b(j2(S(f3))))) {
  constructor(e4) {
    super(e4), this.effectiveSource = null, this.georeference = null, this.copyright = null, this.operationalLayerType = "MediaLayer", this.spatialReference = null, this.type = "media", this._debouncedSaveOperations = k((e5, r3, o6) => __async(this, null, function* () {
      const { save: t3, saveAs: s7 } = yield import("./chunk-WGD775KO.js");
      switch (e5) {
        case A.SAVE:
          return t3(this, r3);
        case A.SAVE_AS:
          return s7(this, o6, r3);
      }
    })), this.source = new V5();
  }
  load(e4) {
    return this.addResolvingPromise(this._doLoad(e4)), Promise.resolve(this);
  }
  _doLoad(e4) {
    return __async(this, null, function* () {
      yield this.loadFromPortal({ supportedTypes: ["Media Layer"] }, e4);
      let t3 = this.source;
      if (!t3)
        throw new s("media-layer:source-missing", "Set 'MediaLayer.source' before loading the layer.");
      const s7 = this._getSourceOverride(t3, this.georeference);
      s7 && (this.setAtOrigin("source", s7, "web-map"), this.setAtOrigin("source", s7, "web-scene"), t3 = s7);
      const i2 = b3(t3) ? new V5({ elements: new V2([t3]) }) : t3;
      this._set("effectiveSource", i2), this.spatialReference && (i2.spatialReference = this.spatialReference), yield i2.load(e4), this.spatialReference = i2.spatialReference;
    });
  }
  destroy() {
    this.effectiveSource?.destroy(), this.effectiveSource !== this.source && this.source?.destroy();
  }
  readGeoreference(e4, r3) {
    return e4 && "itemId" in r3 && r3.itemId ? e4 : void 0;
  }
  get fullExtent() {
    return this.loaded ? this.effectiveSource.fullExtent : null;
  }
  set source(e4) {
    "loaded" !== this.loadStatus && "failed" !== this.loadStatus ? this._set("source", e4) : n.getLogger(this).error("#source", "source cannot be changed after the layer is loaded.");
  }
  castSource(e4) {
    return e4 ? Array.isArray(e4) ? new V5({ elements: new V2(e4) }) : e4 instanceof V2 ? new V5({ elements: e4 }) : e4 : null;
  }
  readSource(e4, r3, o6) {
    if ("itemId" in r3 && r3.itemId)
      return;
    const t3 = this._createSource(r3);
    return t3?.read(r3, o6), t3;
  }
  writeSource(e4, r3, t3, s7) {
    if (e4 && e4 instanceof V5) {
      const r4 = e4.elements.length;
      if (1 !== r4)
        return void (s7?.messages && s7.messages.push(new s("media-layer:unsupported-source", `local media element source can only be persisted if it contains exactly one ImageElement, but it has ${r4}.`)));
      e4 = e4.elements.at(0);
    }
    L2(e4) ? e4.write(r3, s7) : s7?.messages && (e4 ? s7.messages.push(new s("media-layer:unsupported-source", "only media elements of type 'ImageElement' can be persisted")) : s7.messages.push(new s("media-layer:unsupported-source", "the media layer is missing a source")));
  }
  save(e4) {
    return __async(this, null, function* () {
      return this._debouncedSaveOperations(A.SAVE, e4);
    });
  }
  saveAs(e4, r3) {
    return __async(this, null, function* () {
      return this._debouncedSaveOperations(A.SAVE_AS, r3, e4);
    });
  }
  _createSource(e4) {
    if ("mediaType" in e4)
      switch (e4.mediaType) {
        case "image":
          return new b2();
        case "video":
          return new a3();
      }
    return null;
  }
  _getSourceOverride(e4, r3) {
    if (b3(e4) && this.originIdOf("source") === e2.PORTAL_ITEM && r3 && (this.originIdOf("georeference") === e2.WEB_MAP || this.originIdOf("georeference") === e2.WEB_SCENE)) {
      const o6 = e4.toJSON(), t3 = this._createSource(o6);
      return t3.read(__spreadValues({}, o6), { origin: "portal-item" }), t3.read({ georeference: r3 }, { origin: "web-map" }), t3.read({ georeference: r3 }, { origin: "web-scene" }), t3;
    }
    return null;
  }
};
e([y({ readOnly: true })], E3.prototype, "effectiveSource", void 0), e([y({ readOnly: true, json: { read: false, write: false, origins: { "web-document": { read: true } } } })], E3.prototype, "georeference", void 0), e([o("web-document", "georeference")], E3.prototype, "readGeoreference", null), e([y({ type: String })], E3.prototype, "copyright", void 0), e([y({ readOnly: true })], E3.prototype, "fullExtent", null), e([y({ type: ["MediaLayer"] })], E3.prototype, "operationalLayerType", void 0), e([y({ type: ["show", "hide"] })], E3.prototype, "listMode", void 0), e([y({ nonNullable: true, json: { write: { enabled: true, allowNull: false, target: { url: { type: String }, mediaType: { type: ["image"] }, georeference: { type: X } }, overridePolicy(e4, r3, o6) {
  return { enabled: true, allowNull: false, ignoreOrigin: f4(this, o6?.origin) && L2(e4) && !!e4.georeference && e4.originIdOf("georeference") > e2.PORTAL_ITEM };
} } } })], E3.prototype, "source", null), e([s3("source")], E3.prototype, "castSource", null), e([o("source", ["url"])], E3.prototype, "readSource", null), e([r("source")], E3.prototype, "writeSource", null), e([y()], E3.prototype, "spatialReference", void 0), e([y({ readOnly: true })], E3.prototype, "type", void 0), E3 = e([a("esri.layers.MediaLayer")], E3);
var _4 = E3;
export {
  _4 as default
};
//# sourceMappingURL=chunk-L4S5KLJM.js.map
