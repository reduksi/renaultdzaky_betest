const User = require('../models/User')
const { sign } = require('../helpers/token')
const { compare } = require('../helpers/encrypt')
const redisCon = require('../helpers/redis')

class UserController {
    static async register(req, res, next){
        try {
            const { emailAddress, userName, password, accountNumber, identityNumber } = req.body
            const user = await User.create({ emailAddress, userName, password, accountNumber, identityNumber }) 
            const access_token = sign({id:user._id})
            res.status(201).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const { emailAddress, password } = req.body
            const user = await User.findOne({ emailAddress })
            if(user && compare(password, user.password)){
                const access_token = sign({id:user._id})
                res.status(200).json({access_token})
            }else{
                next({code:400, message : 'wrong email or password'})
            }
        } catch (error) {
            next(error)
        }
    }

    static async getAllUser(req, res, next){
        try {
            const redisUser = await redisCon.get('users')
            let users = []
            if(redisUser){
                users = JSON.parse(redisUser)
            } else {
                users = await User.find({}, '-password')
                redisCon.set('users', JSON.stringify(users), 'EX', 20)
            }
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res, next){
        try {
            const { findBy = 'userName' } = req.query
            if(!['userName', 'accountNumber', 'identityNumber'].includes(findBy)){
                next({code:400, message : 'the parameter you inserted is not allowed!'})
            }

            const user = await User.findOne({[findBy] : req.params.paramUser }, "-password")
            if(!user){
                return next({ code: 400, msg: 'User not found!' })
            }
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next){
        try {
            const _id = req.params.id
            const { emailAddress, userName, password, accountNumber, identityNumber } = req.body
            const user = await User.updateOne({ _id }, { emailAddress, userName, password, accountNumber, identityNumber })
            delete user.password
            res.status(201).json({msg: 'User Updated!'})
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next){
        try {
            const _id = req.params.id
            await User.deleteOne({ _id })
            res.status(201).json({msg: 'User Removed!'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController