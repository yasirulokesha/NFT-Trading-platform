from pydantic import BaseModel

class LoginItem(BaseModel):
    username: str
    password: str
    
class RegisterDetails(BaseModel):
    email: str
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
    
class CurrentUser(BaseModel):
    username: str
    
class purchaseData(BaseModel):
    user: str
    asset_id : str
    asset_name: str
    price : str
    from_ : str
    