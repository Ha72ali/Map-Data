import {
  $
} from "./chunk-ITAKC6II.js";
import "./chunk-VDA2A5R2.js";
import "./chunk-CQTYIZO2.js";
import {
  N
} from "./chunk-RRTU3AOS.js";
import {
  i,
  o
} from "./chunk-LVM5DDEN.js";
import "./chunk-JZNXWSRY.js";
import "./chunk-SEKI6G4T.js";
import "./chunk-YQUI5ENH.js";
import "./chunk-GB4LBHXK.js";
import "./chunk-7SWIYTU2.js";
import {
  s
} from "./chunk-4IFV6RW3.js";
import "./chunk-OSTQOJH6.js";
import "./chunk-WT6FVGMO.js";
import "./chunk-AQZJMRBI.js";
import "./chunk-WRDD5RXI.js";
import "./chunk-HV5UKVOL.js";
import "./chunk-SCADP7WG.js";
import "./chunk-IZITFIPT.js";
import "./chunk-NUWMXJIZ.js";
import "./chunk-BG6ZXBE4.js";
import "./chunk-BGGRKHCN.js";
import "./chunk-MCOJADCH.js";
import "./chunk-KM4FMHCK.js";
import "./chunk-GV5YYV7L.js";
import "./chunk-WDDSREVG.js";
import "./chunk-CQ2LZTOT.js";
import "./chunk-7BBDZSYX.js";
import {
  d as d2
} from "./chunk-ZGKHY7ZS.js";
import {
  d
} from "./chunk-VFY3HP2G.js";
import "./chunk-ZQQ553GQ.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-YTC5APIA.js";
import "./chunk-4AU4YV3O.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-FTWQYERS.js";
import "./chunk-UER5KWEB.js";
import "./chunk-5YCNWSDC.js";
import "./chunk-OXKKAHFH.js";
import "./chunk-KDBJKPA2.js";
import "./chunk-MACNJI7G.js";
import "./chunk-EFPJQTVN.js";
import "./chunk-GKEPJ7SJ.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-PUJBM626.js";
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
import "./chunk-XVLLO5NS.js";
import "./chunk-IIZACZCL.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-SOEKEBD6.js";
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
import {
  _,
  w
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
import {
  r
} from "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import {
  n2 as n
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/support/meshFeatureSet.js
var m = () => n.getLogger("esri.rest.support.meshFeatureSet");
function p(t, r2, o2) {
  const n2 = o2.features;
  o2.features = [], delete o2.geometryType;
  const s2 = d2.fromJSON(o2);
  if (s2.geometryType = "mesh", !o2.assetMaps)
    return s2;
  const i2 = d3(r2, o2.assetMaps), u = t.sourceSpatialReference ?? f.WGS84, f2 = o2.globalIdFieldName, { outFields: c } = t, m2 = null != c && c.length > 0 ? g(c.includes("*") ? null : new Set(c)) : () => ({});
  for (const a of n2) {
    const t2 = y(a, f2, u, r2, i2);
    s2.features.push(new d({ geometry: t2, attributes: m2(a) }));
  }
  return s2;
}
function g(e) {
  return ({ attributes: t }) => {
    if (!t)
      return {};
    if (!e)
      return t;
    for (const r2 in t)
      e.has(r2) || delete t[r2];
    return t;
  };
}
function y(e, t, r2, s2, a) {
  const i2 = e.attributes[t], u = a.get(i2);
  if (null == u || !e.geometry)
    return null;
  const f2 = E(e, r2, s2), c = w.fromJSON(e.geometry);
  c.spatialReference = r2;
  const l = h(e.attributes, s2), m2 = r2.isGeographic ? "local" : "georeferenced", p2 = D(u);
  return p2 ? $.createWithExternalSource(f2, p2, { extent: c, transform: l, vertexSpace: m2 }) : $.createIncomplete(f2, { extent: c, transform: l, vertexSpace: m2 });
}
function E({ attributes: e }, t, { transformFieldRoles: r2 }) {
  const o2 = e[r2.originX], n2 = e[r2.originY], a = e[r2.originZ];
  return new _({ x: o2, y: n2, z: a, spatialReference: t });
}
function h(e, { transformFieldRoles: t }) {
  return new N({ translation: [e[t.translationX], -e[t.translationZ], e[t.translationY]], rotationAxis: [e[t.rotationX], -e[t.rotationZ], e[t.rotationY]], rotationAngle: e[t.rotationDeg], scale: [e[t.scaleX], e[t.scaleZ], e[t.scaleY]] });
}
var S;
function d3(e, t) {
  const o2 = /* @__PURE__ */ new Map();
  for (const n2 of t) {
    const t2 = n2.parentGlobalId;
    if (null == t2)
      continue;
    const s2 = n2.assetName, a = n2.assetType, i2 = n2.assetHash, u = n2.assetURL, f2 = n2.conversionStatus, l = n2.seqNo, p2 = s(a, e.supportedFormats);
    if (!p2) {
      m().error("mesh-feature-set:unknown-format", `Service returned an asset of type ${a}, but it does not list it as a supported type`);
      continue;
    }
    const g2 = r(o2, t2, () => ({ files: /* @__PURE__ */ new Map() }));
    r(g2.files, s2, () => ({ name: s2, type: a, mimeType: p2, status: M(f2), parts: [] })).parts[l] = { hash: i2, url: u };
  }
  return o2;
}
function D(e) {
  const t = Array.from(e.files.values()), r2 = new Array();
  for (const o2 of t) {
    if (o2.status !== S.COMPLETED)
      return null;
    const e2 = new Array();
    for (const t2 of o2.parts) {
      if (!t2)
        return null;
      e2.push(new o(t2.url, t2.hash));
    }
    r2.push(new i(o2.name, o2.mimeType, e2));
  }
  return r2;
}
function M(e) {
  switch (e) {
    case "COMPLETED":
    case "SUBMITTED":
      return S.COMPLETED;
    case "INPROGRESS":
      return S.PENDING;
    default:
      return S.FAILED;
  }
}
!function(e) {
  e[e.FAILED = 0] = "FAILED", e[e.PENDING = 1] = "PENDING", e[e.COMPLETED = 2] = "COMPLETED";
}(S || (S = {}));
export {
  d3 as assetMapFromAssetMapsJSON,
  y as extractMesh,
  p as meshFeatureSetFromJSON
};
//# sourceMappingURL=chunk-AGPE4ARP.js.map
