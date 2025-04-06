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

"""
@router.get("/")
async def retrieve_symptoms_by_user(token: Annotated[dict, Depends(verify_firebase_token)]):
  
  return await symptom_db.get_symptoms_by_user(token)


@router.get("/")
async def retrieve_symptoms_by_date(token: Annotated[dict, Depends(verify_firebase_token)], 
                                    x_symptom_date: str = Header(...)):
  print("retrieve date from headers:", x_symptom_date)
  try:
    parsed_date = datetime.strptime(x_symptom_date, "%Y-%m-%d")
  except ValueError:
    raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
  return await symptom_db.get_symptoms_by_date(parsed_date, token)


@router.get("/")
async def retrieve_symptoms_by_date(retrieve_date: str, token: Annotated[dict, Depends(verify_firebase_token)]):

  print("retrieve date from routes", retrieve_date)

  try:
    parsed_date = datetime.strptime(retrieve_date, "%Y-%m-%d")
  except ValueError:
    raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
  return await symptom_db.get_symptoms_by_date(parsed_date, token)
"""


@router.get("/")
async def retrieve_symptoms_by_date(retrieve_date: date, token: Annotated[dict, Depends(verify_firebase_token)]):

  print("retrieve date from routes", retrieve_date)
  return await symptom_db.get_symptoms_by_date(retrieve_date, token)

"""
@router.get("/")
async def retrieve_symptoms_by_date(retrieve_date: str):
    print("retrieve date from routes", retrieve_date)
    
    try:
        parsed_date = datetime.strptime(retrieve_date, "%Y-%m-%d")
        # Return just the date in a string format to avoid any serialization issues
        return {"received_date": retrieve_date, "parsed_date": parsed_date.isoformat()}
    except ValueError as e:
        print(f"Date parsing error: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
"""


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
        "content": "You are a friendly health assistant. Analyze the asthma symptom data and talk directly to the user in a warm, conversational tone. \
         Highlight key insights and helpful tips."
        },
      {"role": "user", "content": f"Asthma data {formatted_data}"}
    ]
  )
  #Keep the summary brief, personalized, and easy to understand.
       # Make it clear, well-structured, and easy to read. Use headings, bullet points, and keep it concise.
  #"Analyze this asthma symptom data and provide a concise summary with key insights."
  #model="gpt-3.5-turbo"   
  return {"summary": completion.choices[0].message.content}

@router.get("/stats/{month_range}")
async def retrieve_symptoms_by_month_range(month_range: str, token: Annotated[dict, Depends(verify_firebase_token)]):
  return await symptom_db.get_symptoms_by_month_range(token)



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




