const express= require('express');
const router = express.Router();
const path = require('path')
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
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './uploadProjects/')
    },
    filename:(req,file, cb)=>{
        cb(null, file.originalname +"-" + Date.now() + path.extname(file.originalname))
    }
})

//configure multer filter
const fileFilter = (req, file, cb)=>{
    const filetypes = /docx|doc|msword|rtf|zip|rar|pdf|png|txt/;
    //check extname
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype =filetypes.test(file.mimetype)
    if(filetypes && mimetype){
        return cb(null,true)
    }else{
       
    cb(new Error("upload only pdf ,doc or zip file"))
    

    }
// application/vnd.openxmlformats-officedocument.wordprocessingml.document
// "application/pdf" "application/zip" "application/x-rar-compressed"
    

 
}

    const upload = multer({storage:storage, 
                            limits:{fileSize:1024*1024*10},
                            fileFilter:fileFilter
                
    }).single("projectDoc")



//user route configuration and link
const auth =passport.authenticate('jwt',{session:false})
router.post('/register' ,userController.posttRegisterUser);
router.post('/login',userController.postLogin);
router.put('/update/:id',auth, userController.updateUserProfile)
router.get('/users',auth,userController.getUsers)
router.route('/user')
.get(verifyToken, userController.getUser)

router.delete('/delete/:id', userController.DeleteOne)

// router.get('/logout',authController.logOut)


//project controller

//project route controller
router.route('/project')
.post(upload,projectController.createProject)
router.route('/updateproject/:id')
         .put(projectController.updateProject)
 router.route('/project')
         .get(projectController.getProject)
router.delete('/deletep/:id', projectController.Deleteproject)



module.exports=router;