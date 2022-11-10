const Profile = require('./model')
const { validator } = require('../../utils/validator')
const { createJWT, ajvChecker, profileValidatorSchema } = require('./middleware');


//user signup profile handler
exports.signupProfile = async (req, res) => {
    try {
        //validate user inputs
        let data = await ajvChecker(req.body, profileValidatorSchema)
        if (!data) {
            throw validate.errors
        }
     
        await Profile.createUserProfile(data)
        //send success message
        res.status(200).json({
            success: "Profile successfully created"
        })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//update profile
exports.updateProfile = async (req, res) => {

    const id = req.params.id
    //validate user inputs
    let data = await ajvChecker(req.body, profileValidatorSchema)
    if (!data) {
        throw validate.errors
    }
 
    await Profile.updateUserProfile(id, data)

    res.status(200).json({
        success: "Profile updated!"
    })
}

//read user profile
exports.readUserProfile = async (req, res) => {
    try {
       await Auth.getUser()
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }

}

exports.signout = async (req, res) => {
    //clear cookies
    res.clearCookie('jwt')
}

exports.forgetPassword = async (req, res) => {
    let { email } = req.body

    try {
        //validate user inputs
        let data = await validator(req.body, emailValidatorSchema)
        if (!data.isValid) {
            throw data.error
        }

        //find email on the db
        let user = await Auth.getUser(email)

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


        res.status(200).json({
            success: "Password reset link sent..."
        })

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

exports.resetPassword = async (req, res) => {
    //accept the password reset link from the route param
    let passwordResetLink = req.params.link

    // let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    // let isValid = req.body.newPassword.match(reg)
    // if(isValid != null) {
    //     console.log('valid')
    // }


    // accept new password from json body
    let { newPassword } = req.body

    try {
        // validates if password meets our set requirement
        let data = await validator(req.body, passwordValidatorSchema)
        if (!data.isValid) {
            throw data.error
        }

        // check the validity of the password reset link
        let user = await verifyLink(passwordResetLink)
        if (!user) {
            throw new Error("Link expired")
        }

        let { email } = user
        //hash new password
        let hashedPassword = await hashPassword(newPassword)

        //update and save new password
        await Auth.updateUser(email, { password: hashedPassword })

        res.status(200).json({
            success: "password reset successful"
        })
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}