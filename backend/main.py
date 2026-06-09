from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database.mongodb import connect_to_mongo, close_mongo_connection
from backend.routes import auth, journal

app = FastAPI(title="MindVault AI API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(journal.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to MindVault AI API"}
