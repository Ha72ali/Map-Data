import {
  Build
} from "./chunk-FUPSM3TL.js";

// node_modules/@esri/calcite-components/dist/components/config.js
var existingConfig = globalThis["calciteConfig"];
var focusTrapStack = existingConfig?.focusTrapStack || [];
var runningInE2ETest = Build.isTesting && Build.isBrowser;
var logLevel = existingConfig?.logLevel || (runningInE2ETest ? "error" : "info");
var version = "2.13.2";
var buildDate = "2024-10-24";
var revision = "e38e2977d";
function stampVersion() {
  if (existingConfig && existingConfig.version) {
    return;
  }
  console.info(`Using Calcite Components ${version} [Date: ${buildDate}, Revision: ${revision}]`);
  const target = existingConfig || globalThis["calciteConfig"] || {};
  Object.defineProperty(target, "version", {
    value: version,
    writable: false
  });
  globalThis["calciteConfig"] = target;
}

export {
  focusTrapStack,
  logLevel,
  stampVersion
};
/*! Bundled license information:

@esri/calcite-components/dist/components/config.js:
  (*!
   * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
   * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
   * v2.13.2
   *)
*/
//# sourceMappingURL=chunk-72M5GKY2.js.map
