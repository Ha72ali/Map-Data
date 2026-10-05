import {
  MatAnchor,
  MatButtonModule
} from "./chunk-FRFUT2I7.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OEQY2HKJ.js";
import {
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-GJ4WXWU4.js";
import "./chunk-GQAXEVUQ.js";

// src/app/features/errors/not-found.component.ts
var NotFoundComponent = class _NotFoundComponent {
  static {
    this.\u0275fac = function NotFoundComponent_Factory(t) {
      return new (t || _NotFoundComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotFoundComponent, selectors: [["app-not-found"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 9, vars: 0, consts: [[1, "err"], [1, "big"], ["mat-raised-button", "", "color", "primary", "routerLink", "/admin/dashboard"]], template: function NotFoundComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-icon", 1);
        \u0275\u0275text(2, "search_off");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "h1");
        \u0275\u0275text(4, "404 \u2014 Not Found");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "The page you're looking for doesn't exist.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "a", 2);
        \u0275\u0275text(8, "Back to Dashboard");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [RouterModule, RouterLink, MatButtonModule, MatAnchor, MatIconModule, MatIcon], styles: ["\n\n.err[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 16px;\n}\n.big[_ngcontent-%COMP%] {\n  font-size: 64px;\n  height: 64px;\n  width: 64px;\n  color: #7f8c8d;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 12px 0 4px;\n}\n/*# sourceMappingURL=not-found.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotFoundComponent, { className: "NotFoundComponent", filePath: "src/app/features/errors/not-found.component.ts", lineNumber: 24 });
})();
export {
  NotFoundComponent
};
//# sourceMappingURL=chunk-5HEPP2OE.js.map
