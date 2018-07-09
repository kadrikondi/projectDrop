const jwt = require('jsonwebtoken')
const config = require('../config/config');
const bodyParser= require('body-parser')
const Users = require('../models/user')


module.exports={
    verifyToken:
    (req, res, next)=> {

    const token = req.headers['x-access-token'];
    if (!token){
        res.json({auth: false,
             message: 'No token provided.'}) }else{
    
    jwt.verify(token, config.secret, (err, decoded)=> {
      if (err){
          res.json({ auth: false, 
        message: 'Failed to authenticate token.' });
          }
          req.userId = decoded.id;
          next();
      
    });
  }}
}