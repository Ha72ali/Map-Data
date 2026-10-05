import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/** Generic "coming soon" page for menu items without a full screen yet (Reports, Settings). */
@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <h1 class="page-title">{{ title }}</h1>
    <mat-card>
      <mat-card-content class="body">
        <mat-icon>construction</mat-icon>
        <p>The <strong>{{ title }}</strong> module is coming soon.</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `.page-title { margin: 0 0 20px; font-size: 24px; font-weight: 600; }
     .body { display: flex; align-items: center; gap: 12px; padding: 24px; opacity: 0.75; }
     mat-icon { color: #e67e22; }`,
  ],
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);
  title = this.route.snapshot.data['title'] || 'Module';
}
