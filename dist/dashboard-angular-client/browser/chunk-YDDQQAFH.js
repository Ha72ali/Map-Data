import {
  c
} from "./chunk-WG5NWAUE.js";
import {
  d
} from "./chunk-ZGKHY7ZS.js";
import {
  b
} from "./chunk-FLPV6LMH.js";
import {
  f
} from "./chunk-2A6LCWAO.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/query/executeQueryJSON.js
function s(r, t, e) {
  return __async(this, null, function* () {
    const s2 = yield a(r, t, e);
    return d.fromJSON(s2);
  });
}
function a(o, s2, a2) {
  return __async(this, null, function* () {
    const n = f(o), i = __spreadValues({}, a2), p = b.from(s2), { data: u } = yield c(n, p, p.sourceSpatialReference, i);
    return u;
  });
}

export {
  s,
  a
};
//# sourceMappingURL=chunk-YDDQQAFH.js.map
