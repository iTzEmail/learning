import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Replace the values below with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAI2UfK_k2falYWEBw7uzK6Y8Ti1BgOZZE",
  authDomain: "learning-3f692.firebaseapp.com",
  projectId: "learning-3f692",
  storageBucket: "learning-3f692.firebasestorage.app",
  messagingSenderId: "489350438433",
  appId: "1:489350438433:web:cadbb3061ba76b64bf0d60",
  measurementId: "G-0CF6MSEBQN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);