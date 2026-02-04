const request = require('supertest');
const app = require('../src/index'); // Make sure this points to your Express app
const User = require('../src/models/userModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../src/config/env');

describe('User Controller', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login an existing user', async () => {
        await User.create({ username: 'testuser', email: 'test@example.com', password: 'password123' });

        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'password123' });
        
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('should get user profile', async () => {
        const user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.username).toBe(user.username);
        expect(response.body.email).toBe(user.email);
    });
});