import {
  MatAnchor,
  MatButtonModule
} from "./chunk-FRFUT2I7.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OEQY2HKJ.js";
import {
  AuthService
} from "./chunk-YVYTDPVZ.js";
import "./chunk-WC2FK552.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
  RouterLink,
  RouterModule,
  computed,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-GJ4WXWU4.js";
import "./chunk-GQAXEVUQ.js";

// src/app/features/profile/profile.component.ts
function ProfileComponent_div_0_div_90_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const g_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("background", g_r2.color + "18")("color", g_r2.color)("border-color", g_r2.color + "33");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1);
  }
}
function ProfileComponent_div_0_div_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 30);
    \u0275\u0275template(4, ProfileComponent_div_0_div_90_span_4_Template, 2, 7, "span", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const g_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", g_r2.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(g_r2.group);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", g_r2.items);
  }
}
function ProfileComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275element(2, "div", 3);
    \u0275\u0275elementStart(3, "div", 4)(4, "div", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6)(7, "h1");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7)(10, "span", 8);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 9);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "a", 10)(15, "mat-icon");
    \u0275\u0275text(16, "key");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " Change Password ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 11)(19, "section", 12)(20, "h3", 13)(21, "mat-icon");
    \u0275\u0275text(22, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " Account Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "ul", 14)(25, "li")(26, "mat-icon");
    \u0275\u0275text(27, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 15);
    \u0275\u0275text(29, "Full name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 16);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "li")(33, "mat-icon");
    \u0275\u0275text(34, "alternate_email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 15);
    \u0275\u0275text(36, "Username");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 16);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "li")(40, "mat-icon");
    \u0275\u0275text(41, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 15);
    \u0275\u0275text(43, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 16);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "li")(47, "mat-icon");
    \u0275\u0275text(48, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 15);
    \u0275\u0275text(50, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 16);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "li")(54, "mat-icon");
    \u0275\u0275text(55, "verified_user");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "span", 15);
    \u0275\u0275text(57, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span", 16)(59, "span", 17);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "li")(62, "mat-icon");
    \u0275\u0275text(63, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "span", 15);
    \u0275\u0275text(65, "Last login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "span", 16);
    \u0275\u0275text(67);
    \u0275\u0275pipe(68, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(69, "section", 12)(70, "h3", 13)(71, "mat-icon");
    \u0275\u0275text(72, "insights");
    \u0275\u0275elementEnd();
    \u0275\u0275text(73, " Profile Completion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(75, "svg", 19);
    \u0275\u0275element(76, "circle", 20)(77, "circle", 21);
    \u0275\u0275elementStart(78, "text", 22);
    \u0275\u0275text(79);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(80, "div", 23)(81, "p");
    \u0275\u0275text(82, "Complete your profile to get the most out of the console.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "a", 24);
    \u0275\u0275text(84, "Update details");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(85, "h3", 25)(86, "mat-icon");
    \u0275\u0275text(87, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "div", 26);
    \u0275\u0275template(90, ProfileComponent_div_0_div_90_Template, 5, 4, "div", 27);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const u_r3 = ctx.ngIf;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.initials());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", u_r3.firstName, " ", u_r3.lastName, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(u_r3.role == null ? null : u_r3.role.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("@", u_r3.username, "");
    \u0275\u0275advance(18);
    \u0275\u0275textInterpolate2("", u_r3.firstName, " ", u_r3.lastName, "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(u_r3.username);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(u_r3.email);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(u_r3.phone || "\u2014");
    \u0275\u0275advance(7);
    \u0275\u0275classProp("on", u_r3.isActive)("off", !u_r3.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r3.status);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(u_r3.lastLogin ? \u0275\u0275pipeBind2(68, 23, u_r3.lastLogin, "medium") : "\u2014");
    \u0275\u0275advance(10);
    \u0275\u0275styleProp("stroke-dasharray", ctx_r3.ringCirc)("stroke-dashoffset", ctx_r3.ringOffset());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r3.completion(), "%");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" Permissions (", u_r3.permissions.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.permGroups());
  }
}
var GROUP_COLORS = {
  User: "#2d6a9f",
  Role: "#8e44ad",
  Dashboard: "#16a085",
  Reports: "#e67e22",
  Settings: "#7f8c8d",
  Profile: "#27ae60"
};
var ProfileComponent = class _ProfileComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.initials = computed(() => {
      const u = this.auth.user();
      if (!u)
        return "?";
      return ((u.firstName || u.username || "?").charAt(0) + (u.lastName || "").charAt(0)).toUpperCase();
    });
    this.completion = computed(() => {
      const u = this.auth.user();
      if (!u)
        return 0;
      const fields = [u.firstName, u.lastName, u.email, u.phone, u.profileImage];
      const filled = fields.filter((f) => !!f && String(f).trim() !== "").length;
      return Math.round(filled / fields.length * 100);
    });
    this.ringCirc = 2 * Math.PI * 52;
    this.ringOffset = computed(() => this.ringCirc * (1 - this.completion() / 100));
    this.permGroups = computed(() => {
      const perms = this.auth.user()?.permissions ?? [];
      const map = /* @__PURE__ */ new Map();
      for (const p of perms) {
        const group = p.split(".")[0];
        if (!map.has(group))
          map.set(group, []);
        map.get(group).push(p);
      }
      return Array.from(map.entries()).map(([group, items]) => ({
        group,
        color: GROUP_COLORS[group] || "#5b6b7f",
        items
      }));
    });
  }
  static {
    this.\u0275fac = function ProfileComponent_Factory(t) {
      return new (t || _ProfileComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "profile-page", 4, "ngIf"], [1, "profile-page"], [1, "hero"], [1, "hero-cover"], [1, "hero-body"], [1, "hero-avatar"], [1, "hero-id"], [1, "hero-sub"], [1, "role-badge"], [1, "hero-username"], ["mat-flat-button", "", "color", "primary", "routerLink", "/change-password", 1, "hero-action"], [1, "grid"], [1, "card"], [1, "card-title"], [1, "detail-list"], [1, "d-label"], [1, "d-value"], [1, "status-pill"], [1, "completion"], ["width", "128", "height", "128", "viewBox", "0 0 128 128", 1, "ring"], ["cx", "64", "cy", "64", "r", "52", 1, "ring-bg"], ["cx", "64", "cy", "64", "r", "52", 1, "ring-fg"], ["x", "64", "y", "64", 1, "ring-text"], [1, "completion-copy"], ["mat-stroked-button", "", "routerLink", "/change-password"], [1, "card-title", "mt"], [1, "perm-groups"], ["class", "perm-group", 4, "ngFor", "ngForOf"], [1, "perm-group"], [1, "perm-group-name"], [1, "perm-chips"], ["class", "perm-chip", 3, "background", "color", "border-color", 4, "ngFor", "ngForOf"], [1, "perm-chip"]], template: function ProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProfileComponent_div_0_Template, 91, 26, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.auth.user());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, RouterModule, RouterLink, MatIconModule, MatIcon, MatButtonModule, MatAnchor], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 16px;\n  overflow: hidden;\n  background: var(--surface);\n  border: 1px solid var(--border-subtle);\n  box-shadow: var(--card-shadow);\n  margin-bottom: 22px;\n}\n.hero-cover[_ngcontent-%COMP%] {\n  height: 96px;\n  background:\n    linear-gradient(\n      135deg,\n      #10243e 0%,\n      #1c5aa0 60%,\n      #2f7fd6 100%);\n}\n.hero-body[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 18px;\n  padding: 0 24px 20px;\n  margin-top: -40px;\n}\n.hero-avatar[_ngcontent-%COMP%] {\n  width: 84px;\n  height: 84px;\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 30px;\n  font-weight: 700;\n  color: #fff;\n  background:\n    linear-gradient(\n      135deg,\n      #2d6a9f,\n      #1c5aa0);\n  border: 4px solid var(--surface);\n  box-shadow: 0 8px 20px rgba(28, 90, 160, 0.35);\n}\n.hero-id[_ngcontent-%COMP%] {\n  flex: 1;\n  padding-bottom: 4px;\n}\n.hero-id[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.hero-sub[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 4px;\n}\n.role-badge[_ngcontent-%COMP%] {\n  background: rgba(45, 106, 159, 0.14);\n  color: #2f7fd6;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 20px;\n}\n.hero-username[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n}\n.hero-action[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n  border-radius: 10px;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));\n  gap: 20px;\n  align-items: start;\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--border-subtle);\n  border-radius: 16px;\n  box-shadow: var(--card-shadow);\n  padding: 22px 24px;\n}\n.card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 0 16px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.card-title.mt[_ngcontent-%COMP%] {\n  margin-top: 26px;\n}\n.card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #2f7fd6;\n  font-size: 20px;\n  height: 20px;\n  width: 20px;\n}\n.detail-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.detail-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border-subtle);\n}\n.detail-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.detail-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 19px;\n  height: 19px;\n  width: 19px;\n}\n.d-label[_ngcontent-%COMP%] {\n  width: 96px;\n  font-size: 13px;\n  color: var(--text-muted);\n}\n.d-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--text-primary);\n}\n.status-pill[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 2px 10px;\n  border-radius: 20px;\n}\n.status-pill.on[_ngcontent-%COMP%] {\n  background: rgba(39, 174, 96, 0.16);\n  color: #27ae60;\n}\n.status-pill.off[_ngcontent-%COMP%] {\n  background: rgba(192, 57, 43, 0.16);\n  color: #c0392b;\n}\n.completion[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.ring[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n}\n.ring-bg[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: var(--surface-2);\n  stroke-width: 12;\n}\n.ring-fg[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: url(#none);\n  stroke: #2f7fd6;\n  stroke-width: 12;\n  stroke-linecap: round;\n  transform: rotate(-90deg);\n  transform-origin: 64px 64px;\n  transition: stroke-dashoffset 0.6s ease;\n}\n.ring-text[_ngcontent-%COMP%] {\n  fill: var(--text-primary);\n  font-size: 22px;\n  font-weight: 700;\n  text-anchor: middle;\n  dominant-baseline: central;\n}\n.completion-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 13.5px;\n  color: var(--text-muted);\n  line-height: 1.5;\n}\n.perm-groups[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.perm-group-name[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n}\n.perm-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 6px;\n}\n.perm-chip[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  padding: 4px 11px;\n  border-radius: 20px;\n  border: 1px solid transparent;\n}\n/*# sourceMappingURL=profile.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/features/profile/profile.component.ts", lineNumber: 30 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-2ENTACWU.js.map
