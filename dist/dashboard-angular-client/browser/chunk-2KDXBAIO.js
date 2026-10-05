import {
  $,
  Z,
  w as w2
} from "./chunk-BLW32RHQ.js";
import {
  i
} from "./chunk-UUWAG2SR.js";
import {
  l
} from "./chunk-KRK4OVZD.js";
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
  b as b2
} from "./chunk-6F52T6PY.js";
import {
  d,
  p
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
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import {
  n as n3
} from "./chunk-FDJTONGZ.js";
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
import {
  M
} from "./chunk-VNWT22OX.js";
import {
  K,
  O,
  b,
  e2,
  m2 as m,
  n as n2,
  r,
  r2,
  u as u2
} from "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-GPPG4D7S.js";
import "./chunk-V7FXKYLS.js";
import "./chunk-2AR2ZIQP.js";
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
  w
} from "./chunk-BYMJUQYJ.js";
import {
  f
} from "./chunk-YKH4U5BK.js";
import {
  u
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  U
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
  a as a2
} from "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import {
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/IntegratedMesh3DTilesLayer.js
var D = class extends l(b2(j(t(S(e3(i(f2))))))) {
  constructor(e4) {
    super(e4), this.operationalLayerType = "IntegratedMesh3DTilesLayer", this.spatialReference = new f({ wkid: 4326, vcsWkid: 115700 }), this.fullExtent = new w(-180, -90, 180, 90, this.spatialReference), this.url = null, this.type = "integrated-mesh-3dtiles", this.path = null, this.minScale = 0, this.maxScale = 0;
  }
  set elevationInfo(e4) {
    this._set("elevationInfo", e4), this._validateElevationInfo();
  }
  _verifyArray(e4, t2) {
    if (!Array.isArray(e4) || e4.length < t2)
      return false;
    for (const r3 of e4)
      if ("number" != typeof r3)
        return false;
    return true;
  }
  _initFullExtent(e4) {
    const t2 = e4.root?.boundingVolume;
    if (!t2)
      return;
    if (t2.box) {
      const e5 = t2?.box;
      if (e5[3] > 7972671 && e5[7] > 7972671 && e5[11] > 7945940)
        return;
    }
    const r3 = e4.root?.transform, i2 = n2();
    if (t2.region && this._verifyArray(t2.region, 6)) {
      const e5 = t2.region, r4 = M(e5[0]), i3 = M(e5[1]), s2 = e5[4], a3 = M(e5[2]), n4 = M(e5[3]), m2 = e5[5];
      this.fullExtent = new w({ xmin: r4, ymin: i3, zmin: s2, xmax: a3, ymax: n4, zmax: m2, spatialReference: this.spatialReference });
    } else if (t2.sphere && this._verifyArray(t2.sphere, 4)) {
      const e5 = t2.sphere, o = r(e5[0], e5[1], e5[2]), s2 = e5[3] / Math.sqrt(3), a3 = n2();
      e2(a3, o, r(s2, s2, s2));
      const n4 = n2();
      if (u2(n4, o, r(s2, s2, s2)), r3 && this._verifyArray(r3, 16)) {
        const e6 = r3;
        O(i2, a3, e6), r2(a3, i2), O(i2, n4, e6), r2(n4, i2);
      }
      n3(a3, u, 0, a3, f.WGS84, 0, 1), n3(n4, u, 0, n4, f.WGS84, 0, 1);
      const m2 = n2(), u3 = n2();
      m(m2, a3, n4), b(u3, a3, n4), this.fullExtent = new w({ xmin: m2[0], ymin: m2[1], zmin: m2[2], xmax: u3[0], ymax: u3[1], zmax: u3[2], spatialReference: this.spatialReference });
    } else if (t2.box && this._verifyArray(t2.box, 12)) {
      const e5 = t2.box, i3 = r(e5[0], e5[1], e5[2]), o = r(e5[3], e5[4], e5[5]), s2 = r(e5[6], e5[7], e5[8]), a3 = r(e5[9], e5[10], e5[11]), n4 = [];
      for (let t3 = 0; t3 < 8; ++t3)
        n4.push(n2());
      if (u2(n4[0], i3, o), u2(n4[0], n4[0], s2), u2(n4[0], n4[0], a3), K(n4[1], i3, o), u2(n4[1], n4[1], s2), u2(n4[1], n4[1], a3), u2(n4[2], i3, o), K(n4[2], n4[2], s2), u2(n4[2], n4[2], a3), K(n4[3], i3, o), K(n4[3], n4[3], s2), u2(n4[3], n4[3], a3), u2(n4[4], i3, o), u2(n4[4], n4[4], s2), K(n4[4], n4[4], a3), K(n4[5], i3, o), u2(n4[5], n4[5], s2), K(n4[5], n4[5], a3), u2(n4[6], i3, o), K(n4[6], n4[6], s2), K(n4[6], n4[6], a3), K(n4[7], i3, o), K(n4[7], n4[7], s2), K(n4[7], n4[7], a3), r3 && this._verifyArray(r3, 16)) {
        const e6 = r3;
        for (let t3 = 0; t3 < 8; ++t3)
          O(n4[t3], n4[t3], e6);
      }
      const m2 = r(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE), p2 = r(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
      for (let t3 = 0; t3 < 8; ++t3)
        n3(n4[t3], u, 0, n4[t3], f.WGS84, 0, 1), m(p2, p2, n4[t3]), b(m2, m2, n4[t3]);
      this.fullExtent = new w({ xmin: p2[0], ymin: p2[1], zmin: p2[2], xmax: m2[0], ymax: m2[1], zmax: m2[2], spatialReference: this.spatialReference });
    }
  }
  load(e4) {
    return __async(this, null, function* () {
      return this.addResolvingPromise(this._doLoad(e4)), this;
    });
  }
  _doLoad(e4) {
    return __async(this, null, function* () {
      const i2 = null != e4 ? e4.signal : null;
      try {
        yield this.loadFromPortal({ supportedTypes: ["3DTiles Service"], validateItem: (e5) => {
          if (e5.typeKeywords?.includes("IntegratedMesh"))
            return true;
          throw new s("portal:invalid-layer-item-type", "Invalid layer item, expected '${expectedType}' ", { expectedType: "3DTiles Service containing IntegratedMesh" });
        } }, e4);
      } catch (o) {
        a2(o);
      }
      if (this.url) {
        const e5 = U(this.url, { query: __spreadProps(__spreadValues({ f: "json" }, this.customParameters), { token: this.apiKey }), responseType: "json", signal: i2 }).then((e6) => {
          this._initFullExtent(e6.data);
        }, (e6) => {
          a2(e6);
        });
        yield e5;
      }
    });
  }
  fetchAttributionData() {
    return __async(this, null, function* () {
      return this.load().then(() => ({}));
    });
  }
  _validateElevationInfo() {
    const e4 = this.elevationInfo, t2 = "Integrated mesh 3d tiles layers";
    $(n.getLogger(this), Z(t2, "absolute-height", e4)), $(n.getLogger(this), w2(t2, e4));
  }
};
e([y({ type: ["IntegratedMesh3DTilesLayer"] })], D.prototype, "operationalLayerType", void 0), e([y({ type: f })], D.prototype, "spatialReference", void 0), e([y({ type: w })], D.prototype, "fullExtent", void 0), e([y(d)], D.prototype, "elevationInfo", null), e([y({ type: ["show", "hide"] })], D.prototype, "listMode", void 0), e([y(p)], D.prototype, "url", void 0), e([y({ readOnly: true })], D.prototype, "type", void 0), e([y({ type: String, json: { origins: { "web-scene": { read: true, write: true }, "portal-item": { read: true, write: true } }, read: false } })], D.prototype, "path", void 0), e([y({ type: Number, json: { name: "layerDefinition.minScale", write: true, origins: { service: { read: false, write: false } } } })], D.prototype, "minScale", void 0), e([y({ type: Number, json: { name: "layerDefinition.maxScale", write: true, origins: { service: { read: false, write: false } } } })], D.prototype, "maxScale", void 0), D = e([a("esri.layers.IntegratedMesh3DTilesLayer")], D);
var z = D;
export {
  z as default
};
//# sourceMappingURL=chunk-2KDXBAIO.js.map
