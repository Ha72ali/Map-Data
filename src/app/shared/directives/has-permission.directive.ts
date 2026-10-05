import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

/**
 * Structural directive: render the element only if the user has the permission.
 *   <button *appHasPermission="'User.Create'">Add</button>
 *   <div *appHasPermission="['User.Edit','User.Delete']">…</div>  (ANY of them)
 */
@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  private tpl = inject(TemplateRef<unknown>);
  private vcr = inject(ViewContainerRef);
  private auth = inject(AuthService);

  private required = signal<string[]>([]);
  private rendered = false;

  constructor() {
    // Re-evaluate whenever permissions OR the required list change (signal-driven).
    effect(() => {
      const perms = this.auth.permissions();
      const req = this.required();
      const allowed = req.length === 0 || req.some((p) => perms.has(p));
      this.toggle(allowed);
    });
  }

  @Input() set appHasPermission(value: string | string[]) {
    this.required.set(Array.isArray(value) ? value : [value]);
  }

  private toggle(show: boolean): void {
    if (show && !this.rendered) {
      this.vcr.createEmbeddedView(this.tpl);
      this.rendered = true;
    } else if (!show && this.rendered) {
      this.vcr.clear();
      this.rendered = false;
    }
  }
}
