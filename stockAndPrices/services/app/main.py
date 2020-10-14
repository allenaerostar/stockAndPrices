from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__)

@app.route('/Home')
@app.route('/', methods=['POST', 'GET'])
def home():
    if request.method == "GET":
        return render_template("index.html")
    else:
        return redirect(url_for("login1"))


@app.route('/login', methods=['POST', 'GET'])
def login1():
    if request.method == "GET":
        return render_template("login.html")
    else:
        user = request.form["user_name"]
        return f"<h1>Welcome {user}!</h1>"


if __name__ == "__main__":
    app.run(debug=True)

