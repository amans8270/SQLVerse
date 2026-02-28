from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import connection, query

app = FastAPI(title="SQLVerse API", description="Natural Language to SQL Backend")

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(connection.router, prefix="/api", tags=["Connections"])
app.include_router(query.router, prefix="/api", tags=["Query"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "SQLVerse API is running"}