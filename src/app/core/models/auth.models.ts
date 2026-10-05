export interface RoleBrief {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  profileImage?: string;
  status: 'active' | 'inactive' | 'pending';
  isActive: boolean;
  lastLogin?: string | null;
  role: RoleBrief | null;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  route: string;
  permission?: string;
  children?: MenuItem[];
}

export interface LoginResponse {
  accessToken: string;
  user: User;
  permissions: string[];
  menu: MenuItem[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PermissionItem {
  key: string;
  group: string;
  description: string;
}

export interface PermissionGroup {
  group: string;
  permissions: { key: string; description: string }[];
}

export interface Paginated<T> {
  data: T[];
  meta: { pagination: { page: number; limit: number; total: number; totalPages: number } };
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  todayLogins: number;
  totalRoles: number;
}
