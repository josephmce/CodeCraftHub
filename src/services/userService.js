/**
 * User Service
 * --------------------------------
 * This service layer handles all business logic related to users.
 * 
 * Key Points:
 * - Controllers should call service methods instead of talking directly to the database.
 * - Separating services from controllers improves testability, readability, and maintainability.
 * - All database operations related to users are encapsulated here.
 */

// Import the User model for database operations
const User = require('../models/userModel');

/**
 * UserService class
 * --------------------------------
 * Provides methods to interact with the User model.
 * All methods are asynchronous and return promises.
 */
class UserService {
    /**
     * Create a new user in the database
     * @param {Object} userData - An object containing username, email, password, etc.
     * @returns {Promise<Object>} - The newly created user document
     */
    async createUser(userData) {
        const user = new User(userData); // Create a new user instance
        return await user.save();        // Save user to the database
    }

    /**
     * Find a user by their email address
     * @param {string} email - User's email address
     * @returns {Promise<Object|null>} - The user document if found, otherwise null
     */
    async findUserByEmail(email) {
        return await User.findOne({ email }); // Query the database for a user with the given email
    }

    /**
     * Find a user by their ID
     * @param {string} userId - User's unique ID
     * @returns {Promise<Object|null>} - The user document excluding the password field, or null if not found
     */
    async findUserById(userId) {
        return await User.findById(userId).select('-password'); // Exclude password for security
    }
}

// Export a single instance of the service to use across the application
module.exports = new UserService();
