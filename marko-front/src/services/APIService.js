import axios from 'axios' ;

import {AuthService} from './AuthService' ;

export const APIService = {
    getMembers ,
    removeMember ,
    addMember ,
    paginate ,
}


function getMembers(dispatch) {
    return new Promise( (resolve,reject) => {

        axios.get('http://127.0.0.1:8000/api/member/').then(response=>{

            dispatch( { type:'POPULATE_MEMBER_LIST' , payload:{ members: response.data } })
            resolve(response.data)

        }).catch(error => {

            unAuthHnadel(dispatch,error);

            reject(error)

        })
    })
}

function removeMember(dispatch,id) {

    return new Promise( (resolve,reject) => {
    
        axios.delete(`http://127.0.0.1:8000/api/member/${id}/`).then(response=>{
    
            dispatch( {type:'REMOVE_MEMBER' , payload : { id  }   } )

            resolve(response.data)
        
        }).catch(error => {
        
            unAuthHnadel(dispatch,error);

            reject(error)
        
        })
    })
}

function addMember(dispatch,email,myAlert) {

    let memberData = {
        email 
    }

    return new Promise( (resolve,reject) => {

        axios.post(`http://127.0.0.1:8000/api/member/`,memberData).then(response=>{

            dispatch( {type:'ADD_MEMBER' , payload : { data : response.data  }   } )

            if(myAlert) myAlert.success('member added ')

            resolve(response.data)

        }).catch(error => {
            
            unAuthHnadel(dispatch,error,myAlert);

            reject(error)
            
        })
    })    
    
}

function paginate(dispatch,page) {

    return new Promise( (resolve,reject) => {

        axios.get(`http://127.0.0.1:8000/api/member/?page=${page+1}`).then(response=>{

            dispatch( { type:'POPULATE_MEMBER_LIST' , payload:{ members: response.data } })
            resolve(response.data)

        }).catch(error => {

            unAuthHnadel(dispatch,error);

            reject(error)

        })
    })
}


function unAuthHnadel(dispatch,error,myAlert) {
    
    if( error.response.status  == 401) {
        if(myAlert) myAlert.error('unauthenticated')
        AuthService.logout(dispatch) ;
    }else {

        if(myAlert && error.response.data.email)
        error.response.data.email.map( v => {
            myAlert.error(v)
        })
    }

}