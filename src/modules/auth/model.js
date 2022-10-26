const { model } = require('mongoose')
const { authSchema } = require('./schema')

const authModel = model('auth', authSchema)

module.exports = class Auth {
    static async signup(user) {
        try {
            let newUser = new authModel(user)
            newUser.save()

            //filter result
            return {
                id: newUser.id,
                email: newUser.email
            }
        } catch (err) {
            console.log(err)
        }
    }

    static async exists(email) {
        let user = await authModel.findOne({email})
        return user
    }
}