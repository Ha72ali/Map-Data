import {
  j
} from "./chunk-TPOHS65A.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f
} from "./chunk-SIUD6VOA.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-5EK2HSR2.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-2AR2ZIQP.js";
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
import {
  v,
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
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/UnsupportedLayer.js
var a2 = class extends j(S(f)) {
  constructor(e2) {
    super(e2), this.resourceInfo = null, this.persistenceEnabled = true, this.type = "unsupported";
  }
  initialize() {
    this.addResolvingPromise(new Promise((e2, o) => {
      v(() => {
        const e3 = this.resourceInfo && (this.resourceInfo.layerType || this.resourceInfo.type);
        let s2 = "Unsupported layer type";
        e3 && (s2 += " " + e3), o(new s("layer:unsupported-layer-type", s2, { layerType: e3 }));
      });
    }));
  }
  read(e2, r) {
    const o = { resourceInfo: e2 };
    null != e2.id && (o.id = e2.id), null != e2.title && (o.title = e2.title), super.read(o, r);
  }
  write(e2, r) {
    return Object.assign(e2 || {}, this.resourceInfo, { id: this.id });
  }
};
e([y({ readOnly: true })], a2.prototype, "resourceInfo", void 0), e([y({ type: ["show", "hide"] })], a2.prototype, "listMode", void 0), e([y({ type: Boolean, readOnly: false })], a2.prototype, "persistenceEnabled", void 0), e([y({ json: { read: false }, readOnly: true, value: "unsupported" })], a2.prototype, "type", void 0), a2 = e([a("esri.layers.UnsupportedLayer")], a2);
var l = a2;
export {
  l as default
};
//# sourceMappingURL=chunk-K4NCRZD6.js.map
