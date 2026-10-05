import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  ReportExportFormat,
  ReportExportRequest,
  ReportSectionOptions,
} from './report-export.types';

const DEFAULT_SECTIONS: ReportSectionOptions = {
  overallProgress: true,
  ringProgress: true,
  contractorPerformance: true,
  constructionPipeline: true,
  currentFilters: true,
  chartsGraphs: true,
};

@Component({
  selector: 'app-report-export-modal',
  templateUrl: './report-export-modal.component.html',
  styleUrls: ['./report-export-modal.component.css'],
})
export class ReportExportModalComponent {
  @Input() open = false;
  @Input() loading = false;
  @Input() progressMessage = '';
  @Input() errorMessage = '';

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<ReportExportRequest>();

  format: ReportExportFormat = 'pdf';
  sections: ReportSectionOptions = { ...DEFAULT_SECTIONS };

  readonly formatOptions: Array<{ id: ReportExportFormat; label: string; hint: string }> = [
    { id: 'pdf', label: 'PDF', hint: 'Branded layout with tables and chart snapshots' },
    { id: 'excel', label: 'Excel', hint: 'Multi-sheet workbook (.xlsx)' },
    { id: 'csv', label: 'CSV', hint: 'Single file with section blocks' },
  ];

  readonly sectionOptions: Array<{ key: keyof ReportSectionOptions; label: string; hint: string }> = [
    { key: 'overallProgress', label: 'Overall Progress', hint: 'Rollout completion summary' },
    { key: 'ringProgress', label: 'Ring Progress', hint: 'Per-ring km and completion' },
    { key: 'contractorPerformance', label: 'Contractor Performance', hint: 'Leaderboard and status' },
    { key: 'constructionPipeline', label: 'Construction Pipeline', hint: 'Execution monitor by phase' },
    { key: 'currentFilters', label: 'Current Filters', hint: 'Active scope selections' },
    { key: 'chartsGraphs', label: 'Charts / Graphs', hint: 'Visual snapshot of command center' },
  ];

  get canExport(): boolean {
    return Object.values(this.sections).some(Boolean) && !this.loading;
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.loading) return;
    if ((event.target as HTMLElement).classList.contains('report-export-backdrop')) {
      this.closed.emit();
    }
  }

  onSectionToggle(key: keyof ReportSectionOptions, checked: boolean): void {
    this.sections = { ...this.sections, [key]: checked };
  }

  selectAllSections(): void {
    this.sections = {
      overallProgress: true,
      ringProgress: true,
      contractorPerformance: true,
      constructionPipeline: true,
      currentFilters: true,
      chartsGraphs: true,
    };
  }

  clearSections(): void {
    this.sections = {
      overallProgress: false,
      ringProgress: false,
      contractorPerformance: false,
      constructionPipeline: false,
      currentFilters: false,
      chartsGraphs: false,
    };
  }

  submit(): void {
    if (!this.canExport) return;
    this.confirmed.emit({
      format: this.format,
      sections: { ...this.sections },
    });
  }

  cancel(): void {
    if (this.loading) return;
    this.closed.emit();
  }
}
