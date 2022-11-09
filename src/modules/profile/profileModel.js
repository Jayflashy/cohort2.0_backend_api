const {getUser, updateUser, createNewProfile, getUserProfile } = require('./repository')
const {authSchema} = require('../auth/schema');
const {ajvChecker } = require('./middleware');

module.exports = class Profile {
    
    static async createUserProfile (data) {

        let userprofileExists = await Profile.getUserProfile(data.user)
        if (userprofileExists){
            throw new Error("User already exists")
        }

        let user = await createNewProfile(data)
        if (user) {
            return res.json.status(201).json({message: 'User Profile Created!', user})
        }
        
    }

    static async getUsersProfile(email) {
        return await getUser(email)
    }

    static async getUserProfile(userId) {
        return await getUserProfile(userId)
    }

    //query is the search parameter, data is the details to be updated
    static async updateProfile(id, newData){

        return await updateUser(id, newData)
     
    }

    static async deleteUserprofile(userId){
        return await deleteUser(userId)
    }
}