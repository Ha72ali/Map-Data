import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-financial-dashboard',
  templateUrl: './financial-dashboard.component.html',
  styleUrls: ['./financial-dashboard.component.css']
})
export class FinancialDashboardComponent implements OnInit, OnDestroy {
  revenueMonth = 'Monthly';
  productsMonth = 'This Month';
  goalMonth = 'Jun 2024';

  // Monthly Billing Target data per month
  billingTargetData: Record<string, { current: number; target: number; status: string }> = {
    'Jun 2024': { current: 2.48, target: 4.0, status: 'On track for monthly IPC submissions.' },
    'May 2024': { current: 3.65, target: 4.0, status: 'Strong billing month — 91% of target achieved.' },
    'Apr 2024': { current: 1.92, target: 3.8, status: 'Below target — pending invoice approvals.' }
  };

  get activeBillingTarget() {
    return this.billingTargetData[this.goalMonth] || this.billingTargetData['Jun 2024'];
  }

  get billingPercent(): number {
    const t = this.activeBillingTarget;
    return Math.round((t.current / t.target) * 100);
  }

  onGoalMonthChange(value: string) {
    this.goalMonth = value;
  }
  selectedYear = '2024';
  selectedProjectType = 'All';
  selectedTimePeriod = 'Monthly';
  selectedProfitProject = 'Top 5';

  // Tooltip state
  tooltip = { visible: false, x: 0, y: 0, title: '', lines: [] as string[] };

  // Notification popup
  showFinNotifications = false;
  private finDocClickBound = this.closeFinNotifications.bind(this);

  private closeFinNotifications(): void {
    this.showFinNotifications = false;
  }

  toggleFinNotifications(event: Event): void {
    event.stopPropagation();
    this.showFinNotifications = !this.showFinNotifications;
  }

  kpiCards = [
    { title: 'Total Contract Value', value: '$48.2M', change: 12.5, direction: 'up', color: 'blue' },
    { title: 'Revenue Earned', value: '$31.6M', change: 8.2, direction: 'up', color: 'purple' },
    { title: 'Total Expenditure', value: '$26.8M', change: 16.3, direction: 'up', color: 'green' },
    { title: 'Gross Profit', value: '$4.8M', change: 3.8, direction: 'down', color: 'red' }
  ];

  topContractorsData: Record<string, { name: string; amount: number; totalPO: number; poInvoiced: number; color: string }[]> = {
    'This Month': [
      { name: 'Al Futtaim Contracting', amount: 4560000, totalPO: 5200000, poInvoiced: 3800000, color: '#3b82f6' },
      { name: 'Drake & Scull Intl', amount: 3540000, totalPO: 4100000, poInvoiced: 3540000, color: '#22c55e' },
      { name: 'Shapoorji Pallonji', amount: 2450000, totalPO: 3200000, poInvoiced: 2100000, color: '#8b5cf6' },
      { name: 'Arabtec Holdings', amount: 1890000, totalPO: 2500000, poInvoiced: 1500000, color: '#f59e0b' },
      { name: 'Dutco Balfour Beatty', amount: 980000, totalPO: 1200000, poInvoiced: 980000, color: '#ef4444' },
      { name: 'Al Habtoor Group', amount: 870000, totalPO: 1500000, poInvoiced: 750000, color: '#06b6d4' },
      { name: 'Emaar Contractors', amount: 740000, totalPO: 1100000, poInvoiced: 680000, color: '#ec4899' },
      { name: 'Nakheel Construction', amount: 620000, totalPO: 900000, poInvoiced: 520000, color: '#14b8a6' }
    ],
    'Last Month': [
      { name: 'Drake & Scull Intl', amount: 3820000, totalPO: 4500000, poInvoiced: 3820000, color: '#22c55e' },
      { name: 'Al Futtaim Contracting', amount: 3150000, totalPO: 4800000, poInvoiced: 2900000, color: '#3b82f6' },
      { name: 'Nakheel Construction', amount: 2680000, totalPO: 3100000, poInvoiced: 2200000, color: '#14b8a6' },
      { name: 'Shapoorji Pallonji', amount: 2100000, totalPO: 2800000, poInvoiced: 1850000, color: '#8b5cf6' },
      { name: 'Emaar Contractors', amount: 1520000, totalPO: 2000000, poInvoiced: 1520000, color: '#ec4899' },
      { name: 'Arabtec Holdings', amount: 1350000, totalPO: 2200000, poInvoiced: 1100000, color: '#f59e0b' },
      { name: 'Al Habtoor Group', amount: 960000, totalPO: 1400000, poInvoiced: 800000, color: '#06b6d4' },
      { name: 'Dutco Balfour Beatty', amount: 720000, totalPO: 950000, poInvoiced: 720000, color: '#ef4444' }
    ]
  };
  topContractors: { name: string; amount: string; totalPO: string; poInvoiced: string; invoicedPercent: number; percent: number; color: string }[] = [];

  recentActivities = [
    { title: 'IPC #7 submitted - Marina Tower', time: '2 min ago', icon: 'invoice', color: '#22c55e' },
    { title: 'Subcontractor cert approved', time: '15 min ago', icon: 'payment', color: '#3b82f6' },
    { title: 'BOQ variation - Palm Gateway', time: '1 hour ago', icon: 'project', color: '#f59e0b' },
    { title: 'Payment received - Al Maktoum', time: '3 hours ago', icon: 'payment', color: '#22c55e' },
    { title: 'Work order issued - MEP Phase 2', time: '5 hours ago', icon: 'order', color: '#ef4444' },
    { title: 'Material PO approved - Steel', time: '6 hours ago', icon: 'order', color: '#3b82f6' },
    { title: 'Retention release - Creek Harbour', time: '8 hours ago', icon: 'payment', color: '#22c55e' },
    { title: 'Site inspection completed', time: '1 day ago', icon: 'project', color: '#f59e0b' }
  ];

  contractors = [
    { name: 'Al Futtaim Contracting', total: '$4,560,000', paid: '$3,200,000', remaining: '$1,360,000', status: 'Partial' },
    { name: 'Drake & Scull Intl', total: '$3,540,000', paid: '$3,540,000', remaining: '$0', status: 'Paid' },
    { name: 'Shapoorji Pallonji', total: '$2,450,000', paid: '$1,800,000', remaining: '$650,000', status: 'Partial' },
    { name: 'Arabtec Holdings', total: '$1,890,000', paid: '$1,200,000', remaining: '$690,000', status: 'Partial' },
    { name: 'Dutco Balfour Beatty', total: '$980,000', paid: '$980,000', remaining: '$0', status: 'Paid' },
    { name: 'Al Habtoor Group', total: '$2,150,000', paid: '$1,500,000', remaining: '$650,000', status: 'Partial' },
    { name: 'Emaar Contractors', total: '$1,750,000', paid: '$1,750,000', remaining: '$0', status: 'Paid' },
    { name: 'Nakheel Construction', total: '$3,200,000', paid: '$2,100,000', remaining: '$1,100,000', status: 'Partial' },
    { name: 'ACC Emirates', total: '$1,420,000', paid: '$900,000', remaining: '$520,000', status: 'Partial' },
    { name: 'BK Gulf LLC', total: '$2,680,000', paid: '$2,680,000', remaining: '$0', status: 'Paid' }
  ];

  trafficSources = [
    { name: 'Direct Tenders', value: 12475, percent: 36, color: '#3b82f6' },
    { name: 'Referrals', value: 9850, percent: 28, color: '#22c55e' },
    { name: 'Pre-Qualification', value: 6320, percent: 18, color: '#f59e0b' },
    { name: 'Repeat Clients', value: 3125, percent: 9, color: '#8b5cf6' },
    { name: 'Brokerage', value: 2680, percent: 5, color: '#ec4899' },
    { name: 'Government Portal', value: 1450, percent: 4, color: '#06b6d4' }
  ];

  allProjectStatusData = [
    { project: 'Marina Tower', inProgress: 12, iatApproved: 8, onHold: 2, completed: 15, type: 'Commercial' },
    { project: 'Palm Gateway', inProgress: 8, iatApproved: 5, onHold: 1, completed: 10, type: 'Residential' },
    { project: 'Creek Harbour', inProgress: 6, iatApproved: 4, onHold: 0, completed: 8, type: 'Residential' },
    { project: 'Al Maktoum', inProgress: 14, iatApproved: 6, onHold: 3, completed: 20, type: 'Infrastructure' },
    { project: 'Deira Central', inProgress: 4, iatApproved: 2, onHold: 1, completed: 5, type: 'Commercial' },
    { project: 'JBR Phase 2', inProgress: 9, iatApproved: 7, onHold: 0, completed: 12, type: 'Residential' },
    { project: 'Silicon Oasis', inProgress: 3, iatApproved: 2, onHold: 1, completed: 4, type: 'Infrastructure' },
    { project: 'DIFC Tower', inProgress: 5, iatApproved: 3, onHold: 0, completed: 7, type: 'Commercial' },
    { project: 'Sports City', inProgress: 11, iatApproved: 9, onHold: 2, completed: 18, type: 'Infrastructure' },
    { project: 'Motor City', inProgress: 2, iatApproved: 1, onHold: 0, completed: 3, type: 'Residential' },
    { project: 'Discovery Gdn', inProgress: 7, iatApproved: 4, onHold: 1, completed: 6, type: 'Residential' },
    { project: 'Green Comm.', inProgress: 4, iatApproved: 3, onHold: 0, completed: 5, type: 'Commercial' },
    { project: 'Downtown', inProgress: 16, iatApproved: 10, onHold: 4, completed: 22, type: 'Commercial' },
    { project: 'Meydan One', inProgress: 10, iatApproved: 6, onHold: 2, completed: 14, type: 'Infrastructure' },
    { project: 'Sobha Hartland', inProgress: 3, iatApproved: 2, onHold: 0, completed: 4, type: 'Residential' },
    { project: 'Bluewaters', inProgress: 8, iatApproved: 5, onHold: 1, completed: 11, type: 'Residential' },
    { project: 'City Walk', inProgress: 6, iatApproved: 4, onHold: 2, completed: 9, type: 'Commercial' },
    { project: 'La Mer', inProgress: 5, iatApproved: 3, onHold: 0, completed: 6, type: 'Infrastructure' }
  ];

  projectStatusData: any[] = [];

  allSalesRevenueData = [
    { project: 'Lastmile', actual: 5.8, planned: 6.2, type: 'Infrastructure' },
    { project: 'Omantel MNE', actual: 4.9, planned: 5.5, type: 'Infrastructure' },
    { project: 'OBB', actual: 4.5, planned: 5.2, type: 'Infrastructure' },
    { project: 'Ooredoo', actual: 3.8, planned: 4.0, type: 'Infrastructure' },
    { project: 'ADSL', actual: 2.8, planned: 3.5, type: 'Infrastructure' },
    { project: 'Maintenance', actual: 3.2, planned: 3.0, type: 'Infrastructure' },
    { project: 'Oil & Gas', actual: 1.5, planned: 2.0, type: 'Infrastructure' },
    { project: 'P&I-Enterprise', actual: 4.2, planned: 4.5, type: 'Commercial' },
    { project: 'P&I B & C', actual: 3.5, planned: 3.8, type: 'Commercial' },
    { project: 'P&I-Solar', actual: 2.1, planned: 2.6, type: 'Infrastructure' },
    { project: 'Prod & Install', actual: 5.5, planned: 6.0, type: 'Commercial' },
    { project: 'Fire & Safety', actual: 1.2, planned: 1.5, type: 'Infrastructure' },
    { project: 'P&I Garmin', actual: 3.0, planned: 3.2, type: 'Commercial' },
    { project: 'P&I Leica', actual: 1.8, planned: 2.2, type: 'Commercial' },
    { project: 'Omantel LM', actual: 6.2, planned: 7.0, type: 'Infrastructure' },
    { project: 'Omantel Mnt', actual: 2.6, planned: 2.9, type: 'Infrastructure' },
    { project: 'P&I-Salalah', actual: 1.0, planned: 1.2, type: 'Infrastructure' },
    { project: 'Marina Tower', actual: 4.5, planned: 5.2, type: 'Commercial' },
    { project: 'Palm Gateway', actual: 3.8, planned: 4.0, type: 'Residential' },
    { project: 'Creek Harbour', actual: 2.8, planned: 3.5, type: 'Residential' },
    { project: 'Al Maktoum', actual: 3.2, planned: 3.0, type: 'Infrastructure' },
    { project: 'DIFC Tower', actual: 3.5, planned: 3.8, type: 'Commercial' },
    { project: 'Downtown', actual: 5.5, planned: 6.0, type: 'Commercial' },
    { project: 'Meydan One', actual: 3.0, planned: 3.2, type: 'Infrastructure' },
    { project: 'Sports City', actual: 2.4, planned: 2.8, type: 'Infrastructure' },
    { project: 'Bluewaters', actual: 3.1, planned: 3.6, type: 'Residential' },
    { project: 'City Walk', actual: 2.6, planned: 2.9, type: 'Commercial' },
    { project: 'Sobha Hartland', actual: 1.0, planned: 1.2, type: 'Residential' },
    { project: 'La Mer', actual: 1.8, planned: 2.1, type: 'Residential' },
    { project: 'Deira Central', actual: 1.5, planned: 2.0, type: 'Commercial' }
  ];

  salesRevenueData: any[] = [];

  basePaymentData = { invoiceRaised: 6459500, paidReceived: 1332400 };
  paymentData = { ...this.basePaymentData };

  allProfitMarginData = [
    { project: 'Marina Tower', margin: 22, count: 15, color: '#3b82f6' },
    { project: 'Palm Gateway', margin: 18, count: 10, color: '#22c55e' },
    { project: 'Creek Harbour', margin: 15, count: 8, color: '#f59e0b' },
    { project: 'Al Maktoum', margin: 28, count: 20, color: '#8b5cf6' },
    { project: 'DIFC Tower', margin: 20, count: 12, color: '#ec4899' },
    { project: 'Downtown', margin: 32, count: 22, color: '#06b6d4' },
    { project: 'Sports City', margin: 16, count: 18, color: '#f97316' },
    { project: 'Bluewaters', margin: 24, count: 11, color: '#10b981' }
  ];

  profitMarginData: any[] = [];

  // Revenue data per period
  revenueDataSets: Record<string, { labels: string[], revenue: number[], projected: number[] }> = {
    'Weekly': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [1.2, 1.8, 2.1, 1.9, 2.4, 1.5, 0.8],
      projected: [1.0, 1.5, 1.8, 2.0, 2.2, 1.8, 1.0]
    },
    'Monthly': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      revenue: [5.0, 8.5, 12.5, 17.0, 22.0, 26.4, 31.6],
      projected: [4.5, 7.8, 11.0, 15.5, 20.0, 24.5, 29.0]
    },
    'Quarterly': {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      revenue: [12.5, 22.0, 31.6, 0],
      projected: [11.0, 20.0, 29.0, 38.0]
    },
    'Half Yearly': {
      labels: ['H1 2023', 'H2 2023', 'H1 2024'],
      revenue: [18.5, 26.0, 31.6],
      projected: [16.0, 24.0, 30.0]
    },
    'Yearly': {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      revenue: [12.0, 18.5, 24.0, 36.5, 48.2],
      projected: [10.0, 16.0, 22.0, 34.0, 45.0]
    }
  };

  activeRevenueData = this.revenueDataSets['Monthly'];
  revenueSvgPath = '';
  revenueAreaPath = '';
  projectedSvgPath = '';
  revenueYLabels: string[] = [];
  revenueDotX = 0;
  revenueDotY = 0;
  revenueTooltipValue = '';
  revenueTooltipLabel = '';

  monthlyRevenue = [
    { month: 'Jan', revenue: 2.1, cost: 1.8 },
    { month: 'Feb', revenue: 2.8, cost: 2.2 },
    { month: 'Mar', revenue: 3.5, cost: 2.9 },
    { month: 'Apr', revenue: 4.1, cost: 3.4 },
    { month: 'May', revenue: 4.8, cost: 3.8 },
    { month: 'Jun', revenue: 5.2, cost: 4.1 },
    { month: 'Jul', revenue: 5.8, cost: 4.5 }
  ];

  // Monthly Revenue vs Cost chart paths
  mrcRevenuePath = '';
  mrcRevenueAreaPath = '';
  mrcCostPath = '';
  mrcCostAreaPath = '';
  mrcProfitAreaPath = '';
  mrcYLabels: string[] = [];
  mrcRevenuePoints: { x: number, y: number }[] = [];
  mrcCostPoints: { x: number, y: number }[] = [];

  salesByProject = [
    { name: 'Muscat', amount: '$12.8M', percent: 32 },
    { name: 'Salalah', amount: '$6.4M', percent: 16 },
    { name: 'Sohar', amount: '$5.2M', percent: 13 },
    { name: 'Nizwa', amount: '$4.1M', percent: 10 },
    { name: 'Sur', amount: '$3.6M', percent: 9 },
    { name: 'Ibri', amount: '$3.0M', percent: 8 },
    { name: 'Duqm', amount: '$2.8M', percent: 7 },
    { name: 'Others', amount: '$2.1M', percent: 5 }
  ];

  salesPieColors = ['#1d4ed8', '#3b82f6', '#60a5fa', '#818cf8', '#93c5fd', '#a5b4fc', '#bfdbfe', '#c7d2fe'];
  salesPieSegments: { name: string, amount: string, percent: number, color: string, dashArray: string, dashOffset: number }[] = [];

  buildSalesPie() {
    const circumference = 2 * Math.PI * 80;
    let offset = 0;
    this.salesPieSegments = this.salesByProject.map((item, i) => {
      const segLen = (item.percent / 100) * circumference;
      const seg = {
        name: item.name,
        amount: item.amount,
        percent: item.percent,
        color: this.salesPieColors[i] || '#93c5fd',
        dashArray: `${segLen} ${circumference - segLen}`,
        dashOffset: -offset
      };
      offset += segLen;
      return seg;
    });
  }

  buildTopContractors() {
    const data = this.topContractorsData[this.productsMonth] || this.topContractorsData['This Month'];
    const maxAmount = Math.max(...data.map(d => d.amount), 1);
    const formatAmount = (v: number) => v >= 1000000 ? '$' + (v / 1000000).toFixed(2) + 'M' : '$' + Math.round(v / 1000) + 'K';
    this.topContractors = data.map(d => ({
      name: d.name,
      amount: formatAmount(d.amount),
      totalPO: formatAmount(d.totalPO),
      poInvoiced: formatAmount(d.poInvoiced),
      invoicedPercent: Math.round((d.poInvoiced / d.totalPO) * 100),
      percent: Math.round((d.amount / maxAmount) * 100),
      color: d.color,
    }));
  }

  onProductsMonthChange(value: string) {
    this.productsMonth = value;
    this.buildTopContractors();
  }

  // Funnel tracking — grouped bar chart (Leads / Awarded / Lost by month)
  funnelFilter = 'All';
  funnelFilterOptions = ['All', 'Leads', 'Awarded', 'Lost'];
  funnelMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  funnelMonthlyData: { month: string; leads: number; awarded: number; lost: number }[] = [
    { month: 'Jan', leads: 42, awarded: 18, lost: 8 },
    { month: 'Feb', leads: 55, awarded: 22, lost: 6 },
    { month: 'Mar', leads: 68, awarded: 28, lost: 12 },
    { month: 'Apr', leads: 48, awarded: 20, lost: 9 },
    { month: 'May', leads: 72, awarded: 32, lost: 11 },
    { month: 'Jun', leads: 60, awarded: 25, lost: 7 },
    { month: 'Jul', leads: 50, awarded: 21, lost: 10 },
    { month: 'Aug', leads: 65, awarded: 30, lost: 8 },
    { month: 'Sep', leads: 58, awarded: 26, lost: 6 },
    { month: 'Oct', leads: 75, awarded: 35, lost: 14 },
    { month: 'Nov', leads: 62, awarded: 28, lost: 9 },
    { month: 'Dec', leads: 45, awarded: 19, lost: 5 }
  ];

  funnelChartData: { month: string; leads: number; awarded: number; lost: number }[] = [];
  funnelYMax = 0;
  funnelYLabels: number[] = [];

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 1: Budget Database (Historical Cost Library)
  // ══════════════════════════════════════════════════════════════════════════
  budgetCategoryFilter = 'All';
  budgetTradeFilter = 'All';
  allBudgetHistory = [
    { material: 'Ready Mix Concrete G40', unit: 'm³', category: 'Civil', trade: 'Structural', minRate: 42, avgRate: 48, maxRate: 55, lastSupplier: 'Oman Cement Co', lastProject: 'Omantel MNE', year: 2024 },
    { material: 'Rebar Y16 (Grade 60)', unit: 'ton', category: 'Civil', trade: 'Structural', minRate: 520, avgRate: 565, maxRate: 610, lastSupplier: 'Al Jazeera Steel', lastProject: 'Lastmile', year: 2024 },
    { material: 'HDPE Duct 50mm', unit: 'm', category: 'MEP', trade: 'Telecom', minRate: 3.2, avgRate: 3.8, maxRate: 4.5, lastSupplier: 'Gulf Pipes', lastProject: 'OBB', year: 2024 },
    { material: 'Fiber Optic Cable 96F', unit: 'm', category: 'MEP', trade: 'Telecom', minRate: 8.5, avgRate: 9.2, maxRate: 10.8, lastSupplier: 'Corning Oman', lastProject: 'Omantel MNE', year: 2024 },
    { material: 'PVC Conduit 25mm', unit: 'm', category: 'MEP', trade: 'Electrical', minRate: 1.2, avgRate: 1.5, maxRate: 1.9, lastSupplier: 'National Pipes', lastProject: 'ADSL', year: 2023 },
    { material: 'Sand (Washed)', unit: 'm³', category: 'Civil', trade: 'Earthwork', minRate: 8, avgRate: 11, maxRate: 14, lastSupplier: 'Oman Quarry', lastProject: 'Ooredoo', year: 2024 },
    { material: 'Manhole Cover (HD)', unit: 'pc', category: 'Civil', trade: 'Drainage', minRate: 85, avgRate: 95, maxRate: 120, lastSupplier: 'Al Maha Foundry', lastProject: 'Maintenance', year: 2023 },
    { material: 'Cable Tray 300mm', unit: 'm', category: 'MEP', trade: 'Electrical', minRate: 18, avgRate: 22, maxRate: 28, lastSupplier: 'Gulf Cable Tray', lastProject: 'P&I-Enterprise', year: 2024 },
    { material: 'Cement OPC 42.5', unit: 'bag', category: 'Civil', trade: 'Structural', minRate: 1.8, avgRate: 2.1, maxRate: 2.5, lastSupplier: 'Raysut Cement', lastProject: 'Oil & Gas', year: 2024 },
    { material: 'Backfill Material', unit: 'm³', category: 'Civil', trade: 'Earthwork', minRate: 6, avgRate: 8, maxRate: 12, lastSupplier: 'Oman Quarry', lastProject: 'Omantel LM', year: 2024 },
    { material: 'Splice Closure 96F', unit: 'pc', category: 'MEP', trade: 'Telecom', minRate: 45, avgRate: 52, maxRate: 65, lastSupplier: 'Corning Oman', lastProject: 'OBB', year: 2023 },
    { material: 'Warning Tape', unit: 'roll', category: 'Civil', trade: 'Earthwork', minRate: 12, avgRate: 15, maxRate: 18, lastSupplier: 'Safety Plus', lastProject: 'Lastmile', year: 2024 },
    { material: 'GI Marker Post', unit: 'pc', category: 'Civil', trade: 'Earthwork', minRate: 22, avgRate: 28, maxRate: 35, lastSupplier: 'Metal Works LLC', lastProject: 'Omantel MNE', year: 2024 },
    { material: 'DB Board 12-Way', unit: 'pc', category: 'MEP', trade: 'Electrical', minRate: 120, avgRate: 145, maxRate: 180, lastSupplier: 'Schneider Oman', lastProject: 'P&I-Solar', year: 2023 },
    { material: 'Fire Extinguisher 6kg', unit: 'pc', category: 'Safety', trade: 'Fire & Safety', minRate: 25, avgRate: 32, maxRate: 40, lastSupplier: 'Fire Guard LLC', lastProject: 'Fire & Safety', year: 2024 },
  ];
  budgetHistory: any[] = [];
  budgetCategories = ['All', 'Civil', 'MEP', 'Safety'];
  budgetTrades = ['All', 'Structural', 'Telecom', 'Electrical', 'Earthwork', 'Drainage', 'Fire & Safety'];

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 2: Cost Code Structure
  // ══════════════════════════════════════════════════════════════════════════
  costCodeCategoryFilter = 'All';
  costCodeProjectFilter = 'All';
  allCostCodes = [
    { code: 'MAT/CIV/CONC-001', description: 'Ready Mix Concrete G40', category: 'Material', trade: 'Civil', project: 'Omantel MNE', budget: 125000, actual: 118500 },
    { code: 'MAT/CIV/REBAR-001', description: 'Rebar Y16 Grade 60', category: 'Material', trade: 'Civil', project: 'Omantel MNE', budget: 340000, actual: 355200 },
    { code: 'MAT/MEP/DUCT-001', description: 'HDPE Duct 50mm', category: 'Material', trade: 'MEP', project: 'Lastmile', budget: 89000, actual: 82400 },
    { code: 'MAT/MEP/FIBER-001', description: 'Fiber Optic Cable 96F', category: 'Material', trade: 'MEP', project: 'OBB', budget: 215000, actual: 198600 },
    { code: 'LAB/CIV/MASON-001', description: 'Mason (Skilled)', category: 'Labor', trade: 'Civil', project: 'Omantel MNE', budget: 96000, actual: 102500 },
    { code: 'LAB/CIV/HELPER-001', description: 'Helper (Unskilled)', category: 'Labor', trade: 'Civil', project: 'Lastmile', budget: 48000, actual: 45200 },
    { code: 'LAB/MEP/ELEC-001', description: 'Electrician (Skilled)', category: 'Labor', trade: 'MEP', project: 'OBB', budget: 84000, actual: 88900 },
    { code: 'LAB/MEP/SPLICE-001', description: 'Fiber Splicer', category: 'Labor', trade: 'MEP', project: 'Ooredoo', budget: 72000, actual: 68400 },
    { code: 'SUB/CIV/TRENCH-001', description: 'Trenching Subcontractor', category: 'Subcontractor', trade: 'Civil', project: 'Omantel MNE', budget: 450000, actual: 425000 },
    { code: 'SUB/CIV/BKFIL-001', description: 'Backfilling Subcontractor', category: 'Subcontractor', trade: 'Civil', project: 'Lastmile', budget: 180000, actual: 192500 },
    { code: 'SUB/MEP/CABLE-001', description: 'Cable Pulling Sub', category: 'Subcontractor', trade: 'MEP', project: 'OBB', budget: 320000, actual: 298000 },
    { code: 'EQP/CIV/EXCAV-001', description: 'Excavator (CAT 320)', category: 'Equipment', trade: 'Civil', project: 'Omantel MNE', budget: 156000, actual: 148200 },
    { code: 'EQP/CIV/LOADER-001', description: 'Wheel Loader', category: 'Equipment', trade: 'Civil', project: 'Ooredoo', budget: 98000, actual: 105600 },
    { code: 'EQP/CIV/TRUCK-001', description: 'Tipper Truck 10m³', category: 'Equipment', trade: 'Civil', project: 'Lastmile', budget: 72000, actual: 69800 },
    { code: 'MAT/CIV/SAND-001', description: 'Washed Sand', category: 'Material', trade: 'Civil', project: 'Ooredoo', budget: 65000, actual: 58900 },
    { code: 'SUB/FIN/REINST-001', description: 'Reinstatement Sub', category: 'Subcontractor', trade: 'Finishing', project: 'ADSL', budget: 220000, actual: 235800 },
    { code: 'MAT/CIV/MARKER-001', description: 'GI Marker Post', category: 'Material', trade: 'Civil', project: 'Omantel LM', budget: 28000, actual: 25600 },
    { code: 'LAB/CIV/SURVEY-001', description: 'Surveyor', category: 'Labor', trade: 'Civil', project: 'Omantel MNE', budget: 56000, actual: 54200 },
    { code: 'EQP/MEP/SPLICE-001', description: 'Splicing Machine', category: 'Equipment', trade: 'MEP', project: 'OBB', budget: 42000, actual: 38500 },
    { code: 'MAT/SAFE/PPE-001', description: 'PPE Kit', category: 'Material', trade: 'Safety', project: 'All', budget: 35000, actual: 32100 },
  ];
  costCodes: any[] = [];
  costCodeCategories = ['All', 'Material', 'Labor', 'Subcontractor', 'Equipment'];
  costCodeProjects = ['All', 'Omantel MNE', 'Lastmile', 'OBB', 'Ooredoo', 'ADSL', 'Omantel LM'];

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 3: Material Tracking System (End-to-End)
  // ══════════════════════════════════════════════════════════════════════════
  materialStatusFilter = 'All';
  materialProjectFilter = 'All';
  allMaterialTracking = [
    { mrNo: 'MR-2024-001', material: 'Cement OPC 42.5', qty: 500, unit: 'bags', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Received', issued: 450, consumed: 420, wastage: 6.7, project: 'Omantel MNE' },
    { mrNo: 'MR-2024-002', material: 'HDPE Duct 50mm', qty: 12000, unit: 'm', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Received', issued: 11200, consumed: 10800, wastage: 3.6, project: 'Lastmile' },
    { mrNo: 'MR-2024-003', material: 'Fiber Cable 96F', qty: 8500, unit: 'm', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Partial', issued: 5200, consumed: 4800, wastage: 7.7, project: 'OBB' },
    { mrNo: 'MR-2024-004', material: 'Rebar Y16', qty: 45, unit: 'ton', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Received', issued: 42, consumed: 40, wastage: 4.8, project: 'Omantel MNE' },
    { mrNo: 'MR-2024-005', material: 'Sand (Washed)', qty: 800, unit: 'm³', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Received', issued: 750, consumed: 720, wastage: 4.0, project: 'Ooredoo' },
    { mrNo: 'MR-2024-006', material: 'Splice Closure 96F', qty: 120, unit: 'pcs', prStatus: 'Approved', lpoStatus: 'Pending', grnStatus: 'Pending', issued: 0, consumed: 0, wastage: 0, project: 'OBB' },
    { mrNo: 'MR-2024-007', material: 'Cable Tray 300mm', qty: 450, unit: 'm', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Received', issued: 430, consumed: 410, wastage: 4.7, project: 'P&I-Enterprise' },
    { mrNo: 'MR-2024-008', material: 'Manhole Cover HD', qty: 85, unit: 'pcs', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Partial', issued: 50, consumed: 48, wastage: 4.0, project: 'Maintenance' },
    { mrNo: 'MR-2024-009', material: 'Warning Tape', qty: 200, unit: 'rolls', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Received', issued: 190, consumed: 185, wastage: 2.6, project: 'Omantel LM' },
    { mrNo: 'MR-2024-010', material: 'PVC Conduit 25mm', qty: 3000, unit: 'm', prStatus: 'Pending', lpoStatus: 'Pending', grnStatus: 'Pending', issued: 0, consumed: 0, wastage: 0, project: 'ADSL' },
    { mrNo: 'MR-2024-011', material: 'Backfill Material', qty: 1200, unit: 'm³', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Received', issued: 1100, consumed: 1050, wastage: 4.5, project: 'Omantel MNE' },
    { mrNo: 'MR-2024-012', material: 'GI Marker Post', qty: 350, unit: 'pcs', prStatus: 'Approved', lpoStatus: 'Issued', grnStatus: 'Received', issued: 340, consumed: 325, wastage: 4.4, project: 'Lastmile' },
  ];
  materialTracking: any[] = [];
  materialProjects = ['All', 'Omantel MNE', 'Lastmile', 'OBB', 'Ooredoo', 'P&I-Enterprise', 'Maintenance', 'Omantel LM', 'ADSL'];

  // Top 5 Material Suppliers
  topMaterialSuppliers = [
    { name: 'Al Jazeera Steel', totalPO: 2850000, delivered: 2450000, color: '#3b82f6' },
    { name: 'Gulf Pipes LLC', totalPO: 2120000, delivered: 1890000, color: '#22c55e' },
    { name: 'Corning Oman', totalPO: 1780000, delivered: 1520000, color: '#8b5cf6' },
    { name: 'Raysut Cement', totalPO: 1450000, delivered: 1320000, color: '#f59e0b' },
    { name: 'National Pipes', totalPO: 980000, delivered: 780000, color: '#ef4444' }
  ];

  getSupplierMaxPO(): number {
    return Math.max(...this.topMaterialSuppliers.map(s => s.totalPO), 1);
  }

  formatSupplierAmount(v: number): string {
    return v >= 1000000 ? '$' + (v / 1000000).toFixed(2) + 'M' : '$' + Math.round(v / 1000) + 'K';
  }

  getSupplierDeliveryPct(s: { totalPO: number; delivered: number }): number {
    return s.totalPO > 0 ? Math.round((s.delivered / s.totalPO) * 100) : 0;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 4: Internal Delivery Order (DO) Management
  // ══════════════════════════════════════════════════════════════════════════
  doStatusFilter = 'All';
  doSiteFilter = 'All';
  allDeliveryOrders = [
    { doNo: 'DO-2024-001', fromWarehouse: 'Main Store - Muscat', toSite: 'Omantel MNE - Site A', material: 'Cement OPC 42.5', qtySent: 200, qtyReceived: 195, consumed: 180, balance: 15, status: 'Delivered', date: '15 Jun 2024' },
    { doNo: 'DO-2024-002', fromWarehouse: 'Main Store - Muscat', toSite: 'Lastmile - Sector 3', material: 'HDPE Duct 50mm', qtySent: 5000, qtyReceived: 4980, consumed: 4500, balance: 480, status: 'Delivered', date: '18 Jun 2024' },
    { doNo: 'DO-2024-003', fromWarehouse: 'Sub Store - Sohar', toSite: 'OBB - Ring 4', material: 'Fiber Cable 96F', qtySent: 3000, qtyReceived: 3000, consumed: 2800, balance: 200, status: 'Delivered', date: '20 Jun 2024' },
    { doNo: 'DO-2024-004', fromWarehouse: 'Main Store - Muscat', toSite: 'Ooredoo - Phase 2', material: 'Sand (Washed)', qtySent: 400, qtyReceived: 385, consumed: 360, balance: 25, status: 'Delivered', date: '22 Jun 2024' },
    { doNo: 'DO-2024-005', fromWarehouse: 'Main Store - Muscat', toSite: 'Omantel MNE - Site B', material: 'Rebar Y16', qtySent: 20, qtyReceived: 20, consumed: 18, balance: 2, status: 'Delivered', date: '25 Jun 2024' },
    { doNo: 'DO-2024-006', fromWarehouse: 'Sub Store - Salalah', toSite: 'P&I-Salalah - Zone 1', material: 'Cable Tray 300mm', qtySent: 200, qtyReceived: 200, consumed: 150, balance: 50, status: 'Delivered', date: '26 Jun 2024' },
    { doNo: 'DO-2024-007', fromWarehouse: 'Main Store - Muscat', toSite: 'ADSL - Sector 7', material: 'PVC Conduit 25mm', qtySent: 1500, qtyReceived: 0, consumed: 0, balance: 0, status: 'In Transit', date: '28 Jun 2024' },
    { doNo: 'DO-2024-008', fromWarehouse: 'Main Store - Muscat', toSite: 'Maintenance - Ruwi', material: 'Manhole Cover HD', qtySent: 30, qtyReceived: 30, consumed: 25, balance: 5, status: 'Delivered', date: '12 Jun 2024' },
    { doNo: 'DO-2024-009', fromWarehouse: 'Sub Store - Sohar', toSite: 'Oil & Gas - Block 6', material: 'Warning Tape', qtySent: 50, qtyReceived: 50, consumed: 48, balance: 2, status: 'Delivered', date: '10 Jun 2024' },
    { doNo: 'DO-2024-010', fromWarehouse: 'Main Store - Muscat', toSite: 'Omantel LM - Ring 2', material: 'GI Marker Post', qtySent: 150, qtyReceived: 148, consumed: 140, balance: 8, status: 'Delivered', date: '08 Jun 2024' },
  ];
  deliveryOrders: any[] = [];
  doSites = ['All', 'Omantel MNE - Site A', 'Omantel MNE - Site B', 'Lastmile - Sector 3', 'OBB - Ring 4', 'Ooredoo - Phase 2', 'P&I-Salalah - Zone 1', 'ADSL - Sector 7', 'Maintenance - Ruwi', 'Oil & Gas - Block 6', 'Omantel LM - Ring 2'];

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 5: Supplier & Subcontractor LPO Logs
  // ══════════════════════════════════════════════════════════════════════════
  lpoStatusFilter = 'All';
  lpoSupplierFilter = 'All';
  allLpoLogs = [
    { lpoNo: 'LPO-2024-001', supplier: 'Al Jazeera Steel', material: 'Rebar Y16 Grade 60', lpoValue: 285000, delivered: 242000, invoiced: 228000, paid: 185000, outstanding: 43000, status: 'Partial', onTimeScore: 88 },
    { lpoNo: 'LPO-2024-002', supplier: 'Gulf Pipes LLC', material: 'HDPE Duct 50mm', lpoValue: 156000, delivered: 156000, invoiced: 156000, paid: 156000, outstanding: 0, status: 'Completed', onTimeScore: 95 },
    { lpoNo: 'LPO-2024-003', supplier: 'Corning Oman', material: 'Fiber Optic Cable 96F', lpoValue: 420000, delivered: 315000, invoiced: 298000, paid: 250000, outstanding: 48000, status: 'Partial', onTimeScore: 82 },
    { lpoNo: 'LPO-2024-004', supplier: 'Raysut Cement', material: 'Cement OPC 42.5', lpoValue: 52000, delivered: 52000, invoiced: 52000, paid: 42000, outstanding: 10000, status: 'Invoiced', onTimeScore: 92 },
    { lpoNo: 'LPO-2024-005', supplier: 'Oman Quarry LLC', material: 'Sand & Backfill', lpoValue: 98000, delivered: 85000, invoiced: 78000, paid: 65000, outstanding: 13000, status: 'Partial', onTimeScore: 78 },
    { lpoNo: 'LPO-2024-006', supplier: 'National Pipes', material: 'PVC Conduit 25mm', lpoValue: 45000, delivered: 0, invoiced: 0, paid: 0, outstanding: 0, status: 'Pending', onTimeScore: 0 },
    { lpoNo: 'LPO-2024-007', supplier: 'Schneider Oman', material: 'DB Boards & MCBs', lpoValue: 118000, delivered: 118000, invoiced: 118000, paid: 118000, outstanding: 0, status: 'Completed', onTimeScore: 90 },
    { lpoNo: 'LPO-2024-008', supplier: 'Metal Works LLC', material: 'GI Marker Posts', lpoValue: 38500, delivered: 32000, invoiced: 28000, paid: 22000, outstanding: 6000, status: 'Partial', onTimeScore: 85 },
    { lpoNo: 'LPO-2024-009', supplier: 'MHD Contracting', material: 'Trenching Works (Sub)', lpoValue: 650000, delivered: 520000, invoiced: 480000, paid: 420000, outstanding: 60000, status: 'Partial', onTimeScore: 75 },
    { lpoNo: 'LPO-2024-010', supplier: 'BPT Construction', material: 'Backfilling Works (Sub)', lpoValue: 280000, delivered: 210000, invoiced: 195000, paid: 165000, outstanding: 30000, status: 'Partial', onTimeScore: 80 },
  ];
  lpoLogs: any[] = [];
  lpoSuppliers = ['All', 'Al Jazeera Steel', 'Gulf Pipes LLC', 'Corning Oman', 'Raysut Cement', 'Oman Quarry LLC', 'National Pipes', 'Schneider Oman', 'Metal Works LLC', 'MHD Contracting', 'BPT Construction'];

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 6: Management Reports / CTC Dashboard
  // ══════════════════════════════════════════════════════════════════════════
  ctcProjectFilter = 'All';
  ctcTimePeriod = 'Monthly';

  // Time period multipliers for CTC
  private ctcTimeMultipliers: Record<string, number> = { 'Monthly': 1, 'Yearly': 12 };
  allCtcProjects = [
    { project: 'Omantel MNE', contractValue: 12.5, budgetCost: 10.2, actualCost: 7.8, committed: 1.5, ctc: 0.9, revenue: 9.2, progress: 72, status: 'On Track' },
    { project: 'Lastmile', contractValue: 8.8, budgetCost: 7.2, actualCost: 5.4, committed: 1.1, ctc: 0.7, revenue: 6.5, progress: 68, status: 'On Track' },
    { project: 'OBB', contractValue: 6.5, budgetCost: 5.4, actualCost: 4.8, committed: 0.8, ctc: 0.5, revenue: 5.2, progress: 80, status: 'Ahead' },
    { project: 'Ooredoo', contractValue: 5.2, budgetCost: 4.5, actualCost: 3.9, committed: 0.6, ctc: 0.4, revenue: 4.1, progress: 78, status: 'On Track' },
    { project: 'ADSL', contractValue: 3.8, budgetCost: 3.2, actualCost: 2.8, committed: 0.5, ctc: 0.3, revenue: 3.0, progress: 75, status: 'At Risk' },
    { project: 'Maintenance', contractValue: 4.5, budgetCost: 3.8, actualCost: 3.5, committed: 0.4, ctc: 0.2, revenue: 3.8, progress: 85, status: 'On Track' },
    { project: 'Oil & Gas', contractValue: 2.8, budgetCost: 2.4, actualCost: 1.6, committed: 0.5, ctc: 0.6, revenue: 1.8, progress: 55, status: 'At Risk' },
    { project: 'P&I-Enterprise', contractValue: 7.2, budgetCost: 5.8, actualCost: 4.2, committed: 0.9, ctc: 0.7, revenue: 5.5, progress: 65, status: 'On Track' },
  ];
  ctcProjects: any[] = [];
  ctcProjectList = ['All', 'Omantel MNE', 'Lastmile', 'OBB', 'Ooredoo', 'ADSL', 'Maintenance', 'Oil & Gas', 'P&I-Enterprise'];

  // CTC Summary KPI (computed)
  ctcSummary = { totalContract: 0, totalBudget: 0, totalActual: 0, totalCommitted: 0, totalCtc: 0, totalRevenue: 0, avgProgress: 0, avgMargin: 0 };

  // Base KPI values for filtering
  baseKpiValues = [48.2, 31.6, 26.8, 4.8];

  // Time period multipliers for static data simulation
  timePeriodMultipliers: Record<string, number> = {
    'Weekly': 0.25,
    'Monthly': 1,
    '3 Months': 3,
    '6 Months': 6,
    'Yearly': 12
  };

  // Year multipliers to simulate year-over-year growth
  yearMultipliers: Record<string, number> = {
    '2024': 1,
    '2023': 0.85,
    '2022': 0.72
  };

  ngOnInit() {
    document.addEventListener('click', this.finDocClickBound);
    this.applyFilters();
    this.buildRevenuePaths();
    this.buildSalesPie();
    this.buildMrcPaths();
    this.buildTopContractors();
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.finDocClickBound);
  }

  applyFilters() {
    this.filterSalesRevenue();
    this.filterProjectStatus();
    this.filterProfitMargin();
    this.filterPaymentData();
    this.filterFunnelData();
    this.filterKpiCards();
    this.filterRevenueChart();
    this.filterBudgetHistory();
    this.filterCostCodes();
    this.filterMaterialTracking();
    this.filterDeliveryOrders();
    this.filterLpoLogs();
    this.filterCtcProjects();
  }

  filterSalesRevenue() {
    let data = [...this.allSalesRevenueData];
    if (this.selectedProjectType !== 'All') {
      data = data.filter(d => d.type === this.selectedProjectType);
    }
    const multiplier = this.timePeriodMultipliers[this.selectedTimePeriod] || 1;
    const yearScale = this.yearMultipliers[this.selectedYear] || 1;
    this.salesRevenueData = data.map(d => ({
      ...d,
      actual: +(d.actual * multiplier * yearScale).toFixed(1),
      planned: +(d.planned * multiplier * yearScale).toFixed(1)
    }));
  }

  filterProjectStatus() {
    let data = [...this.allProjectStatusData];
    if (this.selectedProjectType !== 'All') {
      data = data.filter(d => d.type === this.selectedProjectType);
    }
    const multiplier = this.timePeriodMultipliers[this.selectedTimePeriod] || 1;
    const yearScale = this.yearMultipliers[this.selectedYear] || 1;
    this.projectStatusData = data.map(d => ({
      ...d,
      inProgress: Math.round(d.inProgress * multiplier * yearScale),
      iatApproved: Math.round(d.iatApproved * multiplier * yearScale),
      onHold: Math.round(d.onHold * multiplier * yearScale),
      completed: Math.round(d.completed * multiplier * yearScale)
    }));
  }

  filterProfitMargin() {
    let sorted = [...this.allProfitMarginData].sort((a, b) => b.margin - a.margin);
    if (this.selectedProfitProject === 'Top 5') {
      this.profitMarginData = sorted.slice(0, 5);
    } else {
      this.profitMarginData = sorted.filter(d => d.project === this.selectedProfitProject);
      if (this.profitMarginData.length === 0) {
        this.profitMarginData = sorted.slice(0, 5);
      }
    }
  }

  filterPaymentData() {
    const multiplier = this.timePeriodMultipliers[this.selectedTimePeriod] || 1;
    const yearScale = this.yearMultipliers[this.selectedYear] || 1;
    const typeScale = this.selectedProjectType === 'All' ? 1 : this.selectedProjectType === 'Commercial' ? 0.45 : this.selectedProjectType === 'Residential' ? 0.30 : 0.25;
    this.paymentData = {
      invoiceRaised: Math.round(this.basePaymentData.invoiceRaised * multiplier * typeScale * yearScale),
      paidReceived: Math.round(this.basePaymentData.paidReceived * multiplier * typeScale * yearScale)
    };
  }

  filterFunnelData() {
    this.funnelChartData = this.funnelMonthlyData.map(d => ({
      ...d,
      leads: this.funnelFilter === 'All' || this.funnelFilter === 'Leads' ? d.leads : 0,
      awarded: this.funnelFilter === 'All' || this.funnelFilter === 'Awarded' ? d.awarded : 0,
      lost: this.funnelFilter === 'All' || this.funnelFilter === 'Lost' ? d.lost : 0,
    }));
    // Y-axis
    const allVals = this.funnelChartData.flatMap(d => [d.leads, d.awarded, d.lost]);
    this.funnelYMax = Math.ceil((Math.max(...allVals, 1) * 1.15) / 10) * 10;
    const step = Math.ceil(this.funnelYMax / 5);
    this.funnelYLabels = [];
    for (let i = 5; i >= 0; i--) {
      this.funnelYLabels.push(step * i);
    }
    this.funnelYMax = step * 5;
  }

  onFunnelFilterChange(value: string) {
    this.funnelFilter = value;
    this.filterFunnelData();
  }

  getFunnelBarHeight(value: number): number {
    return this.funnelYMax > 0 ? (value / this.funnelYMax) * 100 : 0;
  }

  filterKpiCards() {
    const multiplier = this.timePeriodMultipliers[this.selectedTimePeriod] || 1;
    const yearScale = this.yearMultipliers[this.selectedYear] || 1;
    const typeScale = this.selectedProjectType === 'All' ? 1 : this.selectedProjectType === 'Commercial' ? 0.45 : this.selectedProjectType === 'Residential' ? 0.30 : 0.25;
    const values = this.baseKpiValues.map(v => +(v * multiplier * typeScale * yearScale).toFixed(1));
    this.kpiCards = [
      { title: 'Total Contract Value', value: '$' + values[0] + 'M', change: 12.5, direction: 'up', color: 'blue' },
      { title: 'Revenue Earned', value: '$' + values[1] + 'M', change: 8.2, direction: 'up', color: 'purple' },
      { title: 'Total Expenditure', value: '$' + values[2] + 'M', change: 16.3, direction: 'up', color: 'green' },
      { title: 'Gross Profit', value: '$' + values[3] + 'M', change: 3.8, direction: 'down', color: 'red' }
    ];
  }

  onTimePeriodChange(value: string) {
    this.selectedTimePeriod = value;
    this.applyFilters();
  }

  onYearChange(value: string) {
    this.selectedYear = value;
    this.applyFilters();
  }

  onProjectTypeChange(value: string) {
    this.selectedProjectType = value;
    this.applyFilters();
  }

  onProfitProjectChange(value: string) {
    this.selectedProfitProject = value;
    this.filterProfitMargin();
  }

  getMaxProjectStatus(): number {
    return Math.max(...this.projectStatusData.map(d => Math.max(d.inProgress, d.iatApproved, d.onHold, d.completed)));
  }

  getBarHeight(value: number): number {
    const max = this.getMaxProjectStatus();
    return max > 0 ? (value / max) * 100 : 0;
  }

  getSalesMax(): number {
    return Math.max(...this.salesRevenueData.map(d => Math.max(d.actual, d.planned)));
  }

  getSalesBarHeight(value: number): number {
    const max = this.getSalesMax();
    return max > 0 ? (value / max) * 100 : 0;
  }

  getPaymentMax(): number {
    return Math.max(this.paymentData.invoiceRaised, this.paymentData.paidReceived) * 1.1;
  }

  getPaymentBarWidth(value: number): number {
    const max = this.getPaymentMax();
    return max > 0 ? (value / max) * 100 : 0;
  }

  formatK(value: number): string {
    if (value >= 1000000) {
      const m = value / 1000000;
      return m.toFixed(m % 1 === 0 ? 0 : 2) + 'M';
    }
    if (value >= 1000) {
      const k = value / 1000;
      return k.toFixed(k % 1 === 0 ? 0 : 1) + 'K';
    }
    return value.toString();
  }

  getProfitMax(): number {
    return Math.max(...this.profitMarginData.map(d => d.margin));
  }

  getArcPath(percent: number, radius: number): string {
    const angle = (percent / 100) * 360;
    const rad = (angle - 90) * (Math.PI / 180);
    const x = 50 + radius * Math.cos(rad);
    const y = 50 + radius * Math.sin(rad);
    const large = angle > 180 ? 1 : 0;
    return `M 50 ${50 - radius} A ${radius} ${radius} 0 ${large} 1 ${x} ${y}`;
  }

  getCircumference(radius: number): number {
    return 2 * Math.PI * radius;
  }

  getDashArray(percent: number, radius: number): string {
    const c = this.getCircumference(radius);
    return `${(percent / 100) * c} ${c}`;
  }

  filterRevenueChart() {
    // Map Performance Dashboard period to Revenue chart period
    const periodToRevenueMap: Record<string, string> = {
      'Weekly': 'Weekly',
      'Monthly': 'Monthly',
      '3 Months': 'Quarterly',
      '6 Months': 'Half Yearly',
      'Yearly': 'Yearly'
    };
    const revenueKey = periodToRevenueMap[this.selectedTimePeriod] || 'Monthly';
    this.revenueMonth = revenueKey;
    this.buildRevenuePaths();
  }

  onRevenueFilterChange(value: string) {
    this.revenueMonth = value;
    this.buildRevenuePaths();
  }

  buildRevenuePaths() {
    const baseData = this.revenueDataSets[this.revenueMonth] || this.revenueDataSets['Monthly'];
    const yearScale = this.yearMultipliers[this.selectedYear] || 1;
    const data = {
      labels: baseData.labels,
      revenue: baseData.revenue.map(v => +(v * yearScale).toFixed(1)),
      projected: baseData.projected.map(v => +(v * yearScale).toFixed(1))
    };
    this.activeRevenueData = data;
    const rev = data.revenue;
    const proj = data.projected;
    const maxVal = Math.max(...rev, ...proj) * 1.15;
    const w = 500;
    const h = 200;
    const n = rev.length;

    // Y-axis labels
    const step = maxVal / 4;
    this.revenueYLabels = [
      '$' + Math.round(maxVal) + 'M',
      '$' + Math.round(step * 3) + 'M',
      '$' + Math.round(step * 2) + 'M',
      '$' + Math.round(step) + 'M',
      '$0'
    ];

    const toY = (v: number) => h - (v / maxVal) * h;
    const toX = (i: number) => (i / (n - 1)) * w;

    // Revenue line
    let rPath = `M${toX(0)},${toY(rev[0])}`;
    for (let i = 1; i < n; i++) {
      const cx1 = toX(i - 1) + (toX(i) - toX(i - 1)) * 0.4;
      const cx2 = toX(i) - (toX(i) - toX(i - 1)) * 0.4;
      rPath += ` C${cx1},${toY(rev[i - 1])} ${cx2},${toY(rev[i])} ${toX(i)},${toY(rev[i])}`;
    }
    this.revenueSvgPath = rPath;
    this.revenueAreaPath = rPath + ` L${w},${h} L0,${h} Z`;

    // Projected line
    let pPath = `M${toX(0)},${toY(proj[0])}`;
    for (let i = 1; i < n; i++) {
      const cx1 = toX(i - 1) + (toX(i) - toX(i - 1)) * 0.4;
      const cx2 = toX(i) - (toX(i) - toX(i - 1)) * 0.4;
      pPath += ` C${cx1},${toY(proj[i - 1])} ${cx2},${toY(proj[i])} ${toX(i)},${toY(proj[i])}`;
    }
    this.projectedSvgPath = pPath;

    // Tooltip dot at last non-zero revenue
    let lastIdx = n - 1;
    while (lastIdx > 0 && rev[lastIdx] === 0) lastIdx--;
    this.revenueDotX = toX(lastIdx);
    this.revenueDotY = toY(rev[lastIdx]);
    this.revenueTooltipValue = '$' + rev[lastIdx] + 'M';
    this.revenueTooltipLabel = data.labels[lastIdx];
  }

  showTooltip(event: MouseEvent, title: string, lines: string[]) {
    this.tooltip = { visible: true, x: event.clientX, y: event.clientY, title, lines };
  }

  moveTooltip(event: MouseEvent) {
    if (this.tooltip.visible) {
      this.tooltip.x = event.clientX;
      this.tooltip.y = event.clientY;
    }
  }

  hideTooltip() {
    this.tooltip.visible = false;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE FILTER METHODS
  // ══════════════════════════════════════════════════════════════════════════

  // ── Module 1: Budget Database ──
  filterBudgetHistory() {
    let data = [...this.allBudgetHistory];
    if (this.budgetCategoryFilter !== 'All') data = data.filter(d => d.category === this.budgetCategoryFilter);
    if (this.budgetTradeFilter !== 'All') data = data.filter(d => d.trade === this.budgetTradeFilter);
    this.budgetHistory = data;
  }

  onBudgetCategoryChange(value: string) {
    this.budgetCategoryFilter = value;
    this.filterBudgetHistory();
  }

  onBudgetTradeChange(value: string) {
    this.budgetTradeFilter = value;
    this.filterBudgetHistory();
  }

  // ── Module 2: Cost Code Structure ──
  filterCostCodes() {
    let data = [...this.allCostCodes];
    if (this.costCodeCategoryFilter !== 'All') data = data.filter(d => d.category === this.costCodeCategoryFilter);
    if (this.costCodeProjectFilter !== 'All') data = data.filter(d => d.project === this.costCodeProjectFilter);
    this.costCodes = data;
  }

  onCostCodeCategoryChange(value: string) {
    this.costCodeCategoryFilter = value;
    this.filterCostCodes();
  }

  onCostCodeProjectChange(value: string) {
    this.costCodeProjectFilter = value;
    this.filterCostCodes();
  }

  getCostCodeTotals() {
    const budget = this.costCodes.reduce((s, c) => s + c.budget, 0);
    const actual = this.costCodes.reduce((s, c) => s + c.actual, 0);
    return { budget, actual, variance: budget - actual };
  }

  // ── Module 3: Material Tracking ──
  filterMaterialTracking() {
    let data = [...this.allMaterialTracking];
    if (this.materialStatusFilter !== 'All') {
      data = data.filter(d => {
        if (this.materialStatusFilter === 'Pending') return d.prStatus === 'Pending' || d.lpoStatus === 'Pending';
        if (this.materialStatusFilter === 'In Progress') return d.grnStatus === 'Partial';
        if (this.materialStatusFilter === 'Completed') return d.grnStatus === 'Received' && d.consumed > 0;
        return true;
      });
    }
    if (this.materialProjectFilter !== 'All') data = data.filter(d => d.project === this.materialProjectFilter);
    this.materialTracking = data;
  }

  onMaterialStatusChange(value: string) {
    this.materialStatusFilter = value;
    this.filterMaterialTracking();
  }

  onMaterialProjectChange(value: string) {
    this.materialProjectFilter = value;
    this.filterMaterialTracking();
  }

  // ── Module 4: DO Management ──
  filterDeliveryOrders() {
    let data = [...this.allDeliveryOrders];
    if (this.doStatusFilter !== 'All') data = data.filter(d => d.status === this.doStatusFilter);
    if (this.doSiteFilter !== 'All') data = data.filter(d => d.toSite === this.doSiteFilter);
    this.deliveryOrders = data;
  }

  onDoStatusChange(value: string) {
    this.doStatusFilter = value;
    this.filterDeliveryOrders();
  }

  onDoSiteChange(value: string) {
    this.doSiteFilter = value;
    this.filterDeliveryOrders();
  }

  getDoTotals() {
    const sent = this.deliveryOrders.reduce((s, d) => s + d.qtySent, 0);
    const received = this.deliveryOrders.reduce((s, d) => s + d.qtyReceived, 0);
    const consumed = this.deliveryOrders.reduce((s, d) => s + d.consumed, 0);
    const balance = this.deliveryOrders.reduce((s, d) => s + d.balance, 0);
    return { sent, received, consumed, balance, loss: sent - received };
  }

  // ── Module 5: LPO Logs ──
  filterLpoLogs() {
    let data = [...this.allLpoLogs];
    if (this.lpoStatusFilter !== 'All') data = data.filter(d => d.status === this.lpoStatusFilter);
    if (this.lpoSupplierFilter !== 'All') data = data.filter(d => d.supplier === this.lpoSupplierFilter);
    this.lpoLogs = data;
  }

  onLpoStatusChange(value: string) {
    this.lpoStatusFilter = value;
    this.filterLpoLogs();
  }

  onLpoSupplierChange(value: string) {
    this.lpoSupplierFilter = value;
    this.filterLpoLogs();
  }

  getLpoTotals() {
    const lpoValue = this.lpoLogs.reduce((s, l) => s + l.lpoValue, 0);
    const delivered = this.lpoLogs.reduce((s, l) => s + l.delivered, 0);
    const invoiced = this.lpoLogs.reduce((s, l) => s + l.invoiced, 0);
    const paid = this.lpoLogs.reduce((s, l) => s + l.paid, 0);
    const outstanding = this.lpoLogs.reduce((s, l) => s + l.outstanding, 0);
    return { lpoValue, delivered, invoiced, paid, outstanding };
  }

  // ── Module 6: CTC / Management Reports ──
  filterCtcProjects() {
    let data = [...this.allCtcProjects];
    if (this.ctcProjectFilter !== 'All') data = data.filter(d => d.project === this.ctcProjectFilter);
    const mul = this.ctcTimeMultipliers[this.ctcTimePeriod] || 1;
    this.ctcProjects = data.map(d => ({
      ...d,
      contractValue: +(d.contractValue * mul).toFixed(1),
      budgetCost: +(d.budgetCost * mul).toFixed(1),
      actualCost: +(d.actualCost * mul).toFixed(1),
      committed: +(d.committed * mul).toFixed(1),
      ctc: +(d.ctc * mul).toFixed(1),
      revenue: +(d.revenue * mul).toFixed(1),
    }));
    // Compute summary
    const scaled = this.ctcProjects;
    this.ctcSummary = {
      totalContract: +scaled.reduce((s, d) => s + d.contractValue, 0).toFixed(1),
      totalBudget: +scaled.reduce((s, d) => s + d.budgetCost, 0).toFixed(1),
      totalActual: +scaled.reduce((s, d) => s + d.actualCost, 0).toFixed(1),
      totalCommitted: +scaled.reduce((s, d) => s + d.committed, 0).toFixed(1),
      totalCtc: +scaled.reduce((s, d) => s + d.ctc, 0).toFixed(1),
      totalRevenue: +scaled.reduce((s, d) => s + d.revenue, 0).toFixed(1),
      avgProgress: Math.round(scaled.reduce((s, d) => s + d.progress, 0) / (scaled.length || 1)),
      avgMargin: +(scaled.reduce((s, d) => s + ((d.contractValue - d.budgetCost) / d.contractValue) * 100, 0) / (scaled.length || 1)).toFixed(1),
    };
  }

  onCtcProjectChange(value: string) {
    this.ctcProjectFilter = value;
    this.filterCtcProjects();
  }

  onCtcTimePeriodChange(value: string) {
    this.ctcTimePeriod = value;
    this.filterCtcProjects();
  }

  // ── Chart computed data ──

  getBudgetChartData() {
    return this.budgetHistory.slice(0, 8).map(b => ({
      name: b.material.length > 20 ? b.material.substring(0, 20) + '...' : b.material,
      min: b.minRate, avg: b.avgRate, max: b.maxRate
    }));
  }

  getBudgetChartMax(): number {
    return Math.max(...this.budgetHistory.map(b => b.maxRate), 1);
  }

  getCostCodeCategorySplit() {
    const map = new Map<string, number>();
    this.costCodes.forEach(c => map.set(c.category, (map.get(c.category) || 0) + c.budget));
    const total = Array.from(map.values()).reduce((s, v) => s + v, 0) || 1;
    const colors: Record<string, string> = { 'Material': '#3b82f6', 'Labor': '#22c55e', 'Subcontractor': '#f97316', 'Equipment': '#8b5cf6' };
    let offset = 0;
    const circumference = 2 * Math.PI * 60;
    return Array.from(map.entries()).map(([cat, val]) => {
      const pct = (val / total) * 100;
      const segLen = (pct / 100) * circumference;
      const seg = { category: cat, value: val, pct: +pct.toFixed(1), color: colors[cat] || '#6b7280', dashArray: `${segLen} ${circumference - segLen}`, dashOffset: -offset };
      offset += segLen;
      return seg;
    });
  }

  getMaterialPipelineCounts() {
    const data = this.materialTracking;
    return {
      totalMR: data.length,
      prApproved: data.filter(m => m.prStatus === 'Approved').length,
      prPending: data.filter(m => m.prStatus === 'Pending').length,
      lpoIssued: data.filter(m => m.lpoStatus === 'Issued').length,
      lpoPending: data.filter(m => m.lpoStatus === 'Pending').length,
      grnReceived: data.filter(m => m.grnStatus === 'Received').length,
      grnPartial: data.filter(m => m.grnStatus === 'Partial').length,
      grnPending: data.filter(m => m.grnStatus === 'Pending').length,
      totalIssued: data.reduce((s, m) => s + m.issued, 0),
      totalConsumed: data.reduce((s, m) => s + m.consumed, 0),
    };
  }

  getDoChartData() {
    return this.deliveryOrders.filter(d => d.status === 'Delivered').slice(0, 6).map(d => ({
      site: d.toSite.split(' - ')[0],
      sent: d.qtySent,
      received: d.qtyReceived,
      consumed: d.consumed,
    }));
  }

  getDoChartMax(): number {
    return Math.max(...this.deliveryOrders.map(d => d.qtySent), 1);
  }

  getLpoPaymentFlow() {
    const t = this.getLpoTotals();
    const max = t.lpoValue || 1;
    return [
      { label: 'LPO Value', value: t.lpoValue, pct: 100, color: '#94a3b8' },
      { label: 'Delivered', value: t.delivered, pct: (t.delivered / max) * 100, color: '#3b82f6' },
      { label: 'Invoiced', value: t.invoiced, pct: (t.invoiced / max) * 100, color: '#8b5cf6' },
      { label: 'Paid', value: t.paid, pct: (t.paid / max) * 100, color: '#22c55e' },
      { label: 'Outstanding', value: t.outstanding, pct: (t.outstanding / max) * 100, color: '#ef4444' },
    ];
  }

  getCtcRevenueVsCost() {
    return this.ctcProjects.map(p => ({
      project: p.project.length > 12 ? p.project.substring(0, 12) + '..' : p.project,
      revenue: p.revenue,
      cost: p.actualCost + p.committed + p.ctc,
      margin: this.getProjectMargin(p),
    }));
  }

  getCtcRevenueMax(): number {
    return Math.max(...this.ctcProjects.map(p => Math.max(p.revenue, p.actualCost + p.committed + p.ctc)), 1);
  }

  getCtcOverallProgress(): number {
    return this.ctcSummary.avgProgress;
  }

  getCtcProgressDash(): string {
    const c = 2 * Math.PI * 45;
    return `${(this.ctcSummary.avgProgress / 100) * c} ${c}`;
  }

  getCtcBarWidth(actual: number, budget: number): number {
    return budget > 0 ? Math.min((actual / budget) * 100, 100) : 0;
  }

  getProjectMargin(p: any): number {
    return p.contractValue > 0 ? +((p.contractValue - p.actualCost - p.committed - p.ctc) / p.contractValue * 100).toFixed(1) : 0;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // Monthly Revenue vs Cost Graph
  // ══════════════════════════════════════════════════════════════════════════
  buildMrcPaths() {
    const data = this.monthlyRevenue;
    const n = data.length;
    const w = 500;
    const h = 240;
    const maxVal = Math.max(...data.map(d => Math.max(d.revenue, d.cost))) * 1.2;

    // Y-axis labels
    const step = maxVal / 4;
    this.mrcYLabels = [
      '$' + maxVal.toFixed(1) + 'M',
      '$' + (step * 3).toFixed(1) + 'M',
      '$' + (step * 2).toFixed(1) + 'M',
      '$' + step.toFixed(1) + 'M',
      '$0'
    ];

    const toY = (v: number) => h - (v / maxVal) * h;
    const toX = (i: number) => (i / (n - 1)) * w;

    // Build smooth curve helper
    const buildCurve = (values: number[]): string => {
      let path = `M${toX(0)},${toY(values[0])}`;
      for (let i = 1; i < n; i++) {
        const cx1 = toX(i - 1) + (toX(i) - toX(i - 1)) * 0.4;
        const cx2 = toX(i) - (toX(i) - toX(i - 1)) * 0.4;
        path += ` C${cx1},${toY(values[i - 1])} ${cx2},${toY(values[i])} ${toX(i)},${toY(values[i])}`;
      }
      return path;
    };

    const revValues = data.map(d => d.revenue);
    const costValues = data.map(d => d.cost);

    // Revenue line
    this.mrcRevenuePath = buildCurve(revValues);
    this.mrcRevenueAreaPath = this.mrcRevenuePath + ` L${w},${h} L0,${h} Z`;

    // Cost line
    this.mrcCostPath = buildCurve(costValues);
    this.mrcCostAreaPath = this.mrcCostPath + ` L${w},${h} L0,${h} Z`;

    // Profit area (between revenue and cost lines)
    const revCurve = buildCurve(revValues);
    let costReverse = `L${toX(n - 1)},${toY(costValues[n - 1])}`;
    for (let i = n - 2; i >= 0; i--) {
      const cx1 = toX(i + 1) - (toX(i + 1) - toX(i)) * 0.4;
      const cx2 = toX(i) + (toX(i + 1) - toX(i)) * 0.4;
      costReverse += ` C${cx1},${toY(costValues[i + 1])} ${cx2},${toY(costValues[i])} ${toX(i)},${toY(costValues[i])}`;
    }
    this.mrcProfitAreaPath = revCurve + costReverse + ' Z';

    // Data points for circles
    this.mrcRevenuePoints = data.map((_, i) => ({ x: toX(i), y: toY(revValues[i]) }));
    this.mrcCostPoints = data.map((_, i) => ({ x: toX(i), y: toY(costValues[i]) }));
  }

  getMrcTotalRevenue(): string {
    return this.monthlyRevenue.reduce((s, d) => s + d.revenue, 0).toFixed(1);
  }

  getMrcTotalCost(): string {
    return this.monthlyRevenue.reduce((s, d) => s + d.cost, 0).toFixed(1);
  }

  getMrcTotalProfit(): string {
    const rev = this.monthlyRevenue.reduce((s, d) => s + d.revenue, 0);
    const cost = this.monthlyRevenue.reduce((s, d) => s + d.cost, 0);
    return (rev - cost).toFixed(1);
  }

  getMrcAvgMargin(): string {
    const margins = this.monthlyRevenue.map(d => ((d.revenue - d.cost) / d.revenue) * 100);
    return (margins.reduce((s, m) => s + m, 0) / margins.length).toFixed(1);
  }
}
