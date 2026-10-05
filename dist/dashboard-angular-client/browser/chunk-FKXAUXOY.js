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
import {
  a as a2,
  m,
  v
} from "./chunk-NVGBLY2Q.js";
import {
  e as e2,
  l
} from "./chunk-V7ZPXZOX.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/core/asyncUtils.js
function a3(r, t, o) {
  return v(r.map((r2, e3) => t.apply(o, [r2, e3])));
}
function p(r, t, o) {
  return __async(this, null, function* () {
    return (yield v(r.map((r2, e3) => t.apply(o, [r2, e3])))).map((r2) => r2.value);
  });
}
function c(r) {
  return { ok: true, value: r };
}
function h(r) {
  return { ok: false, error: r };
}
function m2(r) {
  return null != r && true === r.ok ? r.value : null;
}
function f(r) {
  return null != r && false === r.ok ? r.error : null;
}
function _(r) {
  return __async(this, null, function* () {
    if (null == r)
      return { ok: false, error: new Error("no promise provided") };
    try {
      return c(yield r);
    } catch (t) {
      return h(t);
    }
  });
}
function b(r) {
  return __async(this, null, function* () {
    try {
      return c(yield r);
    } catch (t) {
      return a2(t), h(t);
    }
  });
}
function d(r, t) {
  return new v2(r, t);
}
var v2 = class extends S {
  get value() {
    return m2(this._result);
  }
  get error() {
    return f(this._result);
  }
  get finished() {
    return null != this._result;
  }
  constructor(r, t) {
    super({}), this._result = null, this._abortHandle = null, this.abort = () => {
      this._abortController = e2(this._abortController);
    }, this.remove = this.abort, this._abortController = new AbortController();
    const { signal: e3 } = this._abortController;
    this.promise = r(e3), this.promise.then((r2) => {
      this._result = c(r2), this._cleanup();
    }, (r2) => {
      this._result = h(r2), this._cleanup();
    }), this._abortHandle = m(t, this.abort);
  }
  normalizeCtorArgs() {
    return {};
  }
  destroy() {
    this.abort();
  }
  _cleanup() {
    this._abortHandle = l(this._abortHandle), this._abortController = null;
  }
};
e([y()], v2.prototype, "value", null), e([y()], v2.prototype, "error", null), e([y()], v2.prototype, "finished", null), e([y()], v2.prototype, "promise", void 0), e([y()], v2.prototype, "_result", void 0), v2 = e([a("esri.core.asyncUtils.ReactiveTask")], v2);

export {
  a3 as a,
  p,
  _,
  b,
  d
};
//# sourceMappingURL=chunk-FKXAUXOY.js.map
