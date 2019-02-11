
const mongoose = require("mongoose");


const Users = mongoose.Schema({
    email: {type:String},
    password:{type:String,require:true},
    name:{type:String},
    school:{type:String},
    phone:{type:String},
    gender:{type:String},
    department:{type:String},
    city:{type:String},
    bio:{type:String},
    avater:{type:String},
    join:  {type:Date, Default:Date.now() },
    resetPasswordToken: String,
    resetPasswordExpires:{type:Date},

    


})
module.exports = mongoose.model('Users', Users);