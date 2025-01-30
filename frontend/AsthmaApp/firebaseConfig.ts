import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


const firebaseConfig: {[key: string]: string} = {
  apiKey: process.env.API_KEY || "",
  authDomain: process.env.AUTH_DOMAIN || "",
  projectId: process.env.PROJECT_ID || "",
  storageBucket: process.env.STORAGE_BUCKET || "",
  messagingSenderId: process.env.MESSAGING_SENDER_ID || "",
  appId: process.env.APP_ID || "",
  measurementId: process.env.MEASUREMENT_ID || ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword};