import {
  K,
  N
} from "./chunk-J2BM4BJ4.js";
import {
  R
} from "./chunk-BYMJUQYJ.js";
import {
  f
} from "./chunk-YKH4U5BK.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/portal/support/portalItemUtils.js
function o(o2) {
  return __async(this, null, function* () {
    const i2 = o2.spatialReference;
    if (i2.isWGS84)
      return o2.clone();
    if (i2.isWebMercator)
      return R(o2);
    const s2 = f.WGS84;
    return yield N(i2, s2), K(o2, s2);
  });
}
function i(e, t) {
  if (!s(e, t)) {
    const r = e.typeKeywords;
    r ? r.push(t) : e.typeKeywords = [t];
  }
}
function s(e, t) {
  return !!e.typeKeywords?.includes(t);
}
function c(e) {
  return s(e, f2.HOSTED_SERVICE);
}
function a(e, t) {
  const r = e.typeKeywords;
  if (r) {
    const e2 = r.indexOf(t);
    e2 > -1 && r.splice(e2, 1);
  }
}
function u(e, t, r) {
  r ? i(e, t) : a(e, t);
}
function l(e) {
  return __async(this, null, function* () {
    const t = e.clone().normalize();
    let r;
    if (t.length > 1)
      for (const n of t)
        r ? n.width > r.width && (r = n) : r = n;
    else
      r = t[0];
    return o(r);
  });
}
var f2 = { DEVELOPER_BASEMAP: "DeveloperBasemap", JSAPI: "ArcGIS API for JavaScript", METADATA: "Metadata", MULTI_LAYER: "Multilayer", SINGLE_LAYER: "Singlelayer", TABLE: "Table", HOSTED_SERVICE: "Hosted Service", LOCAL_SCENE: "ViewingMode-Local", TILED_IMAGERY: "Tiled Imagery", GROUP_LAYER_MAP: "Map" };
function p(e) {
  const { portal: t, isOrgItem: r, itemControl: n } = e, o2 = t.user?.privileges;
  let i2 = !o2 || o2.includes("features:user:edit"), s2 = !!r && !!o2?.includes("features:user:fullEdit");
  const c2 = "update" === n || "admin" === n;
  return c2 ? s2 = i2 = true : s2 && (i2 = true), { features: { edit: i2, fullEdit: s2 }, content: { updateItem: c2 } };
}

export {
  i,
  s,
  c,
  a,
  u,
  l,
  f2 as f,
  p
};
//# sourceMappingURL=chunk-5EK2HSR2.js.map
