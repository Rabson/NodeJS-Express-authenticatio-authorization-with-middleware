const authMiddleware = require('./authentication.middleware');
const errorHandler = require('./errorHandler.middleware');

module.exports = Object.freeze({ authMiddleware, errorHandler, });
