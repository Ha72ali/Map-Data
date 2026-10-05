import {
  S as S2,
  c,
  u as u2
} from "./chunk-SD3ME6MB.js";
import {
  C,
  b as b2,
  b2 as b3,
  c2,
  h,
  h2,
  h3,
  h4,
  i as i2,
  k,
  n,
  w,
  x
} from "./chunk-YTC5APIA.js";
import {
  S,
  d,
  m3 as m,
  y
} from "./chunk-FTWQYERS.js";
import {
  u
} from "./chunk-UER5KWEB.js";
import {
  e as e2,
  i
} from "./chunk-23OIU3O7.js";
import {
  e
} from "./chunk-JAN3F2NY.js";
import {
  b
} from "./chunk-JJDQYKYN.js";
import {
  V
} from "./chunk-ZDVJGW4C.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";

// node_modules/@arcgis/core/symbols/support/defaults3D.js
var u3 = w.fromSimpleMarkerSymbol(S2);
var w2 = b3.fromSimpleLineSymbol(u2);
var S3 = h3.fromSimpleFillSymbol(c);
var b4 = new c2({ symbolLayers: new V([new h({ material: { color: e2 }, edges: new i2({ size: e(1), color: new u(i) }) })]) });
var L = new b3({ symbolLayers: new V([new h2({ material: { color: new u([0, 0, 0]) }, size: e(1) })]) });
var D = new h3({ symbolLayers: new V([new h({ outline: { color: new u([0, 0, 0]), size: e(1) } })]) });

// node_modules/@arcgis/core/symbols/support/symbolConversion.js
var S4 = { retainId: false, ignoreDrivers: false, hasLabelingContext: true };
function g(g2, u4 = S4) {
  if (!g2)
    return { symbol: null };
  const { retainId: d2 = S4.retainId, ignoreDrivers: D2 = S4.ignoreDrivers, hasLabelingContext: j = S4.hasLabelingContext, retainCIM: M = S4.retainCIM, cimFallbackEnabled: C2 = S4.cimFallbackEnabled } = u4;
  let I = null;
  if (x(g2) || g2 instanceof h4)
    I = g2.clone();
  else if ("cim" === g2.type) {
    const o = g2.data?.symbol?.type;
    switch (o) {
      case "CIMPointSymbol":
        I = M ? g2.clone() : w.fromCIMSymbol(g2);
        break;
      case "CIMLineSymbol":
        C2 && (I = L.clone(), u4?.logWarning?.("Unsupported CIM line symbology converted to fallback 3D line symbology"));
        break;
      case "CIMPolygonSymbol":
        C2 && (I = D.clone(), u4?.logWarning?.("Unsupported CIM polygon symbology converted to fallback 3D polygon symbology"));
    }
    if (!I)
      return { error: new s("symbol-conversion:unsupported-cim-symbol", `CIM symbol of type '${o || "unknown"}' is unsupported in 3D`, { symbol: g2 }) };
  } else if (g2 instanceof d)
    I = b3.fromSimpleLineSymbol(g2);
  else if (g2 instanceof y)
    I = w.fromSimpleMarkerSymbol(g2);
  else if (g2 instanceof n)
    I = w.fromPictureMarkerSymbol(g2);
  else if (g2 instanceof S)
    I = u4.geometryType && "mesh" === u4.geometryType ? c2.fromSimpleFillSymbol(g2) : h3.fromSimpleFillSymbol(g2);
  else {
    if (!(g2 instanceof m))
      return { error: new s("symbol-conversion:unsupported-2d-symbol", `2D symbol of type '${g2.type || g2.declaredClass}' is unsupported in 3D`, { symbol: g2 }) };
    I = j ? b2.fromTextSymbol(g2) : w.fromTextSymbol(g2);
  }
  return d2 && I && "cim" !== I.type && (I.id = g2.id), D2 && x(I) && I.symbolLayers.forEach((o) => o.ignoreDrivers = true), { symbol: I };
}

// node_modules/@arcgis/core/symbols/support/jsonUtils.js
function l(o, e3, n2, t) {
  const s2 = a(o, {}, { context: t, isLabelSymbol: false });
  null != s2 && (e3[n2] = s2);
}
function i3(o, e3, n2, t) {
  const s2 = a(o, {}, { context: t, isLabelSymbol: true });
  null != s2 && (e3[n2] = s2);
}
function m2(o) {
  return o instanceof k || o instanceof h4;
}
function a(o, t, r) {
  if (null == o)
    return null;
  const { context: l2, isLabelSymbol: i4 } = r, a2 = l2?.origin, b6 = l2?.messages;
  if ("web-scene" === a2 && !m2(o)) {
    const n2 = g(o, { retainCIM: true, hasLabelingContext: i4 });
    return null != n2.symbol ? n2.symbol.write(t, l2) : (b6?.push(new s("symbol:unsupported", `Symbols of type '${o.declaredClass}' are not supported in scenes. Use 3D symbology instead when working with WebScene and SceneView`, { symbol: o, context: l2, error: n2.error })), null);
  }
  return ("web-map" === a2 || "portal-item" === a2 && !b(l2?.layer)) && m2(o) ? (b6?.push(new s("symbol:unsupported", `Symbols of type '${o.declaredClass}' are not supported in web maps and portal items. Use 2D symbology and CIMSymbol instead when working with MapView`, { symbol: o, context: l2 })), null) : o.write(t, l2);
}
function b5(e3, n2) {
  return C(e3, null, n2);
}

export {
  l,
  i3 as i,
  b5 as b
};
//# sourceMappingURL=chunk-NG4OIOR2.js.map
