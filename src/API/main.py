from fastapi import FastAPI
from pydantic import BaseModel
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

import json
import mysql.connector

import os
from fastapi.responses import FileResponse

from database import cursor, connection

NFTDIR = "../Assests/NFTs/"

SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "12345678",
    "database": "openTrade"
}

app = FastAPI()

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)

class LoginItem(BaseModel):
    username: str
    password: str
    
class RegisterDetails(BaseModel):
    username:str
    password: str
    wallet: str
    balance: float

@app.post("/login")
async def user_login(loginitem: LoginItem):
    
    data = jsonable_encoder(loginitem)
    
    try:
        
        cursor = connection.cursor()
        
        # Define the SQL query to retrieve data
        query = ("SELECT username, password FROM userProfiles WHERE username = %s")
        
        # Inject parameter to the query
        ex = (data["username"], )
        
        # Execute the SQL query
        cursor.execute(query, ex)
        
        try:
            # Store query data in a variable
            results = cursor.fetchone()
        except:
            # Set results in none
            results == ''
        
        if results is None:
            return {"error": "User not found!"}
        else:
            if (data["password"] == results[1] ):
                encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
                return {"token": encoded_jwt}
            else:
                return { "error": "Password does not match!"}
            
    except:
        return {"error": "Error load in Server"}

class CurrentUser(BaseModel):
    username: str

@app.post("/profile")
async def ProfileDetails(User: CurrentUser):

    try:
        # Get current logged username
        username = jsonable_encoder(User)["username"]
        
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()
        
        # Define the SQL query to retrieve data (e.g., all students)
        query = ("SELECT * FROM userProfiles WHERE username = %s")
        
        # Inject parameter to the query
        ex = (username, )
        
        # Execute the SQL query
        cursor.execute(query, ex)
        
        # Store data in a variable
        results = cursor.fetchone()
        
        # Close the cursor and the database connection
        cursor.close()
        connection.close()
        
        # Return user details
        return {"username" : results[0], "wallet": results[2], "balance": results[3]}
    
    except:
        return {"error" : "Error load in Server"}
    
@app.get("/")
def ShowNFT():
    # results: {
    #     'name': str,
    #     'image': str,
    #     'price': float,
    #     'owner' : str,
    #     'category' : str
    # }
    # try:
    #     # Establish a database connection
    #     connection = mysql.connector.connect(**db_config)
        
    #     # Create a cursor to execute SQL queries
    #     cursor = connection.cursor()
        
    #     # Define the SQL query to retrieve data (e.g., all students)
    #     query = ("SELECT * FROM digitalAssests")
        
    #     # Execute the SQL query
    #     cursor.execute(query)
        
    #     # Store query data in a variable
    #     assest = cursor.fetchone()
        
    #     results.name = assest
        
    #     # Close the cursor and the database connection
    #     cursor.close()
    #     connection.close()
        
    #     if results is None:
    #         return {"error": "User not found!"}
    #     else:
    #         if (data["password"] == results[1] ):
    #             encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
    #             return {"token": encoded_jwt}
    #         else:
    #             return { "error": "Password does not match!"}
            
    # except:
    #     return {"error": "Error load in Server"}
    
    files = os.listdir(NFTDIR)
    # path = f"{NFTDIR}{files}"
    return {"files" : files}
    # for i in range (len(files)):  
    #     path = f"{NFTDIR}{files[i+1]}"
    #     return FileResponse(path)



@app.post("/add_account")
async def AddAccount(input: RegisterDetails):
    
    details = jsonable_encoder(input)
    
    # Get inputs from the front-end
    username = details["username"]
    password = details["password"]
    wallet = details["wallet"]
    balance = details["balance"]
    
    try:
        
        cursor = connection.cursor()
        
        # Define the SQL query to retrieve data 
        query = "INSERT INTO userProfiles (username, password, walletNumber, walletBalance) VALUES (%s, %s, %s, %s)"
        
        try:
            data = (username, password, wallet, balance)
        
            # Execute the SQL query
            cursor.execute(query, data)
            
            connection.commit()
            
            msg = "Query Ok!"
            
        except mysql.connector.Error as err:
            return {"error": f"Error: {err}"}
        
        return "success";
            
    except:
        return {"error": "Error load in Server"}
    
    finally:
        cursor.close()
        connection.close()