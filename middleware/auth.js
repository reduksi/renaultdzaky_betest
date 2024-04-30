const {verify} = require('../helpers/token')

function authenticate(req,res,next){
    let token = req.headers.access_token
    if (token) {
        try {
            let payload = verify(token)
            req.id = payload.id
            next()
        } catch (err) {
            next({ code: 401, msg: 'Unauthorized: Authentication is required to access this resource' })
        }
    } else {
        next({ code: 401, msg: 'Unauthorized: Authentication is required to access this resource' })
    }
}
function authorize(req, res, next){
    let currentId = req.id
    let editId = req.params.id
    try {
        if(editId=== currentId){
            next()
        }else{
            next({ code: 401, msg: 'Unauthorized: You are not allowed to edit this data. Only the owner of the data can perform this action.'})
        }
    } catch (error) {
        next(error)
    } 
}


module.exports = { authenticate , authorize }