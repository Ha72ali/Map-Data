import {
  U,
  ot,
  t
} from "./chunk-IMLUWAKH.js";
import {
  b
} from "./chunk-NVGBLY2Q.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/core/imageUtils.js
var i = null;
var o = true;
function s2(t2, e, r) {
  if (!t2 || !e)
    throw new Error("Cannot construct image data without dimensions");
  if (o)
    try {
      return new ImageData(t2, e);
    } catch (a) {
      o = false;
    }
  return m(t2, e, r);
}
function c(t2, e, r, a) {
  if (!e || !r)
    throw new Error("Cannot construct image data without dimensions");
  if (o)
    try {
      return new ImageData(t2, e, r);
    } catch (i2) {
      o = false;
    }
  const n = m(e, r, a);
  return n.data.set(t2, 0), n;
}
function f() {
  return i || (i = document.createElement("canvas"), i.width = 1, i.height = 1), i;
}
function m(t2, e, r) {
  return r || (r = f()), r.getContext("2d").createImageData(t2, e);
}
function u(a, n) {
  return __async(this, null, function* () {
    const i2 = window.URL.createObjectURL(a);
    try {
      const { data: e } = yield U(i2, __spreadProps(__spreadValues({}, n), { responseType: "image" }));
      return e;
    } catch (o2) {
      if (!b(o2))
        throw new s("invalid-image", `Could not fetch requested image at ${i2}`);
      throw o2;
    } finally {
      window.URL.revokeObjectURL(i2);
    }
  });
}
function p(t2, e) {
  return __async(this, null, function* () {
    const { arrayBuffer: r, mediaType: a } = yield d(t2, e), n = "image/png" === a;
    if ("image/gif" === a) {
      const { isAnimatedGIF: t3, parseGif: a2 } = yield import("./chunk-HYO2E5AV.js");
      if (t3(r))
        return a2(r, e);
    }
    if (n) {
      const { isAnimatedPNG: t3, parseApng: a2 } = yield import("./chunk-KRVGWS7M.js");
      if (t3(r))
        return a2(r, e);
    }
    return u(new Blob([r], { type: a }), e);
  });
}
function d(e, r) {
  return __async(this, null, function* () {
    const i2 = ot(e);
    if (i2?.isBase64)
      return { arrayBuffer: t(i2.data), mediaType: i2.mediaType };
    const o2 = yield U(e, __spreadValues({ responseType: "array-buffer" }, r));
    return { arrayBuffer: o2.data, mediaType: o2.getHeader?.("Content-Type") ?? "" };
  });
}

export {
  s2 as s,
  c,
  p
};
//# sourceMappingURL=chunk-7BBDZSYX.js.map
