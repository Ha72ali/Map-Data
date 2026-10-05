import {
  l
} from "./chunk-SEKI6G4T.js";
import {
  M
} from "./chunk-OSTQOJH6.js";
import "./chunk-WT6FVGMO.js";
import "./chunk-AQZJMRBI.js";
import "./chunk-WRDD5RXI.js";
import "./chunk-IZITFIPT.js";
import "./chunk-NUWMXJIZ.js";
import "./chunk-BG6ZXBE4.js";
import "./chunk-BGGRKHCN.js";
import "./chunk-MCOJADCH.js";
import "./chunk-KM4FMHCK.js";
import "./chunk-GV5YYV7L.js";
import "./chunk-WDDSREVG.js";
import "./chunk-CQ2LZTOT.js";
import "./chunk-5YCNWSDC.js";
import "./chunk-GKEPJ7SJ.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import "./chunk-PUJBM626.js";
import "./chunk-JJ2NMOGF.js";
import "./chunk-IIZACZCL.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-SOEKEBD6.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-BYMJUQYJ.js";
import "./chunk-YKH4U5BK.js";
import "./chunk-U4IA2IP4.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import {
  s as s2
} from "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import {
  a,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/geometry/support/meshUtils/convertMeshVertexSpace.js
function i(i2, n, c) {
  return __async(this, null, function* () {
    yield Promise.resolve(), s2(c);
    const m = M(i2, n);
    if (!m)
      throw new s("meshUtils:convertVertexSpace()", "Failed to convert to provided vertex space due to projection errors");
    const p = i2.cloneAndModifyVertexAttributes(new l(__spreadProps(__spreadValues({}, m), { uv: a(i2.vertexAttributes.uv), color: a(i2.vertexAttributes.color) })), n);
    return p.transform = null, p;
  });
}
export {
  i as convertMeshVertexSpace
};
//# sourceMappingURL=chunk-YCLDW2YP.js.map
