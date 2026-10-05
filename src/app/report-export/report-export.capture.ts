import html2canvas from 'html2canvas';

import {
  mountSanitizedCloneInIframe,
  sanitizeOnCloneDocument,
} from './report-export.dom-sanitize';

const CAPTURE_WIDTH_PX = 920;

export class ReportCaptureError extends Error {
  readonly sectionLabel?: string;
  readonly originalError?: unknown;

  constructor(message: string, sectionLabel?: string, originalError?: unknown) {
    super(message);
    this.name = 'ReportCaptureError';
    this.sectionLabel = sectionLabel;
    this.originalError = originalError;
  }
}

function friendlyCaptureError(err: unknown, sectionLabel: string): ReportCaptureError {
  const raw = err instanceof Error ? err.message : String(err);
  const colorParse =
    /unsupported color function|color-mix|oklch|parse.*color/i.test(raw);

  if (colorParse) {
    return new ReportCaptureError(
      `Could not render "${sectionLabel}" for PDF: unsupported CSS colors were detected. The export sanitizer could not resolve all styles. Try exporting data tables only, or switch to Excel/CSV.`,
      sectionLabel,
      err
    );
  }

  return new ReportCaptureError(
    `Could not capture "${sectionLabel}" for the PDF. ${raw || 'Unknown rendering error.'}`,
    sectionLabel,
    err
  );
}

/**
 * Clone a dashboard section off-screen, sanitize CSS for html2canvas, and capture
 * with a light background (works when the live UI is in dark mode).
 */
export async function captureReportSection(
  selector: string,
  sectionLabel = 'chart section'
): Promise<HTMLCanvasElement | null> {
  const source = document.querySelector(selector) as HTMLElement | null;
  if (!source) return null;

  let host: ReturnType<typeof mountSanitizedCloneInIframe> | null = null;

  try {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    host = mountSanitizedCloneInIframe(source, CAPTURE_WIDTH_PX);

    const iframeDoc = host.iframe.contentDocument;
    if (iframeDoc?.body) {
      host.root.style.width = `${CAPTURE_WIDTH_PX}px`;
      const height = Math.max(source.offsetHeight, host.root.scrollHeight, 1);
      host.iframe.style.height = `${height + 24}px`;
    }

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    const canvas = await html2canvas(host.root, {
      backgroundColor: '#ffffff',
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      logging: false,
      useCORS: true,
      allowTaint: true,
      imageTimeout: 15000,
      removeContainer: true,
      onclone: (clonedDoc) => {
        sanitizeOnCloneDocument(clonedDoc, source);
      },
    });

    if (!canvas || canvas.width < 1 || canvas.height < 1) {
      throw new ReportCaptureError(
        `Capture for "${sectionLabel}" produced an empty image.`,
        sectionLabel
      );
    }

    return canvas;
  } catch (err) {
    if (err instanceof ReportCaptureError) throw err;
    throw friendlyCaptureError(err, sectionLabel);
  } finally {
    host?.cleanup();
  }
}

export function canvasToPngDataUrl(canvas: HTMLCanvasElement): string {
  try {
    return canvas.toDataURL('image/png', 0.92);
  } catch (err) {
    throw new ReportCaptureError(
      'Failed to encode chart image for PDF.',
      undefined,
      err
    );
  }
}
