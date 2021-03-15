import {data} from '../employee-data.js';

export const getEmployeeList = () => ({
  type: 'SHOW_ALL_EMPLOYEE',
  payload: data
  });
export const setEmployeeList = () => ({
  type: 'SHOW_ALL_EMPLOYEE',
  payload: data
});
export const revokeEmployeeAccess = id => ({
  type: 'CHANGE_ACCESS',
  payload: id
});
export const showAddModal = () => ({
  type: 'SHOW_ADD_EMPLOYEE',
  payload: true
});

// export const deleteTodo = id => {
//   return { type: types.DELETE_TODO, id };
// }

// export const editTodo = (id, text, isEdit) => {
//   return { type: types.EDIT_TODO, id, text, isEdit };
// }

// export const completeTodo = id => {
//   return { type: types.COMPLETE_TODO, id };
// }

// export const clearCompleted = () => {
//   return { type: types.CLEAR_COMPLETED };
// }

// export const showAll = () => {
//   return { type: types.SHOW_ALL };
// }

// export const showActive = () => {
//   return { type: types.SHOW_ACTIVE };
// }

// export const showCompleted = () => {
//   return { type: types.SHOW_COMPLETED };
// }


// export const setFilter = filter => {
//   return { type: "SET_FILTER", filter};
// }

// export const filterList = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

// export const countAction = {
//   ACTIVE_COUNT: 'ACTIVE_COUNT',
// }