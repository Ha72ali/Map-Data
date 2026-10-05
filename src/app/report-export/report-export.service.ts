import { Injectable } from '@angular/core';

import { exportDashboardReportCsv } from './report-export.csv';
import { exportDashboardReportExcel } from './report-export.excel';
import { exportDashboardReportPdf } from './report-export.pdf';
import {
  buildDashboardReportSnapshot,
  ReportSnapshotSource,
} from './report-export.snapshot';
import {
  DashboardReportSnapshot,
  ReportExportRequest,
} from './report-export.types';

export type ReportExportProgressHandler = (message: string) => void;

@Injectable({ providedIn: 'root' })
export class ReportExportService {
  buildSnapshot(source: ReportSnapshotSource): DashboardReportSnapshot {
    return buildDashboardReportSnapshot(source);
  }

  /**
   * Runs export off the main thread tick to keep the UI responsive.
   */
  async export(
    source: ReportSnapshotSource,
    request: ReportExportRequest,
    onProgress?: ReportExportProgressHandler
  ): Promise<void> {
    const snapshot = this.buildSnapshot(source);

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });

    onProgress?.('Preparing report…');

    if (request.format === 'pdf') {
      await exportDashboardReportPdf(snapshot, request, onProgress);
      return;
    }

    if (request.format === 'excel') {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          exportDashboardReportExcel(snapshot, request);
          resolve();
        }, 0);
      });
      return;
    }

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        exportDashboardReportCsv(snapshot, request);
        resolve();
      }, 0);
    });
  }
}
