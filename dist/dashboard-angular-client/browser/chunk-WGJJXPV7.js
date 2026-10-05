import {
  x
} from "./chunk-H2JOPQBY.js";
import {
  s as s3
} from "./chunk-YDDQQAFH.js";
import {
  i as i2
} from "./chunk-KPRRWOGC.js";
import {
  N
} from "./chunk-RRTU3AOS.js";
import {
  v as v2
} from "./chunk-LVM5DDEN.js";
import {
  $,
  v
} from "./chunk-25KMRQHN.js";
import {
  c as c2,
  i as i3,
  o as o2,
  t
} from "./chunk-ARJJP56N.js";
import {
  F
} from "./chunk-4IFV6RW3.js";
import {
  a as a3
} from "./chunk-AQZJMRBI.js";
import {
  i
} from "./chunk-WRDD5RXI.js";
import {
  T
} from "./chunk-I45L7LN5.js";
import {
  d as d2
} from "./chunk-VFY3HP2G.js";
import {
  b
} from "./chunk-FLPV6LMH.js";
import {
  c
} from "./chunk-3QI4RGVH.js";
import {
  g
} from "./chunk-LRQVNXVW.js";
import {
  o
} from "./chunk-CINKUSZ7.js";
import {
  J,
  L as L2,
  Q
} from "./chunk-J2BM4BJ4.js";
import {
  r
} from "./chunk-YTRR4X7U.js";
import {
  d
} from "./chunk-QNED4CTP.js";
import {
  y as y2
} from "./chunk-4QNJMPNJ.js";
import {
  m
} from "./chunk-LHPNLXQX.js";
import {
  w
} from "./chunk-BYMJUQYJ.js";
import {
  f
} from "./chunk-YKH4U5BK.js";
import {
  G,
  z
} from "./chunk-U4IA2IP4.js";
import {
  n as n2
} from "./chunk-LOE6HVIU.js";
import {
  U,
  V,
  Wt
} from "./chunk-IMLUWAKH.js";
import {
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  A,
  a as a2,
  k
} from "./chunk-NVGBLY2Q.js";
import {
  e as e2,
  n2 as n,
  s,
  s2
} from "./chunk-BTPDOHVM.js";
import {
  L,
  O,
  has
} from "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/applyEditsUtils.js
function m2(t2, e3, r2) {
  return __async(this, null, function* () {
    const { geometry: o3 } = e3, i4 = __spreadValues({}, e3.attributes);
    if (null != r2 && "mesh" === o3?.type) {
      const { transformFieldRoles: e4 } = r2, { origin: c3, spatialReference: p, vertexSpace: m3 } = o3, f3 = o3.transform ?? new N(), g3 = "local" === m3.type, b3 = t2.spatialReference, y4 = b3.isGeographic, R2 = G(b3, p), h2 = L2(p, b3) && J(p, b3);
      if (!(g3 && y4 && h2 || !g3 && !y4 && R2))
        return null;
      const I2 = Q(c3, p, b3);
      if (null == I2)
        return null;
      if (i4[e4.originX] = I2.x, i4[e4.originY] = I2.y, i4[e4.originZ] = I2.z ?? 0, null != f3) {
        const { translation: t3, scale: r3, rotation: o4 } = f3, s4 = g3 ? 1 : z(p) / z(b3);
        i4[e4.translationX] = t3[0] * s4, i4[e4.translationY] = t3[2] * s4, i4[e4.translationZ] = -t3[1] * s4, i4[e4.scaleX] = r3[0], i4[e4.scaleY] = r3[2], i4[e4.scaleZ] = r3[1], i4[e4.rotationX] = o4[0], i4[e4.rotationY] = o4[2], i4[e4.rotationZ] = -o4[1], i4[e4.rotationDeg] = o4[3];
      }
      return { attributes: i4 };
    }
    return null == o3 ? { attributes: i4 } : "mesh" === o3.type || "extent" === o3.type ? null : { geometry: o3.toJSON(), attributes: i4 };
  });
}
function f2(t2, e3) {
  return __async(this, null, function* () {
    const r2 = yield Promise.all((e3.addAttachments ?? []).map((e4) => g2(t2, e4))), a4 = yield Promise.all((e3.updateAttachments ?? []).map((e4) => g2(t2, e4))), o3 = e3.deleteAttachments ?? [];
    return r2.length || a4.length || o3.length ? { adds: r2, updates: a4, deletes: [...o3] } : null;
  });
}
function g2(t2, e3) {
  return __async(this, null, function* () {
    const { feature: r2, attachment: a4 } = e3, { globalId: s4, name: n3, contentType: l, data: i4, uploadId: u } = a4, d3 = { globalId: s4 };
    if (r2 && ("attributes" in r2 ? d3.parentGlobalId = r2.attributes?.[t2.globalIdField] : r2.globalId && (d3.parentGlobalId = r2.globalId)), u)
      d3.uploadId = u;
    else if (i4) {
      const t3 = yield Wt(i4);
      t3 && (d3.contentType = t3.mediaType, d3.data = t3.data), i4 instanceof File && (d3.name = i4.name);
    }
    return n3 && (d3.name = n3), l && (d3.contentType = l), d3;
  });
}
function b2(t2, e3, r2) {
  if (!e3 || 0 === e3.length)
    return [];
  if (r2 && $(e3))
    return e3.map((t3) => t3.globalId);
  if (v(e3))
    return e3.map((t3) => t3.objectId);
  const a4 = r2 ? t2.globalIdField : t2.objectIdField;
  return a4 ? e3.map((t3) => t3.getAttribute(a4)) : [];
}
function y3(t2) {
  const e3 = t2?.assetMaps;
  if (e3) {
    for (const t3 of e3.addResults)
      t3.success || n.getLogger("esri.layers.graphics.sources.support.sourceUtils").error(`Failed to map asset to feature with globalId ${t3.globalId}.`);
    for (const t3 of e3.updateResults)
      t3.success || n.getLogger("esri.layers.graphics.sources.support.sourceUtils").error(`Failed to map asset to feature with globalId ${t3.globalId}.`);
  }
  const a4 = t2?.attachments, o3 = { addFeatureResults: t2?.addResults?.map(R) ?? [], updateFeatureResults: t2?.updateResults?.map(R) ?? [], deleteFeatureResults: t2?.deleteResults?.map(R) ?? [], addAttachmentResults: a4?.addResults ? a4.addResults.map(R) : [], updateAttachmentResults: a4?.updateResults ? a4.updateResults.map(R) : [], deleteAttachmentResults: a4?.deleteResults ? a4.deleteResults.map(R) : [] };
  return t2?.editMoment && (o3.editMoment = t2.editMoment), o3;
}
function R(t2) {
  const r2 = true === t2.success ? null : t2.error || { code: void 0, description: void 0 };
  return { objectId: t2.objectId, globalId: t2.globalId, error: r2 ? new s2("feature-layer-source:edit-failure", r2.description, { code: r2.code }) : null };
}
function h(e3, r2) {
  return new d2({ attributes: e3.attributes, geometry: y2(__spreadProps(__spreadValues({}, e3.geometry), { spatialReference: r2 })) });
}
function I(t2, e3) {
  return { adds: t2?.adds?.map((t3) => h(t3, e3)) || [], updates: t2?.updates?.map((t3) => ({ original: h(t3[0], e3), current: h(t3[1], e3) })) || [], deletes: t2?.deletes?.map((t3) => h(t3, e3)) || [], spatialReference: e3 };
}
function j(t2) {
  const e3 = t2.details.raw, r2 = +e3.code, a4 = +e3.extendedCode;
  return 500 === r2 && (-2147217144 === a4 || -2147467261 === a4);
}

// node_modules/@arcgis/core/layers/graphics/sources/FeatureLayerSource.js
var V2 = new n2({ originalAndCurrentFeatures: "original-and-current-features", none: "none" });
var $2 = new n2({ Started: "published", Publishing: "publishing", Stopped: "unavailable" });
var G2 = class extends m {
  constructor(e3) {
    super(e3), this.type = "feature-layer", this.supportedSourceTypes = /* @__PURE__ */ new Set(["Feature Layer", "Oriented Imagery Layer", "Table", "Catalog Layer"]), this.refresh = k(() => __async(this, null, function* () {
      yield this.load();
      const e4 = this.sourceJSON.editingInfo?.lastEditDate;
      if (null == e4)
        return { dataChanged: true, updates: {} };
      try {
        yield this._fetchService(null);
      } catch {
        return { dataChanged: true, updates: {} };
      }
      const t2 = e4 !== this.sourceJSON.editingInfo?.lastEditDate;
      return { dataChanged: t2, updates: t2 ? { editingInfo: this.sourceJSON.editingInfo, extent: this.sourceJSON.extent } : null };
    })), this._ongoingAssetUploads = /* @__PURE__ */ new Map();
  }
  load(e3) {
    const t2 = this.layer.sourceJSON, r2 = this._fetchService(t2, __spreadValues({}, e3)).then(() => this.layer.setUserPrivileges(this.sourceJSON.serviceItemId, e3)).then(() => this._ensureLatestMetadata(e3));
    return this.addResolvingPromise(r2), Promise.resolve(this);
  }
  initialize() {
    this.addHandles([d(() => {
      const e3 = this.layer;
      return e3 && "lastEditsEventDate" in e3 ? e3.lastEditsEventDate : null;
    }, (e3) => this._handleLastEditsEventChange(e3))]);
  }
  destroy() {
    this._removeEditInterceptor();
  }
  get queryTask() {
    const { capabilities: e3, parsedUrl: t2, gdbVersion: r2, spatialReference: s4, fieldsIndex: a4 } = this.layer, i4 = "infoFor3D" in this.layer ? this.layer.infoFor3D : null, n3 = "dynamicDataSource" in this.layer ? this.layer.dynamicDataSource : null, o3 = has("featurelayer-pbf") && e3?.query.supportsFormatPBF && null == i4, u = e3?.operations?.supportsQueryAttachments ?? false;
    return new x({ url: t2.path, pbfSupported: o3, fieldsIndex: a4, infoFor3D: i4, dynamicDataSource: n3, gdbVersion: r2, sourceSpatialReference: s4, queryAttachmentsSupported: u });
  }
  addAttachment(e3, t2) {
    return __async(this, null, function* () {
      yield this.load();
      const { layer: s4 } = this;
      yield T(s4, "editing");
      const a4 = e3.attributes[s4.objectIdField], i4 = s4.parsedUrl.path + "/" + a4 + "/addAttachment", n3 = this._getLayerRequestOptions(), o3 = this._getFormDataForAttachment(t2, n3.query);
      try {
        const e4 = yield U(i4, { body: o3 });
        return R(e4.data.addAttachmentResult);
      } catch (u) {
        throw this._createAttachmentErrorResult(a4, u);
      }
    });
  }
  updateAttachment(e3, t2, s4) {
    return __async(this, null, function* () {
      yield this.load();
      const { layer: a4 } = this;
      yield T(a4, "editing");
      const i4 = e3.attributes[a4.objectIdField], n3 = a4.parsedUrl.path + "/" + i4 + "/updateAttachment", o3 = this._getLayerRequestOptions({ query: { attachmentId: t2 } }), u = this._getFormDataForAttachment(s4, o3.query);
      try {
        const e4 = yield U(n3, { body: u });
        return R(e4.data.updateAttachmentResult);
      } catch (l) {
        throw this._createAttachmentErrorResult(i4, l);
      }
    });
  }
  applyEdits(e3, t2) {
    return __async(this, null, function* () {
      yield this.load();
      const { layer: s4 } = this;
      yield T(s4, "editing");
      const i4 = "infoFor3D" in s4 ? s4.infoFor3D : null, o3 = null != i4, u = o3 || (t2?.globalIdUsed ?? false), l = o3 ? yield this._uploadMeshesAndGetAssetMapEditsJSON(e3) : null, c3 = e3.addFeatures?.map((e4) => m2(this.layer, e4, i4)) ?? [], d3 = (yield Promise.all(c3)).filter(O), p = e3.updateFeatures?.map((e4) => m2(this.layer, e4, i4)) ?? [], h2 = (yield Promise.all(p)).filter(O), y4 = b2(this.layer, e3.deleteFeatures, u);
      i2(d3, h2, s4.spatialReference);
      const m3 = yield f2(this.layer, e3), f3 = s4.capabilities.editing.supportsAsyncApplyEdits && o3, g3 = t2?.gdbVersion || s4.gdbVersion, w2 = { gdbVersion: g3, rollbackOnFailure: t2?.rollbackOnFailureEnabled, useGlobalIds: u, returnEditMoment: t2?.returnEditMoment, usePreviousEditMoment: t2?.usePreviousEditMoment, async: f3 };
      yield i3(this.layer.url, g3, true);
      const S = c2(this.layer.url, g3 || null);
      if (yield o2(s4.url, g3, s4.historicMoment))
        throw new s2("feature-layer-source:historic-version", "Editing a historic version is not allowed");
      t2?.returnServiceEditsOption ? (w2.edits = JSON.stringify([{ id: s4.layerId, adds: d3.length ? d3 : null, updates: h2.length ? h2 : null, deletes: y4.length ? y4 : null, attachments: m3, assetMaps: l }]), w2.returnServiceEditsOption = V2.toJSON(t2?.returnServiceEditsOption), w2.returnServiceEditsInSourceSR = t2?.returnServiceEditsInSourceSR) : (w2.adds = d3.length ? JSON.stringify(d3) : null, w2.updates = h2.length ? JSON.stringify(h2) : null, w2.deletes = y4.length ? u ? JSON.stringify(y4) : y4.join(",") : null, w2.attachments = m3 && JSON.stringify(m3), w2.assetMaps = null != l ? JSON.stringify(l) : void 0);
      const q = this._getLayerRequestOptions({ method: "post", query: w2 });
      S && (q.authMode = "immediate", q.query.returnEditMoment = true, q.query.sessionId = t);
      const E = t2?.returnServiceEditsOption ? s4.url : s4.parsedUrl.path;
      let O2;
      try {
        O2 = f3 ? yield this._asyncApplyEdits(E + "/applyEdits", q) : yield U(E + "/applyEdits", q);
      } catch (_) {
        if (!j(_))
          throw _;
        q.authMode = "immediate", O2 = f3 ? yield this._asyncApplyEdits(E + "/applyEdits", q) : yield U(E + "/applyEdits", q);
      }
      return this._createEditsResult(O2);
    });
  }
  deleteAttachments(e3, t2) {
    return __async(this, null, function* () {
      yield this.load();
      const { layer: s4 } = this;
      yield T(s4, "editing");
      const a4 = e3.attributes[s4.objectIdField], i4 = s4.parsedUrl.path + "/" + a4 + "/deleteAttachments";
      try {
        return (yield U(i4, this._getLayerRequestOptions({ query: { attachmentIds: t2.join(",") }, method: "post" }))).data.deleteAttachmentResults.map(R);
      } catch (n3) {
        throw this._createAttachmentErrorResult(a4, n3);
      }
    });
  }
  fetchRecomputedExtents(e3 = {}) {
    const t2 = e3.signal;
    return this.load({ signal: t2 }).then(() => __async(this, null, function* () {
      const t3 = this._getLayerRequestOptions(__spreadProps(__spreadValues({}, e3), { query: { returnUpdates: true } })), { layerId: a4, url: i4 } = this.layer, { data: n3 } = yield U(`${i4}/${a4}`, t3), { id: o3, extent: u, fullExtent: l, timeExtent: c3 } = n3, d3 = u || l;
      return { id: o3, fullExtent: d3 && w.fromJSON(d3), timeExtent: c3 && c.fromJSON({ start: c3[0], end: c3[1] }) };
    }));
  }
  queryAttachments(_0) {
    return __async(this, arguments, function* (e3, t2 = {}) {
      yield this.load();
      const r2 = this._getLayerRequestOptions(t2);
      return this.queryTask.executeAttachmentQuery(e3, r2);
    });
  }
  queryFeatures(e3, t2) {
    return __async(this, null, function* () {
      yield this.load();
      const r2 = yield this.queryTask.execute(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
      return e3.outStatistics?.length && r2.features.length && r2.features.forEach((t3) => {
        const r3 = t3.attributes;
        e3.outStatistics?.forEach(({ outStatisticFieldName: e4 }) => {
          if (e4) {
            const t4 = e4.toLowerCase();
            t4 && t4 in r3 && e4 !== t4 && (r3[e4] = r3[t4], delete r3[t4]);
          }
        });
      }), r2;
    });
  }
  queryFeaturesJSON(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeJSON(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryObjectIds(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeForIds(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryFeatureCount(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeForCount(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryExtent(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeForExtent(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryRelatedFeatures(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeRelationshipQuery(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryRelatedFeaturesCount(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeRelationshipQueryForCount(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryTopFeatures(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeTopFeaturesQuery(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryTopObjectIds(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeForTopIds(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryTopExtents(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeForTopExtents(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  queryTopCount(e3, t2) {
    return __async(this, null, function* () {
      return yield this.load(), this.queryTask.executeForTopCount(e3, __spreadProps(__spreadValues({}, t2), { query: this._createRequestQueryOptions(t2) }));
    });
  }
  fetchPublishingStatus() {
    return __async(this, null, function* () {
      if (!g(this.layer.url))
        return "unavailable";
      const e3 = V(this.layer.url, "status"), t2 = yield U(e3, { query: { f: "json" } });
      return $2.fromJSON(t2.data.status);
    });
  }
  uploadAssets(e3, t2) {
    return __async(this, null, function* () {
      const { uploadAssets: r2 } = yield import("./chunk-T35FBRJU.js");
      return r2(e3, { layer: this.layer, ongoingUploads: this._ongoingAssetUploads }, t2);
    });
  }
  _handleLastEditsEventChange(e3) {
    const t2 = this.layer;
    if (null == e3 || !("capabilities" in t2) || !("effectiveCapabilities" in t2))
      return;
    if (!(!t2.capabilities?.operations?.supportsEditing && t2.effectiveCapabilities?.operations?.supportsEditing))
      return;
    const r2 = t2.url;
    if (null == r2)
      return;
    "layerId" in t2 && V(r2, t2.layerId.toString());
    this._getOrCreateEditInterceptor(r2).before = (t3) => {
      const r3 = t3.requestOptions.method ?? "auto";
      if ("auto" === r3 || "head" === r3) {
        const r4 = t3.requestOptions.query ?? {};
        r4._ts = e3.getTime(), t3.requestOptions.query = r4;
      }
    };
  }
  _getOrCreateEditInterceptor(e3) {
    return null == this._editInterceptor && (this._editInterceptor = { urls: e3 }, s.request.internalInterceptors.push(this._editInterceptor)), this._editInterceptor;
  }
  _removeEditInterceptor() {
    null != this._editInterceptor && (L(s.request.internalInterceptors, this._editInterceptor), this._editInterceptor = null);
  }
  _asyncApplyEdits(e3, t2) {
    return __async(this, null, function* () {
      const s4 = (yield U(e3, t2)).data.statusUrl;
      for (; ; ) {
        const e4 = (yield U(s4, { query: { f: "json" }, responseType: "json" })).data;
        switch (e4.status) {
          case "Completed":
            return U(e4.resultUrl, { query: { f: "json" }, responseType: "json" });
          case "CompletedWithErrors":
            throw new s2("async-applyEdits-failed", "asynchronous applyEdits call failed.");
          case "Failed ImportChanges":
          case "InProgress":
          case "Pending":
          case "ExportAttachments":
          case "ExportChanges":
          case "ExportingData":
          case "ExportingSnapshot":
          case "ImportAttachments":
          case "ProvisioningReplica":
          case "UnRegisteringReplica":
            break;
          default:
            throw new s2("async-applyEdits-failed", "asynchronous applyEdits call failed (undefined response status)");
        }
        yield A(H);
      }
    });
  }
  _createRequestQueryOptions(e3) {
    const t2 = __spreadValues(__spreadProps(__spreadValues({}, this.layer.customParameters), { token: this.layer.apiKey }), e3?.query);
    return this.layer.datesInUnknownTimezone && (t2.timeReferenceUnknownClient = true), t2;
  }
  _fetchService(e3, t2) {
    return __async(this, null, function* () {
      if (!e3) {
        const s5 = {};
        has("featurelayer-advanced-symbols") && (s5.returnAdvancedSymbols = true), t2?.cacheBust && (s5._ts = Date.now());
        const { data: a4 } = yield U(this.layer.parsedUrl.path, this._getLayerRequestOptions({ query: s5, signal: t2?.signal }));
        e3 = a4;
      }
      this.sourceJSON = yield this._patchServiceJSON(e3, t2?.signal);
      const s4 = e3.type;
      if (!this.supportedSourceTypes.has(s4))
        throw new s2("feature-layer-source:unsupported-type", `Source type "${s4}" is not supported`);
    });
  }
  _patchServiceJSON(e3, t2) {
    return __async(this, null, function* () {
      if ("Table" !== e3.type && e3.geometryType && !e3?.drawingInfo?.renderer && !e3.defaultSymbol) {
        const t3 = o(e3.geometryType).renderer;
        e2("drawingInfo.renderer", t3, e3);
      }
      if ("esriGeometryMultiPatch" === e3.geometryType && e3.infoFor3D && (e3.geometryType = "mesh"), null == e3.extent)
        try {
          const { data: s4 } = yield U(this.layer.url, this._getLayerRequestOptions({ signal: t2 }));
          s4.spatialReference && (e3.extent = { xmin: 0, ymin: 0, xmax: 0, ymax: 0, spatialReference: s4.spatialReference });
        } catch (s4) {
          a2(s4);
        }
      return e3;
    });
  }
  _ensureLatestMetadata(e3) {
    return __async(this, null, function* () {
      if (this.layer.userHasUpdateItemPrivileges && this.sourceJSON.cacheMaxAge > 0)
        return this._fetchService(null, __spreadProps(__spreadValues({}, e3), { cacheBust: true }));
    });
  }
  _uploadMeshesAndGetAssetMapEditsJSON(e3) {
    return __async(this, null, function* () {
      const { addAssetFeatures: t2 } = e3;
      if (!t2?.length)
        return null;
      if (yield this._areAllAssetsAlreadyMapped(t2))
        return null;
      const r2 = e3.addFeatures.filter((e4) => e4.geometry);
      if (t2.length !== r2.length + e3.updateFeatures.length)
        throw new s2("feature-layer-source:unsupported-mesh-edits", "Mixing attribute only edits with mesh geometry edits is not currently supported");
      const s4 = new Array(), a4 = /* @__PURE__ */ new Map();
      for (const i4 of t2) {
        const { geometry: e4 } = i4, { vertexSpace: t3 } = e4;
        if (a3(t3))
          s4.push(e4);
        else {
          const t4 = e4.anchor, { convertMeshVertexSpace: r3 } = yield import("./chunk-YCLDW2YP.js"), n3 = yield r3(e4, new i({ origin: [t4.x, t4.y, t4.z ?? 0] }));
          a4.set(n3, e4), i4.geometry = n3, s4.push(n3);
        }
      }
      yield this.uploadAssets(s4);
      for (const [i4, n3] of a4)
        n3.addExternalSources(i4.metadata.externalSources.items);
      return { adds: this._getAssetMapEditsJSON(t2), updates: [], deletes: [] };
    });
  }
  _getAssetMapEditsJSON(e3) {
    const t2 = new Array(), r2 = this.layer.globalIdField, s4 = this.layer.parsedUrl;
    for (const a4 of e3) {
      const e4 = a4.geometry, { metadata: i4 } = e4, n3 = i4.getExternalSourcesOnService(s4), o3 = a4.getAttribute(r2);
      if (0 === n3.length) {
        n.getLogger(this).error(`Skipping feature ${o3}. The mesh it is associated with has not been uploaded to the service and cannot be mapped to it.`);
        continue;
      }
      const { source: u } = n3.find(v2) ?? n3[0];
      for (const r3 of u)
        1 === r3.parts.length ? t2.push({ globalId: r(), parentGlobalId: o3, assetName: r3.assetName, assetHash: r3.parts[0].partHash, flags: [] }) : n.getLogger(this).error(`Skipping asset ${r3.assetName}. It does not have exactly one part, so we cannot map it to a feature.`);
    }
    return t2;
  }
  _createEditsResult(e3) {
    const t2 = e3.data, { layerId: r2 } = this.layer, s4 = [];
    let a4 = null;
    if (Array.isArray(t2))
      for (const n3 of t2)
        s4.push({ id: n3.id, editedFeatures: n3.editedFeatures }), n3.id === r2 && (a4 = { addResults: n3.addResults ?? [], updateResults: n3.updateResults ?? [], deleteResults: n3.deleteResults ?? [], attachments: n3.attachments, editMoment: n3.editMoment });
    else
      a4 = t2;
    const i4 = y3(a4);
    if (s4.length > 0) {
      i4.editedFeatureResults = [];
      for (const e4 of s4) {
        const { editedFeatures: t3 } = e4, r3 = t3?.spatialReference ? new f(t3.spatialReference) : null;
        i4.editedFeatureResults.push({ layerId: e4.id, editedFeatures: I(t3, r3) });
      }
    }
    return i4;
  }
  _createAttachmentErrorResult(e3, t2) {
    const r2 = t2.details.messages?.[0] || t2.message, s4 = t2.details.httpStatus || t2.details.messageCode;
    return { objectId: e3, globalId: null, error: new s2("feature-layer-source:attachment-failure", r2, { code: s4 }) };
  }
  _getFormDataForAttachment(e3, t2) {
    const r2 = e3 instanceof FormData ? e3 : e3 && e3.elements ? new FormData(e3) : null;
    if (r2)
      for (const s4 in t2) {
        const e4 = t2[s4];
        null != e4 && (r2.set ? r2.set(s4, e4) : r2.append(s4, e4));
      }
    return r2;
  }
  _getLayerRequestOptions(e3 = {}) {
    const { layer: t2, layer: { parsedUrl: r2, gdbVersion: s4 } } = this;
    return __spreadProps(__spreadValues({}, e3), { query: __spreadValues(__spreadProps(__spreadValues({ gdbVersion: s4, layer: "dynamicDataSource" in t2 && t2.dynamicDataSource ? JSON.stringify({ source: t2.dynamicDataSource }) : void 0 }, r2.query), { f: "json" }), this._createRequestQueryOptions(e3)), responseType: "json" });
  }
  _areAllAssetsAlreadyMapped(e3) {
    return __async(this, null, function* () {
      const { layer: t2 } = this, { globalIdField: r2, parsedUrl: s4 } = t2, i4 = "infoFor3D" in t2 ? t2.infoFor3D : null;
      if (null == i4 || null == r2)
        return false;
      const n3 = F(i4);
      if (null == n3)
        return false;
      const o3 = V(s4.path, `../${n3.id}`), u = new Array();
      for (const a4 of e3) {
        if (!(a4.geometry.metadata.getExternalSourcesOnService(s4).length > 0))
          return false;
        u.push(a4);
      }
      const l = u.map((e4) => e4.getAttribute(r2)).filter(O);
      if (0 === l.length)
        return false;
      const { assetMapFieldRoles: { parentGlobalId: c3, assetHash: d3 } } = i4, p = new b({ where: `${c3} IN (${l.map((e4) => `'${e4}'`)})`, outFields: [d3, c3], returnGeometry: false }), h2 = yield s3(o3, p), { features: y4 } = h2;
      return 0 !== y4.length && !u.some((e4) => {
        const t3 = e4.getAttribute(r2);
        if (!t3)
          return true;
        const { metadata: a4 } = e4.geometry, i5 = y4.filter((e5) => e5.getAttribute(c3) === t3);
        if (0 === i5.length)
          return true;
        const n4 = i5.map((e5) => e5.getAttribute(d3));
        return a4.getExternalSourcesOnService(s4).flatMap(({ source: e5 }) => e5.flatMap((e6) => e6.parts.map((e7) => e7.partHash))).some((e5) => n4.every((t4) => e5 !== t4));
      });
    });
  }
};
e([y()], G2.prototype, "type", void 0), e([y({ constructOnly: true })], G2.prototype, "layer", void 0), e([y({ constructOnly: true })], G2.prototype, "supportedSourceTypes", void 0), e([y({ readOnly: true })], G2.prototype, "queryTask", null), G2 = e([a("esri.layers.graphics.sources.FeatureLayerSource")], G2);
var H = 1e3;
var z2 = G2;

export {
  z2 as z
};
//# sourceMappingURL=chunk-WGJJXPV7.js.map
