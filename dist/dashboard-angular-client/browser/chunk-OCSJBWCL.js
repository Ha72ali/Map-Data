import {
  A as A2
} from "./chunk-3ZFOQBU7.js";
import {
  R as R2,
  V as V3
} from "./chunk-ISYYUEDS.js";
import {
  a as a5
} from "./chunk-6X7VYUYA.js";
import {
  n as n6
} from "./chunk-GIZ3RRKW.js";
import {
  t as t4
} from "./chunk-NKS73VQZ.js";
import {
  i as i4
} from "./chunk-UUWAG2SR.js";
import {
  l as l2
} from "./chunk-KRK4OVZD.js";
import {
  S as S4
} from "./chunk-LV2A7KVX.js";
import {
  i as i3
} from "./chunk-KPRRWOGC.js";
import {
  F
} from "./chunk-ARJJP56N.js";
import {
  t as t3
} from "./chunk-K3PLWNHU.js";
import {
  t as t2
} from "./chunk-2S5SXLL5.js";
import {
  c as c2
} from "./chunk-OG24GKML.js";
import {
  p
} from "./chunk-GBZE54GK.js";
import {
  c
} from "./chunk-CRBQWZMW.js";
import {
  s as s3
} from "./chunk-UWOATJXA.js";
import {
  p as p2
} from "./chunk-627SYJ7O.js";
import {
  C,
  l as l4
} from "./chunk-OEQYRPF6.js";
import {
  m as m3,
  o as o2,
  u
} from "./chunk-EIARW56B.js";
import {
  l as l3
} from "./chunk-P42DJ3OX.js";
import {
  d as d4
} from "./chunk-ZP37CRQ4.js";
import {
  p as p3
} from "./chunk-PSUD6NH2.js";
import {
  e as e3
} from "./chunk-LTWQYIJF.js";
import {
  j as j4
} from "./chunk-TPOHS65A.js";
import {
  f as f2
} from "./chunk-GGRPX5QX.js";
import {
  l
} from "./chunk-GGG4K7D6.js";
import {
  t
} from "./chunk-XCPRP2KL.js";
import {
  b as b4
} from "./chunk-6F52T6PY.js";
import {
  a as a4,
  f as f3,
  g as g3,
  l as l5,
  s as s4,
  t as t5,
  v as v2,
  y as y3
} from "./chunk-SATVR2AT.js";
import {
  S as S2
} from "./chunk-KJ5YDJI6.js";
import {
  f as f4
} from "./chunk-SIUD6VOA.js";
import {
  p as p4
} from "./chunk-F3PKGTLV.js";
import {
  A,
  E,
  F as F2,
  I as I2,
  L,
  M,
  N,
  O,
  P,
  R,
  S as S3,
  T,
  U as U2,
  b as b3,
  g,
  j as j3,
  m as m4,
  q,
  v,
  w as w3,
  x,
  y as y2
} from "./chunk-I45L7LN5.js";
import {
  d as d3
} from "./chunk-ZGKHY7ZS.js";
import {
  d as d2
} from "./chunk-VFY3HP2G.js";
import {
  k as k2
} from "./chunk-ZQQ553GQ.js";
import {
  j2
} from "./chunk-YTC5APIA.js";
import {
  n as n5
} from "./chunk-QUJPV6JW.js";
import {
  b as b2
} from "./chunk-FLPV6LMH.js";
import {
  K
} from "./chunk-FFM66Y5M.js";
import {
  d,
  m as m2,
  w as w2
} from "./chunk-LRQVNXVW.js";
import {
  i as i2
} from "./chunk-5YCNWSDC.js";
import {
  g as g2,
  p as p5
} from "./chunk-EQ4EANPC.js";
import {
  n as n4
} from "./chunk-F24FRQYV.js";
import {
  i
} from "./chunk-OHR2EMYV.js";
import {
  j
} from "./chunk-EHKCE57B.js";
import {
  V as V2,
  n as n3
} from "./chunk-ZDVJGW4C.js";
import {
  m
} from "./chunk-LHPNLXQX.js";
import {
  n as n2
} from "./chunk-6ZGC7MSX.js";
import {
  o,
  w
} from "./chunk-BYMJUQYJ.js";
import {
  f,
  r
} from "./chunk-YKH4U5BK.js";
import {
  s as s2
} from "./chunk-VHLVKE6R.js";
import {
  I,
  U,
  V
} from "./chunk-IMLUWAKH.js";
import {
  S,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a2,
  b
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  a as a3,
  h,
  k
} from "./chunk-NVGBLY2Q.js";
import {
  a,
  e as e2,
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  has
} from "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/sources/MemorySource.js
var _ = 0;
var T2 = class extends m.LoadableMixin(n2(V2)) {
  constructor(e5) {
    super(e5), this._idToClientGraphic = null, this.type = "memory";
  }
  load(e5) {
    const t6 = null != e5 ? e5.signal : null;
    return this.addResolvingPromise(this._startWorker(t6)), Promise.resolve(this);
  }
  destroy() {
    this._connection?.close(), this._connection = null;
  }
  get _workerGeometryType() {
    const e5 = this.layer?.geometryType;
    return e5 ? this._geometryTypeRequiresClientGraphicMapping(e5) ? "polygon" : e5 : null;
  }
  applyEdits(e5) {
    return this.load().then(() => this._applyEdits(e5));
  }
  openPorts() {
    return this.load().then(() => this._connection.openPorts());
  }
  queryFeatures(_0) {
    return __async(this, arguments, function* (e5, t6 = {}) {
      yield this.load(t6);
      const r2 = yield this._connection.invoke("queryFeatures", e5 ? e5.toJSON() : null, t6);
      t2(e5, this.layer.spatialReference, r2);
      const s5 = d3.fromJSON(r2);
      if (!this._requiresClientGraphicMapping())
        return s5;
      const i5 = this.layer.objectIdField;
      for (const o4 of s5.features) {
        const e6 = o4.attributes[i5], t7 = this._idToClientGraphic.get(e6);
        t7 && (o4.geometry = t7.geometry);
      }
      return s5.geometryType = this.layer.geometryType, s5;
    });
  }
  queryFeaturesJSON(_0) {
    return __async(this, arguments, function* (e5, t6 = {}) {
      if (this._requiresClientGraphicMapping())
        throw new s("query-features-json:unsupported", "Cannot query in JSON format for client only geometry types (mesh and extent)");
      yield this.load(t6);
      const r2 = yield this._connection.invoke("queryFeatures", e5 ? e5.toJSON() : null, t6);
      return t2(e5, this.layer.spatialReference, r2), r2;
    });
  }
  queryFeatureCount(e5, t6 = {}) {
    return this.load(t6).then(() => this._connection.invoke("queryFeatureCount", e5 ? e5.toJSON() : null, t6));
  }
  queryObjectIds(e5, t6 = {}) {
    return this.load(t6).then(() => this._connection.invoke("queryObjectIds", e5 ? e5.toJSON() : null, t6));
  }
  queryExtent(e5, t6 = {}) {
    return this.load(t6).then(() => this._connection.invoke("queryExtent", e5 ? e5.toJSON() : null, t6)).then((e6) => ({ count: e6.count, extent: w.fromJSON(e6.extent) }));
  }
  querySnapping(e5, t6 = {}) {
    return this.load(t6).then(() => this._connection.invoke("querySnapping", e5, t6));
  }
  _applyEdits(e5) {
    return __async(this, null, function* () {
      if (!this._connection)
        throw new s("feature-layer-source:edit-failure", "Memory source not loaded");
      const t6 = this.layer.objectIdField;
      let r2 = null;
      const i5 = [], o4 = [];
      yield Promise.all([this._prepareClientMapping(e5.addFeatures, null), this._prepareClientMapping(e5.updateFeatures, null)]);
      const n8 = (e6) => "objectId" in e6 && null != e6.objectId ? e6.objectId : "attributes" in e6 && null != e6.attributes[t6] ? e6.attributes[t6] : null;
      if (e5.addFeatures && (r2 = this._prepareAddFeatures(e5.addFeatures)), e5.deleteFeatures)
        for (const s5 of e5.deleteFeatures) {
          const e6 = n8(s5);
          null != e6 && i5.push(e6);
        }
      const a6 = e5.updateFeatures && this._idToClientGraphic ? /* @__PURE__ */ new Map() : null;
      if (e5.updateFeatures) {
        for (const s5 of e5.updateFeatures)
          if (o4.push(this._serializeFeature(s5)), a6) {
            const e6 = n8(s5);
            null != e6 && a6.set(e6, s5);
          }
      }
      i3(r2 ? r2.features : null, o4, this.layer.spatialReference);
      const { fullExtent: l6, featureEditResults: u2 } = yield this._connection.invoke("applyEdits", { adds: r2 ? r2.features : [], updates: o4, deletes: i5 });
      return this.fullExtent = l6, r2 && r2.finish(u2.uidToObjectId), this._updateClientGraphicIds(a6, u2), this._createEditsResult(u2);
    });
  }
  _prepareClientMapping(e5, t6) {
    return __async(this, null, function* () {
      if ("mesh" !== this._layerOrSourceGeometryType || null == e5)
        return;
      const r2 = [];
      for (const { geometry: s5 } of e5)
        null == s5 || "mesh" !== s5.type || s5.hasExtent || s5.loaded || r2.push(s5.load({ signal: t6 }));
      r2.length && (yield Promise.all(r2));
    });
  }
  _updateClientGraphicIds(e5, t6) {
    if (this._idToClientGraphic) {
      if (e5)
        for (const r2 of t6.updateResults) {
          if (!r2.success)
            continue;
          const t7 = e5.get(r2.objectId);
          null != t7 && this._addIdToClientGraphic(t7);
        }
      for (const e6 of t6.deleteResults)
        e6.success && this._idToClientGraphic.delete(e6.objectId);
    }
  }
  _createEditsResult(e5) {
    return { addFeatureResults: e5.addResults ? e5.addResults.map(this._createFeatureEditResult, this) : [], updateFeatureResults: e5.updateResults ? e5.updateResults.map(this._createFeatureEditResult, this) : [], deleteFeatureResults: e5.deleteResults ? e5.deleteResults.map(this._createFeatureEditResult, this) : [], addAttachmentResults: [], updateAttachmentResults: [], deleteAttachmentResults: [] };
  }
  _createFeatureEditResult(e5) {
    const t6 = true === e5.success ? null : e5.error || { code: void 0, description: void 0 };
    return { objectId: e5.objectId, globalId: e5.globalId, error: t6 ? new s("feature-layer-source:edit-failure", t6.description, { code: t6.code }) : null };
  }
  _prepareAddFeatures(e5) {
    const t6 = /* @__PURE__ */ new Map(), r2 = new Array(e5.length);
    let s5 = null;
    for (let o4 = 0; o4 < e5.length; o4++) {
      const i6 = e5[o4], n8 = this._serializeFeature(i6);
      s5 || null == i6.geometry || (s5 = i6.geometry.type), r2[o4] = n8, t6.set(`${n8.uid}`, i6);
    }
    const i5 = this;
    return { features: r2, inferredGeometryType: s5, finish(e6) {
      const r3 = i5.sourceJSON.objectIdField;
      for (const s6 in e6) {
        const o4 = e6[s6], n8 = t6.get(s6);
        n8 && (n8.attributes || (n8.attributes = {}), -1 === o4 ? delete n8.attributes[r3] : n8.attributes[r3] = o4, i5._addIdToClientGraphic(n8));
      }
    } };
  }
  _addIdToClientGraphic(e5) {
    if (!this._idToClientGraphic)
      return;
    const t6 = this.sourceJSON.objectIdField, r2 = e5.attributes?.[t6];
    null != r2 && this._idToClientGraphic.set(r2, e5);
  }
  get _layerOrSourceGeometryType() {
    return this.layer?.geometryType ?? this.sourceJSON?.geometryType;
  }
  _requiresClientGraphicMapping() {
    return this._geometryTypeRequiresClientGraphicMapping(this._layerOrSourceGeometryType);
  }
  _geometryRequiresClientGraphicMapping(e5) {
    return this._geometryTypeRequiresClientGraphicMapping(e5.type);
  }
  _geometryTypeRequiresClientGraphicMapping(e5) {
    return "mesh" === e5 || "multipatch" === e5 || "extent" === e5;
  }
  _serializeFeature(e5) {
    const { attributes: t6 } = e5, r2 = this._geometryForSerialization(e5), s5 = (_++).toString();
    return r2 ? { uid: s5, geometry: r2.toJSON(), attributes: t6 } : { uid: s5, attributes: t6 };
  }
  _geometryForSerialization(e5) {
    const { geometry: t6 } = e5;
    if (null == t6)
      return null;
    if (this._geometryRequiresClientGraphicMapping(t6)) {
      return t6.extent ? j.fromExtent(t6.extent) : null;
    }
    return t6;
  }
  _startWorker(e5) {
    return __async(this, null, function* () {
      this._connection = yield p4("MemorySourceWorker", { strategy: has("feature-layers-workers") ? "dedicated" : "local", signal: e5, registryTarget: this });
      const { fields: t6, spatialReference: r2, objectIdField: s5, hasM: i5, hasZ: n8, timeInfo: l6, dateFieldsTimeZone: u2 } = this.layer, p7 = "defaults" === this.layer.originOf("spatialReference");
      yield this._prepareClientMapping(this.items, e5);
      const c3 = this._prepareAddFeatures(this.items);
      this.addHandles(this.on("before-changes", (e6) => {
        n.getLogger(this).error("Source modifications will not propagate after layer has been loaded. Please use .applyEdits() instead"), e6.preventDefault();
      }));
      const d5 = { features: c3.features, fields: t6?.map((e6) => e6.toJSON()), geometryType: i.toJSON(this._workerGeometryType), hasM: "mesh" !== this._layerOrSourceGeometryType && i5, hasZ: "mesh" === this._layerOrSourceGeometryType || n8, objectIdField: s5, spatialReference: p7 ? null : r2 && r2.toJSON(), timeInfo: l6?.toJSON() ?? null, dateFieldsTimeZone: u2 }, h2 = yield this._connection.invoke("load", d5, { signal: e5 });
      for (const a6 of h2.warnings)
        n.getLogger(this.layer).warn("#load()", `${a6.message} (title: '${this.layer.title || "no title"}', id: '${this.layer.id ?? "no id"}')`, { warning: a6 });
      h2.featureErrors.length && n.getLogger(this.layer).warn("#load()", `Encountered ${h2.featureErrors.length} validation errors while loading features. (title: '${this.layer.title || "no title"}', id: '${this.layer.id ?? "no id"}')`, { errors: h2.featureErrors });
      const y4 = h2.layerDefinition;
      this._geometryTypeRequiresClientGraphicMapping(c3.inferredGeometryType) && (y4.geometryType = i.toJSON(c3.inferredGeometryType)), this.sourceJSON = y4, this._requiresClientGraphicMapping() && (this._idToClientGraphic = /* @__PURE__ */ new Map()), c3.finish(h2.assignedObjectIds);
    });
  }
};
e([n3({ Type: d2, ensureType: b(d2) })], T2.prototype, "itemType", void 0), e([y()], T2.prototype, "type", void 0), e([y({ constructOnly: true })], T2.prototype, "layer", void 0), e([y({ readOnly: true })], T2.prototype, "_workerGeometryType", null), e([y()], T2.prototype, "sourceJSON", void 0), T2 = e([a2("esri.layers.graphics.sources.MemorySource")], T2);

// node_modules/@arcgis/core/layers/support/PublishingInfo.js
var e4 = class extends S {
  constructor() {
    super(...arguments), this.updating = false, this.status = "unknown";
  }
};
e([y()], e4.prototype, "updating", void 0), e([y()], e4.prototype, "status", void 0), e4 = e([a2("esri.layers.support.PublishingInfo")], e4);
var p6 = e4;

// node_modules/@arcgis/core/layers/mixins/PublishableLayer.js
var o3 = Symbol();
var n7 = (i5) => {
  var n8;
  let u2 = class extends i5 {
    constructor() {
      super(...arguments), this[n8] = true;
    }
    get publishingInfo() {
      if (this.destroyed)
        return null;
      const t6 = this._get("publishingInfo");
      if (t6)
        return t6;
      const s5 = new p6();
      return this._checkPublishingStatus(s5), s5;
    }
    _checkPublishingStatus(t6) {
      const s5 = 250, e5 = 125;
      let r2 = 0;
      const o4 = (s6) => __async(this, null, function* () {
        let n9;
        t6.updating = true;
        try {
          n9 = yield this.fetchPublishingStatus();
        } catch (u3) {
          n9 = "unavailable";
        }
        "published" !== n9 && "unavailable" !== n9 || ("publishing" === t6.status && this.refresh(), i6.remove()), t6.status = n9, t6.updating = false, i6.removed || (r2 = setTimeout(o4, s6, s6 + e5));
      }), i6 = { removed: false, remove() {
        this.removed = true, clearTimeout(r2);
      } };
      this.when().catch(() => i6.remove()), o4(s5), this.addHandles(i6);
    }
  };
  return n8 = o3, e([y({ readOnly: true, clonable: false })], u2.prototype, "publishingInfo", null), u2 = e([a2("esri.layers.mixins.PublishableLayer")], u2), u2;
};

// node_modules/@arcgis/core/layers/FeatureLayer.js
var Ne = "FeatureLayer";
function $e(e5, r2) {
  return new s("layer:unsupported", `Layer (${e5.title}, ${e5.id}) of type '${e5.declaredClass}' ${r2}`, { layer: e5 });
}
function Ge(e5) {
  return e5 && e5 instanceof V2;
}
var Je = s3();
function We(e5, r2, t6) {
  const i5 = !!t6?.writeLayerSchema;
  return { enabled: i5, ignoreOrigin: i5 };
}
var Be = class extends R2(c2(c(n7(F(l(p(l3(t(f2(l2(b4(j4(S2(e3(i4(i2(f4))))))))))))))))) {
  constructor(...e5) {
    super(...e5), this.charts = null, this.copyright = null, this.displayField = null, this.dynamicDataSource = null, this.fields = null, this.fieldsIndex = null, this.formTemplate = null, this.fullExtent = null, this.geometryType = null, this.hasM = void 0, this.hasZ = void 0, this.infoFor3D = null, this.isTable = false, this.labelsVisible = true, this.labelingInfo = null, this.legendEnabled = true, this.objectIdField = null, this.outFields = null, this.path = null, this.popupEnabled = true, this.popupTemplate = null, this.resourceInfo = null, this.screenSizePerspectiveEnabled = true, this.spatialReference = f.WGS84, this.subtypeCode = null, this.supportedSourceTypes = /* @__PURE__ */ new Set(["Feature Layer", "Oriented Imagery Layer", "Table", "Catalog Layer"]), this.templates = null, this.timeInfo = null, this.title = null, this.sublayerTitleMode = "item-title", this.type = "feature", this.typeIdField = null, this.types = null, this.visible = true, this._debouncedSaveOperations = k((e6, r2, t6) => __async(this, null, function* () {
      const { save: i5, saveAs: o4 } = yield import("./chunk-Z4SIQGN6.js");
      switch (e6) {
        case A2.SAVE:
          return i5(this, r2);
        case A2.SAVE_AS:
          return o4(this, t6, r2);
      }
    }));
  }
  destroy() {
    this.source?.destroy();
  }
  normalizeCtorArgs(e5, r2) {
    return "string" == typeof e5 ? __spreadValues({ url: e5 }, r2) : e5;
  }
  load(e5) {
    const r2 = null != e5 ? e5.signal : null;
    if (this.portalItem?.loaded && this.source)
      return this.addResolvingPromise(this.createGraphicsSource(r2).then((e6) => this.initLayerProperties(e6))), Promise.resolve(this);
    const t6 = this.loadFromPortal({ supportedTypes: ["Feature Service", "Feature Collection", "Scene Service"] }, e5).catch(a3).then(() => __async(this, null, function* () {
      if (this.url && null == this.layerId && /FeatureServer|MapServer\/*$/i.test(this.url)) {
        const e6 = yield this._fetchFirstValidLayerId(r2);
        null != e6 && (this.layerId = e6);
      }
      if (!this.url && !this._hasMemorySource())
        throw new s("feature-layer:missing-url-or-source", "Feature layer must be created with either a url or a source");
      return this.initLayerProperties(yield this.createGraphicsSource(r2));
    })).then(() => T(this, "load", e5));
    return this.addResolvingPromise(t6), Promise.resolve(this);
  }
  readCapabilities(e5, r2) {
    return r2 = r2.layerDefinition || r2, a5(r2, this.url);
  }
  get createQueryVersion() {
    return this.commitProperty("definitionExpression"), this.commitProperty("dynamicDataSource"), this.commitProperty("timeExtent"), this.commitProperty("timeOffset"), this.commitProperty("geometryType"), this.commitProperty("gdbVersion"), this.commitProperty("historicMoment"), this.commitProperty("returnZ"), this.commitProperty("capabilities"), this.commitProperty("returnM"), (this._get("createQueryVersion") ?? 0) + 1;
  }
  get editingEnabled() {
    return !(this.loaded && !this.capabilities?.operations.supportsEditing) && (this._isOverridden("editingEnabled") ? this._get("editingEnabled") : this._hasMemorySource() || this.userHasEditingPrivileges);
  }
  set editingEnabled(e5) {
    this._overrideIfSome("editingEnabled", e5);
  }
  readEditingEnabled(e5, r2) {
    return this._readEditingEnabled(r2, false);
  }
  readEditingEnabledFromWebMap(e5, r2, t6) {
    return this._readEditingEnabled(r2, true, t6);
  }
  writeEditingEnabled(e5, r2) {
    this._writeEditingEnabled(e5, r2, false);
  }
  writeEditingEnabledToWebMap(e5, r2, t6, i5) {
    this._writeEditingEnabled(e5, r2, true, i5);
  }
  get effectiveEditingEnabled() {
    return v(this);
  }
  readIsTable(e5, r2) {
    return "Table" === (r2 = r2?.layerDefinition ?? r2).type || !r2.geometryType;
  }
  writeIsTable(e5, r2, t6, i5) {
    i5?.writeLayerSchema && e2(t6, e5 ? "Table" : "Feature Layer", r2);
  }
  readGlobalIdField(e5, r2) {
    return R(r2.layerDefinition || r2);
  }
  readObjectIdField(e5, r2) {
    return M(r2.layerDefinition || r2);
  }
  get parsedUrl() {
    const e5 = I(this.url);
    return null != e5 && (null != this.dynamicDataSource ? e5.path = V(e5.path, "dynamicLayer") : null != this.layerId && (e5.path = V(e5.path, this.layerId.toString()))), e5;
  }
  get defaultPopupTemplate() {
    return this.createPopupTemplate();
  }
  set renderer(e5) {
    p5(e5, this.fieldsIndex), this._set("renderer", e5);
  }
  readRenderer(e5, r2, i5) {
    r2 = r2.layerDefinition || r2;
    const o4 = r2.drawingInfo?.renderer;
    if (o4) {
      const e6 = o2(o4, r2, i5) ?? void 0;
      return e6 || n.getLogger(this).error("Failed to create renderer", { rendererDefinition: r2.drawingInfo.renderer, layer: this, context: i5 }), e6;
    }
    return U2(r2, i5);
  }
  set source(e5) {
    const r2 = this._get("source");
    r2 !== e5 && (Ge(r2) && this._resetMemorySource(r2), Ge(e5) && this._initMemorySource(e5), this._set("source", e5));
  }
  castSource(e5) {
    return e5 ? Array.isArray(e5) || e5 instanceof V2 ? new T2({ layer: this, items: e5 }) : e5 : null;
  }
  readSource(e5, r2) {
    const t6 = d3.fromJSON(r2.featureSet);
    return new T2({ layer: this, items: t6?.features ?? [] });
  }
  readTemplates(e5, r2) {
    const t6 = r2.editFieldsInfo, i5 = t6?.creatorField, o4 = t6?.editorField;
    return e5 = e5?.map((e6) => p2.fromJSON(e6)), this._fixTemplates(e5, i5), this._fixTemplates(e5, o4), e5;
  }
  readTitle(e5, r2) {
    const t6 = r2.layerDefinition?.name ?? r2.name, i5 = r2.title || r2.layerDefinition?.title;
    if (t6) {
      const e6 = this.portalItem?.title;
      if ("item-title" === this.sublayerTitleMode)
        return this.url ? w2(this.url, t6) : t6;
      let r3 = t6;
      if (!r3 && this.url) {
        const e7 = d(this.url);
        null != e7 && (r3 = e7.title);
      }
      if (!r3)
        return;
      return "item-title-and-service-name" === this.sublayerTitleMode && e6 && e6 !== r3 && (r3 = e6 + " - " + r3), m2(r3);
    }
    if ("item-title" === this.sublayerTitleMode && i5)
      return i5;
  }
  readTitleFromWebMap(e5, r2) {
    return r2.title || r2.layerDefinition?.name;
  }
  readTypeIdField(e5, r2) {
    let t6 = (r2 = r2.layerDefinition || r2).typeIdField;
    if (t6 && r2.fields) {
      t6 = t6.toLowerCase();
      const e6 = r2.fields.find((e7) => e7.name.toLowerCase() === t6);
      e6 && (t6 = e6.name);
    }
    return t6;
  }
  readTypes(e5, r2) {
    e5 = (r2 = r2.layerDefinition || r2).types;
    const t6 = r2.editFieldsInfo, i5 = t6?.creatorField, o4 = t6?.editorField;
    return e5?.map((e6) => (e6 = n6.fromJSON(e6), this._fixTemplates(e6.templates, i5), this._fixTemplates(e6.templates, o4), e6));
  }
  readVisible(e5, r2) {
    return null != r2.layerDefinition?.defaultVisibility ? !!r2.layerDefinition.defaultVisibility : null != r2.visibility ? !!r2.visibility : void 0;
  }
  addAttachment(e5, r2) {
    return __async(this, null, function* () {
      return m4(this, e5, r2, Ne);
    });
  }
  updateAttachment(e5, r2, t6) {
    return __async(this, null, function* () {
      return w3(this, e5, r2, t6, Ne);
    });
  }
  applyEdits(e5, r2) {
    return __async(this, null, function* () {
      return b3(this, e5, r2);
    });
  }
  uploadAssets(e5, r2) {
    return __async(this, null, function* () {
      return g(this, e5, r2);
    });
  }
  on(e5, r2) {
    return super.on(e5, r2);
  }
  createPopupTemplate(e5) {
    return p3(this, e5);
  }
  createGraphicsSource(e5) {
    return __async(this, null, function* () {
      if (this._hasMemorySource() && this.source)
        return this.source.load({ signal: e5 });
      const { default: r2 } = yield h(import("./chunk-MT4U4YTU.js"), e5);
      return new r2({ layer: this, supportedSourceTypes: this.supportedSourceTypes }).load({ signal: e5 });
    });
  }
  createQuery() {
    const e5 = x(this);
    e5.dynamicDataSource = this.dynamicDataSource;
    const r2 = null != this.subtypeCode ? `${this.subtypeField} = ${this.subtypeCode}` : null, t6 = n4(this.definitionExpression, r2);
    return e5.where = t6 || "1=1", e5;
  }
  deleteAttachments(e5, r2) {
    return __async(this, null, function* () {
      return j3(this, e5, r2, Ne);
    });
  }
  fetchRecomputedExtents(e5) {
    return __async(this, null, function* () {
      return I2(this, e5, Ne);
    });
  }
  getFeatureType(e5) {
    return N(this.types, this.typeIdField, e5);
  }
  getFieldDomain(e5, r2) {
    const t6 = r2?.feature, i5 = L(this, t6);
    if (i5) {
      const r3 = i5.domains?.[e5];
      return "inherited" === r3?.type ? this._getLayerDomain(e5) : r3;
    }
    const o4 = this.getFeatureType(t6);
    if (o4) {
      const r3 = o4.domains && o4.domains[e5];
      if (r3 && "inherited" !== r3.type)
        return r3;
    }
    return this._getLayerDomain(e5);
  }
  getField(e5) {
    return this.fieldsIndex.get(e5);
  }
  queryAttachments(e5, r2) {
    return __async(this, null, function* () {
      return q(this, e5, r2, Ne);
    });
  }
  queryFeatures(e5, r2) {
    return __async(this, null, function* () {
      const t6 = yield this.load(), i5 = yield t6.source.queryFeatures(b2.from(e5) ?? t6.createQuery(), r2);
      if (i5?.features)
        for (const o4 of i5.features)
          o4.layer = o4.sourceLayer = t6;
      return i5;
    });
  }
  queryObjectIds(e5, r2) {
    return __async(this, null, function* () {
      return F2(this, e5, r2, Ne);
    });
  }
  queryFeatureCount(e5, r2) {
    return __async(this, null, function* () {
      return A(this, e5, r2, Ne);
    });
  }
  queryExtent(e5, r2) {
    return __async(this, null, function* () {
      return O(this, e5, r2, Ne);
    });
  }
  queryRelatedFeatures(e5, r2) {
    return __async(this, null, function* () {
      return P(this, e5, r2, Ne);
    });
  }
  queryRelatedFeaturesCount(e5, r2) {
    return __async(this, null, function* () {
      return S3(this, e5, r2, Ne);
    });
  }
  queryTopFeatures(e5, r2) {
    return __async(this, null, function* () {
      const { source: t6, capabilities: i5 } = yield this.load();
      if (!t6.queryTopFeatures || !i5?.query?.supportsTopFeaturesQuery)
        throw new s(Ne, "Layer source does not support queryTopFeatures capability");
      const o4 = yield t6.queryTopFeatures(S4.from(e5), r2);
      if (o4?.features)
        for (const s5 of o4.features)
          s5.layer = s5.sourceLayer = this;
      return o4;
    });
  }
  queryTopObjectIds(e5, r2) {
    return __async(this, null, function* () {
      const { source: t6, capabilities: i5 } = yield this.load();
      if (!t6.queryTopObjectIds || !i5?.query.supportsTopFeaturesQuery)
        throw new s(Ne, "Layer source does not support queryTopObjectIds capability");
      return t6.queryTopObjectIds(S4.from(e5), r2);
    });
  }
  queryTopFeaturesExtent(e5, r2) {
    return __async(this, null, function* () {
      const { source: t6, capabilities: i5 } = yield this.load();
      if (!t6.queryTopExtents || !i5?.query?.supportsTopFeaturesQuery)
        throw new s(Ne, "Layer source does not support queryTopExtents capability");
      return t6.queryTopExtents(S4.from(e5), r2);
    });
  }
  queryTopFeatureCount(e5, r2) {
    return __async(this, null, function* () {
      const { source: t6, capabilities: i5 } = yield this.load();
      if (!t6.queryTopCount || !i5?.query?.supportsTopFeaturesQuery)
        throw new s(Ne, "Layer source does not support queryFeatureCount capability");
      return t6.queryTopCount(S4.from(e5), r2);
    });
  }
  read(e5, r2) {
    const t6 = e5.featureCollection;
    if ((t6 || "Feature Collection" === e5.type) && (this.resourceInfo = e5), t6) {
      const e6 = t6.layers;
      e6 && 1 === e6.length && (super.read(e6[0], r2), null != t6.showLegend && super.read({ showLegend: t6.showLegend }, r2));
    }
    super.read(e5, r2), r2 && "service" === r2.origin && (this.revert(["objectIdField", "fields", "timeInfo", "dateFieldsTimeZone"], "service"), this.spatialReference || this.revert(["spatialReference"], "service"));
  }
  write(e5, r2) {
    r2 = __spreadProps(__spreadValues({}, r2), { origin: r2?.origin ?? void 0, writeLayerSchema: r2?.writeLayerSchema ?? this._hasMemorySource() });
    const { origin: t6, layerContainerType: i5, messages: o4 } = r2;
    if (this.dynamicDataSource)
      return o4?.push($e(this, "using a dynamic data source cannot be written to web scenes, web maps and feature service items")), null;
    if (this.isTable) {
      if (("web-map" === t6 || "web-scene" === t6) && "tables" !== i5)
        return o4?.push($e(this, `a table source can only be written to tables, not ${i5}`)), null;
      if (this._hasMemorySource())
        return o4?.push($e(this, "using an in-memory table source cannot be written to web scenes and web maps")), null;
    } else if (this.loaded && ("web-map" === t6 || "web-scene" === t6) && "tables" === i5)
      return o4?.push($e(this, "using a non-table source cannot be written to tables in web maps or web scenes")), null;
    return super.write(e5, r2);
  }
  clone() {
    if (this._hasMemorySource())
      throw new s(Ne, `FeatureLayer (title: ${this.title}, id: ${this.id}) created using in-memory source cannot be cloned`);
    return super.clone();
  }
  serviceSupportsSpatialReference(e5) {
    return !!this.loaded && ("memory" === this.source?.type || t4(this, e5));
  }
  save(e5) {
    return __async(this, null, function* () {
      return this._debouncedSaveOperations(A2.SAVE, e5);
    });
  }
  saveAs(e5, r2) {
    return __async(this, null, function* () {
      return this._debouncedSaveOperations(A2.SAVE_AS, r2, e5);
    });
  }
  _readEditingEnabled(e5, r2, t6) {
    let i5 = e5.layerDefinition?.capabilities;
    return i5 ? this._hasEditingCapability(i5) : (i5 = e5.capabilities, r2 && "web-map" === t6?.origin && !this._hasMemorySource() && i5 ? this._hasEditingCapability(i5) : void 0);
  }
  _hasEditingCapability(e5) {
    return e5.toLowerCase().split(",").map((e6) => e6.trim()).includes("editing");
  }
  _writeEditingEnabled(e5, r2, t6, i5) {
    if (!e5) {
      const e6 = this.capabilities?.operations?.supportsSync ? "Query,Sync" : "Query";
      e2("layerDefinition.capabilities", e6, r2), t6 && !i5?.writeLayerSchema && (r2.capabilities = e6);
    }
  }
  _getLayerDomain(e5) {
    const r2 = this.fieldsIndex.get(e5);
    return r2 ? r2.domain : null;
  }
  _fetchFirstValidLayerId(e5) {
    return U(this.url ?? "", { query: __spreadProps(__spreadValues({ f: "json" }, this.customParameters), { token: this.apiKey }), responseType: "json", signal: e5 }).then((e6) => {
      const r2 = e6.data;
      if (r2)
        return this.findFirstValidLayerId(r2);
    });
  }
  initLayerProperties(e5) {
    return __async(this, null, function* () {
      return this._set("source", e5), e5.sourceJSON && (this.sourceJSON = e5.sourceJSON, this.read(e5.sourceJSON, { origin: "service", portalItem: this.portalItem, portal: this.portalItem?.portal, url: this.parsedUrl })), this._verifySource(), this._verifyFields(), p5(this.renderer, this.fieldsIndex), g2(this.timeInfo, this.fieldsIndex), t3(this, { origin: "service" });
    });
  }
  hasDataChanged() {
    return __async(this, null, function* () {
      return E(this);
    });
  }
  fetchPublishingStatus() {
    return __async(this, null, function* () {
      const e5 = this.source;
      return e5?.fetchPublishingStatus ? e5.fetchPublishingStatus() : "unavailable";
    });
  }
  _verifyFields() {
    const e5 = this.parsedUrl?.path ?? "undefined";
    this.objectIdField || console.log("FeatureLayer: 'objectIdField' property is not defined (url: " + e5 + ")"), this.isTable || this._hasMemorySource() || -1 !== e5.search(/\/FeatureServer\//i) || this.fields?.some((e6) => "geometry" === e6.type) || console.log("FeatureLayer: unable to find field of type 'geometry' in the layer 'fields' list. If you are using a map service layer, features will not have geometry (url: " + e5 + ")");
  }
  _fixTemplates(e5, r2) {
    e5 && e5.forEach((e6) => {
      const t6 = e6.prototype?.attributes;
      t6 && r2 && delete t6[r2];
    });
  }
  _verifySource() {
    if (this._hasMemorySource()) {
      if (this.url)
        throw new s("feature-layer:mixed-source-and-url", "FeatureLayer cannot be created with both an in-memory source and a url");
    } else if (!this.url)
      throw new s("feature-layer:source-or-url-required", "FeatureLayer requires either a url, a valid portal item or a source");
  }
  _initMemorySource(e5) {
    e5.forEach((e6) => {
      e6.layer = this, e6.sourceLayer = this;
    }), this.addHandles([e5.on("after-add", (e6) => {
      e6.item.layer = this, e6.item.sourceLayer = this;
    }), e5.on("after-remove", (e6) => {
      e6.item.layer = null, e6.item.sourceLayer = null;
    })], "fl-source");
  }
  _resetMemorySource(e5) {
    e5.forEach((e6) => {
      e6.layer = null, e6.sourceLayer = null;
    }), this.removeHandles("fl-source");
  }
  _hasMemorySource() {
    return !(this.url || !this.source);
  }
  findFirstValidLayerId(e5) {
    return Array.isArray(e5.layers) && e5.layers.length > 0 ? e5.layers[0].id : Array.isArray(e5.tables) && e5.tables.length > 0 ? e5.tables[0].id : void 0;
  }
};
e([o("service", "capabilities")], Be.prototype, "readCapabilities", null), e([y({ json: { origins: { "web-scene": { write: false } }, write: true } })], Be.prototype, "charts", void 0), e([y({ readOnly: true })], Be.prototype, "createQueryVersion", null), e([y({ json: { read: { source: "layerDefinition.copyrightText" } } })], Be.prototype, "copyright", void 0), e([y({ json: { read: { source: "layerDefinition.displayField" } } })], Be.prototype, "displayField", void 0), e([y({ types: j2, readOnly: true })], Be.prototype, "defaultSymbol", void 0), e([y({ type: K })], Be.prototype, "dynamicDataSource", void 0), e([y({ type: Boolean })], Be.prototype, "editingEnabled", null), e([o(["portal-item", "web-scene"], "editingEnabled", ["layerDefinition.capabilities"])], Be.prototype, "readEditingEnabled", null), e([o("web-map", "editingEnabled", ["capabilities", "layerDefinition.capabilities"])], Be.prototype, "readEditingEnabledFromWebMap", null), e([r(["portal-item", "web-scene"], "editingEnabled", { "layerDefinition.capabilities": { type: String } })], Be.prototype, "writeEditingEnabled", null), e([r("web-map", "editingEnabled", { capabilities: { type: String }, "layerDefinition.capabilities": { type: String } })], Be.prototype, "writeEditingEnabledToWebMap", null), e([y({ readOnly: true })], Be.prototype, "effectiveEditingEnabled", null), e([y(__spreadProps(__spreadValues({}, Je.fields), { json: { read: { source: "layerDefinition.fields" }, origins: { service: { name: "fields" }, "web-map": { write: { target: "layerDefinition.fields", overridePolicy: We } } } } }))], Be.prototype, "fields", void 0), e([y(Je.fieldsIndex)], Be.prototype, "fieldsIndex", void 0), e([y({ type: V3, json: { name: "formInfo", write: true, origins: { "web-scene": { read: false, write: false } } } })], Be.prototype, "formTemplate", void 0), e([y({ json: { read: { source: "layerDefinition.extent" } } })], Be.prototype, "fullExtent", void 0), e([y({ json: { origins: { "web-map": { write: { target: "layerDefinition.geometryType", overridePolicy: We, writer(e5, r2, t6) {
  const i5 = e5 ? y2.toJSON(e5) : null;
  i5 && e2(t6, i5, r2);
} } } }, read: { source: "layerDefinition.geometryType", reader: y2.read } } })], Be.prototype, "geometryType", void 0), e([y({ json: { read: { source: "layerDefinition.hasM" } } })], Be.prototype, "hasM", void 0), e([y({ json: { read: { source: "layerDefinition.hasZ" } } })], Be.prototype, "hasZ", void 0), e([y(g3)], Be.prototype, "id", void 0), e([y({ readOnly: true, json: { origins: { service: { read: true } }, read: false } })], Be.prototype, "infoFor3D", void 0), e([y({ json: { origins: { "web-map": { write: { target: "layerDefinition.type" } } } } })], Be.prototype, "isTable", void 0), e([o("service", "isTable", ["type", "geometryType"]), o("isTable", ["layerDefinition.type", "layerDefinition.geometryType"])], Be.prototype, "readIsTable", null), e([r("web-map", "isTable")], Be.prototype, "writeIsTable", null), e([y(l5)], Be.prototype, "labelsVisible", void 0), e([y({ type: [C], json: { origins: { service: { name: "drawingInfo.labelingInfo", read: l4, write: false }, "web-scene": { name: "layerDefinition.drawingInfo.labelingInfo", read: l4, write: { enabled: true, layerContainerTypes: a4 } } }, name: "layerDefinition.drawingInfo.labelingInfo", read: l4, write: true } })], Be.prototype, "labelingInfo", void 0), e([y((() => {
  const e5 = a(f3);
  return e5.json.origins["portal-item"] = { write: { target: "layerDefinition.drawingInfo.transparency", writer(e6, r2, t6) {
    e2(t6, n5(e6), r2);
  } } }, e5;
})())], Be.prototype, "opacity", void 0), e([y(y3)], Be.prototype, "legendEnabled", void 0), e([y({ type: ["show", "hide"], json: (() => {
  const e5 = a(v2.json);
  return e5.origins["portal-item"] = { read: false, write: false }, e5;
})() })], Be.prototype, "listMode", void 0), e([o("globalIdField", ["layerDefinition.globalIdField", "layerDefinition.fields"])], Be.prototype, "readGlobalIdField", null), e([y({ json: { origins: { "web-map": { write: { target: "layerDefinition.objectIdField", overridePolicy: We } } } } })], Be.prototype, "objectIdField", void 0), e([o("objectIdField", ["layerDefinition.objectIdField", "layerDefinition.fields"])], Be.prototype, "readObjectIdField", null), e([y({ value: "ArcGISFeatureLayer", type: ["ArcGISFeatureLayer"] })], Be.prototype, "operationalLayerType", void 0), e([y(Je.outFields)], Be.prototype, "outFields", void 0), e([y({ readOnly: true })], Be.prototype, "parsedUrl", null), e([y({ type: String, json: { origins: { "web-scene": { read: true, write: true } }, read: false } })], Be.prototype, "path", void 0), e([y(s4)], Be.prototype, "popupEnabled", void 0), e([y({ type: k2, json: { name: "popupInfo", write: true } })], Be.prototype, "popupTemplate", void 0), e([y({ readOnly: true })], Be.prototype, "defaultPopupTemplate", null), e([y({ types: m3, json: { origins: { service: { write: { target: "drawingInfo.renderer", enabled: false } }, "web-scene": { types: u, name: "layerDefinition.drawingInfo.renderer", write: { layerContainerTypes: a4, overridePolicy: (e5, r2, t6) => ({ ignoreOrigin: t6?.writeLayerSchema }) } } }, write: { target: "layerDefinition.drawingInfo.renderer", overridePolicy: (e5, r2, t6) => ({ ignoreOrigin: t6?.writeLayerSchema }) } } })], Be.prototype, "renderer", null), e([o("service", "renderer", ["drawingInfo.renderer", "defaultSymbol"]), o("renderer", ["layerDefinition.drawingInfo.renderer", "layerDefinition.defaultSymbol"])], Be.prototype, "readRenderer", null), e([y()], Be.prototype, "resourceInfo", void 0), e([y((() => {
  const e5 = a(t5);
  return e5.json.origins["portal-item"] = { read: false, write: false }, e5;
})())], Be.prototype, "screenSizePerspectiveEnabled", void 0), e([y({ clonable: false })], Be.prototype, "source", null), e([s2("source")], Be.prototype, "castSource", null), e([o("portal-item", "source", ["featureSet"]), o("web-map", "source", ["featureSet"])], Be.prototype, "readSource", null), e([y({ json: { read: { source: "layerDefinition.extent.spatialReference" } } })], Be.prototype, "spatialReference", void 0), e([y({ type: Number })], Be.prototype, "subtypeCode", void 0), e([y({ type: [p2] })], Be.prototype, "templates", void 0), e([o("templates", ["editFieldsInfo", "creatorField", "editorField", "templates"])], Be.prototype, "readTemplates", null), e([y({ type: d4 })], Be.prototype, "timeInfo", void 0), e([y()], Be.prototype, "title", void 0), e([o("service", "title", ["name"]), o("portal-item", "title", ["layerDefinition.title", "layerDefinition.name", "title"])], Be.prototype, "readTitle", null), e([o("web-map", "title", ["layerDefinition.name", "title"])], Be.prototype, "readTitleFromWebMap", null), e([y({ type: String })], Be.prototype, "sublayerTitleMode", void 0), e([y({ json: { read: false } })], Be.prototype, "type", void 0), e([y({ type: String })], Be.prototype, "typeIdField", void 0), e([o("service", "typeIdField"), o("typeIdField", ["layerDefinition.typeIdField"])], Be.prototype, "readTypeIdField", null), e([y({ type: [n6] })], Be.prototype, "types", void 0), e([o("service", "types", ["types"]), o("types", ["layerDefinition.types"])], Be.prototype, "readTypes", null), e([y({ type: Boolean, json: { origins: { "portal-item": { write: { target: "layerDefinition.defaultVisibility" } } } } })], Be.prototype, "visible", void 0), e([o("portal-item", "visible", ["visibility", "layerDefinition.defaultVisibility"])], Be.prototype, "readVisible", null), Be = e([a2("esri.layers.FeatureLayer")], Be);
var Ze = Be;

export {
  Ze
};
//# sourceMappingURL=chunk-OCSJBWCL.js.map
