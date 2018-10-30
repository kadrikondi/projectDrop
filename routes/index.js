const express= require('express');
const router = express.Router();
const path = require('path')

const project =require('../models/project')
const userController= require('../controllers/userController')
const authController =require('../auth/authController');
const {verifyToken}=require('../auth/verifyToken')
const pro =require('./proroute')
const jwt=require('jsonwebtoken')
const passport = require('passport')
const projectController =require('../controllers/projectContorller')

//file upload with multer
const multer = require('multer')

//define multer storage and file name
// const storage = multer.diskStorage({
//     destination:(req, file, cb)=>{
//         cb(null, './uploadProjects/')
//     },
//     filename:(req,file, cb)=>{
//         cb(null, file.originalname +"-" + Date.now() + path.extname(file.originalname))
//     }
// })

// //configure multer filter
// const fileFilter = (req, file, cb)=>{
//     const filetypes = /docx|doc|msword|rtf|zip|rar|pdf|png|txt/;
//     //check extname
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype =filetypes.test(file.mimetype)
//     if(mimetype && extname){
//         return cb(null,true)
//     }else{
       
//     cb(new Error("upload only pdf ,doc or zip file"))
    

//     }
// // application/vnd.openxmlformats-officedocument.wordprocessingml.document
// // "application/pdf" "application/zip" "application/x-rar-compressed"
    

 
// }

//     const upload = multer({storage:storage, 
//                             limits:{fileSize:1024*1024*10},
//                             fileFilter:fileFilter
                
//     }).single('projectdoc')


    module.exports=upload
//user route configuration and link
const auth =passport.authenticate('jwt',{session:false})
router.post('/register' ,userController.posttRegisterUser);
router.post('/login',userController.postLogin);
router.put('/update/:id',auth, userController.updateUserProfile)
router.get('/users',userController.getUsers)
router.route('/user')
.get(verifyToken, userController.getUser)

router.delete('/delete/:id', userController.DeleteOne)

// router.get('/logout',authController.logOut)


//project controller

// //project route controller
router.route('/project/post')
             .post(projectController.createProject)
//             
router.route('/project/update/:id')
             .put(projectController.updateProject)
router.route('/project/get')
             .get(projectController.getAllProjects)
router.route('/project/get/:id')
            .get(projectController.getSingleProject)
router.route('/project/like/:id')
            .post(auth,projectController.likeProject)
router.route('/project/unlike/:id')
            .post(auth,projectController.unLikeProject)        
router.route('/project/comment/:id')
            .post(auth,projectController.createComment)
 router.route('/project/comment/:id/:comment_id')
            .delete(auth,projectController.deleteComment)
router.delete('/project/delete/:id', auth, projectController.Deleteproject)




//Using cloudinary
const storage = multer.diskStorage({
    filename:function(req, file, cb){
        cb(null, Date.now()+file.originalname)
    }
})
const docFilter = function(req, file, cb){
    if(!file.originalname.match(/\.(docx|doc|msword|rtf|zip|rar|pdf|txt)$/i)){
        //return cb(new Error('Only image files are allowed'), false)
        return cb('Only  zip or pdf or doc and docx files are allowed', false)
    }
    else{
        cb(null,true)
    }
}
var upload = multer({
    storage:storage,
    limits:{fileSize:1024*1024*10},
    fileFilter:docFilter
}).single('projectdoc')
var config = require('../config/config')
var cloudinary = require('cloudinary')
console.log(config.cloud_name)
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key : config.api_key,
    api_secret : config.api_secret
})

router.put('/project/upload/:id', upload,projectController.UploadProject) 

module.exports=router;