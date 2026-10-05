import {
  a as a4,
  i as i4,
  u as u3
} from "./chunk-4AU4YV3O.js";
import {
  n as n6,
  r as r2
} from "./chunk-QUJPV6JW.js";
import {
  S as S2,
  d,
  e as e3,
  i as i3,
  m as m2,
  m2 as m3,
  m3 as m4,
  n as n3,
  n2 as n4,
  n3 as n5,
  p as p2,
  p2 as p3,
  y as y2
} from "./chunk-FTWQYERS.js";
import {
  u as u2
} from "./chunk-UER5KWEB.js";
import {
  i as i2
} from "./chunk-5YCNWSDC.js";
import {
  C,
  v
} from "./chunk-QNED4CTP.js";
import {
  n as n2,
  t
} from "./chunk-4ZNMWBPP.js";
import {
  h as h2
} from "./chunk-EQ4EANPC.js";
import {
  e as e2,
  o as o2
} from "./chunk-JAN3F2NY.js";
import {
  o as o3
} from "./chunk-JJ2NMOGF.js";
import {
  V as V2
} from "./chunk-ZDVJGW4C.js";
import {
  C as C2
} from "./chunk-V4F7XXO4.js";
import {
  f as f2,
  h,
  m,
  p
} from "./chunk-2GHQZMFH.js";
import {
  o
} from "./chunk-BYMJUQYJ.js";
import {
  r
} from "./chunk-YKH4U5BK.js";
import {
  s as s3
} from "./chunk-VHLVKE6R.js";
import {
  i
} from "./chunk-LOE6HVIU.js";
import {
  K,
  N as N2,
  V,
  Y,
  ot,
  st,
  tt
} from "./chunk-IMLUWAKH.js";
import {
  S,
  a as a3,
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  N,
  T,
  a3 as a2,
  s3 as s,
  u3 as u
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  s as s2
} from "./chunk-NVGBLY2Q.js";
import {
  a,
  l2 as l,
  n2 as n
} from "./chunk-BTPDOHVM.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/symbols/support/IconSymbol3DLayerResource.js
var l2;
var d2 = i()({ circle: "circle", square: "square", cross: "cross", x: "x", kite: "kite", triangle: "triangle" });
var h3 = l2 = class extends f {
  constructor(r5) {
    super(r5);
  }
  readHref(r5, e10, o8) {
    return r5 ? p(r5, o8) : e10.dataURI;
  }
  writeHref(r5, e10, o8, c17) {
    r5 && (tt(r5) ? e10.dataURI = r5 : (e10.href = m(r5, c17), Y(e10.href) && (e10.href = K(e10.href))));
  }
  clone() {
    return new l2({ href: this.href, primitive: this.primitive });
  }
};
e([y({ type: String, json: { write: true, read: { source: ["href", "dataURI"] } } })], h3.prototype, "href", void 0), e([o("href")], h3.prototype, "readHref", null), e([r("href", { href: { type: String }, dataURI: { type: String } })], h3.prototype, "writeHref", null), e([o3(d2)], h3.prototype, "primitive", void 0), h3 = l2 = e([a2("esri.symbols.support.IconSymbol3DLayerResource")], h3);
var j = "circle";

// node_modules/@arcgis/core/symbols/support/ObjectSymbol3DLayerResource.js
var m5;
var n7 = i()({ sphere: "sphere", cylinder: "cylinder", cube: "cube", cone: "cone", diamond: "diamond", tetrahedron: "tetrahedron", invertedCone: "inverted-cone" });
var a5 = m5 = class extends f {
  clone() {
    return new m5({ href: this.href, primitive: this.primitive });
  }
};
e([y({ type: String, json: { read: f2, write: h } })], a5.prototype, "href", void 0), e([o3(n7)], a5.prototype, "primitive", void 0), a5 = m5 = e([a2("esri.symbols.support.ObjectSymbol3DLayerResource")], a5);
var d3 = "sphere";

// node_modules/@arcgis/core/symbols/support/StyleOrigin.js
var p4;
var l3 = p4 = class extends S {
  constructor(t9) {
    super(t9), this.name = null, this.styleUrl = null, this.styleName = null, this.portal = null;
  }
  clone() {
    return new p4({ name: this.name, styleUrl: this.styleUrl, styleName: this.styleName, portal: this.portal });
  }
};
e([y({ type: String })], l3.prototype, "name", void 0), e([y({ type: String })], l3.prototype, "styleUrl", void 0), e([y({ type: String })], l3.prototype, "styleName", void 0), e([y({ type: C2 })], l3.prototype, "portal", void 0), l3 = p4 = e([a2("esri.symbols.support.StyleOrigin")], l3);
var i5 = l3;

// node_modules/@arcgis/core/symbols/support/Thumbnail.js
var e4;
var c = e4 = class extends S {
  constructor() {
    super(...arguments), this.url = "";
  }
  clone() {
    return new e4({ url: this.url });
  }
};
e([y({ type: String })], c.prototype, "url", void 0), c = e4 = e([a2("esri.symbols.support.Thumbnail")], c);

// node_modules/@arcgis/core/symbols/support/urlUtils.js
function l4(r5, t9, a15) {
  return t9.imageData ? st({ mediaType: t9.contentType || "image/png", isBase64: true, data: t9.imageData }) : o4(t9.url, a15);
}
function o4(e10, a15) {
  if (!Y(e10)) {
    const r5 = p5(a15);
    if (r5)
      return V(r5, "images", e10);
  }
  return p(e10, a15);
}
function s4(e10, r5, t9, i10) {
  if (tt(e10)) {
    const a15 = ot(e10);
    if (!a15)
      return;
    r5.contentType = a15.mediaType, r5.imageData = a15.data, t9 && t9.imageData === r5.imageData && t9.url && h(t9.url, r5, "url", i10);
  } else
    h(e10, r5, "url", i10);
}
var m6 = { json: { read: { source: ["imageData", "url"], reader: l4 }, write: { writer(e10, r5, t9, a15) {
  s4(e10, r5, this.source, a15);
} } } };
var c2 = { readOnly: true, json: { read: { source: ["imageData", "url"], reader(e10, r5, t9) {
  const a15 = {};
  return r5.imageData && (a15.imageData = r5.imageData), r5.contentType && (a15.contentType = r5.contentType), r5.url && (a15.url = o4(r5.url, t9)), a15;
} } } };
function p5(e10) {
  if (!e10)
    return null;
  const { origin: r5, layer: t9 } = e10;
  if ("service" !== r5 && "portal-item" !== r5)
    return null;
  const a15 = t9?.type;
  return "feature" === a15 || "stream" === a15 ? t9.parsedUrl?.path : "map-image" === a15 || "tile" === a15 ? e10.url?.path : null;
}

// node_modules/@arcgis/core/symbols/PictureMarkerSymbol.js
var l5;
var a6 = l5 = class extends i3 {
  constructor(...r5) {
    super(...r5), this.color = null, this.type = "picture-marker", this.url = null, this.source = null, this.height = 12, this.width = 12, this.size = null;
  }
  normalizeCtorArgs(r5, t9, o8) {
    if (r5 && "string" != typeof r5 && null == r5.imageData)
      return r5;
    const s7 = {};
    return r5 && (s7.url = r5), null != t9 && (s7.width = o2(t9)), null != o8 && (s7.height = o2(o8)), s7;
  }
  readHeight(r5, t9) {
    return t9.size || r5;
  }
  readWidth(r5, t9) {
    return t9.size || r5;
  }
  clone() {
    const r5 = new l5({ angle: this.angle, height: this.height, url: this.url, width: this.width, xoffset: this.xoffset, yoffset: this.yoffset });
    return r5._set("source", a(this.source)), r5;
  }
  hash() {
    return `${super.hash()}.${this.height}.${this.url}.${this.width}`;
  }
};
e([y({ json: { write: false } })], a6.prototype, "color", void 0), e([o3({ esriPMS: "picture-marker" }, { readOnly: true })], a6.prototype, "type", void 0), e([y(m6)], a6.prototype, "url", void 0), e([y(c2)], a6.prototype, "source", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], a6.prototype, "height", void 0), e([o("height", ["height", "size"])], a6.prototype, "readHeight", null), e([y({ type: Number, cast: o2, json: { write: true } })], a6.prototype, "width", void 0), e([y({ json: { write: false } })], a6.prototype, "size", void 0), a6 = l5 = e([a2("esri.symbols.PictureMarkerSymbol")], a6);
var n8 = a6;

// node_modules/@arcgis/core/symbols/CIMSymbol.js
var n9;
var l6 = n9 = class extends n4 {
  constructor(r5) {
    super(r5), this.data = null, this.type = "cim";
  }
  readData(r5, o8) {
    return o8;
  }
  writeData(r5, o8) {
    Object.assign(o8, r5);
  }
  collectRequiredFields(r5, o8) {
    return __async(this, null, function* () {
      if ("CIMSymbolReference" === this.data?.type) {
        const t9 = this.data.primitiveOverrides;
        if (t9) {
          const e10 = t9.map((t10) => {
            const e11 = t10.valueExpressionInfo;
            return e11 ? h2(r5, o8, e11.expression) : null;
          });
          yield Promise.all(e10);
        }
      }
    });
  }
  clone() {
    return new n9({ data: a(this.data) });
  }
  hash() {
    return l(JSON.stringify(this.data)).toString();
  }
};
e([y({ json: { write: false } })], l6.prototype, "color", void 0), e([y({ json: { write: true } })], l6.prototype, "data", void 0), e([o("data", ["symbol"])], l6.prototype, "readData", null), e([r("data", {})], l6.prototype, "writeData", null), e([o3({ CIMSymbolReference: "cim" }, { readOnly: true })], l6.prototype, "type", void 0), l6 = n9 = e([a2("esri.symbols.CIMSymbol")], l6);
var d4 = l6;

// node_modules/@arcgis/core/symbols/Symbol3DLayer.js
var p6 = class extends f {
  constructor(e10) {
    super(e10), this.enabled = true, this.type = null, this.ignoreDrivers = false;
  }
  writeEnabled(e10, r5, o8) {
    e10 || (r5[o8] = e10);
  }
};
e([y({ type: Boolean, json: { read: { source: "enable" }, write: { target: "enable" } } })], p6.prototype, "enabled", void 0), e([r("enabled")], p6.prototype, "writeEnabled", null), e([y({ type: ["icon", "object", "line", "path", "fill", "water", "extrude", "text"], readOnly: true })], p6.prototype, "type", void 0), p6 = e([a2("esri.symbols.Symbol3DLayer")], p6);
var a7 = p6;

// node_modules/@arcgis/core/symbols/support/materialUtils.js
function s5(o8, t9) {
  const n18 = null != t9.transparency ? r2(t9.transparency) : 1, s7 = t9.color;
  return s7 && Array.isArray(s7) ? new u2([s7[0] || 0, s7[1] || 0, s7[2] || 0, n18]) : null;
}
function c3(r5, o8) {
  o8.color = r5.toJSON().slice(0, 3);
  const t9 = n6(r5.a);
  0 !== t9 && (o8.transparency = t9);
}
var p7 = { type: u2, json: { type: [N], default: null, read: { source: ["color", "transparency"], reader: s5 }, write: { target: { color: { type: [N] }, transparency: { type: N } }, writer: c3 } } };
var a8 = { type: Number, cast: o2, json: { write: true } };

// node_modules/@arcgis/core/symbols/edges/Edges3D.js
var l7 = class extends f {
  constructor(o8) {
    super(o8), this.color = new u2([0, 0, 0, 1]), this.extensionLength = 0, this.size = e2(1);
  }
  clone() {
  }
  cloneProperties() {
    return { color: a(this.color), size: this.size, extensionLength: this.extensionLength };
  }
};
e([y({ type: ["solid", "sketch"], readOnly: true, json: { read: true, write: { ignoreOrigin: true } } })], l7.prototype, "type", void 0), e([y(p7)], l7.prototype, "color", void 0), e([y(__spreadProps(__spreadValues({}, a8), { json: { write: { overridePolicy: (o8) => ({ enabled: !!o8 }) } } }))], l7.prototype, "extensionLength", void 0), e([y(a8)], l7.prototype, "size", void 0), l7 = e([a2("esri.symbols.edges.Edges3D")], l7);
var m7 = l7;

// node_modules/@arcgis/core/symbols/edges/SketchEdges3D.js
var t2;
var c4 = t2 = class extends m7 {
  constructor(r5) {
    super(r5), this.type = "sketch";
  }
  clone() {
    return new t2(this.cloneProperties());
  }
};
e([o3({ sketch: "sketch" }, { readOnly: true })], c4.prototype, "type", void 0), c4 = t2 = e([a2("esri.symbols.edges.SketchEdges3D")], c4);
var p8 = c4;

// node_modules/@arcgis/core/symbols/edges/SolidEdges3D.js
var t3;
var c5 = t3 = class extends m7 {
  constructor(o8) {
    super(o8), this.type = "solid";
  }
  clone() {
    return new t3(this.cloneProperties());
  }
};
e([o3({ solid: "solid" }, { readOnly: true })], c5.prototype, "type", void 0), c5 = t3 = e([a2("esri.symbols.edges.SolidEdges3D")], c5);
var i6 = c5;

// node_modules/@arcgis/core/symbols/edges/utils.js
var t4 = { types: { key: "type", base: m7, typeMap: { solid: i6, sketch: p8 } }, json: { write: true } };

// node_modules/@arcgis/core/symbols/support/Symbol3DMaterial.js
var c6;
var l8 = c6 = class extends f {
  constructor(o8) {
    super(o8), this.color = null;
  }
  clone() {
    const o8 = { color: null != this.color ? this.color.clone() : null };
    return new c6(o8);
  }
};
e([y(p7)], l8.prototype, "color", void 0), l8 = c6 = e([a2("esri.symbols.support.Symbol3DMaterial")], l8);

// node_modules/@arcgis/core/symbols/ExtrudeSymbol3DLayer.js
var p9;
var l9 = p9 = class extends a7 {
  constructor(e10) {
    super(e10), this.type = "extrude", this.size = 1, this.material = null, this.castShadows = true, this.edges = null;
  }
  clone() {
    return new p9({ edges: this.edges?.clone(), enabled: this.enabled, material: this.material?.clone(), castShadows: this.castShadows, size: this.size });
  }
};
e([o3({ Extrude: "extrude" }, { readOnly: true })], l9.prototype, "type", void 0), e([y({ type: Number, json: { write: { enabled: true, isRequired: true } }, nonNullable: true })], l9.prototype, "size", void 0), e([y({ type: l8, json: { write: true } })], l9.prototype, "material", void 0), e([y({ type: Boolean, nonNullable: true, json: { write: true, default: true } })], l9.prototype, "castShadows", void 0), e([y(t4)], l9.prototype, "edges", void 0), l9 = p9 = e([a2("esri.symbols.ExtrudeSymbol3DLayer")], l9);
var d5 = l9;

// node_modules/@arcgis/core/symbols/patterns/LinePattern3D.js
var t5 = class extends f {
  constructor(r5) {
    super(r5);
  }
  clone() {
    throw new Error("Subclasses of LinePattern3D should implement their own clone method.");
  }
};
e([y({ type: ["style"], readOnly: true, json: { read: true, write: { ignoreOrigin: true } } })], t5.prototype, "type", void 0), t5 = e([a2("esri.symbols.patterns.LinePattern3D")], t5);
var p10 = t5;

// node_modules/@arcgis/core/symbols/patterns/lineStyles.js
var o5 = ["dash", "dash-dot", "dot", "long-dash", "long-dash-dot", "long-dash-dot-dot", "none", "short-dash", "short-dash-dot", "short-dash-dot-dot", "short-dot", "solid"];

// node_modules/@arcgis/core/symbols/patterns/LineStylePattern3D.js
var p11;
var h4 = i()({ dash: "dash", "dash-dot": "dash-dot", "dash-dot-dot": "long-dash-dot-dot", dot: "dot", "long-dash": "long-dash", "long-dash-dot": "long-dash-dot", null: "none", "short-dash": "short-dash", "short-dash-dot": "short-dash-dot", "short-dash-dot-dot": "short-dash-dot-dot", "short-dot": "short-dot", solid: "solid" });
var n10 = p11 = class extends p10 {
  constructor(o8) {
    super(o8), this.type = "style", this.style = "solid";
  }
  clone() {
    const o8 = { style: this.style };
    return new p11(o8);
  }
};
e([y({ type: ["style"] })], n10.prototype, "type", void 0), e([o3(h4), y({ type: o5 })], n10.prototype, "style", void 0), n10 = p11 = e([a2("esri.symbols.patterns.LineStylePattern3D")], n10);
var l10 = n10;

// node_modules/@arcgis/core/symbols/patterns/Pattern3D.js
var t6 = class extends f {
  constructor(r5) {
    super(r5), this.type = "style";
  }
  clone() {
    throw new Error("Subclasses of Pattern3D should implement their own clone method.");
  }
};
e([y({ type: ["style"], readOnly: true, json: { read: true, write: { ignoreOrigin: true } } })], t6.prototype, "type", void 0), t6 = e([a2("esri.symbols.patterns.Pattern3D")], t6);
var p12 = t6;

// node_modules/@arcgis/core/symbols/patterns/styles.js
var a9 = ["backward-diagonal", "cross", "diagonal-cross", "forward-diagonal", "horizontal", "none", "solid", "vertical"];

// node_modules/@arcgis/core/symbols/patterns/StylePattern3D.js
var p13;
var c7 = p13 = class extends p12 {
  constructor(t9) {
    super(t9), this.type = "style", this.style = "solid";
  }
  clone() {
    return new p13({ style: this.style });
  }
};
e([y({ type: ["style"] })], c7.prototype, "type", void 0), e([y({ type: a9, json: { read: true, write: true } })], c7.prototype, "style", void 0), c7 = p13 = e([a2("esri.symbols.patterns.StylePattern3D")], c7);
var i7 = c7;

// node_modules/@arcgis/core/symbols/patterns/utils.js
var s6 = { types: { key: "type", base: p12, typeMap: { style: i7 } }, json: { write: true } };
var o6 = { types: { key: "type", base: p10, typeMap: { style: l10 } }, json: { write: true } };

// node_modules/@arcgis/core/symbols/support/colors.js
var o7 = new u2("white");
var r3 = new u2("black");
var e5 = new u2([255, 255, 255, 0]);
function t7(n18) {
  return 0 === n18.r && 0 === n18.g && 0 === n18.b;
}

// node_modules/@arcgis/core/symbols/support/Symbol3DFillMaterial.js
var e6;
var l11 = e6 = class extends l8 {
  constructor(o8) {
    super(o8), this.colorMixMode = null;
  }
  clone() {
    const o8 = { color: null != this.color ? this.color.clone() : null, colorMixMode: this.colorMixMode };
    return new e6(o8);
  }
};
e([o3({ multiply: "multiply", replace: "replace", tint: "tint" })], l11.prototype, "colorMixMode", void 0), l11 = e6 = e([a2("esri.symbols.support.Symbol3DFillMaterial")], l11);

// node_modules/@arcgis/core/symbols/support/Symbol3DOutline.js
var c8;
var m8 = c8 = class extends f {
  constructor(t9) {
    super(t9), this.color = new u2([0, 0, 0, 1]), this.size = e2(1), this.pattern = null, this.patternCap = "butt";
  }
  clone() {
    const t9 = { color: null != this.color ? this.color.clone() : null, size: this.size, pattern: null != this.pattern ? this.pattern.clone() : null, patternCap: this.patternCap };
    return new c8(t9);
  }
};
e([y(p7)], m8.prototype, "color", void 0), e([y(a8)], m8.prototype, "size", void 0), e([y(o6)], m8.prototype, "pattern", void 0), e([y({ type: i4, json: { default: "butt", write: { overridePolicy() {
  return { enabled: null != this.pattern };
} } } })], m8.prototype, "patternCap", void 0), m8 = c8 = e([a2("esri.symbols.support.Symbol3DOutline")], m8);

// node_modules/@arcgis/core/symbols/FillSymbol3DLayer.js
var y3;
var d6 = y3 = class extends a7 {
  constructor(t9) {
    super(t9), this.type = "fill", this.material = null, this.pattern = null, this.castShadows = true, this.outline = null, this.edges = null;
  }
  clone() {
    const t9 = { edges: null != this.edges ? this.edges.clone() : null, enabled: this.enabled, material: null != this.material ? this.material.clone() : null, pattern: null != this.pattern ? this.pattern.clone() : null, castShadows: this.castShadows, outline: null != this.outline ? this.outline.clone() : null };
    return new y3(t9);
  }
  static fromSimpleFillSymbol(t9) {
    const o8 = t9.outline && t9.outline.style && "solid" !== t9.outline.style ? new l10({ style: t9.outline.style }) : null, e10 = { size: t9.outline?.width ?? 0, color: (t9.outline?.color ?? o7).clone(), pattern: o8 };
    return o8 && t9.outline?.cap && (e10.patternCap = t9.outline.cap), new y3({ material: new l11({ color: (t9.color ?? e5).clone() }), pattern: t9.style && "solid" !== t9.style ? new i7({ style: t9.style }) : null, outline: e10 });
  }
};
e([o3({ Fill: "fill" }, { readOnly: true })], d6.prototype, "type", void 0), e([y({ type: l11, json: { write: true } })], d6.prototype, "material", void 0), e([y(s6)], d6.prototype, "pattern", void 0), e([y({ type: Boolean, nonNullable: true, json: { write: true, default: true } })], d6.prototype, "castShadows", void 0), e([y({ type: m8, json: { write: true } })], d6.prototype, "outline", void 0), e([y(t4)], d6.prototype, "edges", void 0), d6 = y3 = e([a2("esri.symbols.FillSymbol3DLayer")], d6);
var h5 = d6;

// node_modules/@arcgis/core/symbols/support/Symbol3DAnchorPosition2D.js
var e7;
var p14 = e7 = class extends S {
  constructor() {
    super(...arguments), this.x = 0, this.y = 0;
  }
  clone() {
    return new e7({ x: this.x, y: this.y });
  }
};
e([y({ type: Number })], p14.prototype, "x", void 0), e([y({ type: Number })], p14.prototype, "y", void 0), p14 = e7 = e([a2("esri.symbols.support.Symbol3DAnchorPosition2D")], p14);

// node_modules/@arcgis/core/symbols/support/Symbol3DIconOutline.js
var l12;
var m9 = l12 = class extends f {
  constructor(o8) {
    super(o8), this.color = new u2([0, 0, 0, 1]), this.size = e2(1);
  }
  clone() {
    const o8 = { color: null != this.color ? this.color.clone() : null, size: this.size };
    return new l12(o8);
  }
};
e([y(p7)], m9.prototype, "color", void 0), e([y(a8)], m9.prototype, "size", void 0), m9 = l12 = e([a2("esri.symbols.support.Symbol3DIconOutline")], m9);

// node_modules/@arcgis/core/symbols/IconSymbol3DLayer.js
var f3;
var d7 = "esri.symbols.IconSymbol3DLayer";
var b = f3 = class extends a7 {
  constructor(o8) {
    super(o8), this.material = null, this.resource = null, this.type = "icon", this.size = 12, this.anchor = "center", this.anchorPosition = null, this.outline = null;
  }
  clone() {
    return new f3({ anchor: this.anchor, anchorPosition: a(this.anchorPosition), enabled: this.enabled, material: a(this.material), outline: a(this.outline), resource: a(this.resource), size: this.size });
  }
  static fromSimpleMarkerSymbol(o8) {
    const t9 = o8.color || o7, r5 = g(o8), e10 = o8.outline && o8.outline.width > 0 ? { size: o8.outline.width, color: (o8.outline.color || o7).clone() } : null;
    return new f3({ size: o8.size, resource: { primitive: S3(o8.style) }, material: { color: t9 }, outline: e10, anchor: r5 ? "relative" : void 0, anchorPosition: r5 });
  }
  static fromPictureMarkerSymbol(o8) {
    const t9 = !o8.color || t7(o8.color) ? o7 : o8.color, r5 = g(o8);
    return new f3({ size: o8.width <= o8.height ? o8.height : o8.width, resource: { href: o8.url }, material: { color: t9.clone() }, anchor: r5 ? "relative" : void 0, anchorPosition: r5 });
  }
  static fromCIMSymbol(o8) {
    return new f3({ resource: { href: st({ mediaType: "application/json", data: JSON.stringify(o8.data) }) } });
  }
};
e([y({ type: l8, json: { write: true } })], b.prototype, "material", void 0), e([y({ type: h3, json: { write: true } })], b.prototype, "resource", void 0), e([o3({ Icon: "icon" }, { readOnly: true })], b.prototype, "type", void 0), e([y(a8)], b.prototype, "size", void 0), e([o3({ center: "center", left: "left", right: "right", top: "top", bottom: "bottom", topLeft: "top-left", topRight: "top-right", bottomLeft: "bottom-left", bottomRight: "bottom-right", relative: "relative" }), y({ json: { default: "center" } })], b.prototype, "anchor", void 0), e([y({ type: p14, json: { type: [Number], read: { reader: (o8) => new p14({ x: o8[0], y: o8[1] }) }, write: { writer: (o8, t9) => {
  t9.anchorPosition = [o8.x, o8.y];
}, overridePolicy() {
  return { enabled: "relative" === this.anchor };
} } } })], b.prototype, "anchorPosition", void 0), e([y({ type: m9, json: { write: true } })], b.prototype, "outline", void 0), b = f3 = e([a2(d7)], b);
var j2 = b;
function g(o8) {
  const t9 = "width" in o8 ? o8.width : o8.size, r5 = "height" in o8 ? o8.height : o8.size, e10 = v2(o8.xoffset), i10 = v2(o8.yoffset);
  return (e10 || i10) && t9 && r5 ? { x: -e10 / t9, y: i10 / r5 } : null;
}
function v2(o8) {
  return isFinite(o8) ? o8 : 0;
}
var w = { circle: "circle", cross: "cross", diamond: "kite", square: "square", x: "x", triangle: "triangle", path: null };
function S3(o8) {
  const t9 = w[o8];
  return t9 || (n.getLogger(d7).warn(`${o8} cannot be mapped to Icon symbol. Fallback to "circle"`), "circle");
}

// node_modules/@arcgis/core/symbols/LineStyleMarker3D.js
var n11 = class extends i2(f) {
  constructor(o8) {
    super(o8), this.type = "style", this.placement = "begin-end", this.style = "arrow", this.color = null;
  }
  equals(o8) {
    return null != o8 && o8.placement === this.placement && o8.style === this.style && (null == this.color && null == o8.color || null != this.color && null != o8.color && this.color.toJSON() === o8.color.toJSON());
  }
};
e([y({ type: ["style"], readOnly: true, json: { read: true, write: { ignoreOrigin: true } } })], n11.prototype, "type", void 0), e([y({ type: e3, json: { default: "begin-end", write: true } })], n11.prototype, "placement", void 0), e([y({ type: n5, json: { default: "arrow", write: true } })], n11.prototype, "style", void 0), e([y({ type: u2, json: { type: [N], default: null, write: true } })], n11.prototype, "color", void 0), n11 = e([a2("esri.symbols.LineStyleMarker3D")], n11);
var a10 = n11;

// node_modules/@arcgis/core/symbols/LineSymbol3DLayer.js
var j3;
var d8 = j3 = class extends a7 {
  constructor(t9) {
    super(t9), this.material = null, this.type = "line", this.join = "miter", this.cap = "butt", this.size = e2(1), this.pattern = null, this.marker = null;
  }
  clone() {
    const t9 = { enabled: this.enabled, material: null != this.material ? this.material.clone() : null, size: this.size, join: this.join, cap: this.cap, pattern: null != this.pattern ? this.pattern.clone() : null, marker: null != this.marker ? this.marker.clone() : null };
    return new j3(t9);
  }
  static fromSimpleLineSymbol(t9) {
    const e10 = { enabled: true, size: t9.width ?? e2(1), cap: t9.cap || "butt", join: t9.join || "miter", pattern: t9.style ? new l10({ style: t9.style }) : null, material: new l8({ color: (t9.color || o7).clone() }), marker: t9.marker ? new a10({ placement: t9.marker.placement, style: t9.marker.style, color: t9.marker.color?.clone() ?? null }) : null };
    return new j3(e10);
  }
};
e([y({ type: l8, json: { write: true } })], d8.prototype, "material", void 0), e([o3({ Line: "line" }, { readOnly: true })], d8.prototype, "type", void 0), e([y({ type: a4, json: { write: true, default: "miter" } })], d8.prototype, "join", void 0), e([y({ type: i4, json: { write: true, default: "butt" } })], d8.prototype, "cap", void 0), e([y(a8)], d8.prototype, "size", void 0), e([y(o6)], d8.prototype, "pattern", void 0), e([y({ types: { key: "type", base: a10, typeMap: { style: a10 } }, json: { write: true } })], d8.prototype, "marker", void 0), d8 = j3 = e([a2("esri.symbols.LineSymbol3DLayer")], d8);
var h6 = d8;

// node_modules/@arcgis/core/symbols/support/Symbol3DAnchorPosition3D.js
var e8;
var p15 = e8 = class extends S {
  constructor() {
    super(...arguments), this.x = 0, this.y = 0, this.z = 0;
  }
  clone() {
    return new e8({ x: this.x, y: this.y, z: this.z });
  }
};
e([y({ type: Number })], p15.prototype, "x", void 0), e([y({ type: Number })], p15.prototype, "y", void 0), e([y({ type: Number })], p15.prototype, "z", void 0), p15 = e8 = e([a2("esri.symbols.support.Symbol3DAnchorPosition3D")], p15);

// node_modules/@arcgis/core/symbols/ObjectSymbol3DLayer.js
var h7;
var a11 = h7 = class extends a7 {
  constructor(o8) {
    super(o8), this.material = null, this.castShadows = true, this.resource = null, this.type = "object", this.width = void 0, this.height = void 0, this.depth = void 0, this.anchor = void 0, this.anchorPosition = void 0, this.heading = void 0, this.tilt = void 0, this.roll = void 0;
  }
  clone() {
    return new h7({ heading: this.heading, tilt: this.tilt, roll: this.roll, anchor: this.anchor, anchorPosition: this.anchorPosition?.clone(), depth: this.depth, enabled: this.enabled, height: this.height, material: this.material?.clone() ?? null, castShadows: this.castShadows, resource: this.resource?.clone(), width: this.width });
  }
  get isPrimitive() {
    return !this.resource || "string" != typeof this.resource.href;
  }
};
e([y({ type: l8, json: { write: true } })], a11.prototype, "material", void 0), e([y({ type: Boolean, nonNullable: true, json: { write: true, default: true } })], a11.prototype, "castShadows", void 0), e([y({ type: a5, json: { write: true } })], a11.prototype, "resource", void 0), e([o3({ Object: "object" }, { readOnly: true })], a11.prototype, "type", void 0), e([y({ type: Number, json: { write: true } })], a11.prototype, "width", void 0), e([y({ type: Number, json: { write: true } })], a11.prototype, "height", void 0), e([y({ type: Number, json: { write: true } })], a11.prototype, "depth", void 0), e([o3({ center: "center", top: "top", bottom: "bottom", origin: "origin", relative: "relative" }), y({ json: { default: "origin" } })], a11.prototype, "anchor", void 0), e([y({ type: p15, json: { type: [Number], read: { reader: (o8) => new p15({ x: o8[0], y: o8[1], z: o8[2] }) }, write: { writer: (o8, t9) => {
  t9.anchorPosition = [o8.x, o8.y, o8.z];
}, overridePolicy() {
  return { enabled: "relative" === this.anchor };
} } } })], a11.prototype, "anchorPosition", void 0), e([y({ type: Number, json: { write: true } })], a11.prototype, "heading", void 0), e([y({ type: Number, json: { write: true } })], a11.prototype, "tilt", void 0), e([y({ type: Number, json: { write: true } })], a11.prototype, "roll", void 0), e([y({ readOnly: true })], a11.prototype, "isPrimitive", null), a11 = h7 = e([a2("esri.symbols.ObjectSymbol3DLayer")], a11);
var c9 = a11;

// node_modules/@arcgis/core/symbols/PathSymbol3DLayer.js
var h8;
var n12 = h8 = class extends a7 {
  constructor(t9) {
    super(t9), this.material = null, this.castShadows = true, this.type = "path", this.profile = "circle", this.join = "miter", this.cap = "butt", this.width = void 0, this.height = void 0, this.anchor = "center", this.profileRotation = "all";
  }
  readWidth(t9, o8) {
    return null != t9 ? t9 : null == o8.height && null != o8.size ? o8.size : void 0;
  }
  readHeight(t9, o8) {
    return null != t9 ? t9 : null == o8.width && null != o8.size ? o8.size : void 0;
  }
  clone() {
    return new h8({ enabled: this.enabled, material: null != this.material ? this.material.clone() : null, castShadows: this.castShadows, profile: this.profile, join: this.join, cap: this.cap, width: this.width, height: this.height, profileRotation: this.profileRotation, anchor: this.anchor });
  }
};
e([y({ type: l8, json: { write: true } })], n12.prototype, "material", void 0), e([y({ type: Boolean, nonNullable: true, json: { write: true, default: true } })], n12.prototype, "castShadows", void 0), e([o3({ Path: "path" }, { readOnly: true })], n12.prototype, "type", void 0), e([y({ type: ["circle", "quad"], json: { write: true, default: "circle" } })], n12.prototype, "profile", void 0), e([y({ type: a4, json: { write: true, default: "miter" } })], n12.prototype, "join", void 0), e([y({ type: u3, json: { write: true, default: "butt" } })], n12.prototype, "cap", void 0), e([y({ type: Number, json: { write: { enabled: true, target: { width: { type: Number }, size: { type: Number } } } } })], n12.prototype, "width", void 0), e([o("width", ["width", "size", "height"])], n12.prototype, "readWidth", null), e([y({ type: Number, json: { write: true } })], n12.prototype, "height", void 0), e([o("height", ["height", "size", "width"])], n12.prototype, "readHeight", null), e([y({ type: ["center", "bottom", "top"], json: { write: true, default: "center" } })], n12.prototype, "anchor", void 0), e([y({ type: ["heading", "all"], json: { write: true, default: "all" } })], n12.prototype, "profileRotation", void 0), n12 = h8 = e([a2("esri.symbols.PathSymbol3DLayer")], n12);
var d9 = n12;

// node_modules/@arcgis/core/symbols/support/Symbol3DHalo.js
var m10;
var l13 = m10 = class extends f {
  constructor() {
    super(...arguments), this.color = new u2([0, 0, 0, 1]), this.size = 0;
  }
  clone() {
    const o8 = { color: a(this.color), size: this.size };
    return new m10(o8);
  }
};
e([y(p7)], l13.prototype, "color", void 0), e([y(a8)], l13.prototype, "size", void 0), l13 = m10 = e([a2("esri.symbols.support.Symbol3DHalo")], l13);

// node_modules/@arcgis/core/symbols/support/Symbol3DTextBackground.js
var c10 = class extends i2(f) {
  constructor(o8) {
    super(o8), this.color = null;
  }
};
e([y(p7)], c10.prototype, "color", void 0), c10 = e([a2("esri.symbols.support.Symbol3DTextBackground")], c10);

// node_modules/@arcgis/core/symbols/TextSymbol3DLayer.js
var g2;
var y4 = g2 = class extends a7 {
  constructor(t9) {
    super(t9), this._userSize = void 0, this.halo = null, this.horizontalAlignment = "center", this.lineHeight = 1, this.material = null, this.background = null, this.text = null, this.type = "text", this.verticalAlignment = "baseline";
  }
  get font() {
    return this._get("font") || null;
  }
  set font(t9) {
    null != t9 && null != this._userSize && (t9.size = this._userSize), this._set("font", t9);
  }
  writeFont(t9, o8, e10, r5) {
    const i10 = __spreadProps(__spreadValues({}, r5), { textSymbol3D: true });
    o8.font = t9.write({}, i10), delete o8.font.size;
  }
  get size() {
    return null != this._userSize ? this._userSize : null != this.font?.size ? this.font.size : 9;
  }
  set size(t9) {
    this._userSize = t9, null != this.font && (this.font.size = this._userSize), this.notifyChange("size");
  }
  clone() {
    const t9 = new g2({ enabled: this.enabled, font: this.font && a(this.font), halo: this.halo && a(this.halo), horizontalAlignment: this.horizontalAlignment, lineHeight: this.lineHeight, material: null != this.material ? this.material.clone() : null, text: this.text, verticalAlignment: this.verticalAlignment, background: a(this.background) });
    return t9._userSize = this._userSize, t9;
  }
  static fromTextSymbol(t9) {
    return new g2({ font: null != t9.font ? t9.font.clone() : new m3(), halo: d10(t9.haloColor, t9.haloSize), horizontalAlignment: t9.horizontalAlignment, lineHeight: t9.lineHeight, material: t9.color ? new l8({ color: t9.color.clone() }) : null, text: t9.text, verticalAlignment: t9.verticalAlignment, background: t9.backgroundColor ? new c10({ color: t9.backgroundColor.clone() }) : null });
  }
};
function d10(t9, e10) {
  return t9 && null != e10 && e10 > 0 ? new l13({ color: a(t9), size: e10 }) : null;
}
e([y({ type: m3, json: { write: true } })], y4.prototype, "font", null), e([r("font")], y4.prototype, "writeFont", null), e([y({ type: l13, json: { write: true } })], y4.prototype, "halo", void 0), e([y(__spreadProps(__spreadValues({}, m2), { json: { default: "center", write: true } }))], y4.prototype, "horizontalAlignment", void 0), e([y(__spreadProps(__spreadValues({}, n3), { json: { default: 1, write: true } }))], y4.prototype, "lineHeight", void 0), e([y({ type: l8, json: { write: true } })], y4.prototype, "material", void 0), e([y({ type: c10, json: { write: true } })], y4.prototype, "background", void 0), e([y(a8)], y4.prototype, "size", null), e([y({ type: String, json: { write: true } })], y4.prototype, "text", void 0), e([o3({ Text: "text" }, { readOnly: true })], y4.prototype, "type", void 0), e([y(__spreadProps(__spreadValues({}, p2), { json: { default: "baseline", write: true } }))], y4.prototype, "verticalAlignment", void 0), y4 = g2 = e([a2("esri.symbols.TextSymbol3DLayer")], y4);
var z = y4;

// node_modules/@arcgis/core/symbols/WaterSymbol3DLayer.js
var l14;
var c11 = l14 = class extends a7 {
  constructor(e10) {
    super(e10), this.color = n13.clone(), this.type = "water", this.waterbodySize = "medium", this.waveDirection = null, this.waveStrength = "moderate";
  }
  clone() {
    return new l14({ color: a(this.color), waterbodySize: this.waterbodySize, waveDirection: this.waveDirection, waveStrength: this.waveStrength });
  }
};
e([y({ type: u2, nonNullable: true, json: { type: [N], write: (e10, r5, t9) => r5[t9] = e10.toArray(u2.AlphaMode.UNLESS_OPAQUE), default: () => n13.clone(), defaultEquals: (e10) => e10.toCss(true) === n13.toCss(true) } })], c11.prototype, "color", void 0), e([o3({ Water: "water" }, { readOnly: true })], c11.prototype, "type", void 0), e([y({ type: ["small", "medium", "large"], json: { write: true, default: "medium" } })], c11.prototype, "waterbodySize", void 0), e([y({ type: Number, json: { write: true, default: null } })], c11.prototype, "waveDirection", void 0), e([y({ type: ["calm", "rippled", "slight", "moderate"], json: { write: true, default: "moderate" } })], c11.prototype, "waveStrength", void 0), c11 = l14 = e([a2("esri.symbols.WaterSymbol3DLayer")], c11);
var m11 = c11;
var n13 = new u2([0, 119, 190]);

// node_modules/@arcgis/core/symbols/Symbol3D.js
var v3 = { icon: j2, object: c9, line: h6, path: d9, fill: h5, extrude: d5, text: z, water: m11 };
var C3 = V2.ofType({ base: a7, key: "type", typeMap: v3, errorContext: "symbol-layer" });
var T2 = class extends n4 {
  constructor(e10) {
    super(e10), this.styleOrigin = null, this.thumbnail = null, this.type = null;
    const t9 = this.__accessor__ && this.__accessor__.metadata && this.__accessor__.metadata.symbolLayers, o8 = t9?.type, s7 = o8 || V2;
    this._set("symbolLayers", new s7());
  }
  get color() {
    return null;
  }
  set color(e10) {
    this.constructed && n.getLogger(this).error("Symbol3D does not support colors on the symbol level. Colors may be set on individual symbol layer materials instead.");
  }
  set symbolLayers(e10) {
    n2(e10, this._get("symbolLayers"));
  }
  readStyleOrigin(e10, r5, t9) {
    if (e10.styleUrl && e10.name) {
      const r6 = p(e10.styleUrl, t9);
      return new i5({ styleUrl: r6, name: e10.name });
    }
    if (e10.styleName && e10.name)
      return new i5({ portal: t9?.portal || C2.getDefault(), styleName: e10.styleName, name: e10.name });
    t9?.messages && t9.messages.push(new s("symbol3d:incomplete-style-origin", "Style origin requires either a 'styleUrl' or 'styleName' and a 'name' property", { context: t9, definition: e10 }));
  }
  writeStyleOrigin(e10, r5, t9, o8) {
    if (e10.styleUrl && e10.name) {
      let t10 = m(e10.styleUrl, o8);
      Y(t10) && (t10 = K(t10)), r5.styleOrigin = { styleUrl: t10, name: e10.name };
    } else
      e10.styleName && e10.name && (e10.portal && o8?.portal && !N2(e10.portal.restUrl, o8.portal.restUrl) ? o8?.messages && o8.messages.push(new s("symbol:cross-portal", "The symbol style origin cannot be persisted because it refers to an item on a different portal than the one being saved to.", { symbol: this })) : r5.styleOrigin = { styleName: e10.styleName, name: e10.name });
  }
  normalizeCtorArgs(e10) {
    return e10 instanceof a7 || e10 && v3[e10.type] ? { symbolLayers: [e10] } : Array.isArray(e10) ? { symbolLayers: e10 } : e10;
  }
};
e([y({ json: { read: false, write: false } })], T2.prototype, "color", null), e([y({ type: C3, nonNullable: true, json: { write: true } }), s3(t)], T2.prototype, "symbolLayers", null), e([y({ type: i5 })], T2.prototype, "styleOrigin", void 0), e([o("styleOrigin")], T2.prototype, "readStyleOrigin", null), e([r("styleOrigin", { "styleOrigin.styleUrl": { type: String }, "styleOrigin.styleName": { type: String }, "styleOrigin.name": { type: String } })], T2.prototype, "writeStyleOrigin", null), e([y({ type: c, json: { read: false } })], T2.prototype, "thumbnail", void 0), e([y({ type: ["point-3d", "line-3d", "polygon-3d", "mesh-3d", "label-3d"], readOnly: true })], T2.prototype, "type", void 0), T2 = e([a2("esri.symbols.Symbol3D")], T2);
var k = T2;

// node_modules/@arcgis/core/symbols/callouts/Callout3D.js
var t8 = class extends f {
  constructor(o8) {
    super(o8), this.visible = true;
  }
  clone() {
    throw new Error("Subclasses of Callout3D should implement their own clone method.");
  }
};
e([y({ type: ["line"], constructOnly: true, json: { read: false, write: { ignoreOrigin: true } } })], t8.prototype, "type", void 0), e([y({ readOnly: true })], t8.prototype, "visible", void 0), t8 = e([a2("esri.symbols.callouts.Callout3D")], t8);
var c12 = t8;

// node_modules/@arcgis/core/symbols/callouts/LineCallout3DBorder.js
var l15;
var i8 = l15 = class extends f {
  constructor(o8) {
    super(o8), this.color = new u2("white");
  }
  clone() {
    return new l15({ color: a(this.color) });
  }
};
e([y(p7)], i8.prototype, "color", void 0), i8 = l15 = e([a2("esri.symbols.callouts.LineCallout3DBorder")], i8);
var m12 = i8;

// node_modules/@arcgis/core/symbols/callouts/LineCallout3D.js
var n14;
var u4 = n14 = class extends c12 {
  constructor(o8) {
    super(o8), this.type = "line", this.color = new u2([0, 0, 0, 1]), this.size = e2(1), this.border = null;
  }
  get visible() {
    return this.size > 0 && null != this.color && this.color.a > 0;
  }
  clone() {
    return new n14({ color: a(this.color), size: this.size, border: a(this.border) });
  }
};
e([o3({ line: "line" })], u4.prototype, "type", void 0), e([y(p7)], u4.prototype, "color", void 0), e([y(a8)], u4.prototype, "size", void 0), e([y({ type: m12, json: { write: true } })], u4.prototype, "border", void 0), e([y({ readOnly: true })], u4.prototype, "visible", null), u4 = n14 = e([a2("esri.symbols.callouts.LineCallout3D")], u4);
var d11 = u4;

// node_modules/@arcgis/core/symbols/callouts/calloutUtils.js
function e9(t9) {
  if (!t9)
    return false;
  const n18 = t9.verticalOffset;
  return !!n18 && !(n18.screenLength <= 0 || null != n18.maxWorldLength && n18.maxWorldLength <= 0);
}
function r4(t9) {
  if (!t9)
    return false;
  if (!t9.supportsCallout || !t9.supportsCallout())
    return false;
  const n18 = t9.callout;
  return !!n18 && (!!n18.visible && !!e9(t9));
}
var u5 = { types: { key: "type", base: c12, typeMap: { line: d11 } }, json: { write: true } };

// node_modules/@arcgis/core/symbols/support/Symbol3DVerticalOffset.js
var n15;
var i9 = n15 = class extends f {
  constructor(r5) {
    super(r5), this.screenLength = 0, this.minWorldLength = 0, this.maxWorldLength = null;
  }
  clone() {
    return new n15({ screenLength: this.screenLength, minWorldLength: this.minWorldLength, maxWorldLength: this.maxWorldLength });
  }
};
e([y(a8)], i9.prototype, "screenLength", void 0), e([y({ type: Number, nonNullable: true, json: { write: true, default: 0 } })], i9.prototype, "minWorldLength", void 0), e([y({ type: Number, json: { write: true } })], i9.prototype, "maxWorldLength", void 0), i9 = n15 = e([a2("esri.symbols.support.Symbol3DVerticalOffset")], i9);
var p16 = i9;

// node_modules/@arcgis/core/symbols/LabelSymbol3D.js
var n16;
var u6 = V2.ofType({ base: null, key: "type", typeMap: { text: z } });
var f4 = n16 = class extends k {
  constructor(t9) {
    super(t9), this.verticalOffset = null, this.callout = null, this.styleOrigin = null, this.symbolLayers = new u6(), this.type = "label-3d";
  }
  supportsCallout() {
    return true;
  }
  hasVisibleCallout() {
    return r4(this);
  }
  hasVisibleVerticalOffset() {
    return e9(this);
  }
  clone() {
    return new n16({ styleOrigin: a(this.styleOrigin), symbolLayers: a(this.symbolLayers), thumbnail: a(this.thumbnail), callout: a(this.callout), verticalOffset: a(this.verticalOffset) });
  }
  static fromTextSymbol(t9) {
    return new n16({ symbolLayers: new V2([z.fromTextSymbol(t9)]) });
  }
};
e([y({ type: p16, json: { write: true } })], f4.prototype, "verticalOffset", void 0), e([y(u5)], f4.prototype, "callout", void 0), e([y({ json: { read: false, write: false } })], f4.prototype, "styleOrigin", void 0), e([y({ type: u6 })], f4.prototype, "symbolLayers", void 0), e([o3({ LabelSymbol3D: "label-3d" }, { readOnly: true })], f4.prototype, "type", void 0), f4 = n16 = e([a2("esri.symbols.LabelSymbol3D")], f4);
var b2 = f4;

// node_modules/@arcgis/core/symbols/LineSymbol3D.js
var l16;
var a12 = V2.ofType({ base: null, key: "type", typeMap: { line: h6, path: d9 } });
var n17 = V2.ofType({ base: null, key: "type", typeMap: { line: h6, path: d9 } });
var c13 = l16 = class extends k {
  constructor(o8) {
    super(o8), this.symbolLayers = new a12(), this.type = "line-3d";
  }
  clone() {
    return new l16({ styleOrigin: a(this.styleOrigin), symbolLayers: a(this.symbolLayers), thumbnail: a(this.thumbnail) });
  }
  static fromSimpleLineSymbol(o8) {
    return new l16({ symbolLayers: new V2([h6.fromSimpleLineSymbol(o8)]) });
  }
};
e([y({ type: a12, json: { type: n17 } })], c13.prototype, "symbolLayers", void 0), e([o3({ LineSymbol3D: "line-3d" }, { readOnly: true })], c13.prototype, "type", void 0), c13 = l16 = e([a2("esri.symbols.LineSymbol3D")], c13);
var b3 = c13;

// node_modules/@arcgis/core/symbols/MeshSymbol3D.js
var p17;
var y5 = V2.ofType({ base: null, key: "type", typeMap: { fill: h5 } });
var a13 = p17 = class extends k {
  constructor(o8) {
    super(o8), this.symbolLayers = new y5(), this.type = "mesh-3d";
  }
  clone() {
    return new p17({ styleOrigin: a(this.styleOrigin), symbolLayers: a(this.symbolLayers), thumbnail: a(this.thumbnail) });
  }
  static fromSimpleFillSymbol(o8) {
    return new p17({ symbolLayers: new V2([h5.fromSimpleFillSymbol(o8)]) });
  }
};
e([y({ type: y5 })], a13.prototype, "symbolLayers", void 0), e([o3({ MeshSymbol3D: "mesh-3d" }, { readOnly: true })], a13.prototype, "type", void 0), a13 = p17 = e([a2("esri.symbols.MeshSymbol3D")], a13);
var c14 = a13;

// node_modules/@arcgis/core/symbols/PictureFillSymbol.js
var c15;
var u7 = c15 = class extends p3 {
  constructor(...t9) {
    super(...t9), this.type = "picture-fill", this.url = null, this.xscale = 1, this.yscale = 1, this.width = 12, this.height = 12, this.xoffset = 0, this.yoffset = 0, this.source = null;
  }
  normalizeCtorArgs(t9, s7, e10, r5) {
    if (t9 && "string" != typeof t9 && null == t9.imageData)
      return t9;
    const i10 = {};
    return t9 && (i10.url = t9), s7 && (i10.outline = s7), null != e10 && (i10.width = o2(e10)), null != r5 && (i10.height = o2(r5)), i10;
  }
  clone() {
    const t9 = new c15({ color: a(this.color), height: this.height, outline: a(this.outline), url: this.url, width: this.width, xoffset: this.xoffset, xscale: this.xscale, yoffset: this.yoffset, yscale: this.yscale });
    return t9._set("source", a(this.source)), t9;
  }
  hash() {
    return `${super.hash()}.${this.color?.hash()}.${this.height}.${this.url}.${this.width}.${this.xoffset}.${this.xscale}.${this.yoffset}.${this.yscale}`;
  }
};
e([o3({ esriPFS: "picture-fill" }, { readOnly: true })], u7.prototype, "type", void 0), e([y(m6)], u7.prototype, "url", void 0), e([y({ type: Number, json: { write: true } })], u7.prototype, "xscale", void 0), e([y({ type: Number, json: { write: true } })], u7.prototype, "yscale", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], u7.prototype, "width", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], u7.prototype, "height", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], u7.prototype, "xoffset", void 0), e([y({ type: Number, cast: o2, json: { write: true } })], u7.prototype, "yoffset", void 0), e([y(c2)], u7.prototype, "source", void 0), u7 = c15 = e([a2("esri.symbols.PictureFillSymbol")], u7);
var a14 = u7;

// node_modules/@arcgis/core/symbols/PointSymbol3D.js
var h9;
var S4 = V2.ofType({ base: null, key: "type", typeMap: { icon: j2, object: c9, text: z } });
var j4 = h9 = class extends k {
  constructor(o8) {
    super(o8), this.verticalOffset = null, this.callout = null, this.symbolLayers = new S4(), this.type = "point-3d";
  }
  supportsCallout() {
    if ((this.symbolLayers ? this.symbolLayers.length : 0) < 1)
      return false;
    for (const o8 of this.symbolLayers.items)
      switch (o8.type) {
        case "icon":
        case "text":
        case "object":
          continue;
        default:
          return false;
      }
    return true;
  }
  hasVisibleCallout() {
    return r4(this);
  }
  hasVisibleVerticalOffset() {
    return e9(this);
  }
  clone() {
    return new h9({ verticalOffset: a(this.verticalOffset), callout: a(this.callout), styleOrigin: a(this.styleOrigin), symbolLayers: a(this.symbolLayers), thumbnail: a(this.thumbnail) });
  }
  static fromSimpleMarkerSymbol(o8) {
    return new h9({ symbolLayers: new V2([j2.fromSimpleMarkerSymbol(o8)]) });
  }
  static fromPictureMarkerSymbol(o8) {
    return new h9({ symbolLayers: new V2([j2.fromPictureMarkerSymbol(o8)]) });
  }
  static fromCIMSymbol(o8) {
    const e10 = o8.data?.symbol?.type;
    if ("CIMPointSymbol" !== e10)
      return null;
    const s7 = o8.data.symbol;
    return new h9(s7?.callout ? { symbolLayers: new V2([j2.fromCIMSymbol(o8)]), callout: new d11({ size: 0.5, color: new u2([0, 0, 0]) }), verticalOffset: new p16({ screenLength: 40 }) } : { symbolLayers: new V2([j2.fromCIMSymbol(o8)]) });
  }
  static fromTextSymbol(o8) {
    return new h9({ symbolLayers: new V2([z.fromTextSymbol(o8)]) });
  }
};
e([y({ type: p16, json: { write: true } })], j4.prototype, "verticalOffset", void 0), e([y(u5)], j4.prototype, "callout", void 0), e([y({ type: S4, json: { origins: { "web-scene": { write: true } } } })], j4.prototype, "symbolLayers", void 0), e([o3({ PointSymbol3D: "point-3d" }, { readOnly: true })], j4.prototype, "type", void 0), j4 = h9 = e([a2("esri.symbols.PointSymbol3D")], j4);
var w2 = j4;

// node_modules/@arcgis/core/symbols/PolygonSymbol3D.js
var u8;
var j5 = V2.ofType({ base: null, key: "type", typeMap: { extrude: d5, fill: h5, icon: j2, line: h6, object: c9, text: z, water: m11 } });
var g3 = u8 = class extends k {
  constructor(o8) {
    super(o8), this.symbolLayers = new j5(), this.type = "polygon-3d";
  }
  initialize() {
    const o8 = (o9) => {
      "line" === o9.type && a3(n.getLogger(this), "LineSymbol3DLayer can not be used as a SymbolLayer with a PolygonSymbol3D symbol anymore.", { replacement: "Use FillSymbol3DLayer.outline instead.", version: "4.28" }), "text" === o9.type && a3(n.getLogger(this), "TextSymbol3DLayer can not be used as a SymbolLayer with a PolygonSymbol3D symbol anymore.", { replacement: "Use Labels instead.", version: "4.28" });
    };
    for (const e10 of this.symbolLayers)
      o8(e10);
    this.addHandles(v(() => this.symbolLayers, "after-add", ({ item: e10 }) => o8(e10), C));
  }
  clone() {
    return new u8({ styleOrigin: a(this.styleOrigin), symbolLayers: a(this.symbolLayers), thumbnail: a(this.thumbnail) });
  }
  static fromJSON(o8) {
    const e10 = new u8();
    if (e10.read(o8), 2 === e10.symbolLayers.length && "fill" === e10.symbolLayers.at(0).type && "line" === e10.symbolLayers.at(1).type) {
      const r5 = e10.symbolLayers.at(0), s7 = e10.symbolLayers.at(1);
      !s7.enabled || o8.symbolLayers?.[1] && false === o8.symbolLayers[1].enable || (r5.outline = { size: s7.size, color: null != s7.material ? s7.material.color : null }), e10.symbolLayers.removeAt(1);
    }
    return e10;
  }
  static fromSimpleFillSymbol(o8) {
    return new u8({ symbolLayers: new V2([h5.fromSimpleFillSymbol(o8)]) });
  }
};
e([y({ type: j5, json: { write: true } })], g3.prototype, "symbolLayers", void 0), e([o3({ PolygonSymbol3D: "polygon-3d" }, { readOnly: true })], g3.prototype, "type", void 0), g3 = u8 = e([a2("esri.symbols.PolygonSymbol3D")], g3);
var h10 = g3;

// node_modules/@arcgis/core/symbols/WebStyleSymbol.js
var c16;
var y6 = c16 = class extends n4 {
  constructor(t9) {
    super(t9), this.color = null, this.styleName = null, this.portal = null, this.styleUrl = null, this.thumbnail = null, this.name = null, this.type = "web-style";
  }
  get _fetchCacheKey() {
    const t9 = null != this.portal ? this.portal : C2.getDefault(), e10 = t9.user ? t9.user.username : null;
    return `${this.styleName}:${this.styleUrl}:${this.name}:${e10}:${t9.url}`;
  }
  read(t9, e10) {
    this.portal = e10?.portal, super.read(t9, e10);
  }
  clone() {
    return new c16({ name: this.name, styleUrl: this.styleUrl, styleName: this.styleName, portal: this.portal });
  }
  fetchSymbol(t9) {
    return this._fetchSymbol("webRef", t9);
  }
  fetchCIMSymbol(t9) {
    return this._fetchSymbol("cimRef", t9);
  }
  _fetchSymbol(t9, r5) {
    return __async(this, null, function* () {
      const s7 = null != r5 ? r5.cache : null, l17 = s7 ? this._fetchCacheKey : null;
      if (null != s7) {
        const t10 = l17 && s7.get(l17);
        if (t10)
          return t10.clone();
      }
      const { resolveWebStyleSymbol: i10 } = yield import("./chunk-RDHSRBTI.js");
      s2(r5);
      const p18 = i10(this, { portal: this.portal }, t9, r5);
      p18.catch((t10) => {
        n.getLogger(this).error("#fetchSymbol()", "Failed to create symbol from style", t10);
      });
      const a15 = yield p18;
      return "webRef" === t9 && "point-3d" === a15.type || "cimRef" === t9 && "cim" === a15.type ? (null != s7 && s7.set(l17, a15.clone()), a15) : null;
    });
  }
};
e([y({ json: { write: false } })], y6.prototype, "color", void 0), e([y({ type: String, json: { write: true } })], y6.prototype, "styleName", void 0), e([y({ type: C2, json: { write: false } })], y6.prototype, "portal", void 0), e([y({ type: String, json: { read: f2, write: h } })], y6.prototype, "styleUrl", void 0), e([y({ type: c, json: { read: false } })], y6.prototype, "thumbnail", void 0), e([y({ type: String, json: { write: true } })], y6.prototype, "name", void 0), e([o3({ styleSymbolReference: "web-style" }, { readOnly: true })], y6.prototype, "type", void 0), e([y()], y6.prototype, "_fetchCacheKey", null), y6 = c16 = e([a2("esri.symbols.WebStyleSymbol")], y6);
var h11 = y6;

// node_modules/@arcgis/core/symbols.js
function S5(e10) {
  if (!e10)
    return false;
  switch (e10.type) {
    case "picture-fill":
    case "picture-marker":
    case "simple-fill":
    case "simple-line":
    case "simple-marker":
    case "text":
    case "cim":
      return true;
    default:
      return false;
  }
}
function x(e10) {
  if (!e10)
    return false;
  switch (e10.type) {
    case "label-3d":
    case "line-3d":
    case "mesh-3d":
    case "point-3d":
    case "polygon-3d":
      return true;
    default:
      return false;
  }
}
var j6 = { base: n4, key: "type", typeMap: { "simple-fill": S2, "picture-fill": a14, "picture-marker": n8, "simple-line": d, "simple-marker": y2, text: m4, "label-3d": b2, "line-3d": b3, "mesh-3d": c14, "point-3d": w2, "polygon-3d": h10, "web-style": h11, cim: d4 }, errorContext: "symbol" };
var D = { base: n4, key: "type", typeMap: { "picture-marker": n8, "simple-marker": y2, "point-3d": w2, cim: d4 }, errorContext: "symbol" };
var L = { base: n4, key: "type", typeMap: { "simple-line": d, "line-3d": b3, cim: d4 }, errorContext: "symbol" };
var k2 = { base: n4, key: "type", typeMap: { "simple-fill": S2, "picture-fill": a14, "polygon-3d": h10, cim: d4 }, errorContext: "symbol" };
var M = { base: n4, key: "type", typeMap: { "picture-marker": n8, "simple-marker": y2, text: m4, "web-style": h11, cim: d4 }, errorContext: "symbol" };
var C4 = u({ types: j6 });
var h12 = { base: n4, key: "type", typeMap: { "simple-fill": S2, "picture-fill": a14, "picture-marker": n8, "simple-line": d, "simple-marker": y2, text: m4, "line-3d": b3, "mesh-3d": c14, "point-3d": w2, "polygon-3d": h10, "web-style": h11, cim: d4 }, errorContext: "symbol" };
var F = { base: n4, key: "type", typeMap: { text: m4, "label-3d": b2 }, errorContext: "symbol" };
var w3 = { base: n4, key: "type", typeMap: { "line-3d": b3, "mesh-3d": c14, "point-3d": w2, "polygon-3d": h10, "web-style": h11, cim: d4 }, errorContext: "symbol" };
var P = { base: n4, key: "type", typeMap: { "label-3d": b2 }, errorContext: "symbol" };
var B = T(j6);

export {
  d4 as d,
  i6 as i,
  t4 as t,
  l8 as l,
  h5 as h,
  j,
  h6 as h2,
  d3 as d2,
  i5 as i2,
  c,
  k,
  b2 as b,
  b3 as b2,
  c14 as c2,
  n8 as n,
  w2 as w,
  h10 as h3,
  h11 as h4,
  S5 as S,
  x,
  j6 as j2,
  D,
  L,
  k2,
  M,
  C4 as C,
  h12 as h5,
  F,
  w3 as w2,
  P,
  B
};
//# sourceMappingURL=chunk-YTC5APIA.js.map
