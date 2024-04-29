from pymongo import MongoClient
from pymongo.server_api import ServerApi

URI = ""
DB_NAME = "SmartHome"


client = MongoClient(URI, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client[DB_NAME]

def create_document(collection_name, data):
    collection = db[collection_name]
    return collection.insert_one(data)

def read_documents(collection_name, query={}):
    collection = db[collection_name]
    return collection.find(query)

def update_document(collection_name, query, update_data):
    collection = db[collection_name]
    return collection.update_one(query, {"$set": update_data})

def delete_document(collection_name, query):
    collection = db[collection_name]
    return collection.delete_one(query)
