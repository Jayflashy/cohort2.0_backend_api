const authRouter = require('express').Router()
const { signup, verifyMail, signin, forgetPassword, resetPassword} = require('./controller')
const { createFacility } = require('../facility/controller')
const { createBooking } = require('../booking/controller')
const { signupProfile, readUserProfile  } = require('../profile/profileController')
// Add access to profile
const { grantAccess, allowIfLoggedin, checkJWT } = require('../authorisation/middleware')


authRouter.post('/auth/signup', signup)
authRouter.post('/auth/signin', signin)
authRouter.get('/auth/verify/:link', verifyMail)
authRouter.post('/auth/forget', forgetPassword)
authRouter.post('/auth/reset/:link', resetPassword)

//for profile
authRouter.get('/auth/user/profile/:id',checkJWT,grantAccess('readOwn', 'profile'), readUserProfile)
authRouter.post('/auth/user/profile',checkJWT,grantAccess('createOwn', 'profile'), signupProfile)
authRouter.put('/auth/user/profile/:id',allowIfLoggedin,grantAccess('updateOwn', 'profile'), updateUserProfile)

//for booking
authRouter.post('/auth/booking/:id',checkJWT, createBooking)

//for facility
authRouter.post('/auth/admin/profile/:id',checkJWT, createFacility)

module.exports = authRouter