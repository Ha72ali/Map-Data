import {
  API_BASE
} from "./chunk-WC2FK552.js";
import {
  HttpClient,
  Router,
  catchError,
  computed,
  inject,
  map,
  of,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-GJ4WXWU4.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GQAXEVUQ.js";

// src/app/core/services/token.service.ts
var TokenService = class _TokenService {
  constructor() {
    this.token = signal(null);
  }
  set(token) {
    this.token.set(token);
  }
  clear() {
    this.token.set(null);
  }
  static {
    this.\u0275fac = function TokenService_Factory(t) {
      return new (t || _TokenService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TokenService, factory: _TokenService.\u0275fac, providedIn: "root" });
  }
};

// src/environments/environment.ts
var environment = {
  production: false,
  /** Paste your key here for local dev, or wire `fileReplacements` in angular.json for prod. */
  arcgisApiKey: "AAPTaZfpOJPuvTu80oJX7Yg1pcA..wUr9-4mJBRHFkKcqUyqov4PKubC9SEVteUN3QNIT0--_lTrzgzdr3OHTNcdqsHPAIgjrCDG7AiKQQ02YJU12k6czrqJLE1A-iK0-snMhcNcly-lnpDwiD9ND3EHQIY6Vogq8Ka5KM8l2hq-EdR3KtEERe8C4PRexRNVi09V6dB4DdoWxHo31BTk7fxqbYEEqTCXhA2nfzvQmNvUpnafzDJWVYXKQnAUnrYJgJKbcIFmfjWBosQOhIUeEvQ..AT1_xO3j2Mlr",
  /**
   * Map GeoJSON API origin. Empty string uses same-origin `/api` (ng serve + proxy.conf.json → Node on :4000).
   */
  mapApiBaseUrl: "",
  /**
   * false = fetch live geometry from the contractor API instead of the bundled
   * snapshots in MAP_ASSET_PATH. Those snapshots do not update, so they drift
   * from the real data over time; set this back to true only for offline demos.
   */
  USE_LOCAL_MAP_GEOJSON: false,
  /** `local` = assets first; `api` = contractor API first. */
  MAP_SOURCE_MODE: "api",
  /** Angular assets path for contractor GeoJSON (see angular.json → assets). */
  MAP_ASSET_PATH: "/assets/maps",
  /** When local bundle is missing, allow GET /api/map/geojson/* (set false for offline-only). */
  MAP_ALLOW_API_FALLBACK: true,
  /** Default contractor bundle when none is selected (ALL). */
  MAP_DEFAULT_CONTRACTOR: "MHD",
  /** @deprecated use MAP_ASSET_PATH */
  mapGeoJsonAssetsBase: "/assets/maps",
  /** Per-request timeout for map GeoJSON (ms). */
  mapGeoJsonTimeoutMs: 9e4,
  /**
   * Direct calls to the contractor's own API server, bypassing the Node
   * gateway. Overridable at deploy time via `window.__env` — see
   * `src/app/upstream-config.ts` for precedence.
   *
   * Only the endpoints listed in `UpstreamApiService.SUPPORTED` exist upstream;
   * every other dashboard endpoint is computed by the gateway and still needs
   * it. Leave `useDirectUpstream: false` to route everything through Node.
   */
  upstream: {
    useDirectUpstream: true,
    /**
     * Either form works — a trailing '/api' (and trailing slashes) are
     * stripped by `upstreamBaseUrl()`, since service paths already carry
     * '/api/'. 'https://tcpms.mhditics.com' is the same as the value below.
     */
    /**
     * Dev only: '/upstream' goes through the `ng serve` proxy
     * (proxy.conf.json -> https://pms.aljassargroup.com), because that
     * server sends no CORS headers and the browser blocks direct calls from
     * localhost. Production (environment.prod.ts) still calls it directly.
     */
    baseUrl: "/upstream",
    /**
     * Fallback token for direct contractor calls when there is no portal
     * session. A live `quickForce` session always wins over this.
     *
     * NOTE: this value is compiled into the bundle and is readable by anyone
     * who loads the app. The JWT below has no `exp` claim, so it does not
     * self-expire — treat it as a long-lived shared credential and rotate it
     * server-side rather than relying on expiry.
     */
    authToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMCIsInBsYXRmb3JtIjoiV0VCIiwic3YiOjMwMiwiaWF0IjoxNzg0NjE1NDA5fQ.fDASlSscuddxdJp21yp7lzXc2hrbXN15et7_8o17lRJN5VDiembbFIM-vn0PSvJLM5n95XkJXy_T_y4TY1ljiA",
    /** Contractor this deployment serves, e.g. 'MHD'. */
    contractor: "OFO",
    timeoutMs: 3e4,
    /** Segment payloads are large; some backends take 60s+. */
    segmentsTimeoutMs: 12e4
  },
  /**
   * Portal-handover session — no login screen in this app.
   *
   * Mirrors neotecx_dashbaord_ui: a separate portal owns login and drops the
   * session into localStorage. This app only reads it, and bounces to
   * `mainAppUrl` when it is missing. Keys match the portal's exactly so both
   * apps share one session when served from the same origin.
   *
   * `enabled: false` keeps the built-in /login screen and the httpOnly-cookie
   * refresh flow. Turning it on disables /login entirely.
   */
  externalAuth: {
    enabled: true,
    /** Portal that owns login. Unauthenticated users are sent here. */
    mainAppUrl: "https://ofopms.omanfiber.com",
    /** localStorage key holding `{ accessToken, ... }`. */
    storageKey: "quickForce",
    /** localStorage key holding the roles/permissions array. */
    rolesKey: "userRoles",
    /** Cross-tab logout broadcast key (see the `storage` listener). */
    logoutKey: "forceLogout",
    /**
     * Accept `?data=`/`?roles=` base64 handover in the URL. The portal needs
     * this when the two apps are on different origins (dev), because
     * localStorage is not shared across origins. Leave off in production
     * same-origin deployments — a token in the URL lands in browser history
     * and server logs.
     */
    acceptUrlHandover: true
  }
};

// src/app/core/services/external-session.service.ts
function portalBearerToken() {
  const cfg = environment.externalAuth;
  if (cfg?.enabled !== true)
    return "";
  try {
    const raw = localStorage.getItem(cfg.storageKey);
    if (!raw)
      return "";
    const token = JSON.parse(raw)?.accessToken;
    if (typeof token !== "string" || !token.trim())
      return "";
    const value = token.trim();
    return value.startsWith("Bearer ") ? value : `Bearer ${value}`;
  } catch {
    return "";
  }
}
var ExternalSessionService = class _ExternalSessionService {
  static {
    this.HANDOVER_FLAG = "contractorHandoverTab";
  }
  constructor() {
    this.cfg = environment.externalAuth;
    this.applyRuntimeEnv(this.read());
  }
  /** True when this build takes its session from the portal instead of /login. */
  get enabled() {
    return this.cfg?.enabled === true;
  }
  /** Where to send someone with no session. '' disables the redirect. */
  get mainAppUrl() {
    return String(this.cfg?.mainAppUrl ?? "").trim();
  }
  /**
   * Apply the contractor-identifying fields the client dashboard adds to a
   * handover session (`contractor`, `upstreamBaseUrl`, `useDirectUpstream`).
   *
   * `environment.upstream.contractor` is fixed at build time, so without this a
   * single running instance would always show the contractor it was compiled
   * for, whichever card was clicked. `upstream-config.ts` reads `window.__env`
   * ahead of `environment`, and reads it at call time, so writing it here is
   * enough — nothing needs re-instantiating.
   *
   * No-op for a plain portal session, which carries none of these fields and
   * should keep the compiled-in defaults.
   */
  applyRuntimeEnv(session) {
    if (!session || typeof window === "undefined")
      return;
    const contractor = String(session["contractor"] ?? "").trim();
    const baseUrl = String(session["upstreamBaseUrl"] ?? "").trim();
    if (!contractor && !baseUrl)
      return;
    const win = window;
    const env = __spreadValues({}, win.__env ?? {});
    if (contractor)
      env["UPSTREAM_CONTRACTOR"] = contractor;
    if (baseUrl) {
      env["UPSTREAM_BASE_URL"] = baseUrl;
      const token = this.token();
      if (token)
        env["UPSTREAM_AUTH_TOKEN"] = token;
    }
    if (session["useDirectUpstream"] !== void 0) {
      env["USE_DIRECT_UPSTREAM"] = String(session["useDirectUpstream"]);
    }
    win.__env = env;
  }
  /**
   * True when this tab was opened by the client dashboard's /contractors page.
   * Such a tab closes on Back/Logout instead of redirecting to the portal — the
   * client dashboard is still sitting in the opener tab, untouched.
   */
  isHandoverTab() {
    try {
      return sessionStorage.getItem(_ExternalSessionService.HANDOVER_FLAG) === "1";
    } catch {
      return false;
    }
  }
  /**
   * Close this tab. Only script-opened tabs may close themselves, which ours is
   * (window.open from the contractors page), but a browser can still refuse —
   * fall back to the portal rather than leaving the user on a dead session.
   */
  closeTab() {
    if (typeof window === "undefined")
      return;
    window.close();
    setTimeout(() => {
      if (!window.closed) {
        console.warn("[auth] the browser refused to close this tab");
        if (this.mainAppUrl)
          this.redirectToPortal();
      }
    }, 300);
  }
  /** Parsed portal session, or null when absent/corrupt. */
  read() {
    const raw = this.safeGet(this.cfg.storageKey);
    if (!raw)
      return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  /** Bearer token from the portal session, or null. */
  token() {
    const value = this.read()?.accessToken;
    return typeof value === "string" && value.trim() ? value.trim() : null;
  }
  /** A session exists and carries a token. */
  hasSession() {
    return this.token() !== null;
  }
  /**
   * Roles/permissions the portal stored alongside the token. Accepts either a
   * bare array or `{ permissions: [...] }` / `{ roles: [...] }`, because the
   * portal's shape varies by deployment.
   */
  permissions() {
    const fromKey = this.permissionsFromRolesKey();
    if (fromKey.length)
      return fromKey;
    return this.rolesFromSession();
  }
  /** Roles/permissions from the dedicated `rolesKey`, when the portal writes one. */
  permissionsFromRolesKey() {
    const raw = this.safeGet(this.cfg.rolesKey);
    if (!raw)
      return [];
    try {
      const parsed = JSON.parse(raw);
      const list = Array.isArray(parsed) ? parsed : parsed?.["permissions"] ?? parsed?.["roles"];
      return this.toNameList(list);
    } catch {
      return [];
    }
  }
  /** Role names carried on the session payload itself (`allrole` / `role`). */
  rolesFromSession() {
    const session = this.read();
    if (!session)
      return [];
    const names = this.toNameList(session.allrole);
    const primary = String(session.role ?? "").trim();
    if (primary && !names.includes(primary))
      names.unshift(primary);
    return names;
  }
  toNameList(list) {
    if (!Array.isArray(list))
      return [];
    return list.map((entry) => typeof entry === "string" ? entry : String(entry?.["name"] ?? "")).map((name) => name.trim()).filter((name) => name !== "");
  }
  /**
   * Best-effort User built from the portal payload, so `AuthService.user()`
   * (and everything reading it) is populated without a /auth/me round-trip.
   */
  user() {
    const session = this.read();
    if (!session)
      return null;
    const raw = __spreadValues(__spreadValues({}, session), session.user ?? {});
    const str = (...keys) => {
      for (const key of keys) {
        const value = raw[key];
        if (value != null && String(value).trim())
          return String(value).trim();
      }
      return "";
    };
    const display = str("username", "name", "fullName");
    const [displayFirst, ...displayRest] = display.split(/\s+/);
    const roleName = str("role", "roleName");
    return __spreadProps(__spreadValues({}, raw), {
      id: str("id", "_id", "userId", "userID"),
      firstName: str("firstName", "givenName") || displayFirst || "",
      lastName: str("lastName", "familyName") || displayRest.join(" "),
      username: display || str("userName", "useremail", "email"),
      email: str("useremail", "email"),
      profileImage: str("profilePic", "profileImage") || void 0,
      status: "active",
      isActive: true,
      lastLogin: str("lastLogin") || null,
      role: roleName ? { id: roleName, name: roleName } : null,
      permissions: this.permissions()
    });
  }
  /**
   * Capture a `?data=<base64>&roles=<base64>` handover, then strip it from the
   * URL so the token is not left in history or copied into a shared link.
   * Returns true when something was captured. No-op unless
   * `acceptUrlHandover` is on.
   */
  captureUrlHandover() {
    if (!this.cfg?.acceptUrlHandover)
      return false;
    if (typeof window === "undefined")
      return false;
    const params = new URLSearchParams(window.location.search);
    const encodedToken = params.get("data");
    const encodedRoles = params.get("roles");
    if (!encodedToken && !encodedRoles)
      return false;
    let captured = false;
    if (encodedToken) {
      try {
        const decoded = atob(encodedToken);
        JSON.parse(decoded);
        this.safeSet(this.cfg.storageKey, decoded);
        captured = true;
      } catch {
        console.error("[auth] invalid ?data handover payload \u2014 ignored");
      }
    }
    if (encodedRoles) {
      try {
        const decoded = atob(encodedRoles);
        JSON.parse(decoded);
        this.safeSet(this.cfg.rolesKey, decoded);
        captured = true;
      } catch {
        console.error("[auth] invalid ?roles handover payload \u2014 ignored");
      }
    }
    if (captured) {
      try {
        sessionStorage.setItem(_ExternalSessionService.HANDOVER_FLAG, "1");
      } catch {
      }
      this.applyRuntimeEnv(this.read());
    }
    this.stripHandoverQuery();
    return captured;
  }
  /**
   * Remove `?data=`/`?roles=` from the address bar without reloading.
   *
   * Idempotent, and safe to call repeatedly — it has to be. Calling it once
   * inside captureUrlHandover() is NOT enough: the Angular router records the
   * bootstrap URL before this runs and restores the query string when its
   * initial navigation completes, putting the bearer token back in the address
   * bar (and therefore in history and in any link the user copies). AppComponent
   * calls this again once navigation settles.
   */
  stripHandoverQuery() {
    if (typeof window === "undefined")
      return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("data") && !params.has("roles"))
      return;
    params.delete("data");
    params.delete("roles");
    const rest = params.toString();
    const url = window.location.pathname + (rest ? `?${rest}` : "") + window.location.hash;
    window.history.replaceState({}, document.title, url);
  }
  /** True when the URL carries `?logout=true`. */
  isLogoutRequested() {
    if (typeof window === "undefined")
      return false;
    return new URLSearchParams(window.location.search).get("logout") === "true";
  }
  /** Drop the local session. Does not redirect — callers decide that. */
  clear() {
    this.safeRemove(this.cfg.storageKey);
    this.safeRemove(this.cfg.rolesKey);
  }
  /** Clear this tab and signal every other tab on this origin to log out. */
  broadcastLogout() {
    this.clear();
    this.safeSet(this.cfg.logoutKey, String(Date.now()));
    this.safeRemove(this.cfg.logoutKey);
  }
  /**
   * Listen for a logout broadcast from another tab. Returns an unsubscribe fn.
   */
  onRemoteLogout(handler) {
    if (typeof window === "undefined")
      return () => void 0;
    const listener = (event) => {
      if (event.key === this.cfg.logoutKey)
        handler();
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }
  /** Role names from the portal session ('ROLE_ADMIN', 'ROLE_CLIENT', ...). */
  roles() {
    return this.permissions();
  }
  /** True when any portal role name contains CLIENT (ROLE_CLIENT, Role_Administrator_Client, ...). */
  get isClientUser() {
    return this.roles().some((r) => r.toUpperCase().includes("CLIENT"));
  }
  /**
   * Absolute URL into the portal, e.g. portalUrl('/#/segments'). Empty string
   * when `mainAppUrl` is unset, which callers treat as "hide the link".
   */
  portalUrl(hashPath) {
    const base = this.mainAppUrl.replace(/\/+$/, "");
    return base ? `${base}${hashPath}` : "";
  }
  /** Navigate to a portal screen (full page load — different Angular app). */
  openPortal(hashPath) {
    const url = this.portalUrl(hashPath);
    if (!url) {
      console.error("[nav] externalAuth.mainAppUrl is not set \u2014 cannot open", hashPath);
      return;
    }
    window.location.replace(url);
  }
  /** Send the browser to the portal. Falls back to /login when unconfigured. */
  redirectToPortal() {
    if (typeof window === "undefined")
      return;
    const url = this.mainAppUrl;
    if (!url) {
      console.error("[auth] externalAuth.mainAppUrl is not set \u2014 cannot redirect to portal");
      return;
    }
    window.location.replace(url);
  }
  // localStorage throws in private-mode/sandboxed contexts; never let that
  // take down app bootstrap.
  safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
    }
  }
  safeRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
    }
  }
  static {
    this.\u0275fac = function ExternalSessionService_Factory(t) {
      return new (t || _ExternalSessionService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExternalSessionService, factory: _ExternalSessionService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor() {
    this.http = inject(HttpClient);
    this.tokens = inject(TokenService);
    this.router = inject(Router);
    this.external = inject(ExternalSessionService);
    this.user = signal(null);
    this.menu = signal([]);
    this.permissions = computed(() => new Set(this.user()?.permissions ?? []));
    this.isAuthenticated = computed(() => !!this.user() && !!this.tokens.token());
  }
  login(emailOrUsername, password) {
    return this.http.post(`${API_BASE}/auth/login`, { emailOrUsername, password }).pipe(map((res) => res.data), tap((data) => {
      this.tokens.set(data.accessToken);
      this.user.set(data.user);
      this.menu.set(data.menu ?? []);
    }), map((data) => data.user));
  }
  /**
   * Portal-handover bootstrap (no login screen). Captures a `?data=` handover
   * if present, then hydrates token/user/permissions from localStorage.
   * Returns true when a session was restored.
   *
   * No-op when `externalAuth.enabled` is false, so the built-in login flow is
   * untouched.
   */
  restoreExternalSession() {
    if (!this.external.enabled)
      return false;
    this.external.captureUrlHandover();
    const token = this.external.token();
    if (!token)
      return false;
    this.tokens.set(token);
    this.user.set(this.external.user());
    this.menu.set([]);
    return true;
  }
  /** True when this build defers login to the portal. */
  get usesExternalSession() {
    return this.external.enabled;
  }
  /** Silent refresh using the httpOnly cookie. Returns true if a session was restored. */
  refresh() {
    return this.http.post(`${API_BASE}/auth/refresh`, {}).pipe(tap((res) => {
      this.tokens.set(res.data.accessToken);
      this.user.set(res.data.user);
    }), map(() => true), catchError(() => of(false)));
  }
  loadMenu() {
    return this.http.get(`${API_BASE}/auth/menu`).pipe(map((res) => res.data.menu), tap((menu) => this.menu.set(menu)));
  }
  logout() {
    if (this.external.enabled) {
      this.clearSession();
      this.external.broadcastLogout();
      this.external.redirectToPortal();
      return;
    }
    this.http.post(`${API_BASE}/auth/logout`, {}).pipe(catchError(() => of(null))).subscribe(() => {
      this.clearSession();
      this.router.navigate(["/login"]);
    });
  }
  /** Called by the interceptor when refresh fails — drop state and bounce to login. */
  clearSession() {
    this.tokens.clear();
    this.user.set(null);
    this.menu.set([]);
  }
  hasPermission(permission) {
    return this.permissions().has(permission);
  }
  hasAny(perms) {
    const set = this.permissions();
    return perms.some((p) => set.has(p));
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  environment,
  portalBearerToken,
  ExternalSessionService,
  TokenService,
  AuthService
};
//# sourceMappingURL=chunk-YVYTDPVZ.js.map
