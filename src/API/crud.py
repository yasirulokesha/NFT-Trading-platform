from sqlalchemy.orm import Session

import models, schemas

def get_user(db:Session, usernme: str):
    return db.query(models.User).filter(models.User.username == usernme).first()

def get_users(db:Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()