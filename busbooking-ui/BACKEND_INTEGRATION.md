# Backend Integration Guide

This document explains how to connect your Angular frontend with your Spring Boot backend.

## 🚀 Quick Start

### 1. Start Your Spring Boot Backend

First, make sure your Spring Boot application is running:

```bash
# Navigate to the root directory (where pom.xml is located)
cd /path/to/busbooking

# Start the Spring Boot application
mvn spring-boot:run
```

Your backend will start on `http://localhost:8080`

### 2. Start Your Angular Frontend

In a new terminal, start the Angular development server:

```bash
# Navigate to the Angular project directory
cd busbooking-ui

# Install dependencies (if not already done)
npm install

# Start the development server
npm start
# or
ng serve --proxy-config proxy.conf.json --port 4200
```

Your frontend will start on `http://localhost:4200`

## 🔧 Configuration

### Proxy Configuration

The Angular app is configured to proxy API requests to your Spring Boot backend:

```json
// proxy.conf.json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

This means:
- Frontend requests to `/api/trips` → Backend `http://localhost:8080/api/trips`
- Frontend requests to `/api/bookings` → Backend `http://localhost:8080/api/bookings`

### Environment Configuration

The app uses environment files for configuration:

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

## 📡 API Endpoints

Your Spring Boot backend provides these endpoints:

### Trips API
- `GET /api/trips` - Get all trips
- `GET /api/trips/{id}` - Get trip by ID
- `POST /api/trips` - Create new trip
- `PUT /api/trips/{id}` - Update trip
- `DELETE /api/trips/{id}` - Delete trip

### Bookings API
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/{id}` - Delete booking
- `GET /api/bookings/user/{userId}` - Get bookings by user
- `GET /api/bookings/trip/{tripId}` - Get bookings by trip

## 🧪 Testing the Connection

### 1. Check Backend Status

Visit `http://localhost:8080` in your browser. You should see your Spring Boot application running.

### 2. Test API Endpoints

Test the API endpoints directly:

```bash
# Test trips endpoint
curl http://localhost:8080/api/trips

# Test bookings endpoint
curl http://localhost:8080/api/bookings
```

### 3. Test Frontend Integration

1. Open `http://localhost:4200` in your browser
2. Navigate to the Trips page
3. Check the browser's Network tab to see API requests
4. Verify that data is being fetched from your backend

## 🔍 Troubleshooting

### Common Issues

#### 1. CORS Errors
If you see CORS errors, ensure your Spring Boot app has CORS configured:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
```

#### 2. Proxy Not Working
- Ensure you're using `ng serve --proxy-config proxy.conf.json`
- Check that the proxy.conf.json file is in the correct location
- Verify the backend is running on port 8080

#### 3. API Endpoints Not Found
- Check that your Spring Boot controllers have the correct `@RequestMapping` annotations
- Verify the backend is running and accessible
- Check the Spring Boot console for any startup errors

#### 4. Database Connection Issues
- Ensure MySQL is running on port 3306
- Check your `application.properties` configuration
- Verify the database `busbooking` exists

### Debug Steps

1. **Check Backend Logs**: Look at the Spring Boot console for errors
2. **Check Frontend Console**: Open browser DevTools and check the Console tab
3. **Check Network Tab**: Monitor API requests in the Network tab
4. **Test Endpoints**: Use tools like Postman or curl to test API endpoints directly

## 🚀 Production Deployment

When deploying to production:

1. Update `src/environments/environment.prod.ts` with your production backend URL
2. Build the production version: `ng build --configuration production`
3. Deploy the built files from the `dist` folder
4. Ensure your production backend is accessible and has proper CORS configuration

## 📚 Additional Resources

- [Angular HTTP Client](https://angular.io/guide/http)
- [Spring Boot REST Controllers](https://spring.io/guides/gs/rest-service/)
- [CORS Configuration](https://spring.io/guides/gs/rest-service-cors/)








