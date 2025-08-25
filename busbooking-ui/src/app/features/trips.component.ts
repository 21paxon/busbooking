import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService, Trip } from '../core/services/trip.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="trips-container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Find Your Perfect Journey</h1>
          <p class="hero-subtitle">Discover comfortable and reliable bus routes across the country</p>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="search-section">
        <div class="search-container">
          <div class="search-row">
            <div class="search-field">
              <label for="origin">From</label>
              <input
                type="text"
                id="origin"
                [(ngModel)]="searchOrigin"
                placeholder="Enter departure city"
                class="search-input"
              >
            </div>
            <div class="search-field">
              <label for="destination">To</label>
              <input
                type="text"
                id="destination"
                [(ngModel)]="searchDestination"
                placeholder="Enter destination city"
                class="search-input"
              >
            </div>
            <div class="search-field">
              <label for="date">Date</label>
              <input
                type="date"
                id="date"
                [(ngModel)]="searchDate"
                class="search-input"
              >
            </div>
            <button class="search-button" (click)="searchTrips()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section">
        <div class="results-header">
          <h2 class="results-title">Available Trips</h2>
          <div class="results-count" *ngIf="!loading && trips.length">
            {{ trips.length }} trip{{ trips.length !== 1 ? 's' : '' }} found
          </div>
        </div>

        <!-- Loading State -->
        <div class="loading-container" *ngIf="loading">
          <div class="loading-spinner"></div>
          <p class="loading-text">Searching for the best routes...</p>
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
          <h3 class="error-title">Oops! Something went wrong</h3>
          <p class="error-message">{{ error }}</p>
          <button class="retry-button" (click)="loadTrips()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M20.49 9C19.2214 4.33808 14.9086 1 10 1C5.09144 1 0.778563 4.33808 -0.49 9M3.51 15C4.77856 19.6619 9.09144 23 14 23C18.9086 23 23.2214 19.6619 24.49 15" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
            Try Again
          </button>
        </div>

        <!-- No Results State -->
        <div class="no-results" *ngIf="!loading && !error && trips.length === 0">
          <div class="no-results-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="no-results-title">No trips found</h3>
          <p class="no-results-message">Try adjusting your search criteria or check back later for new routes.</p>
        </div>

        <!-- Trips Grid -->
        <div class="trips-grid" *ngIf="!loading && !error && trips.length > 0">
          <div class="trip-card" *ngFor="let trip of trips">
            <div class="trip-header">
              <div class="route-info">
                <div class="route-cities">
                  <span class="city origin">{{ trip.origin }}</span>
                  <div class="route-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span class="city destination">{{ trip.destination }}</span>
                </div>
                <div class="route-duration">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  {{ getDuration(trip.departureTime, trip.arrivalTime) }}
                </div>
              </div>
              <div class="trip-price">
                <span class="price-amount">\${{ trip.price.toFixed(2) }}</span>
                <span class="price-label">per person</span>
              </div>



            </div>

            <div class="trip-details">
              <div class="time-info">
                <div class="departure">
                  <span class="time-label">Departure</span>
                  <span class="time-value">{{ formatTime(trip.departureTime) }}</span>
                </div>
                <div class="arrival">
                  <span class="time-label">Arrival</span>
                  <span class="time-value">{{ formatTime(trip.arrivalTime) }}</span>
                </div>
              </div>
              <div class="trip-features">
                <span class="feature">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  </svg>
                  {{ trip.availableSeats }} seats available
                </span>
                <span class="feature">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  </svg>
                  Bus {{ trip.busNumber }}
                </span>
                <span class="feature">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  </svg>
                  {{ formatDate(trip.departureTime) }}
                </span>
              </div>
            </div>

            <div class="trip-actions">
              <button class="book-button" (click)="bookTrip(trip)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                Book Now
              </button>
              <button class="details-button" (click)="viewTripDetails(trip)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                </svg>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit {
  private readonly tripService = inject(TripService);

  trips: Trip[] = [];
  loading = false;
  error = '';

  // Search filters
  searchOrigin = '';
  searchDestination = '';
  searchDate = '';

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.error = '';

    this.tripService.getAllTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load trips. Please try again later.';
        this.loading = false;
        console.error(e);
      }
    });
  }

  searchTrips(): void {
    this.loading = true;
    this.error = '';

    this.tripService.searchTrips(this.searchOrigin, this.searchDestination, this.searchDate).subscribe({
      next: (data) => {
        this.trips = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to search trips. Please try again later.';
        this.loading = false;
        console.error(e);
      }
    });
  }

  bookTrip(trip: Trip): void {
    // TODO: Implement booking functionality
    console.log('Booking trip:', trip);
    alert(`Booking trip from ${trip.origin} to ${trip.destination} for $${trip.price.toFixed(2)}`);
  }

  viewTripDetails(trip: Trip): void {
    // TODO: Implement trip details view
    console.log('Viewing trip details:', trip);
    alert(`Trip Details:\nFrom: ${trip.origin}\nTo: ${trip.destination}\nDeparture: ${this.formatTime(trip.departureTime)}\nArrival: ${this.formatTime(trip.arrivalTime)}\nPrice: $${trip.price.toFixed(2)}\nAvailable Seats: ${trip.availableSeats}`);
  }

  formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  getDuration(departureTime: string, arrivalTime: string): string {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const diffMs = arrival.getTime() - departure.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  }
}
