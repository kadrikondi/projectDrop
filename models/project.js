const mongoose = require("mongoose")
const Schema =mongoose.Schema

const projectSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    topic:{
        type:String,
        required:true

    },
    department:{
        type:String
    },
    school:{
        type:String
    },
    year:{
        type:String
    },
    projectDoc:{
        type:String
    },
    summary:{
        type:String
    }
    

})

module.exports = mongoose.model('project', projectSchema);