const { v4 } = require('uuid')
const mongoose = require('mongoose')

let adminSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: v4()
    },
    first_name:{ 
        type: String,
        required: true,
        trim: true

    },
    middle_name:{ 
        type: String,
        trim: true
    },
    last_name:{ 
        type: String,
        required: true,
        trim: true

    },
    country:{ 
        type: String,
        required: true
    },
    location:{ 
        type: String,
        required: true
    },
    phone:{ 
        type: String,
        required: true

    },
},
{
    timestamps: true
}
)

const Joi = require('joi');

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