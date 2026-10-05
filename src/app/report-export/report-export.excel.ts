import * as XLSX from 'xlsx';

import {
  DashboardReportSnapshot,
  ReportExportRequest,
} from './report-export.types';

function fileStamp(date: Date): string {
  return date.toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

function sheetFromRows(rows: unknown[][]): XLSX.WorkSheet {
  return XLSX.utils.aoa_to_sheet(rows);
}

export function exportDashboardReportExcel(
  snapshot: DashboardReportSnapshot,
  request: ReportExportRequest
): void {
  const wb = XLSX.utils.book_new();
  const { sections } = request;

  const metaRows: unknown[][] = [
    [snapshot.brandName, snapshot.brandTagline],
    [snapshot.title],
    [snapshot.eyebrow],
    ['Reporting window', snapshot.reportingWindow],
    ['Project', snapshot.projectId],
    ['Generated', snapshot.generatedAt.toISOString()],
  ];
  XLSX.utils.book_append_sheet(wb, sheetFromRows(metaRows), 'Report');

  if (sections.currentFilters) {
    XLSX.utils.book_append_sheet(
      wb,
      sheetFromRows([
        ['Filter', 'Value'],
        ...snapshot.filters.map((f) => [f.label, f.value]),
      ]),
      'Filters'
    );
  }

  if (sections.overallProgress) {
    const o = snapshot.overall;
    XLSX.utils.book_append_sheet(
      wb,
      sheetFromRows([
        ['Metric', 'Value'],
        ['Completion', o.completionRate],
        ['Status', o.completionStatus],
        ['Planned', o.totalPlanned],
        ['Completed', o.completed],
        ['In progress', o.inProgress],
        ['Queued', o.pending],
        ['Blocked', o.blocked],
        ['Velocity', o.weeklyRate],
      ]),
      'Overall'
    );
  }

  if (sections.ringProgress && snapshot.rings.length) {
    XLSX.utils.book_append_sheet(
      wb,
      sheetFromRows([
        ['Ring', 'Planned', 'Completed', 'Active', 'Queued', 'Blocked', 'Completion %'],
        ...snapshot.rings.map((r) => [
          r.name,
          r.totalKm,
          r.completedKm,
          r.inProgressKm,
          r.pendingKm,
          r.blockedKm,
          r.completionPct,
        ]),
      ]),
      'Rings'
    );
  }

  if (sections.contractorPerformance && snapshot.contractors.length) {
    XLSX.utils.book_append_sheet(
      wb,
      sheetFromRows([
        ['Rank', 'Contractor', 'Planned', 'Completed', 'Active', 'Completion %', 'On-time %', 'Status'],
        ...snapshot.contractors.map((c) => [
          c.rank,
          c.name,
          c.totalKm,
          c.completedKm,
          c.inProgressKm,
          c.completionPct,
          c.onTime,
          c.status,
        ]),
      ]),
      'Contractors'
    );
  }

  if (sections.constructionPipeline && snapshot.pipeline.length) {
    XLSX.utils.book_append_sheet(
      wb,
      sheetFromRows([
        ['Step', 'Progress', 'Done', 'Active', 'Queued', 'Blocked', 'Status'],
        ...snapshot.pipeline.map((p) => [
          p.step,
          p.completedPct,
          p.done,
          p.active,
          p.queued,
          p.blocked,
          p.status,
        ]),
      ]),
      'Pipeline'
    );
  }

  const filename = `neox-dashboard-report-${fileStamp(snapshot.generatedAt)}.xlsx`;
  XLSX.writeFile(wb, filename, { compression: true });
}
