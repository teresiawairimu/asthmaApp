from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ConsentModel(BaseModel):
  """The consent base model that define the user's consent"""

  signed: Optional[bool] = False
  signed_date: datetime
  created_at: Optional[datetime] = None

