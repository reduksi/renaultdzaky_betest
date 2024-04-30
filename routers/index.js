const Routes = require("express").Router();

const userRouter = require('./user')

Routes.use('/user', userRouter)

module.exports = Routes