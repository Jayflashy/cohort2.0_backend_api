const {getUser, updateUser, createUser } = require('./repository')

module.exports = class Auth {
    static async createUser (user) {
        try {
            return await createUser(user)
        } catch (err) {
            console.log(err)
        }
    }
    
    static async getUser(email) {
        return await getUser(email)
    }

    //query is the search parameter, data is the details to be updadted
    static async updateUser(filter, update){
        return await updateUser(filter, update)
    }
}