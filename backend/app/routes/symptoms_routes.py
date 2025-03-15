from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.symptoms_model import DateRangeRequest, SymptomModel
from analysis.symptom_trends import SymptomTrends
from database.symptoms_entry import Symptom

router = APIRouter()
symptom_analysis = SymptomTrends()
symptom_db = Symptom()

@router.post("/log")
async def create_symptom(data: SymptomModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_db.create_symptom(data, token)

@router.get("/{symptom_id}")
async def get_symptom(symptom_id: str):
    return await symptom_db.get_symptom_by_id({"symptom_id": symptom_id})


@router.post("/")
async def get_symptoms(token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_db.get_symptoms(token)



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




