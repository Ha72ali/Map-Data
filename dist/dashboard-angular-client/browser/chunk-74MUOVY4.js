import {
  __async
} from "./chunk-GQAXEVUQ.js";

// node_modules/@esri/calcite-components/dist/components/component.js
function getIconScale(componentScale) {
  return componentScale === "l" ? "m" : "s";
}
function componentOnReady(el) {
  return __async(this, null, function* () {
    yield isStencilEl(el) ? el.componentOnReady() : new Promise((resolve) => requestAnimationFrame(() => resolve()));
  });
}
function isStencilEl(el) {
  return typeof el.componentOnReady === "function";
}

export {
  getIconScale,
  componentOnReady
};
/*! Bundled license information:

@esri/calcite-components/dist/components/component.js:
  (*!
   * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
   * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
   * v2.13.2
   *)
*/
//# sourceMappingURL=chunk-74MUOVY4.js.map
