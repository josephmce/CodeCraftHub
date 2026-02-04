const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * Defines how user data is stored in MongoDB
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Prevent duplicate usernames
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Normalise email storage
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, {
    timestamps: true // Automatically adds createdAt & updatedAt
});

/**
 * Pre-save hook
 * Hashes password before saving to the database
 */
userSchema.pre('save', async function (next) {
    // Only hash if password is new or modified
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

/**
 * Instance method
 * Compares plain password with hashed password
 */
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
