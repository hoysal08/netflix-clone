// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiTqx0gMcWOPQqBEqDTDBjszb5q3_rtIA",
  authDomain: "react-netflix-clone-c11d0.firebaseapp.com",
  projectId: "react-netflix-clone-c11d0",
  storageBucket: "react-netflix-clone-c11d0.appspot.com",
  messagingSenderId: "342363278345",
  appId: "1:342363278345:web:ac446836bf41aab3a57cd8",
  measurementId: "G-P5J3KTNXS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseAuth=getAuth(app);