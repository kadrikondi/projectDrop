const jwt = require('jsonwebtoken')
const config = require('../config/config');
const bodyParser= require('body-parser')
const Users = require('../models/user')


module.exports={
    verifyToken:
    (req, res, next)=> {

    let token= req.headers['authorization'].split(" ")[1]; //with split u add bearer to token.witout split only token
    //  token =headertoken
    if (!token){
        res.json({
            auth: false,
            message: 'No token provided.',
            token :null
            }) }else{
    const secret= config.secret|| process.env.secret
    jwt.verify(token, secret, (err, decoded)=> {
      if (err){
          res.json({ auth: false, 
        message: 'Failed to authenticate token.' });
          }
          req.user = decoded
      
          next();
      
    });
  }}
}