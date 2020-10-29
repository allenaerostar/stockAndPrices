from flask import Flask, request
from flask_cors import CORS
from configuration.Origin import Origin


app = Flask(__name__)
app.config.from_pyfile("configuration/DevConfig.py")

cors = CORS(app, resources={r"/.*": {"origins": Origin}})


@app.route('/')
def home():
    return "<h1>Home Page</h1>"


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "GET":
        return "<h1>Login Page</h1>"
    else:
        user = request.form.get('username')
        #pwd = request.form.get('password')
        #print(user)
        #print(pwd)
        return f"<h1>Welcome {user}!</h1>"


if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug = app.config["DEBUG"])

