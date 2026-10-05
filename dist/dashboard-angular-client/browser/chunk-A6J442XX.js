import {
  API_BASE
} from "./chunk-WC2FK552.js";
import {
  HttpClient,
  inject,
  map,
  ɵɵdefineInjectable
} from "./chunk-GJ4WXWU4.js";

// src/app/core/services/role.service.ts
var RoleService = class _RoleService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = `${API_BASE}/roles`;
  }
  list() {
    return this.http.get(this.base).pipe(map((r) => r.data));
  }
  get(id) {
    return this.http.get(`${this.base}/${id}`).pipe(map((r) => r.data));
  }
  create(body) {
    return this.http.post(this.base, body).pipe(map((r) => r.data));
  }
  update(id, body) {
    return this.http.put(`${this.base}/${id}`, body).pipe(map((r) => r.data));
  }
  remove(id) {
    return this.http.delete(`${this.base}/${id}`).pipe(map(() => void 0));
  }
  permissions() {
    return this.http.get(`${API_BASE}/permissions`).pipe(map((r) => r.data));
  }
  static {
    this.\u0275fac = function RoleService_Factory(t) {
      return new (t || _RoleService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RoleService, factory: _RoleService.\u0275fac, providedIn: "root" });
  }
};

export {
  RoleService
};
//# sourceMappingURL=chunk-A6J442XX.js.map
