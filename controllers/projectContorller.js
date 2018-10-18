// import project from '../models/project';
const project =require('../models/project')
const upload =require('../routes/index')
const multer = require('multer')



// create a project
exports.createProject = async(req,res)=>{

    const body = req.body
    if(!body.topic &&!body.department && !body.school &&!body.year && !body.projectDoc){
        res.json({must:`empty field`})


}else{


 const newproject   =await new project({
        topic:body.topic,
        department:body.department,
        school:body.school,
        year:body.year,
        projectDoc:req.file.path
    }).save()
    
    res.json({project: newproject})
}
    

}
exports.getProject = async (req,res)=>{
    const allproject = await project.find()
    if(!allproject) return res.json(`error users not found`)
    res.json({allproject:allproject})
   }
   




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




  exports.Deleteproject= async (req,res)=>{

    const todeleteproject = await project.findByIdAndRemove(req.params.id)
    res.json({message:"u just delete one project", todeleteproject:todeleteproject})
  }
  