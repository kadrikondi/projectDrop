import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Addproject from './components/Pages/Addproject/Addproject'
import Signup from './components/Pages/Signup/Signup'
import Signin from './components/Pages/Signin/Signin'
import LandingPage from './components/Pages/LandingPage/LandingPage'
import  Allprojects from './components/Pages/Allprojects/projects'
import ProjectD from './components/Pages/projectDetails/projectD'
import UserProfile from './components/Pages/user/userProfile'
import UploadDoc from'./components/Pages/Addproject/UploadDoc'
import Dashboard from './components/Pages/dashboard'
import UpdateProfile from './components/Pages/user/updateProfile'



class Router extends Component{


    render(){


        return(

            <div>
       <Switch>
       < Route path="/"  strict exact={true} component={LandingPage}/>
      <Route path="/signin" strict exact={true} component={Signin}/>
      <Route path="/signup" strict exact={true}  component={Signup}/>  
      <Route path="/addproject" strict exact={true} component={Addproject}/>  
      <Route path="/projects" strict exact={true} component={Allprojects}/>
      <Route path="/projectD/:id" strict exact={true} component={ProjectD}/>
      <Route path="/userprofile" strict exact={true} component={UserProfile}/>
      <Route path="/updateprofile/:id" strict exact={true} component={UpdateProfile}/>
      <Route path="/upload/:id"  strict exact={true} component={UploadDoc}
      />
      <Route path="/dashboard" strict exact={true} component={Dashboard}
      />


      
           </Switch>

            </div>
        )
    }
}

export default Router
