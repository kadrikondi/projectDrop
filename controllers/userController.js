const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const Users =require('../models/user')





exports.homePage=(req,res)=>{
   console.log('good')
   
    res.json('<h1>Welcome to homepage<h1>')
}

exports.getRegisterUser=(req,res)=>{
    res.json(`register pages`)
}