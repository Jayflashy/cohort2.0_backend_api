const Auth  = require('./model')
const validator = require('../../utils/validator')
const { authValidatorSchema } = require('./schema')
const { generateToken } = require('../../utils/token')

module.exports = {
    
    signup: async (req, res) => {
        let { email , password } = req.body

        try {
            email = email.toLowerCase()
            let user = { email, password}

        console.log(email)

            // check if user exists
            let userExists = await Auth.exists(email)
            if (userExists){
            throw new Error("User already exists")
            }

            //validate user inputs
            let isValid = validator(user, authValidatorSchema)
            if (!isValid){
                err = validate.errors
                throw err
            }

            //save details to database
            user = await Auth.signup(user)
            console.log(user)

            //generate jwt token
            let token = generateToken(user)

            res.cookie("jwt", token, {
                maxAge: 3600 * 1000,//1hr
                secure: true,
                httpOnly: true
            })
            res.status(200).json(user)
            
        } 
        catch (err) {
            res.status(401).json(err.message)
        }



    }
}