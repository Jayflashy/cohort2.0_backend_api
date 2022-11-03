const authRouter = require('express').Router()
const { signup, verifyMail, signin, forgetPassword, resetPassword } = require('./controller')

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/verify/:link', verifyMail)
authRouter.post('/forget', forgetPassword)
authRouter.post('/reset/:link', resetPassword)


module.exports = authRouter