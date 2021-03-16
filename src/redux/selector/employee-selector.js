import { createSelector} from 'reselect';

const selectEmployee = state => state.employee;

export const selectEmployeeList = createSelector(
    [selectEmployee],  employee =>employee.list
);
export const selectShowModal = createSelector(
    [selectEmployee],  employee =>  {
        
    console.log("sssss: ", employee.showModal);
        return employee.showModal
    }
);

// export const selectUserType = createSelector(
//     [selectUser], user => user.userType
// )