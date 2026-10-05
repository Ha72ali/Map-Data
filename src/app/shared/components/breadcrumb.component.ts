import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription, filter, startWith } from 'rxjs';

import { BreadcrumbService } from './breadcrumb.service';
import { TopbarActionsService } from './topbar-actions.service';

/** One rendered crumb; the last one in the trail carries no link. */
interface Crumb {
  label: string;
  url: string | null;
}

/**
 * Route-driven breadcrumb trail, plus page-supplied action buttons on its
 * right (registered through TopbarActionsService).
 *
 * Labels come from each route's `data.breadcrumb`, so a page opts in by
 * declaring it in the router config rather than by templating its own trail —
 * one component mounted once in AppComponent covers every routed page.
 *
 * The landing page IS "Home", so it renders nothing there rather than showing a
 * one-item trail pointing at the page you are already on.
 */
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  crumbs: Crumb[] = [];

  private sub?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbs: BreadcrumbService,
    public topbar: TopbarActionsService,
  ) {}

  ngOnInit(): void {
    // startWith fires the initial build: the first NavigationEnd may already
    // have happened by the time this component is constructed.
    this.sub = this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        startWith(null),
      )
      .subscribe(() => this.build());

    // A page-supplied drill-down crumb (e.g. the Gallery's phase grid) changes
    // without a navigation, so it needs its own rebuild trigger.
    this.sub.add(this.breadcrumbs.detail$.subscribe(() => this.build()));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  /** Walk the primary-outlet chain, collecting every route that names itself. */
  private build(): void {
    const trail: Crumb[] = [];
    let node: ActivatedRoute | null = this.route.root;
    let url = '';

    while (node) {
      const segments = node.snapshot.url.map((s) => s.path).join('/');
      if (segments) url += `/${segments}`;

      const label = node.snapshot.data['breadcrumb'] as string | undefined;
      // Componentless parents (e.g. /admin) contribute a label but no
      // destination, so the trail reads "Administration / Users" without
      // offering a link to a route that renders nothing.
      if (label && trail[trail.length - 1]?.label !== label) {
        trail.push({ label, url: node.snapshot.component ? url || '/' : null });
      }

      node = node.children.find((c) => c.outlet === 'primary') ?? null;
    }

    // A drill-down inside the page (no route segment of its own) becomes the
    // new last crumb, which turns the page's own crumb back into a link out.
    const detail = this.breadcrumbs.detail$.value;
    if (detail && trail.length > 0) trail.push({ label: detail, url: null });

    // A lone crumb is the landing page itself — nothing worth drawing.
    this.crumbs =
      trail.length === 0
        ? []
        : [{ label: 'Home', url: '/' }, ...trail].map((c, i, all) =>
            // The page you are on is not a link. With a drill-down appended the
            // page's own crumb is no longer last, so it keeps its route link
            // and becomes the way back out.
            i === all.length - 1 ? { ...c, url: null } : c,
          );
  }
}
