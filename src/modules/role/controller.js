const Role  = require('./model')
const { ajvErrorHandler } = require('../../utils/ajvErrorHandler')
const { roleSchemaValidator } = require('./schema')

exports.createRole = async (req, res) => {
        try {
            let isValid = await roleSchemaValidator(req.body)
            if (!isValid){
                throw ajvErrorHandler(roleSchemaValidator)
            }
            
            let {role, description} = req.body
            
            const createdRole = await Role.createRole(role, description)

            res.status(200).send(createdRole)
        } 
        catch (err) {
            res.status(400).send(err)
        }        
}

exports.getRole = async (req, res) => {
    const role = await Role.getRole(req.body.role)
    res.status(200).send(role)
}

exports.findAllRole = async (req, res) => {
    const roles = await Role.getAllRoles()
    res.status(200).send(roles)
}