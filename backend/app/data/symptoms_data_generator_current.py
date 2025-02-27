import pandas as pd
import random
import uuid
from datetime import datetime, timedelta
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from enum import Enum

# Enum definitions (reused from your model)
class AsthmaSymptoms(Enum):
    COUGH = "cough"
    SHORTNESS_OF_BREATH = "shortness_of_breath"
    CHEST_TIGHTNESS = "chest_tightness"
    WHEEZING = "wheezing"
    FATIGUE = "fatigue"
    TROUBLE_SLEEPING = "trouble_sleeping"
    DIFFICULTY_SPEAKING = "difficulty_speaking"

class SymptomSeverity(Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"

class EnvironmentalFactors(Enum):
    HIGH_POLLEN_LEVELS = "high_pollen_levels"
    COLD_WEATHER = "cold_weather"
    HIGH_HUMIDITY = "high_humidity"
    POOR_AIR_QUALITY = "poor_air_quality"

class TimePeriods(Enum):
    MORNING = "morning"
    AFTERNOON = "afternoon"
    EVENING = "evening"
    NIGHT = "night"

class ActivityLevel(Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"

class ActivityType(Enum):
    WALKING = "walking"
    RUNNING = "running"
    CYCLING = "cycling"
    SWIMMING = "swimming"
    SPORTS = "sports"
    WORKOUTS = "workouts"
    OTHERS = "others"

class AsthmaSeverity(Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"

class AsthmaTriggers(Enum):
    POLLEN = "pollen"
    DUST = "dust"
    MOLD = "mold"
    AIR_POLLUTION = "air_pollution"
    COLD_AIR = "cold_air"
    EXERCISE = "exercise"
    STRESS = "stress"
    SMOKE = "smoke"
    STRONG_ODORS = "strong_odors"
    CLEANING_PRODUCTS = "cleaning_products"
    RESPIRATORY_INFECTION = "respiratory_infection"
    ALLERGIES = "allergies"

class MedicationType(Enum):
    RESCUE = "rescue"
    CONTROLLER = "controller"
    BIOLOGICAL = "biological"

# Symptom severity mapping
symptom_severity_map = {
    AsthmaSymptoms.COUGH: SymptomSeverity.MILD,
    AsthmaSymptoms.SHORTNESS_OF_BREATH: SymptomSeverity.MODERATE,
    AsthmaSymptoms.CHEST_TIGHTNESS: SymptomSeverity.MODERATE,
    AsthmaSymptoms.WHEEZING: SymptomSeverity.MODERATE,
    AsthmaSymptoms.FATIGUE: SymptomSeverity.MILD,
    AsthmaSymptoms.TROUBLE_SLEEPING: SymptomSeverity.MILD,
    AsthmaSymptoms.DIFFICULTY_SPEAKING: SymptomSeverity.SEVERE,
}

# Asthma triggers mapping
asthma_triggers_map = {
    AsthmaTriggers.POLLEN: [AsthmaSymptoms.COUGH, AsthmaSymptoms.WHEEZING],
    AsthmaTriggers.DUST: [AsthmaSymptoms.COUGH, AsthmaSymptoms.CHEST_TIGHTNESS],
    AsthmaTriggers.MOLD: [AsthmaSymptoms.WHEEZING, AsthmaSymptoms.SHORTNESS_OF_BREATH],
    AsthmaTriggers.AIR_POLLUTION: [AsthmaSymptoms.SHORTNESS_OF_BREATH, AsthmaSymptoms.FATIGUE],
    AsthmaTriggers.COLD_AIR: [AsthmaSymptoms.WHEEZING, AsthmaSymptoms.CHEST_TIGHTNESS],
    AsthmaTriggers.EXERCISE: [AsthmaSymptoms.SHORTNESS_OF_BREATH, AsthmaSymptoms.WHEEZING],
    AsthmaTriggers.STRESS: [AsthmaSymptoms.CHEST_TIGHTNESS, AsthmaSymptoms.FATIGUE],
    AsthmaTriggers.SMOKE: [AsthmaSymptoms.COUGH, AsthmaSymptoms.WHEEZING],
    AsthmaTriggers.STRONG_ODORS: [AsthmaSymptoms.CHEST_TIGHTNESS, AsthmaSymptoms.FATIGUE],
    AsthmaTriggers.CLEANING_PRODUCTS: [AsthmaSymptoms.COUGH, AsthmaSymptoms.SHORTNESS_OF_BREATH],
    AsthmaTriggers.RESPIRATORY_INFECTION: [AsthmaSymptoms.WHEEZING, AsthmaSymptoms.DIFFICULTY_SPEAKING, AsthmaSymptoms.FATIGUE],
    AsthmaTriggers.ALLERGIES: [AsthmaSymptoms.COUGH, AsthmaSymptoms.WHEEZING, AsthmaSymptoms.TROUBLE_SLEEPING],
}

# Generate user asthma profiles
num_users = 5
users = []

for _ in range(num_users):
    user_id = str(uuid.uuid4())
    asthma_diagnosis = random.choice([True, False])
    severity_level = random.choice(list(AsthmaSeverity)) if asthma_diagnosis else None
    triggers = random.sample(list(AsthmaTriggers), k=random.randint(1, 3)) if asthma_diagnosis else None
    custom_triggers = random.sample(["perfume", "humidity", "pet dander"], k=random.randint(0, 2)) if asthma_diagnosis else None
    medication_type = random.sample(list(MedicationType)) if asthma_diagnosis else None
    created_at = datetime(2024, 1, 1).strftime("%Y-%m-%d")

    users.append({
        "user_id": user_id,
        "asthma_diagnosis": asthma_diagnosis,
        "severity_level": severity_level.value if severity_level else None,
        "triggers": [trigger.value for trigger in triggers] if triggers else None,
        "custom_triggers": custom_triggers,
        "medication_type": medication_type.value if medication_type else None,
        "created_at": created_at,
    })

# Generate symptom logs
start_date = datetime(2024, 1, 1)
num_days = 10
symptom_logs = []

for user in users:

    log_frequency = {"mild": 1, "moderate": 2, "severe": 3}.get(user["severity_level"], 0)

    for day in range(num_days):
        date_logged = start_date + timedelta(days=day)

        for _ in range(log_frequency):
            trigger = random.choice(user["triggers"]) if user["triggers"] else None
            symptoms = random.sample(asthma_triggers_map[AsthmaTriggers(trigger)], k=random.randint(1, 2)) if trigger else []
            severity_levels = [symptom_severity_map[s] for s in symptoms]
            max_severity = max(severity_levels, key=lambda x: ["mild", "moderate", "severe"].index(x.value)) if symptoms else None
            rescueinhaler_used = any(severity in [SymptomSeverity.MODERATE, SymptomSeverity.SEVERE] for severity in severity_levels)

            symptom_logs.append({
                "user_id": user["user_id"],
                "symptom_date": date_logged.strftime("%Y-%m-%d"),
                "time_periods": random.sample([t.value for t in TimePeriods], k=random.randint(1, 2)),
                "activity_level": random.choice([a.value for a in ActivityLevel]),
                "activity_type": random.sample([a.value for a in ActivityType], k=random.randint(0, 2)),
                "symptoms": [s.value for s in symptoms],
                "symptoms_severity": max_severity.value if max_severity else None,
                "triggers": [trigger] if trigger else None,
                "rescueinhaler_used": rescueinhaler_used,
                "environmental_factors": random.sample([e.value for e in EnvironmentalFactors], k=random.randint(1, 2)),
                "created_at": date_logged.strftime("%Y-%m-%d"),
            })

# Convert to DataFrame and display
df_users = pd.DataFrame(users)
df_symptom_logs = pd.DataFrame(symptom_logs)

 

df_symptom_logs.to_csv("symptom_data_one.csv", index=False)
df_users.to_csv("users_data_one.csv", index=False)