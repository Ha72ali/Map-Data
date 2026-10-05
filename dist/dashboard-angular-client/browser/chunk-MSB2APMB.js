import {
  c
} from "./chunk-VJPRFNE2.js";
import {
  a as a3
} from "./chunk-5LUZWMQA.js";
import {
  b
} from "./chunk-6F52T6PY.js";
import "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f
} from "./chunk-SIUD6VOA.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-QUJPV6JW.js";
import {
  u as u2
} from "./chunk-UER5KWEB.js";
import "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import {
  l
} from "./chunk-5YCNWSDC.js";
import {
  X
} from "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import {
  A,
  d
} from "./chunk-QNED4CTP.js";
import "./chunk-XGBDSBC2.js";
import {
  n,
  t
} from "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import {
  e as e2,
  o
} from "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
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
import {
  V
} from "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import {
  _,
  w
} from "./chunk-BYMJUQYJ.js";
import {
  r
} from "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import {
  s
} from "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import "./chunk-IMLUWAKH.js";
import {
  u3 as u,
  y
} from "./chunk-YFSAH4C7.js";
import {
  N,
  a,
  a3 as a2
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/analysis/DimensionSimpleStyle.js
var c2 = class extends u(l) {
  constructor(o2) {
    super(o2), this.type = "simple", this.color = new u2("black"), this.lineSize = 2, this.fontSize = 10, this.textColor = new u2("black"), this.textBackgroundColor = new u2([255, 255, 255, 0.6]);
  }
};
e([y({ type: ["simple"], readOnly: true, json: { write: { isRequired: true } } })], c2.prototype, "type", void 0), e([y({ type: u2, nonNullable: true, json: { type: [N], write: { isRequired: true } } })], c2.prototype, "color", void 0), e([y({ type: Number, cast: o, nonNullable: true, range: { min: e2(1) }, json: { write: { isRequired: true } } })], c2.prototype, "lineSize", void 0), e([y({ type: Number, cast: o, nonNullable: true, json: { write: { isRequired: true } } })], c2.prototype, "fontSize", void 0), e([y({ type: u2, nonNullable: true, json: { type: [N], write: { isRequired: true } } })], c2.prototype, "textColor", void 0), e([y({ type: u2, nonNullable: true, json: { type: [N], write: { isRequired: true } } })], c2.prototype, "textBackgroundColor", void 0), c2 = e([a2("esri.analysis.DimensionSimpleStyle")], c2);
var a4 = c2;

// node_modules/@arcgis/core/analysis/dimensionUtils.js
var t2;
!function(t3) {
  t3.Horizontal = "horizontal", t3.Vertical = "vertical", t3.Direct = "direct";
}(t2 || (t2 = {}));
var r2 = [t2.Horizontal, t2.Vertical, t2.Direct];

// node_modules/@arcgis/core/analysis/LengthDimension.js
var l2 = class extends u(l) {
  constructor(o2) {
    super(o2), this.type = "length", this.startPoint = null, this.endPoint = null, this.measureType = t2.Direct, this.offset = 0, this.orientation = 0;
  }
};
e([y({ type: ["length"], json: { write: { isRequired: true } } })], l2.prototype, "type", void 0), e([y({ type: _, json: { write: true } })], l2.prototype, "startPoint", void 0), e([y({ type: _, json: { write: true } })], l2.prototype, "endPoint", void 0), e([y({ type: r2, nonNullable: true, json: { write: { isRequired: true } } })], l2.prototype, "measureType", void 0), e([y({ type: Number, nonNullable: true, json: { write: { isRequired: true } } })], l2.prototype, "offset", void 0), e([y({ type: Number, nonNullable: true, json: { write: { isRequired: true } } }), s((o2) => a3.normalize(a(o2), 0, true))], l2.prototype, "orientation", void 0), l2 = e([a2("esri.analysis.LengthDimension")], l2);
var u3 = l2;

// node_modules/@arcgis/core/analysis/DimensionAnalysis.js
var d2 = V.ofType(u3);
var f2 = class extends c {
  constructor(e3) {
    super(e3), this.type = "dimension", this.style = new a4(), this.extent = null;
  }
  initialize() {
    this.addHandles(d(() => this._computeExtent(), (e3) => {
      null == e3?.pending && this._set("extent", null != e3 ? e3.extent : null);
    }, A));
  }
  get dimensions() {
    return this._get("dimensions") || new d2();
  }
  set dimensions(e3) {
    this._set("dimensions", n(e3, this.dimensions, d2));
  }
  get spatialReference() {
    for (const e3 of this.dimensions) {
      if (null != e3.startPoint)
        return e3.startPoint.spatialReference;
      if (null != e3.endPoint)
        return e3.endPoint.spatialReference;
    }
    return null;
  }
  get requiredPropertiesForEditing() {
    return this.dimensions.reduce((e3, t3) => (e3.push(t3.startPoint, t3.endPoint), e3), []);
  }
  waitComputeExtent() {
    return __async(this, null, function* () {
      const e3 = this._computeExtent();
      return null != e3 ? e3.pending : Promise.resolve();
    });
  }
  _computeExtent() {
    const e3 = this.spatialReference;
    if (null == e3)
      return { pending: null, extent: null };
    const t3 = [];
    for (const s2 of this.dimensions)
      null != s2.startPoint && t3.push(s2.startPoint), null != s2.endPoint && t3.push(s2.endPoint);
    const n2 = X(t3, e3);
    if (null != n2.pending)
      return { pending: n2.pending, extent: null };
    let o2 = null;
    return null != n2.geometries && (o2 = n2.geometries.reduce((e4, t4) => null == e4 ? null != t4 ? w.fromPoint(t4) : null : null != t4 ? e4.union(w.fromPoint(t4)) : e4, null)), { pending: null, extent: o2 };
  }
  clear() {
    this.dimensions.removeAll();
  }
};
e([y({ type: ["dimension"] })], f2.prototype, "type", void 0), e([y({ cast: t, type: d2, nonNullable: true })], f2.prototype, "dimensions", null), e([y({ readOnly: true })], f2.prototype, "spatialReference", null), e([y({ types: { key: "type", base: null, typeMap: { simple: a4 } }, nonNullable: true })], f2.prototype, "style", void 0), e([y({ value: null, readOnly: true })], f2.prototype, "extent", void 0), e([y({ readOnly: true })], f2.prototype, "requiredPropertiesForEditing", null), f2 = e([a2("esri.analysis.DimensionAnalysis")], f2);
var y2 = f2;

// node_modules/@arcgis/core/layers/DimensionLayer.js
var u4 = class extends b(S(f)) {
  constructor(e3) {
    if (super(e3), this.type = "dimension", this.operationalLayerType = "ArcGISDimensionLayer", this.source = new y2(), this.opacity = 1, e3) {
      const { source: s2, style: t3 } = e3;
      s2 && t3 && (s2.style = t3);
    }
  }
  initialize() {
    this.addHandles([d(() => this.source, (e3, s2) => {
      null != s2 && s2.parent === this && (s2.parent = null), null != e3 && (e3.parent = this);
    }, A)]);
  }
  load() {
    return __async(this, null, function* () {
      return this.addResolvingPromise(this.source.waitComputeExtent()), this;
    });
  }
  get spatialReference() {
    return this.source.spatialReference;
  }
  get style() {
    return this.source.style;
  }
  set style(e3) {
    this.source.style = e3;
  }
  get fullExtent() {
    return this.source.extent;
  }
  releaseAnalysis(e3) {
    this.source === e3 && (this.source = new y2());
  }
  get analysis() {
    return this.source;
  }
  set analysis(e3) {
    this.source = e3;
  }
  get dimensions() {
    return this.source.dimensions;
  }
  set dimensions(e3) {
    this.source.dimensions = e3;
  }
  writeDimensions(e3, s2, t3, r3) {
    s2.dimensions = e3.filter(({ startPoint: e4, endPoint: s3 }) => null != e4 && null != s3).map((e4) => e4.toJSON(r3)).toJSON();
  }
};
e([y({ json: { read: false }, readOnly: true })], u4.prototype, "type", void 0), e([y({ type: ["ArcGISDimensionLayer"] })], u4.prototype, "operationalLayerType", void 0), e([y({ nonNullable: true })], u4.prototype, "source", void 0), e([y({ readOnly: true })], u4.prototype, "spatialReference", null), e([y({ types: { key: "type", base: null, typeMap: { simple: a4 } }, json: { write: { ignoreOrigin: true } } })], u4.prototype, "style", null), e([y({ readOnly: true })], u4.prototype, "fullExtent", null), e([y({ readOnly: true, json: { read: false, write: false, origins: { service: { read: false, write: false }, "portal-item": { read: false, write: false }, "web-document": { read: false, write: false } } } })], u4.prototype, "opacity", void 0), e([y({ type: ["show", "hide"] })], u4.prototype, "listMode", void 0), e([y({ type: V.ofType(u3), json: { write: { ignoreOrigin: true }, origins: { "web-scene": { write: { ignoreOrigin: true } } } } })], u4.prototype, "dimensions", null), e([r("web-scene", "dimensions")], u4.prototype, "writeDimensions", null), u4 = e([a2("esri.layers.DimensionLayer")], u4);
var d3 = u4;
export {
  d3 as default
};
//# sourceMappingURL=chunk-MSB2APMB.js.map
