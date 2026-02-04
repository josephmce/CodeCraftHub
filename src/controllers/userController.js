// Import the User model for database operations
const User = require('../models/userModel');

// Import the jsonwebtoken library for creating and verifying JWTs
const jwt = require('jsonwebtoken');

// Import the JWT secret key from environment configuration
const { JWT_SECRET } = require('../config/env');

/**
 * Register a new user
 * --------------------------------
 * Creates a new user in the database with the provided username, email, and password.
 * Returns a success message if registration succeeds.
 *
 * @ route   POST /api/users/register
 * @ access  Public
 */
exports.registerUser = async (req, res) => {
    // Destructure user registration data from request body
    const { username, email, password } = req.body;

    try {
        // Create a new user instance
        const newUser = new User({ username, email, password });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Send error response if registration fails (e.g., duplicate email)
        res.status(400).json({ error: error.message });
    }
};

/**
 * Login a user
 * --------------------------------
 * Authenticates a user with email and password.
 * Returns a JWT token if credentials are valid.
 *
 * @ route   POST /api/users/login
 * @ access  Public
 */
exports.loginUser = async (req, res) => {
    // Destructure login credentials from request body
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user doesn't exist or password is incorrect, return 401 Unauthorized
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token with the user ID as payload, expires in 1 hour
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        // Handle any unexpected errors
        res.status(400).json({ error: error.message });
    }
};

/**
 * Get authenticated user's profile
 * --------------------------------
 * Retrieves the currently logged-in user's profile from the database.
 *
 * - Excludes the password field for security reasons.
 * - Returns 404 if the user does not exist.
 * - Requires authentication middleware to populate req.user.
 *
 * @ route   GET /api/users/profile
 * @ access  Private (requires JWT authentication)
 */
exports.getUserProfile = async (req, res) => {
    try {
        // Find the user by ID stored in req.user (from JWT authentication)
        // Exclude the password field using `.select('-password')`
        const user = await User.findById(req.user.id).select('-password');

        // If the user is not found, send a 404 Not Found response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user profile data if found
        res.status(200).json(user);
    } catch (error) {
        // Handle unexpected errors (e.g., invalid ID format, database errors)
        res.status(400).json({ error: error.message });
    }
};
