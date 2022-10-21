require('dotenv').config()
require('./src/config')
const express = require('express')
const app = express()

const PORT = AppConfig.PORT

app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}`)
})