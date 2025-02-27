import sys
import os
import asyncio
import random
from datetime import datetime, timedelta
from google.cloud.firestore_v1.base_query import FieldFilter


sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.models.symptoms_model import AsthmaSymptoms, AsthmaTriggers, SymptomSeverity, EnvironmentalFactors, TimePeriods, ActivityType, ActivityLevel
from app.database.firebase_config import db


symptom_severity_map = {
  AsthmaSymptoms.CHEST_TIGHTNESS: SymptomSeverity.MODERATE,
  AsthmaSymptoms.COUGH: SymptomSeverity.MILD,
  AsthmaSymptoms.DIFFICULTY_SPEAKING: SymptomSeverity.MODERATE,
  AsthmaSymptoms.FATIGUE: SymptomSeverity.MILD,
  AsthmaSymptoms.SHORTNESS_OF_BREATH: SymptomSeverity.MODERATE,
  AsthmaSymptoms.TROUBLE_SLEEPING: SymptomSeverity.MILD,
  AsthmaSymptoms.WHEEZING: SymptomSeverity.MODERATE
}

asthma_triggers_map = {
  AsthmaTriggers.AIR_POLLUTION: [AsthmaSymptoms.SHORTNESS_OF_BREATH, AsthmaSymptoms.FATIGUE],
  AsthmaTriggers.ALLERGIES: [AsthmaSymptoms.COUGH, AsthmaSymptoms.WHEEZING, AsthmaSymptoms.TROUBLE_SLEEPING],
  AsthmaTriggers.COLD_AIR: [AsthmaSymptoms.WHEEZING, AsthmaSymptoms.CHEST_TIGHTNESS],
  AsthmaTriggers.CLEANING_PRODUCTS: [AsthmaSymptoms.COUGH, AsthmaSymptoms.SHORTNESS_OF_BREATH],
  AsthmaTriggers.DUST: [AsthmaSymptoms.COUGH, AsthmaSymptoms.CHEST_TIGHTNESS],
  AsthmaTriggers.EXERCISE: [AsthmaSymptoms.SHORTNESS_OF_BREATH, AsthmaSymptoms.WHEEZING],
  AsthmaTriggers.MOLD: [AsthmaSymptoms.WHEEZING, AsthmaSymptoms.SHORTNESS_OF_BREATH],
  AsthmaTriggers.POLLEN: [AsthmaSymptoms.COUGH, AsthmaSymptoms.WHEEZING],
  AsthmaTriggers.SMOKE: [AsthmaSymptoms.COUGH, AsthmaSymptoms.WHEEZING],
  AsthmaTriggers.STRESS: [AsthmaSymptoms.CHEST_TIGHTNESS, AsthmaSymptoms.FATIGUE],
  AsthmaTriggers.STRONG_ODORS: [AsthmaSymptoms.CHEST_TIGHTNESS, AsthmaSymptoms.FATIGUE],
  AsthmaTriggers.RESPIRATORY_INFECTION: [AsthmaSymptoms.WHEEZING, AsthmaSymptoms.DIFFICULTY_SPEAKING, AsthmaSymptoms.FATIGUE]
}

async def generate_data():
  asthma_info = []

  docs = (
    db.collection("asthmainfo")
    .where(filter=FieldFilter("asthma_diagnosis", "==", True))
    .stream()
  )

  async for doc in docs:
    asthma_info.append(doc.to_dict())

  #print(asthma_info)

  start_date = datetime(2024, 1, 1)
  num_days = 10
  symptoms_data = {}

  for info in asthma_info:
    log_frequency = {"mild": 1, "moderate": 2, "severe": 3}.get(info["severity_level"], 0)

    for day in range(num_days):
      date_logged = start_date + timedelta(days=day)

      for _ in range(log_frequency):
        trigger = random.choice(info["triggers"]) if info["triggers"] else None
        symptoms = random.sample(asthma_triggers_map[AsthmaTriggers(trigger)], k=random.randint(1, 2)) if trigger else []
        severity_levels = [symptom_severity_map[s] for s in symptoms]
        max_severity = max(severity_levels, key=lambda x: ["mild", "moderate", "severe"].index(x.value)) if symptoms else None
        rescueinhaler_used = any(severity in [SymptomSeverity.MODERATE, SymptomSeverity.SEVERE] for severity in severity_levels)

        symptoms_data.update({
          "user_id": info["user_id"],
          "symptom_date": date_logged.strftime("%Y-%m-%d"),
          "time_periods": random.sample([time.value for time in TimePeriods], k=random.randint(1, 2)),
          "activity_level": random.choice([activity.value for activity in ActivityLevel]),
          "activity_type": random.sample([a.value for a in ActivityType], k=random.randint(0,2)),
          "symptoms": [symptom.value for symptom in symptoms],
          "symptoms_severity": max_severity.value if max_severity else None,
          "triggers": [trigger] if trigger else None,
          "rescueinhaler_used": rescueinhaler_used,
          "environmental_factors": random.sample([e.value for e in EnvironmentalFactors], k=random.randint(1, 2)),
          "created_at": date_logged.strftime("%Y-%m-%d"),
        })

        print(symptoms_data)


        try:
          symptoms_ref = db.collection("symptoms").document()
          await symptoms_ref.set({
            "user_id": symptoms_data.get("user_id"),
            "symptom_date": symptoms_data.get("symptom_date"),
            "time_periods": symptoms_data.get("time_periods"),
            "activity_level": symptoms_data.get("activity_level"),
            "activity_type": symptoms_data.get("activity_type"),
            "symptoms": symptoms_data.get("symptoms"),
            "symptoms_severity": symptoms_data.get("symptoms_severity"),
            "triggers": symptoms_data.get("triggers"),
            "rescueinhaler_used": symptoms_data.get("rescueinhaler_used"),
            "environmental_factors": symptoms_data.get("environmental_factors"),
            "created_at": symptoms_data.get("created_at")
          })
          print(f"Successfully added symptoms data for user {symptoms_data.get("user_id")} to database")
        except Exception as e:
          print(f"Error updating asthma information: {str(e)}")




if __name__ == "__main__":
  asyncio.run(generate_data())