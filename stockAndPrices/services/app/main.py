from pymongo import MongoClient
from flask import Flask, request
from flask_cors import CORS
from configuration.Origin import Origin
from configuration.swagger import SWAGGER_URL, API_URL
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
app.config.from_pyfile("configuration/Config.py")

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


@app.route('/')
def home():
    return "<h1>Home Page</h1>"


@app.route('/login', methods=['POST', 'GET'])
def login():
    rtn = ""
    db_host = request.args.get('dbHost')
    db_port = request.args.get('dbPort')
    try:
        client = MongoClient(db_host, int(db_port))
        client.server_info()
    except:
        rtn = "Connection Error! Please provide valid dbHost and dbPort as query strings and make sure your" \
              " mongoDB server is running."
        return f"<h1>{rtn}<h1>"

    sample_db = client.sampleDB
    dev_col = sample_db.developer
    if request.method == "GET":
        if dev_col.find_one({"first": "Hello"}) is None:
            rtn = ": No data with Hello World in db."
        else:
            document = dev_col.find_one({"first": "Hello"})
            rtn = document["first"] + " " + document["last"]
        return f"<h1>Login Page {rtn}<h1>"
    else:
        user = request.form['username']
        first = request.form['first']
        last = request.form['last']
        find = dev_col.find_one({"first": first, "last": last})
        rtn = ""
        if find is None:
            doc = dev_col.insert_one({"first": first, "last": last})
            rtn = "A document is inserted with your inputs: '" + first + " " + last + \
                  " and its corresponding object _id is " + str(doc.inserted_id)
        else:
            rtn = "A document with your inputs already exist!"

        return f"<h1>Welcome {user}!</h1> <d>{rtn}</d>"


if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug = app.config["DEBUG"])

