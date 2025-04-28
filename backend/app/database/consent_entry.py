from .firebase_config import db
from models.consent_model import ConsentModel
from fastapi import HTTPException
from firebase_admin import firestore
from datetime import datetime, date, timezone, timedelta
from google.cloud.firestore_v1 import FieldFilter
from typing import Annotated, Optional

class Consent:
  """"""

  async def create_consent(self, consent_data: ConsentModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      consent_dict = consent_data.model_dump()
      consent_date = consent_dict.get("signed_date")
      if consent_date:
        consent_date_timestamp = consent_date.replace(hour=12, minute=0, second=0, microsecond=0, tzinfo=timezone.utc)
      else:
        consent_date_timestamp = None

      consent_ref = db.collection("consent").document()
      await consent_ref.set({
        "user_id": user_id,
        "signed": consent_dict.get("signed"),
        "signed_date": consent_date_timestamp,
        "created_at": firestore.SERVER_TIMESTAMP
      })
      return {"status": "success", "id": consent_ref.id}
    except Exception as e:
      print(f"Error saving consent: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal Error")
   

  async def get_consent(self, token: dict) -> Optional[ConsentModel]:
    """"""

    try:
      user_id = token["uid"]

      consent_docs = db.collection("consent") \
      .where(filter=FieldFilter("user_id", "==", user_id)) \
      .stream()

      async for doc in consent_docs:
        consent_data = doc.to_dict()
        print(f"consent data: {consent_data}")
        consent_data["id"] = doc.id
        return ConsentModel(**consent_data)

      return None  

    except Exception as e:
        print(f"Error fetching consent: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve consent data by date")
    

      