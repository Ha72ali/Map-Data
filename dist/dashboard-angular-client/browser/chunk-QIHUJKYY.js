import {
  n,
  p
} from "./chunk-LOO3IZZ3.js";
import "./chunk-IWDEV6HE.js";
import "./chunk-2A6LCWAO.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import {
  C
} from "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
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
import {
  s,
  s2
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/portal/support/geometryServiceUtils.js
function n2(o = null, i) {
  return __async(this, null, function* () {
    if (s.geometryServiceUrl)
      return s.geometryServiceUrl;
    if (!o)
      throw new s2("internal:geometry-service-url-not-configured");
    let n3;
    n3 = "portal" in o ? o.portal || C.getDefault() : o, yield n3.load({ signal: i });
    const a2 = n3.helperServices?.geometry?.url;
    if (!a2)
      throw new s2("internal:geometry-service-url-not-configured");
    return a2;
  });
}
function a(r, t, a2 = null, l) {
  return __async(this, null, function* () {
    const c = yield n2(a2, l), s3 = new p({ geometries: [r], outSpatialReference: t }), m = yield n(c, s3, { signal: l });
    if (m && Array.isArray(m) && 1 === m.length)
      return m[0];
    throw new s2("internal:geometry-service-projection-failed");
  });
}
export {
  n2 as getGeometryServiceURL,
  a as projectGeometry
};
//# sourceMappingURL=chunk-QIHUJKYY.js.map
