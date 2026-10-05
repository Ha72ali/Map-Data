import {
  o
} from "./chunk-PA7QKZUF.js";

// node_modules/@arcgis/core/rest/query/operations/queryZScale.js
function t(t2, o2, r) {
  if (!r?.features || !r.hasZ)
    return;
  const f = o(r.geometryType, o2, t2.outSpatialReference);
  if (null != f)
    for (const e of r.features)
      f(e.geometry);
}

export {
  t
};
//# sourceMappingURL=chunk-2S5SXLL5.js.map
