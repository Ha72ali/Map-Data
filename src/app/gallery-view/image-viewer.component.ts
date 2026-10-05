import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import type { ViewerImage } from './gallery.types';

/** Zoom bounds. Below 0.25× the image is unreadable; above 8× it is mush. */
const MIN_SCALE = 0.25;
const MAX_SCALE = 8;
/** Where a double-click lands when zooming in from fit. */
const DOUBLE_CLICK_SCALE = 2.5;
/** Multiplier per toolbar +/- press and per keyboard +/-. */
const STEP = 1.4;

/**
 * Full-screen image viewer with zoom and pan.
 *
 * Zoom is a CSS transform on the <img> inside an overflow-hidden frame, so it
 * costs nothing until used and never re-requests the image. The transform
 * origin is the frame's centre, hence the `t + s·u` arithmetic in `zoomAt` —
 * that is what keeps the point under the cursor fixed while scaling.
 */
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css'],
})
export class ImageViewerComponent implements OnChanges {
  @Input() tiles: ViewerImage[] = [];
  @Input() index = 0;
  /** Shifts the frame left so the open Detail panel doesn't cover the image. */
  @Input() detailOpen = false;

  @Output() indexChange = new EventEmitter<number>();
  @Output() closed = new EventEmitter<void>();
  @Output() detailToggled = new EventEmitter<void>();

  @ViewChild('frame') frameRef?: ElementRef<HTMLDivElement>;
  @ViewChild('image') imageRef?: ElementRef<HTMLImageElement>;

  scale = 1;
  /** Translation in frame pixels, applied before the scale. */
  translateX = 0;
  translateY = 0;

  imageFailed = false;

  /** Active pointers, for drag-pan and two-finger pinch. */
  private readonly pointers = new Map<number, { x: number; y: number }>();
  private panFrom: { x: number; y: number } | null = null;
  private pinchFrom: { distance: number; scale: number } | null = null;

  get tile(): ViewerImage | null {
    return this.tiles[this.index] ?? null;
  }

  get total(): number {
    return this.tiles.length;
  }

  get hasPrev(): boolean {
    return this.index > 0;
  }

  get hasNext(): boolean {
    return this.index < this.tiles.length - 1;
  }

  get zoomPercent(): number {
    return Math.round(this.scale * 100);
  }

  get canZoomIn(): boolean {
    return this.scale < MAX_SCALE - 1e-6;
  }

  get canZoomOut(): boolean {
    return this.scale > MIN_SCALE + 1e-6;
  }

  get transform(): string {
    return `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
  }

  /** A fresh image starts at fit, never inheriting the previous one's zoom. */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] || changes['tiles']) {
      this.resetZoom();
      this.imageFailed = false;
    }
  }

  // ── Navigation ──────────────────────────────────────────────────────────

  prev(): void {
    if (this.hasPrev) this.indexChange.emit(this.index - 1);
  }

  next(): void {
    if (this.hasNext) this.indexChange.emit(this.index + 1);
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    // Only a click on the backdrop itself closes — not one that bubbled up
    // from the image, the toolbar or an arrow.
    if (event.target === event.currentTarget) this.close();
  }

  onImageError(): void {
    this.imageFailed = true;
  }

  // ── Zoom ────────────────────────────────────────────────────────────────

  resetZoom(): void {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  zoomIn(): void {
    this.zoomBy(STEP);
  }

  zoomOut(): void {
    this.zoomBy(1 / STEP);
  }

  /** Scale about the frame centre — what the toolbar buttons and keys use. */
  private zoomBy(factor: number): void {
    this.applyScale(this.scale * factor, 0, 0);
  }

  /** Show the image at its native pixel size (100% of the source resolution). */
  actualSize(): void {
    const img = this.imageRef?.nativeElement;
    if (!img || !img.clientWidth || !img.naturalWidth) return;
    this.applyScale(img.naturalWidth / img.clientWidth, 0, 0);
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    // Exponential so a trackpad's small deltas and a mouse wheel's large ones
    // both feel proportional.
    const factor = Math.exp(-event.deltaY * 0.0015);
    const { x, y } = this.pointInFrame(event.clientX, event.clientY);
    this.applyScale(this.scale * factor, x, y);
  }

  onDoubleClick(event: MouseEvent): void {
    const { x, y } = this.pointInFrame(event.clientX, event.clientY);
    if (this.scale > 1.01) {
      this.resetZoom();
    } else {
      this.applyScale(DOUBLE_CLICK_SCALE, x, y);
    }
  }

  /** Cursor position relative to the frame's centre, in frame pixels. */
  private pointInFrame(clientX: number, clientY: number): { x: number; y: number } {
    const frame = this.frameRef?.nativeElement;
    if (!frame) return { x: 0, y: 0 };
    const rect = frame.getBoundingClientRect();
    return {
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2),
    };
  }

  /**
   * Set the scale while holding the frame point (ax, ay) over the same part of
   * the image.
   *
   * With transform-origin at the centre, a point at image offset u renders at
   * p = t + s·u. Holding p fixed across s → s' gives t' = p − s'·(p − t)/s.
   */
  private applyScale(nextScale: number, ax: number, ay: number): void {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
    if (Math.abs(clamped - this.scale) < 1e-6) return;
    const ratio = clamped / this.scale;
    this.translateX = ax - ratio * (ax - this.translateX);
    this.translateY = ay - ratio * (ay - this.translateY);
    this.scale = clamped;
    this.clampTranslation();
  }

  /**
   * Keep the image covering the frame while it is larger than the frame, and
   * pinned to the centre while it is smaller — so it can never be dragged off
   * into empty space.
   */
  private clampTranslation(): void {
    const frame = this.frameRef?.nativeElement;
    const img = this.imageRef?.nativeElement;
    if (!frame || !img || !img.clientWidth) return;
    const maxX = Math.max(0, (img.clientWidth * this.scale - frame.clientWidth) / 2);
    const maxY = Math.max(0, (img.clientHeight * this.scale - frame.clientHeight) / 2);
    this.translateX = Math.min(maxX, Math.max(-maxX, this.translateX));
    this.translateY = Math.min(maxY, Math.max(-maxY, this.translateY));
  }

  // ── Pan + pinch ─────────────────────────────────────────────────────────

  onPointerDown(event: PointerEvent): void {
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);

    if (this.pointers.size === 2) {
      this.panFrom = null;
      this.pinchFrom = { distance: this.pointerDistance(), scale: this.scale };
    } else if (this.pointers.size === 1 && this.scale > 1.01) {
      this.panFrom = { x: event.clientX, y: event.clientY };
    }
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.pointers.has(event.pointerId)) return;
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (this.pinchFrom && this.pointers.size === 2) {
      const distance = this.pointerDistance();
      if (this.pinchFrom.distance > 0) {
        const midpoint = this.pointerMidpoint();
        const { x, y } = this.pointInFrame(midpoint.x, midpoint.y);
        this.applyScale(this.pinchFrom.scale * (distance / this.pinchFrom.distance), x, y);
      }
      return;
    }

    if (this.panFrom) {
      this.translateX += event.clientX - this.panFrom.x;
      this.translateY += event.clientY - this.panFrom.y;
      this.panFrom = { x: event.clientX, y: event.clientY };
      this.clampTranslation();
    }
  }

  onPointerUp(event: PointerEvent): void {
    this.pointers.delete(event.pointerId);
    if (this.pointers.size < 2) this.pinchFrom = null;
    if (this.pointers.size === 0) this.panFrom = null;
  }

  private pointerDistance(): number {
    const [a, b] = [...this.pointers.values()];
    if (!a || !b) return 0;
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  private pointerMidpoint(): { x: number; y: number } {
    const [a, b] = [...this.pointers.values()];
    if (!a || !b) return { x: 0, y: 0 };
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  /** True while the image is larger than its frame, so panning is possible. */
  get isPannable(): boolean {
    return this.scale > 1.01;
  }

  // ── Keyboard ────────────────────────────────────────────────────────────

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      // Escape unwinds one level at a time: the Detail panel first, then the
      // viewer — so a stray press doesn't discard the whole context.
      case 'Escape':
        if (this.detailOpen) { this.detailToggled.emit(); } else { this.close(); }
        break;
      case 'ArrowLeft': this.prev(); break;
      case 'ArrowRight': this.next(); break;
      case '+': case '=': this.zoomIn(); break;
      case '-': case '_': this.zoomOut(); break;
      case '0': this.resetZoom(); break;
      default: return;
    }
    event.preventDefault();
  }
}
