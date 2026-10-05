import {
  o as o3
} from "./chunk-4DAKMG6O.js";
import {
  x as x2
} from "./chunk-H2JOPQBY.js";
import {
  p as p2
} from "./chunk-JO46L5DH.js";
import {
  a as a3
} from "./chunk-6X7VYUYA.js";
import {
  p
} from "./chunk-FS65HTPZ.js";
import {
  n as n4
} from "./chunk-GIZ3RRKW.js";
import {
  l
} from "./chunk-ALCBDSBR.js";
import {
  C as C2,
  a as a4
} from "./chunk-OEQYRPF6.js";
import {
  m as m2,
  u
} from "./chunk-EIARW56B.js";
import {
  p as p3
} from "./chunk-PSUD6NH2.js";
import {
  g as g2,
  s as s6
} from "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  N as N2
} from "./chunk-I45L7LN5.js";
import {
  c as c2
} from "./chunk-O3GNG7MX.js";
import {
  r as r3
} from "./chunk-LOGWAETQ.js";
import {
  k
} from "./chunk-ZQQ553GQ.js";
import {
  s as s5
} from "./chunk-ELMEXWR7.js";
import {
  x
} from "./chunk-YTC5APIA.js";
import {
  c as c3
} from "./chunk-5EK2HSR2.js";
import {
  b as b2
} from "./chunk-FLPV6LMH.js";
import {
  K,
  c
} from "./chunk-FFM66Y5M.js";
import {
  d as d2
} from "./chunk-LRQVNXVW.js";
import {
  y as y2
} from "./chunk-OXKKAHFH.js";
import {
  Z
} from "./chunk-7JFZMNXX.js";
import {
  f as f2
} from "./chunk-2A6LCWAO.js";
import {
  C,
  d
} from "./chunk-QNED4CTP.js";
import {
  p as p4
} from "./chunk-EQ4EANPC.js";
import {
  n as n3
} from "./chunk-F24FRQYV.js";
import {
  o as o2
} from "./chunk-OHR2EMYV.js";
import {
  V as V2
} from "./chunk-ZDVJGW4C.js";
import {
  m
} from "./chunk-LHPNLXQX.js";
import {
  o,
  w
} from "./chunk-BYMJUQYJ.js";
import {
  f,
  r as r2
} from "./chunk-YKH4U5BK.js";
import {
  s as s4
} from "./chunk-VHLVKE6R.js";
import {
  U,
  V,
  v
} from "./chunk-IMLUWAKH.js";
import {
  e as e2,
  n2,
  t3 as t2,
  y
} from "./chunk-YFSAH4C7.js";
import {
  N,
  a3 as a2,
  b,
  g,
  r,
  s,
  t
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  s as s3
} from "./chunk-NVGBLY2Q.js";
import {
  a,
  n2 as n,
  s2
} from "./chunk-BTPDOHVM.js";
import {
  has
} from "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/mixins/ArcGISMapService.js
var f3 = (f5) => {
  let b3 = class extends f5 {
    constructor() {
      super(...arguments), this.capabilities = void 0, this.copyright = null, this.fullExtent = null, this.legendEnabled = true, this.spatialReference = null, this.version = void 0, this._allLayersAndTablesMap = null;
    }
    readCapabilities(e3, r4) {
      const t3 = r4.capabilities && r4.capabilities.split(",").map((e4) => e4.toLowerCase().trim());
      if (!t3)
        return { operations: { supportsExportMap: false, supportsExportTiles: false, supportsIdentify: false, supportsQuery: false, supportsTileMap: false }, exportMap: null, exportTiles: null };
      const s7 = this.type, o4 = "tile" !== s7 && !!r4.supportsDynamicLayers, a5 = t3.includes("query"), p5 = t3.includes("map"), l2 = !!r4.exportTilesAllowed, n5 = t3.includes("tilemap"), c4 = t3.includes("data"), u2 = "tile" !== s7 && (!r4.tileInfo || o4), y3 = "tile" !== s7 && (!r4.tileInfo || o4), m4 = "tile" !== s7, d3 = r4.cimVersion && r3.parse(r4.cimVersion), h2 = d3?.since(1, 4) ?? false, f6 = d3?.since(2, 0) ?? false;
      return { operations: { supportsExportMap: p5, supportsExportTiles: l2, supportsIdentify: a5, supportsQuery: c4, supportsTileMap: n5 }, exportMap: p5 ? { supportsArcadeExpressionForLabeling: h2, supportsSublayersChanges: m4, supportsDynamicLayers: o4, supportsSublayerVisibility: u2, supportsSublayerDefinitionExpression: y3, supportsCIMSymbols: f6 } : null, exportTiles: l2 ? { maxExportTilesCount: +r4.maxExportTilesCount } : null };
    }
    readVersion(e3, r4) {
      let t3 = r4.currentVersion;
      return t3 || (t3 = r4.hasOwnProperty("capabilities") || r4.hasOwnProperty("tables") ? 10 : r4.hasOwnProperty("supportedImageFormatTypes") ? 9.31 : 9.3), t3;
    }
    fetchRelatedService(e3) {
      return __async(this, null, function* () {
        const r4 = this.portalItem;
        if (!r4 || !c3(r4))
          return null;
        this._relatedFeatureServicePromise || (this._relatedFeatureServicePromise = r4.fetchRelatedItems({ relationshipType: "Service2Service", direction: "reverse" }, e3).then((e4) => e4.find((e5) => "Feature Service" === e5.type) ?? null, () => null));
        const t3 = yield this._relatedFeatureServicePromise;
        return s3(e3), t3 ? { itemId: t3.id, url: t3.url } : null;
      });
    }
    fetchSublayerInfo(e3, t3) {
      return __async(this, null, function* () {
        const { source: s7 } = e3;
        if (this?.portalItem && "tile" === this.type && "map-layer" === s7?.type && c3(this.portalItem) && e3.originIdOf("url") < e2.SERVICE) {
          const r4 = yield this.fetchRelatedService(t3);
          r4 && (e3.url = V(r4.url, s7.mapLayerId.toString()), e3.layerItemId = r4.itemId);
        }
        const { url: i } = e3;
        let a5;
        if ("data-layer" === s7.type) {
          a5 = (yield U(i, __spreadValues({ responseType: "json", query: __spreadProps(__spreadValues({ f: "json" }, this.customParameters), { token: this.apiKey }) }, t3))).data;
        } else if (i && e3.originIdOf("url") > e2.SERVICE)
          try {
            const e4 = yield this._fetchAllLayersAndTablesFromService(i), r4 = d2(i)?.sublayer ?? s7.mapLayerId;
            a5 = e4.get(r4);
          } catch {
          }
        else {
          let r4 = e3.id;
          "map-layer" === s7?.type && (r4 = s7.mapLayerId);
          try {
            a5 = (yield this.fetchAllLayersAndTables(t3)).get(r4);
          } catch {
          }
        }
        return a5;
      });
    }
    fetchAllLayersAndTables(e3) {
      return __async(this, null, function* () {
        return this._fetchAllLayersAndTablesFromService(this.parsedUrl?.path, e3);
      });
    }
    _fetchAllLayersAndTablesFromService(e3, i) {
      return __async(this, null, function* () {
        yield this.load(i), this._allLayersAndTablesMap ||= /* @__PURE__ */ new Map();
        const a5 = d2(e3), p5 = r(this._allLayersAndTablesMap, a5?.url.path, () => U(V(a5?.url.path, "/layers"), { responseType: "json", query: __spreadProps(__spreadValues({ f: "json" }, this.customParameters), { token: this.apiKey }) }).then((e4) => {
          const r4 = /* @__PURE__ */ new Map(), { layers: t3, tables: s7 } = e4.data, o4 = [...t3 ?? [], ...s7 ?? []];
          for (const i2 of o4)
            r4.set(i2.id, i2);
          return { result: r4 };
        }, (e4) => ({ error: e4 }))), l2 = yield p5;
        if (s3(i), "result" in l2)
          return l2.result;
        throw l2.error;
      });
    }
  };
  return e([y({ readOnly: true })], b3.prototype, "capabilities", void 0), e([o("service", "capabilities", ["capabilities", "exportTilesAllowed", "maxExportTilesCount", "supportsDynamicLayers", "tileInfo"])], b3.prototype, "readCapabilities", null), e([y({ json: { read: { source: "copyrightText" } } })], b3.prototype, "copyright", void 0), e([y({ type: w })], b3.prototype, "fullExtent", void 0), e([y(g2)], b3.prototype, "id", void 0), e([y({ type: Boolean, json: { origins: { service: { read: { enabled: false } } }, read: { source: "showLegend" }, write: { target: "showLegend" } } })], b3.prototype, "legendEnabled", void 0), e([y(s6)], b3.prototype, "popupEnabled", void 0), e([y({ type: f })], b3.prototype, "spatialReference", void 0), e([y({ readOnly: true })], b3.prototype, "version", void 0), e([o("version", ["currentVersion", "capabilities", "tables", "supportedImageFormatTypes"])], b3.prototype, "readVersion", null), b3 = e([a2("esri.layers.mixins.ArcGISMapService")], b3), b3;
};

// node_modules/@arcgis/core/layers/support/Sublayer.js
var G;
function H(e3) {
  return "esriSMS" === e3?.type;
}
function z(e3, r4, t3) {
  const i = this.originIdOf(r4) >= n2(t3.origin);
  return { ignoreOrigin: true, allowNull: i, enabled: !!t3 && ("map-image" === t3.layer?.type && (t3.writeSublayerStructure || i)) };
}
function W(e3, r4, t3) {
  return { enabled: !!t3 && ("tile" === t3.layer?.type && (t3.origin && this.originIdOf(r4) >= n2(t3.origin) || this._isOverridden(r4))) };
}
function X(e3, r4, t3) {
  return { ignoreOrigin: true, enabled: t3 && t3.writeSublayerStructure || false };
}
function Y(e3, r4, t3) {
  return { ignoreOrigin: true, enabled: !!t3 && (t3.writeSublayerStructure || this.originIdOf(r4) >= n2(t3.origin)) };
}
var Z2 = 0;
var ee = /* @__PURE__ */ new Set(["layer", "parent", "loaded", "loadStatus", "loadError", "loadWarnings"]);
var re = G = class extends S(s5(m)) {
  constructor(e3) {
    super(e3), this.capabilities = void 0, this.maxScaleRange = { minScale: 0, maxScale: 0 }, this.fields = null, this.fullExtent = null, this.geometryType = null, this.globalIdField = null, this.isTable = false, this.legendEnabled = true, this.objectIdField = null, this.parent = null, this.popupEnabled = true, this.popupTemplate = null, this.relationships = null, this.sourceJSON = null, this.spatialReference = null, this.title = null, this.typeIdField = null, this.type = "sublayer", this.types = null, this._lastParsedUrl = null;
  }
  load(e3) {
    return __async(this, null, function* () {
      return this.addResolvingPromise((() => __async(this, null, function* () {
        const { layer: r4, url: t3 } = this;
        if (!r4 && !t3)
          throw new s2("sublayer:missing-layer", "Sublayer can't be loaded without being part of a layer", { sublayer: this });
        const i = r4 ? yield r4.fetchSublayerInfo(this, e3) : (yield U(t3, __spreadValues({ responseType: "json", query: { f: "json" } }, e3))).data;
        i && (this.sourceJSON = i, this.read({ layerDefinition: i }, { origin: "service", layer: r4, url: f2(t3) }));
      }))()), this;
    });
  }
  readCapabilities(e3, r4) {
    r4 = r4.layerDefinition || r4;
    const { operations: { supportsQuery: t3, supportsQueryAttachments: i }, query: { supportsFormatPBF: o4, supportsOrderBy: s7, supportsPagination: a5 }, data: { supportsAttachment: l2 }, queryRelated: n5 } = a3(r4, this.url);
    return { exportMap: { supportsModification: !!r4.canModifyLayer }, operations: { supportsQuery: t3, supportsQueryAttachments: i }, data: { supportsAttachment: l2 }, query: { supportsFormatPBF: o4, supportsOrderBy: s7, supportsPagination: a5 }, queryRelated: n5 };
  }
  get defaultPopupTemplate() {
    return this.createPopupTemplate();
  }
  set definitionExpression(e3) {
    this._setAndNotifyLayer("definitionExpression", e3);
  }
  get effectiveScaleRange() {
    const { minScale: e3, maxScale: r4 } = this;
    return { minScale: e3, maxScale: r4 };
  }
  readMaxScaleRange(e3, r4) {
    return { minScale: (r4 = r4.layerDefinition || r4).minScale ?? 0, maxScale: r4.maxScale ?? 0 };
  }
  get fieldsIndex() {
    return new Z(this.fields || []);
  }
  set floorInfo(e3) {
    this._setAndNotifyLayer("floorInfo", e3);
  }
  readGlobalIdFieldFromService(e3, r4) {
    if ((r4 = r4.layerDefinition || r4).globalIdField)
      return r4.globalIdField;
    if (r4.fields) {
      for (const t3 of r4.fields)
        if ("esriFieldTypeGlobalID" === t3.type)
          return t3.name;
    }
  }
  get id() {
    const e3 = this._get("id");
    return e3 ?? Z2++;
  }
  set id(e3) {
    this._get("id") !== e3 && (false !== this.layer?.capabilities?.exportMap?.supportsDynamicLayers ? this._set("id", e3) : this._logLockedError("id", "capability not available 'layer.capabilities.exportMap.supportsDynamicLayers'"));
  }
  readIsTable(e3, r4) {
    return "Table" === r4.type;
  }
  set labelingInfo(e3) {
    this._setAndNotifyLayer("labelingInfo", e3);
  }
  writeLabelingInfo(e3, r4, t3, i) {
    e3 && e3.length && (r4.layerDefinition = { drawingInfo: { labelingInfo: e3.map((e4) => e4.write({}, i)) } });
  }
  set labelsVisible(e3) {
    this._setAndNotifyLayer("labelsVisible", e3);
  }
  set layer(e3) {
    this._set("layer", e3), this.sublayers?.forEach((r4) => r4.layer = e3);
  }
  set listMode(e3) {
    this._set("listMode", e3);
  }
  set minScale(e3) {
    this._setAndNotifyLayer("minScale", e3);
  }
  readMinScale(e3, r4) {
    return r4.minScale || r4.layerDefinition?.minScale || 0;
  }
  set maxScale(e3) {
    this._setAndNotifyLayer("maxScale", e3);
  }
  readMaxScale(e3, r4) {
    return r4.maxScale || r4.layerDefinition?.maxScale || 0;
  }
  readObjectIdFieldFromService(e3, r4) {
    if ((r4 = r4.layerDefinition || r4).objectIdField)
      return r4.objectIdField;
    const t3 = r4.fields?.find((e4) => "esriFieldTypeOID" === e4.type);
    return t3?.name;
  }
  set opacity(e3) {
    this._setAndNotifyLayer("opacity", e3);
  }
  readOpacity(e3, r4) {
    const { layerDefinition: t3 } = r4;
    return 1 - 0.01 * (t3?.transparency ?? t3?.drawingInfo?.transparency ?? 0);
  }
  writeOpacity(e3, r4, t3, i) {
    r4.layerDefinition = { drawingInfo: { transparency: 100 - 100 * e3 } };
  }
  writeParent(e3, r4) {
    this.parent && this.parent !== this.layer ? r4.parentLayerId = s(this.parent.id) : r4.parentLayerId = -1;
  }
  get queryTask() {
    if (!this.layer)
      return null;
    const { capabilities: e3, fieldsIndex: r4, layer: t3, url: i } = this, { spatialReference: o4 } = t3, s7 = "gdbVersion" in t3 ? t3.gdbVersion : void 0, a5 = has("featurelayer-pbf") && e3?.query.supportsFormatPBF;
    return new x2({ fieldsIndex: r4, gdbVersion: s7, pbfSupported: a5, queryAttachmentsSupported: e3?.operations?.supportsQueryAttachments ?? false, sourceSpatialReference: o4, url: i });
  }
  set renderer(e3) {
    if (p4(e3, this.fieldsIndex), e3) {
      for (const r4 of e3.getSymbols())
        if (x(r4)) {
          n.getLogger(this).warn("Sublayer renderer should use 2D symbols");
          break;
        }
    }
    this._setAndNotifyLayer("renderer", e3);
  }
  get source() {
    return this._get("source") || new c({ mapLayerId: this.id });
  }
  set source(e3) {
    this._setAndNotifyLayer("source", e3);
  }
  set sublayers(e3) {
    this._handleSublayersChange(e3, this._get("sublayers")), this._set("sublayers", e3);
  }
  castSublayers(e3) {
    return b(V2.ofType(G), e3);
  }
  writeSublayers(e3, r4, t3) {
    this.sublayers?.length && (r4[t3] = this.sublayers.map((e4) => e4.id).toArray().reverse());
  }
  readTitle(e3, r4) {
    return r4.layerDefinition?.name ?? r4.name;
  }
  readTypeIdField(e3, r4) {
    let t3 = (r4 = r4.layerDefinition || r4).typeIdField;
    if (t3 && r4.fields) {
      t3 = t3.toLowerCase();
      const e4 = r4.fields.find((e5) => e5.name.toLowerCase() === t3);
      e4 && (t3 = e4.name);
    }
    return t3;
  }
  get url() {
    const e3 = this.layer?.parsedUrl ?? this._lastParsedUrl, r4 = this.source;
    if (!e3)
      return null;
    if (this._lastParsedUrl = e3, "map-layer" === r4?.type)
      return `${e3.path}/${r4.mapLayerId}`;
    const t3 = { layer: JSON.stringify({ source: this.source }) };
    return `${e3.path}/dynamicLayer?${v(t3)}`;
  }
  set url(e3) {
    this._overrideIfSome("url", e3);
  }
  set visible(e3) {
    this._setAndNotifyLayer("visible", e3);
  }
  writeVisible(e3, r4, t3, i) {
    r4[t3] = this.getAtOrigin("defaultVisibility", "service") || e3;
  }
  clone() {
    const { store: e3 } = t(this), r4 = new G();
    return t(r4).store = e3.clone(ee), this.commitProperty("url"), r4._lastParsedUrl = this._lastParsedUrl, r4;
  }
  createPopupTemplate(e3) {
    return p3(this, e3);
  }
  createQuery() {
    return new b2({ returnGeometry: true, where: this.definitionExpression || "1=1" });
  }
  createFeatureLayer() {
    return __async(this, null, function* () {
      if (this.hasOwnProperty("sublayers"))
        return null;
      const e3 = (yield import("./chunk-AISZU6ZW.js")).default, { layer: r4, url: t3 } = this;
      let i;
      if (t3 && this.originIdOf("url") > e2.SERVICE)
        i = new e3({ url: t3 });
      else {
        if (!r4?.parsedUrl)
          throw new s2("createFeatureLayer:missing-information", "Cannot create a FeatureLayer without a url or a parent layer");
        {
          const t4 = r4.parsedUrl;
          i = new e3({ url: t4.path }), t4 && this.source && ("map-layer" === this.source.type ? i.layerId = this.source.mapLayerId : i.dynamicDataSource = this.source);
        }
      }
      return null != r4?.refreshInterval && (i.refreshInterval = r4.refreshInterval), this.definitionExpression && (i.definitionExpression = this.definitionExpression), this.floorInfo && (i.floorInfo = a(this.floorInfo)), this.originIdOf("labelingInfo") > e2.SERVICE && (i.labelingInfo = a(this.labelingInfo)), this.originIdOf("labelsVisible") > e2.DEFAULTS && (i.labelsVisible = this.labelsVisible), this.originIdOf("legendEnabled") > e2.DEFAULTS && (i.legendEnabled = this.legendEnabled), this.originIdOf("visible") > e2.DEFAULTS && (i.visible = this.visible), this.originIdOf("minScale") > e2.DEFAULTS && (i.minScale = this.minScale), this.originIdOf("maxScale") > e2.DEFAULTS && (i.maxScale = this.maxScale), this.originIdOf("opacity") > e2.DEFAULTS && (i.opacity = this.opacity), this.originIdOf("popupTemplate") > e2.DEFAULTS && (i.popupTemplate = a(this.popupTemplate)), this.originIdOf("renderer") > e2.SERVICE && (i.renderer = a(this.renderer)), "data-layer" === this.source?.type && (i.dynamicDataSource = this.source.clone()), this.originIdOf("title") > e2.DEFAULTS && (i.title = this.title), "map-image" === r4?.type && r4.originIdOf("customParameters") > e2.DEFAULTS && (i.customParameters = r4.customParameters), "tile" === r4?.type && r4.originIdOf("customParameters") > e2.DEFAULTS && (i.customParameters = r4.customParameters), i;
    });
  }
  getField(e3) {
    return this.fieldsIndex.get(e3);
  }
  getFeatureType(e3) {
    return N2(this.types, this.typeIdField, e3);
  }
  getFieldDomain(e3, r4) {
    const t3 = r4?.feature, i = this.getFeatureType(t3);
    if (i) {
      const r5 = i.domains && i.domains[e3];
      if (r5 && "inherited" !== r5.type)
        return r5;
    }
    return this._getLayerDomain(e3);
  }
  queryAttachments(e3, r4) {
    return __async(this, null, function* () {
      yield this.load(), e3 = c2.from(e3);
      const t3 = this.capabilities;
      if (!t3?.data?.supportsAttachment)
        throw new s2("queryAttachments:not-supported", "this layer doesn't support attachments");
      const { attachmentTypes: i, objectIds: o4, globalIds: s7, num: a5, size: n5, start: p5, where: u2 } = e3;
      if (!t3?.operations?.supportsQueryAttachments) {
        if (i?.length > 0 || s7?.length > 0 || n5?.length > 0 || a5 || p5 || u2)
          throw new s2("queryAttachments:option-not-supported", "when 'capabilities.operations.supportsQueryAttachments' is false, only objectIds is supported", e3);
      }
      if (!(o4?.length || s7?.length || u2))
        throw new s2("queryAttachments:invalid-query", "'objectIds', 'globalIds', or 'where' are required to perform attachment query", e3);
      return this.queryTask.executeAttachmentQuery(e3, r4);
    });
  }
  queryFeatureCount() {
    return __async(this, arguments, function* (e3 = this.createQuery(), r4) {
      if (yield this.load(), !this.capabilities.operations.supportsQuery)
        throw new s2("queryFeatureCount:not-supported", "this layer doesn't support queries.");
      if (!this.url)
        throw new s2("queryFeatureCount:not-supported", "this layer has no url.");
      const t3 = this.layer?.apiKey;
      return yield this.queryTask.executeForCount(e3, __spreadProps(__spreadValues({}, r4), { query: __spreadProps(__spreadValues({}, this.layer?.customParameters), { token: t3 }) }));
    });
  }
  queryFeatures() {
    return __async(this, arguments, function* (e3 = this.createQuery(), r4) {
      if (yield this.load(), !this.capabilities.operations.supportsQuery)
        throw new s2("queryFeatures:not-supported", "this layer doesn't support queries.");
      if (!this.url)
        throw new s2("queryFeatures:not-supported", "this layer has no url.");
      const t3 = yield this.queryTask.execute(e3, __spreadProps(__spreadValues({}, r4), { query: __spreadProps(__spreadValues({}, this.layer?.customParameters), { token: this.layer?.apiKey }) }));
      if (t3?.features)
        for (const i of t3.features)
          i.sourceLayer = this;
      return t3;
    });
  }
  queryObjectIds() {
    return __async(this, arguments, function* (e3 = this.createQuery(), r4) {
      if (yield this.load(), !this.capabilities.operations.supportsQuery)
        throw new s2("queryObjectIds:not-supported", "this layer doesn't support queries.");
      if (!this.url)
        throw new s2("queryObjectIds:not-supported", "this layer has no url.");
      const t3 = this.layer?.apiKey;
      return yield this.queryTask.executeForIds(e3, __spreadProps(__spreadValues({}, r4), { query: __spreadProps(__spreadValues({}, this.layer?.customParameters), { token: t3 }) }));
    });
  }
  queryRelatedFeatures(e3, r4) {
    return __async(this, null, function* () {
      if (yield this.load(), !this.capabilities.operations.supportsQuery)
        throw new s2("queryRelatedFeatures:not-supported", "this layer doesn't support queries.");
      if (!this.url)
        throw new s2("queryRelatedFeatures:not-supported", "this layer has no url.");
      const t3 = this.layer?.apiKey;
      return yield this.queryTask.executeRelationshipQuery(e3, __spreadProps(__spreadValues({}, r4), { query: __spreadProps(__spreadValues({}, this.layer?.customParameters), { token: t3 }) }));
    });
  }
  queryRelatedFeaturesCount(e3, r4) {
    return __async(this, null, function* () {
      if (yield this.load(), !this.capabilities.operations.supportsQuery)
        throw new s2("queryRelatedFeaturesCount:not-supported", "this layer doesn't support queries.");
      if (!this.capabilities.queryRelated.supportsCount)
        throw new s2("queryRelatedFeaturesCount:not-supported", "this layer doesn't support query related counts.");
      if (!this.url)
        throw new s2("queryRelatedFeaturesCount:not-supported", "this layer has no url.");
      const t3 = this.layer?.apiKey;
      return yield this.queryTask.executeRelationshipQueryForCount(e3, __spreadProps(__spreadValues({}, r4), { query: __spreadProps(__spreadValues({}, this.layer?.customParameters), { token: t3 }) }));
    });
  }
  toExportImageJSON(e3) {
    const r4 = { id: this.id, source: this.source?.toJSON() || { mapLayerId: this.id, type: "mapLayer" } }, t3 = n3(e3, this.definitionExpression);
    null != t3 && (r4.definitionExpression = t3);
    const i = ["renderer", "labelingInfo", "opacity", "labelsVisible"].reduce((e4, r5) => (e4[r5] = this.originIdOf(r5), e4), {}), o4 = Object.keys(i).some((e4) => i[e4] > e2.SERVICE);
    if (o4) {
      const e4 = r4.drawingInfo = {};
      if (i.renderer > e2.SERVICE && (e4.renderer = this.renderer ? this.renderer.toJSON() : null), i.labelsVisible > e2.SERVICE && (e4.showLabels = this.labelsVisible), this.labelsVisible && i.labelingInfo > e2.SERVICE)
        if (this.labelingInfo) {
          !this.loaded && this.labelingInfo?.some((e5) => !e5.labelPlacement) && n.getLogger(this).warnOnce(`A Sublayer (title: ${this.title}, id: ${this.id}) has an undefined 'labelPlacement' and so labels cannot be displayed. Either define a valid 'labelPlacement' or call Sublayer.load() to use a default value based on geometry type.`, { sublayer: this });
          let r5 = this.labelingInfo;
          null != this.geometryType && (r5 = a4(this.labelingInfo, o2.toJSON(this.geometryType))), e4.showLabels = true, e4.labelingInfo = r5.filter((e5) => e5.labelPlacement).map((e5) => e5.toJSON({ origin: "service", layer: this.layer }));
        } else
          e4.showLabels = false;
      i.opacity > e2.SERVICE && (e4.transparency = 100 - 100 * this.opacity), this._assignDefaultSymbolColors(e4.renderer);
    }
    return r4;
  }
  _assignDefaultSymbolColors(e3) {
    this._forEachSimpleMarkerSymbols(e3, (e4) => {
      e4.color || "esriSMSX" !== e4.style && "esriSMSCross" !== e4.style || (e4.outline?.color ? e4.color = e4.outline.color : e4.color = [0, 0, 0, 0]);
    });
  }
  _forEachSimpleMarkerSymbols(e3, r4) {
    if (e3) {
      const t3 = ("uniqueValueInfos" in e3 ? e3.uniqueValueInfos : "classBreakInfos" in e3 ? e3.classBreakInfos : null) ?? [];
      for (const e4 of t3)
        H(e4.symbol) && r4(e4.symbol);
      "symbol" in e3 && H(e3.symbol) && r4(e3.symbol), "defaultSymbol" in e3 && H(e3.defaultSymbol) && r4(e3.defaultSymbol);
    }
  }
  _setAndNotifyLayer(e3, r4) {
    const t3 = this.layer, i = this._get(e3);
    let o4, s7;
    switch (e3) {
      case "definitionExpression":
      case "floorInfo":
        o4 = "supportsSublayerDefinitionExpression";
        break;
      case "minScale":
      case "maxScale":
      case "visible":
        o4 = "supportsSublayerVisibility";
        break;
      case "labelingInfo":
      case "labelsVisible":
      case "opacity":
      case "renderer":
      case "source":
        o4 = "supportsDynamicLayers", s7 = "supportsModification";
    }
    const a5 = t(this).getDefaultOrigin();
    if ("service" !== a5) {
      if (o4 && false === this.layer?.capabilities?.exportMap?.[o4])
        return void this._logLockedError(e3, `capability not available 'layer.capabilities.exportMap.${o4}'`);
      if (s7 && false === this.capabilities?.exportMap[s7])
        return void this._logLockedError(e3, `capability not available 'capabilities.exportMap.${s7}'`);
    }
    "source" !== e3 || "not-loaded" === this.loadStatus ? (this._set(e3, r4), "service" !== a5 && i !== r4 && t3 && t3.emit && t3.emit("sublayer-update", { propertyName: e3, target: this })) : this._logLockedError(e3, "'source' can't be changed after calling sublayer.load()");
  }
  _handleSublayersChange(e3, r4) {
    r4 && (r4.forEach((e4) => {
      e4.parent = null, e4.layer = null;
    }), this.removeAllHandles()), e3 && (e3.forEach((e4) => {
      e4.parent = this, e4.layer = this.layer;
    }), this.addHandles([e3.on("after-add", ({ item: e4 }) => {
      e4.parent = this, e4.layer = this.layer;
    }), e3.on("after-remove", ({ item: e4 }) => {
      e4.parent = null, e4.layer = null;
    }), e3.on("before-changes", (e4) => {
      (this.layer?.capabilities?.exportMap?.supportsSublayersChanges ?? 1) || (n.getLogger(this).error(new s2("sublayer:sublayers-non-modifiable", "Sublayer can't be added, moved, or removed from the layer's sublayers", { sublayer: this, layer: this.layer })), e4.preventDefault());
    })]));
  }
  _logLockedError(e3, r4) {
    const { layer: t3, declaredClass: i } = this;
    n.getLogger(i).error(new s2("sublayer:locked", `Property '${String(e3)}' can't be changed on Sublayer from the layer '${t3?.id}'`, { reason: r4, sublayer: this, layer: t3 }));
  }
  _getLayerDomain(e3) {
    return this.fieldsIndex.get(e3)?.domain ?? null;
  }
};
re.test = { isMapImageLayerOverridePolicy: (e3) => e3 === X || e3 === z, isTileImageLayerOverridePolicy: (e3) => e3 === W }, e([y({ readOnly: true })], re.prototype, "capabilities", void 0), e([o("service", "capabilities", ["layerDefinition.canModifyLayer", "layerDefinition.capabilities"])], re.prototype, "readCapabilities", null), e([y()], re.prototype, "defaultPopupTemplate", null), e([y({ type: String, value: null, json: { name: "layerDefinition.definitionExpression", write: { allowNull: true, overridePolicy: z } } })], re.prototype, "definitionExpression", null), e([y({ readOnly: true })], re.prototype, "effectiveScaleRange", null), e([o("service", "maxScaleRange", ["minScale", "maxScale"])], re.prototype, "readMaxScaleRange", null), e([y({ type: [y2], json: { origins: { service: { read: { source: "layerDefinition.fields" } } } } })], re.prototype, "fields", void 0), e([y({ readOnly: true })], re.prototype, "fieldsIndex", null), e([y({ type: p, value: null, json: { name: "layerDefinition.floorInfo", read: { source: "layerDefinition.floorInfo" }, write: { target: "layerDefinition.floorInfo", overridePolicy: z }, origins: { "web-scene": { read: false, write: false } } } })], re.prototype, "floorInfo", null), e([y({ type: w, json: { read: { source: "layerDefinition.extent" } } })], re.prototype, "fullExtent", void 0), e([y({ type: o2.apiValues, json: { origins: { service: { name: "layerDefinition.geometryType", read: { reader: o2.read } } } } })], re.prototype, "geometryType", void 0), e([y({ type: String })], re.prototype, "globalIdField", void 0), e([o("service", "globalIdField", ["layerDefinition.globalIdField", "layerDefinition.fields"])], re.prototype, "readGlobalIdFieldFromService", null), e([y({ type: N, json: { write: { ignoreOrigin: true } } })], re.prototype, "id", null), e([y({ readOnly: true })], re.prototype, "isTable", void 0), e([o("service", "isTable", ["type"])], re.prototype, "readIsTable", null), e([y({ value: null, type: [C2], json: { read: { source: "layerDefinition.drawingInfo.labelingInfo" }, write: { target: "layerDefinition.drawingInfo.labelingInfo", overridePolicy: X } } })], re.prototype, "labelingInfo", null), e([r2("labelingInfo")], re.prototype, "writeLabelingInfo", null), e([y({ type: Boolean, value: true, json: { read: { source: "layerDefinition.drawingInfo.showLabels" }, write: { target: "layerDefinition.drawingInfo.showLabels", overridePolicy: X } } })], re.prototype, "labelsVisible", null), e([y({ value: null })], re.prototype, "layer", null), e([y({ type: String, json: { write: { overridePolicy: W } } })], re.prototype, "layerItemId", void 0), e([y({ type: Boolean, value: true, json: { origins: { service: { read: { enabled: false } } }, read: { source: "showLegend" }, write: { target: "showLegend", overridePolicy: Y } } })], re.prototype, "legendEnabled", void 0), e([y({ type: ["show", "hide", "hide-children"], value: "show", json: { read: false, write: false, origins: { "web-scene": { read: true, write: true } } } })], re.prototype, "listMode", null), e([y({ type: Number, value: 0, json: { write: { overridePolicy: X } } })], re.prototype, "minScale", null), e([o("minScale", ["minScale", "layerDefinition.minScale"])], re.prototype, "readMinScale", null), e([y({ type: Number, value: 0, json: { write: { overridePolicy: X } } })], re.prototype, "maxScale", null), e([o("maxScale", ["maxScale", "layerDefinition.maxScale"])], re.prototype, "readMaxScale", null), e([y()], re.prototype, "objectIdField", void 0), e([o("service", "objectIdField", ["layerDefinition.objectIdField", "layerDefinition.fields"])], re.prototype, "readObjectIdFieldFromService", null), e([y({ type: Number, value: 1, json: { write: { target: "layerDefinition.drawingInfo.transparency", overridePolicy: X } } })], re.prototype, "opacity", null), e([o("opacity", ["layerDefinition.drawingInfo.transparency", "layerDefinition.transparency"])], re.prototype, "readOpacity", null), e([r2("opacity")], re.prototype, "writeOpacity", null), e([y({ json: { type: N, write: { target: "parentLayerId", writerEnsuresNonNull: true, overridePolicy: X } } })], re.prototype, "parent", void 0), e([r2("parent")], re.prototype, "writeParent", null), e([y({ type: Boolean, value: true, json: { read: { source: "disablePopup", reader: (e3, r4) => !r4.disablePopup }, write: { target: "disablePopup", overridePolicy: Y, writer(e3, r4, t3) {
  r4[t3] = !e3;
} } } })], re.prototype, "popupEnabled", void 0), e([y({ type: k, json: { read: { source: "popupInfo" }, write: { target: "popupInfo", overridePolicy: Y } } })], re.prototype, "popupTemplate", void 0), e([y({ readOnly: true })], re.prototype, "queryTask", null), e([y({ type: [p2], readOnly: true, json: { origins: { service: { read: { source: "layerDefinition.relationships" } } } } })], re.prototype, "relationships", void 0), e([y({ types: m2, value: null, json: { name: "layerDefinition.drawingInfo.renderer", write: { overridePolicy: X }, origins: { "web-scene": { types: u, name: "layerDefinition.drawingInfo.renderer", write: { overridePolicy: X } } } } })], re.prototype, "renderer", null), e([y({ types: { key: "type", base: null, typeMap: { "data-layer": K, "map-layer": c } }, cast(e3) {
  if (e3) {
    if ("mapLayerId" in e3)
      return g(c, e3);
    if ("dataSource" in e3)
      return g(K, e3);
  }
  return e3;
}, json: { name: "layerDefinition.source", write: { overridePolicy: X } } })], re.prototype, "source", null), e([y()], re.prototype, "sourceJSON", void 0), e([y({ type: f, json: { origins: { service: { read: { source: "layerDefinition.extent.spatialReference" } } } } })], re.prototype, "spatialReference", void 0), e([y({ value: null, json: { type: [N], write: { target: "subLayerIds", allowNull: true, overridePolicy: X } } })], re.prototype, "sublayers", null), e([s4("sublayers")], re.prototype, "castSublayers", null), e([r2("sublayers")], re.prototype, "writeSublayers", null), e([y({ type: String, json: { name: "name", write: { overridePolicy: Y } } })], re.prototype, "title", void 0), e([o("service", "title", ["name", "layerDefinition.name"])], re.prototype, "readTitle", null), e([y({ type: String })], re.prototype, "typeIdField", void 0), e([y({ json: { read: false }, readOnly: true, value: "sublayer" })], re.prototype, "type", void 0), e([o("typeIdField", ["layerDefinition.typeIdField"])], re.prototype, "readTypeIdField", null), e([y({ type: [n4], json: { origins: { service: { read: { source: "layerDefinition.types" } } } } })], re.prototype, "types", void 0), e([y({ type: String, json: { name: "layerUrl", write: { overridePolicy: W } } })], re.prototype, "url", null), e([y({ type: Boolean, value: true, json: { read: { source: "defaultVisibility" }, write: { target: "defaultVisibility", overridePolicy: X } } })], re.prototype, "visible", null), e([r2("visible")], re.prototype, "writeVisible", null), re = G = e([a2("esri.layers.support.Sublayer")], re);
var te = re;

// node_modules/@arcgis/core/layers/mixins/SublayersOwner.js
function h(e3, r4) {
  const s7 = [], t3 = {};
  return e3 ? (e3.forEach((e4) => {
    const o4 = new te();
    if (o4.read(e4, r4), t3[o4.id] = o4, null != e4.parentLayerId && -1 !== e4.parentLayerId) {
      const r5 = t3[e4.parentLayerId];
      r5.sublayers || (r5.sublayers = []), r5.sublayers.unshift(o4);
    } else
      s7.unshift(o4);
  }), s7) : s7;
}
var f4 = V2.ofType(te);
function S2(e3, r4) {
  e3 && e3.forEach((e4) => {
    r4(e4), e4.sublayers && e4.sublayers.length && S2(e4.sublayers, r4);
  });
}
var m3 = (m4) => {
  let E = class extends m4 {
    constructor(...e3) {
      super(...e3), this.allSublayers = new l({ getCollections: () => [this.sublayers], getChildrenFunction: (e4) => e4.sublayers }), this.sublayersSourceJSON = { [e2.SERVICE]: {}, [e2.PORTAL_ITEM]: {}, [e2.WEB_SCENE]: {}, [e2.WEB_MAP]: {} }, this.subtables = null, this.addHandles([d(() => this.sublayers, (e4, r4) => this._handleSublayersChange(e4, r4), C), d(() => this.subtables, (e4, r4) => this._handleSublayersChange(e4, r4), C)]);
    }
    destroy() {
      this.allSublayers.destroy();
    }
    readSublayers(e3, r4) {
      if (!r4 || !e3)
        return;
      const { sublayersSourceJSON: s7 } = this, t3 = n2(r4.origin);
      if (t3 < e2.SERVICE)
        return;
      if (s7[t3] = { context: r4, visibleLayers: e3.visibleLayers || s7[t3].visibleLayers, layers: e3.layers || s7[t3].layers }, t3 > e2.SERVICE)
        return;
      this._set("serviceSublayers", this.createSublayersForOrigin("service").sublayers);
      const { sublayers: o4, origin: a5 } = this.createSublayersForOrigin("web-document"), l2 = t(this);
      l2.setDefaultOrigin(a5), this._set("sublayers", new f4(o4)), l2.setDefaultOrigin("user");
    }
    findSublayerById(e3) {
      return this.allSublayers.find((r4) => r4.id === e3);
    }
    createServiceSublayers() {
      return this.createSublayersForOrigin("service").sublayers;
    }
    createSublayersForOrigin(e3) {
      const r4 = n2("web-document" === e3 ? "web-map" : e3);
      let s7 = e2.SERVICE, t3 = this.sublayersSourceJSON[e2.SERVICE].layers, o4 = this.sublayersSourceJSON[e2.SERVICE].context, a5 = null;
      const l2 = [e2.PORTAL_ITEM, e2.WEB_SCENE, e2.WEB_MAP].filter((e4) => e4 <= r4);
      for (const y3 of l2) {
        const e4 = this.sublayersSourceJSON[y3];
        o3(e4.layers) && (s7 = y3, t3 = e4.layers, o4 = e4.context, e4.visibleLayers && (a5 = { visibleLayers: e4.visibleLayers, context: e4.context }));
      }
      const i = [e2.PORTAL_ITEM, e2.WEB_SCENE, e2.WEB_MAP].filter((e4) => e4 > s7 && e4 <= r4);
      let n5 = null;
      for (const y3 of i) {
        const { layers: e4, visibleLayers: r5, context: s8 } = this.sublayersSourceJSON[y3];
        e4 && (n5 = { layers: e4, context: s8 }), r5 && (a5 = { visibleLayers: r5, context: s8 });
      }
      const u2 = h(t3, o4), d3 = /* @__PURE__ */ new Map(), m5 = /* @__PURE__ */ new Set();
      if (n5)
        for (const y3 of n5.layers)
          d3.set(y3.id, y3);
      if (a5?.visibleLayers)
        for (const y3 of a5.visibleLayers)
          m5.add(y3);
      return S2(u2, (e4) => {
        n5 && e4.read(d3.get(e4.id), n5.context), a5 && e4.read({ defaultVisibility: m5.has(e4.id) }, a5.context);
      }), { origin: t2(s7), sublayers: new f4({ items: u2 }) };
    }
    read(e3, r4) {
      super.read(e3, r4), this.readSublayers(e3, r4);
    }
    _handleSublayersChange(e3, r4) {
      r4 && (r4.forEach((e4) => {
        e4.parent = null, e4.layer = null;
      }), this.removeHandles("sublayers-owner")), e3 && (e3.forEach((e4) => {
        e4.parent = this, e4.layer = this;
      }), this.addHandles([e3.on("after-add", ({ item: e4 }) => {
        e4.parent = this, e4.layer = this;
      }), e3.on("after-remove", ({ item: e4 }) => {
        e4.parent = null, e4.layer = null;
      })], "sublayers-owner"), "tile" === this.type && this.addHandles(e3.on("before-changes", (e4) => {
        n.getLogger("esri.layers.TileLayer").error(new s2("tilelayer:sublayers-non-modifiable", "ISublayer can't be added, moved, or removed from the layer's sublayers", { layer: this })), e4.preventDefault();
      }), "sublayers-owner"));
    }
  };
  return e([y({ readOnly: true })], E.prototype, "allSublayers", void 0), e([y({ readOnly: true, type: V2.ofType(te) })], E.prototype, "serviceSublayers", void 0), e([y({ value: null, type: f4, json: { read: false, write: { allowNull: true, ignoreOrigin: true } } })], E.prototype, "sublayers", void 0), e([y({ readOnly: true })], E.prototype, "sublayersSourceJSON", void 0), e([y({ type: f4, json: { read: { source: "tables" } } })], E.prototype, "subtables", void 0), E = e([a2("esri.layers.mixins.SublayersOwner")], E), E;
};

export {
  f3 as f,
  te,
  m3 as m
};
//# sourceMappingURL=chunk-X4T4LU3K.js.map
