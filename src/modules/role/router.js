const roleRouter = require('express').Router()
const { createRole, findAllRole } = require('./controller')

roleRouter.post('/', createRole)
roleRouter.get('/', findAllRole)


module.exports = roleRouter