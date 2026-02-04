/**
 * Main Server Entry Point
 * --------------------------------
 * Sets up the Express server, connects to MongoDB, and configures routes and middleware.
 * 
 * Features:
 *  - Connects to the MongoDB database using Mongoose
 *  - Configures JSON parsing middleware
 *  - Mounts user-related routes
 *  - Handles errors centrally using custom middleware
 *  - Starts the server on the specified PORT
 */

// Import Express framework
const express = require('express');

// Import MongoDB connection function
const connectDB = require('./config/db');

// Import user routes
const userRoutes = require('./routes/userRoutes');

// Import centralized error handling middleware
const { errorHandler } = require('./middleware/errorMiddleware');

// Create an Express application instance
const app = express();

// Define the server port, default to 5000 if not set in environment variables
const PORT = process.env.PORT || 5000;

// --------------------------------
// Connect to MongoDB
// --------------------------------
connectDB(); // Calls the function that establishes connection to the database

// --------------------------------
// Middleware
// --------------------------------

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Mount user routes at /api/users
// Example endpoints:
//  - POST /api/users/register
//  - POST /api/users/login
//  - GET  /api/users/profile
app.use('/api/users', userRoutes);

// --------------------------------
// Error Handling Middleware
// --------------------------------

// Catch and handle errors from controllers or routes
app.use(errorHandler);

// --------------------------------
// Start Server
// --------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
