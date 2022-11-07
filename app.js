require('dotenv').config()
require('./src/utils/config')
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const authRouter = require('./src/modules/auth/router')
const roleRouter = require('./src/modules/role/router')
const connectToDB = require('./src/utils/database')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./spec.json');
const swaggerRoleDocument = require('./role.json');


const PORT = AppConfig.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

<<<<<<< HEAD
//checking for expired token
app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
       error: "JWT token has expired, please login to obtain a new one"
      });
     }
     res.locals.loggedInUser = await User.findById(userId);
     next();
    } else {
     next();
    }
  });

const swaggerDocument = require('./spec.json');
=======
>>>>>>> cc290375fba12ce86247e26b4138b36e04b0ee6f
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api-role', swaggerUi.serve, swaggerUi.setup(swaggerRoleDocument));

app.use(authRouter)
app.use(roleRouter)

app.get('/', (req,res) => {
    res.send('Everything works pretty well 🚀, powered by TopUniverse')
})

//connect to database
connectToDB()
    .then(()=> {
        app.listen(PORT, () =>{
            console.log(`App is running on port ${PORT}`)
        })
})


// implement dependency injection
// function mongoDatabase() {
    
//     return true
// }

// function postresDatabase() {
    
//     return true
// }

// function postresDatabase() {
    
//     return true
// }


// function runApp(database) {
//     if(database) {
//         app.listen(PORT, () =>{
//             console.log(`App is running on port ${PORT}`)
//         })
//     }
// }

// runApp(postgres)