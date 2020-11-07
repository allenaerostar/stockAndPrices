Python version : 3.79

"pip install flask"             to install Flask package
"pip install pytest"            to install pytest package
"pip install -U flask-cors"     to install Flask-CORS package
"pip install flask_swagger_ui"  to install Swagger UI package

"python -m pip install --upgrade pip"   to upgrade pip if needed


"Python main.py" to run the flask server: 
OR

In Bash:
> $ export FLASK_APP=main.py
> flask run

In CMD:
> set FLASK_APP=main.py
> flask run

In Powershell:
> $env:FLASK_APP = "main.py"
> flask run


"http://127.0.0.1:5000/"            for Home Page
"http://127.0.0.1:5000/login"       for Login Page
"http://127.0.0.1:5000/swagger"     for Swagger UI



'pytest' or 'Python -m pytest' to run pytest and check all the testcases
'pytest -v' to get a detailed report


main.py - the python file to create an app using flask