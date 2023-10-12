import mysql.connector

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "12345678",
    "database": "openTrade"
}

# Establish a database connection
connection = mysql.connector.connect(**db_config)

# Create a cursor to execute SQL queries
cursor = connection.cursor()