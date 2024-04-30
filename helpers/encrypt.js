 const bcrypt = require('bcryptjs')
 
function encrypt(pass){
    return bcrypt.hashSync(pass, 10)
}
function compare(pass, encrypted = ''){
    return bcrypt.compareSync(pass, encrypted)
}

module.exports = {encrypt, compare}