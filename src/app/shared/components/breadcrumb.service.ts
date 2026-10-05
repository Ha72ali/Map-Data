import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Lets a page append one trailing crumb that the router cannot know about.
 *
 * The trail is otherwise built from route `data.breadcrumb`, which only sees
 * route segments. A drill-down held in component state — the Gallery's phase
 * grid, which lives at `/gallery?phase=N` — has no segment of its own, so the
 * page pushes its label here and clears it on the way out.
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  /** Label of the current in-page drill-down, or null when there is none. */
  readonly detail$ = new BehaviorSubject<string | null>(null);

  setDetail(label: string | null): void {
    const next = (label || '').trim() || null;
    if (this.detail$.value !== next) this.detail$.next(next);
  }

  clearDetail(): void {
    this.setDetail(null);
  }
}
