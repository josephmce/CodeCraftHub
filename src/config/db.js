// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Import the database URI from the environment configuration
const { DB_URI } = require('./env');

// Async function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the URI and options
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,      // Use the new URL string parser
            useUnifiedTopology: true,   // Use the new server discovery and monitoring engine
        });
        console.log('MongoDB connected successfully'); // Log success message
    } catch (error) {
        // Log any errors that occur during the connection
        console.error('MongoDB connection failed:', error.message);
        // Exit the process with failure code 1 if connection fails
        process.exit(1);
    }
};

// Export the connectDB function so it can be used in other parts of the application
module.exports = connectDB;
