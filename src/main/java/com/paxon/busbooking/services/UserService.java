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
            return new AuthResponse(null, null, null, null, null, null, null, "User with this email already exists");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthResponse(null, null, null, null, null, null, null, "Username already taken");
        }

        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // encode password
        user.setUsername(request.getUsername());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole("USER"); // default role

        User savedUser = userRepository.save(user);

        return new AuthResponse(
                "JWT_TOKEN_" + savedUser.getUserId(), // simple demo token
                savedUser.getUserId().toString(),
                savedUser.getEmail(),
                savedUser.getUsername(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getRole(),
                "User registered successfully"
        );
    }

    // User Login (by email OR username)
    public AuthResponse loginUser(LoginRequest request) {
        Optional<User> userOpt;

        // Try to find by email first
        if (request.getIdentifier().contains("@")) {
            userOpt = userRepository.findByEmail(request.getIdentifier());
        } else {
            userOpt = userRepository.findByUsername(request.getIdentifier());
        }

        if (userOpt.isEmpty()) {
            return new AuthResponse(null, null, null, null, null, null, null, "Invalid credentials");
        }

        User user = userOpt.get();

        // check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, null, null, null, null, null, null, "Invalid credentials");
        }

        return new AuthResponse(
                "JWT_TOKEN_" + user.getUserId(),
                user.getUserId().toString(),
                user.getEmail(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                "Login successful"
        );
    }

    // Other methods remain unchanged...
    public Optional<User> getUserById(UUID userId) { return userRepository.findById(userId); }
    public Optional<User> getUserByEmail(String email) { return userRepository.findByEmail(email); }
    public List<User> getAllUsers() { return userRepository.findAll(); }
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
    public boolean deleteUser(UUID userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
    public boolean isAdmin(UUID userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.isPresent() && "ADMIN".equals(userOpt.get().getRole());
    }
    public boolean userExists(UUID userId) { return userRepository.existsById(userId); }
}
