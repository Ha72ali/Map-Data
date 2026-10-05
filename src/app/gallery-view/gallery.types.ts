import type { PhaseSegment } from '../dashboard.service';

/**
 * The minimum one image needs to be shown in ImageViewerComponent.
 *
 * Kept separate from GalleryTile so the GIS map's Link Details panel can open
 * the same viewer over a plain list of proof URLs, without inventing a segment
 * row it does not have.
 */
export interface ViewerImage {
  /** Stable identity, used for change detection and de-duplication. */
  key: string;
  url: string;
  /** Caption headline, e.g. "Segment #142". */
  label: string;
  phaseName?: string;
  routeName?: string;
}

/** One image in the Gallery grid, with the segment context it came from. */
export interface GalleryTile extends ViewerImage {
  segmentId: string | number;
  phaseName: string;
  routeName: string;
  contractorName: string;
  /** Raw segment row — feeds the Detail panel's rows and its mini map. */
  segment: PhaseSegment;
}

/** A phase folder shown while no phase is selected. */
export interface PhaseFolder {
  phaseName: string;
  /** Numeric phase id, or null when the phase has no segment geometry. */
  phaseId: number | null;
  /** Planned length from phase-kpi-summary, or null when it has no row there. */
  plannedKm: number | null;
  /** Completion % from phase-kpi-summary, or null when unavailable. */
  completionPercent: number | null;
  /**
   * Segments in scope for this phase, or null until it has been opened.
   * Upstream has no per-phase count endpoint, so this can only be known once
   * the phase's segments have actually been fetched.
   */
  segmentCount: number | null;
  /** Photos found, or null until every page of the phase has been resolved. */
  photoCount: number | null;
}
