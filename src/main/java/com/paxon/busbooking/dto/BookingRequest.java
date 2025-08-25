package com.paxon.busbooking.dto;

import lombok.Data;
import java.util.List;

@Data
public class BookingRequest {
    private String userId;
    private String tripId;
    private List<String> seatsBooked;
    private double totalPrice;
}
