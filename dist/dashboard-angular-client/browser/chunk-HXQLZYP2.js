import {
  i
} from "./chunk-OWUPKNU3.js";
import {
  l
} from "./chunk-AHUF4JUQ.js";
import {
  t
} from "./chunk-O7Z6JYRR.js";
import "./chunk-YQO3SAYJ.js";
import {
  K,
  ee,
  tt
} from "./chunk-6CI2T3A3.js";
import "./chunk-D36YNZXP.js";
import "./chunk-WI3D62FW.js";
import "./chunk-2ELLS5U7.js";
import "./chunk-C7G5CDLC.js";
import "./chunk-37WUIHBB.js";
import "./chunk-USPPMGID.js";
import "./chunk-JIWQBAAB.js";
import "./chunk-CSIYRPBQ.js";
import "./chunk-73TXPMFV.js";
import "./chunk-2PNLU6ZL.js";
import {
  y
} from "./chunk-GFKQERTJ.js";
import "./chunk-VKC2IPZH.js";
import "./chunk-B4YHNVRO.js";
import {
  V
} from "./chunk-QH56RTNI.js";
import "./chunk-TGYR6LFY.js";
import "./chunk-7BBDZSYX.js";
import "./chunk-SD3ME6MB.js";
import "./chunk-YTC5APIA.js";
import "./chunk-4AU4YV3O.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-FTWQYERS.js";
import "./chunk-UER5KWEB.js";
import "./chunk-5YCNWSDC.js";
import "./chunk-23OIU3O7.js";
import "./chunk-N62TCV6V.js";
import "./chunk-MACNJI7G.js";
import "./chunk-PUJBM626.js";
import "./chunk-YAIQHQM4.js";
import "./chunk-OG5YPY7V.js";
import "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-4ZNMWBPP.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import {
  e,
  u
} from "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-APUMZG5L.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
import "./chunk-JJ2NMOGF.js";
import "./chunk-XVLLO5NS.js";
import "./chunk-IIZACZCL.js";
import "./chunk-EHKCE57B.js";
import "./chunk-2RMM7KZB.js";
import "./chunk-JOIHAYOP.js";
import "./chunk-2QNDEL2B.js";
import "./chunk-SOEKEBD6.js";
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
import "./chunk-7JFKWLN7.js";
import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/symbols/cim/CIMSymbolRasterizer.js
var n = 96 / 72;
var o = class {
  constructor(t2) {
    this._spatialReference = t2, this._imageDataCanvas = null, this._cimResourceManager = new i();
  }
  get _canvas() {
    return this._imageDataCanvas || (this._imageDataCanvas = document.createElement("canvas")), this._imageDataCanvas;
  }
  get resourceManager() {
    return this._cimResourceManager;
  }
  rasterizeCIMSymbolAsync(e2, t2, i2, n2, o2, l2, c2, m2, g) {
    return __async(this, null, function* () {
      if (!e2)
        return null;
      const { data: y3 } = e2;
      if (!y3 || "CIMSymbolReference" !== y3.type || !y3.symbol)
        return null;
      const { symbol: u3 } = y3;
      l2 || (l2 = V(u3));
      const d = yield y.resolveSymbolOverrides(y3, t2, this._spatialReference, o2, l2, c2, m2), w = this._cimResourceManager, p2 = [];
      ee.fetchResources(d, w, p2), ee.fetchFonts(d, w, p2), p2.length > 0 && (yield Promise.all(p2));
      const { width: b, height: f2 } = i2, M = h(l2, b, f2, n2), C = ee.getEnvelope(d, M, w);
      if (!C)
        return null;
      let R = 1, v = 0, I = 0;
      switch (u3.type) {
        case "CIMPointSymbol":
        case "CIMTextSymbol":
          {
            let e3 = 1;
            C.width > b && (e3 = b / C.width);
            let t3 = 1;
            C.height > f2 && (t3 = f2 / C.height), "preview" === n2 && (C.width < b && (e3 = b / C.width), C.height < f2 && (t3 = f2 / C.height)), R = Math.min(e3, t3), v = C.x + C.width / 2, I = C.y + C.height / 2;
          }
          break;
        case "CIMLineSymbol":
          {
            (g || C.height > f2) && (R = f2 / C.height), I = C.y + C.height / 2;
            const e3 = C.x * R + b / 2, t3 = (C.x + C.width) * R + b / 2, { paths: i3 } = M;
            i3[0][0][0] -= e3 / R, i3[0][2][0] -= (t3 - b) / R;
          }
          break;
        case "CIMPolygonSymbol": {
          v = C.x + C.width / 2, I = C.y + C.height / 2;
          const e3 = C.x * R + b / 2, t3 = (C.x + C.width) * R + b / 2, i3 = C.y * R + f2 / 2, r = (C.y + C.height) * R + f2 / 2, { rings: a } = M;
          e3 < 0 && (a[0][0][0] -= e3, a[0][3][0] -= e3, a[0][4][0] -= e3), i3 < 0 && (a[0][0][1] += i3, a[0][1][1] += i3, a[0][4][1] += i3), t3 > b && (a[0][1][0] -= t3 - b, a[0][2][0] -= t3 - b), r > f2 && (a[0][2][1] += r - f2, a[0][3][1] += r - f2);
        }
      }
      const S = { type: "cim", data: { type: "CIMSymbolReference", symbol: d } };
      return this.rasterize(S, b, f2, v, I, R, l2, 1, M);
    });
  }
  rasterize(e2, r, a, o2, l2, c2, m2, g = 0, y3 = null) {
    const { data: u3 } = e2;
    if (!u3 || "CIMSymbolReference" !== u3.type || !u3.symbol)
      return null;
    const { symbol: d } = u3, w = this._canvas, p2 = (window.devicePixelRatio || 1) * n;
    w.width = r * p2, w.height = a * p2, m2 || (m2 = V(d)), y3 || (y3 = h(m2, r, a, "legend")), w.width += 2 * g, w.height += 2 * g;
    const b = w.getContext("2d", { willReadFrequently: true }), f2 = K.createIdentity();
    f2.translate(-o2, -l2), f2.scale(c2 * p2, -c2 * p2), f2.translate(r * p2 / 2 + g, a * p2 / 2 + g), b.clearRect(0, 0, w.width, w.height);
    return new tt(b, this._cimResourceManager, f2, true).drawSymbol(d, y3), b.getImageData(0, 0, w.width, w.height);
  }
};
function h(e2, t2, i2, r) {
  const a = 1, s2 = -t2 / 2 + a, n2 = t2 / 2 - a, o2 = i2 / 2 - a, h3 = -i2 / 2 + a;
  switch (e2) {
    case "esriGeometryPoint":
      return { x: 0, y: 0 };
    case "esriGeometryPolyline":
      return { paths: [[[s2, 0], [0, 0], [n2, 0]]] };
    default:
      return "legend" === r ? { rings: [[[s2, o2], [n2, 0], [n2, h3], [s2, h3], [s2, o2]]] } : { rings: [[[s2, o2], [n2, o2], [n2, h3], [s2, h3], [s2, o2]]] };
  }
}

// node_modules/@arcgis/core/symbols/support/previewCIMSymbol.js
var s = new o(null);
var c = e(t.size);
var m = e(t.maxSize);
var u2 = e(t.lineWidth);
var f = 1;
function h2(e2, t2, i2) {
  return __async(this, null, function* () {
    const l2 = t2?.size;
    let r = null != l2 && "object" == typeof l2 && "width" in l2 ? l2.width : l2, n2 = null != l2 && "object" == typeof l2 && "height" in l2 ? l2.height : l2;
    if (null == r || null == n2)
      if ("esriGeometryPolygon" === i2)
        r = c, n2 = c;
      else {
        const l3 = yield y2(e2, t2, i2);
        l3 && (r = l3.width, n2 = l3.height), "esriGeometryPolyline" === i2 && (r = u2), r = null != r && isFinite(r) ? Math.min(r, m) : c, n2 = null != n2 && isFinite(n2) ? Math.max(Math.min(n2, m), f) : c;
      }
    return "legend" === t2.style && "esriGeometryPolyline" === i2 && (r = u2), { width: r, height: n2 };
  });
}
function y2(e2, t2, l2) {
  return __async(this, null, function* () {
    const { feature: n2, fieldMap: a, viewParams: o2 } = t2.cimOptions || t2, c2 = yield y.resolveSymbolOverrides(e2.data, n2, null, a, l2, null, o2);
    if (!c2)
      return null;
    (e2 = e2.clone()).data = { type: "CIMSymbolReference", symbol: c2 }, e2.data.primitiveOverrides = void 0;
    const m2 = [];
    return ee.fetchResources(c2, s.resourceManager, m2), ee.fetchFonts(c2, s.resourceManager, m2), m2.length > 0 && (yield Promise.all(m2)), ee.getEnvelope(c2, null, s.resourceManager);
  });
}
function p(_0) {
  return __async(this, arguments, function* (e2, i2 = {}) {
    const { node: l2, opacity: r, symbolConfig: a } = i2, c2 = null != a && "object" == typeof a && "isSquareFill" in a && a.isSquareFill, m2 = i2.cimOptions || i2, u3 = m2.geometryType || V(e2?.data?.symbol), f2 = yield h2(e2, i2, u3), { feature: y3, fieldMap: p2 } = m2, d = c2 || "esriGeometryPolygon" !== u3 ? "preview" : "legend", g = yield s.rasterizeCIMSymbolAsync(e2, y3, f2, d, p2, u3, null, m2.viewParams, m2.allowScalingUp);
    if (!g)
      return null;
    const { width: w, height: b } = g, v = document.createElement("canvas");
    v.width = w, v.height = b;
    v.getContext("2d").putImageData(g, 0, 0);
    const M = u(f2.width), j = u(f2.height), S = new Image(M, j);
    S.src = v.toDataURL(), S.ariaLabel = i2.ariaLabel ?? null, S.alt = i2.ariaLabel ?? "", null != r && (S.style.opacity = `${r}`);
    let C = S;
    if (null != i2.effectView) {
      const e3 = { shape: { type: "image", x: 0, y: 0, width: M, height: j, src: S.src }, fill: null, stroke: null, offset: [0, 0] };
      C = l([[e3]], [M, j], { effectView: i2.effectView, ariaLabel: i2.ariaLabel });
    }
    return l2 && C && l2.appendChild(C), C;
  });
}
export {
  p as previewCIMSymbol
};
//# sourceMappingURL=chunk-HXQLZYP2.js.map
