# On-Boarding Off-Boarding

This application provides capability of invoking or revoking permissions to organization's github repositories for its members through a single click. It is broadly divided into **4** docker containerized microservices, which are:

1. Nginx server,
2. PostgreSQL Database,
3. REST API with Flask, and
4. Front-end, with React.

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

