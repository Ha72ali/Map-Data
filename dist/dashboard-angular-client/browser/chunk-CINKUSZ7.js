import {
  S,
  l,
  o
} from "./chunk-23OIU3O7.js";
import {
  t
} from "./chunk-7XQIAUGY.js";
import {
  a
} from "./chunk-BTPDOHVM.js";
import {
  has
} from "./chunk-7JFKWLN7.js";
import {
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/graphics/sources/support/clientSideDefaults.js
function o2(t2) {
  return { renderer: { type: "simple", symbol: "esriGeometryPoint" === t2 || "esriGeometryMultipoint" === t2 ? l : "esriGeometryPolyline" === t2 ? o : S } };
}
var u = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/;
var n = 1;
function i(t2, s) {
  if (has("esri-csp-restrictions"))
    return () => __spreadValues({ [s]: null }, t2);
  try {
    let r = `this${a2(s)} = null;`;
    for (const s2 in t2) {
      r += `this${a2(s2)} = ${JSON.stringify(t2[s2])};`;
    }
    const e = new Function(`
      return class AttributesClass$${n++} {
        constructor() {
          ${r};
        }
      }
    `)();
    return () => new e();
  } catch (r) {
    return () => __spreadValues({ [s]: null }, t2);
  }
}
function a2(t2) {
  return u.test(t2) ? `.${t2}` : `["${t2}"]`;
}
function c(s = {}) {
  return [{ name: "New Feature", description: "", prototype: { attributes: a(s) } }];
}
function l2(t2, r) {
  return { analytics: { supportsCacheHint: false }, attachment: null, data: { isVersioned: false, supportsAttachment: false, supportsM: false, supportsZ: t2 }, metadata: { supportsAdvancedFieldProperties: false }, operations: { supportsCalculate: false, supportsTruncate: false, supportsValidateSql: false, supportsAdd: r, supportsDelete: r, supportsEditing: r, supportsChangeTracking: false, supportsQuery: true, supportsQueryAnalytics: false, supportsQueryAttachments: false, supportsQueryTopFeatures: false, supportsResizeAttachments: false, supportsSync: false, supportsUpdate: r, supportsExceedsLimitStatistics: true, supportsAsyncConvert3D: false }, query: t, queryRelated: { supportsCount: true, supportsOrderBy: true, supportsPagination: true, supportsCacheHint: false }, queryTopFeatures: { supportsCacheHint: false }, editing: { supportsGeometryUpdate: r, supportsGlobalId: false, supportsReturnServiceEditsInSourceSpatialReference: false, supportsRollbackOnFailure: false, supportsUpdateWithoutM: false, supportsUploadWithItemId: false, supportsDeleteByAnonymous: false, supportsDeleteByOthers: false, supportsUpdateByAnonymous: false, supportsUpdateByOthers: false, supportsAsyncApplyEdits: false, zDefault: void 0 } };
}

export {
  o2 as o,
  i,
  c,
  l2 as l
};
//# sourceMappingURL=chunk-CINKUSZ7.js.map
