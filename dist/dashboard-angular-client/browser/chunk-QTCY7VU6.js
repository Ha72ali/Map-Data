import {
  MatProgressBar,
  MatProgressBarModule
} from "./chunk-FUIBSC46.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-AQH3NDNU.js";
import {
  ToastService
} from "./chunk-ZGQBMLV5.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix
} from "./chunk-JSN4LV5Z.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-FRFUT2I7.js";
import {
  MatCardModule
} from "./chunk-I3ITYJKA.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OEQY2HKJ.js";
import {
  AuthService
} from "./chunk-YVYTDPVZ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-IUHX474R.js";
import "./chunk-WC2FK552.js";
import {
  ActivatedRoute,
  CommonModule,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GJ4WXWU4.js";
import "./chunk-GQAXEVUQ.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_mat_progress_bar_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-bar", 30);
  }
}
function LoginComponent_mat_error_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_error_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_error_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Minimum 6 characters");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_icon_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "login");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.toast = inject(ToastService);
    this.submitting = signal(false);
    this.hidePassword = signal(true);
    this.form = this.fb.nonNullable.group({
      emailOrUsername: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  submit() {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const { emailOrUsername, password } = this.form.getRawValue();
    this.auth.login(emailOrUsername, password).subscribe({
      next: (user) => {
        this.toast.success(`Welcome, ${user.firstName}`);
        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err?.error?.message || "Login failed");
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 67, vars: 11, consts: [[1, "auth-shell"], [1, "auth-brand"], [1, "brand-glow", "brand-glow-1"], [1, "brand-glow", "brand-glow-2"], [1, "brand-logo"], ["width", "40", "height", "40", "viewBox", "0 0 40 40", "fill", "none", "aria-hidden", "true"], ["cx", "20", "cy", "20", "r", "18", "stroke", "#7cc4ff", "stroke-width", "2"], ["cx", "20", "cy", "20", "r", "12", "stroke", "#57e08e", "stroke-width", "1.5"], ["cx", "20", "cy", "20", "r", "6", "fill", "#7cc4ff"], ["d", "M20 2 L20 8 M20 32 L20 38 M2 20 L8 20 M32 20 L38 20", "stroke", "#7cc4ff", "stroke-width", "1.5"], [1, "brand-word"], [1, "brand-hero"], [1, "brand-points"], [1, "dot"], [1, "brand-foot"], [1, "auth-panel"], [1, "auth-card"], [1, "auth-progress"], ["mode", "indeterminate", 4, "ngIf"], [1, "auth-head"], [1, "auth-badge"], ["autocomplete", "on", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full"], ["matInput", "", "formControlName", "emailOrUsername", "autocomplete", "username"], ["matSuffix", ""], [4, "ngIf"], ["matInput", "", "formControlName", "password", "autocomplete", "current-password", 3, "type"], ["type", "button", "mat-icon-button", "", "matSuffix", "", 3, "click"], ["routerLink", "/forgot-password", 1, "auth-forgot"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "full", "submit-btn", 3, "disabled"], ["mode", "indeterminate"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3);
        \u0275\u0275elementStart(4, "div", 4);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(5, "svg", 5);
        \u0275\u0275element(6, "circle", 6)(7, "circle", 7)(8, "circle", 8)(9, "path", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "span", 10);
        \u0275\u0275text(11, "NEO");
        \u0275\u0275elementStart(12, "b");
        \u0275\u0275text(13, "TECX");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(14, "div", 11)(15, "h1");
        \u0275\u0275text(16, "Fiber Deployment");
        \u0275\u0275element(17, "br");
        \u0275\u0275text(18, "Command Center");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "p");
        \u0275\u0275text(20, "Live visibility into rings, links, contractors and progress \u2014 secured with role-based access.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "ul", 12)(22, "li");
        \u0275\u0275element(23, "span", 13);
        \u0275\u0275text(24, " Role & permission based access");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "li");
        \u0275\u0275element(26, "span", 13);
        \u0275\u0275text(27, " Real-time KPIs & GIS map");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "li");
        \u0275\u0275element(29, "span", 13);
        \u0275\u0275text(30, " Secure JWT authentication");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(31, "div", 14);
        \u0275\u0275text(32, "\xA9 2026 Neotecx \xB7 Fiber Deployment Platform");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "main", 15)(34, "div", 16)(35, "div", 17);
        \u0275\u0275template(36, LoginComponent_mat_progress_bar_36_Template, 1, 0, "mat-progress-bar", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "div", 19)(38, "div", 20)(39, "mat-icon");
        \u0275\u0275text(40, "lock");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "h2");
        \u0275\u0275text(42, "Welcome back");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "p");
        \u0275\u0275text(44, "Sign in to the RBAC Admin Console");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(45, "form", 21);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_45_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(46, "mat-form-field", 22)(47, "mat-label");
        \u0275\u0275text(48, "Email or Username");
        \u0275\u0275elementEnd();
        \u0275\u0275element(49, "input", 23);
        \u0275\u0275elementStart(50, "mat-icon", 24);
        \u0275\u0275text(51, "person");
        \u0275\u0275elementEnd();
        \u0275\u0275template(52, LoginComponent_mat_error_52_Template, 2, 0, "mat-error", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "mat-form-field", 22)(54, "mat-label");
        \u0275\u0275text(55, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(56, "input", 26);
        \u0275\u0275elementStart(57, "button", 27);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_57_listener() {
          return ctx.hidePassword.set(!ctx.hidePassword());
        });
        \u0275\u0275elementStart(58, "mat-icon");
        \u0275\u0275text(59);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(60, LoginComponent_mat_error_60_Template, 2, 0, "mat-error", 25)(61, LoginComponent_mat_error_61_Template, 2, 0, "mat-error", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "a", 28);
        \u0275\u0275text(63, "Forgot password?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "button", 29);
        \u0275\u0275template(65, LoginComponent_mat_icon_65_Template, 2, 0, "mat-icon", 25);
        \u0275\u0275text(66);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(36);
        \u0275\u0275property("ngIf", ctx.submitting());
        \u0275\u0275advance(9);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", ctx.form.controls.emailOrUsername.hasError("required"));
        \u0275\u0275advance(4);
        \u0275\u0275property("type", ctx.hidePassword() ? "password" : "text");
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", "Toggle password visibility");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.hidePassword() ? "visibility_off" : "visibility");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.form.controls.password.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.form.controls.password.hasError("minlength"));
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.submitting());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.submitting());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.submitting() ? "Signing in\u2026" : "Sign in", " ");
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      RouterModule,
      RouterLink,
      MatCardModule,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatProgressBarModule,
      MatProgressBar
    ], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.auth-shell[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 1.1fr 1fr;\n  background: #0f1b2d;\n  font-family:\n    "Roboto",\n    system-ui,\n    sans-serif;\n}\n.auth-brand[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  padding: 48px 56px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  color: #eaf2fb;\n  background:\n    radial-gradient(\n      1200px 600px at -10% -10%,\n      rgba(87, 224, 142, 0.12),\n      transparent 60%),\n    linear-gradient(\n      135deg,\n      #10243e 0%,\n      #163a63 45%,\n      #1c5aa0 100%);\n}\n.brand-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(70px);\n  opacity: 0.5;\n  pointer-events: none;\n}\n.brand-glow-1[_ngcontent-%COMP%] {\n  width: 360px;\n  height: 360px;\n  right: -80px;\n  top: -60px;\n  background: #2f7fd6;\n}\n.brand-glow-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  left: -60px;\n  bottom: -40px;\n  background: #1e8a58;\n  opacity: 0.35;\n}\n.brand-logo[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.brand-word[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 300;\n  letter-spacing: 3px;\n}\n.brand-word[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #57e08e;\n}\n.brand-hero[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 460px;\n}\n.brand-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 40px;\n  line-height: 1.12;\n  font-weight: 700;\n  margin: 0 0 16px;\n  letter-spacing: -0.5px;\n}\n.brand-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.6;\n  color: #b9cbe0;\n  margin: 0 0 28px;\n}\n.brand-points[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.brand-points[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14.5px;\n  color: #d6e3f2;\n}\n.brand-points[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #57e08e;\n  box-shadow: 0 0 0 4px rgba(87, 224, 142, 0.18);\n}\n.brand-foot[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  font-size: 12.5px;\n  color: #7f97b3;\n}\n.auth-panel[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 24px;\n  background: #f4f7fb;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  background: #ffffff;\n  border-radius: 18px;\n  padding: 40px 36px 32px;\n  box-shadow: 0 20px 60px rgba(16, 36, 62, 0.16), 0 2px 6px rgba(16, 36, 62, 0.06);\n  position: relative;\n}\n.auth-progress[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  border-radius: 18px 18px 0 0;\n  overflow: hidden;\n}\n.auth-head[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 26px;\n}\n.auth-badge[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  margin: 0 auto 16px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  background:\n    linear-gradient(\n      135deg,\n      #2d6a9f,\n      #1c5aa0);\n  box-shadow: 0 10px 24px rgba(28, 90, 160, 0.35);\n}\n.auth-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  height: 28px;\n  width: 28px;\n}\n.auth-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 24px;\n  font-weight: 700;\n  color: #10243e;\n}\n.auth-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  color: #6b7f96;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.auth-forgot[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  margin: -6px 2px 14px;\n  font-size: 13px;\n  color: #2d6a9f;\n  text-decoration: none;\n}\n.auth-forgot[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 15px;\n  font-weight: 600;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #2d6a9f,\n      #1c5aa0);\n  transition: transform 0.12s ease, box-shadow 0.2s ease;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not([disabled]) {\n  transform: translateY(-1px);\n  box-shadow: 0 10px 22px rgba(28, 90, 160, 0.35);\n}\n.submit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  font-size: 20px;\n  height: 20px;\n  width: 20px;\n  vertical-align: middle;\n}\n.auth-hint[_ngcontent-%COMP%] {\n  margin-top: 22px;\n  text-align: center;\n  font-size: 12px;\n  color: #90a2b8;\n}\n.auth-hint[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: #eef3f9;\n  padding: 1px 6px;\n  border-radius: 5px;\n  color: #2d6a9f;\n  font-size: 11.5px;\n}\n.auth-shell.auth-solo[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.auth-shell.auth-solo[_ngcontent-%COMP%]   .auth-panel[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      1000px 500px at 90% -10%,\n      rgba(87, 224, 142, 0.10),\n      transparent 60%),\n    linear-gradient(\n      135deg,\n      #10243e 0%,\n      #163a63 45%,\n      #1c5aa0 100%);\n}\n@media (max-width: 900px) {\n  .auth-shell[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .auth-brand[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .auth-panel[_ngcontent-%COMP%] {\n    background:\n      linear-gradient(\n        135deg,\n        #10243e 0%,\n        #1c5aa0 100%);\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/login/login.component.ts", lineNumber: 31 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-QTCY7VU6.js.map
