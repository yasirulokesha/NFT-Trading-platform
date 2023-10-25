from fastapi import FastAPI
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

import mysql.connector
from database import db_config 
from models import LoginItem, RegisterDetails, AssetUploadData, CurrentUser, purchaseData

SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

app = FastAPI()

origins = {
    "http://localhost",
    "http://localhost:3001",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)
    
# Login API
@app.post("/login")
async def user_login(loginitem: LoginItem):
    
    data = jsonable_encoder(loginitem)
    
    try:
        
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        
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


# Load the profile details
@app.post("/profile")
async def Profile_Details(User: CurrentUser):
    
    try:
         # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        
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
        return {"username" : results[1], "wallet": results[3], "balance": results[4], "email": results[0]}
    
    except:
        return {"error" : "Error load in Server"}

# Get all Assets for the preview
@app.get("/")
def Show_NFT():
    
     # Establish a database connection
    connection = mysql.connector.connect(**db_config)
        
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
    
# Get filtered by category    
@app.get("/{category}")
async def Filter(category: str):
    # Establish a database connection
    connection = mysql.connector.connect(**db_config)
    
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
 
# Get details about an asset   
@app.get("/details/")
async def Exports():
     # Establish a database connection
    connection = mysql.connector.connect(**db_config)
        
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
    
# Search from a keyword
@app.get("/search/")
async def Search(keyword: str):
     # Establish a database connection
    connection = mysql.connector.connect(**db_config)
        
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
    
# Add acccount to sql
@app.post("/add_account")
async def Add_Account(input: RegisterDetails):
    
     # Establish a database connection
    connection = mysql.connector.connect(**db_config)
    
    details = jsonable_encoder(input)
    
    # Get inputs from the front-end
    email = details["email"]
    username = details["username"]
    password = details["password"]
    wallet = details["wallet"]
    balance = details["balance"]
    
    try:
        
        cursor = connection.cursor()
        
        # Define the SQL query to retrieve data 
        query = "INSERT INTO userProfiles (email, username, password, walletNumber, walletBalance) VALUES (%s, %s, %s, %s, %s)"
        
        try:
            data = (email, username, password, wallet, balance)
        
            # Execute the SQL query
            cursor.execute(query, data)
            
            connection.commit()
        
        except mysql.connector.Error as err:
            return {"error": f"Error: {err}"}
        
        return "success";
            
    except:
        return {"error": "Error load in Server"}

# Upload assets
@app.post("/upload")
async def Upload_Assest(uploads: AssetUploadData):
    
     # Establish a database connection
    connection = mysql.connector.connect(**db_config)
        
    
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
        
        return {"msg":"uploaded!"};
            
    except:
        return {"error": "Error load in Server"}
    
# Get assets for loggedIn user
@app.get("/profile/feed/{username}")        
async def Feed(username: str):
    
     # Establish a database connection
    connection = mysql.connector.connect(**db_config)
        
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

@app.post("/purchase")
async def purchase(purchaseData : purchaseData):
    
    data = jsonable_encoder(purchaseData)
    
    # Establish a database connection
    connection = mysql.connector.connect(**db_config)
    
    new_owner = data['user']
    asset = data['asset_id']
    
    try:
        
        cursor = connection.cursor()

        try:
            # Define the SQL query to retrieve data 
            query = "INSERT INTO Transactions (AssestID, asset_name, Price, `from`, `to`) VALUES (%s, %s, %s, %s, %s)"
            data = (data['asset_id'], data['asset_name'], data['price'], data['from_'], data['user'])
            cursor.execute(query, data)
            connection.commit()
            
            
            Update_query = "UPDATE DigitalAssests SET `Owner` = %s WHERE AssestID = %s"
            values = (new_owner, asset )
            cursor.execute(Update_query, values)
            connection.commit()
            
            return {"msg":"uploaded!"}
            
        except mysql.connector.Error as err:
            return {"msg": f"Error: {err}"}
          
    except:
        return {"error": "Error load in Server"}

@app.post("/activity/")
async def Activity(user: str):
    # Establish a database connection
    connection = mysql.connector.connect(**db_config)
        
    cursor = connection.cursor()
    try:
        query = "SELECT `asset_name`, `Price`, `from`, `to` FROM `Transactions` WHERE `to` = %s OR `from` = %s"
        cursor.execute(query, (user, user))
        
        try:
            results = cursor.fetchall()
            # Transform the results into a suitable format, e.g., a list of dictionaries
            formatted_results = [jsonable_encoder({"asset_name": row[0], "price": row[1], "from": row[2], "to": row[3]} )for row in results]
            return formatted_results
        
        except Exception as query_error:
            return f"Error in query: {query_error}"
        
    except Exception as e:
        return {"error" : e}