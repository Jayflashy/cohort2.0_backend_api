const {roleSchema} = require('./schema')

exports.createRole = async (role, email, description) => {
    let Role = {
        role,
        email,
        description
    }
    
    let newRole = new roleSchema(Role)
    return await newRole.save()
}


exports.getRole = async (role, email) => {
    let user = await roleSchema.findOne({ email })
    
    if (user) {
        if (user.role = role)
        {
            return false
        }
    }
    return true
   
}

exports.checkRole = async (role, email) => {
    let user = await roleSchema.findOne({ email })
    
    if (!user) {
        return false
    }

    if (user) {
        if (user.role === role && user.email === email)
        return user
    }

}