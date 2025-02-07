from pydantic import BaseModel, Field, EmailStr, Field_validator 
from typing import Optional
from datetime import date, datetime

class UserModel(BaseModel):
  """The base user model

  Defines the common atrributes shared across different user-related models

  Attributes:
    uid (str): Firebase unique identifier
    email (str): The user's email address
    display_name (str): The user's display_name
    phone_number (str): The user's phonenumber
    date_of_birth (str): The user's date_of_birth
    height (int): The user's height
    weight (int): THe user's weight
    consent_signed (bool): The user's consent
    created_at: The timestamp added when stored in firestore
  """


  uid: str = Field(..., description="Firebase UID")
  email: EmailStr
  display_name: Optional[str] = None
  phone_number: Optional[str] = None
  date_of_birth: Optional[date] = None
  height: float = 0
  weight: float = 0
  consent_signed: bool = False
  created_at: Optional[datetime] = None

  @classmethod
  def from_firebase(cls, user):
    """Class method that creates a new instance of the UserBase class

    Args:
        cls (class): class itself
        user (obj) : Firebase user object
    Returns:
           obj: The return value. A pydantic UserBase object
    """


    return cls(
      uid=user.uid,
      email=user.email,
      display_name=user.display_name,
      phone_number=user.phone_number,
    )

  def to_dict(self):
    """The method converts the pydantic user object to a dictionary"""
    return self.model_dump()
  
class UserUpdateModel(BaseModel):
  """Model for updating user via PUT request"""

  display_name: Optional[str]
  phone_number: Optional[str]
  date_of_birth: Optional[date]
  height: int
  weight: int
  consent_signed: bool


