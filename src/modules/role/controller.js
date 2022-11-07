const Role = require("./model");
const { ajvErrorHandler } = require("../../utils/ajvErrorHandler");
const { roleSchemaValidator } = require("./schema");

exports.createRole = async (req, res) => {
    try {

        //destructuring the required parameters from the request body

            let { role, email, description } = req.body;

        //checking if the inputs passes the ajv schema validations 

            let isValid = await roleSchemaValidator(req.body);
                
                if (!isValid) {
        //if the inputs doesnt pass the validations, the ajv error handler will
        // help throw the eroor message

                    let data = ajvErrorHandler(roleSchemaValidator);
                    
                    throw data.error;
                }
        //if the inputs eventually passes the validations, then the user role
        //will be created using the function below

            const createdRole = await Role.createRole(role, email, description);
        
        
            // if the user si successfully created,
            //the user details will be sent to the frontend

        res.status(200).send(createdRole);

    } 

    //catches any error thrown on course of the creation and verification 
    //if there is any and sends it to the frontend

    catch (err) {

        res.status(400).send(err.message);
    }
};


exports.verifyRole = async (req, res) => {
    try {
            //destructuring the required parameters from the request body

            let { role, email } = req.body;
            
            //checking if the inputs passes the ajv schema validations 

            let isValid = await roleSchemaValidator(req.body);

            if (!isValid) {

            //if the inputs doesnt pass the validations, the ajv error handler will
            // help throw the eroor message

                    
                    let data = ajvErrorHandler(roleSchemaValidator);

                    throw data.error;
                }

            //if the inputs eventually passes the validations, then the user role
            //will be verified using the function below
            
            const verifiedRole = await Role.verifyRole(role, email);

            if (!verifiedRole) {

                //if the the user is not verified the appropriate
                //error message will be thrown

                    throw new Error("No User with such entries");
                }


            // if the user si successfully created,
            //the user details will be sent to the frontend

            res.status(200).send(verifiedRole);
    } 

    //catches any error thrown on course of the validation and verification 
    //if there is any and sends it to the frontend

    catch (err) {

            
            res.status(400).send(err.message);
    }
};

// delete Role
exports.deleteRole = async (req, res) => {
    try {
        //get id from params

        let { id } = req.params;
        
        // check if Role exists
        const checkRole = await Role.findOne({id})
        if(!checkRole){
            throw new Error("Role with selected id does not exist.");
        }
        // delete role
        checkRole.delete()
        res.status(200).send("Role has been deleted");
    } 

    //catches any error thrown on course of the validation and verification 
    //if there is any and sends it to the frontend

    catch (err) {
        res.status(400).send(err.message);
    }
};