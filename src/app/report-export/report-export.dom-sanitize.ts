/**
 * Export-only DOM/CSS sanitization for html2canvas.
 * Resolves modern color functions to rgb/rgba and strips classes so global
 * stylesheets with color-mix/oklch are not parsed during capture.
 */

const UNSUPPORTED_COLOR_PATTERN =
  /color-mix|oklch|oklab|lab\(|lch\(|color\(|light-dark\(|hwb\(|color-contrast/i;

const SAFE_COLOR_PATTERN = /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|transparent|currentcolor)$/i;

const COLOR_PROPS = [
  'color',
  'background-color',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'caret-color',
  'column-rule-color',
  'text-decoration-color',
  'fill',
  'stroke',
] as const;

const LAYOUT_PROPS = [
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'z-index',
  'box-sizing',
  'width',
  'height',
  'min-width',
  'min-height',
  'max-width',
  'max-height',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'flex',
  'flex-direction',
  'flex-wrap',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'align-items',
  'align-self',
  'align-content',
  'justify-content',
  'justify-items',
  'gap',
  'row-gap',
  'column-gap',
  'grid-template-columns',
  'grid-template-rows',
  'grid-column',
  'grid-row',
  'grid-area',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'line-height',
  'letter-spacing',
  'text-align',
  'text-transform',
  'text-overflow',
  'white-space',
  'word-break',
  'overflow',
  'overflow-x',
  'overflow-y',
  'vertical-align',
  'opacity',
  'visibility',
  'border-radius',
  'border-width',
  'border-style',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'border-top-style',
  'border-right-style',
  'border-bottom-style',
  'border-left-style',
  'list-style',
  'list-style-type',
  'table-layout',
  'border-collapse',
  'border-spacing',
] as const;

const EXPORT_RESET: Record<string, string> = {
  animation: 'none',
  transition: 'none',
  'transition-property': 'none',
  'transition-duration': '0s',
  'backdrop-filter': 'none',
  '-webkit-backdrop-filter': 'none',
  filter: 'none',
  'background-image': 'none',
  'mask-image': 'none',
  '-webkit-mask-image': 'none',
};

const DEFAULT_INK = 'rgb(15, 23, 42)';
const DEFAULT_MUTED = 'rgb(100, 116, 139)';
const DEFAULT_SURFACE = 'rgb(255, 255, 255)';

export function isUnsupportedColorValue(value: string): boolean {
  const v = (value || '').trim();
  if (!v) return false;
  if (SAFE_COLOR_PATTERN.test(v)) return false;
  return UNSUPPORTED_COLOR_PATTERN.test(v);
}

export function isSafeColorValue(value: string): boolean {
  const v = (value || '').trim();
  if (!v) return false;
  if (v === 'transparent') return true;
  if (/^currentcolor$/i.test(v)) return true;
  if (UNSUPPORTED_COLOR_PATTERN.test(v)) return false;
  if (/^#[0-9a-f]{3,8}$/i.test(v)) return true;
  if (/^rgba?\(/i.test(v)) return true;
  if (/^hsla?\(/i.test(v)) return true;
  return false;
}

/**
 * Resolve a computed color to rgb/rgba using the live element when needed.
 */
export function resolveSafeColor(
  sourceEl: Element,
  property: string,
  fallback = DEFAULT_INK
): string {
  const computed = getComputedStyle(sourceEl);
  const raw = computed.getPropertyValue(property) || '';
  return coerceToSafeColor(raw, fallback, sourceEl, property);
}

function coerceToSafeColor(
  raw: string,
  fallback: string,
  sourceEl?: Element,
  property?: string
): string {
  const value = (raw || '').trim();
  if (!value) return fallback;
  if (value === 'transparent') return 'transparent';
  if (isSafeColorValue(value)) return value;

  if (sourceEl && property) {
    const probed = probeResolvedColor(sourceEl, property, value);
    if (probed) return probed;
  }

  return fallback;
}

function probeResolvedColor(
  sourceEl: Element,
  property: string,
  rawValue: string
): string | null {
  try {
    const probe = document.createElement('span');
    probe.setAttribute('data-report-export-probe', 'true');
    probe.style.cssText =
      'position:fixed;left:-9999px;top:0;visibility:hidden;pointer-events:none;opacity:0;';

    if (property.includes('background')) {
      probe.style.setProperty('background-color', rawValue);
    } else if (property === 'fill' || property === 'stroke') {
      probe.style.setProperty(property, rawValue);
    } else {
      probe.style.setProperty('color', rawValue);
    }

    document.body.appendChild(probe);
    const cs = getComputedStyle(probe);
    const resolved =
      property.includes('background')
        ? cs.backgroundColor
        : property === 'fill' || property === 'stroke'
          ? cs.getPropertyValue(property)
          : cs.color;
    probe.remove();

    if (resolved && isSafeColorValue(resolved)) return resolved;
  } catch {
    /* ignore probe failures */
  }

  try {
    const cs = getComputedStyle(sourceEl);
    const resolved = cs.getPropertyValue(property);
    if (resolved && isSafeColorValue(resolved)) return resolved;
  } catch {
    /* ignore */
  }

  return null;
}

function sanitizeBoxShadow(raw: string, sourceEl: Element): string {
  const value = (raw || '').trim();
  if (!value || value === 'none') return 'none';
  if (!isUnsupportedColorValue(value) && !value.includes('var(')) return value;

  const resolved = getComputedStyle(sourceEl).boxShadow;
  if (resolved && resolved !== 'none' && !isUnsupportedColorValue(resolved)) {
    return resolved;
  }
  return 'none';
}

function inlineProperty(
  target: HTMLElement,
  property: string,
  value: string
): void {
  if (!value) return;
  try {
    target.style.setProperty(property, value, 'important');
  } catch {
    try {
      target.style.setProperty(property, value);
    } catch {
      /* ignore invalid assignments */
    }
  }
}

function inlineElementStyles(source: HTMLElement, clone: HTMLElement): void {
  const cs = getComputedStyle(source);

  clone.removeAttribute('class');
  clone.removeAttribute('style');

  for (const [prop, val] of Object.entries(EXPORT_RESET)) {
    inlineProperty(clone, prop, val);
  }

  const bgFallback = coerceToSafeColor(
    cs.backgroundColor,
    DEFAULT_SURFACE,
    source,
    'background-color'
  );
  inlineProperty(clone, 'background-color', bgFallback);

  for (const prop of COLOR_PROPS) {
    const fallback =
      prop.includes('background') || prop === 'fill'
        ? 'transparent'
        : prop === 'stroke'
          ? 'none'
          : DEFAULT_INK;
    const safe = resolveSafeColor(source, prop, fallback);
    if (safe && safe !== 'none') {
      inlineProperty(clone, prop, safe);
    }
  }

  inlineProperty(clone, 'box-shadow', sanitizeBoxShadow(cs.boxShadow, source));

  for (const prop of LAYOUT_PROPS) {
    const val = cs.getPropertyValue(prop);
    if (val) inlineProperty(clone, prop, val);
  }

  if (source.tagName === 'SVG' || source.namespaceURI === 'http://www.w3.org/2000/svg') {
    const fill = resolveSafeColor(source, 'fill', 'none');
    const stroke = resolveSafeColor(source, 'stroke', 'none');
    clone.setAttribute('fill', fill === 'transparent' ? 'none' : fill);
    clone.setAttribute('stroke', stroke);
  }
}

/**
 * Walk source/clone trees in parallel and inline export-safe computed styles on clone.
 */
export function sanitizeCloneForExport(sourceRoot: HTMLElement, cloneRoot: HTMLElement): void {
  const stripTags = new Set(['STYLE', 'LINK', 'SCRIPT', 'NOSCRIPT']);

  const walk = (source: Element, clone: Element): void => {
    if (stripTags.has(clone.tagName)) {
      clone.remove();
      return;
    }

    if (clone instanceof HTMLElement && source instanceof HTMLElement) {
      inlineElementStyles(source, clone);
    }

    const sourceChildren = Array.from(source.children);
    const cloneChildren = Array.from(clone.children);
    const len = Math.min(sourceChildren.length, cloneChildren.length);
    for (let i = 0; i < len; i++) {
      walk(sourceChildren[i], cloneChildren[i]);
    }

    for (let i = len; i < cloneChildren.length; i++) {
      cloneChildren[i].remove();
    }
  };

  inlineProperty(cloneRoot, 'background-color', DEFAULT_SURFACE);
  inlineProperty(cloneRoot, 'color', DEFAULT_INK);
  walk(sourceRoot, cloneRoot);
}

export interface ExportIframeHost {
  iframe: HTMLIFrameElement;
  root: HTMLElement;
  cleanup: () => void;
}

/**
 * Mount a sanitized clone in an isolated iframe (no app stylesheets).
 */
export function mountSanitizedCloneInIframe(
  source: HTMLElement,
  widthPx: number
): ExportIframeHost {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.setAttribute('tabindex', '-1');
  Object.assign(iframe.style, {
    position: 'fixed',
    left: '-10000px',
    top: '0',
    width: `${widthPx}px`,
    height: '1px',
    border: '0',
    visibility: 'hidden',
    pointerEvents: 'none',
  });

  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    iframe.remove();
    throw new Error('Could not initialize export frame for PDF capture.');
  }

  doc.open();
  doc.write(
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#fff;"></body></html>'
  );
  doc.close();

  const clone = source.cloneNode(true) as HTMLElement;
  clone.classList.add('report-export-capture-root');
  sanitizeCloneForExport(source, clone);

  const body = doc.body;
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.background = '#ffffff';
  body.appendChild(clone);

  const cleanup = (): void => {
    try {
      iframe.remove();
    } catch {
      /* ignore */
    }
  };

  return { iframe, root: clone, cleanup };
}

/** Extra pass inside html2canvas onclone document (defensive). */
export function sanitizeOnCloneDocument(clonedDoc: Document, sourceRoot: HTMLElement): void {
  const cloneRoot = clonedDoc.querySelector('.report-export-capture-root') as HTMLElement | null;
  if (!cloneRoot) return;

  try {
    sanitizeCloneForExport(sourceRoot, cloneRoot);
  } catch (err) {
    console.warn('Report export onclone sanitize fallback:', err);
  }

  clonedDoc.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => node.remove());
}
