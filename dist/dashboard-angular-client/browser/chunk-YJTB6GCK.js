import {
  d
} from "./chunk-LRQVNXVW.js";
import {
  S
} from "./chunk-AZH5CNQI.js";
import {
  C
} from "./chunk-V4F7XXO4.js";
import {
  U,
  t2 as t
} from "./chunk-IMLUWAKH.js";
import {
  a
} from "./chunk-NVGBLY2Q.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/associatedFeatureServiceUtils.js
function s2(e, r) {
  return __async(this, null, function* () {
    const n = d(e);
    if (!n)
      throw new s("invalid-url", "Invalid scene service url");
    const o = __spreadProps(__spreadValues({}, r), { sceneServerUrl: n.url.path, layerId: n.sublayer ?? void 0 });
    if (o.sceneLayerItem ??= yield l(o), null == o.sceneLayerItem)
      return f(o.sceneServerUrl.replace("/SceneServer", "/FeatureServer"), o);
    const i = yield y(o);
    if (!i?.url)
      throw new s("related-service-not-found", "Could not find feature service through portal item relationship");
    o.featureServiceItem = i;
    const s3 = yield f(i.url, o);
    return s3.portalItem = i, s3;
  });
}
function l(e) {
  return __async(this, null, function* () {
    const r = (yield c(e)).serviceItemId;
    if (!r)
      return null;
    const t2 = new S({ id: r, apiKey: e.apiKey }), a2 = yield u(e);
    null != a2 && (t2.portal = new C({ url: a2 }));
    try {
      return t2.load({ signal: e.signal });
    } catch (s3) {
      return a(s3), null;
    }
  });
}
function c(e) {
  return __async(this, null, function* () {
    if (e.rootDocument)
      return e.rootDocument;
    const t2 = { query: __spreadProps(__spreadValues({ f: "json" }, e.customParameters), { token: e.apiKey }), responseType: "json", signal: e.signal };
    try {
      const n = yield U(e.sceneServerUrl, t2);
      e.rootDocument = n.data;
    } catch {
      e.rootDocument = {};
    }
    return e.rootDocument;
  });
}
function u(t2) {
  return __async(this, null, function* () {
    const a2 = t?.findServerInfo(t2.sceneServerUrl);
    if (a2?.owningSystemUrl)
      return a2.owningSystemUrl;
    const o = t2.sceneServerUrl.replace(/(.*\/rest)\/.*/i, "$1") + "/info";
    try {
      const e = (yield U(o, { query: { f: "json" }, responseType: "json", signal: t2.signal })).data.owningSystemUrl;
      if (e)
        return e;
    } catch (i) {
      a(i);
    }
    return null;
  });
}
function f(e, n) {
  return __async(this, null, function* () {
    const o = d(e);
    if (!o)
      throw new s("invalid-feature-service-url", "Invalid feature service url");
    const i = o.url.path, s3 = n.layerId;
    if (null == s3)
      return { serverUrl: i };
    const l2 = c(n), u2 = n.featureServiceItem ? yield n.featureServiceItem.fetchData("json") : null, f2 = (u2?.layers?.[0] || u2?.tables?.[0])?.customParameters, y2 = (e2) => {
      const t2 = { query: __spreadValues({ f: "json" }, f2), responseType: "json", authMode: e2, signal: n.signal };
      return U(i, t2);
    }, m = y2("anonymous").catch(() => y2("no-prompt")), [p, d2] = yield Promise.all([m, l2]), v = d2?.layers, w = p.data && p.data.layers;
    if (!Array.isArray(w))
      throw new Error("expected layers array");
    if (Array.isArray(v))
      for (let r = 0; r < Math.min(v.length, w.length); r++) {
        if (v[r].id === s3)
          return { serverUrl: i, layerId: w[r].id };
      }
    else if (null != s3 && s3 < w.length)
      return { serverUrl: i, layerId: w[s3].id };
    throw new Error("could not find matching associated sublayer");
  });
}
function y(_0) {
  return __async(this, arguments, function* ({ sceneLayerItem: e, signal: r }) {
    if (!e)
      return null;
    try {
      const t2 = (yield e.fetchRelatedItems({ relationshipType: "Service2Service", direction: "reverse" }, { signal: r })).find((e2) => "Feature Service" === e2.type) || null;
      if (!t2)
        return null;
      const n = new S({ portal: t2.portal, id: t2.id });
      return yield n.load(), n;
    } catch (t2) {
      return a(t2), null;
    }
  });
}

export {
  s2 as s
};
//# sourceMappingURL=chunk-YJTB6GCK.js.map
