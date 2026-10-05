import {
  DashboardReportSnapshot,
  ReportContractorRow,
  ReportFilterEntry,
  ReportOverallSummary,
  ReportPipelineRow,
  ReportRingRow,
} from './report-export.types';

export type ReportSnapshotRingRow = {
  id: string;
  name: string;
  totalKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  blockedKm: number;
  color: string;
};

export type ReportSnapshotContractorRow = {
  id: string;
  name: string;
  totalKm: number;
  completedKm: number;
  inProgressKm: number;
  pendingKm: number;
  blockedKm: number;
  onTime: number;
  delayed: number;
  blocked: number;
  color: string;
};

export type ReportSnapshotStepRow = {
  id: string;
  name: string;
  totalSegments: number;
  completed: number;
  inProgress: number;
  pending: number;
  blocked: number;
  icon: string;
};

export interface ReportSnapshotSource {
  title: string;
  eyebrow: string;
  reportingWindow: string;
  projectId: string;
  selectedContractor: string;
  selectedRing: string;
  selectedLink: string;
  selectedStep: string;
  getContractorName: (id: string) => string;
  getRingName: (id: string) => string;
  getLinkName: (id: string) => string;
  getStepName: (id: string) => string;
  totalPlanned: number | null;
  completed: number | null;
  inProgress: number | null;
  pending: number | null;
  blockedSegments: number | null;
  weeklyRate: number | null;
  completionRate: number | null;
  completionStatus: string;
  ringProgressData: ReadonlyArray<ReportSnapshotRingRow>;
  contractorChartData: ReadonlyArray<ReportSnapshotContractorRow>;
  stepProgressData: ReadonlyArray<ReportSnapshotStepRow>;
  getCompletionPct: (row: ReportSnapshotRingRow) => number;
  getStepCompletedPct: (step: ReportSnapshotStepRow) => number;
  getContractorCompletionPct: (c: ReportSnapshotContractorRow) => number;
  getStepExecutionStatus: (step: ReportSnapshotStepRow) => { label: string };
  formatNumber: (value: number | null, unit?: string) => string;
  formatPercent: (value: number | null) => string;
}

function filterLabel(id: string, allLabel: string, resolve: (id: string) => string): string {
  return !id || id === 'ALL' ? allLabel : resolve(id);
}

export function buildDashboardReportSnapshot(source: ReportSnapshotSource): DashboardReportSnapshot {
  const filters: ReportFilterEntry[] = [
    {
      label: 'Contractor',
      value: filterLabel(source.selectedContractor, 'All contractors', source.getContractorName),
    },
    {
      label: 'Ring',
      value: filterLabel(source.selectedRing, 'All rings', source.getRingName),
    },
    {
      label: 'Link',
      value: filterLabel(source.selectedLink, 'All links', source.getLinkName),
    },
    {
      label: 'Step',
      value: filterLabel(source.selectedStep, 'All steps', source.getStepName),
    },
    { label: 'Project', value: source.projectId || '—' },
  ];

  const overall: ReportOverallSummary = {
    completionRate: source.formatPercent(source.completionRate),
    completionStatus: source.completionStatus,
    totalPlanned: source.formatNumber(source.totalPlanned, 'km'),
    completed: source.formatNumber(source.completed, 'km'),
    inProgress: source.formatNumber(source.inProgress, 'km'),
    pending: source.formatNumber(source.pending, 'km'),
    blocked: source.formatNumber(source.blockedSegments, 'segments'),
    weeklyRate: source.formatNumber(source.weeklyRate, 'km/wk'),
  };

  const rings: ReportRingRow[] = source.ringProgressData.map((ring) => ({
    name: ring.name,
    totalKm: source.formatNumber(ring.totalKm, 'km'),
    completedKm: source.formatNumber(ring.completedKm, 'km'),
    inProgressKm: source.formatNumber(ring.inProgressKm, 'km'),
    pendingKm: source.formatNumber(ring.pendingKm, 'km'),
    blockedKm: source.formatNumber(ring.blockedKm, 'km'),
    completionPct: source.formatPercent(source.getCompletionPct(ring)),
  }));

  const contractors: ReportContractorRow[] = source.contractorChartData.map((c, index) => {
    const completionPct = source.getContractorCompletionPct(c);
    return {
      rank: index + 1,
      name: c.name,
      totalKm: source.formatNumber(c.totalKm, 'km'),
      completedKm: source.formatNumber(c.completedKm, 'km'),
      inProgressKm: source.formatNumber(c.inProgressKm, 'km'),
      pendingKm: source.formatNumber(c.pendingKm, 'km'),
      blockedKm: source.formatNumber(c.blockedKm, 'km'),
      completionPct: source.formatPercent(completionPct),
      onTime: source.formatPercent(c.onTime),
      status: c.onTime >= 75 ? 'On Track' : c.onTime >= 50 ? 'At Risk' : 'Delayed',
    };
  });

  const pipeline: ReportPipelineRow[] = source.stepProgressData.map((step) => ({
    step: step.name,
    completedPct: source.formatPercent(source.getStepCompletedPct(step)),
    done: step.completed,
    active: step.inProgress,
    queued: step.pending,
    blocked: step.blocked,
    status: source.getStepExecutionStatus(step).label,
  }));

  return {
    brandName: 'NEOXTECH',
    brandTagline: 'Simplify AI',
    title: source.title,
    eyebrow: source.eyebrow,
    reportingWindow: source.reportingWindow,
    projectId: source.projectId,
    generatedAt: new Date(),
    filters,
    overall,
    rings,
    contractors,
    pipeline,
  };
}
