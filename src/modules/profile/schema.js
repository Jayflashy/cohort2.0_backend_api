const { v4 } = require('uuid')
const { Schema, model } = require('mongoose')
const Ajv  = require('ajv')
const ajv = new Ajv()

let schema = new Schema({
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "profile Id",
        default: v4()
      },
      name: {
          type: "string",
          description: "Name of the role",
          default: "User",
      },
      description: {
          type: "string",
          description: "Description of the role",
      },
    },
    required: ["name"],
  },
  {
      timestamps: true
  }
)

exports.roleValidator = ajv.validate(schema, roleData);


exports.roleSchema = model('role', schema)