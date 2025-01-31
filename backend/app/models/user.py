from pydantic import BaseModel, Field, EmailStr, Field_validator 
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
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
  """


  uid: str = Field(..., description="Firebase UID", frozen=True)
  email: EmailStr = Field(frozen=True)
  display_name: Optional[str] = None
  phone_number: Optional[str] = None
  date_of_birth: Optional[str] = None
  height: Optional[int] = 0
  weight: Optional[int] = 0
  consent_signed: bool = False

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
      display_name=user.display_name or None,
      phone_number=user.phone_number or None
    )

  def to_dict(self):
    """The method converts the pydantic user object to a dictionary"""
    return self.model_dump()
  
  
class UserCreate(UserBase):
  """Model for creating a new user via POST request."""
  password: str = Field(repr=False)

class UserResponse(UserBase):
  """Model for retrieving user data."""
  created_at: Optional[datetime] = None

  @Field_validator("created_at", mode="before")
  @classmethod
  def convert_timestamp(cls, timestamp_value):
    """Class method that converts Firestore's timestamp to datetime

    Args:
        cls (class): class itself
        timestamp_value: Firestore's timestamp
    Returns:
          datetime: A datetime object if converstion is successful, otherwise None
    """
    if hasattr(timestamp_value, "timestamp"):
      return datetime.fromtimestamp(timestamp_value.timestamp())
    return timestamp_value

class UserUpdate(BaseModel):
  """Model for updating user via PUT request"""

  display_name: Optional[str] = None
  phone_number: Optional[str] = None
  consent_signed: bool

