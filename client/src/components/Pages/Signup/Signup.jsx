
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Signup.css'

class Signup extends Component{
 constructor(){
	 super()
	 this.state={
	        name:'',
			email:'',
            password:'',
            gender:'',
            password1:'',
            info:'',
            isLoading:false
		}
     this.handleEmail = this.handleEmail.bind(this)
     this.handleName = this.handleName.bind(this)
     this.handlePassword =this.handlePassword.bind(this)
     this.handleGender= this.handleGender.bind(this)
     this.handlePassword1= this.handlePassword1.bind(this)
         }
         
         handleSubmit=()=>{
             
            //  let= {password,password1}= this.state
             if(this.state.password!== this.state.password1){
                 this.setState({info:`password not match`})
             }


             if(this.state.info===`password not match`){
                this.setState({isLoading: false})
             }else{
                this.setState({isLoading:true})

             }
             
           fetch("/register", { 
               method:'POST',
               headers:{
                   'Accept':'application/json',
                   'Content-Type':'application/json'
               },
               body:JSON.stringify({
                   name:this.state.name,
                   email:this.state.email,
                   password:this.state.password
               })

           } )
           .then(res => res.json())
           .then((res) => {console.log(res.message)
            this.setState({isLoading:false})
               
               if(res.message==='successfully register'){
                
                this.props.history.push('/signin')
               }else{
               this.setState({info:res.message})}
        })
           .catch(err =>{ console.log(err)
            this.setState({isLoading:false})
        })

           //console.log(this.state)

         }
         handleName(e){
             this.setState({name:e.target.value})
         }
         handleEmail(e){
             this.setState({email:e.target.value})
         }
         handlePassword(e){
             this.setState({password:e.target.value})
         }
         handlePassword1(e){
            this.setState({password1:e.target.value})
        }
     
        handleGender(e){
            this.setState({gender:e.target.value})
        }
	 
  render(){


//     if(this.state.info===''){
//         document.getElementById('info').style.display='none'
//   }
const noshowinfo={
    display:'none'
}


    return(
        
        <div>



{/* <!--Form with header--> */}
<div className="card mt-5" id="signup">
    <div className="card-body">

        {/* <!--Header--> */}
        <div  className="card-header black-text text-center py-4">
            <h3><i className="fa fa-user-plus"></i> Register</h3>
            
        </div>

        {/* <!--Body--> */}
        <div className="md-form mt-4">
            {/* <i className="fa fa-user prefix"></i> */}
            <input type="text" id="form3" required="required" className="form-control" value={this.state.name} onChange={this.handleName}/>
            <label for="form3">
            <span className="fa fa-user"></span> Name</label>
        </div>
        <div className="md-form">
            {/* <i className="fa fa-envelope prefix"></i> */}
            <input type="text" id="form2" className="form-control" value={this.state.email} onChange={this.handleEmail} />
            <label for="form2">
            <span className="fa fa-envelope"></span> Email</label>
        </div>


       <div class="md-form">

                    <select  className="form-control" value={this.state.gender} onChange={this.handleGender}>
                        <option>--Select Gender--</option>
                        <option>male</option>
                        <option>female</option>
                    </select>
                  </div>

   

        <div className="md-form">
            {/* <i class="fa fa-lock prefix"></i> */}
            <input type="password" id="form4" className="form-control" value={this.state.password} onChange={this.handlePassword}/>
            <label for="form4">
            <span className="fa fa-lock"></span> Password</label>
        </div>



        
        <div className="md-form">
            {/* <i class="fa fa-lock prefix"></i> */}
            <input type="password" id="form10" className="form-control" 
            name="password1" value={this.state.password1} onChange={this.handlePassword1}/>
            <label for="form10">
            <span className="fa fa-lock"></span> Confirm Password</label>
        </div>

        <div className="md-form">
        <p className='p-1'>  <input type="checkbox"  className="" required="required"/> I agree to <Link to='/terms'>terms</Link> and <Link to='/c'>conditions</Link> of Projectbox </p>
        </div>

      { this.state.info===''||this.state.info===undefined ?
    
   (<div className="alert alert-danger" style={noshowinfo} id="info">){this.state.info}</div>) :
   (<div className="alert alert-danger"id="info">{this.state.info}</div>)} 


                    
                    
                    
                    
                    
                    
 
        <div className="text-center">
  
            <button className="btn btn-pink mdi mdi-account-plus" onClick={this.handleSubmit}> &nbsp;Sign up  
                    <div style={{margin:'auto' ,width:'50%'}}>
                        { this.state.isLoading===true ?
                        <div className="loader" ></div>:
                        null
                    }
                    </div> 
           </button>
        
        </div>
        <p className="pt-3 text-right"> Aready a member
      <Link to="/signin"> Login</Link>
    </p>


    </div>
</div>


















</div>


        
	)
}
}


export default Signup