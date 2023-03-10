const { userService, emailService, s3Service } = require("../services");
const { emailActionsConfig } = require("../configs");
const UserDb = require("../dataBases/User");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.getAll()

            res.json(users)
        }catch (e) {
            next(e)
        }
    },

    getById: async (req, res, next) => {
        try{
            const user = req.user

            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try{
            const user = await UserDb.createWithHashPass(req.body)

            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params
            const userInfo = req.body

            const newUser = await userService.updateUser(userId, userInfo)

            await emailService.sendEmail('volesh2@gmail.com', emailActionsConfig.USER_CHANGED)

            res.json(newUser)
        }catch (e) {
            next(e)
        }
    },

    deleteById: async (req, res, next) => {
        try{
            const {userId} = req.params

            await userService.deleteUser(userId)

            await emailService.sendEmail('volesh2@gmail.com', emailActionsConfig.USER_DELETED)

            res.json('Deleted')
        }catch (e) {
            next(e)
        }
    },

    uploadAvatar: async (req, res, next) => {
        try {
            const uploadData = await s3Service.uploadPublicFile(req.files.avatar, 'users', req.params.userId)
            const updatedUser = await userService.updateUser(req.params.userId,{avatar: uploadData.Location})

            res.json(updatedUser)
        }catch (e) {
            next(e)
        }
    }
}
