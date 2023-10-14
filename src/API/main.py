from fastapi import FastAPI, File, Form, UploadFile
from pydantic import BaseModel
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

import mysql.connector

# from database import connection

import base64
import io 

SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "12345678",
    "database": "openTrade"
}

# Establish a database connection
connection = mysql.connector.connect(**db_config)

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

class AssetUploadData(BaseModel):
    asset: str
    name: str
    owner: str 
    price: str  
    category: str 
    
    
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
async def Profile_Details(User: CurrentUser):
    
    try:
        # Get current logged username
        username = jsonable_encoder(User)["username"]
        
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
def Show_NFT():
    cursor = connection.cursor()
    try:
        query = "SELECT Assest, AssestName, Price, Category, AssestID FROM DigitalAssests"
        cursor.execute(query)
        
        try:
            results = cursor.fetchall()
            # Transform the results into a suitable format, e.g., a list of dictionaries
            formatted_results = [{"asset": row[0], "name": row[1], "price": row[2], "category": row[3], "id": row[4]} for row in results]
            return formatted_results
        
        except Exception as query_error:

            return f"Error in query: {query_error}"
        
    except Exception as e:
        return {"error" : e}
    
@app.get("/{category}")
async def Filter(category: str):
    cursor = connection.cursor()
    try:
        query = "SELECT Assest, AssestName, Price, Category, AssestID FROM DigitalAssests WHERE Category = %s"
        cursor.execute(query, (category, ))
        
        try:
            results = cursor.fetchall()
            # Transform the results into a suitable format, e.g., a list of dictionaries
            formatted_results = [{"asset": row[0], "name": row[1], "price": row[2], "category": row[3], "id": row[4]} for row in results]
            return formatted_results
        
        except Exception as query_error:
            return f"Error in query: {query_error}"
        
    except Exception as e:
        return {"error" : e}
    
@app.get("/details/")
async def Exports():
    cursor = connection.cursor()
    try:
        query = "SELECT Assest, AssestName, Price, Category, AssestID, Owner FROM DigitalAssests"
        cursor.execute(query)
        
        try:
            results = cursor.fetchall()
            # Transform the results into a suitable format, e.g., a list of dictionaries
            formatted_results = [jsonable_encoder({"asset": row[0], "name": row[1], "price": row[2], "category": row[3], "id": row[4], "owner": row[5]} )for row in results]
            return formatted_results
        
        except Exception as query_error:
            return f"Error in query: {query_error}"
        
    except Exception as e:
        return {"error" : e}
    
@app.get("/search/")
async def Search(keyword: str):
    cursor = connection.cursor()
    try:
        key = f"%{keyword}%"
        query = "SELECT Assest, AssestName, Price, Category, AssestID FROM DigitalAssests WHERE AssestName LIKE %s "
        cursor.execute(query, (key, ))
        
        try:
            results = cursor.fetchall()
            # Transform the results into a suitable format, e.g., a list of dictionaries
            formatted_results = [{"asset": row[0], "name": row[1], "price": row[2], "category": row[3], "id": row[4]} for row in results]
            return formatted_results
        
        except Exception as query_error:
            return f"Error in query: {query_error}"
        
    except Exception as e:
        return {"error" : e}
    
    
@app.post("/add_account")
async def Add_Account(input: RegisterDetails):
    
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
        
@app.post("/upload")
async def Upload_Assest(uploads: AssetUploadData):
    
    uploaded_data = jsonable_encoder(uploads)
    
    try:
        
        cursor = connection.cursor()
        
        # Define the SQL query to retrieve data 
        query = "INSERT INTO DigitalAssests ( Assest, AssestName, Owner, Price, Category) VALUES (%s, %s, %s, %s, %s)"
        
        try:
            
            data = (uploaded_data["asset"], uploaded_data["name"], uploaded_data["owner"], uploaded_data["price"], uploaded_data["category"])
        
            # Execute the SQL query
            cursor.execute(query, data)
            
            connection.commit()
            
        except mysql.connector.Error as err:
            return {"msg": f"Error: {err}"}
        
        # return {"msg":"uploade"};
        return uploaded_data
            
    except:
        return {"error": "Error load in Server"}
    
@app.get("/profile/feed/{username}")        
async def Feed(username: str):
    cursor = connection.cursor()
    try:
        query = "SELECT Assest, AssestName, Price, Category, AssestID FROM DigitalAssests WHERE Owner = %s"
        cursor.execute(query, (username, ))
        
        try:
            results = cursor.fetchall()
            # Transform the results into a suitable format, e.g., a list of dictionaries
            formatted_results = [{"asset": row[0], "name": row[1], "price": row[2], "category": row[3], "id": row[4]} for row in results]
            return formatted_results
        
        except Exception as query_error:

            return f"Error in query: {query_error}"
        
    except Exception as e:
        return {"error" : e}


