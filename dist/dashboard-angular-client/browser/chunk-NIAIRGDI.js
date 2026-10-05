import {
  _
} from "./chunk-NDNX5C3E.js";
import {
  a as a3
} from "./chunk-M7KKBRG2.js";
import {
  i as i2
} from "./chunk-LNUVU7QW.js";
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
import {
  a as a2
} from "./chunk-RFYQAIKV.js";
import "./chunk-4SWAA5E6.js";
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
import "./chunk-6KRSOWCH.js";
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
import "./chunk-3QI4RGVH.js";
import "./chunk-MACNJI7G.js";
import "./chunk-EFPJQTVN.js";
import "./chunk-GKEPJ7SJ.js";
import "./chunk-PUJBM626.js";
import {
  d
} from "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
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
import "./chunk-2AR2ZIQP.js";
import "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import {
  w
} from "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
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
  b,
  s as s2
} from "./chunk-NVGBLY2Q.js";
import {
  u
} from "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import {
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/views/layers/WMSLayerView.js
var m = (m2) => {
  let n2 = class extends m2 {
    initialize() {
      this.exportImageParameters = new a2({ layer: this.layer });
    }
    destroy() {
      this.exportImageParameters = u(this.exportImageParameters);
    }
    get exportImageVersion() {
      return this.exportImageParameters?.commitProperty("version"), this.commitProperty("timeExtent"), (this._get("exportImageVersion") || 0) + 1;
    }
    get timeExtent() {
      return i2(this.layer, this.view?.timeExtent, this._get("timeExtent"));
    }
    fetchPopupFeaturesAtLocation(e2, r) {
      return __async(this, null, function* () {
        const { layer: s3 } = this;
        if (!e2)
          throw new s("wmslayerview:fetchPopupFeatures", "Nothing to fetch without area", { layer: s3 });
        const { popupEnabled: a4 } = s3;
        if (!a4)
          throw new s("wmslayerview:fetchPopupFeatures", "popupEnabled should be true", { popupEnabled: a4 });
        const p = this.createFetchPopupFeaturesQuery(e2);
        if (!p)
          return [];
        const { extent: i3, width: m3, height: n3, x: c, y: u2 } = p;
        if (!(i3 && m3 && n3))
          throw new s("wmslayerview:fetchPopupFeatures", "WMSLayer does not support fetching features.", { extent: i3, width: m3, height: n3 });
        const h = yield s3.fetchFeatureInfo(i3, m3, n3, c, u2);
        return s2(r), h;
      });
    }
  };
  return e([y()], n2.prototype, "exportImageParameters", void 0), e([y({ readOnly: true })], n2.prototype, "exportImageVersion", null), e([y()], n2.prototype, "layer", void 0), e([y({ readOnly: true })], n2.prototype, "timeExtent", null), n2 = e([a("esri.views.layers.WMSLayerView")], n2), n2;
};

// node_modules/@arcgis/core/views/2d/layers/WMSLayerView2D.js
var g = class extends m(i(f(y2))) {
  constructor() {
    super(...arguments), this.bitmapContainer = new a3();
  }
  supportsSpatialReference(e2) {
    return this.layer.serviceSupportsSpatialReference(e2);
  }
  update(e2) {
    this.strategy.update(e2).catch((e3) => {
      b(e3) || n.getLogger(this).error(e3);
    });
  }
  attach() {
    const { layer: e2 } = this, { imageMaxHeight: t, imageMaxWidth: r } = e2;
    this.bitmapContainer = new a3(), this.container.addChild(this.bitmapContainer), this.strategy = new _({ container: this.bitmapContainer, fetchSource: this.fetchImage.bind(this), requestUpdate: this.requestUpdate.bind(this), imageMaxHeight: t, imageMaxWidth: r, imageRotationSupported: false, imageNormalizationSupported: false, hidpi: false }), this.addAttachHandles(d(() => this.exportImageVersion, () => this.requestUpdate()));
  }
  detach() {
    this.strategy = u(this.strategy), this.container.removeAllChildren();
  }
  viewChange() {
  }
  moveEnd() {
    this.requestUpdate();
  }
  createFetchPopupFeaturesQuery(e2) {
    const { view: t, bitmapContainer: r } = this, { x: i3, y: s3 } = e2, { spatialReference: a4 } = t;
    let o, p = 0, m2 = 0;
    if (r.children.some((e3) => {
      const { width: t2, height: r2, resolution: h2, x: c2, y: d3 } = e3, u2 = c2 + h2 * t2, g2 = d3 - h2 * r2;
      return i3 >= c2 && i3 <= u2 && s3 <= d3 && s3 >= g2 && (o = new w({ xmin: c2, ymin: g2, xmax: u2, ymax: d3, spatialReference: a4 }), p = t2, m2 = r2, true);
    }), !o)
      return null;
    const h = o.width / p, c = Math.round((i3 - o.xmin) / h), d2 = Math.round((o.ymax - s3) / h);
    return { extent: o, width: p, height: m2, x: c, y: d2 };
  }
  doRefresh() {
    return __async(this, null, function* () {
      this.requestUpdate();
    });
  }
  isUpdating() {
    return this.strategy.updating || this.updateRequested;
  }
  fetchImage(e2, t, r, i3) {
    return this.layer.fetchImageBitmap(e2, t, r, __spreadValues({ timeExtent: this.timeExtent }, i3));
  }
};
e([y()], g.prototype, "strategy", void 0), e([y()], g.prototype, "updating", void 0), g = e([a("esri.views.2d.layers.WMSLayerView2D")], g);
var y3 = g;
export {
  y3 as default
};
//# sourceMappingURL=chunk-NIAIRGDI.js.map
