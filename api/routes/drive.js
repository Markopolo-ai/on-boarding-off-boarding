// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const readline = require('readline');
// const { google } = require('googleapis');

// const scopes = [
//     'https://www.googleapis.com/auth/drive'
// ];

// let credentials;
// fs.readFile('credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Google Drive API.
//     // authorize(JSON.parse(content));
//     credentials = JSON.parse(content);
//     console.log(credentials);
//     // listFiles((google.auth.OAuth2));
// });

// const auth = new google.auth.JWT(
//     credentials.client_email, 
//     null,
//     credentials.private_key, 
//     scopes
// );

// const drive = google.drive({ version: "v3", auth });

// drive.files.list({}, (err, res) => {
//     if (err) throw err;
//     const files = res.data.files;
//     if (files.length) {
//         files.map((file) => {
//             console.log(file);
//         });
//     } else {
//         console.log('No files found');
//     }
// });
