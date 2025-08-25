package com.paxon.busbooking.repositories;

import com.paxon.busbooking.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {

    // Find bookings by user UUID
    List<Booking> findByUser_UserId(UUID userId);

    // Find bookings by trip UUID
    List<Booking> findByTrip_TripId(UUID tripId);
}
