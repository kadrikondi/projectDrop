const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const bodyPaser = require('body-parser')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express();
const router = require('./routes/index')


app.use(cors())

//initialize public folder
app.use('/uploadproject', express.static('uploadProjects'))
app.use(bodyPaser.urlencoded({
    extended: true
}))
app.use(bodyPaser.json())
app.use('/', router)



// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
if (process.env.NODE_ENV === 'production') {
  

    app.use(express.static(path.resolve(__dirname, 'client/build')))
    app.use(express.static(path.resolve(__dirname, 'build', 'index.html')))
    console.log()
      



        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
        // res.send(`<h1>ERORR 404, PAGE NOT FOUND</h1>`)
    })
}
const port = process.env.PORT || 8000;

app.listen(port, () => {
    if (process.env.NODE_ENV === 'production') {
        mongoose.connect('mongodb://eventmanager:kadzee222@ds231740.mlab.com:31740/kondipressdb', {
                useNewUrlParser: true
            })
            .then(() => {

                console.log("mongodb connected online")
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        mongoose.connect('mongodb://localhost:27017/projectdrop', {
                useNewUrlParser: true
            })
            .then(() => {

                console.log("mongodb connected offline")
            })
            .catch((err) => {
                console.log(err)
            })

    }
    console.log(`our app is listening on port ${port}`)
})