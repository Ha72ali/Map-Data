import { Component, OnInit } from '@angular/core';
import { getPlannedVsActual, PlannedVsActualBucket } from '../dashboard.service';

interface EvaluationCard {
  label: string;
  value: string;
  color: 'green' | 'red' | 'neutral';
}

interface ProjectRow {
  type: string;
  onTime: string;
  delayed: string;
  ahead: string;
}

interface SiteType {
  label: string;
  count: number;
}

@Component({
  selector: 'app-program-dashboard',
  templateUrl: './program-dashboard.component.html',
  styleUrls: ['./program-dashboard.component.css'],
})
export class ProgramDashboardComponent implements OnInit {
  pvaData: PlannedVsActualBucket[] = [];
  pvaLoading = false;
  pvaMaxKm = 0;

  async ngOnInit(): Promise<void> {
    this.pvaLoading = true;
    try {
      const res = await getPlannedVsActual({ granularity: 'monthly' });
      this.pvaData = res?.buckets?.length > 1 ? res.buckets : ProgramDashboardComponent.PVA_DEMO;
    } catch {
      this.pvaData = ProgramDashboardComponent.PVA_DEMO;
    }
    this.pvaMaxKm = Math.max(...this.pvaData.map(b => Math.max(b.plannedKm, b.actualKm)), 1);
    this.pvaLoading = false;
  }

  pvaBarHeight(value: number): number {
    return this.pvaMaxKm > 0 ? (value / this.pvaMaxKm) * 100 : 0;
  }

  private static readonly PVA_DEMO: PlannedVsActualBucket[] = [
    { period: 'Jan', plannedKm: 320, actualKm: 280 },
    { period: 'Feb', plannedKm: 480, actualKm: 410 },
    { period: 'Mar', plannedKm: 650, actualKm: 590 },
    { period: 'Apr', plannedKm: 830, actualKm: 780 },
    { period: 'May', plannedKm: 1050, actualKm: 940 },
    { period: 'Jun', plannedKm: 1280, actualKm: 1120 },
    { period: 'Jul', plannedKm: 1520, actualKm: 1350 },
    { period: 'Aug', plannedKm: 1780, actualKm: 1610 },
    { period: 'Sep', plannedKm: 2020, actualKm: 1850 },
    { period: 'Oct', plannedKm: 2250, actualKm: 2080 },
    { period: 'Nov', plannedKm: 2450, actualKm: 2290 },
    { period: 'Dec', plannedKm: 2650, actualKm: 2480 },
  ];

  rollout = {
    actual: 558,
    planned: 661,
    total: 1046,
    projected: 663,
    projectedLabel: 'N300',
  };

  earnedValue: EvaluationCard[] = [
    { label: 'Planned value', value: '627.36K', color: 'green' },
    { label: 'Actual cost', value: '498.01K', color: 'green' },
    { label: 'Earned value', value: '528.66K', color: 'green' },
    { label: 'Estimate at completion', value: '1,044K', color: 'neutral' },
    { label: 'Cost variance', value: '30.6K', color: 'green' },
    { label: 'Schedule variance', value: '-98.7K', color: 'red' },
  ];

  gauges = {
    cpi: 0.84,
    spi: 0.76,
  };

  siteTypes: SiteType[] = [
    { label: 'Aggregated Node 1', count: 18 },
    { label: 'Aggregated Node 2', count: 7 },
    { label: 'Distribution Hub', count: 12 },
    { label: 'Access Point', count: 24 },
  ];

  projects: ProjectRow[] = [
    { type: 'New', onTime: '37 (13)', delayed: '101 (9)', ahead: '93 (27)' },
    { type: 'Upgrade', onTime: '22 (8)', delayed: '45 (5)', ahead: '31 (12)' },
    { type: 'Maintenance', onTime: '15 (4)', delayed: '28 (3)', ahead: '19 (7)' },
  ];

  get cpiNeedleAngle(): number {
    return this.gaugeAngle(this.gauges.cpi, 0, 2);
  }

  get spiNeedleAngle(): number {
    return this.gaugeAngle(this.gauges.spi, 0, 2);
  }

  private gaugeAngle(value: number, min: number, max: number): number {
    const clamped = Math.min(Math.max(value, min), max);
    const ratio = (clamped - min) / (max - min);
    return -90 + ratio * 180;
  }
}
