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
import {
  C,
  d
} from "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import {
  n,
  t
} from "./chunk-4ZNMWBPP.js";
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
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/views/layers/GroupLayerView.js
var h = class extends y2 {
  constructor(i) {
    super(i), this.type = "group", this.layerViews = new V();
  }
  destroy() {
    this.layerViews.length = 0;
  }
  _allLayerViewVisibility(i) {
    this.layerViews.forEach((e2) => {
      e2.visible = i;
    });
  }
  initialize() {
    this.addHandles([this.layerViews.on("change", (i) => this._layerViewsChangeHandler(i)), d(() => this.layer?.visibilityMode, () => {
      this.layer && this._applyVisibility(() => this._allLayerViewVisibility(this.visible), () => this._applyExclusiveVisibility(null));
    }, C), d(() => this.visible, (i) => {
      this._applyVisibility(() => this._allLayerViewVisibility(i), () => {
      });
    }, C)], "grouplayerview"), this._layerViewsChangeHandler({ target: null, added: this.layerViews.toArray(), removed: [], moved: [] });
  }
  get creatingLayerViews() {
    return this.view?.layerViewManager?.isCreatingLayerViewsForLayer(this.layer) ?? false;
  }
  set layerViews(i) {
    this._set("layerViews", n(i, this._get("layerViews")));
  }
  get updatingProgress() {
    return 0 === this.layerViews.length ? 1 : this.layerViews.reduce((i, e2) => i + e2.updatingProgress, 0) / this.layerViews.length;
  }
  isUpdating() {
    return this.creatingLayerViews || this.layerViews.some((i) => i.updating);
  }
  _hasLayerViewVisibleOverrides() {
    return this.layerViews.some((i) => i._isOverridden("visible"));
  }
  _findLayerViewForLayer(i) {
    return i && this.layerViews.find((e2) => e2.layer === i);
  }
  _firstVisibleOnLayerOrder() {
    const i = this.layer.layers.find((i2) => {
      const e2 = this._findLayerViewForLayer(i2);
      return !!e2?.visible;
    });
    return i && this._findLayerViewForLayer(i);
  }
  _applyExclusiveVisibility(i) {
    null == i && null == (i = this._firstVisibleOnLayerOrder()) && this.layerViews.length > 0 && (i = this._findLayerViewForLayer(this.layer.layers.at(0))), this.layerViews.forEach((e2) => {
      e2.visible = e2 === i;
    });
  }
  _layerViewsChangeHandler(i) {
    this.removeHandles("grouplayerview:visible"), this.addHandles(this.layerViews.map((i2) => d(() => i2.visible, (e3) => this._applyVisibility(() => {
      e3 !== this.visible && (i2.visible = this.visible);
    }, () => this._applyExclusiveVisibility(e3 ? i2 : null)), C)).toArray(), "grouplayerview:visible");
    const e2 = i.added[i.added.length - 1];
    this._applyVisibility(() => this._allLayerViewVisibility(this.visible), () => this._applyExclusiveVisibility(e2?.visible ? e2 : null));
  }
  _applyVisibility(i, e2) {
    this._hasLayerViewVisibleOverrides() && ("inherited" === this.layer?.visibilityMode ? i() : "exclusive" === this.layer?.visibilityMode && e2());
  }
};
e([y({ readOnly: true })], h.prototype, "creatingLayerViews", null), e([y({ cast: t })], h.prototype, "layerViews", null), e([y({ readOnly: true })], h.prototype, "updatingProgress", null), e([y()], h.prototype, "view", void 0), h = e([a("esri.views.layers.GroupLayerView")], h);
var n2 = h;

// node_modules/@arcgis/core/views/2d/layers/GroupLayerView2D.js
var a2 = class extends f(n2) {
  attach() {
    this._updateStageChildren(), this.addAttachHandles(this.layerViews.on("after-changes", () => this._updateStageChildren()));
  }
  detach() {
    this.container.removeAllChildren();
  }
  update(e2) {
  }
  viewChange() {
  }
  moveEnd() {
  }
  _updateStageChildren() {
    this.container.removeAllChildren(), this.layerViews.forEach((e2, r) => this.container.addChildAt(e2.container, r));
  }
};
a2 = e([a("esri.views.2d.layers.GroupLayerView2D")], a2);
var o = a2;
export {
  o as default
};
//# sourceMappingURL=chunk-HUW4SB25.js.map
