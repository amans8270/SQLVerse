# app/api/routes/connections.py

from fastapi import APIRouter
from services.encryption_service import encrypt_data
from db.mongodb import db
from schemas.connection_schema import ConnectionCreate

router = APIRouter()

@router.post("/connections")
def create_connection(payload: ConnectionCreate):
    encrypted = encrypt_data(payload.credentials)

    record = payload.dict(exclude={"credentials"})
    record["encrypted_credentials"] = encrypted

    result = db.connections.insert_one(record)
    return {"status": "success", "connection_id": str(result.inserted_id)}