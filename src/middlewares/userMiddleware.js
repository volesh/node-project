const { userValidator } = require("../validators");
const { apiError } = require("../errors");
const { userService } = require("../services");
const { isObjectIdOrHexString } = require("mongoose");

module.exports = {
    isUserExist: (fieldName, findIn = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
           const fieldToSearch = req[findIn][fieldName]
            const user = await userService.getByParam(dbField, fieldToSearch)

            if (!user) {
                throw new apiError('User not found', 404)
            }

            req.user = user
            next()
        }catch (e) {
            next(e)
        }
    },

    isNewUserValid: (req, res, next) => {
        try {
            const userInfo = req.body
            const validate = userValidator.newUserValidator.validate(userInfo)

            if (validate.error) {
                throw new apiError('Invalid body', 400)
            }

            next()
        }catch (e) {
            next(e)
        }
    },

    isUserForUpdateValid: (req, res, next) => {
        try {
            const userInfo = req.body
            const validate = userValidator.userForUpdateValidator.validate(userInfo)

            if (validate.error) {
                throw new apiError('Invalid body', 404)
            }

            next()
        }catch (e) {
            next(e)
        }
    },

    isMongoIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params
            const isValid = isObjectIdOrHexString(userId)

            if (!isValid) {
                throw new apiError('User id not valid', 400)
            }

            next()
        }catch (e) {
            next(e)
        }
    }
}
