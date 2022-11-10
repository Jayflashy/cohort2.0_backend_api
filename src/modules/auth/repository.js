// repository
const {authSchema} = require('./schema')

exports.getUser = async (email) => {
    return await authSchema.findOne({ email })
}

exports.getUserProfile = async (userId) => {
    return await authSchema.findOne({ userId})
}

//query is the search parameter, data is the details to be updated
exports.updateUser = async (filter, update) => {
    const user = await authSchema.findOneAndUpdate(filter, update);
     if(!user) {
        throw new Error('User does not exit')
    }
    return user
}

exports.createNewUser = async (email, password, role ) => {
    let user = {
        email,
        password,
        role
        //role: role || "user"
    }
    
    let newUser = new authSchema(user)
    newUser.save()
    //filter result
    return {
        id: newUser._id,
        email: newUser.email
    }
}
exports.createNewProfile = async (profileObj ) => {
    let newUserProfile = new profileSchema(profileObj)
    newUserProfile.save()
    //filter result
    return {
        id: newUserProfile._id,
        first_name: newUser.first_name,
        middle_name:newUser.middle_name,
        last_name: newUser.last_name,
        country:newUser.country,
        location:newUser.location,
        phone:newUser.phone
    }
}

exports.deleteNewUser = async (id ) => {}