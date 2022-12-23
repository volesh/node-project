const {authValidator} = require("../validators");
const {apiError} = require("../errors");
const {AuthDb, TokenDb} = require("../dataBases");
const {authService} = require("../services");
const {tokensTypeConfig} = require("../configs");

module.exports = {
    isLoginValid: (req, res, next) => {
        try{
            const info = req.body
            const validate = authValidator.login.validate(info)
            if (validate.error) {
                throw new apiError("Invalid body", 400)
            }
            next()
        }catch (e) {
            next(e)
        }
    },

    isAccessTokenValid: async (req, res, next) => {
        try{
            const {userId} = req.params
            const token = req.get('Authorization')

            if (!token) {
                throw new apiError('No token', 401)
            }

            const isToken = await AuthDb.findOne({_user_id: userId, accessToken: token})

            if (!isToken) {
                throw new apiError('Invalid token', 404)
            }

            authService.checkToken(token)

            req.tokenInfo = isToken
            next()
        }catch (e) {
            next(e)
        }
    },

    isRefreshTokenValid: async (req, res, next) => {
        try{
            const {userId} = req.params
            const token = req.get('Authorization')

            if (!token) {
                throw new apiError('No token', 401)
            }

            const isToken = await AuthDb.findOne({refreshToken: token})

            if (!isToken) {
                throw new apiError('Invalid token', 404)
            }

            authService.checkToken(token, tokensTypeConfig.REFRESH_TOKEN)

            req.tokenInfo = isToken
            next()
        }catch (e) {
            next(e)
        }
    },

    isActionTokenValid: async (req, res, next) => {
        try {
            const token = req.get('Authorization')
            if (!token) {
                throw new apiError('No token', 400)
            }

            authService.checkToken(token, tokensTypeConfig.FORGOT_PASS_TOKEN)

            const tokenInfo = await TokenDb.findOne({ token })
            if (!tokenInfo) {
                throw new apiError('Token not valid', 404)
            }

            req.tokenInfo = tokenInfo
            next()
        }catch (e) {
            next(e)
        }
    }
}
