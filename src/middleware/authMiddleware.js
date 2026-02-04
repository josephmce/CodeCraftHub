/**
 * Authentication middleware
 * -------------------------
 * This middleware verifies JSON Web Tokens (JWT) sent with incoming
 * HTTP requests to protect private routes.
 *
 * Purpose:
 * - Ensure only authenticated users can access protected endpoints
 * - Decode and validate the JWT
 * - Attach authenticated user data to the request object
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

/**
 * Verify JWT Token
 * ----------------
 * Checks for the presence of a JWT in the Authorization header,
 * verifies its validity, and allows the request to proceed if valid.
 *
 * Expected Header Format:
 * Authorization: Bearer <token>
 *
 * @ access Private
 */
exports.verifyToken = (req, res, next) => {
    // Extract the token from the Authorization header
    // The optional chaining prevents runtime errors if the header is missing
    const token = req.header('Authorization')?.split(' ')[1];

    // If no token is provided, deny access
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        // Verify the token using the secret key
        // If valid, this returns the decoded payload (e.g. user ID, email)
        const verified = jwt.verify(token, JWT_SECRET);

        // Attach decoded user data to the request object
        // This makes the user information available to subsequent middleware/controllers
        req.user = verified;

        // Token is valid, continue to the next middleware or controller
        next();

    } catch (error) {
        // If token verification fails (expired, malformed, or invalid),
        // return an error response to the client
        res.status(400).json({ error: 'Invalid token' });
    }
};
