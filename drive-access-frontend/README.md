# Google Drive Manage (ReactJS Frontend)

This is the frontend of the application that can be used to manage drive access to members of a team. This application is made to use for only the manager. So, no other personnel other than the manager must access the app. With this app we can do the following things,
- See the list of already addedd teammember to the drive file
- Add new member to access drive file/folder
- Revoke permission for any addedd member

## Setup

You will need docker desktop to run this. Please follow this steps to setup environment,
- If you don't have docker then go to [docker website](https://www.docker.com/products/docker-desktop) and download docker.
- Then go to the project directory *drive-access-frontend/* and open up a terminal in the same directory
- Run `docker build .` and then `docker-compose build`
- After sequentially executing the previous two command successfully we have built the docker image and now to start development server just run `docker-compose up` and you will see that your development server has been start at `localhost:3000`
(P.S Please note that in order to successfully use the frontend you need to run the backend before. So make sure you have followed the backend prior to starting here.)

## Screenshots
Here is some of the screenshots of working project
### List of the teammember
![front](https://user-images.githubusercontent.com/22047627/111423560-b32e7d80-871a-11eb-8bf8-407eda241b3d.png)
### Adding A teammember
![image](https://user-images.githubusercontent.com/22047627/111423671-d8bb8700-871a-11eb-94de-5ad58923f597.png)
![image](https://user-images.githubusercontent.com/22047627/111423725-e83ad000-871a-11eb-8ee2-f4057036ef0c.png)

