const UserService = require('../src/services/userService');
const User = require('../src/models/userModel');

describe('User Service', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should create a new user', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
        const user = await UserService.createUser(userData);
        
        expect(user).toHaveProperty('_id');
        expect(user.username).toBe(userData.username);
    });

    it('should find a user by email', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
        await UserService.createUser(userData);
        
        const user = await UserService.findUserByEmail('test@example.com');
        expect(user).toBeDefined();
        expect(user.username).toBe(userData.username);
    });

    it('should find a user by ID', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
        const createdUser = await UserService.createUser(userData);
        
        const user = await UserService.findUserById(createdUser._id);
        expect(user).toBeDefined();
        expect(user.username).toBe(userData.username);
    });
});