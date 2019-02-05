import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import './projects.css'
import UserHeader from '../usersHeader'
import pix from '../../assets/img/project.jpeg'
import axios from 'axios';




class Projects extends Component{

    constructor(){
      super()
      this.state={
        topic:'',
        department:'',
        school:'',
        year:'',
        summary:'',
        allproject:[],
        token:''
        
      }
    }
       componentDidMount(){
        const token= localStorage.getItem('token')
        this.setState({token})
  
        fetch('/project/get',{
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            
        }
        })
       
       .then(res=>res.json())
     
       .then(result=>{
       
         console.log(result.allproject[0])
         this.setState({
           allproject:result.allproject
         })
         console.log(this.state.allproject)
        })
        .catch(err=>{
          console.log(err)
          if(err){
            document.getElementById('head').innerText="No project Available"
        }
        })
       }

    render(){

 const{allproject}=this.state
 const {token}= this.state
return(
          
    <div className="allprojects">
    {this.state.token ? <UserHeader/>:<div></div>}
        <h1 id="head">All project</h1>
      
          
          
        
        {/* carddeck */}
       
       
       
        <div className="card-deck"  >
        

{ allproject ?
  allproject.map((pro ,index)=>{
  const{_id,topic,department,school,year,summary,date,projectdoc,comments,user}=pro
  return (<div className="col-lg-4 col-sm-12 col-xm-12  col-md-6" key={_id}>
   <div className="card card-cascade" style={{marginBottom:'20px'}} >

  {/* <!-- Card title --> */}
  <div className="card-header default">
  
    {/* <!-- Title --> */}
    <h4 className="card-header-title text-left  p-0" style={{color:'#000000' ,margin:'0px;',padding:'0px;'}}> {topic}</h4>
    {/* <!-- Text --> */}
    <p className="mb-0 text-right">{department}</p>
  
  </div>
  
  {/* <!-- Card content --> */}
  <div className="card-body card-body-cascade text-center">
  
    {/* <!-- Text --> */}
    <p className="card-text">{summary}</p>
   
  
  </div>
  {/* <!-- Card content --> */}
  
     <Link to={`/projectD/${_id}`}>
     <button className="btn btn-pink btn-sm">Detail</button>
     </Link>
  {/* <!-- Card footer --> */}
  <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
    <ul className="list-unstyled list-inline font-small">
      <li className="list-inline-item pr-2 white-text"><i className="mdi mdi-cloud-download pr-1"></i><span>2</span></li>
      <li className="list-inline-item pr-2"><a href="#"className="pink-text"><i className="fa fa-heart-o pr-1"></i>3</a></li>
      <li className="list-inline-item pr-2"><a href="#" className="white-text"><i className="mdi mdi-eye-outline pr-1"> </i>21</a></li>
      <li className="list-inline-item"><a href="#" className="white-text"><i className="fa fa-user-o pr-1"> </i>{comments.text}</a></li>
    </ul>
  </div>
  
  </div>
  {/* <!-- Card --> */}
  </div>)
  }) :<h1>no project available</h1>

}



  
</div>
{/* carddeck end */}
 

    </div>

      
    
)

    }   
}

export default Projects