import {
  E,
  d,
  f,
  m,
  p,
  u
} from "./chunk-5NHQQ66G.js";
import {
  I
} from "./chunk-UUS7A3FD.js";
import "./chunk-7TYPKOSU.js";
import "./chunk-V2RTMSYC.js";
import "./chunk-UNQDGSIB.js";
import "./chunk-4CYX3B55.js";
import "./chunk-GFX66WON.js";
import "./chunk-HV5UKVOL.js";
import "./chunk-SCADP7WG.js";
import "./chunk-CQ2LZTOT.js";
import "./chunk-EFPJQTVN.js";
import "./chunk-PUJBM626.js";
import "./chunk-XVLLO5NS.js";
import "./chunk-SOEKEBD6.js";
import "./chunk-VNWT22OX.js";
import "./chunk-4TXVOEMW.js";
import "./chunk-CQP3AR6G.js";
import "./chunk-5DVBROVO.js";
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/views/3d/support/buffer/workerHelper.js
function u2(r, u4) {
  return u4.push(r.buffer), { buffer: r.buffer, layout: new I(r.layout) };
}

// node_modules/@arcgis/core/views/3d/webgl-engine/lib/edgeRendering/EdgeProcessingWorker.js
var o = class {
  extract(e) {
    return __async(this, null, function* () {
      const t = c(e), n = f(t), r = [t.data.buffer];
      return { result: u3(n, r), transferList: r };
    });
  }
  extractComponentsEdgeLocations(t) {
    return __async(this, null, function* () {
      const s = c(t), i = u(s.data, s.skipDeduplicate, s.indices, s.indicesLength), a = p(i, p2), o2 = [];
      return { result: u2(a.regular.instancesData, o2), transferList: o2 };
    });
  }
  extractEdgeLocations(t) {
    return __async(this, null, function* () {
      const s = c(t), i = u(s.data, s.skipDeduplicate, s.indices, s.indicesLength), a = p(i, f2), o2 = [];
      return { result: u2(a.regular.instancesData, o2), transferList: o2 };
    });
  }
};
function c(e) {
  return { data: E.createView(e.dataBuffer), indices: "Uint32Array" === e.indicesType ? new Uint32Array(e.indices) : "Uint16Array" === e.indicesType ? new Uint16Array(e.indices) : e.indices, indicesLength: e.indicesLength, writerSettings: e.writerSettings, skipDeduplicate: e.skipDeduplicate };
}
function u3(t, n) {
  n.push(t.regular.lodInfo.lengths.buffer), n.push(t.silhouette.lodInfo.lengths.buffer);
  return { regular: { instancesData: u2(t.regular.instancesData, n), lodInfo: { lengths: t.regular.lodInfo.lengths.buffer } }, silhouette: { instancesData: u2(t.silhouette.instancesData, n), lodInfo: { lengths: t.silhouette.lodInfo.lengths.buffer } }, averageEdgeLength: t.averageEdgeLength };
}
var l = class {
  allocate(e) {
    return d.createBuffer(e);
  }
  trim(e, t) {
    return e.slice(0, t);
  }
  write(e, t, n) {
    e.position0.setVec(t, n.position0), e.position1.setVec(t, n.position1);
  }
};
var d2 = class {
  allocate(e) {
    return m.createBuffer(e);
  }
  trim(e, t) {
    return e.slice(0, t);
  }
  write(e, t, n) {
    e.position0.setVec(t, n.position0), e.position1.setVec(t, n.position1), e.componentIndex.set(t, n.componentIndex);
  }
};
var f2 = new l();
var p2 = new d2();
export {
  o as default
};
//# sourceMappingURL=chunk-3MQBXV7E.js.map
