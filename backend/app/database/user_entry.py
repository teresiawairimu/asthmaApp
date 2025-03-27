from .firebase_config import db
from models.user_model import UserModel, UserUpdateModel
from datetime import datetime, timezone
from typing import Annotated
from fastapi import Depends, HTTPException
from middleware.authentication_middleware import verify_firebase_token
from firebase_admin import firestore



class User:
  """"""

  async def create_user(self, user_data: UserModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      user_dict = user_data.dict()
      #date_of_birth = user_dict.get("date_of_birth")
      #date_of_birth_timestamp = datetime.combine(date_of_birth, datetime.min.time()) if date_of_birth else None
      user_ref = db.collection("users").document(user_id)
      await user_ref.set(
        {
          "uid": user_id,
          "email": user_dict.get("email"),
          "display_name": user_dict.get("display_name", None),
          #"date_of_birth": date_of_birth_timestamp,
          "consent_signed": user_dict.get("consent_signed", False),
          "created_at": firestore.SERVER_TIMESTAMP
        }
      )

      return {"status": "success", "uid": user_id}
    except Exception as e:
      print(f"Error creating user: {str(e)}")
      raise HTTPException(status_code=500, detail="Failed to create user")
    
    

  async def update_user(self, user_data_update: UserUpdateModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      user_dict = user_data_update.dict()
     #date_of_birth = user_dict.get("date_of_birth")
      #date_of_birth_timestamp = datetime.combine(date_of_birth, datetime.min.time()) 
      #updated_at = user_dict.get("updated_at")
      #updated_at_timestamp = datetime.combine(updated_at, datetime.min.time()) 
      updated_at_timestamp = datetime.now(timezone.utc)
      user_ref = db.collection("users").document(user_id)
      await user_ref.update({
        "display_name": user_dict.get("display_name"),
        #"date_of_birth": date_of_birth_timestamp,
        "updated_at": updated_at_timestamp
        }
      )
      return {"status": "success", "uid": user_id}
    except Exception as e:
      print(f"Error updating user: {str(e)}")
      raise HTTPException(status_code=500, detail="Failed to update user")
  

  async def get_user(self, token) -> UserModel:
    """"""

    try:
      user_id = token["uid"]
      print("user_id", user_id)
      user_doc_ref = db.collection("users").document(user_id)
      user_doc = await user_doc_ref.get()
      if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")
      user_dict = user_doc.to_dict()
      print("user dictionary", user_dict)
      user_dict["created_at"] = user_dict["created_at"].date()
      return UserModel(**user_dict)
    except Exception as e:
      print(f"Error retrieving user: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")
    
  async def delete_user(self, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict | HTTPException:
    """"""

    try:
      await db.collection("users").document(user_id).delete()
      return {"status": "success"}
    except Exception as e:
      print(f"Error deleting user: {str(e)}")
      raise HTTPException(status_code=500, detail="failed to delete user")
    






