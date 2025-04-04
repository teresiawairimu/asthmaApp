from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.mood_model import MoodModel
from database.mood_entry import Mood
from datetime import datetime, date

router = APIRouter()
mood_db = Mood()

@router.post("/log")
async def log_mood(data: MoodModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await mood_db.create_mood(data, token)


@router.get("/")
async def retrieve_mood_by_date(retrieve_date: date, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await mood_db.get_mood_by_date(retrieve_date, token)