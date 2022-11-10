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
    await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     if(user) {
        return res.status(200).json({
            data: user,
            message: 'User has been updated'
           });
     } 

     return res.json({
        data: user,
        message: 'User does not exit'
       });
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


exports.deleteNewUser = async (id ) => {}