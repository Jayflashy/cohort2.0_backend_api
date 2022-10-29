const authRouter = require('express').Router()
const { signup, verifyMail, signin } = require('./controller')

authRouter.post('/auth/signup', signup)
authRouter.post('/auth/signin', signin)
authRouter.post('/auth/verify/:link', verifyMail)

module.exports = authRouter