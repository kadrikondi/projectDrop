
const mongoose = require("mongoose");


const Users = mongoose.Schema({
    email: {type:String},
    password:{type:String},
    name:{type:String},
    school:{type:String},
    phone:{type:String},
    department:{type:String},
    join:  {type:Date, Default:Date.now() },

    


})
module.exports = mongoose.model('Users', Users);