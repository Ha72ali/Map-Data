import {
  o as o4
} from "./chunk-IZW665EU.js";
import {
  e as e2
} from "./chunk-ZT67NY4U.js";
import {
  o as o3
} from "./chunk-66EJ3NTS.js";
import {
  I as I2,
  p as p2
} from "./chunk-FPVWE5PQ.js";
import {
  o as o2
} from "./chunk-H6MYUYU4.js";
import {
  j
} from "./chunk-TPOHS65A.js";
import {
  f as f2
} from "./chunk-GGRPX5QX.js";
import {
  l
} from "./chunk-GGG4K7D6.js";
import "./chunk-VKC2IPZH.js";
import "./chunk-B4YHNVRO.js";
import {
  t as t2
} from "./chunk-XCPRP2KL.js";
import {
  b
} from "./chunk-6F52T6PY.js";
import "./chunk-SATVR2AT.js";
import {
  S
} from "./chunk-KJ5YDJI6.js";
import {
  f as f3
} from "./chunk-SIUD6VOA.js";
import "./chunk-ELMEXWR7.js";
import "./chunk-QUJPV6JW.js";
import "./chunk-5EK2HSR2.js";
import {
  p,
  z
} from "./chunk-EZCWLJZT.js";
import "./chunk-KR3ETDWL.js";
import "./chunk-FODHXTS2.js";
import "./chunk-4HNNLGCG.js";
import "./chunk-3QI4RGVH.js";
import "./chunk-CNFBAUBR.js";
import "./chunk-J2BM4BJ4.js";
import "./chunk-PA7QKZUF.js";
import "./chunk-FDJTONGZ.js";
import {
  C,
  d,
  v as v2
} from "./chunk-QNED4CTP.js";
import "./chunk-BTSFM5L5.js";
import "./chunk-XGBDSBC2.js";
import "./chunk-EQ4EANPC.js";
import "./chunk-F24FRQYV.js";
import "./chunk-JAN3F2NY.js";
import "./chunk-HUJ3ZGLC.js";
import "./chunk-ZGFCHJGS.js";
import "./chunk-JJDQYKYN.js";
import "./chunk-OHR2EMYV.js";
import "./chunk-4QNJMPNJ.js";
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
import {
  V
} from "./chunk-ZDVJGW4C.js";
import "./chunk-NFF25GNL.js";
import "./chunk-FKXAUXOY.js";
import "./chunk-BZEDVIAT.js";
import "./chunk-AZH5CNQI.js";
import "./chunk-V4F7XXO4.js";
import "./chunk-LHPNLXQX.js";
import "./chunk-2GHQZMFH.js";
import "./chunk-6ZGC7MSX.js";
import "./chunk-4BCUADAV.js";
import {
  _,
  o,
  w
} from "./chunk-BYMJUQYJ.js";
import {
  r as r2
} from "./chunk-YKH4U5BK.js";
import {
  R,
  r2 as r
} from "./chunk-U4IA2IP4.js";
import "./chunk-U4PIZ66H.js";
import "./chunk-VHLVKE6R.js";
import "./chunk-LOE6HVIU.js";
import "./chunk-77PJPQST.js";
import {
  I,
  U,
  v
} from "./chunk-IMLUWAKH.js";
import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a2
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  a as a3
} from "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-6GPIXQSV.js";
import {
  a,
  s2 as s,
  t
} from "./chunk-BTPDOHVM.js";
import {
  O
} from "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/layers/support/TileMatrixSet.js
var l2;
var n = l2 = class extends f {
  constructor(t3) {
    super(t3), this.fullExtent = null, this.id = null, this.tileInfo = null;
  }
  clone() {
    const t3 = new l2();
    return this.hasOwnProperty("fullExtent") && (t3.fullExtent = this.fullExtent?.clone() ?? null), this.hasOwnProperty("id") && (t3.id = this.id), this.hasOwnProperty("tileInfo") && (t3.tileInfo = this.tileInfo?.clone() ?? null), t3;
  }
};
e([y({ type: w, json: { read: { source: "fullExtent" } } })], n.prototype, "fullExtent", void 0), e([y({ type: String, json: { read: { source: "id" } } })], n.prototype, "id", void 0), e([y({ type: z, json: { read: { source: "tileInfo" } } })], n.prototype, "tileInfo", void 0), n = l2 = e([a2("esri.layers.support.TileMatrixSet")], n);
var p3 = n;

// node_modules/@arcgis/core/layers/support/WMTSStyle.js
var o5;
var i = o5 = class extends f {
  constructor(r3) {
    super(r3), this.id = null, this.title = null, this.description = null, this.legendUrl = null;
  }
  clone() {
    const r3 = new o5();
    return this.hasOwnProperty("description") && (r3.description = this.description), this.hasOwnProperty("id") && (r3.id = this.id), this.hasOwnProperty("isDefault") && (r3.isDefault = this.isDefault), this.hasOwnProperty("keywords") && (r3.keywords = this.keywords && this.keywords.slice()), this.hasOwnProperty("legendUrl") && (r3.legendUrl = this.legendUrl), this.hasOwnProperty("title") && (r3.title = this.title), r3;
  }
};
e([y({ json: { read: { source: "id" } } })], i.prototype, "id", void 0), e([y({ json: { read: { source: "title" } } })], i.prototype, "title", void 0), e([y({ json: { read: { source: "abstract" } } })], i.prototype, "description", void 0), e([y({ json: { read: { source: "legendUrl" } } })], i.prototype, "legendUrl", void 0), e([y({ json: { read: { source: "isDefault" } } })], i.prototype, "isDefault", void 0), e([y({ json: { read: { source: "keywords" } } })], i.prototype, "keywords", void 0), i = o5 = e([a2("esri.layers.support.WMTSStyle")], i);
var p4 = i;

// node_modules/@arcgis/core/layers/support/WMTSSublayer.js
var p5;
var m = p5 = class extends f {
  constructor(t3) {
    super(t3), this.description = null, this.fullExtent = null, this.fullExtents = null, this.id = null, this.imageFormats = null, this.layer = null, this.parent = null, this.styles = null, this.title = null, this.tileMatrixSetId = null, this.tileMatrixSets = null;
  }
  readFullExtent(t3, e3) {
    return (t3 = e3.fullExtent) ? w.fromJSON(t3) : null;
  }
  readFullExtents(t3, e3) {
    return e3.fullExtents?.length ? e3.fullExtents.map((t4) => w.fromJSON(t4)) : e3.tileMatrixSets?.map((t4) => w.fromJSON(t4.fullExtent)).filter((t4) => t4) ?? [];
  }
  get imageFormat() {
    let t3 = this._get("imageFormat");
    return t3 || (t3 = this.imageFormats?.length ? this.imageFormats[0] : ""), t3;
  }
  set imageFormat(t3) {
    const e3 = this.imageFormats;
    t3 && (t3.includes("image/") || e3 && !e3.includes(t3)) && (t3.includes("image/") || (t3 = "image/" + t3), e3 && !e3.includes(t3)) ? console.error("The layer doesn't support the format of " + t3) : this._set("imageFormat", t3);
  }
  get styleId() {
    let t3 = this._get("styleId");
    return t3 || (t3 = this.styles?.at(0)?.id ?? ""), t3;
  }
  set styleId(t3) {
    this._set("styleId", t3);
  }
  get tileMatrixSet() {
    return this.tileMatrixSets ? this.tileMatrixSets.find((t3) => t3.id === this.tileMatrixSetId) : null;
  }
  clone() {
    const t3 = new p5();
    return this.hasOwnProperty("description") && (t3.description = this.description), this.hasOwnProperty("imageFormats") && (t3.imageFormats = this.imageFormats?.slice() ?? null), this.hasOwnProperty("imageFormat") && (t3.imageFormat = this.imageFormat), this.hasOwnProperty("fullExtent") && (t3.fullExtent = this.fullExtent?.clone()), this.hasOwnProperty("id") && (t3.id = this.id), this.hasOwnProperty("layer") && (t3.layer = this.layer), this.hasOwnProperty("styleId") && (t3.styleId = this.styleId), this.hasOwnProperty("styles") && (t3.styles = this.styles?.clone()), this.hasOwnProperty("tileMatrixSetId") && (t3.tileMatrixSetId = this.tileMatrixSetId), this.hasOwnProperty("tileMatrixSets") && (t3.tileMatrixSets = this.tileMatrixSets?.clone()), this.hasOwnProperty("title") && (t3.title = this.title), t3;
  }
};
e([y()], m.prototype, "description", void 0), e([y()], m.prototype, "fullExtent", void 0), e([o("fullExtent", ["fullExtent"])], m.prototype, "readFullExtent", null), e([y({ readOnly: true })], m.prototype, "fullExtents", void 0), e([o("fullExtents", ["fullExtents", "tileMatrixSets"])], m.prototype, "readFullExtents", null), e([y()], m.prototype, "id", void 0), e([y()], m.prototype, "imageFormat", null), e([y({ json: { read: { source: "formats" } } })], m.prototype, "imageFormats", void 0), e([y()], m.prototype, "layer", void 0), e([y()], m.prototype, "parent", void 0), e([y()], m.prototype, "styleId", null), e([y({ type: V.ofType(p4), json: { read: { source: "styles" } } })], m.prototype, "styles", void 0), e([y({ json: { write: { ignoreOrigin: true } } })], m.prototype, "title", void 0), e([y()], m.prototype, "tileMatrixSetId", void 0), e([y({ readOnly: true })], m.prototype, "tileMatrixSet", null), e([y({ type: V.ofType(p3), json: { read: { source: "tileMatrixSets" } } })], m.prototype, "tileMatrixSets", void 0), m = p5 = e([a2("esri.layers.support.WMTSSublayer")], m);
var u = m;

// node_modules/@arcgis/core/layers/support/wmtsUtils.js
var u2 = 90.71428571428571;
function p6(e3) {
  const n2 = e3.replaceAll(/ows:/gi, "");
  if (!g("Contents", new DOMParser().parseFromString(n2, "text/xml").documentElement))
    throw new s("wmtslayer:wmts-capabilities-xml-is-not-valid", "the wmts get capabilities response is not compliant", { text: e3 });
}
function f4(e3, n2) {
  e3 = e3.replaceAll(/ows:/gi, "");
  const i2 = new DOMParser().parseFromString(e3, "text/xml").documentElement, r3 = /* @__PURE__ */ new Map(), l3 = /* @__PURE__ */ new Map(), o6 = g("Contents", i2);
  if (!o6)
    throw new s("wmtslayer:wmts-capabilities-xml-is-not-valid");
  const s2 = g("OperationsMetadata", i2), a4 = s2?.querySelector("[name='GetTile']"), c = a4?.getElementsByTagName("Get"), u3 = c && Array.prototype.slice.call(c), p7 = n2.url?.indexOf("https"), f5 = void 0 !== p7 && p7 > -1;
  let d3, m3, h2 = n2.serviceMode, T2 = n2?.url;
  if (u3?.length && u3.some((e4) => {
    const t3 = g("Constraint", e4);
    return !t3 || C2("AllowedValues", "Value", h2, t3) ? (T2 = e4.attributes[0].nodeValue, true) : (!t3 || C2("AllowedValues", "Value", "RESTful", t3) || C2("AllowedValues", "Value", "REST", t3) ? m3 = e4.attributes[0].nodeValue : t3 && !C2("AllowedValues", "Value", "KVP", t3) || (d3 = e4.attributes[0].nodeValue), false);
  }), !T2)
    if (m3)
      T2 = m3, h2 = "RESTful";
    else if (d3)
      T2 = d3, h2 = "KVP";
    else {
      const e4 = g("ServiceMetadataURL", i2);
      T2 = e4?.getAttribute("xlink:href");
    }
  const y3 = T2.indexOf("1.0.0/");
  -1 === y3 && "RESTful" === h2 ? T2 += "/" : y3 > -1 && (T2 = T2.substring(0, y3)), "KVP" === h2 && (T2 += y3 > -1 ? "" : "?"), f5 && (T2 = T2.replace(/^http:/i, "https:"));
  const R3 = w2("ServiceIdentification>ServiceTypeVersion", i2), S3 = w2("ServiceIdentification>AccessConstraints", i2), A2 = S3 && /^none$/i.test(S3) ? null : S3, V4 = x("Layer", o6), b3 = x("TileMatrixSet", o6), E2 = V4.map((e4) => {
    const t3 = w2("Identifier", e4);
    return r3.set(t3, e4), M(t3, e4, b3, f5, R3);
  });
  return { copyright: A2, dimensionMap: l3, layerMap: r3, layers: E2, serviceMode: h2, tileUrl: T2 };
}
function d2(e3) {
  return e3.layers.forEach((e4) => {
    e4.tileMatrixSets?.forEach((e5) => {
      const t3 = e5.tileInfo;
      t3 && 96 !== t3.dpi && (t3.lods?.forEach((n2) => {
        n2.scale = 96 * n2.scale / t3.dpi, n2.resolution = j2(t3.spatialReference?.wkid, n2.scale * u2 / 96, e5.id);
      }), t3.dpi = 96);
    });
  }), e3;
}
function m2(e3) {
  return e3.nodeType === Node.ELEMENT_NODE;
}
function g(e3, t3) {
  for (let n2 = 0; n2 < t3.childNodes.length; n2++) {
    const i2 = t3.childNodes[n2];
    if (m2(i2) && i2.nodeName === e3)
      return i2;
  }
  return null;
}
function x(e3, t3) {
  const n2 = [];
  for (let i2 = 0; i2 < t3.childNodes.length; i2++) {
    const r3 = t3.childNodes[i2];
    m2(r3) && r3.nodeName === e3 && n2.push(r3);
  }
  return n2;
}
function h(t3, n2) {
  const i2 = [];
  for (let e3 = 0; e3 < n2.childNodes.length; e3++) {
    const r3 = n2.childNodes[e3];
    m2(r3) && r3.nodeName === t3 && i2.push(r3);
  }
  return i2.map((e3) => e3.textContent).filter(O);
}
function w2(e3, t3) {
  return e3.split(">").forEach((e4) => {
    t3 && (t3 = g(e4, t3));
  }), t3 && t3.textContent;
}
function C2(e3, t3, n2, i2) {
  let r3;
  return Array.prototype.slice.call(i2.childNodes).some((i3) => {
    if (i3.nodeName.includes(e3)) {
      const e4 = g(t3, i3), l3 = e4?.textContent;
      if (l3 === n2 || n2.split(":") && n2.split(":")[1] === l3)
        return r3 = i3, true;
    }
    return false;
  }), r3;
}
function M(e3, t3, n2, i2, r3) {
  const l3 = w2("Abstract", t3), o6 = h("Format", t3);
  return { id: e3, fullExtent: A(t3), fullExtents: V2(t3), description: l3, formats: o6, styles: b2(t3, i2), title: w2("Title", t3), tileMatrixSets: E(r3, t3, n2) };
}
function T(e3, t3) {
  const n2 = [], i2 = e3.layerMap?.get(t3);
  if (!i2)
    return null;
  const r3 = x("ResourceURL", i2), l3 = x("Dimension", i2);
  let o6, s2, a4, c;
  return l3.length && (o6 = w2("Identifier", l3[0]), s2 = h("Default", l3[0]) || h("Value", l3[0])), l3.length > 1 && (a4 = w2("Identifier", l3[1]), c = h("Default", l3[1]) || h("Value", l3[1])), e3.dimensionMap.set(t3, { dimensions: s2, dimensions2: c }), r3.forEach((e4) => {
    let t4 = e4.getAttribute("template");
    if ("tile" === e4.getAttribute("resourceType")) {
      if (o6 && s2.length)
        if (t4.includes("{" + o6 + "}"))
          t4 = t4.replace("{" + o6 + "}", "{dimensionValue}");
        else {
          const e5 = t4.toLowerCase().indexOf("{" + o6.toLowerCase() + "}");
          e5 > -1 && (t4 = t4.substring(0, e5) + "{dimensionValue}" + t4.substring(e5 + o6.length + 2));
        }
      if (a4 && c.length)
        if (t4.includes("{" + a4 + "}"))
          t4 = t4.replace("{" + a4 + "}", "{dimensionValue2}");
        else {
          const e5 = t4.toLowerCase().indexOf("{" + a4.toLowerCase() + "}");
          e5 > -1 && (t4 = t4.substring(0, e5) + "{dimensionValue2}" + t4.substring(e5 + a4.length + 2));
        }
      n2.push({ template: t4, format: e4.getAttribute("format"), resourceType: "tile" });
    }
  }), n2;
}
function y2(e3, t3, n2, i2, r3, l3, o6, s2) {
  const a4 = R2(e3, t3, i2);
  if (!(a4?.length > 0))
    return "";
  const { dimensionMap: c } = e3, u3 = c.get(t3).dimensions?.[0], p7 = c.get(t3).dimensions2?.[0];
  return a4[o6 % a4.length].template.replaceAll(/\{Style\}/gi, r3 ?? "").replaceAll(/\{TileMatrixSet\}/gi, n2 ?? "").replaceAll(/\{TileMatrix\}/gi, l3).replaceAll(/\{TileRow\}/gi, "" + o6).replaceAll(/\{TileCol\}/gi, "" + s2).replaceAll(/\{dimensionValue\}/gi, u3).replaceAll(/\{dimensionValue2\}/gi, p7);
}
function R2(e3, t3, n2) {
  const i2 = T(e3, t3), r3 = i2?.filter((e4) => e4.format === n2);
  return (r3?.length ? r3 : i2) ?? [];
}
function S2(e3, t3, n2, i2) {
  const { dimensionMap: r3 } = e3, l3 = T(e3, t3);
  let o6 = "";
  if (l3 && l3.length > 0) {
    const e4 = r3.get(t3).dimensions?.[0], s2 = r3.get(t3).dimensions2?.[0];
    o6 = l3[0].template, o6.endsWith(".xxx") && (o6 = o6.slice(0, -4)), o6 = o6.replaceAll(/\{Style\}/gi, i2), o6 = o6.replaceAll(/\{TileMatrixSet\}/gi, n2), o6 = o6.replaceAll(/\{TileMatrix\}/gi, "{level}"), o6 = o6.replaceAll(/\{TileRow\}/gi, "{row}"), o6 = o6.replaceAll(/\{TileCol\}/gi, "{col}"), o6 = o6.replaceAll(/\{dimensionValue\}/gi, e4), o6 = o6.replaceAll(/\{dimensionValue2\}/gi, s2);
  }
  return o6;
}
function A(e3) {
  const t3 = g("WGS84BoundingBox", e3), n2 = t3 ? w2("LowerCorner", t3).split(" ") : ["-180", "-90"], i2 = t3 ? w2("UpperCorner", t3).split(" ") : ["180", "90"];
  return { xmin: parseFloat(n2[0]), ymin: parseFloat(n2[1]), xmax: parseFloat(i2[0]), ymax: parseFloat(i2[1]), spatialReference: { wkid: 4326 } };
}
function V2(e3) {
  const t3 = [];
  return o3(e3, { BoundingBox: (e4) => {
    if (!e4.getAttribute("crs"))
      return;
    const n2 = e4.getAttribute("crs").toLowerCase(), i2 = I3(n2), r3 = n2.includes("epsg") && o4(i2.wkid);
    let l3, a4, c, u3;
    o3(e4, { LowerCorner: (e5) => {
      [l3, a4] = e5.textContent.split(" ").map((e6) => Number.parseFloat(e6)), r3 && ([l3, a4] = [a4, l3]);
    }, UpperCorner: (e5) => {
      [c, u3] = e5.textContent.split(" ").map((e6) => Number.parseFloat(e6)), r3 && ([c, u3] = [u3, c]);
    } }), t3.push({ xmin: l3, ymin: a4, xmax: c, ymax: u3, spatialReference: i2 });
  } }), t3;
}
function b2(e3, t3) {
  return x("Style", e3).map((e4) => {
    const n2 = g("LegendURL", e4), i2 = g("Keywords", e4), r3 = i2 ? h("Keyword", i2) : [];
    let l3 = n2?.getAttribute("xlink:href");
    t3 && (l3 = l3?.replace(/^http:/i, "https:"));
    return { abstract: w2("Abstract", e4), id: w2("Identifier", e4), isDefault: "true" === e4.getAttribute("isDefault"), keywords: r3, legendUrl: l3, title: w2("Title", e4) };
  });
}
function E(e3, t3, n2) {
  return x("TileMatrixSetLink", t3).map((t4) => L(e3, t4, n2));
}
function L(e3, t3, n2) {
  const i2 = g("TileMatrixSet", t3).textContent, r3 = h("TileMatrix", t3), l3 = n2.find((e4) => {
    const t4 = g("Identifier", e4), n3 = t4?.textContent;
    return !!(n3 === i2 || i2.split(":") && i2.split(":")[1] === n3);
  }), o6 = g("TileMatrixSetLimits", t3), s2 = o6 && x("TileMatrixLimits", o6), a4 = /* @__PURE__ */ new Map();
  if (s2?.length)
    for (const c of s2) {
      const e4 = g("TileMatrix", c).textContent, t4 = +g("MinTileRow", c).textContent, n3 = +g("MaxTileRow", c).textContent, i3 = +g("MinTileCol", c).textContent, r4 = +g("MaxTileCol", c).textContent;
      a4.set(e4, { minCol: i3, maxCol: r4, minRow: t4, maxRow: n3 });
    }
  const u3 = w2("SupportedCRS", l3).toLowerCase(), p7 = N(l3, u3), f5 = p7.spatialReference, d3 = g("TileMatrix", l3), m3 = [parseInt(w2("TileWidth", d3), 10), parseInt(w2("TileHeight", d3), 10)], M2 = [];
  if (r3.length)
    r3.forEach((e4, t4) => {
      const n3 = C2("TileMatrix", "Identifier", e4, l3);
      M2.push(k(n3, u3, t4, i2, a4));
    });
  else {
    x("TileMatrix", l3).forEach((e4, t4) => {
      M2.push(k(e4, u3, t4, i2, a4));
    });
  }
  const T2 = F(e3, l3, p7, m3, M2[0]).toJSON(), y3 = new z({ dpi: 96, spatialReference: f5, size: m3, origin: p7, lods: M2 }).toJSON();
  return { id: i2, fullExtent: T2, tileInfo: y3 };
}
function I3(e3) {
  e3 = e3.toLowerCase();
  let t3 = parseInt(e3.split(":").pop(), 10);
  900913 !== t3 && 3857 !== t3 || (t3 = 102100);
  const n2 = O2(e3);
  return null != n2 && (t3 = n2), { wkid: t3 };
}
function N(e3, t3) {
  return v3(g("TileMatrix", e3), t3);
}
function v3(e3, t3) {
  const n2 = I3(t3), [i2, l3] = w2("TopLeftCorner", e3).split(" ").map((e4) => parseFloat(e4)), s2 = t3.includes("epsg") && o4(n2.wkid);
  return new _(s2 ? { x: l3, y: i2, spatialReference: n2 } : { x: i2, y: l3, spatialReference: n2 });
}
function F(e3, t3, n2, r3, l3) {
  const o6 = g("BoundingBox", t3);
  let s2, a4, c, u3, p7, f5;
  if (o6 && (s2 = w2("LowerCorner", o6).split(" "), a4 = w2("UpperCorner", o6).split(" ")), s2 && s2.length > 1 && a4 && a4.length > 1)
    c = parseFloat(s2[0]), p7 = parseFloat(s2[1]), u3 = parseFloat(a4[0]), f5 = parseFloat(a4[1]);
  else {
    const e4 = g("TileMatrix", t3), i2 = parseInt(w2("MatrixWidth", e4), 10), o7 = parseInt(w2("MatrixHeight", e4), 10);
    c = n2.x, f5 = n2.y, u3 = c + i2 * r3[0] * l3.resolution, p7 = f5 - o7 * r3[1] * l3.resolution;
  }
  return U2(e3, n2.spatialReference, n2) ? new w(p7, c, f5, u3, n2.spatialReference) : new w(c, p7, u3, f5, n2.spatialReference);
}
function U2(e3, t3, n2) {
  return "1.0.0" === e3 && o4(t3.wkid) && !(n2.spatialReference.isGeographic && n2.x < -90 && n2.y >= -90);
}
var D;
function O2(e3) {
  return e3.includes("crs84") || e3.includes("crs:84") ? D.CRS84 : e3.includes("crs83") || e3.includes("crs:83") ? D.CRS83 : e3.includes("crs27") || e3.includes("crs:27") ? D.CRS27 : null;
}
function k(e3, t3, n2, i2, r3) {
  const l3 = I3(t3), o6 = w2("Identifier", e3);
  let s2 = parseFloat(w2("ScaleDenominator", e3));
  const c = j2(l3.wkid, s2, i2);
  s2 *= 96 / u2;
  const p7 = +w2("MatrixWidth", e3), f5 = +w2("MatrixHeight", e3), { maxCol: d3 = p7 - 1, maxRow: m3 = f5 - 1, minCol: g2 = 0, minRow: x2 = 0 } = r3.get(o6) ?? {}, { x: h2, y: C3 } = v3(e3, t3);
  return new p({ cols: [g2, d3], level: n2, levelValue: o6, origin: [h2, C3], scale: s2, resolution: c, rows: [x2, m3] });
}
function j2(e3, t3, i2) {
  let r3;
  return r3 = r.hasOwnProperty("" + e3) ? r.values[r[e3]] : "default028mm" === i2 ? 6370997 * Math.PI / 180 : R(e3).metersPerDegree, 7 * t3 / 25e3 / r3;
}
!function(e3) {
  e3[e3.CRS84 = 4326] = "CRS84", e3[e3.CRS83 = 4269] = "CRS83", e3[e3.CRS27 = 4267] = "CRS27";
}(D || (D = {}));

// node_modules/@arcgis/core/layers/WMTSLayer.js
var W;
var F2 = { "image/png": ".png", "image/png8": ".png", "image/png24": ".png", "image/png32": ".png", "image/jpg": ".jpg", "image/jpeg": ".jpeg", "image/gif": ".gif", "image/bmp": ".bmp", "image/tiff": ".tif", "image/jpgpng": "", "image/jpegpng": "", "image/unknown": "" };
var V3 = /* @__PURE__ */ new Set(["version", "service", "request", "layer", "style", "format", "tilematrixset", "tilematrix", "tilerow", "tilecol"]);
var B = W = class extends l(f2(t2(b(j(S(f3)))))) {
  constructor(...e3) {
    super(...e3), this.activeLayer = null, this.copyright = "", this.customParameters = null, this.customLayerParameters = null, this.fullExtent = null, this.operationalLayerType = "WebTiledLayer", this.resourceInfo = null, this.serviceMode = "RESTful", this.sublayers = null, this.type = "wmts", this.version = "1.0.0", this.addHandles([d(() => this.activeLayer, (e4, t3) => {
      t3 && !this.sublayers?.includes(t3) && (t3.layer = null, t3.parent = null), e4 && (e4.layer = this, e4.parent = this);
    }, C), v2(() => this.sublayers, "after-add", ({ item: e4 }) => {
      e4.layer = this, e4.parent = this;
    }, C), v2(() => this.sublayers, "after-remove", ({ item: e4 }) => {
      e4.layer = null, e4.parent = null;
    }, C), d(() => this.sublayers, (e4, t3) => {
      if (t3)
        for (const r3 of t3)
          r3.layer = null, r3.parent = null;
      if (e4)
        for (const r3 of e4)
          r3.layer = this, r3.parent = this;
    }, C)]);
  }
  normalizeCtorArgs(e3, t3) {
    return "string" == typeof e3 ? __spreadValues({ url: e3 }, t3) : e3;
  }
  load(e3) {
    return this.addResolvingPromise(this.loadFromPortal({ supportedTypes: ["WMTS"] }, e3).catch(a3).then(() => this._fetchService(e3)).catch((e4) => {
      throw a3(e4), new s("wmtslayer:unsupported-service-data", "Invalid response from the WMTS service.", { error: e4 });
    })), Promise.resolve(this);
  }
  readActiveLayerFromService(e3, t3, r3) {
    this.activeLayer || (this.activeLayer = new u());
    let i2 = t3.layers.find((e4) => e4.id === this.activeLayer.id);
    return i2 || (i2 = t3.layers[0]), this.activeLayer.read(i2, r3), this.activeLayer;
  }
  readActiveLayerFromItemOrWebDoc(e3, t3) {
    const { templateUrl: r3, wmtsInfo: i2 } = t3, s2 = r3 ? this._getLowerCasedUrlParams(r3) : null, a4 = i2?.layerIdentifier;
    let o6 = null;
    const l3 = i2?.tileMatrixSet;
    l3 && (Array.isArray(l3) ? l3.length && (o6 = l3[0]) : o6 = l3);
    const n2 = s2?.format, m3 = s2?.style;
    return new u({ id: a4, imageFormat: n2, styleId: m3, tileMatrixSetId: o6 });
  }
  writeActiveLayer(e3, t3, r3, i2) {
    const s2 = this.activeLayer;
    t3.templateUrl = this.getUrlTemplate(s2.id, s2.tileMatrixSetId, s2.imageFormat, s2.styleId);
    const a4 = t("tileMatrixSet.tileInfo", s2);
    t3.tileInfo = a4 ? a4.toJSON(i2) : null, t3.wmtsInfo = __spreadProps(__spreadValues({}, t3.wmtsInfo), { layerIdentifier: s2.id, tileMatrixSet: s2.tileMatrixSetId });
  }
  readCustomParameters(e3, t3) {
    const r3 = t3.wmtsInfo;
    return r3 ? this._mergeParams(r3.customParameters, r3.url) : null;
  }
  get fullExtents() {
    return this.activeLayer.fullExtents;
  }
  readServiceMode(e3, t3) {
    return t3.templateUrl.includes("?") ? "KVP" : "RESTful";
  }
  readSublayersFromService(e3, t3, r3) {
    return $(t3.layers, r3);
  }
  get supportedSpatialReferences() {
    return this.activeLayer.tileMatrixSets?.map((e3) => e3.tileInfo?.spatialReference).toArray().filter(O) ?? [];
  }
  get tilemapCache() {
    const e3 = this.activeLayer?.tileMatrixSet?.tileInfo;
    return e3 ? new e2(e3) : void 0;
  }
  get title() {
    return this.activeLayer?.title ?? "Layer";
  }
  set title(e3) {
    this._overrideIfSome("title", e3);
  }
  get url() {
    return this._get("url");
  }
  set url(e3) {
    e3 && "/" === e3.substr(-1) ? this._set("url", e3.slice(0, -1)) : this._set("url", e3);
  }
  createWebTileLayer(e3) {
    const t3 = this.getUrlTemplate(this.activeLayer.id, this.activeLayer.tileMatrixSetId, this.activeLayer.imageFormat, this.activeLayer.styleId), r3 = this._getTileMatrixSetById(e3.tileMatrixSetId), i2 = r3?.tileInfo, s2 = e3.fullExtent, a4 = new p2({ layerIdentifier: e3.id, tileMatrixSet: e3.tileMatrixSetId, url: this.url });
    return this.customLayerParameters && (a4.customLayerParameters = this.customLayerParameters), this.customParameters && (a4.customParameters = this.customParameters), new I2({ fullExtent: s2, urlTemplate: t3, tileInfo: i2, wmtsInfo: a4 });
  }
  fetchTile(_0, _1, _2) {
    return __async(this, arguments, function* (e3, r3, i2, s2 = {}) {
      const { signal: a4 } = s2, o6 = this.getTileUrl(e3, r3, i2), { data: l3 } = yield U(o6, { responseType: "image", signal: a4 });
      return l3;
    });
  }
  fetchImageBitmapTile(_0, _1, _2) {
    return __async(this, arguments, function* (e3, r3, i2, s2 = {}) {
      const { signal: a4 } = s2;
      if (this.fetchTile !== W.prototype.fetchTile) {
        const t3 = yield this.fetchTile(e3, r3, i2, s2);
        return o2(t3, e3, r3, i2, a4);
      }
      const o6 = this.getTileUrl(e3, r3, i2), { data: l3 } = yield U(o6, { responseType: "blob", signal: a4 });
      return o2(l3, e3, r3, i2, a4);
    });
  }
  findSublayerById(e3) {
    return this.sublayers?.find((t3) => t3.id === e3);
  }
  getTileUrl(e3, t3, r3) {
    const i2 = this._getTileMatrixSetById(this.activeLayer.tileMatrixSetId), s2 = i2?.tileInfo?.lods[e3], a4 = s2 ? s2.levelValue || `${s2.level}` : `${e3}`;
    let o6 = this.resourceInfo ? "" : y2({ dimensionMap: this.dimensionMap, layerMap: this.layerMap }, this.activeLayer.id, this.activeLayer.tileMatrixSetId, this.activeLayer.imageFormat, this.activeLayer.styleId, a4, t3, r3);
    if (!o6) {
      o6 = this.getUrlTemplate(this.activeLayer.id, this.activeLayer.tileMatrixSetId, this.activeLayer.imageFormat, this.activeLayer.styleId).replaceAll(/\{level\}/gi, a4).replaceAll(/\{row\}/gi, `${t3}`).replaceAll(/\{col\}/gi, `${r3}`);
    }
    return o6 = this._appendCustomLayerParameters(o6), o6;
  }
  getUrlTemplate(e3, t3, r3, i2) {
    if (!this.resourceInfo) {
      const r4 = S2({ dimensionMap: this.dimensionMap, layerMap: this.layerMap }, e3, t3, i2);
      if (r4)
        return r4;
    }
    if ("KVP" === this.serviceMode)
      return this.url + "?SERVICE=WMTS&VERSION=" + this.version + "&REQUEST=GetTile&LAYER=" + e3 + "&STYLE=" + i2 + "&FORMAT=" + r3 + "&TILEMATRIXSET=" + t3 + "&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}";
    if ("RESTful" === this.serviceMode) {
      let s2 = "";
      return F2[r3.toLowerCase()] && (s2 = F2[r3.toLowerCase()]), this.url + e3 + "/" + i2 + "/" + t3 + "/{level}/{row}/{col}" + s2;
    }
    return "";
  }
  _fetchService(e3) {
    return __async(this, null, function* () {
      let t3;
      if (this.resourceInfo)
        "KVP" === this.resourceInfo.serviceMode && (this.url += this.url.includes("?") ? "" : "?"), t3 = { ssl: false, data: this.resourceInfo };
      else
        try {
          t3 = yield this._getCapabilities(this.serviceMode, e3), p6(t3.data);
        } catch {
          const i2 = "KVP" === this.serviceMode ? "RESTful" : "KVP";
          try {
            t3 = yield this._getCapabilities(i2, e3), p6(t3.data), this.serviceMode = i2;
          } catch (r3) {
            throw new s("wmtslayer:unsupported-service-data", "Services does not support RESTful or KVP service modes.", { error: r3 });
          }
        }
      this.resourceInfo ? t3.data = d2(t3.data) : t3.data = f4(t3.data, { serviceMode: this.serviceMode, url: this.url }), t3.data && this.read(t3.data, { origin: "service" });
    });
  }
  _getCapabilities(e3, r3) {
    return __async(this, null, function* () {
      const i2 = this._getCapabilitiesUrl(e3);
      return yield U(i2, __spreadProps(__spreadValues({}, r3), { responseType: "text" }));
    });
  }
  _getTileMatrixSetById(e3) {
    const t3 = this.findSublayerById(this.activeLayer.id), r3 = t3?.tileMatrixSets?.find((t4) => t4.id === e3);
    return r3;
  }
  _appendCustomParameters(e3) {
    return this._appendParameters(e3, this.customParameters);
  }
  _appendCustomLayerParameters(e3) {
    return this._appendParameters(e3, __spreadValues(__spreadValues({}, a(this.customParameters)), this.customLayerParameters));
  }
  _appendParameters(e3, t3) {
    const r3 = I(e3), i2 = __spreadValues(__spreadValues({}, r3.query), t3), s2 = v(i2);
    return "" === s2 ? r3.path : `${r3.path}?${s2}`;
  }
  _getCapabilitiesUrl(e3) {
    this.url = I(this.url).path;
    let t3 = this.url;
    switch (e3) {
      case "KVP":
        t3 += `?request=GetCapabilities&service=WMTS&version=${this.version}`;
        break;
      case "RESTful": {
        const e4 = `/${this.version}/WMTSCapabilities.xml`, r3 = new RegExp(e4, "i");
        t3 = t3.replace(r3, ""), t3 += e4;
        break;
      }
    }
    return this._appendCustomParameters(t3);
  }
  _getLowerCasedUrlParams(e3) {
    if (!e3)
      return null;
    const t3 = I(e3).query;
    if (!t3)
      return null;
    const r3 = {};
    return Object.keys(t3).forEach((e4) => {
      r3[e4.toLowerCase()] = t3[e4];
    }), r3;
  }
  _mergeParams(e3, t3) {
    const r3 = this._getLowerCasedUrlParams(t3);
    if (r3) {
      const t4 = Object.keys(r3);
      t4.length && (e3 = e3 ? a(e3) : {}, t4.forEach((t5) => {
        e3.hasOwnProperty(t5) || V3.has(t5) || (e3[t5] = r3[t5]);
      }));
    }
    return e3;
  }
};
function $(e3, t3) {
  return e3.map((e4) => {
    const r3 = new u();
    return r3.read(e4, t3), r3;
  });
}
e([y()], B.prototype, "dimensionMap", void 0), e([y()], B.prototype, "layerMap", void 0), e([y({ type: u, json: { origins: { "web-document": { write: { ignoreOrigin: true } } } } })], B.prototype, "activeLayer", void 0), e([o("service", "activeLayer", ["layers"])], B.prototype, "readActiveLayerFromService", null), e([o(["web-document", "portal-item"], "activeLayer", ["wmtsInfo"])], B.prototype, "readActiveLayerFromItemOrWebDoc", null), e([r2(["web-document", "portal-item"], "activeLayer", { templateUrl: { type: String }, tileInfo: { type: z }, "wmtsInfo.layerIdentifier": { type: String }, "wmtsInfo.tileMatrixSet": { type: String } })], B.prototype, "writeActiveLayer", null), e([y({ type: String, value: "", json: { write: true } })], B.prototype, "copyright", void 0), e([y({ type: ["show", "hide"] })], B.prototype, "listMode", void 0), e([y({ json: { read: true, write: true } })], B.prototype, "blendMode", void 0), e([y({ json: { origins: { "web-document": { read: { source: ["wmtsInfo.customParameters", "wmtsInfo.url"] }, write: { target: "wmtsInfo.customParameters" } }, "portal-item": { read: { source: ["wmtsInfo.customParameters", "wmtsInfo.url"] }, write: { target: "wmtsInfo.customParameters" } } } } })], B.prototype, "customParameters", void 0), e([o(["portal-item", "web-document"], "customParameters")], B.prototype, "readCustomParameters", null), e([y({ json: { origins: { "web-document": { read: { source: "wmtsInfo.customLayerParameters" }, write: { target: "wmtsInfo.customLayerParameters" } }, "portal-item": { read: { source: "wmtsInfo.customLayerParameters" }, write: { target: "wmtsInfo.customLayerParameters" } } } } })], B.prototype, "customLayerParameters", void 0), e([y({ type: w, json: { write: { ignoreOrigin: true }, origins: { "web-document": { read: { source: "fullExtent" } }, "portal-item": { read: { source: "fullExtent" } } } } })], B.prototype, "fullExtent", void 0), e([y({ readOnly: true })], B.prototype, "fullExtents", null), e([y({ type: ["WebTiledLayer"] })], B.prototype, "operationalLayerType", void 0), e([y()], B.prototype, "resourceInfo", void 0), e([y()], B.prototype, "serviceMode", void 0), e([o(["portal-item", "web-document"], "serviceMode", ["templateUrl"])], B.prototype, "readServiceMode", null), e([y({ type: V.ofType(u) })], B.prototype, "sublayers", void 0), e([o("service", "sublayers", ["layers"])], B.prototype, "readSublayersFromService", null), e([y({ readOnly: true })], B.prototype, "supportedSpatialReferences", null), e([y({ readOnly: true })], B.prototype, "tilemapCache", null), e([y({ json: { read: { source: "title" } } })], B.prototype, "title", null), e([y({ json: { read: false }, readOnly: true, value: "wmts" })], B.prototype, "type", void 0), e([y({ json: { origins: { service: { read: { source: "tileUrl" } }, "web-document": { read: { source: "wmtsInfo.url" }, write: { target: "wmtsInfo.url" } }, "portal-item": { read: { source: "wmtsInfo.url" }, write: { target: "wmtsInfo.url" } } } } })], B.prototype, "url", null), e([y()], B.prototype, "version", void 0), B = W = e([a2("esri.layers.WMTSLayer")], B);
var K = B;
export {
  K as default
};
//# sourceMappingURL=chunk-VLSAJZ3P.js.map
