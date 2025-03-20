from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from typing import Annotated
from middleware.authentication_middleware import verify_firebase_token
from models.mood_model import MoodModel
from database.mood_entry import Mood

router = APIRouter()
mood_db = Mood()

@router.post("/log")
async def create_mood(data: MoodModel, token: Annotated[dict, Depends(verify_firebase_token)]):
  """"""
  return await mood_db.create_mood(data, token)