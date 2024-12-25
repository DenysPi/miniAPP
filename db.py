import sqlite3

DB_NAME = "messages.db"

with sqlite3.connect(DB_NAME) as conn:
    cursor = conn.cursor()

   
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tables:", tables)
    
    table_name = "messages"
    cursor.execute(f"PRAGMA table_info({table_name});")
    schema = cursor.fetchall()
    
    
   
    cursor.execute(f"SELECT * FROM {table_name} ;")
    rows = cursor.fetchall()
    print(f"Data in {table_name}:")
    for row in rows:
        print(row)