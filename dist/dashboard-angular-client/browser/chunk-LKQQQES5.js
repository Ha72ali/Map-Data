import {
  F,
  s as s2
} from "./chunk-GF2XXTDU.js";
import {
  b
} from "./chunk-47ACMYSX.js";
import {
  u
} from "./chunk-V7ZPXZOX.js";
import {
  n2 as n,
  s
} from "./chunk-BTPDOHVM.js";

// node_modules/@arcgis/core/support/basemapUtils.js
var p = () => n.getLogger("esri.support.basemapUtils");
function y() {
  return {};
}
function m(e) {
  for (const r2 in e) {
    const t = e[r2];
    u(t), delete e[r2];
  }
}
function b2(t, n2) {
  let a;
  if ("string" == typeof t) {
    const i = t in s2, l = !i && t.includes("/");
    if (!i && !l) {
      const e = Object.entries(s2).filter(([e2, t2]) => s.apiKey && !t2.classic || !s.apiKey && (t2.classic || t2.is3d)).map(([e2]) => `"${e2}"`).sort().join(", ");
      return p().warn(`Unable to find basemap definition for: ${t}. Try one of these: ${e}`), null;
    }
    n2 && (a = n2[t]), a || (a = i ? F.fromId(t) : new F({ style: { id: t } }), n2 && (n2[t] = a));
  } else
    a = b(F, t);
  return a?.destroyed && (p().warn("The provided basemap is already destroyed", { basemap: a }), a = null), a;
}

export {
  y,
  m,
  b2 as b
};
//# sourceMappingURL=chunk-LKQQQES5.js.map
