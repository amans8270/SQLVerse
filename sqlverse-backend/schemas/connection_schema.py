from pydantic import BaseModel
from typing import Optional

class ConnectionCreate(BaseModel):
    db_type: str
    host: Optional[str] = None
    port: Optional[int] = None
    database: Optional[str] = None
    credentials: str  # Format: "username:password" or API key
