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
    projectdoc:{
        type:String
    },
    summary:{
        type:String
    },
    name:{tyepe: String
    }, 
    avatar:{type:String
    },

    like:[{
        user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'

    }
}], 
    comment:[
        {
       user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }, 
    
     name:{
         type:String
     },
     avatar:{
         type:String
     },
     date:{
         type:Date,
         default: Date.now

     }
    }],
    
    date:{
        type:Date,
        default: Date.now

    }
    

})

module.exports = mongoose.model('project', projectSchema);