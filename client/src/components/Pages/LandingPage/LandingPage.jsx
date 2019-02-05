import React, { Component } from 'react'
import Particlejs from './Particlejs'
import {Link} from 'react-router-dom'
class LandingPage extends Component {
  render() {
    const parti={
      width:"900px",
      height:'500px'
    }
    return (
      <div>
         <div>
        <Particlejs/>
       
        </div>
          
          {/* content */}


         





  <div className="container" style={{marginTop:'50px'}} >
      <div className="row">
    
          <div className="col-lg-6 col-sm-12 col-md-6"> 
            <div className="">
            {/* Content  style={{backgroundColor:'#F5F5F5'}}*/}
              <div className="text-black text-center d-flex align-items-center rgba-gray-strong p-5 px-4">
                  <div>
                    <h2 className=" p-2"><strong>Share Your Creation with The rest of the World</strong></h2>
                    <p className="p-2">ProjectBox  hosted over thousand of Student project accross Nigeria University join the community and make your creation come to life. Register to access project documentations @PeojectBox we love sharing Knownledge </p>
                    <Link className="btn btn-outline-primary" to='/signup'><i className="fa fa-user-plus left" /> Join & create</Link>
                  </div>
                </div>
            </div>
          </div>
        {/* <div className="col-lg-2 col-md-1"></div> */}
        <div className="col-lg-6 col-sm-12 col-md-6"><div className="">
              {/* Content */}
              <div className="text-black text-center d-flex align-items-center rgba-gray-strong p-5 px-4">
                <div>
                  <h2 className=" p-2"><strong>For The Students By The Students</strong></h2>
                  <p className="p-2">ProjectBox is an Open Source community resource dedicated to helping students projects documetation be as successful as possible.We are community of students that is ready to help other student get easy access to project Docs.</p>
                  <Link to='/projects' className="btn btn-outline-primary"><i className="fa fa-clone left" /> View project</Link>
                </div>
              </div>
            </div>
        </div>
   </div>

    </div>

      <div className='container mt-5'>
                  <div className='row'>   
                      <div className="col-lg-8">
                      
                      <h1 className="text-left">Students on ProjectBoxx</h1>
                      </div>
              
                          <div className="col-lg-4">
                            <h1>available projects</h1>
                          </div>

                  </div>
      </div>





  </div>
    )
  }
}



export default LandingPage;