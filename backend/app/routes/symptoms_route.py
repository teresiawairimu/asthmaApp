from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.symptoms_model import DateRangeRequest
from analysis.symptom_trends import SymptomTrends

router = APIRouter()
symptom_analysis = SymptomTrends()

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


