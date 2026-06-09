from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime
from bson import ObjectId
from database.mongodb import get_database
from schemas.auth import UserCreate, UserLogin, UserResponse, Token
from utils.auth import get_password_hash, verify_password, create_access_token, decode_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    email: str = payload.get("sub")
    db = get_database()
    user = await db.users.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user["id"] = str(user["_id"])
    return user

@router.post("/register", response_model=UserResponse)
async def register(user_in: UserCreate):
    db = get_database()
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_in.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user_in.dict()
    user_dict["password"] = get_password_hash(user_dict["password"])
    user_dict["created_at"] = datetime.utcnow()
    
    result = await db.users.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    return user_dict

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin):
    db = get_database()
    user = await db.users.find_one({"email": user_in.email})
    if not user or not verify_password(user_in.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
