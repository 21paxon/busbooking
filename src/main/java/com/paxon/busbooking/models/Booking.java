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
@Builder
public class Booking {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "booking_id", updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private UUID bookingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "booking_time", nullable = false)
    private LocalDateTime bookingTime = LocalDateTime.now();

    @ElementCollection
    @CollectionTable(
            name = "booking_seats_booked",
            joinColumns = @JoinColumn(name = "booking_id")
    )
    @Column(name = "seat_number", nullable = false)
    private List<String> seatsBooked;

    @Column(name = "total_price", nullable = false)
    private double totalPrice;

    @Column(name = "status", nullable = false)
    private String status; // e.g., CONFIRMED, CANCELLED, PENDING

    // Optional: Ensure UUID is generated even if someone manually sets bookingId to null
    @PrePersist
    public void ensureId() {
        if (this.bookingId == null) {
            this.bookingId = UUID.randomUUID();
        }
    }
}
