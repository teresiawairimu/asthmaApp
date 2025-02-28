import sys
import os
import asyncio
import random
from datetime import datetime
from google.cloud.firestore_v1.base_query import FieldFilter

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.models.mood_model import MoodState
from app.models.symptoms_model import SymptomSeverity
from app.database.firebase_config import db

user_ids = ["9dIA3BDqxbUQoRqZEq6rieiKLhu1", "HjbhpCO5U6b1dEANWMskvBM2f393", "IJug4o9NG7Y6h8Q6UwUyL3mmrK12", 
        "PsO0EPuDQ0gGIX5ctM7mQgApBcX2", "X3gH6Zzp3mZ08amOuNa9qsBVvqw1", "cPrutRkEcNRErfat90gDva6Ulfu2",
        "gljtDf52UOOoZvz8bKMNh5wCmFy2", "qucKrynDFGRKmHhgny8tIhxoXE42", "vZwUqlQCZhOvXoMAvELdgaw0EoJ2",
        "zWVkszpI1fchG79kSYCvNPAfEiS2"]

mood_probabilities = {
  SymptomSeverity.SEVERE: {MoodState.STRESSED.value: 0.25, MoodState.ANXIOUS.value: 0.25, MoodState.TIRED.value: 0.20, MoodState.IRRITABLE.value: 0.15, MoodState.SAD.value: 0.10, MoodState.CALM.value: 0.03, MoodState.HAPPY.value: 0.01, MoodState.ENERGETIC.value: 0.01},
  SymptomSeverity.MODERATE: {MoodState.STRESSED.value: 0.15, MoodState.ANXIOUS.value: 0.15, MoodState.TIRED.value: 0.15, MoodState.IRRITABLE.value: 0.10, MoodState.SAD.value: 0.10, MoodState.CALM.value: 0.15, MoodState.HAPPY.value: 0.10, MoodState.ENERGETIC.value: 0.10},
  SymptomSeverity.MILD: {MoodState.STRESSED.value: 0.05, MoodState.ANXIOUS.value: 0.05, MoodState.TIRED.value: 0.10, MoodState.IRRITABLE.value: 0.05, MoodState.SAD.value: 0.05, MoodState.CALM.value: 0.30, MoodState.HAPPY.value: 0.25, MoodState.ENERGETIC.value: 0.15}, 
}

num_users = 10
#mood_data = {}

async def generate_data():
  """"""

  asthma_symptoms = []
  for user_id in user_ids:
    doc_ref = db.collection("symptoms").document(user_id)
    doc = await doc_ref.get()
    if doc.exists:
      asthma_symptoms.append(doc.to_dict())
    else:
      print("No document")

  start_date = datetime(2024, 1, 1)
  num_days = 10
  mood_data = {}

  for _ in range(len(user_ids)):
    """"""
    severity = asthma_symptoms[i]["symptoms_severity"]
    moods = list(mood_probabilities[severity].keys())
    weights = list(mood_probabilities[severity].values())
    selected_mood = random.choices(moods, weights=weights)[0]









  


