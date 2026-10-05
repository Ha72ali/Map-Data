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
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-I3ITYJKA.js";
import {
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
import {
  API_BASE
} from "./chunk-WC2FK552.js";
import {
  CommonModule,
  HttpClient,
  NgIf,
  Router,
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

// src/app/features/auth/change-password/change-password.component.ts
function ChangePasswordComponent_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function ChangePasswordComponent_mat_error_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function ChangePasswordComponent_mat_error_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Minimum 6 characters");
    \u0275\u0275elementEnd();
  }
}
function ChangePasswordComponent_mat_error_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Passwords do not match");
    \u0275\u0275elementEnd();
  }
}
function matchPasswords(group) {
  const n = group.get("newPassword")?.value;
  const c = group.get("confirmPassword")?.value;
  return n === c ? null : { mismatch: true };
}
var ChangePasswordComponent = class _ChangePasswordComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.http = inject(HttpClient);
    this.auth = inject(AuthService);
    this.toast = inject(ToastService);
    this.router = inject(Router);
    this.submitting = signal(false);
    this.form = this.fb.nonNullable.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, { validators: matchPasswords });
  }
  submit() {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const { currentPassword, newPassword } = this.form.getRawValue();
    this.http.post(`${API_BASE}/auth/change-password`, { currentPassword, newPassword }).subscribe({
      next: () => {
        this.toast.success("Password changed. Please sign in again.");
        this.auth.clearSession();
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err?.error?.message || "Could not change password");
      }
    });
  }
  static {
    this.\u0275fac = function ChangePasswordComponent_Factory(t) {
      return new (t || _ChangePasswordComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangePasswordComponent, selectors: [["app-change-password"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 7, consts: [[1, "page-title"], [1, "card"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full"], ["matInput", "", "type", "password", "formControlName", "currentPassword", "autocomplete", "current-password"], [4, "ngIf"], ["matInput", "", "type", "password", "formControlName", "newPassword", "autocomplete", "new-password"], ["matInput", "", "type", "password", "formControlName", "confirmPassword", "autocomplete", "new-password"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"]], template: function ChangePasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h1", 0);
        \u0275\u0275text(1, "Change Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "mat-card", 1)(3, "mat-card-content")(4, "form", 2);
        \u0275\u0275listener("ngSubmit", function ChangePasswordComponent_Template_form_ngSubmit_4_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(5, "mat-form-field", 3)(6, "mat-label");
        \u0275\u0275text(7, "Current Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "input", 4);
        \u0275\u0275template(9, ChangePasswordComponent_mat_error_9_Template, 2, 0, "mat-error", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "mat-form-field", 3)(11, "mat-label");
        \u0275\u0275text(12, "New Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(13, "input", 6);
        \u0275\u0275template(14, ChangePasswordComponent_mat_error_14_Template, 2, 0, "mat-error", 5)(15, ChangePasswordComponent_mat_error_15_Template, 2, 0, "mat-error", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "mat-form-field", 3)(17, "mat-label");
        \u0275\u0275text(18, "Confirm New Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 7);
        \u0275\u0275template(20, ChangePasswordComponent_mat_error_20_Template, 2, 0, "mat-error", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 8);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.form.controls.currentPassword.hasError("required"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.form.controls.newPassword.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.form.controls.newPassword.hasError("minlength"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.form.hasError("mismatch"));
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.submitting());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.submitting() ? "Saving\u2026" : "Update Password", " ");
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatCardModule, MatCard, MatCardContent, MatFormFieldModule, MatFormField, MatLabel, MatError, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconModule], styles: ["\n\n.page-title[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n  font-size: 24px;\n  font-weight: 600;\n}\n.card[_ngcontent-%COMP%] {\n  max-width: 480px;\n}\n.full[_ngcontent-%COMP%] {\n  width: 100%;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n/*# sourceMappingURL=change-password.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangePasswordComponent, { className: "ChangePasswordComponent", filePath: "src/app/features/auth/change-password/change-password.component.ts", lineNumber: 36 });
})();
export {
  ChangePasswordComponent
};
//# sourceMappingURL=chunk-YI6NYYGL.js.map
