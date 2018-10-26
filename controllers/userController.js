const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const Users = require('../models/user')
 


//creat user
exports.posttRegisterUser= async(req,res)=>{

  
        
        const body=req.body;
        if(!body.username && !body.email &&!body.password){
          res.json(`please fill the require field`)
        }else{

            const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
            const {name ,email,password}=body
            const foundUser = await Users.findOne({email});
            if(foundUser){
              return res.status(403).json({error:`user already exist`})
            }
       await Users.create({
          name : req.body.name,
          email : req.body.email,
          password : hashedPassword
        },
         (err, user)=> {
          if (err) return res.status(500).send("There was a problem registering the user.")
      
          
      
          res.status(200).json({ auth: true, message:'successfully register',user:user });
        }); 
      
      }

  
}


exports.postLogin=(req,res)=>{ 
  const body =req.body;
  if(!body.email && !body.password){
      res.json('empty field')
  } else{ 


   Users.findOne({ email: req.body.email },  (err, user) =>{
    if (err) return res.status(500).json('Error on the server.');
     if (!user) return res.status(404).json('No user found.');

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) return res.status(401).json({ auth: false, token: null ,message:`password incorect`});
    const secret =process.env.secret
    const payload = {id: user.id, name: user.name}
  const token = jwt.sign( payload, 
    secret, 
    {
    expiresIn: 86400}, (err,token)=>{
      
      res.json({
        message:`welcome you are now log in`,
      auth: true,
       token: 'Bearer ' + token 
      })  
  });
  

  //res.status(200).send({ auth: true, token: token });
  
});
}
}

exports.updateUserProfile = async (req, res) => {
  const info = await Users.findOne({_id: req.params.id})
  info.name = req.body.name || info.name
  info.school = req.body.school || info.school
  info.phone = req.body.phone || info.phone
  info.department = req.body.department || info.department
  await info.save()
  res.json({message:'profile updated', upadatP :info})
}



exports.getUsers = async (req,res)=>{
 const users = await Users.find()
 if(!users) return res.json(`error users not found`)
 res.json({user:users})
}

exports.getUser = async(req,res)=>{

  // req.userId= decoded.id
    await Users.findById(req.userId,{password:0},(error,user)=>{
          if(error) return res.status(500).json({
            error:`there was a problem find the user`
          });
          if(!user) return res.status(400).json(`user Not Found`)
          res.status(200).json({
            user:user});
          })

}



// exports.changePassword = (req, res) => {
//   const hashpassword = bcrypt.hashSync(req.body.oldpassword,10)
//   Users.findByIdAndUpdate(req.params.id, req.body.oldpassword, {new:true}, (err, user) =>{
//       if(!user){
//           res.status(403).json('Invalid user')
//       }
//       else{
//           if(req.body.oldpassword === user.password && req.body.newpassword === req.body.confirm){
//               user.password = hashpassword
//               user.save()
//               res.status(200).json({
//                   message:'Password changed',
//                   user:user
//               })
//           }
//           else{
//               res.status(401).json('Please make sure that old password is correct and new password correspond with confirm password')
//           }

//       }
//   })
// }

exports.DeleteOne= async (req,res)=>{

  const users = await Users.findByIdAndRemove(req.params.id)
  res.json({message:"u just delete one user", user:users})
}