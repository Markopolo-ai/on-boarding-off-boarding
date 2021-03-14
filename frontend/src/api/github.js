import axios from 'axios';

/**
 * Returns the list of failed invitations.
 * @param {string} orgName Name of the organization
 * @param {string} accessToken Personal access token with admin:org capabilities
 * @returns {Object} List of failed invitations
 */
 function getPendingInvitations(orgName, accessToken) {
    axios.get(`https://api.github.com/orgs/{orgName}/failed_invitations`, {
        headers: {
            'Authorization': `Basic {token}`
        }
    })
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

/**
 * Returns the list of pending invitations.
 * @param {string} orgName Name of the organization
 * @param {string} accessToken Personal access token with admin:org capabilities
 * @returns {Object} List of invalid invitations
 */
function getPendingInvitations(orgName, accessToken) {
    axios.get(`https://api.github.com/orgs/{orgName}/invitations`, {
        headers: {
            'Authorization': `Basic {token}`
        }
    })
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

/**
 * Send invitation to a GitHub member to join organization.
 * @param {string} orgName Name of the organization
 * @param {string} accessToken Personal access token with admin:org capabilities
 * @param {string} email Email id of the invitee
 * @param {string} role 
 */
 function getPendingInvitations(orgName, accessToken, email, role = 'direc') {
    axios.post(`https://api.github.com/orgs/{orgName}/invitations`, {
        headers: {
            'Authorization': `Basic {token}`
        }
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error);
    })
}