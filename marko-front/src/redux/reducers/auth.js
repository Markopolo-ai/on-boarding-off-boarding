import initialState from "../state/index" 

const auth = (state=initialState,action) => {
       
    switch(action.type) {
        case 'LOGIN_USER':
            state.loggedin = true 
            return state
        case 'LOGOUT_USER':
            state.loggedin = false 
            return state 
        default :
            return state 
    }
}

export default auth ;


