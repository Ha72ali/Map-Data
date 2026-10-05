import {
  t
} from "./chunk-MU5T2L2T.js";
import {
  __async,
  __objRest
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/fetchService.js
var a = /* @__PURE__ */ new Set(["Catalog Layer", "Feature Layer", "Oriented Imagery Layer"]);
function t2(a2, t3) {
  return __async(this, null, function* () {
    const _a = t3 || {}, { loadContext: r2 } = _a, n2 = __objRest(_a, ["loadContext"]), c2 = r2 ? yield r2.fetchServiceMetadata(a2, n2) : yield t(a2, n2);
    o(c2), s(c2);
    const y2 = { serviceJSON: c2 };
    if ((c2.currentVersion ?? 0) < 10.5)
      return y2;
    const i2 = `${a2}/layers`, u = r2 ? yield r2.fetchServiceMetadata(i2, n2) : yield t(i2, n2);
    return o(u), s(u), y2.layersJSON = { layers: u.layers, tables: u.tables }, y2;
  });
}
function r(e) {
  const { type: t3 } = e;
  return !!t3 && a.has(t3);
}
function n(e) {
  return "Table" === e.type;
}
function s(e) {
  e.layers = e.layers?.filter(r), e.tables = e.tables?.filter(n);
}
function c(e) {
  e.type ||= "Feature Layer";
}
function y(e) {
  e.type ||= "Table";
}
function o(e) {
  e.layers?.forEach(c), e.tables?.forEach(y);
}
function i(e) {
  switch (e) {
    case "Feature Layer":
    case "Table":
      return "FeatureLayer";
    case "Oriented Imagery Layer":
      return "OrientedImageryLayer";
    case "Catalog Layer":
      return "CatalogLayer";
  }
  return "FeatureLayer";
}

export {
  t2 as t,
  i
};
//# sourceMappingURL=chunk-HGBVGPJC.js.map
