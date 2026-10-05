import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_BASE } from './api.config';
import { ApiEnvelope, Paginated, User } from '../models/auth.models';

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/users`;

  list(query: UserQuery): Observable<Paginated<User>> {
    let params = new HttpParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
    });
    return this.http
      .get<ApiEnvelope<User[]>>(this.base, { params })
      .pipe(map((res) => ({ data: res.data, meta: res.meta })));
  }

  get(id: string): Observable<User> {
    return this.http.get<ApiEnvelope<User>>(`${this.base}/${id}`).pipe(map((r) => r.data));
  }

  create(body: Omit<Partial<User>, 'role'> & { password: string; role: string }): Observable<User> {
    return this.http.post<ApiEnvelope<User>>(this.base, body).pipe(map((r) => r.data));
  }

  update(
    id: string,
    body: Omit<Partial<User>, 'role'> & { role?: string; password?: string }
  ): Observable<User> {
    return this.http.put<ApiEnvelope<User>>(`${this.base}/${id}`, body).pipe(map((r) => r.data));
  }

  setStatus(id: string, isActive: boolean): Observable<User> {
    return this.http
      .patch<ApiEnvelope<User>>(`${this.base}/${id}/status`, { isActive })
      .pipe(map((r) => r.data));
  }

  resetPassword(id: string, newPassword: string): Observable<void> {
    return this.http
      .post<ApiEnvelope<void>>(`${this.base}/${id}/reset-password`, { newPassword })
      .pipe(map(() => void 0));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<ApiEnvelope<void>>(`${this.base}/${id}`).pipe(map(() => void 0));
  }
}
