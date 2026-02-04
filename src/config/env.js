require('dotenv').config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/user_management';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = {
    DB_URI,
    JWT_SECRET,
};