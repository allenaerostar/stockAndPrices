import pytest


# GET request to Index/Home Page
def test_home_page(client):
    res = client.get('/')
    assert res.status_code == 200
    assert res.data == b'<h1>Home Page</h1>'


# GET request to Login Page
def test_login_page(client):
    res = client.get('/login')
    assert res.status_code == 200
    assert res.data == b'<h1>Login Page</h1>'


# POST request to Login Page
def test_logged_in(client):
    res = client.post("/login", data=dict(user_name='Roberto'))
    assert res.status_code == 200
    assert res.data == b"<h1>Welcome Roberto!</h1>"