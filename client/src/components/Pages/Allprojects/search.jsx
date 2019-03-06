import React, { Component } from 'react';
import Axios from 'axios';

class Search extends Component{
       constructor(){
          super()
          this.state={
              searchText:'',
              searchedResult:[]
          }

 this.handleSearch= this.handleSearch.bind(this)
 this.handleSearchSubmit = this.handleSearchSubmit.bind(this)

       }


       handleSearchSubmit(e){
       e.preventDefault()
       console.log('work')
       const searchs = this.state.searchText
    
       fetch('/project/search', { 
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
        
            searchText: searchs
            
        })

    } )
    .then(res => res.json())
    .then(res =>{
        console.log(res.searched)
        console.log(res.message +`ok`)
        this.setState({searchedResult:res.searched})
    
    })
       
   .catch(err=>{console.log(`${err} error occured`)})


       }

       
                handleSearch(e){
                this.setState({searchText:e.target.value})
                console.log(this.state.searchText)


                }

       async componentWillUpdate(){
           let {searchedResult}= this.state
           return(
               <div>{searchedResult} <h1>great</h1> </div>
           )



        }

       render(){
           const {searchText} =this.state

   return(



    <div style={{color:'red'}} > 
    
    
    
    <div className="searchbox">
    
    
    <form  className="form-inline">
            <div  className="md-form my-0">
                <input  className="form-control " type="text" 
               onChange={this.handleSearch} value={searchText} placeholder="Search project topics" aria-label="Search"/>
                
      <button mdbbtn color="success" outline="true" size="sm" className="my-0 waves-light btn btn-outline-danger btn-sm" type="submit" mdbwaveseffect onClick={this.handleSearchSubmit}>Go</button> 


      


    
    </div>
    
    </form>
    </div>
    
    
    </div>
   )



   

       }



}


export default Search