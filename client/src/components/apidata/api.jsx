import axios from 'axios'

//allcenters
export async function getAllCenters() {
    try {
       const centers = await axios.get('http://localhost:8000/centers/get')
       return centers.data
        
    } catch (error) {
        return error.message
    }
    
}

//single project
export async function getSingleProjectA(id) {
    try {
        const token = await JSON.parse(localStorage.getItem('token'))
        const project = await axios.get(`http://localhost:8000/project/get/${id}`,{ headers: {"Authorization" : token }})
        return project.data
        // console.log(project.data)
    } 
    catch (error) {
        return error
    }
}

//single user
export async function getOneUserA(id) {
    try {
    const token = await JSON.parse(localStorage.getItem('token'))
    const getUser = await axios.get(`http://localhost:8000/user/get/${id}`,  { headers: {"Authorization" : token }})
        return getUser.data 
    //     // .then(res=>(console.log(res.data.message)))
        //  console.log("us"+ getUser.data.message +"ati"+ getUser.data.user.name)
    

//     // } 
       
            }
    

    catch (error) {
        return error
        // console.log('ee' + error.message)
    }
}


export async function userProfile() {

    const token = await JSON.parse(localStorage.getItem('token'))

    // const id = JSON.parse(localStorage.getItem('userId'))

    //console.log(id)
    
  const profile= await axios.get('/userprofile', { headers:{"Authorization": token}
})
  return profile.data

}
    
