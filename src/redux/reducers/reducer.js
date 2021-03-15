  
import { combineReducers } from 'redux';
import employee from './employee-reducer.js';

const rootReducer = combineReducers({
    employee
});


export default rootReducer;