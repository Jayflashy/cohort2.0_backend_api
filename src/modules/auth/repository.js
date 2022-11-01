// repository
const {authSchema} = require('./schema')

exports.getUser = async (email) => {
    return await authSchema.findOne({ email })
}

//query is the search parameter, data is the details to be updadted
exports.updateUser = async (filter, update) => {
    return await authSchema.updateOne({ filter }, update)
}

exports.createUser = async (email, password) => {
    let user = {
        email,
        password
    }
    
    let newUser = new authSchema(user)
    newUser.save()
    //filter result
    return {
        id: newUser._id,
        email: newUser.email
    }
}