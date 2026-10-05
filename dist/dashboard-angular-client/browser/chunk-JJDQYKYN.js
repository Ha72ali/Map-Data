import {
  U,
  t2 as t
} from "./chunk-IMLUWAKH.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/layerUtils.js
function c(e) {
  return null != e && "object" == typeof e && "type" in e && "subtype-group" === e.type && "sublayers" in e;
}
function l(e) {
  return "subtype-sublayer" === e?.type;
}
var g = { Point: "SceneLayer", "3DObject": "SceneLayer", IntegratedMesh: "IntegratedMeshLayer", PointCloud: "PointCloudLayer", Building: "BuildingSceneLayer" };
function b(e) {
  const t2 = e?.type;
  return "building-scene" === t2 || "integrated-mesh" === t2 || "point-cloud" === t2 || "scene" === t2;
}
function w(e) {
  return "feature" === e?.type && !e.url && "memory" === e.source?.type;
}
function L(e) {
  return ("feature" === e?.type || "subtype-group" === e?.type) && "feature-layer" === e.source?.type;
}
function x(n, r) {
  return __async(this, null, function* () {
    const i = t?.findServerInfo(n);
    if (null != i?.currentVersion)
      return i.owningSystemUrl || null;
    const u = n.toLowerCase().indexOf("/rest/services");
    if (-1 === u)
      return null;
    const s = `${n.substring(0, u)}/rest/info`, a = null != r ? r.signal : null, { data: o } = yield U(s, { query: { f: "json" }, responseType: "json", signal: a });
    return o?.owningSystemUrl || null;
  });
}
function I(e) {
  if (!("capabilities" in e))
    return false;
  switch (e.type) {
    case "catalog":
    case "catalog-footprint":
    case "csv":
    case "feature":
    case "geojson":
    case "imagery":
    case "knowledge-graph-sublayer":
    case "ogc-feature":
    case "oriented-imagery":
    case "scene":
    case "sublayer":
    case "subtype-group":
    case "subtype-sublayer":
    case "wfs":
      return true;
    default:
      return false;
  }
}
function O(e) {
  return I(e) ? "effectiveCapabilities" in e ? e.effectiveCapabilities : e.capabilities : null;
}
function T(e) {
  if (!("editingEnabled" in e))
    return false;
  switch (e.type) {
    case "csv":
    case "feature":
    case "geojson":
    case "oriented-imagery":
    case "scene":
    case "subtype-group":
    case "subtype-sublayer":
      return true;
    default:
      return false;
  }
}
function B(e) {
  return !!T(e) && ("effectiveEditingEnabled" in e ? e.effectiveEditingEnabled : e.editingEnabled);
}

export {
  c,
  l,
  g,
  b,
  w,
  L,
  x,
  O,
  B
};
//# sourceMappingURL=chunk-JJDQYKYN.js.map
