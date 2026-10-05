export function buildRoutePopupHtml(feature: {
  graphic?: { attributes?: Record<string, unknown> };
}): string {
  const attrs = feature.graphic?.attributes || {};
  const name = String(attrs['name'] || attrs['projectName'] || 'Route');
  const status = String(attrs['status'] || attrs['_statusBucket'] || '—');
  const progress = attrs['progress'];
  const totalM = Number(attrs['totalLength']);
  const completedM = Number(attrs['completedLength']);
  const pendingM =
    Number.isFinite(totalM) && Number.isFinite(completedM)
      ? Math.max(0, totalM - completedM)
      : NaN;
  const rows: string[] = [
    `<b>${escapeHtml(name)}</b>`,
    `Status: ${escapeHtml(status)}`,
  ];
  if (Number.isFinite(Number(progress))) {
    rows.push(`Progress: ${Number(progress).toFixed(1)}%`);
  }
  if (Number.isFinite(totalM)) {
    rows.push(`Total: ${(totalM / 1000).toFixed(2)} km`);
  }
  if (Number.isFinite(completedM)) {
    rows.push(`Completed: ${(completedM / 1000).toFixed(2)} km`);
  }
  if (Number.isFinite(pendingM)) {
    rows.push(`Pending: ${(pendingM / 1000).toFixed(2)} km`);
  }
  const ringId = attrs['ringId'];
  if (ringId != null) {
    rows.push(`Ring: ${escapeHtml(String(ringId))}`);
  }
  const contractor = attrs['contractor'];
  if (contractor) {
    rows.push(`Contractor: ${escapeHtml(String(contractor))}`);
  }
  return rows.join('<br/>');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
