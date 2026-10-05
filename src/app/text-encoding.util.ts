/** Detect UTF-8 text that was mis-decoded as Windows-1252 / Latin-1. */
const MOJIBAKE_RE =
  /\u00e2\u20ac|\u00e2\u2020|\u00e2\u2030|\u00c2\u00b7|\u00c3\u2014|[\u0080-\u009f]/;

const REPLACEMENTS: ReadonlyArray<[string, string]> = [
  ['\u00e2\u20ac\u00a6', '...'],
  ['\u00e2\u20ac\u00a2', '\u2022'],
  ['\u00e2\u20ac\u201c', '\u2013'],
  ['\u00e2\u20ac\u201d', '\u2014'],
  ['\u00e2\u2020\u2018', '\u2191'],
  ['\u00e2\u2020\u2019', '\u2192'],
  ['\u00e2\u2020\u201c', '\u2193'],
  ['\u00e2\u2030\u00a5', '\u2265'],
  ['\u00c2\u00b7', '\u00b7'],
  ['\u00c3\u2014', '\u00d7'],
];

export function looksLikeUtf8Mojibake(value: string): boolean {
  return MOJIBAKE_RE.test(value);
}

/** Repair a single string that may contain mojibake from mis-decoded UTF-8. */
export function repairUtf8Mojibake(input: string | null | undefined): string {
  if (input == null) return '';
  let text = String(input);
  if (!text) return text;

  for (const [from, to] of REPLACEMENTS) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
    }
  }

  if (!looksLikeUtf8Mojibake(text)) {
    return text;
  }

  try {
    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code > 255) {
        return text;
      }
      bytes[i] = code;
    }
    const repaired = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    return looksLikeUtf8Mojibake(repaired) ? text : repaired;
  } catch {
    return text;
  }
}

/**
 * True only for a JSON-shaped object literal.
 *
 * The walk below rebuilds an object from its own enumerable properties, which
 * is correct for parsed JSON and destructive for anything else: a Blob, File,
 * ArrayBuffer or typed array exposes none, so it would come back as `{}`. That
 * matters because the axios response interceptors repair every body, including
 * binary ones — a blob download (KMZ export, DPR report) had its Blob replaced
 * by an empty object, and `URL.createObjectURL({})` then threw.
 */
function isPlainObject(value: object): boolean {
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Walk API JSON and repair string fields. Non-JSON values pass through. */
export function repairDeepStrings<T>(value: T): T {
  if (value == null) {
    return value;
  }
  if (typeof value === 'string') {
    return repairUtf8Mojibake(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => repairDeepStrings(item)) as T;
  }
  if (typeof value === 'object') {
    if (!isPlainObject(value as object)) {
      return value;
    }
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      out[key] = repairDeepStrings(nested);
    }
    return out as T;
  }
  return value;
}
