/**
 * The global configuration file is used to set configuration parameters
 * that would be used throughout the application
 */
 global.AppConfig = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DBURL: process.env.DBURL,
    JWTSECRET: process.env.JWTSECRET
}