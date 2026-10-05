import {
  c,
  l as l2
} from "./chunk-DQE2TUA4.js";
import {
  l
} from "./chunk-GGG4K7D6.js";
import {
  t
} from "./chunk-XCPRP2KL.js";
import {
  f
} from "./chunk-SIUD6VOA.js";
import {
  h
} from "./chunk-FODHXTS2.js";
import {
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";

// node_modules/@arcgis/core/layers/GraphicsLayer.js
var c2 = class extends l(t(f)) {
  constructor(r) {
    super(r), this.elevationInfo = null, this.graphics = new c(), this.screenSizePerspectiveEnabled = true, this.type = "graphics", this.internal = false;
  }
  destroy() {
    this.removeAll(), this.graphics.destroy();
  }
  add(r) {
    return this.graphics.add(r), this;
  }
  addMany(r) {
    return this.graphics.addMany(r), this;
  }
  removeAll() {
    return this.graphics.removeAll(), this;
  }
  remove(r) {
    this.graphics.remove(r);
  }
  removeMany(r) {
    this.graphics.removeMany(r);
  }
  on(r, e2) {
    return super.on(r, e2);
  }
  graphicChanged(r) {
    this.emit("graphic-update", r);
  }
};
e([y({ type: h })], c2.prototype, "elevationInfo", void 0), e([y(l2(c, "graphics"))], c2.prototype, "graphics", void 0), e([y({ type: ["show", "hide"] })], c2.prototype, "listMode", void 0), e([y()], c2.prototype, "screenSizePerspectiveEnabled", void 0), e([y({ readOnly: true })], c2.prototype, "type", void 0), e([y({ constructOnly: true })], c2.prototype, "internal", void 0), c2 = e([a("esri.layers.GraphicsLayer")], c2);
var h2 = c2;

export {
  h2 as h
};
//# sourceMappingURL=chunk-NZC7XTYY.js.map
