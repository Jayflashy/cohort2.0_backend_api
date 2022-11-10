require('dotenv').config()
require('./src/utils/config')
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const connectToDB = require('./src/utils/database')
connectToDB()

const cors = require("cors");

app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    optionsSuccessStatus: 200,
}));


const PORT = AppConfig.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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


// routers
const auth = require('./src/modules/auth/router'),
    role = require('./src/modules/role/router'),
    booking = require('./src/modules/booking/router'),
    profile = require('./src/modules/profile/router')

app.use(auth, role, booking, profile)


// swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./spec.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req,res) => {
    res.send('Everything works pretty well 🚀, powered by TopUniverse')
})

app.listen(PORT, () =>  console.log(`App is running on port ${PORT}`))