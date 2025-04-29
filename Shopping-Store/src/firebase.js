// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhms8l0wPoQEvHe2jzeOHs-LK02y1DeG4",
  authDomain: "react-first-project-55dfb.firebaseapp.com",
  projectId: "react-first-project-55dfb",
  storageBucket: "react-first-project-55dfb.firebasestorage.app",
  messagingSenderId: "297632566498",
  appId: "1:297632566498:web:05af1461c2c33b2c69a2bb",
  measurementId: "G-GX01TTTVLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
