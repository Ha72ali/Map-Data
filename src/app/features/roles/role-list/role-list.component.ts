import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RoleService } from '../../../core/services/role.service';
import { ToastService } from '../../../core/services/toast.service';
import { Role } from '../../../core/models/auth.models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  private roleSvc = inject(RoleService);
  private toast = inject(ToastService);
  private dialog = inject(MatDialog);

  readonly columns = ['name', 'description', 'permissions', 'status', 'actions'];
  readonly roles = signal<Role[]>([]);
  readonly protectedRoles = ['Admin', 'User'];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.roleSvc.list().subscribe((r) => this.roles.set(r));
  }

  toggleActive(role: Role): void {
    this.roleSvc.update(role.id, { isActive: !role.isActive }).subscribe({
      next: () => {
        this.toast.success(`${role.name} ${!role.isActive ? 'enabled' : 'disabled'}`);
        this.load();
      },
      error: (err) => this.toast.error(err?.error?.message || 'Failed'),
    });
  }

  remove(role: Role): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Delete role', message: `Delete role "${role.name}"?`, confirmText: 'Delete', color: 'warn' },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (!ok) return;
        this.roleSvc.remove(role.id).subscribe({
          next: () => {
            this.toast.success('Role deleted');
            this.load();
          },
          error: (err) => this.toast.error(err?.error?.message || 'Failed'),
        });
      });
  }
}
