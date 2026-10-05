import {
  t as t2
} from "./chunk-2S5SXLL5.js";
import {
  t
} from "./chunk-QEKSQ5XF.js";
import {
  R
} from "./chunk-5AO6PKWA.js";
import {
  p
} from "./chunk-4QNJMPNJ.js";
import {
  d2 as d
} from "./chunk-U4IA2IP4.js";
import {
  I,
  U,
  V
} from "./chunk-IMLUWAKH.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/query/operations/queryTopFeatures.js
var u = "Layer does not support extent calculation.";
function y(t3, e) {
  const r = t3.geometry, o = t3.toJSON(), s = o;
  if (null != r && (s.geometry = JSON.stringify(r), s.geometryType = p(r), s.inSR = d(r.spatialReference)), o.topFilter?.groupByFields && (s.topFilter.groupByFields = o.topFilter.groupByFields.join(",")), o.topFilter?.orderByFields && (s.topFilter.orderByFields = o.topFilter.orderByFields.join(",")), o.topFilter && (s.topFilter = JSON.stringify(s.topFilter)), o.objectIds && (s.objectIds = o.objectIds.join(",")), o.orderByFields && (s.orderByFields = o.orderByFields.join(",")), o.outFields && !(e?.returnCountOnly || e?.returnExtentOnly || e?.returnIdsOnly) ? o.outFields.includes("*") ? s.outFields = "*" : s.outFields = o.outFields.join(",") : delete s.outFields, o.outSR ? s.outSR = d(o.outSR) : r && o.returnGeometry && (s.outSR = s.inSR), o.returnGeometry && delete o.returnGeometry, o.timeExtent) {
    const t4 = o.timeExtent, { start: e2, end: r2 } = t4;
    null == e2 && null == r2 || (s.time = e2 === r2 ? e2 : `${e2 ?? "null"},${r2 ?? "null"}`), delete o.timeExtent;
  }
  return s;
}
function p2(t3, e, r, n) {
  return __async(this, null, function* () {
    const o = yield a(t3, e, "json", n);
    return t2(e, r, o.data), o;
  });
}
function m(t3, e, r) {
  return __async(this, null, function* () {
    return null != e.timeExtent && e.timeExtent.isEmpty ? { data: { objectIds: [] } } : a(t3, e, "json", r, { returnIdsOnly: true });
  });
}
function d2(t3, e, r) {
  return __async(this, null, function* () {
    return null != e.timeExtent && e.timeExtent.isEmpty ? { data: { count: 0, extent: null } } : a(t3, e, "json", r, { returnExtentOnly: true, returnCountOnly: true }).then((t4) => {
      const e2 = t4.data;
      if (e2.hasOwnProperty("extent"))
        return t4;
      if (e2.features)
        throw new Error(u);
      if (e2.hasOwnProperty("count"))
        throw new Error(u);
      return t4;
    });
  });
}
function c(t3, e, r) {
  return null != e.timeExtent && e.timeExtent.isEmpty ? Promise.resolve({ data: { count: 0 } }) : a(t3, e, "json", r, { returnIdsOnly: true, returnCountOnly: true });
}
function a(n, i, l, u2 = {}, p3 = {}) {
  const m2 = "string" == typeof n ? I(n) : n, d3 = i.geometry ? [i.geometry] : [];
  return u2.responseType = "json", R(d3, null, u2).then((e) => {
    const n2 = e?.[0];
    null != n2 && ((i = i.clone()).geometry = n2);
    const o = t(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, m2.query), { f: l }), p3), y(i, p3)));
    return U(V(m2.path, "queryTopFeatures"), __spreadProps(__spreadValues({}, u2), { query: __spreadValues(__spreadValues({}, o), u2.query) }));
  });
}

export {
  p2 as p,
  m,
  d2 as d,
  c
};
//# sourceMappingURL=chunk-3SMHH7TI.js.map
