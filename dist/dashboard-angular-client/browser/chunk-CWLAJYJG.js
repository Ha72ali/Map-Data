import {
  c,
  o as o3,
  o2 as o4,
  s as s2
} from "./chunk-4YIUJTDO.js";
import {
  s
} from "./chunk-36EDYOYM.js";
import {
  a as a2,
  o as o2
} from "./chunk-J2N5MQVJ.js";
import {
  o
} from "./chunk-JVZFIMTC.js";
import {
  a
} from "./chunk-4UZUXLWH.js";
import {
  x
} from "./chunk-4TXVOEMW.js";

// node_modules/@arcgis/core/views/3d/webgl-engine/core/shaderModules/Float2DrawUniform.js
var o5 = class extends a2 {
  constructor(r, o6) {
    super(r, "vec2", a.Draw, (e, s3, t, i2) => e.setUniform2fv(r, o6(s3, t, i2)));
  }
};

// node_modules/@arcgis/core/chunks/SSAOBlur.glsl.js
var i = 4;
function f() {
  const f2 = new o4(), u2 = f2.fragment;
  f2.include(o3);
  const c2 = (i + 1) / 2, p = 1 / (2 * c2 * c2);
  return u2.include(c), u2.uniforms.add(new s2("depthMap", (e) => e.depthTexture), new s("tex", (e) => e.colorTexture), new o5("blurSize", (e) => e.blurSize), new o2("projScale", (r, o6) => {
    const t = x(o6.camera.eye, o6.camera.center);
    return t > 5e4 ? Math.max(0, r.projScale - (t - 5e4)) : r.projScale;
  })), u2.code.add(o`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${o.float(p)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `), f2.outputs.add("fragBlur", "float"), u2.code.add(o`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${o.int(i)}; r <= ${o.int(i)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragBlur = b / w_total;
    }
  `), f2;
}
var u = Object.freeze(Object.defineProperty({ __proto__: null, build: f }, Symbol.toStringTag, { value: "Module" }));

export {
  f,
  u
};
//# sourceMappingURL=chunk-CWLAJYJG.js.map
