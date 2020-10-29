from flask import Flask, request, redirect, url_for
from pymongo import MongoClient
from urllib.parse import urlparse
from urllib.parse import parse_qs

app = Flask(__name__)

@app.route('/Home')
@app.route('/', methods=['POST', 'GET'])
def home():
    if request.method == "GET":
        return f"<h1>Home Page<h1>"


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
            dev_col.insert_one({"first": "Hello", "last": "World"})
        document = dev_col.find_one({"first": "Hello"})
        rtn = document["first"] + " " + document["last"]
        return f"<h1>Login Page {rtn}<h1>"
    else:
        user = request.form['user_name']
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
    app.run(debug=True)

