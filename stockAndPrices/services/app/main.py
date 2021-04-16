from flask import Flask, request
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from configuration.Origin import Origin
from configuration.swagger import SWAGGER_URL, API_URL
from games import games_blueprint
import logging, re
from configuration.Loggings import log_fname, log_fmat, log_level
import flask_praetorian
from util.dbUtility import User, InterestList, Interest
import json


app = Flask(__name__)
app.config.from_pyfile("configuration/Config.py")


# pylint: disable=no-member
# Logging #
'''
logging.basicConfig(filename=log_fname,
                    format=log_fmat)
app.logger.setLevel(log_level)
'''
logging.basicConfig(format=log_fmat)
# Flask Praetorian / Guard #
guard = flask_praetorian.Praetorian()
guard.init_app(app, User)

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
        return {'validation': val}, 200
    userInfo = guard.authenticate(user, pwd)
    return {'access_token': guard.encode_jwt_token(userInfo)}, 200


@app.route('/signUp', methods=['POST'])
def signUp():
    user = request.form.get('username')
    pwd = request.form.get('password')
    email = request.form.get('email')
    val = validate(user,pwd,email,True)
    if successful != val:
        return val, 200
    if User.objects(username=user):
        return "Username already exist! Try another username.", 200
    elif User.objects(email=email):
        return "Email already exist! Try another email.", 200
    else:
        User(username=user, password=guard.hash_password(pwd), email=email).save()
        InterestList(username=user, interest_list=[]).save()
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
@app.route('/interestList')
@flask_praetorian.auth_required
def showInterestList():
    try:
        user = flask_praetorian.current_user().username
        userDB = InterestList.objects(username=user).get()
        if not userDB:
            app.logger.warning('early return for empty user')
            return {'message': 'early return for empty user'}, 200

        userIntList = userDB.interest_list
        if not userIntList:
            return {'message': 'early return for empty interest'}, 200
        ret = []
        for lst in userIntList:
            tmp = {}
            tmp['gid'], tmp['gname'], tmp['gprice'] = lst.gid, lst.gname, lst.gprice
            tmp['sid'], tmp['discount'] = lst.sid, lst.discount
            ret.append(tmp)
        return {'ret': ret}, 200
    except Exception as e:
        app.logger.error(e)
        return {'message': 'Login Again'}, 401


@app.route('/addInterest', methods=['GET', 'POST'])
@flask_praetorian.auth_required
def addToInterestList():
    data = request.get_json(force=True)
    gid, gname, gprice = data.get('gid', None), data.get('gname', None), data.get('gprice', None)
    sid, disc = data.get('sid', None), data.get('discount', None)
    try:
        user = flask_praetorian.current_user().username
        if not InterestList.objects(username=user):
            return {'message': 'cannot find user, login again'}, 200
        userIntList = InterestList.objects(username=user).get()
        intr = Interest(gid=gid, sid=sid, gname=gname, gprice=gprice, discount=disc)
        if InterestList.objects(username=user, interest_list=intr):
            return {'message': 'already in interest list'}
        userIntList.interest_list.append(intr)
        userIntList.save()
        return {'message': f'added {gname} into interest list'}, 200
    except Exception as e:
        app.logger.error(e)
        return {'message': 'Login Again'}, 401


if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug = app.config["DEBUG"], use_reloader=False)

"""
delete button on interest
interest UI - 
interest list in memory
"""