import {
  m,
  p
} from "./chunk-RVXZGPCS.js";
import {
  n
} from "./chunk-YTRR4X7U.js";
import {
  P,
  s as s2,
  v
} from "./chunk-NVGBLY2Q.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/webdoc/support/resourceUtils.js
function p2(e, t, r) {
  return __async(this, null, function* () {
    const o = yield u(e, t, r);
    yield h(o, t, r);
  });
}
function n2(e, t, r, o, s3) {
  return __async(this, null, function* () {
    const a = yield u(r, o, s3);
    yield e.update({ data: t }), yield h(a, o, s3);
  });
}
function u(o, p3, n3) {
  return __async(this, null, function* () {
    if (!p3?.resources)
      return;
    const u2 = p3.portalItem === o.portalItem ? new Set(o.paths) : /* @__PURE__ */ new Set();
    o.paths.length = 0, o.portalItem = p3.portalItem;
    const h2 = new Set(p3.resources.toKeep.map((e) => e.resource.path)), i = /* @__PURE__ */ new Set(), m2 = [];
    h2.forEach((e) => {
      u2.delete(e), o.paths.push(e);
    });
    const f = [], l = [], w = [];
    for (const e of p3.resources.toUpdate)
      if (u2.delete(e.resource.path), h2.has(e.resource.path) || i.has(e.resource.path)) {
        const { resource: t, content: r, finish: p4 } = e, n4 = m(t, n());
        o.paths.push(n4.path), f.push({ resource: n4, content: yield p(r), compress: e.compress }), p4 && w.push(() => p4(n4));
      } else {
        o.paths.push(e.resource.path), l.push({ resource: e.resource, content: yield p(e.content), compress: e.compress });
        const t = e.finish;
        t && w.push(() => t(e.resource)), i.add(e.resource.path);
      }
    for (const e of p3.resources.toAdd)
      if (o.paths.push(e.resource.path), u2.has(e.resource.path))
        u2.delete(e.resource.path);
      else {
        f.push({ resource: e.resource, content: yield p(e.content), compress: e.compress });
        const t = e.finish;
        t && w.push(() => t(e.resource));
      }
    if (f.length || l.length) {
      const { addOrUpdateResources: e } = yield import("./chunk-2BV7NDXO.js");
      yield e(p3.portalItem, f, "add", n3), yield e(p3.portalItem, l, "update", n3);
    }
    if (w.forEach((e) => e()), 0 === m2.length)
      return u2;
    const d = yield P(m2);
    if (s2(n3), d.length > 0)
      throw new s("save:resources", "Failed to save one or more resources", { errors: d });
    return u2;
  });
}
function h(e, t, r) {
  return __async(this, null, function* () {
    if (!e || !t.portalItem)
      return;
    const s3 = [];
    for (const o of e) {
      const e2 = t.portalItem.resourceFromPath(o);
      s3.push(e2.portalItem.removeResource(e2, r));
    }
    yield v(s3);
  });
}

export {
  p2 as p,
  n2 as n
};
//# sourceMappingURL=chunk-FWQUNSRV.js.map
