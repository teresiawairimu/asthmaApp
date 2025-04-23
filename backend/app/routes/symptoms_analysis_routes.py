import io
import base64
from typing import Annotated
from database.mood_entry import Mood
from database.symptoms_entry import Symptom
from datetime import datetime
import matplotlib.pyplot as plt
from fastapi.responses import StreamingResponse
from fastapi.responses import JSONResponse
from fastapi import APIRouter, FastAPI, Request, HTTPException, Depends
from middleware.authentication_middleware import verify_firebase_token

router = APIRouter()
symptom_db = Symptom()
mood_db = Mood()

@router.post("/severity/{month_range}")
async def get_severity_trend(month_range: str, token: Annotated[dict, Depends(verify_firebase_token)]):
  symptoms = await symptom_db.get_symptoms_by_month_range(token)

  if not symptoms:
    raise HTTPException(status_code=404, detail="No symptom data found.")


  severity_levels = {"mild": 0, "moderate": 1, "severe": 2}


  sorted_symptoms = sorted(symptoms, key=lambda x: x["symptom_date"])
  dates = [s["symptom_date"].date() for s in sorted_symptoms]

  y_values = [severity_levels.get(s["symptoms_severity"].value.lower(), 1) for s in sorted_symptoms]

  fig, ax = plt.subplots()
  ax.plot(dates, y_values, marker='o')
  ax.set_yticks([0, 1, 2])
  ax.set_yticklabels(["Mild", "Moderate", "Severe"])
  ax.set_xlabel("Dates")
  ax.set_ylabel("Symptom Severity")
  ax.set_title("Asthma Symptoms Severity Trends")
  fig.autofmt_xdate()


  buf = io.BytesIO()
  plt.savefig(buf, format="png")
  buf.seek(0)
  plt.close(fig)

  image_base64 = base64.b64encode(buf.read()).decode('utf-8')
  return JSONResponse(content={"image": image_base64})
