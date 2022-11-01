require('dotenv').config()
require('./src/utils/config')
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const authRouter = require('./src/modules/auth/router')
const connectToDB = require('./src/utils/database')
const swaggerUi = require('swagger-ui-express');

const PORT = AppConfig.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const swaggerDocument = require('./spec.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRouter)

app.get('/', (req,res) => {
    res.send('Everything works pretty well 🚀, powered by Top Universe')
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