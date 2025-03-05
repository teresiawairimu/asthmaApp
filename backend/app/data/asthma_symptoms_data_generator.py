import sys
import os
import asyncio
import random
from datetime import datetime, timedelta
from google.cloud.firestore_v1.base_query import FieldFilter


sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.models.symptoms_model import AsthmaSymptoms, AsthmaTriggers, SymptomSeverity, EnvironmentalFactors, TimePeriods, ActivityType, ActivityLevel
from app.models.asthma_information_model import AsthmaSeverity
from app.database.firebase_config import db
from app.models.mood_model import MoodState


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

mood_probabilities = {
  SymptomSeverity.SEVERE.value: {MoodState.STRESSED.value: 0.25, MoodState.ANXIOUS.value: 0.25, MoodState.TIRED.value: 0.20, MoodState.IRRITABLE.value: 0.15, MoodState.SAD.value: 0.10, MoodState.CALM.value: 0.03, MoodState.HAPPY.value: 0.01, MoodState.ENERGETIC.value: 0.01},
  SymptomSeverity.MODERATE.value: {MoodState.STRESSED.value: 0.15, MoodState.ANXIOUS.value: 0.15, MoodState.TIRED.value: 0.15, MoodState.IRRITABLE.value: 0.10, MoodState.SAD.value: 0.10, MoodState.CALM.value: 0.15, MoodState.HAPPY.value: 0.10, MoodState.ENERGETIC.value: 0.10},
  SymptomSeverity.MILD.value: {MoodState.STRESSED.value: 0.05, MoodState.ANXIOUS.value: 0.05, MoodState.TIRED.value: 0.10, MoodState.IRRITABLE.value: 0.05, MoodState.SAD.value: 0.05, MoodState.CALM.value: 0.30, MoodState.HAPPY.value: 0.25, MoodState.ENERGETIC.value: 0.15}, 
}

log_frequency_probability = {
     AsthmaSeverity.MILD.value: (0, 2),
     AsthmaSeverity.MODERATE.value: (3, 4),
     AsthmaSeverity.SEVERE.value: (5, 6)
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
  num_weeks = 4
  symptoms_data = {}
  mood_data = {}

  for info in asthma_info:
    #log_frequency = {"mild": 1, "moderate": 2, "severe": 3}.get(info["severity_level"], 0)

    for week in range(num_weeks):
      asthma_severity = info["severity_level"]
      days_to_log = random.choice(log_frequency_probability[asthma_severity])
      week_start = start_date + timedelta(weeks=week)
      log_days = random.sample(range(7), days_to_log)
      log_dates = [week_start + timedelta(days=day) for day in log_days]
      for day in log_dates:
        trigger = random.choice(info["triggers"]) if info["triggers"] else None
        symptoms = random.sample(asthma_triggers_map[AsthmaTriggers(trigger)], k=random.randint(1, 2)) if trigger else []
        severity_levels = [symptom_severity_map[s] for s in symptoms]
        max_severity = max(severity_levels, key=lambda x: ["mild", "moderate", "severe"].index(x.value)) if symptoms else None
        rescueinhaler_used = any(severity in [SymptomSeverity.MODERATE, SymptomSeverity.SEVERE] for severity in severity_levels)

        """mood data generation"""
        severity_enum = max_severity.value if max_severity else "mild"
        moods = list(mood_probabilities[severity_enum].keys())
        weights = list(mood_probabilities[severity_enum].values())
        selected_moods = random.choices(moods, weights=weights)[0]
        


        symptoms_data.update({
          "user_id": info["user_id"],
          "symptom_date": day,
          "time_periods": random.sample([time.value for time in TimePeriods], k=random.randint(1, 2)),
          "activity_level": random.choice([activity.value for activity in ActivityLevel]),
          "activity_type": random.sample([a.value for a in ActivityType], k=random.randint(0,2)),
          "symptoms": [symptom.value for symptom in symptoms],
          "symptoms_severity": max_severity.value if max_severity else None,
          "triggers": [trigger] if trigger else None,
          "rescueinhaler_used": rescueinhaler_used,
          "environmental_factors": random.sample([e.value for e in EnvironmentalFactors], k=random.randint(1, 2)),
          "created_at": day,
        })

        print(symptoms_data)


        mood_data.update({
          "user_id": info["user_id"],
          "mood_date": day,
          "mood": selected_moods,
          "created_at": day
        })

        print(mood_data)


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
          print(f"Error updating symptoms information: {str(e)}")

        try:
          mood_ref = db.collection("mood").document()
          await mood_ref.set({
            "user_id": mood_data.get("user_id"),
            "mood_date": mood_data.get("mood_date"),
            "mood": mood_data.get("mood"),
            "created_at": mood_data.get("created_at")
          })
          print(f"Successfully added mood data for user {mood_data.get("user_id")} to database")
        except Exception as e:
          print(f"Error updating mood information: {str(e)}")


if __name__ == "__main__":
  asyncio.run(generate_data())