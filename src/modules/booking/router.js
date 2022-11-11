const bookingRouter = require('express').Router()
const { createBooking } = require('../booking/controller')
const {checkJWT } = require('../authorisation/middleware')

bookingRouter.post('/booking/:id',checkJWT, createBooking)

module.exports = bookingRouter
