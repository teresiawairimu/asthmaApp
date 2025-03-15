from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes import user_routes, mood_routes, symptoms_routes



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

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(user_routes.router, prefix="/api/users")
app.include_router(mood_routes.router, prefix="/api/mood")
app.include_router(symptoms_routes.router, prefix="/api/symptoms")

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=9000)