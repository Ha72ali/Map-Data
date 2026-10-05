import {
  e
} from "./chunk-NVGBLY2Q.js";

// node_modules/@arcgis/core/intl/locale.js
var o;
var e2;
var t = globalThis.esriConfig?.locale ?? globalThis.dojoConfig?.locale;
function i() {
  return t ?? globalThis.navigator?.language ?? "en";
}
function c() {
  return void 0 === e2 && (e2 = i()), e2;
}
function a(n = c()) {
  const o2 = /^([a-zA-Z]{2,3})(?:[_-]\w+)*$/.exec(n);
  return o2?.[1].toLowerCase();
}
var u = [];
function f(o2) {
  return u.push(o2), e(() => u.splice(u.indexOf(o2), 1));
}
var g = [];
function h(o2) {
  return g.push(o2), e(() => g.splice(g.indexOf(o2), 1));
}
function d() {
  const n = o ?? i();
  e2 !== n && ([...g].forEach((o2) => o2(n)), e2 = n, [...u].forEach((o2) => o2(n)));
}
globalThis.addEventListener?.("languagechange", d);

export {
  c,
  a,
  f,
  h
};
//# sourceMappingURL=chunk-U4PIZ66H.js.map
