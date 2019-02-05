import React from 'react';
import {Link} from 'react-router-dom'

import Particles from 'react-particles-js';

import './Particlejs.css'


const particleOption={
    particles: {
    number:{
      value:80,
      color:"#000000",
  
      density:{
        enable:true,
        value_area:800
      },

    }
   
    
  }
  
  
      
  }  


const Particlejs=()=>{

 
return(

    <div>
       <section >
        <Particles  className="particle"
              params={{particleOption}}/>
     
       <div className="pSection">
      <h1 >Open-Source Projects Documents Sharing Platform</h1>
        
      <br/>
      <div style={{margin:'10px'}}>
     <Link to="/signin"> <button className="btn btn-danger">Signin</button></Link>

          <Link to="/signup"> <button className="btn btn-pink">Signup</button></Link>
          </div>

            <br/>
            <h3>Create, collaborate & Share Your Projects </h3> 
          </div>
          </section>

    </div>
)

}


export default Particlejs
