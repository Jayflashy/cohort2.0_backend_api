const {updateProfile, createNewProfile, getUserProfile, deleteProfile } = require('./repository')

module.exports = class Profile {
    /**
     * create new user profile
     * data => user Object
     */
    static async createUserProfile (data) {
        // check if user exists using the userId
        let userprofileExists = await getUserProfile(data.user)
        if (userprofileExists){
            throw new Error("User already exists")
        }
        let user = await createNewProfile(data)
        if (user) {
            return res.json.status(201).json({message: 'User Profile Created!', user})
        }
    }

    //get single user profile using userId
    static async getUserProfile(userId) {
        return await getUserProfile(userId)
    }

    /**
     * update usere profile by passing user id 
     * newData => user Object
    */
    static async updateProfile(id, newData){
        return await updateProfile(id, newData)
    }

    // delete user profile using user Id
    static async deleteUserprofile(id){
        return await deleteProfile(id)
    }
}