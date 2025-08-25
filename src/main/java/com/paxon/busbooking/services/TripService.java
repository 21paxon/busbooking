package com.paxon.busbooking.services;

import com.paxon.busbooking.models.Trip;
import com.paxon.busbooking.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Optional<Trip> getTripById(UUID tripId) {
        return tripRepository.findById(tripId);
    }

    public Trip createTrip(Trip trip) {
        // You can add validation or business logic here before saving
        return tripRepository.save(trip);
    }

    public Trip updateTrip(UUID tripId, Trip tripDetails) {
        return tripRepository.findById(tripId).map(trip -> {
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
        }).orElseThrow(() -> new RuntimeException("Trip not found with id " + tripId));
    }

    public void deleteTrip(UUID tripId) {
        tripRepository.deleteById(tripId);
    }
}
