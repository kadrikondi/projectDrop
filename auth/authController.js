const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const bodyParser= require('body-parser')
const Users = require('../models/user')
 


//creat user
exports.posttRegisterUser=(req,res)=>{

  
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const body=req.body;
        if(!body.username && !body.email &&!body.password){
          res.json(`please fill the require field`)
        }else{
        Users.create({
          username : req.body.name,
          email : req.body.email,
          password : hashedPassword
        },
         (err, user)=> {
          if (err) return res.status(500).send("There was a problem registering the user.")
      
          // // create a token
          // const token = jwt.sign({ id: user._id }, config.secret, {
          //   expiresIn: 86400 // expires in 24 hours
          // });
      
          res.status(200).json({ auth: true, message:'successfully register' });
        }); 
      
      }

  
}
exports.getLogin=(req,res)=>{
  res.json(`get login page`)
}


exports.postLogin=(req,res)=>{ 
  const body =req.body;
  if(!body.email && !body.password){
      res.json('empty field')
  } else{ 


   Users.findOne({ email: req.body.email },  (err, user) =>{
    if (err) return res.status(500).send('Error on the server.');
     if (!user) return res.status(404).send('No user found.');

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.json({message:`welcome you are now log in`,
  auth: true, token: token })

  //res.status(200).send({ auth: true, token: token });
  
});
}
}

// exports.profile=(req,res)=>{


//   // const token = req.headers['x-access-token'];
//   //   if (!token){
//   //       res.json({auth: false,
//   //            message: 'No token provided.'}) }else{
    
//   //   jwt.verify(token, config.secret, (err, decoded)=> {
//   //     if (err){
//   //         res.json({ auth: false, 
//   //       message: 'Failed to authenticate token.' });
//   //         }
//       Users.findById(req.userId,  {password:0},(err, user)=> {
//           //projection
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
        
//         res.status(200).send(user);
//       });
      
//     }
// //   );
// //   }
// // }
// // // log out 

exports.logOut=(req,res)=>{
  res.json({message:`you are now log out`,
  auth: false, token: null
  })
}
exports.updateUserProfile = async (req, res) => {
  const info = await Users.findOne({_id: req.params.id})
  info.name = req.body.name || info.name
  info.school = req.body.school || info.school
  info.phone = req.body.phone || info.phone
  info.department = req.body.department || info.department
  await info.save()
  res.json({message:'profile updated'})
}