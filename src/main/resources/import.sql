-- Sample data for trips table
INSERT INTO trips (trip_id, origin, destination, departure_time, arrival_time, price, total_seats, available_seats, bus_number) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'New York', 'Boston', '2024-12-25 08:00:00', '2024-12-25 12:00:00', 45.00, 50, 35, 'NYB001'),
('550e8400-e29b-41d4-a716-446655440002', 'Boston', 'New York', '2024-12-25 14:00:00', '2024-12-25 18:00:00', 42.00, 50, 28, 'BNY001'),
('550e8400-e29b-41d4-a716-446655440003', 'New York', 'Washington DC', '2024-12-25 09:30:00', '2024-12-25 14:30:00', 55.00, 45, 20, 'NYW001'),
('550e8400-e29b-41d4-a716-446655440004', 'Washington DC', 'New York', '2024-12-25 16:00:00', '2024-12-25 21:00:00', 52.00, 45, 15, 'WNY001'),
('550e8400-e29b-41d4-a716-446655440005', 'Boston', 'Washington DC', '2024-12-25 10:00:00', '2024-12-25 18:00:00', 75.00, 40, 25, 'BWD001');

-- Sample data for users table
INSERT INTO users (user_id, email, password, username, first_name, last_name, role) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'admin@busbooking.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'admin', 'Admin', 'User', 'ADMIN'),
('550e8400-e29b-41d4-a716-446655440011', 'user@busbooking.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'user', 'Regular', 'User', 'USER');
