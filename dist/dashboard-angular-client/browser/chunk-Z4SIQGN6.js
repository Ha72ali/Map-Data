import {
  $,
  I,
  P,
  c,
  d as d2,
  j,
  l as l2,
  v,
  w,
  y
} from "./chunk-62NZPB4L.js";
import "./chunk-R4ADXNFU.js";
import {
  i as i3
} from "./chunk-A3K4AQEC.js";
import "./chunk-5NJ3TZEU.js";
import "./chunk-6MWDYJDX.js";
import "./chunk-WBMLBIXY.js";
import {
  i,
  t
} from "./chunk-HGBVGPJC.js";
import "./chunk-MU5T2L2T.js";
import {
  a as a2
} from "./chunk-FQNO6QFX.js";
import {
  a,
  f,
  i as i2,
  l,
  u
} from "./chunk-5EK2HSR2.js";
import {
  d
} from "./chunk-LRQVNXVW.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import {
  L
} from "./chunk-JJDQYKYN.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
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
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  O,
  g,
  h
} from "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/save/featureLayerUtils.js
var P2 = "Feature Service";
var E = "feature-layer-utils";
var $2 = `${E}-save`;
var x = `${E}-save-as`;
var N = `${E}-saveall`;
var g2 = `${E}-saveall-as`;
function O2(e) {
  return { isValid: L(e) && ("feature" !== e.type || !e.dynamicDataSource), errorMessage: "Feature layer should be a layer or table in a map or feature service" };
}
function U(e) {
  const r = [], a3 = [];
  for (const { layer: t2, layerJSON: n } of e)
    t2.isTable ? a3.push(n) : r.push(n);
  return { layers: r, tables: a3 };
}
function j2(e) {
  return U([e]);
}
function J(e, r) {
  return __async(this, null, function* () {
    return /\/\d+\/?$/.test(e.url) ? j2(r[0]) : M(r, e);
  });
}
function M(e, r) {
  return __async(this, null, function* () {
    if (e.reverse(), !r)
      return U(e);
    const a3 = yield R(r, e);
    for (const t2 of e)
      k(t2.layer, t2.layerJSON, a3);
    return K(a3, e), a3;
  });
}
function R(e, r) {
  return __async(this, null, function* () {
    let a3 = yield e.fetchData("json");
    if (D(a3))
      return a3;
    a3 ||= {}, F(a3);
    const { layer: { url: t2, customParameters: n, apiKey: o } } = r[0];
    return yield z(a3, { url: t2 ?? "", customParameters: n, apiKey: o }, r.map((e2) => e2.layer.layerId)), a3;
  });
}
function D(e) {
  return !!(e && Array.isArray(e.layers) && Array.isArray(e.tables));
}
function F(e) {
  e.layers ||= [], e.tables ||= [];
}
function K(e, r) {
  const a3 = [], t2 = [];
  for (const { layer: n } of r) {
    const { isTable: e2, layerId: r2 } = n;
    e2 ? t2.push(r2) : a3.push(r2);
  }
  Y(e.layers, a3), Y(e.tables, t2);
}
function Y(r, a3) {
  if (r.length < 2)
    return;
  const t2 = [];
  for (const { id: e } of r)
    t2.push(e);
  h(t2.sort(_), a3.slice().sort(_)) && r.sort((e, r2) => {
    const t3 = a3.indexOf(e.id), n = a3.indexOf(r2.id);
    return t3 < n ? -1 : t3 > n ? 1 : 0;
  });
}
function _(e, r) {
  return e < r ? -1 : e > r ? 1 : 0;
}
function z(e, r, a3) {
  return __async(this, null, function* () {
    const { url: t2, customParameters: n, apiKey: o } = r, { serviceJSON: s2, layersJSON: i4 } = yield t(t2, { customParameters: n, apiKey: o }), l3 = G(e.layers, s2.layers, a3), c2 = G(e.tables, s2.tables, a3);
    e.layers = l3.itemResources, e.tables = c2.itemResources;
    const u2 = [...l3.added, ...c2.added], p = i4 ? [...i4.layers, ...i4.tables] : [];
    yield B(e, u2, t2, p);
  });
}
function G(e, a3, t2) {
  const n = g(e, a3, (e2, r) => e2.id === r.id);
  e = e.filter((e2) => !n.removed.some((r) => r.id === e2.id));
  const o = n.added;
  return o.forEach(({ id: r }) => {
    e.push({ id: r });
  }), { itemResources: e, added: o.filter(({ id: e2 }) => !t2.includes(e2)) };
}
function B(e, r, a3, t2) {
  return __async(this, null, function* () {
    const n = yield V(r), o = r.map(({ id: e2, type: r2 }) => new (n.get(r2))({ url: a3, layerId: e2, sourceJSON: t2.find(({ id: r3 }) => r3 === e2) }));
    yield Promise.allSettled(o.map((e2) => e2.load())), o.forEach((r2) => {
      const { layerId: a4, loaded: t3, defaultPopupTemplate: n2 } = r2;
      if (!t3 || null == n2)
        return;
      const o2 = { id: a4, popupInfo: n2.toJSON() };
      "ArcGISFeatureLayer" !== r2.operationalLayerType && (o2.layerType = r2.operationalLayerType), k(r2, o2, e);
    });
  });
}
function V(e) {
  return __async(this, null, function* () {
    const r = [];
    e.forEach(({ type: e2 }) => {
      const a4 = i(e2), t3 = a2[a4];
      r.push(t3());
    });
    const a3 = yield Promise.all(r), t2 = /* @__PURE__ */ new Map();
    return e.forEach(({ type: e2 }, r2) => {
      t2.set(e2, a3[r2]);
    }), t2;
  });
}
function k(e, r, a3) {
  e.isTable ? q(a3.tables, r) : q(a3.layers, r);
}
function q(e, r) {
  const a3 = e.findIndex(({ id: e2 }) => e2 === r.id);
  -1 === a3 ? e.push(r) : e[a3] = r;
}
function C(e, r) {
  if (!e.length)
    throw new s(`${r}:missing-parameters`, "'layers' array should contain at least one feature layer");
}
function H(e, r) {
  const a3 = e.map((e2) => e2.portalItem.id);
  if (new Set(a3).size > 1)
    throw new s(`${r}:invalid-parameters`, "All layers in the 'layers' array should be loaded from the same portal item");
}
function Q(e, r) {
  const a3 = e.map((e2) => e2.layerId);
  if (new Set(a3).size !== a3.length)
    throw new s(`${r}:invalid-parameters`, "'layers' array should contain only one instance each of layer or table in a feature service");
}
function W(e) {
  return __async(this, null, function* () {
    C(e, N), yield Promise.all(e.map((e2) => e2.load()));
    for (const r of e)
      l2(r, N, O2), d2({ layer: r, itemType: P2, errorNamePrefix: N });
    H(e, N), Q(e, N);
  });
}
function X(e, r) {
  return __async(this, null, function* () {
    const { url: a3, layerId: t2, title: n, fullExtent: o, isTable: s2 } = e, i4 = d(a3);
    r.url = ("FeatureServer" === i4?.serverType ? a3 : `${a3}/${t2}`) ?? null, r.title ||= n, r.extent = null, s2 || null == o || (r.extent = yield l(o)), a(r, f.METADATA), a(r, f.MULTI_LAYER), i2(r, f.SINGLE_LAYER), s2 && i2(r, f.TABLE);
  });
}
function Z(e, r) {
  for (const s2 of e) {
    const a4 = s2.parsedUrl.path, n2 = d(a4), o2 = n2?.url.path;
    if (!o2)
      throw new s(`${r}:invalid-parameters`, c(s2, `has unsupported url pattern: ${a4}`), { layer: s2 });
    const i4 = n2?.serverType;
    if ("FeatureServer" !== i4 && "MapServer" !== i4)
      throw new s(`${r}:invalid-parameters`, c(s2, `has unsupported server type: ${i4}`), { layer: s2 });
    if ("MapServer" === i4 && e.length > 1)
      throw new s(`${r}:invalid-parameters`, "Only one layer or table in a map service can be saved");
  }
  const a3 = d(e[0].parsedUrl.path), n = a3?.url.path, o = e.every((e2) => {
    const r2 = d(e2.parsedUrl.path);
    return r2?.url.path === n;
  });
  if (!o)
    throw new s(`${r}:invalid-parameters`, "'layers' array should only contain layers or tables that belong to the same feature service");
}
function ee(e) {
  return __async(this, null, function* () {
    C(e, g2), yield Promise.all(e.map((e2) => e2.load()));
    for (const r of e)
      l2(r, g2, O2);
    Z(e, g2), Q(e, g2);
  });
}
function re(e, r) {
  return __async(this, null, function* () {
    let t2 = 0, n = 0;
    for (const { isTable: a3 } of r)
      a3 ? n++ : t2++;
    const o = r[0].parsedUrl.path, s2 = d(o);
    if (e.url = "FeatureServer" === s2?.serverType ? s2.url.path : o, e.title ||= s2.title, e.extent = null, t2 > 0) {
      const t3 = r.map((e2) => e2.fullExtent).filter(O).reduce((e2, r2) => e2.clone().union(r2));
      t3 && (e.extent = yield l(t3));
    }
    a(e, f.METADATA), u(e, f.MULTI_LAYER, r.length > 1), u(e, f.SINGLE_LAYER, 1 === r.length), u(e, f.TABLE, n > 0 && 0 === t2), v(e);
  });
}
function ae(e, r) {
  return __async(this, null, function* () {
    return $({ layer: e, itemType: P2, validateLayer: O2, createItemData: (e2, r2) => J(r2, [e2]), errorNamePrefix: $2 }, r);
  });
}
function te(e, r) {
  return __async(this, null, function* () {
    yield W(e);
    const a3 = e[0].portalItem, t2 = w(a3), o = yield Promise.all(e.map((e2) => I(e2, t2, r))), c2 = yield J(a3, e.map((e2, r2) => ({ layer: e2, layerJSON: o[r2] })));
    return v(a3), yield a3.update({ data: c2 }), yield Promise.all(e.slice(1).map((e2) => e2.portalItem.reload())), i3(t2), a3.clone();
  });
}
function ne(e, r, a3) {
  return __async(this, null, function* () {
    return j({ layer: e, itemType: P2, validateLayer: O2, createItemData: (e2, r2) => Promise.resolve(j2(e2)), errorNamePrefix: x, newItem: r, setItemProperties: X }, a3);
  });
}
function oe(e, r, a3) {
  return __async(this, null, function* () {
    yield ee(e);
    const t2 = y({ itemType: P2, errorNamePrefix: g2, newItem: r }), o = w(t2), l3 = yield Promise.all(e.map((e2) => I(e2, o, a3))), c2 = yield M(e.map((e2, r2) => ({ layer: e2, layerJSON: l3[r2] })));
    yield re(t2, e), yield P(t2, c2, a3);
    for (const n of e)
      n.portalItem = t2.clone();
    return i3(o), t2;
  });
}
export {
  ae as save,
  te as saveAll,
  oe as saveAllAs,
  ne as saveAs
};
//# sourceMappingURL=chunk-Z4SIQGN6.js.map
