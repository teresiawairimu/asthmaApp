import asyncio
import sys
import os
from datetime import date

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.analysis.symptom_trends import create_trend

# Mock test data
test_data = {
    "start_date": date(2024, 1, 1),
    "end_date": date(2024, 1, 31),
}
mock_token = {"uid": "9dIA3BDqxbUQoRqZEq6rieiKLhu1"}

# Convert to Pydantic model
from app.models.symptoms_model import DateRangeRequest
test_data_model = DateRangeRequest(**test_data)

# Run test
async def test_create_trend():
    await create_trend(test_data_model, mock_token)

asyncio.run(test_create_trend())
