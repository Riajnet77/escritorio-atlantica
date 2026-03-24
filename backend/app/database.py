from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client: AsyncIOMotorClient = None

async def connect_db():
    global client
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    print("✅ Conectado ao MongoDB!")

async def close_db():
    global client
    if client:
        client.close()
        print("❌ Conexão MongoDB encerrada.")

def get_database():
    return client[settings.DB_NAME]
