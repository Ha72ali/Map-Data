import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_BASE } from './api.config';
import { ApiEnvelope, PermissionGroup, PermissionItem, Role } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/roles`;

  list(): Observable<Role[]> {
    return this.http.get<ApiEnvelope<Role[]>>(this.base).pipe(map((r) => r.data));
  }

  get(id: string): Observable<Role> {
    return this.http.get<ApiEnvelope<Role>>(`${this.base}/${id}`).pipe(map((r) => r.data));
  }

  create(body: Partial<Role>): Observable<Role> {
    return this.http.post<ApiEnvelope<Role>>(this.base, body).pipe(map((r) => r.data));
  }

  update(id: string, body: Partial<Role>): Observable<Role> {
    return this.http.put<ApiEnvelope<Role>>(`${this.base}/${id}`, body).pipe(map((r) => r.data));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<ApiEnvelope<void>>(`${this.base}/${id}`).pipe(map(() => void 0));
  }

  permissions(): Observable<{ flat: PermissionItem[]; grouped: PermissionGroup[] }> {
    return this.http
      .get<ApiEnvelope<{ flat: PermissionItem[]; grouped: PermissionGroup[] }>>(`${API_BASE}/permissions`)
      .pipe(map((r) => r.data));
  }
}
