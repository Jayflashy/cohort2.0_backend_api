const { v4 } = require('uuid')
const { Schema } = require('mongoose')
const Joi = require('joi')

exports.authSchema = new Schema({
    _id:{
        type: String,
        default: v4()
    },
    email:{ 
        type: String,
        required: true,

    },
    password:{ 
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
},
{
    timestamps: true
}
)

exports.authValidatorSchema = Joi.object().keys({
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: {allow: ["com", "net" ] } })
            .required(),

    password: Joi.string()
                .min(7)
                .required()
})

exports.emailValidatorSchema = Joi.object().keys({
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: {aloow: ["com", "net" ] } })
            .required()
})

exports.passwordValidatorSchema = Joi.object().keys({
    password: Joi.string()
                .min(7)
                .required(),

    confirmPassword: Joi.ref("password")
})




