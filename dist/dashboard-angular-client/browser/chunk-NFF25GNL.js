import {
  S
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  e as e2,
  o
} from "./chunk-NVGBLY2Q.js";

// node_modules/@arcgis/core/core/Evented.js
var i = class _i {
  constructor() {
    this._emitter = new _i.EventEmitter(this);
  }
  emit(e3, t) {
    return this._emitter.emit(e3, t);
  }
  on(e3, t) {
    return this._emitter.on(e3, t);
  }
  once(e3, t) {
    return this._emitter.once(e3, t);
  }
  hasEventListener(e3) {
    return this._emitter.hasEventListener(e3);
  }
};
!function(o3) {
  class c {
    constructor(e3 = null) {
      this._target = e3, this._listenersMap = null;
    }
    clear() {
      this._listenersMap?.clear(), this._listenersMap = null;
    }
    destroy() {
      this.clear();
    }
    emit(e3, t) {
      let r = this._listenersMap?.get(e3);
      if (!r)
        return false;
      const s = this._target || this;
      let n = false;
      for (const i2 of r.slice()) {
        const e4 = "deref" in i2 ? i2.deref() : i2;
        e4 ? e4?.call(s, t) : n = true;
      }
      return n && (r = r.filter((e4) => !("deref" in e4) || null != e4.deref()), this._listenersMap.set(e3, r)), r.length > 0;
    }
    on(e3, t) {
      if (Array.isArray(e3)) {
        const s = e3.map((e4) => this.on(e4, t));
        return o(s);
      }
      if (e3.includes(","))
        throw new TypeError("Evented.on() with a comma delimited string of event types is not supported");
      this._listenersMap ??= /* @__PURE__ */ new Map();
      const n = this._listenersMap.get(e3) || [];
      return n.push(t), this._listenersMap.set(e3, n), e2(() => {
        const r = this._listenersMap?.get(e3), s = r?.indexOf(t) ?? -1;
        s >= 0 && r.splice(s, 1);
      });
    }
    once(e3, t) {
      const r = this.on(e3, (e4) => {
        r.remove();
        const s = "deref" in t ? t.deref() : t;
        s?.call(null, e4);
      });
      return r;
    }
    hasEventListener(e3) {
      const t = this._listenersMap?.get(e3);
      return null != t && t.length > 0;
    }
  }
  o3.EventEmitter = c, o3.EventedMixin = (t) => {
    let r = class extends t {
      constructor() {
        super(...arguments), this._emitter = new c();
      }
      destroy() {
        this._emitter.clear();
      }
      emit(e3, t2) {
        return this._emitter.emit(e3, t2);
      }
      on(e3, t2) {
        return this._emitter.on(e3, t2);
      }
      once(e3, t2) {
        return this._emitter.once(e3, t2);
      }
      hasEventListener(e3) {
        return this._emitter.hasEventListener(e3);
      }
    };
    return r = e([a("esri.core.Evented")], r), r;
  };
  let l = class extends S {
    constructor() {
      super(...arguments), this._emitter = new i.EventEmitter(this);
    }
    destroy() {
      this._emitter.clear();
    }
    emit(e3, t) {
      return this._emitter.emit(e3, t);
    }
    on(e3, t) {
      return this._emitter.on(e3, t);
    }
    once(e3, t) {
      return this._emitter.once(e3, t);
    }
    hasEventListener(e3) {
      return this._emitter.hasEventListener(e3);
    }
  };
  l = e([a("esri.core.Evented.EventedAccessor")], l), o3.EventedAccessor = l;
}(i || (i = {}));
var o2 = i;

export {
  o2 as o
};
//# sourceMappingURL=chunk-NFF25GNL.js.map
