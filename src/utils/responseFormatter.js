/**
 * Response Formatter Utility
 * --------------------------------
 * Purpose:
 *  - Ensures consistent API responses across the application.
 *  - Avoids repeating response logic in multiple controllers.
 *  - Makes it easier to handle and standardize success and error responses.
 *
 * Response Structure:
 *  {
 *    status: <HTTP status code>,
 *    message: <optional message string>,
 *    data: <optional data object or array>
 *  }
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g., 200, 404, 500)
 * @param {Object|Array|null} data - Payload data to send to the client
 * @param {string|null} message - Optional message to provide additional context
 * @returns {Object} - Sends JSON response with the given structure
 */
const responseFormatter = (res, statusCode, data, message) => {
    return res.status(statusCode).json({
        status: statusCode,     // HTTP status code
        message: message || null, // Optional message, defaults to null if not provided
        data: data || null,       // Optional data payload, defaults to null if not provided
    });
};

// Export the formatter to be used in controllers
module.exports = responseFormatter;
