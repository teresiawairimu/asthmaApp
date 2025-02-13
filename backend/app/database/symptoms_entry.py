from firebase_config import db
from app.models.symptoms_model import SymptomModel, SymptomUpdateModel
from datetime import datetime
from typing import Annotated
from fastapi import Depends, HTTPException
from app.middleware.authentication_middleware import verify_firebase_token
from firebase_admin import firestore

class Symptom:
  """"""

  async def create_symptom(self, symptom_data: SymptomModel, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
    """"""

    try:
      symptom_dict = symptom_data.dict()
      symptom_date = symptom_dict.get("symptom_date")
      symptom_date_timestamp = datetime.combine(symptom_date, datetime.min.time()) if symptom_date else None
      symptom_ref = db.collection("symptoms").document()
      await symptom_ref.set({
        "user_id": user_id,
        "symptom_date": symptom_date_timestamp,
        "time_periods": symptom_dict.get("time_periods", []),
        "activity_level": symptom_dict.get("activity_level"),
        "activity_type": symptom_dict.get("activity_type", []),
        "symptoms": symptom_dict.get("symptoms", []),
        "symptoms_severity": symptom_dict.get("symptoms_severity"),
        "duration": symptom_dict.get("duration", None),
        "triggers": symptom_dict.get("triggers", []),
        "medicine_name": symptom_dict.get("medicine_name", None),
        "medicine_dosage": symptom_dict.get("medicine_dosage", None),
        "environmental_factors": symptom_dict.get("environmental_factors", []),
        "created_at": firestore.FieldValue.serverTimestamp()
      })
      return {"status": "success"}
    except Exception as e:
      print(f"Error storing symptom: {str(e)}")
      raise HTTPException(status_code=500, detail="Failed to store symptom data")
    

  async def get_symptom(self, symptom_data) -> SymptomModel:
    """"""

    try:
      symptom_id = symptom_data.get("symptom_id")
      symptom_ref = db.collection("symptoms").document(symptom_id)
      symptom_doc = await symptom_ref.get()
      
      if not symptom_doc.exists:
        raise HTTPException(status_code=404, detail="Symptom file not found")
      symptom_dict = symptom_doc.to_dict()
      return SymptomModel(**symptom_dict)
    except Exception as e:
      print(f"Error retrieving user: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")
    
  async def update_symptom(self, symptom_data: SymptomUpdateModel, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
    """"""

    try:
      symptom_dict = symptom_data.dict()
      symptom_id = symptom_dict.get("symptom_id")
      if not symptom_id:
        raise HTTPException(status_code=400, detail="Missing symptom id")
      
      symptom_ref = db.collection("symptoms").document(symptom_id)
      symptom = await symptom_ref.get()
      if not symptom.exists or symptom.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this symptom")
      
      await symptom_ref.update({
        "time_periods": symptom_dict.get("time_periods"),
        "activity_level": symptom_dict.get("activity_level"),
        "activity_type": symptom_dict.get("activity_type"),
        "symptoms": symptom_dict.get("symptoms"),
        "symptoms_recovery": symptom_dict.get("symptoms_recovery"),
        "duration": symptom_dict.get("duration"),
        "triggers": symptom_dict.get("triggers"), 
        "medicine_name": symptom_dict.get("medicine_name"),
        "medicine_dosage": symptom_dict.get("medicine_dosage"),
        "environmental_factors": symptom_dict.get("environmental_factors"),
        "updated_at": firestore.FieldValue.serverTimestamp()
      })
      return {"status": "success"}
    except Exception as e:
      print(f"Error updating symptoms: {str(e)}")
      raise HTTPException(status_code=500, detail="failed to update symptom data")
  

  async def delete_symptom(self, symptom_data, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
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

