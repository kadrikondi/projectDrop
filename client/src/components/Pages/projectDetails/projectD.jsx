import React, { Component } from 'react';
import './projectD.css'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import {getSingleProjectA} from '../../apidata/api'

class ProjectD extends Component{
    constructor(){
        super()
        this.state={
            project:null,
        topic:'',
        department:'',
        school:'',
        year:'',
        summary:'',
        date:'',
        id:'',
        projectdoc:'',
        date:'',
        }
        this.getSingleProject=this.getSingleProject.bind(this)
    }

   getSingleProject(id){
//    with axios u dont need headers and res.json bt its needed for fetch
    Axios.get(`/project/get/${id}`,{
        // headers:{
        //     'Accept':'application/json',
        //     'Content-Type':'application/json',
            
        // }
    })
    // .then(res=>res.json())
    .then(res=>{console.log("sing  " + res.data.singleProject.topic)
this.setState({
    topic:res.data.singleProject.topic.toUpperCase(),
    school:res.data.singleProject.school.toUpperCase(),
    department:res.data.singleProject.department.toUpperCase(),
    year:res.data.singleProject.year,
    id:res.data.singleProject._id,
    projectdoc:res.data.singleProject.projectdoc,
    summary:res.data.singleProject.summary,
    date:res.data.singleProject.date
                })})
            
                .catch(err=>console.log(err))
                
   }

   //geting data from api 
async componentDidMount(){
    
    
    const token = await JSON.parse(localStorage.getItem('token'))
    if(token){
        //call a function in api file
        const project = await getSingleProjectA(this.props.match.params.id)
        console.log(project)
        // if(project.message==='Request failed with status code 401'){
        //     alert('You have to log re-Login')
        //     this.props.history.push('/signin')
        // if(!project){

        // alert("errroo")
        // }else{

        this.setState({
                topic:project.singleProject.topic.toUpperCase(),
                school:project.singleProject.school.toUpperCase(),
                department:project.singleProject.department.toUpperCase(),
                year:project.singleProject.year,
                id:project.singleProject._id,
                projectdoc:project.singleProject.projectdoc,
                summary:project.singleProject.summary,
                date:project.singleProject.date
                    
        })
    }
    // const project= await this.getSingleProject(this.props.match.params.id)
    // this.setState({project})
    // console.log(this.state.project + 'ok')
// }
else{
      //alert('You need to login to view project Details')
        this.props.history.push('/signin')
}
}

    render(){

        console.log(this.state.topic + 'ok')

  const{topic,school,year,department,id,projectdoc,date,summary}=this.state
        return(
            <div>

                <h1>Project Details</h1>

                 
                <div className="card text-center col-lg-6" style={{margin:"auto"}}>
                        <div className="card-header jumbotron p-4"style={{marginBottom:"0px", backgroundColor:"#f2f2f2"}}><h4><strong>{topic}</strong></h4>
                        <p>
                            {summary}
                        </p>
                        </div>


                            <div className='card-body'>
                        <table className="table table-bordered table-striped">
                {/* <thead>
                    <tr>
                    <th scope="col">Project Name</th>
                    <th scope="col">First</th>
                    
                    </tr>
                    

                </thead> */}
                <tbody>
                    <tr>
                    <th scope="row" className="font-weight-bold">Project Name</th>
                    <td > <strong className="font-weight-bold">{topic}</strong></td>

                    </tr>
                    <tr>
                    <th scope="row">Project ID</th>
                    <td><strong>{id}</strong></td>
                    
                    </tr>
                    <tr>
                    <th scope="row" className="font-weight-bold">Project Department</th>
                    <td><strong className="font-weight-bold">{department}</strong></td>
                    
                    </tr>
                    <tr>
                    <th scope="row" className="font-weight-bold">Institution</th>
                    <td><strong>{school}</strong></td>
                    
                    </tr>
                    <tr>
                    <th scope="row" className="font-weight-bold">Project Year</th>
                    <td><strong>{year}</strong></td>
                    
                    </tr>


                    <tr>
                    <th scope="row" className="font-weight-bold">Upload By</th>
                    <td>Larry the Bird</td>
                    
                    </tr>
                    <tr>
                    <th scope="row" className="font-weight-bold">Upload Date</th>
                    <td><strong>{date}</strong></td>

                    </tr>

                    <tr>
                    <th scope="row"className="font-weight-bold">No Of Download</th>
                    <td><strong>2</strong></td>
                    
                    </tr>

                   <tr>
                    <th scope="row" className="font-weight-bold">Total View</th>
                    <td className="font-weight-bold">Larry the Bird</td>
                    
                    </tr>
                    <tr>
                    <th scope="row" className="font-weight-bold">Download Link</th>
                    <td><a href={`${projectdoc}`}target="_blank"><button className="btn btn-primary btn-sm">Download</button></a></td>
                    
                    </tr>



                    
                 </tbody>
                </table>
                <div className="jumbotron" style={{padding:"20px",marginBottom:"0px"}}>summary <br/>{summary}</div>
                     </div>
                <div className='card-footer'>
                    Like and Share
                </div>
                </div>




 

            </div>
        )
    }
}
export default ProjectD