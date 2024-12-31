// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDCqZjCskD0-t0Z5cyD2YxFUYgtCNtroZ8",
  authDomain: "to-do-639c8.firebaseapp.com",
  projectId: "to-do-639c8",
  storageBucket: "to-do-639c8.firebasestorage.app",
  messagingSenderId: "281015737918",
  appId: "1:281015737918:web:239ed56b3023389d2a3b6f",
  measurementId: "G-2W8E9ZTL7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
