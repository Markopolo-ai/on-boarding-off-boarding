`Dockerfile-dev` & `Dockerfile-prod` are for development and production stages respectively. The first one is supplied with a `dev.conf` file to replace nginx default.conf file, while the second one is supplied with a `prod.conf` configuration file.

- The `dev.conf` basically instructs nginx to route root url `/` to the frontend app at port `80` (*internally*) and connect to the APIs through `/api` urls on port 5000 (*internally*).
- In contrast, `prod.conf` instructs nginx to listen for root urls on frontend app's port 80, with others being the same as before.

*internally* means the ports are only available through the docker network. The actual port 80, that will be reachable to clients, will be used by nginx as stated in docker-compose files. Nginx will then forward the request to port 80 of frontend app through docker's internal bridges. Similarly, it will forward API calls to port 5000 of the admin app.
