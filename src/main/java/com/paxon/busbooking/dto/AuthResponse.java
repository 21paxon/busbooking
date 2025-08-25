package com.paxon.busbooking.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String userId;
    private String email;
    private String username;
    private String role;
    private String message;
}
