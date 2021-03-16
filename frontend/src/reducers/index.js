import {combineReducers} from 'redux';

import {
    UPDATE_LOGIN_STATUS,
    UPDATE_ADMIN_DATA,
    UPDATE_ADMIN_TOKEN
} from '../actions';


const initialLoginState = {
    loggedIn: false
}

const initialAdminData = {
    id: null,
    email: null,
    token: null
}

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