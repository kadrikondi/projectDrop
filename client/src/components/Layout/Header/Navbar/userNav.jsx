import React, { Component } from 'react';

import {Link} from 'react-router-dom'
export default class userNav extends Component {

    constructor(){
        super()
        this.state={
            logOut:''
        }

        this.handleLogout= this.handleLogout.bind(this)

    }
    
  async handleLogout(){
    await localStorage.removeItem('token')
  await  window.localStorage.clear()
  await this.setState({usertoken:null})
  }
  render() {



    return (
      <div>
        <div className="navbarSS">
        
        <header className="Navtext">

    {/* <!--Double navigation--> */}
    
        {/* <!-- Sidebar navigation --> */}
        {/* <!-- Navbar --> */}
        <nav className="navbar navbar-expand-sm navbar-dark">
        
             {/* <!-- Breadcrumb--> */}
            <a className="navbar-brand mr-1" href="/dashboard" style={{fontFamily:"cursive",fontSize:"2em"}}>
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
                <a  className="nav-link" href="/dashboard">Home
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

        <div className="my-0 mr-sm-2">
        
        <Link to='/'><button onClick={this.handleLogout} className="btn btn-outline-light btn-sm my-0 waves-light"> Logout</button> </Link>
        
        
        

        
        </div>
        
         </div> 
        </nav>
        {/* <!-- /.Navbar --> */}
        
        </header>


        
    </div>
      </div>
    )
  }
}
