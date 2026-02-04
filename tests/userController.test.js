/**
 * User Controller Tests
 * --------------------------------
 * Uses Jest and Supertest to perform integration tests on the user-related endpoints.
 * 
 * Features tested:
 *  - User registration
 *  - User login (JWT generation)
 *  - Retrieving authenticated user profile
 * 
 * Notes:
 *  - Each test runs in isolation by clearing the User collection before each test.
 *  - JWT tokens are generated using the same secret as in production for consistency.
 */

const request = require('supertest'); // Supertest for HTTP assertions
const app = require('../src/index'); // Express app to test against
const User = require('../src/models/userModel'); // User model for database operations
const jwt = require('jsonwebtoken'); // JWT library for generating tokens
const { JWT_SECRET } = require('../src/config/env'); // JWT secret for signing tokens

// Group all User Controller tests
describe('User Controller', () => {
    // Clear the User collection before each test to ensure isolation
    beforeEach(async () => {
        await User.deleteMany({});
    });

    /**
     * Test: Register a new user
     * --------------------------------
     * Sends a POST request to /api/users/register with user details
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
     * Test: Login an existing user
     * --------------------------------
     * First creates a user in the database, then sends a POST request to /api/users/login
     * Expects:
     *  - HTTP status 200 (OK)
     *  - JWT token returned in the response
     */
    it('should login an existing user', async () => {
        await User.create({ username: 'testuser', email: 'test@example.com', password: 'password123' });

        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'password123' });
        
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined(); // Ensure token exists
    });

    /**
     * Test: Get authenticated user's profile
     * --------------------------------
     * Creates a user, generates a JWT, and sends a GET request to /api/users/profile
     * Expects:
     *  - HTTP status 200 (OK)
     *  - Response body contains the correct username and email
     *  - Password field is excluded
     */
    it('should get user profile', async () => {
        const user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        
        // Generate a JWT token for authentication
        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`); // Set Authorization header
        
        expect(response.status).toBe(200);
        expect(response.body.username).toBe(user.username);
        expect(response.body.email).toBe(user.email);
        // Password should not be returned, test ensures security
        expect(response.body.password).toBeUndefined();
    });
});
