const { authService, emailService, userService, smsService } = require("../services");
const { apiError } = require("../errors");
const { emailActionsConfig, envsConfig, tokensTypeConfig, smsActionsConfig } = require("../configs");



module.exports = {
    login: async (req, res, next) => {
        try{
            const loginInfo = req.body
            const {_id, email, password} = req.user

            await authService.comparePasswords(loginInfo.password, password)

            const tokens = authService.generateAccessTokenPair({email})
            if (!tokens){
                throw new apiError('Something went wrong', 500)
            }

            const tokenPair = await authService.createTokensPair({...tokens, _user_id: _id})

            await emailService.sendEmail('volesh2@gmail.com', emailActionsConfig.LOGIN)
            await smsService.sendSms(smsActionsConfig.HELLO, '+380682443742')

            res.json(tokenPair)
        }catch (e) {
            next(e)
        }
    },

    refresh: async (req, res ,next) => {
        try{
            const {_user_id} = req.tokenInfo

            const tokens = authService.generateAccessTokenPair({_user_id})
            const newTokenPair = await authService.createTokensPair({...tokens, _user_id})

            res.json(newTokenPair)
        }catch (e) {
            next(e)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const token = authService.generateActionToken(req.body, envsConfig.FORGOT_PASS_KEY_WORD)
            const user = req.user
            await emailService.sendEmail(
                'volesh2@gmail.com',
                emailActionsConfig.FORGOT_PASS,
                {url:`${envsConfig.FRONTEND_URL}?token=${token}`}
            )

            await authService.createToken({
                _user_id: user._id,
                token,
                tokenType: tokensTypeConfig.FORGOT_PASS_TOKEN
            })

            res.json({token})
        }catch (e) {

        }
    },

    changePassword: async (req, res, next) => {
        try {
            const {tokenInfo} = req
            const password = await authService.hashPassword(req.body.password)
            const newUserInfo = await userService.updateUser(tokenInfo._user_id, { password })

            await authService.deleteActionToke(tokenInfo.token)

            await emailService.sendEmail('volesh2@gmail.com', emailActionsConfig.USER_CHANGED)

            res.json(newUserInfo)
        }catch (e) {
            next(e)
        }
    }
}
