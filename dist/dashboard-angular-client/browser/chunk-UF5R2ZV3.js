import {
  a as a3,
  n as n3
} from "./chunk-VKC2IPZH.js";
import {
  b
} from "./chunk-FLPV6LMH.js";
import {
  c
} from "./chunk-3QI4RGVH.js";
import {
  n as n2
} from "./chunk-ZGFCHJGS.js";
import {
  n
} from "./chunk-LOE6HVIU.js";
import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a2
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  a,
  e as e2,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/FeatureFilter.js
var p;
var c2 = new n({ esriSpatialRelIntersects: "intersects", esriSpatialRelContains: "contains", esriSpatialRelCrosses: "crosses", esriSpatialRelDisjoint: "disjoint", esriSpatialRelEnvelopeIntersects: "envelope-intersects", esriSpatialRelIndexIntersects: "index-intersects", esriSpatialRelOverlaps: "overlaps", esriSpatialRelTouches: "touches", esriSpatialRelWithin: "within", esriSpatialRelRelation: "relation" });
var u = new n({ esriSRUnit_Meter: "meters", esriSRUnit_Kilometer: "kilometers", esriSRUnit_Foot: "feet", esriSRUnit_StatuteMile: "miles", esriSRUnit_NauticalMile: "nautical-miles", esriSRUnit_USNauticalMile: "us-nautical-miles" });
var m = p = class extends f {
  constructor(e3) {
    super(e3), this.where = null, this.geometry = null, this.spatialRelationship = "intersects", this.distance = void 0, this.objectIds = null, this.units = null, this.timeExtent = null;
  }
  createQuery(e3 = {}) {
    const { where: t, geometry: i, spatialRelationship: r, timeExtent: s2, objectIds: n5, units: l, distance: p3 } = this;
    return new b(__spreadValues({ geometry: a(i), objectIds: a(n5), spatialRelationship: r, timeExtent: a(s2), where: t, units: l, distance: p3 }, e3));
  }
  clone() {
    const { where: e3, geometry: t, spatialRelationship: i, timeExtent: r, objectIds: s2, units: n5, distance: l } = this;
    return new p({ geometry: a(t), objectIds: a(s2), spatialRelationship: i, timeExtent: a(r), where: e3, units: n5, distance: l });
  }
};
e([y({ type: String, json: { write: true } })], m.prototype, "where", void 0), e([y({ types: n2, json: { write: true } })], m.prototype, "geometry", void 0), e([y({ type: c2.apiValues, json: { name: "spatialRel", read: { reader: c2.read }, write: { allowNull: false, writer: c2.write, overridePolicy() {
  return { enabled: null != this.geometry };
} } } })], m.prototype, "spatialRelationship", void 0), e([y({ type: Number, json: { write: { overridePolicy(e3) {
  return { enabled: null != e3 && null != this.geometry };
} } } })], m.prototype, "distance", void 0), e([y({ type: [Number], json: { write: true } })], m.prototype, "objectIds", void 0), e([y({ type: u.apiValues, json: { read: u.read, write: { writer: u.write, overridePolicy(e3) {
  return { enabled: null != e3 && null != this.geometry };
} } } })], m.prototype, "units", void 0), e([y({ type: c, json: { write: true } })], m.prototype, "timeExtent", void 0), m = p = e([a2("esri.layers.support.FeatureFilter")], m);
var d = m;

// node_modules/@arcgis/core/layers/support/FeatureEffect.js
var d2;
var f2 = { read: { reader: n3 }, write: { writer: a3, overridePolicy() {
  return { allowNull: null != this.excludedEffect, isRequired: null == this.excludedEffect };
} } };
var n4 = { read: { reader: n3 }, write: { writer: a3, overridePolicy() {
  return { allowNull: null != this.includedEffect, isRequired: null == this.includedEffect };
} } };
var a4 = { name: "showExcludedLabels", default: true };
var p2 = d2 = class extends f {
  constructor(e3) {
    super(e3), this.filter = null, this.includedEffect = null, this.excludedEffect = null, this.excludedLabelsVisible = false;
  }
  write(e3, t) {
    const l = super.write(e3, t);
    if (t?.origin) {
      if (l.filter) {
        const e4 = Object.keys(l.filter);
        if (e4.length > 1 || "where" !== e4[0])
          return t.messages?.push(new s("web-document-write:unsupported-feature-effect", "Invalid feature effect 'filter'. A filter can only contain a 'where' property", { layer: t.layer, effect: this })), null;
      }
      if ("showExcludedLabels" in l)
        return t.messages?.push(new s("web-document-write:unsupported-feature-effect", "Invalid value for property 'excludedLabelsVisible' which should always be 'true'", { layer: t.layer, effect: this })), null;
    }
    return l;
  }
  clone() {
    return new d2({ filter: null != this.filter ? this.filter.clone() : null, includedEffect: this.includedEffect, excludedEffect: this.excludedEffect, excludedLabelsVisible: this.excludedLabelsVisible });
  }
};
e([y({ type: d, json: { write: { allowNull: true, writer(e3, r, t, i) {
  const o = e3?.write({}, i);
  o && 0 !== Object.keys(o).length ? e2(t, o, r) : e2(t, null, r);
} } } })], p2.prototype, "filter", void 0), e([y({ json: { read: n3, write: { writer: a3, allowNull: true }, origins: { "web-map": f2, "portal-item": f2 } } })], p2.prototype, "includedEffect", void 0), e([y({ json: { read: n3, write: { writer: a3, allowNull: true }, origins: { "web-map": n4, "portal-item": n4 } } })], p2.prototype, "excludedEffect", void 0), e([y({ type: Boolean, json: { write: true, name: "showExcludedLabels", origins: { "web-map": a4, "portal-item": a4 } } })], p2.prototype, "excludedLabelsVisible", void 0), p2 = d2 = e([a2("esri.layers.support.FeatureEffect")], p2);
var w = p2;

export {
  d,
  w
};
//# sourceMappingURL=chunk-UF5R2ZV3.js.map
