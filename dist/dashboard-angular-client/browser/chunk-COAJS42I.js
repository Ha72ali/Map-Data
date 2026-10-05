import {
  S,
  p
} from "./chunk-WG5NWAUE.js";
import {
  b
} from "./chunk-FLPV6LMH.js";
import {
  f
} from "./chunk-2A6LCWAO.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/query/executeForCount.js
function s(s3, i, m) {
  return __async(this, null, function* () {
    const n = f(s3), { data: p2 } = yield S(n, b.from(i), m);
    return p2.count;
  });
}

// node_modules/@arcgis/core/rest/query/executeForIds.js
function s2(s3, i, m) {
  return __async(this, null, function* () {
    const p2 = f(s3), { data: a } = yield p(p2, b.from(i), m);
    return a.objectIds;
  });
}

export {
  s,
  s2
};
//# sourceMappingURL=chunk-COAJS42I.js.map
