# Application
This is an employee onbarding-offboarding app where one can invite/remove a member  to his/her github project organization.
# [Table of Contents ](#table-of-context)
1. [Project Demo](#demo)
1. [Project Approach](#approach)
2. [UI design](#ui)
3. [Tech stack](#tech)
4. [Used API](#)
4. [Project Architechure](#architechure)
5. [Implementation](#implementation)
6. [Limitations and assumed theory](#limitation)
7. [Installation](#install)


## Project Demo
![Demo](https://github.com/DimaMirana/on-boarding-off-boarding/blob/Dima/app.gif.gif)
## Project Approach
This is a invitation/ delete member from the company's project github organization web app. From the requirements it's needed to add a member in the organization when an email is given. Similarly, can delete an already existing member from the organization with one click. Now, we can't directly add a member in the organization, if we want to add someone in our organization, we need to sent an invitation mail to the person's mail. But it's possible to remove the member without the colaborator's permission. It's need to be also noted that only the person who has administrator previlage can invite member. Also when try to Use GitHub API from an app, it's necessary to have the Personal Access Token to the of the administrator. Unless he/she can't invite any member.
To make this app, I added a login with google layer, so that the information of the person who's log in can be saved into database. After successful log in, the persn should give the Personal Access Token so that it can be saved untill the projects reload, in that way, the private tokeen dorsesn't need to be saved anywhere. After the token validation, the user should be able to see the pre-existing members of the organization , also there will be a cross button beside each user name so that with onl one click on the cross butto, the person should be removed from the organization.
There is also an invitation part with a ivitation button and niput field to enter invitation mail. If invitation/ deletetion of a member is successful then the confirmation popup alert should appear, otherwise an error alert would generate.
## UI design
The application UI was disigned with FIGMA
Design URL: https://www.figma.com/file/LLCU36cNHLXc4w8dbJ6kop/Home-Page
## Tech stack
1. Front End: Use React Library for rendering the HTML and CONTEXT API for state management.
2. Backend: The app is serverless. Use Firebase for authentication and for saving member's data the firebase firestore is used.
    

## Used API
GitHub API: 
```bash
GET /orgs/{org}/members (Get organizations members from the API )
DELETE /orgs/{org}/members/{username} (remove meber from org)
POST /orgs/{org}/invitations (send invitation on a mail)
```
{org} = the organization name 
{username} = user github name
FireBase API:
1. GoogleSignIn and signOut
2. Create and delete document from a collection

## Project Architechure
1. ![App Flow](https://i.ibb.co/CMy9fbg/App.png)
2. ![Databaase](https://i.ibb.co/qj1fjyt/db.png)

## Implementation
- Tech Stack - ReactJS, ContextAPI, Firebase
- Features
	- Login -  `login the organizatio's owner using gmail and store owner's information in  firebase`
	- Showing Member List - `fetch data from GitHub API and update the member collection on firebase and show data from firebase. please note that the list will be only add member in firebase when the app initializes as I don't keep any triger function when the invitation is accepted`
    - Invite Member - `send invitation to the wrtiien email address`
    - Delete Member - `delete member from organization and firebase member collection`

## Limitations and assumed theory
1. There was no indication if the application should be secured by any protocol or not.
2. The private tokens for different organizations are sensitive data. They need to be protected but how the data should be protected there was no guideline.

For these limitations and time limitations I hard-coded the Private token in the .env files so when the invitations should be sent will be sent from my personal organization. When it should actually be from the user who's currently log in.
## Installation

Need to install node in the computer before running the application

```bash
cd client
npm install
npm start
```
