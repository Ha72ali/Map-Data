import {
  AuthService
} from "./chunk-YVYTDPVZ.js";
import {
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  signal,
  ɵɵdefineDirective
} from "./chunk-GJ4WXWU4.js";

// src/app/shared/directives/has-permission.directive.ts
var HasPermissionDirective = class _HasPermissionDirective {
  constructor() {
    this.tpl = inject(TemplateRef);
    this.vcr = inject(ViewContainerRef);
    this.auth = inject(AuthService);
    this.required = signal([]);
    this.rendered = false;
    effect(() => {
      const perms = this.auth.permissions();
      const req = this.required();
      const allowed = req.length === 0 || req.some((p) => perms.has(p));
      this.toggle(allowed);
    });
  }
  set appHasPermission(value) {
    this.required.set(Array.isArray(value) ? value : [value]);
  }
  toggle(show) {
    if (show && !this.rendered) {
      this.vcr.createEmbeddedView(this.tpl);
      this.rendered = true;
    } else if (!show && this.rendered) {
      this.vcr.clear();
      this.rendered = false;
    }
  }
  static {
    this.\u0275fac = function HasPermissionDirective_Factory(t) {
      return new (t || _HasPermissionDirective)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _HasPermissionDirective, selectors: [["", "appHasPermission", ""]], inputs: { appHasPermission: "appHasPermission" }, standalone: true });
  }
};

export {
  HasPermissionDirective
};
//# sourceMappingURL=chunk-5C3OS4KK.js.map
