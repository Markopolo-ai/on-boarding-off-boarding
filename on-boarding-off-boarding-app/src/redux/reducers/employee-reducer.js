import * as ActionTypes from '../actions/action-types.js';

// const INITIAL_STATE = {
//     employees: data
// };


const employee = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_EMPLOYEE:
          return [ ...state,
            {
              id: action.id,
              text: action.text,
              completed: false,
              isEdit: false
            }];
        case ActionTypes.REVOKED_EMPLOYEE:
            return state.filter(todo =>
              todo.id !== action.id
            );
        case ActionTypes.SHOW_ADD_EMPLOYEE:       
                return {...state, showModal: action.payload};
        case ActionTypes.CHANGE_ACCESS:
              return state.map(employee =>
                (employee.id === action.payload ?
                  Object.assign({}, employee, { hasAccess: !employee.hasAccess }) :
                  employee)
              );
        case ActionTypes.SHOW_CURRENT_EMPLOYEE:
          return state.filter(todo => todo.completed === false);
        case ActionTypes.SHOW_REVOKED_EMPLOYEE:
          return state.filter(todo => todo.completed === false);
        case ActionTypes.SHOW_ALL_EMPLOYEE:
            return {list:action.payload} || [];
        default:
          return state
      }
  }
  
  export default employee;