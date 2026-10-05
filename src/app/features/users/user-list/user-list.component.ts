import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService, UserQuery } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { ToastService } from '../../../core/services/toast.service';
import { Role, User } from '../../../core/models/auth.models';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    HasPermissionDirective,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  private userSvc = inject(UserService);
  private roleSvc = inject(RoleService);
  private toast = inject(ToastService);
  private dialog = inject(MatDialog);

  readonly columns = ['name', 'username', 'email', 'role', 'status', 'actions'];
  readonly users = signal<User[]>([]);
  readonly roles = signal<Role[]>([]);
  readonly total = signal(0);

  query: UserQuery = { page: 1, limit: 10, search: '', role: '', status: '', sort: 'createdAt', order: 'desc' };

  ngOnInit(): void {
    this.roleSvc.list().subscribe((r) => this.roles.set(r));
    this.load();
  }

  load(): void {
    this.userSvc.list(this.query).subscribe((res) => {
      this.users.set(res.data);
      this.total.set(res.meta.pagination.total);
    });
  }

  applyFilters(): void {
    this.query.page = 1;
    this.load();
  }

  onPage(e: PageEvent): void {
    this.query.page = e.pageIndex + 1;
    this.query.limit = e.pageSize;
    this.load();
  }

  onSort(s: Sort): void {
    this.query.sort = s.active;
    this.query.order = (s.direction || 'desc') as 'asc' | 'desc';
    this.load();
  }

  toggleStatus(u: User): void {
    this.userSvc.setStatus(u.id, !u.isActive).subscribe({
      next: (updated) => {
        this.toast.success(`${updated.username} ${updated.isActive ? 'activated' : 'deactivated'}`);
        this.load();
      },
      error: (err) => this.toast.error(err?.error?.message || 'Failed to update status'),
    });
  }

  resetPassword(u: User): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Reset password', message: `Reset password for ${u.username} to "Temp@123"?`, confirmText: 'Reset' },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (!ok) return;
        this.userSvc.resetPassword(u.id, 'Temp@123').subscribe({
          next: () => this.toast.success('Password reset to Temp@123'),
          error: (err) => this.toast.error(err?.error?.message || 'Failed'),
        });
      });
  }

  remove(u: User): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Delete user', message: `Delete ${u.username}? This is a soft delete.`, confirmText: 'Delete', color: 'warn' },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (!ok) return;
        this.userSvc.remove(u.id).subscribe({
          next: () => {
            this.toast.success('User deleted');
            this.load();
          },
          error: (err) => this.toast.error(err?.error?.message || 'Failed'),
        });
      });
  }
}
