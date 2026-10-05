import {
  e
} from "./chunk-CSIYRPBQ.js";
import {
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/OptimizedFeature.js
var e2 = class _e {
  constructor(t = null, e3 = {}, s2, o) {
    this.geometry = t, this.attributes = e3, this.centroid = s2, this.objectId = o, this.displayId = 0, this.geohashX = 0, this.geohashY = 0;
  }
  static fromJSON(s2, o) {
    const h = s2.geometry ? e.fromJSON(s2.geometry) : null, i = s2.centroid ? e.fromJSON(s2.centroid) : null, r = s2.attributes[o];
    return new _e(h, s2.attributes, i, r);
  }
  weakClone() {
    const t = new _e(this.geometry, this.attributes, this.centroid, this.objectId);
    return t.displayId = this.displayId, t.geohashX = this.geohashX, t.geohashY = this.geohashY, t;
  }
  clone() {
    const t = this.geometry?.clone(), s2 = new _e(t, __spreadValues({}, this.attributes), this.centroid?.clone(), this.objectId);
    return s2.displayId = this.displayId, s2.geohashX = this.geohashX, s2.geohashY = this.geohashY, s2;
  }
};
function s(t) {
  return !!t.geometry?.coords?.length;
}

export {
  e2 as e,
  s
};
//# sourceMappingURL=chunk-22FS2DB4.js.map
