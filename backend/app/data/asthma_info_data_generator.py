import random
from datetime import datetime, timezone
import sys
import os
import asyncio



sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.models.asthma_information_model import AsthmaSeverity, AsthmaTriggers, MedicationType
from app.database.firebase_config import db


medication_map = {
  MedicationType.RESCUE: AsthmaSeverity.MILD,
  MedicationType.CONTROLLER: AsthmaSeverity.MODERATE,
  MedicationType.BIOLOGICAL: AsthmaSeverity.SEVERE
}

user_ids = ["9dIA3BDqxbUQoRqZEq6rieiKLhu1", "HjbhpCO5U6b1dEANWMskvBM2f393", "IJug4o9NG7Y6h8Q6UwUyL3mmrK12"]

#num_users = 10

data_generated = {}

async def generate_data():
  for user_id in user_ids:
    user_id = user_id
    asthma_diagnosis = True
    if asthma_diagnosis:
      medication_type = random.sample(list(MedicationType), k=random.randint(1, 3))
      if MedicationType.BIOLOGICAL in medication_type:
        if MedicationType.CONTROLLER not in medication_type:
          medication_type.append(MedicationType.CONTROLLER)
        if MedicationType.RESCUE not in medication_type:
          medication_type.append(MedicationType.RESCUE)
      elif MedicationType.CONTROLLER in medication_type:
        if MedicationType.RESCUE not in medication_type:
          medication_type.append(MedicationType.RESCUE)
      #severity_levels = next((medication_map.get(m) for m in medication_type), AsthmaSeverity.MILD) if medication_type else None
      #severity_levels = max((medication_map.get(m, AsthmaSeverity.MILD) for m in medication_type), default=AsthmaSeverity.MILD)
      #severity_levels = (
        #sorted((medication_map.get(m, AsthmaSeverity.MILD) for m in medication_type), reverse=True)[0]
        #if medication_type else None
      #)
      severity_levels = (
        max((medication_map.get(m, AsthmaSeverity.MILD).value for m in medication_type), default=AsthmaSeverity.MILD.value)
        if medication_type else None
      )
      severity_levels = AsthmaSeverity(severity_levels) if severity_levels is not None else None
    else:
      medication_type = None
      severity_levels = None  
    
    triggers = random.sample(list(AsthmaTriggers), k=random.randint(1,3)) if asthma_diagnosis else None
    custom_triggers = random.sample(["cold beverages", "scented lotion", "perfume", "humidity", "pet dander"], k=random.randint(0, 2)) if asthma_diagnosis else None 
    created_at = datetime(2025, 3, 1, tzinfo=timezone.utc)

    data_generated.update({
      "user_id": user_id,
      "asthma_diagnosis": asthma_diagnosis,
      "severity_level": severity_levels.value if severity_levels else None,
      "triggers": [trigger.value for trigger in triggers] if triggers else None,
      "custom_triggers": custom_triggers,
      "medication_type": [medication.value for medication in medication_type] if medication_type else None,
      "created_at": created_at
    })
    print(data_generated)

    try:
      asthma_info_ref = db.collection("asthmainfo").document()
      await asthma_info_ref.set({
        "user_id": data_generated.get("user_id"),
        "asthma_diagnosis": data_generated.get("asthma_diagnosis"),
        "severity_level": data_generated.get("severity_level"),
        "triggers": data_generated.get("triggers"),
        "custom_triggers": data_generated.get("custom_triggers"),
        "medication_type": data_generated.get("medication_type"),
        "created_at": data_generated.get("created_at")
      })
      print(f"Successfully added asthma data for user {user_id} to database")
    except Exception as e:
        print(f"Error updating asthma information: {str(e)}")
      
if __name__ == "__main__":
  asyncio.run(generate_data())






  