from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.mood_model import MoodModel, MoodUpdateModel
from database.mood_entry import Mood
from datetime import datetime, date
from openai import OpenAI
from utils.get_month_start_end import get_month_start_end

router = APIRouter()
mood_db = Mood()

@router.post("/log")
async def log_mood(data: MoodModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await mood_db.create_mood(data, token)


@router.get("/")
async def retrieve_mood_by_date(retrieve_date: date, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  print("retrieve date from mood routes", retrieve_date)
  return await mood_db.get_mood_by_date(retrieve_date, token)
  

@router.get("/stats/{month_range}")
async def retrieve_mood_by_month_range(month_range: str, token: Annotated[dict, Depends(verify_firebase_token)]):
  return await mood_db.get_mood_by_month_range(token)


@router.get("/calender/{month_range}")
async def retrieve_mood_by_current_month_range(month_range: str, token: Annotated[dict, Depends(verify_firebase_token)]):
  start, end = get_month_start_end(month_range)
  return await mood_db.get_mood_by_current_month_range(token, start, end)

@router.put("/{mood_id}")
async def modify_mood(mood_id, data: MoodUpdateModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await mood_db.update_mood(mood_id, data, token)
