import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Trip {
  tripId: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  busNumber: string;
  bookedSeats: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = `${environment.apiUrl}/trips`;

  constructor(private http: HttpClient) {}

  // ✅ Get all trips from database
  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching trips from database:', error);
        return throwError(() => new Error('Failed to load trips from database'));
      })
    );
  }

  // ✅ Get trip by ID from database
  getTripById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching trip ${id} from database:`, error);
        return throwError(() => new Error(`Failed to load trip ${id}`));
      })
    );
  }

  // ✅ Create new trip in database
  createTrip(trip: Omit<Trip, 'tripId'>): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip).pipe(
      catchError(error => {
        console.error('Error creating trip in database:', error);
        return throwError(() => new Error('Failed to create trip'));
      })
    );
  }

  // ✅ Update trip in database
  updateTrip(id: string, trip: Omit<Trip, 'tripId'>): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${id}`, trip).pipe(
      catchError(error => {
        console.error(`Error updating trip ${id} in database:`, error);
        return throwError(() => new Error('Failed to update trip'));
      })
    );
  }

  // ✅ Delete trip from database
  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting trip ${id} from database:`, error);
        return throwError(() => new Error('Failed to delete trip'));
      })
    );
  }

  // ✅ Search trips in database
  searchTrips(origin?: string, destination?: string, date?: string): Observable<Trip[]> {
    let url = `${this.apiUrl}/search`;
    const params: string[] = [];

    if (origin) params.push(`origin=${encodeURIComponent(origin)}`);
    if (destination) params.push(`destination=${encodeURIComponent(destination)}`);
    if (date) params.push(`date=${encodeURIComponent(date)}`);

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return this.http.get<Trip[]>(url).pipe(
      catchError(error => {
        console.error('Error searching trips in database:', error);
        return throwError(() => new Error('Failed to search trips'));
      })
    );
  }
}
