const Auth  = require('./model')
const validator = require('../../utils/validator')
const { authValidatorSchema } = require('./schema')
const { generateToken, generateEmailVerificationLink, verifyLink } = require('../../utils/token')
const { hashPassword, comparePasswords } = require('../../utils/hasher')
const { alwaysValidSchema } = require('ajv/dist/compile/util')
const  MailService  = require('./mailService')

module.exports = {
    
    signup: async (req, res) => {
        let { email , password } = req.body

        try {
            email = email.toLowerCase()
            let user = { email, password}

            //validate user inputs
            // let isValid = await validator(user, authValidatorSchema)
            // console.log(isValid)
            // if (!isValid){
            //     err = isValid.errors
            //     console.log("this validator error")
            //     console.log(err)
            //     throw err
            // }

            // check if user exists
            let userExists = await Auth.get(email)
            if (userExists){
            throw new Error("User already exists")
            }

            //hash password
            let hashedPassword = await hashPassword(password)
            user.password = hashedPassword
            
            //save details to database
            user = await Auth.create(user)

            //generate verification email
            let verificationLink = await generateEmailVerificationLink(user)
            console.log(`verification mail :  ${verificationLink}`)
            let mailData = {
                to: user.email,
                verificationLink
            }
            let mail = await MailService.sendVerificationMail(mailData)
            
            //send success message
            res.status(200).json({
                message: "Verification mail sent successfully"
            })
            
        } 
        catch (err) {
            res.status(401).json(err.message)
        }

    },

    //email account verification
    verifyMail: async(req, res) => {
        let verificationLink = req.params.link

        try {
            user = await verifyLink(verificationLink)
            console.log(user)//log
            if(!user){
                throw new Error("Link expired")
            }
            let { email } = user
            console.log(email)//log
            await Auth.update(email, {status: "active"})

            res.status(200).json({
                message: "Account verified"
            })
        } 
        catch (err) {
            res.status(400).json({
                error: err.message
            })
        }
    },


    signin: async (req, res) => {
        let { email, password } = req.body

        try {
            email = email.toLowerCase()
            let user = { email, password}

            //validate user inputs
            let isValid = validator(user, authValidatorSchema)
            if (!isValid){
                err = validate.errors
                throw err
            }

            //check user credentials
            user = await Auth.get(email)
            if (!user){
                throw new Error("Wrong email or email combination")
            }

            let hashedPassword = user.password
            let compared = await comparePasswords(password, hashedPassword)
            if(!compared){
                throw new Error("Wrong email or email combination")
            }

            //filter result from db
            user = {
                id: user._id,
                email: user.email
            }

            //generate jwt token
            let token = generateToken(user)

            res.cookie("jwt", token, {
                maxAge: 3600 * 1000,//1hr
                secure: true,
                httpOnly: true
            })
            res.status(200).json(user)


        } catch (err) {
            res.status(401).json({
                error: err.message
            })
        }
    },

    signout: async(req, res) => {
        
    }
}