import axios from 'axios'


export const AuthService = {

    login ,
    logout ,
    check   ,
}


function login(dispatch,username , password) {

    let postData = {
        username ,
        password ,
    }

    return new Promise( (resolve,reject) =>{

        axios.post(`http://127.0.0.1:8000/api/login`,postData).then( response => {
           
            let data = {...response.data  ,'time' : new Date  }
        
            localStorage.setItem('tokens',JSON.stringify(data))
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            
            dispatch({type:'LOGIN_USER' })
            
            resolve()
        
        }).catch( error => reject(error) )

    } )
    
}

function logout(dispatch){

    axios.defaults.headers.common['Authorization'] = ''
    
    localStorage.setItem('tokens','')

    dispatch( { type:'LOGOUT_USER' } ) ;

}


function check(dispatch) {

    let data = localStorage.getItem('tokens') && JSON.parse( localStorage.getItem('tokens') )
 
    if( data && data.access ) {

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        
        dispatch( {type : 'LOGIN_USER'  } ) ;
    }

}