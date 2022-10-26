require('dotenv').config()
require('./src/utils/config')
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const authRouter = require('./src/modules/auth/router')
const connectToDB = require('./src/utils/database')

const PORT = AppConfig.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(authRouter)


//connect to database
connectToDB()
    .then(()=> {
        app.listen(PORT, () =>{
            console.log(`App is running on port ${PORT}`)
        })
    })