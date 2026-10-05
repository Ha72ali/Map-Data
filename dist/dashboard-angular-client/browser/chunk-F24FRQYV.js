import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/core/sql.js
function e(e2, n2) {
  return __async(this, null, function* () {
    const { WhereClause: r } = yield import("./chunk-AV77VZXF.js");
    return r.create(e2, n2);
  });
}
function n(e2, n2) {
  return "1=1" === e2 ? n2 ?? e2 : "1=1" === n2 ? e2 ?? n2 : null != e2 && "" !== e2 ? null != n2 && "" !== n2 ? `(${e2}) AND (${n2})` : e2 : n2;
}

export {
  e,
  n
};
//# sourceMappingURL=chunk-F24FRQYV.js.map
