from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.consent_model import ConsentModel
from database.consent_entry import Consent
from datetime import datetime, date

router = APIRouter()
consent_db = Consent()

@router.post("/log")
async def log_consent(data: ConsentModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await consent_db.create_consent(data, token)

@router.get("/")
async def retrieve_consent(token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await consent_db.get_consent(token)