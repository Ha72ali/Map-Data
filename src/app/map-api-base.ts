import { environment } from '../environments/environment';
import { apiBaseUrl } from './api-base';

/**
 * Base URL for map GeoJSON requests. Prefer environment.mapApiBaseUrl, then window.__env.MAP_API_URL, then apiBaseUrl().
 */
export function mapApiBaseUrl(): string {
  const fromBuild = String(environment.mapApiBaseUrl ?? '').trim();
  if (fromBuild) {
    return fromBuild.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    try {
      const env = (window as unknown as {
        __env?: { MAP_API_URL?: string; MAP_API_BASE_URL?: string };
      }).__env;
      const raw = env?.MAP_API_BASE_URL ?? env?.MAP_API_URL;
      if (raw !== undefined && raw !== null && String(raw).trim() !== '') {
        return String(raw).replace(/\/$/, '');
      }
    } catch {
      /* ignore */
    }
  }
  return apiBaseUrl();
}
