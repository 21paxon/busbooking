import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="loginData.email"
              required
              email
              class="form-input"
              placeholder="Enter your email"
              [class.error]="showError && !loginData.email"
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="loginData.password"
              required
              class="form-input"
              placeholder="Enter your password"
              [class.error]="showError && !loginData.password"
            >
          </div>

          <div class="form-actions">
            <button type="submit" class="login-button" [disabled]="loading">
              <span *ngIf="!loading">Sign In</span>
              <span *ngIf="loading">Signing In...</span>
            </button>
          </div>

          <div class="error-message" *ngIf="error">
            {{ error }}
          </div>
        </form>

        <div class="login-footer">
          <p>Don't have an account? <a routerLink="/register">Sign up</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginData = {
    email: '',
    password: ''
  };

  loading = false;
  error = '';
  showError = false;

  onLogin(): void {
    this.showError = true;
    this.error = '';

    if (!this.loginData.email || !this.loginData.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.token) {
          this.router.navigate(['/trips']);
        } else {
          this.error = response.message || 'Login failed';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      }
    });
  }
}

