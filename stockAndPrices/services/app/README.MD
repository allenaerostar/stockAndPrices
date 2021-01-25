Python version : 3.79

"pip install flask==1.1.2"              to install Flask package
"pip install pytest==6.1.2"             to install pytest package
"pip install -U flask-cors==3.0.9"      to install Flask-CORS package
"pip install flask_swagger_ui==3.36.0"  to install Swagger UI package
"pip install requests==2.25.0"          to install python requests package
"pip install pymemcache=3.4.0"          to install python pymemcache package

"python -m pip install --upgrade pip"   to upgrade pip if needed


"Python main.py" to run the flask server:

"http://127.0.0.1:5000/"            for Home Page
"http://127.0.0.1:5000/login"       for Login Page
"http://127.0.0.1:5000/signUp"      for Sign Up Page
"http://127.0.0.1:5000/swagger"     for Swagger UI



'pytest' or 'Python -m pytest' to run pytest and check all the testcases
'pytest -v' to get a detailed report


For /dblogin GET request provide dbHost and dbPort as query string
> http://127.0.0.1:5000/dblogin?dbHost=localhost&dbPort=11111

For /dblogin POST request provide dbHost and dbPort as query string 
> http://127.0.0.1:5000/dblogin?dbHost=localhost&dbPort=11111

and provide form key values pairs for keys (user_name, firt, last)



Installing Memcached
If you run Linux, you can install it using apt-get install memcached or yum install memcached. This will install memcached from a pre-built package but you can alse build memcached from source, "https://github.com/memcached/memcached/wiki/Install"

For macOS, using Homebrew (https://brew.sh/) is the simplest option. Just run brew install memcached after you’ve installed the Homebrew package manager.

On Windows, you would have to compile memcached yourself or find pre-compiled binaries
(https://commaster.net/posts/installing-memcached-windows/).

Activated memcached after you installed.

