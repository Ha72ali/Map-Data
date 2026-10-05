import {
  n as n2,
  r as r2
} from "./chunk-QZZDW7K3.js";
import "./chunk-IGE25ZAR.js";
import {
  i
} from "./chunk-QN5HQI56.js";
import {
  f,
  y as y2
} from "./chunk-IJ3AYRSK.js";
import "./chunk-TU34Z563.js";
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
import {
  m,
  r
} from "./chunk-K7UWGR2I.js";
import {
  h
} from "./chunk-SU6JOKEZ.js";
import "./chunk-62KYE6XS.js";
import "./chunk-73TXPMFV.js";
import {
  e as e2
} from "./chunk-3G25CU47.js";
import "./chunk-2PNLU6ZL.js";
import "./chunk-OT4IEERH.js";
import "./chunk-SPSOOQ26.js";
import "./chunk-B4YHNVRO.js";
import "./chunk-7B5IT5ZP.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-UER5KWEB.js";
import "./chunk-X6CCVH6W.js";
import "./chunk-AGNOML52.js";
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
import {
  G
} from "./chunk-U4IA2IP4.js";
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
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/views/2d/layers/WMTSLayerView2D.js
var m2 = /* @__PURE__ */ new Set([102113, 102100, 3857, 3785, 900913]);
var y3 = [0, 0];
var _ = class extends i(r2(f(y2))) {
  constructor() {
    super(...arguments), this._tileStrategy = null, this._fetchQueue = null, this.layer = null;
  }
  get tileMatrixSet() {
    const e3 = this._getTileMatrixSetBySpatialReference(this.layer.activeLayer);
    return e3 ? (e3.id !== this.layer.activeLayer.tileMatrixSetId && (this.layer.activeLayer.tileMatrixSetId = e3.id), e3) : null;
  }
  update(e3) {
    this._fetchQueue.pause(), this._fetchQueue.state = e3.state, this._tileStrategy.update(e3), this._fetchQueue.resume();
  }
  attach() {
    const e3 = this.tileMatrixSet?.tileInfo;
    e3 && (this._tileInfoView = new h(e3), this._fetchQueue = new m({ tileInfoView: this._tileInfoView, concurrency: 16, process: (e4, t) => this.fetchTile(e4, t) }), this._tileStrategy = new r({ cachePolicy: "keep", resampling: true, acquireTile: (e4) => this.acquireTile(e4), releaseTile: (e4) => this.releaseTile(e4), tileInfoView: this._tileInfoView }), this.addAttachHandles(this._updatingHandles.add(() => [this.layer?.activeLayer?.styleId, this.tileMatrixSet], () => this.doRefresh())), super.attach());
  }
  detach() {
    super.detach(), this._tileStrategy?.destroy(), this._fetchQueue?.destroy(), this._fetchQueue = this._tileStrategy = this._tileInfoView = null;
  }
  viewChange() {
    this.requestUpdate();
  }
  moveEnd() {
    this.requestUpdate();
  }
  supportsSpatialReference(e3) {
    return this.layer.activeLayer.tileMatrixSets?.some((t) => G(t.tileInfo?.spatialReference, e3)) ?? false;
  }
  doRefresh() {
    return __async(this, null, function* () {
      if (this.attached) {
        if (this.suspended)
          return this._tileStrategy.clear(), void this.requestUpdate();
        this._fetchQueue.reset(), this._tileStrategy.refresh((e3) => this._updatingHandles.addPromise(this._enqueueTileFetch(e3)));
      }
    });
  }
  acquireTile(e3) {
    const t = this._bitmapView.createTile(e3), i2 = t.bitmap;
    return [i2.x, i2.y] = this._tileInfoView.getTileCoords(y3, t.key), i2.resolution = this._tileInfoView.getTileResolution(t.key), [i2.width, i2.height] = this._tileInfoView.tileInfo.size, this._updatingHandles.addPromise(this._enqueueTileFetch(t)), this._bitmapView.addChild(t), this.requestUpdate(), t;
  }
  releaseTile(e3) {
    this._fetchQueue.abort(e3.key.id), this._bitmapView.removeChild(e3), e3.once("detach", () => e3.destroy()), this.requestUpdate();
  }
  fetchTile(_0) {
    return __async(this, arguments, function* (e3, t = {}) {
      const s = "tilemapCache" in this.layer ? this.layer.tilemapCache : null, { signal: r3, resamplingLevel: a2 = 0 } = t;
      if (!s)
        return this._fetchImage(e3, r3);
      const l = new e2(0, 0, 0, 0);
      let o;
      try {
        yield s.fetchAvailabilityUpsample(e3.level, e3.row, e3.col, l, { signal: r3 }), o = yield this._fetchImage(l, r3);
      } catch (n3) {
        if (b(n3))
          throw n3;
        if (a2 < 3) {
          const i2 = this._tileInfoView.getTileParentId(e3.id);
          if (i2) {
            const s2 = new e2(i2), r4 = yield this.fetchTile(s2, __spreadProps(__spreadValues({}, t), { resamplingLevel: a2 + 1 }));
            return n2(this._tileInfoView, r4, s2, e3);
          }
        }
        throw n3;
      }
      return n2(this._tileInfoView, o, l, e3);
    });
  }
  canResume() {
    const e3 = super.canResume();
    return e3 ? null !== this.tileMatrixSet : e3;
  }
  _enqueueTileFetch(e3) {
    return __async(this, null, function* () {
      if (!this._fetchQueue.has(e3.key.id)) {
        try {
          const t = yield this._fetchQueue.push(e3.key);
          e3.bitmap.source = t, e3.bitmap.width = this._tileInfoView.tileInfo.size[0], e3.bitmap.height = this._tileInfoView.tileInfo.size[1], e3.once("attach", () => this.requestUpdate());
        } catch (s) {
          b(s) || n.getLogger(this).error(s);
        }
        this.requestUpdate();
      }
    });
  }
  _fetchImage(e3, t) {
    return __async(this, null, function* () {
      return this.layer.fetchImageBitmapTile(e3.level, e3.row, e3.col, { signal: t });
    });
  }
  _getTileMatrixSetBySpatialReference(e3) {
    const t = this.view.spatialReference;
    if (!e3.tileMatrixSets)
      return null;
    let i2 = e3.tileMatrixSets.find((e4) => G(e4.tileInfo?.spatialReference, t));
    return !i2 && t.isWebMercator && (i2 = e3.tileMatrixSets.find((e4) => m2.has(e4.tileInfo?.spatialReference.wkid ?? -1))), i2;
  }
};
e([y({ readOnly: true })], _.prototype, "tileMatrixSet", null), _ = e([a("esri.views.2d.layers.WMTSLayerView2D")], _);
var w = _;
export {
  w as default
};
//# sourceMappingURL=chunk-I6MN6HW6.js.map
