package com.paxon.busbooking.controllers;

import com.paxon.busbooking.services.UserService;
import com.paxon.busbooking.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ Get all users (Admin only)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(@RequestParam String adminUserId) {
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ✅ Get user by ID (Admin can see any user, User can see their own profile)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable UUID id, 
            @RequestParam String requestingUserId) {
        
        // Check if requesting user is admin or requesting their own profile
        if (!userService.isAdmin(UUID.fromString(requestingUserId)) && 
            !requestingUserId.equals(id.toString())) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get user by email (Admin only)
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(
            @PathVariable String email, 
            @RequestParam String adminUserId) {
        
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Update user role (Admin only)
    @PutMapping("/{id}/role")
    public ResponseEntity<Object> updateUserRole(
            @PathVariable UUID id, 
            @RequestParam String newRole, 
            @RequestParam String adminUserId) {
        
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        
        boolean updated = userService.updateUserRole(id, newRole);
        if (updated) {
            return ResponseEntity.ok(Map.of("message", "User role updated successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Delete user (Admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable UUID id, 
            @RequestParam String adminUserId) {
        
        // Check if user is admin
        if (!userService.isAdmin(UUID.fromString(adminUserId))) {
            return ResponseEntity.status(403).build(); // Forbidden - not admin
        }
        
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Get user profile (User can see their own profile)
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestParam String userId) {
        Optional<User> user = userService.getUserById(UUID.fromString(userId));
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Check if user is admin
    @GetMapping("/{id}/isAdmin")
    public ResponseEntity<Object> isUserAdmin(@PathVariable UUID id) {
        boolean isAdmin = userService.isAdmin(id);
        return ResponseEntity.ok(Map.of("isAdmin", isAdmin));
    }
}
