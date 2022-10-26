const authRouter = require('express').Router()
const { signup } = require('./controller')

authRouter.post('/signup', signup)

module.exports = authRouter