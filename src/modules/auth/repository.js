// repository
const {authSchema} = require('./schema')

exports.getUser = async (email) => {
    return await authSchema.findOne({ email })
}

exports.getUserProfile = async (userId) => {
    return await authSchema.findOne({ userId})
}

<<<<<<< HEAD
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
=======
exports.createnewUser = async (email, password) => {
>>>>>>> cc290375fba12ce86247e26b4138b36e04b0ee6f
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