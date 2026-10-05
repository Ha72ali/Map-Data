import {
  M
} from "./chunk-OSTQOJH6.js";
import "./chunk-WT6FVGMO.js";
import "./chunk-AQZJMRBI.js";
import {
  i
} from "./chunk-WRDD5RXI.js";
import {
  h
} from "./chunk-IY2B24OB.js";
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
import "./chunk-QSREVAFL.js";
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
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import "./chunk-BTPDOHVM.js";
import {
  has
} from "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/geometry/support/meshUtils/ElevationSamplerWorker.js
var r = class {
  createIndex(t, n) {
    return __async(this, null, function* () {
      const r2 = new Array();
      if (!t.vertexAttributes?.position)
        return new h();
      const o2 = a(t), s2 = null != n ? yield n.invoke("createIndexThread", o2, { transferList: r2 }) : this.createIndexThread(o2).result;
      return i2().fromJSON(s2);
    });
  }
  createIndexThread(e) {
    const t = i2();
    if (!e)
      return { result: t.toJSON() };
    const n = new Float64Array(e.position);
    return e.components ? s(t, n, e.components.map((e2) => new Uint32Array(e2))) : o(t, n);
  }
};
function o(e, t) {
  const n = new Array(t.length / 9);
  let r2 = 0;
  for (let o2 = 0; o2 < t.length; o2 += 9)
    n[r2++] = c(t, o2, o2 + 3, o2 + 6);
  return e.load(n), { result: e.toJSON() };
}
function s(e, t, n) {
  let r2 = 0;
  for (const a2 of n)
    r2 += a2.length / 3;
  const o2 = new Array(r2);
  let s2 = 0;
  for (const a2 of n)
    for (let e2 = 0; e2 < a2.length; e2 += 3)
      o2[s2++] = c(t, 3 * a2[e2], 3 * a2[e2 + 1], 3 * a2[e2 + 2]);
  return e.load(o2), { result: e.toJSON() };
}
function a(e) {
  const { vertexAttributes: { position: r2 }, vertexSpace: o2, spatialReference: s2, transform: a2 } = e, i3 = M({ vertexAttributes: { position: r2 }, vertexSpace: o2, spatialReference: s2, transform: a2 }, new i(), { allowBufferReuse: true })?.position;
  return i3 ? !e.components || e.components.some((e2) => !e2.faces) ? { position: i3.buffer } : { position: i3.buffer, components: e.components.map((e2) => e2.faces) } : null;
}
function i2() {
  return new h(9, has("esri-csp-restrictions") ? (e) => e : [".minX", ".minY", ".maxX", ".maxY"]);
}
function c(e, t, n, r2) {
  return { minX: Math.min(e[t], e[n], e[r2]), maxX: Math.max(e[t], e[n], e[r2]), minY: Math.min(e[t + 1], e[n + 1], e[r2 + 1]), maxY: Math.max(e[t + 1], e[n + 1], e[r2 + 1]), p0: [e[t], e[t + 1], e[t + 2]], p1: [e[n], e[n + 1], e[n + 2]], p2: [e[r2], e[r2 + 1], e[r2 + 2]] };
}
export {
  r as default
};
//# sourceMappingURL=chunk-XYVMG222.js.map
