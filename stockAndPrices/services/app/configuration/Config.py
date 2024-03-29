

ENV = 'development'
DEBUG = True
TESTING = True
PORT = 5000
HOST = "0.0.0.0"
SECRET_KEY = 'ThisIsARandomSecretKey!*~'

DB_NAME = 'stockAndPrices'
DB_HOST = 'mongodb'
DB_PORT = 27017

# JWT for flask-praetorian
JWT_ACCESS_LIFESPAN = {'minutes': 30}
JWT_REFRESH_LIFESPAN = {'days': 1}
