from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict
from datetime import datetime, timedelta
from database.mongodb import get_database
from routes.auth import get_current_user
from ai.reflection_engine import get_reflection

router = APIRouter(prefix="/reflection", tags=["AI Reflection Engine"])

async def save_reflection(user_id: str, reflection_data: Dict, category: str):
    db = get_database()
    reflection_doc = {
        "user_id": user_id,
        "reflection": reflection_data["reflection"],
        "category": category,
        "patterns": reflection_data["patterns"],
        "growth": reflection_data["growth"],
        "recommendations": reflection_data["recommendations"],
        "created_at": datetime.utcnow()
    }
    await db.reflections.insert_one(reflection_doc)

@router.get("/weekly")
async def get_weekly_reflection(current_user: dict = Depends(get_current_user)):
    db = get_database()
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    
    cursor = db.journal_entries.find({
        "user_id": str(current_user["id"]),
        "created_at": {"$gte": seven_days_ago}
    })
    
    journals = []
    async for doc in cursor:
        journals.append(doc)
    
    reflection = await get_reflection(journals, period="weekly")
    await save_reflection(str(current_user["id"]), reflection, "weekly")
    return reflection

@router.get("/monthly")
async def get_monthly_reflection(current_user: dict = Depends(get_current_user)):
    db = get_database()
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    cursor = db.journal_entries.find({
        "user_id": str(current_user["id"]),
        "created_at": {"$gte": thirty_days_ago}
    })
    
    journals = []
    async for doc in cursor:
        journals.append(doc)
    
    reflection = await get_reflection(journals, period="monthly")
    await save_reflection(str(current_user["id"]), reflection, "monthly")
    return reflection

@router.get("/growth")
async def get_growth_report(current_user: dict = Depends(get_current_user)):
    db = get_database()
    # Growth analyzes the entire history
    cursor = db.journal_entries.find({
        "user_id": str(current_user["id"])
    })
    
    journals = []
    async for doc in cursor:
        journals.append(doc)
    
    reflection = await get_reflection(journals, period="growth")
    await save_reflection(str(current_user["id"]), reflection, "growth")
    return reflection

@router.get("/recommendations")
async def get_ai_recommendations(current_user: dict = Depends(get_current_user)):
    db = get_database()
    # Recommendations usually based on recent patterns
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    cursor = db.journal_entries.find({
        "user_id": str(current_user["id"]),
        "created_at": {"$gte": thirty_days_ago}
    })
    
    journals = []
    async for doc in cursor:
        journals.append(doc)
    
    reflection = await get_reflection(journals, period="monthly")
    return {"recommendations": reflection["recommendations"]}
