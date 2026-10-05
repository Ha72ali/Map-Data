import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

/** Slugify a section title into a safe file name fragment. */
function slug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'export'
  );
}

/** Timestamp fragment for filenames, e.g. 2026-07-09_11-43-29 */
function stamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`
  );
}

/**
 * Export a table (headers + rows) as an .xlsx workbook.
 * `rows` is an array of records; column order follows `headers` keys.
 */
export function exportTableToXlsx(
  title: string,
  headers: string[],
  rows: (string | number)[][]
): void {
  const aoa: (string | number)[][] = [[title], [], headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  // Auto width based on longest cell per column.
  const colCount = headers.length;
  ws['!cols'] = Array.from({ length: colCount }, (_, c) => {
    let max = String(headers[c] ?? '').length;
    for (const r of rows) max = Math.max(max, String(r[c] ?? '').length);
    return { wch: Math.min(40, Math.max(10, max + 2)) };
  });
  const wb = XLSX.utils.book_new();
  const sheetName = title.slice(0, 28) || 'Sheet1';
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${slug(title)}_${stamp()}.xlsx`, { compression: true });
}

function triggerDownload(dataUrl: string, filename: string): void {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Capture a DOM element to a PNG image and trigger a download.
 * Elements carrying the `no-export` class are stripped from the capture so the
 * download buttons themselves never appear in the image.
 */
export async function exportElementToImage(
  el: HTMLElement,
  title: string,
  scale = 1.5,
  backgroundColor?: string | null
): Promise<void> {
  const bg =
    backgroundColor ??
    (getComputedStyle(document.body).backgroundColor || '#0b1120');

  const canvas = await html2canvas(el, {
    backgroundColor: bg,
    scale,
    useCORS: true,
    allowTaint: true,
    logging: false,
    imageTimeout: 0,
    ignoreElements: (node) =>
      node instanceof HTMLElement && node.classList.contains('no-export'),
  });

  triggerDownload(canvas.toDataURL('image/png'), `${slug(title)}_${stamp()}.png`);
}
