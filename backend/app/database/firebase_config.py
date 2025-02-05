import firebase_admin
from firebase_admin import credentials, firestore_async

cred = credentials.Certificate("asthmaapp-57b21-firebase-adminsdk-fbsvc-fc1171018d.json")
firebase_admin.initialize_app(cred)
db = firestore_async.client()