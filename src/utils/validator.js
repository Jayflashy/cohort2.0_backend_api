const Ajv = require('ajv')
const ajv = new Ajv

const validator = async (data, schema) => {
    const validate = ajv.compile(schema)
    return validate(data)
} 
module.exports = validator