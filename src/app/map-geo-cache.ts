/** In-memory GeoJSON response cache (map tab only). */

const TTL_MS = 5 * 60 * 1000;
const store = new Map<string, { data: unknown; at: number }>();

export function mapGeoCacheKey(path: string, params?: Record<string, string>): string {
  if (!params || !Object.keys(params).length) {
    return path;
  }
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return `${path}?${sorted}`;
}

export function readMapGeoCache(key: string): unknown | undefined {
  const hit = store.get(key);
  if (!hit) return undefined;
  if (Date.now() - hit.at > TTL_MS) {
    store.delete(key);
    return undefined;
  }
  return hit.data;
}

export function writeMapGeoCache(key: string, data: unknown): void {
  store.set(key, { data, at: Date.now() });
}

export function clearMapGeoCache(): void {
  store.clear();
}
