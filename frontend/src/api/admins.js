const axios = require('axios');

/**
 * Gets the current session's login status.
 */
function getLoginStatus() {
    api_url = "http://localhost:80/api/admins/login";
    let promise = axios({
        method: 'get',
        url: api_url
    })
    return promise;
}

/**
 * Logs in the admin.
 * @param {string} email email of the admin
 * @param {string} password password of the admin
 * @param {string} rememberme whether the admin should be kept logged in
 */
function login(email, password, rememberme) {
    api_url = "http://localhost:80/api/admins/login";
    axios({
        method: 'post',
        url: api_url,
        data: {
            email: email,
            password: password,
            remember: rememberme
        }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

console.log(getLoginStatus().then(res=>res.data));
// login('superadmin', 'superadmin', false);