import {
  i,
  l,
  p,
  r as r2,
  u as u2,
  w
} from "./chunk-PU6UZUCG.js";
import {
  I,
  m,
  y2
} from "./chunk-YQO3SAYJ.js";
import "./chunk-JIWQBAAB.js";
import "./chunk-KDIKUJSE.js";
import "./chunk-VKC2IPZH.js";
import "./chunk-B4YHNVRO.js";
import "./chunk-QH56RTNI.js";
import "./chunk-MTLYKSZ6.js";
import {
  x
} from "./chunk-YTC5APIA.js";
import "./chunk-4AU4YV3O.js";
import "./chunk-QUJPV6JW.js";
import {
  d,
  y
} from "./chunk-FTWQYERS.js";
import {
  u
} from "./chunk-UER5KWEB.js";
import "./chunk-5YCNWSDC.js";
import "./chunk-N62TCV6V.js";
import "./chunk-MACNJI7G.js";
import {
  r
} from "./chunk-S4GE7GP5.js";
import "./chunk-OG5YPY7V.js";
import "./chunk-QNED4CTP.js";
import "./chunk-LKQQQES5.js";
import "./chunk-GF2XXTDU.js";
import "./chunk-RIFP6ALC.js";
import "./chunk-T5JXEROT.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-JJ2NMOGF.js";
import "./chunk-IIZACZCL.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-GPPG4D7S.js";
import "./chunk-V7FXKYLS.js";
import "./chunk-2AR2ZIQP.js";
import "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
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
import "./chunk-6GPIXQSV.js";
import {
  a
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/smartMapping/renderers/support/referenceSizeUtils.js
var o;
function s2(e) {
  switch (e) {
    case "circle":
      return { rings: [[[8.5, 0.2], [7.06, 0.33], [5.66, 0.7], [4.35, 1.31], [3.16, 2.14], [2.14, 3.16], [1.31, 4.35], [0.7, 5.66], [0.33, 7.06], [0.2, 8.5], [0.33, 9.94], [0.7, 11.34], [1.31, 12.65], [2.14, 13.84], [3.16, 14.86], [4.35, 15.69], [5.66, 16.3], [7.06, 16.67], [8.5, 16.8], [9.94, 16.67], [11.34, 16.3], [12.65, 15.69], [13.84, 14.86], [14.86, 13.84], [15.69, 12.65], [16.3, 11.34], [16.67, 9.94], [16.8, 8.5], [16.67, 7.06], [16.3, 5.66], [15.69, 4.35], [14.86, 3.16], [13.84, 2.14], [12.65, 1.31], [11.34, 0.7], [9.94, 0.33], [8.5, 0.2]]] };
    case "square":
      return { rings: [[[0.5, 0.5], [0.5, 16.5], [16.5, 16.5], [16.5, 0.5], [0.5, 0.5]]] };
    case "diamond":
      return { rings: [[[8.5, 0.5], [0.2, 8.5], [8.5, 16.5], [16.5, 8.5], [8.5, 0.5]]] };
    case "hexagon-pointy":
      return { rings: [[[15.86, 12.75], [15.86, 4.25], [8.5, 0], [1.14, 4.25], [1.14, 12.75], [8.5, 17], [15.86, 12.75]]] };
    case "hexagon-flat":
      return { rings: [[[12.75, 15.86], [17, 8.5], [12.75, 1.14], [4.25, 1.14], [0, 8.5], [4.25, 15.86], [12.75, 15.86]]] };
  }
}
function y3(e) {
  return "CIMVectorMarker" === e?.type ? e.markerGraphics?.[0] : void 0;
}
function p2(e) {
  return "CIMPolygonSymbol" === e?.symbol?.type ? e.symbol.symbolLayers?.[0] : void 0;
}
function f(e, r3) {
  "CIMVectorMarker" === e?.type && null != r3 && (e.size = r3);
}
function v(e, r3) {
  const n = y3(e);
  n && null != r3 && (n.geometry = s2(r3));
}
function S(e, r3) {
  const n = p2(y3(e));
  n && null != r3 && (n.color = r3.toArray());
}
function z(e, r3, n) {
  const t = p2(y3(e));
  t && null != r3 && n && (t.colorLocked = r3);
}
function d3(e, n) {
  const { outerRingSize: t, innerDotSize: i2, type: a3, color: l2, colorLocked: s3, primitiveOverrides: m2 } = n, c = "CIMPolygonSymbol" === e.data.symbol?.type ? e.data.symbol.symbolLayers : null;
  if (2 === c?.length)
    for (const r3 of c) {
      const e2 = r3.primitiveName === o.OuterRing;
      f(r3, e2 ? t : i2), v(r3, a3), S(r3, l2), z(r3, s3, e2);
    }
  return null != t && null != i2 && (e.data.primitiveOverrides = null), void 0 !== m2 && (e.data.primitiveOverrides = a(m2)), e;
}
!function(e) {
  e.OuterRing = "reference-size-outer-ring", e.InnerDot = "reference-size-inner-dot";
}(o || (o = {}));

// node_modules/@arcgis/core/widgets/Legend/support/sizeRampUtils.js
var b = 30;
var h = 12;
var d4 = 24;
var w2 = [255, 255, 255];
var S2 = [200, 200, 200];
var g = [128, 128, 128];
var v2 = 20;
var z2 = 5;
function j(e) {
  return "esri.symbols.SimpleMarkerSymbol" === e.declaredClass;
}
function k(e) {
  return "esri.symbols.PictureMarkerSymbol" === e.declaredClass;
}
function V(e) {
  return "esri.symbols.SimpleLineSymbol" === e.declaredClass;
}
function x2(e) {
  return "esri.symbols.TextSymbol" === e.declaredClass;
}
function I2(e, l2) {
  const t = e.length - 1;
  return e.map((e2, n) => r2(e2, n, t, l2));
}
function L(e, l2, n, o2, i2, s3, c) {
  return __async(this, null, function* () {
    const m2 = l2.legendOptions, p3 = m2?.customValues, f2 = c || (yield D(e, n)), y4 = l2.stops, b2 = !!f2, h2 = !!p3, w3 = null != l2.minSize && null != l2.maxSize, S3 = y4 && y4.length > 1, g2 = !!l2.target;
    if (!b2 || !h2 && !(w3 || S3 && !g2))
      return;
    const v3 = y2(f2);
    let z3 = false, j2 = null, k2 = null;
    j2 = v3 && !S3 ? u2([l2.minDataValue, l2.maxDataValue]) : p3 ?? (yield T(l2, f2, o2, i2?.type));
    const V2 = e?.authoringInfo, x3 = "univariate-color-size" === V2?.type, L2 = x3 && "above-and-below" === V2?.univariateTheme, q2 = !!w(e);
    if (!j2 && S3 && (j2 = y4.map((e2) => e2.value), z3 = y4.some((e2) => !!e2.label), "flow" === e.type && (j2 = u2(j2)), z3 && (k2 = y4.map((e2) => e2.label))), v3 && null != j2 && j2?.length > 2 && !L2 && (j2 = [j2[0], j2[j2.length - 1]]), !j2)
      return null;
    x3 && 5 !== j2?.length && (j2 = P({ minSize: j2[0], maxSize: j2[j2.length - 1] }));
    const B2 = v3 ? U(e, j2) : null, E2 = m(f2), R2 = z3 ? null : I2(j2, s3);
    return (yield Promise.all(j2.map((t, s4) => __async(this, null, function* () {
      const r3 = v3 ? B2[s4] : yield H(l2, f2, t, o2, i2?.type);
      return { value: t, symbol: !q2 || "class-breaks" !== e.type && "unique-value" !== e.type ? O(L2 && "class-breaks" === e.type ? C(e, s4) : f2, r3) : M(e, r3, l2.maxSize, n) ?? f2, label: z3 ? k2[s4] : R2[s4], size: q2 ? d4 : r3, outlineSize: E2 };
    })))).reverse();
  });
}
function U(e, l2) {
  const t = e?.authoringInfo, n = "univariate-color-size" === t?.type;
  let o2 = [h, b];
  if (n) {
    const e2 = l2[0], t2 = l2[l2.length - 1], n2 = h, i2 = b;
    o2 = l2.map((l3) => n2 + (l3 - e2) / (t2 - e2) * (i2 - n2));
  }
  return n && "below" === t?.univariateTheme && o2.reverse(), o2;
}
function M(l2, t, n, o2) {
  const s3 = "class-breaks" === l2.type, r3 = s3 ? l2.classBreakInfos?.[0]?.symbol?.clone() : l2.uniqueValueInfos?.[0]?.symbol?.clone();
  return r3 && "type" in r3 && "cim" === r3.type ? (d3(r3, { color: o2 ?? (s3 ? null : new u(S2)), innerDotSize: t * (d4 / n) || 1, outerRingSize: d4 }), r3) : null;
}
function C(e, l2) {
  const t = e.classBreakInfos, n = t.length, o2 = n < 2 || !(l2 >= 2) ? t[0].symbol.clone() : t[n - 1].symbol.clone();
  return e.visualVariables.some((e2) => "color" === e2.type) && (o2.type.includes("3d") ? B(o2) : E(o2)), o2;
}
function D(e, l2) {
  return __async(this, null, function* () {
    if ("flow" === e.type)
      return p(e, l2);
    if ("pie-chart" === e.type)
      return new y({ color: null, outline: e.outline?.width ? e.outline : new d() });
    let t = null, n = null;
    if ("simple" === e.type)
      t = e.symbol;
    else if ("class-breaks" === e.type) {
      const l3 = e.classBreakInfos;
      t = l3 && l3[0] && l3[0].symbol, n = l3.length > 1;
    } else if ("unique-value" === e.type) {
      const l3 = e.uniqueValueInfos;
      t = l3?.[0]?.symbol, n = null != l3 && l3.length > 1;
    }
    return !t || q(t) ? null : (t = t.clone(), (l2 || n) && (t.type.includes("3d") ? B(t) : E(t)), t);
  });
}
function q(e) {
  if (e) {
    if (x(e)) {
      return !!e.symbolLayers && e.symbolLayers.some((e2) => e2 && "fill" === e2.type);
    }
    return e.type.includes("fill");
  }
  return false;
}
function B(e) {
  "line-3d" === e.type ? e.symbolLayers.forEach((e2) => {
    e2.material = { color: g };
  }) : e.symbolLayers.forEach((e2) => {
    "icon" !== e2.type || e2.resource?.href ? e2.material = { color: S2 } : (e2.material = { color: w2 }, e2.outline = { color: g, size: 1.5 });
  });
}
function E(l2) {
  const t = r();
  if ("cim" === l2.type)
    I(l2, new u(S2));
  else if (l2.type.includes("line"))
    l2.color = g;
  else if (l2.color = t ? g : w2, "simple-marker" === l2.type)
    if (l2.outline) {
      const e = l2.outline?.color?.toHex();
      "#ffffff" === e && (l2.outline.color = g);
    } else
      l2.outline = { color: g, width: 1.5 };
}
function T(e, l2, n, o2) {
  return __async(this, null, function* () {
    const i2 = (yield import("./chunk-FJLW3VNB.js")).getSizeRangeAtScale(e, n, o2), s3 = i2 && P(i2);
    if (!i2 || !s3)
      return;
    let r3 = s3.map((l3) => R(l3, e, i2));
    r3 = u2(r3);
    for (let t = 1; t < r3.length - 1; t++) {
      const i3 = yield A(e, l2, r3[t], r3[t - 1], n, o2);
      i3 && (r3[t] = i3[0], s3[t] = i3[1]);
    }
    return r3;
  });
}
function P(e) {
  const l2 = e.minSize, t = e.maxSize, n = z2, o2 = (t - l2) / (n - 1), i2 = [];
  for (let s3 = 0; s3 < n; s3++)
    i2.push(l2 + o2 * s3);
  return i2;
}
function R(e, l2, t) {
  const n = t.minSize, o2 = t.maxSize, i2 = l2.minDataValue, s3 = l2.maxDataValue;
  let r3;
  if (e <= n)
    r3 = i2;
  else if (e >= o2)
    r3 = s3;
  else {
    r3 = (e - n) / (o2 - n) * (s3 - i2) + i2;
  }
  return r3;
}
function A(e, l2, i2, s3, r3, a3) {
  return __async(this, null, function* () {
    const u3 = yield H(e, l2, i2, r3, a3), c = yield H(e, l2, s3, r3, a3), m2 = i(i2), p3 = m2.fractional, f2 = v2;
    let y4 = m2.integer, b2 = null, h2 = null;
    i2 > 0 && i2 < 1 && (b2 = 10 ** p3, y4 = i(i2 *= b2).integer);
    for (let n = y4 - 1; n >= 0; n--) {
      const s4 = 10 ** n;
      let m3 = Math.floor(i2 / s4) * s4, p4 = Math.ceil(i2 / s4) * s4;
      null != b2 && (m3 /= b2, p4 /= b2);
      let y5 = (m3 + p4) / 2;
      [, y5] = u2([m3, y5, p4], { indexes: [1] });
      const d5 = yield H(e, l2, m3, r3, a3), w3 = yield H(e, l2, p4, r3, a3), S3 = yield H(e, l2, y5, r3, a3), g2 = l(u3, d5, c, null), v3 = l(u3, w3, c, null), z3 = l(u3, S3, c, null);
      let j2 = g2.previous <= f2, k2 = v3.previous <= f2;
      if (j2 && k2 && (g2.previous <= v3.previous ? (j2 = true, k2 = false) : (k2 = true, j2 = false)), j2 ? h2 = [m3, d5] : k2 ? h2 = [p4, w3] : z3.previous <= f2 && (h2 = [y5, S3]), h2)
        break;
    }
    return h2;
  });
}
function H(e, l2, t, n, o2) {
  return __async(this, null, function* () {
    const { getSize: i2 } = yield import("./chunk-FJLW3VNB.js");
    return i2(e, t, { scale: n, view: o2, shape: "simple-marker" === l2.type ? l2.style : null });
  });
}
function O(e, t) {
  const n = e.clone();
  if (x(n))
    y2(n) || n.symbolLayers.forEach((e2) => {
      "fill" !== e2.type && (e2.size = t);
    });
  else if (j(n))
    n.size = t;
  else if (k(n)) {
    const e2 = n.width, l2 = n.height;
    n.height = t, n.width = t * (e2 / l2);
  } else
    V(n) ? n.width = t : x2(n) && n.font && (n.font.size = t);
  return n;
}
export {
  L as getRampStops,
  M as getReferenceSizeSymbol,
  b as realWorldMaxSize,
  h as realWorldMinSize
};
//# sourceMappingURL=chunk-OUZYDUGP.js.map
