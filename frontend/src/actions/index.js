// The application currently utilizes 3 redux actions and
// action creators to persist login information and admin data
// and GitHub access tokens through a global store. The taks 
// each action performs should be evident from their names.

export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
export const UPDATE_ADMIN_DATA = 'UPDATE_ADMIN_DATA';
export const UPDATE_ADMIN_TOKEN = 'UPDATE_ADMIN_TOKEN';


export function updateLoginStatus({loggedIn}) {
    return {
        type: UPDATE_LOGIN_STATUS,
        loggedIn
    }
};

export function updateAdminData({id, email, isSuperAdmin}) {
    return {
        type: UPDATE_ADMIN_DATA,
        id,
        email,
        isSuperAdmin
    }
};

export function updateAdminAccessToken({token}) {
    return {
        type: UPDATE_ADMIN_TOKEN,
        token
    }
};
