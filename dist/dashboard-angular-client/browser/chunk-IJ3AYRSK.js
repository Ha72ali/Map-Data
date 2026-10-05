import {
  h3 as h2
} from "./chunk-R476LTOD.js";
import {
  c,
  i
} from "./chunk-7OJAPEH6.js";
import {
  p
} from "./chunk-62KYE6XS.js";
import {
  s as s2
} from "./chunk-ELMEXWR7.js";
import {
  h
} from "./chunk-X6CCVH6W.js";
import {
  A,
  d,
  v
} from "./chunk-QNED4CTP.js";
import {
  n as n4
} from "./chunk-4ZNMWBPP.js";
import {
  y as y2
} from "./chunk-4QNJMPNJ.js";
import {
  j
} from "./chunk-EHKCE57B.js";
import {
  V
} from "./chunk-ZDVJGW4C.js";
import {
  o
} from "./chunk-NFF25GNL.js";
import {
  n as n2
} from "./chunk-6ZGC7MSX.js";
import {
  n as n3,
  w
} from "./chunk-BYMJUQYJ.js";
import {
  S,
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  u
} from "./chunk-V7ZPXZOX.js";
import {
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";

// node_modules/@arcgis/core/views/layers/support/ClipArea.js
var t = class extends f {
  get version() {
    return this.commitVersionProperties(), (this._get("version") || 0) + 1;
  }
};
e([y({ readOnly: true })], t.prototype, "version", null), t = e([a("esri.views.layers.support.ClipArea")], t);
var p2 = t;

// node_modules/@arcgis/core/views/layers/support/ClipRect.js
var s3;
var i2 = s3 = class extends p2 {
  constructor(t2) {
    super(t2), this.type = "rect", this.left = null, this.right = null, this.top = null, this.bottom = null;
  }
  clone() {
    return new s3({ left: this.left, right: this.right, top: this.top, bottom: this.bottom });
  }
  commitVersionProperties() {
    this.commitProperty("left"), this.commitProperty("right"), this.commitProperty("top"), this.commitProperty("bottom");
  }
};
e([y({ type: [Number, String], json: { write: true } })], i2.prototype, "left", void 0), e([y({ type: [Number, String], json: { write: true } })], i2.prototype, "right", void 0), e([y({ type: [Number, String], json: { write: true } })], i2.prototype, "top", void 0), e([y({ type: [Number, String], json: { write: true } })], i2.prototype, "bottom", void 0), i2 = s3 = e([a("esri.views.layers.support.ClipRect")], i2);
var p3 = i2;

// node_modules/@arcgis/core/views/layers/support/Geometry.js
var y3;
var c2 = { base: n3, key: "type", typeMap: { extent: w, polygon: j } };
var n5 = y3 = class extends p2 {
  constructor(o2) {
    super(o2), this.type = "geometry", this.geometry = null;
  }
  clone() {
    return new y3({ geometry: this.geometry?.clone() ?? null });
  }
  commitVersionProperties() {
    this.commitProperty("geometry");
  }
};
e([y({ types: c2, json: { read: y2, write: true } })], n5.prototype, "geometry", void 0), n5 = y3 = e([a("esri.views.layers.support.Geometry")], n5);
var a2 = n5;

// node_modules/@arcgis/core/views/layers/support/Path.js
var e2 = class extends p2 {
  constructor(r) {
    super(r), this.type = "path", this.path = [];
  }
  commitVersionProperties() {
    this.commitProperty("path");
  }
};
e([y({ type: [[[Number]]], json: { write: true } })], e2.prototype, "path", void 0), e2 = e([a("esri.views.layers.support.Path")], e2);
var p4 = e2;

// node_modules/@arcgis/core/views/2d/layers/LayerView2D.js
var m = V.ofType({ key: "type", base: null, typeMap: { rect: p3, path: p4, geometry: a2 } });
var f2 = (t2) => {
  let c3 = class extends t2 {
    constructor() {
      super(...arguments), this.attached = false, this.clips = new m(), this.highlightOptions = null, this.lastUpdateId = -1, this.moving = false, this.updateRequested = false, this._visibleAtCurrentScale = true;
    }
    initialize() {
      const e3 = this.view?.spatialReferenceLocked ?? true, t3 = this.view?.spatialReference;
      t3 && e3 && !this.spatialReferenceSupported ? this.addResolvingPromise(Promise.reject(new s("layerview:spatial-reference-incompatible", "The spatial reference of this layer does not meet the requirements of the view", { layer: this.layer }))) : (this.container || (this.container = new h2()), this.container.fadeTransitionEnabled = true, this.container.visible = false, this.container.endTransitions(), this.addHandles([d(() => this.suspended, (e4) => {
        this.container && (this.container.visible = !e4);
      }, A), d(() => this.updateSuspended, (e4) => {
        this.view && !e4 && this.updateRequested && this.view.requestUpdate();
      }, A), d(() => this.layer?.opacity ?? 1, (e4) => {
        this.container && (this.container.opacity = e4);
      }, A), d(() => this.layer && "blendMode" in this.layer ? this.layer.blendMode : "normal", (e4) => {
        this.container && (this.container.blendMode = e4);
      }, A), d(() => this.layer && "effect" in this.layer ? this.layer.effect : null, (e4) => {
        this.container && (this.container.effect = e4);
      }, A), d(() => this.highlightOptions, (e4) => this.container.highlightOptions = e4, A), v(() => this.clips, "change", () => {
        this.container && (this.container.clips = this.clips);
      }, A), d(() => ({ scale: this.view?.scale, scaleRange: this.layer && "effectiveScaleRange" in this.layer ? this.layer.effectiveScaleRange : null }), ({ scale: e4, scaleRange: t4 }) => {
        const s4 = c(t4, e4);
        s4 !== this._visibleAtCurrentScale && (this._visibleAtCurrentScale = s4);
      }, A)], "constructor"), this.view?.whenLayerView ? this.view.whenLayerView(this.layer).then((e4) => {
        e4 === this && this.processAttach();
      }, () => {
      }) : this.when().then(() => {
        this.processAttach();
      }, () => {
      }));
    }
    destroy() {
      this.processDetach(), this.updateRequested = false;
    }
    get spatialReferenceSupported() {
      const e3 = this.view?.spatialReference;
      return null == e3 || this.supportsSpatialReference(e3);
    }
    get updating() {
      return this.spatialReferenceSupported && (!this.attached || !this.suspended && (this.updateRequested || this.isUpdating()) || !!this._updatingHandles?.updating);
    }
    get visibleAtCurrentScale() {
      return this._visibleAtCurrentScale;
    }
    processAttach() {
      this.isResolved() && !this.attached && !this.destroyed && this.spatialReferenceSupported && (this.attach(), this.attached = true, this.requestUpdate());
    }
    processDetach() {
      this.attached && (this.attached = false, this.removeHandles("attach"), this.detach(), this.updateRequested = false);
    }
    requestUpdate() {
      this.destroyed || this.updateRequested || (this.updateRequested = true, this.updateSuspended || this.view.requestUpdate());
    }
    processUpdate(e3) {
      !this.isFulfilled() || this.isResolved() ? (this._set("updateParameters", e3), this.updateRequested && !this.updateSuspended && (this.updateRequested = false, this.update(e3))) : this.updateRequested = false;
    }
    hitTest(e3, t3) {
      return Promise.resolve(null);
    }
    supportsSpatialReference(e3) {
      return true;
    }
    canResume() {
      return !!this.spatialReferenceSupported && (!!super.canResume() && this.visibleAtCurrentScale);
    }
    getSuspendInfo() {
      const e3 = super.getSuspendInfo(), t3 = !this.spatialReferenceSupported;
      return t3 && (e3.spatialReferenceNotSupported = t3), e3;
    }
    addAttachHandles(e3) {
      this.addHandles(e3, "attach");
    }
  };
  return e([y()], c3.prototype, "attached", void 0), e([y({ type: m, set(e3) {
    const t3 = n4(e3, this._get("clips"), m);
    this._set("clips", t3);
  } })], c3.prototype, "clips", void 0), e([y()], c3.prototype, "container", void 0), e([y({ type: p })], c3.prototype, "highlightOptions", void 0), e([y()], c3.prototype, "moving", void 0), e([y({ readOnly: true })], c3.prototype, "spatialReferenceSupported", null), e([y({ readOnly: true })], c3.prototype, "updateParameters", void 0), e([y()], c3.prototype, "updateRequested", void 0), e([y()], c3.prototype, "updating", null), e([y()], c3.prototype, "view", void 0), e([y()], c3.prototype, "_visibleAtCurrentScale", void 0), e([y({ readOnly: true })], c3.prototype, "visibleAtCurrentScale", null), c3 = e([a("esri.views.2d.layers.LayerView2D")], c3), c3;
};

// node_modules/@arcgis/core/views/layers/LayerView.js
var u2 = class extends s2(n2(o.EventedMixin(S))) {
  constructor(e3) {
    super(e3), this._updatingHandles = new h(), this.layer = null, this.parent = null;
  }
  initialize() {
    this.when().catch((e3) => {
      if ("layerview:create-error" !== e3.name) {
        const t2 = this.layer && this.layer.id || "no id", r = this.layer?.title || "no title";
        n.getLogger(this).error("#resolve()", `Failed to resolve layer view (layer title: '${r}', id: '${t2}')`, e3);
      }
    });
  }
  destroy() {
    this._updatingHandles = u(this._updatingHandles);
  }
  get fullOpacity() {
    return (this.layer?.opacity ?? 1) * (this.parent?.fullOpacity ?? 1);
  }
  get suspended() {
    return this.destroyed || !this.canResume();
  }
  get suspendInfo() {
    return this.getSuspendInfo();
  }
  get legendEnabled() {
    return !this.suspended && true === this.layer?.legendEnabled;
  }
  get updating() {
    return !(!this._updatingHandles?.updating && !this.isUpdating());
  }
  get updatingProgress() {
    return this.updating ? 0 : 1;
  }
  get updateSuspended() {
    return this.suspended;
  }
  get visible() {
    return true === this.layer?.visible;
  }
  set visible(e3) {
    this._overrideIfSome("visible", e3);
  }
  get visibleAtCurrentScale() {
    return true;
  }
  get visibleAtCurrentTimeExtent() {
    const e3 = this.view.timeExtent, t2 = this.layer?.visibilityTimeExtent;
    return !e3 || !t2 || !e3.intersection(t2).isEmpty;
  }
  canResume() {
    const e3 = this.layer && "effectiveScaleRange" in this.layer ? this.layer.effectiveScaleRange : null;
    return this.visible && this.layer?.loaded && !this.parent?.suspended && this.view?.ready && i(e3) && this.visibleAtCurrentScale && this.visibleAtCurrentTimeExtent || false;
  }
  getSuspendInfo() {
    const e3 = this.parent?.suspended ? this.parent.suspendInfo : {}, t2 = this;
    t2.view?.ready || (e3.viewNotReady = true), this.layer && this.layer.loaded || (e3.layerNotLoaded = true);
    const r = this.layer && "effectiveScaleRange" in this.layer ? this.layer.effectiveScaleRange : null;
    return i(r) && this.visibleAtCurrentScale || (e3.outsideScaleRange = true), this.visibleAtCurrentTimeExtent || (e3.outsideVisibilityTimeExtent = true), this.visible || (e3.layerInvisible = true), e3;
  }
  isUpdating() {
    return false;
  }
};
e([y()], u2.prototype, "view", void 0), e([y()], u2.prototype, "fullOpacity", null), e([y()], u2.prototype, "layer", void 0), e([y()], u2.prototype, "parent", void 0), e([y({ readOnly: true })], u2.prototype, "suspended", null), e([y({ readOnly: true })], u2.prototype, "suspendInfo", null), e([y({ readOnly: true })], u2.prototype, "legendEnabled", null), e([y({ type: Boolean, readOnly: true })], u2.prototype, "updating", null), e([y({ readOnly: true })], u2.prototype, "updatingProgress", null), e([y()], u2.prototype, "updateSuspended", null), e([y()], u2.prototype, "visible", null), e([y({ readOnly: true })], u2.prototype, "visibleAtCurrentScale", null), e([y({ readOnly: true })], u2.prototype, "visibleAtCurrentTimeExtent", null), u2 = e([a("esri.views.layers.LayerView")], u2);
var y4 = u2;

export {
  a2 as a,
  f2 as f,
  y4 as y
};
//# sourceMappingURL=chunk-IJ3AYRSK.js.map
