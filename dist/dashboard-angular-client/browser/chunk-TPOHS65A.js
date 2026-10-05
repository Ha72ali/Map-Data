import {
  p
} from "./chunk-5EK2HSR2.js";
import {
  x
} from "./chunk-JJDQYKYN.js";
import {
  _
} from "./chunk-FKXAUXOY.js";
import {
  S
} from "./chunk-AZH5CNQI.js";
import {
  C,
  a as a3
} from "./chunk-V4F7XXO4.js";
import {
  o
} from "./chunk-BYMJUQYJ.js";
import {
  r
} from "./chunk-YKH4U5BK.js";
import {
  K,
  N,
  U,
  W,
  t2 as t
} from "./chunk-IMLUWAKH.js";
import {
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
  b,
  s as s3
} from "./chunk-NVGBLY2Q.js";
import {
  u
} from "./chunk-V7ZPXZOX.js";
import {
  n2 as n,
  s,
  s2
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/mixins/PortalLayer.js
var j = (j2) => {
  let _2 = class extends j2 {
    constructor() {
      super(...arguments), this.resourceReferences = { portalItem: null, paths: [] }, this.userHasEditingPrivileges = true, this.userHasFullEditingPrivileges = false, this.userHasUpdateItemPrivileges = false;
    }
    destroy() {
      this.portalItem = u(this.portalItem), this.resourceReferences.portalItem = null, this.resourceReferences.paths.length = 0;
    }
    set portalItem(t2) {
      t2 !== this._get("portalItem") && (this.removeOrigin("portal-item"), this._set("portalItem", t2));
    }
    readPortalItem(t2, e2, r2) {
      if (e2.itemId)
        return new S({ id: e2.itemId, portal: r2?.portal });
    }
    writePortalItem(t2, e2) {
      t2?.id && (e2.itemId = t2.id);
    }
    loadFromPortal(t2, e2) {
      return __async(this, null, function* () {
        if (this.portalItem?.id)
          try {
            const { load: r2 } = yield import("./chunk-AEDIFOAG.js");
            return s3(e2), yield r2({ instance: this, supportedTypes: t2.supportedTypes, validateItem: t2.validateItem, supportsData: t2.supportsData, layerModuleTypeMap: t2.layerModuleTypeMap }, e2);
          } catch (r2) {
            throw b(r2) || n.getLogger(this).warn(`Failed to load layer (${this.title}, ${this.id}) portal item (${this.portalItem.id})
  ${r2}`), r2;
          }
      });
    }
    finishLoadEditablePortalLayer(t2) {
      return __async(this, null, function* () {
        this._set("userHasEditingPrivileges", yield this._fetchUserHasEditingPrivileges(t2).catch((t3) => (a2(t3), true)));
      });
    }
    setUserPrivileges(t2, r2) {
      return __async(this, null, function* () {
        if (!s.userPrivilegesApplied)
          return this.finishLoadEditablePortalLayer(r2);
        if (this.url)
          try {
            const { features: { edit: e2, fullEdit: s4 }, content: { updateItem: i } } = yield this._fetchUserPrivileges(t2, r2);
            this._set("userHasEditingPrivileges", e2), this._set("userHasFullEditingPrivileges", s4), this._set("userHasUpdateItemPrivileges", i);
          } catch (s4) {
            a2(s4);
          }
      });
    }
    _fetchUserPrivileges(t2, e2) {
      return __async(this, null, function* () {
        let s4 = this.portalItem;
        if (!t2 || !s4 || !s4.loaded || s4.sourceUrl)
          return this._fetchFallbackUserPrivileges(e2);
        const i = t2 === s4.id;
        if (i && s4.portal.user)
          return p(s4);
        let o2, a4;
        if (i)
          o2 = s4.portal.url;
        else
          try {
            o2 = yield x(this.url, e2);
          } catch (d) {
            a2(d);
          }
        if (!o2 || !W(o2, s4.portal.url))
          return this._fetchFallbackUserPrivileges(e2);
        try {
          const t3 = null != e2 ? e2.signal : null;
          a4 = yield t?.getCredential(`${o2}/sharing`, { prompt: false, signal: t3 });
        } catch (d) {
          a2(d);
        }
        const l = true, n2 = false, p2 = false;
        if (!a4)
          return { features: { edit: l, fullEdit: n2 }, content: { updateItem: p2 } };
        try {
          if (i ? yield s4.reload() : (s4 = new S({ id: t2, portal: { url: o2 } }), yield s4.load(e2)), s4.portal.user)
            return p(s4);
        } catch (d) {
          a2(d);
        }
        return { features: { edit: l, fullEdit: n2 }, content: { updateItem: p2 } };
      });
    }
    _fetchFallbackUserPrivileges(t2) {
      return __async(this, null, function* () {
        let e2 = true;
        try {
          e2 = yield this._fetchUserHasEditingPrivileges(t2);
        } catch (r2) {
          a2(r2);
        }
        return { features: { edit: e2, fullEdit: false }, content: { updateItem: false } };
      });
    }
    _fetchUserHasEditingPrivileges(t2) {
      return __async(this, null, function* () {
        const e2 = this.url ? t?.findCredential(this.url) : null;
        if (!e2)
          return true;
        const s4 = E.credential === e2 ? E.user : yield this._fetchEditingUser(t2);
        return E.credential = e2, E.user = s4, null == s4?.privileges || s4.privileges.includes("features:user:edit");
      });
    }
    _fetchEditingUser(t2) {
      return __async(this, null, function* () {
        const e2 = this.portalItem?.portal?.user;
        if (e2)
          return e2;
        const o2 = t?.findServerInfo(this.url ?? "");
        if (!o2?.owningSystemUrl)
          return null;
        const a4 = `${o2.owningSystemUrl}/sharing/rest`, l = C.getDefault();
        if (l && l.loaded && K(l.restUrl) === K(a4))
          return l.user;
        const n2 = `${a4}/community/self`, p2 = null != t2 ? t2.signal : null, u2 = yield _(U(n2, { authMode: "no-prompt", query: { f: "json" }, signal: p2 }));
        return u2.ok ? a3.fromJSON(u2.value.data) : null;
      });
    }
    read(t2, e2) {
      e2 && (e2.layer = this), super.read(t2, e2);
    }
    write(t2, e2) {
      const r2 = e2?.portal, s4 = this.portalItem?.id && (this.portalItem.portal || C.getDefault());
      return r2 && s4 && !N(s4.restUrl, r2.restUrl) ? (e2.messages && e2.messages.push(new s2("layer:cross-portal", `The layer '${this.title} (${this.id})' cannot be persisted because it refers to an item on a different portal than the one being saved to. To save, set layer.portalItem to null or save to the same portal as the item associated with the layer`, { layer: this })), null) : super.write(t2, __spreadProps(__spreadValues({}, e2), { layer: this }));
    }
  };
  return e([y({ type: S })], _2.prototype, "portalItem", null), e([o("web-document", "portalItem", ["itemId"])], _2.prototype, "readPortalItem", null), e([r("web-document", "portalItem", { itemId: { type: String } })], _2.prototype, "writePortalItem", null), e([y({ clonable: false })], _2.prototype, "resourceReferences", void 0), e([y({ type: Boolean, readOnly: true })], _2.prototype, "userHasEditingPrivileges", void 0), e([y({ type: Boolean, readOnly: true })], _2.prototype, "userHasFullEditingPrivileges", void 0), e([y({ type: Boolean, readOnly: true })], _2.prototype, "userHasUpdateItemPrivileges", void 0), _2 = e([a("esri.layers.mixins.PortalLayer")], _2), _2;
};
var E = { credential: null, user: null };

export {
  j
};
//# sourceMappingURL=chunk-TPOHS65A.js.map
