// import project from '../models/project';
const project =require('../models/project')
const fs = require('fs')
//user model
const Users = require('../models/user')
const upload =require('../routes/index')
const multer = require('multer')



//@controller: create a project
//@acess: private
//@route: project

exports.createProject = async(req,res)=>{

    const body = req.body
    if(!body.topic &&!body.department && !body.school &&!body.year && !body.projectDoc){
        res.json({must:`empty field`})


}else{


 const newproject  =await new project({
        topic:body.topic,
        department:body.department,
        school:body.school,
        year:body.year,
        user:req.user.id,
         name:body.name,
        avatar:body.avatar,
        projectdoc:req.file.path
    }).save()
    
    res.json({message:'upload successfull',project: newproject})
}
    

}



//@controller: get all project
//@acess: public
exports.getAllProjects = async (req,res)=>{
    const allproject = await project.find()
                        .sort({date:-1})
    if(!allproject) return res.json(`error users not found`)
    res.json({allproject:allproject})
   }


   //@controller: get a single project
//@acess: private
exports.getSingleProject = async (req,res)=>{
    const singleProject= await project.findById(req.params.id)
       if(!singleProject){
           res.json({error:"project not exist"})
       }                 
    res.json({singleProject:singleProject})
   }


   




//@controller: edit project
//@acess: private
exports.updateProject = async (req, res) => {
    const info = await project.findOne({_id: req.params.id})
    info.topic = req.body.topic || info.topic
    info.department = req.body.department||info.department
    info.school = req.body.school || info.school
    info.year = req.body.year || info.year
    info.summary =req.body.summary||info.projectSummary
    await info.save()
    res.json({message:'profile updated', upadatP :info})
  }




//@controller: delete a project
//@acess: private
// @method:post
  exports.Deleteproject= async (req,res)=>{
    try{
             //find user post a project
            const user = await Users.findById({_id:req.user.id})
            console.log(user.id+ "-======= from user")
            //get a project to delete
            const todeleteproject = await project.findById(req.params.id)
            
            console.log("user from project to delete " + todeleteproject.user)
             if(todeleteproject.user == undefined)
            return res.json({error:'can not be deleted'})

            if(user.id !== todeleteproject.user.toString()){
                return res.status(401).json({notauthorize:"not authorize to delete"})
            }else{
                    console.log('u can delete')
                    //delete document from server
                    const projectdocfiletodelete = todeleteproject.projectdoc
                    fs.unlink(projectdocfiletodelete, (err)=>{
                        if(err) throw err
                        console.log('deleted')
                    })
                    await todeleteproject.remove()
                    
                    res.json({message:"u just delete one project", todeleteproject:todeleteproject})
                 }
    }
                catch(err){
                res.status(404).json({
                projectnotfound:"project not found"})
                }
        }
        




  
 
//@controller: like a project
//@acess: private
//@route:/project/like/:id
// @method:post
 exports.likeProject= async (req,res)=>{
            try{
                     //find user post a project
                    const user = await Users.findOne({_id:req.user.id})
                    if(!user){
                        console.log('error')
                    }
                    console.log(user.id+ "-======= from user")
                    //get a project to like
                    const tolike = await project.findById(req.params.id)
                    
                    console.log("user from project to tolike " + tolike.id)
            }  
                 catch(err){res.json({errorInFind:'error occur while finding from db'})}
             
            try{
                    const tolike = await project.findById(req.params.id)
                     console.log(tolike.likes)
                        if(tolike.likes.filter(like=>like.user.toString()=== req.user.id).length>0){
                        return res.status(401).json({alreadyLiked:'you already like the project'})
                    }else{

                                //add the like to the db
                            await tolike.likes.unshift({user:req.user.id})
                            await tolike.save()
                            console.log(tolike +'that to like')
                            res.json({liked:'you like a project'})
                             }
                   
            }
            
                        catch(err){
                        res.status(404).json({
                        projectnotfound:"project not found"})
                        }
                }
                





    //@controller: unlike a project
//@acess: private
//@route:/project/unlike/:id
// @method:post
 exports.unLikeProject= async (req,res)=>{
    try{
             //find user post a project
            const user = await Users.findOne({_id:req.user.id})
            if(!user){
                console.log('error')
            }
            console.log(user.id+ "-======= from user")
            //get a project to like
            const tolike = await project.findById(req.params.id)
            
            console.log("user from project to tolike " + tolike.id)
    }  
         catch(err){res.json({message:'error occur while finding from db'})}
     
    try{
            const tolike = await project.findById(req.params.id)
             console.log(tolike.likes)
                if(tolike.likes.filter(like=>like.user.toString()=== req.user.id).length===0){
                return res.status(401).json({notyetliked:'you have not like so u cant unlike '})
            }else{

                        //rmove  like to the db
                    const removeIndex=await tolike.likes
                                        .map(item=>item.user.toString())
                                        .indexOf(req.user.id) 
                //splice out the index
                
                 await tolike.likes.splice(removeIndex,1)
                    await tolike.save()
                    console.log(tolike +'that to like')
                    res.json({unliked:'u unlike a project save'})
                     }
           
         }
    
                catch(err){
                res.status(404).json({
                projectnotfound:"project not found"})
                }
        }
        





//@controller: create a commet
//@acess: private
//@route: /comment/:id

exports.createComment = async(req,res)=>{
 try{
    const body = req.body
  if(!body.text){
        res.json({EmptyField:`empty field`})


    }else{

        const toComment= await project.findById(req.params.id)
             if(toComment){
            const newComment  = await {
            text:req.body.text,
            user:req.user.id,
            name:body.name,
            avatar:body.avatar,
        
                }

            await toComment.comments.unshift(newComment)
            await toComment.save()
            res.json({message:'comment successfull',comments: newComment})

        }else{
            res.json({Error:true})}

        }
}
 catch(err){
        res.json({Error:true})}
   
    

}




//@controller: delete a comment
//@acess: private
//@route: /comment/:id/:comment_id

exports.deleteComment = async(req,res)=>{
    try{
         //check if comment exist
           const projectComment = await project.findById(req.params.id)
                if(projectComment.comments.filter(comment=>comment._id.toString()===req.params.comment_id).length==0){
                   return res.status(404).json({commentnotfound:'comment not exist'})
               
                   }
   
            //remove index to delete
            const removeIndex = await projectComment.comments
                               .map(item=>item._id.toString())
                                .indexOf(req.params.comment_id)

                        //splice it out of the array

               await  projectComment.comments.splice(removeIndex,1)
                 //save to the db
                 await projectComment.save()
                 res.json({success:true,
           
                    message:'comment removed'})

           
   }
    catch(err){
           res.json({Error:true ,message:'catch Eroor'})}
      
       
   
   }
   