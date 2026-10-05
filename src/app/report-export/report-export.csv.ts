import {
  DashboardReportSnapshot,
  ReportExportRequest,
} from './report-export.types';

function fileStamp(date: Date): string {
  return date.toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

function escapeCsv(value: string | number): string {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function rowsToCsv(rows: string[][]): string {
  return rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');
}

function downloadCsv(filename: string, content: string): void {
  const blob = new Blob(['\ufeff', content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function exportDashboardReportCsv(
  snapshot: DashboardReportSnapshot,
  request: ReportExportRequest
): void {
  const { sections } = request;
  const blocks: string[][] = [];

  blocks.push(['NEOXTECH Dashboard Report']);
  blocks.push([snapshot.title]);
  blocks.push(['Generated', snapshot.generatedAt.toISOString()]);
  blocks.push([]);

  if (sections.currentFilters) {
    blocks.push(['Active filters']);
    blocks.push(['Filter', 'Value']);
    snapshot.filters.forEach((f) => blocks.push([f.label, f.value]));
    blocks.push([]);
  }

  if (sections.overallProgress) {
    const o = snapshot.overall;
    blocks.push(['Overall progress']);
    blocks.push(['Metric', 'Value']);
    blocks.push(['Completion', o.completionRate]);
    blocks.push(['Status', o.completionStatus]);
    blocks.push(['Planned', o.totalPlanned]);
    blocks.push(['Completed', o.completed]);
    blocks.push(['In progress', o.inProgress]);
    blocks.push(['Queued', o.pending]);
    blocks.push(['Blocked', o.blocked]);
    blocks.push(['Velocity', o.weeklyRate]);
    blocks.push([]);
  }

  if (sections.ringProgress && snapshot.rings.length) {
    blocks.push(['Ring progress']);
    blocks.push(['Ring', 'Planned', 'Completed', 'Active', 'Queued', 'Blocked', 'Completion %']);
    snapshot.rings.forEach((r) =>
      blocks.push([
        r.name,
        r.totalKm,
        r.completedKm,
        r.inProgressKm,
        r.pendingKm,
        r.blockedKm,
        r.completionPct,
      ])
    );
    blocks.push([]);
  }

  if (sections.contractorPerformance && snapshot.contractors.length) {
    blocks.push(['Contractor performance']);
    blocks.push(['Rank', 'Contractor', 'Planned', 'Completed', 'Active', 'Completion %', 'On-time %', 'Status']);
    snapshot.contractors.forEach((c) =>
      blocks.push([
        String(c.rank),
        c.name,
        c.totalKm,
        c.completedKm,
        c.inProgressKm,
        c.completionPct,
        c.onTime,
        c.status,
      ])
    );
    blocks.push([]);
  }

  if (sections.constructionPipeline && snapshot.pipeline.length) {
    blocks.push(['Construction pipeline']);
    blocks.push(['Step', 'Progress', 'Done', 'Active', 'Queued', 'Blocked', 'Status']);
    snapshot.pipeline.forEach((p) =>
      blocks.push([
        p.step,
        p.completedPct,
        String(p.done),
        String(p.active),
        String(p.queued),
        String(p.blocked),
        p.status,
      ])
    );
  }

  const filename = `neox-dashboard-report-${fileStamp(snapshot.generatedAt)}.csv`;
  downloadCsv(filename, rowsToCsv(blocks));
}
