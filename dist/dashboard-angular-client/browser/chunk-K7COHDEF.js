import {
  S,
  a as a2,
  c,
  y
} from "./chunk-P5COZXRW.js";
import {
  M,
  T,
  ee
} from "./chunk-ERIZ2BMT.js";
import {
  L2 as L,
  h2 as h,
  j,
  m3 as m
} from "./chunk-H4NJXMYB.js";
import {
  D,
  E,
  R,
  U,
  W,
  f2 as f,
  g,
  s3 as s2,
  u3 as u
} from "./chunk-DAVUOQ25.js";
import "./chunk-TGYR6LFY.js";
import "./chunk-KQ3AV3PI.js";
import "./chunk-UER5KWEB.js";
import "./chunk-OXKKAHFH.js";
import "./chunk-KDBJKPA2.js";
import {
  s
} from "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import {
  o
} from "./chunk-JJ2NMOGF.js";
import "./chunk-XVLLO5NS.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-SOEKEBD6.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-BZEDVIAT.js";
import {
  _,
  w
} from "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/rasterTransforms/IdentityTransform.js
var e2;
var a3 = e2 = class extends a2 {
  constructor() {
    super(...arguments), this.type = "identity";
  }
  clone() {
    return new e2();
  }
};
e([o({ IdentityXform: "identity" })], a3.prototype, "type", void 0), a3 = e2 = e([a("esri.layers.support.rasterTransforms.IdentityTransform")], a3);
var p = a3;

// node_modules/@arcgis/core/layers/support/rasterTransforms/utils.js
var o2 = { GCSShiftXform: c, IdentityXform: p, PolynomialXform: y };
var e3 = Object.keys(o2);
function i(r) {
  const t = r?.type;
  if (!t)
    return null;
  const n = o2[r?.type];
  if (n) {
    const t2 = new n();
    return t2.read(r), t2;
  }
  return null;
}

// node_modules/@arcgis/core/layers/support/RasterWorker.js
var J = class {
  convertVectorFieldData(r) {
    const t = g.fromJSON(r.pixelBlock), s3 = f(t, r.type);
    return Promise.resolve(null != s3 ? s3.toJSON() : null);
  }
  computeStatisticsHistograms(r) {
    const t = g.fromJSON(r.pixelBlock), s3 = m(t);
    return Promise.resolve(s3);
  }
  decode(r) {
    return __async(this, null, function* () {
      const e4 = yield j(r.data, r.options);
      return e4 && e4.toJSON();
    });
  }
  symbolize(r) {
    r.pixelBlock = g.fromJSON(r.pixelBlock), r.extent = r.extent ? w.fromJSON(r.extent) : null;
    const t = this.symbolizer.symbolize(r);
    return Promise.resolve(null != t ? t.toJSON() : null);
  }
  updateSymbolizer(r) {
    return __async(this, null, function* () {
      this.symbolizer = L.fromJSON(r.symbolizerJSON), r.histograms && "rasterStretch" === this.symbolizer?.rendererJSON.type && (this.symbolizer.rendererJSON.histograms = r.histograms);
    });
  }
  updateRasterFunction(r) {
    return __async(this, null, function* () {
      this.rasterFunction = S(r.rasterFunctionJSON);
    });
  }
  process(r) {
    return __async(this, null, function* () {
      const t = this.rasterFunction.process({ extent: w.fromJSON(r.extent), primaryPixelBlocks: r.primaryPixelBlocks.map((r2) => null != r2 ? g.fromJSON(r2) : null), primaryPixelSizes: r.primaryPixelSizes?.map((r2) => null != r2 ? _.fromJSON(r2) : null), primaryRasterIds: r.primaryRasterIds });
      return null != t ? t.toJSON() : null;
    });
  }
  stretch(r) {
    const t = this.symbolizer.simpleStretch(g.fromJSON(r.srcPixelBlock), r.stretchParams);
    return Promise.resolve(t?.toJSON());
  }
  estimateStatisticsHistograms(r) {
    const t = h(g.fromJSON(r.srcPixelBlock));
    return Promise.resolve(t);
  }
  split(r) {
    const t = W(g.fromJSON(r.srcPixelBlock), r.tileSize, r.maximumPyramidLevel ?? 0, false === r.useBilinear);
    return t && t.forEach((r2, e4) => {
      t.set(e4, r2?.toJSON());
    }), Promise.resolve(t);
  }
  clipTile(r) {
    const t = g.fromJSON(r.pixelBlock), s3 = E(__spreadProps(__spreadValues({}, r), { pixelBlock: t }));
    return Promise.resolve(s3?.toJSON());
  }
  mosaicAndTransform(r) {
    return __async(this, null, function* () {
      const t = r.srcPixelBlocks.map((r2) => r2 ? new g(r2) : null), s3 = U(t, r.srcMosaicSize, { blockWidths: r.blockWidths, alignmentInfo: r.alignmentInfo, clipOffset: r.clipOffset, clipSize: r.clipSize });
      let o3, l = s3;
      return r.coefs && (l = D(s3, r.destDimension, r.coefs, r.sampleSpacing, r.interpolation)), r.projectDirections && r.gcsGrid && (o3 = R(r.destDimension, r.gcsGrid), l = u(l, r.isUV ? "vector-uv" : "vector-magdir", o3)), { pixelBlock: l?.toJSON(), localNorthDirections: o3 };
    });
  }
  createFlowMesh(r, e4) {
    return __async(this, null, function* () {
      const t = { data: new Float32Array(r.flowData.buffer), mask: new Uint8Array(r.flowData.maskBuffer), width: r.flowData.width, height: r.flowData.height }, { vertexData: s3, indexData: o3 } = yield s2(r.meshType, r.simulationSettings, t, e4.signal);
      return { result: { vertexBuffer: s3.buffer, indexBuffer: o3.buffer }, transferList: [s3.buffer, o3.buffer] };
    });
  }
  getProjectionOffsetGrid(e4) {
    return __async(this, null, function* () {
      const t = w.fromJSON(e4.projectedExtent), s3 = w.fromJSON(e4.srcBufferExtent);
      let o3 = null;
      e4.datumTransformationSteps && (o3 = new s({ steps: e4.datumTransformationSteps })), (e4.includeGCSGrid || M(t.spatialReference, s3.spatialReference, o3)) && (yield T());
      const i2 = e4.rasterTransform ? i(e4.rasterTransform) : null;
      return ee(__spreadProps(__spreadValues({}, e4), { projectedExtent: t, srcBufferExtent: s3, datumTransformation: o3, rasterTransform: i2 }));
    });
  }
};
export {
  J as default
};
//# sourceMappingURL=chunk-K7COHDEF.js.map
