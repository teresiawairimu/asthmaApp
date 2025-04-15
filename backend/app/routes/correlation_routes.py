from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from database.mood_entry import Mood
from database.symptoms_entry import Symptom
from datetime import datetime, date
from openai import OpenAI
from enum import Enum 
import json

router = APIRouter()
symptom_db = Symptom()
mood_db = Mood()


@router.post("/insights")
async def get_correlation(token: Annotated[dict, Depends(verify_firebase_token)]):
  print("FUNCTION ENTRY POINT ROUTE")
  symptom_data = await symptom_db.get_symptoms_by_month_range(token)
  mood_data = await mood_db.get_mood_by_month_range(token)
  
  print(f"symptom_data: {symptom_data}")
  print(f"mood_data: {mood_data}")

  class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
      if isinstance(obj, (datetime, date)):
        return obj.isoformat()
      if isinstance(obj, Enum):
        return obj.value
      return super().default(obj)

  formatted_symptom_data = json.dumps(symptom_data, cls=DateTimeEncoder)
  formatted_mood_data = json.dumps(mood_data, cls=DateTimeEncoder)

  client = OpenAI()
  completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
      {
        "role": "system", 
        "content": "You are a friendly health assistant that does not interract with the user directly. Analyze the asthma symptom data and mood data talk directly to the user in a warm, conversational tone. \
         compute Pearson correlation between symptom severity and mood \
         Output a brief summary (e.g., 'Strong negative correlation: -0.72') \
        Generate insights like: 'When mood is low, symptoms tend to increase'. \
        Give suggestions like: 'Consider relaxation exercises on high-symptom days'. \
         Overall, Highlight key insights and helpful tips."
        },
      {"role": "user", "content": f"symptom and mood data {formatted_symptom_data} {formatted_mood_data}"}
    ]
  )
   
  return {"correlation": completion.choices[0].message.content}