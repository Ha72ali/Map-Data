/**
 * Auth API base. Relative "/api" is proxied by ng serve (proxy.conf.json) to
 * the Node backend on :4000 — same-origin, so the httpOnly refresh cookie flows.
 */
export const API_BASE = '/api';
