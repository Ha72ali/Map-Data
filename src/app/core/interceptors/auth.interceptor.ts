import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, Observable, of } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { ExternalSessionService } from '../services/external-session.service';
import { API_BASE } from '../services/api.config';

function isAuthEndpoint(url: string): boolean {
  return url.includes(`${API_BASE}/auth/login`) || url.includes(`${API_BASE}/auth/refresh`);
}

/**
 * - Adds withCredentials (so the refresh cookie flows) to all API requests.
 * - Attaches the Bearer access token.
 * - On 401 (non-auth endpoint), attempts a single silent refresh then retries.
 * - On 403, routes to /forbidden.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokens = inject(TokenService);
  const auth = inject(AuthService);
  const external = inject(ExternalSessionService);
  const router = inject(Router);

  const withCreds = req.clone({ withCredentials: true });
  // In portal mode the token can be rotated by another tab, so read straight
  // from storage rather than trusting the value captured at bootstrap.
  const token = external.enabled ? external.token() ?? tokens.token() : tokens.token();
  const authed =
    token && !isAuthEndpoint(req.url)
      ? withCreds.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : withCreds;

  return next(authed).pipe(
    catchError((err) => {
      if (err.status === 401 && !isAuthEndpoint(req.url)) {
        if (external.enabled) {
          // No refresh cookie in portal mode — only the portal can re-issue.
          auth.clearSession();
          external.clear();
          external.redirectToPortal();
          return throwError(() => err);
        }
        return attemptRefresh(auth, tokens, router, authed, next);
      }
      if (err.status === 403) {
        router.navigate(['/forbidden']);
      }
      return throwError(() => err);
    })
  );
};

function attemptRefresh(
  auth: AuthService,
  tokens: TokenService,
  router: Router,
  original: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> {
  return auth.refresh().pipe(
    switchMap((ok) => {
      if (!ok) {
        auth.clearSession();
        router.navigate(['/login']);
        return throwError(() => new Error('Session expired'));
      }
      const retried = original.clone({
        setHeaders: { Authorization: `Bearer ${tokens.token()}` },
        withCredentials: true,
      });
      return next(retried);
    }),
    catchError((e) => {
      auth.clearSession();
      router.navigate(['/login']);
      return throwError(() => e);
    })
  );
}
