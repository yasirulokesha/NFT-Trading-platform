from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

@app.get("/")
async def funcTest1():
    return "Hello, this is fastAPI data"