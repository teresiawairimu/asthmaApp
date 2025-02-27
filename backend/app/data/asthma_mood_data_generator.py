import sys
import os
import asyncio

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.models.mood_model import MoodState

user_ids = ["9dIA3BDqxbUQoRqZEq6rieiKLhu1", "HjbhpCO5U6b1dEANWMskvBM2f393", "IJug4o9NG7Y6h8Q6UwUyL3mmrK12", 
        "PsO0EPuDQ0gGIX5ctM7mQgApBcX2", "X3gH6Zzp3mZ08amOuNa9qsBVvqw1", "cPrutRkEcNRErfat90gDva6Ulfu2",
        "gljtDf52UOOoZvz8bKMNh5wCmFy2", "qucKrynDFGRKmHhgny8tIhxoXE42", "vZwUqlQCZhOvXoMAvELdgaw0EoJ2",
        "zWVkszpI1fchG79kSYCvNPAfEiS2"]
num_users = 10
mood_data = {}


