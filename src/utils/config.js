/**
 * The global configuration file is used to set configuration parameters
 * that would be used throughout the application
 */
 global.AppConfig = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'http://localhost:3000',
    DBURL: process.env.DBURL || 'mongodb://localhost:27017',
    JWTSECRET: process.env.JWTSECRET || 'topuniversesecretkey',
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY
}