1.To start up the react application, python service, and mongodb docker containers, go the directory with the docker-compose.yml, and execute the following command. 

	docker-compose up -d --build

This will build all the docker images of the project, and start all the docker containers in the background.
There will now be a react_app service, flask_services service, and mongodb service. The react_app will be accessible to the host machine through localhost:3000 while the rest of the services will be strictly used only by internal services.

2. To stop and remove all the services started up with docker-compose, execute the following command in the docker-compose.yml directory. 

	docker-compose down