import {
  C
} from "./chunk-V4F7XXO4.js";
import {
  I
} from "./chunk-IMLUWAKH.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/portal/support/jsonContext.js
function e(t, r) {
  return __spreadProps(__spreadValues({}, l(t, r)), { readResourcePaths: [] });
}
function o(r, e2, o2) {
  const i = I(r.itemUrl);
  return __spreadProps(__spreadValues({}, l(r, e2)), { messages: [], writtenProperties: [], blockedRelativeUrls: [], verifyItemRelativeUrls: i ? { rootPath: i.path, writtenUrls: [] } : null, resources: o2 ? { toAdd: [], toUpdate: [], toKeep: [], pendingOperations: [] } : null });
}
function l(e2, o2) {
  return { origin: o2, url: I(e2.itemUrl), portal: e2.portal || C.getDefault(), portalItem: e2 };
}

export {
  e,
  o
};
//# sourceMappingURL=chunk-WBMLBIXY.js.map
