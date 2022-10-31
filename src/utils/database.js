const mongoose = require("mongoose");
const DBURL =  AppConfig.DBURL

async function connectToDB () {
    mongoose.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected")
    }).catch(err => {
        console.log(err)
    })
    ;
};

module.exports = connectToDB;