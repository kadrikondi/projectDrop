import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import './projects.css'
import UserHeader from '../usersHeader'
import bookList from '../../assets/img/library.svg'
import pix from '../../assets/img/project.jpeg'
import axios from 'axios';
import Search from './search'




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
        token:'',
        searchText:''
        
      }
      this.handleSearch= this.handleSearch.bind(this)
    }

     handleSearch(e){
       this.setState({searchText:e.target.value})
       console.log(this.state.searchText)
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

 const allproject =this.state.allproject.filter((project)=>{
   let search= this.state.searchText
   return project.topic.toLowerCase().search(this.state.searchText.toLowerCase()) !== -1;
  //  indexOf(this.state.searchText.toLowerCase())!==-1;
   
 })
 const {token}= this.state
return(
          
    <div>
    
    {this.state.token ? <UserHeader/>:<div></div>}
       <div className='row '>
       
            
          
          
        
      <div className="col-lg-9 mt-5 container-fluid">
        {/* carddeck */}
       
       
        <div className="card-deck row"  >
        

{ allproject ?
  allproject.map((pro ,index)=>{
  const{_id,topic,department,school,year,summary,date,projectdoc,comments,user}=pro
  return (
    // className="col-lg-3 col-sm-6 col-xm-12  col-md-4"
  <div  className="card "  className="col-lg-3 col-sm-6 col-xm-12  col-md-4"  key={_id}>
   <div className="card card-cascade" style={{marginBottom:'20px'}} >

  {/* <!-- Card title --> */}
  <div className="card-header default">

  <div className="card-img-top">
   <img src={bookList} alt="" style={{width:'100px'}}/>
     </div>
    {/* <!-- Title --> */}
    <h6 className="card-header-title text-left  p-0" style={{color:'#000000' ,margin:'0px;',padding:'0px;' ,textTransform:'uppercase'}}> {topic}</h6>
    {/* <!-- Text --> */}
    <p className=" mb-0 text-right" style={{fontStyle:'italic'}}>{department}</p>
  
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

 <div className="col-lg-3">
       {/* {<Search /> } */}
      


       <form   className="form-inline">
            <div className="md-form my-0">
          <input className="form-control " type="text"
            onChange={this.handleSearch} value={this.state.searchText} placeholder="Search project topics" aria-label="Search"  />
      </div>
      </form>
       
       </div>
    
 {/* row */}
 </div>
 {/* main */}
    </div>

      
    
)

    }   
}

export default Projects