import { Injectable, computed, signal } from '@angular/core';

/** Tracks in-flight HTTP requests so a global spinner can show/hide. */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private count = signal(0);
  readonly loading = computed(() => this.count() > 0);

  start(): void {
    this.count.update((c) => c + 1);
  }

  stop(): void {
    this.count.update((c) => Math.max(0, c - 1));
  }
}
