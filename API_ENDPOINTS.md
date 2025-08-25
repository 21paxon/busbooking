# BusBooking System - API Endpoints Documentation

## 🔐 Authentication Endpoints

### User Registration
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 200 OK
{
  "token": "JWT_TOKEN_uuid",
  "userId": "uuid",
  "email": "user@example.com",
  "username": "john_doe",
  "role": "USER",
  "message": "User registered successfully"
}
```

### User Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "JWT_TOKEN_uuid",
  "userId": "uuid",
  "email": "user@example.com",
  "username": "john_doe",
  "role": "USER",
  "message": "Login successful"
}
```

## 🚌 Trip Management Endpoints

### Get All Trips (Public)
```
GET /api/trips

Response: 200 OK
[
  {
    "tripId": "uuid",
    "origin": "New York",
    "destination": "Boston",
    "departureTime": "2024-12-25T08:00:00",
    "arrivalTime": "2024-12-25T12:00:00",
    "price": 45.00,
    "totalSeats": 50,
    "availableSeats": 35,
    "busNumber": "NYB001",
    "bookedSeats": ["1A", "2B", "3C"]
  }
]
```

### Get Trip by ID (Public)
```
GET /api/trips/{tripId}

Response: 200 OK
{
  "tripId": "uuid",
  "origin": "New York",
  "destination": "Boston",
  "departureTime": "2024-12-25T08:00:00",
  "arrivalTime": "2024-12-25T12:00:00",
  "price": 45.00,
  "totalSeats": 50,
  "availableSeats": 35,
  "busNumber": "NYB001",
  "bookedSeats": ["1A", "2B", "3C"]
}
```

### Create New Trip (Admin Only)
```
POST /api/trips?adminUserId={adminUserId}
Content-Type: application/json

{
  "origin": "New York",
  "destination": "Boston",
  "departureTime": "2024-12-25T08:00:00",
  "arrivalTime": "2024-12-25T12:00:00",
  "price": 45.00,
  "totalSeats": 50,
  "availableSeats": 50,
  "busNumber": "NYB001",
  "bookedSeats": []
}

Response: 200 OK (if admin) or 403 Forbidden (if not admin)
```

### Update Trip (Admin Only)
```
PUT /api/trips/{tripId}?adminUserId={adminUserId}
Content-Type: application/json

{
  "origin": "New York",
  "destination": "Boston",
  "departureTime": "2024-12-25T08:00:00",
  "arrivalTime": "2024-12-25T12:00:00",
  "price": 50.00,
  "totalSeats": 50,
  "availableSeats": 35,
  "busNumber": "NYB001",
  "bookedSeats": ["1A", "2B", "3C"]
}

Response: 200 OK (if admin) or 403 Forbidden (if not admin)
```

### Delete Trip (Admin Only)
```
DELETE /api/trips/{tripId}?adminUserId={adminUserId}

Response: 204 No Content (if admin) or 403 Forbidden (if not admin)
```

### Filter Trips by Origin
```
GET /api/trips/filter/origin?origin=New York

Response: 200 OK
[Array of trips with origin containing "New York"]
```

### Filter Trips by Destination
```
GET /api/trips/filter/destination?destination=Boston

Response: 200 OK
[Array of trips with destination containing "Boston"]
```

### Filter Trips by Route
```
GET /api/trips/filter/route?origin=New York&destination=Boston

Response: 200 OK
[Array of trips from New York to Boston]
```

### Search Trips (Multiple Criteria)
```
GET /api/trips/search?origin=New York&destination=Boston&date=2024-12-25

Response: 200 OK
[Array of trips matching all criteria]
```

## 🎫 Booking Management Endpoints

### Get All Bookings (Admin Only)
```
GET /api/bookings?adminUserId={adminUserId}

Response: 200 OK (if admin) or 403 Forbidden (if not admin)
[Array of all bookings]
```

### Get Booking by ID
```
GET /api/bookings/{bookingId}?userId={userId}

Response: 200 OK (if user owns booking or is admin) or 403 Forbidden
{
  "bookingId": "uuid",
  "user": {
    "userId": "uuid",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "trip": {
    "tripId": "uuid",
    "origin": "New York",
    "destination": "Boston",
    "departureTime": "2024-12-25T08:00:00",
    "arrivalTime": "2024-12-25T12:00:00",
    "busNumber": "NYB001"
  },
  "bookingTime": "2024-12-20T10:30:00",
  "seatsBooked": ["12A", "12B"],
  "totalPrice": 90.00,
  "status": "CONFIRMED"
}
```

### Create New Booking
```
POST /api/bookings
Content-Type: application/json

{
  "userId": "uuid",
  "tripId": "uuid",
  "seatsBooked": ["12A", "12B"],
  "totalPrice": 90.00
}

Response: 200 OK
{
  "bookingId": "uuid",
  "user": {...},
  "trip": {...},
  "bookingTime": "2024-12-20T10:30:00",
  "seatsBooked": ["12A", "12B"],
  "totalPrice": 90.00,
  "status": "PENDING"
}
```

### Update Booking
```
PUT /api/bookings/{bookingId}
Content-Type: application/json

{
  "status": "CANCELLED",
  "seatsBooked": ["12A", "12B"],
  "totalPrice": 90.00
}

Response: 200 OK
```

### Delete Booking
```
DELETE /api/bookings/{bookingId}?userId={userId}

Response: 204 No Content (if user owns booking or is admin) or 403 Forbidden
```

### Get Bookings by User
```
GET /api/bookings/user/{userId}?requestingUserId={requestingUserId}

Response: 200 OK (if requesting user is admin or requesting their own bookings) or 403 Forbidden
[Array of user's bookings]
```

### Get Bookings by Trip (Admin Only)
```
GET /api/bookings/trip/{tripId}?adminUserId={adminUserId}

Response: 200 OK (if admin) or 403 Forbidden (if not admin)
[Array of bookings for the trip]
```

### Cancel Booking
```
PUT /api/bookings/{bookingId}/cancel?userId={userId}

Response: 200 OK (if user owns booking or is admin) or 403 Forbidden
{
  "bookingId": "uuid",
  "status": "CANCELLED",
  ...
}
```

### Get Booking Statistics (Admin Only)
```
GET /api/bookings/stats?adminUserId={adminUserId}

Response: 200 OK (if admin) or 403 Forbidden (if not admin)
{
  "totalBookings": 150,
  "confirmedBookings": 120,
  "cancelledBookings": 30
}
```

## 🔍 Trip Filtering Examples

### Search for trips from New York
```
GET /api/trips/filter/origin?origin=New York
```

### Search for trips to Boston
```
GET /api/trips/filter/destination?destination=Boston
```

### Search for trips from New York to Boston
```
GET /api/trips/filter/route?origin=New York&destination=Boston
```

### Search for trips on a specific date
```
GET /api/trips/search?date=2024-12-25
```

### Search with multiple criteria
```
GET /api/trips/search?origin=New York&destination=Boston&date=2024-12-25
```

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request data"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied - insufficient permissions"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## 🔐 Authentication & Authorization

### User Roles
- **USER**: Can view trips, make bookings, manage their own bookings
- **ADMIN**: Can do everything a user can, plus manage trips and view all bookings

### Security Notes
- All admin operations require `adminUserId` parameter
- Users can only access their own data unless they are admin
- Passwords are encrypted using BCrypt
- CORS is enabled for frontend integration

## 📱 Frontend Integration

### Headers
```
Content-Type: application/json
Authorization: Bearer {token} (for future JWT implementation)
```

### Error Handling
- Check HTTP status codes
- Parse error messages from response body
- Handle 403 Forbidden for unauthorized access
- Handle 404 Not Found for missing resources

## 🚀 Testing the API

### Using curl
```bash
# Test authentication
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser","firstName":"Test","lastName":"User"}'

# Test trip retrieval
curl http://localhost:8080/api/trips

# Test booking creation
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"userId":"uuid","tripId":"uuid","seatsBooked":["1A"],"totalPrice":45.00}'
```

### Using Postman
1. Import the endpoints
2. Set base URL to `http://localhost:8080`
3. Test each endpoint with appropriate parameters
4. Verify responses and error handling
