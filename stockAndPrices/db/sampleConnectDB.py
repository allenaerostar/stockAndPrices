from pymongo import MongoClient

if __name__ == "__main__":
    print("Enter your mongoDB host:")
    host = input()
    print("Enter you mongoDB port:")
    port = input()
    client = MongoClient(host, int(port))
    sampleDB = client.sampleDB
    developerCollection = sampleDB.developer
    devLiliana = {"first": "liliana", "last": "he"}
    devRoberto = {"first": "roberto", "last": "he"}
    devAllen = {"first": "allen", "last": "lee"}
    developerCollection.insert_one(devLiliana)
    developerCollection.insert_one(devRoberto)
    developerCollection.insert_one(devAllen)
    print("A collection is created named: " + sampleDB.list_collection_names()[0])
    print("Sample documents from collection developer: ")
    cursor = developerCollection.find({})
    for document in cursor:
        print(document)