const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
const FILEID = '177NgJ_jl7x3vhWifRYdLCNaj-LyYxGLz';

let auth;

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content));
    // listFiles((google.auth.OAuth2));
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client);
        oAuth2Client.setCredentials(JSON.parse(token));
        auth = oAuth2Client;
    });
}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            auth = oAuth2Client;
        });
    });
}


function revokePermission(mailId) {
    let permissionId;
    const drive = google.drive({ version: 'v2', auth });

    drive.permissions.getIdForEmail({
        "email": mailId
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            permissionId = String(response.data.id);
            console.log("Response id: ", permissionId);

            drive.permissions.delete({
                "fileId": FILEID,
                "permissionId": permissionId
            })
                .then(function (response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("revoked permission from " + mailId);
                },
                    function (err) { console.error("Execute error", err); });

        },
            function (err) { console.error("Execute error", err); });
}

// /revokePerm/EMAIL_ADDRESS revokes the access
router.get('/:mailId', function (req, res) {
    revokePermission(req.params.mailId);
    res.send('access revoked');
})
module.exports = router;

