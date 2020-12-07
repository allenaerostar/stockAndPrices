Python version : 3.79

"pip install flask==1.1.2"              to install Flask package
"pip install pytest==6.1.2"             to install pytest package
"pip install -U flask-cors==3.0.9"      to install Flask-CORS package
"pip install flask_swagger_ui==3.36.0"  to install Swagger UI package

"python -m pip install --upgrade pip"   to upgrade pip if needed


main.py - the python file to create an app using flask

"Python main.py" to run the flask server: 

"http://127.0.0.1:5000/"            for Home Page
"http://127.0.0.1:5000/login"       for Login Page
"http://127.0.0.1:5000/swagger"     for Swagger UI



'pytest' or 'Python -m pytest' to run pytest and check all the testcases
'pytest -v' to get a detailed report


For /dblogin GET request provide dbHost and dbPort as query string
> http://127.0.0.1:5000/dblogin?dbHost=localhost&dbPort=11111

For /dblogin POST request provide dbHost and dbPort as query string 
> http://127.0.0.1:5000/dblogin?dbHost=localhost&dbPort=11111

and provide form key values pairs for keys (user_name, firt, last)




