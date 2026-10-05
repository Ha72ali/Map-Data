import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminDashboardService, ActivityItem } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardStats, User } from '../../core/models/auth.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  private svc = inject(AdminDashboardService);
  auth = inject(AuthService);

  /** Admins (users with User.View) get the full stats view; others get the welcome view. */
  readonly isAdminView = computed(() => this.auth.hasPermission('User.View'));

  readonly stats = signal<DashboardStats | null>(null);
  readonly recentUsers = signal<User[]>([]);
  readonly activity = signal<ActivityItem[]>([]);

  readonly completion = computed(() => {
    const u = this.auth.user();
    if (!u) return 0;
    const fields = [u.firstName, u.lastName, u.email, u.phone, u.profileImage];
    const filled = fields.filter((f) => !!f && String(f).trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  });

  ngOnInit(): void {
    if (this.isAdminView()) {
      this.svc.stats().subscribe((s) => this.stats.set(s));
      this.svc.recentUsers(5).subscribe((u) => this.recentUsers.set(u));
      this.svc.recentActivity(8).subscribe((a) => this.activity.set(a));
    }
  }

  cards() {
    const s = this.stats();
    return [
      { label: 'Total Users', value: s?.totalUsers ?? '—', icon: 'group', color: '#2d6a9f' },
      { label: 'Active Users', value: s?.activeUsers ?? '—', icon: 'how_to_reg', color: '#27ae60' },
      { label: 'Inactive Users', value: s?.inactiveUsers ?? '—', icon: 'person_off', color: '#e67e22' },
      { label: "Today's Logins", value: s?.todayLogins ?? '—', icon: 'login', color: '#8e44ad' },
      { label: 'Roles', value: s?.totalRoles ?? '—', icon: 'admin_panel_settings', color: '#16a085' },
    ];
  }
}
