import pytest


# GET request to Index/Home Page
def test_home_page(client):
    res = client.get('/')
    assert res.status_code == 200
    assert res.data == b'<h1>Home Page</h1>'



# TODO: SETUP running instance of database in order to execute these commented out tests
""" # POST request to Login Page
def test_logged_in(client):
    info = {"username":"username", "password":"password"}
    res = client.post("/login", data=info)
    assert res.status_code == 200
    assert res.data == b"Login Successfully"

def test_logged_in_failed(client):
    info = {"username":"hahahaha", "password":"12345678"}
    res = client.post("/login", data=info)
    assert res.status_code == 401
    assert res.data == b"Incorrect Username or Password!" """


# TODO: SETUP running instance of database in order to execute these commented out tests
""" 
# POST request to signUp Page
def test_signUp_Successful(client):
    info = {"username":"hahahaha", "password":"12345678",
            "email":"some@mail.com"}
    res = client.post('/signUp', data=info)
    assert res.status_code == 201
    assert res.data == b"Account Created. Please Sign In With Your Credentials."

def test_signUp_failed(client):
    info = {"username":"username", "password":"password"}
    res = client.post('/signUp', data=info)
    assert res.status_code == 200
    assert res.data == b"Username already exist! Try other username"
    

 """