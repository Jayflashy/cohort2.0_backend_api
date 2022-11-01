const {getUser, updateUser, createUser } = require('./repository')
const { hashPassword, comparePasswords } = require('../../utils/hasher')
const { generateToken, generateEmailVerificationLink, generatePasswordResetLink, verifyLink } = require('../../utils/token')
const  MailService  = require('./mailService')

module.exports = class Auth {
    static async createUser (email, password) {
            // check if user exists
            let userExists = await Auth.getUser(email)
            if (userExists){
                throw new Error("User already exists")
            }
            
            //hash password
            let hashedPassword = await hashPassword(password)
            
            //save details to database
            let user = await createUser(email, hashedPassword)
        
            //generate verification email
            let verificationLink = await generateEmailVerificationLink(user)
            let mailData = {
                to: user.email,
                verificationLink
            }

            await MailService.sendVerificationMail(mailData)
    }

    
    static async getUser(email) {
        return await getUser(email)
    }

    //query is the search parameter, data is the details to be updadted
    static async updateUser(filter, update){
        return await updateUser(filter, update)
    }
}