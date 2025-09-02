import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TripService, Trip } from '../core/services/trip.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  private readonly tripService = inject(TripService);
  private readonly router = inject(Router);

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
    // Use Angular Router navigation instead of window.location.href
    this.router.navigate(['/trips', trip.tripId]);
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

    return diffHours > 0 ? `${diffHours}h ${diffMinutes}m` : `${diffMinutes}m`;
  }
}
