from flask import Flask, request
from flask_cors import CORS
from configuration.Origin import Origin
from configuration.swagger import SWAGGER_URL, API_URL
from util.dbUtility import getMongoDbClient
from mongosanitizer.sanitizer import sanitize
from flask_swagger_ui import get_swaggerui_blueprint
from games import games_blueprint
import logging, re
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

# validation constant
successful = 'true'

@app.route('/')
def home():
    return "<h1>Home Page</h1>"

@app.route('/login', methods=['POST'])
def login():
    user = request.form.get('username')
    pwd = request.form.get('password')
    val = validate(user,pwd,'',False)
    if successful != val:
        return val, 200
    return val

    client = getMongoDbClient()

    if client is None:
        return "Connection Error! Internal Server Error.", 500

    stockAndPrices = client.stockAndPrices
    accounts = stockAndPrices.accounts
    userInfo = {
        "username": user,
        "password": guard.hash_password(pwd)
    }
    sanitize(userInfo)
    if accounts.find_one(userInfo) is None:
        return {'access_token' : None}, 401
        # return "Incorrect Username or Password!", 401
    else:
        ret = {'access_token': guard.encode_jwt_token(userInfo)}
        return ret, 200
        # return "Login Successfully", 200

@app.route('/signUp', methods=['POST', 'GET'])
def signUp():
    user = request.form.get('username')
    pwd = request.form.get('password')
    email = request.form.get('email')
    val = validate(user,pwd,email,True)
    if successful != val:
        return val, 200
    return val
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
        new_user = {
            "username": user,
            "password": guard.hash_password(pwd),
            "email": email
        }
        sanitize(new_user)
        created = accounts.insert_one(new_user)
        return "Account Created. Please Sign In With Your Credentials.", 201
        


def validate(username, password, email, signUp):
    # username check
    if len(username)<8 or len(username)>12:
        return "Username should have 8 to 12 characters."
    # passowrd check
    if len(password)<8 or len(password)>12:
        return "Password should have 8 to 12 characters."
    
    # only check password contain capital letter/number, and email if it is signUp form
    if signUp:
        if not (re.search('\d', password) and re.search('[A-Z]', password)):
            return "Password should include capital letter and number"

        # the regex means "Has only one @, at least one character before the @, before the period and after it"
        if not re.search('^[^@]+@[^@]+\.[^@]+$', email):
            return "Incorrect email format"
    return "true"

# Refresh JWT token
@app.route('/refresh', methods=['POST'])
def refresh():
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200

# interest List #
@app.route('/interest_list')
@flask_praetorian.auth_required
def protected():
    try:
        return {'message': f'protected endpoint (allowed user {flask_praetorian.current_user().username})'}, 200
    except Exception as e:
        return "Login to check Interest List", 401


if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug = app.config["DEBUG"], use_reloader=False)
