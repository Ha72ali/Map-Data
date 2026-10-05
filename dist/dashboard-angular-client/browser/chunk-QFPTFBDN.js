import {
  n as n3,
  o,
  r as r4,
  t
} from "./chunk-SHPHLUOA.js";
import {
  v
} from "./chunk-GB4LBHXK.js";
import {
  e as e2
} from "./chunk-7SWIYTU2.js";
import {
  C,
  D,
  E as E2,
  L as L2
} from "./chunk-GFX66WON.js";
import {
  i as i3,
  l as l2
} from "./chunk-SCADP7WG.js";
import {
  e,
  r as r2
} from "./chunk-GV5YYV7L.js";
import {
  A,
  B,
  E,
  F,
  L,
  O,
  V,
  c as c2,
  d,
  g as g3,
  i as i2,
  q,
  u as u2,
  w,
  x
} from "./chunk-CQ2LZTOT.js";
import {
  r as r3
} from "./chunk-LOGWAETQ.js";
import {
  n as n2
} from "./chunk-FSK3WP2R.js";
import {
  b as b2,
  c,
  f,
  g as g2,
  i
} from "./chunk-IIZACZCL.js";
import {
  _ as _2
} from "./chunk-FKXAUXOY.js";
import {
  U,
  _,
  nt,
  ot,
  tt
} from "./chunk-IMLUWAKH.js";
import {
  r
} from "./chunk-47ACMYSX.js";
import {
  a,
  g,
  s as s2
} from "./chunk-NVGBLY2Q.js";
import {
  n2 as n,
  s2 as s
} from "./chunk-BTPDOHVM.js";
import {
  I,
  b,
  l,
  u,
  y2 as y
} from "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/chunks/vec2.js
function o2(e6, t7) {
  n4(e6.typedBuffer, t7.typedBuffer, e6.typedBufferStride, t7.typedBufferStride);
}
function n4(o7, n8, l7 = 2, u6 = l7) {
  const i6 = n8.length / 2;
  let a3 = 0, d3 = 0;
  if (y(n8) || l(n8)) {
    for (let e6 = 0; e6 < i6; ++e6)
      o7[a3] = n8[d3], o7[a3 + 1] = n8[d3 + 1], a3 += l7, d3 += u6;
    return;
  }
  const c5 = I(n8);
  if (b(n8))
    for (let e6 = 0; e6 < i6; ++e6)
      o7[a3] = Math.max(n8[d3] / c5, -1), o7[a3 + 1] = Math.max(n8[d3 + 1] / c5, -1), a3 += l7, d3 += u6;
  else
    for (let e6 = 0; e6 < i6; ++e6)
      o7[a3] = n8[d3] / c5, o7[a3 + 1] = n8[d3 + 1] / c5, a3 += l7, d3 += u6;
}
function l3(e6, t7, r7, f5) {
  const o7 = e6.typedBuffer, n8 = e6.typedBufferStride, l7 = f5?.count ?? e6.count;
  let u6 = (f5?.dstIndex ?? 0) * n8;
  for (let i6 = 0; i6 < l7; ++i6)
    o7[u6] = t7, o7[u6 + 1] = r7, u6 += n8;
}
var u3 = Object.freeze(Object.defineProperty({ __proto__: null, fill: l3, normalizeIntegerBuffer: n4, normalizeIntegerBufferView: o2 }, Symbol.toStringTag, { value: "Module" }));

// node_modules/@arcgis/core/chunks/vec33.js
function e3(e6, f5) {
  t2(e6.typedBuffer, f5.typedBuffer, e6.typedBufferStride, f5.typedBufferStride);
}
function t2(e6, t7, f5 = 3, o7 = f5) {
  const r7 = t7.length / o7;
  let n8 = 0, u6 = 0;
  for (let c5 = 0; c5 < r7; ++c5)
    e6[n8] = t7[u6], e6[n8 + 1] = t7[u6 + 1], e6[n8 + 2] = t7[u6 + 2], n8 += f5, u6 += o7;
}
function f2(e6, t7, f5, o7, r7) {
  const n8 = e6.typedBuffer, u6 = e6.typedBufferStride, c5 = r7?.count ?? e6.count;
  let d3 = (r7?.dstIndex ?? 0) * u6;
  for (let l7 = 0; l7 < c5; ++l7)
    n8[d3] = t7, n8[d3 + 1] = f5, n8[d3 + 2] = o7, d3 += u6;
}
var o3 = Object.freeze(Object.defineProperty({ __proto__: null, copy: t2, copyView: e3, fill: f2 }, Symbol.toStringTag, { value: "Module" }));

// node_modules/@arcgis/core/chunks/vec43.js
function e4(e6, f5) {
  t3(e6.typedBuffer, f5, e6.typedBufferStride);
}
function t3(e6, t7, f5 = 4) {
  const o7 = t7.typedBuffer, r7 = t7.typedBufferStride, n8 = t7.count;
  let u6 = 0, c5 = 0;
  for (let d3 = 0; d3 < n8; ++d3)
    e6[u6] = o7[c5], e6[u6 + 1] = o7[c5 + 1], e6[u6 + 2] = o7[c5 + 2], e6[u6 + 3] = o7[c5 + 3], u6 += f5, c5 += r7;
}
function f3(e6, t7, f5, o7, r7, n8) {
  const u6 = e6.typedBuffer, c5 = e6.typedBufferStride, d3 = n8?.count ?? e6.count;
  let l7 = (n8?.dstIndex ?? 0) * c5;
  for (let p2 = 0; p2 < d3; ++p2)
    u6[l7] = t7, u6[l7 + 1] = f5, u6[l7 + 2] = o7, u6[l7 + 3] = r7, l7 += c5;
}
var o4 = Object.freeze(Object.defineProperty({ __proto__: null, copy: t3, copyView: e4, fill: f3 }, Symbol.toStringTag, { value: "Module" }));

// node_modules/@arcgis/core/views/3d/glTF/DefaultLoadingContext.js
var n5 = class {
  constructor(r7) {
    this._streamDataRequester = r7;
  }
  loadJSON(r7, e6) {
    return __async(this, null, function* () {
      return this._load("json", r7, e6);
    });
  }
  loadBinary(r7, e6) {
    return __async(this, null, function* () {
      return tt(r7) ? (s2(e6), nt(r7)) : this._load("binary", r7, e6);
    });
  }
  loadImage(r7, e6) {
    return __async(this, null, function* () {
      return this._load("image", r7, e6);
    });
  }
  _load(a3, o7, i6) {
    return __async(this, null, function* () {
      if (null == this._streamDataRequester)
        return (yield U(o7, { responseType: m[a3] })).data;
      const n8 = yield _2(this._streamDataRequester.request(o7, a3, i6));
      if (true === n8.ok)
        return n8.value;
      throw a(n8.error), new s("", `Request for resource failed: ${n8.error}`);
    });
  }
};
var m = { image: "image", binary: "array-buffer", json: "json", "image+type": void 0 };

// node_modules/@arcgis/core/views/3d/glTF/LoaderResult.js
function r5(e6 = {}) {
  return __spreadValues({ color: [1, 1, 1], opacity: 1, alphaMode: "OPAQUE", alphaCutoff: 0.5, doubleSided: false, castShadows: true, receiveShadows: true, receiveAmbientOcclustion: true, textureColor: null, textureNormal: null, textureOcclusion: null, textureEmissive: null, textureMetallicRoughness: null, colorTextureTransform: null, normalTextureTransform: null, occlusionTextureTransform: null, emissiveTextureTransform: null, metallicRoughnessTextureTransform: null, emissiveFactor: [0, 0, 0], metallicFactor: 1, roughnessFactor: 1, colorMixMode: "multiply" }, e6);
}
function l4(r7, l7 = {}) {
  return { data: r7, parameters: __spreadValues({ wrap: __spreadValues({ s: D.REPEAT, t: D.REPEAT }, l7.wrap), noUnpackFlip: true, mipmap: false }, l7) };
}

// node_modules/@arcgis/core/chunks/scalar.js
function e5(e6, t7) {
  const o7 = e6.count;
  t7 || (t7 = new e6.TypedArrayConstructor(o7));
  for (let r7 = 0; r7 < o7; r7++)
    t7[r7] = e6.get(r7);
  return t7;
}
var t4 = Object.freeze(Object.defineProperty({ __proto__: null, makeDense: e5 }, Symbol.toStringTag, { value: "Module" }));

// node_modules/@arcgis/core/views/3d/glTF/internal/BinaryStreamReader.js
var t5 = class {
  constructor(t7) {
    this._data = t7, this._offset4 = 0, this._dataUint32 = new Uint32Array(this._data, 0, Math.floor(this._data.byteLength / 4));
  }
  readUint32() {
    const t7 = this._offset4;
    return this._offset4 += 1, this._dataUint32[t7];
  }
  readUint8Array(t7) {
    const s4 = 4 * this._offset4;
    return this._offset4 += t7 / 4, new Uint8Array(this._data, s4, t7);
  }
  remainingBytes() {
    return this._data.byteLength - 4 * this._offset4;
  }
};

// node_modules/@arcgis/core/views/3d/glTF/internal/enums.js
var A2;
var E3;
!function(A3) {
  A3.SCALAR = "SCALAR", A3.VEC2 = "VEC2", A3.VEC3 = "VEC3", A3.VEC4 = "VEC4", A3.MAT2 = "MAT2", A3.MAT3 = "MAT3", A3.MAT4 = "MAT4";
}(A2 || (A2 = {})), function(A3) {
  A3[A3.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", A3[A3.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER";
}(E3 || (E3 = {}));

// node_modules/@arcgis/core/views/3d/glTF/internal/fillDefaults.js
var t6 = { baseColorFactor: [1, 1, 1, 1], metallicFactor: 1, roughnessFactor: 1 };
var a2 = { pbrMetallicRoughness: t6, emissiveFactor: [0, 0, 0], alphaMode: "OPAQUE", alphaCutoff: 0.5, doubleSided: false };
var l5 = { ESRI_externalColorMixMode: "tint", ESRI_receiveShadows: true, ESRI_receiveAmbientOcclusion: true };
var i4 = (e6 = {}) => {
  const o7 = __spreadValues(__spreadValues({}, t6), e6.pbrMetallicRoughness), r7 = s3(__spreadValues(__spreadValues({}, l5), e6.extras));
  return __spreadProps(__spreadValues(__spreadValues({}, a2), e6), { pbrMetallicRoughness: o7, extras: r7 });
};
function s3(o7) {
  switch (o7.ESRI_externalColorMixMode) {
    case "multiply":
    case "tint":
    case "ignore":
    case "replace":
      break;
    default:
      n2(o7.ESRI_externalColorMixMode), o7.ESRI_externalColorMixMode = "tint";
  }
  return o7;
}
var c3 = { magFilter: L2.LINEAR, minFilter: L2.LINEAR_MIPMAP_LINEAR, wrapS: D.REPEAT, wrapT: D.REPEAT };
var n6 = (e6) => __spreadValues(__spreadValues({}, c3), e6);

// node_modules/@arcgis/core/views/3d/glTF/internal/pathUtils.js
function r6(r7) {
  let e6, t7;
  return r7.replace(/^(.*\/)?([^/]*)$/, (r8, a3, i6) => (e6 = a3 || "", t7 = i6 || "", "")), { dirPart: e6, filePart: t7 };
}

// node_modules/@arcgis/core/views/3d/glTF/internal/Resource.js
var k = { MAGIC: 1179937895, CHUNK_TYPE_JSON: 1313821514, CHUNK_TYPE_BIN: 5130562, MIN_HEADER_LENGTH: 20 };
var Y = class _Y {
  constructor(t7, r7, o7, n8) {
    if (this._context = t7, this.uri = r7, this.json = o7, this._glbBuffer = n8, this._bufferLoaders = /* @__PURE__ */ new Map(), this._textureLoaders = /* @__PURE__ */ new Map(), this._textureCache = /* @__PURE__ */ new Map(), this._materialCache = /* @__PURE__ */ new Map(), this._nodeParentMap = /* @__PURE__ */ new Map(), this._nodeTransformCache = /* @__PURE__ */ new Map(), this._supportedExtensions = ["KHR_texture_basisu", "KHR_texture_transform"], this._baseUri = r6(this.uri).dirPart, this._checkVersionSupported(), this._checkRequiredExtensionsSupported(), null == o7.scenes)
      throw new s("gltf-loader-unsupported-feature", "Scenes must be defined.");
    if (null == o7.meshes)
      throw new s("gltf-loader-unsupported-feature", "Meshes must be defined");
    if (null == o7.nodes)
      throw new s("gltf-loader-unsupported-feature", "Nodes must be defined.");
    this._computeNodeParents();
  }
  static load(t7, r7, o7) {
    return __async(this, null, function* () {
      if (tt(r7)) {
        const e6 = ot(r7);
        if (e6 && "model/gltf-binary" !== e6.mediaType)
          try {
            const o9 = JSON.parse(e6.isBase64 ? atob(e6.data) : e6.data);
            return new _Y(t7, r7, o9);
          } catch {
          }
        const o8 = nt(r7);
        if (_Y._isGLBData(o8))
          return this._fromGLBData(t7, r7, o8);
      }
      if (ee.test(r7) || "gltf" === o7?.expectedType) {
        const e6 = yield t7.loadJSON(r7, o7);
        return new _Y(t7, r7, e6);
      }
      const i6 = yield t7.loadBinary(r7, o7);
      if (_Y._isGLBData(i6))
        return this._fromGLBData(t7, r7, i6);
      if (te.test(r7) || "glb" === o7?.expectedType)
        throw new s("gltf-loader-invalid-glb", "This is not a valid glb file.");
      const u6 = yield t7.loadJSON(r7, o7);
      return new _Y(t7, r7, u6);
    });
  }
  static _isGLBData(e6) {
    if (null == e6)
      return false;
    const t7 = new t5(e6);
    return t7.remainingBytes() >= 4 && t7.readUint32() === k.MAGIC;
  }
  static _fromGLBData(e6, t7, r7) {
    return __async(this, null, function* () {
      const o7 = yield _Y._parseGLBData(r7);
      return new _Y(e6, t7, o7.json, o7.binaryData);
    });
  }
  static _parseGLBData(r7) {
    return __async(this, null, function* () {
      const o7 = new t5(r7);
      if (o7.remainingBytes() < 12)
        throw new s("gltf-loader-error", "glb binary data is insufficiently large.");
      const n8 = o7.readUint32(), s4 = o7.readUint32(), a3 = o7.readUint32();
      if (n8 !== k.MAGIC)
        throw new s("gltf-loader-error", "Magic first 4 bytes do not fit to expected glb value.");
      if (r7.byteLength < a3)
        throw new s("gltf-loader-error", "glb binary data is smaller than header specifies.");
      if (2 !== s4)
        throw new s("gltf-loader-unsupported-feature", "An unsupported glb container version was detected. Only version 2 is supported.");
      let i6, u6, f5 = 0;
      for (; o7.remainingBytes() >= 8; ) {
        const r8 = o7.readUint32(), n9 = o7.readUint32();
        if (0 === f5) {
          if (n9 !== k.CHUNK_TYPE_JSON)
            throw new s("gltf-loader-error", "First glb chunk must be JSON.");
          if (r8 < 0)
            throw new s("gltf-loader-error", "No JSON data found.");
          i6 = yield n3(o7.readUint8Array(r8));
        } else if (1 === f5) {
          if (n9 !== k.CHUNK_TYPE_BIN)
            throw new s("gltf-loader-unsupported-feature", "Second glb chunk expected to be BIN.");
          u6 = o7.readUint8Array(r8);
        } else
          n.getLogger("esri.views.3d.glTF").warn("[Unsupported Feature] More than 2 glb chunks detected. Skipping.");
        f5 += 1;
      }
      if (!i6)
        throw new s("gltf-loader-error", "No glb JSON chunk detected.");
      return { json: i6, binaryData: u6 };
    });
  }
  getBuffer(t7, r7) {
    return __async(this, null, function* () {
      const o7 = this.json.buffers[t7];
      if (null == o7.uri) {
        if (null == this._glbBuffer)
          throw new s("gltf-loader-error", "glb buffer not present");
        return this._glbBuffer;
      }
      const n8 = yield this._getBufferLoader(t7, r7);
      if (n8.byteLength !== o7.byteLength)
        throw new s("gltf-loader-error", "Buffer byte lengths should match.");
      return n8;
    });
  }
  _getBufferLoader(e6, t7) {
    return __async(this, null, function* () {
      const r7 = this._bufferLoaders.get(e6);
      if (r7)
        return r7;
      const o7 = this.json.buffers[e6].uri, n8 = this._context.loadBinary(this._resolveUri(o7), t7).then((e7) => new Uint8Array(e7));
      return this._bufferLoaders.set(e6, n8), n8;
    });
  }
  getAccessor(t7, r7) {
    return __async(this, null, function* () {
      if (!this.json.accessors)
        throw new s("gltf-loader-unsupported-feature", "Accessors missing.");
      const o7 = this.json.accessors[t7];
      if (null == o7?.bufferView)
        throw new s("gltf-loader-unsupported-feature", "Some accessor does not specify a bufferView.");
      if (o7.type in [A2.MAT2, A2.MAT3, A2.MAT4])
        throw new s("gltf-loader-unsupported-feature", `AttributeType ${o7.type} is not supported`);
      const n8 = this.json.bufferViews[o7.bufferView], s4 = yield this.getBuffer(n8.buffer, r7), a3 = X[o7.type], i6 = $[o7.componentType], u6 = a3 * i6, f5 = n8.byteStride || u6;
      return { raw: s4.buffer, byteStride: f5, byteOffset: s4.byteOffset + (n8.byteOffset || 0) + (o7.byteOffset || 0), entryCount: o7.count, isDenselyPacked: f5 === u6, componentCount: a3, componentByteSize: i6, componentType: o7.componentType, min: o7.min, max: o7.max, normalized: !!o7.normalized };
    });
  }
  getIndexData(e6, t7) {
    return __async(this, null, function* () {
      if (null == e6.indices)
        return;
      const r7 = yield this.getAccessor(e6.indices, t7);
      if (r7.isDenselyPacked)
        switch (r7.componentType) {
          case C.UNSIGNED_BYTE:
            return new Uint8Array(r7.raw, r7.byteOffset, r7.entryCount);
          case C.UNSIGNED_SHORT:
            return new Uint16Array(r7.raw, r7.byteOffset, r7.entryCount);
          case C.UNSIGNED_INT:
            return new Uint32Array(r7.raw, r7.byteOffset, r7.entryCount);
        }
      else
        switch (r7.componentType) {
          case C.UNSIGNED_BYTE:
            return e5(Q(d, r7));
          case C.UNSIGNED_SHORT:
            return e5(Q(g3, r7));
          case C.UNSIGNED_INT:
            return e5(Q(B, r7));
        }
    });
  }
  getPositionData(t7, r7) {
    return __async(this, null, function* () {
      if (null == t7.attributes.POSITION)
        throw new s("gltf-loader-unsupported-feature", "No POSITION vertex data found.");
      const o7 = yield this.getAccessor(t7.attributes.POSITION, r7);
      if (o7.componentType !== C.FLOAT)
        throw new s("gltf-loader-unsupported-feature", "Expected type FLOAT for POSITION vertex attribute, but found " + C[o7.componentType]);
      if (3 !== o7.componentCount)
        throw new s("gltf-loader-unsupported-feature", "POSITION vertex attribute must have 3 components, but found " + o7.componentCount.toFixed());
      return Q(i2, o7);
    });
  }
  getNormalData(t7, r7) {
    return __async(this, null, function* () {
      if (null == t7.attributes.NORMAL)
        throw new s("gltf-loader-error", "No NORMAL vertex data found.");
      const o7 = yield this.getAccessor(t7.attributes.NORMAL, r7);
      if (o7.componentType !== C.FLOAT)
        throw new s("gltf-loader-unsupported-feature", "Expected type FLOAT for NORMAL vertex attribute, but found " + C[o7.componentType]);
      if (3 !== o7.componentCount)
        throw new s("gltf-loader-unsupported-feature", "NORMAL vertex attribute must have 3 components, but found " + o7.componentCount.toFixed());
      return Q(i2, o7);
    });
  }
  getTangentData(t7, r7) {
    return __async(this, null, function* () {
      if (null == t7.attributes.TANGENT)
        throw new s("gltf-loader-error", "No TANGENT vertex data found.");
      const o7 = yield this.getAccessor(t7.attributes.TANGENT, r7);
      if (o7.componentType !== C.FLOAT)
        throw new s("gltf-loader-unsupported-feature", "Expected type FLOAT for TANGENT vertex attribute, but found " + C[o7.componentType]);
      if (4 !== o7.componentCount)
        throw new s("gltf-loader-unsupported-feature", "TANGENT vertex attribute must have 4 components, but found " + o7.componentCount.toFixed());
      return new c2(o7.raw, o7.byteOffset, o7.byteStride, o7.byteOffset + o7.byteStride * o7.entryCount);
    });
  }
  getTextureCoordinates(t7, r7) {
    return __async(this, null, function* () {
      if (null == t7.attributes.TEXCOORD_0)
        throw new s("gltf-loader-error", "No TEXCOORD_0 vertex data found.");
      const o7 = yield this.getAccessor(t7.attributes.TEXCOORD_0, r7);
      if (2 !== o7.componentCount)
        throw new s("gltf-loader-unsupported-feature", "TEXCOORD_0 vertex attribute must have 2 components, but found " + o7.componentCount.toFixed());
      if (o7.componentType === C.FLOAT)
        return Q(u2, o7);
      if (!o7.normalized)
        throw new s("gltf-loader-unsupported-feature", "Integer component types are only supported for a normalized accessor for TEXCOORD_0.");
      return W(o7);
    });
  }
  getVertexColors(t7, r7) {
    return __async(this, null, function* () {
      if (null == t7.attributes.COLOR_0)
        throw new s("gltf-loader-error", "No COLOR_0 vertex data found.");
      const o7 = yield this.getAccessor(t7.attributes.COLOR_0, r7);
      if (4 !== o7.componentCount && 3 !== o7.componentCount)
        throw new s("gltf-loader-unsupported-feature", "COLOR_0 attribute must have 3 or 4 components, but found " + o7.componentCount.toFixed());
      if (4 === o7.componentCount) {
        if (o7.componentType === C.FLOAT)
          return Q(c2, o7);
        if (o7.componentType === C.UNSIGNED_BYTE)
          return Q(x, o7);
        if (o7.componentType === C.UNSIGNED_SHORT)
          return Q(L, o7);
      } else if (3 === o7.componentCount) {
        if (o7.componentType === C.FLOAT)
          return Q(i2, o7);
        if (o7.componentType === C.UNSIGNED_BYTE)
          return Q(O, o7);
        if (o7.componentType === C.UNSIGNED_SHORT)
          return Q(E, o7);
      }
      throw new s("gltf-loader-unsupported-feature", "Unsupported component type for COLOR_0 attribute: " + C[o7.componentType]);
    });
  }
  hasPositions(e6) {
    return void 0 !== e6.attributes.POSITION;
  }
  hasNormals(e6) {
    return void 0 !== e6.attributes.NORMAL;
  }
  hasVertexColors(e6) {
    return void 0 !== e6.attributes.COLOR_0;
  }
  hasTextureCoordinates(e6) {
    return void 0 !== e6.attributes.TEXCOORD_0;
  }
  hasTangents(e6) {
    return void 0 !== e6.attributes.TANGENT;
  }
  getMaterial(e6, t7, r7) {
    return __async(this, null, function* () {
      let o7 = e6.material ? this._materialCache.get(e6.material) : void 0;
      if (!o7) {
        const n8 = null != e6.material ? i4(this.json.materials[e6.material]) : i4(), s4 = n8.pbrMetallicRoughness, a3 = this.hasVertexColors(e6), i6 = this.getTexture(s4.baseColorTexture, t7), u6 = this.getTexture(n8.normalTexture, t7), f5 = r7 ? this.getTexture(n8.occlusionTexture, t7) : void 0, l7 = r7 ? this.getTexture(n8.emissiveTexture, t7) : void 0, d3 = r7 ? this.getTexture(s4.metallicRoughnessTexture, t7) : void 0, c5 = null != e6.material ? e6.material : -1;
        o7 = { alphaMode: n8.alphaMode, alphaCutoff: n8.alphaCutoff, color: s4.baseColorFactor, doubleSided: !!n8.doubleSided, colorTexture: yield i6, normalTexture: yield u6, name: n8.name, id: c5, occlusionTexture: yield f5, emissiveTexture: yield l7, emissiveFactor: n8.emissiveFactor, metallicFactor: s4.metallicFactor, roughnessFactor: s4.roughnessFactor, metallicRoughnessTexture: yield d3, hasVertexColors: a3, ESRI_externalColorMixMode: n8.extras.ESRI_externalColorMixMode, colorTextureTransform: s4?.baseColorTexture?.extensions?.KHR_texture_transform, normalTextureTransform: n8.normalTexture?.extensions?.KHR_texture_transform, occlusionTextureTransform: n8.occlusionTexture?.extensions?.KHR_texture_transform, emissiveTextureTransform: n8.emissiveTexture?.extensions?.KHR_texture_transform, metallicRoughnessTextureTransform: s4?.metallicRoughnessTexture?.extensions?.KHR_texture_transform, receiveAmbientOcclusion: n8.extras.ESRI_receiveAmbientOcclusion, receiveShadows: n8.extras.ESRI_receiveShadows };
      }
      return o7;
    });
  }
  getTexture(t7, o7) {
    return __async(this, null, function* () {
      if (!t7)
        return;
      if (0 !== (t7.texCoord || 0))
        throw new s("gltf-loader-unsupported-feature", "Only TEXCOORD with index 0 is supported.");
      const n8 = t7.index, s4 = this.json.textures[n8], a3 = n6(null != s4.sampler ? this.json.samplers[s4.sampler] : {}), i6 = Z(s4), u6 = this.json.images[i6], f5 = yield this._loadTextureImageData(n8, s4, o7);
      return r(this._textureCache, n8, () => {
        const t8 = (e6) => 33071 === e6 || 33648 === e6 || 10497 === e6, r7 = (t9) => {
          throw new s("gltf-loader-error", `Unexpected TextureSampler WrapMode: ${t9}`);
        };
        return { data: f5, wrapS: t8(a3.wrapS) ? a3.wrapS : r7(a3.wrapS), wrapT: t8(a3.wrapT) ? a3.wrapT : r7(a3.wrapT), minFilter: a3.minFilter, name: u6.name, id: n8 };
      });
    });
  }
  getNodeTransform(e6) {
    if (void 0 === e6)
      return q2;
    let t7 = this._nodeTransformCache.get(e6);
    if (!t7) {
      const r7 = this.getNodeTransform(this._getNodeParent(e6)), o7 = this.json.nodes[e6];
      o7.matrix ? t7 = c(e(), r7, o7.matrix) : o7.translation || o7.rotation || o7.scale ? (t7 = r2(r7), o7.translation && i(t7, t7, o7.translation), o7.rotation && (z[3] = v(z, o7.rotation), b2(t7, t7, z[3], z)), o7.scale && f(t7, t7, o7.scale)) : t7 = r2(r7), this._nodeTransformCache.set(e6, t7);
    }
    return t7;
  }
  _resolveUri(e6) {
    return _(e6, this._baseUri);
  }
  _getNodeParent(e6) {
    return this._nodeParentMap.get(e6);
  }
  _checkVersionSupported() {
    const e6 = r3.parse(this.json.asset.version, "glTF");
    J.validate(e6);
  }
  _checkRequiredExtensionsSupported() {
    const t7 = this.json;
    if (t7.extensionsRequired) {
      if (!t7.extensionsRequired.every((e6) => this._supportedExtensions.includes(e6)))
        throw new s("gltf-loader-unsupported-feature", "gltf loader was not able to load unsupported feature. Required extensions: " + t7.extensionsRequired.join(", "));
    }
  }
  _computeNodeParents() {
    this.json.nodes.forEach((e6, t7) => {
      e6.children && e6.children.forEach((e7) => {
        this._nodeParentMap.set(e7, t7);
      });
    });
  }
  _loadTextureImageData(e6, t7, r7) {
    return __async(this, null, function* () {
      const o7 = this._textureLoaders.get(e6);
      if (o7)
        return o7;
      const n8 = this._createTextureLoader(t7, r7);
      return this._textureLoaders.set(e6, n8), n8;
    });
  }
  _createTextureLoader(t7, r7) {
    return __async(this, null, function* () {
      const o7 = Z(t7), n8 = this.json.images[o7];
      if (n8.uri) {
        if (n8.uri.endsWith(".ktx2")) {
          const e6 = yield this._context.loadBinary(this._resolveUri(n8.uri), r7);
          return new t(new Uint8Array(e6));
        }
        return this._context.loadImage(this._resolveUri(n8.uri), r7);
      }
      if (null == n8.bufferView)
        throw new s("gltf-loader-unsupported-feature", "Image bufferView must be defined.");
      if (null == n8.mimeType)
        throw new s("gltf-loader-unsupported-feature", "Image mimeType must be defined.");
      const s4 = this.json.bufferViews[n8.bufferView], a3 = yield this.getBuffer(s4.buffer, r7);
      if (null != s4.byteStride)
        throw new s("gltf-loader-unsupported-feature", "byteStride not supported for image buffer");
      const i6 = a3.byteOffset + (s4.byteOffset || 0);
      return o(new Uint8Array(a3.buffer, i6, s4.byteLength), n8.mimeType);
    });
  }
  getLoadedBuffersSize() {
    return __async(this, null, function* () {
      if (this._glbBuffer)
        return this._glbBuffer.byteLength;
      const e6 = yield g(Array.from(this._bufferLoaders.values())), t7 = yield g(Array.from(this._textureLoaders.values()));
      return e6.reduce((e7, t8) => e7 + (t8?.byteLength ?? 0), 0) + t7.reduce((e7, t8) => e7 + (t8 ? r4(t8) ? t8.data.byteLength : t8.width * t8.height * 4 : 0), 0);
    });
  }
};
var q2 = g2(e(), Math.PI / 2);
var J = new r3(2, 0, "glTF");
var z = e2();
var X = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 };
var $ = { [C.BYTE]: 1, [C.UNSIGNED_BYTE]: 1, [C.SHORT]: 2, [C.UNSIGNED_SHORT]: 2, [C.HALF_FLOAT]: 2, [C.FLOAT]: 4, [C.INT]: 4, [C.UNSIGNED_INT]: 4 };
function W(e6) {
  switch (e6.componentType) {
    case C.BYTE:
      return new V(e6.raw, e6.byteOffset, e6.byteStride, e6.byteOffset + e6.byteStride * e6.entryCount);
    case C.UNSIGNED_BYTE:
      return new A(e6.raw, e6.byteOffset, e6.byteStride, e6.byteOffset + e6.byteStride * e6.entryCount);
    case C.SHORT:
      return new q(e6.raw, e6.byteOffset, e6.byteStride, e6.byteOffset + e6.byteStride * e6.entryCount);
    case C.UNSIGNED_SHORT:
      return new w(e6.raw, e6.byteOffset, e6.byteStride, e6.byteOffset + e6.byteStride * e6.entryCount);
    case C.UNSIGNED_INT:
      return new F(e6.raw, e6.byteOffset, e6.byteStride, e6.byteOffset + e6.byteStride * e6.entryCount);
    case C.FLOAT:
      return new u2(e6.raw, e6.byteOffset, e6.byteStride, e6.byteOffset + e6.byteStride * e6.entryCount);
  }
}
function Q(e6, t7) {
  return new e6(t7.raw, t7.byteOffset, t7.byteStride, t7.byteOffset + t7.byteStride * (t7.entryCount - 1) + t7.componentByteSize * t7.componentCount);
}
function Z(t7) {
  if (null != t7.extensions?.KHR_texture_basisu)
    return t7.extensions.KHR_texture_basisu.source;
  if (null !== t7.source)
    return t7.source;
  throw new s("gltf-loader-unsupported-feature", "Source is expected to be defined for a texture. It can also be omitted in favour of an KHR_texture_basisu extension tag.");
}
var ee = /\.gltf$/i;
var te = /\.glb$/i;

// node_modules/@arcgis/core/views/3d/glTF/loader.js
var n7 = 0;
function l6(_0, _1) {
  return __async(this, arguments, function* (o7, r7, a3 = {}, l7 = true) {
    const m3 = yield Y.load(o7, r7, a3), p2 = "gltf_" + n7++, T = { lods: [], materials: /* @__PURE__ */ new Map(), textures: /* @__PURE__ */ new Map(), meta: u4(m3) }, f5 = !(!m3.json.asset.extras || "symbolResource" !== m3.json.asset.extras.ESRI_type), x2 = m3.json.asset.extras?.ESRI_webstyleSymbol?.webstyle, g4 = /* @__PURE__ */ new Map();
    yield c4(m3, (o8, r8, s4, n8) => __async(this, null, function* () {
      const u6 = g4.get(s4) ?? 0;
      g4.set(s4, u6 + 1);
      const c5 = void 0 !== o8.mode ? o8.mode : E2.TRIANGLES, f6 = c5 === E2.TRIANGLES || c5 === E2.TRIANGLE_STRIP || c5 === E2.TRIANGLE_FAN ? c5 : null;
      if (null == f6)
        return void n.getLogger("esri.views.3d.glTF").warn("[Unsupported Feature] Unsupported primitive mode (" + E2[c5] + "). Skipping primitive.");
      if (!m3.hasPositions(o8))
        return void n.getLogger("esri.views.3d.glTF").warn("Skipping primitive without POSITION vertex attribute.");
      const x3 = m3.getPositionData(o8, a3), h2 = m3.getMaterial(o8, a3, l7), w2 = m3.hasNormals(o8) ? m3.getNormalData(o8, a3) : null, v2 = m3.hasTangents(o8) ? m3.getTangentData(o8, a3) : null, S = m3.hasTextureCoordinates(o8) ? m3.getTextureCoordinates(o8, a3) : null, R = m3.hasVertexColors(o8) ? m3.getVertexColors(o8, a3) : null, _3 = m3.getIndexData(o8, a3), E4 = { name: n8, transform: r2(r8), attributes: { position: yield x3, normal: w2 ? yield w2 : null, texCoord0: S ? yield S : null, color: R ? yield R : null, tangent: v2 ? yield v2 : null }, indices: yield _3, primitiveType: f6, material: d2(T, yield h2, p2) };
      let I2 = null;
      null != T.meta?.ESRI_lod && "screenSpaceRadius" === T.meta.ESRI_lod.metric && (I2 = T.meta.ESRI_lod.thresholds[s4]), T.lods[s4] = T.lods[s4] || { parts: [], name: n8, lodThreshold: I2 }, T.lods[s4].parts[u6] = E4;
    }));
    for (const e6 of T.lods)
      e6.parts = e6.parts.filter((e7) => !!e7);
    const h = yield m3.getLoadedBuffersSize();
    return { model: T, meta: { isEsriSymbolResource: f5, uri: m3.uri, ESRI_webstyle: x2 }, customMeta: {}, size: h };
  });
}
function u4(e6) {
  const t7 = e6.json;
  let o7 = null;
  return t7.nodes.forEach((e7) => {
    const t8 = e7.extras;
    null != t8 && (t8.ESRI_proxyEllipsoid || t8.ESRI_lod) && (o7 = t8);
  }), o7;
}
function c4(t7, o7) {
  return __async(this, null, function* () {
    const r7 = t7.json, s4 = r7.scenes[r7.scene || 0].nodes, a3 = s4.length > 1, i6 = [];
    for (const e6 of s4) {
      const t8 = r7.nodes[e6];
      if (i6.push(n8(e6, 0)), m2(t8) && !a3) {
        t8.extensions.MSFT_lod.ids.forEach((e7, t9) => n8(e7, t9 + 1));
      }
    }
    function n8(s5, a4) {
      return __async(this, null, function* () {
        const l7 = r7.nodes[s5], u6 = t7.getNodeTransform(s5);
        if (null != l7.weights && n.getLogger("esri.views.3d.glTF").warn("[Unsupported Feature] Morph targets are not supported."), null != l7.mesh) {
          const e6 = r7.meshes[l7.mesh];
          for (const t8 of e6.primitives)
            i6.push(o7(t8, u6, a4, e6.name));
        }
        for (const e6 of l7.children || [])
          i6.push(n8(e6, a4));
      });
    }
    yield Promise.all(i6);
  });
}
function m2(e6) {
  return e6.extensions?.MSFT_lod && Array.isArray(e6.extensions.MSFT_lod.ids);
}
function d2(e6, t7, s4) {
  const a3 = (t8) => {
    const o7 = `${s4}_tex_${t8 && t8.id}${t8?.name ? "_" + t8.name : ""}`;
    if (t8 && !e6.textures.has(o7)) {
      const s5 = l4(t8.data, { wrap: { s: t8.wrapS, t: t8.wrapT }, mipmap: p.has(t8.minFilter), noUnpackFlip: true });
      e6.textures.set(o7, s5);
    }
    return o7;
  }, i6 = `${s4}_mat_${t7.id}_${t7.name}`;
  if (!e6.materials.has(i6)) {
    const r7 = r5({ color: [t7.color[0], t7.color[1], t7.color[2]], opacity: t7.color[3], alphaMode: t7.alphaMode, alphaCutoff: t7.alphaCutoff, doubleSided: t7.doubleSided, colorMixMode: t7.ESRI_externalColorMixMode, textureColor: t7.colorTexture ? a3(t7.colorTexture) : void 0, textureNormal: t7.normalTexture ? a3(t7.normalTexture) : void 0, textureOcclusion: t7.occlusionTexture ? a3(t7.occlusionTexture) : void 0, textureEmissive: t7.emissiveTexture ? a3(t7.emissiveTexture) : void 0, textureMetallicRoughness: t7.metallicRoughnessTexture ? a3(t7.metallicRoughnessTexture) : void 0, emissiveFactor: [t7.emissiveFactor[0], t7.emissiveFactor[1], t7.emissiveFactor[2]], colorTextureTransform: t7.colorTextureTransform, normalTextureTransform: t7.normalTextureTransform, occlusionTextureTransform: t7.occlusionTextureTransform, emissiveTextureTransform: t7.emissiveTextureTransform, metallicRoughnessTextureTransform: t7.metallicRoughnessTextureTransform, metallicFactor: t7.metallicFactor, roughnessFactor: t7.roughnessFactor, receiveShadows: t7.receiveShadows, receiveAmbientOcclustion: t7.receiveAmbientOcclusion });
    e6.materials.set(i6, r7);
  }
  return i6;
}
var p = /* @__PURE__ */ new Set([L2.LINEAR_MIPMAP_LINEAR, L2.LINEAR_MIPMAP_NEAREST]);

// node_modules/@arcgis/core/views/3d/glTF/internal/indexUtils.js
function o5(r7, t7) {
  switch (t7) {
    case E2.TRIANGLES:
      return f4(r7);
    case E2.TRIANGLE_STRIP:
      return u5(r7);
    case E2.TRIANGLE_FAN:
      return i5(r7);
  }
}
function f4(e6) {
  return "number" == typeof e6 ? l2(e6) : u(e6) ? new Uint16Array(e6) : e6;
}
function u5(r7) {
  const t7 = "number" == typeof r7 ? r7 : r7.length;
  if (t7 < 3)
    return [];
  const n8 = t7 - 2, o7 = i3(3 * n8);
  if ("number" == typeof r7) {
    let r8 = 0;
    for (let t8 = 0; t8 < n8; t8 += 1)
      t8 % 2 == 0 ? (o7[r8++] = t8, o7[r8++] = t8 + 1, o7[r8++] = t8 + 2) : (o7[r8++] = t8 + 1, o7[r8++] = t8, o7[r8++] = t8 + 2);
  } else {
    let t8 = 0;
    for (let e6 = 0; e6 < n8; e6 += 1)
      e6 % 2 == 0 ? (o7[t8++] = r7[e6], o7[t8++] = r7[e6 + 1], o7[t8++] = r7[e6 + 2]) : (o7[t8++] = r7[e6 + 1], o7[t8++] = r7[e6], o7[t8++] = r7[e6 + 2]);
  }
  return o7;
}
function i5(r7) {
  const t7 = "number" == typeof r7 ? r7 : r7.length;
  if (t7 < 3)
    return new Uint16Array(0);
  const e6 = t7 - 2, n8 = e6 <= 65536 ? new Uint16Array(3 * e6) : new Uint32Array(3 * e6);
  if ("number" == typeof r7) {
    let r8 = 0;
    for (let t8 = 0; t8 < e6; ++t8)
      n8[r8++] = 0, n8[r8++] = t8 + 1, n8[r8++] = t8 + 2;
    return n8;
  }
  const o7 = r7[0];
  let f5 = r7[1], u6 = 0;
  for (let i6 = 0; i6 < e6; ++i6) {
    const t8 = r7[i6 + 2];
    n8[u6++] = o7, n8[u6++] = f5, n8[u6++] = t8, f5 = t8;
  }
  return n8;
}

// node_modules/@arcgis/core/views/3d/webgl-engine/materials/DefaultMaterial_COLOR_GAMMA.js
var o6 = 2.1;

export {
  o2 as o,
  n4 as n,
  l3 as l,
  e3 as e,
  t2 as t,
  f2 as f,
  e4 as e2,
  t3 as t2,
  f3 as f2,
  n5 as n2,
  l6 as l2,
  o5 as o2,
  o6 as o3
};
//# sourceMappingURL=chunk-QFPTFBDN.js.map
