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

// node_modules/@arcgis/core/views/2d/layers/KnowledgeGraphLayerView2D.js
var n2 = class extends f(y2) {
  constructor(e2) {
    super(e2), this.layerViews = new V();
  }
  set layerViews(e2) {
    this._set("layerViews", n(e2, this._get("layerViews")));
  }
  get updatingProgress() {
    return 0 === this.layerViews.length ? 1 : this.layerViews.reduce((e2, r) => e2 + r.updatingProgress, 0) / this.layerViews.length;
  }
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
e([y({ cast: t })], n2.prototype, "layerViews", null), e([y({ readOnly: true })], n2.prototype, "updatingProgress", null), n2 = e([a("esri.views.2d.layers.KnowledgeGraphLayerView2D")], n2);
var c = n2;
export {
  c as default
};
//# sourceMappingURL=chunk-KTGVKYRD.js.map
