const mongoose = require("mongoose")
searchPlugin = require('mongoose-search-plugin');
const Schema =mongoose.Schema

const projectSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    topic:{
        type:String,
        // required:true

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

    likes:[{
        user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'

    }
}], 
    comments:[{
       user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }, 
      text:{
          type:String,
          require:true,
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
projectSchema.plugin(searchPlugin,{
    fields:['topic','department','school','year']
})

module.exports = mongoose.model('project', projectSchema);