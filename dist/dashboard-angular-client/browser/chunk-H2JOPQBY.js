import {
  n
} from "./chunk-7SW4NH22.js";
import {
  s as s2,
  s2 as s3
} from "./chunk-COAJS42I.js";
import {
  a as a2
} from "./chunk-YDDQQAFH.js";
import {
  i,
  u
} from "./chunk-4IFV6RW3.js";
import {
  x
} from "./chunk-WG5NWAUE.js";
import {
  d
} from "./chunk-ZGKHY7ZS.js";
import {
  b
} from "./chunk-FLPV6LMH.js";
import {
  K
} from "./chunk-FFM66Y5M.js";
import {
  f
} from "./chunk-2A6LCWAO.js";
import {
  w
} from "./chunk-BYMJUQYJ.js";
import {
  G
} from "./chunk-U4IA2IP4.js";
import {
  I
} from "./chunk-IMLUWAKH.js";
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
  h
} from "./chunk-NVGBLY2Q.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  has
} from "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/query/executeForExtent.js
function n2(n3, a3, e2) {
  return __async(this, null, function* () {
    const i2 = f(n3), s4 = yield x(i2, b.from(a3), __spreadValues({}, e2)), u2 = s4.data.extent;
    return !u2 || isNaN(u2.xmin) || isNaN(u2.ymin) || isNaN(u2.xmax) || isNaN(u2.ymax) ? { count: s4.data.count, extent: null } : { count: s4.data.count, extent: w.fromJSON(u2) };
  });
}

// node_modules/@arcgis/core/layers/graphics/sources/support/QueryTask.js
var j = class extends S {
  constructor(e2) {
    super(e2), this.dynamicDataSource = null, this.fieldsIndex = null, this.gdbVersion = null, this.infoFor3D = null, this.pbfSupported = false, this.queryAttachmentsSupported = false, this.sourceSpatialReference = null, this.url = null;
  }
  get parsedUrl() {
    return I(this.url);
  }
  execute(e2, t) {
    return __async(this, null, function* () {
      const r = yield this.executeJSON(e2, t);
      return this.featureSetFromJSON(e2, r, t);
    });
  }
  executeJSON(e2, t) {
    return __async(this, null, function* () {
      const r = this._normalizeQuery(e2), o = null != e2.outStatistics?.[0], s4 = has("featurelayer-pbf-statistics"), i2 = !o || s4;
      let u2;
      if (this.pbfSupported && i2)
        try {
          u2 = yield n(this.url, r, t);
        } catch (a3) {
          if ("query:parsing-pbf" !== a3.name)
            throw a3;
          this.pbfSupported = false;
        }
      return this.pbfSupported && i2 || (u2 = yield a2(this.url, r, t)), this._normalizeFields(u2.fields), u2;
    });
  }
  featureSetFromJSON(e2, t, r) {
    return __async(this, null, function* () {
      if (!this._queryIs3DObjectFormat(e2) || null == this.infoFor3D || !t.features)
        return d.fromJSON(t);
      const { meshFeatureSetFromJSON: s4 } = yield h(import("./chunk-AGPE4ARP.js"), r);
      return s4(e2, this.infoFor3D, t);
    });
  }
  executeForCount(e2, t) {
    return s2(this.url, this._normalizeQuery(e2), t);
  }
  executeForExtent(e2, t) {
    return n2(this.url, this._normalizeQuery(e2), t);
  }
  executeForIds(e2, t) {
    return s3(this.url, this._normalizeQuery(e2), t);
  }
  executeRelationshipQuery(e2, t) {
    return __async(this, null, function* () {
      const [{ default: r }, { executeRelationshipQuery: s4 }] = yield h(Promise.all([import("./chunk-7PXPCFLT.js"), import("./chunk-K2RGTB5B.js")]), t);
      return e2 = r.from(e2), (this.gdbVersion || this.dynamicDataSource) && ((e2 = e2.clone()).gdbVersion = e2.gdbVersion || this.gdbVersion, e2.dynamicDataSource = e2.dynamicDataSource || this.dynamicDataSource), s4(this.url, e2, t);
    });
  }
  executeRelationshipQueryForCount(e2, t) {
    return __async(this, null, function* () {
      const [{ default: r }, { executeRelationshipQueryForCount: s4 }] = yield h(Promise.all([import("./chunk-7PXPCFLT.js"), import("./chunk-K2RGTB5B.js")]), t);
      return e2 = r.from(e2), (this.gdbVersion || this.dynamicDataSource) && ((e2 = e2.clone()).gdbVersion = e2.gdbVersion || this.gdbVersion, e2.dynamicDataSource = e2.dynamicDataSource || this.dynamicDataSource), s4(this.url, e2, t);
    });
  }
  executeAttachmentQuery(e2, t) {
    return __async(this, null, function* () {
      const { executeAttachmentQuery: r, fetchAttachments: s4, processAttachmentQueryResult: i2 } = yield h(import("./chunk-4P4VBMEF.js"), t), u2 = f(this.url);
      return i2(u2, yield this.queryAttachmentsSupported ? r(u2, e2, t) : s4(u2, e2, t));
    });
  }
  executeTopFeaturesQuery(e2, t) {
    return __async(this, null, function* () {
      const { executeTopFeaturesQuery: r } = yield h(import("./chunk-EAEJLMZP.js"), t);
      return r(this.parsedUrl, e2, this.sourceSpatialReference, t);
    });
  }
  executeForTopIds(e2, t) {
    return __async(this, null, function* () {
      const { executeForTopIds: r } = yield h(import("./chunk-5NCRTK6U.js"), t);
      return r(this.parsedUrl, e2, t);
    });
  }
  executeForTopExtents(e2, t) {
    return __async(this, null, function* () {
      const { executeForTopExtents: r } = yield h(import("./chunk-KXPGPHFZ.js"), t);
      return r(this.parsedUrl, e2, t);
    });
  }
  executeForTopCount(e2, t) {
    return __async(this, null, function* () {
      const { executeForTopCount: r } = yield h(import("./chunk-LOASHKRA.js"), t);
      return r(this.parsedUrl, e2, t);
    });
  }
  _normalizeQuery(e2) {
    let t = b.from(e2);
    t.sourceSpatialReference = t.sourceSpatialReference || this.sourceSpatialReference, (this.gdbVersion || this.dynamicDataSource) && (t = t === e2 ? t.clone() : t, t.gdbVersion = e2.gdbVersion || this.gdbVersion, t.dynamicDataSource = e2.dynamicDataSource ? K.from(e2.dynamicDataSource) : this.dynamicDataSource);
    const { infoFor3D: o } = this;
    if (null != o && this._queryIs3DObjectFormat(e2)) {
      t = t === e2 ? t.clone() : t, t.formatOf3DObjects = null;
      const { supportedFormats: s4, queryFormats: i2 } = o, u2 = u("model/gltf-binary", s4) ?? i("glb", s4), p = u("model/gltf+json", s4) ?? i("gltf", s4);
      for (const e3 of i2) {
        if (e3 === u2) {
          t.formatOf3DObjects = e3;
          break;
        }
        e3 !== p || t.formatOf3DObjects || (t.formatOf3DObjects = e3);
      }
      if (!t.formatOf3DObjects)
        throw new s("query:unsupported-3d-query-formats", "Could not find any supported 3D object query format. Only supported formats are 3D_glb and 3D_gltf");
      if (t.outSpatialReference && !G(t.outSpatialReference, this.sourceSpatialReference))
        throw new s("query:unsupported-out-spatial-reference", "3D object feature services do not support projection of geometries");
      if (null == t.outFields || !t.outFields.includes("*")) {
        t = t === e2 ? t.clone() : t, null == t.outFields && (t.outFields = []);
        const { originX: r, originY: s5, originZ: i3, translationX: u3, translationY: a3, translationZ: n3, scaleX: c, scaleY: p2, scaleZ: l, rotationX: m, rotationY: f2, rotationZ: y2, rotationDeg: d2 } = o.transformFieldRoles;
        t.outFields.push(r, s5, i3, u3, a3, n3, c, p2, l, m, f2, y2, d2);
      }
    }
    return t;
  }
  _normalizeFields(e2) {
    if (null != this.fieldsIndex && null != e2)
      for (const t of e2) {
        const e3 = this.fieldsIndex.get(t.name);
        e3 && Object.assign(t, e3.toJSON());
      }
  }
  _queryIs3DObjectFormat(e2) {
    return null != this.infoFor3D && true === e2.returnGeometry && "xyFootprint" !== e2.multipatchOption && !e2.outStatistics;
  }
};
e([y({ type: K })], j.prototype, "dynamicDataSource", void 0), e([y()], j.prototype, "fieldsIndex", void 0), e([y()], j.prototype, "gdbVersion", void 0), e([y()], j.prototype, "infoFor3D", void 0), e([y({ readOnly: true })], j.prototype, "parsedUrl", null), e([y()], j.prototype, "pbfSupported", void 0), e([y()], j.prototype, "queryAttachmentsSupported", void 0), e([y()], j.prototype, "sourceSpatialReference", void 0), e([y({ type: String })], j.prototype, "url", void 0), j = e([a("esri.layers.graphics.sources.support.QueryTask")], j);
var x2 = j;

export {
  x2 as x
};
//# sourceMappingURL=chunk-H2JOPQBY.js.map
