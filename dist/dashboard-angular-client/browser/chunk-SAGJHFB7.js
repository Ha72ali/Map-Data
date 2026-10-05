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

// src/app/features/errors/forbidden.component.ts
var ForbiddenComponent = class _ForbiddenComponent {
  static {
    this.\u0275fac = function ForbiddenComponent_Factory(t) {
      return new (t || _ForbiddenComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForbiddenComponent, selectors: [["app-forbidden"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 9, vars: 0, consts: [[1, "err"], [1, "big"], ["mat-raised-button", "", "color", "primary", "routerLink", "/admin/dashboard"]], template: function ForbiddenComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-icon", 1);
        \u0275\u0275text(2, "block");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "h1");
        \u0275\u0275text(4, "403 \u2014 Forbidden");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "You don't have permission to view this page.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "a", 2);
        \u0275\u0275text(8, "Back to Dashboard");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [RouterModule, RouterLink, MatButtonModule, MatAnchor, MatIconModule, MatIcon], styles: ["\n\n.err[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 16px;\n}\n.big[_ngcontent-%COMP%] {\n  font-size: 64px;\n  height: 64px;\n  width: 64px;\n  color: #c0392b;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 12px 0 4px;\n}\n/*# sourceMappingURL=forbidden.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForbiddenComponent, { className: "ForbiddenComponent", filePath: "src/app/features/errors/forbidden.component.ts", lineNumber: 24 });
})();
export {
  ForbiddenComponent
};
//# sourceMappingURL=chunk-SAGJHFB7.js.map
