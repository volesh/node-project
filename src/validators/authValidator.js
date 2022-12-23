const Joi = require('joi')
const {regexConfig} = require("../configs");

module.exports = {
    login: Joi.object({
        email: Joi.string().regex(regexConfig.EMAIL).required(),
        password: Joi.string().regex(regexConfig.PASSWORD).required()
    })
}
