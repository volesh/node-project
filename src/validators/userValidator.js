const Joi = require('joi')
const { regexConfig } = require("../configs");

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        age: Joi.number().min(16).max(120).required(),
        email: Joi.string().regex(regexConfig.EMAIL).required(),
        password: Joi.string().regex(regexConfig.PASSWORD).required()
    }),

    userForUpdateValidator: Joi.object({
        name: Joi.string().min(2).max(50).optional(),
        age: Joi.number().min(16).max(120).optional()
    })
}
