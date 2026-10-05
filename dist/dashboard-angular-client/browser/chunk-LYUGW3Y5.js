import {
  ConfirmDialogComponent,
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatDialog,
  MatDialogModule,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-FPWEXVQU.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-EY7T5HUU.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-4DMUBMKM.js";
import {
  RoleService
} from "./chunk-A6J442XX.js";
import {
  ToastService
} from "./chunk-ZGQBMLV5.js";
import "./chunk-JSN4LV5Z.js";
import {
  MatAnchor,
  MatButtonModule,
  MatIconAnchor,
  MatIconButton
} from "./chunk-FRFUT2I7.js";
import {
  MatCardModule
} from "./chunk-I3ITYJKA.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OEQY2HKJ.js";
import "./chunk-IUHX474R.js";
import "./chunk-WC2FK552.js";
import {
  CommonModule,
  NgIf,
  RouterLink,
  RouterModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GJ4WXWU4.js";
import "./chunk-GQAXEVUQ.js";

// src/app/features/roles/role-list/role-list.component.ts
var _c0 = (a0) => ["/admin/roles", a0, "edit"];
function RoleListComponent_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "Name");
    \u0275\u0275elementEnd();
  }
}
function RoleListComponent_td_11_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 17);
    \u0275\u0275text(1, "lock");
    \u0275\u0275elementEnd();
  }
}
function RoleListComponent_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275template(2, RoleListComponent_td_11_mat_icon_2_Template, 2, 0, "mat-icon", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r1.name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.protectedRoles.includes(r_r1.name));
  }
}
function RoleListComponent_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "Description");
    \u0275\u0275elementEnd();
  }
}
function RoleListComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r3.description || "\u2014");
  }
}
function RoleListComponent_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "Permissions");
    \u0275\u0275elementEnd();
  }
}
function RoleListComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.permissions.length);
  }
}
function RoleListComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function RoleListComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("active-chip", r_r5.isActive)("inactive-chip", !r_r5.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r5.isActive ? "enabled" : "disabled", " ");
  }
}
function RoleListComponent_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function RoleListComponent_td_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 15)(1, "a", 18)(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 19);
    \u0275\u0275listener("click", function RoleListComponent_td_23_Template_button_click_4_listener() {
      const r_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleActive(r_r7));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 20);
    \u0275\u0275listener("click", function RoleListComponent_td_23_Template_button_click_7_listener() {
      const r_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.remove(r_r7));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c0, r_r7.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("matTooltip", r_r7.isActive ? "Disable" : "Enable");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r7.isActive ? "toggle_on" : "toggle_off");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.protectedRoles.includes(r_r7.name));
  }
}
function RoleListComponent_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 21);
  }
}
function RoleListComponent_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 22);
  }
}
var RoleListComponent = class _RoleListComponent {
  constructor() {
    this.roleSvc = inject(RoleService);
    this.toast = inject(ToastService);
    this.dialog = inject(MatDialog);
    this.columns = ["name", "description", "permissions", "status", "actions"];
    this.roles = signal([]);
    this.protectedRoles = ["Admin", "User"];
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.roleSvc.list().subscribe((r) => this.roles.set(r));
  }
  toggleActive(role) {
    this.roleSvc.update(role.id, { isActive: !role.isActive }).subscribe({
      next: () => {
        this.toast.success(`${role.name} ${!role.isActive ? "enabled" : "disabled"}`);
        this.load();
      },
      error: (err) => this.toast.error(err?.error?.message || "Failed")
    });
  }
  remove(role) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Delete role", message: `Delete role "${role.name}"?`, confirmText: "Delete", color: "warn" }
    }).afterClosed().subscribe((ok) => {
      if (!ok)
        return;
      this.roleSvc.remove(role.id).subscribe({
        next: () => {
          this.toast.success("Role deleted");
          this.load();
        },
        error: (err) => this.toast.error(err?.error?.message || "Failed")
      });
    });
  }
  static {
    this.\u0275fac = function RoleListComponent_Factory(t) {
      return new (t || _RoleListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleListComponent, selectors: [["app-role-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 26, vars: 3, consts: [[1, "header"], [1, "page-title"], ["mat-raised-button", "", "color", "primary", "routerLink", "/admin/roles/new"], [1, "table-card"], ["mat-table", "", 1, "full-table", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "description"], ["matColumnDef", "permissions"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["class", "lock", "matTooltip", "Protected system role", 4, "ngIf"], ["matTooltip", "Protected system role", 1, "lock"], ["mat-icon-button", "", "matTooltip", "Edit / permissions", 3, "routerLink"], ["mat-icon-button", "", 3, "click", "matTooltip"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete", 3, "click", "disabled"], ["mat-header-row", ""], ["mat-row", ""]], template: function RoleListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
        \u0275\u0275text(2, "Role Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "a", 2)(4, "mat-icon");
        \u0275\u0275text(5, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Create Role ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 3)(8, "table", 4);
        \u0275\u0275elementContainerStart(9, 5);
        \u0275\u0275template(10, RoleListComponent_th_10_Template, 2, 0, "th", 6)(11, RoleListComponent_td_11_Template, 3, 2, "td", 7);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(12, 8);
        \u0275\u0275template(13, RoleListComponent_th_13_Template, 2, 0, "th", 6)(14, RoleListComponent_td_14_Template, 2, 1, "td", 7);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(15, 9);
        \u0275\u0275template(16, RoleListComponent_th_16_Template, 2, 0, "th", 6)(17, RoleListComponent_td_17_Template, 3, 1, "td", 7);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(18, 10);
        \u0275\u0275template(19, RoleListComponent_th_19_Template, 2, 0, "th", 6)(20, RoleListComponent_td_20_Template, 3, 5, "td", 7);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(21, 11);
        \u0275\u0275template(22, RoleListComponent_th_22_Template, 2, 0, "th", 6)(23, RoleListComponent_td_23_Template, 10, 6, "td", 7);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(24, RoleListComponent_tr_24_Template, 1, 0, "tr", 12)(25, RoleListComponent_tr_25_Template, 1, 0, "tr", 13);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("dataSource", ctx.roles());
        \u0275\u0275advance(16);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      RouterModule,
      RouterLink,
      MatTableModule,
      MatTable,
      MatHeaderCellDef,
      MatHeaderRowDef,
      MatColumnDef,
      MatCellDef,
      MatRowDef,
      MatHeaderCell,
      MatCell,
      MatHeaderRow,
      MatRow,
      MatCardModule,
      MatButtonModule,
      MatAnchor,
      MatIconAnchor,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatChipsModule,
      MatChip,
      MatTooltipModule,
      MatTooltip,
      MatDialogModule
    ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text-primary);\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}\n.page-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.table-card[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--border-subtle);\n  border-radius: 14px;\n  box-shadow: var(--card-shadow);\n  overflow: hidden;\n}\n.full-table[_ngcontent-%COMP%] {\n  width: 100%;\n  background: transparent;\n}\n.full-table[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%] {\n  background: var(--surface-2);\n  color: var(--text-muted);\n  font-weight: 700;\n  font-size: 12px;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n}\n.full-table[_ngcontent-%COMP%]   td.mat-mdc-cell[_ngcontent-%COMP%], .full-table[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-bottom-color: var(--border-subtle);\n  color: var(--text-primary);\n}\n.full-table[_ngcontent-%COMP%]   tr.mat-mdc-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--surface-2);\n}\n.lock[_ngcontent-%COMP%] {\n  font-size: 15px;\n  height: 15px;\n  width: 15px;\n  vertical-align: middle;\n  opacity: 0.45;\n  margin-left: 4px;\n}\n.active-chip[_ngcontent-%COMP%] {\n  --mdc-chip-elevated-container-color: var(--status-track-bg);\n  --mdc-chip-label-text-color: var(--status-track-text);\n  background: var(--status-track-bg) !important;\n  color: var(--status-track-text) !important;\n  font-weight: 700;\n}\n.inactive-chip[_ngcontent-%COMP%] {\n  --mdc-chip-elevated-container-color: var(--status-delay-bg);\n  --mdc-chip-label-text-color: var(--status-delay-text);\n  background: var(--status-delay-bg) !important;\n  color: var(--status-delay-text) !important;\n  font-weight: 700;\n}\n.active-chip[_ngcontent-%COMP%]   .mdc-evolution-chip__text-label[_ngcontent-%COMP%], .inactive-chip[_ngcontent-%COMP%]   .mdc-evolution-chip__text-label[_ngcontent-%COMP%] {\n  color: inherit !important;\n}\n.full-table[_ngcontent-%COMP%]   td.mat-mdc-cell[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  color: var(--text-muted);\n}\n.full-table[_ngcontent-%COMP%]   td.mat-mdc-cell[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%]:hover {\n  color: #2f7fd6;\n  background: rgba(47, 127, 214, 0.1);\n}\n/*# sourceMappingURL=role-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleListComponent, { className: "RoleListComponent", filePath: "src/app/features/roles/role-list/role-list.component.ts", lineNumber: 33 });
})();
export {
  RoleListComponent
};
//# sourceMappingURL=chunk-LYUGW3Y5.js.map
