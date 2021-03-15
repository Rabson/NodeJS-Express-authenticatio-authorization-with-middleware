const httpStatus = require('http-status');

const { logger, jwt } = require('../../utils');
const { ApiError } = require('../../helpers');
const config = require('../../config');

const authenticate = async (req, res, next) => {
    try {
        logger.info('authenticate user token');

        const token = req.headers.authorization;

        if (!token) throw new ApiError({ status: httpStatus.UNAUTHORIZED, message: httpStatus['401'] });

        const decodeToken = await jwt.verifyToken(token, config.jwt);
        req.userCtx = { userId: decodeToken._id, };
        logger.info('Successfully authenticated user token');
        return next();
    } catch (error) {
        logger.error(`authenticate: Error while authenticating user token ${error.message}`);
        return next(error);
    }
};

module.exports = { authenticate }