/**
 * progress-forecast-chart.ts — geometry for the Progress Report (Overall) chart.
 *
 * Builds an SVG view model: cumulative actual km up to today, then straight
 * projection rays (current pace, best case, worst case) that terminate exactly
 * where they meet total scope. That termination is the point of the chart — where
 * a ray crosses the scope line IS its completion date, so the dates and the
 * geometry cannot disagree.
 *
 * Deliberately excludes a "planned" series: the upstream feed reports
 * plannedWork/cumulativePlanned as 0 for every contractor and period, so any
 * planned curve would be invented. See hasPlanBaseline on the API response.
 *
 * Pure functions only — no DOM, no clock. `statusDate` is supplied, so the output
 * is fully determined by its inputs and unit-testable.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

export interface CumInputPoint {
  iso: string;
  cumulativeKm: number;
}

export interface RaySpec {
  key: 'forecast' | 'best' | 'worst';
  /** Legend / end-label text, e.g. "Best Case (+15% pace)". */
  label: string;
  shortLabel: string;
  color: string;
  /** Metres per day. */
  paceMPerDay: number;
  /** ISO date the scenario reaches full scope; null when there is no forecast. */
  completionDate: string | null;
}

export interface BuiltRay extends RaySpec {
  /** SVG path from today's position to the scope line. */
  d: string;
  endX: number;
  endY: number;
  /** Always equals scopeKm — a ray stops at 100%, never beyond. */
  endKm: number;
  endDateLabel: string;
  daysRemaining: number | null;
  /**
   * Label anchor in the right gutter. All rays finish on the scope line within a
   * few dozen px of each other, so labels drawn at the endpoints overlapped into
   * an unreadable pile; they get separated vertical slots plus a leader line back
   * to the endpoint instead.
   */
  labelX: number;
  labelY: number;
  leader: string;
}

export interface CumChartVM {
  width: number;
  height: number;
  plot: { x: number; y: number; w: number; h: number };
  yMax: number;
  yTicks: { y: number; label: string }[];
  xTicks: { x: number; label: string }[];
  /** Solid polyline of observed progress. */
  actualPath: string;
  actualPoints: { x: number; y: number; km: number; iso: string; label: string }[];
  /** Thinned subset carrying value labels, so they cannot collide. */
  valueLabels: { x: number; y: number; text: string }[];
  rays: BuiltRay[];
  scope: { y: number; km: number; label: string } | null;
  today: { x: number; y: number; km: number } | null;
  /** Set when the x axis is compressed; draw a break glyph between x1 and x2. */
  axisBreak: { x1: number; x2: number } | null;
}

export const PAD = { left: 58, right: 132, top: 26, bottom: 34 };

function parseIso(iso: string | null | undefined): number {
  if (!iso) return NaN;
  const t = new Date(`${String(iso).slice(0, 10)}T00:00:00Z`).getTime();
  return Number.isFinite(t) ? t : NaN;
}

function ymdUTC(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Fixed 3-letter months: en-GB's "short" style yields "Sept", which is 4. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "07-Mar-2038" — unambiguous, and never locale-dependent. */
export function formatEndDate(iso: string | null): string {
  const ms = parseIso(iso);
  if (!Number.isFinite(ms)) return '—';
  const d = new Date(ms);
  return `${String(d.getUTCDate()).padStart(2, '0')}-${MONTHS[d.getUTCMonth()]}-${d.getUTCFullYear()}`;
}

export function formatKm(km: number): string {
  return km.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** A 1/2/5×10^n step that yields roughly `count` gridlines. */
function niceStep(max: number, count: number): number {
  if (!(max > 0)) return 1;
  const raw = max / Math.max(1, count);
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * mag;
}

/**
 * Month-start tick values across [startMs, endMs], thinned toward `target`.
 *
 * The grid is anchored on the first month start that actually falls inside the
 * range, not on the month containing `startMs`. Those differ whenever the range
 * opens mid-month — the forecast segment always starts at today — and anchoring
 * on the containing month burns the first step position on a boundary in the
 * past. That is why a forecast running Aug '26 → Dec '27 used to label Dec '26
 * first: the Jul '26 slot was generated, then dropped as out of range.
 */
function monthTicks(startMs: number, endMs: number, target: number): number[] {
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) return [];
  const start = new Date(startMs);
  const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
  if (cursor.getTime() < startMs) cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  // Step over the labellable span, so `target` counts ticks that can be drawn.
  const months =
    (new Date(endMs).getUTCFullYear() - cursor.getUTCFullYear()) * 12 +
    (new Date(endMs).getUTCMonth() - cursor.getUTCMonth());
  const step = Math.max(1, Math.ceil(months / Math.max(1, target)));
  const out: number[] = [];
  while (cursor.getTime() <= endMs) {
    out.push(cursor.getTime());
    cursor.setUTCMonth(cursor.getUTCMonth() + step);
  }
  return out;
}

function tickLabel(ms: number): string {
  const d = new Date(ms);
  return `${MONTHS[d.getUTCMonth()]} '${String(d.getUTCFullYear()).slice(2)}`;
}

/**
 * The date a bucket's cumulative value is actually true as of.
 *
 * WEEKLY and MONTHLY periods are keyed by the START of the bucket, but the
 * cumulative figure they carry includes every day in it. Plotting at the key put
 * a whole month's progress at the 1st — reading as if 911 km had been installed by
 * 1 July when that is the total through the 31st — and left a visible gap between
 * the end of the line and Today. Positioning at the bucket's end, clamped to the
 * as-of date, is where the value is genuinely true.
 */
export function bucketEndMs(iso: string, granularity: string, clampMs: number): number {
  const start = parseIso(iso);
  if (!Number.isFinite(start)) return NaN;
  let end = start;
  if (granularity === 'MONTHLY') {
    const d = new Date(start);
    end = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0); // day 0 of next month
  } else if (granularity === 'WEEKLY') {
    end = start + 6 * DAY_MS;
  }
  // Never plot into the future: a bucket in progress is only true up to today.
  return Number.isFinite(clampMs) ? Math.min(end, clampMs) : end;
}

/**
 * Horizontal scale, linear by default.
 *
 * When the forecast horizon dwarfs the observed window — a slow single contractor
 * can forecast a decade out against five months of history — the observed data
 * would collapse into a few pixels. In that case the axis splits into two linear
 * segments with a visual break, so both halves stay readable. The threshold means
 * the common case (aggregate pace, ~1 year out) keeps a plain, undistorted axis.
 */
export function createXScale(
  minMs: number,
  todayMs: number,
  maxMs: number,
  x0: number,
  w: number,
  compressAfterRatio = 2
): { f: (ms: number) => number; axisBreak: { x1: number; x2: number } | null } {
  const actualSpan = Math.max(1, todayMs - minMs);
  const forecastSpan = Math.max(0, maxMs - todayMs);

  if (forecastSpan <= actualSpan * compressAfterRatio) {
    const span = Math.max(1, maxMs - minMs);
    return { f: (ms) => x0 + ((ms - minMs) / span) * w, axisBreak: null };
  }

  const gap = 18;
  const wA = (w - gap) * 0.58;
  const wF = (w - gap) * 0.42;
  return {
    f: (ms) =>
      ms <= todayMs
        ? x0 + ((ms - minMs) / actualSpan) * wA
        : x0 + wA + gap + ((ms - todayMs) / forecastSpan) * wF,
    axisBreak: { x1: x0 + wA, x2: x0 + wA + gap },
  };
}

/**
 * Assemble the chart view model.
 *
 * @param points   observed cumulative series, ascending by date
 * @param scopeKm  total scope; rays terminate here
 * @param completedKm all-time completed — the rays' anchor at today. May exceed the
 *   last point when the user narrows the window, which correctly shows that the
 *   drawn line covers only part of the history.
 */
export function buildCumChart(args: {
  points: CumInputPoint[];
  scopeKm: number;
  completedKm: number;
  statusDate: string;
  rays: RaySpec[];
  width: number;
  height: number;
  maxValueLabels?: number;
  /** Bucket size of `points`; positions weekly/monthly values at period end. */
  granularity?: string;
}): CumChartVM | null {
  const { points, scopeKm, completedKm, statusDate, rays, width, height } = args;
  const maxValueLabels = args.maxValueLabels ?? 12;
  const granularity = args.granularity || 'DAILY';

  const plot = {
    x: PAD.left,
    y: PAD.top,
    w: Math.max(10, width - PAD.left - PAD.right),
    h: Math.max(10, height - PAD.top - PAD.bottom),
  };

  const usable = points.filter((p) => Number.isFinite(parseIso(p.iso)));
  const todayMs = parseIso(statusDate);
  if (!usable.length || !Number.isFinite(todayMs)) return null;

  // Plot each bucket where its cumulative value is true (period end), not at the
  // period key. Keeps the array 1:1 with the input so hover indices stay valid.
  const plotMs = usable.map((p) => bucketEndMs(p.iso, granularity, todayMs));

  const minMs = Math.min(parseIso(usable[0].iso), todayMs);
  const rayEnds = rays
    .map((r) => parseIso(r.completionDate))
    .filter((t) => Number.isFinite(t) && t > todayMs);
  // No forecast (zero pace / already complete) → still render history, just no rays.
  const maxMs = rayEnds.length ? Math.max(...rayEnds) : Math.max(todayMs, parseIso(usable[usable.length - 1].iso));

  const { f: xOf, axisBreak } = createXScale(minMs, todayMs, maxMs, plot.x, plot.w);

  // Rays stop at scope, so scope is the tallest thing on the chart.
  const dataMax = Math.max(scopeKm, completedKm, ...usable.map((p) => p.cumulativeKm));
  const yMax = dataMax > 0 ? dataMax * 1.08 : 1;
  const yOf = (km: number) => plot.y + plot.h - (km / yMax) * plot.h;

  const step = niceStep(yMax, 5);
  const yTicks: { y: number; label: string }[] = [];
  for (let v = 0; v <= yMax + step * 0.01; v += step) {
    yTicks.push({
      y: yOf(v),
      label: v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(Math.round(v)),
    });
  }

  const xTicks: { x: number; label: string }[] = [];
  if (axisBreak) {
    for (const ms of monthTicks(minMs, todayMs, 5)) xTicks.push({ x: xOf(ms), label: tickLabel(ms) });
    for (const ms of monthTicks(todayMs, maxMs, 4)) xTicks.push({ x: xOf(ms), label: tickLabel(ms) });
  } else {
    for (const ms of monthTicks(minMs, maxMs, 8)) xTicks.push({ x: xOf(ms), label: tickLabel(ms) });
  }

  const actualPoints = usable.map((p, i) => ({
    x: xOf(plotMs[i]),
    y: yOf(p.cumulativeKm),
    km: p.cumulativeKm,
    iso: p.iso,
    label: new Date(plotMs[i]).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    }),
  }));

  const todayXEarly = xOf(todayMs);
  const todayYEarly = yOf(completedKm);
  const lastPoint = actualPoints[actualPoints.length - 1];

  // Run the line through to the fork at Today. Without this the series stopped
  // short of the ray anchor and the two were drawn as disconnected fragments — most
  // visible on MONTHLY, where the final bucket could end weeks before the as-of
  // date. Only extends forward, never back, so it cannot mask missing history.
  const bridge =
    lastPoint && todayXEarly > lastPoint.x + 0.5
      ? ` L${todayXEarly.toFixed(2)} ${todayYEarly.toFixed(2)}`
      : '';

  const actualPath =
    actualPoints
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(' ') + bridge;

  // Thin the value labels: at DAILY granularity there can be 120+ points and
  // labelling each would produce an unreadable smear.
  const stride = Math.max(1, Math.ceil(actualPoints.length / maxValueLabels));
  const candidates = actualPoints.filter(
    (_, i) => i % stride === 0 || i === actualPoints.length - 1
  );
  // Stride alone isn't enough: force-including the final point can drop it right
  // next to a strided one, which overprinted two numbers into an unreadable blur.
  // Later labels win, so the end value — the one that matters most — always shows.
  const MIN_LABEL_GAP = 34;
  const kept: typeof candidates = [];
  for (const p of candidates) {
    while (kept.length && p.x - kept[kept.length - 1].x < MIN_LABEL_GAP) kept.pop();
    kept.push(p);
  }
  const valueLabels = kept.map((p) => ({ x: p.x, y: p.y, text: p.km.toFixed(2) }));

  const todayX = todayXEarly;
  const todayY = todayYEarly;

  // Label slots: stacked in the right gutter, ordered by completion date so the
  // leaders don't cross.
  const labelX = plot.x + plot.w + 10;
  const slotOrder = rays
    .map((r, i) => ({ i, ms: parseIso(r.completionDate) }))
    .sort((a, b) => (Number.isFinite(a.ms) ? a.ms : Infinity) - (Number.isFinite(b.ms) ? b.ms : Infinity))
    .map((e) => e.i);
  const SLOT_H = 26;
  const slotTop = Math.max(PAD.top + 6, yOf(scopeKm) - SLOT_H);

  const builtRays: BuiltRay[] = rays.map((r) => {
    const endMs = parseIso(r.completionDate);
    const valid = Number.isFinite(endMs) && endMs > todayMs && scopeKm > completedKm;
    const endX = valid ? xOf(endMs) : todayX;
    const endY = valid ? yOf(scopeKm) : todayY;
    const slot = slotOrder.indexOf(rays.indexOf(r));
    const labelY = slotTop + slot * SLOT_H;
    return {
      ...r,
      d: valid
        ? `M${todayX.toFixed(2)} ${todayY.toFixed(2)} L${endX.toFixed(2)} ${endY.toFixed(2)}`
        : '',
      endX,
      endY,
      endKm: valid ? scopeKm : completedKm,
      endDateLabel: formatEndDate(r.completionDate),
      daysRemaining: valid ? Math.round((endMs - todayMs) / DAY_MS) : null,
      labelX,
      labelY,
      leader: valid
        ? `M${endX.toFixed(2)} ${endY.toFixed(2)} L${(labelX - 4).toFixed(2)} ${labelY.toFixed(2)}`
        : '',
    };
  });

  return {
    width,
    height,
    plot,
    yMax,
    yTicks,
    xTicks,
    actualPath,
    actualPoints,
    valueLabels,
    rays: builtRays,
    scope: scopeKm > 0 ? { y: yOf(scopeKm), km: scopeKm, label: `Total scope ${formatKm(scopeKm)} km` } : null,
    today: { x: todayX, y: todayY, km: completedKm },
    axisBreak,
  };
}

export const _test = { niceStep, monthTicks, parseIso, ymdUTC };
