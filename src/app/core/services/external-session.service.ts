import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/auth.models';

/**
 * Portal-handover session — the "no login screen" model.
 *
 * A separate portal app owns login and writes the session into localStorage;
 * this app only reads it. Ported from neotecx_dashbaord_ui, keeping the same
 * storage keys (`quickForce`, `userRoles`, `forceLogout`) so both apps share
 * one session when served from the same origin.
 *
 * Trade-off worth knowing: the token lives in localStorage, so any XSS in the
 * app can read it. The built-in login flow keeps the access token in memory
 * with an httpOnly refresh cookie, which XSS cannot read. That protection is
 * given up in exchange for cross-app SSO — it is the portal's model, not a
 * defect in this port.
 */

/**
 * Shape the portal writes under `storageKey`.
 *
 * The live portal (verified against a real payload) writes identity fields
 * FLAT at the top level — `username`, `useremail`, `userID`, `role`,
 * `allrole` — not under a nested `user` object. `user` is still accepted for
 * portals that nest it. Extra fields are preserved.
 */
export interface PortalSession {
  accessToken?: string;
  tokenType?: string;
  /** Flat identity fields as written by the portal. */
  username?: string;
  useremail?: string;
  userID?: number | string;
  /** Primary role name, e.g. 'ROLE_ADMIN'. */
  role?: string;
  /** All role names, e.g. ['ROLE_ADMIN', 'Engineer', 'ROLE_CLIENT']. */
  allrole?: string[];
  profilePic?: string;
  /** Optional nested form, for portals that use it. */
  user?: Partial<User> & Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * DI-free read of the portal bearer token, for callers constructed outside
 * Angular's injector (the axios clients in dashboard.service.ts and
 * upstream-api.service.ts). Returns '' when portal mode is off or no session
 * exists. Always prefixed with 'Bearer '.
 */
export function portalBearerToken(): string {
  const cfg = environment.externalAuth;
  if (cfg?.enabled !== true) return '';
  try {
    const raw = localStorage.getItem(cfg.storageKey);
    if (!raw) return '';
    const token = (JSON.parse(raw) as PortalSession)?.accessToken;
    if (typeof token !== 'string' || !token.trim()) return '';
    const value = token.trim();
    return value.startsWith('Bearer ') ? value : `Bearer ${value}`;
  } catch {
    return '';
  }
}

@Injectable({ providedIn: 'root' })
export class ExternalSessionService {
  private readonly cfg = environment.externalAuth;

  /**
   * sessionStorage flag marking a tab opened by the client dashboard's
   * /contractors page. Per-tab on purpose: a normal portal login in another tab
   * must keep its usual "bounce back to the portal" logout, not close itself.
   */
  private static readonly HANDOVER_FLAG = 'contractorHandoverTab';

  constructor() {
    // Re-apply the contractor override on reload. captureUrlHandover() strips
    // the query string by design, so a refresh has nothing left to parse — the
    // fields survive on the stored session instead.
    this.applyRuntimeEnv(this.read());
  }

  /** True when this build takes its session from the portal instead of /login. */
  get enabled(): boolean {
    return this.cfg?.enabled === true;
  }

  /** Where to send someone with no session. '' disables the redirect. */
  get mainAppUrl(): string {
    return String(this.cfg?.mainAppUrl ?? '').trim();
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
  private applyRuntimeEnv(session: PortalSession | null): void {
    if (!session || typeof window === 'undefined') return;

    const contractor = String(session['contractor'] ?? '').trim();
    const baseUrl = String(session['upstreamBaseUrl'] ?? '').trim();
    if (!contractor && !baseUrl) return;

    const win = window as unknown as { __env?: Record<string, unknown> };
    const env = { ...(win.__env ?? {}) };

    if (contractor) env['UPSTREAM_CONTRACTOR'] = contractor;
    if (baseUrl) {
      env['UPSTREAM_BASE_URL'] = baseUrl;
      // Use the handover token, not the long-lived JWT compiled into the
      // bundle — that one belongs to whichever contractor this build targets
      // and would be rejected by (or return the wrong data from) another host.
      const token = this.token();
      if (token) env['UPSTREAM_AUTH_TOKEN'] = token;
    }
    if (session['useDirectUpstream'] !== undefined) {
      env['USE_DIRECT_UPSTREAM'] = String(session['useDirectUpstream']);
    }

    win.__env = env;
  }

  /**
   * True when this tab was opened by the client dashboard's /contractors page.
   * Such a tab closes on Back/Logout instead of redirecting to the portal — the
   * client dashboard is still sitting in the opener tab, untouched.
   */
  isHandoverTab(): boolean {
    try {
      return sessionStorage.getItem(ExternalSessionService.HANDOVER_FLAG) === '1';
    } catch {
      return false;
    }
  }

  /**
   * Close this tab. Only script-opened tabs may close themselves, which ours is
   * (window.open from the contractors page), but a browser can still refuse —
   * fall back to the portal rather than leaving the user on a dead session.
   */
  closeTab(): void {
    if (typeof window === 'undefined') return;
    window.close();
    // window.close() fails silently when refused, so verify rather than assume.
    setTimeout(() => {
      if (!window.closed) {
        console.warn('[auth] the browser refused to close this tab');
        if (this.mainAppUrl) this.redirectToPortal();
      }
    }, 300);
  }

  /** Parsed portal session, or null when absent/corrupt. */
  read(): PortalSession | null {
    const raw = this.safeGet(this.cfg.storageKey);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as PortalSession;
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }

  /** Bearer token from the portal session, or null. */
  token(): string | null {
    const value = this.read()?.accessToken;
    return typeof value === 'string' && value.trim() ? value.trim() : null;
  }

  /** A session exists and carries a token. */
  hasSession(): boolean {
    return this.token() !== null;
  }

  /**
   * Roles/permissions the portal stored alongside the token. Accepts either a
   * bare array or `{ permissions: [...] }` / `{ roles: [...] }`, because the
   * portal's shape varies by deployment.
   */
  permissions(): string[] {
    const fromKey = this.permissionsFromRolesKey();
    if (fromKey.length) return fromKey;
    // The live portal does not write a separate roles key — role names live on
    // the session itself under `allrole` (with `role` as the primary).
    return this.rolesFromSession();
  }

  /** Roles/permissions from the dedicated `rolesKey`, when the portal writes one. */
  private permissionsFromRolesKey(): string[] {
    const raw = this.safeGet(this.cfg.rolesKey);
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      const list = Array.isArray(parsed)
        ? parsed
        : (parsed as Record<string, unknown>)?.['permissions'] ??
          (parsed as Record<string, unknown>)?.['roles'];
      return this.toNameList(list);
    } catch {
      return [];
    }
  }

  /** Role names carried on the session payload itself (`allrole` / `role`). */
  private rolesFromSession(): string[] {
    const session = this.read();
    if (!session) return [];
    const names = this.toNameList(session.allrole);
    const primary = String(session.role ?? '').trim();
    if (primary && !names.includes(primary)) names.unshift(primary);
    return names;
  }

  private toNameList(list: unknown): string[] {
    if (!Array.isArray(list)) return [];
    return list
      .map((entry) =>
        typeof entry === 'string'
          ? entry
          : String((entry as Record<string, unknown>)?.['name'] ?? '')
      )
      .map((name) => name.trim())
      .filter((name) => name !== '');
  }

  /**
   * Best-effort User built from the portal payload, so `AuthService.user()`
   * (and everything reading it) is populated without a /auth/me round-trip.
   */
  user(): User | null {
    const session = this.read();
    if (!session) return null;
    // Merge both layouts: flat top-level fields (what the live portal writes)
    // with a nested `user` object taking precedence if present.
    const raw: Record<string, unknown> = {
      ...(session as Record<string, unknown>),
      ...((session.user ?? {}) as Record<string, unknown>),
    };
    const str = (...keys: string[]): string => {
      for (const key of keys) {
        const value = raw[key];
        if (value != null && String(value).trim()) return String(value).trim();
      }
      return '';
    };
    // The portal sends one display name ("Ayaz A"); split it so the avatar
    // initials in the shell render as "AA" rather than "A?".
    const display = str('username', 'name', 'fullName');
    const [displayFirst, ...displayRest] = display.split(/\s+/);
    const roleName = str('role', 'roleName');
    // Every required User field is filled — templates bind these directly and
    // would render "undefined" if the portal payload omitted one.
    return {
      ...(raw as object),
      id: str('id', '_id', 'userId', 'userID'),
      firstName: str('firstName', 'givenName') || displayFirst || '',
      lastName: str('lastName', 'familyName') || displayRest.join(' '),
      username: display || str('userName', 'useremail', 'email'),
      email: str('useremail', 'email'),
      profileImage: str('profilePic', 'profileImage') || undefined,
      status: 'active',
      isActive: true,
      lastLogin: str('lastLogin') || null,
      role: roleName ? { id: roleName, name: roleName } : null,
      permissions: this.permissions(),
    } as User;
  }

  /**
   * Capture a `?data=<base64>&roles=<base64>` handover, then strip it from the
   * URL so the token is not left in history or copied into a shared link.
   * Returns true when something was captured. No-op unless
   * `acceptUrlHandover` is on.
   */
  captureUrlHandover(): boolean {
    if (!this.cfg?.acceptUrlHandover) return false;
    if (typeof window === 'undefined') return false;

    const params = new URLSearchParams(window.location.search);
    const encodedToken = params.get('data');
    const encodedRoles = params.get('roles');
    if (!encodedToken && !encodedRoles) return false;

    let captured = false;
    if (encodedToken) {
      try {
        // Validate before storing — a malformed blob would otherwise poison
        // the session and every later read would silently return null.
        const decoded = atob(encodedToken);
        JSON.parse(decoded);
        this.safeSet(this.cfg.storageKey, decoded);
        captured = true;
      } catch {
        console.error('[auth] invalid ?data handover payload — ignored');
      }
    }
    if (encodedRoles) {
      try {
        const decoded = atob(encodedRoles);
        JSON.parse(decoded);
        this.safeSet(this.cfg.rolesKey, decoded);
        captured = true;
      } catch {
        console.error('[auth] invalid ?roles handover payload — ignored');
      }
    }

    if (captured) {
      // Mark the tab BEFORE the URL is cleaned, so a later Back/Logout still
      // knows this tab was opened by the client dashboard.
      try {
        sessionStorage.setItem(ExternalSessionService.HANDOVER_FLAG, '1');
      } catch {
        /* storage unavailable — falls back to portal-redirect logout */
      }
      // Point this instance at the contractor the session names.
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
  stripHandoverQuery(): void {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has('data') && !params.has('roles')) return;

    // Preserve any other query params — only the handover ones are secret.
    params.delete('data');
    params.delete('roles');
    const rest = params.toString();
    const url = window.location.pathname + (rest ? `?${rest}` : '') + window.location.hash;
    window.history.replaceState({}, document.title, url);
  }

  /** True when the URL carries `?logout=true`. */
  isLogoutRequested(): boolean {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('logout') === 'true';
  }

  /** Drop the local session. Does not redirect — callers decide that. */
  clear(): void {
    this.safeRemove(this.cfg.storageKey);
    this.safeRemove(this.cfg.rolesKey);
  }

  /** Clear this tab and signal every other tab on this origin to log out. */
  broadcastLogout(): void {
    this.clear();
    // A `storage` event only fires in OTHER tabs, which is exactly what we
    // want — this tab is about to navigate away anyway.
    this.safeSet(this.cfg.logoutKey, String(Date.now()));
    this.safeRemove(this.cfg.logoutKey);
  }

  /**
   * Listen for a logout broadcast from another tab. Returns an unsubscribe fn.
   */
  onRemoteLogout(handler: () => void): () => void {
    if (typeof window === 'undefined') return () => undefined;
    const listener = (event: StorageEvent) => {
      if (event.key === this.cfg.logoutKey) handler();
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }

  /** Role names from the portal session ('ROLE_ADMIN', 'ROLE_CLIENT', ...). */
  roles(): string[] {
    return this.permissions();
  }

  /** True when any portal role name contains CLIENT (ROLE_CLIENT, Role_Administrator_Client, ...). */
  get isClientUser(): boolean {
    return this.roles().some((r) => r.toUpperCase().includes('CLIENT'));
  }

  /**
   * Absolute URL into the portal, e.g. portalUrl('/#/segments'). Empty string
   * when `mainAppUrl` is unset, which callers treat as "hide the link".
   */
  portalUrl(hashPath: string): string {
    const base = this.mainAppUrl.replace(/\/+$/, '');
    return base ? `${base}${hashPath}` : '';
  }

  /** Navigate to a portal screen (full page load — different Angular app). */
  openPortal(hashPath: string): void {
    const url = this.portalUrl(hashPath);
    if (!url) {
      console.error('[nav] externalAuth.mainAppUrl is not set — cannot open', hashPath);
      return;
    }
    window.location.replace(url);
  }

  /** Send the browser to the portal. Falls back to /login when unconfigured. */
  redirectToPortal(): void {
    if (typeof window === 'undefined') return;
    const url = this.mainAppUrl;
    if (!url) {
      console.error('[auth] externalAuth.mainAppUrl is not set — cannot redirect to portal');
      return;
    }
    window.location.replace(url);
  }

  // localStorage throws in private-mode/sandboxed contexts; never let that
  // take down app bootstrap.
  private safeGet(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private safeSet(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  }

  private safeRemove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      /* storage unavailable */
    }
  }
}
