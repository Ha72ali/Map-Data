import { environment } from '../environments/environment';

/**
 * Direct-upstream (contractor PMS) configuration.
 *
 * The dashboard can talk to the contractor's own API server instead of the
 * Node gateway. Resolution order for every value, highest priority first:
 *
 *   1. `window.__env.*` — injected in index.html at deploy time, so a single
 *      built bundle can be pointed at a different contractor without a rebuild.
 *   2. `environment.upstream.*` — compile-time default per build target.
 *
 * See `api-base.ts` for the Node-gateway equivalent; the two follow the same
 * pattern so either origin can be swapped independently.
 */

interface UpstreamWindowEnv {
  UPSTREAM_BASE_URL?: string;
  UPSTREAM_AUTH_TOKEN?: string;
  UPSTREAM_CONTRACTOR?: string;
  /** "true" / "false" — string because it is injected as raw HTML. */
  USE_DIRECT_UPSTREAM?: string | boolean;
}

function readWindowEnv(): UpstreamWindowEnv | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    return (window as unknown as { __env?: UpstreamWindowEnv }).__env;
  } catch {
    return undefined;
  }
}

function firstNonEmpty(...values: Array<string | undefined | null>): string {
  for (const raw of values) {
    if (raw !== undefined && raw !== null && String(raw).trim() !== '') {
      return String(raw).trim();
    }
  }
  return '';
}

let apiSuffixWarned = false;

/**
 * Contractor API origin, normalised. Empty when not configured.
 *
 * Accepts either form of the URL, because both get pasted in practice:
 *   https://tcpms.mhditics.com          -> https://tcpms.mhditics.com
 *   https://tcpms.mhditics.com/api/     -> https://tcpms.mhditics.com
 *
 * Every path in UpstreamApiService already starts with '/api/', so a base
 * ending in '/api' would produce '/api/api/rings' — which the server 404s.
 * Stripping it is safe by construction here: this base is only ever joined
 * with '/api/…' paths, so a trailing '/api' is always a duplicate.
 */
export function upstreamBaseUrl(): string {
  const value = firstNonEmpty(
    readWindowEnv()?.UPSTREAM_BASE_URL,
    environment.upstream?.baseUrl
  );
  if (!value) return '';

  const trimmed = value.replace(/\/+$/, '');
  const withoutApi = trimmed.replace(/\/api$/i, '');

  if (withoutApi !== trimmed && !apiSuffixWarned) {
    apiSuffixWarned = true;
    console.info(
      `[upstream] baseUrl '${value}' ends in /api — using '${withoutApi}'. ` +
        'Service paths already include /api/.'
    );
  }
  return withoutApi;
}

/**
 * Bearer token for the contractor API.
 *
 * WARNING: anything returned here ships to the browser and is readable by any
 * user of the dashboard. Only put a token here that is safe to make public —
 * for a per-user secret, keep the Node gateway.
 */
export function upstreamAuthToken(): string {
  const raw = firstNonEmpty(
    readWindowEnv()?.UPSTREAM_AUTH_TOKEN,
    environment.upstream?.authToken
  );
  if (!raw) return '';
  return raw.startsWith('Bearer ') ? raw : `Bearer ${raw}`;
}

/**
 * Contractor this deployment serves (e.g. 'MHD'). The upstream segments
 * endpoint has no contractor parameter — the contractor is whichever backend
 * you hit — so this is the label used to tag rows the API returns untagged.
 */
export function upstreamContractor(): string {
  return firstNonEmpty(
    readWindowEnv()?.UPSTREAM_CONTRACTOR,
    environment.upstream?.contractor
  ).toUpperCase();
}

/**
 * True when reads should bypass the Node gateway and hit the contractor API.
 * Requires a base URL — an enabled flag with no URL falls back to Node rather
 * than issuing same-origin requests that would 404.
 */
export function isDirectUpstreamEnabled(): boolean {
  const win = readWindowEnv()?.USE_DIRECT_UPSTREAM;
  const enabled =
    win === undefined || win === null || String(win).trim() === ''
      ? environment.upstream?.useDirectUpstream === true
      : String(win).trim().toLowerCase() === 'true';
  return enabled && upstreamBaseUrl() !== '';
}

/** Per-request timeout for contractor API calls (ms). */
export function upstreamTimeoutMs(): number {
  const value = Number(environment.upstream?.timeoutMs);
  return Number.isFinite(value) && value > 0 ? value : 30_000;
}

/**
 * Segment payloads are large and some contractor backends take 60s+ to
 * respond. Mirrors the gateway's SEGMENTS_TIMEOUT_MS.
 */
export function upstreamSegmentsTimeoutMs(): number {
  const value = Number(environment.upstream?.segmentsTimeoutMs);
  return Number.isFinite(value) && value > 0 ? value : 120_000;
}
