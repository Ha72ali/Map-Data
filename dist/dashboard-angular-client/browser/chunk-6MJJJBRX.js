import {
  a as a3
} from "./chunk-5LUZWMQA.js";
import {
  M,
  c,
  f as f3,
  h as h2,
  i as i2,
  s as s3,
  u as u3
} from "./chunk-73TXPMFV.js";
import {
  i,
  l as l2
} from "./chunk-5YCNWSDC.js";
import {
  P,
  v
} from "./chunk-5AO6PKWA.js";
import {
  n as n3,
  r as r3
} from "./chunk-EFPJQTVN.js";
import {
  J,
  K,
  W as W2,
  _ as _2
} from "./chunk-J2BM4BJ4.js";
import {
  B,
  S,
  e as e3,
  j,
  l,
  o as o2,
  q,
  r as r2,
  u as u2,
  v as v2,
  x,
  y as y3
} from "./chunk-PUJBM626.js";
import {
  n as n2
} from "./chunk-ZGFCHJGS.js";
import {
  y as y2
} from "./chunk-4QNJMPNJ.js";
import {
  e as e2,
  h
} from "./chunk-VNWT22OX.js";
import {
  u
} from "./chunk-CQP3AR6G.js";
import {
  V
} from "./chunk-ZDVJGW4C.js";
import {
  _,
  n,
  o,
  w
} from "./chunk-BYMJUQYJ.js";
import {
  f as f2,
  r
} from "./chunk-YKH4U5BK.js";
import {
  G,
  N,
  W2 as W,
  s3 as s2
} from "./chunk-U4IA2IP4.js";
import {
  s
} from "./chunk-VHLVKE6R.js";
import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a,
  a3 as a2
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/CameraLayout.js
var t = class extends l2 {
  constructor(o4) {
    super(o4), this.row = 0, this.column = 0, this.rows = 1, this.columns = 1;
  }
  equals(o4) {
    return null != o4 && (this.row === o4.row && this.rows === o4.rows && this.column === o4.column && this.columns === o4.columns);
  }
};
e([y({ type: Number, nonNullable: true, json: { read: false, write: false } })], t.prototype, "row", void 0), e([y({ type: Number, nonNullable: true, json: { read: false, write: false } })], t.prototype, "column", void 0), e([y({ type: Number, nonNullable: true, json: { read: false, write: false } })], t.prototype, "rows", void 0), e([y({ type: Number, nonNullable: true, json: { read: false, write: false } })], t.prototype, "columns", void 0), t = e([a2("esri.CameraLayout")], t);
var l3 = t;

// node_modules/@arcgis/core/Camera.js
var y4 = class extends i(f) {
  constructor(...o4) {
    super(...o4), this.position = new _([0, 0, 0]), this.heading = 0, this.tilt = 0, this.fov = 55, this.layout = new l3();
  }
  normalizeCtorArgs(o4, r5, t3, e5) {
    if (o4 && "object" == typeof o4 && ("x" in o4 || Array.isArray(o4))) {
      const s4 = { position: o4 };
      return null != r5 && (s4.heading = r5), null != t3 && (s4.tilt = t3), null != e5 && (s4.fov = e5), s4;
    }
    return o4;
  }
  writePosition(o4, r5, t3, e5) {
    const s4 = o4.clone();
    s4.x = a(o4.x || 0), s4.y = a(o4.y || 0), s4.z = o4.hasZ ? a(o4.z || 0) : o4.z, r5[t3] = s4.write({}, e5);
  }
  readPosition(o4, r5) {
    const t3 = new _();
    return t3.read(o4, r5), t3.x = a(t3.x || 0), t3.y = a(t3.y || 0), t3.z = t3.hasZ ? a(t3.z || 0) : t3.z, t3;
  }
  equals(o4) {
    return null != o4 && (this.tilt === o4.tilt && this.heading === o4.heading && this.fov === o4.fov && this.position.equals(o4.position) && this.layout.equals(o4.layout));
  }
};
e([y({ type: _, json: { write: { isRequired: true } } })], y4.prototype, "position", void 0), e([r("position")], y4.prototype, "writePosition", null), e([o("position")], y4.prototype, "readPosition", null), e([y({ type: Number, nonNullable: true, json: { write: { isRequired: true } } }), s((o4) => a3.normalize(a(o4)))], y4.prototype, "heading", void 0), e([y({ type: Number, nonNullable: true, json: { write: { isRequired: true } } }), s((o4) => e2(a(o4), -180, 180))], y4.prototype, "tilt", void 0), e([y({ type: Number, nonNullable: true, json: { read: false, write: false } })], y4.prototype, "fov", void 0), e([y({ type: l3, nonNullable: true, json: { read: false, write: false } })], y4.prototype, "layout", void 0), y4 = e([a2("esri.Camera")], y4);
var d = y4;

// node_modules/@arcgis/core/Viewpoint.js
var n4;
var p = n4 = class extends f {
  constructor(r5) {
    super(r5), this.rotation = 0, this.scale = 0, this.targetGeometry = null, this.camera = null;
  }
  castRotation(r5) {
    return (r5 %= 360) < 0 && (r5 += 360), r5;
  }
  clone() {
    return new n4({ rotation: this.rotation, scale: this.scale, targetGeometry: null != this.targetGeometry ? this.targetGeometry.clone() : null, camera: null != this.camera ? this.camera.clone() : null });
  }
};
e([y({ type: Number, json: { write: true, origins: { "web-map": { default: 0, write: true }, "web-scene": { write: { overridePolicy: l4 } } } } })], p.prototype, "rotation", void 0), e([s("rotation")], p.prototype, "castRotation", null), e([y({ type: Number, json: { write: true, origins: { "web-map": { default: 0, write: true }, "web-scene": { write: { overridePolicy: l4 } } } } })], p.prototype, "scale", void 0), e([y({ types: n2, json: { read: y2, write: true, origins: { "web-scene": { read: y2, write: { overridePolicy: l4 } } } } })], p.prototype, "targetGeometry", void 0), e([y({ type: d, json: { write: true } })], p.prototype, "camera", void 0), p = n4 = e([a2("esri.Viewpoint")], p);
var m = p;
function l4() {
  return { enabled: !this.camera };
}

// node_modules/@arcgis/core/core/libs/gl-matrix-2/factories/mat2df64.js
function e4() {
  return [1, 0, 0, 1, 0, 0];
}
function r4(e5) {
  return [e5[0], e5[1], e5[2], e5[3], e5[4], e5[5]];
}
function t2(e5, r5, t3, n6, o4, u5) {
  return [e5, r5, t3, n6, o4, u5];
}
function n5(e5, r5) {
  return new Float64Array(e5, r5, 6);
}
var o3 = e4();
var u4 = Object.freeze(Object.defineProperty({ __proto__: null, IDENTITY: o3, clone: r4, create: e4, createView: n5, fromValues: t2 }, Symbol.toStringTag, { value: "Module" }));

// node_modules/@arcgis/core/views/2d/viewpointUtils.js
var O = 96;
var Q = 39.37;
var T = 180 / Math.PI;
function B2(t3) {
  return t3.wkid ? t3 : t3.spatialReference || f2.WGS84;
}
function D(t3, e5) {
  return e5.type ? o2(t3, e5.x, e5.y) : r2(t3, e5);
}
function W3(t3) {
  return W(t3);
}
function H(t3, e5, n6 = 0) {
  let o4 = t3.width, a4 = t3.height;
  if (0 !== n6) {
    const e6 = h(n6), i4 = Math.abs(Math.cos(e6)), c3 = Math.abs(Math.sin(e6));
    o4 = t3.width * i4 + t3.height * c3, a4 = t3.width * c3 + t3.height * i4;
  }
  const i3 = Math.max(1, e5[0]), c2 = Math.max(1, e5[1]);
  return Math.max(o4 / i3, a4 / c2) * ct(t3.spatialReference);
}
function J2(t3, r5, n6, o4) {
  return __async(this, null, function* () {
    let a4, i3;
    if (!t3)
      return null;
    if (Array.isArray(t3) && !t3.length)
      return null;
    if (V.isCollection(t3) && (t3 = t3.toArray()), Array.isArray(t3) && t3.length && "object" == typeof t3[0]) {
      const e5 = t3.every((t4) => "attributes" in t4), a5 = t3.some((t4) => !t4.geometry);
      let i4 = t3;
      if (e5 && a5 && r5 && r5.allLayerViews) {
        const e6 = /* @__PURE__ */ new Map();
        for (const r6 of t3) {
          const t4 = r6.layer, n8 = e6.get(t4) || [], o6 = r6.attributes[t4.objectIdField];
          null != o6 && n8.push(o6), e6.set(t4, n8);
        }
        const n7 = [];
        e6.forEach((t4, e7) => {
          const o6 = r5.allLayerViews.find((t5) => t5.layer.id === e7.id);
          if (o6 && "queryFeatures" in o6) {
            const r6 = e7.createQuery();
            r6.objectIds = t4, r6.returnGeometry = true, n7.push(o6.queryFeatures(r6));
          }
        });
        const o5 = yield Promise.all(n7), a6 = [];
        for (const t4 of o5)
          if (t4 && t4.features && t4.features.length)
            for (const e7 of t4.features)
              null != e7.geometry && a6.push(e7.geometry);
        i4 = a6;
      }
      for (const t4 of i4)
        o4 = yield J2(t4, r5, n6, o4);
      return o4;
    }
    if (Array.isArray(t3) && 2 === t3.length && "number" == typeof t3[0] && "number" == typeof t3[1])
      a4 = new _(t3);
    else if (t3 instanceof n)
      a4 = t3;
    else if ("geometry" in t3) {
      if (t3.geometry)
        a4 = t3.geometry;
      else if (t3.layer) {
        const e5 = t3.layer, n7 = r5.allLayerViews.find((t4) => t4.layer.id === e5.id);
        if (n7 && "queryFeatures" in n7) {
          const r6 = e5.createQuery();
          r6.objectIds = [t3.attributes[e5.objectIdField]], r6.returnGeometry = true;
          const o5 = yield n7.queryFeatures(r6);
          a4 = o5?.features?.[0]?.geometry;
        }
      }
    }
    if (null == a4)
      return null;
    switch (a4.type) {
      case "point":
        i3 = new w({ xmin: a4.x, ymin: a4.y, xmax: a4.x, ymax: a4.y, spatialReference: a4.spatialReference });
        break;
      case "extent":
      case "multipoint":
      case "polygon":
      case "polyline":
        i3 = v(a4);
        break;
      default:
        i3 = a4.extent;
    }
    if (!i3)
      return null;
    _2() || J(i3.spatialReference, n6) || (yield W2());
    const c2 = K(i3, n6);
    if (!c2)
      return null;
    if (o4) {
      const t4 = c2.center, e5 = t4.clone();
      e5.x = P(t4.x, o4.center.x, n6), e5.x !== t4.x && c2.centerAt(e5), o4 = o4.union(c2);
    } else
      o4 = c2;
    return o4;
  });
}
function K2(t3) {
  if (t3 && (!Array.isArray(t3) || "number" != typeof t3[0]) && ("object" == typeof t3 || Array.isArray(t3) && "object" == typeof t3[0])) {
    if ("layer" in t3 && null != t3.layer?.minScale && null != t3.layer.maxScale) {
      const e5 = t3.layer;
      return { min: e5.minScale, max: e5.maxScale };
    }
    if (Array.isArray(t3) && t3.length && t3.every((t4) => "layer" in t4)) {
      let e5 = 0, r5 = 0;
      for (const n6 of t3) {
        const t4 = n6.layer;
        t4?.minScale && t4.maxScale && (e5 = t4.minScale < e5 ? t4.minScale : e5, r5 = t4.maxScale > r5 ? t4.maxScale : r5);
      }
      return e5 && r5 ? { min: e5, max: r5 } : null;
    }
  }
}
function X(t3, e5) {
  return G(B2(t3), e5) ? t3 : K(t3, e5);
}
function Y(e5, r5) {
  return __async(this, null, function* () {
    if (!e5 || !r5)
      return new m({ targetGeometry: new _(), scale: 0, rotation: 0 });
    let n6 = r5.spatialReference;
    const { constraints: o4, padding: a4, viewpoint: i3, size: c2 } = r5, s4 = [a4 ? c2[0] - a4.left - a4.right : c2[0], a4 ? c2[1] - a4.top - a4.bottom : c2[1]];
    let u5 = null;
    e5 instanceof m ? u5 = e5 : e5.viewpoint ? u5 = e5.viewpoint : e5.target && "esri.Viewpoint" === e5.target.declaredClass && (u5 = e5.target);
    let l5 = null;
    u5?.targetGeometry ? l5 = u5.targetGeometry : e5 instanceof w ? l5 = e5 : e5 instanceof n ? l5 = yield J2(e5, r5, n6) : e5 && (l5 = (yield J2(e5.center, r5, n6)) || (yield J2(e5.target, r5, n6)) || (yield J2(e5, r5, n6))), !l5 && i3?.targetGeometry ? l5 = i3.targetGeometry : !l5 && r5.extent && (l5 = r5.extent), n6 || (n6 = B2(r5.spatialReference || r5.extent || l5)), _2() || G(l5.spatialReference, n6) || J(l5.spatialReference, n6) || (yield W2());
    const f4 = X(l5, n6), m2 = "center" in f4 ? f4.center : f4;
    false !== r5.pickClosestTarget && "point" === m2.type && "point" === i3.targetGeometry?.type && (m2.x = P(m2.x, i3.targetGeometry.x, m2.spatialReference));
    let y5 = 0;
    u5 ? y5 = u5.rotation : e5.hasOwnProperty("rotation") ? y5 = e5.rotation : i3 && (y5 = i3.rotation);
    let p2 = 0;
    p2 = null != u5?.targetGeometry && "point" === u5.targetGeometry.type ? u5.scale : "scale" in e5 && e5.scale ? e5.scale : "zoom" in e5 && -1 !== e5.zoom && o4 && o4.effectiveLODs ? o4.zoomToScale(e5.zoom) : Array.isArray(l5) || "point" === l5.type || "extent" === l5.type && 0 === l5.width && 0 === l5.height ? i3.scale : H(X(l5.extent, n6), s4, y5);
    const g = K2(e5.target ?? e5);
    g && (g.min && g.min < p2 ? p2 = g.min : g.max && g.max > p2 && (p2 = g.max));
    let x2 = new m({ targetGeometry: m2, scale: p2, rotation: y5 });
    return o4 && (x2 = o4.fit(x2), o4.constrainByGeometry(x2), o4.rotationEnabled || (x2.rotation = i3.rotation)), x2;
  });
}
function Z(t3, e5) {
  const r5 = t3.targetGeometry, n6 = e5.targetGeometry;
  return r5.x = n6.x, r5.y = n6.y, r5.spatialReference = n6.spatialReference, t3.scale = e5.scale, t3.rotation = e5.rotation, t3;
}
function $(t3, e5, r5) {
  return r5 ? o2(t3, 0.5 * (e5[0] - r5.right + r5.left), 0.5 * (e5[1] - r5.bottom + r5.top)) : l(t3, e5, 0.5);
}
var _3 = function() {
  const t3 = n3();
  return function(e5, r5, n6) {
    const o4 = r5.targetGeometry;
    D(t3, o4);
    const a4 = 0.5 * ot(r5);
    return e5.xmin = t3[0] - a4 * n6[0], e5.ymin = t3[1] - a4 * n6[1], e5.xmax = t3[0] + a4 * n6[0], e5.ymax = t3[1] + a4 * n6[1], e5.spatialReference = o4.spatialReference, e5;
  };
}();
function tt(t3, e5, r5, n6, o4) {
  return xt(t3, e5, r5.center), t3.scale = H(r5, n6), o4?.constraints?.constrain(t3), t3;
}
function et(t3, e5, r5, n6) {
  return lt(t3, e5, r5, n6), u3(t3, t3);
}
var rt = function() {
  const t3 = n3();
  return function(e5, r5, n6) {
    return B(e5, st(e5, r5), $(t3, r5, n6));
  };
}();
var nt = function() {
  const t3 = e4(), e5 = n3();
  return function(r5, n6, o4, s4) {
    const u5 = ot(n6), l5 = it(n6);
    return o2(e5, u5, u5), h2(t3, e5), s3(t3, t3, l5), i2(t3, t3, rt(e5, o4, s4)), i2(t3, t3, [0, s4.top - s4.bottom]), o2(r5, t3[4], t3[5]);
  };
}();
function ot(t3) {
  return t3.scale * at(t3.targetGeometry?.spatialReference);
}
function at(t3) {
  return null != t3 && N(t3) ? 1 / (W3(t3) * Q * O) : 1;
}
function it(t3) {
  return u(t3.rotation) || 0;
}
function ct(t3) {
  return N(t3) ? W3(t3) * Q * O : 1;
}
function st(t3, e5) {
  return l(t3, e5, 0.5);
}
var ut = function() {
  const t3 = n3(), e5 = n3(), r5 = n3();
  return function(n6, o4, a4, l5, f4, m2) {
    return x(t3, o4), l(e5, a4, 0.5 * m2), o2(r5, 1 / l5 * m2, -1 / l5 * m2), f3(n6, e5), f4 && s3(n6, n6, f4), c(n6, n6, r5), i2(n6, n6, t3), n6;
  };
}();
var lt = function() {
  const t3 = n3();
  return function(e5, r5, n6, o4) {
    const a4 = ot(r5), i3 = it(r5);
    return D(t3, r5.targetGeometry), ut(e5, t3, n6, a4, i3, o4);
  };
}();
var ft = function() {
  const t3 = n3();
  return function(e5, r5, n6, o4) {
    const a4 = ot(r5);
    return D(t3, r5.targetGeometry), ut(e5, t3, n6, a4, 0, o4);
  };
}();
function mt(t3) {
  const e5 = s2(t3);
  return e5 ? e5.valid[1] - e5.valid[0] : 0;
}
function yt(t3, e5) {
  return Math.round(mt(t3) / e5);
}
var pt = function() {
  const t3 = n3(), e5 = n3(), r5 = [0, 0, 0];
  return function(n6, o4, a4) {
    e3(t3, n6, o4), v2(t3, t3), e3(e5, n6, a4), v2(e5, e5), y3(r5, t3, e5);
    let i3 = Math.acos(j(t3, e5) / (q(t3) * q(e5))) * T;
    return r5[2] < 0 && (i3 = -i3), isNaN(i3) && (i3 = 0), i3;
  };
}();
var gt = function() {
  const t3 = n3();
  return function(e5, r5, n6, o4) {
    const a4 = e5.targetGeometry;
    return Z(e5, r5), nt(t3, r5, n6, o4), a4.x += t3[0], a4.y += t3[1], e5;
  };
}();
var xt = function(t3, e5, r5) {
  Z(t3, e5);
  const n6 = t3.targetGeometry;
  return n6.x = r5.x, n6.y = r5.y, n6.spatialReference = r5.spatialReference, t3;
};
var ht = function() {
  const t3 = n3();
  return function(e5, r5, n6, o4, a4) {
    a4 || (a4 = "center"), B(t3, n6, o4), l(t3, t3, 0.5);
    const i3 = t3[0], c2 = t3[1];
    switch (a4) {
      case "center":
        o2(t3, 0, 0);
        break;
      case "left":
        o2(t3, -i3, 0);
        break;
      case "top":
        o2(t3, 0, c2);
        break;
      case "right":
        o2(t3, i3, 0);
        break;
      case "bottom":
        o2(t3, 0, -c2);
        break;
      case "top-left":
        o2(t3, -i3, c2);
        break;
      case "bottom-left":
        o2(t3, -i3, -c2);
        break;
      case "top-right":
        o2(t3, i3, c2);
        break;
      case "bottom-right":
        o2(t3, i3, -c2);
    }
    return kt(e5, r5, t3), e5;
  };
}();
function bt(t3, e5, r5) {
  return Z(t3, e5), t3.rotation += r5, t3;
}
function wt(t3, e5, r5) {
  return Z(t3, e5), t3.rotation = r5, t3;
}
var dt = function() {
  const t3 = n3();
  return function(e5, r5, n6, o4, a4) {
    return Z(e5, r5), isNaN(n6) || 0 === n6 || (At(t3, o4, r5, a4), e5.scale = r5.scale * n6, St(t3, t3, e5, a4), kt(e5, e5, o2(t3, t3[0] - o4[0], o4[1] - t3[1]))), e5;
  };
}();
function jt(t3, e5, r5) {
  return Z(t3, e5), t3.scale = r5, t3;
}
var Gt = function() {
  const t3 = n3();
  return function(e5, r5, n6, o4, a4, i3) {
    return Z(e5, r5), isNaN(n6) || 0 === n6 || (At(t3, a4, r5, i3), e5.scale = r5.scale * n6, e5.rotation += o4, St(t3, t3, e5, i3), kt(e5, e5, o2(t3, t3[0] - a4[0], a4[1] - t3[1]))), e5;
  };
}();
var Rt = function() {
  const t3 = n3(), e5 = n3();
  return function(r5, n6, o4, a4, i3, c2, s4) {
    return rt(e5, c2, s4), u2(t3, i3, e5), a4 ? Gt(r5, n6, o4, a4, t3, c2) : dt(r5, n6, o4, t3, c2);
  };
}();
var At = function() {
  const t3 = e4();
  return function(e5, r5, n6, o4) {
    return S(e5, r5, et(t3, n6, o4, 1));
  };
}();
var St = function() {
  const t3 = e4();
  return function(e5, r5, n6, o4) {
    return S(e5, r5, lt(t3, n6, o4, 1));
  };
}();
var kt = function() {
  const t3 = n3(), e5 = e4();
  return function(r5, n6, o4) {
    Z(r5, n6);
    const a4 = ot(n6), i3 = r5.targetGeometry;
    return M(e5, it(n6)), c(e5, e5, r3(a4, a4)), S(t3, o4, e5), i3.x += t3[0], i3.y += t3[1], r5;
  };
}();

export {
  m,
  e4 as e,
  H,
  Y,
  Z,
  $,
  _3 as _,
  tt,
  rt,
  ot,
  at,
  ut,
  lt,
  ft,
  mt,
  yt,
  pt,
  gt,
  xt,
  ht,
  bt,
  wt,
  jt,
  Gt,
  Rt,
  kt
};
//# sourceMappingURL=chunk-6MJJJBRX.js.map
