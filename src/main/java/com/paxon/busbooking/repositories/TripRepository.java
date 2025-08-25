package com.paxon.busbooking.repositories;

import com.paxon.busbooking.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface TripRepository extends JpaRepository<Trip, UUID> {
    
    // ✅ Filter trips by origin (case-insensitive)
    List<Trip> findByOriginContainingIgnoreCase(String origin);
    
    // ✅ Filter trips by destination (case-insensitive)
    List<Trip> findByDestinationContainingIgnoreCase(String destination);
    
    // ✅ Filter trips by origin and destination (case-insensitive)
    List<Trip> findByOriginContainingIgnoreCaseAndDestinationContainingIgnoreCase(String origin, String destination);
    
    // ✅ Filter trips by date range
    List<Trip> findByDepartureTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // ✅ Filter trips by origin, destination, and date range
    List<Trip> findByOriginContainingIgnoreCaseAndDestinationContainingIgnoreCaseAndDepartureTimeBetween(
        String origin, String destination, LocalDateTime startDate, LocalDateTime endDate);
    
    // ✅ Find trips with available seats
    @Query("SELECT t FROM Trip t WHERE t.availableSeats > 0")
    List<Trip> findTripsWithAvailableSeats();
    
    // ✅ Find trips by price range
    List<Trip> findByPriceBetween(double minPrice, double maxPrice);
}
