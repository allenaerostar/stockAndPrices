Download Mongo DB locally if you would like to mongo shell into the db, 
but it is not necessary for the following to run

Download Docker Desktop locally

Start up a mongoDB server in a docker container with the following command, replace /some/directory/in/your/computer with a directory of your choice

> docker run -d --name mymongo -p 11111:27107 mongo -v /some/directory/in/your/computer:/data/db

Install pymongo in the terminal:
> python3 -m pip install pymongo==3.7.2
