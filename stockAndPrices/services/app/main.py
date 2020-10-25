from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

# CORS(app,  resources={r"/*": {"origins": "*"}})     # allows all origins

cors = CORS(app, resources={r"/.*": {"origins": "http://localhost:3000"}})  # only allowing our react app

@app.route('/')
def home():
    return "<h1>Home Page</h1>"


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "GET":
        return "<h1>Login Page</h1>"
    else:
        user = request.form['user_name']
        return f"<h1>Welcome {user}!</h1>"


if __name__ == "__main__":
    app.run(debug=True)

