const Joi = require('joi')


exports.validator = async (data, schema) => {
    try {
        let value = await schema.validate(data)
        return{
            isValid : true,
            value
        }
    }
    catch (err) {
       return {
        isValid: false,
        err
       }
    }
}