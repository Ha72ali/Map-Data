import {
  H,
  J
} from "./chunk-J2BM4BJ4.js";
import {
  n as n2
} from "./chunk-FDJTONGZ.js";
import {
  n
} from "./chunk-4TXVOEMW.js";

// node_modules/@arcgis/core/geometry/projection/projectPointToVector.js
function c(e, o, c2, i) {
  if (J(e.spatialReference, c2)) {
    f[0] = e.x, f[1] = e.y;
    const r = e.z;
    return f[2] = r ?? i ?? 0, n2(f, e.spatialReference, 0, o, c2, 0, 1);
  }
  const s = H(e, c2);
  return !!s && (o[0] = s?.x, o[1] = s?.y, o[2] = s?.z ?? i ?? 0, true);
}
var f = n();

export {
  c
};
//# sourceMappingURL=chunk-WT6FVGMO.js.map
