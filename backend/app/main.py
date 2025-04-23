from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
import os
from dotenv import load_dotenv
from routes import user_routes, mood_routes, symptoms_routes, asthma_info_routes, weather_routes, correlation_routes, symptoms_analysis_routes


load_dotenv()

client = OpenAI(
  api_key = os.getenv("OPENAI_API_KEY")
)



app = FastAPI()

origins = [
 "*"
]

app.add_middleware(
  CORSMiddleware,                       
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

#app.mount("analysis/static", StaticFiles(directory="static"), name="static")

app.include_router(user_routes.router, prefix="/api/users")
app.include_router(mood_routes.router, prefix="/api/mood")
app.include_router(symptoms_routes.router, prefix="/api/symptoms")
app.include_router(asthma_info_routes.router, prefix="/api/asthmainfo")
app.include_router(weather_routes.router, prefix="/api/weather")
app.include_router(correlation_routes.router, prefix="/api/correlation")
app.include_router(symptoms_analysis_routes.router, prefix="/api/analysis")

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)