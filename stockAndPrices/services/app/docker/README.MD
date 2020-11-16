There are two DockerFiles.
1. stoc-services-dockerfile
2. stoc-services-test-dockerfile

The stoc-services-dockerfile will be used to build the docker image to run the stock and prices python application within a container. The application will be exposed on port 5000. The steps to build the image and run the container are as follows:
1.  From the /app/ folder, run
		docker build -t stoc-services -f ./docker/stoc-services-dockerfile . 
2. Run docker images to see the list of images that currently exist. stoc-services should be there.
3. If the image exists, run
        docker run -it -p 5000:5000 --name stoc-services stoc-services
        
    This will now start the python application within a container.
4. To check if the container started, run docker ps to see if stoc-services is on that list.
5. The application can now be accessed at port 5000. 

The stoc-services-tests-dockerfile will be used to build the docker image to run the stock and prices python tests within a container. The steps to build the image and run the container are as follows:
1.  From the /app/ folder, run
		docker build -t stoc-services-tests -f ./docker/stoc-services-tests-dockerfile . 
2. Run docker images to see the list of images that currently exist. stoc-services-tests should be there.
3. If the image exists, run
        docker run --name stoc-services-tests stoc-services-tests    
    This will now execute the python tests within a container.