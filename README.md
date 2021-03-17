# On-Boarding Off-Boarding

## Overview
This application provides the capability of invoking or revoking permissions to organization's github repositories for its members through a single click.  It is broadly divided into **4** docker containerized microservices, which are:

1. Nginx server: Its main task is to route front-end urls to the frontend app, and urls starting with `/api` to the backend app.
2. PostgreSQL Database: Contains three databases for development, testing, and production environment.
3. REST API with Flask: Exposes APIs to create and manage admins, staffs, and permission histories.
4. Front-end: Uses React and Redux. Consists of a login page and admin dashboard to manage admins, staffs, and permissions.


## A Typical Workflow
A typical workflow of this application can be summarized as followings:
- During the setup, a superadmin with an email 'superadmin', and password 'superadmin' is created. Obviously it needs to be changed to a more secure credentials after the setup.
- Superadmins are necessary to manage other admins. Only they can add or remove other admins, or make them superadmins. In short, the initial superadmin will create the admin panel for the organization.
- Both superadmins and admins can add staffs to the organization.
- Both admins and superadmins will be invoking or revoking permissions to their github repos to the staffs.

## Setup
To setup the application for development or testing purpose, just run thie following commands to start all the docker containers.
```
sudo docker-compose -f docker-compose-dev.yml build
sudo docker-compose -f docker-compose-dev.yml up -d
```
After the containers are up and running, run the following commands to setup database and create a super admin which is essential for the application. Note that the initial super admin has email **'superadmin'** and password **'superadmin'**.
```
sudo docker-compose -f docker-compose-dev.yml run admin python manage.py recreate_db
sudo docker-compose -f docker-compose-dev.yml run admin python manage.py create_superadmin
```
After that, go to the `localhost:80/` to access the login page. **Please make sure that other nginx services are not running at port 80**.

## Backend

### Configurations
The config file can be found in the `admin/config.py` file. It is recommended to set the SECRET_KEY variable to something more secure for the production server.


### Utility Scripts
The `manage.py` file in the backend application currently provide 3 utility scripts for recreating the database (`recreate_db`), creating a superadmin (`create_superadmin`), and automating testing (`test`).
### Models
The backend contains 3 models which are **Admin** containing information like `email`, `password`, `is_superadmin`, **Staff** containing information like `email`, `github_status`, and **GithubAccessHistory** containing information about a specific action like invoke or revoke of github access, along with the admin by which it was performed, staff on whome the permission was invoked or revoked, and date times.

### APIs
These APIs can be accessed from `localhost:5001` for testing. Below is a breif descriptions of the backend APIs:
- `GET /api/admins/login` : Used to check whether the current user is logged in or not.
- `POST /api/admins/login` : Logs in a user using email and password.
- `POST /api/admins/logout` : Logs out a user. Requires current user to be logged in.
- `POST /api/admins/add` : Adds a new admin. Requires superadmin and login in permissions.
- `POST /api/admins/edit/<admin_id>` : Edits an existing admin. Requires superadmin and login in permissions.
- `DELETE /api/admins/<admin_id>` : Removes an existing admin. Requires superadmin and login in permissions.
- `GET /api/admins` : Returns list of all admins. Requires login in permission.
- `GET /api/admins/<admin_id>` : Returns a specific admin
- `POST /api/staffs/add` : Adds a new Staff. Requires login in permissions.
- `POST /api/staffs/edit/<staff_id>` : Edits an existing staff. Requires login in permissions.
- `DELETE /api/staffs/<staff_id>` : Removes an existing staff. Requires login in permissions.
- `GET /api/staffs` : Returns list of all staffs. Requires login in permission.
- `GET /api/staffs/<staff_id>` : Returns a specific staff
- `GET /api/github` : Returns al histories of github permissions.
- `POST /api/github` : Creates a new access history.
- `GET /api/github/staffs/<staff_id>` : Returns histories related to a specific staff.
- `GET /api/github/admins/<admin_id>` : Returns histories related to a specific admin.

## Frontend

- A login page (**Implemented**)
- Admin Dashboard Page (**NOT Implemented YET**)
    - Admin Page: For managing admins
    - Staff Page: For managing staffs
    - Permissions Page: For managing permissions