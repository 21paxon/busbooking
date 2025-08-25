package com.paxon.busbooking.services;

import com.paxon.busbooking.dto.BookingRequest;
import com.paxon.busbooking.models.Booking;
import com.paxon.busbooking.models.Trip;
import com.paxon.busbooking.models.User;
import com.paxon.busbooking.repositories.BookingRepository;
import com.paxon.busbooking.repositories.TripRepository;
import com.paxon.busbooking.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository, UserRepository userRepository, TripRepository tripRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(UUID.fromString(id));
    }

    @Override
    public Booking createBooking(BookingRequest bookingRequest) {
        // Fetch User and Trip entities
        User user = userRepository.findById(UUID.fromString(bookingRequest.getUserId()))
                .orElseThrow(() -> new RuntimeException("User not found"));
        Trip trip = tripRepository.findById(UUID.fromString(bookingRequest.getTripId()))
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        // Map DTO to Booking entity
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTrip(trip);
        booking.setSeatsBooked(bookingRequest.getSeatsBooked());
        booking.setTotalPrice(bookingRequest.getTotalPrice());
        booking.setStatus("PENDING");
        booking.setBookingTime(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    // ✅ Update existing booking
    @Override
    public Booking updateBooking(String id, Booking bookingDetails) {
        Booking existingBooking = bookingRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Update fields
        existingBooking.setStatus(bookingDetails.getStatus());
        existingBooking.setSeatsBooked(bookingDetails.getSeatsBooked());
        existingBooking.setTotalPrice(bookingDetails.getTotalPrice());

        return bookingRepository.save(existingBooking);
    }

    @Override
    public void deleteBooking(String id) {
        bookingRepository.deleteById(UUID.fromString(id));
    }

    @Override
    public List<Booking> getBookingsByUser(String userId) {
        return bookingRepository.findByUser_UserId(UUID.fromString(userId));
    }

    @Override
    public List<Booking> getBookingsByTrip(String tripId) {
        return bookingRepository.findByTrip_TripId(UUID.fromString(tripId));
    }
}
