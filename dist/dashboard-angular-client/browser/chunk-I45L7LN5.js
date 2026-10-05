import {
  p
} from "./chunk-LGI6SQEK.js";
import {
  c
} from "./chunk-O3GNG7MX.js";
import {
  A
} from "./chunk-NB4THPQ7.js";
import {
  d
} from "./chunk-5ETZQF6U.js";
import {
  h5 as h
} from "./chunk-YTC5APIA.js";
import {
  b as b2
} from "./chunk-FLPV6LMH.js";
import {
  e
} from "./chunk-F24FRQYV.js";
import {
  x
} from "./chunk-JJDQYKYN.js";
import {
  b
} from "./chunk-FKXAUXOY.js";
import {
  n
} from "./chunk-LOE6HVIU.js";
import {
  t2 as t
} from "./chunk-IMLUWAKH.js";
import {
  u3 as u
} from "./chunk-47ACMYSX.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/featureQueryAll.js
function r(e2, r2, a2) {
  return __async(this, null, function* () {
    r2 = r2.clone(), e2.capabilities.query.supportsMaxRecordCountFactor && (r2.maxRecordCountFactor = u2(e2));
    const n2 = t2(e2), o = e2.capabilities.query.supportsPagination;
    r2.start = 0, r2.num = n2;
    let i = null;
    for (; ; ) {
      const t3 = yield e2.source.queryFeaturesJSON(r2, a2);
      if (null == i ? i = t3 : i.features = i.features.concat(t3.features), i.exceededTransferLimit = t3.exceededTransferLimit, !o || !t3.exceededTransferLimit)
        break;
      r2.start += n2;
    }
    return i;
  });
}
function t2(e2) {
  return u2(e2) * a(e2);
}
function a(e2) {
  return e2.capabilities.query.maxRecordCount || 2e3;
}
function u2(r2) {
  return r2.capabilities.query.supportsMaxRecordCountFactor ? b2.MAX_MAX_RECORD_COUNT_FACTOR : 1;
}

// node_modules/@arcgis/core/layers/support/featureLayerUtils.js
var y = new n({ esriGeometryPoint: "point", esriGeometryMultipoint: "multipoint", esriGeometryPolyline: "polyline", esriGeometryPolygon: "polygon", esriGeometryMultiPatch: "multipatch" });
function m(t3, e2, r2, o) {
  return __async(this, null, function* () {
    const a2 = yield G(t3);
    if (yield h2(t3, e2, o), !a2.addAttachment)
      throw new s(o, "Layer source does not support addAttachment capability");
    return a2.addAttachment(e2, r2);
  });
}
function h2(t3, e2, r2) {
  const { attributes: o } = e2, { objectIdField: a2 } = t3;
  return t3.capabilities?.data?.supportsAttachment ? e2 ? o ? a2 && o[a2] ? Promise.resolve() : Promise.reject(new s(r2, `feature is missing the identifying attribute ${a2}`)) : Promise.reject(new s(r2, "'attributes' are required on a feature to query attachments")) : Promise.reject(new s(r2, "A feature is required to add/delete/update attachments")) : Promise.reject(new s(r2, "this layer doesn't support attachments"));
}
function w(t3, e2, r2, o, a2) {
  return __async(this, null, function* () {
    const i = yield G(t3);
    if (yield h2(t3, e2, a2), !i.updateAttachment)
      throw new s(a2, "Layer source does not support updateAttachment capability");
    return i.updateAttachment(e2, r2, o);
  });
}
function b3(t3, e2, r2) {
  return __async(this, null, function* () {
    const { applyEdits: n2 } = yield import("./chunk-37EZ4QRW.js"), o = yield t3.load();
    let a2 = r2;
    return "feature" === o.type && o.infoFor3D && null != e2.deleteFeatures && null != o.globalIdField && (a2 = __spreadProps(__spreadValues({}, a2), { globalIdToObjectId: yield J(o, e2.deleteFeatures, o.globalIdField) })), n2(o, o.source, e2, r2);
  });
}
function g(t3, e2, r2) {
  return __async(this, null, function* () {
    const { uploadAssets: n2 } = yield import("./chunk-37EZ4QRW.js"), o = yield t3.load();
    return n2(o, o.source, e2, r2);
  });
}
function j(t3, e2, r2, o) {
  return __async(this, null, function* () {
    const a2 = yield G(t3);
    if (yield h2(t3, e2, o), !a2.deleteAttachments)
      throw new s(o, "Layer source does not support deleteAttachments capability");
    return a2.deleteAttachments(e2, r2);
  });
}
function I(t3, e2, r2) {
  return __async(this, null, function* () {
    const o = (yield t3.load({ signal: e2?.signal })).source;
    if (!o.fetchRecomputedExtents)
      throw new s(r2, "Layer source does not support fetchUpdates capability");
    return o.fetchRecomputedExtents(e2);
  });
}
function q(t3, e2, r2, o) {
  return __async(this, null, function* () {
    e2 = c.from(e2), yield t3.load();
    const a2 = t3.source, i = t3.capabilities;
    if (!i?.data?.supportsAttachment)
      throw new s(o, "this layer doesn't support attachments");
    const { attachmentTypes: s2, objectIds: u3, globalIds: l, num: c2, size: d2, start: f, where: y2 } = e2;
    if (!i?.operations?.supportsQueryAttachments) {
      if (s2?.length > 0 || l?.length > 0 || d2?.length > 0 || c2 || f || y2)
        throw new s(o, "when 'capabilities.operations.supportsQueryAttachments' is false, only objectIds is supported", e2);
    }
    if (!(u3?.length || l?.length || y2))
      throw new s(o, "'objectIds', 'globalIds', or 'where' are required to perform attachment query", e2);
    if (!a2.queryAttachments)
      throw new s(o, "Layer source does not support queryAttachments capability", e2);
    return a2.queryAttachments(e2);
  });
}
function F(t3, e2, r2, o) {
  return __async(this, null, function* () {
    const a2 = yield G(t3);
    if (!a2.queryObjectIds)
      throw new s(o, "Layer source does not support queryObjectIds capability");
    return a2.queryObjectIds(b2.from(e2) ?? t3.createQuery(), r2);
  });
}
function A2(t3, e2, r2, o) {
  return __async(this, null, function* () {
    const a2 = yield G(t3);
    if (!a2.queryFeatureCount)
      throw new s(o, "Layer source does not support queryFeatureCount capability");
    return a2.queryFeatureCount(b2.from(e2) ?? t3.createQuery(), r2);
  });
}
function O(t3, e2, r2, o) {
  return __async(this, null, function* () {
    const a2 = yield G(t3);
    if (!a2.queryExtent)
      throw new s(o, "Layer source does not support queryExtent capability");
    return a2.queryExtent(b2.from(e2) ?? t3.createQuery(), r2);
  });
}
function P(t3, e2, r2, o) {
  return __async(this, null, function* () {
    const a2 = yield G(t3);
    if (!a2.queryRelatedFeatures)
      throw new s(o, "Layer source does not support queryRelatedFeatures capability");
    return a2.queryRelatedFeatures(d.from(e2), r2);
  });
}
function S(t3, e2, r2, o) {
  return __async(this, null, function* () {
    const a2 = yield G(t3);
    if (!a2.queryRelatedFeaturesCount)
      throw new s(o, "Layer source does not support queryRelatedFeaturesCount capability");
    return a2.queryRelatedFeaturesCount(d.from(e2), r2);
  });
}
function E(t3) {
  return __async(this, null, function* () {
    const e2 = t3.source;
    if (e2?.refresh)
      try {
        const { dataChanged: r2, updates: n2 } = yield e2.refresh();
        if (null != n2 && (t3.sourceJSON = __spreadValues(__spreadValues({}, t3.sourceJSON), n2), t3.read(n2, { origin: "service", url: t3.parsedUrl })), r2)
          return true;
      } catch {
      }
    if (t3.definitionExpression)
      try {
        return (yield e(t3.definitionExpression, t3.fieldsIndex)).hasDateFunctions;
      } catch {
      }
    return false;
  });
}
function x2(t3) {
  const e2 = new b2(), r2 = t3.capabilities?.data, n2 = t3.capabilities?.query;
  e2.historicMoment = t3.historicMoment, e2.gdbVersion = t3.gdbVersion, e2.returnGeometry = true, n2 && (e2.compactGeometryEnabled = n2.supportsCompactGeometry, e2.defaultSpatialReferenceEnabled = n2.supportsDefaultSpatialReference), r2 && (r2.supportsZ && null != t3.returnZ && (e2.returnZ = t3.returnZ), r2.supportsM && null != t3.returnM && (e2.returnM = t3.returnM)), e2.outFields = ["*"];
  const { timeOffset: o, timeExtent: a2 } = t3;
  return e2.timeExtent = null != o && null != a2 ? a2.offset(-o.value, o.unit) : a2 || null, e2.multipatchOption = "multipatch" === t3.geometryType ? "xyFootprint" : null, e2;
}
function R(t3) {
  const { globalIdField: e2, fields: r2 } = t3;
  if (e2)
    return e2;
  if (r2) {
    for (const n2 of r2)
      if ("esriFieldTypeGlobalID" === n2.type)
        return n2.name;
  }
}
function M(t3) {
  const { objectIdField: e2, fields: r2 } = t3;
  if (e2)
    return e2;
  if (r2) {
    for (const n2 of r2)
      if ("esriFieldTypeOID" === n2.type)
        return n2.name;
  }
}
function C(t3) {
  return t3.currentVersion ? t3.currentVersion : t3.hasOwnProperty("capabilities") || t3.hasOwnProperty("drawingInfo") || t3.hasOwnProperty("hasAttachments") || t3.hasOwnProperty("htmlPopupType") || t3.hasOwnProperty("relationships") || t3.hasOwnProperty("timeInfo") || t3.hasOwnProperty("typeIdField") || t3.hasOwnProperty("types") ? 10 : 9.3;
}
function L(t3, e2) {
  const { subtypes: r2, subtypeField: n2 } = t3;
  if (!e2 || !r2?.length || !n2)
    return null;
  const o = e2.attributes[n2];
  return null == o ? null : r2.find((t4) => t4.code === o);
}
function G(t3) {
  return __async(this, null, function* () {
    return (yield t3.load()).source;
  });
}
function Q(e2, r2) {
  return __async(this, null, function* () {
    if (!t)
      return;
    if (t.findCredential(e2))
      return;
    let n2;
    try {
      const o = yield x(e2, r2);
      o && (n2 = yield t.checkSignInStatus(`${o}/sharing`));
    } catch (o) {
    }
    if (n2)
      try {
        const n3 = null != r2 ? r2.signal : null;
        yield t.getCredential(e2, { signal: n3 });
      } catch (o) {
      }
  });
}
function T(t3, e2, r2) {
  return __async(this, null, function* () {
    const n2 = t3.parsedUrl?.path;
    n2 && t3.authenticationTriggerEvent === e2 && (yield Q(n2, r2));
  });
}
function v(t3) {
  return !Z(t3) && (t3.userHasUpdateItemPrivileges || t3.editingEnabled);
}
var D = u({ types: h });
function U(t3, e2) {
  if (t3.defaultSymbol)
    return t3.types?.length ? new A({ defaultSymbol: D(t3.defaultSymbol, t3, e2), field: t3.typeIdField, uniqueValueInfos: t3.types.map((t4) => ({ id: t4.id, symbol: D(t4.symbol, t4, e2) })) }) : new p({ symbol: D(t3.defaultSymbol, t3, e2) });
}
function V(t3) {
  let e2 = t3.sourceJSON?.cacheMaxAge;
  if (!e2)
    return false;
  const r2 = t3.editingInfo?.lastEditDate?.getTime();
  return null == r2 || (e2 *= 1e3, Date.now() - r2 < e2);
}
function J(t3, e2, n2) {
  return __async(this, null, function* () {
    if (null == e2)
      return null;
    const o = [], { objectIdField: a2 } = t3;
    if (e2.forEach((t4) => {
      let e3 = null;
      if ("attributes" in t4) {
        const { attributes: r2 } = t4;
        e3 = { globalId: r2[n2], objectId: null != r2[a2] && -1 !== r2[a2] ? r2[a2] : null };
      } else
        e3 = { globalId: t4.globalId, objectId: null != t4.objectId && -1 !== t4.objectId ? t4.objectId : null };
      null != e3.globalId && (null != e3.objectId && -1 !== e3.objectId || o.push(e3.globalId));
    }), 0 === o.length)
      return null;
    const i = t3.createQuery();
    i.where = o.map((t4) => `${n2}='${t4}'`).join(" OR "), i.returnGeometry = false, i.outFields = [a2, n2], i.cacheHint = false;
    const u3 = yield b(r(t3, i));
    if (!u3.ok)
      return null;
    const l = /* @__PURE__ */ new Map(), c2 = u3.value.features;
    for (const r2 of c2) {
      const t4 = r2.attributes[n2], e3 = r2.attributes[a2];
      null != t4 && null != e3 && -1 !== e3 && l.set(t4, e3);
    }
    return l;
  });
}
function N(t3, e2, r2) {
  if (!e2 || !r2 || !t3)
    return null;
  const n2 = r2.getAttribute(e2);
  return null == n2 ? null : t3.find((t4) => {
    const { id: e3 } = t4;
    return null != e3 && e3.toString() === n2.toString();
  }) ?? null;
}
function Z(t3) {
  return t3.sourceJSON?.isMultiServicesView || $(t3);
}
function $(t3) {
  return !!t3.sourceJSON?.capabilities?.toLowerCase().split(",").map((t4) => t4.trim()).includes("map");
}

export {
  y,
  m,
  w,
  b3 as b,
  g,
  j,
  I,
  q,
  F,
  A2 as A,
  O,
  P,
  S,
  E,
  x2 as x,
  R,
  M,
  C,
  L,
  T,
  v,
  U,
  V,
  J,
  N,
  Z
};
//# sourceMappingURL=chunk-I45L7LN5.js.map
