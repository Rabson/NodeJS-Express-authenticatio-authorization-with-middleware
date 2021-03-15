const path = require('path');

require('dotenv').config({ path: path.resolve('.env') });

module.exports = Object.freeze({
    server: {
        port: process.env.PORT || 9000,
        env: process.env.NODE_ENV || 'development',
        isProd: process.env.NODE_ENV === 'production',
    },
    jwt: {
        JWTSecretKey: process.env.JWT_SECRET || 'secret',
        issuer: process.env.ISSUER || 'HOPIND',
        expiry: process.env.JWT_EXPIRY || '2d',
        audience: process.env.JWT_AUD || 'HOPIND APP',
        subject: process.env.JWT_SUB || 'AUTH SERVICE',
    },
});