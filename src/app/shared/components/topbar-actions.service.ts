import { Injectable, signal } from '@angular/core';

/**
 * One page-supplied action rendered as an icon button in the breadcrumb bar.
 *
 * `running` is a getter rather than a value so the bar reflects the owning
 * page's live state (e.g. an export in flight) without the page having to
 * re-register the action on every change.
 */
export interface TopbarAction {
  /** Stable id used to replace/remove the action. */
  id: string;
  /** Tooltip + accessible label. */
  label: string;
  /** SVG path data for a 24x24 stroked icon. */
  iconPath: string;
  /**
   * Receives the click, so an action that opens a popover can stop it
   * reaching the page's document-level "click outside closes it" listener.
   */
  run: (event: MouseEvent) => void;
  running?: () => boolean;
}

/**
 * Lets the routed page hang its own actions off the shared breadcrumb bar.
 *
 * The bar is mounted once in AppComponent, so a page-specific control (the
 * dashboard's "download as image", say) cannot live in that template — it
 * registers here on init and clears itself on destroy instead.
 */
@Injectable({ providedIn: 'root' })
export class TopbarActionsService {
  readonly actions = signal<TopbarAction[]>([]);

  /** Add the action, replacing any earlier one with the same id. */
  register(action: TopbarAction): void {
    this.actions.update((list) => [...list.filter((a) => a.id !== action.id), action]);
  }

  remove(id: string): void {
    this.actions.update((list) => list.filter((a) => a.id !== id));
  }
}
