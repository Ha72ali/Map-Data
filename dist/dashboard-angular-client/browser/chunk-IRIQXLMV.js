import {
  h
} from "./chunk-UPYGBPLN.js";
import {
  p as p2
} from "./chunk-65IC555P.js";
import "./chunk-ZT67NY4U.js";
import "./chunk-XJBIIRXZ.js";
import {
  l
} from "./chunk-KRK4OVZD.js";
import "./chunk-U25QGGLM.js";
import {
  v as v2
} from "./chunk-XZIOHBEC.js";
import {
  j
} from "./chunk-TPOHS65A.js";
import {
  b
} from "./chunk-6F52T6PY.js";
import {
  p
} from "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f
} from "./chunk-SIUD6VOA.js";
import "./chunk-F3PKGTLV.js";
import "./chunk-PSHPOA5E.js";
import "./chunk-7B5IT5ZP.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-5EK2HSR2.js";
import "./chunk-EZCWLJZT.js";
import "./chunk-KR3ETDWL.js";
import "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import "./chunk-LRQVNXVW.js";
import "./chunk-N62TCV6V.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-QNED4CTP.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
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
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  U,
  v
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
  s as s2
} from "./chunk-NVGBLY2Q.js";
import {
  t
} from "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/ElevationTileData.js
var a3 = class {
  constructor(a4, t3, s4, e2) {
    this._hasNoDataValues = null, this._minValue = null, this._maxValue = null, "pixelData" in a4 ? (this.values = a4.pixelData, this.width = a4.width, this.height = a4.height, this.noDataValue = a4.noDataValue) : (this.values = a4, this.width = t3, this.height = s4, this.noDataValue = e2);
  }
  get hasNoDataValues() {
    if (null == this._hasNoDataValues) {
      const a4 = this.noDataValue;
      this._hasNoDataValues = this.values.includes(a4);
    }
    return this._hasNoDataValues;
  }
  get minValue() {
    return this._ensureBounds(), this._minValue;
  }
  get maxValue() {
    return this._ensureBounds(), this._maxValue;
  }
  _ensureBounds() {
    if (null != this._minValue)
      return;
    const { noDataValue: a4, values: t3 } = this;
    let s4 = 1 / 0, e2 = -1 / 0, i = true;
    for (const u of t3)
      u === a4 ? this._hasNoDataValues = true : (s4 = u < s4 ? u : s4, e2 = u > e2 ? u : e2, i = false);
    i ? (this._minValue = 0, this._maxValue = 0) : (this._minValue = s4, this._maxValue = e2 > -3e38 ? e2 : 0);
  }
};

// node_modules/@arcgis/core/layers/support/LercDecoder.js
var r = class extends h {
  constructor(e2 = null) {
    super("LercWorker", "_decode", { _decode: (e3) => [e3.buffer] }, e2, { strategy: "dedicated" }), this.schedule = e2, this.ref = 0;
  }
  decode(e2, r2, t3) {
    return e2 && 0 !== e2.byteLength ? this.invoke({ buffer: e2, options: r2 }, t3) : Promise.resolve(null);
  }
  release() {
    --this.ref <= 0 && (t2.forEach((e2, r2) => {
      e2 === this && t2.delete(r2);
    }), this.destroy());
  }
};
var t2 = /* @__PURE__ */ new Map();
function s3(e2 = null) {
  let s4 = t2.get(e2);
  return s4 || (null != e2 ? (s4 = new r((r2) => e2.immediate.schedule(r2)), t2.set(e2, s4)) : (s4 = new r(), t2.set(null, s4))), ++s4.ref, s4;
}

// node_modules/@arcgis/core/layers/ElevationLayer.js
var w = class extends p2(l(b(j(S(f))))) {
  constructor(...e2) {
    super(...e2), this.capabilities = { operations: { supportsTileMap: false } }, this.copyright = null, this.heightModelInfo = null, this.path = null, this.minScale = void 0, this.maxScale = void 0, this.opacity = 1, this.operationalLayerType = "ArcGISTiledElevationServiceLayer", this.sourceJSON = null, this.type = "elevation", this.url = null, this.version = null, this._lercDecoder = s3();
  }
  normalizeCtorArgs(e2, r2) {
    return "string" == typeof e2 ? __spreadValues({ url: e2 }, r2) : e2;
  }
  destroy() {
    this._lercDecoder = t(this._lercDecoder);
  }
  readCapabilities(e2, r2) {
    const t3 = r2.capabilities && r2.capabilities.split(",").map((e3) => e3.toLowerCase().trim());
    if (!t3)
      return { operations: { supportsTileMap: false } };
    return { operations: { supportsTileMap: t3.includes("tilemap") } };
  }
  readVersion(e2, r2) {
    let t3 = r2.currentVersion;
    return t3 || (t3 = 9.3), t3;
  }
  load(e2) {
    const r2 = null != e2 ? e2.signal : null;
    return this.addResolvingPromise(this.loadFromPortal({ supportedTypes: ["Image Service"], supportsData: false, validateItem: (e3) => {
      if (e3.typeKeywords) {
        for (let r3 = 0; r3 < e3.typeKeywords.length; r3++)
          if ("elevation 3d layer" === e3.typeKeywords[r3].toLowerCase())
            return true;
      }
      throw new s("portal:invalid-layer-item-type", "Invalid layer item type '${type}', expected '${expectedType}' ", { type: "Image Service", expectedType: "Image Service Elevation 3D Layer" });
    } }, e2).catch(a2).then(() => this._fetchImageService(r2))), Promise.resolve(this);
  }
  fetchTile(e2, t3, i, o2) {
    const s4 = null != (o2 = o2 || { signal: null }).signal ? o2.signal : o2.signal = new AbortController().signal, a4 = { responseType: "array-buffer", signal: s4 }, p3 = { noDataValue: o2.noDataValue, returnFileInfo: true };
    return this.load().then(() => this._fetchTileAvailability(e2, t3, i, o2)).then(() => U(this.getTileUrl(e2, t3, i), a4)).then((e3) => this._lercDecoder.decode(e3.data, p3, s4)).then((e3) => new a3(e3));
  }
  getTileUrl(e2, r2, t3) {
    const i = !this.capabilities.operations.supportsTileMap && this.supportsBlankTile, o2 = v(__spreadProps(__spreadValues({}, this.parsedUrl.query), { blankTile: !i && null }));
    return `${this.parsedUrl.path}/tile/${e2}/${r2}/${t3}${o2 ? "?" + o2 : ""}`;
  }
  queryElevation(e2, r2) {
    return __async(this, null, function* () {
      const { ElevationQuery: t3 } = yield import("./chunk-2FFJXFBP.js");
      s2(r2);
      return new t3().query(this, e2, r2);
    });
  }
  createElevationSampler(e2, r2) {
    return __async(this, null, function* () {
      const { ElevationQuery: t3 } = yield import("./chunk-2FFJXFBP.js");
      s2(r2);
      return new t3().createSampler(this, e2, r2);
    });
  }
  _fetchTileAvailability(e2, r2, t3, i) {
    return this.tilemapCache ? this.tilemapCache.fetchAvailability(e2, r2, t3, i) : Promise.resolve("unknown");
  }
  _fetchImageService(e2) {
    return __async(this, null, function* () {
      if (this.sourceJSON)
        return this.sourceJSON;
      const t3 = { query: __spreadValues({ f: "json" }, this.parsedUrl.query), responseType: "json", signal: e2 }, i = yield U(this.parsedUrl.path, t3);
      i.ssl && (this.url = this.url?.replace(/^http:/i, "https:")), this.sourceJSON = i.data, this.read(i.data, { origin: "service", url: this.parsedUrl });
    });
  }
  get hasOverriddenFetchTile() {
    return !this.fetchTile[S2];
  }
};
e([y({ readOnly: true })], w.prototype, "capabilities", void 0), e([o("service", "capabilities", ["capabilities"])], w.prototype, "readCapabilities", null), e([y({ json: { read: { source: "copyrightText" } } })], w.prototype, "copyright", void 0), e([y({ readOnly: true, type: v2 })], w.prototype, "heightModelInfo", void 0), e([y({ type: String, json: { origins: { "web-scene": { read: true, write: true } }, read: false } })], w.prototype, "path", void 0), e([y({ type: ["show", "hide"] })], w.prototype, "listMode", void 0), e([y({ json: { read: false, write: false, origins: { service: { read: false, write: false }, "portal-item": { read: false, write: false }, "web-document": { read: false, write: false } } }, readOnly: true })], w.prototype, "minScale", void 0), e([y({ json: { read: false, write: false, origins: { service: { read: false, write: false }, "portal-item": { read: false, write: false }, "web-document": { read: false, write: false } } }, readOnly: true })], w.prototype, "maxScale", void 0), e([y({ json: { read: false, write: false, origins: { "web-document": { read: false, write: false } } } })], w.prototype, "opacity", void 0), e([y({ type: ["ArcGISTiledElevationServiceLayer"] })], w.prototype, "operationalLayerType", void 0), e([y()], w.prototype, "sourceJSON", void 0), e([y({ json: { read: false }, value: "elevation", readOnly: true })], w.prototype, "type", void 0), e([y(p)], w.prototype, "url", void 0), e([y()], w.prototype, "version", void 0), e([o("version", ["currentVersion"])], w.prototype, "readVersion", null), w = e([a("esri.layers.ElevationLayer")], w);
var S2 = Symbol("default-fetch-tile");
w.prototype.fetchTile[S2] = true;
var T = w;
export {
  T as default
};
//# sourceMappingURL=chunk-IRIQXLMV.js.map
