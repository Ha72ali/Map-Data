import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="err">
      <mat-icon class="big">block</mat-icon>
      <h1>403 — Forbidden</h1>
      <p>You don't have permission to view this page.</p>
      <a mat-raised-button color="primary" routerLink="/admin/dashboard">Back to Dashboard</a>
    </div>
  `,
  styles: [
    `.err { text-align: center; padding: 80px 16px; }
     .big { font-size: 64px; height: 64px; width: 64px; color: #c0392b; }
     h1 { margin: 12px 0 4px; }`,
  ],
})
export class ForbiddenComponent {}
