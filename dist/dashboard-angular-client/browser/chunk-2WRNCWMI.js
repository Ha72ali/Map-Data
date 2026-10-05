import {
  s as s2
} from "./chunk-FQAOXN34.js";
import {
  c,
  m,
  p as p2,
  t as t2
} from "./chunk-JHPIERPP.js";
import {
  l
} from "./chunk-5YOZGPKT.js";
import {
  t
} from "./chunk-QV4LVV63.js";
import {
  N
} from "./chunk-EFRWOG4W.js";
import {
  $,
  E2 as E,
  G2 as G,
  He,
  K,
  P,
  U,
  X,
  a,
  ae,
  ee,
  me,
  q,
  r,
  re,
  te
} from "./chunk-AKYAOHU7.js";
import "./chunk-DEKAJW36.js";
import "./chunk-G6ITGPKN.js";
import "./chunk-OCRS2GWK.js";
import {
  n as n2,
  p
} from "./chunk-LOO3IZZ3.js";
import "./chunk-OXKKAHFH.js";
import "./chunk-IWDEV6HE.js";
import "./chunk-2A6LCWAO.js";
import "./chunk-KDBJKPA2.js";
import {
  K as K2,
  W,
  _
} from "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-7LQIO4JZ.js";
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
import "./chunk-BZEDVIAT.js";
import {
  S
} from "./chunk-AZH5CNQI.js";
import {
  C
} from "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import {
  R,
  d,
  n
} from "./chunk-BYMJUQYJ.js";
import {
  f
} from "./chunk-YKH4U5BK.js";
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
import {
  s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/arcade/functions/knowledgegraph.js
var F = null;
function J(r2) {
  return __async(this, null, function* () {
    const t3 = s.geometryServiceUrl ?? "";
    if (!t3) {
      _() || (yield W());
      for (const e of r2)
        e.container[e.indexer] = K2(e.container[e.indexer], f.WGS84);
      return;
    }
    const n3 = r2.map((e) => e.container[e.indexer]), o = new p({ geometries: n3, outSpatialReference: f.WGS84 }), a2 = yield n2(t3, o);
    for (let e = 0; e < a2.length; e++) {
      const t4 = r2[e];
      t4.container[t4.indexer] = a2[e];
    }
  });
}
function M(e, r2) {
  return __async(this, null, function* () {
    const t3 = new S({ portal: e, id: r2 });
    return yield t3.load(), null === F && (F = yield import("./chunk-KVBJUNLP.js")), yield F.fetchKnowledgeGraph(t3.url);
  });
}
function Q(e, r2, t3, n3, o) {
  if (null === e)
    return null;
  if (G(e) || E(e))
    return e;
  if (X(e))
    return e.toJSDate();
  if (X(e))
    return e.toJSDate();
  if (ee(e))
    return e.toStorageFormat();
  if (te(e))
    return e.toStorageString();
  if (K(e)) {
    const a2 = {};
    for (const i of e.keys())
      a2[i] = Q(e.field(i), r2, t3, n3, o), a2[i] instanceof n && o.push({ container: a2, indexer: i });
    return a2;
  }
  if (U(e)) {
    const a2 = e.map((e2) => Q(e2, r2, t3, n3, o));
    for (let e2 = 0; e2 < a2.length; e2++)
      a2[e2] instanceof n && o.push({ container: a2, indexer: e2 });
    return a2;
  }
  return q(e) ? e.spatialReference.isWGS84 ? e : e.spatialReference.isWebMercator && r2 ? R(e) : e : void 0;
}
function E2(e, r2) {
  if (!e)
    return e;
  if (e.spatialReference.isWGS84 && r2.spatialReference.isWebMercator)
    return d(e);
  if (e.spatialReference.equals(r2.spatialReference))
    return e;
  throw new a(r2, r.WrongSpatialReference, null);
}
function K3(e, r2) {
  if (!e)
    return null;
  const t3 = {};
  for (const n3 in e)
    t3[n3] = V(e[n3], r2);
  return t3;
}
function V(e, r2) {
  return null === e ? null : U(e) ? e.map((e2) => V(e2, r2)) : e instanceof m ? { graphTypeName: e.typeName, id: e.id, graphType: "entity", properties: K3(e.properties, r2) } : e instanceof t2 ? { graphType: "object", properties: K3(e.properties, r2) } : e instanceof p2 ? { graphTypeName: e.typeName, id: e.id, graphType: "relationship", originId: e.originId ?? null, destinationId: e.destinationId ?? null, properties: K3(e.properties, r2) } : e instanceof c ? { graphType: "path", path: e.path ? e.path.map((e2) => V(e2, r2)) : null } : q(e) ? E2(e, r2) : G(e) || E(e) || re(e) ? e : null;
}
function C2(e) {
  "async" === e.mode && (e.functions.knowledgegraphbyportalitem = function(t3, p3) {
    return e.standardFunctionAsync(t3, p3, (e2, l2, c2) => {
      if (ae(c2, 2, 2, t3, p3), null === c2[0])
        throw new a(t3, r.PortalRequired, p3);
      if (c2[0] instanceof t) {
        const e3 = me(c2[1]);
        let r2;
        r2 = t3.services?.portal ? t3.services.portal : C.getDefault();
        return M(l(c2[0], r2), e3);
      }
      if (false === G(c2[0]))
        throw new a(t3, r.InvalidParameter, p3);
      const f2 = me(c2[0]);
      return M(t3.services?.portal ?? C.getDefault(), f2);
    });
  }, e.signatures.push({ name: "knowledgegraphbyportalitem", min: 2, max: 2 }), e.functions.querygraph = function(r2, i) {
    return e.standardFunctionAsync(r2, i, (e2, u, m2) => __async(this, null, function* () {
      ae(m2, 2, 4, r2, i);
      const d2 = m2[0];
      if (!$(d2))
        throw new a(r2, r.InvalidParameter, i);
      const g = m2[1];
      if (!G(g))
        throw new a(r2, r.InvalidParameter, i);
      null === F && (F = yield import("./chunk-KVBJUNLP.js"));
      let h = null;
      const w = P(m2[2], null);
      if (!(w instanceof N || null === w))
        throw new a(r2, r.InvalidParameter, i);
      if (w) {
        let e3 = [];
        h = Q(w, true, false, r2, e3), e3 = e3.filter((e4) => !e4.container[e4.indexer].spatialReference.isWGS84), e3.length > 0 && (yield J(e3));
      }
      const y = new s2({ openCypherQuery: g, bindParameters: h });
      (d2?.serviceDefinition?.currentVersion ?? 11.3) > 11.2 && (y.outputSpatialReference = r2.spatialReference);
      const j = (yield F.executeQueryStreaming(d2, y)).resultRowsStream.getReader(), S2 = [];
      try {
        for (; ; ) {
          const { done: e3, value: t3 } = yield j.read();
          if (e3)
            break;
          if (U(t3))
            for (const n3 of t3)
              S2.push(V(n3, r2));
          else {
            const e4 = [];
            for (const n3 of t3)
              e4.push(V(t3[n3], r2));
            S2.push(e4);
          }
        }
      } catch (v) {
        throw v;
      }
      return N.convertJsonToArcade(S2, He(r2), false, true);
    }));
  }, e.signatures.push({ name: "querygraph", min: 2, max: 4 }));
}
export {
  C2 as registerFunctions
};
//# sourceMappingURL=chunk-2WRNCWMI.js.map
