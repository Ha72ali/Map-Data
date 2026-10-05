import { Injectable } from '@angular/core';
import axios from 'axios';
import { apiBaseUrl } from '../api-base';
import { upstreamApi } from './upstream-api.service';
import { portalBearerToken } from '../core/services/external-session.service';

/**
 * Fetches construction images for a segment from the backend proof/geophoto
 * proxies (see server/routes/media.js). Results are cached per segment so
 * re-clicking a route is instant.
 */
@Injectable({ providedIn: 'root' })
export class SegmentMediaService {
  private readonly cache = new Map<string, string[]>();
  private readonly proofsCache = new Map<string, any[]>();

  /**
   * Max simultaneous media requests, application-wide.
   *
   * The Gallery resolves one segment's photos per tile, so an unbounded grid
   * would fire hundreds of requests at once — the contractor API drops
   * connections when too many overlap (the same reason segment phases are
   * fetched serially). Six keeps the grid filling quickly without that.
   */
  private static readonly MAX_CONCURRENT_MEDIA = 6;
  private activeRequests = 0;
  private readonly waiting: Array<() => void> = [];
  /** In-flight loads keyed the same way as `cache`, so two tiles asking for
   *  the same segment share one request instead of racing. */
  private readonly inFlight = new Map<string, Promise<string[]>>();

  private acquireSlot(): Promise<void> {
    if (this.activeRequests < SegmentMediaService.MAX_CONCURRENT_MEDIA) {
      this.activeRequests++;
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => this.waiting.push(resolve));
  }

  private releaseSlot(): void {
    const next = this.waiting.shift();
    if (next) {
      next(); // hands the slot straight over — activeRequests stays put
    } else {
      this.activeRequests--;
    }
  }

  /**
   * `loadSegmentImages` behind a global concurrency cap and in-flight dedupe.
   *
   * Use this for anything that resolves many segments at once (the Gallery
   * grid); a single-segment click can call `loadSegmentImages` directly.
   * Cached segments return immediately without taking a slot.
   */
  async loadSegmentImagesQueued(
    segmentId: string | number,
    contractor?: string | null
  ): Promise<string[]> {
    const key = `${contractor ?? ''}::${segmentId}`;
    const cached = this.cache.get(key);
    if (cached) return cached;

    const existing = this.inFlight.get(key);
    if (existing) return existing;

    const run = (async () => {
      await this.acquireSlot();
      try {
        return await this.loadSegmentImages(segmentId, contractor);
      } finally {
        this.releaseSlot();
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, run);
    return run;
  }

  /**
   * Raw proof metadata for a segment (routeName, ringName, projectName,
   * uploadedBy, verdict, createdAt, …). Used to enrich the Overview tab.
   * Returns [] on any error.
   */
  async loadSegmentProofs(
    segmentId: string | number,
    contractor?: string | null
  ): Promise<any[]> {
    const key = `${contractor ?? ''}::${segmentId}`;
    const cached = this.proofsCache.get(key);
    if (cached) return cached;
    const c = contractor ? `?contractor=${encodeURIComponent(contractor)}` : '';
    let proofs: any[] = [];
    if (upstreamApi.supports('proofs')) {
      // Direct mode: one backend, so no ?contractor slot-routing hint needed.
      proofs = (await upstreamApi.getSegmentProofs(segmentId)) as any[];
    } else {
      try {
        const data = await this.get(`/api/proofs/segment/${encodeURIComponent(String(segmentId))}${c}`);
        proofs = this.asArray(data);
      } catch {
        proofs = [];
      }
    }
    this.proofsCache.set(key, proofs);
    return proofs;
  }

  /** Absolute URL for a proof download (streamed image). */
  proofDownloadUrl(proofId: string | number, contractor?: string | null): string {
    if (upstreamApi.enabled) {
      return upstreamApi.proofDownloadUrl(proofId);
    }
    const base = `${apiBaseUrl()}/api/proofs/download/${encodeURIComponent(String(proofId))}`;
    return contractor ? `${base}?contractor=${encodeURIComponent(contractor)}` : base;
  }

  /**
   * Load image URLs for a segment. Tries geophotos first, then proofs.
   * `contractor` is required to hit the right backend — segment ids are
   * per-contractor and collide across backends. Returns [] on any error.
   */
  async loadSegmentImages(
    segmentId: string | number,
    contractor?: string | null
  ): Promise<string[]> {
    // Cache per (segment, contractor) so the same id on two backends can't clash.
    const key = `${contractor ?? ''}::${segmentId}`;
    const cached = this.cache.get(key);
    if (cached) return cached;

    const c = contractor ? `?contractor=${encodeURIComponent(contractor)}` : '';
    const id = encodeURIComponent(String(segmentId));
    const urls: string[] = [];
    const useUpstream = upstreamApi.supports('proofs');

    // The contractor API has no /api/geophotos route (verified 404), so in
    // direct mode go straight to proofs rather than burn a request per click.
    if (!useUpstream) {
      try {
        const geo = await this.get(`/api/geophotos/segment/${id}${c}`);
        urls.push(...this.extractUrls(geo));
      } catch {
        /* geophotos optional */
      }
    }

    if (urls.length === 0) {
      try {
        const proofs = useUpstream
          ? await upstreamApi.getSegmentProofs(segmentId)
          : await this.get(`/api/proofs/segment/${id}${c}`);
        for (const p of this.asArray(proofs)) {
          const direct = this.firstUrl(p);
          if (direct) {
            urls.push(direct);
          } else if (p && (p.id != null || p.proofId != null)) {
            urls.push(this.proofDownloadUrl(p.id ?? p.proofId, contractor));
          }
        }
      } catch {
        /* no proofs */
      }
    }

    const deduped = Array.from(new Set(urls));
    this.cache.set(key, deduped);
    return deduped;
  }

  private async get(path: string): Promise<unknown> {
    // Bare axios — not covered by Angular's authInterceptor, so attach the
    // portal token here too (no-op when portal mode is off).
    const token = portalBearerToken();
    const res = await axios.get(`${apiBaseUrl()}${path}`, {
      timeout: 15000,
      headers: token ? { Authorization: token } : undefined,
    });
    return res.data;
  }

  private asArray(data: unknown): any[] {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      for (const key of ['photos', 'images', 'proofs', 'data', 'items', 'results']) {
        if (Array.isArray(obj[key])) return obj[key] as any[];
      }
    }
    return [];
  }

  private extractUrls(data: unknown): string[] {
    const out: string[] = [];
    for (const item of this.asArray(data)) {
      const url = this.firstUrl(item);
      if (url) out.push(url);
    }
    return out;
  }

  private firstUrl(item: unknown): string | null {
    if (typeof item === 'string') {
      return item.startsWith('http') || item.startsWith('/') ? item : null;
    }
    if (item && typeof item === 'object') {
      const o = item as Record<string, unknown>;
      for (const key of ['url', 'fileUrl', 'imageUrl', 'photoUrl', 'src', 'path']) {
        const v = o[key];
        if (typeof v === 'string' && (v.startsWith('http') || v.startsWith('/'))) {
          return v;
        }
      }
    }
    return null;
  }
}
