import {combineReducers} from 'redux';

import {
    UPDATE_LOGIN_STATUS,
    UPDATE_ADMIN_DATA,
    UPDATE_ADMIN_TOKEN
} from '../actions';

// Initially user is set to logged out mode.
const initialLoginState = {
    loggedIn: false
}

// Since user is logged out initially, all admin data are set to
// null at the begining.
const initialAdminData = {
    id: null,
    email: null,
    token: null
}

// The login reducer is responsible for managing login state
// of a user. It takes only one action type UPDATE_LOGIN_STATUS
// to set loggedIn variable to either true or false.
function login(initialState = initialLoginState, action) {
    const {loggedIn} = action;
    switch(action.type) {
        case UPDATE_LOGIN_STATUS:
            return {
                ...initialState,
                loggedIn: loggedIn
            };
        default:
            return initialState;
    }
}

// The admin reducer is responsible for maintaining data related
// to a logged in admin. The UPDATE_ADMIN_DATA action updates data
// like admin id, email, etc. While, UPDATE_ADMIN_TOKEN sotres &
// updates GitHub access tokens for subsequent uses.
function admin(initialState = initialAdminData, action) {
    switch(action.type) {
        case UPDATE_ADMIN_DATA:
            const {email, id} = action;
            return {
                ...initialState,
                email: email,
                id: id
            };
        case UPDATE_ADMIN_TOKEN:
            const {token} = action;
            return {
                ...initialState,
                token: token
            };
        default:
            return initialState;
    }
}

export default combineReducers({
    login,
    admin
});