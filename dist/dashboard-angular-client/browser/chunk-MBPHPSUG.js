import {
  f2 as f,
  y
} from "./chunk-YFSAH4C7.js";
import {
  a3 as a,
  g
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import "./chunk-NVGBLY2Q.js";
import "./chunk-V7ZPXZOX.js";
import "./chunk-U45XNREI.js";
import "./chunk-5DVBROVO.js";
import "./chunk-BTPDOHVM.js";
import "./chunk-7JFKWLN7.js";
import "./chunk-GQAXEVUQ.js";

// node_modules/@arcgis/core/rest/versionManagement/gdbVersion/support/DeleteForwardEditsParameters.js
var p;
var i = p = class extends f {
  static from(r) {
    return g(p, r);
  }
  constructor(r) {
    super(r), this.sessionId = void 0, this.moment = null;
  }
};
e([y({ type: String, json: { write: true } })], i.prototype, "sessionId", void 0), e([y({ type: Date, json: { type: Number, write: { writer: (r, o) => {
  o.moment = r ? r.getTime() : null;
} } } })], i.prototype, "moment", void 0), i = p = e([a("esri.rest.versionManagement.gdbVersion.support.DeleteForwardEditsParameters")], i);
var m = i;
export {
  m as default
};
//# sourceMappingURL=chunk-MBPHPSUG.js.map
