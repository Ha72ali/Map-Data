import {
  I
} from "./chunk-FPVWE5PQ.js";
import "./chunk-H6MYUYU4.js";
import "./chunk-TPOHS65A.js";
import "./chunk-GGRPX5QX.js";
import "./chunk-GGG4K7D6.js";
import "./chunk-VKC2IPZH.js";
import "./chunk-B4YHNVRO.js";
import "./chunk-XCPRP2KL.js";
import "./chunk-6F52T6PY.js";
import "./chunk-SATVR2AT.js";
import "./chunk-KJ5YDJI6.js";
import "./chunk-SIUD6VOA.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-5EK2HSR2.js";
import {
  p,
  z
} from "./chunk-EZCWLJZT.js";
import "./chunk-KR3ETDWL.js";
import "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-IIZACZCL.js";
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
import "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import {
  S
} from "./chunk-AZH5CNQI.js";
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
import {
  y
} from "./chunk-YFSAH4C7.js";
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
import "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/OpenStreetMapLayer.js
var c = class extends I {
  constructor(...e2) {
    super(...e2), this.portalItem = null, this.isReference = null, this.tileInfo = new z({ size: [256, 256], dpi: 96, format: "png8", compressionQuality: 0, origin: new _({ x: -20037508342787e-6, y: 20037508342787e-6, spatialReference: f.WebMercator }), spatialReference: f.WebMercator, lods: [new p({ level: 0, scale: 591657527591555e-6, resolution: 156543.033928 }), new p({ level: 1, scale: 295828763795777e-6, resolution: 78271.5169639999 }), new p({ level: 2, scale: 147914381897889e-6, resolution: 39135.7584820001 }), new p({ level: 3, scale: 73957190948944e-6, resolution: 19567.8792409999 }), new p({ level: 4, scale: 36978595474472e-6, resolution: 9783.93962049996 }), new p({ level: 5, scale: 18489297737236e-6, resolution: 4891.96981024998 }), new p({ level: 6, scale: 9244648868618e-6, resolution: 2445.98490512499 }), new p({ level: 7, scale: 4622324434309e-6, resolution: 1222.99245256249 }), new p({ level: 8, scale: 2311162217155e-6, resolution: 611.49622628138 }), new p({ level: 9, scale: 1155581108577e-6, resolution: 305.748113140558 }), new p({ level: 10, scale: 577790.554289, resolution: 152.874056570411 }), new p({ level: 11, scale: 288895.277144, resolution: 76.4370282850732 }), new p({ level: 12, scale: 144447.638572, resolution: 38.2185141425366 }), new p({ level: 13, scale: 72223.819286, resolution: 19.1092570712683 }), new p({ level: 14, scale: 36111.909643, resolution: 9.55462853563415 }), new p({ level: 15, scale: 18055.954822, resolution: 4.77731426794937 }), new p({ level: 16, scale: 9027.977411, resolution: 2.38865713397468 }), new p({ level: 17, scale: 4513.988705, resolution: 1.19432856685505 }), new p({ level: 18, scale: 2256.994353, resolution: 0.597164283559817 }), new p({ level: 19, scale: 1128.497176, resolution: 0.298582141647617 })] }), this.subDomains = ["a", "b", "c"], this.fullExtent = new w(-20037508342787e-6, -2003750834278e-5, 2003750834278e-5, 20037508342787e-6, f.WebMercator), this.urlTemplate = "https://{subDomain}.tile.openstreetmap.org/{level}/{col}/{row}.png", this.operationalLayerType = "OpenStreetMap", this.type = "open-street-map", this.copyright = "Map data &copy; OpenStreetMap contributors, CC-BY-SA";
  }
  get refreshInterval() {
    return 0;
  }
};
e([y({ type: S, json: { read: false, write: false, origins: { "web-document": { read: false, write: false } } } })], c.prototype, "portalItem", void 0), e([y({ type: Boolean, json: { read: false, write: false } })], c.prototype, "isReference", void 0), e([y({ type: Number, readOnly: true, json: { read: false, write: false, origins: { "web-document": { read: false, write: false } } } })], c.prototype, "refreshInterval", null), e([y({ type: z, json: { write: false } })], c.prototype, "tileInfo", void 0), e([y({ type: ["show", "hide"] })], c.prototype, "listMode", void 0), e([y({ readOnly: true, json: { read: false, write: false } })], c.prototype, "subDomains", void 0), e([y({ readOnly: true, json: { read: false, write: false }, nonNullable: true })], c.prototype, "fullExtent", void 0), e([y({ readOnly: true, json: { read: false, write: false } })], c.prototype, "urlTemplate", void 0), e([y({ type: ["OpenStreetMap"] })], c.prototype, "operationalLayerType", void 0), e([y({ json: { read: false } })], c.prototype, "type", void 0), e([y({ json: { read: false, write: false } })], c.prototype, "copyright", void 0), e([y({ json: { read: false, write: false } })], c.prototype, "wmtsInfo", void 0), c = e([a("esri.layers.OpenStreetMapLayer")], c);
var u = c;
export {
  u as default
};
//# sourceMappingURL=chunk-B3XTBMNQ.js.map
