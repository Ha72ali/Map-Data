import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Route guard driven by route.data.permission (single key) or
 * route.data.anyPermission (array — passes if the user has ANY of them).
 */
export const permissionGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const permission = route.data?.['permission'] as string | undefined;
  const anyPermission = route.data?.['anyPermission'] as string[] | undefined;

  if (permission && !auth.hasPermission(permission)) {
    return router.createUrlTree(['/forbidden']);
  }
  if (anyPermission && !auth.hasAny(anyPermission)) {
    return router.createUrlTree(['/forbidden']);
  }
  return true;
};
