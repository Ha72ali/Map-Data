import {
  C,
  L
} from "./chunk-4JQNUPOT.js";
import {
  $,
  Z,
  w
} from "./chunk-BLW32RHQ.js";
import "./chunk-FWQUNSRV.js";
import {
  a as a4,
  a2 as a5,
  a3 as a6,
  d
} from "./chunk-CVXOA75V.js";
import {
  i as i2
} from "./chunk-UUWAG2SR.js";
import {
  l
} from "./chunk-KRK4OVZD.js";
import "./chunk-R4ADXNFU.js";
import "./chunk-A3K4AQEC.js";
import "./chunk-5NJ3TZEU.js";
import "./chunk-6MWDYJDX.js";
import "./chunk-WBMLBIXY.js";
import "./chunk-RVXZGPCS.js";
import "./chunk-XZIOHBEC.js";
import {
  s as s2
} from "./chunk-UWOATJXA.js";
import {
  p
} from "./chunk-PSUD6NH2.js";
import {
  e as e3
} from "./chunk-LTWQYIJF.js";
import {
  j
} from "./chunk-TPOHS65A.js";
import {
  t
} from "./chunk-XCPRP2KL.js";
import {
  b
} from "./chunk-6F52T6PY.js";
import {
  d as d2,
  s as s3,
  y as y3
} from "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f as f2
} from "./chunk-SIUD6VOA.js";
import "./chunk-FLQEN5HO.js";
import {
  i4 as i,
  k
} from "./chunk-ZQQ553GQ.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-UER5KWEB.js";
import "./chunk-5EK2HSR2.js";
import "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import "./chunk-LRQVNXVW.js";
import "./chunk-5YCNWSDC.js";
import {
  y as y2
} from "./chunk-OXKKAHFH.js";
import "./chunk-7JFZMNXX.js";
import "./chunk-KDBJKPA2.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-YTRR4X7U.js";
import "./chunk-7LQIO4JZ.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import {
  o as o2
} from "./chunk-JJ2NMOGF.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-GPPG4D7S.js";
import "./chunk-V7FXKYLS.js";
import "./chunk-2AR2ZIQP.js";
import "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import {
  o
} from "./chunk-BYMJUQYJ.js";
import {
  r
} from "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  U,
  V
} from "./chunk-IMLUWAKH.js";
import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  N,
  a3 as a2
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  a as a3
} from "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import {
  a,
  e as e2,
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/pointCloudFilters/PointCloudFilter.js
var t2 = class extends f {
  constructor(o3) {
    super(o3), this.field = null, this.type = null;
  }
  clone() {
    return console.warn(".clone() is not implemented for " + this.declaredClass), null;
  }
};
e([y({ type: String, json: { write: { enabled: true, isRequired: true } } })], t2.prototype, "field", void 0), e([y({ readOnly: true, nonNullable: true, json: { read: false } })], t2.prototype, "type", void 0), t2 = e([a2("esri.layers.pointCloudFilters.PointCloudFilter")], t2);
var l2 = t2;

// node_modules/@arcgis/core/layers/pointCloudFilters/PointCloudBitfieldFilter.js
var d3;
var p2 = d3 = class extends l2 {
  constructor(e5) {
    super(e5), this.requiredClearBits = null, this.requiredSetBits = null, this.type = "bitfield";
  }
  clone() {
    return new d3({ field: this.field, requiredClearBits: a(this.requiredClearBits), requiredSetBits: a(this.requiredSetBits) });
  }
};
e([y({ type: [N], json: { write: { enabled: true, overridePolicy() {
  return { enabled: true, isRequired: !this.requiredSetBits };
} } } })], p2.prototype, "requiredClearBits", void 0), e([y({ type: [N], json: { write: { enabled: true, overridePolicy() {
  return { enabled: true, isRequired: !this.requiredClearBits };
} } } })], p2.prototype, "requiredSetBits", void 0), e([o2({ pointCloudBitfieldFilter: "bitfield" })], p2.prototype, "type", void 0), p2 = d3 = e([a2("esri.layers.pointCloudFilters.PointCloudBitfieldFilter")], p2);
var u = p2;

// node_modules/@arcgis/core/layers/pointCloudFilters/PointCloudReturnFilter.js
var n2;
var p3 = n2 = class extends l2 {
  constructor(r2) {
    super(r2), this.includedReturns = [], this.type = "return";
  }
  clone() {
    return new n2({ field: this.field, includedReturns: a(this.includedReturns) });
  }
};
e([y({ type: [["firstOfMany", "last", "lastOfMany", "single"]], json: { write: { enabled: true, isRequired: true } } })], p3.prototype, "includedReturns", void 0), e([o2({ pointCloudReturnFilter: "return" })], p3.prototype, "type", void 0), p3 = n2 = e([a2("esri.layers.pointCloudFilters.PointCloudReturnFilter")], p3);
var u2 = p3;

// node_modules/@arcgis/core/layers/pointCloudFilters/PointCloudValueFilter.js
var l3;
var p4 = l3 = class extends l2 {
  constructor(e5) {
    super(e5), this.mode = "exclude", this.type = "value", this.values = [];
  }
  clone() {
    return new l3({ field: this.field, mode: this.mode, values: a(this.values) });
  }
};
e([y({ type: ["exclude", "include"], json: { write: { enabled: true, isRequired: true } } })], p4.prototype, "mode", void 0), e([o2({ pointCloudValueFilter: "value" })], p4.prototype, "type", void 0), e([y({ type: [Number], json: { write: { enabled: true, isRequired: true } } })], p4.prototype, "values", void 0), p4 = l3 = e([a2("esri.layers.pointCloudFilters.PointCloudValueFilter")], p4);
var u3 = p4;

// node_modules/@arcgis/core/layers/pointCloudFilters/typeUtils.js
var e4 = { key: "type", base: l2, typeMap: { value: u3, bitfield: u, return: u2 } };

// node_modules/@arcgis/core/renderers/PointCloudRGBRenderer.js
var p5;
var c = p5 = class extends a4 {
  constructor(r2) {
    super(r2), this.type = "point-cloud-rgb", this.field = null;
  }
  clone() {
    return new p5(__spreadProps(__spreadValues({}, this.cloneProperties()), { field: a(this.field) }));
  }
};
e([o2({ pointCloudRGBRenderer: "point-cloud-rgb" })], c.prototype, "type", void 0), e([y({ type: String, json: { write: true } })], c.prototype, "field", void 0), c = p5 = e([a2("esri.renderers.PointCloudRGBRenderer")], c);
var n3 = c;

// node_modules/@arcgis/core/renderers/support/pointCloud/typeUtils.js
var i3 = { key: "type", base: a4, typeMap: { "point-cloud-class-breaks": d, "point-cloud-rgb": n3, "point-cloud-stretch": a5, "point-cloud-unique-value": a6 }, errorContext: "renderer" };

// node_modules/@arcgis/core/layers/PointCloudLayer.js
var O = s2();
var V2 = class extends L(l(b(j(t(S(e3(i2(f2)))))))) {
  constructor(...e5) {
    super(...e5), this.operationalLayerType = "PointCloudLayer", this.popupEnabled = true, this.popupTemplate = null, this.opacity = 1, this.filters = [], this.fields = null, this.fieldsIndex = null, this.outFields = null, this.path = null, this.legendEnabled = true, this.renderer = null, this.type = "point-cloud";
  }
  normalizeCtorArgs(e5, r2) {
    return "string" == typeof e5 ? __spreadValues({ url: e5 }, r2) : e5;
  }
  get defaultPopupTemplate() {
    return this.attributeStorageInfo ? this.createPopupTemplate() : null;
  }
  getFieldDomain(e5) {
    const r2 = this.fieldsIndex.get(e5);
    return r2?.domain ? r2.domain : null;
  }
  readServiceFields(e5, r2, t3) {
    return Array.isArray(e5) ? e5.map((e6) => {
      const r3 = new y2();
      return "FieldTypeInteger" === e6.type && ((e6 = a(e6)).type = "esriFieldTypeInteger"), r3.read(e6, t3), r3;
    }) : Array.isArray(r2.attributeStorageInfo) ? r2.attributeStorageInfo.map((e6) => new y2({ name: e6.name, type: "ELEVATION" === e6.name ? "double" : "integer" })) : null;
  }
  set elevationInfo(e5) {
    this._set("elevationInfo", e5), this._validateElevationInfo();
  }
  writeRenderer(e5, r2, t3, o3) {
    e2("layerDefinition.drawingInfo.renderer", e5.write({}, o3), r2);
  }
  load(e5) {
    const r2 = null != e5 ? e5.signal : null, t3 = this.loadFromPortal({ supportedTypes: ["Scene Service"] }, e5).catch(a3).then(() => this._fetchService(r2));
    return this.addResolvingPromise(t3), Promise.resolve(this);
  }
  createPopupTemplate(e5) {
    const r2 = p(this, e5);
    return r2 && (this._formatPopupTemplateReturnsField(r2), this._formatPopupTemplateRGBField(r2)), r2;
  }
  _formatPopupTemplateReturnsField(e5) {
    const r2 = this.fieldsIndex.get("RETURNS");
    if (!r2)
      return;
    const t3 = e5.fieldInfos?.find((e6) => e6.fieldName === r2.name);
    if (!t3)
      return;
    const o3 = new i({ name: "pcl-returns-decoded", title: r2.alias || r2.name, expression: `
        var returnValue = $feature.${r2.name};
        return (returnValue % 16) + " / " + Floor(returnValue / 16);
      ` });
    e5.expressionInfos = [...e5.expressionInfos || [], o3], t3.fieldName = "expression/pcl-returns-decoded";
  }
  _formatPopupTemplateRGBField(e5) {
    const r2 = this.fieldsIndex.get("RGB");
    if (!r2)
      return;
    const t3 = e5.fieldInfos?.find((e6) => e6.fieldName === r2.name);
    if (!t3)
      return;
    const o3 = new i({ name: "pcl-rgb-decoded", title: r2.alias || r2.name, expression: `
        var rgb = $feature.${r2.name};
        var red = Floor(rgb / 65536, 0);
        var green = Floor((rgb - (red * 65536)) / 256,0);
        var blue = rgb - (red * 65536) - (green * 256);

        return "rgb(" + red + "," + green + "," + blue + ")";
      ` });
    e5.expressionInfos = [...e5.expressionInfos || [], o3], t3.fieldName = "expression/pcl-rgb-decoded";
  }
  queryCachedStatistics(e5, r2) {
    return __async(this, null, function* () {
      if (yield this.load(r2), !this.attributeStorageInfo)
        throw new s("scenelayer:no-cached-statistics", "Cached statistics are not available for this layer");
      const i4 = this.fieldsIndex.get(e5);
      if (!i4)
        throw new s("pointcloudlayer:field-unexisting", `Field '${e5}' does not exist on the layer`);
      for (const o3 of this.attributeStorageInfo)
        if (o3.name === i4.name) {
          const e6 = V(this.parsedUrl?.path ?? "", `./statistics/${o3.key}`);
          return U(e6, { query: __spreadProps(__spreadValues({ f: "json" }, this.customParameters), { token: this.apiKey }), responseType: "json", signal: r2 ? r2.signal : null }).then((e7) => e7.data);
        }
      throw new s("pointcloudlayer:no-cached-statistics", "Cached statistics for this attribute are not available");
    });
  }
  saveAs(e5, r2) {
    return __async(this, null, function* () {
      return this._debouncedSaveOperations(C.SAVE_AS, __spreadProps(__spreadValues({}, r2), { getTypeKeywords: () => this._getTypeKeywords(), portalItemLayerType: "point-cloud" }), e5);
    });
  }
  save() {
    return __async(this, null, function* () {
      const e5 = { getTypeKeywords: () => this._getTypeKeywords(), portalItemLayerType: "point-cloud" };
      return this._debouncedSaveOperations(C.SAVE, e5);
    });
  }
  validateLayer(e5) {
    if (e5.layerType && "PointCloud" !== e5.layerType)
      throw new s("pointcloudlayer:layer-type-not-supported", "PointCloudLayer does not support this layer type", { layerType: e5.layerType });
    if (isNaN(this.version.major) || isNaN(this.version.minor))
      throw new s("layer:service-version-not-supported", "Service version is not supported.", { serviceVersion: this.version.versionString, supportedVersions: "1.x-2.x" });
    if (this.version.major > 2)
      throw new s("layer:service-version-too-new", "Service version is too new.", { serviceVersion: this.version.versionString, supportedVersions: "1.x-2.x" });
  }
  hasCachedStatistics(e5) {
    return null != this.attributeStorageInfo && this.attributeStorageInfo.some((r2) => r2.name === e5);
  }
  _getTypeKeywords() {
    return ["PointCloud"];
  }
  _validateElevationInfo() {
    const e5 = this.elevationInfo;
    $(n.getLogger(this), Z("Point cloud layers", "absolute-height", e5)), $(n.getLogger(this), w("Point cloud layers", e5));
  }
};
e([y({ type: ["PointCloudLayer"] })], V2.prototype, "operationalLayerType", void 0), e([y(s3)], V2.prototype, "popupEnabled", void 0), e([y({ type: k, json: { name: "popupInfo", write: true } })], V2.prototype, "popupTemplate", void 0), e([y({ readOnly: true, json: { read: false } })], V2.prototype, "defaultPopupTemplate", null), e([y({ readOnly: true, json: { write: false, read: false, origins: { "web-document": { write: false, read: false } } } })], V2.prototype, "opacity", void 0), e([y({ type: ["show", "hide"] })], V2.prototype, "listMode", void 0), e([y({ types: [e4], json: { origins: { service: { read: { source: "filters" } } }, name: "layerDefinition.filters", write: true } })], V2.prototype, "filters", void 0), e([y({ type: [y2] })], V2.prototype, "fields", void 0), e([y(O.fieldsIndex)], V2.prototype, "fieldsIndex", void 0), e([o("service", "fields", ["fields", "attributeStorageInfo"])], V2.prototype, "readServiceFields", null), e([y(O.outFields)], V2.prototype, "outFields", void 0), e([y({ readOnly: true })], V2.prototype, "attributeStorageInfo", void 0), e([y(d2)], V2.prototype, "elevationInfo", null), e([y({ type: String, json: { origins: { "web-scene": { read: true, write: true }, "portal-item": { read: true, write: true } }, read: false } })], V2.prototype, "path", void 0), e([y(y3)], V2.prototype, "legendEnabled", void 0), e([y({ types: i3, json: { origins: { service: { read: { source: "drawingInfo.renderer" } } }, name: "layerDefinition.drawingInfo.renderer", write: { target: { "layerDefinition.drawingInfo.renderer": { types: i3 }, "layerDefinition.drawingInfo.transparency": { type: Number } } } } })], V2.prototype, "renderer", void 0), e([r("renderer")], V2.prototype, "writeRenderer", null), e([y({ json: { read: false }, readOnly: true })], V2.prototype, "type", void 0), V2 = e([a2("esri.layers.PointCloudLayer")], V2);
var U2 = V2;
export {
  U2 as default
};
//# sourceMappingURL=chunk-BZ6F3VEF.js.map
