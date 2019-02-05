import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class loginNav extends Component {

    constructor(){
        super()
        this.state={
            logOut:''
        }
        this.handleLogout= this.handleLogout.bind(this)
    }

    async handleLogout(){
        await  window.localStorage.clear()
        
        
    }
  render() {
    return (
      <div>
        
        
        <nav class="navbar navbar-dark pink">
  <a class="navbar-brand" href="/dashboard">ProjectBox&#x26d6;</a>
  <div className="my-0 mr-sm-2">
  <Link to='/'><button onClick={this.handleLogout} className="btn btn-outline-dark"> Logout</button> </Link>
  </div>
</nav>
      </div>
    )
  }
}
