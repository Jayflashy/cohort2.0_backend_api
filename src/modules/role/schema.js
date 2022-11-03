const { v4 } = require('uuid')
const { Schema, model } = require('mongoose')
const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true})

let schema = new Schema({
    _id:{
        type: String,
        default: v4()
    },
    role:{ 
        type: String,
        required: true,
    },
    role:{ 
        type: String,
        required: true,
    },
    description:{ 
        type: String,
        required: false
    }
},
{
    timestamps: true
}
)

const ajvRoleSchema = {
    type: "object",
    properties: {
      role: {type: "string", enum: ["user", "admin", "other"]},
      description: {type: "string"}
    },
    required: ["role"],
    additionalProperties: false
  }

exports.roleSchemaValidator = ajv.compile(ajvRoleSchema)

exports.roleSchema = model('role', schema)