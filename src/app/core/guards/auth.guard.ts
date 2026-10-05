import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ExternalSessionService } from '../services/external-session.service';

/**
 * Blocks routes unless a session exists.
 *
 * Two modes:
 * - Built-in login: redirect to /login, remembering the target as returnUrl.
 * - Portal handover (`externalAuth.enabled`): there is no login screen here,
 *   so hand the browser back to the portal instead.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const external = inject(ExternalSessionService);
  const router = inject(Router);

  if (auth.isAuthenticated()) return true;

  if (external.enabled) {
    // A portal write may have landed after bootstrap (another tab, or a
    // handover on this navigation) — re-check before bouncing the user out.
    if (auth.restoreExternalSession()) return true;
    external.redirectToPortal();
    // Block the navigation; redirectToPortal() replaces the document. If
    // mainAppUrl is unset it logs and stays put rather than looping.
    return false;
  }

  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
