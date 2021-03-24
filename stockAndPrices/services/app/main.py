from flask import Flask, request
from flask_cors import CORS
from configuration.Origin import Origin
from configuration.swagger import SWAGGER_URL, API_URL
from util.dbUtility import getMongoDbClient
from flask_swagger_ui import get_swaggerui_blueprint
from games import games_blueprint
import logging
from configuration.Loggings import log_fname, log_fmat, log_level
import flask_praetorian



app = Flask(__name__)
app.config.from_pyfile("configuration/Config.py")

# Logging #
logging.basicConfig(filename=log_fname,
                    format=log_fmat)
app.logger.setLevel(log_level)

# Flask Praetorian / Guard #
guard = flask_praetorian.Praetorian()
guard.init_app(app)

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

@app.route('/login', methods=['POST'])
def login():
    user = request.form.get('username')
    pwd = request.form.get('password')
    val = validate(user,pwd,'',False)
    if val != 'true':
        return val, 200

    client = getMongoDbClient()

    if client is None:
        return "Connection Error! Internal Server Error.", 500

    stockAndPrices = client.stockAndPrices
    accounts = stockAndPrices.accounts
    userInfo = {
        "username": user,
        "password": pwd
    }
    sanitize(userInfo)
    if accounts.find_one(userInfo) is None:
        return "Incorrect Username or Password!", 401
    else:
        return "Login Successfully", 200

@app.route('/signUp', methods=['POST'])
def signUp():
    user = request.form.get('username')
    pwd = request.form.get('password')
    email = request.form.get('email')
    val = validate(user,pwd,email,True)
    if val != 'true':
        return val, 200
    
    client = getMongoDbClient()
    if client is None:
        return "Connection Error! Internal Server Error.", 500

    stockAndPrices = client.stockAndPrices
    accounts = stockAndPrices.accounts
    userInfo = {"username": user}
    emailInfo = {"email": email}
    sanitize(userInfo)
    sanitize(emailInfo)
    if accounts.find_one(userInfo):
        return "Username already exist! Try another username.", 200
    elif accounts.find_one(emailInfo):
        return "Email already exist! Try another email.", 200
    else:
        new_user = accounts.insert_one({
            "username": user,
            "password": pwd,
            "email": email
        })
        return "Account Created. Please Sign In With Your Credentials.", 201


if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug = app.config["DEBUG"], use_reloader=False)
