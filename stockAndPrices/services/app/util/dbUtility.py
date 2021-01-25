from configuration.Config import DB_HOST, DB_PORT
from pymongo import MongoClient

def getMongoDbClient():
    try:
        client = MongoClient(DB_HOST, int(DB_PORT))
        client.server_info()
        return client
    except:
        rtn = "Connection Error! Internal Server Error."
    return None