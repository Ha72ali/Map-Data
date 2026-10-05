import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DashboardFilterState, type FilterType } from './dashboard-filter-state';

/**
 * Contractor / Ring / Project / Phase / Trenching multi-select bar.
 *
 * Presentational only — every selection is held by the injected
 * DashboardFilterState, so the GIS map and the Gallery share one behaviour.
 * Hosts can project extra controls (e.g. the GIS view's Export KMZ menu) into
 * the inline row via <ng-content>.
 *
 * Below 1125px the inline row is replaced by a compact "Filters" trigger and a
 * modal, matching the GIS view's original responsive behaviour.
 *
 * `layout="drawer"` drops the inline row entirely for a round "Filters" FAB
 * that opens a right-edge drawer (the GIS view uses this). The FAB is
 * absolutely positioned, so the host places the component inside whichever
 * positioned element's corner it should sit in.
 */
@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit, OnDestroy, OnChanges {
  @Input({ required: true }) state!: DashboardFilterState;
  /** Drives the in-button spinner and disables Apply while a reload runs. */
  @Input() applying = false;
  /** Inline row (default) or FAB + right-edge drawer. */
  @Input() layout: 'inline' | 'drawer' = 'inline';

  @Output() apply = new EventEmitter<void>();

  /** Compact "Filters" modal shown on narrow (<1125px) viewports. */
  mobileFilterOpen = false;
  /** Right-edge drawer, used when layout is 'drawer'. */
  drawerOpen = false;

  private readonly documentClickBound = this.onDocumentClick.bind(this);

  ngOnInit(): void {
    document.addEventListener('click', this.documentClickBound);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickBound);
  }

  /**
   * Close the mobile modal once the host finishes applying, so the spinner
   * stays visible for the whole reload instead of the modal vanishing first.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const applying = changes['applying'];
    if (applying && applying.previousValue === true && applying.currentValue === false) {
      this.mobileFilterOpen = false;
      this.drawerOpen = false;
    }
  }

  private onDocumentClick(): void {
    this.state?.closeAllDropdowns();
  }

  toggleDropdown(type: FilterType, event: Event): void {
    this.state.toggleDropdown(type, event);
  }

  emitApply(): void {
    this.state.closeAllDropdowns();
    this.apply.emit();
  }

  openMobileFilterModal(): void {
    this.mobileFilterOpen = true;
    this.state.closeAllDropdowns();
  }

  cancelMobileFilterModal(): void {
    this.mobileFilterOpen = false;
    this.state.closeAllDropdowns();
  }

  toggleDrawer(event: Event): void {
    // The document listener that closes the multi-selects also sees this click.
    event.stopPropagation();
    this.drawerOpen = !this.drawerOpen;
    this.state.closeAllDropdowns();
  }

  closeDrawer(): void {
    this.drawerOpen = false;
    this.state.closeAllDropdowns();
  }

  /**
   * Drop every selection back to "all" without leaving the drawer. Nothing
   * reloads (and the FAB count stays) until Apply.
   */
  clearAll(): void {
    for (const type of ['contractor', 'ring', 'project', 'phase', 'trenching'] as FilterType[]) {
      this.state.clear(type);
    }
  }
}
