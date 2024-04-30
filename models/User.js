const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/encrypt')

const userSchema = new Schema({
    userName : {
        type : String,
        unique: true
    }, 
    accountNumber : {
        type : String,
        unique: true
    }, 
    emailAddress: {
        type : String,
        unique: true
    },
    identityNumber : {
        type : String,
        unique: true
    }, 
    password: String,
})

userSchema.pre('save', function(){
    this.password = encrypt(this.password)
})

module.exports = mongoose.model('User', userSchema)