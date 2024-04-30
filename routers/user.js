const routes = require('express').Router()
const UserController = require('../controllers/userController')
const { authorize, authenticate } = require('../middleware/auth')

routes.post('/', UserController.register)
routes.post('/login', UserController.login)
routes.get('/', UserController.getAllUser)
routes.get('/:paramUser', UserController.getUser)
routes.use(authenticate)
routes.put('/:id', authorize, UserController.updateUser)
routes.delete('/:id', authorize, UserController.deleteUser)

module.exports = routes