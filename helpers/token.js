const jwt = require('jsonwebtoken')

function sign(payload){
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '1d'})
}

function verify(payload){
    return jwt.verify(payload, process.env.SECRET)
}

module.exports = {sign, verify}