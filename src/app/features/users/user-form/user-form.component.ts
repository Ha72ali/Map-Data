import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { ToastService } from '../../../core/services/toast.service';
import { Role } from '../../../core/models/auth.models';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userSvc = inject(UserService);
  private roleSvc = inject(RoleService);
  private toast = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly roles = signal<Role[]>([]);
  readonly editId = signal<string | null>(null);
  readonly saving = signal(false);
  readonly isEdit = () => this.editId() !== null;

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: [''],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6)]],
    phone: [''],
    role: ['', Validators.required],
    status: ['active'],
  });

  ngOnInit(): void {
    this.roleSvc.list().subscribe((r) => this.roles.set(r));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId.set(id);
      // In edit mode, password is optional and username immutable.
      this.form.controls.password.clearValidators();
      this.form.controls.password.updateValueAndValidity();
      this.userSvc.get(id).subscribe((u) => {
        this.form.patchValue({
          firstName: u.firstName,
          lastName: u.lastName,
          username: u.username,
          email: u.email,
          phone: u.phone || '',
          role: u.role?.id || '',
          status: u.status,
        });
        this.form.controls.username.disable();
      });
    } else {
      // Create mode requires a password.
      this.form.controls.password.addValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const v = this.form.getRawValue();
    const done = {
      next: () => {
        this.toast.success(this.isEdit() ? 'User updated' : 'User created');
        this.router.navigate(['/admin/users']);
      },
      error: (err: any) => {
        this.saving.set(false);
        this.toast.error(err?.error?.message || 'Save failed');
      },
    };

    if (this.isEdit()) {
      const body: any = { firstName: v.firstName, lastName: v.lastName, phone: v.phone, role: v.role, status: v.status };
      if (v.password) body.password = v.password;
      this.userSvc.update(this.editId()!, body).subscribe(done);
    } else {
      this.userSvc
        .create({
          firstName: v.firstName,
          lastName: v.lastName,
          username: v.username,
          email: v.email,
          password: v.password,
          phone: v.phone,
          role: v.role,
          status: v.status as any,
        })
        .subscribe(done);
    }
  }
}
