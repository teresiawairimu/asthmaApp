from pydantic import BaseModel
from typing import Optional
from enum import Enum
from datetime import datetime, date

class MoodState(Enum):
  """The class defines different mood levels"""

  STRESSED = "stressed"
  ANXIOUS = "anxious"
  CALM = "calm"
  IRRITABLE= "irritable"
  HAPPY = "happy"
  ENERGETIC = "energetic"
  SAD = "sad"
  TIRED = "tired"
  


class MoodModel(BaseModel):
  """The mood base model that define the patients daily moods"""

  mood_today: MoodState
  mood_date: datetime
  created_at: Optional[datetime] = None


class MoodUpdateModel(BaseModel):
  """The mood update model validates the user's mood updates"""

  mood_today: Optional[MoodState] = None
  update_at: Optional[datetime] = None



