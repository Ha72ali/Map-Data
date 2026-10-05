import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { API_BASE } from './api.config';
import { TokenService } from './token.service';
import { ApiEnvelope, LoginResponse, MenuItem, User } from '../models/auth.models';
import { ExternalSessionService } from './external-session.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokens = inject(TokenService);
  private router = inject(Router);
  private external = inject(ExternalSessionService);

  readonly user = signal<User | null>(null);
  readonly menu = signal<MenuItem[]>([]);
  readonly permissions = computed(() => new Set(this.user()?.permissions ?? []));
  readonly isAuthenticated = computed(() => !!this.user() && !!this.tokens.token());

  login(emailOrUsername: string, password: string): Observable<User> {
    return this.http
      .post<ApiEnvelope<LoginResponse>>(`${API_BASE}/auth/login`, { emailOrUsername, password })
      .pipe(
        map((res) => res.data),
        tap((data) => {
          this.tokens.set(data.accessToken);
          this.user.set(data.user);
          this.menu.set(data.menu ?? []);
        }),
        map((data) => data.user)
      );
  }

  /**
   * Portal-handover bootstrap (no login screen). Captures a `?data=` handover
   * if present, then hydrates token/user/permissions from localStorage.
   * Returns true when a session was restored.
   *
   * No-op when `externalAuth.enabled` is false, so the built-in login flow is
   * untouched.
   */
  restoreExternalSession(): boolean {
    if (!this.external.enabled) return false;
    this.external.captureUrlHandover();
    const token = this.external.token();
    if (!token) return false;
    this.tokens.set(token);
    this.user.set(this.external.user());
    // The portal owns the menu; nothing to fetch from Node here.
    this.menu.set([]);
    return true;
  }

  /** True when this build defers login to the portal. */
  get usesExternalSession(): boolean {
    return this.external.enabled;
  }

  /** Silent refresh using the httpOnly cookie. Returns true if a session was restored. */
  refresh(): Observable<boolean> {
    return this.http
      .post<ApiEnvelope<{ accessToken: string; user: User }>>(`${API_BASE}/auth/refresh`, {})
      .pipe(
        tap((res) => {
          this.tokens.set(res.data.accessToken);
          this.user.set(res.data.user);
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  loadMenu(): Observable<MenuItem[]> {
    return this.http.get<ApiEnvelope<{ menu: MenuItem[] }>>(`${API_BASE}/auth/menu`).pipe(
      map((res) => res.data.menu),
      tap((menu) => this.menu.set(menu))
    );
  }

  logout(): void {
    if (this.external.enabled) {
      // Portal owns the session: clear locally, tell other tabs, hand back.
      this.clearSession();
      this.external.broadcastLogout();
      this.external.redirectToPortal();
      return;
    }
    this.http.post(`${API_BASE}/auth/logout`, {}).pipe(catchError(() => of(null))).subscribe(() => {
      this.clearSession();
      this.router.navigate(['/login']);
    });
  }

  /** Called by the interceptor when refresh fails — drop state and bounce to login. */
  clearSession(): void {
    this.tokens.clear();
    this.user.set(null);
    this.menu.set([]);
  }

  hasPermission(permission: string): boolean {
    return this.permissions().has(permission);
  }

  hasAny(perms: string[]): boolean {
    const set = this.permissions();
    return perms.some((p) => set.has(p));
  }
}
