from fastapi import FastAPI
from pydantic import BaseModel
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

import json
import mysql.connector

SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

app = FastAPI()

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)

class LoginItem(BaseModel):
    username: str
    password: str

@app.post("/login")
async def user_login(loginitem: LoginItem):
    
    data = jsonable_encoder(loginitem)
    
    file = open("./users.json")
    users = json.load(file)
        
    for i in range (len(users)):
        test_user = users[i]
        
        if data['username'] == test_user['username'] and data['password'] == test_user['password']:
            encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
            return {"token": encoded_jwt}
        

app = FastAPI()

db_config = {
    "host": "127.0.0.1:3306",
    "user": "root",
    "password": "Admin@145524",
    "database": "openTrade"
}

# Establish a database connection
connection = mysql.connector.connect(**db_config)
# Create a cursor to execute SQL queries
cursor = connection.cursor()
# Define the SQL query to retrieve data (e.g., all students)
query = "SELECT * FROM image_test"

# Execute the SQL query
cursor.execute(query)

# Fetch all the rows
result = cursor.fetchall()

# Convert the result to a list of dictionaries
# students = [dict(zip(cursor.column_names, row)) for row in result]

# Close the cursor and the database connection
cursor.close()
connection.close()

