import asyncio
import sys
import os
from datetime import date

# Ensure the script can find the app module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.analysis.symptom_trends import SymptomTrends
from app.models.symptoms_model import DateRangeRequest

symptom_analysis = SymptomTrends()

# Test input: Real date range and Firestore user ID
test_data = {
    "start_date": date(2024, 1, 1),
    "end_date": date(2024, 1, 31),
}
test_token = {"uid": "HjbhpCO5U6b1dEANWMskvBM2f393"}  # Replace with a valid Firestore user ID

# Convert input data to Pydantic model
test_data_model = DateRangeRequest(**test_data)

# Run `create_frequency_trend` test
async def test_create_frequency_trend():
    print("\n🔍 Running test_create_frequency_trend()...")
    try:
        await symptom_analysis.create_frequency_trend(test_data_model, test_token)
        print("✅ create_frequency_trend executed successfully!\n")
    except Exception as e:
        print(f"❌ create_frequency_trend failed: {str(e)}\n")

async def test_create_severity_trend():
    print("\n🔍 Running test_create_severity_trend()...")
    try:
        await symptom_analysis.create_severity_trend(test_data_model, test_token)
        print("✅ create_severity_trend executed successfully!\n")
    except Exception as e:
        print(f"❌ create_severity_trend failed: {str(e)}\n")

# Run `create_correlation` test
async def test_create_correlation():
    print("\n🔍 Running test_create_correlation()...")
    try:
        result = await symptom_analysis.create_correlation(test_data_model, test_token)

        # Display results
        print("✅ create_correlation executed successfully!")
        print(f"Chi-square: {result['chi2']}")
        print(f"P-value: {result['p_value']}")
        print(f"Correlation Matrix: {result['correlation_matrix']}")
        print(f"Heatmap URL: {result['heatmap_url']}\n")

    except Exception as e:
        print(f"❌ create_correlation failed: {str(e)}\n")

# Run tests
async def main():
    await test_create_frequency_trend()
    await test_create_severity_trend()   
    await test_create_correlation()

asyncio.run(main())
