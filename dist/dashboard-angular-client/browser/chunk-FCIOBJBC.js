import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-I3ITYJKA.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OEQY2HKJ.js";
import {
  ActivatedRoute,
  CommonModule,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GJ4WXWU4.js";
import "./chunk-GQAXEVUQ.js";

// src/app/features/placeholder/placeholder.component.ts
var PlaceholderComponent = class _PlaceholderComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.title = this.route.snapshot.data["title"] || "Module";
  }
  static {
    this.\u0275fac = function PlaceholderComponent_Factory(t) {
      return new (t || _PlaceholderComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlaceholderComponent, selectors: [["app-placeholder"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 2, consts: [[1, "page-title"], [1, "body"]], template: function PlaceholderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h1", 0);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "mat-card")(3, "mat-card-content", 1)(4, "mat-icon");
        \u0275\u0275text(5, "construction");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "The ");
        \u0275\u0275elementStart(8, "strong");
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " module is coming soon.");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.title);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.title);
      }
    }, dependencies: [CommonModule, MatCardModule, MatCard, MatCardContent, MatIconModule, MatIcon], styles: ["\n\n.page-title[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n  font-size: 24px;\n  font-weight: 600;\n}\n.body[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 24px;\n  opacity: 0.75;\n}\nmat-icon[_ngcontent-%COMP%] {\n  color: #e67e22;\n}\n/*# sourceMappingURL=placeholder.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlaceholderComponent, { className: "PlaceholderComponent", filePath: "src/app/features/placeholder/placeholder.component.ts", lineNumber: 27 });
})();
export {
  PlaceholderComponent
};
//# sourceMappingURL=chunk-FCIOBJBC.js.map
