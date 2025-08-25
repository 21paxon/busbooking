package com.paxon.busbooking.repositories;

import com.paxon.busbooking.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TripRepository extends JpaRepository<Trip, UUID> {
    // Add any custom Trip-related queries here (e.g., findByDepartureCity, etc.)
}
