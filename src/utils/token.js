const jwt = require('jsonwebtoken')
const { sendVerificationMail } = require('../modules/auth/mailService')
const secret = AppConfig.JWTSECRET

module.exports = {
    generateToken  : async(user) => {
        token = jwt.sign(user, secret, {expiresIn: "5d"})
        return token
    },

    //link expires in 5 minute
    generateEmailVerificationLink : async (user) => {
        verificationLink = jwt.sign(user, secret, { expiresIn: "5m"})
        return verificationLink
    },

    //return user if links is still active
    verifyLink: async (link) => {
        jwt.verify(link, secret, (err, user) => {
            if (err){
                return false
            }
            return user
        })
    }

}