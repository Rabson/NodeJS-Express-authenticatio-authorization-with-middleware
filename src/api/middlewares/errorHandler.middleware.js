const httpStatus = require('http-status');
const mongoose = require('mongoose');
const Joi = require('joi');
const { JsonWebTokenError } = require('jsonwebtoken');

const { commonResponse, ApiError } = require('../../helpers');
const config = require('../../config');
const { logger } = require('../../utils');

const handler = (err, req, res, _) => {

    const response = {
        res,
        message: err.message,
        statusCode: err.status,
        stack: err.stack
    };

    logger.error(JSON.stringify({ message: err.message, statusCode: err.status, stack: err.stack }));

    if (config.server.isProd) {
        if (!response.statusCode || response.statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
            response.message = 'Ops!, Something went wrong.';
        }
        delete response.stack;
    }

    return commonResponse.failureResponse(response);
};

exports.handler = handler;

exports.converter = (err, req, res, _) => {
    let convertedError = err;
    if (err instanceof Joi.ValidationError) {
        convertedError = {
            message: err.message || message.common.COMMON_UNPROCESSABLE_ENTITY,
            status: httpStatus.UNPROCESSABLE_ENTITY,
            stack: err.stack,
        };
    } else if (err instanceof mongoose.Error) {
        if (err.kind === 'ObjectId') {
            convertedError = {
                message: message.common.COMMON_INVALID_PARAMS,
                status: httpStatus.BAD_REQUEST,
                stack: err.stack,
            };
        } else {
            const errorMessage = err.message.split(':');
            convertedError = {
                message: (errorMessage[errorMessage.length - 1].trim()
                    || message.common.COMMON_UNPROCESSABLE_ENTITY),
                status: httpStatus.UNPROCESSABLE_ENTITY,
                stack: err.stack,
            };
        }
    } else if (err instanceof JsonWebTokenError) {
        convertedError = {
            message: err.message || 'Login failed',
            status: err.status || httpStatus.FORBIDDEN,
            stack: err.stack,
        };
    } else if (!(err instanceof ApiError)) {
        convertedError = {
            message: err.message,
            status: err.status,
            stack: err.stack,
        };
    }
    return handler(convertedError, req, res);
};

exports.notFound = (req, res) => {
    const notFoundErr = new ApiError({
        message: 'Not found',
        status: httpStatus.NOT_FOUND,
    });
    return handler(notFoundErr, req, res);
};

