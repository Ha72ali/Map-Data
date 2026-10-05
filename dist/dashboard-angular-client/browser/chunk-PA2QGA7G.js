import {
  MatSelect,
  MatSelectModule,
  UserService
} from "./chunk-ODUUGPRW.js";
import {
  MatSlideToggleModule
} from "./chunk-GPU6WTEZ.js";
import {
  RoleService
} from "./chunk-A6J442XX.js";
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
  MatAnchor,
  MatButton,
  MatButtonModule
} from "./chunk-FRFUT2I7.js";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-I3ITYJKA.js";
import {
  MatIconModule,
  MatOption
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
import "./chunk-WC2FK552.js";
import {
  ActivatedRoute,
  CommonModule,
  NgForOf,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GJ4WXWU4.js";
import "./chunk-GQAXEVUQ.js";

// src/app/features/users/user-form/user-form.component.ts
function UserFormComponent_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_mat_error_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_mat_error_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Min 3 chars");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_mat_error_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Invalid email");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_mat_error_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_mat_error_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Min 6 chars");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_mat_option_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r1 = ctx.$implicit;
    \u0275\u0275property("value", r_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r1.name);
  }
}
function UserFormComponent_mat_error_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
var UserFormComponent = class _UserFormComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.userSvc = inject(UserService);
    this.roleSvc = inject(RoleService);
    this.toast = inject(ToastService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.roles = signal([]);
    this.editId = signal(null);
    this.saving = signal(false);
    this.isEdit = () => this.editId() !== null;
    this.form = this.fb.nonNullable.group({
      firstName: ["", Validators.required],
      lastName: [""],
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(6)]],
      phone: [""],
      role: ["", Validators.required],
      status: ["active"]
    });
  }
  ngOnInit() {
    this.roleSvc.list().subscribe((r) => this.roles.set(r));
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editId.set(id);
      this.form.controls.password.clearValidators();
      this.form.controls.password.updateValueAndValidity();
      this.userSvc.get(id).subscribe((u) => {
        this.form.patchValue({
          firstName: u.firstName,
          lastName: u.lastName,
          username: u.username,
          email: u.email,
          phone: u.phone || "",
          role: u.role?.id || "",
          status: u.status
        });
        this.form.controls.username.disable();
      });
    } else {
      this.form.controls.password.addValidators([Validators.required, Validators.minLength(6)]);
    }
  }
  submit() {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const v = this.form.getRawValue();
    const done = {
      next: () => {
        this.toast.success(this.isEdit() ? "User updated" : "User created");
        this.router.navigate(["/admin/users"]);
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error(err?.error?.message || "Save failed");
      }
    };
    if (this.isEdit()) {
      const body = { firstName: v.firstName, lastName: v.lastName, phone: v.phone, role: v.role, status: v.status };
      if (v.password)
        body.password = v.password;
      this.userSvc.update(this.editId(), body).subscribe(done);
    } else {
      this.userSvc.create({
        firstName: v.firstName,
        lastName: v.lastName,
        username: v.username,
        email: v.email,
        password: v.password,
        phone: v.phone,
        role: v.role,
        status: v.status
      }).subscribe(done);
    }
  }
  static {
    this.\u0275fac = function UserFormComponent_Factory(t) {
      return new (t || _UserFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserFormComponent, selectors: [["app-user-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 60, vars: 14, consts: [[1, "page-title"], [1, "card"], [3, "ngSubmit", "formGroup"], [1, "row"], ["appearance", "outline"], ["matInput", "", "formControlName", "firstName"], [4, "ngIf"], ["matInput", "", "formControlName", "lastName"], ["matInput", "", "formControlName", "username"], ["matInput", "", "type", "email", "formControlName", "email", 3, "readonly"], ["matInput", "", "type", "password", "formControlName", "password", "autocomplete", "new-password"], ["matInput", "", "formControlName", "phone"], ["formControlName", "role"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "status"], ["value", "active"], ["value", "inactive"], ["value", "pending"], [1, "actions"], ["mat-button", "", "routerLink", "/admin/users"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [3, "value"]], template: function UserFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h1", 0);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "mat-card", 1)(3, "mat-card-content")(4, "form", 2);
        \u0275\u0275listener("ngSubmit", function UserFormComponent_Template_form_ngSubmit_4_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(5, "div", 3)(6, "mat-form-field", 4)(7, "mat-label");
        \u0275\u0275text(8, "First Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(9, "input", 5);
        \u0275\u0275template(10, UserFormComponent_mat_error_10_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "mat-form-field", 4)(12, "mat-label");
        \u0275\u0275text(13, "Last Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "input", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 3)(16, "mat-form-field", 4)(17, "mat-label");
        \u0275\u0275text(18, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 8);
        \u0275\u0275template(20, UserFormComponent_mat_error_20_Template, 2, 0, "mat-error", 6)(21, UserFormComponent_mat_error_21_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "mat-form-field", 4)(23, "mat-label");
        \u0275\u0275text(24, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 9);
        \u0275\u0275template(26, UserFormComponent_mat_error_26_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 3)(28, "mat-form-field", 4)(29, "mat-label");
        \u0275\u0275text(30);
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 10);
        \u0275\u0275template(32, UserFormComponent_mat_error_32_Template, 2, 0, "mat-error", 6)(33, UserFormComponent_mat_error_33_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "mat-form-field", 4)(35, "mat-label");
        \u0275\u0275text(36, "Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275element(37, "input", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "div", 3)(39, "mat-form-field", 4)(40, "mat-label");
        \u0275\u0275text(41, "Role");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "mat-select", 12);
        \u0275\u0275template(43, UserFormComponent_mat_option_43_Template, 2, 2, "mat-option", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(44, UserFormComponent_mat_error_44_Template, 2, 0, "mat-error", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "mat-form-field", 4)(46, "mat-label");
        \u0275\u0275text(47, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "mat-select", 14)(49, "mat-option", 15);
        \u0275\u0275text(50, "Active");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "mat-option", 16);
        \u0275\u0275text(52, "Inactive");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "mat-option", 17);
        \u0275\u0275text(54, "Pending");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(55, "div", 18)(56, "a", 19);
        \u0275\u0275text(57, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "button", 20);
        \u0275\u0275text(59);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.isEdit() ? "Edit User" : "Add User");
        \u0275\u0275advance(3);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.form.controls.firstName.hasError("required"));
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.form.controls.username.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.form.controls.username.hasError("minlength"));
        \u0275\u0275advance(4);
        \u0275\u0275property("readonly", ctx.isEdit());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.form.controls.email.hasError("email"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.isEdit() ? "New Password (optional)" : "Password");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.form.controls.password.hasError("required"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.form.controls.password.hasError("minlength"));
        \u0275\u0275advance(10);
        \u0275\u0275property("ngForOf", ctx.roles());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.form.controls.role.hasError("required"));
        \u0275\u0275advance(14);
        \u0275\u0275property("disabled", ctx.saving());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Saving\u2026" : ctx.isEdit() ? "Update User" : "Create User", " ");
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
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
      MatCard,
      MatCardContent,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatError,
      MatInputModule,
      MatInput,
      MatSelectModule,
      MatSelect,
      MatOption,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatIconModule,
      MatSlideToggleModule
    ], styles: ["\n\n.page-title[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n  font-size: 24px;\n  font-weight: 600;\n}\n.card[_ngcontent-%COMP%] {\n  max-width: 720px;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1 1 280px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 8px;\n}\n/*# sourceMappingURL=user-form.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserFormComponent, { className: "UserFormComponent", filePath: "src/app/features/users/user-form/user-form.component.ts", lineNumber: 35 });
})();
export {
  UserFormComponent
};
//# sourceMappingURL=chunk-PA2QGA7G.js.map
