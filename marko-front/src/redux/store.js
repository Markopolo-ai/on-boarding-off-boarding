import {
    createStore ,
    combineReducers ,
} from "redux"

const initialState = {
    count : 23 ,
    list : []  ,
    loggedin: false ,
}

export const counter = (state=initialState,action) => {
    switch(action.type){
        case 'INC' :
            state.count += 1 
            return state 
        case 'DEC' :
            state.count -= 1
            return state
        case 'ADDN':
            state.count += action.payload.nval
        case 'GET_LIST' : 
            state.list  = action.payload.list 
            return state     
        case 'LOGIN' :
            state.loggedin = action.payload.loggedin 
            return state     
        default :
            return state     
    }
}


export function addN(n) {
    return {
        type : 'ADDN' ,
        payload : {
            nval : n 
        }
    }
}

// export  function getList() {
//     console.log('get the list')

//     fetch('https://jsonplaceholder.typicode.com/todos')
//             .then( response => response.json())
//             .then( function(json) {
            
//                 dispatch({
//                     type : 'GET_LIST' ,
//                     payload : {
//                         list : json 
//                     }
//                 })

//             } ) ;

// }

export const reducers = combineReducers({
    counter ,
})


export const store = createStore(reducers,initialState) 