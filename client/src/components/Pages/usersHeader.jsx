
import React, { Component } from 'react';
import {getOneUserA} from '../apidata/api'

import { userProfile } from '../apidata/api';
import{Link} from 'react-router-dom'


let id ='ok'

  export default class userHeader extends Component {

    constructor(){
        super()
        this.state={
            logOut:'',
            usertoken:''

        }
        this.handleLogout= this.handleLogout.bind(this)
    }

    async handleLogout(){

      
  
      await localStorage.removeItem('token')
    await  window.localStorage.clear()
    await this.setState({usertoken:null})
    
      
    }    
        
    

  render(){
  return (
    <div  className= ''>
      <nav className="nav nav-pills nav-fill  pink">
      
  <Link  className="nav-item nav-link btn btn-outline" to={`/dashboard`}>Dashboard</Link>
  
  <Link className="nav-item nav-link btn btn-outline" to="/projects">Project feed</Link >
  <Link className="nav-item nav-link btn btn-outline" to="/userprofile">profile</Link >
    



  <Link to='/'  className="nav-item nav-link btn btn-outline "><button onClick={this.handleLogout} className="btn btn-outline-light btn-sm my-0 mr-0 waves-light"> Logout</button> 
        
  </Link>
</nav>

    </div>
  )
}
}
