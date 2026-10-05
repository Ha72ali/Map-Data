import {
  c as c3
} from "./chunk-OG24GKML.js";
import {
  p
} from "./chunk-GBZE54GK.js";
import {
  c as c2
} from "./chunk-CRBQWZMW.js";
import {
  s as s2
} from "./chunk-UWOATJXA.js";
import {
  p as p2
} from "./chunk-627SYJ7O.js";
import {
  C,
  l as l4
} from "./chunk-OEQYRPF6.js";
import {
  m as m2,
  u
} from "./chunk-EIARW56B.js";
import {
  l as l3
} from "./chunk-P42DJ3OX.js";
import {
  p as p3
} from "./chunk-PSUD6NH2.js";
import {
  e as e2
} from "./chunk-LTWQYIJF.js";
import {
  j as j2
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
  b as b2
} from "./chunk-6F52T6PY.js";
import {
  d as d2,
  g as g2,
  l as l5,
  p as p6,
  s as s3,
  t as t2,
  w as w2,
  y as y3
} from "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f as f3
} from "./chunk-SIUD6VOA.js";
import {
  p as p4
} from "./chunk-F3PKGTLV.js";
import {
  d
} from "./chunk-ZGKHY7ZS.js";
import {
  k as k2
} from "./chunk-ZQQ553GQ.js";
import {
  b
} from "./chunk-FLPV6LMH.js";
import {
  y as y2
} from "./chunk-OXKKAHFH.js";
import {
  l as l2
} from "./chunk-CINKUSZ7.js";
import {
  g,
  p as p5
} from "./chunk-EQ4EANPC.js";
import {
  o
} from "./chunk-OHR2EMYV.js";
import {
  j
} from "./chunk-EHKCE57B.js";
import {
  c
} from "./chunk-2AR2ZIQP.js";
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
  I
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
  a as a2,
  k
} from "./chunk-NVGBLY2Q.js";
import {
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  has
} from "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/sources/GeoJSONSource.js
var p7 = class extends m {
  constructor() {
    super(...arguments), this.type = "geojson", this.refresh = k((e3) => __async(this, null, function* () {
      yield this.load();
      const { extent: t3, timeExtent: r } = yield this._connection.invoke("refresh", e3);
      return this.sourceJSON.extent = t3, r && (this.sourceJSON.timeInfo.timeExtent = [r.start, r.end]), { dataChanged: true, updates: { extent: this.sourceJSON.extent, timeInfo: this.sourceJSON.timeInfo } };
    }));
  }
  load(e3) {
    const t3 = null != e3 ? e3.signal : null;
    return this.addResolvingPromise(this._startWorker(t3)), Promise.resolve(this);
  }
  destroy() {
    this._connection?.close(), this._connection = null;
  }
  applyEdits(e3) {
    return this.load().then(() => this._applyEdits(e3));
  }
  openPorts() {
    return this.load().then(() => this._connection.openPorts());
  }
  queryFeatures(e3, t3 = {}) {
    return this.load(t3).then(() => this._connection.invoke("queryFeatures", e3 ? e3.toJSON() : null, t3)).then((e4) => d.fromJSON(e4));
  }
  queryFeaturesJSON(e3, t3 = {}) {
    return this.load(t3).then(() => this._connection.invoke("queryFeatures", e3 ? e3.toJSON() : null, t3));
  }
  queryFeatureCount(e3, t3 = {}) {
    return this.load(t3).then(() => this._connection.invoke("queryFeatureCount", e3 ? e3.toJSON() : null, t3));
  }
  queryObjectIds(e3, t3 = {}) {
    return this.load(t3).then(() => this._connection.invoke("queryObjectIds", e3 ? e3.toJSON() : null, t3));
  }
  queryExtent(e3, t3 = {}) {
    return this.load(t3).then(() => this._connection.invoke("queryExtent", e3 ? e3.toJSON() : null, t3)).then((e4) => ({ count: e4.count, extent: w.fromJSON(e4.extent) }));
  }
  querySnapping(e3, t3 = {}) {
    return this.load(t3).then(() => this._connection.invoke("querySnapping", e3, t3));
  }
  _applyEdits(e3) {
    if (!this._connection)
      throw new s("geojson-layer-source:edit-failure", "Memory source not loaded");
    const r = this.layer.objectIdField, o2 = [], s4 = [], i = [];
    if (e3.addFeatures)
      for (const t3 of e3.addFeatures)
        o2.push(this._serializeFeature(t3));
    if (e3.deleteFeatures)
      for (const t3 of e3.deleteFeatures)
        "objectId" in t3 && null != t3.objectId ? s4.push(t3.objectId) : "attributes" in t3 && null != t3.attributes[r] && s4.push(t3.attributes[r]);
    if (e3.updateFeatures)
      for (const t3 of e3.updateFeatures)
        i.push(this._serializeFeature(t3));
    return this._connection.invoke("applyEdits", { adds: o2, updates: i, deletes: s4 }).then(({ extent: e4, timeExtent: t3, featureEditResults: r2 }) => (this.sourceJSON.extent = e4, t3 && (this.sourceJSON.timeInfo.timeExtent = [t3.start, t3.end]), this._createEditsResult(r2)));
  }
  _createEditsResult(e3) {
    return { addFeatureResults: e3.addResults ? e3.addResults.map(this._createFeatureEditResult, this) : [], updateFeatureResults: e3.updateResults ? e3.updateResults.map(this._createFeatureEditResult, this) : [], deleteFeatureResults: e3.deleteResults ? e3.deleteResults.map(this._createFeatureEditResult, this) : [], addAttachmentResults: [], updateAttachmentResults: [], deleteAttachmentResults: [] };
  }
  _createFeatureEditResult(e3) {
    const r = true === e3.success ? null : e3.error || { code: void 0, description: void 0 };
    return { objectId: e3.objectId, globalId: e3.globalId, error: r ? new s("geojson-layer-source:edit-failure", r.description, { code: r.code }) : null };
  }
  _serializeFeature(e3) {
    const { attributes: t3 } = e3, r = this._geometryForSerialization(e3);
    return r ? { geometry: r.toJSON(), attributes: t3 } : { attributes: t3 };
  }
  _geometryForSerialization(e3) {
    const { geometry: t3 } = e3;
    return null == t3 ? null : "mesh" === t3.type || "extent" === t3.type ? j.fromExtent(t3.extent) : t3;
  }
  _startWorker(e3) {
    return __async(this, null, function* () {
      this._connection = yield p4("GeoJSONSourceWorker", { strategy: has("feature-layers-workers") ? "dedicated" : "local", signal: e3, registryTarget: this });
      const { fields: t3, spatialReference: r, hasZ: s4, geometryType: n2, objectIdField: a3, url: l6, timeInfo: c4, customParameters: d3 } = this.layer, p8 = "defaults" === this.layer.originOf("spatialReference"), m3 = { url: l6, customParameters: d3, fields: t3 && t3.map((e4) => e4.toJSON()), geometryType: o.toJSON(n2), hasZ: s4, objectIdField: a3, timeInfo: c4 ? c4.toJSON() : null, spatialReference: p8 ? null : r && r.toJSON() }, y4 = yield this._connection.invoke("load", m3, { signal: e3 });
      for (const i of y4.warnings)
        n.getLogger(this.layer).warn("#load()", `$${i.message} (title: '${this.layer.title || "no title"}', id: '${this.layer.id ?? "no id"}')`, { warning: i });
      y4.featureErrors.length && n.getLogger(this.layer).warn("#load()", `Encountered ${y4.featureErrors.length} validation errors while loading features. (title: '${this.layer.title || "no title"}', id: '${this.layer.id ?? "no id"}')`, { errors: y4.featureErrors }), this.sourceJSON = y4.layerDefinition, this.capabilities = l2(this.sourceJSON.hasZ, true);
    });
  }
};
e([y()], p7.prototype, "capabilities", void 0), e([y()], p7.prototype, "type", void 0), e([y({ constructOnly: true })], p7.prototype, "layer", void 0), e([y()], p7.prototype, "sourceJSON", void 0), p7 = e([a("esri.layers.graphics.sources.GeoJSONSource")], p7);

// node_modules/@arcgis/core/layers/GeoJSONLayer.js
var B = s2();
var _ = class extends p(e2(c3(c2(l(l3(t(f2(b2(j2(S(f3))))))))))) {
  constructor(e3) {
    super(e3), this.copyright = null, this.dateFieldsTimeZone = null, this.definitionExpression = null, this.displayField = null, this.editingEnabled = false, this.elevationInfo = null, this.fields = null, this.fieldsIndex = null, this.fullExtent = null, this.geometryType = null, this.hasZ = void 0, this.labelsVisible = true, this.labelingInfo = null, this.legendEnabled = true, this.objectIdField = null, this.operationalLayerType = "GeoJSON", this.outFields = null, this.popupEnabled = true, this.popupTemplate = null, this.screenSizePerspectiveEnabled = true, this.source = new p7({ layer: this }), this.spatialReference = f.WGS84, this.templates = null, this.title = "GeoJSON", this.type = "geojson";
  }
  destroy() {
    this.source?.destroy();
  }
  load(e3) {
    const t3 = this.loadFromPortal({ supportedTypes: ["GeoJson"], supportsData: false }, e3).catch(a2).then(() => this.source.load(e3)).then(() => {
      this.read(this.source.sourceJSON, { origin: "service", url: this.parsedUrl }), this.revert(["objectIdField", "fields", "timeInfo"], "service"), p5(this.renderer, this.fieldsIndex), g(this.timeInfo, this.fieldsIndex);
    });
    return this.addResolvingPromise(t3), Promise.resolve(this);
  }
  get capabilities() {
    return this.source ? this.source.capabilities : null;
  }
  get createQueryVersion() {
    return this.commitProperty("definitionExpression"), this.commitProperty("timeExtent"), this.commitProperty("timeOffset"), this.commitProperty("geometryType"), this.commitProperty("capabilities"), (this._get("createQueryVersion") || 0) + 1;
  }
  get defaultPopupTemplate() {
    return this.createPopupTemplate();
  }
  get isTable() {
    return this.loaded && null == this.geometryType;
  }
  get parsedUrl() {
    return this.url ? I(this.url) : null;
  }
  set renderer(e3) {
    p5(e3, this.fieldsIndex), this._set("renderer", e3);
  }
  set url(e3) {
    if (!e3)
      return void this._set("url", e3);
    const t3 = I(e3);
    this._set("url", t3.path), t3.query && (this.customParameters = __spreadValues(__spreadValues({}, this.customParameters), t3.query));
  }
  applyEdits(e3, t3) {
    return __async(this, null, function* () {
      const { applyEdits: r } = yield import("./chunk-37EZ4QRW.js");
      yield this.load();
      const o2 = yield r(this, this.source, e3, t3);
      return this.read({ extent: this.source.sourceJSON.extent, timeInfo: this.source.sourceJSON.timeInfo }, { origin: "service", ignoreDefaults: true }), o2;
    });
  }
  on(e3, t3) {
    return super.on(e3, t3);
  }
  createPopupTemplate(e3) {
    return p3(this, e3);
  }
  createQuery() {
    const e3 = new b(), t3 = this.capabilities?.data;
    e3.returnGeometry = true, t3 && t3.supportsZ && (e3.returnZ = true), e3.outFields = ["*"], e3.where = this.definitionExpression || "1=1";
    const { timeOffset: r, timeExtent: o2 } = this;
    return e3.timeExtent = null != r && null != o2 ? o2.offset(-r.value, r.unit) : o2 || null, e3;
  }
  getFieldDomain(e3, t3) {
    return this.getField(e3)?.domain;
  }
  getField(e3) {
    return this.fieldsIndex.get(e3);
  }
  queryFeatures(e3, t3) {
    return this.load().then(() => this.source.queryFeatures(b.from(e3) || this.createQuery(), t3)).then((e4) => {
      if (e4?.features)
        for (const t4 of e4.features)
          t4.layer = t4.sourceLayer = this;
      return e4;
    });
  }
  queryObjectIds(e3, t3) {
    return this.load().then(() => this.source.queryObjectIds(b.from(e3) || this.createQuery(), t3));
  }
  queryFeatureCount(e3, t3) {
    return this.load().then(() => this.source.queryFeatureCount(b.from(e3) || this.createQuery(), t3));
  }
  queryExtent(e3, t3) {
    return this.load().then(() => this.source.queryExtent(b.from(e3) || this.createQuery(), t3));
  }
  hasDataChanged() {
    return __async(this, null, function* () {
      try {
        const { dataChanged: e3, updates: t3 } = yield this.source.refresh(this.customParameters);
        return null != t3 && this.read(t3, { origin: "service", url: this.parsedUrl, ignoreDefaults: true }), e3;
      } catch {
      }
      return false;
    });
  }
};
e([y({ readOnly: true, json: { read: false, write: false } })], _.prototype, "capabilities", null), e([y({ type: String })], _.prototype, "copyright", void 0), e([y({ readOnly: true })], _.prototype, "createQueryVersion", null), e([y(c("dateFieldsTimeReference"))], _.prototype, "dateFieldsTimeZone", void 0), e([y({ readOnly: true })], _.prototype, "defaultPopupTemplate", null), e([y({ type: String, json: { name: "layerDefinition.definitionExpression", write: { enabled: true, allowNull: true } } })], _.prototype, "definitionExpression", void 0), e([y({ type: String })], _.prototype, "displayField", void 0), e([y({ type: Boolean })], _.prototype, "editingEnabled", void 0), e([y(d2)], _.prototype, "elevationInfo", void 0), e([y({ type: [y2], json: { name: "layerDefinition.fields", write: { ignoreOrigin: true, isRequired: true }, origins: { service: { name: "fields" } } } })], _.prototype, "fields", void 0), e([y(B.fieldsIndex)], _.prototype, "fieldsIndex", void 0), e([y({ type: w, json: { name: "extent" } })], _.prototype, "fullExtent", void 0), e([y({ type: ["point", "polygon", "polyline", "multipoint"], json: { read: { reader: o.read } } })], _.prototype, "geometryType", void 0), e([y({ type: Boolean })], _.prototype, "hasZ", void 0), e([y(g2)], _.prototype, "id", void 0), e([y({ type: Boolean, readOnly: true })], _.prototype, "isTable", null), e([y(l5)], _.prototype, "labelsVisible", void 0), e([y({ type: [C], json: { name: "layerDefinition.drawingInfo.labelingInfo", read: { reader: l4 }, write: true } })], _.prototype, "labelingInfo", void 0), e([y(y3)], _.prototype, "legendEnabled", void 0), e([y({ type: ["show", "hide"] })], _.prototype, "listMode", void 0), e([y({ type: String, json: { name: "layerDefinition.objectIdField", write: { ignoreOrigin: true, isRequired: true }, origins: { service: { name: "objectIdField" } } } })], _.prototype, "objectIdField", void 0), e([y(w2)], _.prototype, "opacity", void 0), e([y({ type: ["GeoJSON"] })], _.prototype, "operationalLayerType", void 0), e([y(B.outFields)], _.prototype, "outFields", void 0), e([y({ readOnly: true })], _.prototype, "parsedUrl", null), e([y(s3)], _.prototype, "popupEnabled", void 0), e([y({ type: k2, json: { name: "popupInfo", write: true } })], _.prototype, "popupTemplate", void 0), e([y({ types: m2, json: { name: "layerDefinition.drawingInfo.renderer", write: true, origins: { service: { name: "drawingInfo.renderer" }, "web-scene": { types: u } } } })], _.prototype, "renderer", null), e([y(t2)], _.prototype, "screenSizePerspectiveEnabled", void 0), e([y({ readOnly: true })], _.prototype, "source", void 0), e([y({ type: f })], _.prototype, "spatialReference", void 0), e([y({ type: [p2] })], _.prototype, "templates", void 0), e([y()], _.prototype, "title", void 0), e([y({ json: { read: false }, readOnly: true })], _.prototype, "type", void 0), e([y(p6)], _.prototype, "url", null), _ = e([a("esri.layers.GeoJSONLayer")], _);
var M = _;

export {
  M
};
//# sourceMappingURL=chunk-2I6XOL4E.js.map
