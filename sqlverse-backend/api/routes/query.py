# app/api/routes/query.py

from fastapi import APIRouter, HTTPException
from db.mongodb import db
from services.encryption_service import decrypt_data
from services.sql_factory import create_sql_database
from services.agent_service import build_sql_agent
from services.sql_gaurd import validate_sql
from schemas.query_schema import QueryRequest, QueryResponse

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
def query_database(request: QueryRequest):
    try:
        conn = db.connections.find_one({"_id": request.connection_id})
        if not conn:
            raise HTTPException(status_code=404, detail="Connection not found")

        creds = decrypt_data(conn["encrypted_credentials"])
        
        # SQLite uses connection string natively
        if conn["db_type"] == "sqlite":
            username, password = None, None
        else:
            username, password = creds.split(":", 1) if ":" in creds else (creds, None)

        sql_db = create_sql_database(
            db_type=conn["db_type"],
            host=conn.get("host"),
            port=conn.get("port"),
            database=conn.get("database"),
            username=username,
            password=password,
            credentials=creds if conn["db_type"] == "sqlite" else None
        )

        agent = build_sql_agent(sql_db)
        response = agent.run(request.question)

        return QueryResponse(answer=response)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))