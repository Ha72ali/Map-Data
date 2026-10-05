import {
  u
} from "./chunk-UTVWJMDQ.js";
import {
  has
} from "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/views/3d/glTF/internal/resourceUtils.js
var t = class {
  constructor(t2) {
    this.data = t2, this.type = "encoded-mesh-texture", this.encoding = u.KTX2_ENCODING;
  }
};
function r(e) {
  return "encoded-mesh-texture" === e?.type;
}
function n(e) {
  return __async(this, null, function* () {
    const t2 = new Blob([e]), r2 = yield t2.text();
    return JSON.parse(r2);
  });
}
function o(r2, n2) {
  return __async(this, null, function* () {
    if (n2 === u.KTX2_ENCODING)
      return new t(r2);
    const o2 = new Blob([r2], { type: n2 }), c = URL.createObjectURL(o2), s = new Image();
    if (has("esri-iPhone"))
      return new Promise((e, t2) => {
        const r3 = () => {
          o3(), e(s);
        }, n3 = (e2) => {
          o3(), t2(e2);
        }, o3 = () => {
          URL.revokeObjectURL(c), s.removeEventListener("load", r3), s.removeEventListener("error", n3);
        };
        s.addEventListener("load", r3), s.addEventListener("error", n3), s.src = c;
      });
    try {
      s.src = c, yield s.decode();
    } catch (i) {
      console.warn("Failed decoding HTMLImageElement");
    }
    return URL.revokeObjectURL(c), s;
  });
}

export {
  t,
  r,
  n,
  o
};
//# sourceMappingURL=chunk-SHPHLUOA.js.map
