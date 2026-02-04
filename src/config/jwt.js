/**
 * JWT Configuration Module
 * 
 * This module defines the configuration for JSON Web Tokens (JWT) used in the application.
 * It includes the secret key for signing tokens and default options such as token expiration time.
 */

// Import the JWT secret key from environment variables
const { JWT_SECRET } = require('./env');

/**
 * jwtConfig object
 * 
 * secret: The secret key used to sign and verify JWT tokens.
 * options: Configuration options for the JWT, including:
 *   - expiresIn: The duration before the token expires (e.g., '1h' = 1 hour)
 */
const jwtConfig = {
    secret: JWT_SECRET,
    options: {
        expiresIn: '1h', // Set token to expire after 1 hour
    },
};

// Export the JWT configuration object for use in authentication modules
