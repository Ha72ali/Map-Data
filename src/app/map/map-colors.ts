import { GIS_ROUTE_COLORS, TELECOM_ROLLOUT_LINE_STYLE, type GisRouteLineClass } from './oman-map-config';

/** Soft telecom GIS fallback when legacy status colors are used. */
export const STATUS_ROUTE_COLORS = {
  completed: '#9ba7b4',
  inProgress: '#c43d46',
  pending: '#9ba7b4',
  blocked: '#b85a62',
} as const;

export type RouteStatusBucket = keyof typeof STATUS_ROUTE_COLORS;

/** Ring accent colors when status is neutral / pending. */
export const RING_ROUTE_COLORS: Record<string, string> = {
  '1': '#2563eb',
  '2': '#06b6d4',
  '3': '#14b8a6',
  '4': '#f97316',
  '5': '#a855f7',
  '6': '#f59e0b',
  '7': '#dc2626',
};

export function ringIdKey(ringId: unknown): string {
  return String(ringId ?? '')
    .trim()
    .replace(/^R/i, '')
    .toLowerCase();
}

export function routeStatusBucket(
  status: unknown,
  progress?: unknown,
  props?: Record<string, unknown>
): RouteStatusBucket {
  const s = String(status ?? '')
    .toLowerCase()
    .replace(/\s+/g, '_');
  if (s.includes('complete') || s === 'done' || s === 'completed') {
    return 'completed';
  }
  if (s.includes('block') || s.includes('reject')) {
    return 'blocked';
  }
  if (
    s.includes('in_progress') ||
    s.includes('inprogress') ||
    s.includes('started') ||
    s === 'active'
  ) {
    return 'inProgress';
  }
  const completedLen = Number(props?.['completedLength'] ?? props?.['completed_length']);
  const totalLen = Number(props?.['totalLength'] ?? props?.['total_length']);
  if (Number.isFinite(completedLen) && Number.isFinite(totalLen) && totalLen > 0) {
    if (completedLen / totalLen >= 0.99) return 'completed';
    if (completedLen > 0) return 'inProgress';
  }
  const p = Number(progress);
  if (Number.isFinite(p)) {
    if (p >= 99) return 'completed';
    if (p > 0) return 'inProgress';
  }
  if (s.includes('yet_to_start') && Number.isFinite(completedLen) && completedLen > 0) {
    return 'inProgress';
  }
  return 'pending';
}

export function ringAccentColor(ringId: unknown): string | undefined {
  return RING_ROUTE_COLORS[ringIdKey(ringId)];
}

/** Map line color — unified telecom rollout red (no ring/status accent colors). */
export function colorForRouteFeature(_props: Record<string, unknown>): string {
  return TELECOM_ROLLOUT_LINE_STYLE.color ?? GIS_ROUTE_COLORS.rollout;
}

/** All main route lines render as rollout on contractor GIS maps. */
export function classifyGisRouteLine(_props: Record<string, unknown>): GisRouteLineClass {
  return 'rollout';
}

export function gisColorForRouteLine(lineClass: GisRouteLineClass): string {
  return GIS_ROUTE_COLORS[lineClass];
}
