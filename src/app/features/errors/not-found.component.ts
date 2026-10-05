import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="err">
      <mat-icon class="big">search_off</mat-icon>
      <h1>404 — Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a mat-raised-button color="primary" routerLink="/admin/dashboard">Back to Dashboard</a>
    </div>
  `,
  styles: [
    `.err { text-align: center; padding: 80px 16px; }
     .big { font-size: 64px; height: 64px; width: 64px; color: #7f8c8d; }
     h1 { margin: 12px 0 4px; }`,
  ],
})
export class NotFoundComponent {}
