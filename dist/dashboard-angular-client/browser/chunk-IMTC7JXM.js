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
  MatLabel
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
  ActivatedRoute,
  CommonModule,
  HttpClient,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-GJ4WXWU4.js";
import "./chunk-GQAXEVUQ.js";

// src/app/features/auth/reset-password/reset-password.component.ts
function ResetPasswordComponent_mat_progress_bar_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-bar", 16);
  }
}
function ResetPasswordComponent_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, " No reset token found in the link. ");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_mat_error_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_mat_error_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Minimum 6 characters");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_mat_error_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Passwords do not match");
    \u0275\u0275elementEnd();
  }
}
function matchPasswords(group) {
  return group.get("newPassword")?.value === group.get("confirmPassword")?.value ? null : { mismatch: true };
}
var ResetPasswordComponent = class _ResetPasswordComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.http = inject(HttpClient);
    this.toast = inject(ToastService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.submitting = signal(false);
    this.token = signal("");
    this.form = this.fb.nonNullable.group({
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, { validators: matchPasswords });
  }
  ngOnInit() {
    this.token.set(this.route.snapshot.queryParamMap.get("token") || "");
  }
  submit() {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.token()) {
      this.toast.error("Missing or invalid reset token");
      return;
    }
    this.submitting.set(true);
    this.http.post(`${API_BASE}/auth/reset-password`, {
      token: this.token(),
      newPassword: this.form.getRawValue().newPassword
    }).subscribe({
      next: () => {
        this.toast.success("Password reset. Please sign in.");
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err?.error?.message || "Reset failed");
      }
    });
  }
  static {
    this.\u0275fac = function ResetPasswordComponent_Factory(t) {
      return new (t || _ResetPasswordComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResetPasswordComponent, selectors: [["app-reset-password"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 31, vars: 8, consts: [[1, "auth-shell", "auth-solo"], [1, "auth-panel"], [1, "auth-card"], [1, "auth-progress"], ["mode", "indeterminate", 4, "ngIf"], [1, "auth-head"], [1, "auth-badge"], ["class", "auth-hint", "style", "color:#c0392b; font-size:13px", 4, "ngIf"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full"], ["matInput", "", "type", "password", "formControlName", "newPassword", "autocomplete", "new-password"], [4, "ngIf"], ["matInput", "", "type", "password", "formControlName", "confirmPassword", "autocomplete", "new-password"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "full", "submit-btn", 3, "disabled"], [1, "auth-hint"], ["routerLink", "/login"], ["mode", "indeterminate"], [1, "auth-hint", 2, "color", "#c0392b", "font-size", "13px"]], template: function ResetPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "main", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275template(4, ResetPasswordComponent_mat_progress_bar_4_Template, 1, 0, "mat-progress-bar", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "mat-icon");
        \u0275\u0275text(8, "password");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "h2");
        \u0275\u0275text(10, "Reset password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "Choose a new password");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(13, ResetPasswordComponent_p_13_Template, 2, 0, "p", 7);
        \u0275\u0275elementStart(14, "form", 8);
        \u0275\u0275listener("ngSubmit", function ResetPasswordComponent_Template_form_ngSubmit_14_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(15, "mat-form-field", 9)(16, "mat-label");
        \u0275\u0275text(17, "New Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(18, "input", 10);
        \u0275\u0275template(19, ResetPasswordComponent_mat_error_19_Template, 2, 0, "mat-error", 11)(20, ResetPasswordComponent_mat_error_20_Template, 2, 0, "mat-error", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "mat-form-field", 9)(22, "mat-label");
        \u0275\u0275text(23, "Confirm Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 12);
        \u0275\u0275template(25, ResetPasswordComponent_mat_error_25_Template, 2, 0, "mat-error", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "button", 13);
        \u0275\u0275text(27);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 14)(29, "a", 15);
        \u0275\u0275text(30, "\u2190 Back to sign in");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.submitting());
        \u0275\u0275advance(9);
        \u0275\u0275property("ngIf", !ctx.token());
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.form.controls.newPassword.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.form.controls.newPassword.hasError("minlength"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.form.hasError("mismatch"));
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.submitting());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.submitting() ? "Resetting\u2026" : "Reset password", " ");
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResetPasswordComponent, { className: "ResetPasswordComponent", filePath: "src/app/features/auth/reset-password/reset-password.component.ts", lineNumber: 36 });
})();
export {
  ResetPasswordComponent
};
//# sourceMappingURL=chunk-IMTC7JXM.js.map
