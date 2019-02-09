import React, { Component } from 'react'
import UserHeader from '../usersHeader'
import {getOneUserA} from '../../apidata/api'
import '../../assets/smalloader.css'
import axios from 'axios'
import avata from '../../assets/img/undraw_profile.svg'
import {userProfile} from '../../apidata/api'
export default class updateProfile extends Component {
   constructor(){
       super()
       this.state={
      name:'',
      email:'',
      school:'',
      department:'',
      phone:'',
      city:'',
      bio:'',
      id:'',
      avaterchange:null,
      avater:avata,
      updateinfo:'',
      uploadinfo:'',
      isLoading:false,
      isLoadingUpload:true
       }

   
    //bind the fuction to constructor
    this.updateProfileButton=this.updateProfileButton.bind(this)
    this.handleUpdateEmail= this.handleUpdateEmail.bind(this)
    this.handleUpdateName =this.handleUpdateName.bind(this)
    this.handleUpdateDepartment =this.handleUpdateDepartment.bind(this)
    this.handleUpdatePhone =this.handleUpdatePhone.bind(this)
    this.handleUpdateSchool= this.handleUpdateSchool.bind(this)
    this.handleUpdateBio= this.handleUpdateBio.bind(this)
    this.handleUpdateCity = this.handleUpdateCity.bind(this)
    this.handleUploadPic =this.handleUploadPic.bind(this)
    this.handleUserPic = this.handleUserPic.bind(this)

   }

//update profile fuction  
   async updateProfileButton(e){

    e.preventDefault()
  this.setState({isLoading:true})
  

//   const id = JSON.parse(localStorage.getItem('updateuserId'))
  const {id}= this.state
  console.log(id)
  const token = await JSON.parse(localStorage.getItem('token'))
 console.log(token)


  await fetch(`/user/update/${id}`, {
      method:'PUT',
      headers:{ 
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization': token
      },
  body:JSON.stringify({
      name:this.state.name,
      email:this.state.email,
      school:this.state.school,
      department:this.state.department,
      phone:this.state.phone,
      bio:this.state.bio,
      city:this.state.city

      })
    })


    .then(res=>res.json())
    .then(res=>{console.log(res)
          this.setState({isLoading:false})
        if(res.success===true){
            this.setState({updateinfo:res.message})
            // this.props.history.push('/userprofile')
           }else{         this.setState({updateinfo:res.message})
  }    
    })
    .catch(err=>{
        this.setState({isLoading:false})
        console.log(err)})

 

}
//upload avater
// upload user pics
handleUploadPic(e){
    e.preventDefault()
    this.setState({isLoadingUpload:true})
    console.log(this.state.isLoadingUpload   + '    okoooo')
     if( this.state.avaterchange==undefined||this.state.avaterchange==null ){
         this.setState({uploadinfo:'no image selected'})
         this.setState({isLoadingUpload:true})
         console.log('no file selected')
     } else{
     console.log("click")
     this.setState({isLoadingUpload:false})
     const userpic = new FormData()
     userpic.append('avater',this.state.avaterchange, this.state.avaterchange.name)
     const {id} = this.state//JSON.parse(localStorage.getItem('userId'))
       
     console.log('ok'+ userpic)
     axios.put(`/user/updatepic/${id}`, userpic, {
     
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }

     })
     
     
     // .then(res=>res.json())
        .then(res=>{console.log(res)
            console.log(this.state.isLoadingUpload)
     console.log("notfile"+ res.data.message)

     if(res.data.success===true){
        this.setState({isLoadingUpload:true})
         this.setState({
             uploadinfo:res.data.message,
             avater:res.data.userImgUrl
         })
     }
         
         console.log("msg " +  res.data.message)
         
     })
 
        .catch(err=>{console.log(err)
              this.setState({uploadinfo:`${err.message} Only JPEG, PNG Or JPG allow`})})
              this.setState({isLoadingUpload:false})
 }
}



//UPDATE STATE ONCHANGE fuction
            handleUpdateName(e){
                this.setState({name:e.target.value})
            }
            handleUpdateEmail(e){
                this.setState({email:e.target.value})
            }
            handleUpdatePhone(e){
                this.setState({phone:e.target.value})
            }
            handleUpdateSchool(e){
            this.setState({school:e.target.value})
            }
            handleUpdateDepartment(e){
                this.setState({department:e.target.value})
                console.log(this.state.department)
            }
            handleUpdateBio(e){
                this.setState({bio:e.target.value})
                }
            handleUpdateCity(e){
                    this.setState({city:e.target.value})
                    }  
        
                    handleUserPic(e){
                        console.log(e.target.files[0])
                        this.setState({
                            avaterchange:e.target.files[0]
                        })
                    }
      
   async componentDidMount(){

            const token = JSON.parse(localStorage.getItem('token'))
            if(token){        
            
                const user =await getOneUserA(this.props.match.params.id)

                if(user.message==='Request failed with status code 401'){
            alert('You have to log re-Login')
                    this.props.history.push('/signin')
                }else{
                       await this.setState({name:user.user.name.toUpperCase(), email: user.user.email, id:user.user._id,school:user.user.school,phone:user.user.phone,department:user.user.department,city:user.user.city, bio:user.user.bio,avater:user.user.avater,info:user.message})

                       (this.state.avater===undefined ? this.setState({avater:avata}): null)
                        console.log(this.state.name +'set')
                }  
                }     
            
            
        if(!token){
        this.props.history.push('/')
                  }
}

  render() {
    const {name,email,id,updateinfo,phone,school,department,city,bio,avater ,uploadinfo} =this.state
  const displayChangePix= ()=>{
      console.log(avater)
      document.getElementById("changepicwrapper").style.display="block"
      document.getElementById("btnChangePics").style.display ="none"
  }
    return (
      <div>
          <UserHeader/>
        <div className="container pt-5">
              <h4 className="alert alert grey">Profile Setting</h4>
           {/* edit form */}
            

                <div className="form-row" >


             {/* pics start upload profile pic */}
            
        <div class="md-form col-md-4 mt-0">
            <div className="p-2">
                <div className="mb-4">
                <img src= {avater} className="circle mb-2" style={{width:"300px", height:"250px",borderRadius:"50%"}} />
                
                {/* change profile pic buton */}
                
                  <button  id="btnChangePics" className="btn btn-sm btn-primary" onClick={displayChangePix}>change profile pic</button>

                  {/* select pix */}
                 <section className="changepicwrapper" id ="changepicwrapper" style={{display:'none'}}>
                 
                        <input  style={{display:'block'}}
                            type="file" 
                            className="form-control mt-5" 
                            name="userpics"
                            onChange={this.handleUserPic} 
                            title= 'select picture to upload'
                            ref={inputFile=>this.inputFile=inputFile}
                            
                            /> 
                            {/* make buton like input file */}
                            {/* <button  className="btn btn-light"  
                            onClick={()=>this.inputFile.click()}>select avater</button>
                        */}
                            {/*display info  */}
                    {this.state.uploadinfo
                    !=='' ?    <div id='infoo' className="alert alert-success">{uploadinfo} </div>:null}
            

                                
                        {/* show loading */}
                        <div style={{margin:'auto', width:'50%'}}>
                                {this.state.isLoadingUpload!==true ? <div className="text-center ring-loader">uploading</div>:<button id="btnuploado" className="btnuploado btn btn-primary btn-sm" onClick={this.handleUploadPic}>uploadnow</button>
                            }
                            </div>
                    </section>


           
                </div>
            
            </div>
            </div>

    {/* pics end */}

                
                <form className="col-md-4">
            

                <div className="form-group ">
                
                    <input type="text" className="form-control" id="Name" placeholder="Name" value={name} onChange={this.handleUpdateName} />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={email} onChange={this.handleUpdateEmail}/>
                </div>
                
                
                
                <div className="form-group">
                
                <input type="tel" className="form-control" id="inputPhone" placeholder="Tel Phone Number" value={phone}  onChange={this.handleUpdatePhone}/>
                </div>
                <div className="form-group">

                <input type="text" className="form-control" id="inputSchool" placeholder="School" value={school} onChange={this.handleUpdateSchool}/>
                </div>
            
                
                <div className="form-group">
                    <input type="text" className="form-control" id="department" placeHolder="department" value={department} onChange={this.handleUpdateDepartment}/>
                </div>
                <div className="form-group">
                    
                        <input type="text" className="form-control" id="city" placeholder="city" value={city} onChange={this.handleUpdateCity} />
                </div>
                <div className="form-group">
                        
                        <textarea className="form-control" placeholder="Bio" value={bio} onChange={this.handleUpdateBio}></textarea>
                </div>
                
                

            
            
                {/*display info  */}
            {this.state.updateinfo
            !=='' ?    <div className="alert alert-success">{updateinfo} </div>:null}
           
           {/* show loading */}
            <div  style={{margin:'auto' ,width:'50%'}}>
                        { this.state.isLoading===true  ?
                        (document.getElementById('btnupdate').style.display='none') &&
                        <div className='text-center' id="loader" ></div>:
                        <button type="button" id="btnupdate" className="btn btn-primary" onClick={this.updateProfileButton}>Save Update</button>

                    }
                    </div>
                    
           

            
        </form>



</div>
        





{/* edit from end */}

</div>

 {/* {change password} */}
                             {/* modal for change pass */}
                             <div>
        <div className="modal fade" id="modalChangePass" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Change password</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                
                  
                  
                    <div className="md-form">
                        <input placeholder="enter old password" type="text" id="form5" className="form-control" />
                    
                    </div>


                    
                    <div className="md-form">
                        <input placeholder="enter new password" type="text" id="form6" className="form-control" />
                
                    </div>
                                
                  
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-outline-pink">Save</button>
                <button className="btn btn-danger" data-dismiss="modal">
                    Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href className="btn btn-outline" data-toggle="modal" data-target="#modalChangePass"> Edit Password</a>
        </div>
      </div>

      </div>
    )
  }
}
