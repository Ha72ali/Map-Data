import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

export type RccTooltipAccent = 'completed' | 'progress' | 'pending' | 'blocked' | 'planned' | 'neutral';

export interface RccTooltipRow {
  label: string;
  value: string;
  muted?: boolean;
}

export interface RccTooltipPayload {
  title: string;
  accent?: RccTooltipAccent;
  rows: RccTooltipRow[];
  footnote?: string;
}

@Component({
  selector: 'app-rcc-floating-tooltip',
  templateUrl: './rcc-floating-tooltip.component.html',
  styleUrls: ['./rcc-floating-tooltip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RccFloatingTooltipComponent implements OnChanges {
  @Input({ required: true }) payload!: RccTooltipPayload;
  @Input() x = 0;
  @Input() y = 0;

  /** Clamped position for fixed viewport placement. */
  posX = 0;
  posY = 0;

  private static readonly EST_W = 248;
  private static readonly EST_H = 168;
  private static readonly PAD = 10;
  private static readonly OFFSET = 14;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['x'] || changes['y']) {
      this.clampPosition();
    }
  }

  private clampPosition(): void {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 768;
    const w = RccFloatingTooltipComponent.EST_W;
    const h = RccFloatingTooltipComponent.EST_H;
    const pad = RccFloatingTooltipComponent.PAD;
    const off = RccFloatingTooltipComponent.OFFSET;

    let nx = this.x + off;
    let ny = this.y + off;

    if (nx + w > vw - pad) {
      nx = this.x - w - off;
    }
    if (ny + h > vh - pad) {
      ny = this.y - h - off;
    }

    this.posX = Math.max(pad, Math.min(nx, vw - w - pad));
    this.posY = Math.max(pad, Math.min(ny, vh - h - pad));
  }
}
