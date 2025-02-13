import pandas as pd
import random
import uuid
from datetime import datetime, timedelta
from enum import Enum


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

class AsthmaTriggers(Enum):
    POLLEN = "pollen"
    DUST = "dust"
    MOLD = "mold"
    AIR_POLLUTION = "air_pollution"
    COLD_AIR = "cold_air"
    EXERCISE = "exercise"
    STRESS = "stress"
    SMOKE = "smoke"

class EnvironmentalFactors(Enum):
    HIGH_POLLEN_LEVELS = "high_pollen_levels"
    COLD_WEATHER = "cold_weather"
    HIGH_HUMIDITY = "high_humidity"
    POOR_AIR_QUALITY = "poor_air_quality"


test_user_ids = [str(uuid.uuid4()) for _ in range(20)] 


start_date = datetime(2024, 1, 1)


mild_users = test_user_ids[:10] 
moderate_users = test_user_ids[10:16]
severe_users = test_user_ids[16:]


symptom_data = []
num_days = 90 
for day in range(num_days):
    date = start_date + timedelta(days=day)
    
    for user in test_user_ids:
        log_times = 1 
        if user in moderate_users:
            log_times = 2 
        elif user in severe_users:
            log_times = 3 
        
        for _ in range(log_times):
            entry = {
                "user_id": user,
                "symptom_date": date.strftime("%Y-%m-%d"),
                "time_periods": [random.choice(list(TimePeriods)).value],
                "activity_level": random.choice(list(ActivityLevel)).value,
                "activity_type": [random.choice(list(ActivityType)).value],
                "symptoms": [random.choice(list(AsthmaSymptoms)).value],
                "symptoms_severity": random.choice(list(SymptomSeverity)).value,
                "duration": random.randint(5, 90),
                "triggers": [random.choice(list(AsthmaTriggers)).value],
                "medicine_name": random.choice(["Albuterol", "Budesonide", "Montelukast", None]),
                "medicine_dosage": random.choice(["1 puff", "2 puffs", "5mg", None]),
                "environmental_factors": [random.choice(list(EnvironmentalFactors)).value],
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
            symptom_data.append(entry)


df_symptoms = pd.DataFrame(symptom_data)


