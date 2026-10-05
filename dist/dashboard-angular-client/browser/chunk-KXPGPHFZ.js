import {
  d
} from "./chunk-3SMHH7TI.js";
import {
  S
} from "./chunk-LV2A7KVX.js";
import "./chunk-2S5SXLL5.js";
import "./chunk-QEKSQ5XF.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-5AO6PKWA.js";
import "./chunk-YGERZ2ZN.js";
import "./chunk-IWDEV6HE.js";
import {
  f
} from "./chunk-2A6LCWAO.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-ZGFCHJGS.js";
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
import "./chunk-4BCUADAV.js";
import {
  w
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
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/query/executeForTopExtents.js
function a(a2, m, n) {
  return __async(this, null, function* () {
    const s = f(a2), i = yield d(s, S.from(m), __spreadValues({}, n)), u = i.data.extent;
    return !u || isNaN(u.xmin) || isNaN(u.ymin) || isNaN(u.xmax) || isNaN(u.ymax) ? { count: i.data.count, extent: null } : { count: i.data.count, extent: w.fromJSON(u) };
  });
}
export {
  a as executeForTopExtents
};
//# sourceMappingURL=chunk-KXPGPHFZ.js.map
