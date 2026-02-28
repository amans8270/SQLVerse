import os
from pymongo import MongoClient
import sqlite3
import json
import uuid

MONGO_URI = os.getenv("MONGO_URI")

class MockDB:
    def __init__(self):
        self.conn = sqlite3.connect('local_connections.db', check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS connections (
                id TEXT PRIMARY KEY,
                data TEXT
            )
        ''')
        self.conn.commit()

    class Collection:
        def __init__(self, db):
            self.db = db
            
        def insert_one(self, record):
            record_id = str(uuid.uuid4())
            record['_id'] = record_id
            self.db.cursor.execute('INSERT INTO connections (id, data) VALUES (?, ?)', (record_id, json.dumps(record)))
            self.db.conn.commit()
            class Result:
                inserted_id = record_id
            return Result()
            
        def find_one(self, query):
            if '_id' in query:
                self.db.cursor.execute('SELECT data FROM connections WHERE id = ?', (query['_id'],))
                result = self.db.cursor.fetchone()
                if result:
                    data = json.loads(result[0])
                    data['_id'] = query['_id']
                    return data
            return None

    @property
    def connections(self):
        return self.Collection(self)

if MONGO_URI:
    client = MongoClient(MONGO_URI)
    db = client.sqlverse
else:
    db = MockDB()