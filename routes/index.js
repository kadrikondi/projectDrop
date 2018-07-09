const express= require('express');
const router = express.Router();
const userController= require('../controllers/userController')
const authController =require('../auth/authController');
const {verifyToken}=require('../auth/verifyToken')


router.get('/home',verifyToken,userController.homePage);
router.get('/register',userController.getRegisterUser);
router.post('/register',authController.posttRegisterUser);
router.get('/login',authController.getLogin);
router.post('/login',authController.postLogin);
router.get('/profile',verifyToken,authController.profile)

router.get('/logout',authController.logOut)




module.exports=router;