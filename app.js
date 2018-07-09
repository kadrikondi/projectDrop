const express= require('express')
const mongoose= require('mongoose')
const bodyPaser= require('body-parser')
const app = express();
const router = require('./routes/index')




app.use(bodyPaser.urlencoded({extended:true}))
app.use(bodyPaser.json())
app.use('/' , router)


const port = 8000

app.get('*', (req, res) => {
    res.send(`<h1>ERORR 404, PAGE NOT FOUND</h1>`)
})


app.listen(port,()=>{
    
mongoose.connect('mongodb://localhost/projectdrop')
    .then(()=>{

        console.log("mongodb connected")
    })
    .catch((err)=>{
        console.log(err)
    })||
    mongoose.connect('mongodb://eventmanager:kadzee222@ds231740.mlab.com:31740/kondipressdb')

    
    console.log(`our app is listening on port ${port}`)
})





