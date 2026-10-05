import {
  f2 as f,
  u
} from "./chunk-ZG74AK2O.js";
import "./chunk-LTC362R2.js";
import "./chunk-EFRWOG4W.js";
import {
  B2 as B,
  Fe,
  a,
  ae,
  me,
  r
} from "./chunk-AKYAOHU7.js";
import "./chunk-DEKAJW36.js";
import {
  O,
  R,
  S,
  h,
  m,
  p,
  x
} from "./chunk-G7GA3CGH.js";
import "./chunk-G6ITGPKN.js";
import "./chunk-EYXQMFFP.js";
import "./chunk-C2FYYQ2H.js";
import "./chunk-22FS2DB4.js";
import "./chunk-CSIYRPBQ.js";
import "./chunk-CB6ZC7DY.js";
import {
  s
} from "./chunk-OCRS2GWK.js";
import "./chunk-F3PKGTLV.js";
import "./chunk-PSHPOA5E.js";
import "./chunk-7B5IT5ZP.js";
import "./chunk-OXKKAHFH.js";
import "./chunk-7JFZMNXX.js";
import "./chunk-KDBJKPA2.js";
import "./chunk-MACNJI7G.js";
import "./chunk-7LQIO4JZ.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
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
import "./chunk-BZEDVIAT.js";
import "./chunk-4BCUADAV.js";
import {
  n
} from "./chunk-BYMJUQYJ.js";
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

// node_modules/@arcgis/core/arcade/functions/featuresetgeom.js
function h2(e) {
  return e instanceof n;
}
function S2(i, a2, c, S3) {
  return S3(i, a2, (S4, R3, v) => __async(this, null, function* () {
    if (v.length < 2)
      throw new a(i, r.WrongNumberOfParameters, a2);
    if (null === (v = Fe(v))[0] && null === v[1])
      return false;
    if (B(v[0])) {
      if (v[1] instanceof n)
        return new f({ parentfeatureset: v[0], relation: c, relationGeom: v[1] });
      if (null === v[1])
        return new u({ parentfeatureset: v[0] });
      throw new a(i, r.InvalidParameter, a2);
    }
    if (h2(v[0])) {
      if (h2(v[1])) {
        switch (c) {
          case "esriSpatialRelEnvelopeIntersects":
            return h(s(v[0]), s(v[1]));
          case "esriSpatialRelIntersects":
            return h(v[0], v[1]);
          case "esriSpatialRelContains":
            return p(v[0], v[1]);
          case "esriSpatialRelOverlaps":
            return O(v[0], v[1]);
          case "esriSpatialRelWithin":
            return x(v[0], v[1]);
          case "esriSpatialRelTouches":
            return S(v[0], v[1]);
          case "esriSpatialRelCrosses":
            return m(v[0], v[1]);
        }
        throw new a(i, r.InvalidParameter, a2);
      }
      if (B(v[1]))
        return new f({ parentfeatureset: v[1], relation: c, relationGeom: v[0] });
      if (null === v[1])
        return false;
      throw new a(i, r.InvalidParameter, a2);
    }
    if (null === v[0]) {
      if (B(v[1]))
        return new u({ parentfeatureset: v[1] });
      if (v[1] instanceof n || null === v[1])
        return false;
    }
    throw new a(i, r.InvalidParameter, a2);
  }));
}
function R2(t) {
  "async" === t.mode && (t.functions.intersects = function(e, n2) {
    return S2(e, n2, "esriSpatialRelIntersects", t.standardFunctionAsync);
  }, t.functions.envelopeintersects = function(e, n2) {
    return S2(e, n2, "esriSpatialRelEnvelopeIntersects", t.standardFunctionAsync);
  }, t.signatures.push({ name: "envelopeintersects", min: 2, max: 2 }), t.functions.contains = function(e, n2) {
    return S2(e, n2, "esriSpatialRelContains", t.standardFunctionAsync);
  }, t.functions.overlaps = function(e, n2) {
    return S2(e, n2, "esriSpatialRelOverlaps", t.standardFunctionAsync);
  }, t.functions.within = function(e, n2) {
    return S2(e, n2, "esriSpatialRelWithin", t.standardFunctionAsync);
  }, t.functions.touches = function(e, n2) {
    return S2(e, n2, "esriSpatialRelTouches", t.standardFunctionAsync);
  }, t.functions.crosses = function(e, n2) {
    return S2(e, n2, "esriSpatialRelCrosses", t.standardFunctionAsync);
  }, t.functions.relate = function(u2, f2) {
    return t.standardFunctionAsync(u2, f2, (t2, p2, m2) => __async(this, null, function* () {
      if (m2 = Fe(m2), ae(m2, 3, 3, u2, f2), h2(m2[0]) && h2(m2[1]))
        return R(m2[0], m2[1], me(m2[2]));
      if (m2[0] instanceof n && null === m2[1])
        return false;
      if (m2[1] instanceof n && null === m2[0])
        return false;
      if (B(m2[0]) && null === m2[1])
        return new u({ parentfeatureset: m2[0] });
      if (B(m2[1]) && null === m2[0])
        return new u({ parentfeatureset: m2[1] });
      if (B(m2[0]) && m2[1] instanceof n)
        return m2[0].relate(m2[1], me(m2[2]));
      if (B(m2[1]) && m2[0] instanceof n)
        return m2[1].relate(m2[0], me(m2[2]));
      if (null === m2[0] && null === m2[1])
        return false;
      throw new a(u2, r.InvalidParameter, f2);
    }));
  });
}
export {
  R2 as registerFunctions
};
//# sourceMappingURL=chunk-IOBLLGQQ.js.map
