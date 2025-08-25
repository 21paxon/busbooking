package com.paxon.busbooking.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "trips") // good practice: plural table name
public class Trip {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "trip_id", updatable = false, nullable = false)
    private UUID tripId;

    private String origin;

    private String destination;

    @Column(name = "departure_time")
    private LocalDateTime departureTime;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;

    private double price;

    @Column(name = "total_seats")
    private int totalSeats;

    @Column(name = "available_seats")
    private int availableSeats;

    @Column(name = "bus_number")
    private String busNumber;

    @ElementCollection
    @CollectionTable(
            name = "trip_booked_seats", // separate table for booked seats
            joinColumns = @JoinColumn(name = "trip_id")
    )
    @Column(name = "seat_number")
    private List<String> bookedSeats;
}
