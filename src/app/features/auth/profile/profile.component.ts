import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
    this.profileForm.disable();
  }

  toggleEdit(): void {
    if (this.isEditing()) {
      this.profileForm.disable();
      // Reset form to original values
      const user = this.authService.getCurrentUser();
      if (user) {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: ''
        });
      }
    } else {
      this.profileForm.enable();
    }
    this.isEditing.set(!this.isEditing());
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user || !user.id) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const updates: any = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email
    };

    // Only include password if it was changed
    if (this.profileForm.value.password) {
      updates.password = this.profileForm.value.password;
    }

    this.authService.updateProfile(user.id, updates).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Profile updated successfully!');
        this.isEditing.set(false);
        this.profileForm.disable();
        this.profileForm.patchValue({ password: '' });
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Failed to update profile');
      }
    });
  }

  deleteAccount(): void {
    const user = this.authService.getCurrentUser();
    if (!user || !user.id) {
      return;
    }

    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.isLoading.set(true);
      this.authService.deleteAccount(user.id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.message || 'Failed to delete account');
        }
      });
    }
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }
}
