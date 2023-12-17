var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:[true,"Please provide an email !"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password !"],
        unique:false,
    },
    token:{
        type:String,
        required:false,
        unique:true,
    }
})

module.exports = mongoose.model("Users",UserSchema);