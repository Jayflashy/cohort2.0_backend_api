const roleRouter = require('express').Router()
const { createRole, findAllRole, verifyRole } = require('./controller')

roleRouter.post('/role/create', createRole)
roleRouter.post('/role/verify', verifyRole)
roleRouter.put('/role/update', updateRole)


module.exports = roleRouter

