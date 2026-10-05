import {
  o as o2
} from "./chunk-YTRR4X7U.js";
import {
  o
} from "./chunk-NFF25GNL.js";
import {
  U
} from "./chunk-IMLUWAKH.js";
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
  L
} from "./chunk-NVGBLY2Q.js";
import {
  a
} from "./chunk-BTPDOHVM.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/versionManagement/support/versionManagementUtils.js
var t = o2();
var n = /* @__PURE__ */ new Map();
var s = /* @__PURE__ */ new Map();
function o3(r, t2, s2) {
  return __async(this, null, function* () {
    if (!r || !s2)
      return false;
    if (!t2)
      return true;
    const a4 = new URL(r).host;
    let o4 = n.get(a4);
    if (!o4) {
      const t3 = r.replace(/\/FeatureServer/i, "/VersionManagementServer").replace(/\/\d*$/, "");
      o4 = (yield U(t3, { responseType: "json", query: { f: "json" } })).data.defaultVersionName;
    }
    return o4 === t2;
  });
}
function i(e2, r, n2 = false) {
  return __async(this, null, function* () {
    if (!e2 || !r)
      return true;
    const a4 = e2.replace(/\/FeatureServer/i, "/VersionManagementServer").replace(/\/\d*$/, ""), o4 = s.get(a4)?.entries();
    if (o4) {
      for (const [s2, i2] of o4)
        if (i2.name === r) {
          const e3 = !i2.stack?.hasForwardEdits();
          if (!e3 && n2) {
            const [{ deleteForwardEdits: e4 }, { default: r2 }] = yield Promise.all([import("./chunk-ZDQ4O2SC.js"), import("./chunk-MBPHPSUG.js")]), n3 = yield e4(a4, s2, new r2({ sessionId: t, moment: i2.moment }));
            return n3.success && i2.stack?.clearForwardEdits(), n3.success;
          }
          return e3;
        }
    }
    return true;
  });
}
function c(e2, r) {
  if (!e2)
    return false;
  const t2 = e2.replace(/\/FeatureServer/i, "/VersionManagementServer").replace(/\/\d*$/, ""), n2 = s.get(t2)?.entries();
  if (n2) {
    for (const [s2, a4] of n2)
      if (a4.name === r) {
        return "edit" === a4.lockType;
      }
  }
  return false;
}

// node_modules/@arcgis/core/layers/mixins/EditBusLayer.js
var a3 = new o.EventEmitter();
function l(t2) {
  return a3.on("apply-edits", new WeakRef(t2));
}
function h(t2) {
  return a3.on("update-moment", new WeakRef(t2));
}
function c2(t2, e2, i2 = null, r = false) {
  const d = L();
  return r = null == e2 || r, a3.emit("apply-edits", { serviceUrl: t2, layerId: e2, gdbVersion: i2, mayReceiveServiceEdits: r, result: d.promise }), d;
}
var m = Symbol();
function p(t2) {
  return null != t2 && "object" == typeof t2 && m in t2;
}
function b(t2) {
  return null != t2 && "object" == typeof t2 && "gdbVersion" in t2;
}
function g(t2, e2, i2) {
  const s2 = new URL(t2).host, r = n.get(s2), d = (t3) => !t3 || t3 === r;
  return d(e2) && d(i2) || e2 === i2;
}
var F = (e2) => {
  var s2;
  let o4 = class extends e2 {
    constructor(...t2) {
      super(...t2), this[s2] = true, this._applyEditsHandler = (t3) => {
        const { serviceUrl: e3, layerId: s3, gdbVersion: r, mayReceiveServiceEdits: d, result: o5 } = t3, n2 = e3 === this.url, a4 = null != s3 && null != this.layerId && s3 === this.layerId, l2 = b(this), h2 = b(this) && g(e3, r, this.gdbVersion);
        if (!n2 || l2 && !h2 || !a4 && !d)
          return;
        const c3 = o5.then((t4) => {
          if (this.lastEditsEventDate = /* @__PURE__ */ new Date(), a4 && (t4.addedFeatures.length || t4.updatedFeatures.length || t4.deletedFeatures.length || t4.addedAttachments.length || t4.updatedAttachments.length || t4.deletedAttachments.length))
            return this.emit("edits", a(t4)), t4;
          const s4 = t4.editedFeatures?.find(({ layerId: t5 }) => t5 === this.layerId);
          if (s4) {
            const { adds: e4, updates: r2, deletes: d3 } = s4.editedFeatures, o6 = { edits: null, addedAttachments: [], deletedAttachments: [], updatedAttachments: [], addedFeatures: e4 ? e4.map(({ attributes: t5 }) => ({ objectId: this.objectIdField && t5[this.objectIdField], globalId: this.globalIdField && t5[this.globalIdField] })) : [], deletedFeatures: d3 ? d3.map(({ attributes: t5 }) => ({ objectId: this.objectIdField && t5[this.objectIdField], globalId: this.globalIdField && t5[this.globalIdField] })) : [], updatedFeatures: r2 ? r2.map(({ current: { attributes: t5 } }) => ({ objectId: this.objectIdField && t5[this.objectIdField], globalId: this.globalIdField && t5[this.globalIdField] })) : [], editedFeatures: a(t4.editedFeatures), exceededTransferLimit: false, historicMoment: a(t4.historicMoment) };
            return this.emit("edits", o6), o6;
          }
          const d2 = { edits: null, addedAttachments: [], deletedAttachments: [], updatedAttachments: [], addedFeatures: [], deletedFeatures: [], updatedFeatures: [], editedFeatures: a(t4.editedFeatures), exceededTransferLimit: false, historicMoment: a(t4.historicMoment) };
          return "historicMoment" in this && this._shouldUpdateHistoricMoment(e3, r, d2.historicMoment) && this.emit("edits", d2), d2;
        }).then((t4) => ("historicMoment" in this && this._shouldUpdateHistoricMoment(e3, r, t4.historicMoment) && (this.historicMoment = t4.historicMoment), t4));
        this.emit("apply-edits", { result: c3 });
      }, this._updateMomentHandler = (t3) => {
        const { serviceUrl: e3, gdbVersion: i2, moment: s3 } = t3, r = e3 === this.url, d = b(this), o5 = b(this) && g(e3, i2, this.gdbVersion), n2 = b(this) && !g(e3, this.gdbVersion, null);
        r && d && o5 && n2 && "historicMoment" in this && this.historicMoment !== s3 && (this.historicMoment = s3);
      }, this.when().then(() => {
        this.addHandles(l(this._applyEditsHandler)), "historicMoment" in this && this.addHandles(h(this._updateMomentHandler));
      }, () => {
      });
    }
    _shouldUpdateHistoricMoment(t2, e3, i2) {
      return "historicMoment" in this && this.historicMoment !== i2 && c(t2, e3);
    }
  };
  return s2 = m, e([y()], o4.prototype, "lastEditsEventDate", void 0), o4 = e([a2("esri.layers.mixins.EditBusLayer")], o4), o4;
};

export {
  t,
  o3 as o,
  i,
  c,
  c2,
  p,
  F
};
//# sourceMappingURL=chunk-ARJJP56N.js.map
