import {
  n
} from "./chunk-LOE6HVIU.js";
import {
  y
} from "./chunk-YFSAH4C7.js";

// node_modules/@arcgis/core/core/accessorSupport/decorators/enumeration.js
function o(o2, r = {}) {
  const a = o2 instanceof n ? o2 : new n(o2, r), l = { type: r?.ignoreUnknown ?? 1 ? a.apiValues : String, json: { type: a.jsonValues, read: !r?.readOnly && { reader: a.read }, write: { writer: a.write } } };
  return void 0 !== r?.readOnly && (l.readOnly = !!r.readOnly), void 0 !== r?.default && (l.json.default = r.default), void 0 !== r?.name && (l.json.name = r.name), void 0 !== r?.nonNullable && (l.nonNullable = r.nonNullable), y(l);
}

export {
  o
};
//# sourceMappingURL=chunk-JJ2NMOGF.js.map
