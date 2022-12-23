const {authController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");
const router = require('express').Router()

router.post(
    '/login',
    authMiddleware.isLoginValid,
    userMiddleware.isUserExist('email'),
    authController.login
)

router.post('/refresh', authMiddleware.isRefreshTokenValid, authController.refresh)
router.post('/forgotPass', userMiddleware.isUserExist('email'), authController.forgotPassword)
router.post('/changePass', authMiddleware.isActionTokenValid, authController.changePassword)

module.exports = router
