# 🚌 Bus Booking System - Database Testing Guide

## ✅ What We've Cleaned Up & Added

1. **Removed Sample Data Fallbacks** - No more fake data, only real database data
2. **Enhanced Error Handling** - Better error messages and debugging
3. **Improved Admin Interface** - Professional styling with refresh functionality
4. **Cleaned Backend** - Removed temporary admin parameters, prepared for JWT auth
5. **Added Admin Authentication** - Complete admin login system with route protection
6. **Enhanced Security** - Admin routes are now protected with guards

## 🗄️ Database Setup

### 1. Start MySQL Database
Make sure MySQL is running on port 3306 with:
- Username: `root`
- Password: (empty)
- Database: `busbooking` (will be created automatically)

### 2. Start Backend
```bash
cd /c/Users/hp/Downloads/busbooking
mvn spring-boot:run
```

**Expected Output:**
- Spring Boot should start successfully
- Database tables should be created automatically
- Sample data should be imported from `import.sql`

### 3. Start Frontend
```bash
cd /c/Users/hp/Downloads/busbooking/busbooking-ui
ng serve
```

## 🧪 Testing Steps

### Step 1: Verify Backend is Running
- Open: `http://localhost:8080/api/trips`
- Should return JSON array of trips from database

### Step 2: Test Admin Authentication
- Navigate to: `http://localhost:4200/admin/login`
- Use demo admin credentials:
  - **Email**: `admin@busbooking.com`
  - **Password**: `admin`
- Should redirect to admin trips page after successful login

### Step 3: Test Admin Interface
- Navigate to: `http://localhost:4200/admin/trips`
- Should display 5 sample trips from database
- Check browser console for detailed logs
- Should show admin user information at the top

### Step 4: Test Trip Operations
- **View**: Should see all trips with proper formatting
- **Delete**: Try deleting a trip (will refresh list)
- **Refresh**: Click refresh button to reload data
- **Logout**: Click logout button to return to admin login

### Step 5: Test Security
- Try accessing `/admin/trips` without logging in
- Should redirect to `/admin/login`
- Try logging in with non-admin user
- Should show "Access denied" message

## 🔍 Troubleshooting

### If No Data Appears:
1. **Check Backend Logs** - Look for database connection errors
2. **Verify MySQL** - Ensure MySQL is running and accessible
3. **Check Database** - Connect to MySQL and verify `trips` table exists
4. **Check Console** - Frontend console should show detailed error info

### Common Issues:
- **Port 8080 in use**: Change backend port in `application.properties`
- **MySQL connection failed**: Check MySQL service status
- **CORS errors**: Backend has `@CrossOrigin(origins = "*")`
- **Admin access denied**: Ensure using correct admin credentials

### Database Verification Commands:
```sql
-- Connect to MySQL
mysql -u root

-- Check if database exists
SHOW DATABASES;

-- Use database
USE busbooking;

-- Check tables
SHOW TABLES;

-- Check trip data
SELECT * FROM trips;

-- Check user data
SELECT * FROM users;
```

## 📊 Expected Data

### Sample Trips (5 total):
1. **New York → Boston** - $45, 50 seats, 35 available
2. **Boston → New York** - $42, 50 seats, 28 available  
3. **New York → Washington DC** - $55, 45 seats, 20 available
4. **Washington DC → New York** - $52, 45 seats, 15 available
5. **Boston → Washington DC** - $75, 40 seats, 25 available

### Sample Users (2 total):
1. **Admin**: `admin@busbooking.com` / `admin` (ADMIN role)
2. **User**: `user@busbooking.com` / `user` (USER role)

## 🔐 Admin Authentication Flow

### Login Process:
1. Navigate to `/admin/login`
2. Enter admin credentials
3. System validates role (must be ADMIN)
4. Redirects to `/admin/trips` if successful
5. Shows "Access denied" if not admin

### Security Features:
- **Route Protection**: Admin routes require authentication
- **Role Validation**: Only ADMIN users can access admin panel
- **Automatic Redirects**: Non-admin users redirected to login
- **Session Management**: Logout clears admin session

## 🎯 Success Indicators

✅ **Backend**: Spring Boot starts without errors  
✅ **Database**: Tables created and sample data imported  
✅ **Admin Login**: Can authenticate with admin credentials  
✅ **Admin Panel**: Shows 5 trips with admin user info  
✅ **Security**: Non-admin users cannot access admin routes  
✅ **Console**: No error messages, shows successful operations  

## 🚀 Next Steps

Once admin authentication is working:
1. **Test User Authentication** - Register/login with regular users
2. **Test Trip Booking** - Create bookings for trips
3. **Implement JWT Auth** - Replace temporary admin checks
4. **Add Trip Creation** - Admin interface for adding new trips
5. **Add User Management** - Admin interface for managing users

## 🔗 Navigation Links

- **Home**: `/` → redirects to `/trips`
- **User Login**: `/login`
- **User Register**: `/register`
- **Admin Login**: `/admin/login`
- **Admin Panel**: `/admin/trips` (protected route)
- **Browse Trips**: `/trips`
- **My Bookings**: `/bookings`
- **Contact**: `/contact`

---

**Need Help?** Check the browser console and backend logs for detailed error information!

**Admin Access**: Use `admin@busbooking.com` / `admin` to test the admin panel!
