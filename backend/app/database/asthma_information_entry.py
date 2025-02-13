from firebase_config import db
from app.models.asthma_information_model import AsthmaInformationModel, AsthmaInformationUpdateModel
from typing import Annotated
from fastapi import Depends, HTTPException
from app.middleware.authentication_middleware import verify_firebase_token
from firebase_admin import firestore


class AsthmaInformation:
  """"""

  async def create_asthma_information(self, asthma_info_data: AsthmaInformationModel, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
    """"""

    try:
      asthma_info_dict = asthma_info_data.dict()
      asthma_info_ref = db.collection("asthmainfo").document()
      await asthma_info_ref.set({
        "user_id": user_id,
        "asthma_diagnosis": asthma_info_dict.get("asthma_diagnosis"),
        "severity_level": asthma_info_dict.get("severity_level", None),
        "smoker": asthma_info_dict.get("smoker", False),
        "triggers": asthma_info_dict.get("triggers", []),
        "custom_triggers": asthma_info_dict.get("custom_triggers", []),
        "medication_name": asthma_info_dict.get("medication_name", None),
        "medication_dosage": asthma_info_dict.get("medication_dosage", None),
        "medication_frequency": asthma_info_dict.get("medication_frequency", None),
        "medication_type": asthma_info_dict.get("medication_type", None),
        "created_at": firestore.FieldValue.serverTimestamp()
      })
      return {"status": "success"}
    except Exception as e:
      print(f"Error saving asthma information: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal error")
    
  async def get_asthma_information(self, asthma_info_data) -> AsthmaInformationModel:
    """"""

    try:
      asthma_info_id = asthma_info_data.get("asthma_info_id")
      asthma_info_ref = db.collection("asthmainfo").document(asthma_info_id)
      asthma_info_doc = await asthma_info_ref.get()

      if not asthma_info_doc:
        raise HTTPException(status_code=404, detail="Asthma information file not found")
      asthma_info_dict = asthma_info_doc.to_dict()
      return AsthmaInformationModel(**asthma_info_dict)
    except Exception as e:
      print(f"Error retrieving asthma information: {str(e)}")
      raise HTTPException(status_code=500, detail="Internal Error")
    

  async def update_asthma_information(self, asthma_info_data: AsthmaInformationUpdateModel, user_id: Annotated[str, Depends(verify_firebase_token)]) -> dict:
    """"""

    try:
      asthma_info_dict = asthma_info_data.dict()
      asthma_info_id = asthma_info_dict.get("asthma_info_id")
      if not asthma_info_id:
        raise HTTPException(status_code=400, detail="Missing asthma id")
      
      asthma_info_ref = db.collection("asthmainfo").document(asthma_info_id)
      asthmainfo = await asthma_info_ref.get()
      if not asthmainfo.exists or asthmainfo.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to edit the asthma information")
      
      await asthma_info_ref.update({
        "asthma_diagnosis": asthma_info_dict.get("asthma_diagnosis"),
        "severity_level": asthma_info_dict.get("severity_level"),
        "smoker": asthma_info_dict.get("smoker"),
        "triggers": asthma_info_dict.get("triggers"),
        "custom_triggers": asthma_info_dict.get("custom_triggers"),
        "medication_name": asthma_info_dict.get("medication_name"),
        "medication_dosage": asthma_info_dict.get("medication_dosage"),
        "medication_frequency": asthma_info_dict.get("medication_frequency"),
        "medication_type": asthma_info_dict.get("medication_type"),
        "updated_at": firestore.FieldValue.serverTimestamp()
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

      


