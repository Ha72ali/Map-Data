import {
  t
} from "./chunk-QEKSQ5XF.js";
import {
  d as d2
} from "./chunk-ZGKHY7ZS.js";
import {
  d as d3
} from "./chunk-5ETZQF6U.js";
import "./chunk-VFY3HP2G.js";
import "./chunk-ZQQ553GQ.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-YTC5APIA.js";
import "./chunk-4AU4YV3O.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-FTWQYERS.js";
import "./chunk-UER5KWEB.js";
import "./chunk-FFM66Y5M.js";
import "./chunk-5YCNWSDC.js";
import "./chunk-OXKKAHFH.js";
import {
  f
} from "./chunk-2A6LCWAO.js";
import "./chunk-KDBJKPA2.js";
import "./chunk-MACNJI7G.js";
import "./chunk-QNED4CTP.js";
import "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-JJ2NMOGF.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-GPPG4D7S.js";
import "./chunk-V7FXKYLS.js";
import "./chunk-2AR2ZIQP.js";
import "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import {
  d2 as d
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  U
} from "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/query/operations/queryRelatedRecords.js
function r(e, o) {
  const r2 = e.toJSON();
  return r2.objectIds && (r2.objectIds = r2.objectIds.join(",")), r2.orderByFields && (r2.orderByFields = r2.orderByFields.join(",")), r2.outFields && !o?.returnCountOnly ? r2.outFields.includes("*") ? r2.outFields = "*" : r2.outFields = r2.outFields.join(",") : delete r2.outFields, r2.outSR && (r2.outSR = d(r2.outSR)), r2.dynamicDataSource && (r2.layer = JSON.stringify({ source: r2.dynamicDataSource }), delete r2.dynamicDataSource), r2;
}
function s(e, t2, o) {
  return __async(this, null, function* () {
    const r2 = yield a(e, t2, o), s2 = r2.data, n3 = s2.geometryType, d4 = s2.spatialReference, c = {};
    for (const a2 of s2.relatedRecordGroups) {
      const e2 = { fields: void 0, objectIdFieldName: void 0, geometryType: n3, spatialReference: d4, hasZ: !!s2.hasZ, hasM: !!s2.hasM, features: a2.relatedRecords };
      if (null != a2.objectId)
        c[a2.objectId] = e2;
      else
        for (const t3 of Object.keys(a2))
          "relatedRecords" !== t3 && (c[a2[t3]] = e2);
    }
    return __spreadProps(__spreadValues({}, r2), { data: c });
  });
}
function n(e, t2, o) {
  return __async(this, null, function* () {
    const r2 = yield a(e, t2, o, { returnCountOnly: true }), s2 = r2.data, n3 = {};
    for (const a2 of s2.relatedRecordGroups)
      null != a2.objectId && (n3[a2.objectId] = a2.count);
    return __spreadProps(__spreadValues({}, r2), { data: n3 });
  });
}
function a(_0, _1) {
  return __async(this, arguments, function* (t2, s2, n3 = {}, a2) {
    const d4 = t(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, t2.query), { f: "json" }), a2), r(s2, a2)));
    return U(t2.path + "/queryRelatedRecords", __spreadProps(__spreadValues({}, n3), { query: __spreadValues(__spreadValues({}, n3.query), d4) }));
  });
}

// node_modules/@arcgis/core/rest/query/executeRelationshipQuery.js
function n2(e, n3, u2) {
  return __async(this, null, function* () {
    n3 = d3.from(n3);
    const a2 = f(e);
    return s(a2, n3, u2).then((t2) => {
      const r2 = t2.data, e2 = {};
      return Object.keys(r2).forEach((t3) => e2[t3] = d2.fromJSON(r2[t3])), e2;
    });
  });
}
function u(r2, o, n3) {
  return __async(this, null, function* () {
    o = d3.from(o);
    const u2 = f(r2);
    return n(u2, o, __spreadValues({}, n3)).then((t2) => t2.data);
  });
}
export {
  n2 as executeRelationshipQuery,
  u as executeRelationshipQueryForCount
};
//# sourceMappingURL=chunk-K2RGTB5B.js.map
