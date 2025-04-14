from fastapi import APIRouter, Query
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

weather_api_key = os.getenv("WEATHER_API_KEY")
base_url = os.getenv("WEATHER_API_BASE_URL")


@router.get("/")
async def get_weather():
  params = {
    "key": weather_api_key,
    "q": "Kalamazoo",
    "aqi": "yes"
  }
  async with httpx.AsyncClient() as client:
    response = await client.get(f"{base_url}/current.json", params=params)
    return response.json()