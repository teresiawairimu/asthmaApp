from pydantic import BaseModel
from enum import Enum

class AsthmaSymptoms(Enum):
  """The class defines asthma symptoms"""

  COUGHING = "coughing"
  SHORTNESS_OF_BREATH = "shortness_of_breath"
  CHEST_TIGHTNESS =  "chest_tightness"
  WHEEZING = "wheezing"
  CHEST_PAIN = "chest_pain"
  FATIGUE = "fatigue"
  RAPID_BREATHING = "rapid_breathing"
  DIZZINESS = "dizziness"
  INCREASED_MUCUS = "increased_mucus"
  TROUBLE_SLEEPING =  "trouble_sleeping"

class SymptomsSEverity(Enum):
  """The class defines five symptoms' severity levels"""

  MILD = "mild"
  MILD_MODERATE = "mild_moderate"
  MODERATE = "moderate"
  MODERATE_SEVERE = "moderate_severe"
  SEVERE = "severe"
