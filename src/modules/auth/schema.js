const { v4 } = require('uuid')
const mongoose = require('mongoose')
const auth = require('../auth/schema')
const Joi = require('joi');

let schema = new mongoose.Schema({
    _id:{
        type: String,
        default: () => v4()
    },
    email:{ 
        type: String,
        required: true,
        trim: true

    },
    password:{ 
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    role: {
        type: String,
        enum: ["user", "admin"]
       }
},
{
    timestamps: true
}
)

exports.authValidatorSchema = Joi.object().keys({
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: {allow: ["com", "net" ] } })
            .lowercase()
            .required(),

    password: Joi.string()
                .min(7)
                .required()
})

exports.emailValidatorSchema = Joi.object().keys({
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: {allow: ["com", "net" ] } })
            .lowercase()
            .required()
})

exports.passwordValidatorSchema = Joi.object().keys({
    newPassword: Joi.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .required()
})


exports.authSchema = mongoose.model('auth', schema)