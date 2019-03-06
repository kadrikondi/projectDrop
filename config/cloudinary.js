
const multer= require('multer')


module.exports={ cloudinaryApi:async() =>{

    //Using cloudinary
            const storage = multer.diskStorage({
                filename:function(req, file, cb){
                    cb(null, Date.now()+file.originalname)
                }
            })
            const imageFilter = function(req, file, cb){
                if(!file.originalname.match(/\.(jpeg|jpg|png)$/i)){
                    //return cb(new Error('Only image files are allowed'), false)
                    return cb('Only image files are allowed', false)
                }
                else{
                    cb(null,true)
                }
            }
            var upload = multer({
                storage:storage,
                fileFilter:imageFilter
            })
            var config = require('./config')
            var cloudinary = require('cloudinary')
            cloudinary.config({
                cloud_name: 'projectbox',
                api_key : '836526582619755',
                api_secret : 'ySnKYzQ1h3XccCSEN_8gqK_n094'
            })

    
}
}
