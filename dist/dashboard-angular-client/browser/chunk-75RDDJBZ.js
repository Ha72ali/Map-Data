import {
  j as j3
} from "./chunk-2IZDVQOY.js";
import "./chunk-O2HF7YHC.js";
import {
  a as a4,
  m,
  p as p2,
  y as y2
} from "./chunk-2ABCVG2V.js";
import {
  C as C2,
  L
} from "./chunk-4JQNUPOT.js";
import {
  $,
  Z,
  w
} from "./chunk-BLW32RHQ.js";
import "./chunk-FWQUNSRV.js";
import {
  i
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
import "./chunk-AXDAXZX2.js";
import "./chunk-XZIOHBEC.js";
import {
  e as e2
} from "./chunk-LTWQYIJF.js";
import {
  j as j2
} from "./chunk-TPOHS65A.js";
import {
  t
} from "./chunk-XCPRP2KL.js";
import {
  b
} from "./chunk-6F52T6PY.js";
import {
  d
} from "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f as f2
} from "./chunk-SIUD6VOA.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-5EK2HSR2.js";
import "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import "./chunk-LRQVNXVW.js";
import {
  J,
  on
} from "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-YTRR4X7U.js";
import {
  C,
  v
} from "./chunk-QNED4CTP.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-JJ2NMOGF.js";
import {
  j
} from "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-GPPG4D7S.js";
import "./chunk-V7FXKYLS.js";
import "./chunk-2AR2ZIQP.js";
import {
  V
} from "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import {
  p
} from "./chunk-2GHQZMFH.js";
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
  I,
  U
} from "./chunk-IMLUWAKH.js";
import {
  f2 as f,
  u3 as u,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a2,
  s3 as s2
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
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/SceneModification.js
var l2;
var y3 = l2 = class extends f {
  constructor(e3) {
    super(e3), this.geometry = null, this.type = "clip";
  }
  writeGeometry(e3, r2, o2, s3) {
    if (s3.layer?.spatialReference && !s3.layer.spatialReference.equals(this.geometry.spatialReference)) {
      if (!J(e3.spatialReference, s3.layer.spatialReference))
        return void (s3?.messages && s3.messages.push(new s2("scenemodification:unsupported", "Scene modifications with incompatible spatial references are not supported", { modification: this, spatialReference: s3.layer.spatialReference, context: s3 })));
      const p3 = new j();
      on(e3, p3, s3.layer.spatialReference), r2[o2] = p3.toJSON(s3);
    } else
      r2[o2] = e3.toJSON(s3);
    delete r2[o2].spatialReference;
  }
  clone() {
    return new l2({ geometry: a(this.geometry), type: this.type });
  }
};
e([y({ type: j }), j3()], y3.prototype, "geometry", void 0), e([r(["web-scene", "portal-item"], "geometry")], y3.prototype, "writeGeometry", null), e([y({ type: ["clip", "mask", "replace"], nonNullable: true }), j3()], y3.prototype, "type", void 0), y3 = l2 = e([a2("esri.layers.support.SceneModification")], y3);
var f3 = y3;

// node_modules/@arcgis/core/layers/support/SceneModifications.js
var m2;
var n2 = m2 = class extends u(V.ofType(f3)) {
  constructor(r2) {
    super(r2), this.url = null;
  }
  clone() {
    return new m2({ url: this.url, items: this.items.map((r2) => r2.clone()) });
  }
  toJSON(r2) {
    return this.toArray().map((o2) => o2.toJSON(r2)).filter((r3) => !!r3.geometry);
  }
  static fromJSON(r2, o2) {
    const t2 = new m2();
    for (const e3 of r2)
      t2.add(f3.fromJSON(e3, o2));
    return t2;
  }
  static fromUrl(r2, t2, e3) {
    return __async(this, null, function* () {
      const i2 = { url: I(r2), origin: "service" }, c = yield U(r2, { responseType: "json", signal: e3?.signal }), n3 = t2.toJSON(), a6 = [];
      for (const o2 of c.data)
        a6.push(f3.fromJSON(__spreadProps(__spreadValues({}, o2), { geometry: __spreadProps(__spreadValues({}, o2.geometry), { spatialReference: n3 }) }), i2));
      return new m2({ url: r2, items: a6 });
    });
  }
};
e([y({ type: String })], n2.prototype, "url", void 0), n2 = m2 = e([a2("esri.layers.support.SceneModifications")], n2);
var a5 = n2;

// node_modules/@arcgis/core/layers/IntegratedMeshLayer.js
var A = class extends L(l(b(j2(t(S(e2(i(f2)))))))) {
  constructor(...e3) {
    super(...e3), this.geometryType = "mesh", this.operationalLayerType = "IntegratedMeshLayer", this.type = "integrated-mesh", this.nodePages = null, this.materialDefinitions = null, this.textureSetDefinitions = null, this.geometryDefinitions = null, this.serviceUpdateTimeStamp = null, this.profile = "mesh-pyramids", this.modifications = null, this._modificationsSource = null, this.path = null;
  }
  initialize() {
    this.addHandles(v(() => this.modifications, "after-changes", () => this.modifications = this.modifications, C));
  }
  normalizeCtorArgs(e3, t2) {
    return "string" == typeof e3 ? __spreadValues({ url: e3 }, t2) : e3;
  }
  readModifications(e3, t2, o2) {
    this._modificationsSource = { url: p(e3, o2), context: o2 };
  }
  set elevationInfo(e3) {
    this._set("elevationInfo", e3), this._validateElevationInfo();
  }
  load(e3) {
    return __async(this, null, function* () {
      return this.addResolvingPromise(this._doLoad(e3)), this;
    });
  }
  _doLoad(e3) {
    return __async(this, null, function* () {
      const t2 = e3?.signal;
      try {
        yield this.loadFromPortal({ supportedTypes: ["Scene Service"] }, e3);
      } catch (o2) {
        a3(o2);
      }
      if (yield this._fetchService(t2), null != this._modificationsSource) {
        const t3 = yield a5.fromUrl(this._modificationsSource.url, this.spatialReference, e3);
        this.setAtOrigin("modifications", t3, this._modificationsSource.context.origin), this._modificationsSource = null;
      }
      yield this._fetchIndexAndUpdateExtent(this.nodePages, t2);
    });
  }
  beforeSave() {
    if (null != this._modificationsSource)
      return this.load().then(() => {
      }, () => {
      });
  }
  saveAs(e3, t2) {
    return __async(this, null, function* () {
      return this._debouncedSaveOperations(C2.SAVE_AS, __spreadProps(__spreadValues({}, t2), { getTypeKeywords: () => this._getTypeKeywords(), portalItemLayerType: "integrated-mesh" }), e3);
    });
  }
  save() {
    return __async(this, null, function* () {
      const e3 = { getTypeKeywords: () => this._getTypeKeywords(), portalItemLayerType: "integrated-mesh" };
      return this._debouncedSaveOperations(C2.SAVE, e3);
    });
  }
  validateLayer(e3) {
    if (e3.layerType && "IntegratedMesh" !== e3.layerType)
      throw new s("integrated-mesh-layer:layer-type-not-supported", "IntegratedMeshLayer does not support this layer type", { layerType: e3.layerType });
    if (isNaN(this.version.major) || isNaN(this.version.minor))
      throw new s("layer:service-version-not-supported", "Service version is not supported.", { serviceVersion: this.version.versionString, supportedVersions: "1.x" });
    if (this.version.major > 1)
      throw new s("layer:service-version-too-new", "Service version is too new.", { serviceVersion: this.version.versionString, supportedVersions: "1.x" });
  }
  _getTypeKeywords() {
    return ["IntegratedMeshLayer"];
  }
  _validateElevationInfo() {
    const e3 = this.elevationInfo, t2 = "Integrated mesh layers";
    $(n.getLogger(this), Z(t2, "absolute-height", e3)), $(n.getLogger(this), w(t2, e3));
  }
};
e([y({ type: String, readOnly: true })], A.prototype, "geometryType", void 0), e([y({ type: ["show", "hide"] })], A.prototype, "listMode", void 0), e([y({ type: ["IntegratedMeshLayer"] })], A.prototype, "operationalLayerType", void 0), e([y({ json: { read: false }, readOnly: true })], A.prototype, "type", void 0), e([y({ type: p2, readOnly: true })], A.prototype, "nodePages", void 0), e([y({ type: [a4], readOnly: true })], A.prototype, "materialDefinitions", void 0), e([y({ type: [y2], readOnly: true })], A.prototype, "textureSetDefinitions", void 0), e([y({ type: [m], readOnly: true })], A.prototype, "geometryDefinitions", void 0), e([y({ readOnly: true })], A.prototype, "serviceUpdateTimeStamp", void 0), e([y({ type: a5 }), j3({ origins: ["web-scene", "portal-item"], type: "resource", prefix: "modifications" })], A.prototype, "modifications", void 0), e([o(["web-scene", "portal-item"], "modifications")], A.prototype, "readModifications", null), e([y(d)], A.prototype, "elevationInfo", null), e([y({ type: String, json: { origins: { "web-scene": { read: true, write: true }, "portal-item": { read: true, write: true } }, read: false } })], A.prototype, "path", void 0), A = e([a2("esri.layers.IntegratedMeshLayer")], A);
var P = A;
export {
  P as default
};
//# sourceMappingURL=chunk-75RDDJBZ.js.map
