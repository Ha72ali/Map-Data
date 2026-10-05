import {
  $,
  j
} from "./chunk-62NZPB4L.js";
import "./chunk-R4ADXNFU.js";
import "./chunk-A3K4AQEC.js";
import "./chunk-5NJ3TZEU.js";
import "./chunk-6MWDYJDX.js";
import "./chunk-WBMLBIXY.js";
import {
  a,
  f,
  i,
  l
} from "./chunk-5EK2HSR2.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
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

// node_modules/@arcgis/core/layers/save/imageryUtils.js
var l2 = "Image Service";
var y = "imagery-layer-save";
var n = "imagery-layer-save-as";
var o = "imagery-tile-layer-save";
var m = "imagery-tile-layer-save-as";
function c(e) {
  if ("imagery" === e.type)
    return { isValid: true };
  const { raster: t } = e, r = "Function" === t?.datasetFormat ? t.primaryRasters?.rasters[0] : t;
  return { isValid: "RasterTileServer" === r?.datasetFormat && ("Raster" === r.tileType || "Map" === r.tileType), errorMessage: "imagery tile layer should be created from a tiled image service." };
}
function p(e) {
  const t = e.layerJSON;
  return Promise.resolve(t && Object.keys(t).length ? t : null);
}
function u(e, t) {
  return __async(this, null, function* () {
    const { parsedUrl: l3, title: y2, fullExtent: n2 } = e;
    t.url = l3.path, t.title ||= y2;
    try {
      t.extent = yield l(n2);
    } catch {
      t.extent = void 0;
    }
    a(t, f.METADATA), "imagery-tile" === e.type && i(t, f.TILED_IMAGERY);
  });
}
function g(t, r) {
  return __async(this, null, function* () {
    const a2 = "imagery" === t.type ? y : o;
    return $({ layer: t, itemType: l2, validateLayer: c, createItemData: p, errorNamePrefix: a2 }, r);
  });
}
function v(e, r, a2) {
  return __async(this, null, function* () {
    const i2 = "imagery" === e.type ? n : m;
    return j({ layer: e, itemType: l2, validateLayer: c, createItemData: p, errorNamePrefix: i2, newItem: r, setItemProperties: u }, a2);
  });
}
export {
  g as save,
  v as saveAs
};
//# sourceMappingURL=chunk-PJV6CJS7.js.map
