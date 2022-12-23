const {userMiddleware, authMiddleware} = require("../middlewares");
const {userController} = require("../controllers");

const router = require('express').Router()

router.get('/', userController.getAll)
router.post('/', userMiddleware.isNewUserValid, userController.createUser)

router.get(
    '/:userId',
    userMiddleware.isMongoIdValid,
    authMiddleware.isAccessTokenValid,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.getById
)
router.put(
    '/:userId',
    userMiddleware.isMongoIdValid,
    userMiddleware.isUserForUpdateValid,
    authMiddleware.isAccessTokenValid,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.updateUserById
)
router.delete(
    '/:userId',
    userMiddleware.isMongoIdValid,
    authMiddleware.isAccessTokenValid,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.deleteById
)
router.patch(
    '/:userId/avatar',
    userMiddleware.isMongoIdValid,
    authMiddleware.isAccessTokenValid,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.uploadAvatar
)


module.exports = router
