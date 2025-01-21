from fastapi import FastAPI
import uvicorn
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PORT: int = 8000
    ENV: str = "development"
    BASE_URL: str = "http://localhost:8000"

settings = Settings()

app = FastAPI()


from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://piggypoggy01:<db_password>@cluster0.f8f2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    port = 5000  # Change the port here
    debug = settings.ENV == "development"
    
    uvicorn.run(
        "main:app",
        host="127.0.0.1",  # Change the host here
        port=port,
        reload=debug
    )

