from flask import Flask, request
from flask_cors import CORS
from configuration.Origin import Origin
from configuration.swagger import SWAGGER_URL, API_URL
from util.dbUtility import getMongoDbClient
from flask_swagger_ui import get_swaggerui_blueprint
from games import games_blueprint
import logging
from configuration.Loggings import log_fname, log_fmat, log_level


app = Flask(__name__)
app.config.from_pyfile("configuration/Config.py")

# Logging #
logging.basicConfig(filename=log_fname,
                    format=log_fmat)
app.logger.setLevel(log_level)

# CORS #
cors = CORS(app, resources={r"/.*": {"origins": Origin}})

# For Swagger UI #
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Swagger UI"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT)

# For CheapShark API #
app.register_blueprint(games_blueprint)


@app.route('/')
def home():
    return "<h1>Home Page</h1>"

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "GET":
        return "<h1>Login Page</h1>"
    else:
        user = request.form.get('username')
        pwd = request.form.get('password')

        client = getMongoDbClient()

        if client is None:
            return "Connection Error! Internal Server Error.", 500

        stockAndPrices = client.stockAndPrices
        accounts = stockAndPrices.accounts
        userInfo = {
            "username": user,
            "password": pwd
        }
        if accounts.find_one(userInfo) is None:
            return "Incorrect Username or Password!", 401
        else:
            return "Login Successfully", 200

@app.route('/signUp', methods=['POST', 'GET'])
def signUp():
    if request.method == "GET":
        return "<h1>Sign Up Page</h1>"
    else:
        user = request.form.get('username')
        pwd = request.form.get('password')
        email = request.form.get('email')

        client = getMongoDbClient()
        if client is None:
            return "Connection Error! Internal Server Error.", 500

        stockAndPrices = client.stockAndPrices
        accounts = stockAndPrices.accounts
        userInfo = {
            "username": user,
            "email": email
            }
        if accounts.find_one(userInfo):
            return "Username already exist! Try another username.", 200
        else:
            new_user = accounts.insert_one({
                "username": user,
                "password": pwd,
                "email": email
            })
            return "Account Created. Please Sign In With Your Credentials.", 201

if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug = app.config["DEBUG"], use_reloader=False)
