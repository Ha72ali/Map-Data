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
  MatButtonModule
} from "./chunk-FRFUT2I7.js";
import {
  MatCardModule
} from "./chunk-I3ITYJKA.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OEQY2HKJ.js";
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
import {
  API_BASE
} from "./chunk-WC2FK552.js";
import {
  CommonModule,
  HttpClient,
  NgIf,
  RouterLink,
  RouterModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-GJ4WXWU4.js";
import "./chunk-GQAXEVUQ.js";

// src/app/features/auth/forgot-password/forgot-password.component.ts
function ForgotPasswordComponent_mat_progress_bar_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-bar", 11);
  }
}
function ForgotPasswordComponent_ng_container_13_mat_error_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_ng_container_13_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Invalid email");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 12);
    \u0275\u0275listener("ngSubmit", function ForgotPasswordComponent_ng_container_13_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275elementStart(2, "mat-form-field", 13)(3, "mat-label");
    \u0275\u0275text(4, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 14);
    \u0275\u0275elementStart(6, "mat-icon", 15);
    \u0275\u0275text(7, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, ForgotPasswordComponent_ng_container_13_mat_error_8_Template, 2, 0, "mat-error", 16)(9, ForgotPasswordComponent_ng_container_13_mat_error_9_Template, 2, 0, "mat-error", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 17);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.form.controls.email.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.form.controls.email.hasError("email"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting() ? "Sending\u2026" : "Send reset link", " ");
  }
}
function ForgotPasswordComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " If an account exists for that email, a reset link has been sent. In dev, the link is printed in the server log. ");
    \u0275\u0275elementEnd();
  }
}
var ForgotPasswordComponent = class _ForgotPasswordComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.http = inject(HttpClient);
    this.toast = inject(ToastService);
    this.submitting = signal(false);
    this.sent = signal(false);
    this.form = this.fb.nonNullable.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
  submit() {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.http.post(`${API_BASE}/auth/forgot-password`, this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting.set(false);
        this.sent.set(true);
        this.toast.success("If that email exists, a reset link has been sent.");
      },
      error: () => {
        this.submitting.set(false);
        this.sent.set(true);
      }
    });
  }
  static {
    this.\u0275fac = function ForgotPasswordComponent_Factory(t) {
      return new (t || _ForgotPasswordComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForgotPasswordComponent, selectors: [["app-forgot-password"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 19, vars: 3, consts: [["doneTpl", ""], [1, "auth-shell", "auth-solo"], [1, "auth-panel"], [1, "auth-card"], [1, "auth-progress"], ["mode", "indeterminate", 4, "ngIf"], [1, "auth-head"], [1, "auth-badge"], [4, "ngIf", "ngIfElse"], [1, "auth-hint"], ["routerLink", "/login"], ["mode", "indeterminate"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full"], ["matInput", "", "type", "email", "formControlName", "email", "autocomplete", "email"], ["matSuffix", ""], [4, "ngIf"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "full", "submit-btn", 3, "disabled"], [1, "auth-hint", 2, "font-size", "13.5px"]], template: function ForgotPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "main", 2)(2, "div", 3)(3, "div", 4);
        \u0275\u0275template(4, ForgotPasswordComponent_mat_progress_bar_4_Template, 1, 0, "mat-progress-bar", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 6)(6, "div", 7)(7, "mat-icon");
        \u0275\u0275text(8, "lock_reset");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "h2");
        \u0275\u0275text(10, "Forgot password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "We'll email you a reset link");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(13, ForgotPasswordComponent_ng_container_13_Template, 12, 5, "ng-container", 8)(14, ForgotPasswordComponent_ng_template_14_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(16, "div", 9)(17, "a", 10);
        \u0275\u0275text(18, "\u2190 Back to sign in");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const doneTpl_r3 = \u0275\u0275reference(15);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.submitting());
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", !ctx.sent())("ngIfElse", doneTpl_r3);
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
      MatIconModule,
      MatIcon,
      MatProgressBarModule,
      MatProgressBar
    ], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.auth-shell[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 1.1fr 1fr;\n  background: #0f1b2d;\n  font-family:\n    "Roboto",\n    system-ui,\n    sans-serif;\n}\n.auth-brand[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  padding: 48px 56px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  color: #eaf2fb;\n  background:\n    radial-gradient(\n      1200px 600px at -10% -10%,\n      rgba(87, 224, 142, 0.12),\n      transparent 60%),\n    linear-gradient(\n      135deg,\n      #10243e 0%,\n      #163a63 45%,\n      #1c5aa0 100%);\n}\n.brand-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(70px);\n  opacity: 0.5;\n  pointer-events: none;\n}\n.brand-glow-1[_ngcontent-%COMP%] {\n  width: 360px;\n  height: 360px;\n  right: -80px;\n  top: -60px;\n  background: #2f7fd6;\n}\n.brand-glow-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  left: -60px;\n  bottom: -40px;\n  background: #1e8a58;\n  opacity: 0.35;\n}\n.brand-logo[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.brand-word[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 300;\n  letter-spacing: 3px;\n}\n.brand-word[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #57e08e;\n}\n.brand-hero[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 460px;\n}\n.brand-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 40px;\n  line-height: 1.12;\n  font-weight: 700;\n  margin: 0 0 16px;\n  letter-spacing: -0.5px;\n}\n.brand-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.6;\n  color: #b9cbe0;\n  margin: 0 0 28px;\n}\n.brand-points[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.brand-points[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14.5px;\n  color: #d6e3f2;\n}\n.brand-points[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #57e08e;\n  box-shadow: 0 0 0 4px rgba(87, 224, 142, 0.18);\n}\n.brand-foot[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  font-size: 12.5px;\n  color: #7f97b3;\n}\n.auth-panel[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 24px;\n  background: #f4f7fb;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  background: #ffffff;\n  border-radius: 18px;\n  padding: 40px 36px 32px;\n  box-shadow: 0 20px 60px rgba(16, 36, 62, 0.16), 0 2px 6px rgba(16, 36, 62, 0.06);\n  position: relative;\n}\n.auth-progress[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  border-radius: 18px 18px 0 0;\n  overflow: hidden;\n}\n.auth-head[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 26px;\n}\n.auth-badge[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  margin: 0 auto 16px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  background:\n    linear-gradient(\n      135deg,\n      #2d6a9f,\n      #1c5aa0);\n  box-shadow: 0 10px 24px rgba(28, 90, 160, 0.35);\n}\n.auth-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  height: 28px;\n  width: 28px;\n}\n.auth-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 24px;\n  font-weight: 700;\n  color: #10243e;\n}\n.auth-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13.5px;\n  color: #6b7f96;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.auth-forgot[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  margin: -6px 2px 14px;\n  font-size: 13px;\n  color: #2d6a9f;\n  text-decoration: none;\n}\n.auth-forgot[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 15px;\n  font-weight: 600;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #2d6a9f,\n      #1c5aa0);\n  transition: transform 0.12s ease, box-shadow 0.2s ease;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not([disabled]) {\n  transform: translateY(-1px);\n  box-shadow: 0 10px 22px rgba(28, 90, 160, 0.35);\n}\n.submit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  font-size: 20px;\n  height: 20px;\n  width: 20px;\n  vertical-align: middle;\n}\n.auth-hint[_ngcontent-%COMP%] {\n  margin-top: 22px;\n  text-align: center;\n  font-size: 12px;\n  color: #90a2b8;\n}\n.auth-hint[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: #eef3f9;\n  padding: 1px 6px;\n  border-radius: 5px;\n  color: #2d6a9f;\n  font-size: 11.5px;\n}\n.auth-shell.auth-solo[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.auth-shell.auth-solo[_ngcontent-%COMP%]   .auth-panel[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      1000px 500px at 90% -10%,\n      rgba(87, 224, 142, 0.10),\n      transparent 60%),\n    linear-gradient(\n      135deg,\n      #10243e 0%,\n      #163a63 45%,\n      #1c5aa0 100%);\n}\n@media (max-width: 900px) {\n  .auth-shell[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .auth-brand[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .auth-panel[_ngcontent-%COMP%] {\n    background:\n      linear-gradient(\n        135deg,\n        #10243e 0%,\n        #1c5aa0 100%);\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForgotPasswordComponent, { className: "ForgotPasswordComponent", filePath: "src/app/features/auth/forgot-password/forgot-password.component.ts", lineNumber: 32 });
})();
export {
  ForgotPasswordComponent
};
//# sourceMappingURL=chunk-EJCCIUVF.js.map
