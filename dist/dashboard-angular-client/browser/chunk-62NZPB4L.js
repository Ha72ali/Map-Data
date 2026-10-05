import {
  i as i3
} from "./chunk-R4ADXNFU.js";
import {
  i as i2
} from "./chunk-A3K4AQEC.js";
import {
  t
} from "./chunk-6MWDYJDX.js";
import {
  o
} from "./chunk-WBMLBIXY.js";
import {
  f,
  i
} from "./chunk-5EK2HSR2.js";
import {
  S
} from "./chunk-AZH5CNQI.js";
import {
  C
} from "./chunk-V4F7XXO4.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/save/utils.js
function l(t2, r, o2) {
  const a = o2(t2);
  if (!a.isValid)
    throw new s(`${r}:invalid-parameters`, a.errorMessage, { layer: t2 });
}
function m(e) {
  return __async(this, null, function* () {
    const { layer: t2, errorNamePrefix: r, validateLayer: o2 } = e;
    yield t2.load(), l(t2, r, o2);
  });
}
function c(e, t2) {
  return `Layer (title: ${e.title}, id: ${e.id}) of type '${e.declaredClass}' ${t2}`;
}
function u(t2) {
  const { item: r, errorNamePrefix: o2, layer: a, validateItem: i4 } = t2;
  if (i3(r), f2(t2), i4) {
    const t3 = i4(r);
    if (!t3.isValid)
      throw new s(`${o2}:invalid-parameters`, t3.errorMessage, { layer: a });
  }
}
function f2(t2) {
  const { item: r, itemType: o2, additionalItemType: a, errorNamePrefix: i4, layer: n } = t2, s2 = [o2];
  if (a && s2.push(a), !s2.includes(r.type)) {
    const t3 = s2.map((e) => `'${e}'`).join(", ");
    throw new s(`${i4}:portal-item-wrong-type`, `Portal item type should be one of: "${t3}"`, { item: r, layer: n });
  }
}
function d(t2) {
  const { layer: r, errorNamePrefix: o2 } = t2, { portalItem: a } = r;
  if (!a)
    throw new s(`${o2}:portal-item-not-set`, c(r, "requires the portalItem property to be set"));
  if (!a.loaded)
    throw new s(`${o2}:portal-item-not-loaded`, c(r, "cannot be saved to a portal item that does not exist or is inaccessible"));
  u(__spreadProps(__spreadValues({}, t2), { item: a }));
}
function y(e) {
  const { newItem: t2, itemType: a } = e;
  let i4 = S.from(t2);
  return i4.id && (i4 = i4.clone(), i4.id = null), i4.type ??= a, i4.portal ??= C.getDefault(), u(__spreadProps(__spreadValues({}, e), { item: i4 })), i4;
}
function w(e) {
  return o(e, "portal-item");
}
function I(e, t2, r) {
  return __async(this, null, function* () {
    "beforeSave" in e && "function" == typeof e.beforeSave && (yield e.beforeSave());
    const o2 = e.write({}, t2);
    return yield Promise.all(t2.resources?.pendingOperations ?? []), t(t2, { errorName: "layer-write:unsupported" }, r), o2;
  });
}
function v(e) {
  i(e, f.JSAPI), e.typeKeywords && (e.typeKeywords = e.typeKeywords.filter((e2, t2, r) => r.indexOf(e2) === t2));
}
function P(e, t2, r) {
  return __async(this, null, function* () {
    const o2 = e.portal;
    yield o2.signIn(), yield o2.user?.addItem({ item: e, data: t2, folder: r?.folder });
  });
}
function $(e, r) {
  return __async(this, null, function* () {
    const { layer: o2, createItemData: a, createJSONContext: i4, setItemProperties: n, saveResources: s2, supplementalUnsupportedErrors: p } = e;
    yield m(e), d(e);
    const l2 = o2.portalItem, c2 = i4 ? i4(l2) : w(l2), u2 = yield I(o2, c2, __spreadProps(__spreadValues({}, r), { supplementalUnsupportedErrors: p })), f3 = yield a({ layer: o2, layerJSON: u2 }, l2);
    return yield n?.(o2, l2), v(l2), yield l2.update({ data: f3 }), i2(c2), yield s2?.(l2, c2), l2;
  });
}
function j(e, r) {
  return __async(this, null, function* () {
    const { layer: o2, createItemData: a, createJSONContext: i4, setItemProperties: n, saveResources: s2, supplementalUnsupportedErrors: p } = e;
    yield m(e);
    const l2 = y(e), c2 = i4 ? i4(l2) : w(l2), u2 = yield I(o2, c2, __spreadProps(__spreadValues({}, r), { supplementalUnsupportedErrors: p })), f3 = yield a({ layer: o2, layerJSON: u2 }, l2);
    return yield n(o2, l2), v(l2), yield P(l2, f3, r), o2.portalItem = l2, i2(c2), yield s2?.(l2, c2), l2;
  });
}

export {
  l,
  c,
  d,
  y,
  w,
  I,
  v,
  P,
  $,
  j
};
//# sourceMappingURL=chunk-62NZPB4L.js.map
