/**
 * User Routes Tests
 * --------------------------------
 * Uses Jest and Supertest to perform integration tests on user-related routes.
 * 
 * Features tested:
 *  - User registration
 *  - Handling duplicate user registration
 * 
 * Notes:
 *  - Each test runs in isolation by clearing the User collection before each test.
 *  - Ensures that route-level validation and controller logic work correctly.
 */

const request = require('supertest'); // Supertest for making HTTP requests
const app = require('../src/index'); // Express app to test against
const User = require('../src/models/userModel'); // User model for clearing the database

// Group all User Routes tests
describe('User Routes', () => {
    // Clear the User collection before each test to ensure a clean state
    beforeEach(async () => {
        await User.deleteMany({});
    });

    /**
     * Test: Register a new user successfully
     * --------------------------------
     * Sends a POST request to /api/users/register with valid user details
     * Expects:
     *  - HTTP status 201 (Created)
     *  - Response message confirming successful registration
     */
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    /**
     * Test: Handle duplicate user registration
     * --------------------------------
     * Attempts to register the same user twice.
     * Expects:
     *  - HTTP status 400 (Bad Request)
     *  - Ensures that duplicate email/username registrations are prevented
     */
    it('should return 400 for duplicate user registration', async () => {
        // First registration succeeds
        await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

        // Second registration with same data should fail
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        
        expect(response.status).toBe(400);
    });
});
