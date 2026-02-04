/**
 * Logger Utility
 * --------------------------------
 * Purpose:
 *  - Centralized logging for the application.
 *  - Makes debugging easier by providing structured logs.
 *  - Can be easily replaced with more advanced loggers like Winston or Pino in the future.
 * 
 * Features:
 *  - Logs messages in JSON format with timestamps.
 *  - Logs to both the console and files.
 *  - Separates error logs from general logs.
 */

// Import the Winston logging library
const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
    // Set the default logging level
    level: 'info', 

    // Define the format of log messages
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to each log
        winston.format.json()       // Format logs as JSON for easy parsing
    ),

    // Define where logs should be sent (transports)
    transports: [
        // Log all messages to the console
        new winston.transports.Console(),

        // Log only error-level messages to 'error.log'
        new winston.transports.File({ filename: 'error.log', level: 'error' }),

        // Log all messages (info and above) to 'combined.log'
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Export the logger instance for use in the application
module.exports = logger;
