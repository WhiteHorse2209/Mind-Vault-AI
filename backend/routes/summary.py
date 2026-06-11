from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict
from datetime import datetime, timedelta
from database.mongodb import get_database
from routes.auth import get_current_user
from ai.summarizer import generate_summary
from ai.topic_extractor import extract_topics
from ai.insights import generate_productivity_insights

router = APIRouter(prefix="/summary", tags=["AI Summary & Insights"])

@router.post("/summarize")
async def manual_summarize(content: Dict[str, str], current_user: dict = Depends(get_current_user)):
    """
    Manually trigger summarization for a piece of text.
    """
    if "content" not in content:
        raise HTTPException(status_code=400, detail="Content field is required")
    
    summary = await generate_summary(content["content"])
    topics = await extract_topics(content["content"])
    
    return {
        "summary": summary,
        "topics": topics
    }

@router.get("/weekly")
async def get_weekly_summary(current_user: dict = Depends(get_current_user)):
    """
    Generate a summary of all journal entries from the past 7 days.
    """
    db = get_database()
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    
    cursor = db.journal_entries.find({
        "user_id": str(current_user["id"]),
        "created_at": {"$gte": seven_days_ago}
    })
    
    entries = []
    async for doc in cursor:
        entries.append(doc["content"])
    
    if not entries:
        return {"summary": "No entries found for the past week."}
    
    combined_text = " ".join(entries)
    summary = await generate_summary(combined_text, max_length=200, min_length=50)
    
    return {"summary": summary}

@router.get("/monthly")
async def get_monthly_summary(current_user: dict = Depends(get_current_user)):
    """
    Generate a summary of all journal entries from the past 30 days.
    """
    db = get_database()
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    cursor = db.journal_entries.find({
        "user_id": str(current_user["id"]),
        "created_at": {"$gte": thirty_days_ago}
    })
    
    entries = []
    async for doc in cursor:
        entries.append(doc["content"])
    
    if not entries:
        return {"summary": "No entries found for the past month."}
    
    combined_text = " ".join(entries)
    summary = await generate_summary(combined_text, max_length=300, min_length=100)
    
    return {"summary": summary}

@router.get("/topics")
async def get_all_topics(current_user: dict = Depends(get_current_user)):
    """
    Retrieve all extracted topics from user's journals.
    """
    db = get_database()
    cursor = db.journal_entries.find({"user_id": str(current_user["id"])})
    
    all_topics = set()
    async for doc in cursor:
        topics = doc.get("topics", [])
        for t in topics:
            all_topics.add(t)
            
    return {"topics": list(all_topics)}

@router.get("/insights")
async def get_insights(current_user: dict = Depends(get_current_user)):
    """
    Generate productivity insights based on user's journals.
    """
    db = get_database()
    # Get last 30 days of entries for insights
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    cursor = db.journal_entries.find({
        "user_id": str(current_user["id"]),
        "created_at": {"$gte": thirty_days_ago}
    })
    
    journals = []
    async for doc in cursor:
        journals.append(doc)
        
    insights = await generate_productivity_insights(journals)
    
    return {"insights": insights}
