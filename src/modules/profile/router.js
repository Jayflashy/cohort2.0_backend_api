const authRouter = require('express').Router()
const { signupProfile, readUserProfile, updateProfile  } = require('../profile/controller')
const { grantAccess, allowIfLoggedin, checkJWT } = require('../authorisation/middleware')

authRouter.get('/auth/user/profile/:id',checkJWT,grantAccess('readOwn', 'profile'), readUserProfile)
authRouter.post('/auth/user/profile',checkJWT,grantAccess('createOwn', 'profile'), signupProfile)
authRouter.put('/auth/user/profile/:id',allowIfLoggedin,grantAccess('updateOwn', 'profile'), updateProfile)

module.exports = authRouter