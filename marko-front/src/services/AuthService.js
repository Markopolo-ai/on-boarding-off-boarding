import axios from 'axios'


export const AuthService = {

    login ,
    logout 
}


function login(username , password) {

    let postData = {
        username ,
        password ,
    }

    axios.post(`http://127.0.0.1:8000/api/login`,postData).then( response => {
        
        localStorage.setItem('tokens',JSON.stringify(response.data))
        console.log(response)

    }).catch( error => {
        console.log(error) 
        // show alert 
    })

}

function logout(){
    console.log(`user loggedout`)
}