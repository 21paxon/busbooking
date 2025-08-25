package com.paxon.busbooking.services;

import com.paxon.busbooking.models.Booking;
import com.paxon.busbooking.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(String id) {
        UUID uuid = UUID.fromString(id); // ✅ Convert String to UUID
        return bookingRepository.findById(uuid);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public void deleteBooking(String id) {
        UUID uuid = UUID.fromString(id); // ✅ Convert String to UUID
        bookingRepository.deleteById(uuid);
    }

    public List<Booking> getBookingsByUser(String userId) {
        UUID uuid = UUID.fromString(userId); // ✅ Convert String to UUID
        return bookingRepository.findByUserUserId(uuid);
    }

    public List<Booking> getBookingsByTrip(String tripId) {
        UUID uuid = UUID.fromString(tripId); // ✅ Convert String to UUID
        return bookingRepository.findByTripTripId(uuid);
    }
}
