const express= require('express')
const passport = require('passport')
const mongoose= require('mongoose')
const bodyPaser= require('body-parser')
const path = require('path')
require('dotenv').config()

const app = express();
const router = require('./routes/index')




app.use(bodyPaser.urlencoded({extended:true}))
app.use(bodyPaser.json())
app.use('/' , router)



// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//initialize public folder
app.use(express.static('uploadProjects'))


console.log()
const port = process.env.PORT|| 8000;

app.get('*', (req, res) => {
    res.send(`<h1>ERORR 404, PAGE NOT FOUND</h1>`)
})


app.listen(port,()=>{
    
mongoose.connect('mongodb://localhost:27017/projectdrop',{ useNewUrlParser: true })
    .then(()=>{

        console.log("mongodb connected")
    })
    .catch((err)=>{
        console.log(err)
    })||
    mongoose.connect('mongodb://eventmanager:kadzee222@ds231740.mlab.com:31740/kondipressdb')

    
    console.log(`our app is listening on port ${port}`)
})





