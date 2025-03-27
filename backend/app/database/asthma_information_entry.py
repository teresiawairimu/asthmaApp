from .firebase_config import db
from models.asthma_information_model import AsthmaInformationModel, AsthmaInformationUpdateModel
from typing import Annotated
from fastapi import Depends, HTTPException
from datetime import datetime, timezone
from middleware.authentication_middleware import verify_firebase_token
from firebase_admin import firestore
from google.cloud.firestore_v1 import FieldFilter


class AsthmaInformation:
  """"""

  async def create_asthma_information(self, asthma_info_data: AsthmaInformationModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      asthmainfo_dict = asthma_info_data.dict()
      asthmainfo_ref = db.collection("asthmainfo").document()
      asthmainfo_dict["severity_level"] = asthmainfo_dict["severity_level"].value
      asthmainfo_dict["triggers"] = [trigger.value for trigger in asthmainfo_dict["triggers"]]
      asthmainfo_dict["medication_type"] = [m.value for m in asthmainfo_dict["medication_type"]]
      await asthmainfo_ref.set({
        "user_id": user_id,
        "asthma_diagnosis": asthmainfo_dict.get("asthma_diagnosis"),
        "severity_level": asthmainfo_dict.get("severity_level", None),
        "triggers": asthmainfo_dict.get("triggers", []),
        "medication_type": asthmainfo_dict.get("medication_type", None),
        "created_at": firestore.SERVER_TIMESTAMP
      })
      return {"status": "success", "id": asthmainfo_ref.id}
    except Exception as e:
      print(f"Error saving asthma information: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal error")
    
  async def get_asthma_information_by_user(self, token: dict) -> AsthmaInformationModel:

    """"""

    try:
      user_id = token["uid"]
      print(user_id)
      asthmainfo_doc = (
        db.collection("asthmainfo")
        .where(filter=FieldFilter("user_id", "==", user_id))
        .limit(1)
        .stream()
      )
      async for d in asthmainfo_doc:
        asthmainfo_dict = d.to_dict()
        print("asthma_info", asthmainfo_dict)
        asthmainfo_dict["id"] = d.id
        print("newasthmaionfo", asthmainfo_dict)
        asthmainfo_dict["created_at"] = asthmainfo_dict["created_at"].date()
        return AsthmaInformationModel(**asthmainfo_dict)
    except Exception as e:
      print(f"Error retrieving asthmainfo: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal server error")

    

  async def update_asthma_information(self, asthmainfo_id, asthmainfo_data: AsthmaInformationUpdateModel, token: dict) -> dict:
    """"""

    try:
      user_id = token["uid"]
      asthmainfo_dict = asthmainfo_data.dict()
      #asthma_info_id = asthma_info_dict.get("asthma_info_id")
      #updated_at = asthmainfo_dict.get("updated_at")
      #updated_at_timestamp = datetime.combine(updated_at, datetime.min.time())
      updated_at_timestamp = datetime.now(timezone.utc)
      if not asthmainfo_id:
        raise HTTPException(status_code=400, detail="Missing asthma id")
      
      asthmainfo_ref = db.collection("asthmainfo").document(asthmainfo_id)
      asthmainfo = await asthmainfo_ref.get()
      if not asthmainfo.exists or asthmainfo.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to edit the asthma information")
      
      asthmainfo_dict["severity_level"] = asthmainfo_dict["severity_level"].value
      asthmainfo_dict["triggers"] = [trigger.value for trigger in asthmainfo_dict["triggers"]]
      asthmainfo_dict["medication_type"] = [m.value for m in asthmainfo_dict["medication_type"]]
      await asthmainfo_ref.update({
        "asthma_diagnosis": asthmainfo_dict.get("asthma_diagnosis"),
        "severity_level": asthmainfo_dict.get("severity_level"),
        "triggers": asthmainfo_dict.get("triggers"),
        "medication_type": asthmainfo_dict.get("medication_type"),
        "updated_at": updated_at_timestamp
      })
      return {"status": "success"}
    except Exception as e:
      print(f"Error updating asthma information data: {str(e)}")
      raise HTTPException(status_code=500, detail="failed to update asthma information data")
  
  async def delete_asthma_information(self, asthma_info_data, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
    """"""

    try: 
      asthma_info_id = asthma_info_data.get("asthma_info_id")
      if not asthma_info_id:
        raise HTTPException(status_code=400, detail="Missing asthma_info_id")
      
      asthma_info_ref = db.collection("asthmainfo").document(asthma_info_id)
      asthma_info = await asthma_info_ref.get()
      if not asthma_info.exists or asthma_info.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this information")
      
      await db.collection("asthmainfo").document(asthma_info_id).delete()
      return {"status": "success"}
    except Exception as e:
      print(f"Error deleting asthma information: {str(e)}")
      raise HTTPException(status_code=500, detail="Error deleting asthma information data")

      


