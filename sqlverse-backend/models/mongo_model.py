from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class DBConnection(BaseModel):
    user_id: str
    db_type: str  # postgres | mysql | sqlite
    host: Optional[str]
    port: Optional[int]
    database: str
    encrypted_credentials: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)