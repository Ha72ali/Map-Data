/** Format GeoJSON feature attributes for the map detail panel. */
export function formatMapFeatureDetail(
  raw: Record<string, unknown>
): Record<string, string> {
  const out: Record<string, string> = {};
  const set = (label: string, value: unknown): void => {
    if (value === null || value === undefined || value === '') return;
    if (typeof value === 'object') {
      try {
        out[label] = JSON.stringify(value);
      } catch {
        out[label] = '[object]';
      }
      return;
    }
    out[label] = String(value);
  };

  set('Project', raw['name'] ?? raw['projectName']);
  set('Contractor', raw['contractor']);
  set('Ring', raw['ringId']);
  set('Status', raw['status'] ?? raw['_statusBucket']);
  if (raw['progress'] != null) {
    const p = Number(raw['progress']);
    if (Number.isFinite(p)) {
      set('Completion %', `${p.toFixed(1)}%`);
    }
  }

  const totalM = Number(raw['totalLength']);
  const completedM = Number(raw['completedLength']);
  if (Number.isFinite(totalM)) {
    set('Total KM', (totalM / 1000).toFixed(2));
  }
  if (Number.isFinite(completedM)) {
    set('Completed KM', (completedM / 1000).toFixed(2));
  }
  if (Number.isFinite(totalM) && Number.isFinite(completedM)) {
    set('Pending KM', (Math.max(0, totalM - completedM) / 1000).toFixed(2));
  }

  set('Route ID', raw['routeId']);
  set('Project ID', raw['projectId']);
  set('Feature type', raw['featureType']);

  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_')) continue;
    if (out[k] !== undefined) continue;
    set(k, v);
  }

  return out;
}
