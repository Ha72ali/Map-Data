import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgramDashboardComponent } from './program-dashboard/program-dashboard.component';
import { RccFloatingTooltipComponent } from './rcc-floating-tooltip/rcc-floating-tooltip.component';
import { ReportExportModalComponent } from './report-export/report-export-modal.component';
import { ExecutiveDashboardComponent } from './executive-dashboard/executive-dashboard.component';
import { GisMapViewComponent } from './gis-map-view/gis-map-view.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { ImageViewerComponent } from './gallery-view/image-viewer.component';
import { FilterBarComponent } from './shared/filters/filter-bar.component';
import { RingsComponent } from './pages/rings/rings.component';
import { LinksComponent } from './pages/links/links.component';
import { PhasesComponent } from './pages/phases/phases.component';
import { DailyProgressComponent } from './pages/daily-progress/daily-progress.component';
import { ContractorsComponent } from './pages/contractors/contractors.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { FinancialDashboardComponent } from './pages/financial-dashboard/financial-dashboard.component';
import { ManhoursDashboardComponent } from './pages/manhours-dashboard/manhours-dashboard.component';

import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { AuthService } from './core/services/auth.service';
import { HasPermissionDirective } from './shared/directives/has-permission.directive';
import { BreadcrumbComponent } from './shared/components/breadcrumb.component';

/**
 * Session restore on app load.
 *
 * Portal-handover mode: read the session the portal left in localStorage (and
 * capture a `?data=` handover). No network call — there is no refresh cookie
 * to trade, so falling through to auth.refresh() would just 401 and add a
 * round-trip to every cold start.
 *
 * Default mode: silent refresh using the httpOnly cookie.
 */
function initAuth(auth: AuthService) {
  return () => {
    if (auth.usesExternalSession) {
      auth.restoreExternalSession();
      return Promise.resolve(true);
    }
    return firstValueFrom(auth.refresh()).catch(() => false);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ProgramDashboardComponent,
    RccFloatingTooltipComponent,
    ReportExportModalComponent,
    ExecutiveDashboardComponent,
    GisMapViewComponent,
    GalleryViewComponent,
    ImageViewerComponent,
    FilterBarComponent,
    RingsComponent,
    LinksComponent,
    PhasesComponent,
    DailyProgressComponent,
    ContractorsComponent,
    AlertsComponent,
    FinancialDashboardComponent,
    ManhoursDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HasPermissionDirective,
    BreadcrumbComponent,
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    { provide: APP_INITIALIZER, useFactory: initAuth, deps: [AuthService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
