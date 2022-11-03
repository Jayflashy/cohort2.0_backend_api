const jwt = require('jsonwebtoken')
const SECRET = AppConfig.JWTSECRET
const HOST = AppConfig.HOST

module.exports = {
    generateToken  : async(user) => {
        token = jwt.sign(user, SECRET, {expiresIn: "10 days"}) //token expires in 10 days
        return token
    },

    generateEmailVerificationLink : async (user) => {
        link = jwt.sign(user, SECRET, { expiresIn: "1800000"}) //token expires in 30 minutes
        verificationLink = `${HOST}/auth/verify/${link}`
        return verificationLink
    },

    //return user if links is still active
    verifyLink: async (link) => {
        let isValid = jwt.verify(link, SECRET )
        if(isValid) return isValid
    },

    generatePasswordResetLink : async (user) => {
        link = jwt.sign(user, SECRET, { expiresIn: "1800000"}) //token expires in 30 minutes
        verificationLink = `${HOST}/auth/reset/${link}`
        return verificationLink
    },

}