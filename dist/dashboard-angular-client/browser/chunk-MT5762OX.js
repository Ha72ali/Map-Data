import {
  e as e3
} from "./chunk-4SWAA5E6.js";
import {
  A as A2
} from "./chunk-3ZFOQBU7.js";
import {
  r as r2
} from "./chunk-6MWDYJDX.js";
import {
  a as a3
} from "./chunk-FQNO6QFX.js";
import {
  l as l3,
  n2,
  t as t4
} from "./chunk-X5H5YMXE.js";
import {
  l as l2
} from "./chunk-ALCBDSBR.js";
import {
  j
} from "./chunk-TPOHS65A.js";
import {
  l
} from "./chunk-GGG4K7D6.js";
import "./chunk-VKC2IPZH.js";
import "./chunk-B4YHNVRO.js";
import {
  t as t3
} from "./chunk-XCPRP2KL.js";
import {
  b
} from "./chunk-6F52T6PY.js";
import "./chunk-SATVR2AT.js";
import {
  S as S2
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
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import {
  A,
  C,
  d,
  v
} from "./chunk-QNED4CTP.js";
import {
  f
} from "./chunk-RIFP6ALC.js";
import {
  t as t2
} from "./chunk-T5JXEROT.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-IIZACZCL.js";
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
import {
  S
} from "./chunk-AZH5CNQI.js";
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
import "./chunk-IMLUWAKH.js";
import {
  e as e2,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a,
  t
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  a as a2,
  k
} from "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import {
  n2 as n
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/GroupLayer.js
var V = class extends l(t3(b(j(n2(l3(S2(f2))))))) {
  constructor(e4) {
    super(e4), this.allLayers = new l2({ getCollections: () => [this.layers], getChildrenFunction: (e5) => "layers" in e5 ? e5.layers : null }), this.allTables = t4(this), this.fullExtent = void 0, this.operationalLayerType = "GroupLayer", this.spatialReference = void 0, this.type = "group", this._debouncedSaveOperations = k((e5, i, t5) => __async(this, null, function* () {
      const { save: r3, saveAs: s } = yield import("./chunk-TPFXGMNB.js");
      switch (e5) {
        case A2.SAVE:
          return r3(this, i);
        case A2.SAVE_AS:
          return s(this, t5, i);
      }
    }));
  }
  initialize() {
    this._enforceVisibility(this.visibilityMode, this.visible), this.addHandles([d(() => {
      let e4 = this.parent;
      for (; e4 && "parent" in e4 && e4.parent; )
        e4 = e4.parent;
      return e4 && e3 in e4;
    }, (e4) => {
      const i = "prevent-adding-tables";
      this.removeHandles(i), e4 && (this.tables.removeAll(), this.addHandles(v(() => this.tables, "before-add", (e5) => {
        e5.preventDefault(), n.getLogger(this).errorOnce("tables", "tables in group layers in a webscene are not supported. Please move the tables from the group layer to the webscene if you want to persist them.");
      }), i));
    }, A), d(() => this.visible, this._onVisibilityChange.bind(this), C)]);
  }
  destroy() {
    this.allLayers.destroy(), this.allTables.destroy();
  }
  get sourceIsPortalItem() {
    return this.portalItem && this.originIdOf("portalItem") === e2.USER;
  }
  _writeLayers(e4, i, t5, r3) {
    const s = [];
    if (!e4)
      return s;
    e4.forEach((e5) => {
      const i2 = f(e5, r3.webmap ? r3.webmap.getLayerJSONFromResourceInfo(e5) : null, r3);
      i2?.layerType && s.push(i2);
    }), i.layers = s;
  }
  set portalItem(e4) {
    this._set("portalItem", e4);
  }
  readPortalItem(e4, i, t5) {
    const { itemId: r3, layerType: s } = i;
    if ("GroupLayer" === s && r3)
      return new S({ id: r3, portal: t5?.portal });
  }
  writePortalItem(e4, i) {
    e4?.id && (i.itemId = e4.id);
  }
  set visibilityMode(e4) {
    const i = this._get("visibilityMode") !== e4;
    this._set("visibilityMode", e4), i && this._enforceVisibility(e4, this.visible);
  }
  beforeSave() {
    return __async(this, null, function* () {
      return r2(this);
    });
  }
  load(e4) {
    const i = this.loadFromPortal({ supportedTypes: ["Feature Service", "Feature Collection", "Group Layer", "Scene Service"], layerModuleTypeMap: a3 }, e4).catch((e5) => {
      if (a2(e5), this.sourceIsPortalItem)
        throw e5;
    });
    return this.addResolvingPromise(i), Promise.resolve(this);
  }
  loadAll() {
    return __async(this, null, function* () {
      return t2(this, (e4) => {
        e4(this.layers, this.tables);
      });
    });
  }
  save(e4) {
    return __async(this, null, function* () {
      return this._debouncedSaveOperations(A2.SAVE, e4);
    });
  }
  saveAs(e4, i) {
    return __async(this, null, function* () {
      return this._debouncedSaveOperations(A2.SAVE_AS, i, e4);
    });
  }
  layerAdded(e4) {
    e4.visible && "exclusive" === this.visibilityMode ? this._turnOffOtherLayers(e4) : "inherited" === this.visibilityMode && (e4.visible = this.visible), this.hasHandles(e4.uid) ? console.error(`Layer read to Grouplayer: uid=${e4.uid}`) : this.addHandles(d(() => e4.visible, (i) => this._onChildVisibilityChange(e4, i), C), e4.uid);
  }
  layerRemoved(e4) {
    this.removeHandles(e4.uid), this._enforceVisibility(this.visibilityMode, this.visible);
  }
  _turnOffOtherLayers(e4) {
    this.layers.forEach((i) => {
      i !== e4 && (i.visible = false);
    });
  }
  _enforceVisibility(e4, i) {
    if (!t(this).initialized)
      return;
    const t5 = this.layers;
    let r3 = t5.find((e5) => e5.visible);
    switch (e4) {
      case "exclusive":
        t5.length && !r3 && (r3 = t5.at(0), r3.visible = true), this._turnOffOtherLayers(r3);
        break;
      case "inherited":
        t5.forEach((e5) => {
          e5.visible = i;
        });
    }
  }
  _onVisibilityChange(e4) {
    "inherited" === this.visibilityMode && this.layers.forEach((i) => {
      i.visible = e4;
    });
  }
  _onChildVisibilityChange(e4, i) {
    switch (this.visibilityMode) {
      case "exclusive":
        i ? this._turnOffOtherLayers(e4) : this._isAnyLayerVisible() || (e4.visible = true);
        break;
      case "inherited":
        e4.visible = this.visible;
    }
  }
  _isAnyLayerVisible() {
    return this.layers.some((e4) => e4.visible);
  }
};
e([y({ readOnly: true, dependsOn: [] })], V.prototype, "allLayers", void 0), e([y({ readOnly: true })], V.prototype, "allTables", void 0), e([y({ json: { read: true, write: true } })], V.prototype, "blendMode", void 0), e([y()], V.prototype, "fullExtent", void 0), e([y({ readOnly: true })], V.prototype, "sourceIsPortalItem", null), e([y({ json: { read: false, write: { ignoreOrigin: true } } })], V.prototype, "layers", void 0), e([r("layers")], V.prototype, "_writeLayers", null), e([y({ type: ["GroupLayer"] })], V.prototype, "operationalLayerType", void 0), e([y({ json: { origins: { "web-map": { read: false, write: { overridePolicy(e4, i, t5) {
  return { enabled: "Group Layer" === e4?.type && t5?.initiator !== this };
} } }, "web-scene": { read: false, write: false } } } })], V.prototype, "portalItem", null), e([o("web-map", "portalItem", ["itemId"])], V.prototype, "readPortalItem", null), e([r("web-map", "portalItem", { itemId: { type: String } })], V.prototype, "writePortalItem", null), e([y()], V.prototype, "spatialReference", void 0), e([y({ json: { read: false }, readOnly: true, value: "group" })], V.prototype, "type", void 0), e([y({ type: ["independent", "inherited", "exclusive"], value: "independent", json: { write: true, origins: { "web-map": { type: ["independent", "exclusive"], write: (e4, i, t5) => {
  "inherited" !== e4 && (i[t5] = e4);
} } } } })], V.prototype, "visibilityMode", null), V = e([a("esri.layers.GroupLayer")], V);
var C2 = V;
export {
  C2 as default
};
//# sourceMappingURL=chunk-MT5762OX.js.map
