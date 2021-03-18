# Overview
This application uses React and Express to grant an email address the *edit* permission of a google drive file/folder.

## To use
In the *api/routes/grantDrivePermission.js* and *api/routes/revokeDrivePermission.js* files, the **FILEID** should be updated and set to the file id of an actual google drive file/folder. Google's OAuth authentication should take care of granting the permission to further add/remove people. 