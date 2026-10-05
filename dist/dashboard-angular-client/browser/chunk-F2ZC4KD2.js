import {
  _
} from "./chunk-NDNX5C3E.js";
import {
  a as a2
} from "./chunk-M7KKBRG2.js";
import "./chunk-IGE25ZAR.js";
import {
  i
} from "./chunk-QN5HQI56.js";
import {
  f,
  y as y2
} from "./chunk-IJ3AYRSK.js";
import "./chunk-VUGHOQGE.js";
import "./chunk-R476LTOD.js";
import "./chunk-SUF5TZIC.js";
import "./chunk-GFQQMD3O.js";
import "./chunk-6EAAYWDP.js";
import "./chunk-4R4QSQ72.js";
import "./chunk-HVIGKPM2.js";
import "./chunk-5IUJO4V2.js";
import "./chunk-D36YNZXP.js";
import "./chunk-6XAAABMR.js";
import "./chunk-USPPMGID.js";
import "./chunk-JIWQBAAB.js";
import "./chunk-TZAZZESF.js";
import "./chunk-VDA2A5R2.js";
import "./chunk-EYXQMFFP.js";
import "./chunk-C2FYYQ2H.js";
import "./chunk-22FS2DB4.js";
import "./chunk-CSIYRPBQ.js";
import "./chunk-V2RTMSYC.js";
import "./chunk-GFX66WON.js";
import "./chunk-7OJAPEH6.js";
import "./chunk-7JHXSW5N.js";
import "./chunk-V6RSNVIQ.js";
import "./chunk-SU6JOKEZ.js";
import "./chunk-62KYE6XS.js";
import "./chunk-73TXPMFV.js";
import "./chunk-3G25CU47.js";
import "./chunk-2PNLU6ZL.js";
import "./chunk-B4YHNVRO.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-UER5KWEB.js";
import "./chunk-X6CCVH6W.js";
import "./chunk-EZCWLJZT.js";
import "./chunk-KR3ETDWL.js";
import "./chunk-MACNJI7G.js";
import "./chunk-EFPJQTVN.js";
import "./chunk-GKEPJ7SJ.js";
import "./chunk-PUJBM626.js";
import "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-4ZNMWBPP.js";
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
import "./chunk-ZDVJGW4C.js";
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
  b
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

// node_modules/@arcgis/core/views/2d/layers/BaseDynamicLayerView2D.js
var m = class extends i(f(y2)) {
  update(t) {
    this._strategy.update(t).catch((t2) => {
      b(t2) || n.getLogger(this).error(t2);
    }), this.notifyChange("updating");
  }
  attach() {
    this._bitmapContainer = new a2(), this.container.addChild(this._bitmapContainer), this._strategy = new _({ container: this._bitmapContainer, fetchSource: this.fetchBitmapData.bind(this), requestUpdate: this.requestUpdate.bind(this) });
  }
  detach() {
    this._strategy.destroy(), this._strategy = null, this.container.removeChild(this._bitmapContainer), this._bitmapContainer.removeAllChildren();
  }
  viewChange() {
  }
  moveEnd() {
    this.requestUpdate();
  }
  fetchBitmapData(t, e2, r) {
    return this.layer.fetchImageBitmap(t, e2, r);
  }
  doRefresh() {
    return __async(this, null, function* () {
      this.requestUpdate();
    });
  }
  isUpdating() {
    return this._strategy.updating || this.updateRequested;
  }
};
e([y()], m.prototype, "_strategy", void 0), e([y()], m.prototype, "updating", void 0), m = e([a("esri.views.2d.layers.BaseDynamicLayerView2D")], m);
var d = m;
export {
  d as default
};
//# sourceMappingURL=chunk-F2ZC4KD2.js.map
