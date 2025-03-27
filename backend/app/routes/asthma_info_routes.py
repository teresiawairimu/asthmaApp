from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.asthma_information_model import AsthmaInformationModel, AsthmaInformationUpdateModel
from database.asthma_information_entry import AsthmaInformation

router = APIRouter()
asthmainfo_db = AsthmaInformation()

@router.post("/log")
async def log_asthmainfo(data: AsthmaInformationModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  print(data)
  return await asthmainfo_db.create_asthma_information(data, token)


@router.get("/")
async def retrieve_asthmainfo(token: Annotated[dict, Depends(verify_firebase_token)]):
  """""" 
  return await asthmainfo_db.get_asthma_information_by_user(token)

@router.put("/{asthmainfo_id}")
async def modify_asthmainfo(asthmainfo_id, data: AsthmaInformationUpdateModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """""" 
  print(data)
  return await asthmainfo_db.update_asthma_information(asthmainfo_id, data, token)