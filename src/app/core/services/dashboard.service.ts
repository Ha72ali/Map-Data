import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_BASE } from './api.config';
import { ApiEnvelope, DashboardStats, User } from '../models/auth.models';

export interface ActivityItem {
  id: string;
  action: string;
  actor: { id?: string; username?: string };
  targetType: string;
  targetId: string;
  ip: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/admin/dashboard`;

  stats(): Observable<DashboardStats> {
    return this.http.get<ApiEnvelope<DashboardStats>>(`${this.base}/stats`).pipe(map((r) => r.data));
  }

  recentUsers(limit = 5): Observable<User[]> {
    return this.http
      .get<ApiEnvelope<User[]>>(`${this.base}/recent-users?limit=${limit}`)
      .pipe(map((r) => r.data));
  }

  recentActivity(limit = 10): Observable<ActivityItem[]> {
    return this.http
      .get<ApiEnvelope<ActivityItem[]>>(`${this.base}/recent-activity?limit=${limit}`)
      .pipe(map((r) => r.data));
  }
}
