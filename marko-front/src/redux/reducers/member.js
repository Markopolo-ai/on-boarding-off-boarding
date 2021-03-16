import initialState from "../state/index"

const member = (state=initialState,action) => {
    switch(action.type) {
        case 'POPULATE_MEMBER_LIST':
            state.members = action.payload.members
            return state 
        case 'ADD_MEMBER':
            state.members.results = [ ...state.members.results , action.payload.data ]
            return state 
        case 'REMOVE_MEMBER':
            state.members.results = state.members.results.filter( v => v.id != action.payload.id ) 
            return state 
        default :
            return state 
    }
}

export default member ;
