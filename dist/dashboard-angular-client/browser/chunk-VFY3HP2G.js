import {
  k
} from "./chunk-ZQQ553GQ.js";
import {
  j2 as j
} from "./chunk-YTC5APIA.js";
import {
  i
} from "./chunk-5YCNWSDC.js";
import {
  p
} from "./chunk-QNED4CTP.js";
import {
  n as n2
} from "./chunk-ZGFCHJGS.js";
import {
  y as y2
} from "./chunk-4QNJMPNJ.js";
import {
  a2,
  e3 as e2,
  f2 as f,
  o2 as o,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  n2 as n
} from "./chunk-BTPDOHVM.js";
import {
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/Graphic.js
var y3;
function c(t) {
  if (!t)
    return null;
  const e3 = {};
  for (const r in t) {
    const s = y2(t[r]);
    s && (e3[r] = s);
  }
  return 0 !== Object.keys(e3).length ? e3 : null;
}
function f2(t) {
  if (null == t)
    return null;
  const e3 = {};
  for (const r in t) {
    const s = t[r];
    s && (e3[r] = s.toJSON());
  }
  return 0 !== Object.keys(e3).length ? e3 : null;
}
var b = y3 = class extends i(f) {
  constructor(t) {
    super(t), this.isAggregate = false, this.layer = null, this.origin = null, this.popupTemplate = null, this.sourceLayer = null, Object.defineProperty(this, "uid", { value: e2(), configurable: true }), Object.defineProperty(this, "_lastMeshTransform", { value: {}, configurable: true, writable: true, enumerable: false }), arguments.length > 1 && o(n.getLogger(this), "Graphic", { version: "4.30" });
  }
  initialize() {
    this._watchMeshGeometryChanges();
  }
  set aggregateGeometries(t) {
    const e3 = this._get("aggregateGeometries");
    JSON.stringify(e3) !== JSON.stringify(t) && this._set("aggregateGeometries", t);
  }
  set attributes(t) {
    const e3 = this._get("attributes");
    e3 !== t && (this._set("attributes", t), this._notifyLayer("attributes", e3, t));
  }
  set geometry(t) {
    const e3 = this._get("geometry");
    e3 !== t && (this._set("geometry", t), "mesh" !== t?.type && this._notifyLayer("geometry", e3, t));
  }
  set symbol(t) {
    const e3 = this._get("symbol");
    e3 !== t && (this._set("symbol", t), this._notifyLayer("symbol", e3, t));
  }
  set visible(t) {
    const e3 = this._get("visible");
    e3 !== t && (this._set("visible", t), this._notifyLayer("visible", e3, t));
  }
  cloneShallow() {
    return new y3({ aggregateGeometries: this.aggregateGeometries, attributes: this.attributes, geometry: this.geometry, isAggregate: this.isAggregate, layer: this.layer, popupTemplate: this.popupTemplate, sourceLayer: this.sourceLayer, symbol: this.symbol, visible: this.visible, origin: this.origin });
  }
  getEffectivePopupTemplate(t = false) {
    if (this.popupTemplate)
      return this.popupTemplate;
    const e3 = this.origin && "layer" in this.origin ? this.origin.layer : null;
    for (const r of [e3, this.sourceLayer, this.layer])
      if (r) {
        if ("popupTemplate" in r && r.popupTemplate)
          return r.popupTemplate;
        if (t && "defaultPopupTemplate" in r && null != r.defaultPopupTemplate)
          return r.defaultPopupTemplate;
      }
    return null;
  }
  getAttribute(t) {
    return this.attributes?.[t];
  }
  setAttribute(t, e3) {
    if (this.attributes) {
      const r = this.getAttribute(t);
      this.attributes[t] = e3, this._notifyLayer("attributes", r, e3, t);
    } else
      this.attributes = { [t]: e3 }, this._notifyLayer("attributes", void 0, e3, t);
  }
  getObjectId() {
    return this.sourceLayer && "objectIdField" in this.sourceLayer && this.sourceLayer.objectIdField ? this.getAttribute(this.sourceLayer.objectIdField) : null;
  }
  toJSON() {
    return { aggregateGeometries: f2(this.aggregateGeometries), geometry: null != this.geometry ? this.geometry.toJSON() : null, symbol: null != this.symbol ? this.symbol.toJSON() : null, attributes: a2(this.attributes) ? this.attributes.toJSON() : __spreadValues({}, this.attributes), popupTemplate: this.popupTemplate?.toJSON() ?? null };
  }
  notifyMeshTransformChanged(t = {}) {
    const { geometry: e3 } = this;
    if ("mesh" === e3?.type) {
      const r = { origin: e3.origin, transform: e3.transform };
      this._notifyLayer("origin-transform", r, r, t.action);
    }
  }
  _notifyLayer(t, e3, r, s) {
    if (!this.layer || !("graphicChanged" in this.layer))
      return;
    const i2 = { graphic: this, property: t, oldValue: e3, newValue: r };
    "origin-transform" === t && (i2.action = s), "attributes" === t && (i2.attributeName = s), this.layer.graphicChanged(i2);
  }
  _watchMeshGeometryChanges() {
    this.addHandles([p(() => "mesh" === this.geometry?.type && this.geometry.vertexSpace.origin ? { localMatrix: this.geometry.transform?.localMatrix, origin: this.geometry.vertexSpace.origin } : void 0, ({ localMatrix: t, origin: e3 }) => {
      this._lastMeshTransform.localMatrix === t && this._lastMeshTransform.origin === e3 || (this._lastMeshTransform.localMatrix = t, this._lastMeshTransform.origin = e3, this.notifyMeshTransformChanged());
    }), p(() => "mesh" === this.geometry?.type ? { vertexAttributes: this.geometry.vertexAttributes } : void 0, () => {
      const t = this.geometry;
      "mesh" === t?.type && t.vertexSpace.origin ? (this._lastMeshTransform.localMatrix = t.transform?.localMatrix, this._lastMeshTransform.origin = t.vertexSpace.origin) : (this._lastMeshTransform.localMatrix = void 0, this._lastMeshTransform.origin = void 0), this._notifyLayer("geometry", this.geometry, this.geometry);
    }, { equals: (t, e3) => t === e3, sync: true })]);
  }
};
e([y({ value: null, json: { read: c } })], b.prototype, "aggregateGeometries", null), e([y({ value: null })], b.prototype, "attributes", null), e([y({ value: null, types: n2, json: { read: y2 } })], b.prototype, "geometry", null), e([y({ type: Boolean })], b.prototype, "isAggregate", void 0), e([y({ clonable: "reference" })], b.prototype, "layer", void 0), e([y({ clonable: "reference" })], b.prototype, "origin", void 0), e([y({ type: k })], b.prototype, "popupTemplate", void 0), e([y({ clonable: "reference" })], b.prototype, "sourceLayer", void 0), e([y({ value: null, types: j })], b.prototype, "symbol", null), e([y({ type: Boolean, value: true })], b.prototype, "visible", null), b = y3 = e([a("esri.Graphic")], b), function(t) {
  t.generateUID = e2;
}(b || (b = {}));
var d = b;

export {
  d
};
//# sourceMappingURL=chunk-VFY3HP2G.js.map
