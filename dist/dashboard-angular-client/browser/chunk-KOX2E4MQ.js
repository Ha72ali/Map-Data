import {
  i
} from "./chunk-4CDDO4UD.js";
import {
  E,
  R,
  a as a2
} from "./chunk-R476LTOD.js";
import {
  a3 as a
} from "./chunk-47ACMYSX.js";
import {
  e
} from "./chunk-7CFNW2HZ.js";

// node_modules/@arcgis/core/views/2d/layers/graphics/HighlightGraphicContainer.js
var a3 = class extends i {
  get hasHighlight() {
    return this.children.some((r) => r.hasData);
  }
  renderChildren(r) {
    this.attributeView.update(), r.drawPhase === E.HIGHLIGHT && this.children.some((r2) => r2.hasData) && (super.renderChildren(r), r.context.setColorMask(true, true, true, true), a2(r, true, (r2) => {
      this._renderChildren(r2, R.All);
    }));
  }
};
a3 = e([a("esri.views.2d.layers.graphics.HighlightGraphicContainer")], a3);
var h = a3;

export {
  h
};
//# sourceMappingURL=chunk-KOX2E4MQ.js.map
