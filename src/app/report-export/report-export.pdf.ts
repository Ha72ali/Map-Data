import { jsPDF } from 'jspdf';

import {
  captureReportSection,
  canvasToPngDataUrl,
  ReportCaptureError,
} from './report-export.capture';
import {
  DashboardReportSnapshot,
  REPORT_CAPTURE_SELECTORS,
  ReportCaptureSectionKey,
  ReportExportRequest,
  ReportSectionOptions,
} from './report-export.types';

const PAGE = { w: 210, h: 297, margin: 14 };
const CONTENT_W = PAGE.w - PAGE.margin * 2;

const PDF_COLORS = {
  ink: [15, 23, 42] as [number, number, number],
  muted: [100, 116, 139] as [number, number, number],
  border: [226, 232, 240] as [number, number, number],
  brand: [99, 102, 241] as [number, number, number],
  surface: [248, 250, 252] as [number, number, number],
};

function formatGeneratedAt(date: Date): string {
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function fileStamp(date: Date): string {
  return date.toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed <= PAGE.h - PAGE.margin) return y;
  doc.addPage();
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, PAGE.w, PAGE.h, 'F');
  return PAGE.margin;
}

function drawBrandHeader(doc: jsPDF, snapshot: DashboardReportSnapshot, y: number): number {
  doc.setFillColor(...PDF_COLORS.brand);
  doc.roundedRect(PAGE.margin, y, 14, 14, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('NX', PAGE.margin + 7, y + 8.5, { align: 'center' });

  doc.setTextColor(...PDF_COLORS.ink);
  doc.setFontSize(16);
  doc.text(snapshot.brandName, PAGE.margin + 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.muted);
  doc.text(snapshot.brandTagline, PAGE.margin + 18, y + 11);

  y += 18;
  doc.setDrawColor(...PDF_COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(PAGE.margin, y, PAGE.w - PAGE.margin, y);
  y += 6;

  doc.setTextColor(...PDF_COLORS.ink);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(snapshot.title, PAGE.margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.muted);
  doc.text(snapshot.eyebrow, PAGE.margin, y);
  y += 5;
  doc.text(`Reporting window: ${snapshot.reportingWindow}`, PAGE.margin, y);
  y += 5;
  doc.text(`Generated: ${formatGeneratedAt(snapshot.generatedAt)}`, PAGE.margin, y);
  y += 8;

  return y;
}

function drawSectionTitle(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 12);
  doc.setFillColor(...PDF_COLORS.surface);
  doc.rect(PAGE.margin, y - 4, CONTENT_W, 8, 'F');
  doc.setTextColor(...PDF_COLORS.ink);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(title, PAGE.margin + 2, y + 1);
  return y + 10;
}

function drawKeyValueGrid(
  doc: jsPDF,
  rows: Array<[string, string]>,
  y: number,
  columns = 2
): number {
  const colW = CONTENT_W / columns;
  let rowY = y;
  rows.forEach((row, index) => {
    const col = index % columns;
    if (col === 0 && index > 0) rowY += 10;
    const x = PAGE.margin + col * colW;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...PDF_COLORS.muted);
    doc.text(row[0], x, rowY);
    doc.setTextColor(...PDF_COLORS.ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(row[1], x, rowY + 4);
    doc.setFont('helvetica', 'normal');
  });
  const rowsCount = Math.ceil(rows.length / columns);
  return rowY + rowsCount * 10 + 4;
}

function truncateCell(doc: jsPDF, text: string, maxWidth: number): string {
  if (doc.getTextWidth(text) <= maxWidth) return text;
  let value = text;
  while (value.length > 1 && doc.getTextWidth(`${value}…`) > maxWidth) {
    value = value.slice(0, -1);
  }
  return `${value}…`;
}

function drawTable(
  doc: jsPDF,
  head: string[],
  body: string[][],
  y: number,
  title: string
): number {
  y = drawSectionTitle(doc, title, y);
  const colCount = head.length;
  const colW = CONTENT_W / colCount;
  const rowH = 7;

  const drawHeader = (startY: number): number => {
    let cy = ensureSpace(doc, startY, rowH + 2);
    doc.setFillColor(...PDF_COLORS.brand);
    doc.rect(PAGE.margin, cy - 4, CONTENT_W, rowH, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    head.forEach((cell, i) => {
      const x = PAGE.margin + i * colW + 1;
      doc.text(truncateCell(doc, cell, colW - 2), x, cy);
    });
    return cy + rowH;
  };

  y = drawHeader(y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  body.forEach((row, rowIndex) => {
    if (y + rowH > PAGE.h - PAGE.margin) {
      doc.addPage();
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, PAGE.w, PAGE.h, 'F');
      y = PAGE.margin;
      y = drawHeader(y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
    }

    if (rowIndex % 2 === 0) {
      doc.setFillColor(252, 252, 253);
      doc.rect(PAGE.margin, y - 4, CONTENT_W, rowH, 'F');
    }

    doc.setTextColor(...PDF_COLORS.ink);
    row.forEach((cell, i) => {
      const x = PAGE.margin + i * colW + 1;
      doc.text(truncateCell(doc, cell, colW - 2), x, y);
    });
    y += rowH;
  });

  doc.setDrawColor(...PDF_COLORS.border);
  doc.setLineWidth(0.2);
  doc.rect(PAGE.margin, y - rowH * body.length - rowH - 2, CONTENT_W, rowH * (body.length + 1) + 2);

  return y + 4;
}

async function embedCapture(
  doc: jsPDF,
  selector: string,
  y: number,
  title: string
): Promise<{ y: number; captureFailed: boolean }> {
  y = drawSectionTitle(doc, title, y);

  try {
    const canvas = await captureReportSection(selector, title);
    if (!canvas) {
      y = drawCaptureFallbackNote(doc, y, 'Section not found in the current view.');
      return { y, captureFailed: true };
    }

    const img = canvasToPngDataUrl(canvas);
    const imgW = CONTENT_W;
    const imgH = (canvas.height / canvas.width) * imgW;
    y = ensureSpace(doc, y, imgH + 4);
    doc.addImage(img, 'PNG', PAGE.margin, y, imgW, imgH, undefined, 'FAST');
    return { y: y + imgH + 8, captureFailed: false };
  } catch (err) {
    console.warn(`PDF capture skipped for "${title}":`, err);
    const note =
      err instanceof ReportCaptureError
        ? err.message
        : 'Visual snapshot could not be rendered. Table data in this report is still complete.';
    y = drawCaptureFallbackNote(doc, y, note);
    return { y, captureFailed: true };
  }
}

function drawCaptureFallbackNote(doc: jsPDF, y: number, message: string): number {
  y = ensureSpace(doc, y, 12);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...PDF_COLORS.muted);
  const lines = doc.splitTextToSize(message, CONTENT_W);
  doc.text(lines, PAGE.margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...PDF_COLORS.ink);
  return y + lines.length * 4 + 4;
}

function captureKeysForSections(sections: ReportSectionOptions): ReportCaptureSectionKey[] {
  if (sections.chartsGraphs) {
    return ['chartsGraphs'];
  }
  const keys: ReportCaptureSectionKey[] = [];
  if (sections.overallProgress) keys.push('overallProgress');
  if (sections.ringProgress) keys.push('ringProgress');
  if (sections.contractorPerformance) keys.push('contractorPerformance');
  if (sections.constructionPipeline) keys.push('constructionPipeline');
  return keys;
}

const CAPTURE_TITLES: Record<ReportCaptureSectionKey, string> = {
  overallProgress: 'Overall progress (visual)',
  ringProgress: 'Ring progress (visual)',
  contractorPerformance: 'Contractor performance (visual)',
  constructionPipeline: 'Construction pipeline (visual)',
  chartsGraphs: 'Charts & graphs',
};

export async function exportDashboardReportPdf(
  snapshot: DashboardReportSnapshot,
  request: ReportExportRequest,
  onProgress?: (message: string) => void
): Promise<void> {
  let doc: jsPDF;
  try {
    doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  } catch (err) {
    throw new ReportCaptureError(
      'Could not initialize the PDF document.',
      undefined,
      err
    );
  }

  try {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, PAGE.w, PAGE.h, 'F');

    let y = PAGE.margin;
    y = drawBrandHeader(doc, snapshot, y);

    const { sections } = request;

  if (sections.currentFilters) {
    y = drawSectionTitle(doc, 'Active filters', y);
    const filterRows = snapshot.filters.map((f) => [f.label, f.value] as [string, string]);
    y = drawKeyValueGrid(doc, filterRows, y, 2);
    y += 4;
  }

  if (sections.overallProgress) {
    y = ensureSpace(doc, y, 40);
    y = drawSectionTitle(doc, 'Overall progress', y);
    const o = snapshot.overall;
    y = drawKeyValueGrid(
      doc,
      [
        ['Completion', o.completionRate],
        ['Status', o.completionStatus],
        ['Planned', o.totalPlanned],
        ['Completed', o.completed],
        ['In progress', o.inProgress],
        ['Queued', o.pending],
        ['Blocked', o.blocked],
        ['Velocity', o.weeklyRate],
      ],
      y,
      2
    );
  }

  if (sections.ringProgress && snapshot.rings.length) {
    y = drawTable(
      doc,
      ['Ring', 'Planned', 'Completed', 'Active', 'Queued', 'Blocked', 'Done %'],
      snapshot.rings.map((r) => [
        r.name,
        r.totalKm,
        r.completedKm,
        r.inProgressKm,
        r.pendingKm,
        r.blockedKm,
        r.completionPct,
      ]),
      y,
      'Ring progress'
    );
    y += 4;
  }

  if (sections.contractorPerformance && snapshot.contractors.length) {
    y = drawTable(
      doc,
      ['#', 'Contractor', 'Planned', 'Done', 'Active', 'Done %', 'On-time', 'Status'],
      snapshot.contractors.map((c) => [
        String(c.rank),
        c.name,
        c.totalKm,
        c.completedKm,
        c.inProgressKm,
        c.completionPct,
        c.onTime,
        c.status,
      ]),
      y,
      'Contractor performance'
    );
    y += 4;
  }

  if (sections.constructionPipeline && snapshot.pipeline.length) {
    y = drawTable(
      doc,
      ['Step', 'Progress', 'Done', 'Active', 'Queued', 'Blocked', 'Status'],
      snapshot.pipeline.map((p) => [
        p.step,
        p.completedPct,
        String(p.done),
        String(p.active),
        String(p.queued),
        String(p.blocked),
        p.status,
      ]),
      y,
      'Construction pipeline'
    );
    y += 4;
  }

    const captureKeys = captureKeysForSections(sections);
    let captureFailures = 0;
    for (const key of captureKeys) {
      onProgress?.(`Capturing ${CAPTURE_TITLES[key]}…`);
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      const result = await embedCapture(
        doc,
        REPORT_CAPTURE_SELECTORS[key],
        y,
        CAPTURE_TITLES[key]
      );
      y = result.y;
      if (result.captureFailed) captureFailures += 1;
    }

    const filename = `neox-dashboard-report-${fileStamp(snapshot.generatedAt)}.pdf`;
    try {
      doc.save(filename);
    } catch (err) {
      throw new ReportCaptureError(
        'The PDF was generated but could not be saved by the browser.',
        undefined,
        err
      );
    }

    const wantedVisuals =
      sections.chartsGraphs ||
      sections.overallProgress ||
      sections.ringProgress ||
      sections.contractorPerformance ||
      sections.constructionPipeline;
    const hasTableContent =
      sections.overallProgress ||
      sections.ringProgress ||
      sections.contractorPerformance ||
      sections.constructionPipeline ||
      sections.currentFilters;

    if (wantedVisuals && captureFailures === captureKeys.length && !hasTableContent) {
      throw new ReportCaptureError(
        'PDF export failed: chart snapshots could not be rendered. Try Excel or CSV, or export without Charts/Graphs.'
      );
    }
  } catch (err) {
    if (err instanceof ReportCaptureError) throw err;
    throw new ReportCaptureError(
      'PDF generation failed unexpectedly. Please try again or use Excel/CSV export.',
      undefined,
      err
    );
  }
}
