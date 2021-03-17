Access/Revoke to Google Drive Folder/File

Description: Using Email Id and folder name, user give access or revoke permission on google drive folder.

Software/Framework:
Ui: Figma
Deploy: Heroku
Frontend: React
Backend: Flask

Prerequisites:
Install Python, Node.js
Install Flask, React
Install Google Drive api package.

Installation:
First install the Flask environment for the backend.
Then install the React environment for the frontend.
Lastly install heroku cli to deploy the project.

Functionality:
Creating two main functions. One for creating permission, and another one for revoke permission.
Creating permission take three parameters (email,file_id,role)
Revoke permission takes two(email, file_id).

Ui: Design Ui on Figma https://www.figma.com/proto/drQL3U37LQiQ9VWF7sVqY5/Permission?node-id=102%3A31&scaling=min-zoom 

Code:
	Github: https://github.com/tanvir0ahmmed/google-drive-api 

Deployment:
Deploy in Heroku
I deploy react and flask separately. And using proxy settings in React(using package.json) passing values from frontend to backend api url.
Link:
React: https://react-api-bot-v1.herokuapp.com/ 
Flask: https://flask-api-bot-v1.herokuapp.com/ (this implementation has no get request, so, this link will be shown: The method is not allowed for the requested URL.)

Issue:
After deployment, create an issue to send a post request to the backend api/ flask port. But work properly in a local environment.

Working Prof:
Video: https://drive.google.com/file/d/15mI1VKyDUYqIzxH-gNkhy7hvG5xziGZ7/view?usp=sharing  



