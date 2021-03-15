const { promisify } = require('util')
const jwt = require('jsonwebtoken');

const authentication = {
    sign: promisify(jwt.sign),
    verify: promisify(jwt.verify),
    decode: promisify(jwt.decode),
};

const generateToken = (
    data = {},
    { expiresIn = '3h', algorithm = 'HS256', JWTSecretKey, subject, issuer, audience, } = {}
) => authentication.sign(
    data,
    JWTSecretKey,
    { expiresIn, algorithm, subject, issuer, audience, }
);

const verifyToken = (encodedToken, { subject, issuer, JWTSecretKey } = {}) => authentication.verify(
    encodedToken, JWTSecretKey, { subject, issuer, subject, }
);


module.exports = { verifyToken, generateToken }