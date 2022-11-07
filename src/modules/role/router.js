const roleRouter = require('express').Router()
const { createRole, findAllRole, verifyRole, deleteRole } = require('./controller')

roleRouter.post('/role/create', createRole)
roleRouter.post('/role/verify', verifyRole)
roleRouter.delete('/role/delete/:id', deleteRole)



module.exports = roleRouter

