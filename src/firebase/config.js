// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyDAEbZb1tBi3YnlPbLalHGa9pzhnCk1XJI",
  authDomain: "elijah-funolympic.firebaseapp.com",
  projectId: "elijah-funolympic",
  storageBucket: "elijah-funolympic.appspot.com",
  messagingSenderId: "899905720462",
  appId: "1:899905720462:web:fe7335c035d6be2c9c39df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
