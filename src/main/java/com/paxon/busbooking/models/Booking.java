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
public class Booking {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(updatable = false, nullable = false)
    private UUID bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // Who booked the trip

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;  // Which trip is booked

    private LocalDateTime bookingTime;

    @ElementCollection
    private List<String> seatsBooked;  // Seat numbers booked

    private double totalPrice;

    private String status;  // e.g., "CONFIRMED", "CANCELLED", "PENDING"
}
