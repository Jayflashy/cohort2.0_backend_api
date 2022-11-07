const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { roles } = require('./roles');
const Ajv = require("ajv");

exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"});
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}
 
exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser;
  if (!user)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}

exports.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 8);
}

exports.createJWT = (user) => {
    const token = jwt.sign({id:user.id, username: user.username}, process.env.JWT_SECRET)
    return token;
}

exports.checkJWT = (req, res, next) => {
    const bearer = req.headers.authorization;

    if(!bearer) {
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }

    const [,token] = bearer.split(' ');
    if(!token) {
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }

    try {

        const user = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = user
        next()

    } catch(e) {
        console.error(e)
        res.status(401)
        res.json({message: 'not valid token but error'})
        return
    }
}

exports.ajvChecker = (data)=> {

  let schema = {
      type: "object",
      properties: {
        first_name: {type: "string"},
        middle_name: {type: "string"},
        last_name: {type: "string"},
        country: {type: "string"},
        location: {type: "string"},
        phone: {type: "string"}
      },
      required: ["first_name","last_name", "country"],
      additionalProperties: false
    }
  
  const ajv = new Ajv()
  const result = ajv.validate(schema, data)

  return result;
 
}

exports.profileValidatorSchema = () => {

}
