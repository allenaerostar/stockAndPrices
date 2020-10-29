Python version : 3.79

"pip install flask" in command line to download flask

To run the flask server:
In Bash:
$ export FLASK_APP=main.py
$ flask run

In CMD:
> set FLASK_APP=main.py
> flask run

In Powershell:
> $env:FLASK_APP = "main.py"
> flask run

Now, you could go to http://127.0.0.1:5000/ in your browser, and you should see the Home Page

Then, you could go to http://127.0.0.1:5000/login, and give a value to 'user_name'(key). (In Postman)
It will return a Welcome "user input"

For /login GET request provide dbHost and dbPort as query string
> http://127.0.0.1:5000/login?dbHost=localhost&dbPort=11111

For /login POST request provide dbHost and dbPort as query string 
> http://127.0.0.1:5000/login?dbHost=localhost&dbPort=11111

and provide form key values pairs for keys (user_name, firt, last)


main.py - the basic python file to create an app using flask


