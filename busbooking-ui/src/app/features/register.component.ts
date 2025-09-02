import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h1>Create Account</h1>
          <p>Join us and start booking your bus trips</p>
        </div>

        <form (ngSubmit)="onRegister()" #registerForm="ngForm" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                [(ngModel)]="registerData.firstName"
                required
                class="form-input"
                placeholder="Enter first name"
                [class.error]="showError && !registerData.firstName"
              >
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                [(ngModel)]="registerData.lastName"
                required
                class="form-input"
                placeholder="Enter last name"
                [class.error]="showError && !registerData.lastName"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="registerData.username"
              required
              class="form-input"
              placeholder="Choose a username"
              [class.error]="showError && !registerData.username"
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="registerData.email"
              required
              email
              class="form-input"
              placeholder="Enter your email"
              [class.error]="showError && !registerData.email"
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="registerData.password"
              required
              minlength="6"
              class="form-input"
              placeholder="Create a password (min 6 characters)"
              [class.error]="showError && !registerData.password"
            >
          </div>

          <div class="form-actions">
            <button type="submit" class="register-button" [disabled]="loading">
              <span *ngIf="!loading">Create Account</span>
              <span *ngIf="loading">Creating Account...</span>
            </button>
          </div>

          <div class="error-message" *ngIf="error">
            {{ error }}
          </div>
        </form>

        <div class="register-footer">
          <p>Already have an account? <a routerLink="/login">Sign in</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  };

  loading = false;
  error = '';
  showError = false;

  onRegister(): void {
    this.showError = true;
    this.error = '';

    if (!this.registerData.firstName || !this.registerData.lastName || 
        !this.registerData.username || !this.registerData.email || !this.registerData.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    this.loading = true;
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.token) {
          this.router.navigate(['/trips']);
        } else {
          this.error = response.message || 'Registration failed';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    });
  }
}

