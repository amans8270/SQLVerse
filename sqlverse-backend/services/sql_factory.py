# app/services/sql_factory.py

from langchain.sql_database import SQLDatabase

def create_sql_database(
    db_type: str,
    host: str,
    port: int,
    database: str,
    username: str,
    password: str
) -> SQLDatabase:

    if db_type == "postgres":
        uri = f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}"

    elif db_type == "mysql":
        uri = f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}"

    elif db_type == "sqlite":
        uri = f"sqlite:///{database}"

    else:
        raise ValueError("Unsupported database type")

    return SQLDatabase.from_uri(uri, sample_rows_in_table_info=3)