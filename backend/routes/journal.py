from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from bson import ObjectId
from datetime import datetime
from database.mongodb import get_database
from schemas.journal import JournalCreate, JournalUpdate, JournalResponse
from routes.auth import get_current_user
from utils.ai import analyze_journal_content

router = APIRouter(prefix="/journal", tags=["Journal Entries"])

@router.post("/", response_model=JournalResponse)
async def create_journal(journal_in: JournalCreate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    journal_dict = journal_in.dict()
    
    # AI Analysis
    ai_result = await analyze_journal_content(journal_dict["content"])
    journal_dict.update(ai_result)
    
    journal_dict["user_id"] = str(current_user["id"])
    journal_dict["created_at"] = datetime.utcnow()
    journal_dict["updated_at"] = datetime.utcnow()
    
    result = await db.journal_entries.insert_one(journal_dict)
    journal_dict["id"] = str(result.inserted_id)
    return journal_dict

@router.get("/", response_model=List[JournalResponse])
async def get_journals(current_user: dict = Depends(get_current_user)):
    db = get_database()
    cursor = db.journal_entries.find({"user_id": str(current_user["id"])})
    journals = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        journals.append(doc)
    return journals

@router.get("/{journal_id}", response_model=JournalResponse)
async def get_journal(journal_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    if not ObjectId.is_valid(journal_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    journal = await db.journal_entries.find_one({
        "_id": ObjectId(journal_id),
        "user_id": str(current_user["id"])
    })
    
    if not journal:
        raise HTTPException(status_code=404, detail="Journal not found")
        
    journal["id"] = str(journal["_id"])
    return journal

@router.put("/{journal_id}", response_model=JournalResponse)
async def update_journal(journal_id: str, journal_in: JournalUpdate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    if not ObjectId.is_valid(journal_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    update_data = {k: v for k, v in journal_in.dict().items() if v is not None}
    
    if "content" in update_data:
        ai_result = await analyze_journal_content(update_data["content"])
        update_data.update(ai_result)
        
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.journal_entries.find_one_and_update(
        {"_id": ObjectId(journal_id), "user_id": str(current_user["id"])},
        {"$set": update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Journal not found")
        
    result["id"] = str(result["_id"])
    return result

@router.delete("/{journal_id}")
async def delete_journal(journal_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    if not ObjectId.is_valid(journal_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    result = await db.journal_entries.delete_one({
        "_id": ObjectId(journal_id),
        "user_id": str(current_user["id"])
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Journal not found")
        
    return {"message": "Journal deleted successfully"}
