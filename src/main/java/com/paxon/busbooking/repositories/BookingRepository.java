package com.paxon.busbooking.repositories;

import com.paxon.busbooking.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByTripTripId(UUID tripId);
    List<Booking> findByUserUserId(UUID userId);// fixed type
}
