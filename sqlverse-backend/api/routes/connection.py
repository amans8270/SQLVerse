# app/api/routes/connections.py

from fastapi import APIRouter
from app.services.encryption_service import encrypt_data
from app.db.mongodb import db
from app.schemas.connection_schema import ConnectionCreate

router = APIRouter()

@router.post("/connections")
def create_connection(payload: ConnectionCreate):
    encrypted = encrypt_data(payload.credentials)

    record = payload.dict(exclude={"credentials"})
    record["encrypted_credentials"] = encrypted

    db.connections.insert_one(record)
    return {"status": "connection_saved"}