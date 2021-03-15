const Joi = require('joi');

module.exports = {
    get: Joi.object({}),
    profile: Joi.object({}),
    getAll: Joi.object({
        start: Joi.number().integer().positive().allow(0),
        count: Joi.number().integer().positive(),
        keyword: Joi.string().allow(null, ''),
    }),
    create: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        bio: Joi.string().allow(null, ''),
    }),
    authenticate: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
    update: Joi.object({
        name: Joi.string(),
        bio: Joi.string().allow(null, ''),
    }),
};
