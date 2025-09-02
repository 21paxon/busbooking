import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService, Trip } from '../core/services/trip.service';
import { AuthService, User } from '../core/services/auth.service';

@Component({
  selector: 'app-admin-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.css']
})
export class AdminTripsComponent implements OnInit {
  private readonly tripService = inject(TripService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  trips: Trip[] = [];
  loading = false;
  error = '';
  currentUser: User | null = null;

  ngOnInit(): void {
    console.log('🚀 AdminTripsComponent initialized');
    
    // Get current user
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user || user.role !== 'ADMIN') {
        console.log('❌ User not admin, redirecting to admin login');
        this.router.navigate(['/admin/login']);
        return;
      }
      console.log('✅ Admin user authenticated:', user);
      this.loadTrips();
    });
  }

  loadTrips(): void {
    console.log('📡 Attempting to load trips from database...');
    this.loading = true;
    this.error = '';
    
    this.tripService.getAllTrips().subscribe({
      next: (data) => {
        console.log('✅ Successfully loaded trips from database:', data);
        this.trips = data;
        this.loading = false;
        
        if (data.length === 0) {
          console.log('ℹ️ No trips found in database');
        } else {
          console.log(`🎯 Found ${data.length} trips in database`);
        }
      },
      error: (error) => {
        console.error('❌ Error loading trips from database:', error);
        this.error = error.message || 'Failed to load trips from database';
        this.loading = false;
        
        // Additional error details for debugging
        if (error.status) {
          console.error(`HTTP Status: ${error.status}`);
        }
        if (error.statusText) {
          console.error(`Status Text: ${error.statusText}`);
        }
        if (error.url) {
          console.error(`Request URL: ${error.url}`);
        }
      }
    });
  }

  deleteTrip(id: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      console.log(`🗑️ Attempting to delete trip: ${id}`);
      this.loading = true;
      this.error = '';
      
      this.tripService.deleteTrip(id).subscribe({
        next: () => {
          console.log('✅ Trip deleted successfully');
          this.loadTrips(); // Refresh the list
        },
        error: (error) => {
          console.error('❌ Error deleting trip:', error);
          this.error = error.message || 'Failed to delete trip';
          this.loading = false;
        }
      });
    }
  }

  refreshTrips(): void {
    console.log('🔄 Refreshing trips...');
    this.loadTrips();
  }

  clearError(): void {
    this.error = '';
  }

  logout(): void {
    console.log('🚪 Admin logging out');
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
