import {
  s as s2
} from "./chunk-BZEDVIAT.js";
import {
  s2 as s
} from "./chunk-47ACMYSX.js";
import {
  h
} from "./chunk-BTPDOHVM.js";

// node_modules/@arcgis/core/core/signal.js
var i = class {
  constructor(t, e) {
    this._observable = new s2(), this._value = t, this._equalityFunction = e;
  }
  get value() {
    return s(this._observable), this._value;
  }
  set value(t) {
    this._equalityFunction(t, this._value) || (this._value = t, this._observable.notify());
  }
  mutate(t) {
    t(this._value), this._observable.notify();
  }
};
function r(e, s3 = h) {
  return new i(e, s3);
}

export {
  r
};
//# sourceMappingURL=chunk-AGNOML52.js.map
