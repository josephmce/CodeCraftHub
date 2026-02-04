// Load environment variables from a .env file into process.env
require('dotenv').config();

// Get the MongoDB connection URI from environment variables, 
// or use a default local MongoDB URI if not provided
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/user_management';

// Get the JWT secret key from environment variables, 
// or use a default string if not provided
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Export the constants so they can be used in other parts of the application
module.exports = {
    DB_URI,
    JWT_SECRET,
};
