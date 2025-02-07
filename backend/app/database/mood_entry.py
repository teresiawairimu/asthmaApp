from firebase_config import db
from app.models.user_model import MoodModel, MoodUpdateModel
from datetime import datetime
from typing import Annotated
from fastapi import Depends, HTTPException
from app.middleware.authentication_middleware import verify_firebase_token
from firebase_admin import firestore


class Mood:
  """"""

  async def create_mood(self, mood_data: MoodModel, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
    """"""

    try:
      mood_dict = mood_data.dict()
      mood_ref = db.collection("moods").document()
      await mood_ref.set({
        "user_id": user_id,
        "mood_today": mood_dict.get("mood_today"),
        "today": mood_dict.get("today"),
        "created_at": firestore.FieldValue.serverTimestamp()
      })
      return {"status": "success"}
    except Exception as e:
      print(f"Error saving mood: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal Error")
  
  async def update_mood(self, mood_data: MoodUpdateModel, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
    """"""

    try:
      mood_dict = mood_data.dict()
      mood_id = mood_dict.get("mood_id")
      if not mood_id:
        raise HTTPException(status_code=400, detail="Missing mood id")
      
      mood_ref = db.collection("moods").document(mood_id)
      mood = await mood_ref.get()
      if not mood.exists or mood.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this mood")
      
      await mood_ref.update({
        "mood_today": mood_dict.get("mood_today"),
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
      mood_ref = db.collection("moods").document(mood_id)
      mood_doc = await mood_ref.get()
      
      if not mood_doc.exists:
        raise HTTPException(status_code=404, detail="Mood file not found")
      mood_dict = mood_doc.to_dict()
      return MoodModel(**mood_dict)
    except Exception as e:
      print(f"Error retrieving mood: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")
  

  async def delete_mood(self, symptom_data, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
    """"""

    try: 
      symptom_id = symptom_data.get("symptom_id")
      if not symptom_id:
        raise HTTPException(status_code=400, detail="Missing symptom_id")
      
      symptom_ref = db.collection("symptoms").document(symptom_id)
      symptom = await symptom_ref.get()
      if not symptom.exists or symptom.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this symptom")
      
      await db.collection("symptoms").document(symptom_id).delete()
      return {"status": "success"}
    except Exception as e:
      print(f"Error deleting symptoms: {str(e)}")
      raise HTTPException(status_code=500, detail="Error deleting symptom data")
  

  
  
