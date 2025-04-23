from fastapi import APIRouter, FastAPI, Request, Header, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.symptoms_model import DateRangeRequest, SymptomModel, SymptomUpdateModel
from analysis.symptom_trends import SymptomTrends
from database.symptoms_entry import Symptom
from datetime import datetime, date
from openai import OpenAI
from fastapi.responses import JSONResponse
import json
from fastapi.responses import Response
from utils.get_month_start_end import get_month_start_end

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
async def retrieve_symptoms_by_date(retrieve_date: date, token: Annotated[dict, Depends(verify_firebase_token)]):

  print("retrieve date from routes", retrieve_date)
  return await symptom_db.get_symptoms_by_date(retrieve_date, token)



@router.post("/summary")
async def get_summary(token: Annotated[dict, Depends(verify_firebase_token)]):
  print("FUNCTION ENTRY POINT ROUTE")
  asthma_data = await symptom_db.get_symptoms_by_date_range(token)
  print(f"asthma_data: {asthma_data}")

  class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
      if isinstance(obj, (datetime, date)):
        return obj.isoformat()
      return super().default(obj)

  formatted_data = json.dumps(asthma_data, cls=DateTimeEncoder)

  client = OpenAI()
  completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
      {
        "role": "system", 
        "content": "You are a friendly health assistant that does not interract with the user directly. Analyze the asthma symptom data and talk directly to the user in a warm, conversational tone. \
         Highlight key insights and helpful tips."
        },
      {"role": "user", "content": f"Asthma data {formatted_data}"}
    ]
  )
   
  return {"summary": completion.choices[0].message.content}

@router.get("/stats/{month_range}")
async def retrieve_symptoms_by_month_range(month_range: str, token: Annotated[dict, Depends(verify_firebase_token)]):
  return await symptom_db.get_symptoms_by_month_range(token)

@router.get("/calender/{month_range}")
async def retrieve_symptoms_by_current_month_range(month_range: str, token: Annotated[dict, Depends(verify_firebase_token)]):
  start, end = get_month_start_end(month_range)
  return await symptom_db.get_symptoms_by_current_month_range(token, start, end)



@router.put("/{symptom_id}")
async def modify_symptoms(symptom_id, data: SymptomUpdateModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await symptom_db.update_symptom(symptom_id, data, token)
