const { userRouter, authRouter } = require("./index");
const apiRouter = require('express').Router()


apiRouter.use('/users', userRouter)
apiRouter.use('/auth', authRouter)

module.exports = apiRouter
