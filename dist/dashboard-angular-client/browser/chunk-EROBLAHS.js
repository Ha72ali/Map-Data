import {
  f,
  y as y2
} from "./chunk-IJ3AYRSK.js";
import "./chunk-R476LTOD.js";
import "./chunk-HVIGKPM2.js";
import "./chunk-6XAAABMR.js";
import "./chunk-USPPMGID.js";
import "./chunk-GFX66WON.js";
import "./chunk-7OJAPEH6.js";
import "./chunk-V6RSNVIQ.js";
import "./chunk-62KYE6XS.js";
import "./chunk-B4YHNVRO.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-UER5KWEB.js";
import "./chunk-X6CCVH6W.js";
import "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-4ZNMWBPP.js";
import {
  n as n2
} from "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
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
import {
  V
} from "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import "./chunk-IMLUWAKH.js";
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
  d,
  e as e2,
  k,
  o
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

// node_modules/@arcgis/core/views/layers/CatalogDynamicGroupLayerView.js
var l = Symbol();
var u = (u2) => {
  let y3 = class extends u2 {
    constructor() {
      super(...arguments), this.layerViews = new V(), this._debouncedUpdate = k(() => __async(this, null, function* () {
        const { layer: e3, parent: r } = this, t = r?.footprintLayerView;
        let s = [];
        const i2 = this._createQuery();
        if (i2 && t) {
          const { features: r2 } = yield t.queryFeatures(i2);
          this.suspended || (s = r2.map((r3) => e3.acquireLayer(r3)));
        }
        this.removeHandles(l), this.addHandles(s, l);
      }));
    }
    get creatingLayerViews() {
      return this.view?.layerViewManager.isCreatingLayerViewsForLayer(this.layer) ?? false;
    }
    isUpdating() {
      return this.creatingLayerViews || this.layer.updating || this.layerViews.some((e3) => e3.updating);
    }
    enableLayerUpdates() {
      return o([this._updatingHandles.addWhen(() => false === this.parent?.footprintLayerView?.dataUpdating, () => this.updateLayers()), this._updatingHandles.add(() => [this.layer.maximumVisibleSublayers, this.layer.parent?.orderBy, this.parent?.footprintLayerView?.filter, this.parent?.footprintLayerView?.timeExtent, this.suspended], () => this.updateLayers()), e2(() => this.removeHandles(l))]);
    }
    updateLayers() {
      this.suspended ? this.removeHandles(l) : this._updatingHandles.addPromise(d(this._debouncedUpdate()).catch((e3) => {
        n.getLogger(this).error(e3);
      }));
    }
    _createQuery() {
      const e3 = this.parent?.footprintLayerView, r = this.layer?.parent;
      if (!e3 || !r || r.destroyed)
        return null;
      const { layer: { maximumVisibleSublayers: t }, view: { scale: s } } = this;
      if (!t)
        return null;
      const { itemTypeField: i2, itemSourceField: a2, itemNameField: o2, minScaleField: d2, maxScaleField: p, objectIdField: l2, orderBy: u3 } = r, y4 = n2(`${d2} IS NULL OR ${s} <= ${d2} OR ${d2} = 0`, `${p} IS NULL OR ${s} >= ${p}`), c2 = u3?.find((e4) => e4.field && !e4.valueExpression), m = e3.createQuery();
      if (m.returnGeometry = false, m.num = t, m.outFields = [l2, a2, o2], m.where = n2(m.where, y4), null != this.unsupportedItemTypes) {
        const e4 = `${i2} NOT IN (${this.unsupportedItemTypes.map((e5) => `'${e5}'`)})`;
        m.where = n2(m.where, e4);
      }
      return c2?.field && (m.orderByFields = [`${c2.field} ${"descending" === c2.order ? "DESC" : "ASC"}`], m.outFields.push(c2.field)), m;
    }
  };
  return e([y({ readOnly: true })], y3.prototype, "creatingLayerViews", null), e([y()], y3.prototype, "layer", void 0), e([y()], y3.prototype, "layerViews", void 0), e([y({ readOnly: true })], y3.prototype, "unsupportedItemTypes", void 0), e([y()], y3.prototype, "parent", void 0), e([y({ readOnly: true })], y3.prototype, "isUpdating", null), y3 = e([a("esri.views.layers.CatalogDynamicGroupLayerView")], y3), y3;
};

// node_modules/@arcgis/core/views/2d/layers/CatalogDynamicGroupLayerView2D.js
var i = class extends u(f(y2)) {
  constructor() {
    super(...arguments), this.unsupportedItemTypes = ["Scene Service"], this.layerViews = new V();
  }
  attach() {
    this.addAttachHandles([this.layerViews.on("after-changes", () => this._updateStageChildren()), this.enableLayerUpdates()]);
  }
  detach() {
    this.container.removeAllChildren();
  }
  update(e3) {
    this.updateLayers();
  }
  viewChange() {
  }
  moveEnd() {
    this.requestUpdate();
  }
  _updateStageChildren() {
    this.container.removeAllChildren(), this.layerViews.forEach((e3, r) => this.container.addChildAt(e3.container, r));
  }
};
i = e([a("esri.views.2d.layers.CatalogDynamicGroupLayerView2D")], i);
var c = i;
export {
  c as default
};
//# sourceMappingURL=chunk-EROBLAHS.js.map
