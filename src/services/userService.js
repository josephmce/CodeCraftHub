const User = require('../models/userModel');

class UserService {
    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async findUserById(userId) {
        return await User.findById(userId).select('-password');
    }
}

module.exports = new UserService();