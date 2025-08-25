import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  // Get all trips from backend
  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching trips:', error);
        // Return sample data if backend is not available
        return of(this.getSampleTrips());
      })
    );
  }

  // Get trip by ID
  getTripById(id: string): Observable<Trip | undefined> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching trip ${id}:`, error);
        return of(undefined);
      })
    );
  }

  // Create new trip
  createTrip(trip: Omit<Trip, 'tripId'>): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  // Update existing trip
  updateTrip(id: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${id}`, trip);
  }

  // Delete trip
  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Search trips with filters
  searchTrips(origin?: string, destination?: string, date?: string): Observable<Trip[]> {
    let url = this.apiUrl;
    const params: string[] = [];
    
    if (origin) params.push(`origin=${encodeURIComponent(origin)}`);
    if (destination) params.push(`destination=${encodeURIComponent(destination)}`);
    if (date) params.push(`date=${encodeURIComponent(date)}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return this.http.get<Trip[]>(url).pipe(
      catchError(error => {
        console.error('Error searching trips:', error);
        // Return filtered sample data if backend is not available
        return of(this.filterSampleTrips(origin, destination, date));
      })
    );
  }

  // Sample data for development/testing
  private getSampleTrips(): Trip[] {
    return [
      {
        tripId: '1',
        origin: 'New York',
        destination: 'Boston',
        departureTime: '2024-12-25T08:00:00',
        arrivalTime: '2024-12-25T12:00:00',
        price: 45.00,
        totalSeats: 50,
        availableSeats: 35,
        busNumber: 'NYB001',
        bookedSeats: ['1A', '2B', '3C', '4D', '5E', '6F', '7G', '8H', '9I', '10J', '11K', '12L', '13M', '14N', '15O']
      },
      {
        tripId: '2',
        origin: 'Boston',
        destination: 'New York',
        departureTime: '2024-12-25T14:00:00',
        arrivalTime: '2024-12-25T18:00:00',
        price: 42.00,
        totalSeats: 50,
        availableSeats: 28,
        busNumber: 'BNY001',
        bookedSeats: ['1A', '2B', '3C', '4D', '5E', '6F', '7G', '8H', '9I', '10J', '11K', '12L', '13M', '14N', '15O', '16P', '17Q', '18R', '19S', '20T', '21U', '22V']
      },
      {
        tripId: '3',
        origin: 'New York',
        destination: 'Washington DC',
        departureTime: '2024-12-25T09:30:00',
        arrivalTime: '2024-12-25T14:30:00',
        price: 55.00,
        totalSeats: 45,
        availableSeats: 20,
        busNumber: 'NYW001',
        bookedSeats: ['1A', '2B', '3C', '4D', '5E', '6F', '7G', '8H', '9I', '10J', '11K', '12L', '13M', '14N', '15O', '16P', '17Q', '18R', '19S', '20T', '21U', '22V', '23W', '24X', '25Y']
      },
      {
        tripId: '4',
        origin: 'Washington DC',
        destination: 'New York',
        departureTime: '2024-12-25T16:00:00',
        arrivalTime: '2024-12-25T21:00:00',
        price: 52.00,
        totalSeats: 45,
        availableSeats: 15,
        busNumber: 'WNY001',
        bookedSeats: ['1A', '2B', '3C', '4D', '5E', '6F', '7G', '8H', '9I', '10J', '11K', '12L', '13M', '14N', '15O', '16P', '17Q', '18R', '19S', '20T', '21U', '22V', '23W', '24X', '25Y', '26Z', '27AA', '28BB', '29CC', '30DD']
      },
      {
        tripId: '5',
        origin: 'Boston',
        destination: 'Washington DC',
        departureTime: '2024-12-25T10:00:00',
        arrivalTime: '2024-12-25T18:00:00',
        price: 75.00,
        totalSeats: 40,
        availableSeats: 25,
        busNumber: 'BWD001',
        bookedSeats: ['1A', '2B', '3C', '4D', '5E', '6F', '7G', '8H', '9I', '10J', '11K', '12L', '13M', '14N', '15O']
      }
    ];
  }

  // Filter sample trips based on search criteria
  private filterSampleTrips(origin?: string, destination?: string, date?: string): Trip[] {
    let trips = this.getSampleTrips();
    
    if (origin) {
      trips = trips.filter(trip => 
        trip.origin.toLowerCase().includes(origin.toLowerCase())
      );
    }
    
    if (destination) {
      trips = trips.filter(trip => 
        trip.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    if (date) {
      const searchDate = new Date(date);
      trips = trips.filter(trip => {
        const tripDate = new Date(trip.departureTime);
        return tripDate.toDateString() === searchDate.toDateString();
      });
    }
    
    return trips;
  }
}





