package com.paxon.busbooking.controllers;

import com.paxon.busbooking.dto.BookingRequest;
import com.paxon.busbooking.models.Booking;
import com.paxon.busbooking.services.BookingService;
import com.paxon.busbooking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;
    private final UserService userService;

    @Autowired
    public BookingController(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    // ✅ Get all bookings (Admin only)
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings(@RequestParam String adminUserId) {
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // ✅ Get booking by ID (User can see their own, Admin can see any)
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(
            @PathVariable String id, 
            @RequestParam String userId) {
        
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            Booking b = booking.get();
            // Check if user is admin or owns the booking
            if (userService.isAdmin(UUID.fromString(userId)) || 
                b.getUser().getUserId().toString().equals(userId)) {
                return ResponseEntity.ok(b);
            } else {
                return ResponseEntity.status(403).build(); // Forbidden
            }
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Create new booking (User only)
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest request) {
        // Validate that the user exists
        if (!userService.userExists(UUID.fromString(request.getUserId()))) {
            return ResponseEntity.badRequest().build();
        }
        
        Booking createdBooking = bookingService.createBooking(request);
        return ResponseEntity.ok(createdBooking);
    }

    // ✅ Delete booking (User can delete their own, Admin can delete any)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(
            @PathVariable String id, 
            @RequestParam String userId) {
        
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            Booking b = booking.get();
            // Check if user is admin or owns the booking
            if (userService.isAdmin(UUID.fromString(userId)) || 
                b.getUser().getUserId().toString().equals(userId)) {
                bookingService.deleteBooking(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(403).build(); // Forbidden
            }
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Get bookings by user (User can see their own, Admin can see any user's)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(
            @PathVariable String userId, 
            @RequestParam String requestingUserId) {
        
        // Check if requesting user is admin or requesting their own bookings
        if (!userService.isAdmin(UUID.fromString(requestingUserId)) && 
            !requestingUserId.equals(userId)) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        
        List<Booking> bookings = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(bookings);
    }

    // ✅ Get bookings by trip (Admin only)
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<Booking>> getBookingsByTrip(
            @PathVariable String tripId, 
            @RequestParam String adminUserId) {
        
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        
        List<Booking> bookings = bookingService.getBookingsByTrip(tripId);
        return ResponseEntity.ok(bookings);
    }

    // ✅ Cancel booking (User can cancel their own, Admin can cancel any)
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable String id, 
            @RequestParam String userId) {
        
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            Booking b = booking.get();
            // Check if user is admin or owns the booking
            if (userService.isAdmin(UUID.fromString(userId)) || 
                b.getUser().getUserId().toString().equals(userId)) {
                
                // Update booking status to CANCELLED
                b.setStatus("CANCELLED");
                Booking cancelledBooking = bookingService.updateBooking(id, b);
                return ResponseEntity.ok(cancelledBooking);
            } else {
                return ResponseEntity.status(403).build(); // Forbidden
            }
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Get booking statistics (Admin only)
    @GetMapping("/stats")
    public ResponseEntity<Object> getBookingStats(@RequestParam String adminUserId) {
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        
        // Return booking statistics
        long totalBookings = bookingService.getAllBookings().size();
        long confirmedBookings = bookingService.getAllBookings().stream()
            .filter(b -> "CONFIRMED".equals(b.getStatus())).count();
        long cancelledBookings = bookingService.getAllBookings().stream()
            .filter(b -> "CANCELLED".equals(b.getStatus())).count();
        
        return ResponseEntity.ok(Map.of(
            "totalBookings", totalBookings,
            "confirmedBookings", confirmedBookings,
            "cancelledBookings", cancelledBookings
        ));
    }
}
