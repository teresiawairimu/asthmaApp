import firebase_admin
from firebase_admin import credentials, firestore_async
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(current_dir, "asthmaapp-57b21-firebase-adminsdk-fbsvc-fc1171018d.json")
cred = credentials.Certificate(json_path)
firebase_admin.initialize_app(cred)
db = firestore_async.client()