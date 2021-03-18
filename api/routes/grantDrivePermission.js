const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const FILEID = '177NgJ_jl7x3vhWifRYdLCNaj-LyYxGLz';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

let auth;

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content));
});


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



function grantPermission(mailId) {
    const drive = google.drive({ version: 'v3', auth });
  
    drive.permissions.create({
        "fileId": FILEID,
        "resource": {
            "role": "writer",
            "type": "user",
            "emailAddress": mailId
        }
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("permission granted to " + mailId);
        },
            function (err) { console.error("Execute error", err); });;
}



router.get('/', function (req, res, next) {
    res.send("check console ->");
});
router.get('/epi', function (req, res, next) {
    console.log(listFiles(auth));
    res.send("huhuhuhu api got");
});

router.get('/:mailId', function (req, res) {
    grantPermission(req.params.mailId);
    res.send("granted access.");
})
module.exports = router;