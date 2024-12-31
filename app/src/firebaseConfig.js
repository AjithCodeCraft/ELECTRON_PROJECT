// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyD0jOEmQ0axLG8PiUUneqdKCKeUIZlCMk4",
  authDomain: "react-226f4.firebaseapp.com",
  projectId: "react-226f4",
  storageBucket: "react-226f4.firebasestorage.app",
  messagingSenderId: "349553089807",
  appId: "1:349553089807:web:49fdaa86b2c9b91c67727a",
  measurementId: "G-04WX3ZXR5P"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

export const db = getFirestore(app);

