There are two DockerFiles.
1. stoc-services-dockerfile
2. stoc-services-test-dockerfile (To be Added)

The stoc-services-dockerfile will be used to build the docker image to run the stock and prices react application within a container. The application will be exposed on port 5000. The steps to build the image and run the container are as follows:
1.  From the /app/ folder, run
		docker build -t stoc-services -f ./docker/stoc-services-dockerfile . 
2. Run docker images to see the list of images that currently exist. stoc-services should be there.
3. If the image exists, run
        
        
    This will now start the python application within a container.
4. To check if the container started, run docker ps to see if stoc-services is on that list.
5. The application can now be accessed at port 5000. 
