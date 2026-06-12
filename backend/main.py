from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database.mongodb import connect_to_mongo, close_mongo_connection
from routes import auth, journal, summary, reflection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(title="MindVault AI API", lifespan=lifespan)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(journal.router, prefix="/api")
app.include_router(summary.router, prefix="/api")
app.include_router(reflection.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to MindVault AI API"}
