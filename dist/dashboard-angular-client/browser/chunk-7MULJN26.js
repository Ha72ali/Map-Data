import {
  s2 as s
} from "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/core/workers/request.js
function e(e2, s2) {
  let a = s2.responseType;
  a ? "array-buffer" !== a && "blob" !== a && "json" !== a && "native" !== a && "native-request-init" !== a && "text" !== a && (a = "text") : a = "json", s2.responseType = a;
  const r = s2.signal;
  return delete s2.signal, globalThis.invokeStaticMessage("request", { url: e2, options: s2 }, { signal: r }).then((n) => __async(this, null, function* () {
    let o, i, l, u, c;
    if (n.data)
      if (n.data instanceof ArrayBuffer) {
        if (!("json" !== a && "text" !== a && "blob" !== a || (o = new Blob([n.data]), "json" !== a && "text" !== a || (u = yield o.text(), "json" !== a)))) {
          try {
            i = JSON.parse(u || null);
          } catch (p) {
            const a2 = __spreadProps(__spreadValues({}, p), { url: e2, requestOptions: s2 });
            throw new s("request:server", p.message, a2);
          }
          if (i.error) {
            const a2 = __spreadProps(__spreadValues({}, i.error), { url: e2, requestOptions: s2 });
            throw new s("request:server", i.error.message, a2);
          }
        }
      } else
        "native" === a && (n.data.signal = r, l = yield fetch(n.data.url, n.data), n.httpStatus = l.status);
    switch (a) {
      case "blob":
        c = o;
        break;
      case "json":
        c = i;
        break;
      case "native":
        c = l;
        break;
      case "text":
        c = u;
        break;
      default:
        c = n.data;
    }
    return { data: c, httpStatus: n.httpStatus, requestOptions: s2, ssl: n.ssl, url: e2 };
  }));
}
export {
  e as execute
};
//# sourceMappingURL=chunk-7MULJN26.js.map
