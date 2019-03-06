const jwt = require('jsonwebtoken')
const config = require('../config/config');
const bodyParser= require('body-parser')
const Users = require('../models/user')


module.exports={
    verifyToken:
    (req, res, next)=> {
    
      // let tokenHeader= req.headers['authorization'];
      // if(typeof tokenHeader !== undefined){
      //   const bearer=tokenHeader.split(' ')
      //    const bearerToken = bearer[1] 
      // }
      //    next()
      // }else{
      //   res.status(401).json({message:'you are not logged in'})
      // }


    let token= req.headers['authorization']
    const tokenSp=token.split(' ')
    ftoken=tokenSp[1]; //with split u add bearer to token.witout split only token
    //  token =headertoken
    if (!ftoken){
        res.json({
            auth: false,
            message: 'No token provided.',
            token :null
            }) }else{
              console.log(req.token)
    const secret= config.secret|| process.env.secret
    jwt.verify(token, secret, (err, decoded)=>{
      if (err){
          res.json({ auth: false, 
        message: 'Failed to authenticate token.' });
          }
          req.user = decoded
      
          next();
      
    });
  }}
}