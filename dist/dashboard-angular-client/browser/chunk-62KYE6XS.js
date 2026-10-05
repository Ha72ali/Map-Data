import {
  u
} from "./chunk-UER5KWEB.js";
import {
  S,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";

// node_modules/@arcgis/core/views/2d/support/HighlightOptions.js
var l = class extends S {
  constructor() {
    super(...arguments), this.color = new u([0, 255, 255]), this.haloOpacity = 1, this.fillOpacity = 0.25, this.multiHighlightEnabled = false;
  }
  equals(o) {
    return this.color.equals(o.color) && (this.haloColor || this.color).equals(o.haloColor || o.color) && this.haloOpacity === o.haloOpacity && this.fillOpacity === o.fillOpacity && this.multiHighlightEnabled === o.multiHighlightEnabled;
  }
};
e([y({ type: u })], l.prototype, "color", void 0), e([y({ type: u })], l.prototype, "haloColor", void 0), e([y()], l.prototype, "haloOpacity", void 0), e([y()], l.prototype, "fillOpacity", void 0), e([y()], l.prototype, "multiHighlightEnabled", void 0), l = e([a("esri.views.2d.support.HighlightOptions")], l);
var p = l;

export {
  p
};
//# sourceMappingURL=chunk-62KYE6XS.js.map
