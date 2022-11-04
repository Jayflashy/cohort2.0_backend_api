const { v4 } = require('uuid')
const { Schema, model } = require('mongoose')
const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true})
require("ajv-formats")(ajv)


let schema = new Schema({
    _id:{
        type: String,
        default: v4()
    },
    role:{ 
        type: String,
        required: true,
    },
    email:{ 
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
      role: {type: "string", enum: ["user", "medicalAdmin", "platformAdmin"]},
      description: {type: "string"},
      email: {type: "string", format: "email"}
    },
    required: ["role", "email"],
    additionalProperties: false
  }

const roleSchemaValidator = ajv.compile(ajvRoleSchema)

const roleSchema = model("role", schema)

module.exports = { roleSchema, roleSchemaValidator };