import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manhours-dashboard',
  templateUrl: './manhours-dashboard.component.html',
  styleUrls: ['./manhours-dashboard.component.css']
})
export class ManhoursDashboardComponent implements OnInit {
  Math = Math;
  selectedProject = 'All';
  selectedPeriod = 'Monthly';
  selectedCategory = 'All';

  // KPI cards
  kpiCards = [
    { title: 'Budgeted Hours', value: '48,500', unit: 'hrs', change: 0, direction: 'neutral', color: 'blue', icon: 'clock' },
    { title: 'Utilized Hours', value: '32,180', unit: 'hrs', change: 8.5, direction: 'up', color: 'green', icon: 'check' },
    { title: 'Idle Hours', value: '6,320', unit: 'hrs', change: 12.3, direction: 'up', color: 'red', icon: 'pause' },
    { title: 'Efficiency Rate', value: '83.6', unit: '%', change: 2.1, direction: 'up', color: 'purple', icon: 'zap' }
  ];

  // Cost KPIs
  costCards = [
    { title: 'Budgeted Labor Cost', value: '$1.94M', change: 0, direction: 'neutral', color: '#3b82f6' },
    { title: 'Actual Labor Cost', value: '$1.52M', change: 5.2, direction: 'down', color: '#22c55e' },
    { title: 'Cost Overrun', value: '$85K', change: 3.8, direction: 'up', color: '#ef4444' },
    { title: 'Cost / Productive Hr', value: '$47.2', change: 1.5, direction: 'down', color: '#8b5cf6' }
  ];

  // Projects data
  allProjects = [
    { name: 'Marina Tower', zone: 'Zone A', budgeted: 12000, utilized: 9800, idle: 1200, efficiency: 81.7, costBudget: 480000, costActual: 392000, status: 'Active', category: 'Softscape' },
    { name: 'Palm Gateway', zone: 'Zone B', budgeted: 8500, utilized: 7200, idle: 800, efficiency: 84.7, costBudget: 340000, costActual: 288000, status: 'Active', category: 'Hardscape' },
    { name: 'Creek Harbour', zone: 'Zone A', budgeted: 6000, utilized: 5100, idle: 500, efficiency: 85.0, costBudget: 240000, costActual: 204000, status: 'Active', category: 'Softscape' },
    { name: 'Al Maktoum Park', zone: 'Zone C', budgeted: 9500, utilized: 6800, idle: 1800, efficiency: 71.6, costBudget: 380000, costActual: 312000, status: 'Delayed', category: 'Irrigation' },
    { name: 'DIFC Green', zone: 'Zone B', budgeted: 4500, utilized: 3900, idle: 320, efficiency: 86.7, costBudget: 180000, costActual: 156000, status: 'Active', category: 'Softscape' },
    { name: 'Sports City Landscape', zone: 'Zone D', budgeted: 7500, utilized: 5200, idle: 1500, efficiency: 69.3, costBudget: 300000, costActual: 260000, status: 'Delayed', category: 'Hardscape' },
    { name: 'Bluewaters Garden', zone: 'Zone A', budgeted: 3500, utilized: 3100, idle: 200, efficiency: 88.6, costBudget: 140000, costActual: 124000, status: 'Completed', category: 'Softscape' },
    { name: 'Downtown Oasis', zone: 'Zone C', budgeted: 5000, utilized: 4080, idle: 600, efficiency: 81.6, costBudget: 200000, costActual: 176000, status: 'Active', category: 'Irrigation' }
  ];

  filteredProjects: any[] = [];

  // Weekly burn rate data
  burnRateData = [
    { week: 'W1', planned: 2800, actual: 2100, idle: 400 },
    { week: 'W2', planned: 3200, actual: 2800, idle: 250 },
    { week: 'W3', planned: 3500, actual: 3100, idle: 300 },
    { week: 'W4', planned: 3800, actual: 3400, idle: 280 },
    { week: 'W5', planned: 4000, actual: 3200, idle: 550 },
    { week: 'W6', planned: 4200, actual: 3800, idle: 320 },
    { week: 'W7', planned: 4500, actual: 3900, idle: 450 },
    { week: 'W8', planned: 4800, actual: 4200, idle: 380 }
  ];

  // Labor category distribution
  laborCategories = [
    { name: 'Softscape', hours: 14200, percent: 44, color: '#22c55e' },
    { name: 'Hardscape', hours: 9800, percent: 30, color: '#3b82f6' },
    { name: 'Irrigation', hours: 5400, percent: 17, color: '#f59e0b' },
    { name: 'Maintenance', hours: 2780, percent: 9, color: '#8b5cf6' }
  ];

  // Idle hours by reason
  idleReasons = [
    { reason: 'Site Handover Delay', hours: 3200, percent: 50.6, color: '#ef4444' },
    { reason: 'Material Shortage', hours: 1100, percent: 17.4, color: '#f59e0b' },
    { reason: 'Weather Conditions', hours: 850, percent: 13.4, color: '#3b82f6' },
    { reason: 'Equipment Breakdown', hours: 620, percent: 9.8, color: '#8b5cf6' },
    { reason: 'Other', hours: 550, percent: 8.7, color: '#6b7280' }
  ];

  // Handover delay tracker
  handoverDelays = [
    { project: 'Al Maktoum Park', plannedDate: '2024-01-15', actualDate: '2024-03-10', delayDays: 55, idleHoursCost: '$72K', status: 'Handed Over' },
    { project: 'Sports City Landscape', plannedDate: '2024-02-01', actualDate: '—', delayDays: 120, idleHoursCost: '$60K', status: 'Pending' },
    { project: 'Marina Tower', plannedDate: '2024-01-01', actualDate: '2024-02-15', delayDays: 45, idleHoursCost: '$48K', status: 'Handed Over' },
    { project: 'Downtown Oasis', plannedDate: '2024-03-01', actualDate: '2024-04-05', delayDays: 35, idleHoursCost: '$24K', status: 'Handed Over' },
    { project: 'Creek Harbour', plannedDate: '2024-02-15', actualDate: '2024-03-20', delayDays: 33, idleHoursCost: '$20K', status: 'Handed Over' }
  ];

  // Tooltip
  tooltip = { visible: false, x: 0, y: 0, title: '', lines: [] as string[] };

  // Burn rate chart paths
  burnPlannedPath = '';
  burnActualPath = '';
  burnActualArea = '';
  burnIdlePath = '';
  burnMaxY = 0;

  // Category pie
  categoryPieSegments: { name: string, color: string, dashArray: string, dashOffset: number }[] = [];

  ngOnInit() {
    this.applyFilters();
    this.buildBurnRateChart();
    this.buildCategoryPie();
  }

  applyFilters() {
    let data = [...this.allProjects];
    if (this.selectedProject !== 'All') {
      data = data.filter(d => d.name === this.selectedProject);
    }
    if (this.selectedCategory !== 'All') {
      data = data.filter(d => d.category === this.selectedCategory);
    }
    this.filteredProjects = data;
  }

  onProjectChange(val: string) { this.selectedProject = val; this.applyFilters(); }
  onPeriodChange(val: string) { this.selectedPeriod = val; }
  onCategoryChange(val: string) { this.selectedCategory = val; this.applyFilters(); }

  buildBurnRateChart() {
    const d = this.burnRateData;
    this.burnMaxY = Math.max(...d.map(r => Math.max(r.planned, r.actual + r.idle))) * 1.15;
    const w = 500, h = 200, n = d.length;
    const toX = (i: number) => (i / (n - 1)) * w;
    const toY = (v: number) => h - (v / this.burnMaxY) * h;

    let pp = `M${toX(0)},${toY(d[0].planned)}`;
    let ap = `M${toX(0)},${toY(d[0].actual)}`;
    let ip = `M${toX(0)},${toY(d[0].idle)}`;
    for (let i = 1; i < n; i++) {
      const cx1 = toX(i - 1) + (toX(i) - toX(i - 1)) * 0.4;
      const cx2 = toX(i) - (toX(i) - toX(i - 1)) * 0.4;
      pp += ` C${cx1},${toY(d[i - 1].planned)} ${cx2},${toY(d[i].planned)} ${toX(i)},${toY(d[i].planned)}`;
      ap += ` C${cx1},${toY(d[i - 1].actual)} ${cx2},${toY(d[i].actual)} ${toX(i)},${toY(d[i].actual)}`;
      ip += ` C${cx1},${toY(d[i - 1].idle)} ${cx2},${toY(d[i].idle)} ${toX(i)},${toY(d[i].idle)}`;
    }
    this.burnPlannedPath = pp;
    this.burnActualPath = ap;
    this.burnActualArea = ap + ` L${w},${h} L0,${h} Z`;
    this.burnIdlePath = ip;
  }

  buildCategoryPie() {
    const circ = 2 * Math.PI * 70;
    let offset = 0;
    this.categoryPieSegments = this.laborCategories.map(c => {
      const len = (c.percent / 100) * circ;
      const seg = { name: c.name, color: c.color, dashArray: `${len} ${circ - len}`, dashOffset: -offset };
      offset += len;
      return seg;
    });
  }

  getBurnYLabels(): string[] {
    const m = this.burnMaxY;
    return [Math.round(m).toLocaleString(), Math.round(m * 0.66).toLocaleString(), Math.round(m * 0.33).toLocaleString(), '0'];
  }

  getBarWidth(value: number, max: number): number {
    return max > 0 ? (value / max) * 100 : 0;
  }

  getEfficiencyClass(eff: number): string {
    if (eff >= 85) return 'eff-high';
    if (eff >= 75) return 'eff-mid';
    return 'eff-low';
  }

  getStatusClass(status: string): string {
    if (status === 'Active') return 'status-active';
    if (status === 'Completed') return 'status-completed';
    return 'status-delayed';
  }

  showTooltip(event: MouseEvent, title: string, lines: string[]) {
    this.tooltip = { visible: true, x: event.clientX, y: event.clientY, title, lines };
  }
  moveTooltip(event: MouseEvent) { if (this.tooltip.visible) { this.tooltip.x = event.clientX; this.tooltip.y = event.clientY; } }
  hideTooltip() { this.tooltip.visible = false; }
}
