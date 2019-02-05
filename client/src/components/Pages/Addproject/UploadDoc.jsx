import React, { Component } from 'react'
import axios from 'axios'
import LoginHeader from '../usersHeader'
class Upload extends Component {

    constructor(){
      super()
      this.state={
          projectdoc:'',
          notif:'',
          fileUrl:'',
          loaded:''

              }


      this.handleUploadDoc = this.handleUploadDoc.bind(this)
      this.handleProjectDoc = this.handleProjectDoc.bind(this) 
      
  
    }




      handleProjectDoc(e){
          console.log(e.target.files[0])
          this.setState({
              projectdoc:e.target.files[0]
          })
      }
    // handleSelectFile=(e)=>{
    //     this.setState({
    //         projectdoc:e.target.files[0]
            
    //     })
    //     console.log(e.target.files[0])
    // }
    handleUploadDoc(e){
    
        e.preventDefault()
        
        if(this.state.projectdoc==undefined || this.state.projectdoc==''){
            this.setState({notif:'No file selected'})
        }
        console.log("click")
        const data = new FormData()
        data.append('projectdoc',this.state.projectdoc, this.state.projectdoc.name)
        const id = JSON.parse(localStorage.getItem('projectId'))
          
        console.log('ok'+ data)
        axios.put(`/project/upload/${id}`, data, {
        
           headers:{
               'Accept': 'application/json',
               'Content-Type':'application/json'
           },
           onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
            })
          },

        })
        
        // .then(res=>res.json())
           .then(res=>{console.log(res)
        console.log("notfile"+ res.message)
            
            console.log("msg " +  res.data.message)
            this.setState({fileUrl:res.data.project.projectdoc})
            this.setState({notif:res.data.message})
            console.log("url"+this.state.fileUrl)
             if(res.data.success=== true){
                 this.props.history.push('/projects')
             }
        })
           .catch(err=>console.log(err))
    }
    async componentDidMount(){
        const token= await JSON.parse(localStorage.getItem('token'))
        console.log(token)
        if(!token){
            this.props.history.push('/')
        }
   
    }
  render() {
    return (
      <div>
          <LoginHeader/>
       <div className="card col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-4" id="addproject">

{/* <!--Header--> */}
        <div  className="card-header  dark-text text-center ">
            <h3><i className="mdi mdi-cloud-upload"></i>Upload Project Document</h3>
        </div>




        

    <div className="card-body px-lg-5 pt-0  ">


        





        
        <div className="form-group ">
        {/* <i className="fa fa-user prefix"></i> */}
                 
           
            <p className=" text-center text-muted p-4"> Upload only (.pdf .zip .docx .rar &amp; .msword files)</p> 

            
            {/* <input 
            type="file" 
            className="form-control" 
            name="projectdoc"
            onChange={this.handleProjectDoc} 

            /> */}
             {/* <button  className="btn btn-grey"  
             onClick={()=>this.inputFile.click()}>Choose Project Document dis is on the input =>ref={inputFile=>this.inputFile=inputFile}</button> */}
            {/* <p className="help-block text-left"> upload a zip doc or pdf file</p> */}
        
        <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
        </div>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputGroupFile01" 
         name="projectdoc"
         onChange={this.handleProjectDoc} 
          aria-describedby="inputGroupFileAddon01" />
          <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
        </div>
      </div>

    </div>


        
        <div className="text-center">
            <button id="drop" className="btn btn-pink fa mt-5 fa-cloud-upload" onClick={this.handleUploadDoc}> &nbsp; Upload</button>

            <div className="alert alert-danger">{this.state.notif}</div> 

        
        </div>

    </div>
    </div>
      </div>
    )
  }
}
 export default Upload