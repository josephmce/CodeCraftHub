/**
 * User Service Tests
 * --------------------------------
 * Uses Jest to perform integration tests on the UserService class.
 * 
 * Purpose:
 *  - Ensure that the service layer correctly handles business logic for users.
 *  - Validate that database operations such as creating and querying users work as expected.
 *  - Test methods without going through the controller layer.
 * 
 * Notes:
 *  - Each test runs in isolation by clearing the User collection before each test.
 *  - Tests use the same schema and methods as production.
 */

const UserService = require('../src/services/userService'); // Import the UserService
const User = require('../src/models/userModel');            // Import the User model for database operations

// Group all UserService tests
describe('User Service', () => {
    // Clear the User collection before each test to ensure test isolation
    beforeEach(async () => {
        await User.deleteMany({});
    });

    /**
     * Test: Create a new user
     * --------------------------------
     * Calls UserService.createUser with sample user data.
     * Expects:
     *  - The returned user document has a generated _id
     *  - The username matches the input data
     */
    it('should create a new user', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
        
        // Call service method to create a user
        const user = await UserService.createUser(userData);
        
        // Assertions
        expect(user).toHaveProperty('_id');          // User should have a unique ID
        expect(user.username).toBe(userData.username); // Username should match input
    });

    /**
     * Test: Find a user by email
     * --------------------------------
     * Creates a user, then calls UserService.findUserByEmail.
     * Expects:
     *  - A user document is returned
     *  - The username matches the created user
     */
    it('should find a user by email', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
        
        // Create a user first
        await UserService.createUser(userData);
        
        // Query the user by email
        const user = await UserService.findUserByEmail('test@example.com');

        // Assertions
        expect(user).toBeDefined();                 // User should exist
        expect(user.username).toBe(userData.username); // Username should match
    });

    /**
     * Test: Find a user by ID
     * --------------------------------
     * Creates a user, then calls UserService.findUserById using the generated _id.
     * Expects:
     *  - A user document is returned
     *  - The username matches the created user
     */
    it('should find a user by ID', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
        
        // Create a new user and get the generated _id
        const createdUser = await UserService.createUser(userData);
        
        // Query the user by ID
        const user = await UserService.findUserById(createdUser._id);

        // Assertions
        expect(user).toBeDefined();                 // User should exist
        expect(user.username).toBe(userData.username); // Username should match
    });
});
