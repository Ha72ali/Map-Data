import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { API_BASE } from '../../../core/services/api.config';
import { ToastService } from '../../../core/services/toast.service';

function matchPasswords(group: AbstractControl) {
  return group.get('newPassword')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly submitting = signal(false);
  readonly token = signal('');

  form = this.fb.nonNullable.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: matchPasswords }
  );

  ngOnInit(): void {
    this.token.set(this.route.snapshot.queryParamMap.get('token') || '');
  }

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.token()) {
      this.toast.error('Missing or invalid reset token');
      return;
    }
    this.submitting.set(true);
    this.http
      .post(`${API_BASE}/auth/reset-password`, {
        token: this.token(),
        newPassword: this.form.getRawValue().newPassword,
      })
      .subscribe({
        next: () => {
          this.toast.success('Password reset. Please sign in.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.submitting.set(false);
          this.toast.error(err?.error?.message || 'Reset failed');
        },
      });
  }
}
