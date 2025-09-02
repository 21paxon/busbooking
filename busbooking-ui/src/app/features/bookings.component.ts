import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService, Booking } from '../core/services/booking.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bookings-container">
      <!-- Header -->
      <div class="bookings-header">
        <div class="header-content">
          <h1 class="page-title">My Bookings</h1>
          <p class="page-subtitle">View and manage your bus travel reservations</p>
        </div>
      </div>

      <!-- Content -->
      <div class="bookings-content">
        <div class="container">
          <!-- Loading State -->
          <div class="loading-container" *ngIf="loading">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading your bookings...</p>
          </div>

          <!-- Error State -->
          <div class="error-container" *ngIf="error && !loading">
            <div class="error-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="error-title">Unable to load bookings</h3>
            <p class="error-message">{{ error }}</p>
            <button class="retry-button" (click)="loadBookings()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M20.49 9C19.2214 4.33808 14.9086 1 10 1C5.09144 1 0.778563 4.33808 -0.49 9M3.51 15C4.77856 19.6619 9.09144 23 14 23C18.9086 23 23.2214 19.6619 24.49 15" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
              Try Again
            </button>
          </div>

          <!-- No Bookings State -->
          <div class="no-bookings" *ngIf="!loading && !error && bookings.length === 0">
            <div class="no-bookings-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="no-bookings-title">No bookings yet</h3>
            <p class="no-bookings-message">You haven't made any bus reservations yet. Start by exploring available trips!</p>
            <a routerLink="/trips" class="explore-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
              Explore Trips
            </a>
          </div>

          <!-- Bookings List -->
          <div class="bookings-list" *ngIf="!loading && !error && bookings.length > 0">
            <div class="bookings-stats">
              <div class="stat-item">
                <span class="stat-number">{{ bookings.length }}</span>
                <span class="stat-label">Total Bookings</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ getActiveBookings() }}</span>
                <span class="stat-label">Active</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ getCompletedBookings() }}</span>
                <span class="stat-label">Completed</span>
              </div>
            </div>

            <div class="bookings-grid">
              <div class="booking-card" *ngFor="let booking of bookings">
                <div class="booking-header">
                  <div class="booking-id">
                    <span class="id-label">Booking #</span>
                    <span class="id-value">{{ booking.bookingId }}</span>
                  </div>
                  <div class="booking-status" [class]="getStatusClass(booking.status)">
                    <span class="status-dot"></span>
                    {{ booking.status }}
                  </div>
                </div>

                <div class="booking-details">
                  <div class="trip-info">
                    <div class="route">
                      <span class="origin">{{ booking.trip.origin }}</span>
                      <div class="route-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <span class="destination">{{ booking.trip.destination }}</span>
                    </div>
                    <div class="trip-meta">
                      <span class="seats">{{ booking.seatsBooked.length }} seat{{ booking.seatsBooked.length !== 1 ? 's' : '' }}</span>
                      <span class="date">{{ formatDate(booking.trip.departureTime) }}</span>
                      <span class="bus">Bus {{ booking.trip.busNumber }}</span>
                    </div>
                  </div>
                </div>

                <div class="booking-actions">
                  <button class="view-button" (click)="viewBookingDetails(booking)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    View Details
                  </button>
                  <button class="cancel-button" (click)="cancelBooking(booking)" *ngIf="booking.status === 'CONFIRMED'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
  private readonly bookingService = inject(BookingService);
  bookings: Booking[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.error = '';
    
    // Use seeded demo USER UUID from backend import.sql
    const userId = '550e8400-e29b-41d4-a716-446655440011';
    const requestingUserId = userId;

    this.bookingService.byUser(userId, requestingUserId).subscribe({
      next: (data) => { 
        this.bookings = data; 
        this.loading = false; 
      },
      error: (e) => { 
        this.error = 'Failed to load your bookings. Please try again later.'; 
        this.loading = false; 
        console.error(e); 
      }
    });
  }

  getActiveBookings(): number {
    return this.bookings.filter(booking => 
      ['CONFIRMED', 'PENDING'].includes(booking.status)
    ).length;
  }

  getCompletedBookings(): number {
    return this.bookings.filter(booking => 
      ['COMPLETED', 'CANCELLED'].includes(booking.status)
    ).length;
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'active';
      case 'PENDING':
        return 'pending';
      case 'COMPLETED':
        return 'completed';
      case 'CANCELLED':
        return 'cancelled';
      default:
        return 'active';
    }
  }

  formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  viewBookingDetails(booking: Booking): void {
    // TODO: Implement booking details view
    console.log('Viewing booking details:', booking);
    alert(`Booking Details:\nBooking ID: ${booking.bookingId}\nFrom: ${booking.trip.origin}\nTo: ${booking.trip.destination}\nDate: ${this.formatDate(booking.trip.departureTime)}\nSeats: ${booking.seatsBooked.join(', ')}\nTotal Price: $${booking.totalPrice.toFixed(2)}\nStatus: ${booking.status}`);
  }

  cancelBooking(booking: Booking): void {
    // TODO: Implement booking cancellation
    console.log('Cancelling booking:', booking);
    if (confirm(`Are you sure you want to cancel your booking from ${booking.trip.origin} to ${booking.trip.destination}?`)) {
      alert('Booking cancelled successfully!');
      // In a real app, you would call the service to cancel the booking
    }
  }
}
