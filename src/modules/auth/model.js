<<<<<<< HEAD
const {getUser, updateUser, createNewUser } = require('./repository')
=======
const {getUser, updateUser, createnewUser } = require('./repository')
>>>>>>> cc290375fba12ce86247e26b4138b36e04b0ee6f
const { hashPassword, comparePasswords } = require('../../utils/hasher')
const { generateToken, generateEmailVerificationLink, generatePasswordResetLink, verifyLink } = require('../../utils/token')
const  MailService  = require('./mailService')

module.exports = class Auth {
    
    static async createUser (email, password, role="user") {
            // check if user exists
            let userExists = await Auth.checkUser(email)
            if (userExists){
                throw new Error("User already exists")
            }
            
            //hash password
            let hashedPassword = await hashPassword(password)
            
            //save details to database
<<<<<<< HEAD
            let user = await createNewUser(email, hashedPassword, role)
=======
            let user = await createnewUser(email, hashedPassword)
>>>>>>> cc290375fba12ce86247e26b4138b36e04b0ee6f
        
            //generate verification email
            let verificationLink = await generateEmailVerificationLink(user)
            let mailData = {
                to: user.email,
                verificationLink
            }

            await MailServic.sendVerificationMail(mailData)
    }
    static async createUserProfile (profileObj) {
        let userprofileExists = await Auth.getUserProfile(profileObj._Id)
        if (userprofileExists){
            throw new Error("User already exists")
        }

        let user = await createNewUser(profileObj)
        if (user) {
            return res.json.status(201).json({message: 'User Profile Created!', user})
        }
        
    }

<<<<<<< HEAD
    static async getUser(email) {
=======
    
    static async checkUser(email) {
>>>>>>> cc290375fba12ce86247e26b4138b36e04b0ee6f
        return await getUser(email)
    }
    
    static async getUser(email) {
        let user = await getUser(email)

        //filter user object
        user = {
            id: user._id,
            email: user.email
        }

        //generate password reset email
        let passwordResetLink = await generatePasswordResetLink(user)
        let mailData = {
            to: user.email,
            passwordResetLink
        }
        await MailService.sendPasswordResetMail(mailData)

    }
    

    static async getUserProfile(userId) {
        return await getUserProfile(userId)
    }

    //query is the search parameter, data is the details to be updated
    static async updateUser(filter, update){
        return await updateUser(filter, update)
    }

    static async deleteUser(userId){
        return await deleteUser(userId)
    }
}