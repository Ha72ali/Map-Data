import {
  j
} from "./chunk-2IZDVQOY.js";
import "./chunk-O2HF7YHC.js";
import {
  i as i2
} from "./chunk-BLW32RHQ.js";
import {
  c
} from "./chunk-VJPRFNE2.js";
import "./chunk-5NJ3TZEU.js";
import "./chunk-AXDAXZX2.js";
import {
  b
} from "./chunk-6F52T6PY.js";
import "./chunk-SATVR2AT.js";
import {
  S as S2
} from "./chunk-KJ5YDJI6.js";
import {
  f
} from "./chunk-SIUD6VOA.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-QUJPV6JW.js";
import {
  h as h2
} from "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import {
  i,
  l
} from "./chunk-5YCNWSDC.js";
import {
  a as a2,
  e as e2,
  h
} from "./chunk-MACNJI7G.js";
import {
  V as V2
} from "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-YTRR4X7U.js";
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
  _
} from "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import "./chunk-IMLUWAKH.js";
import {
  S,
  u3 as u,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import {
  o
} from "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/analysis/featureReferenceUtils.js
function e3(e4, l5) {
  return t2(e4) === t2(l5);
}
function t2(e4) {
  if (null == e4)
    return null;
  const t3 = null != e4.layer ? e4.layer.id : "";
  let l5 = null;
  return l5 = null != e4.objectId ? e4.objectId : null != e4.layer && "objectIdField" in e4.layer && null != e4.layer.objectIdField && null != e4.attributes ? e4.attributes[e4.layer.objectIdField] : e4.uid, null == l5 ? null : `o-${t3}-${l5}`;
}
var l2 = { json: { write: { writer: r, target: { "feature.layerId": { type: [Number, String] }, "feature.objectId": { type: [Number, String] } } }, origins: { "web-scene": { read: n2 } } } };
function r(e4, t3) {
  null != e4?.layer?.objectIdField && null != e4.attributes && (t3.feature = { layerId: e4.layer.id, objectId: e4.attributes[e4.layer.objectIdField] });
}
function n2(e4) {
  if (null != e4.layerId && null != e4.objectId)
    return { uid: null, layer: { id: e4.layerId, objectIdField: "ObjectId" }, attributes: { ObjectId: e4.objectId } };
}

// node_modules/@arcgis/core/analysis/LineOfSightAnalysisObserver.js
var l3 = class extends u(i(S)) {
  constructor(o2) {
    super(o2), this.position = null, this.elevationInfo = null, this.feature = null;
  }
  equals(o2) {
    return o(this.position, o2.position) && o(this.elevationInfo, o2.elevationInfo) && e3(this.feature, o2.feature);
  }
};
e([y({ type: _, json: { write: { isRequired: true } } })], l3.prototype, "position", void 0), e([y({ type: h2 }), j()], l3.prototype, "elevationInfo", void 0), e([y(l2)], l3.prototype, "feature", void 0), l3 = e([a("esri.analysis.LineOfSightAnalysisObserver")], l3);
var u2 = l3;

// node_modules/@arcgis/core/analysis/LineOfSightAnalysisTarget.js
var l4 = class extends u(l) {
  constructor(o2) {
    super(o2), this.position = null, this.elevationInfo = null, this.feature = null;
  }
  equals(o2) {
    return o(this.position, o2.position) && o(this.elevationInfo, o2.elevationInfo) && e3(this.feature, o2.feature);
  }
};
e([y({ type: _ }), j()], l4.prototype, "position", void 0), e([y({ type: h2 }), j()], l4.prototype, "elevationInfo", void 0), e([y(l2)], l4.prototype, "feature", void 0), l4 = e([a("esri.analysis.LineOfSightAnalysisTarget")], l4);
var f2 = l4;

// node_modules/@arcgis/core/analysis/LineOfSightAnalysis.js
var y2 = V.ofType(f2);
var d2 = class extends c {
  constructor(t3) {
    super(t3), this.type = "line-of-sight", this.observer = null, this.extent = null;
  }
  initialize() {
    this.addHandles(d(() => this._computeExtent(), (t3) => {
      null == t3?.pending && this._set("extent", null != t3 ? t3.extent : null);
    }, A));
  }
  get targets() {
    return this._get("targets") || new y2();
  }
  set targets(t3) {
    this._set("targets", n(t3, this.targets, y2));
  }
  get spatialReference() {
    return null != this.observer?.position ? this.observer.position.spatialReference : null;
  }
  get requiredPropertiesForEditing() {
    return [this.observer?.position];
  }
  waitComputeExtent() {
    return __async(this, null, function* () {
      const t3 = this._computeExtent();
      return null != t3 ? t3.pending : Promise.resolve();
    });
  }
  _computeExtent() {
    const t3 = this.spatialReference;
    if (null == this.observer?.position || null == t3)
      return null;
    const e4 = (t4) => "absolute-height" === i2(t4.position, t4.elevationInfo), o2 = this.observer.position, r2 = a2(o2.x, o2.y, o2.z, o2.x, o2.y, o2.z);
    for (const i3 of this.targets)
      if (null != i3.position) {
        const e5 = V2(i3.position, t3);
        if (null != e5.pending)
          return { pending: e5.pending, extent: null };
        if (null != e5.geometry) {
          const { x: t4, y: o3, z: s2 } = e5.geometry;
          h(r2, [t4, o3, s2]);
        }
      }
    const s = e2(r2, t3);
    return e4(this.observer) && this.targets.every(e4) || (s.zmin = void 0, s.zmax = void 0), { pending: null, extent: s };
  }
  clear() {
    this.observer = null, this.targets.removeAll();
  }
};
e([y({ type: ["line-of-sight"] })], d2.prototype, "type", void 0), e([y({ type: u2, json: { read: true, write: true } })], d2.prototype, "observer", void 0), e([y({ cast: t, type: y2, nonNullable: true, json: { read: true, write: true } })], d2.prototype, "targets", null), e([y({ value: null, readOnly: true })], d2.prototype, "extent", void 0), e([y({ readOnly: true })], d2.prototype, "spatialReference", null), e([y({ readOnly: true })], d2.prototype, "requiredPropertiesForEditing", null), d2 = e([a("esri.analysis.LineOfSightAnalysis")], d2);
var v = d2;

// node_modules/@arcgis/core/layers/LineOfSightLayer.js
var m = V.ofType(f2);
var u3 = class extends b(S2(f)) {
  constructor(e4) {
    super(e4), this.type = "line-of-sight", this.operationalLayerType = "LineOfSightLayer", this.analysis = new v(), this.opacity = 1;
  }
  initialize() {
    this.addHandles(d(() => this.analysis, (e4, t3) => {
      null != t3 && t3.parent === this && (t3.parent = null), null != e4 && (e4.parent = this);
    }, A));
  }
  load() {
    return __async(this, null, function* () {
      return null != this.analysis && this.addResolvingPromise(this.analysis.waitComputeExtent()), this;
    });
  }
  get observer() {
    return this.analysis?.observer;
  }
  set observer(e4) {
    const { analysis: t3 } = this;
    t3 && (t3.observer = e4);
  }
  get targets() {
    return null != this.analysis ? this.analysis.targets : new V();
  }
  set targets(e4) {
    n(e4, this.analysis?.targets);
  }
  get fullExtent() {
    return null != this.analysis ? this.analysis.extent : null;
  }
  get spatialReference() {
    return null != this.analysis ? this.analysis.spatialReference : null;
  }
  releaseAnalysis(e4) {
    this.analysis === e4 && (this.analysis = new v());
  }
};
e([y({ json: { read: false }, readOnly: true })], u3.prototype, "type", void 0), e([y({ type: ["LineOfSightLayer"] })], u3.prototype, "operationalLayerType", void 0), e([y({ type: u2, json: { read: true, write: { isRequired: true, ignoreOrigin: true } } })], u3.prototype, "observer", null), e([y({ type: m, json: { read: true, write: { ignoreOrigin: true } } })], u3.prototype, "targets", null), e([y({ nonNullable: true, json: { read: false, write: false } })], u3.prototype, "analysis", void 0), e([y({ readOnly: true })], u3.prototype, "fullExtent", null), e([y({ readOnly: true })], u3.prototype, "spatialReference", null), e([y({ readOnly: true, json: { read: false, write: false, origins: { service: { read: false, write: false }, "portal-item": { read: false, write: false }, "web-document": { read: false, write: false } } } })], u3.prototype, "opacity", void 0), e([y({ type: ["show", "hide"] })], u3.prototype, "listMode", void 0), u3 = e([a("esri.layers.LineOfSightLayer")], u3);
var d3 = u3;
export {
  d3 as default
};
//# sourceMappingURL=chunk-35G3FOUA.js.map
