import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    db_instance.client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
    db_instance.db = db_instance.client[os.getenv("DATABASE_NAME")]
    print(f"Connected to MongoDB: {os.getenv('DATABASE_NAME')}")

async def close_mongo_connection():
    db_instance.client.close()
    print("Closed MongoDB connection")

def get_database():
    return db_instance.db
