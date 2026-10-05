import {
  r
} from "./chunk-QUJPV6JW.js";
import {
  h as h2
} from "./chunk-FODHXTS2.js";
import {
  h
} from "./chunk-2GHQZMFH.js";
import {
  w
} from "./chunk-BYMJUQYJ.js";
import {
  f
} from "./chunk-YKH4U5BK.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/core/accessorSupport/layerContainerType.js
var a = /* @__PURE__ */ ((a2) => a2)(["operational-layers", "basemap", "ground"]);

// node_modules/@arcgis/core/layers/support/commonProperties.js
var t = { type: Boolean, value: true, json: { origins: { service: { read: false, write: false }, "web-map": { read: false, write: false } }, name: "screenSizePerspective", write: { enabled: true, layerContainerTypes: a } } };
var s = { type: Boolean, value: true, json: { name: "disablePopup", read: { reader: (e, r2) => !r2.disablePopup }, write: { enabled: true, writer(e, r2, n) {
  r2[n] = !e;
} } } };
var l = { type: Boolean, value: true, nonNullable: true, json: { name: "showLabels", write: { enabled: true, layerContainerTypes: a } } };
var p = { type: String, json: { origins: { "portal-item": { write: false } }, write: { isRequired: true, ignoreOrigin: true, writer: h } } };
var y = { type: Boolean, value: true, nonNullable: true, json: { origins: { service: { read: { enabled: false } } }, name: "showLegend", write: { enabled: true, layerContainerTypes: a } } };
var d = { value: null, type: h2, json: { origins: { service: { name: "elevationInfo", write: true } }, name: "layerDefinition.elevationInfo", write: { enabled: true, layerContainerTypes: a } } };
function c(e) {
  return { type: e, readOnly: true, json: { origins: { service: { read: true } }, read: false } };
}
var m = { write: { enabled: true, layerContainerTypes: a }, read: true };
var w2 = { type: Number, json: { origins: { "web-document": m, "portal-item": { write: true } } } };
var f2 = __spreadProps(__spreadValues({}, w2), { json: __spreadProps(__spreadValues({}, w2.json), { origins: { "web-document": __spreadProps(__spreadValues({}, m), { write: { enabled: true, layerContainerTypes: a, target: { opacity: { type: Number }, "layerDefinition.drawingInfo.transparency": { type: Number } } } }) }, read: { source: ["layerDefinition.drawingInfo.transparency", "drawingInfo.transparency"], reader: (e, r2, n) => n && "service" !== n.origin || !r2.drawingInfo || void 0 === r2.drawingInfo.transparency ? r2.layerDefinition?.drawingInfo && void 0 !== r2.layerDefinition.drawingInfo.transparency ? r(r2.layerDefinition.drawingInfo.transparency) : void 0 : r(r2.drawingInfo.transparency) } }) });
var b = { type: w, readOnly: true, json: { origins: { service: { read: { source: ["fullExtent", "spatialReference"], reader: (e, i) => {
  const a2 = w.fromJSON(e);
  return null != i.spatialReference && "object" == typeof i.spatialReference && (a2.spatialReference = f.fromJSON(i.spatialReference)), a2;
} } } }, read: false } };
var g = { type: String, json: { origins: { service: { read: false }, "portal-item": { read: false } } } };
var u = { type: Number, json: { origins: { service: { write: { enabled: false } }, "web-scene": { name: "layerDefinition.minScale", write: { enabled: true, layerContainerTypes: a } } }, name: "layerDefinition.minScale", write: true } };
var j = { type: Number, json: { origins: { service: { write: { enabled: false } }, "web-scene": { name: "layerDefinition.maxScale", write: { enabled: true, layerContainerTypes: a } } }, name: "layerDefinition.maxScale", write: true } };
var v = { json: { write: { ignoreOrigin: true, layerContainerTypes: a }, origins: { "web-map": { read: false, write: false } } } };

export {
  a,
  t,
  s,
  l,
  p,
  y,
  d,
  c,
  w2 as w,
  f2 as f,
  b,
  g,
  u,
  j,
  v
};
//# sourceMappingURL=chunk-SATVR2AT.js.map
