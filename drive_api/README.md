# Drive API Backend (Django REST Framework)
This is a api endpoint service to mainly execute three process,
- Get list of permitted users
- Add New User
- Remove Existing Use

## Setup
You will need docker desktop to run this project. If you don't have docker installed then go [here](https://www.docker.com/products/docker-desktop) and download docker desktop in your system. Now, after that we will need two file that will handle google drive api key that is `mycreds.txt` and `client_secrets.json`. For, obvious reasons I have not included them in the repo as it can be used to access every content in your drive. However, I will assist you on how to create those files for your use. First head towards [here](https://github.com/tonmoy50/setup-pydrive-cred/) and upon completion you should have two file `client_secrets.json` and 'mycreds.txt'. Now, put them on *drive_api/src/* directory.
Now, you are all set to create docker image. Make sure you are in *drive_api/* directory and open up a terminal from there. In you terminal run the following command,
- `docker build .`
- `docker-compose build`
So, we have setup docker image and now let's run the development server from docker using `docker-compose up` from the same terminal.

## Flow
- Get list of users have access to a particular folder/file in google drive
- Add new user to existing folder/file in google drive
- Revoke permission for a user.

## API Endponts

- List Users - http://127.0.0.1:8080/folder/all_users
- Add User - http://127.0.0.1:8080/folder/all_users
- Remove User - http://127.0.0.1:8080/folder/remove_user

## Payloads
- Add Users 
`{
  "email_id" : "Email_Address_of_the_new_user",
  "file_id" : "UNIQUE_FILE_ID"
}`
- Remove User
`{
  "id" : "Id of the User",
  "file_id" : "UNIQUE_FILE_ID"
}`
