package com.paxon.busbooking.controllers;

import com.paxon.busbooking.dto.LoginRequest;
import com.paxon.busbooking.dto.RegisterRequest;
import com.paxon.busbooking.dto.AuthResponse;
import com.paxon.busbooking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody RegisterRequest request) {
        AuthResponse response = userService.registerUser(request);

        if (response.getMessage().contains("successfully")) {
            // ✅ 201 Created for successful registration
            return ResponseEntity.status(201).body(response);
        } else {
            // ✅ 400 Bad Request for invalid registration
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest request) {
        AuthResponse response = userService.loginUser(request);

        if (response.getMessage().contains("successful")) {
            // ✅ 200 OK if login succeeds
            return ResponseEntity.ok(response);
        } else {
            // ✅ 401 Unauthorized for invalid credentials
            return ResponseEntity.status(401).body(response);
        }
    }
}
