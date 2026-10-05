import {
  t
} from "./chunk-O7Z6JYRR.js";
import {
  N
} from "./chunk-YQO3SAYJ.js";
import "./chunk-VKC2IPZH.js";
import "./chunk-B4YHNVRO.js";
import "./chunk-QH56RTNI.js";
import "./chunk-YTC5APIA.js";
import "./chunk-4AU4YV3O.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-FTWQYERS.js";
import "./chunk-UER5KWEB.js";
import "./chunk-5YCNWSDC.js";
import "./chunk-N62TCV6V.js";
import "./chunk-MACNJI7G.js";
import "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import {
  u
} from "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-JJ2NMOGF.js";
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
import "./chunk-6GPIXQSV.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/symbols/support/previewWebStyleSymbol.js
function r(e, i, r2) {
  const h = e.thumbnail?.url;
  return h ? U(h, { responseType: "image" }).then((t2) => {
    const e2 = s(t2.data, r2);
    return r2?.node ? (r2.node.appendChild(e2), r2.node) : e2;
  }) : N(e).then((t2) => t2 ? i(t2, r2) : null);
}
function s(t2, n) {
  const r2 = !/\\.svg$/i.test(t2.src) && n?.disableUpsampling, s2 = Math.max(t2.width, t2.height);
  let h = null != n?.maxSize ? u(n.maxSize) : t.maxSize;
  r2 && (h = Math.min(s2, h));
  const o = "number" == typeof n?.size ? n?.size : null, m = Math.min(h, null != o ? u(o) : s2);
  if (m !== s2) {
    const e = 0 !== t2.width && 0 !== t2.height ? t2.width / t2.height : 1;
    e >= 1 ? (t2.width = m, t2.height = m / e) : (t2.width = m * e, t2.height = m);
  }
  return t2;
}
export {
  r as previewWebStyleSymbol
};
//# sourceMappingURL=chunk-RY6SZOQO.js.map
