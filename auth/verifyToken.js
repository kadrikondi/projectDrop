const jwt = require('jsonwebtoken')
const config = require('../config/config');
const bodyParser= require('body-parser')
const Users = require('../models/user')


module.exports={
    verifyToken:
    (req, res, next)=> {

    const headertoken= req.headers['authorization'];
     token =headertoken.split(' ')[1]
    if (!token){
        res.json({auth: false,
             message: 'No token provided.'}) }else{
    const secret= process.env.secret
    jwt.verify(token, secret, (err, decoded)=> {
      if (err){
          res.json({ auth: false, 
        message: 'Failed to authenticate token.' });
          }
          req.userId = decoded.id;
      
          next();
      
    });
  }}
}