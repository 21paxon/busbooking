# Trip Management System

## Overview
The Trip Management System is a comprehensive solution for managing bus trips in the BusBooking application. It provides both user-facing trip browsing and admin-facing trip management capabilities.

## Features

### 🚌 User Features
- **Trip Browsing**: View all available trips with detailed information
- **Advanced Search**: Search trips by origin, destination, and date
- **Trip Details**: View comprehensive trip information including pricing and seat availability
- **Responsive Design**: Mobile-friendly interface for all devices

### 🔧 Admin Features
- **Trip Creation**: Add new trips with all necessary details
- **Trip Editing**: Modify existing trip information
- **Trip Deletion**: Remove trips from the system
- **Bulk Management**: View and manage all trips in a table format
- **Search & Filter**: Quickly find specific trips

## Architecture

### Frontend Components
1. **TripsComponent** (`trips.component.ts`)
   - Main trip browsing interface
   - Search and filter functionality
   - Trip card display with booking actions

2. **TripDetailsComponent** (`trip-details.component.ts`)
   - Detailed trip information view
   - Direct booking functionality
   - Navigation back to trips list

3. **AdminTripsComponent** (`admin-trips.component.ts`)
   - Administrative trip management interface
   - CRUD operations for trips
   - Form-based trip creation/editing

### Backend Services
1. **TripService** (`TripService.java`)
   - Business logic for trip operations
   - Search and filtering implementation
   - Seat management functionality

2. **TripController** (`TripController.java`)
   - REST API endpoints for trip operations
   - Admin authentication (development mode)
   - CRUD operations exposed via HTTP

3. **TripRepository** (`TripRepository.java`)
   - Data access layer for trips
   - Custom query methods for filtering
   - JPA-based database operations

## API Endpoints

### Public Endpoints (No Authentication Required)
```
GET /api/trips                    - Get all trips
GET /api/trips/{id}              - Get trip by ID
GET /api/trips/search            - Search trips with filters
GET /api/trips/filter/origin     - Filter by origin
GET /api/trips/filter/destination - Filter by destination
GET /api/trips/filter/route      - Filter by origin and destination
```

### Admin Endpoints (Development Mode - No Auth Required)
```
POST /api/trips                  - Create new trip
PUT /api/trips/{id}             - Update existing trip
DELETE /api/trips/{id}          - Delete trip
```

## Data Model

### Trip Entity
```java
@Entity
public class Trip {
    @Id
    private UUID tripId;
    private String origin;
    private String destination;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private double price;
    private int totalSeats;
    private int availableSeats;
    private String busNumber;
    private List<String> bookedSeats;
}
```

### Frontend Interface
```typescript
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
```

## Usage Examples

### Creating a New Trip (Admin)
1. Navigate to `/admin/trips`
2. Click "Add New Trip" button
3. Fill in trip details:
   - Origin and destination cities
   - Departure and arrival times
   - Price and seat capacity
   - Bus number
4. Click "Save Trip"

### Searching for Trips (Users)
1. Navigate to `/trips`
2. Use search filters:
   - Enter departure city in "From" field
   - Enter destination city in "To" field
   - Select travel date
3. Click "Search" button
4. View filtered results

### Booking a Trip
1. From trips list, click "Book Now" on desired trip
2. Or click "View Details" to see more information
3. On trip details page, click "Book Now"
4. Complete booking process

## Search Functionality

### Search Criteria
- **Origin**: Departure city (case-insensitive partial match)
- **Destination**: Arrival city (case-insensitive partial match)
- **Date**: Travel date (exact date match)

### Search Logic
1. **All criteria provided**: Search by origin, destination, and date
2. **Origin + Destination**: Search by route only
3. **Single criterion**: Search by individual field
4. **No criteria**: Return all trips

### Date Handling
- Backend parses date strings with error handling
- Frontend uses HTML5 datetime-local inputs
- Automatic fallback to sample data on parsing errors

## Error Handling

### Frontend
- Loading states for all async operations
- Error messages with retry functionality
- Form validation for required fields
- Graceful fallback to sample data

### Backend
- Exception handling for invalid UUIDs
- Date parsing error handling
- Proper HTTP status codes
- Logging for debugging

## Security Considerations

### Current State (Development)
- Admin endpoints are accessible without authentication
- AdminUserId parameter is optional
- TODO: Implement proper admin authentication

### Future Implementation
- JWT-based authentication
- Role-based access control
- Admin user verification
- Secure session management

## Performance Optimizations

### Database
- Indexed fields for common searches
- Efficient query methods
- Connection pooling

### Frontend
- Lazy loading of components
- Efficient filtering algorithms
- Responsive design for mobile

## Troubleshooting

### Common Issues

1. **Trips not loading**
   - Check backend server status
   - Verify database connection
   - Check browser console for errors

2. **Search not working**
   - Verify date format (YYYY-MM-DD)
   - Check for special characters in city names
   - Ensure backend is running

3. **Admin functions not working**
   - Verify route `/admin/trips` is accessible
   - Check component imports
   - Verify service methods are working

### Debug Steps
1. Check browser console for JavaScript errors
2. Verify backend logs for server errors
3. Test API endpoints directly
4. Check database for data integrity

## Future Enhancements

### Planned Features
- Real-time seat availability updates
- Advanced filtering (price range, duration)
- Trip scheduling and recurring trips
- Integration with external booking systems
- Analytics and reporting dashboard

### Technical Improvements
- WebSocket support for real-time updates
- Caching layer for improved performance
- API rate limiting
- Comprehensive logging and monitoring

## Development Setup

### Prerequisites
- Java 17+
- Angular 17+
- MySQL 8.0+
- Maven 3.6+

### Running the Application
1. Start MySQL database
2. Run Spring Boot backend: `mvn spring-boot:run`
3. Run Angular frontend: `ng serve`
4. Access admin panel at: `http://localhost:4200/admin/trips`

## Contributing
When contributing to the trip management system:
1. Follow existing code patterns
2. Add proper error handling
3. Include unit tests for new functionality
4. Update documentation for new features
5. Test both frontend and backend thoroughly


