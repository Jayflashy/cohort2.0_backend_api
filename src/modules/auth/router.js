const authRouter = require('express').Router()
const { signup, verifyMail, signin, forgetPassword, resetPassword } = require('./controller')

authRouter.post('/auth/signup', signup)
authRouter.post('/auth/signin', signin)
authRouter.get('/auth/verify/:link', verifyMail)
authRouter.post('/auth/forget', forgetPassword)
authRouter.post('/auth/reset/:link', resetPassword)


module.exports = authRouter