import {
  l
} from "./chunk-XAK2DL7U.js";
import {
  B2 as B,
  G2 as G,
  He,
  P,
  Q,
  U,
  a,
  ae,
  r as r2
} from "./chunk-AKYAOHU7.js";
import "./chunk-DEKAJW36.js";
import "./chunk-G6ITGPKN.js";
import {
  O,
  r2 as r
} from "./chunk-CB6ZC7DY.js";
import {
  m
} from "./chunk-OCRS2GWK.js";
import "./chunk-OXKKAHFH.js";
import "./chunk-KDBJKPA2.js";
import "./chunk-7LQIO4JZ.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-JJ2NMOGF.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-4BCUADAV.js";
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/arcade/functions/featuresetstats.js
function m2(n, t, e, a2) {
  return __async(this, null, function* () {
    if (1 === e.length) {
      if (U(e[0]))
        return l(n, e[0], P(e[1], -1));
      if (Q(e[0]))
        return l(n, e[0].toArray(), P(e[1], -1));
    } else if (2 === e.length) {
      if (U(e[0]))
        return l(n, e[0], P(e[1], -1));
      if (Q(e[0]))
        return l(n, e[0].toArray(), P(e[1], -1));
      if (B(e[0])) {
        const r3 = yield e[0].load(), i = yield y(O.create(e[1], r3.getFieldsIndex(), r3.dateFieldsTimeZoneDefaultUTC), a2, t);
        return g(t, yield e[0].calculateStatistic(n, i, P(e[2], 1e3), t.abortSignal));
      }
    } else if (3 === e.length && B(e[0])) {
      const r3 = yield e[0].load(), i = yield y(O.create(e[1], r3.getFieldsIndex(), r3.dateFieldsTimeZoneDefaultUTC), a2, t);
      return g(t, yield e[0].calculateStatistic(n, i, P(e[2], 1e3), t.abortSignal));
    }
    return l(n, e, -1);
  });
}
function g(t, e) {
  return e instanceof r ? m.fromReaderAsTimeStampOffset(e.toStorageFormat()) : e instanceof Date ? m.dateJSAndZoneToArcadeDate(e, He(t)) : e;
}
function y(n, t, e) {
  return __async(this, null, function* () {
    const a2 = n.getVariables();
    if (a2.length > 0) {
      const r3 = [];
      for (let n2 = 0; n2 < a2.length; n2++) {
        const i2 = { name: a2[n2] };
        r3.push(yield t.evaluateIdentifier(e, i2));
      }
      const i = {};
      for (let n2 = 0; n2 < a2.length; n2++)
        i[a2[n2]] = r3[n2];
      return n.parameters = i, n;
    }
    return n;
  });
}
function A(n) {
  "async" === n.mode && (n.functions.stdev = function(t, e) {
    return n.standardFunctionAsync(t, e, (e2, a2, r3) => m2("stdev", t, r3, n));
  }, n.functions.variance = function(t, e) {
    return n.standardFunctionAsync(t, e, (e2, a2, r3) => m2("variance", t, r3, n));
  }, n.functions.average = function(t, e) {
    return n.standardFunctionAsync(t, e, (e2, a2, r3) => m2("mean", t, r3, n));
  }, n.functions.mean = function(t, e) {
    return n.standardFunctionAsync(t, e, (e2, a2, r3) => m2("mean", t, r3, n));
  }, n.functions.sum = function(t, e) {
    return n.standardFunctionAsync(t, e, (e2, a2, r3) => m2("sum", t, r3, n));
  }, n.functions.min = function(t, e) {
    return n.standardFunctionAsync(t, e, (e2, a2, r3) => m2("min", t, r3, n));
  }, n.functions.max = function(t, e) {
    return n.standardFunctionAsync(t, e, (e2, a2, r3) => m2("max", t, r3, n));
  }, n.functions.count = function(c, u) {
    return n.standardFunctionAsync(c, u, (n2, f, d) => __async(this, null, function* () {
      if (ae(d, 1, 1, c, u), B(d[0]))
        return d[0].count(n2.abortSignal);
      if (U(d[0]) || G(d[0]))
        return d[0].length;
      if (Q(d[0]))
        return d[0].length();
      throw new a(c, r2.InvalidParameter, u);
    }));
  });
}
export {
  A as registerFunctions
};
//# sourceMappingURL=chunk-6LRAKZW6.js.map
