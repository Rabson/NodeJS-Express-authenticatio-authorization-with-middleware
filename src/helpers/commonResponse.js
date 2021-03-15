const httpStatus = require('http-status');

module.exports = {
    successResponse({ res, data = {}, statusCode = httpStatus.OK, message = 'Success' }) {
        return res.status(statusCode).json({
            success: true,
            code: statusCode,
            message,
            data,
        });
    },
    failureResponse({
        res, data = {}, message = 'Failure', statusCode = httpStatus.INTERNAL_SERVER_ERROR, stack
    }) {
        return res.status(statusCode).json({
            success: false,
            code: statusCode,
            message,
            data,
            stack,
        });
    },
};
