import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutiveDashboardComponent } from './executive-dashboard/executive-dashboard.component';
import { GisMapViewComponent } from './gis-map-view/gis-map-view.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { ProgramDashboardComponent } from './program-dashboard/program-dashboard.component';
import { RingsComponent } from './pages/rings/rings.component';
import { LinksComponent } from './pages/links/links.component';
import { PhasesComponent } from './pages/phases/phases.component';
import { DailyProgressComponent } from './pages/daily-progress/daily-progress.component';
import { ContractorsComponent } from './pages/contractors/contractors.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { FinancialDashboardComponent } from './pages/financial-dashboard/financial-dashboard.component';
import { ManhoursDashboardComponent } from './pages/manhours-dashboard/manhours-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';

// `data.breadcrumb` on a route is what BreadcrumbComponent renders; a route
// without one contributes no crumb. Componentless parents (e.g. /admin) still
// name themselves, but the trail leaves them unlinked.
// --- RBAC auth/admin routes (standalone, lazy-loaded) ---
const adminChildren: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [permissionGuard],
    data: { permission: 'Dashboard.View', breadcrumb: 'Admin Dashboard' },
    loadComponent: () =>
      import('./features/dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
  },
  {
    path: 'users',
    canActivate: [permissionGuard],
    data: { permission: 'User.View', breadcrumb: 'Users' },
    loadComponent: () => import('./features/users/user-list/user-list.component').then((m) => m.UserListComponent),
  },
  {
    path: 'users/new',
    canActivate: [permissionGuard],
    data: { permission: 'User.Create', breadcrumb: 'New User' },
    loadComponent: () => import('./features/users/user-form/user-form.component').then((m) => m.UserFormComponent),
  },
  {
    path: 'users/:id/edit',
    canActivate: [permissionGuard],
    data: { permission: 'User.Edit', breadcrumb: 'Edit User' },
    loadComponent: () => import('./features/users/user-form/user-form.component').then((m) => m.UserFormComponent),
  },
  {
    path: 'roles',
    canActivate: [permissionGuard],
    data: { permission: 'Role.Manage', breadcrumb: 'Roles' },
    loadComponent: () => import('./features/roles/role-list/role-list.component').then((m) => m.RoleListComponent),
  },
  {
    path: 'roles/new',
    canActivate: [permissionGuard],
    data: { permission: 'Role.Manage', breadcrumb: 'New Role' },
    loadComponent: () => import('./features/roles/role-form/role-form.component').then((m) => m.RoleFormComponent),
  },
  {
    path: 'roles/:id/edit',
    canActivate: [permissionGuard],
    data: { permission: 'Role.Manage', breadcrumb: 'Edit Role' },
    loadComponent: () => import('./features/roles/role-form/role-form.component').then((m) => m.RoleFormComponent),
  },
  {
    path: 'reports',
    canActivate: [permissionGuard],
    data: { permission: 'Reports.View', title: 'Reports', breadcrumb: 'Reports' },
    loadComponent: () => import('./features/placeholder/placeholder.component').then((m) => m.PlaceholderComponent),
  },
  {
    path: 'settings',
    canActivate: [permissionGuard],
    data: { permission: 'Settings.View', title: 'Settings', breadcrumb: 'Settings' },
    loadComponent: () => import('./features/placeholder/placeholder.component').then((m) => m.PlaceholderComponent),
  },
];

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./features/auth/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./features/errors/forbidden.component').then((m) => m.ForbiddenComponent),
  },
  {
    path: '404',
    loadComponent: () => import('./features/errors/not-found.component').then((m) => m.NotFoundComponent),
  },
  // Admin screens render inside the MAIN dashboard shell (componentless parent
  // → children render in AppComponent's router-outlet, keeping the same UI/nav).
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { breadcrumb: 'Administration' },
    children: adminChildren,
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    data: { breadcrumb: 'Profile' },
    loadComponent: () => import('./features/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'change-password',
    canActivate: [authGuard],
    data: { breadcrumb: 'Change Password' },
    loadComponent: () =>
      import('./features/auth/change-password/change-password.component').then((m) => m.ChangePasswordComponent),
  },

  // --- existing dashboard app (now behind auth: unauthenticated → /login) ---
  // '/' IS the Executive Dashboard, so this route is both "Home" and the page
  // you are on. It is labelled anyway, because BreadcrumbComponent draws
  // nothing for a route with no label and the bar should be present on every
  // page — including the one users land on. The result reads "Home / Dashboard",
  // where Home links back to this same route; harmless, and it keeps
  // BreadcrumbComponent identical to the one in safdarbhai_work/angular-client.
  { path: '', component: ExecutiveDashboardComponent, canActivate: [authGuard], data: { breadcrumb: 'Dashboard' } },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  { path: 'gis-map', component: GisMapViewComponent, canActivate: [authGuard], data: { breadcrumb: 'GIS Map' } },
  { path: 'gallery', component: GalleryViewComponent, canActivate: [authGuard], data: { breadcrumb: 'Gallery' } },
  // { path: 'rings', component: RingsComponent, canActivate: [authGuard], data: { breadcrumb: 'Rings' } },
  // { path: 'links', component: LinksComponent, canActivate: [authGuard], data: { breadcrumb: 'Links' } },
  // { path: 'phases', component: PhasesComponent, canActivate: [authGuard], data: { breadcrumb: 'Phases' } },
  // { path: 'daily-progress', component: DailyProgressComponent, canActivate: [authGuard], data: { breadcrumb: 'Daily Progress' } },
  // { path: 'contractors', component: ContractorsComponent, canActivate: [authGuard], data: { breadcrumb: 'Contractors' } },
  // { path: 'alerts', component: AlertsComponent, canActivate: [authGuard], data: { breadcrumb: 'Alerts' } },
  // { path: 'financial-dashboard', component: FinancialDashboardComponent, canActivate: [authGuard], data: { breadcrumb: 'Financial Dashboard' } },
  // { path: 'program', component: ProgramDashboardComponent, canActivate: [authGuard], data: { breadcrumb: 'Program' } },
  // { path: 'manhours', component: ManhoursDashboardComponent, canActivate: [authGuard], data: { breadcrumb: 'Man-Hours' } },
  {
    path: '**',
    loadComponent: () => import('./features/errors/not-found.component').then((m) => m.NotFoundComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
