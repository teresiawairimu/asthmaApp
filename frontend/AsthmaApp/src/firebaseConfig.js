import Constants from 'expo-constants';
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApiKey,
  authDomain: Constants.expoConfig.extra.firebaseAuthDomain,
  projectId: Constants.expoConfig.extra.firebaseProjectId,
  storageBucket: Constants.expoConfig.extra.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig.extra.firebaseMessagingSenderId,
  appId: Constants.expoConfig.extra.firebaseAppId,
  measurementId: Constants.expoConfig.extra.firebaseMeasurementId
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {db, auth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword};