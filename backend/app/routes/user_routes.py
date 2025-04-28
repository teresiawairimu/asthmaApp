from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.user_model import UserModel, UserUpdateModel
from database.user_entry import User

router = APIRouter()
user_db = User()

@router.post("/register")
async def create_user(data: UserModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  print(data)
  #auth_header = request.headers.get("Authorization")
  #if not auth_header or not auth_header.startswith("Bearer "):
    #raise HTTPException(status_code=401)
  #token = auth_header.split(" ")[1]
  return await user_db.create_user(data, token)


@router.get("/")
async def retrieve_user(token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await user_db.get_user(token)

@router.put("/{id}")
async def modify_user(data: UserUpdateModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  print(data)
  """"""
  return await user_db.update_user(data, token)

@router.delete("/{id}")
async def delete_user(id: str, token: Annotated[dict, Depends(verify_firebase_token)]):
    """Deletes a user by ID after verifying token ownership."""
    if not id:
        raise HTTPException(status_code=400, detail="User ID is required for deletion.")

    return await user_db.delete_user(id, token)


 