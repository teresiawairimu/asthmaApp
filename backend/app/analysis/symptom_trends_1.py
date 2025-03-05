import sys
import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from scipy import stats
from datetime import datetime
from google.cloud.firestore_v1.base_query import FieldFilter
from fastapi import HTTPException

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.models.symptoms_model import DateRangeRequest
from app.database.firebase_config import db


async def create_frequency_trend(data: DateRangeRequest, token: dict):
  """"""

  try:
    user_id = token["uid"]
    symptom_dict = data.dict()
    start_date = symptom_dict.get("start_date")
    start_date_timestamp = datetime.combine(start_date, datetime.min.time())
    end_date = symptom_dict.get("end_date")
    end_date_timestamp = datetime.combine(end_date, datetime.max.time())
    docs = (
      db.collection("symptoms")
      .where(filter=FieldFilter("user_id", "==", user_id))
      .where(filter=FieldFilter("symptom_date", ">=", start_date_timestamp))
      .where(filter=FieldFilter("symptom_date", "<=", end_date_timestamp))
      .stream()
    )

    #symptom_counts = {}
    #symptom_dates = []
    #symptom_list = []
    #symptom_count_list = []

    symptoms_based_on_dates = {}

    async for doc in docs:
      data_dict = doc.to_dict()
      symptom_date = data_dict.get("symptom_date").date()
      symptoms = doc.to_dict().get("symptoms", [])

      if symptom_date not in symptoms_based_on_dates:
        symptoms_based_on_dates[symptom_date] = {}

      for symptom in symptoms:
        symptoms_based_on_dates[symptom_date].setdefault(symptom, 0)
        symptoms_based_on_dates[symptom_date][symptom] += 1
    print(symptoms_based_on_dates)  

    symptom_dates = list(symptoms_based_on_dates.keys())
    symptom_dates.sort()

    all_symptoms = set()
    for date_data in symptoms_based_on_dates.values():
      for symptom in date_data.keys():
        all_symptoms.add(symptom)
    all_symptoms = list(all_symptoms)
    print(all_symptoms)

    symptom_counts_lists = {}
    for symptom in all_symptoms:
      counts = []
      for date in symptom_dates:
        count = symptoms_based_on_dates.get(date, {}).get(symptom, 0)
        counts.append(count)
        symptom_counts_lists[symptom] = counts
    
    print(symptom_counts_lists)

    plt.figure(figsize=(10, 6))

    for symptom, counts in symptom_counts_lists.items():
      plt.plot(symptom_dates, counts, marker="o", linestyle="-", label=symptom)

    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter("%m-%d"))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=2))

    plt.xlabel("Date")
    plt.ylabel("Symptom Count")
    plt.title("Asthma symptom Trends")
    plt.legend()
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig("static/symptom_trends.png")
    plt.close()
    return {
         "frequency_url": "/static/symptom_trends.png" 
    }
  except Exception as e:
    print(f"Error generating symptom frequency trends: {str(e)}")
    raise HTTPException(status_code=500, detail="Failed to generate symptom frequency trend")
  

async def create_severity_trend(data: DateRangeRequest, token: dict):
  """"""

  try:
    user_id = token["uid"]
    symptom_dict = data.dict()
    start_date = symptom_dict.get("start_date")
    start_date_timestamp = datetime.combine(start_date, datetime.min.time())
    end_date = symptom_dict.get("end_date")
    end_date_timestamp = datetime.combine(end_date, datetime.max.time())

    symptom_docs = (
      db.collection("symptoms")
      .where(filter=FieldFilter("user_id", "==", user_id))
      .where(filter=FieldFilter("symptom_date", ">=", start_date_timestamp))
      .where(filter=FieldFilter("symptom_date", "<=", end_date_timestamp))
      .stream()
    )

    symptoms_severity_based_on_dates = {}

    async for doc in symptom_docs:
      data_dict = doc.to_dict()
      symptom_date = data_dict.get("symptom_date").date()
      symptoms_severity = doc.to_dict().get("symptoms_severity")
      symptoms_severity_based_on_dates[symptom_date] = symptoms_severity
      
    print(symptoms_severity_based_on_dates)

    severity_mapping = {
      "mild": 1,
      "moderate": 2,
      "severe": 3
    }

    for key, value in symptoms_severity_based_on_dates.items():
      if value in severity_mapping:
        symptoms_severity_based_on_dates[key] = severity_mapping[value]

    print(symptoms_severity_based_on_dates)

    symptom_dates = list(symptoms_severity_based_on_dates.keys())
    symptom_dates.sort()

    print(symptom_dates)

    severity_values = list(symptoms_severity_based_on_dates.values())

    print(severity_values)

    #severity_values = []

    #for date in symptom_dates:
      #severity_values.append(symptoms_severity_based_on_dates[date])

    #print(severity_values)

    plt.figure(figsize=(10, 6))


    
    plt.plot(symptom_dates, severity_values, marker="o", linestyle="-")

    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter("%b %d %Y"))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=2))
    plt.gcf().autofmt_xdate()

    plt.yticks([1, 2, 3], ["Mild", "Moderate", "Severe"])
    plt.xlabel("Date")
    plt.ylabel("Symptom Severity")
    plt.title("Asthma symptom severity Trends")
    #plt.legend()
    plt.grid(True)
    #plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig("static/symptom_severity_trends.png")
    plt.close()
    return {
         "frequency_url": "/static/symptom_severity_trends.png" 
    }

  except Exception as e:
    print(f"Error generating symptom severity trends: {str(e)}")
    raise HTTPException(status_code=500, detail="Failed to generate symptom severity trend")
  
async def create_correlation(data: DateRangeRequest, token: dict):
  """"""

  try:
    user_id = token["uid"]
    symptom_dict = data.dict()
    start_date = symptom_dict.get("start_date")
    start_date_timestamp = datetime.combine(start_date, datetime.min.time())
    end_date = symptom_dict.get("end_date")
    end_date_timestamp = datetime.combine(end_date, datetime.max.time())

    symptom_docs = (
      db.collection("symptoms")
      .where(filter=FieldFilter("user_id", "==", user_id))
      .where(filter=FieldFilter("symptom_date", ">=", start_date_timestamp))
      .where(filter=FieldFilter("symptom_date", "<=", end_date_timestamp))
      .stream()
    )

    mood_docs = (
      db.collection("mood")
      .where(filter=FieldFilter("user_id", "==", user_id))
      .where(filter=FieldFilter("mood_date", ">=", start_date_timestamp))
      .where(filter=FieldFilter("mood_date", "<=", end_date_timestamp))
      .stream()
    )

    data_dict = {}

    async for doc in mood_docs:
      mood_dict = doc.to_dict()
      mood_date = mood_dict["mood_date"].date()
      data_dict.setdefault(mood_date, {"Mood": None, "Symptoms": []})
      data_dict[mood_date]["Mood"]= mood_dict.get("mood")


    async for doc in symptom_docs:
      symptom_dict = doc.to_dict()
      symptom_date = symptom_dict["symptom_date"].date()
      data_dict.setdefault(symptom_date, {"Mood": None, "Symptoms": []})
      data_dict[symptom_date]["Symptoms"].extend(symptom_dict.get("symptoms", []))

  

    data = [{"Date": date, "Mood": entry["Mood"], "Symptoms": entry["Symptoms"]} for date, entry in data_dict.items()]
    print(data)

    if not data:
      raise HTTPException(status_code=404, detail="No symptom and mood data found for the given date range")

    df = pd.DataFrame(data)
    symptom_df = df.explode("Symptoms")
    print(f"symptom after explosion", symptom_df)

    table= pd.crosstab(symptom_df["Mood"], symptom_df["Symptoms"])
    print(table)

    if table.size > 0:
      chi2, p, dof, expected = stats.chi2_contingency(table)
      print(f"p-value: {p}")
    else:
      chi2, p=0, 1

    symptom_df = symptom_df.pivot_table(index="Date", columns="Symptoms", aggfunc="size", fill_value=0)

    mood_mapping = {
      "happy": 2,
      "energetic": 2, 
      "calm": 1,
      "tired": -1,
      "irritable": -2,
      "anxious": -2,
      "stressed": -3,
      "sad": -3
    }

    df["Mood_Numeric"] = df["Mood"].map(mood_mapping).fillna(0)
    df["Mood"] = pd.to_numeric(df["Mood"], errors="coerce")
    final_df = df[["Date", "Mood_Numeric"]].merge(symptom_df, left_on="Date", right_index=True)
    print("Before correlation:", final_df["chest_tightness"].value_counts())
    correlation_matrix = final_df.drop(columns=["Date"]).corr()
    plt.figure(figsize=(14,6))
    sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm", fmt=".2f")
    plt.savefig("static/correlation_heatmap.png")
    plt.close()
    return {
      "chi2": chi2,
      "p_value": p,
      "correlation_matrix": correlation_matrix.to_dict(), 
      "heatmap_url": "/static/correlation_heatmap.png" 
    }

  except Exception as e:
    print(f"Error generating symptom and mood correlation table: {str(e)}")
    raise HTTPException(status_code=500, detail="Failed to generate symptom and mood correlation table")
  






   











