import {
  c
} from "./chunk-4AU4YV3O.js";
import {
  e
} from "./chunk-N62TCV6V.js";
import {
  F,
  i
} from "./chunk-MACNJI7G.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-VNWT22OX.js";
import {
  n
} from "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  U
} from "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/symbols/support/symbolLayerUtils.js
var c2 = a();
function a() {
  return new e(50);
}
function u() {
  c2 = a();
}
function l(e2, o) {
  return __async(this, null, function* () {
    if (e2.resource?.href)
      return m(e2.resource.href).then((e3) => [e3.width, e3.height]);
    if (e2.resource?.primitive)
      return null != o ? [o, o] : [256, 256];
    throw new s("symbol3d:invalid-symbol-layer", "symbol layers of type Icon must have either an href or a primitive resource");
  });
}
function m(r) {
  return U(r, { responseType: "image" }).then((e2) => e2.data);
}
function f(e2, o = null) {
  return __async(this, null, function* () {
    if (!e2.isPrimitive) {
      const o2 = e2.resource?.href;
      if (!o2)
        throw new s("symbol:invalid-resource", "The symbol does not have a valid resource");
      const s2 = c2.get(o2);
      if (void 0 !== s2)
        return s2;
      const { fetch: n2 } = yield import("./chunk-NPFYUNX5.js"), a3 = yield n2(o2, { disableTextures: true }), u2 = F(a3.referenceBoundingBox, n());
      return c2.put(o2, u2), u2;
    }
    if (!e2.resource?.primitive)
      throw new s("symbol:invalid-resource", "The symbol does not have a valid resource");
    const a2 = i(c(e2.resource.primitive));
    if (null != o)
      for (let r = 0; r < a2.length; r++)
        a2[r] *= o;
    return F(a2, n());
  });
}
export {
  u as clearBoundingBoxCache,
  l as computeIconLayerResourceSize,
  f as computeObjectLayerResourceSize
};
//# sourceMappingURL=chunk-3YIMP3S7.js.map
