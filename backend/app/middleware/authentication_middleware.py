from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth
from typing import Annotated

security = HTTPBearer()

def verify_firebase_token(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)]):
  token = credentials.credentials
  try:
    decoded_token = auth.verify_id_token(token)
    user_id = decoded_token["uid"]
    return user_id
  except auth.ExpiredIdTokenError:
    raise HTTPException(status_code=401, detail="Id Token has expired")
  except auth.InvalidIdTokenError:
    raise HTTPException(status_code=401, detail="The token is invalid")
  except Exception:
    raise HTTPException(status_code=401, detail="Unauthorized Access")