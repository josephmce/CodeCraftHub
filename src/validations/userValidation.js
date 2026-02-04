/**
 * Validation middleware for user authentication routes
 * -----------------------------------------------------
 * This file defines validation rules and a reusable validation
 * handler using `express-validator`.
 *
 * Purpose:
 * - Ensure incoming request data is valid before reaching controllers
 * - Prevent invalid or malicious data from being processed
 * - Improve application security and data integrity
 */

const { body, validationResult } = require('express-validator');

/**
 * Validation rules for user registration
 * --------------------------------------
 * Applied when a new user attempts to register.
 * Ensures:
 * - Username is provided
 * - Email follows a valid email format
 * - Password meets minimum length requirements
 */
const registerValidation = [
    // Username must not be empty
    body('username')
        .notEmpty()
        .withMessage('Username is required'),

    // Email must be a valid email address
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),

    // Password must be at least 6 characters long
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

/**
 * Validation rules for user login
 * -------------------------------
 * Applied when an existing user attempts to log in.
 * Ensures:
 * - Email is provided and valid
 * - Password field is not empty
 */
const loginValidation = [
    // Email must be in a valid email format
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),

    // Password must be provided
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

/**
 * Validation result handler middleware
 * -----------------------------------
 * This middleware checks the result of the validation rules.
 * If validation errors exist:
 * - Responds with HTTP 400 (Bad Request)
 * - Returns an array of validation error messages
 *
 * If validation passes:
 * - Calls `next()` to continue to the controller
 */
const validate = (req, res, next) => {
    // Extract validation errors from the request
    const errors = validationResult(req);

    // If any validation errors exist, return them to the client
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    // If validation succeeds, proceed to the next middleware/controller
    next();
};

module.exports = {
    registerValidation,
    loginValidation,
    validate,
};
