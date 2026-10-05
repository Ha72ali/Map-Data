import {
  u
} from "./chunk-UER5KWEB.js";
import {
  o as o2
} from "./chunk-JAN3F2NY.js";
import {
  o as o3
} from "./chunk-JJ2NMOGF.js";
import {
  e as e2
} from "./chunk-VNWT22OX.js";
import {
  o
} from "./chunk-BYMJUQYJ.js";
import {
  r
} from "./chunk-YKH4U5BK.js";
import {
  s
} from "./chunk-VHLVKE6R.js";
import {
  n
} from "./chunk-LOE6HVIU.js";
import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a as a2,
  a3
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  a
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/symbols/support/textUtils.js
var l = ["none", "underline", "line-through"];
var t = ["normal", "italic", "oblique"];
var r2 = ["normal", "lighter", "bold", "bolder"];
var n2 = { type: Number, cast: (l4) => {
  const t2 = a2(l4);
  return 0 === t2 ? 1 : e2(t2, 0.1, 4);
}, nonNullable: true };
var i = ["left", "right", "center"];
var a4 = ["baseline", "top", "middle", "bottom"];
var m = { type: i, nonNullable: true };
var p = { type: a4, nonNullable: true };
var s2 = 8;

// node_modules/@arcgis/core/symbols/Font.js
var c;
var l2 = c = class extends f {
  constructor(t2) {
    super(t2), this.decoration = "none", this.family = "sans-serif", this.size = 9, this.style = "normal", this.weight = "normal";
  }
  castSize(t2) {
    return o2(t2);
  }
  clone() {
    return new c({ decoration: this.decoration, family: this.family, size: this.size, style: this.style, weight: this.weight });
  }
  hash() {
    return `${this.decoration}.${this.family}.${this.size}.${this.style}.${this.weight}`;
  }
};
e([y({ type: l, json: { default: "none", write: true } })], l2.prototype, "decoration", void 0), e([y({ type: String, json: { write: true } })], l2.prototype, "family", void 0), e([y({ type: Number, json: { write: { overridePolicy: (t2, o4, e4) => ({ enabled: !e4 || !e4.textSymbol3D }) } } })], l2.prototype, "size", void 0), e([s("size")], l2.prototype, "castSize", null), e([y({ type: t, json: { default: "normal", write: true } })], l2.prototype, "style", void 0), e([y({ type: r2, json: { default: "normal", write: true } })], l2.prototype, "weight", void 0), l2 = c = e([a3("esri.symbols.Font")], l2);
var m2 = l2;

// node_modules/@arcgis/core/symbols/Symbol.js
var p2 = new n({ esriSMS: "simple-marker", esriPMS: "picture-marker", esriSLS: "simple-line", esriSFS: "simple-fill", esriPFS: "picture-fill", esriTS: "text", esriSHD: "shield-label-symbol", PointSymbol3D: "point-3d", LineSymbol3D: "line-3d", PolygonSymbol3D: "polygon-3d", WebStyleSymbol: "web-style", MeshSymbol3D: "mesh-3d", LabelSymbol3D: "label-3d", CIMSymbolReference: "cim" });
var m3 = 0;
var c2 = class extends f {
  constructor(o4) {
    super(o4), this.id = "sym" + m3++, this.type = null, this.color = new u([0, 0, 0, 1]);
  }
  readColor(o4) {
    return null != o4?.[0] ? [o4[0], o4[1], o4[2], o4[3] / 255] : o4;
  }
  collectRequiredFields(o4, r3) {
    return __async(this, null, function* () {
    });
  }
  hash() {
    return JSON.stringify(this.toJSON());
  }
  clone() {
  }
};
e([y({ type: p2.apiValues, readOnly: true, json: { read: false, write: { ignoreOrigin: true, writer: p2.write } } })], c2.prototype, "type", void 0), e([y({ type: u, json: { write: { allowNull: true } } })], c2.prototype, "color", void 0), e([o("color")], c2.prototype, "readColor", null), c2 = e([a3("esri.symbols.Symbol")], c2);
var n3 = c2;

// node_modules/@arcgis/core/symbols/LineSymbol.js
var p3 = class extends n3 {
  constructor(o4) {
    super(o4), this.type = "simple-line", this.width = 0.75;
  }
  hash() {
    return `${this.type}.${this.width}`;
  }
};
e([o3({ esriSLS: "simple-line" }, { readOnly: true })], p3.prototype, "type", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], p3.prototype, "width", void 0), p3 = e([a3("esri.symbols.LineSymbol")], p3);
var c3 = p3;

// node_modules/@arcgis/core/symbols/support/lineMarkers.js
var e3 = ["begin", "end", "begin-end"];
var n4 = ["arrow", "circle", "square", "diamond", "cross", "x"];

// node_modules/@arcgis/core/symbols/LineSymbolMarker.js
var n5;
var m4 = n5 = class extends f {
  constructor(r3) {
    super(r3), this.placement = "begin-end", this.type = "line-marker", this.style = "arrow";
  }
  writeStyle(r3, o4, e4, t2) {
    o4[e4] = "web-map" === t2?.origin ? "arrow" : r3;
  }
  set color(r3) {
    this._set("color", r3);
  }
  readColor(r3) {
    return null != r3?.[0] ? [r3[0], r3[1], r3[2], r3[3] / 255] : r3;
  }
  writeColor(r3, o4, e4, t2) {
    "web-map" === t2?.origin || (o4[e4] = r3);
  }
  clone() {
    return new n5({ color: a(this.color), placement: this.placement, style: this.style });
  }
  hash() {
    return `${this.placement}.${this.color?.hash()}.${this.style}`;
  }
};
e([y({ type: ["begin", "end", "begin-end"], json: { write: true } })], m4.prototype, "placement", void 0), e([o3({ "line-marker": "line-marker" }, { readOnly: true }), y({ json: { origins: { "web-map": { write: false } } } })], m4.prototype, "type", void 0), e([y({ type: n4 })], m4.prototype, "style", void 0), e([r("style")], m4.prototype, "writeStyle", null), e([y({ type: u, value: null, json: { write: { allowNull: true } } })], m4.prototype, "color", null), e([o("color")], m4.prototype, "readColor", null), e([r("color")], m4.prototype, "writeColor", null), m4 = n5 = e([a3("esri.symbols.LineSymbolMarker")], m4);
var u2 = m4;

// node_modules/@arcgis/core/symbols/SimpleLineSymbol.js
var h;
var p4 = new n({ esriSLSSolid: "solid", esriSLSDash: "dash", esriSLSDot: "dot", esriSLSDashDot: "dash-dot", esriSLSDashDotDot: "long-dash-dot-dot", esriSLSNull: "none", esriSLSShortDash: "short-dash", esriSLSShortDot: "short-dot", esriSLSShortDashDot: "short-dash-dot", esriSLSShortDashDotDot: "short-dash-dot-dot", esriSLSLongDash: "long-dash", esriSLSLongDashDot: "long-dash-dot" });
var m5 = h = class extends c3 {
  constructor(...o4) {
    super(...o4), this.type = "simple-line", this.style = "solid", this.cap = "round", this.join = "round", this.marker = null, this.miterLimit = 2;
  }
  normalizeCtorArgs(o4, r3, t2, s3, i3, n6) {
    if (o4 && "string" != typeof o4)
      return o4;
    const l4 = {};
    return null != o4 && (l4.style = o4), null != r3 && (l4.color = r3), null != t2 && (l4.width = o2(t2)), null != s3 && (l4.cap = s3), null != i3 && (l4.join = i3), null != n6 && (l4.miterLimit = o2(n6)), l4;
  }
  clone() {
    return new h({ color: a(this.color), style: this.style, width: this.width, cap: this.cap, join: this.join, miterLimit: this.miterLimit, marker: this.marker?.clone() });
  }
  hash() {
    return `${super.hash()}.${this.color?.hash()}.${this.style}.${this.cap}.${this.join}.${this.miterLimit}.${this.marker?.hash()}`;
  }
};
e([o3({ esriSLS: "simple-line" }, { readOnly: true })], m5.prototype, "type", void 0), e([y({ type: p4.apiValues, json: { read: p4.read, write: p4.write } })], m5.prototype, "style", void 0), e([y({ type: ["butt", "round", "square"], json: { write: { overridePolicy: (o4, r3, t2) => ({ enabled: "round" !== o4 && null == t2?.origin }) } } })], m5.prototype, "cap", void 0), e([y({ type: ["miter", "round", "bevel"], json: { write: { overridePolicy: (o4, r3, t2) => ({ enabled: "round" !== o4 && null == t2?.origin }) } } })], m5.prototype, "join", void 0), e([y({ types: { key: "type", base: null, defaultKeyValue: "line-marker", typeMap: { "line-marker": u2 } }, json: { write: true, origins: { "web-scene": { write: false } } } })], m5.prototype, "marker", void 0), e([y({ type: Number, json: { read: false, write: false } })], m5.prototype, "miterLimit", void 0), m5 = h = e([a3("esri.symbols.SimpleLineSymbol")], m5);
var d = m5;

// node_modules/@arcgis/core/symbols/FillSymbol.js
var l3 = class extends n3 {
  constructor(e4) {
    super(e4), this.outline = null, this.type = null;
  }
  hash() {
    return `${this.type}.${this.outline?.hash()}`;
  }
};
e([y({ types: { key: "type", base: null, defaultKeyValue: "simple-line", typeMap: { "simple-line": d } }, json: { default: null, write: true } })], l3.prototype, "outline", void 0), e([y({ type: ["simple-fill", "picture-fill"], readOnly: true })], l3.prototype, "type", void 0), l3 = e([a3("esri.symbols.FillSymbol")], l3);
var p5 = l3;

// node_modules/@arcgis/core/symbols/SimpleFillSymbol.js
var p6;
var c4 = new n({ esriSFSSolid: "solid", esriSFSNull: "none", esriSFSHorizontal: "horizontal", esriSFSVertical: "vertical", esriSFSForwardDiagonal: "forward-diagonal", esriSFSBackwardDiagonal: "backward-diagonal", esriSFSCross: "cross", esriSFSDiagonalCross: "diagonal-cross" });
var m6 = p6 = class extends p5 {
  constructor(...o4) {
    super(...o4), this.color = new u([0, 0, 0, 0.25]), this.outline = new d(), this.type = "simple-fill", this.style = "solid";
  }
  normalizeCtorArgs(o4, r3, s3) {
    if (o4 && "string" != typeof o4)
      return o4;
    const e4 = {};
    return o4 && (e4.style = o4), r3 && (e4.outline = r3), s3 && (e4.color = s3), e4;
  }
  clone() {
    return new p6({ color: a(this.color), outline: this.outline && this.outline.clone(), style: this.style });
  }
  hash() {
    return `${super.hash()}${this.style}.${this.color && this.color.hash()}`;
  }
};
e([y()], m6.prototype, "color", void 0), e([y()], m6.prototype, "outline", void 0), e([o3({ esriSFS: "simple-fill" }, { readOnly: true })], m6.prototype, "type", void 0), e([y({ type: c4.apiValues, json: { read: c4.read, write: c4.write } })], m6.prototype, "style", void 0), m6 = p6 = e([a3("esri.symbols.SimpleFillSymbol")], m6);
var S = m6;

// node_modules/@arcgis/core/symbols/MarkerSymbol.js
var p7 = class extends n3 {
  constructor(t2) {
    super(t2), this.angle = 0, this.type = null, this.xoffset = 0, this.yoffset = 0, this.size = 9;
  }
  hash() {
    return `${this.type}.${this.angle}.${this.size}.${this.xoffset}.${this.yoffset}`;
  }
};
e([y({ type: Number, json: { read: (t2) => t2 && -1 * t2, write: (t2, e4) => e4.angle = t2 && -1 * t2 } })], p7.prototype, "angle", void 0), e([y({ type: ["simple-marker", "picture-marker"], readOnly: true })], p7.prototype, "type", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], p7.prototype, "xoffset", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], p7.prototype, "yoffset", void 0), e([y({ type: Number, cast: (t2) => "auto" === t2 ? t2 : o2(t2), json: { write: true } })], p7.prototype, "size", void 0), p7 = e([a3("esri.symbols.MarkerSymbol")], p7);
var i2 = p7;

// node_modules/@arcgis/core/symbols/SimpleMarkerSymbol.js
var h2;
var m7 = new n({ esriSMSCircle: "circle", esriSMSSquare: "square", esriSMSCross: "cross", esriSMSX: "x", esriSMSDiamond: "diamond", esriSMSTriangle: "triangle", esriSMSPath: "path" });
var u3 = h2 = class extends i2 {
  constructor(...o4) {
    super(...o4), this.color = new u([255, 255, 255, 0.25]), this.type = "simple-marker", this.size = 12, this.style = "circle", this.outline = new d();
  }
  normalizeCtorArgs(o4, e4, r3, t2) {
    if (o4 && "string" != typeof o4)
      return o4;
    const i3 = {};
    return o4 && (i3.style = o4), null != e4 && (i3.size = o2(e4)), r3 && (i3.outline = r3), t2 && (i3.color = t2), i3;
  }
  writeColor(o4, e4) {
    o4 && "x" !== this.style && "cross" !== this.style && (e4.color = o4.toJSON()), null === o4 && (e4.color = null);
  }
  set path(o4) {
    this.style = "path", this._set("path", o4);
  }
  clone() {
    return new h2({ angle: this.angle, color: a(this.color), outline: this.outline && this.outline.clone(), path: this.path, size: this.size, style: this.style, xoffset: this.xoffset, yoffset: this.yoffset });
  }
  hash() {
    return `${super.hash()}.${this.color && this.color.hash()}.${this.path}.${this.style}.${this.outline?.hash()}`;
  }
};
e([y()], u3.prototype, "color", void 0), e([r("color")], u3.prototype, "writeColor", null), e([o3({ esriSMS: "simple-marker" }, { readOnly: true })], u3.prototype, "type", void 0), e([y()], u3.prototype, "size", void 0), e([y({ type: m7.apiValues, json: { read: m7.read, write: m7.write } })], u3.prototype, "style", void 0), e([y({ type: String, json: { write: true } })], u3.prototype, "path", null), e([y({ types: { key: "type", base: null, defaultKeyValue: "simple-line", typeMap: { "simple-line": d } }, json: { default: null, write: true } })], u3.prototype, "outline", void 0), u3 = h2 = e([a3("esri.symbols.SimpleMarkerSymbol")], u3);
var y2 = u3;

// node_modules/@arcgis/core/symbols/TextSymbol.js
var f2;
var g = f2 = class extends n3 {
  constructor(...t2) {
    super(...t2), this.backgroundColor = null, this.borderLineColor = null, this.borderLineSize = null, this.font = new m2(), this.horizontalAlignment = "center", this.kerning = true, this.haloColor = null, this.haloSize = null, this.rightToLeft = null, this.rotated = false, this.text = "", this.type = "text", this.verticalAlignment = "baseline", this.xoffset = 0, this.yoffset = 0, this.angle = 0, this.width = null, this.lineWidth = 192, this.lineHeight = 1;
  }
  normalizeCtorArgs(t2, o4, e4) {
    if (t2 && "string" != typeof t2)
      return t2;
    const i3 = {};
    return t2 && (i3.text = t2), o4 && (i3.font = o4), e4 && (i3.color = e4), i3;
  }
  writeLineWidth(t2, o4, e4, i3) {
    i3 && "string" != typeof i3 ? i3.origin : o4[e4] = t2;
  }
  castLineWidth(t2) {
    return o2(t2);
  }
  writeLineHeight(t2, o4, e4, i3) {
    i3 && "string" != typeof i3 ? i3.origin : o4[e4] = t2;
  }
  clone() {
    return new f2({ angle: this.angle, backgroundColor: a(this.backgroundColor), borderLineColor: a(this.borderLineColor), borderLineSize: this.borderLineSize, color: a(this.color), font: this.font && this.font.clone(), haloColor: a(this.haloColor), haloSize: this.haloSize, horizontalAlignment: this.horizontalAlignment, kerning: this.kerning, lineHeight: this.lineHeight, lineWidth: this.lineWidth, rightToLeft: this.rightToLeft, rotated: this.rotated, text: this.text, verticalAlignment: this.verticalAlignment, width: this.width, xoffset: this.xoffset, yoffset: this.yoffset });
  }
  hash() {
    return `${this.backgroundColor?.hash()}.${this.borderLineColor}.${this.borderLineSize}.${this.color?.hash()}.${this.font && this.font.hash()}.${this.haloColor?.hash()}.${this.haloSize}.${this.horizontalAlignment}.${this.kerning}.${this.rightToLeft}.${this.rotated}.${this.text}.${this.verticalAlignment}.${this.width}.${this.xoffset}.${this.yoffset}.${this.lineHeight}.${this.lineWidth}.${this.angle}`;
  }
};
e([y({ type: u, json: { write: true } })], g.prototype, "backgroundColor", void 0), e([y({ type: u, json: { write: true } })], g.prototype, "borderLineColor", void 0), e([y({ type: Number, json: { write: true }, cast: o2 })], g.prototype, "borderLineSize", void 0), e([y({ type: m2, json: { write: true } })], g.prototype, "font", void 0), e([y(__spreadProps(__spreadValues({}, m), { json: { write: true } }))], g.prototype, "horizontalAlignment", void 0), e([y({ type: Boolean, json: { write: true } })], g.prototype, "kerning", void 0), e([y({ type: u, json: { write: true } })], g.prototype, "haloColor", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], g.prototype, "haloSize", void 0), e([y({ type: Boolean, json: { write: true } })], g.prototype, "rightToLeft", void 0), e([y({ type: Boolean, json: { write: true } })], g.prototype, "rotated", void 0), e([y({ type: String, json: { write: true } })], g.prototype, "text", void 0), e([o3({ esriTS: "text" }, { readOnly: true })], g.prototype, "type", void 0), e([y(__spreadProps(__spreadValues({}, p), { json: { write: true } }))], g.prototype, "verticalAlignment", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], g.prototype, "xoffset", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], g.prototype, "yoffset", void 0), e([y({ type: Number, json: { read: (t2) => t2 && -1 * t2, write: (t2, o4) => o4.angle = t2 && -1 * t2 } })], g.prototype, "angle", void 0), e([y({ type: Number, json: { write: true } })], g.prototype, "width", void 0), e([y({ type: Number })], g.prototype, "lineWidth", void 0), e([r("lineWidth")], g.prototype, "writeLineWidth", null), e([s("lineWidth")], g.prototype, "castLineWidth", null), e([y(n2)], g.prototype, "lineHeight", void 0), e([r("lineHeight")], g.prototype, "writeLineHeight", null), g = f2 = e([a3("esri.symbols.TextSymbol")], g);
var m8 = g;

export {
  n2 as n,
  m,
  p,
  s2 as s,
  m2,
  n3 as n2,
  e3 as e,
  n4 as n3,
  d,
  p5 as p2,
  S,
  i2 as i,
  y2 as y,
  m8 as m3
};
//# sourceMappingURL=chunk-FTWQYERS.js.map
