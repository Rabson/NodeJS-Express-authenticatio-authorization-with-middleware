const { UserService } = require('../../services');
const { commonResponse } = require('../../helpers');
const { userValidator } = require('../../validators');

exports.authenticate = async (req, res, next) => {
    try {
        const reqDTO = req.body;
        await userValidator.authenticate.validateAsync(reqDTO);
        const { data, message } = await UserService.authenticate(reqDTO);
        return commonResponse.successResponse({
            req, res, data, message
        });
    } catch (error) { return next(error); }
};

exports.create = async (req, res, next) => {
    try {
        const reqDTO = req.body;
        await userValidator.create.validateAsync(reqDTO);
        const { data, message, statusCode } = await UserService.create(reqDTO);
        return commonResponse.successResponse({
            req, res, data, message, statusCode
        });
    } catch (error) { return next(error); }
};

exports.profile = async (req, res, next) => {
    try {
        const reqDTO = req.query;
        await userValidator.profile.validateAsync(reqDTO);
        const { data, message } = await UserService.profile(reqDTO, req.userCtx);
        return commonResponse.successResponse({
            req, res, data, message
        });
    } catch (error) { return next(error); }
};

exports.getAll = async (req, res, next) => {
    try {
        const reqDTO = req.query;
        await userValidator.getAll.validateAsync(reqDTO);
        const { data, message } = await UserService.getAll(reqDTO);
        return commonResponse.successResponse({
            req, res, data, message
        });
    } catch (error) { return next(error); }
};

exports.update = async (req, res, next) => {
    try {
        const reqDTO = { ...req.params, ...req.body };
        await userValidator.update.validateAsync(reqDTO);
        const { data, message } = await UserService.update(reqDTO, req.userCtx);
        return commonResponse.successResponse({
            req, res, data, message
        });
    } catch (error) { return next(error); }
};
