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
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
