import {
  f,
  i,
  s as s2
} from "./chunk-2A6LCWAO.js";
import {
  U
} from "./chunk-IMLUWAKH.js";
import "./chunk-YFSAH4C7.js";
import "./chunk-47ACMYSX.js";
import "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/versionManagement/gdbVersion/deleteForwardEdits.js
function e(e2, n, m, a) {
  return __async(this, null, function* () {
    if (!n)
      throw new s("post:missing-guid", "guid for version is missing");
    const u = f(e2), d = m.toJSON(), f2 = i(u.query, __spreadProps(__spreadValues({ query: s2(__spreadProps(__spreadValues({}, d), { f: "json" })) }, a), { method: "post" }));
    n.startsWith("{") && (n = n.slice(1, -1));
    const p = `${u.path}/versions/${n}/deleteForwardEdits`, { data: c } = yield U(p, f2);
    return c;
  });
}
export {
  e as deleteForwardEdits
};
//# sourceMappingURL=chunk-ZDQ4O2SC.js.map
