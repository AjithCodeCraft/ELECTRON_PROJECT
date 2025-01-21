from pymongo import MongoClient
client =MongoClient("mongodb+srv://piggypoggy01:<db_password>@cluster0.f8f2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.AudioCookbook
collection_name = db['audio']