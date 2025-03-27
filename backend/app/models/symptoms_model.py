from models.asthma_information_model import AsthmaTriggers
from pydantic import BaseModel, Field
from datetime import datetime, date
from typing import List, Optional
from enum import Enum

class AsthmaSymptoms(Enum):
  """The class defines asthma symptoms"""

  COUGH = "cough"
  SHORTNESS_OF_BREATH = "shortness_of_breath"
  CHEST_TIGHTNESS =  "chest_tightness"
  WHEEZING = "wheezing"
  FATIGUE = "fatigue"
  TROUBLE_SLEEPING =  "trouble_sleeping"
  DIFFICULTY_SPEAKING = "difficulty_speaking"
  


class SymptomSeverity(Enum):
  """The class defines five symptoms' severity levels"""

  MILD = "mild"
  MODERATE = "moderate"
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

class ActivityLevel(Enum):
  """"""

  LOW = "low"
  MODERATE = "moderate"
  HIGH = "high"

class ActivityType(Enum):
  """"""

  WALKING = "walking"
  RUNNING = "running"
  CYCLING = "cycling"
  BASKETBALL = "basketball"
  SPORTS = "sports"
  WORKOUTS = "workouts"
  OTHERS = "others"

class SymptomModel(BaseModel):
  """The class defines a pydation data model for symptoms tracking"""

  id: Optional[str] = None
  symptom_date: datetime
  time_periods: Optional[List[TimePeriods]] = None
  activity_level: Optional[ActivityLevel] = None
  activity_type: Optional[List[ActivityType]] = None
  symptoms: List[AsthmaSymptoms] 
  symptoms_severity: Optional[SymptomSeverity] = None
  triggers: Optional[List[AsthmaTriggers]] = None
  rescueinhaler_used: Optional[bool] = False
  environmental_factors: Optional[List[EnvironmentalFactors]] = None
  created_at: Optional[datetime] = None


class SymptomUpdateModel(BaseModel):
  """The class defines the symptom entry basemodel update"""

  time_periods: Optional[List[TimePeriods]]
  activity_level: Optional[ActivityLevel]
  activity_type: Optional[List[ActivityType]]
  symptoms: Optional[List[AsthmaSymptoms]]
  symptoms_severity: Optional[SymptomSeverity]
  triggers: Optional[List[AsthmaTriggers]]
  rescueinhaler_used: Optional[bool] = False
  environmental_factors: Optional[List[EnvironmentalFactors]]
  updated_at: Optional[datetime] = None

class DateRangeRequest(BaseModel):
  start_date: date
  end_date: date


