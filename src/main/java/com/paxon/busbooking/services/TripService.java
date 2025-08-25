package com.paxon.busbooking.services;

import com.paxon.busbooking.models.Trip;
import com.paxon.busbooking.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TripService {

    private final TripRepository tripRepository;

    @Autowired
    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Optional<Trip> getTripById(UUID id) {
        return tripRepository.findById(id);
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public Trip updateTrip(UUID id, Trip tripDetails) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        trip.setOrigin(tripDetails.getOrigin());
        trip.setDestination(tripDetails.getDestination());
        trip.setDepartureTime(tripDetails.getDepartureTime());
        trip.setArrivalTime(tripDetails.getArrivalTime());
        trip.setPrice(tripDetails.getPrice());
        trip.setTotalSeats(tripDetails.getTotalSeats());
        trip.setAvailableSeats(tripDetails.getAvailableSeats());
        trip.setBusNumber(tripDetails.getBusNumber());
        trip.setBookedSeats(tripDetails.getBookedSeats());

        return tripRepository.save(trip);
    }

    public void deleteTrip(UUID id) {
        tripRepository.deleteById(id);
    }

    // ✅ Filter trips by origin
    public List<Trip> getTripsByOrigin(String origin) {
        return tripRepository.findByOriginContainingIgnoreCase(origin);
    }

    // ✅ Filter trips by destination
    public List<Trip> getTripsByDestination(String destination) {
        return tripRepository.findByDestinationContainingIgnoreCase(destination);
    }

    // ✅ Filter trips by origin and destination
    public List<Trip> getTripsByRoute(String origin, String destination) {
        return tripRepository.findByOriginContainingIgnoreCaseAndDestinationContainingIgnoreCase(origin, destination);
    }

    // ✅ Search trips with multiple criteria
    public List<Trip> searchTrips(String origin, String destination, String date) {
        if (origin != null && destination != null && date != null) {
            // Search by all three criteria
            LocalDateTime searchDate = LocalDateTime.parse(date + "T00:00:00");
            return tripRepository.findByOriginContainingIgnoreCaseAndDestinationContainingIgnoreCaseAndDepartureTimeBetween(
                origin, destination, searchDate, searchDate.plusDays(1));
        } else if (origin != null && destination != null) {
            // Search by origin and destination
            return getTripsByRoute(origin, destination);
        } else if (origin != null) {
            // Search by origin only
            return getTripsByOrigin(origin);
        } else if (destination != null) {
            // Search by destination only
            return getTripsByDestination(destination);
        } else if (date != null) {
            // Search by date only
            LocalDateTime searchDate = LocalDateTime.parse(date + "T00:00:00");
            return tripRepository.findByDepartureTimeBetween(searchDate, searchDate.plusDays(1));
        } else {
            // No criteria specified, return all trips
            return getAllTrips();
        }
    }

    // ✅ Get available seats for a trip
    public int getAvailableSeats(UUID tripId) {
        Optional<Trip> trip = getTripById(tripId);
        return trip.map(Trip::getAvailableSeats).orElse(0);
    }

    // ✅ Check if seat is available
    public boolean isSeatAvailable(UUID tripId, String seatNumber) {
        Optional<Trip> trip = getTripById(tripId);
        if (trip.isPresent()) {
            return !trip.get().getBookedSeats().contains(seatNumber);
        }
        return false;
    }

    // ✅ Book a seat
    public boolean bookSeat(UUID tripId, String seatNumber) {
        Optional<Trip> tripOpt = getTripById(tripId);
        if (tripOpt.isPresent()) {
            Trip trip = tripOpt.get();
            if (isSeatAvailable(tripId, seatNumber) && trip.getAvailableSeats() > 0) {
                trip.getBookedSeats().add(seatNumber);
                trip.setAvailableSeats(trip.getAvailableSeats() - 1);
                tripRepository.save(trip);
                return true;
            }
        }
        return false;
    }

    // ✅ Cancel a seat booking
    public boolean cancelSeat(UUID tripId, String seatNumber) {
        Optional<Trip> tripOpt = getTripById(tripId);
        if (tripOpt.isPresent()) {
            Trip trip = tripOpt.get();
            if (trip.getBookedSeats().contains(seatNumber)) {
                trip.getBookedSeats().remove(seatNumber);
                trip.setAvailableSeats(trip.getAvailableSeats() + 1);
                tripRepository.save(trip);
                return true;
            }
        }
        return false;
    }
}
