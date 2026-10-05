import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forkJoin } from 'rxjs';
import { RoleService } from '../../../core/services/role.service';
import { ToastService } from '../../../core/services/toast.service';
import { PermissionGroup } from '../../../core/models/auth.models';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css'],
})
export class RoleFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private roleSvc = inject(RoleService);
  private toast = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly groups = signal<PermissionGroup[]>([]);
  readonly selected = signal<Set<string>>(new Set());
  readonly editId = signal<string | null>(null);
  readonly saving = signal(false);
  readonly isEdit = () => this.editId() !== null;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    isActive: [true],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId.set(id);
      forkJoin({ perms: this.roleSvc.permissions(), role: this.roleSvc.get(id) }).subscribe(
        ({ perms, role }) => {
          this.groups.set(perms.grouped);
          this.form.patchValue({ name: role.name, description: role.description, isActive: role.isActive });
          this.selected.set(new Set(role.permissions));
        }
      );
    } else {
      this.roleSvc.permissions().subscribe((p) => this.groups.set(p.grouped));
    }
  }

  isChecked(key: string): boolean {
    return this.selected().has(key);
  }

  toggle(key: string, checked: boolean): void {
    const next = new Set(this.selected());
    if (checked) next.add(key);
    else next.delete(key);
    this.selected.set(next);
  }

  toggleGroup(group: PermissionGroup, checked: boolean): void {
    const next = new Set(this.selected());
    group.permissions.forEach((p) => (checked ? next.add(p.key) : next.delete(p.key)));
    this.selected.set(next);
  }

  groupAllChecked(group: PermissionGroup): boolean {
    return group.permissions.every((p) => this.selected().has(p.key));
  }

  groupSomeChecked(group: PermissionGroup): boolean {
    const some = group.permissions.some((p) => this.selected().has(p.key));
    return some && !this.groupAllChecked(group);
  }

  submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const body = { ...this.form.getRawValue(), permissions: Array.from(this.selected()) };
    const done = {
      next: () => {
        this.toast.success(this.isEdit() ? 'Role updated' : 'Role created');
        this.router.navigate(['/admin/roles']);
      },
      error: (err: any) => {
        this.saving.set(false);
        this.toast.error(err?.error?.message || 'Save failed');
      },
    };
    if (this.isEdit()) this.roleSvc.update(this.editId()!, body).subscribe(done);
    else this.roleSvc.create(body).subscribe(done);
  }
}
