from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.symptoms_model import DateRangeRequest, SymptomModel, SymptomUpdateModel
from analysis.symptom_trends import SymptomTrends
from database.symptoms_entry import Symptom
from datetime import datetime

router = APIRouter()
symptom_analysis = SymptomTrends()
symptom_db = Symptom()

@router.post("/log")
async def log_symptom(data: SymptomModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_db.create_symptom(data, token)

@router.get("/{symptom_id}")
async def get_symptom(symptom_id: str):
    return await symptom_db.get_symptom_by_id({"symptom_id": symptom_id})


@router.get("/")
async def retrieve_symptoms_by_user(token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_db.get_symptoms_by_user(token)

@router.get("/")
async def retrieve_symptoms_by_date(retrieve_date, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_db.get_symptoms_by_date(retrieve_date, token)


@router.put("/{symptom_id}")
async def modify_symptoms(symptom_id, data: SymptomUpdateModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_db.update_symptom(symptom_id, data, token)



@router.post("/frequency_trend")
async def create_symptom_frequency_trend(data: DateRangeRequest, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_analysis.create_frequency_trend(data, token)

@router.post("/severity_trend")
async def create_symptom_frequency_trend(data: DateRangeRequest, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_analysis.create_severity_trend(data, token)

@router.post("/correlation_trend")
async def create_symptom_correlation_trend(data: DateRangeRequest, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_analysis.create_correlation_trend(data, token)




