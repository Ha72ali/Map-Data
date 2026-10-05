import {
  b,
  j,
  x
} from "./chunk-2GJ3ZNQP.js";
import "./chunk-KDIKUJSE.js";
import {
  $,
  C,
  E,
  P,
  U,
  d,
  f,
  k,
  p
} from "./chunk-V7HY2IB3.js";
import "./chunk-YW5PLNZN.js";
import "./chunk-LKQQQES5.js";
import "./chunk-GF2XXTDU.js";
import "./chunk-RIFP6ALC.js";
import "./chunk-T5JXEROT.js";
import "./chunk-QLIDKUAN.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-APUMZG5L.js";
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
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
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
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/smartMapping/statistics/support/statsWorker.js
function d2(a) {
  return __async(this, null, function* () {
    const { attribute: e, features: r } = a, { normalizationType: s, normalizationField: m, minValue: f2, maxValue: u, fieldType: d3 } = e, p3 = yield b({ field: e.field, valueExpression: e.valueExpression, normalizationType: s, normalizationField: m, normalizationTotal: e.normalizationTotal, viewInfoParams: e.viewInfoParams, timeZone: e.timeZone, fieldInfos: e.fieldInfos }, r), v2 = f({ normalizationType: s, normalizationField: m, minValue: f2, maxValue: u }), c2 = { value: 0.5, fieldType: d3 }, z2 = "esriFieldTypeString" === d3 ? d({ values: p3, supportsNullCount: v2, percentileParams: c2 }) : p({ values: p3, minValue: f2, maxValue: u, useSampleStdDev: !s, supportsNullCount: v2, percentileParams: c2 });
    return C(z2, "esriFieldTypeDate" === d3);
  });
}
function p2(a) {
  return __async(this, null, function* () {
    const { attribute: e, features: n } = a, o = yield b({ field: e.field, field2: e.field2, field3: e.field3, fieldDelimiter: e.fieldDelimiter, valueExpression: e.valueExpression, viewInfoParams: e.viewInfoParams, timeZone: e.timeZone, fieldInfos: e.fieldInfos }, n, false), l = k(o);
    return $(l, e.domains, e.returnAllCodedValues, e.fieldDelimiter);
  });
}
function v(a) {
  return __async(this, null, function* () {
    const { attribute: e, features: n } = a, { field: o, normalizationType: l, normalizationField: t, normalizationTotal: r, classificationMethod: s } = e, u = yield b({ field: o, valueExpression: e.valueExpression, normalizationType: l, normalizationField: t, normalizationTotal: r, viewInfoParams: e.viewInfoParams, timeZone: e.timeZone, fieldInfos: e.fieldInfos }, n), d3 = E(u, { field: o, normalizationType: l, normalizationField: t, normalizationTotal: r, classificationMethod: s, standardDeviationInterval: e.standardDeviationInterval, numClasses: e.numClasses, minValue: e.minValue, maxValue: e.maxValue });
    return P(d3, s);
  });
}
function c(a) {
  return __async(this, null, function* () {
    const { attribute: e, features: n } = a, { field: o, normalizationType: l, normalizationField: t, normalizationTotal: r, classificationMethod: s } = e, m = yield b({ field: o, valueExpression: e.valueExpression, normalizationType: l, normalizationField: t, normalizationTotal: r, viewInfoParams: e.viewInfoParams, timeZone: e.timeZone, fieldInfos: e.fieldInfos }, n);
    return U(m, { field: o, normalizationType: l, normalizationField: t, normalizationTotal: r, classificationMethod: s, standardDeviationInterval: e.standardDeviationInterval, numBins: e.numBins, minValue: e.minValue, maxValue: e.maxValue });
  });
}
function z(i) {
  return __async(this, null, function* () {
    const { attribute: n, features: o } = i, { field: l, radius: t, transform: r, spatialReference: s } = n, m = n.size ?? [0, 0], f2 = j(o ?? [], r, s, m);
    return x(f2, t ?? void 0, l, m[0], m[1]);
  });
}
export {
  v as classBreaks,
  z as heatmapStatistics,
  c as histogram,
  d2 as summaryStatistics,
  p2 as uniqueValues
};
//# sourceMappingURL=chunk-UEUFMNMM.js.map
