import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

interface PermGroup {
  group: string;
  color: string;
  items: string[];
}

const GROUP_COLORS: Record<string, string> = {
  User: '#2d6a9f',
  Role: '#8e44ad',
  Dashboard: '#16a085',
  Reports: '#e67e22',
  Settings: '#7f8c8d',
  Profile: '#27ae60',
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  auth = inject(AuthService);

  readonly initials = computed(() => {
    const u = this.auth.user();
    if (!u) return '?';
    return ((u.firstName || u.username || '?').charAt(0) + (u.lastName || '').charAt(0)).toUpperCase();
  });

  readonly completion = computed(() => {
    const u = this.auth.user();
    if (!u) return 0;
    const fields = [u.firstName, u.lastName, u.email, u.phone, u.profileImage];
    const filled = fields.filter((f) => !!f && String(f).trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  });

  // SVG ring geometry (r = 52).
  readonly ringCirc = 2 * Math.PI * 52;
  readonly ringOffset = computed(() => this.ringCirc * (1 - this.completion() / 100));

  readonly permGroups = computed<PermGroup[]>(() => {
    const perms = this.auth.user()?.permissions ?? [];
    const map = new Map<string, string[]>();
    for (const p of perms) {
      const group = p.split('.')[0];
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(p);
    }
    return Array.from(map.entries()).map(([group, items]) => ({
      group,
      color: GROUP_COLORS[group] || '#5b6b7f',
      items,
    }));
  });
}
