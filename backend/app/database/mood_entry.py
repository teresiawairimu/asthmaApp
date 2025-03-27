from .firebase_config import db
from models.mood_model import MoodModel, MoodUpdateModel
from typing import Annotated
from fastapi import HTTPException
from firebase_admin import firestore
from datetime import datetime, date
from utils.date_parser import parse_date_string
from google.cloud.firestore_v1 import FieldFilter




class Mood:
  """"""

  async def create_mood(self, mood_data: MoodModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      mood_dict = mood_data.dict()
      mood_ref = db.collection("mood").document()
      await mood_ref.set({
        "user_id": user_id,
        "mood_today": mood_dict.get("mood_today"),
        "mood_date": mood_dict.get("today"),
        "created_at": firestore.SERVER_TIMESTAMP
      })
      return {"status": "success"}
    except Exception as e:
      print(f"Error saving mood: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal Error")
  
  async def update_mood(self, mood_data: MoodUpdateModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      mood_dict = mood_data.dict()
      mood_id = mood_dict.get("mood_id")
      if not mood_id:
        raise HTTPException(status_code=400, detail="Missing mood id")
      
      mood_ref = db.collection("mood").document(mood_id)
      mood = await mood_ref.get()
      if not mood.exists or mood.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this mood")
      
      await mood_ref.update({
        "mood": mood_dict.get("mood"),
        "updated_at": firestore.FieldValue.serverTimestamp()
      })
      return {"status": "success"}
    except Exception as e:
      print(f"Error updating mood: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")
    
  
  async def get_mood(self, mood_data) -> MoodModel:
    """"""

    try:
      mood_id = mood_data.get("mood_id")
      mood_ref = db.collection("mood").document(mood_id)
      mood_doc = await mood_ref.get()
      
      if not mood_doc.exists:
        raise HTTPException(status_code=404, detail="Mood file not found")
      mood_dict = mood_doc.to_dict()
      return MoodModel(**mood_dict)
    except Exception as e:
      print(f"Error retrieving mood: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")
    

  async def get_mood_by_date(self, retrieve_date: date, token: dict) -> MoodModel:
    """"""

    try:
      user_id = token["uid"]
      mood_data = None

      mood_doc = (
        db.collection("mood")
        .where(filter=FieldFilter("user_id", "==", user_id))
        .limit(1)
        .stream()
      )
      
      #target_date = retrieve_date.date()

      async for doc in mood_doc:
        mood_data = doc.to_dict()
        mood_date = mood_data.get("mood_date")
        if isinstance(mood_date, str):
          try:
            parsed_date = parse_date_string(mood_date)
            mood_date_only = parsed_date.date()
          except Exception as e:
            print(f"Error parsing date string '{mood_date}': {str(e)}")
            continue
        elif hasattr(mood_date, "date"):
          mood_date_only = mood_date.date()
        else:
          print(f"Unrecognized date format: {mood_date}")
          continue

        if mood_date_only == retrieve_date: 
          mood_data["id"] = doc.id
          return MoodModel(**mood_data)
        
      if mood_data is None:
        return None
       
    except Exception as e:
      print(f"Error retrieving mood data by date: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")
  

  async def delete_mood(self, mood_data) -> dict:
    """"""

    try:
      mood_id = mood_data.get("mood_id")
      if not mood_id:
        raise HTTPException(status_code=400, detail="Missing mood_id")
      
      mood_ref = db.collection("mood").document(mood_id)
      mood = await mood_ref.get()
      if not mood.exists or mood.to_dict().get("mood_id") != mood_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this mood")
      
      await db.collection("mood").document(mood_id).delete()
      return {"status": "success"}
    except Exception as e:
      print(f"Error deleting mood: {str(e)}")
      raise HTTPException(status_code=500, detail="Error deleting mood data")
  

  
  
