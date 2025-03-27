from enum import Enum
from pydantic import BaseModel, Field, EmailStr 
from typing import Optional
from datetime import date


class UserModel(BaseModel):
  """The base user model

  Defines the common atrributes shared across different user-related models

  Attributes:
    uid (str): Firebase unique identifier
    email (str): The user's email address  
    date_of_birth (str): The user's date_of_birth
    consent_signed (bool): The user's consent
    created_at: The timestamp added when stored in firestore
  """


  uid: Optional[str] = Field(None, description="Firebase UID")
  email: EmailStr
  display_name: Optional[str] = None
  consent_signed: bool = False
  created_at: Optional[date] = None

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
    )

  def to_dict(self):
    """The method converts the pydantic user object to a dictionary"""
    return self.model_dump()
  
class UserUpdateModel(BaseModel):
  """Model for updating user via PUT request"""

  display_name: Optional[str]
  updated_at: Optional[date] = None



