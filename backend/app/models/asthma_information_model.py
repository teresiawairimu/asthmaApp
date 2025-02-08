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


class AsthmaInformationModel(BaseModel):
  """The base asthma information model

  Defines the common attributes shared across different asthma_information related models.
  """

  severity_level: Optional[AsthmaSeverity] = None
  triggers: Optional[List[AsthmaTriggers]] = None
  custom_triggers: Optional[List[str]] = None
  medication_name: Optional[str] = None
  medication_dosage: Optional[str] = None
  medication_frequency: Optional[MedicationFrequency] = None
  medication_type: Optional[MedicationType] = None

 

class AsthmaInformationUpdateModel(BaseModel):
  """THe class defines which fields can be updated and which ones are optional"""

  severity_level: Optional[AsthmaSeverity] = None
  triggers: Optional[List[AsthmaTriggers]] = None
  custom_triggers: Optional[List[str]] = None
  medication_name: Optional[str] = None
  medication_dosage: Optional[str] = None
  medication_frequency: Optional[MedicationFrequency] = None
  medication_type: Optional[MedicationType] =  None


class AsthmaInformationResponse(BaseModel):
  """The class defines which fields can be returned"""

  severity_level: AsthmaSeverity
  triggers: List[AsthmaTriggers]
  custom_triggers: List[str]


class MedicationInfoResponse(BaseModel):
  """The class defines which fields can be returned"""

  name: str
  dosage: str
  frequency: MedicationFrequency
  medication_type: MedicationType