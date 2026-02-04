/**
 * User Routes
 * --------------------------------
 * This module defines all routes related to user operations such as:
 * - Registration
 * - Login
 * - Retrieving authenticated user profile
 * 
 * Each route is connected to its corresponding controller function.
 * Some routes are protected by authentication middleware to ensure
 * only authorized users can access them.
 */

// Import Express framework
const express = require('express');

// Import controller functions for handling user operations
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

// Import middleware to verify JWT token for protected routes
const { verifyToken } = require('../middleware/authMiddleware');

// Create a new router instance
const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 * Calls the registerUser controller to create a new user.
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Login a user and return a JWT token
 * @access  Public
 * Calls the loginUser controller to authenticate a user.
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/users/profile
 * @desc    Get the profile of the authenticated user
 * @access  Private
 * Uses verifyToken middleware to protect this route.
 * Calls getUserProfile controller to fetch user data excluding password.
 */
router.get('/profile', verifyToken, getUserProfile);

// Export the router to be used in the main application
module.exports = router;
