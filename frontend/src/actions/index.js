export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
export const UPDATE_ADMIN_DATA = 'UPDATE_ADMIN_DATA';
export const UPDATE_ADMIN_TOKEN = 'UPDATE_ADMIN_TOKEN';


export function updateLoginStatus({loggedIn}) {
    return {
        type: UPDATE_LOGIN_STATUS,
        loggedIn
    }
};

export function updateAdminData({id, email}) {
    return {
        type: UPDATE_ADMIN_DATA,
        id,
        email
    }
};

export function updateAdminAccessToken({token}) {
    return {
        type: UPDATE_ADMIN_TOKEN,
        token
    }
};
