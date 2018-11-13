const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const Users = require('../models/user')
const emailExistence = require('email-existence')

 


//creat user
exports.posttRegisterUser= async(req,res)=>{
        const body=req.body;
        if(!body.name && !body.email &&!body.password &&!body.gender){
          res.json({message:`please fill the require field`})
        }else if(body.password.length < 6){
          res.json({message:`password must up to six character`})
            
        }else if(body.name.length < 3 || body.name.length >20){
          res.json({message:`username can not less than 3 character or more than 20 character`})
        }else{ 

          await emailExistence.check(req.body.email,async(err,response)=>{
            if(response===false){
              res.json({message:`you enter an invalid maill`})}
          if(response){       
            const hashedPassword = await bcrypt.hashSync(req.body.password,10)
                  const{name ,email,password}=body
                  const foundUser = await Users.findOne({email:req.body.email});
                  if(foundUser){
                    return res.status(403).json({message:`user already exist`})} 
            


                  await Users.create({
                    name : req.body.name,
                    email : req.body.email,
                    gender : req.body.gender,
                    password : hashedPassword,
                  },
                  (err, user)=> {
                    if (err) return res.status(500).send({message:"There was a problem registering the user."})
                
                    
                
                    res.status(200).json({ auth: true, message:'successfully register',user:user });

                  
                  }); 
        
                }

          })  
          
                }

  
}


exports.postLogin=(req,res)=>{ 
  const body =req.body;
  if(!body.email && !body.password){
      res.json({message:'empty field'})
  } else{ 


   Users.findOne({ email: req.body.email },  (err, user) =>{
    if (err) return res.status(500).json('Error on the server.');
     if (!user) return res.status(404).json({message:'No user found.'});

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).json({ auth: false, token: null , message:`password incorect`});
          const secret =process.env.secret
          const payload = {id:user.id, name:user.name,email:user.email,school:user.school,department:user.department,phone:user.phone,city:user.city,bio:user.bio,avater:user.avater}
        const token = jwt.sign( payload, 
          secret, 
          {
          expiresIn: 86400})
    // 86400
      const id =user.id
      res.json({
        message:`welcome you are now log in`,
       auth: true,
       id:id,
       token: 'Bearer ' + token 
      })  
      
  


  

  //res.status(200).send({ auth: true, token: token });
  
});
}
}

exports.updateUserProfile = async (req, res) => {
  const user = await Users.findOne({_id: req.params.id})
  user.name = req.body.name || user.name
  user.school = req.body.school || user.school
  user.phone = req.body.phone || user.phone
  user.department = req.body.department || user.department
  user.city=req.body.city||user.city
  user.bio=req.body.bio ||user.bio
  user.gender=req.body.gender ||user.gender
  await user.save()
  res.json({message:'profile updated', success:true, user :user})
}



exports.uploadProfileAvater= async(req, res) => {
  try{
        if(req.file == undefined || req.file == ''){
            res.status(403).json({message:` No file selected`})
        }
        else{
           const cloudinaryApi=require('cloudinary')
            var userimage = req.file.path
            const result = await cloudinaryApi.uploader.upload(userimage)
            const img =  result.original_filename
            let userImgUrl = result.secure_url
            let publicId = result.public_id
            const User = await Users.findByIdAndUpdate(req.params.id,{
                avater:userImgUrl
            }, {new:true})
            res.json({
            user:User,
            success:true,
            message:'Success Your Picture  is uploaded ',
            userImgUrl:userImgUrl
            })
        }
      }
      catch(err){
        console.log(err)
        res.json({message:err})
      }
      }







exports.userProfile =  async (req, res) => {
  try{const User = await Users.find()
  const token = await req.headers['authorization'].split(" ")[1]
  //const decode = await jwt.verify(token, config.secret)
  
  const decode = await jwt.verify(token, process.env.secret || config.secret)
  let name = decode.name
  let id = decode.id
  let email = decode.email
  let school = decode.school
  let phone = decode.phone
  let department= decode.department
  let city=decode.city
  let bio = decode.bio
  let avater=decode.avater
  res.json({
    user:'single',
      id:id,
      name:name,
      email:email,
      school:school,
      phone:phone,
      department:department,
      city:city,
      bio:bio,
      avater:avater
  })}
  catch(err){
    res.json(err)
  }
}


exports.getUsers = async (req,res)=>{
 const users = await Users.find()
 if(!users) return res.json(`error users not found`)
 res.json({user:users})
}

exports.getUser = async(req,res)=>{

  // req.userId= decoded.id
    // await Users.findById(req.userId,{password:0},(error,user)=>{
    //       if(error) return res.status(500).json({
    //         error:`there was a problem find the user`
    //       });

    //       if(!user) return res.status(400).json({message:`user Not Found`})
    //       res.status(200).json({
    //         user:user});
    //       })



     await Users.findById(req.params.id,{password:0},(err,user)=>{
      if(err) return res.status(500).json({message:`the was a problem geting user`});
      if(!user) return res.status(400).json({message:`user not found`})
      res.status(200).json({user,message:`sucesss`})
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