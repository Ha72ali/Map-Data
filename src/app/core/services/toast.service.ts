import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snack = inject(MatSnackBar);

  success(message: string): void {
    this.open(message, 'toast-success');
  }

  error(message: string): void {
    this.open(message, 'toast-error');
  }

  info(message: string): void {
    this.open(message, 'toast-info');
  }

  private open(message: string, panelClass: string): void {
    this.snack.open(message, 'Dismiss', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
