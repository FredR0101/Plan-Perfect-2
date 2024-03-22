import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Key } from './ApiKey'

const firebaseConfig = {
  apiKey: Key,
  authDomain: "test-database-plan-perfect.firebaseapp.com",
  databaseURL:
    "https://test-database-plan-perfect-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-database-plan-perfect",
  storageBucket: "test-database-plan-perfect.appspot.com",
  messagingSenderId: "65580804131",
  appId: "1:65580804131:web:ba66f055806e6c0940e996",
  measurementId: "G-SPRR2Z1T24",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialise Auth
export const auth = getAuth(app);

// //database fetch
// export const db = getFireStore();
