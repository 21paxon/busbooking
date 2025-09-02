import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate() {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user && user.role === 'ADMIN') {
          return true;
        } else {
          // Redirect to admin login if not admin
          this.router.navigate(['/admin/login']);
          return false;
        }
      })
    );
  }
}

