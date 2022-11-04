const {roleSchema} = require('./schema')

exports.createRole = async (role, description) => {
    let Role = {
        role,
        description
    }
    
    let newRole = new roleSchema(Role)
    
    return await newRole.save()
}

exports.getRole = async (role) => {
    return await roleSchema.findOne({role})
}

exports.getAllRoles = async () => {
    return await roleSchema.find();
}
