const jwt = require('jsonwebtoken')
const secret = AppConfig.JWTSECRET

module.exports = {
    generateToken  : async(user) => {
        token = jwt.sign(user, secret, {expiresIn: "5d"})
    }

}