# app/services/sql_guard.py

import re

FORBIDDEN_KEYWORDS = [
    "insert", "update", "delete", "drop",
    "alter", "truncate", "create"
]

MAX_ROWS = 100

def validate_sql(sql: str):
    lowered = sql.lower()

    if not lowered.strip().startswith("select"):
        raise ValueError("Only SELECT queries are allowed")

    for keyword in FORBIDDEN_KEYWORDS:
        if re.search(rf"\b{keyword}\b", lowered):
            raise ValueError(f"Forbidden SQL operation detected: {keyword}")

    if "limit" not in lowered:
        sql += f" LIMIT {MAX_ROWS}"

    return sql