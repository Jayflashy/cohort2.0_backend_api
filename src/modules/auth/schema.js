const { v4 } = require('uuid')
const { Schema } = require('mongoose')

exports.authSchema = new Schema({
    id:{
        type: String,
        default: v4()
    },
    email:{ 
        type: String,
    },
    password:{ 
        type: String
    },
},
{
    timestamps: true
}
)

exports.authValidatorSchema = {
    type: "object",
    properties: {
        email : {type: "string"},
        password : {type: "string"}
    },
    required: ["email", "passsword"],
    additionalProperties: false
}