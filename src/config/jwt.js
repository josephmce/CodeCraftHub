const { JWT_SECRET } = require('./env');

const jwtConfig = {
    secret: JWT_SECRET,
    options: {
        expiresIn: '1h', // Token expiration time
    },
};

module.exports = jwtConfig;