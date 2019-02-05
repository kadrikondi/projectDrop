
import React, { Component } from 'react';
import {getOneUserA} from '../../../apidata/api'
import {getSingleProjectA} from '../../../apidata/api'
import './Navbar.css'

import {Link} from 'react-router-dom'
import LoginNav from './loginNav'
import UserNav from './userNav'
class Navbar extends Component {
  constructor(){
      super()
      this.state={
          msg:'',  
        logOut:'',
        
         
      }
      this.handleLogout= this.handleLogout.bind(this)
  }
  async handleLogout(){
      await localStorage.removeItem('token')
    await  window.localStorage.clear()
    await this.setState({usertoken:null})
    
    
    
}
  
  async componentDidMount(){
      
  
    //   const user =await getOneUserA(this.props.match.params.id)
    //   if(user.message==='Request failed with status code 401'){
    //       this.setState({msg:user.message})
    //     alert('You have to log re-Login')
    //     this.props.history.push('/signin')
    // }
      
  }

    render(){

     const token =  window.localStorage.getItem('token')
     if(token){
     return (<UserNav/>)}
   
return(
  
    <div className="navbarSS">
        
        <header className="Navtext">

    {/* <!--Double navigation--> */}
    
        {/* <!-- Sidebar navigation --> */}
        {/* <!-- Navbar --> */}
        <nav className="navbar navbar-expand-sm navbar-dark">
        
             {/* <!-- Breadcrumb--> */}
            <a className="navbar-brand mr-1" href="/" style={{fontFamily:"cursive",fontSize:"2em"}}>
                 ProjectBox&#x26d6;
            </a>

            {/* <!-- Collapse button --> */}
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span  className="navbar-toggler-icon"></span>
    </button>

    {/* <!-- Collapsible content --> */}
    <div  className="collapse navbar-collapse" id="basicExampleNav">

    
    {/* <!-- Links --> */}
        <ul  className="navbar-nav ml-5  mr-auto">
            <li  className="nav-item">
                <a  className="nav-link" href="/">Home
                    {/* <span  className="sr-only">(current)</span> */}
                </a>
            </li>
            <li  className="nav-item">
                <Link  className="nav-link" to="/projects">Projects</Link>
            </li>
            <li  className="nav-item">
                <a  className="nav-link" href="#">Students</a>
            </li>

            {/* <!-- Dropdown --> */}
            <li  className="nav-item dropdown">
                <a  className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Our site</a>
                <div  className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                    <a  className="dropdown-item" href="#">Term&amp;conditions</a>
                    <a  className="dropdown-item" href="#">Developers</a>
                    <a  className="dropdown-item" href="#">Policy</a>
                </div>
            </li>

        </ul>
        {/* <!-- Links --> */}

        {/* <form  className="form-inline mr-sm-5">
            <div  className="md-form my-0">
                <input  className="form-control " type="text" placeholder="Search" aria-label="Search"/>
                
      <button mdbbtn color="success" outline="true" size="sm" className="my-0 waves-light btn btn-outline-light btn-sm" type="submit" mdbwaveseffect>Search</button> */}

      
      {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
            {/* </div>
        </form>    
             */}
        <div className="my-0 mr-sm-2">
        {/* {this.state.usertoken!==null 
        (<Link to='/'><button onClick={this.handleLogout} className="btn btn-outline-light btn-sm my-0 waves-light"> Logout</button> </Link>) */}
        <div><a  className="mdi mdi-facebook mr-sm-2"></a>
        
        <a className="mdi mdi-twitter mr-sm-2"></a>
        
        <a className="mdi mdi-instagram"></a></div>
        {/* } */}
        

        
        </div>
        
         </div> 
        </nav>
        {/* <!-- /.Navbar --> */}
        
        </header>


        
    </div>
)}




}

export default Navbar