const authRouter = require('express').Router()
const { signup, verifyMail, signin, forgetPassword, resetPassword} = require('./controller')

// Add access to profile
const { grantAccess, allowIfLoggedin, checkJWT } = require('../authorisation/middleware')

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.get('/verify/:link', verifyMail)
authRouter.post('/forget', forgetPassword)
authRouter.post('/reset/:link', resetPassword)


module.exports = authRouter