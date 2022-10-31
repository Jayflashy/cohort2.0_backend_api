const { model } = require('mongoose')
const { authSchema } = require('./schema')

const authModel = model('auth', authSchema)

module.exports = class Auth {
    static async createUser (user) {
        try {
            let newUser = new authModel(user)
            newUser.save()

            //filter result
            return {
                id: newUser._id,
                email: newUser.email
            }
        } catch (err) {
            console.log(err)
        }
    }

    static async getUser(email) {
        let user = await authModel.findOne({ email })
        return user
    }

    //query is the search parameter, data is the details to be updadted
    static async updateUser(filter, update){
        return await authModel.updateOne({ filter }, update)
    }

}