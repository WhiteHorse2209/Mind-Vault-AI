from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class JournalBase(BaseModel):
    title: str
    content: str

class JournalCreate(JournalBase):
    pass

class JournalUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class JournalResponse(JournalBase):
    id: str
    user_id: str
    emotion: Optional[str] = None
    sentiment: Optional[str] = None
    score: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
