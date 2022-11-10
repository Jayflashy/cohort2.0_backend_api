require('dotenv').config()
let development = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'http://localhost:3000',
    DBURL: process.env.DBURL || 'mongodb://localhost:27017',
    JWTSECRET: process.env.JWTSECRET || 'topuniversesecretkey',
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    SECRET: process.env.SECRET
}

let production = {
    PORT: 3000,
    HOST: '',
    DBURL: 'mongodb://localhost:27017',
    JWTSECRET: '',
    MAILGUN_API_KEY: '',
    SECRET: ''
}

let config 
if(!process.env.NODE_ENV) {
    config = development
} else {
    config = (process.env.NODE_ENV === "development") ? development : production
}

global.AppConfig = config