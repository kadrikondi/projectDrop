import React, { Component } from 'react';
import {Link }from 'react-router-dom'
import axios from 'axios'
import Loginheader from '../usersHeader'
import {getOneUserA} from '../../apidata/api'
import { userProfile } from '../../apidata/api';

class UserProfile extends Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            school:'',
            phone:'',
            department:'',
            gender:'',
            bio:'',
            city:'',
            id:'',
            avater:null,
            info:''
        }

    }
  
               
                
               
   
   async componentDidMount(){
    
    const token = JSON.parse(localStorage.getItem('token'))
     if(token){        
    
            // const user =await getOneUserA(this.props.match.params.id)
            const user = await userProfile()
            console.log(user)
            if(user.message==="jwt expired"){
                alert('You have to log re-Login')
                this.props.history.push('/signin')
            }else{
                    //     this.setState({name:user.user.name.toUpperCase(), email: user.user.email, id:user.user._id,school:user.user.school.toUpperCase(),phone:user.user.phone,info:user.message})
                    // }  
                    const user = await userProfile()
                    console.log(user.user)
                    this.setState({name:user.name.toUpperCase(), email: user.email, id:user.id,school:user.school,phone:user.phone,department:user.department,bio:user.bio,gender:user.gender,city:user.city,avater:user.avater,info:user.message})
                    
                    }     
                    console.log("ok" + user)
                    console.log(this.state.avater+ "  avvata")

             }
             if(!token){
                this.props.history.push('/')
            }
}

    render(){
        //  name=name.toUpperCase()
        const {name,email,id,info,phone,school,department,city,bio,avater } =this.state

 let StrongSt={
     textAlign:'left',
    
 }

    return(

    <div>

      <Loginheader/>



        <div className="container">

               <div className="row">     
                    <div    className="col-md-4 col-lg-4"></div>
                        {/* <!-- Card profile--></div> */}
                    <div className="col-lg-5 col-md-6 col-sm-12">
                        <div className="card mt-3 "  >

                        {/* <!-- Card image --> */}
                           <div className="view overlay" style={{height:"200px"}}>
                                <img className="card-img-top circle " src={avater} />
                            <a href={`${avater}`}>
                            <div className="mask rgba-white-slight"></div>
                            </a>
                        </div>


                            {/* <!-- Card content --> */}
                        <div className="card-body text-left">

                                {/* <!-- Title --> */}
                                <h4 className="card-title text-center ">{name}</h4>
                                {/* <!-- Text --> */}
                                <p className='font-italic text-center'>{bio}</p>
                                <div className="card-text ">
                                <ul className="list-group">
                                <li className="list-group-item"><strong>Email:&nbsp;</strong>{email}</li>
                                <li className="list-group-item"><strong>Phone:&nbsp;</strong>{phone}</li>
                                <li className="list-group-item"> <strong>School:&nbsp;</strong>{school}</li>
                                <li className="list-group-item"> <strong>Department:&nbsp;</strong>{department}</li>
                                <li className="list-group-item"> <strong>city:&nbsp;</strong>{city}</li>
                                <li className="list-group m-2"> <strong></strong></li>
                            </ul>
                                </div>
                            <Link to={`updateprofile/${id}`}>  <button className="btn btn-outline text-dark">update profile</button></Link>
                             
                   </div>

                </div>
                    {/* <!-- Card --> */}

              
            </div>


                      

                            
                     
                </div>
            
        

            </div>





        </div>
      )
    }

}


export default UserProfile;