import {
  a
} from "./chunk-BVANPTED.js";
import {
  t
} from "./chunk-QEKSQ5XF.js";
import {
  S,
  U,
  m
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

// node_modules/@arcgis/core/rest/query/operations/queryAttachments.js
function s(t2) {
  const o = t2.toJSON();
  return o.attachmentTypes && (o.attachmentTypes = o.attachmentTypes.join(",")), o.keywords && (o.keywords = o.keywords.join(",")), o.globalIds && (o.globalIds = o.globalIds.join(",")), o.objectIds && (o.objectIds = o.objectIds.join(",")), o.size && (o.size = o.size.join(",")), o;
}
function a2(o, n) {
  const s2 = {};
  for (const a3 of n) {
    const { parentObjectId: n2, parentGlobalId: c2, attachmentInfos: m3 } = a3;
    for (const a4 of m3) {
      const { id: m4 } = a4, p = S(m(`${o.path}/${n2}/attachments/${m4}`)), i = a.fromJSON(a4);
      i.set({ url: p, parentObjectId: n2, parentGlobalId: c2 }), s2[n2] ? s2[n2].push(i) : s2[n2] = [i];
    }
  }
  return s2;
}
function c(t2, e, r) {
  let a3 = { query: t(__spreadValues(__spreadProps(__spreadValues({}, t2.query), { f: "json" }), s(e))) };
  return r && (a3 = __spreadProps(__spreadValues(__spreadValues({}, r), a3), { query: __spreadValues(__spreadValues({}, r.query), a3.query) })), U(t2.path + "/queryAttachments", a3).then((t3) => t3.data.attachmentGroups);
}
function m2(t2, e, n) {
  return __async(this, null, function* () {
    const { objectIds: r } = e, s2 = [];
    for (const a3 of r)
      s2.push(U(t2.path + "/" + a3 + "/attachments", n));
    return Promise.all(s2).then((t3) => r.map((o, e2) => ({ parentObjectId: o, attachmentInfos: t3[e2].data.attachmentInfos })));
  });
}
export {
  c as executeAttachmentQuery,
  m2 as fetchAttachments,
  a2 as processAttachmentQueryResult
};
//# sourceMappingURL=chunk-4P4VBMEF.js.map
