const { v4 } = require('uuid')
const { Schema } = require('mongoose')

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

exports.authValidatorSchema = {
    type: "object",
    properties: {
        email : {
            type: "string"
        },
        password : {
            type: "string",
            minLength: 8,
        }
    },
    required: ["email", "passsword"],
    additionalProperties: false
}