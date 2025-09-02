import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginData = {
    email: '',
    password: ''
  };

  loading = false;
  error = '';

  onAdminLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.role === 'ADMIN') {
          console.log('✅ Admin login successful:', response);
          this.router.navigate(['/admin/trips']);
        } else {
          this.error = 'Access denied. Admin privileges required.';
          this.authService.logout(); // Clear the non-admin session
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || 'Login failed. Please check your credentials.';
        console.error('❌ Admin login error:', error);
      }
    });
  }

  goToUserLogin(): void {
    this.router.navigate(['/login']);
  }

  goToUserRegister(): void {
    this.router.navigate(['/register']);
  }
}

