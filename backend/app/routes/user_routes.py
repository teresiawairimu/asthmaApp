from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.user_model import UserModel
from database.user_entry import User

router = APIRouter()
user_db = User()

@router.post("/register")
async def create_user(data: UserModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  #auth_header = request.headers.get("Authorization")
  #if not auth_header or not auth_header.startswith("Bearer "):
    #raise HTTPException(status_code=401)
  #token = auth_header.split(" ")[1]
  return await user_db.create_user(data, token)
 