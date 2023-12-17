const mongoose = require("mongoose")
require("dotenv").config()

function connection(){
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Database connection successful !");
    })
    .catch((e)=>{
        console.log("Unable to connect to the database !");
    })
}

module.exports = connection;