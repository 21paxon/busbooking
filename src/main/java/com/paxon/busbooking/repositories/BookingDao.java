package com.paxon.busbooking.repositories;

import com.paxon.busbooking.models.Booking;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class BookingDao {

    @PersistenceContext
    private EntityManager entityManager;

    public Booking save(Booking booking) {
        if (booking.getBookingId() == null) {
            entityManager.persist(booking);
            return booking;
        } else {
            return entityManager.merge(booking);
        }
    }

    public Booking findById(String id) {
        return entityManager.find(Booking.class, id);
    }

    public void deleteById(String id) {
        Booking booking = findById(id);
        if (booking != null) {
            entityManager.remove(booking);
        }
    }

    public List<Booking> findAll() {
        String jpql = "SELECT b FROM Booking b";
        return entityManager.createQuery(jpql, Booking.class).getResultList();
    }

    public List<Booking> findByTripTripId(UUID tripId) {
        String jpql = "SELECT b FROM Booking b WHERE b.trip.tripId = :tripId";
        return entityManager.createQuery(jpql, Booking.class)
                .setParameter("tripId", tripId)
                .getResultList();
    }
}
