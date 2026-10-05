import {
  n
} from "./chunk-FVENEGBH.js";
import {
  Ae,
  Ue,
  _e,
  ge,
  pe,
  ye
} from "./chunk-EQ4EANPC.js";
import {
  N
} from "./chunk-U4IA2IP4.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/sources/support/sourceUtils.js
var u = class {
  constructor() {
    this.code = null, this.description = null;
  }
};
var c = class {
  constructor(t) {
    this.error = new u(), this.globalId = null, this.objectId = null, this.success = false, this.uniqueId = null, this.error.description = t;
  }
};
function f(t) {
  return new c(t);
}
var a = class {
  constructor(t) {
    this.globalId = null, this.success = true, this.objectId = this.uniqueId = t;
  }
};
function d(t) {
  return new a(t);
}
var m = /* @__PURE__ */ new Set();
function p(t, n2, i, o = false) {
  m.clear();
  for (const s in i) {
    const l = t.get(s);
    if (!l)
      continue;
    const u2 = g(l, i[s]);
    if (m.add(l.name), l && (o || l.editable)) {
      const t2 = Ae(l, u2);
      if (t2)
        return f(Ue(t2, l, u2));
      n2[l.name] = u2;
    }
  }
  for (const e of t?.requiredFields ?? [])
    if (!m.has(e.name))
      return f(`missing required field "${e.name}"`);
  return null;
}
function g(n2, e) {
  let r = e;
  return pe(n2) && "string" == typeof e ? r = parseFloat(e) : ye(n2) && null != e && "string" != typeof e ? r = String(e) : ge(n2) && "string" == typeof e && (r = n(e)), _e(r);
}
var h;
function y(t, e) {
  if (!t || !N(e))
    return t;
  if ("rings" in t || "paths" in t) {
    if (null == h)
      throw new TypeError("geometry engine not loaded");
    return h.simplify(e, t);
  }
  return t;
}
function w() {
  return __async(this, null, function* () {
    return null == h && (h = yield import("./chunk-YB6A4GZ6.js")), h;
  });
}
function j(t, e) {
  return __async(this, null, function* () {
    !N(t) || "esriGeometryPolygon" !== e && "esriGeometryPolyline" !== e || (yield w());
  });
}

export {
  f,
  d,
  p,
  y,
  j
};
//# sourceMappingURL=chunk-57NK2WBT.js.map
