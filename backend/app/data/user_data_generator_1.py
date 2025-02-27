from enum import Enum
import random
from datetime import datetime, timedelta
from backend.app.models.asthma_information_model import AsthmaTriggers, AsthmaSeverity, MedicationType

num_users = 5
users = []

def user_asthma_data_generator(token: dict):
    """"""
    for _ in range(num_users):
        user_id = token["uid"]
        asthma_diagnosis = random.choice([True, False])
        severity_level = random.choice(list(AsthmaSeverity)) if asthma_diagnosis else None
        triggers = random.sample(list(AsthmaTriggers), k=random.randint(1, 3)) if asthma_diagnosis else None
        custom_triggers = random.sample(["perfume", "humidity", "pet dander"], k=random.randint(0, 2)) if asthma_diagnosis else None
        medication_type = random.sample(list(MedicationType)) if asthma_diagnosis else None
        created_at = datetime(2024, 1, 1).strftime("%Y-%m-%d")

        users.append({
        "user_id": user_id,
        "asthma_diagnosis": asthma_diagnosis,
        "severity_level": severity_level.value if severity_level else None,
        "triggers": [trigger.value for trigger in triggers] if triggers else None,
        "custom_triggers": custom_triggers,
        "medication_type": medication_type.value if medication_type else None,
        "created_at": created_at,
    })