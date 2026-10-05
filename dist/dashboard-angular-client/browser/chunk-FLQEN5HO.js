import {
  u
} from "./chunk-UER5KWEB.js";
import {
  r
} from "./chunk-YKH4U5BK.js";
import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  N,
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";

// node_modules/@arcgis/core/renderers/support/LegendOptions.js
var s;
var p = s = class extends f {
  constructor() {
    super(...arguments), this.title = null;
  }
  clone() {
    return new s({ title: this.title });
  }
};
e([y({ type: String, json: { write: true } })], p.prototype, "title", void 0), p = s = e([a("esri.renderers.support.LegendOptions")], p);

// node_modules/@arcgis/core/renderers/visualVariables/support/ColorStop.js
var c;
var i = c = class extends f {
  constructor(o) {
    super(o), this.color = null, this.label = null, this.value = null;
  }
  writeValue(o, r2, e2) {
    r2[e2] = o ?? 0;
  }
  clone() {
    return new c({ color: this.color && this.color.clone(), label: this.label, value: this.value });
  }
};
e([y({ type: u, json: { type: [N], write: true } })], i.prototype, "color", void 0), e([y({ type: String, json: { write: true } })], i.prototype, "label", void 0), e([y({ type: Number, json: { write: { writerEnsuresNonNull: true } } })], i.prototype, "value", void 0), e([r("value")], i.prototype, "writeValue", null), i = c = e([a("esri.renderers.visualVariables.support.ColorStop")], i);
var a2 = i;

export {
  p,
  a2 as a
};
//# sourceMappingURL=chunk-FLQEN5HO.js.map
