import { environment } from '../environments/environment';

/**
 * Backend origin for axios.
 * - Optional `window.__env.API_BASE_URL` (inject in index.html or at deploy time) for a separate API host.
 * - `environment.mapApiBaseUrl` for map-only override (see map-api-base.ts).
 * - Local dev (localhost / 127.0.0.1): defaults to '' so `/api` is proxied to Node (see proxy.conf.json).
 * - Production on a real host: defaults to '' (same origin) — serve the SPA and proxy `/api` to Node (nginx/Caddy).
 */
export function apiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'http://127.0.0.1:4000';
  }
  try {
    const env = (window as unknown as {
      __env?: {
        API_BASE_URL?: string;
        VITE_API_URL?: string;
        NEXT_PUBLIC_API_URL?: string;
        MAP_API_URL?: string;
      };
    }).__env;
    const candidates = [
      env?.API_BASE_URL,
      env?.VITE_API_URL,
      env?.NEXT_PUBLIC_API_URL,
      env?.MAP_API_URL,
      environment.mapApiBaseUrl,
    ];
    for (const raw of candidates) {
      if (raw !== undefined && raw !== null && String(raw).trim() !== '') {
        return String(raw).replace(/\/$/, '');
      }
    }
  } catch {
    /* ignore */
  }
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return '';
  }
  return '';
}
