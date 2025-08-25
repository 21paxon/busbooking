import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Booking {
  bookingId: string;
  user: {
    userId: string;
    username: string;
    email: string;
  };
  trip: {
    tripId: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    busNumber: string;
  };
  bookingTime: string;
  seatsBooked: string[];
  totalPrice: number;
  status: string;
}

export interface BookingRequest {
  userId: string;
  tripId: string;
  seatsBooked: string[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  // Get all bookings
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching bookings:', error);
        return of(this.getSampleBookings());
      })
    );
  }

  // Get booking by ID
  getBookingById(id: string): Observable<Booking | undefined> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching booking ${id}:`, error);
        return of(undefined);
      })
    );
  }

  // Create new booking
  createBooking(bookingRequest: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, bookingRequest);
  }

  // Delete booking
  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get bookings by user
  getBookingsByUser(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(error => {
        console.error(`Error fetching bookings for user ${userId}:`, error);
        return of(this.getSampleBookings().filter(b => b.user.userId === userId));
      })
    );
  }

  // Get bookings by trip
  getBookingsByTrip(tripId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/trip/${tripId}`).pipe(
      catchError(error => {
        console.error(`Error fetching bookings for trip ${tripId}:`, error);
        return of(this.getSampleBookings().filter(b => b.trip.tripId === tripId));
      })
    );
  }

  // Alias for getBookingsByUser (for backward compatibility)
  byUser(userId: string): Observable<Booking[]> {
    return this.getBookingsByUser(userId);
  }

  // Alias for getBookingsByTrip (for backward compatibility)
  byTrip(tripId: string): Observable<Booking[]> {
    return this.getBookingsByTrip(tripId);
  }

  // Sample data for development/testing
  private getSampleBookings(): Booking[] {
    return [
      {
        bookingId: '1',
        user: {
          userId: 'user123',
          username: 'john_doe',
          email: 'john@example.com'
        },
        trip: {
          tripId: '1',
          origin: 'New York',
          destination: 'Boston',
          departureTime: '2024-12-25T08:00:00',
          arrivalTime: '2024-12-25T12:00:00',
          busNumber: 'NYB001'
        },
        bookingTime: '2024-12-20T10:30:00',
        seatsBooked: ['12A', '12B'],
        totalPrice: 90.00,
        status: 'CONFIRMED'
      },
      {
        bookingId: '2',
        user: {
          userId: 'user123',
          username: 'john_doe',
          email: 'john@example.com'
        },
        trip: {
          tripId: '3',
          origin: 'New York',
          destination: 'Washington DC',
          departureTime: '2024-12-25T09:30:00',
          arrivalTime: '2024-12-25T14:30:00',
          busNumber: 'NYW001'
        },
        bookingTime: '2024-12-21T14:15:00',
        seatsBooked: ['8C'],
        totalPrice: 55.00,
        status: 'CONFIRMED'
      },
      {
        bookingId: '3',
        user: {
          userId: 'user456',
          username: 'jane_smith',
          email: 'jane@example.com'
        },
        trip: {
          tripId: '2',
          origin: 'Boston',
          destination: 'New York',
          departureTime: '2024-12-25T14:00:00',
          arrivalTime: '2024-12-25T18:00:00',
          busNumber: 'BNY001'
        },
        bookingTime: '2024-12-22T09:45:00',
        seatsBooked: ['15D', '15E'],
        totalPrice: 84.00,
        status: 'CONFIRMED'
      }
    ];
  }
}





