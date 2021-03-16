import {createStore ,combineReducers } from "redux"
import initialState from './state/index' ;
import auth from './reducers/auth' ;
import member from './reducers/member' ;




export const reducers = combineReducers({
    auth ,
    member 
})


export const store = createStore(reducers,initialState) 