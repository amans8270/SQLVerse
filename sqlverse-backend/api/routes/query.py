# app/api/routes/query.py

from fastapi import APIRouter
from app.db.mongodb import db
from app.services.encryption_service import decrypt_data
from app.services.sql_factory import create_sql_database
from app.services.agent_service import build_sql_agent
from app.services.sql_guard import validate_sql

router = APIRouter()

@router.post("/query")
def query_database(connection_id: str, question: str):

    conn = db.connections.find_one({"_id": connection_id})

    creds = decrypt_data(conn["encrypted_credentials"])
    username, password = creds.split(":")

    sql_db = create_sql_database(
        db_type=conn["db_type"],
        host=conn.get("host"),
        port=conn.get("port"),
        database=conn["database"],
        username=username,
        password=password
    )

    agent = build_sql_agent(sql_db)

    response = agent.run(question)

    return {
        "answer": response
    }