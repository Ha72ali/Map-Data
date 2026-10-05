import {
  v
} from "./chunk-QNED4CTP.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";
import {
  b
} from "./chunk-NVGBLY2Q.js";
import {
  n2 as n
} from "./chunk-BTPDOHVM.js";

// node_modules/@arcgis/core/views/layers/RefreshableLayerView.js
var i = (i2) => {
  let a2 = class extends i2 {
    initialize() {
      this.addHandles(v(() => this.layer, "refresh", (r) => {
        this.doRefresh(r.dataChanged).catch((r2) => {
          b(r2) || n.getLogger(this).error(r2);
        });
      }), "RefreshableLayerView");
    }
  };
  return a2 = e([a("esri.views.layers.RefreshableLayerView")], a2), a2;
};

export {
  i
};
//# sourceMappingURL=chunk-QN5HQI56.js.map
