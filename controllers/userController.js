const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const Users = require('../models/user')
const nodemailer =require('nodemailer')
const crypto = require('crypto')
const async = require('async')
const emailExistence = require('email-existence')

 


//creat user
//route: /register
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


// login user
// route: /login
exports.postLogin=(req,res)=>{ 
  const body =req.body;
  if(!body.email && !body.password){
      res.json({message:'empty field'})
  } else{ 

  if(!req.body.password){
    res.json( {message:'No password provide'})
  }

   Users.findOne({ email: req.body.email },  (err, user) =>{
    if (err) return res.status(500).json('Error on the server.');
     if (!user) return res.status(404).json({message:'No user found.'});
       
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) return res.status(401).json({ auth: false, token: null , message:`password incorect`});



          const secret = config.secret ||process.env.secret
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


// update profile
// route: /user/update/:id
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

// upload pics
//route:/user/updatepic/:id
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






//user profile
//route: /userprofile

exports.userProfile =  async (req, res) => {
  try{const User = await Users.find()
  const token = await req.headers['authorization'].split(" ")[1]
  //const decode = await jwt.verify(token, config.secret)
  
  const decode = await jwt.verify(token,  config.secret||process.env.secret)
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
    message:'success',
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
    res.json({err , message:'sorry you need to sign in'})
  }
}


//get all users 
//route:/users
exports.getUsers = async (req,res)=>{
  try{
const users = await Users.find()
 if(!users) return res.json({message:`error users not found`})
 res.json({user:users})}


 catch(err){
   res.json({err :err, message:'error in find users'})

}

}


//get singleUser
//route:user/get/:id
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

//forgetPassword
//post 
//route:/forgetpassword

exports.sendForgetPasswordToken = async (req,res,next)=>{
  const body=req.body;
  if(!body.email){
   return res.json({message:'email is required'})
  }   
console.log('start')
   async.waterfall([
     (done)=>{
       
      crypto.randomBytes(20,(err,buf)=>{
       let token= buf.toString('hex');
       done(err,token)
     })
    },
    (token,done)=>{
     //check user with email exist or not
     
       Users.findOne({email:req.body.email},(err,user)=>{
        
        
        if(user){
                  console.log(user.email)
                  user.resetPasswordToken= token
                user.resetPasswordExpires= Date.now() + 43200000;
                  console.log(user.resetPasswordExpires)
                  user.save((err)=>{
                done(err,token ,user)
                
                })
          }else{
         return res.json({message:'No Accout with that email address exist'})
          
    }

      })
    },
    //nodemailler
    (token,user,done)=>{
      const smtpTransport= nodemailer.createTransport({
        service:'Gmail',
        
        host: 'smtp.ethereal.email',// 'smtp.gmail.com',
        port: 587,//465
        secure: false, 
        auth:{
          user:'abdulkadri42@gmail.com',
          pass:'kadzee222.'

       }

      })
      var mailOptions = {
        from: 'abdulkadri42@gmail.com',
        to: user.email && 'kondipress@gmail.com',
        subject: 'projectBox Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      smtpTransport.sendMail(mailOptions,(err)=>{
       res.json({status:'success', message:'An e-mail has been sent to ' + user.email + ' with further instructions.'})
        done(err,'done')
      });

    }

    
    
    
    ],(err)=>{
     if(err) return next(err)
    })


}
//password reset

exports.resetPasswordToken= async(req,res)=>{
  // resetPasswordExpire:{$gt:Date.now()}
  const body=req.body
    if(!body.password){
      return res.json({message:'empty field new password required'})
    }
    if(body.password.length < 6 ){
     return res.json({message:'password must be greater than 6 and less  than 15 charaters '})
    }
  const newpassword=req.body.password.trim()
 const hashedPasswordChanged = await bcrypt.hashSync(newpassword,10)
  async.waterfall([

      (done)=>{
      Users.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt: Date.now()}},(err,user)=>{
        if(err) return res.json({err ,message:'error'})
        
        console.log(req.params.token)
          if(user){
            
                user.password= hashedPasswordChanged
                user.resetPasswordExpires= undefined
                user.resetPasswordToken=undefined
                user.save((err)=>{
                  
                  // req.logIn(user,(err)=>{
                  //   done(err,user)
                  // })
                  
                  done(err,user)
                //  res.json({message:'new password change ttt'})
                })
                
          }else{
            return res.json({message:'Password reset token is invalid or has expired.'})
              }

        
  
        })
      
      },
      //nodemailler
    (user, done)=>{
      console.log('maill')
      const smtpTransport= nodemailer.createTransport({
        service:'Gmail',
        
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, 
        auth:{
          user:'abdulkadri42@gmail.com',
          pass:'kadzee222.'

       }

      })
      var mailOptions = {
        from: 'abdulkadri42@gmail.com',
        to: user.email &&'kondipress@gmail.com',
        subject: 'Your password  has been changed @projectBox',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
     
      };
        
      smtpTransport.sendMail(mailOptions,(err)=>{
        console.log('konba')
       res.json({status:'success', message:'sucess! Your password has changed'})
        console.log('maile end')
       done(err,'done')
      });

    }


  ])

}