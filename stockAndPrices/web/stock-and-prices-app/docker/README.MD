There are two DockerFiles.
1. stock-and-prices-dockerfile
2. stock-and-prices-tests-dockerfile

The stock-and-prices-dockerfile will be used to build the docker image to run the stock and prices react application within a container. The application will be exposed on port 3000. The steps to build the image and run the container are as follows:
1.  From the /web/stock-and-prices/ folder, run
		docker build -t stock-and-prices-react-app -f ./docker/stock-and-prices-dockerfile . 
2. Run docker images to see the list of images that currently exist. stock-and-prices-react-app should be there.
3. If the image exists, run
                 docker run -it -p 3000:3000 --name stock-and-prices-react-app stock-and-prices-react-app
    This will now start the react application within a container.
4. To check if the container started, run docker ps to see if stock-and-prices-react-app is on that list.
5. The application can now be accessed at port 3000. 


The stock-and-prices-tests-dockerfile will be be used to build the docker image to run the stock and prices react jest tests within a container. The steps to build the image and run the container are as follows:
1.  From the /web/stock-and-prices/ folder, run
		docker build -t stock-and-prices-react-app-tests -f ./docker/stock-and-prices-tests-dockerfile . 
2. Run docker images to see the list of images that currently exist. stock-and-prices-react-app-tests should be there.
3. If the image exists, run
                 docker run -it --name stock-and-prices-react-app-tests stock-and-prices-react-app-tests
    This will now execute the react jest tests within a container.
4. The container should exit once the tests finish.