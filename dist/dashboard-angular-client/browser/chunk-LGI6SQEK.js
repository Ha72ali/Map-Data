import {
  n2 as n,
  p,
  v
} from "./chunk-NB4THPQ7.js";
import {
  o
} from "./chunk-JJ2NMOGF.js";
import {
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a2
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  a
} from "./chunk-BTPDOHVM.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/renderers/SimpleRenderer.js
var c;
var m = c = class extends v(p) {
  constructor(e2) {
    super(e2), this.description = null, this.label = null, this.symbol = null, this.type = "simple";
  }
  collectRequiredFields(e2, s) {
    return __async(this, null, function* () {
      yield Promise.all([this.collectSymbolFields(e2, s), this.collectVVRequiredFields(e2, s)]);
    });
  }
  collectSymbolFields(e2, s) {
    return __async(this, null, function* () {
      yield Promise.all(this.getSymbols().map((r) => r.collectRequiredFields(e2, s)));
    });
  }
  getSymbol(e2, s) {
    return this.symbol;
  }
  getSymbolAsync(e2, s) {
    return __async(this, null, function* () {
      return this.symbol;
    });
  }
  getSymbols() {
    return this.symbol ? [this.symbol] : [];
  }
  getAttributeHash() {
    return this.visualVariables && this.visualVariables.reduce((e2, s) => e2 + s.getAttributeHash(), "");
  }
  getMeshHash() {
    return this.getSymbols().reduce((e2, s) => e2 + JSON.stringify(s), "");
  }
  get arcadeRequired() {
    return this.arcadeRequiredForVisualVariables;
  }
  clone() {
    return new c({ description: this.description, label: this.label, symbol: a(this.symbol), visualVariables: a(this.visualVariables), authoringInfo: a(this.authoringInfo) });
  }
};
e([y({ type: String, json: { write: true } })], m.prototype, "description", void 0), e([y({ type: String, json: { write: true } })], m.prototype, "label", void 0), e([y(n)], m.prototype, "symbol", void 0), e([o({ simple: "simple" })], m.prototype, "type", void 0), m = c = e([a2("esri.renderers.SimpleRenderer")], m);
var p2 = m;

export {
  p2 as p
};
//# sourceMappingURL=chunk-LGI6SQEK.js.map
