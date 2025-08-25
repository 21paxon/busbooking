package com.paxon.busbooking.controllers;

import com.paxon.busbooking.models.Trip;
import com.paxon.busbooking.services.TripService;
import com.paxon.busbooking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*")
public class TripController {

    private final TripService tripService;
    private final UserService userService;

    @Autowired
    public TripController(TripService tripService, UserService userService) {
        this.tripService = tripService;
        this.userService = userService;
    }

    // ✅ Get all trips (Public - both Admin and Users can see)
    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips() {
        return ResponseEntity.ok(tripService.getAllTrips());
    }

    // ✅ Get trip by ID (Public - both Admin and Users can see)
    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable("id") String tripId) {
        try {
            UUID uuid = UUID.fromString(tripId);
            return tripService.getTripById(uuid)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Invalid UUID format
        }
    }

    // ✅ Create a new trip (Admin only)
    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip, @RequestParam String adminUserId) {
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        
        trip.setTripId(null); // Ensure Hibernate generates a new UUID
        Trip savedTrip = tripService.createTrip(trip);
        return ResponseEntity.ok(savedTrip);
    }

    // ✅ Update existing trip (Admin only)
    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable("id") String tripId, @RequestBody Trip trip, @RequestParam String adminUserId) {
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        
        try {
            UUID uuid = UUID.fromString(tripId);
            trip.setTripId(uuid); // Force correct ID from path
            Trip updatedTrip = tripService.updateTrip(uuid, trip);
            return ResponseEntity.ok(updatedTrip);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Invalid UUID
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Trip not found
        }
    }

    // ✅ Delete a trip (Admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable("id") String tripId, @RequestParam String adminUserId) {
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        
        try {
            UUID uuid = UUID.fromString(tripId);
            tripService.deleteTrip(uuid);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Invalid UUID
        }
    }

    // ✅ Filter trips by origin
    @GetMapping("/filter/origin")
    public ResponseEntity<List<Trip>> getTripsByOrigin(@RequestParam String origin) {
        List<Trip> trips = tripService.getTripsByOrigin(origin);
        return ResponseEntity.ok(trips);
    }

    // ✅ Filter trips by destination
    @GetMapping("/filter/destination")
    public ResponseEntity<List<Trip>> getTripsByDestination(@RequestParam String destination) {
        List<Trip> trips = tripService.getTripsByDestination(destination);
        return ResponseEntity.ok(trips);
    }

    // ✅ Filter trips by origin and destination
    @GetMapping("/filter/route")
    public ResponseEntity<List<Trip>> getTripsByRoute(
            @RequestParam String origin, 
            @RequestParam String destination) {
        List<Trip> trips = tripService.getTripsByRoute(origin, destination);
        return ResponseEntity.ok(trips);
    }

    // ✅ Search trips with multiple criteria
    @GetMapping("/search")
    public ResponseEntity<List<Trip>> searchTrips(
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String date) {
        List<Trip> trips = tripService.searchTrips(origin, destination, date);
        return ResponseEntity.ok(trips);
    }
}
