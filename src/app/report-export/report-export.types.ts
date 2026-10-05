export type ReportExportFormat = 'pdf' | 'excel' | 'csv';

export interface ReportSectionOptions {
  overallProgress: boolean;
  ringProgress: boolean;
  contractorPerformance: boolean;
  constructionPipeline: boolean;
  currentFilters: boolean;
  chartsGraphs: boolean;
}

export interface ReportExportRequest {
  format: ReportExportFormat;
  sections: ReportSectionOptions;
}

export interface ReportFilterEntry {
  label: string;
  value: string;
}

export interface ReportOverallSummary {
  completionRate: string;
  completionStatus: string;
  totalPlanned: string;
  completed: string;
  inProgress: string;
  pending: string;
  blocked: string;
  weeklyRate: string;
}

export interface ReportRingRow {
  name: string;
  totalKm: string;
  completedKm: string;
  inProgressKm: string;
  pendingKm: string;
  blockedKm: string;
  completionPct: string;
}

export interface ReportContractorRow {
  rank: number;
  name: string;
  totalKm: string;
  completedKm: string;
  inProgressKm: string;
  pendingKm: string;
  blockedKm: string;
  completionPct: string;
  onTime: string;
  status: string;
}

export interface ReportPipelineRow {
  step: string;
  completedPct: string;
  done: number;
  active: number;
  queued: number;
  blocked: number;
  status: string;
}

export interface DashboardReportSnapshot {
  brandName: string;
  brandTagline: string;
  title: string;
  eyebrow: string;
  reportingWindow: string;
  projectId: string;
  generatedAt: Date;
  filters: ReportFilterEntry[];
  overall: ReportOverallSummary;
  rings: ReportRingRow[];
  contractors: ReportContractorRow[];
  pipeline: ReportPipelineRow[];
}

/** DOM selectors for optional chart screenshots (no API refetch). */
export const REPORT_CAPTURE_SELECTORS = {
  overallProgress: '[data-report-section="overall-progress"]',
  ringProgress: '[data-report-section="ring-progress"]',
  contractorPerformance: '[data-report-section="contractor-performance"]',
  constructionPipeline: '[data-report-section="construction-pipeline"]',
  chartsGraphs: '[data-report-section="charts-graphs"]',
} as const;

export type ReportCaptureSectionKey = keyof typeof REPORT_CAPTURE_SELECTORS;
