import {
  a,
  c as c2
} from "./chunk-LBJUDHJ5.js";
import {
  b as b2,
  d,
  p as p2,
  w,
  y
} from "./chunk-WCJRPYK4.js";
import {
  b
} from "./chunk-NG4OIOR2.js";
import {
  c,
  i2 as i,
  x
} from "./chunk-YTC5APIA.js";
import {
  C
} from "./chunk-V4F7XXO4.js";
import {
  p
} from "./chunk-2GHQZMFH.js";
import {
  I,
  Rt
} from "./chunk-IMLUWAKH.js";
import {
  s2 as s
} from "./chunk-BTPDOHVM.js";

// node_modules/@arcgis/core/symbols/support/webStyleSymbolUtils.js
function g(t, e, r, o) {
  const n = t.name;
  return null == n ? Promise.reject(new s("symbolstyleutils:style-symbol-reference-name-missing", "Missing name in style symbol reference")) : t.styleName && "Esri2DPointSymbolsStyle" === t.styleName ? d2(n, e, o) : y(t, e, o).then((t2) => h(t2, n, e, r, d, o));
}
function j(t, e) {
  return e.items.find((e2) => e2.name === t);
}
function h(u, y2, c3, g2, h2, d3) {
  const U = null != c3?.portal ? c3.portal : C.getDefault(), N = { portal: U, url: I(u.baseUrl), origin: "portal-item" }, w2 = j(y2, u.data);
  if (!w2) {
    const t = `The symbol name '${y2}' could not be found`;
    return Promise.reject(new s("symbolstyleutils:symbol-name-not-found", t, { symbolName: y2 }));
  }
  let S = p(h2(w2, g2), N), D = w2.thumbnail?.href ?? null;
  const O = w2.thumbnail?.imageData;
  c2() && (S = a(S) ?? "", D = a(D));
  const P = { portal: U, url: I(Rt(S)), origin: "portal-item" };
  return b2(S, d3).then((e) => {
    const r = "cimRef" === g2 ? p2(e.data) : e.data, l = b(r, P);
    if (l && x(l)) {
      if (D) {
        const t = p(D, N);
        l.thumbnail = new c({ url: t });
      } else
        O && (l.thumbnail = new c({ url: `data:image/png;base64,${O}` }));
      u.styleUrl ? l.styleOrigin = new i({ portal: c3.portal, styleUrl: u.styleUrl, name: y2 }) : u.styleName && (l.styleOrigin = new i({ portal: c3.portal, styleName: u.styleName, name: y2 }));
    }
    return l;
  });
}
function d2(t, e, r) {
  const l = w.replaceAll(/\{SymbolName\}/gi, t), m = null != e.portal ? e.portal : C.getDefault();
  return b2(l, r).then((t2) => {
    const e2 = p2(t2.data);
    return b(e2, { portal: m, url: I(Rt(l)), origin: "portal-item" });
  });
}

export {
  g,
  j,
  h
};
//# sourceMappingURL=chunk-SPMWUWYR.js.map
