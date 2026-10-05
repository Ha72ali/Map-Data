import {
  n as n2,
  t as t2
} from "./chunk-TZAZZESF.js";
import {
  a2 as a,
  a3 as a2,
  d
} from "./chunk-CVXOA75V.js";
import {
  I,
  c,
  l,
  w
} from "./chunk-73TPF7EF.js";
import {
  I as I2
} from "./chunk-UFOODLAV.js";
import "./chunk-CQTYIZO2.js";
import {
  O as O2
} from "./chunk-GB4LBHXK.js";
import {
  e
} from "./chunk-7SWIYTU2.js";
import "./chunk-UNQDGSIB.js";
import "./chunk-MCOJADCH.js";
import "./chunk-KM4FMHCK.js";
import "./chunk-GV5YYV7L.js";
import "./chunk-WDDSREVG.js";
import "./chunk-B57GXBST.js";
import "./chunk-FLQEN5HO.js";
import "./chunk-UER5KWEB.js";
import "./chunk-EFPJQTVN.js";
import "./chunk-GKEPJ7SJ.js";
import {
  n
} from "./chunk-FDJTONGZ.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-JJ2NMOGF.js";
import "./chunk-XVLLO5NS.js";
import "./chunk-IIZACZCL.js";
import "./chunk-SOEKEBD6.js";
import "./chunk-VNWT22OX.js";
import {
  E
} from "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import {
  f
} from "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
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
import {
  O,
  t3 as t
} from "./chunk-7JFKWLN7.js";
import "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/views/3d/layers/i3s/PointCloudWorkerUtil.js
function i(t3, n3, l2, s) {
  const { rendererJSON: i2, isRGBRenderer: u2 } = t3;
  let c4 = null, a4 = null;
  if (n3 && u2)
    c4 = n3;
  else if (n3 && "pointCloudUniqueValueRenderer" === i2?.type) {
    a4 = a2.fromJSON(i2);
    const e2 = a4.colorUniqueValueInfos;
    c4 = new Uint8Array(3 * s);
    const r = d2(a4.fieldTransformType);
    for (let o = 0; o < s; o++) {
      const t4 = (r ? r(n3[o]) : n3[o]) + "";
      for (let r2 = 0; r2 < e2.length; r2++)
        if (e2[r2].values.includes(t4)) {
          c4[3 * o] = e2[r2].color.r, c4[3 * o + 1] = e2[r2].color.g, c4[3 * o + 2] = e2[r2].color.b;
          break;
        }
    }
  } else if (n3 && "pointCloudStretchRenderer" === i2?.type) {
    a4 = a.fromJSON(i2);
    const e2 = a4.stops;
    c4 = new Uint8Array(3 * s);
    const o = d2(a4.fieldTransformType);
    for (let r = 0; r < s; r++) {
      const t4 = o ? o(n3[r]) : n3[r], l3 = e2.length - 1;
      if (t4 < e2[0].value)
        c4[3 * r] = e2[0].color.r, c4[3 * r + 1] = e2[0].color.g, c4[3 * r + 2] = e2[0].color.b;
      else if (t4 >= e2[l3].value)
        c4[3 * r] = e2[l3].color.r, c4[3 * r + 1] = e2[l3].color.g, c4[3 * r + 2] = e2[l3].color.b;
      else
        for (let o2 = 1; o2 < e2.length; o2++)
          if (t4 < e2[o2].value) {
            const n4 = (t4 - e2[o2 - 1].value) / (e2[o2].value - e2[o2 - 1].value);
            c4[3 * r] = e2[o2].color.r * n4 + e2[o2 - 1].color.r * (1 - n4), c4[3 * r + 1] = e2[o2].color.g * n4 + e2[o2 - 1].color.g * (1 - n4), c4[3 * r + 2] = e2[o2].color.b * n4 + e2[o2 - 1].color.b * (1 - n4);
            break;
          }
    }
  } else if (n3 && "pointCloudClassBreaksRenderer" === i2?.type) {
    a4 = d.fromJSON(i2);
    const r = a4.colorClassBreakInfos;
    c4 = new Uint8Array(3 * s);
    const o = d2(a4.fieldTransformType);
    for (let e2 = 0; e2 < s; e2++) {
      const t4 = o ? o(n3[e2]) : n3[e2];
      for (let o2 = 0; o2 < r.length; o2++)
        if (t4 >= r[o2].minValue && t4 <= r[o2].maxValue) {
          c4[3 * e2] = r[o2].color.r, c4[3 * e2 + 1] = r[o2].color.g, c4[3 * e2 + 2] = r[o2].color.b;
          break;
        }
    }
  } else
    c4 = new Uint8Array(3 * s).fill(255);
  if (l2 && a4?.colorModulation) {
    const e2 = a4.colorModulation.minValue, r = a4.colorModulation.maxValue, o = 0.3;
    for (let t4 = 0; t4 < s; t4++) {
      const n4 = l2[t4], s2 = n4 >= r ? 1 : n4 <= e2 ? o : o + (1 - o) * (n4 - e2) / (r - e2);
      c4[3 * t4] = s2 * c4[3 * t4], c4[3 * t4 + 1] = s2 * c4[3 * t4 + 1], c4[3 * t4 + 2] = s2 * c4[3 * t4 + 2];
    }
  }
  return c4;
}
function u(e2, r) {
  if (null == e2.encoding || "" === e2.encoding) {
    const o = w(r, e2);
    if (null == o.vertexAttributes.position)
      return;
    const l2 = l(r, o.vertexAttributes.position), s = o.header.fields, i2 = [s.offsetX, s.offsetY, s.offsetZ], u2 = [s.scaleX, s.scaleY, s.scaleZ], c4 = l2.length / 3, a4 = new Float64Array(3 * c4);
    for (let e3 = 0; e3 < c4; e3++)
      a4[3 * e3] = l2[3 * e3] * u2[0] + i2[0], a4[3 * e3 + 1] = l2[3 * e3 + 1] * u2[1] + i2[1], a4[3 * e3 + 2] = l2[3 * e3 + 2] * u2[2] + i2[2];
    return a4;
  }
  if ("lepcc-xyz" === e2.encoding)
    return c(r).result;
}
function c2(e2, r, o) {
  return e2?.attributeInfo.useElevation ? r ? a3(r, o) : null : e2?.attributeInfo.storageInfo ? I(e2.attributeInfo.storageInfo, e2.buffer, o) : null;
}
function a3(e2, r) {
  const o = new Float64Array(r);
  for (let t3 = 0; t3 < r; t3++)
    o[t3] = e2[3 * t3 + 2];
  return o;
}
function f2(e2, r, o, t3, n3) {
  const l2 = e2.length / 3;
  let s = 0;
  for (let i2 = 0; i2 < l2; i2++) {
    let l3 = true;
    for (let e3 = 0; e3 < t3.length && l3; e3++) {
      const { filterJSON: r2 } = t3[e3], o2 = n3[e3].values[i2];
      switch (r2.type) {
        case "pointCloudValueFilter": {
          const e4 = "exclude" === r2.mode;
          r2.values.includes(o2) === e4 && (l3 = false);
          break;
        }
        case "pointCloudBitfieldFilter": {
          const e4 = p(r2.requiredSetBits), t4 = p(r2.requiredClearBits);
          ((o2 & e4) !== e4 || o2 & t4) && (l3 = false);
          break;
        }
        case "pointCloudReturnFilter": {
          const e4 = 15 & o2, t4 = o2 >>> 4 & 15, n4 = t4 > 1, s2 = 1 === e4, i3 = e4 === t4;
          let u2 = false;
          for (const o3 of r2.includedReturns)
            if ("last" === o3 && i3 || "firstOfMany" === o3 && s2 && n4 || "lastOfMany" === o3 && i3 && n4 || "single" === o3 && !n4) {
              u2 = true;
              break;
            }
          u2 || (l3 = false);
          break;
        }
      }
    }
    l3 && (o[s] = i2, e2[3 * s] = e2[3 * i2], e2[3 * s + 1] = e2[3 * i2 + 1], e2[3 * s + 2] = e2[3 * i2 + 2], r[3 * s] = r[3 * i2], r[3 * s + 1] = r[3 * i2 + 1], r[3 * s + 2] = r[3 * i2 + 2], s++);
  }
  return s;
}
function d2(e2) {
  switch (e2) {
    default:
    case null:
    case "none":
      return (e3) => e3;
    case "low-four-bit":
      return (e3) => 15 & e3;
    case "high-four-bit":
      return (e3) => (240 & e3) >> 4;
    case "absolute-value":
      return (e3) => Math.abs(e3);
    case "modulo-ten":
      return (e3) => e3 % 10;
  }
}
function p(e2) {
  let r = 0;
  for (const o of e2 || [])
    r |= 1 << o;
  return r;
}

// node_modules/@arcgis/core/views/3d/layers/PointCloudWorker.js
var c3 = class {
  transform(t3) {
    const e2 = this._transform(t3), o = [e2.points.buffer, e2.rgb.buffer];
    null != e2.pointIdFilterMap && o.push(e2.pointIdFilterMap.buffer);
    for (const a4 of e2.attributes)
      "buffer" in a4.values && t(a4.values.buffer) && a4.values.buffer !== e2.rgb.buffer && o.push(a4.values.buffer);
    return Promise.resolve({ result: e2, transferList: o });
  }
  _transform(r) {
    const e2 = u(r.schema, r.geometryBuffer);
    let o = e2.length / 3, a4 = null;
    const i2 = new Array(), f3 = c2(r.primaryAttributeData, e2, o);
    null != r.primaryAttributeData && f3 && i2.push({ attributeInfo: r.primaryAttributeData.attributeInfo, values: f3 });
    const s = c2(r.modulationAttributeData, e2, o);
    null != r.modulationAttributeData && s && i2.push({ attributeInfo: r.modulationAttributeData.attributeInfo, values: s });
    let c4 = i(r.rendererInfo, f3, s, o);
    if (r.filterInfo && r.filterInfo.length > 0 && null != r.filterAttributesData) {
      const f4 = r.filterAttributesData.filter(O).map((t3) => {
        const r2 = c2(t3, e2, o), a5 = { attributeInfo: t3.attributeInfo, values: r2 };
        return i2.push(a5), a5;
      });
      a4 = new Uint32Array(o), o = f2(e2, c4, a4, r.filterInfo, f4);
    }
    for (const t3 of r.userAttributesData) {
      const r2 = c2(t3, e2, o);
      i2.push({ attributeInfo: t3.attributeInfo, values: r2 });
    }
    3 * o < c4.length && (c4 = new Uint8Array(c4.buffer.slice(0, 3 * o))), I3(e2, o, r.elevationOffset);
    const A2 = h(e2, o, I2.fromData(r.obbData), f.fromJSON(r.inSR), f.fromJSON(r.outSR));
    return { obbData: r.obbData, points: A2, rgb: c4, attributes: i2, pointIdFilterMap: a4 };
  }
};
function h(t3, r, o, n3, u2) {
  if (!n(t3, n3, 0, t3, u2, 0, r))
    throw new Error("Can't reproject");
  const l2 = t2(o.center), m = n2(), b = n2(), p2 = t2(o.halfSize);
  O2(A, o.quaternion);
  const c4 = new Float32Array(3 * r);
  for (let e2 = 0; e2 < r; e2++) {
    let r2 = 3 * e2;
    m[0] = t3[r2] - l2[0], m[1] = t3[r2 + 1] - l2[1], m[2] = t3[r2 + 2] - l2[2], E(b, m, A), p2[0] = Math.max(p2[0], Math.abs(b[0])), p2[1] = Math.max(p2[1], Math.abs(b[1])), p2[2] = Math.max(p2[2], Math.abs(b[2])), c4[r2++] = m[0], c4[r2++] = m[1], c4[r2] = m[2];
  }
  return o.halfSize = p2, c4;
}
function I3(t3, r, e2) {
  if (0 !== e2)
    for (let o = 0; o < r; o++)
      t3[3 * o + 2] += e2;
}
var A = e();
function g() {
  return new c3();
}
export {
  g as default
};
//# sourceMappingURL=chunk-ETI3F3DK.js.map
