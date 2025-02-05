from pydantic import BaseModel
from typing import Optional
from enum import Enum

class MoodLevels(Enum):
  """The class defines different mood levels"""

  STRESSED = "stressed"
  ANXIOUS = "anxious"
  CALM = "calm"
  IRRITABLE= "irritable"
  HAPPY = "happy"
  ENERGETIC = "energetic"
  SAD = "sad"
  DEPRESSED = "depressed"
  TIRED = "tired"
  FATIGUED = "fatigued"
  FEAR = "fear"
  PANIC = "panic"


class Mood(BaseModel):
  """The mood base model that define the patients daily moods"""

  mood_today: MoodLevels


class MoodUpdate(BaseModel):
  """The mood update model validates the user's mood updates"""

  mood_today: Optional[MoodLevels]


