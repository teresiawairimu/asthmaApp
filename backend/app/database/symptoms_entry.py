from .firebase_config import db
from app.models.symptoms_model import SymptomModel, SymptomUpdateModel
from datetime import datetime, timezone, date, timedelta
from typing import Annotated, Optional
from fastapi import Depends, HTTPException
from app.middleware.authentication_middleware import verify_firebase_token
from firebase_admin import firestore
from google.cloud.firestore_v1 import FieldFilter
from utils.date_range import date_range
from utils.month_range import month_range
from utils.current_month_range import get_current_month_range
from fastapi.encoders import jsonable_encoder




class Symptom:
  """"""

  async def create_symptom(self, symptom_data: SymptomModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      symptom_dict = symptom_data.model_dump()
      symptom_date = symptom_dict.get("symptom_date")
      print("symptom_date to log", symptom_date)
      print(f"Type of symptom_date: {type(symptom_date)}")
      print(f"Value of symptom_date: {symptom_date}")
      if symptom_date:
        symptom_date_timestamp = symptom_date.replace(hour=12, minute=0, second=0, microsecond=0, tzinfo=timezone.utc)
      else:
        symptom_date_timestamp = None
      #datetime.combine(symptom_date, datetime.time(12, 0)).replace(tzinfo=timezone.utc)if symptom_date else None
      #datetime.min.time()) 
      print("symptom timestamp", symptom_date_timestamp)
      symptom_ref = db.collection("symptoms").document()
      symptom_dict["time_periods"] = [period.value for period in symptom_dict["time_periods"]]
      symptom_dict["activity_level"] = symptom_dict["activity_level"].value
      symptom_dict["activity_type"] = [type.value for type in symptom_dict["activity_type"]]
      symptom_dict["symptoms"] = [symptom.value for symptom in symptom_dict["symptoms"]]
      symptom_dict["symptoms_severity"] = symptom_dict["symptoms_severity"].value
      symptom_dict["triggers"] = [trigger.value for trigger in symptom_dict["triggers"]]
      symptom_dict["environmental_factors"] = [factor.value for factor in symptom_dict["environmental_factors"]]
      await symptom_ref.set({
        "user_id": user_id,
        "symptom_date": symptom_date_timestamp,
        "time_periods": symptom_dict.get("time_periods", []),
        "activity_level": symptom_dict.get("activity_level", None),
        "activity_type": symptom_dict.get("activity_type", []),
        "symptoms": symptom_dict.get("symptoms", []),
        "symptoms_severity": symptom_dict.get("symptoms_severity", None),
        "triggers": symptom_dict.get("triggers", []),
        "rescueinhaler_used": symptom_dict.get("rescueinhaler_used", False),
        "environmental_factors": symptom_dict.get("environmental_factors", []),
        "created_at": firestore.SERVER_TIMESTAMP
      })
      return {"status": "success", "id": symptom_ref.id}
    except Exception as e:
      print(f"Error storing symptom data: {str(e)}")
      raise HTTPException(status_code=500, detail="Failed to store symptom data")
    

  async def get_symptom_by_id(self, symptom_id: str) -> SymptomModel:
    """"""

    try:
      symptom_ref = db.collection("symptoms").document(symptom_id)
      symptom_doc = await symptom_ref.get()
      
      if not symptom_doc.exists:
        raise HTTPException(status_code=404, detail="Symptom not found")
      symptom_dict = symptom_doc.to_dict()
      return SymptomModel(**symptom_dict)
    except Exception as e:
      print(f"Error retrieving symptom data: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")
    

  
  async def get_symptoms_by_user(self, token: dict) -> list[SymptomModel]:
    """"""

    try:
      user_id = token["uid"]
      symptom_docs = (
        db.collection("symptoms")
        .where(filter=FieldFilter("user_id", "==", user_id))
        .stream()
      )
      
      if not symptom_docs:
        return []
      
      symptom_list = []
      async for doc in symptom_docs:
        symptom_data = doc.to_dict()
        symptom_data["id"] = doc.id
        symptom_model = SymptomModel(**symptom_data)
        symptom_list.append(symptom_model)
      print(symptom_list) 
      return symptom_list
       
    except Exception as e:
      print(f"Error retrieving symptom data: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")
    

    
  
  async def get_symptoms_by_date(self, retrieve_date: date, token: dict) -> Optional[SymptomModel]:
    print("PRINT: FUNCTION ENTRY POINT")
    try:
      user_id = token["uid"]
      print(f"this is the retrieve date: {retrieve_date}")

      
      start_datetime = datetime.combine(retrieve_date, datetime.min.time(), tzinfo=timezone.utc)
      end_datetime = start_datetime + timedelta(days=1)

      print(f"Query range: {start_datetime} to {end_datetime}")

      
      symptom_docs = db.collection("symptoms") \
        .where(filter=FieldFilter("user_id", "==", user_id)) \
        .where(filter=FieldFilter("symptom_date", ">=", start_datetime)) \
        .where(filter=FieldFilter("symptom_date", "<", end_datetime)) \
        .stream()

      async for doc in symptom_docs:
        symptom_data = doc.to_dict()
        symptom_data["id"] = doc.id
        return SymptomModel(**symptom_data)

      return None  

    except Exception as e:
        print(f"Error fetching symptoms: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve symptom data")
    

  async def get_symptoms_by_date_range(self, token: dict) -> list:
    try:
      user_id = token["uid"]

      start_date, end_date = date_range()

      start_datetime = datetime.combine(start_date, datetime.min.time(), tzinfo=timezone.utc)
      end_datetime = datetime.combine(end_date + timedelta(days=1), datetime.min.time(), tzinfo=timezone.utc)

      print(f"Query range: {start_datetime} to {end_datetime}")

      
      symptom_docs = db.collection("symptoms") \
        .where(filter=FieldFilter("user_id", "==", user_id)) \
        .where(filter=FieldFilter("symptom_date", ">=", start_datetime)) \
        .where(filter=FieldFilter("symptom_date", "<", end_datetime)) \
        .stream()

      symptom_list = []
      async for doc in symptom_docs:
        symptom_data = doc.to_dict()
        symptom_data["id"] = doc.id
        symptom_list.append(symptom_data)
      return symptom_list
    
    except Exception as e:
      print(f"Error fetching symptoms from the date range: {str(e)}")
      raise HTTPException(status_code=500, detail="Failed to retrieve symptom data from the date range")

      
  async def get_symptoms_by_month_range(self, token: dict) -> list:
    try:
      user_id = token["uid"]

      start_date, end_date = month_range()

      start_datetime = datetime.combine(start_date, datetime.min.time(), tzinfo=timezone.utc)
      end_datetime = datetime.combine(end_date + timedelta(days=1), datetime.min.time(), tzinfo=timezone.utc)

      print(f"Query range: {start_datetime} to {end_datetime}")

      
      symptom_docs = db.collection("symptoms") \
        .where(filter=FieldFilter("user_id", "==", user_id)) \
        .where(filter=FieldFilter("symptom_date", ">=", start_datetime)) \
        .where(filter=FieldFilter("symptom_date", "<", end_datetime)) \
        .stream()

      symptom_list = []
      async for doc in symptom_docs:
        symptom_data = doc.to_dict()
        symptom_data["id"] = doc.id
        model= SymptomModel(**symptom_data)
        symptom_list.append(model.model_dump())
        
      return symptom_list
    
    except Exception as e:
      print(f"Error fetching symptoms from the month range: {str(e)}")
      raise HTTPException(status_code=500, detail="Failed to retrieve symptom data from the month range")
    
  async def get_symptoms_by_current_month_range(self, token: dict) -> list:
    try:
      user_id = token["uid"]

      start_date, end_date = get_current_month_range()

      start_datetime = datetime.combine(start_date, datetime.min.time(), tzinfo=timezone.utc)
      end_datetime = datetime.combine(end_date + timedelta(days=1), datetime.min.time(), tzinfo=timezone.utc)

      print(f"Query range: {start_datetime} to {end_datetime}")

      
      symptom_docs = db.collection("symptoms") \
        .where(filter=FieldFilter("user_id", "==", user_id)) \
        .where(filter=FieldFilter("symptom_date", ">=", start_datetime)) \
        .where(filter=FieldFilter("symptom_date", "<", end_datetime)) \
        .stream()

      symptom_list = []
      async for doc in symptom_docs:
        symptom_data = doc.to_dict()
        symptom_data["id"] = doc.id
        model= SymptomModel(**symptom_data)
        symptom_list.append(model.model_dump())
        
      return symptom_list
    
    except Exception as e:
      print(f"Error fetching symptoms from the current month range: {str(e)}")
      raise HTTPException(status_code=500, detail="Failed to retrieve symptom data from the current month range")


    
    
  async def update_symptom(self, symptom_id, symptom_data: SymptomUpdateModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      symptom_dict = symptom_data.model_dump()
      updated_at_timestamp = datetime.now(timezone.utc)
      #symptom_id = symptom_dict.get("symptom_id")
      if not symptom_id:
        raise HTTPException(status_code=400, detail="Missing symptom id")
      
      symptom_ref = db.collection("symptoms").document(symptom_id)
      symptom = await symptom_ref.get()
      if not symptom.exists or symptom.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this symptom")
      
      symptom_dict["time_periods"] = [period.value for period in symptom_dict["time_periods"]]
      symptom_dict["activity_level"] = symptom_dict["activity_level"].value
      symptom_dict["activity_type"] = [type.value for type in symptom_dict["activity_type"]]
      symptom_dict["symptoms"] = [symptom.value for symptom in symptom_dict["symptoms"]]
      symptom_dict["symptoms_severity"] = symptom_dict["symptoms_severity"].value
      symptom_dict["triggers"] = [trigger.value for trigger in symptom_dict["triggers"]]
      symptom_dict["environmental_factors"] = [factor.value for factor in symptom_dict["environmental_factors"]]
      await symptom_ref.update({
        "time_periods": symptom_dict.get("time_periods"),
        "activity_level": symptom_dict.get("activity_level"),
        "activity_type": symptom_dict.get("activity_type"),
        "symptoms": symptom_dict.get("symptoms"),
        "symptoms_severity": symptom_dict.get("symptoms_severity"),
        "triggers": symptom_dict.get("triggers"), 
        "rescueinhaler_used": symptom_dict.get("rescueinhaler_used"),
        "environmental_factors": symptom_dict.get("environmental_factors"),
        "updated_at": updated_at_timestamp
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

