package com.paxon.busbooking.services;

import com.paxon.busbooking.dto.BookingRequest;
import com.paxon.busbooking.models.Booking;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    List<Booking> getAllBookings();
    Optional<Booking> getBookingById(String id);

    // Updated to accept BookingRequest instead of Booking entity
    Booking createBooking(BookingRequest bookingRequest);

    // ✅ Update existing booking
    Booking updateBooking(String id, Booking bookingDetails);

    void deleteBooking(String id);
    List<Booking> getBookingsByUser(String userId);
    List<Booking> getBookingsByTrip(String tripId);
}
