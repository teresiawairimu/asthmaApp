from pydantic import BaseModel
from enum import Enum
from typing import List, Optional

class AsthmaSeverity(Enum):
  """The class defines enumeration for asthma severity"""

  MILD = "mild"
  MODERATE = "moderate"
  SEVERE = "severe"

class AsthmaTriggers(Enum):
  """The class defines enumeration for asthma triggers"""

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
  """The class defines enumeration for medicine types"""

  RESCUE = "rescue"
  CONTROLLER = "controller"
  BIOLOGICAL = "biological"

class MedicationFrequency(Enum):
  """The class defines medication frequency"""

  AS_NEEDED = "as_needed"
  DAILY = "daily"
  TWICE_DAILY = "twice_daily"
  WEEKLY = "weekly"
  MONTHLY = "monthly"


class MedicationInfo(BaseModel):
  """The base medication information model"""
  
  name: str
  dosage: str
  frequency: MedicationFrequency
  medication_type: MedicationType
  

class AsthmaInformationBase(BaseModel):
  """The base asthma information model

  Defines the common attributes shared across different asthma_information related models.
  """

  severity_level: AsthmaSeverity
  triggers: List[AsthmaTriggers]
  custom_triggers: Optional[List[str]] = None
  medications= List[MedicationInfo]



