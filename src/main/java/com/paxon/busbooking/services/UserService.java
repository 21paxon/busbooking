package com.paxon.busbooking.services;

import com.paxon.busbooking.models.User;
import com.paxon.busbooking.dto.RegisterRequest;
import com.paxon.busbooking.dto.LoginRequest;
import com.paxon.busbooking.dto.AuthResponse;
import com.paxon.busbooking.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // User Registration
    public AuthResponse registerUser(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse(null, null, null, null, null, "User with this email already exists");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthResponse(null, null, null, null, null, "Username already taken");
        }

        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole("USER"); // Default role for new users

        User savedUser = userRepository.save(user);

        return new AuthResponse(
            "JWT_TOKEN_" + savedUser.getUserId(), // Simple token for demo
            savedUser.getUserId().toString(),
            savedUser.getEmail(),
            savedUser.getUsername(),
            savedUser.getRole(),
            "User registered successfully"
        );
    }

    // User Login
    public AuthResponse loginUser(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            return new AuthResponse(null, null, null, null, null, "Invalid email or password");
        }

        User user = userOpt.get();
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, null, null, null, null, "Invalid email or password");
        }

        return new AuthResponse(
            "JWT_TOKEN_" + user.getUserId(), // Simple token for demo
            user.getUserId().toString(),
            user.getEmail(),
            user.getUsername(),
            user.getRole(),
            "Login successful"
        );
    }

    // Get user by ID
    public Optional<User> getUserById(UUID userId) {
        return userRepository.findById(userId);
    }

    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Get all users (Admin only)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user role (Admin only)
    public boolean updateUserRole(UUID userId, String newRole) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setRole(newRole);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    // Delete user (Admin only)
    public boolean deleteUser(UUID userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    // Check if user is admin
    public boolean isAdmin(UUID userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.isPresent() && "ADMIN".equals(userOpt.get().getRole());
    }

    // Check if user exists
    public boolean userExists(UUID userId) {
        return userRepository.existsById(userId);
    }
}
