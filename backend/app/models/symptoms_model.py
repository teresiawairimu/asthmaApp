from backend.app.models.asthma_information_model import AsthmaTriggers
from pydantic import BaseModel, Field
from datetime import date
from typing import List, Optional
from enum import Enum

class AsthmaSymptoms(Enum):
  """The class defines asthma symptoms"""

  COUGH = "cough"
  CHRONIC_COUGH = "chronic_cough"
  SHORTNESS_OF_BREATH = "shortness_of_breath"
  CHEST_TIGHTNESS =  "chest_tightness"
  WHEEZING = "wheezing"
  CHEST_PAIN = "chest_pain"
  FATIGUE = "fatigue"
  RAPID_BREATHING = "rapid_breathing"
  DIZZINESS = "dizziness"
  INCREASED_MUCUS = "increased_mucus"
  TROUBLE_SLEEPING =  "trouble_sleeping"
  WAKING_UP_EARLY = "waking_up_early"
  WAKING_UP_AT_NIGHT = "waking_up_at_night"
  DIFFICULTY_SPEAKING = "difficulty_speaking"
  


class SymptomSeverity(Enum):
  """The class defines five symptoms' severity levels"""

  MILD = "mild"
  MILD_MODERATE = "mild_moderate"
  MODERATE = "moderate"
  MODERATE_SEVERE = "moderate_severe"
  SEVERE = "severe"

class EnvironmentalFactors(Enum):
  """The class defines different environmental factors"""

  HIGH_POLLEN_LEVELS = "high_pollen_levels"
  COLD_WEATHER = "cold_weather"
  HIGH_HUMIDITY = "high_humidity"
  POOR_AIR_QUALITY = "poor_air_quality"

class TimePeriods(Enum):
  """The class defines different time periods"""

  MORNING = "morning"
  AFTERNOON = "afternoon"
  EVENING= "evening"
  NIGHT = "night"


class SymptomModel(BaseModel):
  """The class defines a pydation data model for symptoms tracking"""

  symptom_date: date
  time_periods: List[TimePeriods]
  symptoms: List[AsthmaSymptoms]
  symptoms_severity: SymptomSeverity
  duration: Optional[int] = Field(None, ge=0, le=1440, description="Duration in minutes")
  triggers: Optional[List[AsthmaTriggers]] = None
  medication_name: Optional[str] = None
  medication_dosage: Optional[str] = None
  environmental_factors: List[EnvironmentalFactors]
  journal_entry: Optional[str] = Field(None, min_length=1, max_length=2000, Description="Acitivity level")
  created_at: date


class SymptomUpdateModel(BaseModel):
  """The class defines the symptom entry basemodel update"""

  time_periods: Optional[List[TimePeriods]]
  symptoms: Optional[List[AsthmaSymptoms]]
  symptoms_severity: Optional[SymptomSeverity]
  duration: Optional[int] = Field(None, ge=0, le=1440)
  triggers: Optional[List[AsthmaTriggers]]
  medication_name: Optional[str]
  medication_dosage: Optional[str]
  environmental_factors: Optional[List[EnvironmentalFactors]]
  journal_entry: Optional[str] = Field(None, min_length=1, max_length=2000)


  


