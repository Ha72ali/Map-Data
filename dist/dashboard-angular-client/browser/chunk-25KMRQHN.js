import {
  c2 as c,
  p
} from "./chunk-ARJJP56N.js";
import {
  i,
  u
} from "./chunk-4IFV6RW3.js";
import {
  d
} from "./chunk-VFY3HP2G.js";
import {
  R
} from "./chunk-5AO6PKWA.js";
import {
  r
} from "./chunk-YTRR4X7U.js";
import {
  Te
} from "./chunk-EQ4EANPC.js";
import {
  B,
  O
} from "./chunk-JJDQYKYN.js";
import {
  V
} from "./chunk-ZDVJGW4C.js";
import {
  A,
  C,
  G,
  w
} from "./chunk-U4IA2IP4.js";
import {
  ot
} from "./chunk-IMLUWAKH.js";
import {
  L
} from "./chunk-NVGBLY2Q.js";
import {
  a,
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/editingSupport.js
function F(e) {
  return null != e?.applyEdits;
}
function A2(e) {
  return "object" == typeof e && null != e && "objectId" in e && !!e.objectId;
}
function v(e) {
  return e.every(A2);
}
function I(e) {
  return "object" == typeof e && null != e && "globalId" in e && !!e.globalId;
}
function $(e) {
  return e.every(I);
}
function E(_0, _1, _2) {
  return __async(this, arguments, function* (e, t, a2, s2 = {}) {
    let n2;
    const o = "gdbVersion" in e ? e.gdbVersion : null, l = s2.gdbVersion ?? o;
    if (p(e) && e.url)
      n2 = c(e.url, e.layerId, l, "original-and-current-features" === s2.returnServiceEditsOption);
    else {
      n2 = L(), n2.promise.then((t3) => {
        (t3.addedFeatures.length || t3.updatedFeatures.length || t3.deletedFeatures.length || t3.addedAttachments.length || t3.updatedAttachments.length || t3.deletedAttachments.length) && e.emit("edits", t3);
      });
      const t2 = { result: n2.promise };
      e.emit("apply-edits", t2);
    }
    try {
      const { results: i2, edits: o2 } = yield S(e, t, a2, s2), l2 = (e2) => e2.filter((e3) => !e3.error).map(a), d2 = { edits: o2, addedFeatures: l2(i2.addFeatureResults), updatedFeatures: l2(i2.updateFeatureResults), deletedFeatures: l2(i2.deleteFeatureResults), addedAttachments: l2(i2.addAttachmentResults), updatedAttachments: l2(i2.updateAttachmentResults), deletedAttachments: l2(i2.deleteAttachmentResults), exceededTransferLimit: false, historicMoment: i2.editMoment ? new Date(i2.editMoment) : null, globalIdToObjectId: s2.globalIdToObjectId };
      return i2.editedFeatureResults?.length && (d2.editedFeatures = i2.editedFeatureResults), n2.resolve(d2), i2;
    } catch (d2) {
      throw n2.reject(d2), d2;
    }
  });
}
function S(e, t, r2, s2) {
  return __async(this, null, function* () {
    if (yield e.load(), !F(t))
      throw new s(`${e.type}-layer:no-editing-support`, "Layer source does not support applyEdits capability", { layer: e });
    if (!B(e))
      throw new s(`${e.type}-layer:editing-disabled`, "Editing is disabled for layer", { layer: e });
    const { edits: i2, options: n2 } = yield R2(e, r2, s2);
    return i2.addFeatures?.length || i2.updateFeatures?.length || i2.deleteFeatures?.length || i2.addAttachments?.length || i2.updateAttachments?.length || i2.deleteAttachments?.length ? { edits: i2, results: yield t.applyEdits(i2, n2) } : { edits: i2, results: { addFeatureResults: [], updateFeatureResults: [], deleteFeatureResults: [], addAttachmentResults: [], updateAttachmentResults: [], deleteAttachmentResults: [] } };
  });
}
function R2(e, t, r2) {
  return __async(this, null, function* () {
    const i2 = O(e), n2 = t && (t.addFeatures || t.updateFeatures || t.deleteFeatures), o = t && (t.addAttachments || t.updateAttachments || t.deleteAttachments), l = null != e.infoFor3D;
    if (M(t, i2, r2, !!n2, !!o, `${e.type}-layer`), !i2.data.isVersioned && r2?.gdbVersion)
      throw new s(`${e.type}-layer:invalid-parameter`, "'gdbVersion' is applicable only if the layer supports versioned data. See: 'capabilities.data.isVersioned'");
    if (!i2.editing.supportsRollbackOnFailure && r2?.rollbackOnFailureEnabled)
      throw new s(`${e.type}-layer:invalid-parameter`, "This layer does not support 'rollbackOnFailureEnabled' parameter. See: 'capabilities.editing.supportsRollbackOnFailure'");
    const d2 = __spreadValues({}, r2);
    if (null != d2.rollbackOnFailureEnabled || i2.editing.supportsRollbackOnFailure || (d2.rollbackOnFailureEnabled = true), d2.rollbackOnFailureEnabled || "original-and-current-features" !== d2.returnServiceEditsOption || (false === d2.rollbackOnFailureEnabled && n.getLogger("esri.layers.graphics.editingSupport").warn(`${e.type}-layer:invalid-parameter`, "'original-and-current-features' is valid for 'returnServiceEditsOption' only when 'rollBackOnFailure' is true, but 'rollBackOnFailure' was set to false. 'rollBackOnFailure' has been overwritten and set to true."), d2.rollbackOnFailureEnabled = true), !i2.editing.supportsReturnServiceEditsInSourceSpatialReference && d2.returnServiceEditsInSourceSR)
      throw new s(`${e.type}-layer:invalid-parameter`, "This layer does not support 'returnServiceEditsInSourceSR' parameter. See: 'capabilities.editing.supportsReturnServiceEditsInSourceSpatialReference'");
    if (d2.returnServiceEditsInSourceSR && "original-and-current-features" !== d2.returnServiceEditsOption)
      throw new s(`${e.type}-layer:invalid-parameter`, "'returnServiceEditsInSourceSR' is valid only when 'returnServiceEditsOption' is set to 'original-and-current-features'");
    const u2 = V2(t, i2, `${e.type}-layer`), p2 = r2?.globalIdUsed || l, c2 = e.fields.filter((e2) => "big-integer" === e2.type || "oid" === e2.type && (e2.length || 0) >= 8);
    if (p2) {
      const { globalIdField: t2 } = e;
      if (null == t2)
        throw new s(`${e.type}-layer:invalid-parameter`, "Layer does not specify a global id field.");
      u2.addFeatures.forEach((e2) => T(e2, t2));
    }
    u2.addFeatures.forEach((t2) => U(t2, e, p2, c2)), u2.updateFeatures.forEach((t2) => L2(t2, e, p2, c2)), u2.deleteFeatures.forEach((t2) => k(t2, e, p2, c2)), u2.addAttachments.forEach((t2) => B2(t2, e)), u2.updateAttachments.forEach((t2) => B2(t2, e)), l && (yield z(u2, e));
    return { edits: yield D(u2), options: d2 };
  });
}
function j(e, t, r2, s2) {
  if (r2) {
    if ("attributes" in e && !e.attributes[t.globalIdField])
      throw new s(`${t.type}-layer:invalid-parameter`, `Feature should have '${t.globalIdField}' when 'globalIdUsed' is true`);
    if (!("attributes" in e) && !e.globalId)
      throw new s(`${t.type}-layer:invalid-parameter`, "`'globalId' of the feature should be passed when 'globalIdUsed' is true");
  }
  if (s2.length && "attributes" in e)
    for (const i2 of s2) {
      const r3 = e.attributes[i2.name];
      if (void 0 !== r3 && !Te(i2, r3))
        throw new s(`${t.type}-layer:invalid-parameter`, `Big-integer field '${i2.name}' of the feature must be less than ${Number.MAX_SAFE_INTEGER}`, { feature: e });
    }
  if ("geometry" in e && null != e.geometry) {
    if (e.geometry.hasZ && false === t.capabilities?.data.supportsZ)
      throw new s(`${t.type}-layer:z-unsupported`, "Layer does not support z values while feature has z values.");
    if (e.geometry.hasM && false === t.capabilities?.data.supportsM)
      throw new s(`${t.type}-layer:m-unsupported`, "Layer does not support m values while feature has m values.");
  }
}
function O2(e, t) {
  if ("geometry" in e && "mesh" === e.geometry?.type && null != t.infoFor3D && null != t.spatialReference) {
    const { geometry: r2 } = e, { spatialReference: s2, vertexSpace: i2 } = r2, n2 = t.spatialReference, o = "local" === i2.type, l = A(n2), h = G(n2, s2), m = h || C(n2) && (C(s2) || w(s2));
    if (!(o && l && m || !o && !l && h))
      throw new s(`${t.type}-layer:mesh-unsupported`, `Uploading a mesh with a ${i2.type} vertex space and a spatial reference wkid:${s2.wkid} to a layer with a spatial reference wkid:${n2.wkid} is not supported.`);
  }
}
function U(e, t, a2, r2) {
  j(e, t, a2, r2), O2(e, t);
}
function k(e, t, a2, r2) {
  j(e, t, a2, r2);
}
function L2(e, t, r2, s2) {
  j(e, t, r2, s2), O2(e, t);
  const i2 = O(t);
  if ("geometry" in e && null != e.geometry && !i2?.editing.supportsGeometryUpdate)
    throw new s(`${t.type}-layer:unsupported-operation`, "Layer does not support geometry updates.");
}
function B2(e, t) {
  const { feature: r2, attachment: s2 } = e;
  if (!r2 || "attributes" in r2 && !r2.attributes[t.globalIdField])
    throw new s(`${t.type}-layer:invalid-parameter`, "Attachment should have reference to a feature with 'globalId'");
  if (!("attributes" in r2) && !r2.globalId)
    throw new s(`${t.type}-layer:invalid-parameter`, "Attachment should have reference to 'globalId' of the parent feature");
  if (!s2.globalId)
    throw new s(`${t.type}-layer:invalid-parameter`, "Attachment should have 'globalId'");
  if (!s2.data && !s2.uploadId)
    throw new s(`${t.type}-layer:invalid-parameter`, "Attachment should have 'data' or 'uploadId'");
  if (!(s2.data instanceof File && !!s2.data.name) && !s2.name)
    throw new s(`${t.type}-layer:invalid-parameter`, "'name' is required when attachment is specified as Base64 encoded string using 'data'");
  if (!t.capabilities?.editing.supportsUploadWithItemId && s2.uploadId)
    throw new s(`${t.type}-layer:invalid-parameter`, "This layer does not support 'uploadId' parameter. See: 'capabilities.editing.supportsUploadWithItemId'");
  if ("string" == typeof s2.data) {
    const e2 = ot(s2.data);
    if (e2 && !e2.isBase64)
      throw new s(`${t.type}-layer:invalid-parameter`, "Attachment 'data' should be a Blob, File or Base64 encoded string");
  }
}
function T(e, t) {
  const { attributes: a2 } = e;
  null == a2[t] && (a2[t] = r());
}
function D(e) {
  return __async(this, null, function* () {
    const t = e.addFeatures ?? [], a2 = e.updateFeatures ?? [], r2 = t.concat(a2).map((e2) => e2.geometry), s2 = yield R(r2), i2 = t.length, n2 = a2.length;
    return s2.slice(0, i2).forEach((e2, a3) => t[a3].geometry = e2), s2.slice(i2, i2 + n2).forEach((e2, t2) => a2[t2].geometry = e2), e;
  });
}
function G2(e) {
  return { addFeatures: Array.from(e?.addFeatures ?? []), updateFeatures: Array.from(e?.updateFeatures ?? []), deleteFeatures: e && V.isCollection(e.deleteFeatures) ? e.deleteFeatures.toArray() : e.deleteFeatures || [], addAttachments: e.addAttachments || [], updateAttachments: e.updateAttachments || [], deleteAttachments: e.deleteAttachments || [] };
}
function V2(e, t, r2) {
  const s2 = G2(e);
  if (s2.addFeatures?.length && !t.operations.supportsAdd)
    throw new s(`${r2}:unsupported-operation`, "Layer does not support adding features.");
  if (s2.updateFeatures?.length && !t.operations.supportsUpdate)
    throw new s(`${r2}:unsupported-operation`, "Layer does not support updating features.");
  if (s2.deleteFeatures?.length && !t.operations.supportsDelete)
    throw new s(`${r2}:unsupported-operation`, "Layer does not support deleting features.");
  return s2.addFeatures = s2.addFeatures.map(x), s2.updateFeatures = s2.updateFeatures.map(x), s2.addAssetFeatures = [], s2;
}
function M(e, t, r2, s2, i2, n2) {
  if (!e || !s2 && !i2)
    throw new s(`${n2}:missing-parameters`, "'addFeatures', 'updateFeatures', 'deleteFeatures', 'addAttachments', 'updateAttachments' or 'deleteAttachments' parameter is required");
  if (!t.editing.supportsGlobalId && r2?.globalIdUsed)
    throw new s(`${n2}:invalid-parameter`, "This layer does not support 'globalIdUsed' parameter. See: 'capabilities.editing.supportsGlobalId'");
  if (!t.editing.supportsGlobalId && i2)
    throw new s(`${n2}:invalid-parameter`, "'addAttachments', 'updateAttachments' and 'deleteAttachments' are applicable only if the layer supports global ids. See: 'capabilities.editing.supportsGlobalId'");
  if (!r2?.globalIdUsed && i2)
    throw new s(`${n2}:invalid-parameter`, "When 'addAttachments', 'updateAttachments' or 'deleteAttachments' is specified, globalIdUsed should be set to true");
}
function x(t) {
  const a2 = new d();
  return t.attributes || (t.attributes = {}), a2.geometry = t.geometry, a2.attributes = t.attributes, a2;
}
function z(e, t) {
  return __async(this, null, function* () {
    if (null == t.infoFor3D)
      return;
    const { infoFor3D: r2 } = t, s2 = u("model/gltf-binary", r2.supportedFormats) ?? i("glb", r2.supportedFormats);
    if (!(!!s2 && r2.editFormats.includes(s2)))
      throw new s(`${t.type}-layer:binary-gltf-asset-not-supported`, "3DObjectFeatureLayer requires binary glTF (.glb) support for updating mesh geometry.");
    e.addAssetFeatures ??= [];
    const { addAssetFeatures: i2 } = e;
    for (const a2 of e.addFeatures ?? [])
      q(a2) && i2.push(a2);
    for (const a2 of e.updateFeatures ?? [])
      q(a2) && i2.push(a2);
  });
}
function q(e) {
  return "mesh" === e?.geometry?.type;
}
function W(e, t, r2, s2) {
  if (!F(t))
    throw new s(`${e.type}-layer:no-editing-support`, "Layer source does not support applyEdits capability", { layer: e });
  if (!t.uploadAssets)
    throw new s(`${e.type}-layer:no-asset-upload-support`, "Layer source does not support uploadAssets capability", { layer: e });
  return t.uploadAssets(r2, s2);
}

export {
  A2 as A,
  v,
  I,
  $,
  E,
  D,
  G2 as G,
  V2 as V,
  M,
  x,
  W
};
//# sourceMappingURL=chunk-25KMRQHN.js.map
